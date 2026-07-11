import type { Metadata } from "next";
import Link from "next/link";
import { DiagnosticsHub } from "@/components/diagnostics-hub";

export const metadata: Metadata = {
  title: "Диагностика",
  description: "Раздел для материалов по диагностике: разборы, инструменты и рабочие схемы."
};

export default function DiagnosticsPage(): JSX.Element {
  const diagnosticRoadmap = [
    ["Индекс управленческой зрелости", "180 вопросов, 9 блоков, отчет, карта компетенций и план развития.", "/diagnostics/management-maturity-index"],
    ["Индекс зрелости руководителя", "Лидерство, делегирование, коммуникация, решения, команда и системное мышление.", "/diagnostics/management-maturity-index"],
    ["Индекс зрелости команды", "Доверие, ответственность, коммуникация, результативность и клиентоцентричность.", "/diagnostics"],
    ["Диагностика бизнеса", "Управление, продажи, маркетинг, финансы, команда и процессы.", "/lead/business-control-diagnostic"],
    ["Диагностика цифровой зрелости", "CRM, автоматизация, ИИ, аналитика и процессы.", "/lead/manager-ai-prompts"]
  ];

  return (
    <div className="space-y-8">
      <header className="relative overflow-hidden border border-slate-200 bg-white p-6 shadow-[0_24px_70px_rgba(9,22,43,0.08)] dark:border-slate-800 dark:bg-slate-900 md:p-8">
        <div className="pointer-events-none absolute inset-0 ambient-grid opacity-50" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-28 w-44 bg-brand/95 [clip-path:polygon(42%_0,100%_0,100%_100%,0_100%)]" />
        <div className="relative max-w-4xl">
        <p className="border-l-4 border-brand pl-3 text-xs font-black uppercase tracking-[0.18em] text-brand">Новый раздел</p>
        <h1 className="mt-4 text-4xl font-black leading-tight tracking-tight text-slate-950 dark:text-white md:text-6xl">Диагностика</h1>
        <p className="mt-4 max-w-[64ch] text-base leading-8 text-slate-650 dark:text-slate-300 md:text-lg">
          В этом разделе собраны диагностические тесты по управлению, командам и системам работы.
          Выбирайте актуальную диагностику, проходите за несколько минут и получайте персональные ориентиры для роста.
        </p>
        </div>
      </header>

      <section className="relative overflow-hidden border border-slate-200 bg-slate-950 p-6 text-white shadow-[0_24px_70px_rgba(9,22,43,0.12)] md:p-8">
        <div className="pointer-events-none absolute bottom-0 right-0 h-24 w-40 bg-brand [clip-path:polygon(44%_0,100%_0,100%_100%,0_100%)]" />
        <div className="relative grid gap-6 lg:grid-cols-[1fr_0.9fr] lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
              Закрытая диагностика
            </p>
            <h2 className="mt-3 max-w-[15ch] text-4xl font-black leading-[0.96] tracking-tight md:text-5xl">
              Индекс управленческой зрелости
            </h2>
            <p className="mt-4 max-w-[62ch] text-base leading-8 text-white/72 md:text-lg">
              180 вопросов, которые показывают не “тип личности”, а управленческий масштаб: где вы сильны,
              где теряете результат и какие зоны нужно развивать в первую очередь.
            </p>
            <Link
              href="/diagnostics/management-maturity-index"
              className="mt-6 inline-flex bg-white px-5 py-3 text-sm font-black text-slate-950 transition hover:bg-slate-100"
            >
              Открыть ИУЗ
            </Link>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            {[
              ["180", "вопросов"],
              ["9", "зон управления"],
              ["PDF", "отчет и план развития"]
            ].map(([value, label]) => (
              <div key={label} className="border border-white/10 bg-white/[0.06] p-4">
                <p className="text-3xl font-black leading-none">{value}</p>
                <p className="mt-2 text-sm font-semibold leading-6 text-white/68">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border border-slate-200 bg-white p-6 shadow-[0_18px_40px_rgba(9,22,43,0.06)] dark:border-slate-800 dark:bg-slate-900 md:p-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Центральный элемент платформы
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
              Диагностика связывает проблему с обучением
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-slate-600">
            Диагностики должны быть бесплатными, без регистрации и лишнего давления. Их задача -
            показать текущий уровень, зоны развития и курс, который поможет закрыть дефицит компетенций.
          </p>
        </div>
        <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-5">
          {diagnosticRoadmap.map(([title, text, href]) => (
            <Link
              key={title}
              href={href}
              className="border border-slate-200 bg-slate-50 p-4 transition hover:border-brand hover:bg-white hover:shadow-[0_16px_34px_rgba(9,22,43,0.07)] dark:border-slate-800 dark:bg-slate-950"
            >
              <h3 className="text-base font-black leading-tight text-slate-900">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="border border-slate-200 bg-white p-6 shadow-[0_18px_40px_rgba(9,22,43,0.06)] dark:border-slate-800 dark:bg-slate-900 md:p-8">
        <p className="text-xs font-black uppercase tracking-[0.16em] text-brand">
          Лид-магнит для бизнеса
        </p>
        <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900">
          Диагностика управляемости бизнеса
        </h2>
        <p className="mt-3 max-w-[64ch] text-base leading-8 text-slate-700">
          24 вопроса для собственников, директоров и руководителей подразделений: где бизнес теряет
          управляемость, продажи, фокус или способность проводить изменения.
        </p>
        <Link
          href="/lead/business-control-diagnostic"
          className="mt-5 inline-flex bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-brand"
        >
          Получить диагностику
        </Link>
      </section>

      <section className="border border-slate-200 bg-white p-6 shadow-[0_18px_40px_rgba(9,22,43,0.06)] dark:border-slate-800 dark:bg-slate-900 md:p-8">
        <p className="text-xs font-black uppercase tracking-[0.16em] text-brand">
          PDF для руководителя
        </p>
        <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900">
          50 промтов для руководителя
        </h2>
        <p className="mt-3 max-w-[64ch] text-base leading-8 text-slate-700">
          Готовые промты для анализа ситуаций, подготовки решений, совещаний, проектов, продаж,
          HR, команды и стратегии.
        </p>
        <Link
          href="/lead/manager-ai-prompts"
          className="mt-5 inline-flex bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-brand"
        >
          Получить PDF
        </Link>
      </section>

      <DiagnosticsHub />
    </div>
  );
}
