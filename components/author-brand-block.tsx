import Link from "next/link";
import {
  STEPIK_TEACH_URL,
  TELEGRAM_CHANNEL_URL,
  TELEGRAM_CONSULT_URL
} from "@/lib/constants";

type AuthorBrandBlockVariant = "short" | "extended" | "soft-sell";

type AuthorBrandBlockProps = {
  variant?: AuthorBrandBlockVariant;
  className?: string;
};

const VARIANT_CONTENT: Record<
  AuthorBrandBlockVariant,
  {
    label: string;
    title: string;
    text: string;
    points: string[];
  }
> = {
  short: {
    label: "Автор материала",
    title: "Денис Михин",
    text:
      "Практик трансформаций и Head of HR PMO. Помогаю руководителям видеть ограничения системы, принимать точнее решения и доводить изменения до результата.",
    points: ["Управляемость без ручного героизма", "Проекты, Agile и изменения", "ИИ, системное мышление и рост"]
  },
  extended: {
    label: "Авторская оптика",
    title: "Денис Михин: рост бизнеса через изменения",
    text:
      "Работаю на стыке управления, проектов, HR PMO, Agile, ИИ и системного мышления. Помогаю разбирать сложные ситуации без шума: где ограничение, что менять первым и как закрепить результат в работе.",
    points: ["Диагностика управленческой системы", "Проектирование изменений", "Развитие руководителей и команд"]
  },
  "soft-sell": {
    label: "Следующий шаг",
    title: "Можно разобрать вашу ситуацию",
    text:
      "Если внутри компании уже есть узел, его можно разобрать отдельно: увидеть ограничение, отделить симптомы от причин и собрать план действий без лишней теории.",
    points: ["Консалтинг и стратегические сессии", "Курсы и практические программы", "Канал с разбором решений"]
  }
};

export function AuthorBrandBlock({
  variant = "short",
  className = ""
}: AuthorBrandBlockProps): JSX.Element {
  const content = VARIANT_CONTENT[variant];
  const isCompact = variant === "short";

  return (
    <section
      className={`overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_24px_56px_rgba(15,23,42,0.07)] dark:border-slate-800 dark:bg-slate-900 ${className}`}
    >
      <div className={`grid gap-0 ${isCompact ? "lg:grid-cols-[0.92fr_1.08fr]" : "lg:grid-cols-[0.82fr_1.18fr]"}`}>
        <div className="relative overflow-hidden border-b border-slate-200 bg-[linear-gradient(135deg,#f7fbff_0%,#fff8e8_52%,#fff0f7_100%)] p-6 dark:border-slate-800 dark:bg-slate-950 dark:bg-none md:p-7 lg:border-b-0 lg:border-r">
          <div className="pointer-events-none absolute -right-14 -top-16 h-48 w-48 rounded-full border-[12px] border-[#2bd0e2]/35" />
          <div className="pointer-events-none absolute -bottom-20 left-8 h-44 w-44 rounded-full border-[10px] border-[#f5d45d]/35" />
          <div className="relative">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
              {content.label}
            </p>
            <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight text-slate-900 dark:text-slate-50 md:text-4xl">
              {content.title}
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-700 dark:text-slate-300">
              {content.text}
            </p>
          </div>
        </div>

        <div className="p-6 md:p-7">
          <div className="grid gap-3 sm:grid-cols-3">
            {content.points.map((point, index) => (
              <div
                key={point}
                className="rounded-[1.35rem] border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950"
              >
                <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-400">
                  0{index + 1}
                </p>
                <p className="mt-2 text-sm font-bold leading-6 text-slate-800 dark:text-slate-100">
                  {point}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <Link
              href={TELEGRAM_CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-center text-sm font-bold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:hover:bg-slate-800"
            >
              Читать канал
            </Link>
            <Link
              href={STEPIK_TEACH_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-center text-sm font-bold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:hover:bg-slate-800"
            >
              Выбрать курс
            </Link>
            <Link
              href={TELEGRAM_CONSULT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl bg-slate-950 px-4 py-3 text-center text-sm font-bold text-white shadow-[0_7px_0_0_rgba(15,23,42,0.16)] transition hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-white dark:text-slate-950"
            >
              Разобрать задачу
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
