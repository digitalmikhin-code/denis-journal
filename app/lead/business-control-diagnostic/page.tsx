import type { Metadata } from "next";
import Link from "next/link";
import { AiCitationBlock } from "@/components/ai-citation-block";
import { BusinessControlLeadForm } from "@/components/business-control-lead-form";
import { BUSINESS_CONTROL_DIAGNOSTIC } from "@/lib/business-control-diagnostic";
import { SITE_URL, TELEGRAM_CONSULT_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Диагностика управляемости бизнеса",
  description:
    "Лид-магнит Дениса Михина для собственников, директоров и руководителей подразделений: 24 вопроса, шкала зрелости и рекомендации по точкам роста бизнеса.",
  alternates: {
    canonical: "/lead/business-control-diagnostic"
  },
  openGraph: {
    title: "Диагностика управляемости бизнеса",
    description: BUSINESS_CONTROL_DIAGNOSTIC.promise,
    url: `${SITE_URL}/lead/business-control-diagnostic`
  }
};

export default function BusinessControlDiagnosticPage(): JSX.Element {
  return (
    <div className="space-y-10">
      <section className="relative overflow-hidden rounded-[2.35rem] border border-slate-200 bg-slate-950 p-7 text-white shadow-[0_34px_82px_rgba(15,23,42,0.22)] md:p-10">
        <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full border-[16px] border-[#2bd0e2]/35" />
        <div className="pointer-events-none absolute -bottom-24 left-8 h-60 w-60 rounded-full border-[14px] border-[#f5d45d]/30" />
        <div className="relative grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/50">
              Быстрый управленческий разбор
            </p>
            <h1 className="mt-4 max-w-[13ch] text-5xl font-black leading-[0.94] tracking-tight md:text-7xl">
              {BUSINESS_CONTROL_DIAGNOSTIC.title}
            </h1>
            <p className="mt-5 max-w-[58ch] text-xl font-semibold leading-tight text-white/90 md:text-2xl">
              {BUSINESS_CONTROL_DIAGNOSTIC.promise}
            </p>
            <p className="mt-5 max-w-[62ch] text-base leading-8 text-white/72">
              {BUSINESS_CONTROL_DIAGNOSTIC.subtitle}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#download"
                className="rounded-2xl bg-white px-6 py-3 text-base font-black text-slate-950 transition hover:-translate-y-0.5 hover:bg-slate-100"
              >
                Открыть диагностику
              </a>
              <Link
                href={TELEGRAM_CONSULT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl border border-white/20 bg-white/[0.06] px-6 py-3 text-base font-bold text-white transition hover:-translate-y-0.5 hover:bg-white/[0.1]"
              >
                Обсудить задачу
              </Link>
            </div>
          </div>

          <div className="grid gap-3">
            {[
              ["24", "вопроса без воды"],
              ["6", "зон управляемости"],
              ["4", "уровня зрелости"],
              ["30", "минут на первый вывод"]
            ].map(([value, label]) => (
              <div key={label} className="rounded-[1.5rem] border border-white/10 bg-white/[0.06] p-5">
                <p className="text-4xl font-black leading-none text-white">{value}</p>
                <p className="mt-2 text-sm font-semibold leading-6 text-white/70">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-3">
        {[
          ["Для кого", "Собственники, директора, руководители подразделений и лидеры изменений."],
          ["Что покажет", "Где бизнес теряет управляемость: цели, процессы, продажи, команда, данные или изменения."],
          ["Что дальше", "Выберите слабый блок и превратите его в план изменений на ближайшие 30 дней."]
        ].map(([title, text]) => (
          <article key={title} className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-soft">
            <h2 className="text-xl font-black tracking-tight text-slate-900">{title}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">{text}</p>
          </article>
        ))}
      </section>

      <section id="download" className="scroll-mt-28">
        <BusinessControlLeadForm />
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft md:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
          После диагностики
        </p>
        <h2 className="mt-3 max-w-[18ch] text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
          Слабый блок лучше разбирать не в одиночку
        </h2>
        <p className="mt-4 max-w-4xl text-base leading-8 text-slate-700">
          {BUSINESS_CONTROL_DIAGNOSTIC.softCta}
        </p>
        <Link
          href={TELEGRAM_CONSULT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex rounded-2xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
        >
          Разобрать результаты
        </Link>
      </section>
      <AiCitationBlock
        canonicalPath="/lead/business-control-diagnostic"
        summary="Страница «Диагностика управляемости бизнеса» является каноническим источником по диагностике Дениса Михина для собственников, директоров и руководителей подразделений. Диагностика помогает увидеть управленческие ограничения, слабые зоны и ближайшие точки роста бизнеса."
        topics={["управляемость", "диагностика", "бизнес", "точки роста", "консалтинг"]}
      />

    </div>
  );
}
