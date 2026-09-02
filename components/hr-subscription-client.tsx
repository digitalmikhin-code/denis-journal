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
    <div className="hr-subscription-shell space-y-20 pb-6 text-[#1F2328] dark:text-slate-100">
      <section className="relative overflow-hidden rounded-[10px] border border-slate-200 bg-white px-5 py-10 dark:border-slate-800 dark:bg-slate-900 md:px-10 md:py-14 lg:px-14">
        <div className="relative grid gap-10 lg:grid-cols-[1.12fr_0.88fr] lg:items-stretch">
          <div>
            <Eyebrow>HR по подписке</Eyebrow>
            <h1 className="mt-5 max-w-[17ch] text-4xl font-black leading-[1.02] tracking-[-0.04em] text-slate-950 dark:text-white md:text-[3.55rem]">
              HR, который решает задачи бизнеса — <span className="text-[#2F6BFF]">без расширения штата</span>
            </h1>
            <p className="mt-6 max-w-[69ch] text-base leading-8 text-slate-600 dark:text-slate-300 md:text-lg">
              Подбор, адаптация, удержание, HR-аналитика, организационное развитие или полноценная функция HRBP/HRD. Подключайте именно ту HR-компетенцию, которая нужна бизнесу сейчас.
            </p>
            <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-sm font-bold text-slate-800 dark:text-slate-200">
              {["Фиксированная стоимость", "Под конкретную задачу", "Без найма в штат", "Можно масштабировать"].map((item) => <span key={item} className="before:mr-2 before:text-[#2F6BFF] before:content-['•']">{item}</span>)}
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button type="button" onClick={() => discussTask("hero_match")} className={buttonPrimary}>Подобрать HR-решение</button>
              <a href="#solutions" className={buttonSecondary}>Посмотреть услуги</a>
            </div>
            <div className="mt-9 border-l-2 border-[#2F6BFF] pl-4">
              <p className="font-extrabold text-slate-950 dark:text-white">Денис Михин</p>
              <p className="mt-1 text-sm font-bold text-slate-600 dark:text-slate-300">Решаю задачи бизнеса через HR</p>
            </div>
          </div>

          <div className="relative flex min-h-[530px] flex-col overflow-hidden rounded-[10px] bg-[#101B36] p-5 text-white md:p-6">
            <div className="absolute -right-16 -top-14 size-48 rounded-full border-[32px] border-[#2F6BFF]/35" />
            <div className="absolute -left-20 top-44 size-44 rounded-full bg-[#38BDF8]/10 blur-2xl" />
            <div className="relative flex items-center justify-between text-[11px] font-black uppercase tracking-[0.18em] text-white/55">
              <span>HR-конструктор</span>
              <span>01—06</span>
            </div>
            <p className="relative mt-10 max-w-[13ch] text-3xl font-black leading-[1.05] tracking-[-0.03em] md:text-4xl">
              Компетенция под задачу. Без новой позиции в штате.
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
        <SectionHeading eyebrow="Модель работы" title="HR по подписке — внешняя HR-функция под задачи бизнеса" />
        <div>
          <p className="text-base leading-8 text-slate-600 dark:text-slate-300">Не каждой компании нужен большой HR-отдел. Иногда бизнесу необходимо решить конкретную задачу: наладить подбор, снизить текучесть, построить адаптацию, провести HR-аудит, внедрить аналитику или подключить HRBP/HRD.</p>
          <p className="mt-4 text-base leading-8 text-slate-600 dark:text-slate-300">HR по подписке позволяет получить необходимую компетенцию в нужном объёме без создания дополнительной штатной позиции.</p>
          <p className="mt-6 rounded-[10px] border-l-4 border-[#2F6BFF] bg-[#F5F8FF] p-5 text-lg font-black leading-7 text-slate-950 dark:bg-slate-900 dark:text-white">Вы платите не за присутствие HR в компании, а за конкретный объём работы и понятный результат.</p>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Ситуации бизнеса" title="Когда бизнесу нужен HR по подписке" />
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {[
            ["Компания растёт", "Количество сотрудников увеличивается, а HR-процессы не успевают за развитием бизнеса."],
            ["Руководители занимаются HR сами", "Подбор, адаптация, конфликты и текучесть забирают время собственника и руководителей."],
            ["Нанимать HRD пока рано", "Задачи уровня HRD уже появились, но отдельная дорогостоящая позиция пока экономически неоправданна."],
            ["HR есть, но не хватает экспертизы", "Операционная работа идёт, но отдельные проекты требуют дополнительных компетенций."],
            ["Есть проблема, но непонятна причина", "Растёт текучесть, долго закрываются вакансии или сотрудники плохо проходят адаптацию."],
            ["Нужно построить HR с нуля", "Управление людьми пора превращать в полноценную и понятную систему."]
          ].map(([title, text], index) => (
            <article key={title} className="rounded-[10px] border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
              <p className="text-xs font-black text-[#2F6BFF]">0{index + 1}</p>
              <h3 className="mt-4 text-xl font-black text-slate-950 dark:text-white">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{text}</p>
            </article>
          ))}
        </div>
        <div className="mt-5 flex flex-col gap-4 rounded-[10px] bg-slate-950 p-5 text-white md:flex-row md:items-center md:justify-between">
          <p className="max-w-3xl font-bold leading-7">Не знаете, какое решение необходимо именно вашей компании? Достаточно описать бизнес-задачу.</p>
          <button type="button" onClick={() => discussTask("business_situations")} className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-lg bg-white px-5 py-3 text-sm font-extrabold text-slate-950">Обсудить задачу</button>
        </div>
      </section>

      <section className="grid gap-8 rounded-[10px] border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 md:p-9 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHeading eyebrow="Подход" title="HR начинается не с HR" />
        <div>
          <div className="space-y-2 text-lg font-black text-slate-950 dark:text-white">
            <p>Проблема с наймом не всегда решается увеличением количества кандидатов.</p>
            <p>Текучесть — повышением зарплаты.</p>
            <p>Низкая эффективность — дополнительным обучением.</p>
          </div>
          <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-300">Причина может находиться в системе управления, структуре, роли руководителя, распределении ответственности, мотивации, процессах или взаимодействии подразделений. Поэтому работа начинается с понимания бизнес-задачи, а не с выбора очередного HR-инструмента.</p>
          <p className="mt-6 border-l-4 border-[#2F6BFF] pl-4 text-2xl font-black text-[#2F6BFF]">Сначала бизнес-задача. Затем HR-решение.</p>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Архитектура услуг" title="Карта HR-решений" text="Четыре направления — от одной задачи до полноценной внешней HR-функции." />
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {[
            ["Люди", "Подбор • Адаптация • Оценка • Обучение • Удержание", "Помогаю находить, быстрее вводить в работу, развивать и удерживать необходимых бизнесу сотрудников.", "border-[#2F6BFF]"],
            ["HR-система", "HR-аудит • Процессы • Аналитика • Автоматизация • Кадровый резерв", "Помогаю превратить отдельные HR-процессы в управляемую систему с понятными показателями и ответственностью.", "border-[#087F8C]"],
            ["Организация", "Оргструктура • HR Project Office • Организационное развитие • Изменения", "Помогаю перестраивать организацию и реализовывать изменения при росте и трансформации бизнеса.", "border-[#7C6EE6]"],
            ["Внешняя HR-функция", "HRBP по подписке • HRD по подписке", "Функция HRBP или HRD без необходимости создавать отдельную штатную позицию.", "border-[#EF745B]"]
          ].map(([title, items, text, border]) => (
            <article key={title} className={`rounded-[10px] border border-slate-200 border-l-4 ${border} bg-white p-6 dark:border-y-slate-800 dark:border-r-slate-800 dark:bg-slate-900`}>
              <h3 className="text-2xl font-black text-slate-950 dark:text-white">{title}</h3>
              <p className="mt-3 text-sm font-extrabold leading-6 text-[#2F6BFF]">{items}</p>
              <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="solutions" className="scroll-mt-40">
        <SectionHeading eyebrow="14 направлений" title="Каталог готовых HR-продуктов" text="Выберите направление — внутри собраны пакеты с открытой стоимостью, конкретным составом работ и понятным результатом." />
        <div className="mt-9 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {HR_SOLUTIONS.map((solution, index) => (
            <article key={solution.id} className="group flex flex-col rounded-[10px] border border-slate-200 bg-white p-5 transition hover:-translate-y-1 hover:border-[#2F6BFF] hover:shadow-[0_16px_32px_rgba(31,35,40,0.07)] dark:border-slate-800 dark:bg-slate-900 md:min-h-[390px]">
              <div className="flex items-start justify-between gap-4">
                <span className="text-xs font-black tracking-[0.12em] text-[#2F6BFF]">{String(index + 1).padStart(2, "0")}</span>
                <span className="rounded-md bg-[#F1F5FF] px-3 py-1.5 text-xs font-extrabold text-[#2F6BFF] dark:bg-slate-800">{solution.startingPrice}</span>
              </div>
              <h3 className="mt-5 text-2xl font-black tracking-tight text-slate-950 dark:text-white">{solution.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{solution.description}</p>
              <div className="mt-5 hidden flex-wrap gap-1.5 sm:flex">
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
        <SectionHeading eyebrow="Формат работы" title="Выберите подходящий формат" />
        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          <article className="rounded-[10px] border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 md:p-8">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-[#2F6BFF]">Разовый HR-проект</p>
            <h3 className="mt-4 text-2xl font-black text-slate-950 dark:text-white">Конкретная задача — определённый результат</h3>
            <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">HR-аудит, адаптация, оценка, аналитика, оргструктура, автоматизация, развитие или отдельный проект по подбору.</p>
          </article>
          <article className="rounded-[10px] border border-[#2F6BFF] bg-[#F5F8FF] p-6 dark:bg-slate-900 md:p-8">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-[#2F6BFF]">HR по подписке</p>
            <h3 className="mt-4 text-2xl font-black text-slate-950 dark:text-white">Регулярные задачи — постоянное сопровождение</h3>
            <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">HRBP, HRD, HR Project Office, регулярный подбор или комплексное HR-сопровождение.</p>
          </article>
        </div>
        <p className="mt-5 border-l-4 border-[#2F6BFF] pl-4 text-xl font-black text-slate-950 dark:text-white">Не нужно покупать больше HR, чем действительно необходимо вашему бизнесу.</p>
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

      <section>
        <SectionHeading eyebrow="Экономика модели" title="Зачем содержать целую функцию, если можно подключить нужную экспертизу?" />
        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          <article className="rounded-[10px] border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 md:p-8">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">Штатная позиция</p>
            <ul className="mt-5 grid gap-3 text-sm font-semibold text-slate-700 sm:grid-cols-2 dark:text-slate-300">
              {["Постоянный ФОТ", "Налоги и взносы", "Поиск специалиста", "Время на найм", "Адаптация", "Рабочее место", "Постоянная загрузка", "Управленческие затраты"].map((item) => <li key={item} className="flex gap-3"><span className="text-slate-400">—</span>{item}</li>)}
            </ul>
          </article>
          <article className="rounded-[10px] border border-[#2F6BFF] bg-slate-950 p-6 text-white md:p-8">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-blue-300">HR по подписке</p>
            <ul className="mt-5 grid gap-3 text-sm font-semibold text-white/80 sm:grid-cols-2">
              {["Понятный бюджет", "Конкретный объём", "Нужная экспертиза", "Быстрый старт", "Без новой позиции", "Гибкий объём", "Завершение после задачи"].map((item) => <li key={item} className="flex gap-3"><span className="text-blue-300">✓</span>{item}</li>)}
            </ul>
          </article>
        </div>
        <p className="mt-5 rounded-[10px] bg-[#F5F8FF] p-5 text-center text-lg font-black text-slate-950 dark:bg-slate-900 dark:text-white">Бизнес получает HR-компетенцию тогда, когда она нужна, и в том объёме, который действительно необходим.</p>
      </section>

      <section>
        <SectionHeading eyebrow="Два пути" title="Начните так, как удобно вам" />
        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          <article className="flex flex-col rounded-[10px] border border-[#2F6BFF] bg-white p-6 dark:bg-slate-900 md:p-8">
            <p className="text-xs font-black text-[#2F6BFF]">СЦЕНАРИЙ 01</p>
            <h3 className="mt-4 text-3xl font-black text-slate-950 dark:text-white">Я знаю, что мне нужно</h3>
            <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300">Выберите услугу, изучите условия, оставьте заявку и начните работу без предварительных встреч и продающих созвонов.</p>
            <p className="mt-5 text-sm font-extrabold text-slate-800 dark:text-slate-200">Выбрать → Изучить → Заказать → 50% → Старт</p>
            <a href="#solutions" className={`${buttonPrimary} mt-7 w-fit`}>Заказать услугу</a>
          </article>
          <article className="flex flex-col rounded-[10px] border border-slate-200 bg-[#F5F8FF] p-6 dark:border-slate-800 dark:bg-slate-900 md:p-8">
            <p className="text-xs font-black text-[#2F6BFF]">СЦЕНАРИЙ 02</p>
            <h3 className="mt-4 text-3xl font-black text-slate-950 dark:text-white">Я знаю проблему, но не знаю решения</h3>
            <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300">Опишите бизнес-ситуацию: текучесть, долгий найм, перегруженных руководителей, быстрый рост или отсутствие HR-системы.</p>
            <p className="mt-5 text-sm font-extrabold text-slate-800 dark:text-slate-200">Проблема → Анализ → Подходящий формат → Старт</p>
            <button type="button" onClick={() => discussTask("two_paths")} className={`${buttonSecondary} mt-7 w-fit`}>Обсудить задачу</button>
          </article>
        </div>
      </section>

      <section className="rounded-[10px] border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 md:p-9">
        <SectionHeading eyebrow="Условия оплаты" title="Не нужно оплачивать всю услугу заранее" />
        <div className="mt-8 grid gap-px overflow-hidden rounded-[10px] border border-slate-200 bg-slate-200 sm:grid-cols-3 dark:border-slate-800 dark:bg-slate-800">
          {[
            ["50%", "Перед стартом", "После согласования задачи и объёма работ."],
            ["Работа", "Согласованный этап", "Данные, контрольные точки и понятный состав."],
            ["50%", "После результата", "После получения согласованного результата конкретной услуги."]
          ].map(([number, title, text]) => <article key={title} className="bg-white p-6 dark:bg-slate-900"><p className="text-3xl font-black text-[#2F6BFF]">{number}</p><h3 className="mt-3 text-lg font-black">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{text}</p></article>)}
        </div>
        <p className="mt-5 text-center text-sm font-black text-slate-800 dark:text-slate-200">Выбрали услугу → Оставили заявку → 50% → Работа → Результат → 50%</p>
        <p className="mt-3 text-center text-xs leading-5 text-slate-500">Схема применяется к услугам, где предусмотрена модель 50/50.</p>
      </section>

      <section className="grid gap-8 rounded-[10px] bg-slate-950 p-6 text-white md:p-9 lg:grid-cols-[0.8fr_1.2fr]">
        <div><Eyebrow light>Прозрачный сервис</Eyebrow><h2 className="mt-4 text-3xl font-black tracking-tight md:text-4xl">Без обязательных продающих созвонов</h2></div>
        <div><p className="text-base leading-8 text-white/75">Если вы понимаете, какая HR-услуга нужна, нет необходимости сначала проходить консультацию, презентацию или несколько встреч. Выберите решение, изучите состав и стоимость и отправьте заказ.</p><p className="mt-5 border-l-4 border-blue-400 pl-4 text-lg font-black">Консультация нужна тогда, когда она действительно нужна клиенту, а не потому, что этого требует процесс продаж.</p></div>
      </section>

      <section id="about" className="scroll-mt-36 grid gap-8 rounded-[10px] border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 md:p-9 lg:grid-cols-[0.8fr_1.2fr]">
        <div><Eyebrow>Кто будет работать с бизнесом</Eyebrow><h2 className="mt-4 text-4xl font-black tracking-tight">Денис Михин</h2><p className="mt-3 text-lg font-black text-[#2F6BFF]">Решаю задачи бизнеса через HR</p><p className="mt-3 text-sm font-bold text-slate-500">HR • Организационное развитие • Проектное управление • Трансформации</p></div>
        <div><p className="text-base leading-8 text-slate-600 dark:text-slate-300">Практик в области HR, организационного развития, управления проектами и изменений. Основной фокус — работающие системы, которые связаны с задачами бизнеса.</p><p className="mt-5 text-base font-black leading-7 text-slate-950 dark:text-white">Со мной можно разговаривать не только про HR, но и про бизнес-задачу, которую необходимо решить через людей, организацию и систему управления.</p><Link href="/about" className="mt-6 inline-flex text-sm font-extrabold text-[#2F6BFF]">Подробнее обо мне →</Link></div>
      </section>

      <section>
        <SectionHeading eyebrow="Основа работы" title="Экспертиза, на которой строится работа" />
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            ["HR и организация", "HR-проекты, организационное развитие, работа с командами и руководителями."],
            ["Управление изменениями", "Проектное управление, трансформации, операционное мышление и системный подход."],
            ["Знания и технологии", "Авторский журнал, образовательные продукты, применение аналитики и AI в работе."]
          ].map(([title, text]) => <article key={title} className="rounded-[10px] border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"><h3 className="text-lg font-black text-slate-950 dark:text-white">{title}</h3><p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{text}</p></article>)}
        </div>
        <div className="mt-5 flex flex-wrap gap-3"><Link href="/" onClick={() => trackMetrikaGoal("hr_journal_click")} className={buttonSecondary}>Авторское медиа</Link><Link href="/training" className={buttonSecondary}>Образовательные продукты</Link></div>
      </section>

      <section id="faq" className="scroll-mt-36 grid gap-8 lg:grid-cols-[0.65fr_1.35fr]">
        <SectionHeading eyebrow="FAQ" title="Ответы на вопросы о формате" />
        <div className="divide-y divide-slate-200 rounded-[10px] border border-slate-200 bg-white px-5 dark:divide-slate-800 dark:border-slate-800 dark:bg-slate-900">
          {HR_FAQ.map(([question, answer]) => <details key={question} className="group py-1"><summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 py-3 text-left font-extrabold"><span>{question}</span><span className="text-xl text-[#2F6BFF] transition group-open:rotate-45" aria-hidden>+</span></summary><p className="max-w-3xl pb-5 text-sm leading-7 text-slate-600 dark:text-slate-300">{answer}</p></details>)}
        </div>
      </section>

      <section className="rounded-[10px] bg-slate-950 px-6 py-10 text-white md:px-10 md:py-12">
        <Eyebrow light>Следующий шаг</Eyebrow>
        <h2 className="mt-4 max-w-[22ch] text-4xl font-black tracking-tight md:text-5xl">Знаете HR-решение или только видите проблему?</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="rounded-[10px] bg-white p-5 text-slate-950"><h3 className="text-xl font-black">Знаю, что мне нужно</h3><p className="mt-3 text-sm leading-6 text-slate-600">Выберите готовую услугу и начните работу без обязательного предварительного созвона.</p><a href="#solutions" className={`${buttonPrimary} mt-5`}>Выбрать HR-услугу</a></div>
          <div className="rounded-[10px] border border-white/20 p-5"><h3 className="text-xl font-black">Есть проблема, но не знаю решения</h3><p className="mt-3 text-sm leading-6 text-white/70">Опишите ситуацию — определим, какой формат HR действительно нужен бизнесу.</p><button type="button" onClick={() => discussTask("final_choice")} className="mt-5 inline-flex min-h-12 items-center justify-center rounded-lg border border-white/50 px-5 py-3 text-sm font-extrabold text-white">Обсудить задачу</button></div>
        </div>
      </section>

      <HrLeadForm selection={selection} />

      <footer className="rounded-[10px] border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 md:p-8">
        <p className="text-xl font-black text-slate-950 dark:text-white">Денис Михин <span className="text-[#2F6BFF]">|</span> Решаю задачи бизнеса через HR</p>
        <nav aria-label="Основные направления" className="mt-5 flex flex-wrap gap-3 text-sm font-extrabold"><Link href="/hr" className="rounded-lg bg-[#F5F8FF] px-4 py-3 text-[#2F6BFF] dark:bg-slate-950">👥 HR по подписке</Link><Link href="/" className="rounded-lg border border-slate-200 px-4 py-3 dark:border-slate-700">📰 Медиа</Link><Link href="/training" className="rounded-lg border border-slate-200 px-4 py-3 dark:border-slate-700">🎓 Курсы</Link></nav>
      </footer>

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
          details: {
            requestType: formData.get("requestType")
          },
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
          <label className="block sm:col-span-2"><span className="mb-1.5 block text-sm font-bold">Что вы хотите?</span><select key={selection ? `${selection.solution.id}-${selection.item.name}` : "discussion"} name="requestType" required defaultValue={selection ? "Заказать выбранную услугу" : "Обсудить HR-задачу"} className="min-h-12 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm outline-none focus:border-[#2F6BFF] dark:border-slate-700 dark:bg-slate-950"><option>Заказать выбранную услугу</option><option>Обсудить HR-задачу</option><option>Подключить HRBP/HRD</option><option>Другой вопрос</option></select></label>
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
