import Link from "next/link";
import type { ArticleSummary } from "@/lib/content";
import { pickAuthorSelection } from "@/lib/journal-architecture";

type AuthorChoiceSectionProps = {
  articles: ArticleSummary[];
};

export function AuthorChoiceSection({ articles }: AuthorChoiceSectionProps): JSX.Element {
  const picks = pickAuthorSelection(articles).filter((item) => item.article);

  if (picks.length === 0) {
    return (
      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_20px_48px_rgba(15,23,42,0.06)] md:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Выбор автора</p>
        <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900">С чего начать</h2>
        <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
          В подборке появятся ключевые материалы, когда на сайте будет достаточно совпадений по темам.
        </p>
      </section>
    );
  }

  return (
    <section className="overflow-hidden rounded-[2rem] border border-slate-200 bg-[linear-gradient(135deg,#fbfdff_0%,#fff8e8_52%,#fff2f7_100%)] p-6 shadow-[0_24px_56px_rgba(15,23,42,0.07)] md:p-8">
      <div className="grid gap-6 lg:grid-cols-[0.78fr_1.22fr]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Выбор автора</p>
          <h2 className="mt-3 max-w-[12ch] text-4xl font-black leading-tight tracking-tight text-slate-900">
            Если у вас есть 30 минут
          </h2>
          <p className="mt-4 max-w-[42ch] text-base leading-8 text-slate-700">
            Если вы впервые на сайте, начните с этих материалов. Они помогают понять мой подход к
            управлению, изменениям и работе со сложными системами.
          </p>
          <Link
            href="/start"
            className="mt-6 inline-flex rounded-2xl border border-slate-900/15 bg-white px-5 py-3 text-sm font-bold text-slate-900 transition hover:-translate-y-0.5 hover:bg-slate-50"
          >
            Подобрать маршрут под себя
          </Link>
        </div>

        <div className="grid gap-3">
          {picks.map((pick, index) => {
            const article = pick.article as ArticleSummary;

            return (
              <Link
                key={`${pick.title}-${article.slug}`}
                href={`/article/${article.slug}`}
                className="group grid gap-3 rounded-[1.35rem] border border-white/70 bg-white/80 p-4 shadow-sm transition hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_16px_36px_rgba(15,23,42,0.08)] md:grid-cols-[auto_1fr]"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-sm font-black text-white">
                  {index + 1}
                </span>
                <span>
                  <span className="block text-xs font-bold uppercase tracking-[0.14em] text-slate-400">
                    {pick.title}
                  </span>
                  <span className="mt-1 block text-lg font-black leading-snug text-slate-900 transition group-hover:text-slate-700">
                    {article.frontmatter.title}
                  </span>
                  <span className="mt-2 block text-sm leading-6 text-slate-600">{pick.reason}</span>
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
