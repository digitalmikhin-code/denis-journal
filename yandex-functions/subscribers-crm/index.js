const { randomUUID } = require("crypto");
const { S3Client, GetObjectCommand, PutObjectCommand } = require("@aws-sdk/client-s3");

const BUCKET = process.env.SUBSCRIBERS_BUCKET || process.env.REACTIONS_BUCKET || "media.dmikhin.ru";
const STORE_KEY = process.env.SUBSCRIBERS_STORE_KEY || "crm/subscribers.json";
const REGION = process.env.AWS_REGION || "ru-central1";
const ENDPOINT = process.env.YC_ENDPOINT_URL || "https://storage.yandexcloud.net";
const ADMIN_TOKEN = String(process.env.SUBSCRIBERS_ADMIN_TOKEN || "").trim();
const ALLOWED_ORIGIN = (process.env.ALLOWED_ORIGIN || "*")
  .split(",")
  .map((item) => item.trim())
  .filter(Boolean);

const ACCESS_KEY =
  process.env.YC_ACCESS_KEY_ID ||
  process.env.AWS_ACCESS_KEY_ID ||
  process.env.ACCESS_KEY_ID;
const SECRET_KEY =
  process.env.YC_SECRET_ACCESS_KEY ||
  process.env.AWS_SECRET_ACCESS_KEY ||
  process.env.SECRET_ACCESS_KEY;

const CONTACT_STATUSES = new Set([
  "new",
  "qualified",
  "nurturing",
  "offer_sent",
  "customer",
  "archived"
]);

const s3 = new S3Client({
  region: REGION,
  endpoint: ENDPOINT,
  forcePathStyle: false,
  credentials: {
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_KEY
  }
});

function resolveAllowedOrigin(requestOrigin) {
  if (!requestOrigin) return ALLOWED_ORIGIN[0] || "*";
  if (ALLOWED_ORIGIN.length === 0 || ALLOWED_ORIGIN.includes("*")) return requestOrigin;
  if (ALLOWED_ORIGIN.includes(requestOrigin)) return requestOrigin;
  if (requestOrigin.endsWith(".dmikhin.ru")) return requestOrigin;
  return ALLOWED_ORIGIN[0] || requestOrigin;
}

function response(statusCode, payload, requestOrigin, contentType) {
  return {
    statusCode,
    headers: {
      "Content-Type": contentType || "application/json; charset=utf-8",
      "Access-Control-Allow-Origin": resolveAllowedOrigin(requestOrigin),
      "Access-Control-Allow-Methods": "GET,POST,PUT,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type,Authorization,X-CRM-Token",
      "Cache-Control": "no-store",
      Vary: "Origin"
    },
    body: typeof payload === "string" ? payload : JSON.stringify(payload)
  };
}

function normalizeEmail(value) {
  return String(value || "").trim().toLowerCase();
}

function normalizeName(value) {
  return String(value || "").trim().replace(/\s+/g, " ");
}

function parseTags(value) {
  if (!value) return [];
  const source = Array.isArray(value) ? value : String(value).split(",");
  const tags = source.map((item) => String(item).trim().toLowerCase()).filter(Boolean);
  return Array.from(new Set(tags));
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function escapeCsv(value) {
  return `"${String(value || "").replace(/"/g, '""')}"`;
}

function resolveAuthToken(event) {
  const crmTokenHeader =
    event.headers?.["x-crm-token"] ||
    event.headers?.["X-CRM-Token"] ||
    event.headers?.["x-CRM-token"];
  const crmToken = String(crmTokenHeader || "").trim();
  if (crmToken) return crmToken;

  const header = event.headers?.authorization || event.headers?.Authorization || "";
  const raw = String(header).trim();
  if (!raw) return "";
  const match = raw.match(/^Bearer\s+(.+)$/i);
  return (match ? match[1] : raw).trim();
}

function ensureAdminAccess(event) {
  if (!ADMIN_TOKEN) {
    return { ok: false, statusCode: 500, error: "SUBSCRIBERS_ADMIN_TOKEN is not configured." };
  }
  const token = resolveAuthToken(event);
  if (!token || token !== ADMIN_TOKEN) {
    return { ok: false, statusCode: 401, error: "Unauthorized." };
  }
  return { ok: true };
}

async function streamToString(stream) {
  const chunks = [];
  for await (const chunk of stream) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }
  return Buffer.concat(chunks).toString("utf8");
}

