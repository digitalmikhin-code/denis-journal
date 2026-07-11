import Image from "next/image";
import Link from "next/link";
import { CATEGORY_SHORT_LABELS, CATEGORY_THEME, type Category } from "@/lib/constants";
import type { ArticleSummary } from "@/lib/content";
import { getArticlePremiumMeta } from "@/lib/journal-architecture";
import { formatDate } from "@/lib/utils";

type ArticleCardProps = {
  article: ArticleSummary;
};

export function ArticleCard({ article }: ArticleCardProps): JSX.Element {
  const category = article.frontmatter.category as Category;
  const theme = CATEGORY_THEME[category];
  const categoryLabel = CATEGORY_SHORT_LABELS[category];
  const premiumMeta = getArticlePremiumMeta(article);

  return (
    <article
      className="mag-hover fade-in group overflow-hidden border border-slate-200/90 bg-white shadow-[0_18px_44px_rgba(9,22,43,0.06)] transition hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900"
      style={{ boxShadow: `0 18px 44px -30px ${theme.glow}` }}
    >
      <Link href={`/article/${article.slug}`} className="block">
        <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
          <Image
            src={article.frontmatter.cover}
            alt={article.frontmatter.title}
            fill
            className="object-cover saturate-[0.82] transition duration-500 group-hover:scale-[1.02] group-hover:saturate-100"
          />
          <div className={`absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r ${theme.line}`} />
        </div>

        <div className="space-y-4 bg-white p-5 dark:bg-slate-900 md:p-6">
          <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3 text-[0.7rem] font-semibold uppercase text-slate-500 dark:border-slate-800">
            <span>{formatDate(article.frontmatter.date)}</span>
            <span>/</span>
            <span>{article.frontmatter.readingTime} мин</span>
            <span>/</span>
            <span>{premiumMeta.format}</span>
          </div>

          <div className="space-y-3">
            <span
              className="inline-flex shrink-0 items-center border-l-4 bg-slate-50 px-3 py-1 text-[0.68rem] font-black uppercase tracking-[0.08em] dark:bg-slate-950"
              style={{
                color: theme.badgeText,
                borderColor: theme.badgeBorder,
                borderLeftColor: theme.badgeText
              }}
            >
              {categoryLabel}
            </span>
            <h3 className="max-w-[22ch] text-[1.55rem] font-black leading-[1.08] text-slate-950 dark:text-slate-50">
              {article.frontmatter.title}
            </h3>
          </div>

          <p className="line-clamp-3 text-[1rem] leading-7 text-slate-600 dark:text-slate-300">
            {article.frontmatter.excerpt}
          </p>

          <div className="flex items-center justify-between gap-3 pt-2">
            <span className={`h-px flex-1 bg-gradient-to-r ${theme.line}`} />
            <span className="text-sm font-bold text-brand transition group-hover:text-brand-dark">
              Читать разбор
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
