const { S3Client, GetObjectCommand, PutObjectCommand } = require("@aws-sdk/client-s3");

const ALLOWED_REACTIONS = ["helpful", "strong", "accurate", "practical", "save", "share"];
const BUCKET = process.env.REACTIONS_BUCKET || "media.dmikhin.ru";
const REGION = process.env.AWS_REGION || "ru-central1";
const ENDPOINT = process.env.YC_ENDPOINT_URL || "https://storage.yandexcloud.net";
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

const s3 = new S3Client({
  region: REGION,
  endpoint: ENDPOINT,
  forcePathStyle: false,
  credentials: {
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_KEY
  }
});

function baseCounts() {
  return {
    helpful: 0,
    strong: 0,
    accurate: 0,
    practical: 0,
    save: 0,
    share: 0
  };
}

function resolveAllowedOrigin(requestOrigin) {
  if (!requestOrigin) {
    return ALLOWED_ORIGIN[0] || "*";
  }
  if (ALLOWED_ORIGIN.includes("*")) {
    return "*";
  }
  return ALLOWED_ORIGIN.includes(requestOrigin) ? requestOrigin : ALLOWED_ORIGIN[0] || "*";
}

function response(statusCode, payload, requestOrigin) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Access-Control-Allow-Origin": resolveAllowedOrigin(requestOrigin),
      "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Cache-Control": "no-store",
      Vary: "Origin"
    },
    body: JSON.stringify(payload)
  };
}

function sanitizeSlug(rawSlug) {
  return String(rawSlug || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\u0400-\u04ff-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

async function streamToString(stream) {
  const chunks = [];
  for await (const chunk of stream) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }
  return Buffer.concat(chunks).toString("utf8");
}

async function readCounts(key) {
  try {
    const object = await s3.send(
      new GetObjectCommand({
        Bucket: BUCKET,
        Key: key
      })
    );
    const text = await streamToString(object.Body);
    const parsed = JSON.parse(text);
    return { ...baseCounts(), ...(parsed.counts || {}) };
  } catch (error) {
    if (error?.$metadata?.httpStatusCode === 404 || error?.name === "NoSuchKey") {
      return baseCounts();
    }
    throw error;
  }
}

async function writeCounts(key, slug, counts) {
  await s3.send(
    new PutObjectCommand({
      Bucket: BUCKET,
      Key: key,
      Body: JSON.stringify(
        {
          slug,
          counts,
          updatedAt: new Date().toISOString()
        },
        null,
        2
      ),
      ContentType: "application/json; charset=utf-8",
      CacheControl: "no-store"
    })
  );
}

module.exports.handler = async function handler(event) {
  try {
    const method = event.httpMethod || event.requestContext?.http?.method || "GET";
    const requestOrigin = event.headers?.origin || event.headers?.Origin;

    if (method === "OPTIONS") {
      return response(200, { ok: true }, requestOrigin);
    }

    const querySlug = event.queryStringParameters?.slug;
    const body = event.body ? JSON.parse(event.body) : {};
    const slug = sanitizeSlug(querySlug || body.slug);

    if (!slug) {
      return response(400, { error: "slug is required" }, requestOrigin);
    }

    if (!ACCESS_KEY || !SECRET_KEY) {
      return response(
        500,
        {
          error: "credentials_missing",
          message: "Storage credentials are not configured."
        },
        requestOrigin
      );
    }

    const key = `reactions/${slug}.json`;

    if (method === "GET") {
      const counts = await readCounts(key);
      return response(200, { slug, counts }, requestOrigin);
    }

    if (method === "POST") {
      const reaction = String(body.reaction || "");
      if (!ALLOWED_REACTIONS.includes(reaction)) {
        return response(400, { error: "reaction is invalid" }, requestOrigin);
      }

      const counts = await readCounts(key);
      counts[reaction] = Number(counts[reaction] || 0) + 1;
      await writeCounts(key, slug, counts);

      return response(200, { slug, counts }, requestOrigin);
    }

    return response(405, { error: "method not allowed" }, requestOrigin);
  } catch (error) {
    return response(
      500,
      {
        error: "internal_error",
        message: error instanceof Error ? error.message : "Unknown error"
      },
      event?.headers?.origin || event?.headers?.Origin
    );
  }
};
