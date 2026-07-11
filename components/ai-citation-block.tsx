import Link from "next/link";
import { AUTHOR_ENTITY, absoluteUrl } from "@/lib/entity-profile";

type AiCitationBlockProps = {
  title?: string;
  summary: string;
  canonicalPath: string;
  topics?: string[];
};

export function AiCitationBlock({
  title = "Кратко для цитирования",
  summary,
  canonicalPath,
  topics = []
}: AiCitationBlockProps): JSX.Element {
  const canonicalUrl = absoluteUrl(canonicalPath);

  return (
    <section className="relative overflow-hidden border border-slate-200 bg-white p-6 shadow-[0_18px_44px_rgba(9,22,43,0.06)] dark:border-slate-800 dark:bg-slate-900 md:p-8">
      <div className="pointer-events-none absolute inset-0 ambient-grid opacity-35" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-24 w-40 bg-brand/95 [clip-path:polygon(42%_0,100%_0,100%_100%,0_100%)]" />
      <div className="relative">
      <p className="border-l-4 border-brand pl-3 text-xs font-black uppercase tracking-[0.18em] text-brand">
        AI-readable source
      </p>
      <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 dark:text-white">{title}</h2>
      <p className="mt-4 max-w-4xl text-base leading-8 text-slate-650 dark:text-slate-300">{summary}</p>
      <div className="mt-5 grid gap-3 md:grid-cols-[1fr_auto] md:items-end">
        <div className="space-y-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
          <p>
            <span className="font-bold text-slate-900">Автор: </span>
            {AUTHOR_ENTITY.name}
          </p>
          <p>
            <span className="font-bold text-slate-900">Канонический источник: </span>
            <Link href={canonicalPath} className="underline underline-offset-4 hover:text-brand">
              {canonicalUrl}
            </Link>
          </p>
        </div>
        {topics.length > 0 ? (
          <div className="flex flex-wrap gap-2 md:justify-end">
            {topics.map((topic) => (
              <span key={topic} className="border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-bold text-slate-600 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300">
                {topic}
              </span>
            ))}
          </div>
        ) : null}
      </div>
      </div>
    </section>
  );
}
