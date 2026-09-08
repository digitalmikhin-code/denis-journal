import { TrackedLink } from "@/components/tracked-link";
import type { ArticleNextStep as ArticleNextStepData } from "@/lib/content";

type ArticleNextStepProps = {
  step: ArticleNextStepData;
  articleSlug?: string;
};

const TYPE_LABELS: Record<NonNullable<ArticleNextStepData["type"]>, string> = {
  program: "Начать программу",
  topic: "Изучить следующую тему",
  task: "Открыть рабочую задачу",
  download: "Скачать шаблон"
};

export function ArticleNextStep({ step, articleSlug }: ArticleNextStepProps): JSX.Element {
  const label = step.type ? TYPE_LABELS[step.type] : "Следующий шаг";
  const isExternal = step.href.startsWith("http");

  return (
    <section className="rounded-[1.75rem] border border-slate-900 bg-slate-950 p-5 text-white shadow-[0_22px_54px_rgba(15,23,42,0.2)] md:p-6">
      <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/55">{label}</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight md:text-4xl">{step.label}</h2>
          {step.text ? <p className="mt-3 max-w-2xl text-base leading-7 text-white/70">{step.text}</p> : null}
        </div>
        <TrackedLink
          href={step.href}
          goal={step.href.startsWith("/hr") ? "journal_hr_click" : step.href.startsWith("/consulting") ? "journal_consulting_click" : step.type === "program" ? "journal_course_click" : "article_next_step_click"}
          params={{ source: "article", article_slug: articleSlug ?? "" }}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className="inline-flex justify-center rounded-2xl bg-white px-5 py-3 text-sm font-black text-slate-950 transition hover:bg-slate-100"
        >
          Перейти
        </TrackedLink>
      </div>
    </section>
  );
}
