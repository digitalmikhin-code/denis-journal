import Link from "next/link";
import type { ArticleSummary } from "@/lib/content";
import { getArticleSeries } from "@/lib/journal-architecture";

type ArticleSeriesRouteProps = {
  current: ArticleSummary;
  articles: ArticleSummary[];
};

export function ArticleSeriesRoute({ current, articles }: ArticleSeriesRouteProps): JSX.Element | null {
  const series = getArticleSeries(current);

  if (!series) {
    return null;
  }

  return (
    <section className="rounded-[1.75rem] border border-slate-200 bg-[linear-gradient(135deg,#f7fbff_0%,#fff8e8_58%,#fff2f7_100%)] p-5 shadow-[0_16px_36px_rgba(15,23,42,0.06)] dark:border-slate-800 dark:bg-slate-900 dark:bg-none md:p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
        Серия материалов
      </p>
      <h2 className="mt-3 text-2xl font-black tracking-tight text-slate-900 dark:text-slate-50">
        {series.title}
      </h2>
      <p className="mt-3 max-w-[58ch] text-sm leading-7 text-slate-700 dark:text-slate-300">
        {series.description}
      </p>

      <div className="mt-5 grid gap-3 lg:grid-cols-2">
        <div className="rounded-[1.35rem] border border-white/80 bg-white/80 p-4 dark:border-slate-700 dark:bg-slate-800">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">Логика серии</p>
          <ol className="mt-3 space-y-2">
            {series.parts.map((part, index) => (
              <li key={part} className="flex gap-3 text-sm leading-6 text-slate-700 dark:text-slate-300">
                <span className="font-black text-slate-400">0{index + 1}</span>
                <span>{part}</span>
              </li>
            ))}
          </ol>
        </div>

        {articles.length > 0 ? (
          <div className="rounded-[1.35rem] border border-white/80 bg-white/80 p-4 dark:border-slate-700 dark:bg-slate-800">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">Продолжить в серии</p>
            <div className="mt-3 space-y-2">
              {articles.slice(0, 3).map((article) => (
                <Link
                  key={article.slug}
                  href={`/article/${article.slug}`}
                  className="block rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold leading-6 text-slate-800 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
                >
                  {article.frontmatter.title}
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
