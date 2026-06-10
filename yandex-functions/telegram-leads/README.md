# Telegram leads function

Yandex Cloud Function for sending site lead forms directly to Telegram.

## Environment variables

- `TELEGRAM_BOT_TOKEN` - Telegram bot token from BotFather.
- `TELEGRAM_CHAT_ID` - Telegram chat id where leads should be sent.
- `ALLOWED_ORIGIN` - optional allowed origin, for example `https://media.dmikhin.ru`.

## API

- `POST /`

Example body:

```json
{
  "fullName": "Denis",
  "email": "denis@example.com",
  "company": "Company",
  "role": "CEO",
  "telegram": "@username",
  "source": "lead-magnet-business-control-diagnostic",
  "leadMagnet": "Диагностика управляемости бизнеса",
  "pageUrl": "https://media.dmikhin.ru/lead/business-control-diagnostic",
  "result": "Запросил лид-магнит: Диагностика управляемости бизнеса",
  "scores": {
    "controlLevel": 80,
    "systemThinking": 75,
    "leadership": 70,
    "growthReadiness": 78
  }
}
```

## Current site sources

- `lead-magnet-business-control-diagnostic`
- `lead-magnet-50-manager-ai-prompts`
- `business-game-premium-dashboard`

## Frontend config

Set env var in the site:

```text
NEXT_PUBLIC_LEADS_API_URL=https://functions.yandexcloud.net/<your-function-id>
```

The function sends all leads to the Telegram chat configured by `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID`.
