"use client";

import Link from "next/link";
import { type FormEvent, useEffect, useRef, useState } from "react";
import { trackMetrikaGoal } from "@/lib/analytics";
import { LEADS_API_URL, TELEGRAM_CONSULT_URL } from "@/lib/constants";
import { HR_FAQ, HR_SOLUTIONS, type HrPackage, type HrSolution } from "@/lib/hr-subscription-data";

type PackageSelection = { solution: HrSolution; item: HrPackage } | null;
type FormStatus = "idle" | "sending" | "success" | "error";

const buttonPrimary = "inline-flex min-h-12 items-center justify-center rounded-lg bg-[#2F6BFF] px-5 py-3 text-sm font-extrabold text-white transition hover:bg-[#2158d9] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2F6BFF]";
const buttonSecondary = "inline-flex min-h-12 items-center justify-center rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-extrabold text-slate-900 transition hover:border-[#2F6BFF] hover:text-[#2F6BFF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2F6BFF]";

export function HrSubscriptionClient(): JSX.Element {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [selection, setSelection] = useState<PackageSelection>(null);
  const detailsRef = useRef<HTMLElement>(null);

  useEffect(() => {
    trackMetrikaGoal("hr_page_view");
  }, []);

  const activeSolution = HR_SOLUTIONS.find((item) => item.id === activeId) ?? null;

  function openSolution(solution: HrSolution): void {
    setActiveId(solution.id);
    trackMetrikaGoal("hr_category_click", { direction: solution.title });
    trackMetrikaGoal("hr_package_view", { direction: solution.title });
    window.setTimeout(() => detailsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 20);
  }

  function choosePackage(solution: HrSolution, item: HrPackage): void {
    setSelection({ solution, item });
    trackMetrikaGoal("hr_package_select", { direction: solution.title, package: item.name, price: item.price });
    window.setTimeout(() => document.getElementById("hr-form")?.scrollIntoView({ behavior: "smooth", block: "start" }), 20);
  }

  function discussTask(source: string): void {
    setSelection(null);
    trackMetrikaGoal("hr_contact_click", { source });
    window.setTimeout(() => document.getElementById("hr-form")?.scrollIntoView({ behavior: "smooth", block: "start" }), 20);
  }

  return (
    <div className="space-y-20 pb-6 text-[#1F2328] dark:text-slate-100">
      <section className="relative overflow-hidden rounded-[10px] border border-slate-200 bg-white px-5 py-10 dark:border-slate-800 dark:bg-slate-900 md:px-10 md:py-14 lg:px-14">
        <div className="relative grid gap-10 lg:grid-cols-[1.12fr_0.88fr] lg:items-stretch">
          <div>
            <Eyebrow>HR по подписке</Eyebrow>
            <h1 className="mt-5 max-w-[17ch] text-4xl font-black leading-[1.02] tracking-[-0.04em] text-slate-950 dark:text-white md:text-[3.55rem]">
              Не нанимайте целый HR-отдел, если вам нужна <span className="text-[#2F6BFF]">конкретная HR-задача.</span>
            </h1>
            <p className="mt-6 max-w-[69ch] text-base leading-8 text-slate-600 dark:text-slate-300 md:text-lg">
              Подбор персонала, адаптация, HR-аудит, оргструктура, аналитика, развитие сотрудников и управление HR-функцией — подключайте только то, что необходимо вашему бизнесу сейчас.
            </p>
            <p className="mt-5 text-sm font-bold text-slate-800 dark:text-slate-200">
              Фиксированная стоимость <span className="px-2 text-[#2F6BFF]">•</span> Понятный объем работ <span className="px-2 text-[#2F6BFF]">•</span> Конкретный результат
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#solutions" className={buttonPrimary}>Выбрать HR-решение</a>
              <button type="button" onClick={() => discussTask("hero")} className={buttonSecondary}>Обсудить задачу</button>
            </div>
            <div className="mt-9 border-l-2 border-[#2F6BFF] pl-4">
              <p className="font-extrabold text-slate-950 dark:text-white">Денис Михин</p>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">HR Business Partner • HR Projects • Organizational Development</p>
            </div>
          </div>

          <div className="relative flex min-h-[530px] flex-col overflow-hidden rounded-[10px] bg-[#101B36] p-5 text-white md:p-6">
            <div className="absolute -right-16 -top-14 size-48 rounded-full border-[32px] border-[#2F6BFF]/35" />
            <div className="absolute -left-20 top-44 size-44 rounded-full bg-[#38BDF8]/10 blur-2xl" />
            <div className="relative flex items-center justify-between text-[11px] font-black uppercase tracking-[0.18em] text-white/55">
              <span>HR-конструктор</span>
              <span>01—06</span>
            </div>
            <p className="relative mt-10 max-w-[12ch] text-3xl font-black leading-[1.05] tracking-[-0.03em] md:text-4xl">
              Соберите HR-функцию под задачу бизнеса
            </p>
            <div className="relative mt-auto grid grid-cols-2 gap-2 pt-10">
              {[
                ["Подбор", "bg-[#2F6BFF] text-white"],
                ["Адаптация", "bg-[#BDEAD7] text-[#13352A]"],
                ["Аналитика", "bg-[#F4C95D] text-[#3A2A05]"],
                ["Оргструктура", "bg-[#D9D1FF] text-[#29234E]"],
                ["HRBP", "bg-[#087F8C] text-white"],
                ["HRD", "bg-[#EF745B] text-white"]
              ].map(([item, colors], index) => (
                <div key={item} className={`flex min-h-24 items-end rounded-lg p-4 ${colors}`}>
                  <span className="text-sm font-extrabold">{String(index + 1).padStart(2, "0")} · {item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <SectionHeading eyebrow="Модель работы" title="Не нужен весь HR? Подключите только необходимую функцию" />
        <div>
          <p className="text-base leading-8 text-slate-600 dark:text-slate-300">Не обязательно создавать большой HR-отдел или покупать комплекс консалтинга целиком. Выберите конкретную задачу и подключите готовый пакет с заранее понятными составом работ, стоимостью и результатом.</p>
          <div className="mt-6 grid gap-px overflow-hidden rounded-lg border border-slate-200 bg-slate-200 sm:grid-cols-4 dark:border-slate-700 dark:bg-slate-700">
            {["Одна задача", "Несколько функций", "HRBP", "HRD"].map((item, index) => (
              <div key={item} className="bg-white p-4 dark:bg-slate-900">
                <p className="text-xs font-black text-[#2F6BFF]">0{index + 1}</p>
                <p className="mt-2 text-sm font-extrabold">{item}{index < 3 ? " →" : ""}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="solutions" className="scroll-mt-40">
        <SectionHeading eyebrow="14 направлений" title="Выберите HR-задачу" text="Выберите направление — внутри уже собраны готовые пакеты с фиксированной стоимостью и понятным результатом." />
        <div className="mt-9 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {HR_SOLUTIONS.map((solution, index) => (
            <article key={solution.id} className="group flex min-h-[390px] flex-col rounded-[10px] border border-slate-200 bg-white p-5 transition hover:-translate-y-1 hover:border-[#2F6BFF] hover:shadow-[0_16px_32px_rgba(31,35,40,0.07)] dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-start justify-between gap-4">
                <span className="text-xs font-black tracking-[0.12em] text-[#2F6BFF]">{String(index + 1).padStart(2, "0")}</span>
                <span className="rounded-md bg-[#F1F5FF] px-3 py-1.5 text-xs font-extrabold text-[#2F6BFF] dark:bg-slate-800">{solution.startingPrice}</span>
              </div>
              <h3 className="mt-5 text-2xl font-black tracking-tight text-slate-950 dark:text-white">{solution.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{solution.description}</p>
              <div className="mt-5 flex flex-wrap gap-1.5">
                {solution.problems.map((problem) => <span key={problem} className="rounded-md border border-slate-200 px-2.5 py-1.5 text-xs font-semibold text-slate-600 dark:border-slate-700 dark:text-slate-300">{problem}</span>)}
              </div>
              <div className="mt-auto pt-6">
                <p className="border-l-2 border-[#2F6BFF] pl-3 text-sm font-bold leading-6 text-slate-800 dark:text-slate-200">{solution.result}</p>
                <button type="button" onClick={() => openSolution(solution)} className="mt-5 flex min-h-12 w-full items-center justify-between rounded-lg bg-slate-950 px-4 py-3 text-sm font-extrabold text-white transition group-hover:bg-[#2F6BFF] dark:bg-white dark:text-slate-950 dark:group-hover:bg-[#2F6BFF] dark:group-hover:text-white">
                  Посмотреть пакеты <span aria-hidden>→</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {activeSolution ? (
        <section ref={detailsRef} className="scroll-mt-36 rounded-[10px] border border-[#2F6BFF]/30 bg-[#F5F8FF] p-5 dark:bg-slate-950 md:p-8" aria-live="polite">
          <div className="flex flex-col gap-5 border-b border-[#2F6BFF]/20 pb-7 md:flex-row md:items-end md:justify-between">
            <div>
              <Eyebrow>Пакеты направления</Eyebrow>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 dark:text-white md:text-4xl">{activeSolution.title}</h2>
              <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600 dark:text-slate-300">{activeSolution.description} {activeSolution.result}</p>
            </div>
            <a href="#solutions" className="text-sm font-extrabold text-[#2F6BFF]">← Вернуться к каталогу</a>
          </div>

          <div className={`mt-7 grid gap-4 ${activeSolution.packages.length === 4 ? "lg:grid-cols-2 xl:grid-cols-4" : "lg:grid-cols-3"}`}>
            {activeSolution.packages.map((item) => (
              <article key={item.name} className={`relative flex flex-col rounded-[10px] border bg-white p-5 dark:bg-slate-900 ${item.label ? "border-[#2F6BFF] shadow-[0_12px_28px_rgba(47,107,255,0.1)]" : "border-slate-200 dark:border-slate-800"}`}>
                {item.label ? <span className="mb-4 w-fit rounded-md bg-[#E9F0FF] px-2.5 py-1 text-[11px] font-black uppercase tracking-wide text-[#2F6BFF] dark:bg-slate-800">{item.label}</span> : null}
                <h3 className="text-xl font-black text-slate-950 dark:text-white">{item.name}</h3>
                <p className="mt-3 text-3xl font-black tracking-tight text-slate-950 dark:text-white">{item.price}</p>
                <p className="mt-4 min-h-12 text-sm font-semibold leading-6 text-slate-600 dark:text-slate-300">{item.lead}</p>
                <ul className="mt-5 space-y-2.5 border-t border-slate-100 pt-5 dark:border-slate-800">
                  {item.features.map((feature) => <li key={feature} className="flex gap-2 text-sm leading-6 text-slate-700 dark:text-slate-300"><span className="mt-2 size-1.5 shrink-0 rounded-full bg-[#2F6BFF]" />{feature}</li>)}
                </ul>
                {item.result ? <p className="mt-5 rounded-md bg-[#F5F8FF] p-3 text-sm font-bold leading-6 text-slate-800 dark:bg-slate-950 dark:text-slate-200">Результат: {item.result}</p> : null}
                {activeSolution.id === "automation" ? <p className="mt-4 text-xs leading-5 text-slate-500">Внешние сервисы, лицензии и платные интеграции оплачиваются заказчиком отдельно.</p> : null}
                <button type="button" onClick={() => choosePackage(activeSolution, item)} className={`${buttonPrimary} mt-6 w-full`}>Заказать пакет</button>
              </article>
            ))}
          </div>
          {activeSolution.id === "recruitment" ? <p className="mt-5 rounded-lg border border-slate-200 bg-white p-4 text-sm leading-6 text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">Пакет определяет количество активных вакансий одновременно. Мы ведем их в рамках действующего периода работы; пакет не гарантирует определенное количество наймов за месяц.</p> : null}
          <div className="mt-5 grid gap-3 text-sm leading-6 text-slate-600 md:grid-cols-3 dark:text-slate-300">
            <p className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"><strong className="block text-slate-950 dark:text-white">Старт</strong>После согласования пакета и 50% предоплаты.</p>
            <p className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"><strong className="block text-slate-950 dark:text-white">Работа</strong>По согласованному объему, данным и контрольным точкам.</p>
            <p className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"><strong className="block text-slate-950 dark:text-white">Финальный расчет</strong>После контрольного результата конкретного пакета.</p>
          </div>
        </section>
      ) : null}

      <section id="process" className="scroll-mt-36">
        <SectionHeading eyebrow="Процесс" title="Начать можно без долгих встреч и переговоров" />
        <div className="mt-8 grid gap-px overflow-hidden rounded-[10px] border border-slate-200 bg-slate-200 md:grid-cols-2 lg:grid-cols-4 dark:border-slate-800 dark:bg-slate-800">
          {[
            ["01", "Выберите пакет", "Направление и подходящий объем работ."],
            ["02", "Передайте задачу", "Исходные данные и контакт ответственного."],
            ["03", "Получите счет", "Работа начинается после 50% предоплаты."],
            ["04", "Получите результат", "Оставшиеся 50% — после контрольного результата пакета."]
          ].map(([number, title, text]) => <div key={number} className="bg-white p-5 dark:bg-slate-900"><p className="text-xs font-black text-[#2F6BFF]">{number}</p><h3 className="mt-3 text-lg font-black">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{text}</p></div>)}
        </div>
        <p className="mt-4 border-l-4 border-[#2F6BFF] bg-[#F5F8FF] p-4 text-sm font-bold text-slate-800 dark:bg-slate-900 dark:text-slate-200">Без предоплаты работы по пакету не начинаются.</p>
      </section>

      <section>
        <SectionHeading eyebrow="Почему подписка" title="HR-функция как понятный продукт" />
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {[
            ["Понятная стоимость", "Цена и состав каждого пакета известны заранее."],
            ["Одна задача", "Не нужно сразу передавать всю HR-функцию."],
            ["Без новой позиции", "Не требуется нанимать дополнительного сотрудника в штат."],
            ["Понятный результат", "Заранее определено, что именно получает клиент."],
            ["Можно масштабировать", "Подключайте другие функции по мере необходимости."]
          ].map(([title, text], index) => <article key={title} className="rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"><p className="text-xs font-black text-[#2F6BFF]">0{index + 1}</p><h3 className="mt-4 font-black">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{text}</p></article>)}
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        <article className="rounded-[10px] border border-slate-200 bg-slate-950 p-7 text-white md:p-8">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-blue-300">Несколько HR-функций</p>
          <h2 className="mt-4 text-3xl font-black">HRBP по подписке</h2>
          <p className="mt-3 text-4xl font-black">от 89 000 ₽ <span className="text-base font-semibold text-white/60">/ месяц</span></p>
          <p className="mt-5 max-w-xl text-sm leading-7 text-white/70">Постоянный HR-бизнес-партнер для работы с руководителями, командами, текучестью, развитием и аналитикой.</p>
          <button type="button" onClick={() => openSolution(HR_SOLUTIONS.find((item) => item.id === "hrbp")!)} className="mt-6 inline-flex min-h-12 items-center rounded-lg bg-white px-5 py-3 text-sm font-extrabold text-slate-950">Посмотреть HRBP</button>
        </article>
        <article className="rounded-[10px] border border-[#2F6BFF] bg-[#2F6BFF] p-7 text-white md:p-8">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-white/70">Управление всей HR-функцией</p>
          <h2 className="mt-4 text-3xl font-black">HRD по подписке</h2>
          <p className="mt-3 text-4xl font-black">от 149 000 ₽ <span className="text-base font-semibold text-white/70">/ месяц</span></p>
          <p className="mt-5 max-w-xl text-sm leading-7 text-white/80">Полноценное управление HR-функцией, стратегия и организационное развитие без найма HR-директора в штат.</p>
          <button type="button" onClick={() => openSolution(HR_SOLUTIONS.find((item) => item.id === "hrd")!)} className="mt-6 inline-flex min-h-12 items-center rounded-lg border border-white bg-transparent px-5 py-3 text-sm font-extrabold text-white">Посмотреть HRD</button>
        </article>
      </section>

      <section id="about" className="scroll-mt-36 grid gap-8 rounded-[10px] border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 md:p-9 lg:grid-cols-[0.8fr_1.2fr]">
        <div><Eyebrow>О специалисте</Eyebrow><h2 className="mt-4 text-4xl font-black tracking-tight">Денис Михин</h2><p className="mt-3 text-sm font-bold text-[#2F6BFF]">HR Business Partner • HR Projects • Organizational Development</p></div>
        <div><p className="text-base leading-8 text-slate-600 dark:text-slate-300">Практик в области HR, организационного развития, управления проектами и изменений. Основной фокус — построение работающих систем и реализация изменений, которые связаны с задачами бизнеса.</p><Link href="/" onClick={() => trackMetrikaGoal("hr_journal_click")} className="mt-6 inline-flex text-sm font-extrabold text-[#2F6BFF]">Перейти в экспертный журнал →</Link></div>
      </section>

      <section className="grid gap-6 rounded-[10px] border border-slate-200 bg-[#F5F8FF] p-6 dark:border-slate-800 dark:bg-slate-900 md:p-9 lg:grid-cols-[1fr_auto] lg:items-center">
        <div><Eyebrow>Помощь с выбором</Eyebrow><h2 className="mt-3 text-3xl font-black tracking-tight md:text-4xl">Не знаете, какой пакет подойдет?</h2><p className="mt-3 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300">Опишите задачу — определим, какое HR-решение действительно необходимо вашему бизнесу.</p></div>
        <button type="button" onClick={() => discussTask("choice_help")} className={buttonPrimary}>Обсудить задачу</button>
      </section>

      <section id="faq" className="scroll-mt-36 grid gap-8 lg:grid-cols-[0.65fr_1.35fr]">
        <SectionHeading eyebrow="FAQ" title="Коротко о важных условиях" />
        <div className="divide-y divide-slate-200 rounded-[10px] border border-slate-200 bg-white px-5 dark:divide-slate-800 dark:border-slate-800 dark:bg-slate-900">
          {HR_FAQ.map(([question, answer]) => <details key={question} className="group py-1"><summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 py-3 text-left font-extrabold"><span>{question}</span><span className="text-xl text-[#2F6BFF] transition group-open:rotate-45" aria-hidden>+</span></summary><p className="max-w-3xl pb-5 text-sm leading-7 text-slate-600 dark:text-slate-300">{answer}</p></details>)}
        </div>
      </section>

      <HrLeadForm selection={selection} />

      <section className="rounded-[10px] bg-slate-950 px-6 py-12 text-white md:px-10 md:py-16">
        <Eyebrow light>HR по подписке</Eyebrow>
        <h2 className="mt-4 max-w-[18ch] text-4xl font-black tracking-tight md:text-5xl">Подключите HR-функцию, которая нужна вашему бизнесу сейчас</h2>
        <p className="mt-5 max-w-2xl text-base leading-7 text-white/70">Начните с одной задачи. Если потребуется — постепенно подключайте остальные HR-направления.</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row"><a href="#solutions" className={buttonPrimary}>Выбрать HR-решение</a><button type="button" onClick={() => discussTask("final_cta")} className="inline-flex min-h-12 items-center justify-center rounded-lg border border-white/40 px-5 py-3 text-sm font-extrabold text-white transition hover:border-white">Обсудить задачу</button></div>
      </section>

      <div className="fixed inset-x-3 bottom-3 z-30 rounded-lg border border-slate-200 bg-white/95 p-2 shadow-[0_12px_30px_rgba(15,23,42,0.15)] backdrop-blur md:hidden dark:border-slate-700 dark:bg-slate-900/95">
        <a href="#solutions" className={`${buttonPrimary} w-full`}>Выбрать HR-решение</a>
      </div>
    </div>
  );
}

function HrLeadForm({ selection }: { selection: PackageSelection }): JSX.Element {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [started, setStarted] = useState(false);

  function markStart(): void {
    if (!started) {
      setStarted(true);
      trackMetrikaGoal("hr_form_start", { direction: selection?.solution.title, package: selection?.item.name, price: selection?.item.price });
    }
  }

  async function submit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    setStatus("sending");
    const formData = new FormData(event.currentTarget);
    try {
      const response = await fetch(LEADS_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.get("name"),
          company: formData.get("company"),
          contact: formData.get("contact"),
          preferredContact: formData.get("preferredContact"),
          interest: selection?.solution.title ?? formData.get("interest"),
          package: selection?.item.name,
          price: selection?.item.price,
          result: formData.get("task"),
          source: "hr-subscription",
          pageUrl: window.location.href
        })
      });
      if (!response.ok) throw new Error("Lead API request failed");
      setStatus("success");
      trackMetrikaGoal("hr_form_submit", { direction: selection?.solution.title, package: selection?.item.name, price: selection?.item.price });
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="hr-form" className="scroll-mt-36 rounded-[10px] border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 md:p-9">
      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div><Eyebrow>Заявка</Eyebrow><h2 className="mt-4 text-3xl font-black tracking-tight md:text-4xl">{selection ? "Заказать выбранный пакет" : "Обсудить HR-задачу"}</h2><p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300">Коротко опишите контекст и оставьте удобный контакт. Длинная анкета не нужна.</p>{selection ? <div className="mt-6 rounded-lg border border-[#2F6BFF]/30 bg-[#F5F8FF] p-4 dark:bg-slate-950"><p className="text-xs font-black uppercase text-[#2F6BFF]">Вы выбрали</p><p className="mt-2 font-black">{selection.solution.title} · {selection.item.name}</p><p className="mt-1 text-2xl font-black">{selection.item.price}</p></div> : null}</div>
        <form onSubmit={submit} onFocus={markStart} className="grid gap-4 sm:grid-cols-2">
          <Field label="Имя" name="name" required />
          <Field label="Компания — необязательно" name="company" />
          <Field label="Телефон / Telegram / Email" name="contact" required />
          <label className="block"><span className="mb-1.5 block text-sm font-bold">Как с вами связаться?</span><select name="preferredContact" required className="min-h-12 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm outline-none focus:border-[#2F6BFF] dark:border-slate-700 dark:bg-slate-950"><option>Telegram</option><option>WhatsApp</option><option>Телефон</option><option>Email</option></select></label>
          {!selection ? <label className="block sm:col-span-2"><span className="mb-1.5 block text-sm font-bold">Что вас интересует?</span><select name="interest" required defaultValue="" className="min-h-12 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm outline-none focus:border-[#2F6BFF] dark:border-slate-700 dark:bg-slate-950"><option value="" disabled>Выберите направление</option>{HR_SOLUTIONS.map((item) => <option key={item.id} value={item.title}>{item.title}</option>)}</select></label> : null}
          <label className="block sm:col-span-2"><span className="mb-1.5 block text-sm font-bold">Коротко опишите задачу — необязательно</span><textarea name="task" rows={4} className="w-full rounded-lg border border-slate-300 bg-white px-3 py-3 text-sm outline-none focus:border-[#2F6BFF] dark:border-slate-700 dark:bg-slate-950" /></label>
          <label className="flex items-start gap-3 text-xs leading-5 text-slate-600 sm:col-span-2 dark:text-slate-300"><input type="checkbox" required className="mt-1 size-4 accent-[#2F6BFF]" /><span>Согласен на обработку персональных данных в соответствии с <Link href="/privacy" className="underline">политикой конфиденциальности</Link>.</span></label>
          <button type="submit" disabled={status === "sending"} className={`${buttonPrimary} sm:col-span-2 sm:w-fit disabled:cursor-wait disabled:opacity-60`}>{status === "sending" ? "Отправляем…" : "Отправить заявку"}</button>
          {status === "success" ? <p className="rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm font-bold text-emerald-800 sm:col-span-2">Спасибо. Заявка отправлена. Свяжемся с вами по указанному контакту.</p> : null}
          {status === "error" ? <p className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm font-bold text-red-800 sm:col-span-2">Не удалось отправить заявку. Попробуйте еще раз или <Link href={TELEGRAM_CONSULT_URL} target="_blank" onClick={() => trackMetrikaGoal("hr_contact_click", { source: "form_error" })} className="underline">напишите в Telegram</Link>.</p> : null}
        </form>
      </div>
    </section>
  );
}

function Field({ label, name, required = false }: { label: string; name: string; required?: boolean }): JSX.Element {
  return <label className="block"><span className="mb-1.5 block text-sm font-bold">{label}</span><input name={name} required={required} className="min-h-12 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm outline-none focus:border-[#2F6BFF] dark:border-slate-700 dark:bg-slate-950" /></label>;
}

function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }): JSX.Element {
  return <p className={`border-l-4 pl-3 text-xs font-black uppercase tracking-[0.18em] ${light ? "border-blue-400 text-blue-300" : "border-[#2F6BFF] text-[#2F6BFF]"}`}>{children}</p>;
}

function SectionHeading({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }): JSX.Element {
  return <div><Eyebrow>{eyebrow}</Eyebrow><h2 className="mt-4 max-w-[23ch] text-3xl font-black leading-tight tracking-[-0.025em] text-slate-950 dark:text-white md:text-4xl">{title}</h2>{text ? <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600 dark:text-slate-300">{text}</p> : null}</div>;
}
