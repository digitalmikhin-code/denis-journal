import { Suspense } from "react";
import type { Metadata } from "next";
import { ArticlesFilter } from "@/components/articles-filter";
import { CoursePromoBanner } from "@/components/course-promo-banner";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/constants";
import { SECTION_COURSE_PROMOS } from "@/lib/course-promos";
import { getAllArticles, getAllTags } from "@/lib/content";

export const metadata: Metadata = {
  title: "Все статьи",
  description: `Архив статей — ${SITE_DESCRIPTION}`,
  alternates: {
    canonical: "/articles"
  },
  openGraph: {
    title: `Все статьи | ${SITE_NAME}`,
    description: SITE_DESCRIPTION,
    url: "/articles"
  }
};

export default function ArticlesPage(): JSX.Element {
  const items = getAllArticles(false);
  const allTags = getAllTags();

  return (
    <div className="space-y-6">
      <header className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">Архив</p>
        <h1 className="text-4xl font-extrabold tracking-tight">Все статьи</h1>
        <p className="max-w-reading text-slate-600 dark:text-slate-300">
          Фильтруйте публикации по рубрикам, тегам и поисковому запросу.
        </p>
      </header>
      <CoursePromoBanner
        {...SECTION_COURSE_PROMOS.articles}
        label="Курс для читателей статей"
        ctaLabel="Изучить курс"
      />
      <Suspense fallback={null}>
        <ArticlesFilter items={items} allTags={allTags} />
      </Suspense>
    </div>
  );
}
