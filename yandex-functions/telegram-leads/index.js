const https = require("https");

function corsHeaders() {
  return {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  };
}

function escapeHtml(value) {
  return String(value || "-")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function sendTelegram(text) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  const body = JSON.stringify({
    chat_id: chatId,
    text,
    parse_mode: "HTML"
  });

  return new Promise((resolve, reject) => {
    const req = https.request(
      {
        hostname: "api.telegram.org",
        path: `/bot${token}/sendMessage`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(body)
        }
      },
      (res) => {
        let data = "";

        res.on("data", (chunk) => {
          data += chunk;
        });

        res.on("end", () => {
          resolve({
            statusCode: res.statusCode,
            body: data
          });
        });
      }
    );

    req.on("error", reject);
    req.write(body);
    req.end();
  });
}

module.exports.handler = async function handler(event) {
  try {
    if (event.httpMethod === "OPTIONS") {
      return {
        statusCode: 200,
        headers: corsHeaders(),
        body: ""
      };
    }

    const data = event.body ? JSON.parse(event.body) : {};

    const text = [
      "\u{1F4E9} <b>\u041d\u043e\u0432\u0430\u044f \u0437\u0430\u044f\u0432\u043a\u0430 \u0441 \u0441\u0430\u0439\u0442\u0430</b>",
      "",
      `\u{1F464} <b>\u0418\u043c\u044f:</b> ${escapeHtml(data.fullName)}`,
      `\u{1F4E7} <b>Email:</b> ${escapeHtml(data.email)}`,
      `\u{1F3E2} <b>\u041a\u043e\u043c\u043f\u0430\u043d\u0438\u044f:</b> ${escapeHtml(data.company)}`,
      `\u{1F4BC} <b>\u0414\u043e\u043b\u0436\u043d\u043e\u0441\u0442\u044c:</b> ${escapeHtml(data.role)}`,
      `\u{1F4AC} <b>Telegram:</b> ${escapeHtml(data.telegram)}`,
      `\u{1F517} <b>\u0418\u0441\u0442\u043e\u0447\u043d\u0438\u043a:</b> ${escapeHtml(data.source)}`,
      `\u{1F4CA} <b>\u0420\u0435\u0437\u0443\u043b\u044c\u0442\u0430\u0442 \u0438\u0433\u0440\u044b:</b> ${escapeHtml(data.result)}`
    ].join("\n");

    const tg = await sendTelegram(text);

    return {
      statusCode: 200,
      headers: corsHeaders(),
      body: JSON.stringify({
        ok: true,
        telegram: {
          status: "sent",
          statusCode: tg.statusCode,
          body: tg.body
        }
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: corsHeaders(),
      body: JSON.stringify({
        ok: false,
        error: error && error.message ? error.message : "Unknown error"
      })
    };
  }
};
