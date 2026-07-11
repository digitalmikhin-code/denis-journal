import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/constants";
import { getAllSkills } from "@/lib/skills";

export const metadata: Metadata = {
  title: "Навыки",
  description:
    "Библиотека практических навыков: делегирование, постановка задач, обратная связь, One-to-One, Scrum, Kanban, OKR, AI, лидерство и планирование.",
  alternates: {
    canonical: "/skills"
  },
  openGraph: {
    title: "Навыки",
    description: "Практические навыки, которые связывают статьи, программы и рабочие задачи.",
    url: `${SITE_URL}/skills`
  }
};

export default function SkillsPage(): JSX.Element {
  const skills = getAllSkills();
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Навыки",
    description: metadata.description,
    url: `${SITE_URL}/skills`,
    hasPart: skills.map((skill) => ({
      "@type": "DefinedTerm",
      name: skill.title,
      url: `${SITE_URL}/skills/${skill.slug}`
    }))
  };

  return (
    <div className="space-y-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <section className="relative overflow-hidden border border-slate-200 bg-white p-6 shadow-[0_24px_70px_rgba(9,22,43,0.08)] dark:border-slate-800 dark:bg-slate-900 md:p-8">
        <div className="pointer-events-none absolute inset-0 ambient-grid opacity-50" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-40 w-72 bg-[linear-gradient(135deg,transparent_0%,transparent_42%,rgba(11,77,186,0.14)_42%,rgba(11,77,186,0.14)_68%,rgba(8,46,115,0.9)_68%)]" />
        <div className="relative max-w-4xl">
        <p className="border-l-4 border-brand pl-3 text-xs font-semibold uppercase text-brand">
          Библиотека практики
        </p>
        <h1 className="mt-4 max-w-[11ch] text-4xl font-black uppercase leading-[1.02] text-slate-950 dark:text-slate-50 md:text-6xl">
          Навыки
        </h1>
        <p className="mt-5 max-w-[62ch] text-base leading-8 text-slate-700 dark:text-slate-300 md:text-lg">
          Навыки связывают статьи, программы и рабочие задачи. Выберите навык, чтобы увидеть,
          где он применяется, какие ошибки мешают и что изучать дальше.
        </p>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {skills.map((skill) => (
          <Link
            key={skill.slug}
            href={`/skills/${skill.slug}`}
            className="group flex min-h-[17rem] flex-col justify-between border border-slate-200 bg-white p-5 shadow-[0_16px_40px_rgba(9,22,43,0.06)] transition hover:-translate-y-0.5 hover:border-brand dark:border-slate-800 dark:bg-slate-900"
          >
            <div>
              <span className="border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-black uppercase text-brand dark:border-slate-700 dark:bg-slate-950">
                Навык
              </span>
              <h2 className="mt-4 text-2xl font-black uppercase leading-tight text-slate-950 dark:text-slate-50">
                {skill.title}
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{skill.description}</p>
            </div>
            <span className="mt-6 border-t border-slate-200 pt-4 text-sm font-black uppercase text-brand dark:border-slate-800">
              Открыть навык
            </span>
          </Link>
        ))}
      </section>
    </div>
  );
}
