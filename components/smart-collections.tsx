import Link from "next/link";
import { CATEGORY_SHORT_LABELS, CATEGORY_THEME, type Category } from "@/lib/constants";
import type { ArticleSummary } from "@/lib/content";

export type SmartCollection = {
  title: string;
  description: string;
  label: string;
  href: string;
  accentClassName: string;
  articles: ArticleSummary[];
};

type SmartCollectionsProps = {
  collections: SmartCollection[];
};

export function SmartCollections({ collections }: SmartCollectionsProps): JSX.Element | null {
  const visibleCollections = collections.filter((collection) => collection.articles.length > 0);
  if (visibleCollections.length === 0) return null;

  return (
    <section className="overflow-hidden rounded-[2.25rem] border border-slate-200 bg-white p-5 shadow-[0_28px_70px_rgba(15,23,42,0.08)] md:p-7">
      <div className="grid gap-5 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            Умные подборки
          </p>
          <h2 className="mt-3 max-w-[14ch] text-3xl font-black leading-tight tracking-tight text-slate-900 md:text-5xl">
            Выберите свою траекторию
          </h2>
          <p className="mt-4 max-w-[46ch] text-base leading-8 text-slate-600">
            Не нужно начинать с архива. Выберите сценарий, который ближе к вашей задаче, и идите по
            готовой дорожке материалов.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {visibleCollections.map((collection) => (
            <Link
              key={collection.title}
              href={collection.href}
              className={`rounded-[1.5rem] border p-4 transition hover:-translate-y-0.5 hover:shadow-[0_16px_30px_rgba(15,23,42,0.08)] ${collection.accentClassName}`}
            >
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">
                {collection.label}
              </p>
              <h3 className="mt-2 text-xl font-black leading-tight tracking-tight text-slate-900">
                {collection.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{collection.description}</p>
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-4 xl:grid-cols-4">
        {visibleCollections.map((collection) => (
          <article
            key={collection.title}
            className="rounded-[1.75rem] border border-slate-200 bg-slate-50/80 p-4"
          >
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-base font-black tracking-tight text-slate-900">{collection.title}</h3>
              <Link href={collection.href} className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
                Все
              </Link>
            </div>

            <div className="mt-4 space-y-3">
              {collection.articles.slice(0, 3).map((article) => {
                const category = article.frontmatter.category as Category;
                const theme = CATEGORY_THEME[category];

                return (
                  <Link
                    key={article.slug}
                    href={`/article/${article.slug}`}
                    className="block rounded-[1.25rem] border border-white bg-white p-3 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-200"
                  >
                    <span
                      className="inline-flex rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em]"
                      style={{
                        backgroundColor: theme.badgeBg,
                        color: theme.badgeText,
                        borderColor: theme.badgeBorder
                      }}
                    >
                      {CATEGORY_SHORT_LABELS[category]}
                    </span>
                    <p className="mt-2 text-sm font-bold leading-5 text-slate-900">
                      {article.frontmatter.title}
                    </p>
                  </Link>
                );
              })}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
