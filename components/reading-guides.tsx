import Link from "next/link";
import { CATEGORY_SHORT_LABELS, CATEGORY_THEME, type Category } from "@/lib/constants";
import type { ArticleSummary } from "@/lib/content";

export type ReadingGuide = {
  title: string;
  description: string;
  outcome: string;
  label: string;
  href: string;
  accent: {
    bg: string;
    border: string;
    text: string;
    shadow: string;
  };
  articles: ArticleSummary[];
};

type ReadingGuidesProps = {
  guides: ReadingGuide[];
};

export function ReadingGuides({ guides }: ReadingGuidesProps): JSX.Element | null {
  const visibleGuides = guides.filter((guide) => guide.articles.length > 0);
  if (visibleGuides.length === 0) return null;

  return (
    <section className="relative overflow-hidden rounded-[2.5rem] border border-slate-900/10 bg-[linear-gradient(135deg,#111827_0%,#172033_48%,#0f172a_100%)] p-5 text-white shadow-[0_34px_80px_rgba(15,23,42,0.18)] md:p-8">
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#f2cf63]/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 left-8 h-64 w-64 rounded-full bg-[#7dd3fc]/16 blur-3xl" />

      <div className="relative grid gap-6 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-white/45">
            Мини-гайды
          </p>
          <h2 className="mt-3 max-w-[13ch] text-3xl font-black leading-[0.98] tracking-tight md:text-5xl">
            Маршруты чтения
          </h2>
          <p className="mt-4 max-w-[46ch] text-base leading-8 text-white/64">
            Готовые последовательности материалов под конкретную задачу. Не надо выбирать наугад: просто откройте маршрут и идите по шагам.
          </p>
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          {visibleGuides.map((guide) => (
            <Link
              key={guide.title}
              href={guide.href}
              className="rounded-[1.55rem] border border-white/10 bg-white/[0.06] p-4 transition hover:-translate-y-0.5 hover:bg-white/[0.1]"
            >
              <span
                className="inline-flex rounded-full border px-3 py-1 text-[11px] font-black uppercase tracking-[0.14em]"
                style={{
                  backgroundColor: guide.accent.bg,
                  borderColor: guide.accent.border,
                  color: guide.accent.text
                }}
              >
                {guide.label}
              </span>
              <h3 className="mt-3 text-xl font-black leading-tight tracking-tight">{guide.title}</h3>
              <p className="mt-2 text-sm leading-6 text-white/58">{guide.description}</p>
            </Link>
          ))}
        </div>
      </div>

      <div className="relative mt-7 grid gap-5 xl:grid-cols-3">
        {visibleGuides.map((guide) => (
          <article
            key={guide.title}
            className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.07] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
          >
            <div className="p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span
                  className="rounded-full border px-3 py-1 text-[11px] font-black uppercase tracking-[0.14em]"
                  style={{
                    backgroundColor: guide.accent.bg,
                    borderColor: guide.accent.border,
                    color: guide.accent.text
                  }}
                >
                  {guide.articles.length} статей
                </span>
                <Link href={guide.href} className="text-xs font-black uppercase tracking-[0.14em] text-white/48 hover:text-white">
                  Все по теме
                </Link>
              </div>

              <h3 className="mt-4 text-2xl font-black leading-tight tracking-tight">{guide.title}</h3>
              <p className="mt-3 text-sm font-semibold leading-6 text-white/72">{guide.outcome}</p>
            </div>

            <div className="border-t border-white/10 bg-slate-950/34 p-4">
              <ol className="space-y-3">
                {guide.articles.map((article, index) => {
                  const category = article.frontmatter.category as Category;
                  const theme = CATEGORY_THEME[category];

                  return (
                    <li key={article.slug}>
                      <Link
                        href={`/article/${article.slug}`}
                        className="group grid grid-cols-[auto_1fr] gap-3 rounded-[1.25rem] border border-white/8 bg-slate-950/40 p-3 transition hover:-translate-y-0.5 hover:border-white/20 hover:bg-slate-900"
                      >
                        <span className="flex h-8 min-w-8 items-center justify-center rounded-full bg-white text-xs font-black text-slate-950">
                          {index + 1}
                        </span>
                        <span>
                          <span
                            className="inline-flex rounded-full border px-2 py-0.5 text-[9px] font-black uppercase tracking-[0.12em]"
                            style={{
                              backgroundColor: theme.badgeBg,
                              color: theme.badgeText,
                              borderColor: theme.badgeBorder
                            }}
                          >
                            {CATEGORY_SHORT_LABELS[category]}
                          </span>
                          <span className="mt-2 block text-sm font-black leading-5 text-white group-hover:text-[#f2cf63]">
                            {article.frontmatter.title}
                          </span>
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ol>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
