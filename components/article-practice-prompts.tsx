import { CATEGORY_THEME, type Category } from "@/lib/constants";

type ArticlePracticePromptsProps = {
  category: Category;
};

const PRACTICE_QUESTIONS = [
  "Что из этого можно применить на этой неделе?",
  "Какой один процесс вы бы пересобрали?",
  "Что стоит обсудить с командой?"
];

export function ArticlePracticePrompts({ category }: ArticlePracticePromptsProps): JSX.Element {
  const theme = CATEGORY_THEME[category];

  return (
    <section
      className="overflow-hidden rounded-[1.75rem] border bg-[radial-gradient(circle_at_10%_10%,rgba(255,255,255,0.82)_0%,rgba(255,255,255,0)_32%),linear-gradient(135deg,#fff8e5_0%,#eef9ff_48%,#fff1f7_100%)] p-5 shadow-[0_16px_36px_rgba(15,23,42,0.06)] dark:border-slate-800 dark:bg-slate-900 dark:bg-none md:p-6"
      style={{ borderColor: theme.badgeBorder }}
    >
      <div className="grid gap-5 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
            Применить на практике
          </p>
          <h2 className="mt-3 text-2xl font-black leading-tight tracking-tight text-slate-900 dark:text-slate-50 md:text-3xl">
            Три вопроса после чтения
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-700 dark:text-slate-300">
            Выберите один вопрос и ответьте на него сразу. Так статья превращается из идеи в маленькое действие.
          </p>
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          {PRACTICE_QUESTIONS.map((question, index) => (
            <article
              key={question}
              className="rounded-[1.4rem] border border-white/80 bg-white/86 p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(15,23,42,0.08)] dark:border-slate-700 dark:bg-slate-800/78"
            >
              <span
                className="inline-flex h-8 min-w-8 items-center justify-center rounded-full px-2 text-xs font-black"
                style={{
                  backgroundColor: theme.badgeBg,
                  color: theme.badgeText
                }}
              >
                0{index + 1}
              </span>
              <p className="mt-4 text-base font-black leading-6 text-slate-900 dark:text-slate-100">
                {question}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
