# Subscribers CRM function

Yandex Cloud Function for collecting and managing email subscribers in Object Storage.

## Env variables

- `SUBSCRIBERS_BUCKET` - bucket name (default uses `REACTIONS_BUCKET` or `media.dmikhin.ru`)
- `SUBSCRIBERS_STORE_KEY` - object key for JSON storage (default: `crm/subscribers.json`)
- `SUBSCRIBERS_ADMIN_TOKEN` - required admin token for protected CRM actions
- `TELEGRAM_BOT_TOKEN` - optional Telegram bot token for lead notifications
- `TELEGRAM_CHAT_ID` - optional chat/user/channel id where lead notifications should be sent
- `AWS_REGION` - default `ru-central1`
- `YC_ENDPOINT_URL` - default `https://storage.yandexcloud.net`
- `ALLOWED_ORIGIN` - comma-separated origins for CORS
- `YC_ACCESS_KEY_ID` / `YC_SECRET_ACCESS_KEY` (or AWS-compatible credentials)

## API

- `POST /` - create/update subscriber
  - body: `{ fullName, email, source, tags?, notes? }`
  - if `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` are configured, each created/updated contact also sends a Telegram notification
- `GET /` - list contacts with filters (requires `Authorization: Bearer <SUBSCRIBERS_ADMIN_TOKEN>`)
  - query: `q`, `status`, `source`, `tag`
- `PUT /?id=<contactId>` - update contact (requires admin token)
  - body: `{ fullName?, email?, status?, source?, tags?, notes? }`
- `GET /?action=export&format=csv|json|emails` - export contacts (requires admin token)
  - `emails` returns newline-separated email list for quick import to mailing services

Recommended auth header for browser/admin panel: `X-CRM-Token: <SUBSCRIBERS_ADMIN_TOKEN>`.
(`Authorization` may be intercepted by cloud gateway policies in some setups.)

## Frontend config

Set env var in site:

`NEXT_PUBLIC_SUBSCRIBERS_API_URL=https://functions.yandexcloud.net/<your-function-id>`
