import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { ArticleCard } from "@/components/article-card";
import { mdxComponents } from "@/components/mdx-components";
import { CATEGORY_LABELS, SITE_NAME } from "@/lib/constants";
import { getAllArticles, getArticleBySlug, getRelatedArticles } from "@/lib/content";
import { formatDate } from "@/lib/utils";

type Props = {
  params: { slug: string };
};

export function generateStaticParams(): Array<{ slug: string }> {
  return getAllArticles(false).map((article) => ({ slug: article.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const article = getArticleBySlug(params.slug);
  if (!article || article.frontmatter.draft) {
    return {};
  }

  return {
    title: article.frontmatter.title,
    description: article.frontmatter.excerpt,
    alternates: {
      canonical: `/article/${article.slug}`
    },
    openGraph: {
      title: article.frontmatter.title,
      description: article.frontmatter.excerpt,
      url: `/article/${article.slug}`,
      siteName: SITE_NAME,
      type: "article",
      images: [{ url: article.frontmatter.cover }]
    }
  };
}

export default function ArticlePage({ params }: Props): JSX.Element {
  const article = getArticleBySlug(params.slug);
  if (!article || article.frontmatter.draft) {
    notFound();
  }
  const related = getRelatedArticles(article.slug, 3);

  return (
    <div className="space-y-10">
      <article className="space-y-6">
        <header className="space-y-5">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
            {CATEGORY_LABELS[article.frontmatter.category]}
          </p>
          <h1 className="max-w-reading text-4xl font-extrabold tracking-tight md:text-6xl">
            {article.frontmatter.title}
          </h1>
          <p className="max-w-reading text-lg text-slate-600 dark:text-slate-300">
            {article.frontmatter.excerpt}
          </p>
          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
            <span>{formatDate(article.frontmatter.date)}</span>
            <span>·</span>
            <span>{article.frontmatter.readingTime} мин чтения</span>
            <span>·</span>
            <span>{article.frontmatter.author}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {article.frontmatter.tags.map((tag) => (
              <Link
                key={tag}
                href={`/tag/${tag}`}
                className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold hover:bg-brand-soft hover:text-brand dark:bg-slate-800"
              >
                #{tag}
              </Link>
            ))}
          </div>
          <div className="relative aspect-[16/8] overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
            <Image
              src={article.frontmatter.cover}
              alt={article.frontmatter.title}
              fill
              className="object-cover"
            />
          </div>
        </header>

        <div className="prose-journal">
          <MDXRemote
            source={article.content}
            components={mdxComponents}
            options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
          />
        </div>
      </article>

      {related.length > 0 && (
        <section className="space-y-5 border-t border-slate-200 pt-10 dark:border-slate-800">
          <h2 className="text-3xl font-bold tracking-tight">Похожие статьи</h2>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {related.map((item) => (
              <ArticleCard key={item.slug} article={item} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

