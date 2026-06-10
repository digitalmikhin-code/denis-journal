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
    <section className="rounded-[2rem] border border-slate-200 bg-[linear-gradient(135deg,#f8fafc_0%,#fff8e8_100%)] p-6 shadow-soft md:p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
        AI-readable source
      </p>
      <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900">{title}</h2>
      <p className="mt-4 max-w-4xl text-base leading-8 text-slate-700">{summary}</p>
      <div className="mt-5 grid gap-3 md:grid-cols-[1fr_auto] md:items-end">
        <div className="space-y-2 text-sm leading-6 text-slate-600">
          <p>
            <span className="font-bold text-slate-900">Автор: </span>
            {AUTHOR_ENTITY.name}
          </p>
          <p>
            <span className="font-bold text-slate-900">Канонический источник: </span>
            <Link href={canonicalPath} className="underline underline-offset-4 hover:text-slate-950">
              {canonicalUrl}
            </Link>
          </p>
        </div>
        {topics.length > 0 ? (
          <div className="flex flex-wrap gap-2 md:justify-end">
            {topics.map((topic) => (
              <span key={topic} className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-bold text-slate-600">
                {topic}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
