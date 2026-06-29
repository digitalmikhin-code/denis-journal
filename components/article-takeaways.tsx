type ArticleTakeawaysProps = {
  items?: string[];
};

export function ArticleTakeaways({ items }: ArticleTakeawaysProps): JSX.Element | null {
  const visibleItems = items?.filter(Boolean).slice(0, 5) ?? [];

  if (visibleItems.length === 0) {
    return null;
  }

  return (
    <section className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-[0_16px_36px_rgba(15,23,42,0.06)] dark:border-slate-800 dark:bg-slate-900 md:p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
        Что важно запомнить
      </p>
      <div className="mt-4 grid gap-3">
        {visibleItems.map((item) => (
          <div
            key={item}
            className="flex gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950"
          >
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#22c55e] text-sm font-black text-white">
              ✓
            </span>
            <p className="text-base font-semibold leading-7 text-slate-800 dark:text-slate-100">{item}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
