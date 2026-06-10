import Link from "next/link";
import { MAX_CHANNEL_URL, type Category } from "@/lib/constants";
import type { CoursePromo } from "@/lib/course-promos";
import type { ArticleSummary } from "@/lib/content";
import { formatDate } from "@/lib/utils";

type ArticleContinuationRouteProps = {
  articles: ArticleSummary[];
  category: Category;
  categoryLabel: string;
  coursePromo: CoursePromo;
};

const ROUTE_LABELS = ["Следующий шаг", "Углубить", "Применить"];

const CATEGORY_INTENT: Record<Category, string> = {
  career: "собрать карьерную линию действий",
  management: "перевести идеи в управленческую практику",
  thinking: "увидеть систему шире и точнее",
  agile: "проверить гибкие подходы на реальной работе",
  architecture: "собрать более управляемую конструкцию решений",
  cases: "посмотреть, как похожая логика работает в кейсах",
  ai: "перейти от интереса к ИИ к рабочему применению"
};

export function ArticleContinuationRoute({
  articles,
  category,
  categoryLabel,
  coursePromo
}: ArticleContinuationRouteProps): JSX.Element | null {
  if (articles.length === 0) {
    return null;
  }

  return (
    <section
      id="continue-route"
      className="scroll-mt-28 overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-950 text-white shadow-[0_28px_70px_rgba(15,23,42,0.18)]"
    >
      <div className="grid gap-0 xl:grid-cols-[0.82fr_1.18fr]">
        <div className="relative overflow-hidden border-b border-white/10 p-6 md:p-8 xl:border-b-0 xl:border-r">
          <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full border-[14px] border-[#2bd0e2]/35" />
          <div className="pointer-events-none absolute -bottom-20 left-6 h-48 w-48 rounded-full border-[12px] border-[#f5d45d]/30" />

          <div className="relative space-y-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
                Маршрут после статьи
              </p>
              <h2 className="mt-3 max-w-[14ch] text-3xl font-black leading-tight tracking-tight md:text-5xl">
                Продолжить без потери мысли
              </h2>
              <p className="mt-4 max-w-[42ch] text-base leading-8 text-white/72">
                Если материал попал в вашу задачу, следующий шаг лучше сделать сразу: зафиксировать
                отклик, сохранить опору и прочитать три материала, которые продолжают тему.
              </p>
            </div>

            <div className="grid gap-2">
              {["Отклик", "Сохранение", "3 материала", "Подписка или курс"].map((step, index) => (
                <div
                  key={step}
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-white text-sm font-black text-slate-950">
                    {index + 1}
                  </span>
                  <span className="text-sm font-bold text-white/88">{step}</span>
                </div>
              ))}
            </div>

            <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.05] p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/45">
                Логика маршрута
              </p>
              <p className="mt-2 text-sm leading-6 text-white/74">
                Подборка собрана автоматически по рубрике «{categoryLabel}», тегам и смысловым сигналам,
                чтобы {CATEGORY_INTENT[category]}.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[linear-gradient(135deg,#fff8e5_0%,#f1fbff_54%,#fff1f7_100%)] p-5 text-slate-900 md:p-6">
          <div className="grid gap-4">
            {articles.map((article, index) => (
              <Link
                key={article.slug}
                href={`/article/${article.slug}`}
                className="group grid gap-4 rounded-[1.5rem] border border-white/80 bg-white/88 p-4 shadow-[0_16px_34px_rgba(15,23,42,0.08)] transition hover:-translate-y-0.5 hover:bg-white md:grid-cols-[auto_1fr_auto] md:items-center"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950 text-xl font-black text-white">
                  {index + 1}
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-black uppercase tracking-[0.14em] text-slate-500">
                      {ROUTE_LABELS[index] ?? "Продолжить"}
                    </span>
                    <span className="text-xs font-semibold text-slate-500">
                      {formatDate(article.frontmatter.date)} · {article.frontmatter.readingTime} мин
                    </span>
                  </div>
                  <h3 className="mt-2 text-xl font-black leading-tight tracking-tight text-slate-900">
                    {article.frontmatter.title}
                  </h3>
                  <p className="mt-2 max-w-[64ch] text-sm leading-6 text-slate-600">
                    {article.frontmatter.excerpt}
                  </p>
                </div>
                <span className="text-sm font-black text-slate-500 transition group-hover:text-slate-900">
                  Читать
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-5 grid gap-3 lg:grid-cols-3">
            <a
              href="#article-share"
              className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-center text-sm font-bold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-50"
            >
              Поделиться статьей
            </a>
            <Link
              href={MAX_CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-center text-sm font-bold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-50"
            >
              Подписаться в Max
            </Link>
            <Link
              href={coursePromo.href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl bg-slate-950 px-4 py-3 text-center text-sm font-bold text-white shadow-[0_7px_0_0_rgba(15,23,42,0.18)] transition hover:-translate-y-0.5 hover:bg-slate-800"
            >
              Перейти к курсу
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
