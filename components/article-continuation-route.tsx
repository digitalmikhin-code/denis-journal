import Link from "next/link";
import { TELEGRAM_CONSULT_URL, type Category } from "@/lib/constants";
import type { CoursePromo } from "@/lib/course-promos";
import type { ArticleSummary } from "@/lib/content";
import { formatDate } from "@/lib/utils";

type ArticleContinuationRouteProps = {
  articles: ArticleSummary[];
  category: Category;
  categoryLabel: string;
  coursePromo: CoursePromo;
};

const ROUTE_LABELS = ["Углубить", "Применить", "Связать с результатом"];

const CATEGORY_INTENT: Record<Category, string> = {
  career: "связать личный рост с ответственностью, влиянием и понятными действиями",
  management: "перевести идею из статьи в управленческую практику и бизнес-результат",
  thinking: "увидеть причины, связи и точки влияния в системе",
  agile: "проверить гибкие подходы на реальных изменениях и работе команды",
  architecture: "собрать более управляемую конструкцию решений и изменений",
  cases: "посмотреть, как похожая логика работает в реальных ситуациях",
  ai: "перейти от интереса к ИИ к рабочему применению в управлении и росте бизнеса"
};

const ROUTE_REASONS = [
  "Помогает увидеть тему шире и не остановиться на одной мысли.",
  "Переводит идею в практику: что можно применить в своей команде или роли.",
  "Связывает материал с управлением, изменениями и измеримым результатом."
];

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
      className="scroll-mt-28 overflow-hidden rounded-[2rem] border border-[#d7e4ef] bg-white shadow-[0_26px_62px_rgba(15,23,42,0.08)] dark:border-slate-800 dark:bg-slate-900"
    >
      <div className="grid gap-0 xl:grid-cols-[0.78fr_1.22fr]">
        <div className="relative overflow-hidden border-b border-slate-200 bg-[linear-gradient(135deg,#f7fbff_0%,#fff8e7_54%,#fff1f7_100%)] p-6 md:p-8 xl:border-b-0 xl:border-r dark:border-slate-800 dark:bg-slate-950 dark:bg-none">
          <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full border-[14px] border-[#2bd0e2]/35" />
          <div className="pointer-events-none absolute -bottom-20 left-6 h-48 w-48 rounded-full border-[12px] border-[#f5d45d]/35" />

          <div className="relative space-y-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                Читайте дальше
              </p>
              <h2 className="mt-3 max-w-[14ch] text-3xl font-black leading-tight tracking-tight text-slate-900 dark:text-slate-50 md:text-5xl">
                Продолжить тему
              </h2>
              <p className="mt-4 max-w-[43ch] text-base leading-8 text-slate-700 dark:text-slate-300">
                Если тема зацепила, вот логичное продолжение: сначала углубить идею, затем
                примерить ее к своей ситуации, а после связать с управлением, изменениями и результатом.
              </p>
            </div>

            <div className="grid gap-2">
              {["Оставить отклик", "Сохранить опору", "Прочитать 3 материала", "Перейти к действию"].map((step, index) => (
                <div
                  key={step}
                  className="flex items-center gap-3 rounded-2xl border border-white/80 bg-white/80 px-4 py-3 shadow-sm dark:border-slate-700 dark:bg-slate-800"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-950 text-sm font-black text-white dark:bg-white dark:text-slate-950">
                    {index + 1}
                  </span>
                  <span className="text-sm font-bold text-slate-800 dark:text-slate-100">{step}</span>
                </div>
              ))}
            </div>

            <div className="rounded-[1.5rem] border border-slate-200 bg-white/80 p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                Логика маршрута
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">
                Подборка собрана автоматически по рубрике «{categoryLabel}», тегам и смысловым сигналам,
                чтобы {CATEGORY_INTENT[category]}.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-5 text-slate-900 dark:bg-slate-900 md:p-6">
          <div className="grid gap-4">
            {articles.map((article, index) => (
              <Link
                key={article.slug}
                href={`/article/${article.slug}`}
                className="group grid gap-4 rounded-[1.5rem] border border-slate-200 bg-white p-4 shadow-[0_14px_30px_rgba(15,23,42,0.06)] transition hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-900 md:grid-cols-[auto_1fr_auto] md:items-center"
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
                  <h3 className="mt-2 text-xl font-black leading-tight tracking-tight text-slate-900 dark:text-slate-50">
                    {article.frontmatter.title}
                  </h3>
                  <p className="mt-2 max-w-[64ch] text-sm leading-6 text-slate-600 dark:text-slate-300">
                    {ROUTE_REASONS[index] ?? article.frontmatter.excerpt}
                  </p>
                </div>
                <span className="text-sm font-black text-slate-500 transition group-hover:text-slate-900">
                  Читать
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-5 rounded-[1.5rem] border border-slate-200 bg-[linear-gradient(135deg,#f8fafc_0%,#fff8e8_100%)] p-4 dark:border-slate-800 dark:bg-slate-950 dark:bg-none">
            <p className="text-sm font-semibold leading-6 text-slate-700 dark:text-slate-300">
              Если хочется не просто читать, а применить это к своей ситуации, можно пойти двумя путями:
              разобрать задачу лично или пройти связанный курс.
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <Link
                href={TELEGRAM_CONSULT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-center text-sm font-bold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
              >
                Обсудить задачу
              </Link>
              <Link
                href={coursePromo.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl bg-slate-950 px-4 py-3 text-center text-sm font-bold text-white shadow-[0_7px_0_0_rgba(15,23,42,0.18)] transition hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-white dark:text-slate-950"
              >
                Перейти к курсу
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
