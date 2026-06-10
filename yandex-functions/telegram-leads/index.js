const https = require("https");

function corsHeaders() {
  const allowedOrigin = process.env.ALLOWED_ORIGIN || "*";

  return {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": allowedOrigin,
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

function formatLine(label, value) {
  if (!value) {
    return null;
  }

  return `${label} ${escapeHtml(value)}`;
}

function formatJsonBlock(label, value) {
  if (!value) {
    return null;
  }

  try {
    return `${label}\n${escapeHtml(JSON.stringify(value, null, 2))}`;
  } catch (error) {
    return `${label} ${escapeHtml(value)}`;
  }
}

function splitText(text, limit) {
  const chunks = [];
  let rest = text;

  while (rest.length > limit) {
    let cutAt = rest.lastIndexOf("\n", limit);
    if (cutAt < Math.floor(limit * 0.6)) {
      cutAt = limit;
    }
    chunks.push(rest.slice(0, cutAt));
    rest = rest.slice(cutAt).trimStart();
  }

  if (rest) {
    chunks.push(rest);
  }

  return chunks;
}

function sendTelegram(text) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    throw new Error("TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is not configured");
  }

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
          if (res.statusCode < 200 || res.statusCode >= 300) {
            reject(new Error(`Telegram API error ${res.statusCode}: ${data}`));
            return;
          }

          resolve({ statusCode: res.statusCode, body: data });
        });
      }
    );

    req.on("error", reject);
    req.write(body);
    req.end();
  });
}

async function sendTelegramLong(text) {
  const chunks = splitText(text, 3500);
  const results = [];

  for (let index = 0; index < chunks.length; index += 1) {
    const prefix = chunks.length > 1 ? `<b>Часть ${index + 1}/${chunks.length}</b>\n\n` : "";
    results.push(await sendTelegram(`${prefix}${chunks[index]}`));
  }

  return results;
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

    const lines = [
      "\u{1F4E9} <b>\u041d\u043e\u0432\u0430\u044f \u0437\u0430\u044f\u0432\u043a\u0430 \u0441 \u0441\u0430\u0439\u0442\u0430</b>",
      "",
      `\u{1F464} <b>\u0418\u043c\u044f:</b> ${escapeHtml(data.fullName)}`,
      `\u{1F4E7} <b>Email:</b> ${escapeHtml(data.email)}`,
      `\u{1F3E2} <b>\u041a\u043e\u043c\u043f\u0430\u043d\u0438\u044f:</b> ${escapeHtml(data.company)}`,
      `\u{1F4BC} <b>\u0414\u043e\u043b\u0436\u043d\u043e\u0441\u0442\u044c:</b> ${escapeHtml(data.role)}`,
      `\u{1F4AC} <b>Telegram:</b> ${escapeHtml(data.telegram)}`,
      `\u{1F517} <b>\u0418\u0441\u0442\u043e\u0447\u043d\u0438\u043a:</b> ${escapeHtml(data.source)}`,
      formatLine("\u{1F4D8} <b>\u041b\u0438\u0434-\u043c\u0430\u0433\u043d\u0438\u0442:</b>", data.leadMagnet),
      formatLine("\u{1F4CA} <b>\u0420\u0435\u0437\u0443\u043b\u044c\u0442\u0430\u0442 / \u043a\u043e\u043d\u0442\u0435\u043a\u0441\u0442:</b>", data.result),
      formatLine("\u{1F310} <b>\u0421\u0442\u0440\u0430\u043d\u0438\u0446\u0430:</b>", data.pageUrl),
      formatJsonBlock("\u{1F4C8} <b>\u041c\u0435\u0442\u0440\u0438\u043a\u0438:</b>", data.scores || data.metrics),
      formatJsonBlock("\u{1F4DD} <b>\u0414\u0435\u0442\u0430\u043b\u0438:</b>", data.decisions || data.details)
    ].filter(Boolean);

    const text = lines.join("\n");

    const tg = await sendTelegramLong(text);

    return {
      statusCode: 200,
      headers: corsHeaders(),
      body: JSON.stringify({
        ok: true,
        telegram: {
          status: "sent",
          messages: tg.length
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
