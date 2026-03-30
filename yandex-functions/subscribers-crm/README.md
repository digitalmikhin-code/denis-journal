# Subscribers CRM function

Yandex Cloud Function for collecting and managing email subscribers in Object Storage.

## Env variables

- `SUBSCRIBERS_BUCKET` - bucket name (default uses `REACTIONS_BUCKET` or `media.dmikhin.ru`)
- `SUBSCRIBERS_STORE_KEY` - object key for JSON storage (default: `crm/subscribers.json`)
- `AWS_REGION` - default `ru-central1`
- `YC_ENDPOINT_URL` - default `https://storage.yandexcloud.net`
- `ALLOWED_ORIGIN` - comma-separated origins for CORS
- `YC_ACCESS_KEY_ID` / `YC_SECRET_ACCESS_KEY` (or AWS-compatible credentials)

## API

- `POST /` - create/update subscriber
  - body: `{ fullName, email, source, tags?, notes? }`
- `GET /` - list contacts with filters
  - query: `q`, `status`, `source`, `tag`
- `PUT /?id=<contactId>` - update contact
  - body: `{ fullName?, email?, status?, source?, tags?, notes? }`
- `GET /?action=export&format=csv|json` - export contacts

## Frontend config

Set env var in site:

`NEXT_PUBLIC_SUBSCRIBERS_API_URL=https://functions.yandexcloud.net/<your-function-id>`

