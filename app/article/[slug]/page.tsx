import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { ArticleAuthorCard } from "@/components/article-author-card";
import { ArticleCard } from "@/components/article-card";
import { ArticleRelatedPrograms } from "@/components/article-related-programs";
import { ArticleTableOfContents } from "@/components/article-table-of-contents";
import { ArticleTakeaways } from "@/components/article-takeaways";
import { ArticleTelegramCta } from "@/components/article-telegram-cta";
import { ArticleWorkTasks, type ArticleWorkTask } from "@/components/article-work-tasks";
import { MetrikaGoal } from "@/components/metrika-goal";
import { ReadingProgress } from "@/components/reading-progress";
import { RecommendationBlock } from "@/components/recommendation-block";
import { SkillCardSection } from "@/components/skill-card-section";
import { mdxComponents } from "@/components/mdx-components";
import {
  CATEGORY_LABELS,
  CATEGORY_SHORT_LABELS,
  CATEGORY_THEME,
  SITE_NAME,
  SITE_URL,
  type Category
} from "@/lib/constants";
import {
  getAllArticles,
  getArticleBySlug,
  getRelatedArticles,
  type Article,
  type ArticleNextStep as ArticleNextStepData,
  type ArticleSummary
} from "@/lib/content";
import { STEPIK_COURSES, type StepikCourse, type StepikCourseCategory } from "@/lib/stepik-courses";
import { getSkillsForArticle } from "@/lib/skills";
import { getRecommendation } from "@/lib/recommendations";
import { addTableOfContentsAnchors } from "@/lib/table-of-contents";
import { calculateWordCount, formatDate } from "@/lib/utils";

type Props = {
  params: { slug: string };
};

const LONG_ARTICLE_WORDS = 1500;

const WORK_TASKS: Record<string, ArticleWorkTask> = {
  new_manager: {
    id: "new_manager",
    title: "Меня повысили до руководителя",
    text: "Понять новую роль, ответственность и первые управленческие решения.",
    href: "/solutions/promoted-manager"
  },
  ai: {
    id: "ai",
    title: "Нужно внедрить ИИ",
    text: "Отделить практичные сценарии применения ИИ от шума и моды.",
    href: "/solutions/implement-ai"
  },
  project_management: {
    id: "project_management",
    title: "Хочу перейти в управление проектами",
    text: "Собрать базу по срокам, рискам, коммуникации и результату.",
    href: "/solutions/project-management"
  },
  agile: {
    id: "agile",
    title: "Не понимаю Agile",
    text: "Разобраться с Scrum, Kanban и гибкостью без ритуального театра.",
    href: "/solutions/implement-agile"
  },
  responsibility: {
    id: "responsibility",
    title: "Команда не берет ответственность",
    text: "Найти, где теряются владельцы, договоренности и контроль результата.",
    href: "/solutions/team-responsibility"
  },
  time: {
    id: "time",
    title: "Постоянно не хватает времени",
    text: "Снизить перегруз и вернуть управляемость задачам.",
    href: "/solutions/time-management"
  },
  product: {
    id: "product",
    title: "Хочу стать Product Manager",
    text: "Перейти от задач к ценности, пользователю, гипотезам и метрикам.",
    href: "/solutions/product-manager"
  },
  system: {
    id: "system",
    title: "Нужно выстроить систему управления",
    text: "Связать цели, ритм, ответственность, метрики и исполнение.",
    href: "/solutions/management-system"
  }
};

const CATEGORY_TASKS: Record<Category, string[]> = {
  career: ["new_manager", "time", "responsibility", "product"],
  management: ["responsibility", "time", "system", "project_management"],
  thinking: ["system", "responsibility", "time", "new_manager"],
  agile: ["agile", "responsibility", "project_management", "system"],
  architecture: ["system", "project_management", "responsibility", "ai"],
  cases: ["system", "responsibility", "project_management", "time"],
  ai: ["ai", "system", "time", "project_management"]
};

