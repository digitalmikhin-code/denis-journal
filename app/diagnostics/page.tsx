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
    <div className="space-y-6">
      <header className="rounded-[2rem] border border-slate-200 bg-[linear-gradient(135deg,#eef8ff_0%,#f7f2ff_52%,#fff6ec_100%)] p-7 shadow-[0_18px_40px_rgba(15,23,42,0.06)] md:p-9">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Новый раздел</p>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl">Диагностика</h1>
        <p className="mt-4 max-w-[64ch] text-base leading-8 text-slate-700 md:text-lg">
          В этом разделе собраны диагностические тесты по управлению, командам и системам работы.
          Выбирайте актуальную диагностику, проходите за несколько минут и получайте персональные ориентиры для роста.
        </p>
      </header>

      <section className="relative overflow-hidden rounded-[2rem] border border-slate-800 bg-slate-950 p-6 text-white shadow-[0_28px_70px_rgba(15,23,42,0.18)] md:p-8">
        <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full border-[14px] border-[#f5d45d]/35" />
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
              className="mt-6 inline-flex rounded-2xl bg-white px-5 py-3 text-sm font-black text-slate-950 transition hover:-translate-y-0.5 hover:bg-slate-100"
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
              <div key={label} className="rounded-[1.4rem] border border-white/10 bg-white/[0.06] p-4">
                <p className="text-3xl font-black leading-none">{value}</p>
                <p className="mt-2 text-sm font-semibold leading-6 text-white/68">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.06)] md:p-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Коммерческая линейка
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
              Диагностики будут вести от первого среза к развитию
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-slate-600">
            Задача раздела - не развлечь тестом, а показать руководителю, команде или бизнесу,
            где находится ограничитель и какой следующий шаг имеет смысл.
          </p>
        </div>
        <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-5">
          {diagnosticRoadmap.map(([title, text, href]) => (
            <Link
              key={title}
              href={href}
              className="rounded-[1.4rem] border border-slate-200 bg-slate-50 p-4 transition hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_16px_34px_rgba(15,23,42,0.07)]"
            >
              <h3 className="text-base font-black leading-tight text-slate-900">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="rounded-[2rem] border border-[#f1d973] bg-[#fff9d4] p-6 shadow-[0_18px_40px_rgba(15,23,42,0.06)] md:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8a6e00]">
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
          className="mt-5 inline-flex rounded-2xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
        >
          Получить диагностику
        </Link>
      </section>

      <section className="rounded-[2rem] border border-[#ec9a48] bg-[#fff0df] p-6 shadow-[0_18px_40px_rgba(15,23,42,0.06)] md:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9a4d00]">
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
          className="mt-5 inline-flex rounded-2xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
        >
          Получить PDF
        </Link>
      </section>

      <DiagnosticsHub />
    </div>
  );
}
