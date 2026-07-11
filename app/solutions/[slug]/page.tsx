import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/article-card";
import { RecommendationBlock } from "@/components/recommendation-block";
import { TrackedLink } from "@/components/tracked-link";
import { buildStepikUtmUrl, getCourseIdFromUrl } from "@/lib/analytics";
import { getCareerPathPrograms, getRecommendedCareerPathForSolution } from "@/lib/career-paths";
import {
  CATEGORY_SHORT_LABELS,
  CATEGORY_THEME,
  SITE_NAME,
  SITE_URL,
  TELEGRAM_CHANNEL_URL
} from "@/lib/constants";
import { getAllArticles, type Article, type ArticleSummary } from "@/lib/content";
import { getRecommendation } from "@/lib/recommendations";
import { getAllSolutions, getRelatedSolutions, getSolution, type Solution } from "@/lib/solutions";
import { STEPIK_COURSES, type StepikCourse } from "@/lib/stepik-courses";

type Props = {
  params: { slug: string };
};

export function generateStaticParams(): Array<{ slug: string }> {
  return getAllSolutions().map((solution) => ({ slug: solution.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const solution = getSolution(params.slug);
  if (!solution) {
    return {};
  }

  return {
    title: `${solution.title} | ${SITE_NAME}`,
    description: solution.description,
    robots: {
      index: true,
      follow: true
    },
    alternates: {
      canonical: `/solutions/${solution.slug}`
    },
    openGraph: {
      title: solution.title,
      description: solution.description,
      url: `${SITE_URL}/solutions/${solution.slug}`,
      type: "article"
    }
  };
}

export default function SolutionPage({ params }: Props): JSX.Element {
  const solution = getSolution(params.slug);
  if (!solution) {
    notFound();
  }

  const theme = CATEGORY_THEME[solution.category];
  const articles = pickSolutionArticles(solution);
  const programs = pickSolutionPrograms(solution);
  const relatedSolutions = getRelatedSolutions(solution);
  const recommendedCareerPath = getRecommendedCareerPathForSolution(solution.slug);
  const recommendation = getRecommendation("solution", solution.slug);

  const pageUrl = `${SITE_URL}/solutions/${solution.slug}`;
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: solution.title,
    description: solution.description,
    url: pageUrl,
    step: solution.plan.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.title,
      text: step.text
    }))
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
        name: "Рабочие задачи",
        item: `${SITE_URL}/solutions`
      },
      {
        "@type": "ListItem",
        position: 3,
        name: solution.title,
        item: pageUrl
      }
    ]
  };

  return (
    <article className="space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([howToSchema, breadcrumbSchema]) }}
      />

      <section className="relative overflow-hidden border border-slate-200 bg-white p-6 shadow-[0_24px_70px_rgba(9,22,43,0.08)] dark:border-slate-800 dark:bg-slate-900 md:p-8">
        <div className="pointer-events-none absolute inset-0 ambient-grid opacity-50" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-36 w-64 bg-brand/95 [clip-path:polygon(42%_0,100%_0,100%_100%,0_100%)]" />
        <div className="relative">
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/solutions"
              className="border border-slate-300 bg-white px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-slate-600 transition hover:border-brand hover:text-brand dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300"
            >
              Рабочие задачи
            </Link>
            <span
              className="border px-3 py-1 text-xs font-bold uppercase tracking-[0.18em]"
              style={{
                backgroundColor: theme.badgeBg,
                borderColor: theme.badgeBorder,
                color: theme.badgeText
              }}
            >
              {CATEGORY_SHORT_LABELS[solution.category]}
            </span>
          </div>
          <h1 className="mt-5 max-w-4xl text-4xl font-black leading-[0.98] tracking-tight text-slate-950 dark:text-white md:text-6xl">
            {solution.title}
          </h1>
          <p className="mt-6 max-w-[68ch] text-base leading-8 text-slate-650 dark:text-slate-300 md:text-lg">
            {solution.heroText}
          </p>
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_18px_42px_rgba(15,23,42,0.06)]">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">Проблема</p>
          <p className="mt-4 text-lg leading-8 text-slate-700">{solution.problemIntro}</p>
        </div>
        <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">Симптомы</p>
          <ul className="mt-4 space-y-3">
            {solution.symptoms.map((symptom) => (
              <li key={symptom} className="flex gap-3 text-sm leading-6 text-slate-700">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-slate-950" />
                <span>{symptom}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_18px_42px_rgba(15,23,42,0.06)]">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">{solution.reasonsTitle}</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {solution.reasons.map((reason, index) => (
            <div key={reason} className="rounded-[1.4rem] border border-slate-200 bg-slate-50 p-5">
              <span className="text-sm font-black text-slate-400">0{index + 1}</span>
              <p className="mt-3 text-sm leading-6 text-slate-700">{reason}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_18px_42px_rgba(15,23,42,0.06)]">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">План</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">Что делать по шагам</h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-slate-500">
            План можно проходить сверху вниз или использовать как карту для самостоятельной диагностики.
          </p>
        </div>
        <div className="mt-6 space-y-4">
          {solution.plan.map((step, index) => (
            <Link
              key={step.title}
              href={step.href}
              className="group grid gap-4 rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-0.5 hover:border-slate-400 md:grid-cols-[4rem_1fr_auto]"
            >
              <span className="text-2xl font-black text-slate-300">{index + 1}</span>
              <span>
                <span className="block text-lg font-black text-slate-950">{step.title}</span>
                <span className="mt-1 block text-sm leading-6 text-slate-600">{step.text}</span>
              </span>
              <span className="self-center text-sm font-black text-slate-400 group-hover:text-slate-950">
                Читать →
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-3">
        {solution.materials.map((material) => (
          <Link
            key={material.title}
            href={material.href}
            className="rounded-[1.6rem] border border-slate-200 bg-white p-5 shadow-[0_18px_42px_rgba(15,23,42,0.06)] transition hover:-translate-y-1 hover:border-slate-400"
          >
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-slate-500">
              {material.status}
            </span>
            <h3 className="mt-4 text-xl font-black text-slate-950">{material.title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{material.description}</p>
          </Link>
        ))}
      </section>

      <section className="space-y-5">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">Статьи</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">Что почитать по теме</h2>
          </div>
          <Link href="/articles" className="hidden text-sm font-black text-slate-500 hover:text-slate-950 md:block">
            Все статьи →
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </section>

      <section className="space-y-5">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">Программы</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">Что пройти для развития</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {programs.map((course) => {
            const courseId = getCourseIdFromUrl(course.url);
            const href = buildStepikUtmUrl(course.url, {
              medium: "development_plan",
              campaign: "solution_page",
              content: courseId
            });

            return (
              <TrackedLink
                key={course.url}
                href={href}
                goal="stepik_click"
                params={{
                  course_id: courseId,
                  course_title: course.title,
                  location: "solution_page"
                }}
                className="rounded-[1.6rem] border border-slate-200 bg-white p-5 shadow-[0_18px_42px_rgba(15,23,42,0.06)] transition hover:-translate-y-1 hover:border-slate-400"
              >
                <span className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">
                  {(course.learners ?? 0).toLocaleString("ru-RU")} учеников
                </span>
                <h3 className="mt-3 text-xl font-black leading-tight text-slate-950">{course.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{course.summary}</p>
                <span className="mt-5 inline-flex text-sm font-black text-slate-950">Открыть курс →</span>
              </TrackedLink>
            );
          })}
        </div>
      </section>

      {recommendedCareerPath ? (
        <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_18px_42px_rgba(15,23,42,0.06)] md:p-8">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">
            Рекомендуемый маршрут
          </p>
          <div className="mt-4 grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <h2 className="text-3xl font-black tracking-tight text-slate-950">
                Для решения этой задачи подойдет маршрут «{recommendedCareerPath.title}»
              </h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
                {recommendedCareerPath.description}
              </p>
              <p className="mt-4 text-sm font-bold text-slate-500">
                {getCareerPathPrograms(recommendedCareerPath).length} этапов развития
              </p>
            </div>
            <Link
              href={`/career-paths/${recommendedCareerPath.slug}`}
              className="rounded-2xl bg-slate-950 px-5 py-3 text-center text-sm font-black text-white transition hover:-translate-y-0.5"
            >
              Открыть маршрут
            </Link>
          </div>
        </section>
      ) : null}

      <RecommendationBlock recommendation={recommendation} />

      <section className="rounded-[2rem] border border-slate-200 bg-slate-950 p-7 text-white shadow-[0_24px_60px_rgba(15,23,42,0.18)] md:p-8">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-white/45">Следующий шаг</p>
        <h2 className="mt-3 text-3xl font-black tracking-tight">{solution.nextStep.label}</h2>
        <p className="mt-3 max-w-[66ch] text-sm leading-7 text-white/68">{solution.nextStep.text}</p>
        <Link
          href={solution.nextStep.href}
          className="mt-6 inline-flex rounded-full bg-white px-5 py-3 text-sm font-black text-slate-950 transition hover:-translate-y-0.5"
        >
          Перейти →
        </Link>
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_18px_42px_rgba(15,23,42,0.06)] md:flex md:items-center md:justify-between md:gap-6">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">Канал</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">Больше разборов — в Telegram</h2>
          <p className="mt-3 max-w-[58ch] text-sm leading-6 text-slate-600">
            Публикую короткие управленческие разборы, подборки материалов и практические заметки.
          </p>
        </div>
        <Link
          href={TELEGRAM_CHANNEL_URL}
          className="mt-5 inline-flex rounded-full bg-slate-950 px-5 py-3 text-sm font-black text-white transition hover:-translate-y-0.5 md:mt-0"
        >
          Подписаться
        </Link>
      </section>

      <section className="space-y-5">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">Другие рабочие задачи</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">Куда перейти дальше</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {relatedSolutions.map((related) => (
            <Link
              key={related.slug}
              href={`/solutions/${related.slug}`}
              className="rounded-[1.5rem] border border-slate-200 bg-white p-5 transition hover:-translate-y-1 hover:border-slate-400"
            >
              <h3 className="text-lg font-black leading-tight text-slate-950">{related.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{related.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </article>
  );
}

function pickSolutionArticles(solution: Solution): ArticleSummary[] {
  const articles = getAllArticles();
  const exactMatches = solution.articleSlugs
    .map((slug) => articles.find((article) => article.slug === slug))
    .filter((article): article is Article => Boolean(article));

  if (exactMatches.length >= 4) {
    return exactMatches.slice(0, 4);
  }

  const signals = solution.articleSignals.map((signal) => signal.toLowerCase());
  const fallback = articles
    .filter((article) => !exactMatches.some((match) => match.slug === article.slug))
    .map((article) => {
      const haystack =
        `${article.frontmatter.title} ${article.frontmatter.excerpt} ${article.frontmatter.category}`.toLowerCase();
      const score =
        signals.filter((signal) => haystack.includes(signal)).length +
        (article.frontmatter.category === solution.category ? 1 : 0);

      return { article, score };
    })
    .filter((item) => item.score > 0)
    .sort((left, right) => right.score - left.score)
    .map((item) => item.article);

  return [...exactMatches, ...fallback, ...articles].filter(uniqueBySlug).slice(0, 4);
}

function pickSolutionPrograms(solution: Solution): StepikCourse[] {
  const selected = solution.programIds
    .map((id) => STEPIK_COURSES.find((course) => course.id === id))
    .filter((course): course is StepikCourse => Boolean(course));

  if (selected.length >= 3) {
    return selected.slice(0, 3);
  }

  const fallback = [...STEPIK_COURSES]
    .filter((course) => !selected.some((selectedCourse) => selectedCourse.url === course.url))
    .sort((left, right) => (right.learners ?? 0) - (left.learners ?? 0));

  return [...selected, ...fallback].slice(0, 3);
}

function uniqueBySlug(article: ArticleSummary, index: number, items: ArticleSummary[]): boolean {
  return items.findIndex((item) => item.slug === article.slug) === index;
}