async function readContacts() {
  try {
    const object = await s3.send(new GetObjectCommand({ Bucket: BUCKET, Key: STORE_KEY }));
    const text = await streamToString(object.Body);
    const parsed = JSON.parse(text);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    if (error?.$metadata?.httpStatusCode === 404 || error?.name === "NoSuchKey") return [];
    throw error;
  }
}

async function writeContacts(items) {
  await s3.send(
    new PutObjectCommand({
      Bucket: BUCKET,
      Key: STORE_KEY,
      Body: JSON.stringify(items, null, 2),
      ContentType: "application/json; charset=utf-8",
      CacheControl: "no-store"
    })
  );
}

function filterContacts(items, query) {
  const q = String(query.q || "").trim().toLowerCase();
  const status = String(query.status || "").trim().toLowerCase();
  const source = String(query.source || "").trim().toLowerCase();
  const tag = String(query.tag || "").trim().toLowerCase();

  return items
    .filter((item) => {
      if (status && status !== "all" && item.status !== status) return false;
      if (source && !String(item.source || "").toLowerCase().includes(source)) return false;
      if (tag && !(item.tags || []).some((value) => String(value).toLowerCase().includes(tag))) return false;
      if (!q) return true;
      return (
        String(item.fullName || "").toLowerCase().includes(q) ||
        String(item.email || "").toLowerCase().includes(q) ||
        String(item.source || "").toLowerCase().includes(q) ||
        String(item.notes || "").toLowerCase().includes(q) ||
        (item.tags || []).some((value) => String(value).toLowerCase().includes(q))
      );
    })
    .sort((left, right) => String(right.subscribedAt).localeCompare(String(left.subscribedAt)));
}

function toCsv(items) {
  const header = [
    "id",
    "full_name",
    "email",
    "status",
    "source",
    "source_history",
    "tags",
    "notes",
    "subscribed_at",
    "updated_at"
  ];
  const lines = items.map((item) =>
    [
      item.id,
      item.fullName,
      item.email,
      item.status,
      item.source,
      (item.sourceHistory || []).join(" | "),
      (item.tags || []).join(" | "),
      item.notes,
      item.subscribedAt,
      item.updatedAt
    ]
      .map(escapeCsv)
      .join(",")
  );
  return [header.join(","), ...lines].join("\n");
}

function toEmailsList(items) {
  const uniqueEmails = Array.from(
    new Set(
      items
        .map((item) => normalizeEmail(item.email))
        .filter((email) => validateEmail(email))
    )
  );
  return uniqueEmails.join("\n");
}

