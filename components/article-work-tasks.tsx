import Link from "next/link";

export type ArticleWorkTask = {
  id: string;
  title: string;
  text: string;
  href: string;
};

type ArticleWorkTasksProps = {
  tasks: ArticleWorkTask[];
};

export function ArticleWorkTasks({ tasks }: ArticleWorkTasksProps): JSX.Element | null {
  const visibleTasks = tasks.slice(0, 4);

  if (visibleTasks.length === 0) {
    return null;
  }

  return (
    <section className="space-y-4">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
          Связанные рабочие задачи
        </p>
        <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950 dark:text-slate-50">
          Эта статья поможет, если…
        </h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {visibleTasks.map((task) => (
          <Link
            key={task.id}
            href={task.href}
            className="rounded-[1.35rem] border border-slate-200 bg-white p-5 shadow-[0_14px_32px_rgba(15,23,42,0.05)] transition hover:-translate-y-0.5 hover:border-slate-400 dark:border-slate-800 dark:bg-slate-900"
          >
            <h3 className="text-xl font-black leading-tight tracking-tight text-slate-950 dark:text-slate-50">
              {task.title}
            </h3>
            <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{task.text}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
