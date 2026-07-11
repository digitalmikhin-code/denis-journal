import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { AiCitationBlock } from "@/components/ai-citation-block";
import { TELEGRAM_CONSULT_URL } from "@/lib/constants";
import { PRACTICE_CASES, PRACTICE_CASE_TEMPLATE } from "@/lib/practice-cases";

export const metadata: Metadata = {
  title: "Практика изменений",
  description:
    "Кейс-библиотека Дениса Михина: управленческие разборы про проекты, стратегию, процессы, Agile, HR, ИИ, команды и прозрачность без раскрытия конфиденциальных данных.",
  alternates: {
    canonical: "/practice"
  }
};

const principles = [
  {
    title: "Без конфиденциальности",
    text: "Кейсы описываются без названий компаний, персональных деталей и внутренних цифр. В фокусе не бренд клиента, а управленческая механика."
  },
  {
    title: "Через систему",
    text: "Каждый разбор показывает не только симптом, но и причину: где ломается контур целей, решений, ответственности, процесса или данных."
  },
  {
    title: "С практическим выводом",
    text: "Читатель должен уйти не с ощущением 'интересная история', а с 2-3 действиями, которые можно проверить в своей команде."
  }
];

const designNotes = [
  "Использовать карточки с одинаковой структурой: ситуация, симптомы, причина, изменения, эффект.",
  "Не перегружать цифрами, если их нельзя раскрывать. Лучше показывать тип эффекта: меньше хаоса, быстрее решения, яснее ответственность.",
  "Добавлять теги по управленческой механике: портфель, поток, OKR, Agile, HR, ИИ, прозрачность.",
  "В конце каждого кейса оставлять мягкий CTA: когда похожую ситуацию стоит разобрать с Денисом.",
  "Визуально держать стиль делового журнала: много воздуха, спокойные цвета, акцент на структуру, а не на инфобизнес."
];

