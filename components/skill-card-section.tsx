import Link from "next/link";
import type { Skill } from "@/lib/skills";

type SkillCardSectionProps = {
  title?: string;
  eyebrow?: string;
  skills: Skill[];
};

export function SkillCardSection({
  title = "Развиваемые навыки",
  eyebrow = "Навыки",
  skills
}: SkillCardSectionProps): JSX.Element | null {
  if (skills.length === 0) {
    return null;
  }

  return (
    <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.05)] dark:border-slate-800 dark:bg-slate-900 md:p-8">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">{eyebrow}</p>
      <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950 dark:text-slate-50">{title}</h2>
      <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {skills.map((skill) => (
          <Link
            key={skill.slug}
            href={`/skills/${skill.slug}`}
            className="group rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:-translate-y-1 hover:border-slate-400 hover:bg-white dark:border-slate-800 dark:bg-slate-950 dark:hover:border-slate-600"
          >
            <h3 className="text-lg font-black leading-tight text-slate-950 dark:text-slate-50">{skill.title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{skill.description}</p>
            <span className="mt-4 inline-flex text-sm font-black text-slate-400 group-hover:text-slate-950 dark:group-hover:text-white">
              Открыть навык →
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
