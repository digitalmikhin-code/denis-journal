import { TrackedLink } from "@/components/tracked-link";

type Props = { source: "home" | "article"; articleSlug?: string };

export function JournalNextStep({ source, articleSlug }: Props): JSX.Element {
  return (
    <section aria-label="Курсы и HR-услуги Дениса Михина" className="space-y-5">
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-brand dark:text-blue-300">От идей к практике</p>
        <h2 className="mt-2 text-3xl font-black text-slate-950 dark:text-white">Как применить прочитанное в работе?</h2>
        <p className="mt-3 max-w-3xl leading-7 text-slate-600 dark:text-slate-300">Развивайте навыки на курсах или подключайте мою экспертизу к HR-задачам вашего бизнеса.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <article className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900 md:p-8">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Для вашего развития</p>
          <h3 className="mt-3 text-2xl font-black">Курсы Дениса Михина</h3>
          <p className="mb-6 mt-3 leading-7 text-slate-600 dark:text-slate-300">Управление, проекты, Agile и ИИ. Выберите программу под свою задачу и учитесь в удобном темпе.</p>
          <TrackedLink href="/training/" goal="journal_course_click" params={{ source, article_slug: articleSlug }} className="mt-auto inline-flex min-h-12 items-center justify-center rounded-lg bg-brand px-5 py-3 font-bold text-white transition hover:bg-brand-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand">Выбрать курс →</TrackedLink>
        </article>
        <article className="flex flex-col rounded-2xl border border-blue-200 bg-blue-50 p-6 dark:border-blue-800 dark:bg-slate-900 md:p-8">
          <p className="text-xs font-bold uppercase tracking-widest text-brand dark:text-blue-300">Для вашего бизнеса</p>
          <h3 className="mt-3 text-2xl font-black">HR по подписке</h3>
          <p className="mb-6 mt-3 leading-7 text-slate-600 dark:text-slate-300">Подбор, адаптация, HR-аудит и внешний HRBP/HRD. Помогу решить задачи команды без расширения штата.</p>
          <TrackedLink href="/hr/" goal="journal_hr_click" params={{ source, article_slug: articleSlug }} className="mt-auto inline-flex min-h-12 items-center justify-center rounded-lg bg-slate-950 px-5 py-3 font-bold text-white transition hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand">Посмотреть HR-услуги →</TrackedLink>
        </article>
      </div>
    </section>
  );
}
