import Link from "next/link";
import type { RecommendationResult } from "@/lib/recommendations";

type RecommendationBlockProps = {
  recommendation: RecommendationResult;
};

export function RecommendationBlock({ recommendation }: RecommendationBlockProps): JSX.Element {
  const hasRelated = recommendation.relatedMaterials.length > 0 || recommendation.relatedPrograms.length > 0;

  return (
    <section className="relative overflow-hidden border border-slate-200 bg-white p-6 shadow-[0_24px_64px_rgba(9,22,43,0.08)] dark:border-slate-800 dark:bg-slate-900 md:p-8">
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-[linear-gradient(135deg,transparent_0%,transparent_42%,rgba(11,77,186,0.14)_42%,rgba(11,77,186,0.14)_100%)]" />
      <p className="relative border-l-4 border-brand pl-3 text-xs font-black uppercase text-brand dark:text-blue-300">
        Следующий рекомендуемый шаг
      </p>
      <div className="relative mt-4 grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <h2 className="text-3xl font-black uppercase text-slate-950 dark:text-slate-50">
            {recommendation.title}
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600 dark:text-slate-300">
            {recommendation.description}
          </p>
        </div>
        <Link
          href={recommendation.href}
          className="bg-brand px-5 py-3 text-center text-sm font-black text-white shadow-[0_18px_36px_rgba(11,77,186,0.2)] transition duration-300 hover:-translate-y-0.5 hover:bg-brand-dark dark:bg-white dark:text-slate-950"
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
            className="border border-slate-200 bg-white/85 p-4 transition duration-300 hover:-translate-y-0.5 hover:border-brand hover:bg-white hover:shadow-[0_16px_32px_rgba(9,22,43,0.08)] dark:border-slate-800 dark:bg-slate-950/80 dark:hover:border-brand"
          >
            <span className="text-xs font-black uppercase text-brand dark:text-blue-300">
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
