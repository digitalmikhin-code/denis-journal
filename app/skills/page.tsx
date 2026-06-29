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
    <div className="space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <section className="rounded-[2.35rem] border border-slate-200 bg-slate-950 p-7 text-white shadow-[0_34px_82px_rgba(15,23,42,0.22)] md:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/50">
          Библиотека практики
        </p>
        <h1 className="mt-4 max-w-[11ch] text-5xl font-black leading-[0.94] tracking-tight md:text-7xl">
          Навыки
        </h1>
        <p className="mt-5 max-w-[62ch] text-base leading-8 text-white/72 md:text-lg">
          Навыки связывают статьи, программы и рабочие задачи. Выберите навык, чтобы увидеть,
          где он применяется, какие ошибки мешают и что изучать дальше.
        </p>
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {skills.map((skill) => (
          <Link
            key={skill.slug}
            href={`/skills/${skill.slug}`}
            className="group flex min-h-[18rem] flex-col justify-between rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-[0_18px_42px_rgba(15,23,42,0.06)] transition hover:-translate-y-1 hover:border-slate-400"
          >
            <div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-slate-500">
                Навык
              </span>
              <h2 className="mt-4 text-2xl font-black leading-tight tracking-tight text-slate-950">
                {skill.title}
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">{skill.description}</p>
            </div>
            <span className="mt-6 text-sm font-black uppercase tracking-[0.16em] text-slate-950">
              Открыть навык →
            </span>
          </Link>
        ))}
      </section>
    </div>
  );
}
