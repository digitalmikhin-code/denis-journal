import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/article-card";
import { CoursePromoBanner } from "@/components/course-promo-banner";
import { CATEGORY_LABELS, type Category } from "@/lib/constants";
import { CATEGORY_SECTION_PROMO_KEYS, SECTION_COURSE_PROMOS } from "@/lib/course-promos";
import { getArticlesByCategory } from "@/lib/content";

type Props = {
  params: {
    category: Category;
  };
};

export function generateStaticParams(): Array<{ category: Category }> {
  return (Object.keys(CATEGORY_LABELS) as Category[]).map((category) => ({ category }));
}

export function generateMetadata({ params }: Props): Metadata {
  const category = params.category;
  const label = CATEGORY_LABELS[category];
  if (!label) {
    return {};
  }
  return {
    title: label,
    alternates: {
      canonical: `/category/${category}`
    }
  };
}

export default function CategoryPage({ params }: Props): JSX.Element {
  const category = params.category;
  if (!CATEGORY_LABELS[category]) {
    notFound();
  }
  const items = getArticlesByCategory(category);
  const sectionPromoKey = CATEGORY_SECTION_PROMO_KEYS[category];
  const sectionPromo = sectionPromoKey ? SECTION_COURSE_PROMOS[sectionPromoKey] : null;

  return (
    <div className="space-y-6">
      <header className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">Рубрика</p>
        <h1 className="text-4xl font-extrabold tracking-tight">{CATEGORY_LABELS[category]}</h1>
        <p className="text-slate-600 dark:text-slate-300">
          Всего материалов: {items.length}
        </p>
      </header>
      {sectionPromo ? (
        <CoursePromoBanner
          {...sectionPromo}
          label={`Курс по теме: ${CATEGORY_LABELS[category]}`}
          ctaLabel="Открыть курс"
        />
      ) : null}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {items.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </div>
  );
}
