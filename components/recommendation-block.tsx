import Link from "next/link";
import type { RecommendationResult } from "@/lib/recommendations";

type RecommendationBlockProps = {
  recommendation: RecommendationResult;
};

export function RecommendationBlock({ recommendation }: RecommendationBlockProps): JSX.Element {
  const hasRelated = recommendation.relatedMaterials.length > 0 || recommendation.relatedPrograms.length > 0;

  return (
    <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.05)] dark:border-slate-800 dark:bg-slate-900 md:p-8">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">
        Следующий рекомендуемый шаг
      </p>
      <div className="mt-4 grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
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
          className="rounded-2xl bg-slate-950 px-5 py-3 text-center text-sm font-black text-white transition hover:-translate-y-0.5 dark:bg-white dark:text-slate-950"
        >
          {recommendation.ctaLabel}
        </Link>
      </div>

      {hasRelated ? (
        <div className="mt-7 grid gap-5 lg:grid-cols-2">
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
      <h3 className="text-sm font-black uppercase tracking-[0.16em] text-slate-400">{title}</h3>
      <div className="mt-3 grid gap-3">
        {items.slice(0, 3).map((item) => (
          <Link
            key={`${item.type}-${item.href}`}
            href={item.href}
            className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:-translate-y-0.5 hover:border-slate-400 hover:bg-white dark:border-slate-800 dark:bg-slate-950 dark:hover:border-slate-600"
          >
            <span className="text-xs font-black uppercase tracking-[0.14em] text-slate-400">
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