module.exports.handler = async function handler(event) {
  const method = event.httpMethod || event.requestContext?.http?.method || "GET";
  const requestOrigin = event.headers?.origin || event.headers?.Origin;

  try {
    if (method === "OPTIONS") return response(200, { ok: true }, requestOrigin);

    if (!ACCESS_KEY || !SECRET_KEY) {
      return response(
        500,
        { error: "credentials_missing", message: "Storage credentials are not configured." },
        requestOrigin
      );
    }

    const query = event.queryStringParameters || {};
    const body = event.body ? JSON.parse(event.body) : {};

    if (method === "GET") {
      const auth = ensureAdminAccess(event);
      if (!auth.ok) return response(auth.statusCode, { error: auth.error }, requestOrigin);

      const items = await readContacts();
      const action = String(query.action || "").toLowerCase();
      const filtered = filterContacts(items, query);

      if (action === "export") {
        const format = String(query.format || "csv").toLowerCase();
        if (format === "json") return response(200, { items: filtered, total: filtered.length }, requestOrigin);
        if (format === "emails" || format === "txt") {
          return response(200, toEmailsList(filtered), requestOrigin, "text/plain; charset=utf-8");
        }
        return response(200, toCsv(filtered), requestOrigin, "text/csv; charset=utf-8");
      }

      return response(200, { items: filtered, total: filtered.length }, requestOrigin);
    }

    if (method === "POST") {
      const fullName = normalizeName(body.fullName);
      const email = normalizeEmail(body.email);
      const source = String(body.source || "").trim();
      const tags = parseTags(body.tags);
      const notes = String(body.notes || "").trim();

      if (fullName.length < 3) return response(400, { error: "Укажите ФИО (минимум 3 символа)." }, requestOrigin);
      if (!validateEmail(email)) return response(400, { error: "Укажите корректный email." }, requestOrigin);
      if (!source) return response(400, { error: "Источник подписки обязателен." }, requestOrigin);

      const items = await readContacts();
      const now = new Date().toISOString();
      const existingIndex = items.findIndex((item) => normalizeEmail(item.email) === email);

      if (existingIndex >= 0) {
        const current = items[existingIndex];
        const updated = {
          ...current,
          fullName: fullName || current.fullName,
          source,
          sourceHistory: Array.from(new Set([...(current.sourceHistory || []), source])),
          tags: Array.from(new Set([...(current.tags || []), ...tags])),
          notes: notes || current.notes || "",
          updatedAt: now
        };
        items[existingIndex] = updated;
        await writeContacts(items);
        return response(200, { item: updated, updated: true }, requestOrigin);
      }

      const created = {
        id: randomUUID(),
        fullName,
        email,
        status: "new",
        source,
        sourceHistory: [source],
        tags,
        notes,
        subscribedAt: now,
        updatedAt: now
      };

      items.push(created);
      await writeContacts(items);
      return response(201, { item: created }, requestOrigin);
    }

    if (method === "PUT") {
      const auth = ensureAdminAccess(event);
      if (!auth.ok) return response(auth.statusCode, { error: auth.error }, requestOrigin);

      const id = String(query.id || body.id || "").trim();
      if (!id) return response(400, { error: "id обязателен для обновления." }, requestOrigin);

      const items = await readContacts();
      const index = items.findIndex((item) => item.id === id);
      if (index < 0) return response(404, { error: "Контакт не найден." }, requestOrigin);

      const current = items[index];
      const nextEmail = body.email ? normalizeEmail(body.email) : current.email;
      if (!validateEmail(nextEmail)) return response(400, { error: "Некорректный email." }, requestOrigin);

      const duplicate = items.find((item) => item.id !== id && normalizeEmail(item.email) === nextEmail);
      if (duplicate) return response(400, { error: "Контакт с таким email уже существует." }, requestOrigin);

      const nextStatus = String(body.status || current.status);
      if (!CONTACT_STATUSES.has(nextStatus)) {
        return response(400, { error: "Некорректный статус контакта." }, requestOrigin);
      }

      const nextSource = String(body.source || current.source).trim() || current.source;
      const updated = {
        ...current,
        fullName: body.fullName ? normalizeName(body.fullName) : current.fullName,
        email: nextEmail,
        status: nextStatus,
        source: nextSource,
        sourceHistory: Array.from(new Set([...(current.sourceHistory || []), nextSource])),
        tags: body.tags ? parseTags(body.tags) : current.tags || [],
        notes: body.notes !== undefined ? String(body.notes || "").trim() : current.notes || "",
        updatedAt: new Date().toISOString()
      };

      items[index] = updated;
      await writeContacts(items);
      return response(200, { item: updated }, requestOrigin);
    }

    return response(405, { error: "method_not_allowed" }, requestOrigin);
  } catch (error) {
    return response(
      500,
      { error: "internal_error", message: error instanceof Error ? error.message : "Unknown error" },
      requestOrigin
    );
  }
};
