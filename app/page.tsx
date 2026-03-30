import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArticleCard } from "@/components/article-card";
import {
  CATEGORY_LABELS,
  CATEGORY_SHORT_LABELS,
  CATEGORY_THEME,
  SITE_URL,
  TELEGRAM_CHANNEL_URL,
  type Category
} from "@/lib/constants";
import { getLatestArticles, type ArticleSummary } from "@/lib/content";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Журнал Дениса Михина",
  description:
    "Экспертный журнал Дениса Михина о карьере, управлении, системном мышлении, Agile, архитектуре решений и ИИ в управлении.",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "Журнал Дениса Михина",
    description:
      "Экспертный журнал Дениса Михина о карьере, управлении, системном мышлении, Agile, архитектуре решений и ИИ в управлении.",
    url: SITE_URL
  }
};

export default function HomePage(): JSX.Element {
  const latest = selectHomepageArticles(getLatestArticles(18));

  const newest = latest[0];
  const articleBlocks = buildHomepageArticleBlocks(latest);

  return (
    <div className="space-y-14">
      <section className="relative overflow-hidden rounded-[2.25rem] border border-[#f0c6d9] bg-[linear-gradient(135deg,#fff7fb_0%,#ffe5f1_28%,#eef9ff_70%,#f9f7ff_100%)] p-8 shadow-[0_34px_80px_rgba(15,23,42,0.08)] md:p-10">
        <div className="pointer-events-none absolute -right-16 top-0 h-72 w-72 rounded-full border-[18px] border-[#7fd3ff]/70" />
        <div className="pointer-events-none absolute bottom-[-160px] left-[-20px] h-72 w-72 rounded-full border-[14px] border-[#f2cf63]/65" />
        <div className="pointer-events-none absolute left-[56%] top-[18%] h-40 w-40 rounded-[2rem] border-2 border-slate-900/8 bg-white/35 backdrop-blur-sm" />

        <div className="relative grid gap-8 md:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <p className="text-sm font-semibold uppercase tracking-[0.26em] text-slate-500">
              Экспертный авторский журнал
            </p>
            <h1 className="max-w-[11ch] text-5xl font-black leading-[0.92] tracking-tight text-slate-900 md:text-7xl">
              Для руководителей и специалистов, которым нужны сильные решения
            </h1>
            <p className="max-w-[34ch] text-[1.45rem] leading-tight text-slate-800 md:text-[1.8rem]">
              Практические разборы для тех, кто хочет принимать точные решения, расти быстрее и видеть систему целиком в управлении, карьере и работе с ИИ.
            </p>
            <div className="grid max-w-3xl gap-3 md:grid-cols-3">
              {[
                "Чтобы принимать сильные решения в сложных управленческих ситуациях",
                "Чтобы расти в роли и карьере быстрее, а не годами на инерции",
                "Чтобы видеть систему целиком и устранять причины, а не симптомы"
              ].map((item, index) => (
                <div
                  key={item}
                  className={`rounded-[1.5rem] border p-4 text-sm font-medium leading-6 text-slate-800 shadow-sm ${
                    index === 0
                      ? "border-[#f2cf63] bg-[#fff4ce]"
                      : index === 1
                        ? "border-[#9fdcff] bg-[#eaf8ff]"
                        : "border-[#efb8d2] bg-[#fff0f7]"
                  }`}
                >
                  {item}
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3 pt-1">
              <Link
                href="/articles"
                className="rounded-2xl bg-slate-900 px-6 py-3 text-base font-bold text-white transition hover:bg-slate-800"
              >
                Читать журнал
              </Link>
              <Link
                href="/about"
                className="rounded-2xl border border-slate-900/15 bg-white/70 px-6 py-3 text-base font-semibold text-slate-800 transition hover:bg-white"
              >
                Кто такой Денис Михин
              </Link>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="rounded-[2rem] border border-slate-900/10 bg-white/80 p-6 shadow-[0_18px_40px_rgba(15,23,42,0.08)] backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                Позиция автора
              </p>
              <p className="mt-4 text-[1.65rem] font-black leading-[1.06] tracking-tight text-slate-900">
                Этот журнал для тех, кто не хочет управлять вслепую: здесь тексты, которые усиливают мышление, ускоряют рост и повышают качество решений.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-[#f7f5ff] p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#6d28d9]">
                    Фокус
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-700">
                    Руководители и сильные специалисты, которые отвечают за результат и хотят расти быстрее.
                  </p>
                </div>
                <div className="rounded-2xl bg-[#eef9ff] p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#0f5f93]">
                    Формат
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-700">
                    Авторские статьи, кейсы и рабочие инструменты по управлению, карьере, системному мышлению и ИИ.
                  </p>
                </div>
              </div>
            </div>

            {newest ? (
              <article className="rounded-[2rem] border border-slate-900/10 bg-slate-900 p-6 text-white shadow-[0_20px_45px_rgba(15,23,42,0.18)]">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
                  В центре внимания
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <span
                    className={`inline-flex rounded-full border px-3 py-1 text-[0.72rem] font-bold uppercase tracking-[0.14em] ${
                      CATEGORY_THEME[newest.frontmatter.category as Category].chipSoft
                    }`}
                  >
                    {CATEGORY_SHORT_LABELS[newest.frontmatter.category as Category]}
                  </span>
                  <span className="text-sm text-white/60">{formatDate(newest.frontmatter.date)}</span>
                </div>
                <h2 className="mt-4 text-3xl font-black leading-tight tracking-tight">
                  <Link href={`/article/${newest.slug}`} className="hover:text-[#f2cf63]">
                    {newest.frontmatter.title}
                  </Link>
                </h2>
                <p className="mt-3 text-base leading-7 text-white/78">{newest.frontmatter.excerpt}</p>
              </article>
            ) : null}
          </div>
        </div>
      </section>

      <section className="space-y-5">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Подборка</p>
            <h2 className="serif-display text-4xl font-semibold tracking-tight text-slate-900">
              Последние публикации
            </h2>
          </div>
          <Link href="/articles" className="text-sm font-semibold text-slate-700 hover:text-slate-900">
            Смотреть весь архив →
          </Link>
        </div>

        <div className="space-y-6">
          {articleBlocks.map((block, index) => {
            if (block.type === "grid") {
              return (
                <div key={`grid-${index}`} className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {block.articles.map((article) => (
                    <ArticleCard key={article.slug} article={article} />
                  ))}
                </div>
              );
            }

            const category = block.article.frontmatter.category as Category;
            const theme = CATEGORY_THEME[category];
            const isImageRight = block.wideIndex % 2 === 0;

            return (
              <article
                key={block.article.slug}
                className="fade-in overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white shadow-[0_24px_54px_rgba(15,23,42,0.08)]"
                style={{ boxShadow: `0 24px 54px -30px ${theme.glow}` }}
              >
                <Link
                  href={`/article/${block.article.slug}`}
                  className="grid gap-5 p-5 md:min-h-[295px] md:grid-cols-[0.38fr_0.62fr] md:items-center md:p-6"
                >
                  <div
                    className={`relative aspect-[16/9] overflow-hidden rounded-[1.6rem] ${
                      isImageRight ? "md:order-2" : "md:order-1"
                    } md:h-full md:aspect-auto`}
                  >
                    <Image
                      src={block.article.frontmatter.cover}
                      alt={block.article.frontmatter.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className={`space-y-4 ${isImageRight ? "md:order-1" : "md:order-2"}`}>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-sm font-medium text-slate-500">
                        {formatDate(block.article.frontmatter.date)}</span>
                    </div>
                    <span
                      className="inline-flex rounded-full border px-3 py-1 text-[0.72rem] font-bold uppercase tracking-[0.14em] shadow-sm"
                      style={{
                        backgroundColor: theme.badgeBg,
                        color: theme.badgeText,
                        borderColor: theme.badgeBorder
                      }}
                    >
                      {CATEGORY_SHORT_LABELS[category]}
                    </span>
                    <h3 className="max-w-[18ch] text-3xl font-black leading-[1.02] tracking-tight text-slate-900 md:text-[2.2rem]">
                      {block.article.frontmatter.title}
                    </h3>
                    <p className="max-w-[54ch] text-lg leading-8 text-slate-600">
                      {block.article.frontmatter.excerpt}
                    </p>
                    <div className="flex items-center gap-4 pt-1">
                      <span className={`h-2 w-28 rounded-full bg-gradient-to-r ${theme.line}`} />
                      <span className="text-sm font-semibold text-slate-700">Открыть материал</span>
                    </div>
                  </div>
                </Link>
              </article>
            );
          })}
        </div>
      </section>


      <section className="relative overflow-hidden rounded-[2rem] bg-[#6964d9] p-8 text-white shadow-[0_28px_60px_rgba(67,56,202,0.28)] md:p-10">
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full border-[10px] border-white/70" />
        <div className="pointer-events-none absolute -bottom-24 right-16 h-56 w-56 rounded-full border-[8px] border-white/55" />
        <div className="relative grid gap-6 md:grid-cols-[1.2fr_0.8fr] md:items-center">
          <div className="space-y-4">
            <h2 className="text-4xl font-extrabold leading-tight tracking-tight md:text-5xl">
              Подпишитесь на Telegram-канал Дениса
            </h2>
            <p className="max-w-[38ch] text-lg text-white/95">
              Если вам близок такой способ мышления и подачи, канал помогает не терять новые идеи,
              короткие наблюдения и практические разборы между большими публикациями.
            </p>
            <Link
              href={TELEGRAM_CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-2xl bg-[#2bd0e2] px-6 py-3 text-lg font-bold text-[#062c35] shadow-[0_6px_0_0_rgba(8,40,49,0.28)] transition hover:bg-[#22bfd0]"
            >
              Подписаться на канал
            </Link>
          </div>
          <div className="hidden md:flex md:justify-end">
            <div className="rounded-3xl border-4 border-[#2e2a82] bg-[#8c88ea] px-6 py-5 text-right shadow-[0_16px_0_0_rgba(39,34,106,0.35)]">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/80">ScrumBaza</p>
              <p className="mt-2 text-2xl font-extrabold leading-tight">Коротко, по делу, без инфошума</p>
              <p className="mt-2 text-sm text-white/90">Посты о карьере, менеджменте и AI для практики.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] bg-[#d7d7d7] p-8 pb-10 md:p-10">
        <h2 className="text-5xl font-extrabold tracking-tight text-slate-900">Рубрики</h2>
        <p className="mt-3 text-lg text-slate-600">Направления, из которых складывается редакционная карта журнала.</p>
        <div className="mt-7 flex flex-wrap gap-3">
          {(Object.keys(CATEGORY_LABELS) as Category[]).map((slug) => (
            <Link
              key={slug}
              href={`/category/${slug}`}
              className={`rounded-2xl border px-6 py-3 text-xl font-semibold leading-none transition hover:-translate-y-0.5 ${CATEGORY_THEME[slug].chipSoft}`}
            >
              {CATEGORY_LABELS[slug]}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}


type HomepageArticleBlock =
  | { type: "grid"; articles: ArticleSummary[] }
  | { type: "wide"; article: ArticleSummary; wideIndex: number };

function buildHomepageArticleBlocks(articles: ArticleSummary[]): HomepageArticleBlock[] {
  const blocks: HomepageArticleBlock[] = [];
  let wideIndex = 0;

  for (let index = 0; index < articles.length; index += 4) {
    const chunk = articles.slice(index, index + 4);

    if (chunk.length === 4) {
      blocks.push({ type: "grid", articles: chunk.slice(0, 3) });
      blocks.push({ type: "wide", article: chunk[3], wideIndex });
      wideIndex += 1;
      continue;
    }

    if (chunk.length > 0) {
      blocks.push({ type: "grid", articles: chunk });
    }
  }

  return blocks;
}

function selectHomepageArticles(articles: ArticleSummary[]): ArticleSummary[] {
  if (articles.length <= 3) {
    return articles;
  }

  const preferredCounts = [15, 12, 10, 9, 8, 6, 5, 4];
  const supportedRemainders = new Set([0, 3]);

  for (const count of preferredCounts) {
    if (articles.length >= count && supportedRemainders.has(count % 4)) {
      return articles.slice(0, count);
    }
  }

  for (let count = articles.length; count >= 4; count -= 1) {
    if (supportedRemainders.has(count % 4)) {
      return articles.slice(0, count);
    }
  }

  return articles.slice(0, 3);
}

