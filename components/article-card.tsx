import Image from "next/image";
import Link from "next/link";
import { CATEGORY_SHORT_LABELS, CATEGORY_THEME, type Category } from "@/lib/constants";
import type { ArticleSummary } from "@/lib/content";
import { formatDate } from "@/lib/utils";

type ArticleCardProps = {
  article: ArticleSummary;
};

export function ArticleCard({ article }: ArticleCardProps): JSX.Element {
  const category = article.frontmatter.category as Category;
  const theme = CATEGORY_THEME[category];
  const categoryLabel = CATEGORY_SHORT_LABELS[category];

  return (
    <article
      className="mag-hover fade-in group overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white shadow-[0_22px_50px_rgba(15,23,42,0.08)]"
      style={{ boxShadow: `0 24px 48px -28px ${theme.glow}` }}
    >
      <Link href={`/article/${article.slug}`} className="block">
        <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
          <Image
            src={article.frontmatter.cover}
            alt={article.frontmatter.title}
            fill
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/28 via-transparent to-transparent" />
        </div>

        <div className="space-y-4 bg-white p-5 md:p-6">
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
            <span>{formatDate(article.frontmatter.date)}</span>
            <span className="text-slate-300">•</span>
            <span>{article.frontmatter.readingTime} мин</span>
          </div>

          <div className="space-y-3">
            <span
              className={`inline-flex shrink-0 items-center rounded-full px-3 py-1 text-[0.72rem] font-bold uppercase tracking-[0.14em] shadow-sm ${theme.chip}`}
            >
              {categoryLabel}
            </span>
            <h3 className="max-w-[20ch] text-[1.7rem] font-black leading-[1.03] tracking-tight text-slate-900">
              {article.frontmatter.title}
            </h3>
          </div>

          <p className="line-clamp-3 text-[1rem] leading-7 text-slate-600">
            {article.frontmatter.excerpt}
          </p>

          <div className="flex items-center justify-between gap-3 pt-2">
            <span className={`h-2 flex-1 rounded-full bg-gradient-to-r ${theme.line}`} />
            <span className="text-sm font-semibold text-slate-700 transition group-hover:text-slate-900">
              Читать разбор
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
