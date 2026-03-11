# Article reactions function

Yandex Cloud Function for storing article reactions in Object Storage.

## Runtime

- Node.js 22

## Entry point

- `index.handler`

## Environment variables

- `YC_ACCESS_KEY_ID`
- `YC_SECRET_ACCESS_KEY`
- `REACTIONS_BUCKET=media.dmikhin.ru`
- `YC_ENDPOINT_URL=https://storage.yandexcloud.net`
- `AWS_REGION=ru-central1`
- `ALLOWED_ORIGIN=https://media.dmikhin.ru`

## Behaviour

- `GET ?slug=<article-slug>` -> returns counts
- `POST { slug, reaction }` -> increments one reaction

