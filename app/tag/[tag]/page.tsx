import type { Metadata } from "next";
import { ArticleCard } from "@/components/article-card";
import { getAllTags, getArticlesByTag } from "@/lib/content";

type Props = {
  params: {
    tag: string;
  };
};

export function generateStaticParams(): Array<{ tag: string }> {
  return getAllTags().map((tag) => ({ tag }));
}

export function generateMetadata({ params }: Props): Metadata {
  return {
    title: `#${params.tag}`,
    alternates: {
      canonical: `/tag/${params.tag}`
    }
  };
}

export default function TagPage({ params }: Props): JSX.Element {
  const items = getArticlesByTag(params.tag);

  return (
    <div className="space-y-6">
      <header className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">Тег</p>
        <h1 className="text-4xl font-extrabold tracking-tight">#{params.tag}</h1>
        <p className="text-slate-600 dark:text-slate-300">Материалов: {items.length}</p>
      </header>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {items.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </div>
  );
}

