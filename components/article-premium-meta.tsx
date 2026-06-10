import { CATEGORY_LABELS, type Category } from "@/lib/constants";
import type { ArticleSummary } from "@/lib/content";
import { getArticlePremiumMeta } from "@/lib/journal-architecture";
import { formatDate } from "@/lib/utils";

type ArticlePremiumMetaProps = {
  article: ArticleSummary;
};

export function ArticlePremiumMeta({ article }: ArticlePremiumMetaProps): JSX.Element {
  const category = article.frontmatter.category as Category;
  const meta = getArticlePremiumMeta(article);
  const items = [
    CATEGORY_LABELS[category],
    formatDate(article.frontmatter.date),
    article.frontmatter.author || "Денис Михин",
    `${article.frontmatter.readingTime} мин чтения`,
    meta.level,
    meta.format,
    meta.seriesTitle ? `Серия: ${meta.seriesTitle}` : null
  ].filter(Boolean);

  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span
          key={item}
          className="rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-slate-600 shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
        >
          {item}
        </span>
      ))}
    </div>
  );
}
