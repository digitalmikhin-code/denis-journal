import Image from "next/image";
import Link from "next/link";
import { ArticleCard } from "@/components/article-card";
import { LocalPostsFeed } from "@/components/local-posts-feed";
import { CATEGORY_LABELS, TELEGRAM_CHANNEL_URL } from "@/lib/constants";
import { getFeaturedArticles, getLatestArticles } from "@/lib/content";
import { formatDate } from "@/lib/utils";

export default function HomePage(): JSX.Element {
  const latest = getLatestArticles(10);
  const featured = getFeaturedArticles(3);
  const newest = latest[0];

  return (
    <div className="space-y-12">
      <section className="relative overflow-hidden rounded-[2rem] border border-[#efb8d2] bg-[#f6c6dd] p-8 shadow-soft md:p-10">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full border-[12px] border-slate-900/15" />
        <div className="pointer-events-none absolute -bottom-28 right-10 h-72 w-72 rounded-full border-[8px] border-slate-900/15" />
        <div className="pointer-events-none absolute left-[50%] top-[58%] text-6xl text-slate-900/25">✧</div>

        <div className="relative grid gap-6 md:grid-cols-[1.25fr_0.75fr]">
          <div className="fade-in space-y-6">
            <p className="text-sm font-semibold tracking-tight text-slate-900/90">
              Авторский медиа-портал
            </p>
            <h1 className="max-w-[12ch] text-5xl font-extrabold leading-[0.96] tracking-tight text-slate-900 md:text-7xl">
              Идеи, кейсы и практика роста
            </h1>
            <p className="max-w-reading text-[1.95rem] leading-tight text-slate-900/90 md:text-[2.15rem]">
              Чтобы быстрее расти в карьере, управлении и работе с ИИ
            </p>
            <p className="max-w-reading text-lg text-slate-800/90">
              Профессиональный блог о карьере, управлении, мышлении и практическом ИИ. Редакционный
              формат: сильные разборы, кейсы и прикладные идеи, которые можно использовать сразу.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/articles"
                className="rounded-2xl bg-[#f2cf63] px-6 py-3 text-lg font-bold text-slate-900 shadow-[0_6px_0_0_rgba(26,26,26,0.16)] transition hover:bg-[#e8c24f]"
              >
                Смотреть статьи
              </Link>
              <Link
                href={TELEGRAM_CHANNEL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl border-2 border-slate-900/20 bg-white/50 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-white/70"
              >
                Подписаться на Telegram-канал ScrumBaza
              </Link>
            </div>
          </div>

          <aside className="fade-in rounded-3xl border-2 border-slate-900/10 bg-white/90 p-6 shadow-[0_20px_40px_rgba(24,20,32,0.12)]">
            <h2 className="serif-display text-3xl font-semibold tracking-tight text-slate-900">Новая статья</h2>
            {newest ? (
              <article className="mt-5 rounded-xl border border-slate-200/90 bg-white p-4">
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
                  className="rounded-xl border border-slate-200/90 bg-white p-3"
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
          {latest.map((article, index) => {
            const isWide = index > 0 && index % 4 === 0;
            if (!isWide) {
              return <ArticleCard key={article.slug} article={article} />;
            }
            const wideCardNumber = Math.floor(index / 4);
            const isImageRight = wideCardNumber % 2 === 0;

            return (
              <article
                key={article.slug}
                className="fade-in overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-soft md:col-span-2 md:h-[280px] xl:col-span-3"
              >
                <Link
                  href={`/article/${article.slug}`}
                  className="grid h-full gap-4 p-4 md:grid-cols-[0.34fr_0.66fr] md:items-center md:p-5"
                >
                  <div
                    className={`relative aspect-[16/9] overflow-hidden rounded-2xl ${
                      isImageRight ? "md:order-2" : "md:order-1"
                    } md:h-full md:aspect-auto`}
                  >
                    <Image
                      src={article.frontmatter.cover}
                      alt={article.frontmatter.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className={`space-y-3 overflow-hidden ${isImageRight ? "md:order-1" : "md:order-2"}`}>
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">
                      {CATEGORY_LABELS[article.frontmatter.category]} · {formatDate(article.frontmatter.date)}
                    </p>
                    <h3
                      className="text-2xl font-extrabold leading-tight tracking-tight text-slate-900 md:text-3xl"
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden"
                      }}
                    >
                      {article.frontmatter.title}
                    </h3>
                    <p
                      className="text-base text-slate-700"
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden"
                      }}
                    >
                      {article.frontmatter.excerpt}
                    </p>
                    <span className="inline-flex rounded-xl bg-[#f6f7fb] px-4 py-2 text-sm font-semibold text-slate-700">
                      Читать статью
                    </span>
                  </div>
                </Link>
              </article>
            );
          })}
        </div>
      </section>

      <LocalPostsFeed />

      <section className="relative overflow-hidden rounded-[2rem] bg-[#6964d9] p-8 text-white shadow-soft md:p-10">
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full border-[10px] border-white/75" />
        <div className="pointer-events-none absolute -bottom-24 right-16 h-56 w-56 rounded-full border-[8px] border-white/55" />
        <div className="relative grid gap-6 md:grid-cols-[1.2fr_0.8fr] md:items-center">
          <div className="space-y-4">
            <h2 className="text-4xl font-extrabold leading-tight tracking-tight md:text-5xl">
              Подпишитесь на Telegram-канал Дениса
            </h2>
            <p className="max-w-[38ch] text-lg text-white/95">
              Если вы еще не подписаны, обязательно подпишитесь, чтобы не пропускать интересные
              посты, новости и практические материалы.
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
        <p className="mt-3 text-lg text-slate-600">Выберите направление и переходите к материалам по теме.</p>
        <div className="mt-7 flex flex-wrap gap-3">
          {Object.entries(CATEGORY_LABELS).map(([slug, label]) => (
            <Link
              key={slug}
              href={`/category/${slug}`}
              className="rounded-2xl bg-[#efefef] px-7 py-3 text-[2rem] leading-none text-slate-500 transition hover:bg-white hover:text-slate-800"
            >
              {label}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
