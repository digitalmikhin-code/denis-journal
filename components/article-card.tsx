import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import type { ArticleSummary } from "@/lib/content";

type ArticleCardProps = {
  article: ArticleSummary;
};

export function ArticleCard({ article }: ArticleCardProps): JSX.Element {
  const tone: Record<string, string> = {
    career: "from-cyan-400 to-blue-500",
    management: "from-emerald-400 to-green-500",
    thinking: "from-violet-400 to-purple-500",
    ai: "from-indigo-400 to-sky-500",
    projects: "from-amber-400 to-orange-500",
    cases: "from-rose-400 to-pink-500"
  };

  const icon: Record<string, string> = {
    career: "◆",
    management: "●",
    thinking: "✦",
    ai: "◉",
    projects: "▲",
    cases: "⬢"
  };

  return (
    <article className="mag-hover fade-in overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-soft dark:border-slate-800 dark:bg-slate-900">
      <Link href={`/article/${article.slug}`} className="block">
        <div className="group relative aspect-[16/10] overflow-hidden">
          <Image
            src={article.frontmatter.cover}
            alt={article.frontmatter.title}
            fill
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/45 via-transparent to-transparent" />

          <div className="absolute left-4 top-4 flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-sm font-bold text-slate-800 backdrop-blur">
              {icon[article.frontmatter.category] || "●"}
            </span>
            <span className={`h-2 w-16 rounded-full bg-gradient-to-r ${tone[article.frontmatter.category] || "from-brand to-rose-500"}`} />
          </div>

          <span className={`absolute bottom-4 left-4 h-1.5 w-24 rounded-full bg-gradient-to-r ${tone[article.frontmatter.category] || "from-brand to-rose-500"}`} />
        </div>
      </Link>

      <div className="color-card space-y-2 p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          {formatDate(article.frontmatter.date)} · {article.frontmatter.readingTime} мин
        </p>
        <h3 className="text-2xl font-bold leading-tight tracking-tight">
          <Link href={`/article/${article.slug}`} className="hover:text-brand">
            {article.frontmatter.title}
          </Link>
        </h3>
      </div>
    </article>
  );
}
