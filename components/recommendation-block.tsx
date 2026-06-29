import Link from "next/link";
import type { RecommendationResult } from "@/lib/recommendations";

type RecommendationBlockProps = {
  recommendation: RecommendationResult;
};

export function RecommendationBlock({ recommendation }: RecommendationBlockProps): JSX.Element {
  const hasRelated = recommendation.relatedMaterials.length > 0 || recommendation.relatedPrograms.length > 0;

  return (
    <section className="relative overflow-hidden rounded-[2.25rem] border border-[#f0a6cf] bg-gradient-to-br from-[#fff0f7] via-white to-[#eef8ff] p-6 shadow-[0_28px_70px_rgba(159,47,115,0.16)] dark:border-[#7a2a59] dark:from-[#271326] dark:via-slate-950 dark:to-[#0f2634] md:p-8">
      <div className="pointer-events-none absolute -right-20 -top-24 size-56 rounded-full bg-[#9f2f73]/15 blur-3xl" />
      <p className="relative text-xs font-black uppercase tracking-[0.18em] text-[#9f2f73] dark:text-[#f0a6cf]">
        Следующий рекомендуемый шаг
      </p>
      <div className="relative mt-4 grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <h2 className="text-3xl font-black tracking-tight text-slate-950 dark:text-slate-50">
            {recommendation.title}
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600 dark:text-slate-300">
            {recommendation.description}
          </p>
        </div>
        <Link
          href={recommendation.href}
          className="rounded-2xl bg-[#9f2f73] px-5 py-3 text-center text-sm font-black text-white shadow-[0_18px_36px_rgba(159,47,115,0.28)] transition duration-300 hover:-translate-y-1 hover:bg-slate-950 hover:shadow-[0_24px_54px_rgba(15,23,42,0.20)] dark:bg-white dark:text-slate-950"
        >
          {recommendation.ctaLabel}
        </Link>
      </div>

      {hasRelated ? (
        <div className="relative mt-7 grid gap-5 lg:grid-cols-2">
          {recommendation.relatedMaterials.length > 0 ? (
            <RelatedList title="Связанные материалы" items={recommendation.relatedMaterials} />
          ) : null}
          {recommendation.relatedPrograms.length > 0 ? (
            <RelatedList title="Связанные программы" items={recommendation.relatedPrograms} />
          ) : null}
        </div>
      ) : null}
    </section>
  );
}

function RelatedList({
  title,
  items
}: {
  title: string;
  items: RecommendationResult["relatedMaterials"];
}): JSX.Element {
  return (
    <div>
      <h3 className="text-sm font-black uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">{title}</h3>
      <div className="mt-3 grid gap-3">
        {items.slice(0, 3).map((item) => (
          <Link
            key={`${item.type}-${item.href}`}
            href={item.href}
            className="rounded-2xl border border-white/80 bg-white/80 p-4 transition duration-300 hover:-translate-y-0.5 hover:border-[#9f2f73] hover:bg-white hover:shadow-[0_16px_32px_rgba(15,23,42,0.08)] dark:border-slate-800 dark:bg-slate-950/80 dark:hover:border-[#f0a6cf]"
          >
            <span className="text-xs font-black uppercase tracking-[0.14em] text-[#9f2f73] dark:text-[#f0a6cf]">
              {item.label}
            </span>
            <span className="mt-2 block text-lg font-black leading-tight text-slate-950 dark:text-slate-50">
              {item.title}
            </span>
            <span className="mt-2 block text-sm leading-6 text-slate-600 dark:text-slate-300">
              {item.description}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
