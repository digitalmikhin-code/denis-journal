import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { ArticleCard } from "@/components/article-card";
import { RecommendationBlock } from "@/components/recommendation-block";
import {
  getAllCareerPaths,
  getCareerPath,
  getCareerPathPrograms,
  getCareerPathSkills,
  getCareerPathSolutions
} from "@/lib/career-paths";
import { getAllArticles, type Article } from "@/lib/content";
import { SITE_URL } from "@/lib/constants";
import { getProgramPath } from "@/lib/program-pages";
import { getRecommendation } from "@/lib/recommendations";

type Props = {
  params: { slug: string };
};

export function generateStaticParams(): Array<{ slug: string }> {
  return getAllCareerPaths().map((path) => ({ slug: path.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const path = getCareerPath(params.slug);
  if (!path) {
    return {};
  }

  return {
    title: `${path.title} — карьерный маршрут`,
    description: path.description,
    robots: {
      index: true,
      follow: true
    },
    alternates: {
      canonical: `/career-paths/${path.slug}`
    },
    openGraph: {
      title: path.title,
      description: path.description,
      url: `${SITE_URL}/career-paths/${path.slug}`
    }
  };
}

export default function CareerPathPage({ params }: Props): JSX.Element {
  const path = getCareerPath(params.slug);
  if (!path) {
    notFound();
  }

  const programs = getCareerPathPrograms(path);
  const skills = getCareerPathSkills(path);
  const solutions = getCareerPathSolutions(path);
  const articles = pickPathArticles(path.articleSlugs);
  const nextPath = path.nextPathSlug ? getCareerPath(path.nextPathSlug) : undefined;
  const recommendation = getRecommendation("career-path", path.slug);
  const schema = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: path.title,
    description: path.description,
    url: `${SITE_URL}/career-paths/${path.slug}`,
    provider: {
      "@type": "Person",
      name: "Денис Михин",
      url: SITE_URL
    },
    hasCourseInstance: programs.map((program, index) => ({
      "@type": "CourseInstance",
      name: program.title,
      courseMode: "online",
      position: index + 1
    }))
  };

  return (
    <article className="space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <section className="relative overflow-hidden border border-slate-200 bg-white p-6 shadow-[0_24px_70px_rgba(9,22,43,0.08)] dark:border-slate-800 dark:bg-slate-900 md:p-8">
        <div className="pointer-events-none absolute inset-0 ambient-grid opacity-50" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-36 w-64 bg-brand/95 [clip-path:polygon(42%_0,100%_0,100%_100%,0_100%)]" />
        <Link
          href="/career-paths"
          className="relative border border-slate-300 bg-white px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-slate-600 transition hover:border-brand hover:text-brand dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300"
        >
          Все маршруты
        </Link>
        <h1 className="relative mt-5 max-w-4xl text-4xl font-black leading-[0.98] tracking-tight text-slate-950 dark:text-white md:text-6xl">
          {path.title}
        </h1>
        <p className="relative mt-5 max-w-[64ch] text-base leading-8 text-slate-650 dark:text-slate-300 md:text-lg">
          {path.description}
        </p>
        <div className="relative mt-7 flex flex-wrap gap-3">
          <Link
            href="#map"
            className="bg-brand px-6 py-3 text-base font-black text-white transition hover:bg-brand-dark"
          >
            Начать маршрут
          </Link>
          <Link
            href="#programs"
            className="border border-slate-300 bg-white px-6 py-3 text-base font-bold text-slate-950 transition hover:border-brand hover:text-brand dark:border-slate-700 dark:bg-slate-950 dark:text-white"
          >
            Посмотреть программы
          </Link>
        </div>
      </section>

      <ContentBlock eyebrow="Итоговый результат" title="Кем станет пользователь после маршрута">
        <p className="text-xl font-bold leading-8 text-slate-950">{path.outcome}</p>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {path.results.map((result) => (
            <ChecklistItem key={result}>{result}</ChecklistItem>
          ))}
        </div>
      </ContentBlock>

      <section className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <ContentBlock eyebrow="Для кого" title="Кому подходит">
          <div className="grid gap-3">
            {path.audience.map((item) => (
              <ChecklistItem key={item}>{item}</ChecklistItem>
            ))}
          </div>
        </ContentBlock>

        <ContentBlock eyebrow="Рабочие задачи" title="Какие ситуации решает">
          <div className="grid gap-3">
            {solutions.map((solution) => (
              <Link
                key={solution.slug}
                href={`/solutions/${solution.slug}`}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-slate-400 hover:bg-white"
              >
                <span className="text-base font-black text-slate-950">{solution.title}</span>
                <span className="mt-1 block text-sm leading-6 text-slate-650">{solution.description}</span>
              </Link>
            ))}
          </div>
        </ContentBlock>
      </section>

      <ContentBlock eyebrow="Карта развития" title="Последовательность маршрута">
        <div id="map" className="grid gap-4 md:grid-cols-4">
          {path.stages.map((stage, index) => {
            const program = stage.programId ? programs.find((item) => item.id === stage.programId) : undefined;

            return (
              <div key={`${stage.label}-${stage.title}`} className="relative rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <span className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">
                  {stage.label}
                </span>
                <h3 className="mt-2 text-xl font-black leading-tight text-slate-950">{stage.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-650">{stage.text}</p>
                {program ? (
                  <Link href={getProgramPath(program)} className="mt-4 inline-flex text-sm font-black text-slate-950">
                    Этап: {program.title} →
                  </Link>
                ) : null}
                {index < path.stages.length - 1 ? (
                  <span className="absolute -right-3 top-1/2 hidden h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full bg-slate-950 text-xs font-black text-white md:flex">
                    →
                  </span>
                ) : null}
              </div>
            );
          })}
        </div>
      </ContentBlock>

      <ContentBlock eyebrow="Программы маршрута" title="Программы как этапы">
        <div id="programs" className="grid gap-4 md:grid-cols-2">
          {programs.map((program, index) => (
            <Link
              key={program.id}
              href={getProgramPath(program)}
              className="grid gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-1 hover:border-slate-400 hover:bg-white md:grid-cols-[3rem_1fr]"
            >
              <span className="text-3xl font-black text-slate-300">{index + 1}</span>
              <span>
                <span className="block text-xl font-black leading-tight text-slate-950">{program.title}</span>
                <span className="mt-2 block text-sm leading-6 text-slate-650">{program.result}</span>
                <span className="mt-3 flex flex-wrap gap-2 text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
                  <span className="rounded-full bg-white px-3 py-1">{program.level}</span>
                  <span className="rounded-full bg-white px-3 py-1">{program.duration}</span>
                </span>
                <span className="mt-4 inline-flex text-sm font-black text-slate-950">Подробнее →</span>
              </span>
            </Link>
          ))}
        </div>
      </ContentBlock>

      <ContentBlock eyebrow="Навыки" title="Что развивается на маршруте">
        <div className="grid gap-4 md:grid-cols-3">
          {skills.map((skill) => (
            <Link
              key={skill.slug}
              href={`/skills/${skill.slug}`}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-1 hover:border-slate-400 hover:bg-white"
            >
              <h3 className="text-xl font-black leading-tight text-slate-950">{skill.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-650">{skill.description}</p>
            </Link>
          ))}
        </div>
      </ContentBlock>

      {articles.length > 0 ? (
        <section className="space-y-5">
          <SectionHeading eyebrow="Статьи" title="Материалы для маршрута" />
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {articles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </section>
      ) : null}

      <ContentBlock eyebrow="Практические материалы" title="Что появится в маршруте">
        <div className="grid gap-3 md:grid-cols-4">
          {path.materials.map((material) => (
            <div key={material} className="rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-650">
              <span className="block text-xs font-black uppercase tracking-[0.14em] text-slate-400">Скоро</span>
              <span className="mt-2 block font-bold text-slate-950">{material}</span>
            </div>
          ))}
        </div>
      </ContentBlock>

      {nextPath ? (
        <ContentBlock eyebrow="Следующий маршрут" title="Куда двигаться дальше">
          <Link
            href={`/career-paths/${nextPath.slug}`}
            className="block rounded-2xl border border-slate-200 bg-slate-950 p-6 text-white transition hover:-translate-y-1"
          >
            <h3 className="text-3xl font-black tracking-tight">{nextPath.title}</h3>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-white/70">{nextPath.description}</p>
            <span className="mt-5 inline-flex text-sm font-black uppercase tracking-[0.16em] text-[#f2cf63]">
              Открыть маршрут →
            </span>
          </Link>
        </ContentBlock>
      ) : null}

      <RecommendationBlock recommendation={recommendation} />
    </article>
  );
}

function pickPathArticles(articleSlugs: string[]): Article[] {
  const allArticles = getAllArticles(false);
  const manual = articleSlugs
    .map((slug) => allArticles.find((article) => article.slug === slug))
    .filter((article): article is Article => Boolean(article));

  return [...manual, ...allArticles].filter(uniqueArticle).slice(0, 4);
}

function uniqueArticle(article: Article, index: number, items: Article[]): boolean {
  return items.findIndex((item) => item.slug === article.slug) === index;
}

function ContentBlock({
  eyebrow,
  title,
  children
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
}): JSX.Element {
  return (
    <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.05)] md:p-8">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">{eyebrow}</p>
      <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">{title}</h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }): JSX.Element {
  return (
    <div>
      <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">{eyebrow}</p>
      <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">{title}</h2>
    </div>
  );
}

function ChecklistItem({ children }: { children: ReactNode }): JSX.Element {
  return (
    <div className="flex gap-3 rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-650">
      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-950 text-[0.65rem] font-black text-white">
        ✓
      </span>
      <span>{children}</span>
    </div>
  );
}