const CATEGORY_PROGRAMS: Record<Category, StepikCourseCategory[]> = {
  career: ["management", "personal-brand", "project-management"],
  management: ["management", "project-management", "okr-strategy"],
  thinking: ["systems-thinking", "management", "product-thinking"],
  agile: ["agile-scrum-kanban", "safe-scaling", "systems-thinking"],
  architecture: ["systems-thinking", "okr-strategy", "project-management"],
  cases: ["project-management", "management", "agile-scrum-kanban"],
  ai: ["ai-prompting", "systems-thinking", "management"]
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
    robots: {
      index: true,
      follow: true
    },
    alternates: {
      canonical: `/article/${article.slug}`
    },
    openGraph: {
      title: article.frontmatter.title,
      description: article.frontmatter.excerpt,
      url: `${SITE_URL}/article/${article.slug}`,
      siteName: SITE_NAME,
      type: "article",
      images: [{ url: `${SITE_URL}${article.frontmatter.cover}` }]
    },
    twitter: {
      card: "summary_large_image",
      title: article.frontmatter.title,
      description: article.frontmatter.excerpt,
      images: [`${SITE_URL}${article.frontmatter.cover}`]
    }
  };
}

export default function ArticlePage({ params }: Props): JSX.Element {
  const article = getArticleBySlug(params.slug);
  if (!article || article.frontmatter.draft) {
    notFound();
  }

  const allArticles = getAllArticles(false);
  const category = article.frontmatter.category as Category;
  const articleUrl = `${SITE_URL}/article/${article.slug}`;
  const articleBody = addTableOfContentsAnchors(article.content);
  const shouldShowToc = calculateWordCount(article.content) > LONG_ARTICLE_WORDS;
  const workTasks = buildWorkTasks(article, category);
  const relatedPrograms = buildRelatedPrograms(article, category);
  const relatedArticles = buildRelatedArticles(article, allArticles);
  const articleSkills = getSkillsForArticle(article, 4);
  const recommendation = getRecommendation("article", article.slug);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.frontmatter.title,
    description: article.frontmatter.excerpt,
    datePublished: article.frontmatter.date,
    dateModified: article.frontmatter.date,
    inLanguage: "ru-RU",
    mainEntityOfPage: articleUrl,
    image: [`${SITE_URL}${article.frontmatter.cover}`],
    author: {
      "@type": "Person",
      name: article.frontmatter.author
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Главная",
        item: SITE_URL
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Статьи",
        item: `${SITE_URL}/articles`
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.frontmatter.title,
        item: articleUrl
      }
    ]
  };

  return (
    <div className="space-y-12">
      <MetrikaGoal
        goal="article_view"
        params={{
          article_title: article.frontmatter.title,
          article_url: articleUrl,
          article_category: category
        }}
      />
      <ReadingProgress targetId="article-content" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <article className="space-y-10">
        <Breadcrumbs title={article.frontmatter.title} />
        <ArticleHero article={article} category={category} />

        {shouldShowToc ? (
          <div className="xl:hidden">
            <ArticleTableOfContents items={articleBody.items} />
          </div>
        ) : null}

        <div className="article-reading-layout grid gap-8 xl:grid-cols-[minmax(0,1fr)_300px]">
          <div
            id="article-content"
            className="rounded-[2rem] border border-slate-200/80 bg-white px-6 py-8 shadow-[0_22px_48px_rgba(15,23,42,0.06)] dark:border-slate-800 dark:bg-slate-900 md:px-10"
          >
            <div className="prose-journal">
              <MDXRemote
                source={articleBody.content}
                components={mdxComponents}
                options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
              />
            </div>
          </div>

          {shouldShowToc ? (
            <aside className="hidden xl:sticky xl:top-24 xl:block xl:self-start">
              <ArticleTableOfContents items={articleBody.items} />
            </aside>
          ) : null}
        </div>

        <div className="space-y-8">
          <ArticleTakeaways items={article.frontmatter.takeaways} />
          <SkillCardSection skills={articleSkills} />
          <RecommendationBlock recommendation={recommendation} />
          <ArticleWorkTasks tasks={workTasks} />
          <ArticleRelatedPrograms articleTitle={article.frontmatter.title} courses={relatedPrograms} />

          {relatedArticles.length > 0 ? (
            <section id="related-articles" className="space-y-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                  Читайте также
                </p>
                <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950 dark:text-slate-50">
                  Материалы по теме
                </h2>
              </div>
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                {relatedArticles.map((item) => (
                  <ArticleCard key={item.slug} article={item} />
                ))}
              </div>
            </section>
          ) : null}

          <ArticleTelegramCta />
          <ArticleAuthorCard author={article.frontmatter.author || "Денис Михин"} />
        </div>
      </article>
    </div>
  );
}

