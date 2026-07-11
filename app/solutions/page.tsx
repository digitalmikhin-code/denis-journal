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
    <div className="space-y-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />

      <section className="relative overflow-hidden border border-slate-200 bg-white p-6 shadow-[0_24px_70px_rgba(9,22,43,0.08)] dark:border-slate-800 dark:bg-slate-900 md:p-8">
        <div className="pointer-events-none absolute inset-0 ambient-grid opacity-50" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-40 w-72 bg-[linear-gradient(135deg,transparent_0%,transparent_42%,rgba(11,77,186,0.14)_42%,rgba(11,77,186,0.14)_68%,rgba(8,46,115,0.9)_68%)]" />
        <div className="relative max-w-4xl">
        <p className="border-l-4 border-brand pl-3 text-xs font-semibold uppercase text-brand">
          Библиотека решений
        </p>
        <h1 className="mt-4 max-w-[13ch] text-4xl font-black uppercase leading-[1.02] text-slate-950 dark:text-slate-50 md:text-6xl">
          Рабочие задачи
        </h1>
        <p className="mt-5 max-w-[62ch] text-base leading-8 text-slate-700 dark:text-slate-300 md:text-lg">
          Выберите задачу, которая сейчас мешает работе. Внутри — описание проблемы, причины,
          пошаговый план, материалы, статьи, программы и один следующий шаг.
        </p>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {solutions.map((solution) => {
          const theme = CATEGORY_THEME[solution.category];

          return (
            <Link
              key={solution.slug}
              href={`/solutions/${solution.slug}`}
              className="group flex min-h-[19rem] flex-col justify-between border border-slate-200 bg-white p-5 shadow-[0_16px_40px_rgba(9,22,43,0.06)] transition hover:-translate-y-0.5 hover:border-brand dark:border-slate-800 dark:bg-slate-900"
            >
              <div>
                <span
                  className="inline-flex border px-3 py-1 text-xs font-bold uppercase"
                  style={{
                    backgroundColor: theme.badgeBg,
                    borderColor: theme.badgeBorder,
                    color: theme.badgeText
                  }}
                >
                  {CATEGORY_SHORT_LABELS[solution.category]}
                </span>
                <h2 className="mt-4 text-2xl font-black uppercase leading-tight text-slate-950 dark:text-slate-50">
                  {solution.title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{solution.description}</p>
              </div>
              <span className="mt-6 border-t border-slate-200 pt-4 text-sm font-black uppercase text-brand dark:border-slate-800">
                Открыть план
              </span>
            </Link>
          );
        })}
      </section>
    </div>
  );
}
