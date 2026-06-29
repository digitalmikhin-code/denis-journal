import type { Metadata } from "next";
import Link from "next/link";
import { CATEGORY_SHORT_LABELS, CATEGORY_THEME, SITE_URL } from "@/lib/constants";
import { getAllSolutions } from "@/lib/solutions";

export const metadata: Metadata = {
  title: "Рабочие задачи",
  description:
    "Библиотека рабочих задач Дениса Михина: готовые планы решения проблем руководителей, Project Manager, Product Manager и специалистов.",
  alternates: {
    canonical: "/solutions"
  },
  openGraph: {
    title: "Рабочие задачи",
    description:
      "Готовые планы решения рабочих задач: управление, ИИ, проекты, Agile, ответственность, время и продуктовый рост.",
    url: `${SITE_URL}/solutions`
  }
};

export default function SolutionsPage(): JSX.Element {
  const solutions = getAllSolutions();

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Рабочие задачи",
    description: metadata.description,
    url: `${SITE_URL}/solutions`,
    hasPart: solutions.map((solution) => ({
      "@type": "WebPage",
      name: solution.title,
      url: `${SITE_URL}/solutions/${solution.slug}`
    }))
  };

  return (
    <div className="space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />

      <section className="rounded-[2.35rem] border border-slate-200 bg-slate-950 p-7 text-white shadow-[0_34px_82px_rgba(15,23,42,0.22)] md:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/50">
          Библиотека решений
        </p>
        <h1 className="mt-4 max-w-[13ch] text-5xl font-black leading-[0.94] tracking-tight md:text-7xl">
          Рабочие задачи
        </h1>
        <p className="mt-5 max-w-[62ch] text-base leading-8 text-white/72 md:text-lg">
          Выберите задачу, которая сейчас мешает работе. Внутри — описание проблемы, причины,
          пошаговый план, материалы, статьи, программы и один следующий шаг.
        </p>
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {solutions.map((solution) => {
          const theme = CATEGORY_THEME[solution.category];

          return (
            <Link
              key={solution.slug}
              href={`/solutions/${solution.slug}`}
              className="group flex min-h-[21rem] flex-col justify-between rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-[0_18px_42px_rgba(15,23,42,0.06)] transition hover:-translate-y-1 hover:border-slate-400"
            >
              <div>
                <span
                  className="inline-flex rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-[0.14em]"
                  style={{
                    backgroundColor: theme.badgeBg,
                    borderColor: theme.badgeBorder,
                    color: theme.badgeText
                  }}
                >
                  {CATEGORY_SHORT_LABELS[solution.category]}
                </span>
                <h2 className="mt-4 text-2xl font-black leading-tight tracking-tight text-slate-950">
                  {solution.title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">{solution.description}</p>
              </div>
              <span className="mt-6 text-sm font-black uppercase tracking-[0.16em] text-slate-950">
                Открыть план →
              </span>
            </Link>
          );
        })}
      </section>
    </div>
  );
}
