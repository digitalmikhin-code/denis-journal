import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/article-card";
import { CoursePromoBanner } from "@/components/course-promo-banner";
import { CATEGORY_LABELS, SITE_URL, type Category } from "@/lib/constants";
import { CATEGORY_SECTION_PROMO_KEYS, SECTION_COURSE_PROMOS } from "@/lib/course-promos";
import { getArticlesByCategory } from "@/lib/content";

const CATEGORY_DESCRIPTIONS: Record<Category, string> = {
  career: "Статьи Дениса Михина о карьерном росте: профессиональная репутация, инициатива, влияние и переход от специалиста к руководителю.",
  management: "Как управлять командой и проектами: цели, сроки, поток работы, метрики и условия для результата. Статьи Дениса Михина о практике управления.",
  thinking: "Системное мышление в управлении: как находить причины проблем, видеть взаимосвязи и ограничения, оценивать последствия решений. Статьи Дениса Михина.",
  agile: "Гибкие трансформации бизнеса: Agile, доверие в команде, постоянные улучшения и причины неудачных изменений. Авторские разборы Дениса Михина.",
  architecture: "Архитектура управленческих решений: роли, ответственность, приоритеты и устройство системы управления. Статьи Дениса Михина о проектировании бизнеса.",
  cases: "Разборы управленческих ситуаций: перегруженные проекты, работа команд, поиск причин проблем и последствия решений. Материалы Дениса Михина.",
  ai: "ИИ в работе руководителя: автоматизация, управление знаниями, организация работы команды и ответственность за решения. Статьи Дениса Михина."
};

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
    description: CATEGORY_DESCRIPTIONS[category],
    openGraph: {
      title: label,
      description: CATEGORY_DESCRIPTIONS[category],
      url: `${SITE_URL}/category/${category}/`,
      type: "website"
    },
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
      <PageBreadcrumbs items={[{ name: "Статьи", href: "/articles/" }, { name: CATEGORY_LABELS[category], href: `/category/${category}/` }]} />
      <header className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">Рубрика</p>
        <h1 className="text-4xl font-extrabold tracking-tight">{CATEGORY_LABELS[category]}</h1>
        <p className="max-w-3xl text-base leading-7 text-slate-700 dark:text-slate-300">
          {CATEGORY_DESCRIPTIONS[category]}
        </p>
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
