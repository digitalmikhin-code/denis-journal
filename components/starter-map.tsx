import Link from "next/link";
import { CATEGORY_SHORT_LABELS, CATEGORY_THEME, type Category } from "@/lib/constants";
import type { ArticleSummary } from "@/lib/content";

export type StarterMapItem = {
  article: ArticleSummary;
  scenario: string;
  reason: string;
};

type StarterMapProps = {
  items: StarterMapItem[];
};

export function StarterMap({ items }: StarterMapProps): JSX.Element | null {
  if (items.length === 0) return null;

  const lead = items[0];
  const rest = items.slice(1);

  return (
    <section className="relative overflow-hidden rounded-[2.25rem] border border-[#e4c6d8] bg-[radial-gradient(circle_at_14%_16%,rgba(255,255,255,0.74)_0%,rgba(255,255,255,0)_34%),radial-gradient(circle_at_86%_12%,rgba(143,211,251,0.28)_0%,rgba(143,211,251,0)_42%),linear-gradient(135deg,#fff7df_0%,#ffeef7_52%,#eef9ff_100%)] p-6 shadow-[0_24px_58px_rgba(15,23,42,0.08),inset_0_1px_0_rgba(255,255,255,0.78)] md:p-8">
      <div className="grid gap-7 xl:grid-cols-[0.75fr_1.25fr]">
        <div className="flex flex-col justify-between gap-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              С чего начать
            </p>
            <h2 className="mt-3 max-w-[13ch] text-3xl font-black leading-tight tracking-tight text-slate-900 md:text-5xl">
              Стартовая карта журнала
            </h2>
            <p className="mt-4 max-w-[46ch] text-base leading-8 text-slate-700">
              Если вы здесь впервые, не открывайте архив наугад. Вот несколько входных точек по
              задачам: карьера, управление, ИИ и системное мышление.
            </p>
          </div>

          {lead ? <StarterMapLead item={lead} /> : null}
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          {rest.map((item, index) => (
            <StarterMapCard key={item.article.slug} item={item} index={index + 2} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StarterMapLead({ item }: { item: StarterMapItem }): JSX.Element {
  const category = item.article.frontmatter.category as Category;
  const theme = CATEGORY_THEME[category];

  return (
    <Link
      href={`/article/${item.article.slug}`}
      className="group block rounded-[1.75rem] border border-slate-900/10 bg-slate-900 p-5 text-white shadow-[0_18px_38px_rgba(15,23,42,0.18)] transition hover:-translate-y-0.5 hover:bg-slate-800"
    >
      <div className="flex items-center justify-between gap-3">
        <span className="rounded-full bg-white/12 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-white/70">
          Первый шаг
        </span>
        <span
          className="rounded-full border px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em]"
          style={{
            backgroundColor: theme.badgeBg,
            color: theme.badgeText,
            borderColor: theme.badgeBorder
          }}
        >
          {CATEGORY_SHORT_LABELS[category]}
        </span>
      </div>
      <p className="mt-4 text-sm font-semibold uppercase tracking-[0.14em] text-white/55">
        {item.scenario}
      </p>
      <h3 className="mt-2 text-2xl font-black leading-tight tracking-tight md:text-3xl">
        {item.article.frontmatter.title}
      </h3>
      <p className="mt-3 text-sm leading-7 text-white/72">{item.reason}</p>
      <span className="mt-5 inline-flex text-sm font-bold text-[#f2cf63] group-hover:text-white">
        Начать с этого материала
      </span>
    </Link>
  );
}

function StarterMapCard({ item, index }: { item: StarterMapItem; index: number }): JSX.Element {
  const category = item.article.frontmatter.category as Category;
  const theme = CATEGORY_THEME[category];

  return (
    <Link
      href={`/article/${item.article.slug}`}
      className="group rounded-[1.45rem] border border-white/70 bg-white/82 p-4 shadow-[0_10px_24px_rgba(15,23,42,0.06)] transition hover:-translate-y-0.5 hover:border-slate-200 hover:bg-white hover:shadow-[0_16px_30px_rgba(15,23,42,0.09)]"
    >
      <div className="flex items-center justify-between gap-3">
        <span className="inline-flex h-8 min-w-8 items-center justify-center rounded-full bg-slate-900 px-2 text-xs font-black text-white">
          {index}
        </span>
        <span
          className="rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em]"
          style={{
            backgroundColor: theme.badgeBg,
            color: theme.badgeText,
            borderColor: theme.badgeBorder
          }}
        >
          {CATEGORY_SHORT_LABELS[category]}
        </span>
      </div>
      <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">
        {item.scenario}
      </p>
      <h3 className="mt-2 text-lg font-black leading-tight tracking-tight text-slate-900">
        {item.article.frontmatter.title}
      </h3>
      <p className="mt-3 text-sm leading-6 text-slate-600">{item.reason}</p>
    </Link>
  );
}
