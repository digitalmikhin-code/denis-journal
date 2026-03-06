import Link from "next/link";
import { ArticleCard } from "@/components/article-card";
import { LocalPostsFeed } from "@/components/local-posts-feed";
import { CATEGORY_LABELS, TELEGRAM_CHANNEL_URL } from "@/lib/constants";
import { getFeaturedArticles, getLatestArticles } from "@/lib/content";

export default function HomePage(): JSX.Element {
  const latest = getLatestArticles(10);
  const featured = getFeaturedArticles(3);
  const newest = latest[0];

  return (
    <div className="space-y-12">
      <section className="ambient-grid relative overflow-hidden rounded-[2rem] border border-slate-200/80 bg-gradient-to-br from-white via-rose-50 to-sky-50 p-8 shadow-soft dark:border-slate-800 md:p-10">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-sky-400/20 blur-3xl" />
        <div className="pointer-events-none absolute left-1/3 top-2/3 h-56 w-56 rounded-full bg-emerald-300/20 blur-3xl" />

        <div className="relative grid gap-6 md:grid-cols-[1.25fr_0.75fr]">
          <div className="fade-in space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">Медиа-портал</p>
            <h1 className="serif-display max-w-[16ch] text-5xl font-bold leading-[0.95] tracking-tight md:text-7xl">
              Идеи, кейсы и практика роста
            </h1>
            <p className="max-w-reading text-lg text-slate-700 dark:text-slate-300">
              Профессиональный блог о карьере, управлении, мышлении и практическом ИИ. Редакционный
              формат: сильные разборы, кейсы и прикладные идеи, которые можно использовать сразу.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/articles"
                className="rounded-xl bg-gradient-to-r from-brand to-rose-500 px-5 py-3 text-sm font-semibold text-white transition hover:from-brand-dark hover:to-rose-600"
              >
                Смотреть статьи
              </Link>
              <Link
                href={TELEGRAM_CHANNEL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-cyan-300 bg-cyan-50 px-5 py-3 text-sm font-semibold text-cyan-700 transition hover:-translate-y-px hover:border-cyan-500 dark:border-cyan-800 dark:bg-cyan-950/40 dark:text-cyan-300"
              >
                Подписаться на Telegram-канал «Scrum База»
              </Link>
            </div>
          </div>

          <aside className="glass fade-in rounded-3xl bg-gradient-to-br from-white/90 to-fuchsia-50/70 p-6">
            <h2 className="serif-display text-3xl font-semibold tracking-tight">Новая статья</h2>
            {newest ? (
              <article className="mt-5 rounded-xl border border-slate-200/80 bg-white/70 p-4 dark:border-slate-700 dark:bg-slate-900/70">
                <p className="text-xs uppercase tracking-wide text-brand">
                  {CATEGORY_LABELS[newest.frontmatter.category]}
                </p>
                <h3 className="mt-2 text-xl font-semibold leading-tight">
                  <Link href={`/article/${newest.slug}`} className="hover:text-brand">
                    {newest.frontmatter.title}
                  </Link>
                </h3>
                <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
                  {newest.frontmatter.excerpt}
                </p>
              </article>
            ) : null}
            <h3 className="mt-6 text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">
              Рекомендованные
            </h3>
            <div className="mt-3 space-y-4">
              {featured.map((item) => (
                <article
                  key={item.slug}
                  className="rounded-xl border border-slate-200/80 bg-white/70 p-3 dark:border-slate-700 dark:bg-slate-900/70"
                >
                  <p className="text-xs uppercase tracking-wide text-brand">
                    {CATEGORY_LABELS[item.frontmatter.category]}
                  </p>
                  <h4 className="mt-1 text-base font-semibold leading-tight">
                    <Link href={`/article/${item.slug}`} className="hover:text-brand">
                      {item.frontmatter.title}
                    </Link>
                  </h4>
                </article>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="serif-display text-4xl font-semibold tracking-tight">Последние публикации</h2>
          <Link href="/articles" className="text-sm font-semibold text-brand hover:underline">
            Все статьи →
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {latest.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </section>

      <LocalPostsFeed />

      <section className="space-y-5 pb-4">
        <h2 className="serif-display text-4xl font-semibold tracking-tight">Рубрики</h2>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {Object.entries(CATEGORY_LABELS).map(([slug, label]) => (
            <Link
              key={slug}
              href={`/category/${slug}`}
              className="mag-hover group rounded-2xl border border-slate-200 bg-gradient-to-br from-white via-white to-brand-soft/60 p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900"
            >
              <p className="mb-2 text-xs uppercase tracking-[0.16em] text-brand">Раздел</p>
              <h3 className="text-3xl font-bold tracking-tight">{label}</h3>
              <p className="mt-2 text-sm text-slate-500 transition group-hover:text-slate-700 dark:group-hover:text-slate-200">
                Перейти в раздел {label.toLowerCase()}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
