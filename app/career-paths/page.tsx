import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/constants";
import { getAllCareerPaths, getCareerPathPrograms } from "@/lib/career-paths";

export const metadata: Metadata = {
  title: "Карьерные маршруты",
  description:
    "Готовые профессиональные траектории развития: руководитель, руководитель проектов, AI Leader, Product Manager, Agile Leader и карьерный рост.",
  alternates: {
    canonical: "/career-paths"
  },
  openGraph: {
    title: "Карьерные маршруты",
    description: "Выберите не отдельную программу, а готовый путь профессионального развития.",
    url: `${SITE_URL}/career-paths`
  }
};

export default function CareerPathsPage(): JSX.Element {
  const paths = getAllCareerPaths();
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Карьерные маршруты",
    description: metadata.description,
    url: `${SITE_URL}/career-paths`,
    hasPart: paths.map((path) => ({
      "@type": "Course",
      name: path.title,
      description: path.description,
      url: `${SITE_URL}/career-paths/${path.slug}`
    }))
  };

  return (
    <div className="space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <section className="rounded-[2.35rem] border border-slate-200 bg-slate-950 p-7 text-white shadow-[0_34px_82px_rgba(15,23,42,0.22)] md:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/50">
          Product Core
        </p>
        <h1 className="mt-4 max-w-[12ch] text-5xl font-black leading-[0.94] tracking-tight md:text-7xl">
          Карьерные маршруты
        </h1>
        <p className="mt-5 max-w-[64ch] text-base leading-8 text-white/72 md:text-lg">
          Маршрут объединяет программы, навыки, статьи и рабочие задачи в понятный путь развития.
          Выбирайте траекторию по профессиональному результату.
        </p>
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {paths.map((path) => {
          const programs = getCareerPathPrograms(path);

          return (
            <Link
              key={path.slug}
              href={`/career-paths/${path.slug}`}
              className="group flex min-h-[21rem] flex-col justify-between rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-[0_18px_42px_rgba(15,23,42,0.06)] transition hover:-translate-y-1 hover:border-slate-400"
            >
              <div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-slate-500">
                  {programs.length} этапов
                </span>
                <h2 className="mt-4 text-3xl font-black leading-tight tracking-tight text-slate-950">
                  {path.title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">{path.description}</p>
              </div>
              <span className="mt-6 text-sm font-black uppercase tracking-[0.16em] text-slate-950">
                Открыть маршрут →
              </span>
            </Link>
          );
        })}
      </section>
    </div>
  );
}
