import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { ArticleCard } from "@/components/article-card";
import { RecommendationBlock } from "@/components/recommendation-block";
import { getCareerPathsForSkill } from "@/lib/career-paths";
import { getProgramPath } from "@/lib/program-pages";
import { getAllArticles, type Article } from "@/lib/content";
import { SITE_URL } from "@/lib/constants";
import { getRecommendation } from "@/lib/recommendations";
import { getAllSkills, getSkill, getSkillsBySlugs, type Skill } from "@/lib/skills";
import { getSolution, type Solution } from "@/lib/solutions";
import { STEPIK_COURSES } from "@/lib/stepik-courses";

type Props = {
  params: { slug: string };
};

export function generateStaticParams(): Array<{ slug: string }> {
  return getAllSkills().map((skill) => ({ slug: skill.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const skill = getSkill(params.slug);
  if (!skill) {
    return {};
  }

  return {
    title: `${skill.title} — навык`,
    description: skill.description,
    robots: {
      index: true,
      follow: true
    },
    alternates: {
      canonical: `/skills/${skill.slug}`
    },
    openGraph: {
      title: skill.title,
      description: skill.description,
      url: `${SITE_URL}/skills/${skill.slug}`
    }
  };
}

export default function SkillPage({ params }: Props): JSX.Element {
  const skill = getSkill(params.slug);
  if (!skill) {
    notFound();
  }

  const articles = pickSkillArticles(skill);
  const programs = skill.programIds
    .map((id) => STEPIK_COURSES.find((course) => course.id === id))
    .filter((course): course is (typeof STEPIK_COURSES)[number] => Boolean(course))
    .slice(0, 3);
  const solutions = skill.solutionSlugs
    .map((slug) => getSolution(slug))
    .filter((solution): solution is Solution => Boolean(solution));
  const nextSkills = getSkillsBySlugs(skill.nextSkillSlugs, 4);
  const careerPaths = getCareerPathsForSkill(skill.slug);
  const recommendation = getRecommendation("skill", skill.slug);

  const schema = {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    name: skill.title,
    description: skill.description,
    url: `${SITE_URL}/skills/${skill.slug}`,
    inDefinedTermSet: `${SITE_URL}/skills`
  };

  return (
    <article className="space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <section className="rounded-[2.35rem] border border-slate-200 bg-slate-950 p-7 text-white shadow-[0_34px_82px_rgba(15,23,42,0.22)] md:p-10">
        <Link
          href="/skills"
          className="rounded-full border border-white/15 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-white/60 transition hover:border-white/40 hover:text-white"
        >
          Все навыки
        </Link>
        <h1 className="mt-5 max-w-[12ch] text-5xl font-black leading-[0.94] tracking-tight md:text-7xl">
          {skill.title}
        </h1>
        <p className="mt-5 max-w-[64ch] text-base leading-8 text-white/72 md:text-lg">
          {skill.description}
        </p>
        <div className="mt-7 rounded-[1.5rem] border border-white/10 bg-white/8 p-5">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-white/45">
            После освоения навыка
          </p>
          <p className="mt-2 text-lg font-bold leading-8 text-white">{skill.outcome}</p>
        </div>
        <Link
          href="#learn"
          className="mt-6 inline-flex rounded-2xl bg-white px-6 py-3 text-base font-black text-slate-950 transition hover:-translate-y-0.5"
        >
          Начать изучение
        </Link>
      </section>

      <section className="grid gap-5 lg:grid-cols-[1fr_0.95fr]">
        <ContentBlock eyebrow="Суть" title="Что представляет собой навык">
          <div className="space-y-4">
            {skill.overview.slice(0, 3).map((paragraph) => (
              <p key={paragraph} className="text-base leading-8 text-slate-650">{paragraph}</p>
            ))}
          </div>
        </ContentBlock>

        <ContentBlock eyebrow="Зачем" title="Почему он важен">
          <div className="grid gap-3">
            {skill.importance.map((item) => (
              <ChecklistItem key={item}>{item}</ChecklistItem>
            ))}
          </div>
        </ContentBlock>
      </section>

      <section className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <ContentBlock eyebrow="Ошибки" title="Типичные ошибки">
          <div className="grid gap-3">
            {skill.mistakes.slice(0, 5).map((item) => (
              <ChecklistItem key={item}>{item}</ChecklistItem>
            ))}
          </div>
        </ContentBlock>

        <ContentBlock eyebrow="Алгоритм" title="Практический алгоритм">
          <div className="grid gap-3">
            {skill.algorithm.map((step, index) => (
              <div key={step} className="grid gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 md:grid-cols-[3rem_1fr]">
                <span className="text-2xl font-black text-slate-300">{index + 1}</span>
                <p className="text-base font-bold leading-7 text-slate-850">{step}</p>
              </div>
            ))}
          </div>
        </ContentBlock>
      </section>

      <section id="learn" className="space-y-5">
        <SectionHeading eyebrow="Статьи" title="Лучшие статьи по навыку" />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </section>

      <ContentBlock eyebrow="Программы" title="Программы, которые развивают этот навык">
        <div className="grid gap-4 md:grid-cols-3">
          {programs.map((course) => (
            <Link
              key={course.id}
              href={getProgramPath(course)}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-1 hover:border-slate-400 hover:bg-white"
            >
              <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">{course.level}</p>
              <h3 className="mt-3 text-xl font-black leading-tight text-slate-950">{course.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-650">{course.result}</p>
              <span className="mt-5 inline-flex text-sm font-black text-slate-950">Подробнее →</span>
            </Link>
          ))}
        </div>
      </ContentBlock>

      <ContentBlock eyebrow="Рабочие задачи" title="Где применяется навык">
        <div className="grid gap-4 md:grid-cols-3">
          {solutions.map((solution) => (
            <Link
              key={solution.slug}
              href={`/solutions/${solution.slug}`}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-1 hover:border-slate-400 hover:bg-white"
            >
              <h3 className="text-xl font-black leading-tight text-slate-950">{solution.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-650">{solution.description}</p>
              <span className="mt-5 inline-flex text-sm font-black text-slate-950">Открыть задачу →</span>
            </Link>
          ))}
        </div>
      </ContentBlock>

      <ContentBlock eyebrow="Следующие навыки" title="Куда развиваться дальше">
        <div className="grid gap-4 md:grid-cols-4">
          {nextSkills.map((nextSkill) => (
            <Link
              key={nextSkill.slug}
              href={`/skills/${nextSkill.slug}`}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-1 hover:border-slate-400 hover:bg-white"
            >
              <h3 className="text-lg font-black leading-tight text-slate-950">{nextSkill.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-650">{nextSkill.description}</p>
            </Link>
          ))}
        </div>
      </ContentBlock>

      <RecommendationBlock recommendation={recommendation} />

      {careerPaths.length > 0 ? (
        <ContentBlock eyebrow="Карьерные маршруты" title="Навык развивается в следующих маршрутах">
          <div className="grid gap-4 md:grid-cols-3">
            {careerPaths.map((careerPath) => (
              <Link
                key={careerPath.slug}
                href={`/career-paths/${careerPath.slug}`}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-1 hover:border-slate-400 hover:bg-white"
              >
                <h3 className="text-xl font-black leading-tight text-slate-950">{careerPath.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-650">{careerPath.description}</p>
                <span className="mt-5 inline-flex text-sm font-black text-slate-950">Открыть маршрут →</span>
              </Link>
            ))}
          </div>
        </ContentBlock>
      ) : null}
    </article>
  );
}

function pickSkillArticles(skill: Skill): Article[] {
  const allArticles = getAllArticles(false);
  const manual = skill.articleSlugs
    .map((slug) => allArticles.find((article) => article.slug === slug))
    .filter((article): article is Article => Boolean(article));

  const signals = skill.articleSignals.map((signal) => signal.toLowerCase());
  const inferred = allArticles
    .filter((article) => !manual.some((manualArticle) => manualArticle.slug === article.slug))
    .map((article) => {
      const haystack = `${article.frontmatter.title} ${article.frontmatter.excerpt} ${article.frontmatter.tags.join(" ")}`.toLowerCase();
      const score = signals.filter((signal) => haystack.includes(signal)).length;
      return { article, score };
    })
    .filter((item) => item.score > 0)
    .sort((left, right) => right.score - left.score)
    .map((item) => item.article);

  return [...manual, ...inferred, ...allArticles].filter(uniqueArticle).slice(0, 5);
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
