# Telegram leads function

Yandex Cloud Function for sending site lead forms directly to Telegram.

## Environment variables

- `TELEGRAM_BOT_TOKEN` - Telegram bot token from BotFather
- `TELEGRAM_CHAT_ID` - Telegram chat id where leads should be sent
- `ALLOWED_ORIGIN` - optional comma-separated origins, for example `https://media.dmikhin.ru`

## API

- `POST /`
  - body:
    ```json
    {
      "fullName": "Denis",
      "email": "denis@example.com",
      "company": "Company",
      "role": "CEO",
      "telegram": "@username",
      "source": "business-game",
      "result": "Архитектор системы",
      "scores": {
        "controlLevel": 80,
        "systemThinking": 75,
        "leadership": 70,
        "growthReadiness": 78
      }
    }
    ```

## Frontend config

Set env var in the site:

`NEXT_PUBLIC_LEADS_API_URL=https://functions.yandexcloud.net/<your-function-id>`
