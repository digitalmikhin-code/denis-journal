# Журнал Дениса Михина (Next.js + MDX + Decap CMS)

Готовый медиа-портал с бесплатной админкой `/admin`, хранением контента в репозитории и деплоем на Cloudflare Pages/Netlify.

## Стек

- Next.js (App Router) + TypeScript
- TailwindCSS
- Контент: MDX в `content/articles`
- CMS: Decap CMS в `public/admin`
- Поиск: локальный prebuilt индекс `public/search-index.json`
- SEO: `robots.txt`, `sitemap.xml`, `feed.xml` генерируются скриптом

## Структура проекта

```text
.
├─ app/
│  ├─ about/page.tsx
│  ├─ article/[slug]/page.tsx
│  ├─ articles/page.tsx
│  ├─ category/[category]/page.tsx
│  ├─ search/page.tsx
│  ├─ tag/[tag]/page.tsx
│  ├─ training/page.tsx
│  ├─ globals.css
│  ├─ layout.tsx
│  ├─ not-found.tsx
│  └─ page.tsx
├─ components/
│  ├─ article-card.tsx
│  ├─ articles-filter.tsx
│  ├─ footer.tsx
│  ├─ mdx-components.tsx
│  ├─ search-client.tsx
│  └─ site-header.tsx
├─ content/
│  ├─ articles/
│  │  ├─ 2026-02-28-career-map-90-days.mdx
│  │  ├─ 2026-02-26-management-meetings-without-chaos.mdx
│  │  ├─ 2026-02-24-thinking-first-principles-in-work.mdx
│  │  ├─ 2026-02-22-ai-assistant-for-editorial-flow.mdx
│  │  ├─ 2026-02-20-projects-launch-checklist.mdx
│  │  └─ 2026-02-18-cases-scaling-team-operations.mdx
│  └─ pages/
│     ├─ about.mdx
│     └─ training.mdx
├─ lib/
│  ├─ constants.ts
│  ├─ content.ts
│  └─ utils.ts
├─ public/
│  ├─ admin/
│  │  ├─ config.yml
│  │  └─ index.html
│  └─ images/
│     ├─ covers/default-cover.svg
│     ├─ logo.svg
│     └─ uploads/.gitkeep
├─ scripts/
│  ├─ generate-content-assets.mjs
│  └─ generate-seo-assets.mjs
├─ .eslintrc.json
├─ .gitignore
├─ next.config.mjs
├─ package.json
├─ postcss.config.mjs
├─ tailwind.config.ts
├─ tsconfig.json
└─ README.md
```

## Контент-модель статьи

Файл: `content/articles/YYYY-MM-DD-slug.mdx`

```yaml
---
title: string
date: YYYY-MM-DD
category: career | management | thinking | ai | projects | cases
tags: string[]
excerpt: string
cover: /images/covers/...
draft: boolean
author: "Денис Михин"
featured: boolean
---
```

`readingTime` считается автоматически в рантайме/при генерации индекса.

## Локальный запуск

```bash
npm install
npm run dev
```

Прод-сборка:

```bash
npm run build
```

Результат статического экспорта: папка `out/`.

## Как работает админка `/admin`

Decap CMS лежит в `public/admin`.

Коллекции:
- `Articles` → `content/articles`
- `Pages` → `content/pages` (`about`, `training`)

Важно: для записи в GitHub репозиторий Decap нужен backend OAuth bridge.

Варианты бесплатно:
- Netlify Identity + Git Gateway (если используешь Netlify);
- Свой OAuth bridge/прокси (например, Cloudflare Worker).

В `public/admin/config.yml` замени:
- `repo: your-github-username/your-repo-name`
- `base_url: https://your-oauth-bridge.example.com`

## Деплой на Cloudflare Pages (приоритет)

1. Создай GitHub-репозиторий и залей код.
2. В Cloudflare: `Workers & Pages` → `Create` → `Pages` → `Connect to Git`.
3. Выбери репозиторий.
4. Build settings:
   - Framework preset: `Next.js (Static HTML Export)` или `None`
   - Build command: `npm run build`
   - Build output directory: `out`
   - Node version: `20`
5. Environment Variables:
   - `NEXT_PUBLIC_SITE_URL=https://blog.site.ru` (или твой домен)
6. Deploy.

## Альтернатива: Netlify

1. New site from Git → выбрать репозиторий.
2. Build command: `npm run build`
3. Publish directory: `out`
4. Env var: `NEXT_PUBLIC_SITE_URL=https://blog.site.ru`

## Подключение домена

### Вариант A (предпочтительно): `blog.site.ru`

1. В Cloudflare Pages → `Custom domains` → `Set up a custom domain`.
2. Добавь `blog.site.ru`.
3. Cloudflare сам создаст DNS-запись.

### Вариант B: `site.ru/blog`

Технически сложнее для статического Next-экспорта: нужен `basePath` и отдельный маршрут/прокси на уровне основного сайта.

Рекомендация: использовать отдельный поддомен `blog.site.ru`, это проще и надежнее для SEO/деплоя.

## SEO и производительность

- `sitemap.xml`, `robots.txt`, `feed.xml` генерируются на `postbuild`.
- Страницы статические, быстрые и кэшируемые.
- OpenGraph + canonical в metadata.
- Локальный поиск по prebuilt индексу, без внешних сервисов.

## Production checklist

- [ ] Задать `NEXT_PUBLIC_SITE_URL` боевого домена.
- [ ] Проверить `public/admin/config.yml` (`repo`, `base_url`).
- [ ] Проверить `/admin/` авторизацию и запись в репозиторий.
- [ ] Убедиться, что `sitemap.xml`, `robots.txt`, `feed.xml` доступны.
- [ ] Проверить OG-превью статей и canonical URLs.
- [ ] Протестировать мобильную версию и скорость (Lighthouse).

