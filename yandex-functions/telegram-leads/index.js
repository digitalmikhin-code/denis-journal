const https = require("https");

const TELEGRAM_BOT_TOKEN = String(process.env.TELEGRAM_BOT_TOKEN || "").trim();
const TELEGRAM_CHAT_ID = String(process.env.TELEGRAM_CHAT_ID || "").trim();
const ALLOWED_ORIGIN = (process.env.ALLOWED_ORIGIN || "*")
  .split(",")
  .map((item) => item.trim())
  .filter(Boolean);

function resolveAllowedOrigin(requestOrigin) {
  if (!requestOrigin) return ALLOWED_ORIGIN[0] || "*";
  if (ALLOWED_ORIGIN.length === 0 || ALLOWED_ORIGIN.includes("*")) return requestOrigin;
  if (ALLOWED_ORIGIN.includes(requestOrigin)) return requestOrigin;
  if (requestOrigin.endsWith(".dmikhin.ru")) return requestOrigin;
  return ALLOWED_ORIGIN[0] || requestOrigin;
}

function response(statusCode, payload, requestOrigin) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Access-Control-Allow-Origin": resolveAllowedOrigin(requestOrigin),
      "Access-Control-Allow-Methods": "POST,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Cache-Control": "no-store",
      Vary: "Origin"
    },
    body: JSON.stringify(payload)
  };
}

function normalizeText(value) {
  return String(value || "").trim().replace(/\s+/g, " ");
}

function validateEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || "").trim());
}

function escapeTelegramHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function buildTelegramMessage(body) {
  const name = normalizeText(body.fullName || body.name);
  const email = normalizeText(body.email);
  const company = normalizeText(body.company);
  const role = normalizeText(body.role);
  const telegram = normalizeText(body.telegram);
  const result = normalizeText(body.result);
  const source = normalizeText(body.source || "business-game");
  const scores = body.scores || {};

  return [
    "🆕 <b>Новая заявка с сайта</b>",
    "",
    `<b>Источник:</b> ${escapeTelegramHtml(source)}`,
    result ? `<b>Результат игры:</b> ${escapeTelegramHtml(result)}` : "",
    "",
    `<b>Имя:</b> ${escapeTelegramHtml(name)}`,
    `<b>Email:</b> ${escapeTelegramHtml(email)}`,
    company ? `<b>Компания:</b> ${escapeTelegramHtml(company)}` : "",
    role ? `<b>Должность:</b> ${escapeTelegramHtml(role)}` : "",
    telegram ? `<b>Telegram:</b> ${escapeTelegramHtml(telegram)}` : "",
    "",
    scores.controlLevel ? `<b>Управляемость:</b> ${escapeTelegramHtml(scores.controlLevel)}` : "",
    scores.systemThinking ? `<b>Системное мышление:</b> ${escapeTelegramHtml(scores.systemThinking)}` : "",
    scores.leadership ? `<b>Лидерство:</b> ${escapeTelegramHtml(scores.leadership)}` : "",
    scores.growthReadiness ? `<b>Готовность к росту:</b> ${escapeTelegramHtml(scores.growthReadiness)}` : ""
  ]
    .filter(Boolean)
    .join("\n");
}

function postTelegramJson(payload) {
  const body = JSON.stringify(payload);

  return new Promise((resolve, reject) => {
    const request = https.request(
      {
        hostname: "api.telegram.org",
        path: `/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(body)
        }
      },
      (telegramResponse) => {
        const chunks = [];

        telegramResponse.on("data", (chunk) => chunks.push(chunk));
        telegramResponse.on("end", () => {
          const responseBody = Buffer.concat(chunks).toString("utf8");
          if (telegramResponse.statusCode >= 200 && telegramResponse.statusCode < 300) {
            resolve(responseBody);
            return;
          }

          reject(new Error(`Telegram API error: ${telegramResponse.statusCode} ${responseBody}`));
        });
      }
    );

    request.on("error", reject);
    request.write(body);
    request.end();
  });
}

module.exports.handler = async function handler(event) {
  const method = event.httpMethod || event.requestContext?.http?.method || "GET";
  const requestOrigin = event.headers?.origin || event.headers?.Origin;

  try {
    if (method === "OPTIONS") return response(200, { ok: true }, requestOrigin);
    if (method !== "POST") return response(405, { ok: false, error: "method_not_allowed" }, requestOrigin);

    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      return response(
        500,
        { ok: false, error: "telegram_not_configured", message: "TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is missing." },
        requestOrigin
      );
    }

    const body = event.body ? JSON.parse(event.body) : {};
    const name = normalizeText(body.fullName || body.name);
    const email = normalizeText(body.email);

    if (name.length < 2) {
      return response(400, { ok: false, error: "name_required", message: "Укажите имя." }, requestOrigin);
    }

    if (!validateEmail(email)) {
      return response(400, { ok: false, error: "email_required", message: "Укажите корректный email." }, requestOrigin);
    }

    await postTelegramJson({
      chat_id: TELEGRAM_CHAT_ID,
      text: buildTelegramMessage(body),
      parse_mode: "HTML",
      disable_web_page_preview: true
    });

    return response(200, { ok: true, telegram: { status: "sent" } }, requestOrigin);
  } catch (error) {
    return response(
      500,
      {
        ok: false,
        error: "telegram_send_failed",
        message: error instanceof Error ? error.message : "Unknown error."
      },
      requestOrigin
    );
  }
};