function ArticleHero({ article, category }: { article: Article; category: Category }): JSX.Element {
  const theme = CATEGORY_THEME[category];

  return (
    <header className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_22px_54px_rgba(15,23,42,0.07)] dark:border-slate-800 dark:bg-slate-900 md:p-8">
      <Link
        href="/articles"
        className="inline-flex rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700 transition hover:border-slate-400 dark:border-slate-700 dark:text-slate-200"
      >
        ← Ко всем статьям
      </Link>
      <div className="mt-7 max-w-4xl">
        <div className="flex flex-wrap items-center gap-3">
          <span
            className={`inline-flex rounded-full border px-4 py-1.5 text-xs font-bold uppercase tracking-[0.16em] ${theme.chip}`}
          >
            {CATEGORY_SHORT_LABELS[category]}
          </span>
          <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
            {article.frontmatter.author || "Денис Михин"} · {formatDate(article.frontmatter.date)} ·{" "}
            {article.frontmatter.readingTime} мин чтения
          </span>
        </div>
        <h1 className="mt-5 text-4xl font-black leading-[1.02] tracking-tight text-slate-950 dark:text-slate-50 md:text-6xl">
          {article.frontmatter.title}
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-700 dark:text-slate-300 md:text-xl">
          {article.frontmatter.excerpt}
        </p>
      </div>
    </header>
  );
}

function Breadcrumbs({ title }: { title: string }): JSX.Element {
  return (
    <nav className="flex flex-wrap items-center gap-2 text-sm font-bold text-slate-500 dark:text-slate-400" aria-label="Хлебные крошки">
      <Link href="/" className="hover:text-brand">
        Главная
      </Link>
      <span>/</span>
      <Link href="/articles" className="hover:text-brand">
        Статьи
      </Link>
      <span>/</span>
      <span className="line-clamp-1 text-slate-800 dark:text-slate-200">{title}</span>
    </nav>
  );
}

function buildNextStep(article: Article, category: Category): ArticleNextStepData {
  if (article.frontmatter.nextStep) {
    return article.frontmatter.nextStep;
  }

  const course = buildRelatedPrograms(article, category)[0];

  if (course) {
    return {
      type: "program",
      label: course.title,
      href: course.url,
      text: course.result
    };
  }

  return {
    type: "topic",
    label: `Изучить направление: ${CATEGORY_LABELS[category]}`,
    href: `/category/${category}`,
    text: "Перейдите к материалам той же темы и соберите следующий шаг развития."
  };
}

function buildWorkTasks(article: Article, category: Category): ArticleWorkTask[] {
  const ids = article.frontmatter.workTasks?.length ? article.frontmatter.workTasks : CATEGORY_TASKS[category];
  return ids.map((id) => WORK_TASKS[id]).filter((item): item is ArticleWorkTask => Boolean(item)).slice(0, 4);
}

function buildRelatedPrograms(article: Article, category: Category): StepikCourse[] {
  if (article.frontmatter.programIds?.length) {
    const idSet = new Set(article.frontmatter.programIds);
    return STEPIK_COURSES.filter((course) => idSet.has(course.id)).slice(0, 3);
  }

  const categories = CATEGORY_PROGRAMS[category];
  return [...STEPIK_COURSES]
    .filter((course) => categories.includes(course.category))
    .sort((left, right) => (right.learners ?? 0) - (left.learners ?? 0))
    .slice(0, 3);
}

function buildRelatedArticles(article: Article, allArticles: Article[]): ArticleSummary[] {
  if (article.frontmatter.relatedSlugs?.length) {
    const relatedBySlug = article.frontmatter.relatedSlugs
      .map((slug) => allArticles.find((item) => item.slug === slug))
      .filter((item): item is Article => Boolean(item));

    if (relatedBySlug.length > 0) {
      return relatedBySlug.slice(0, 4);
    }
  }

  return getRelatedArticles(article.slug, 4);
}
