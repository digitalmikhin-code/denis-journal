import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SearchClient } from "@/components/search-client";
import { getSearchIndex } from "@/lib/search-engine";
import { getSeoSearchPage, SEO_SEARCH_PAGES } from "@/lib/search-shared";

type SeoSearchPageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams(): Array<{ slug: string }> {
  return SEO_SEARCH_PAGES.map((page) => ({ slug: page.slug }));
}

export function generateMetadata({ params }: SeoSearchPageProps): Metadata {
  const page = getSeoSearchPage(params.slug);

  if (!page) {
    return {
      title: "Поиск",
      robots: {
        index: false,
        follow: true
      }
    };
  }

  return {
    title: page.title,
    description: page.description,
    robots: {
      index: true,
      follow: true
    },
    alternates: {
      canonical: `/search/${page.slug}`
    }
  };
}

export default function SeoSearchPage({ params }: SeoSearchPageProps): JSX.Element {
  const page = getSeoSearchPage(params.slug);

  if (!page) {
    notFound();
  }

  return (
    <div className="space-y-7">
      <header className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">Подборка материалов</p>
        <h1 className="text-4xl font-extrabold tracking-tight">{page.title}</h1>
        <p className="max-w-reading text-slate-600 dark:text-slate-300">{page.description}</p>
      </header>
      <SearchClient items={getSearchIndex()} initialQuery={page.query} />
    </div>
  );
}