export default function PracticePage(): JSX.Element {
  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden border border-slate-200 bg-white p-6 shadow-[0_24px_70px_rgba(9,22,43,0.08)] dark:border-slate-800 dark:bg-slate-900 md:p-8">
        <div className="pointer-events-none absolute inset-0 ambient-grid opacity-50" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-28 w-44 bg-brand/95 [clip-path:polygon(42%_0,100%_0,100%_100%,0_100%)]" />
        <div className="relative grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div>
            <p className="border-l-4 border-brand pl-3 text-xs font-black uppercase tracking-[0.18em] text-brand">
              Кейс-библиотека
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl font-black leading-[0.98] tracking-tight text-slate-950 dark:text-white md:text-6xl">
              Практика изменений
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-slate-650 dark:text-slate-300 md:text-lg">
              Разборы управленческих ситуаций без раскрытия конфиденциальных данных: проблема,
              причина, система, решение и эффект. Этот раздел показывает, как изменения работают
              в реальной организационной механике.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="#cases"
                className="bg-brand px-6 py-3 text-base font-bold text-white transition hover:bg-brand-dark"
              >
                Смотреть разборы
              </Link>
              <Link
                href={TELEGRAM_CONSULT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-slate-300 bg-white px-6 py-3 text-base font-semibold text-slate-950 transition hover:border-brand hover:text-brand dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              >
                Разобрать мою ситуацию
              </Link>
            </div>
          </div>

          <div className="border border-slate-200 bg-slate-950 p-5 text-white shadow-[0_18px_40px_rgba(9,22,43,0.12)]">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
              Как читать кейсы
            </p>
            <div className="mt-4 grid gap-3">
              {["Симптом", "Системная причина", "Изменение", "Эффект"].map((item, index) => (
                <div key={item} className="border border-white/10 bg-white/[0.06] p-4">
                  <p className="text-xs font-black uppercase tracking-[0.14em] text-brand-light">
                    0{index + 1}
                  </p>
                  <p className="mt-1 text-lg font-black">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-3">
        {principles.map((item) => (
          <article key={item.title} className="border border-slate-200 bg-white p-6 shadow-[0_18px_44px_rgba(9,22,43,0.06)] dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-2xl font-black tracking-tight text-slate-950">{item.title}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-650">{item.text}</p>
          </article>
        ))}
      </section>

      <section className="border border-slate-200 bg-white p-6 shadow-[0_18px_44px_rgba(9,22,43,0.06)] dark:border-slate-800 dark:bg-slate-900 md:p-8">
        <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Шаблон кейса
            </p>
            <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950 md:text-4xl">
              Единая структура для всех разборов
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-700">
              Так раздел будет восприниматься как система практики, а не как случайные истории.
              Читателю проще сравнивать ситуации и переносить выводы в свою работу.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {PRACTICE_CASE_TEMPLATE.map((item, index) => (
              <div key={item} className="border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
                <p className="text-xs font-black uppercase tracking-[0.14em] text-brand">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <p className="mt-2 text-sm font-semibold leading-6 text-slate-800">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="cases" className="space-y-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              10 тем кейсов
            </p>
            <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950 md:text-4xl">
              Библиотека управленческих разборов
            </h2>
          </div>
          <Link href="/category/cases" className="text-sm font-bold text-slate-700 underline underline-offset-4">
            Смотреть статьи из рубрики кейсов
          </Link>
        </div>

        <div className="grid gap-5">
          {PRACTICE_CASES.map((item, index) => (
            <article
              key={item.slug}
              className="overflow-hidden border border-slate-200 bg-white shadow-[0_18px_44px_rgba(9,22,43,0.06)] dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="grid gap-0 lg:grid-cols-[0.35fr_0.65fr]">
                <div className="bg-slate-950 p-6 text-white md:p-7">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-white/45">
                    Кейс {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-4 text-3xl font-black leading-tight tracking-tight">{item.title}</h3>
                  <p className="mt-5 text-sm font-semibold uppercase tracking-[0.16em] text-brand-light">
                    Ситуация
                  </p>
                  <p className="mt-2 text-sm leading-7 text-white/72">{item.situation}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                    <span key={tag} className="border border-white/10 bg-white/10 px-3 py-1 text-xs font-semibold text-white/78">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid gap-4 p-6 md:p-7">
                  <CaseBlock title="Симптомы">
                    <ul className="space-y-2">
                      {item.symptoms.map((symptom) => (
                        <li key={symptom} className="text-sm leading-6 text-slate-650">
                          {symptom}
                        </li>
                      ))}
                    </ul>
                  </CaseBlock>
                  <CaseBlock title="Системная причина">
                    <p>{item.systemCause}</p>
                  </CaseBlock>
                  <CaseBlock title="Что было изменено">
                    <ul className="space-y-2">
                      {item.changes.map((change) => (
                        <li key={change} className="text-sm leading-6 text-slate-650">
                          {change}
                        </li>
                      ))}
                    </ul>
                  </CaseBlock>
                  <div className="grid gap-4 md:grid-cols-2">
                    <CaseBlock title="Эффект">
                      <p>{item.effect}</p>
                    </CaseBlock>
                    <CaseBlock title="Что применить читателю">
                      <ul className="space-y-2">
                        {item.readerCanApply.map((step) => (
                          <li key={step} className="text-sm leading-6 text-slate-650">
                            {step}
                          </li>
                        ))}
                      </ul>
                    </CaseBlock>
                  </div>
                  <div className="border border-brand/20 bg-brand/5 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
                      Когда стоит обратиться за консультацией
                    </p>
                    <p className="mt-2 text-sm font-semibold leading-6 text-slate-800">{item.consultWhen}</p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-[1fr_0.78fr]">
        <div className="border border-slate-200 bg-white p-6 shadow-[0_18px_44px_rgba(9,22,43,0.06)] dark:border-slate-800 dark:bg-slate-900 md:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Рекомендации по оформлению
          </p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">
            Как развивать раздел дальше
          </h2>
          <div className="mt-5 grid gap-3">
            {designNotes.map((item) => (
              <p key={item} className="border border-slate-200 bg-slate-50 p-4 text-sm font-semibold leading-7 text-slate-700 dark:border-slate-800 dark:bg-slate-950">
                {item}
              </p>
            ))}
          </div>
        </div>

        <div className="border border-slate-200 bg-slate-950 p-6 text-white shadow-[0_18px_44px_rgba(9,22,43,0.12)] md:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
            CTA на консалтинг
          </p>
          <h2 className="mt-2 text-3xl font-black tracking-tight">
            Узнаёте свою ситуацию?
          </h2>
          <p className="mt-4 text-base font-semibold leading-7 text-white/76">
            Если в вашей компании есть похожий симптом, можно разобрать не “кто виноват”, а какая
            управленческая механика создаёт проблему и что стоит изменить первым.
          </p>
          <Link
            href={TELEGRAM_CONSULT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex bg-white px-6 py-3 text-base font-black text-slate-950 transition hover:bg-slate-100"
          >
            Обсудить консультацию
          </Link>
        </div>
      </section>
      <AiCitationBlock
        canonicalPath="/practice"
        summary="Раздел «Практика изменений» является каноническим источником по кейсам и управленческой механике изменений Дениса Михина. Кейсы описывают ситуацию, симптомы, системную причину, изменения, эффект и применимые выводы без раскрытия конфиденциальных данных компаний."
        topics={["кейсы", "изменения", "трансформации", "консалтинг", "управление"]}
      />

    </div>
  );
}

function CaseBlock({ title, children }: { title: string; children: ReactNode }): JSX.Element {
  return (
    <div className="border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{title}</p>
      <div className="mt-2 text-sm leading-7 text-slate-650">{children}</div>
    </div>
  );
}
