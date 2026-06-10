import { CATEGORY_LABELS, CATEGORY_THEME, type Category } from "@/lib/constants";

type ArticleSmartSummaryProps = {
  title: string;
  excerpt: string;
  category: Category;
  readingTime?: number;
};

const AUDIENCE_BY_CATEGORY: Record<Category, string> = {
  career: "Специалистам и руководителям, которые хотят расти осознанно, усиливать влияние и превращать результаты в карьерный капитал.",
  management: "Руководителям, проектным лидерам и сильным специалистам, которым важно принимать решения спокойнее и точнее.",
  thinking: "Тем, кто хочет видеть причины, связи и структуру ситуации, а не только отдельные симптомы.",
  agile: "Командам, руководителям изменений и тем, кто внедряет гибкие подходы без театра и лишней суеты.",
  architecture: "Тем, кто проектирует решения, процессы и управляемые системы вместо разовых улучшений.",
  cases: "Тем, кто любит учиться на реальных управленческих ситуациях, а не на абстрактных советах.",
  ai: "Руководителям и специалистам, которые хотят применять ИИ практически: для решений, аналитики и скорости работы."
};

const TAKEAWAY_BY_CATEGORY: Record<Category, string> = {
  career: "Посмотрите на карьеру как на систему действий: что усиливает вашу заметность, доверие и следующую роль.",
  management: "Заберите управленческую рамку: где возникает хаос, какие связи влияют на результат и что можно настроить первым.",
  thinking: "Заберите способ смотреть глубже: искать не виноватых и симптомы, а контур причин, связей и ограничений.",
  agile: "Заберите практичный взгляд на изменения: что помогает команде двигаться быстрее без имитации гибкости.",
  architecture: "Заберите принцип проектирования: сильное решение должно быть повторяемым, понятным и управляемым.",
  cases: "Заберите рабочий вывод из ситуации и примерьте его к своей команде, проекту или управленческой задаче.",
  ai: "Заберите сценарий применения ИИ, который усиливает мышление и подготовку решений, а не просто добавляет инструмент."
};

export function ArticleSmartSummary({
  title,
  excerpt,
  category,
  readingTime
}: ArticleSmartSummaryProps): JSX.Element {
  const theme = CATEGORY_THEME[category];
  const items = [
    {
      label: "Главная мысль",
      value: excerpt || `Материал помогает иначе посмотреть на тему «${title}» и найти практическую точку применения.`
    },
    {
      label: "Кому полезно",
      value: AUDIENCE_BY_CATEGORY[category]
    },
    {
      label: "Что забрать с собой",
      value: TAKEAWAY_BY_CATEGORY[category]
    },
    {
      label: "Время чтения",
      value: `${readingTime || 1} мин. Спокойно прочитать, отметить одну мысль и решить, что применить.`
    }
  ];

  return (
    <section
      className="mb-8 overflow-hidden rounded-[1.85rem] border bg-[linear-gradient(135deg,#fffdf7_0%,#f8fbff_48%,#fff4f8_100%)] p-5 shadow-[0_18px_42px_rgba(15,23,42,0.07)] dark:border-slate-700 dark:bg-slate-800 dark:bg-none md:p-6"
      style={{ borderColor: theme.badgeBorder }}
    >
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
            Умное резюме
          </p>
          <h2 className="mt-2 text-2xl font-black leading-tight tracking-tight text-slate-900 dark:text-slate-50 md:text-3xl">
            Перед чтением
          </h2>
        </div>
        <span
          className="rounded-full border px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.14em]"
          style={{
            backgroundColor: theme.badgeBg,
            color: theme.badgeText,
            borderColor: theme.badgeBorder
          }}
        >
          {CATEGORY_LABELS[category]}
        </span>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2">
        {items.map((item) => (
          <div
            key={item.label}
            className="rounded-[1.35rem] border border-white/80 bg-white/82 p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900/70"
          >
            <p className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-400">
              {item.label}
            </p>
            <p className="mt-2 text-sm font-semibold leading-6 text-slate-800 dark:text-slate-200">
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
