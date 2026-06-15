"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  MANAGEMENT_MATURITY_INDEX,
  MATURITY_BLOCKS,
  MATURITY_QUESTIONS,
  resolveMaturityLevel,
  resolveMaturityProfile,
  type MaturityBlockKey
} from "@/lib/management-maturity-index";
import { TELEGRAM_CONSULT_URL } from "@/lib/constants";

type AnswerMap = Record<number, number>;
type AccessState = "locked" | "ready" | "testing" | "finished";
type CompetencyZone = "red" | "yellow" | "green";
type BlockScore = {
  key: MaturityBlockKey;
  title: string;
  fullTitle: string;
  description: string;
  score: number;
  zone: CompetencyZone;
  risk: string;
  developmentFocus: string;
  actions: string[];
};

const ZONE_STYLES: Record<
  CompetencyZone,
  {
    label: string;
    chip: string;
    card: string;
    bar: string;
    text: string;
  }
> = {
  red: {
    label: "Красная зона",
    chip: "border-red-200 bg-red-50 text-red-800",
    card: "border-red-200 bg-red-50",
    bar: "bg-red-500",
    text: "text-red-800"
  },
  yellow: {
    label: "Желтая зона",
    chip: "border-amber-200 bg-amber-50 text-amber-800",
    card: "border-amber-200 bg-amber-50",
    bar: "bg-amber-400",
    text: "text-amber-800"
  },
  green: {
    label: "Зеленая зона",
    chip: "border-emerald-200 bg-emerald-50 text-emerald-800",
    card: "border-emerald-200 bg-emerald-50",
    bar: "bg-emerald-500",
    text: "text-emerald-800"
  }
};

export function ManagementMaturityIndexProduct(): JSX.Element {
  const [accessCode, setAccessCode] = useState("");
  const [accessError, setAccessError] = useState(false);
  const [state, setState] = useState<AccessState>("locked");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerMap>({});

  const question = MATURITY_QUESTIONS[currentIndex];
  const selected = answers[question?.id];
  const answeredCount = Object.keys(answers).length;
  const progress = Math.round((answeredCount / MATURITY_QUESTIONS.length) * 100);

  function unlock(): void {
    const normalized = accessCode.trim().toUpperCase();
    if (normalized !== MANAGEMENT_MATURITY_INDEX.accessCode) {
      setAccessError(true);
      return;
    }
    setAccessError(false);
    setState("ready");
  }

  function startTest(): void {
    setCurrentIndex(0);
    setAnswers({});
    setState("testing");
  }

  function chooseAnswer(value: number): void {
    setAnswers((prev) => ({ ...prev, [question.id]: value }));
  }

  function goNext(): void {
    if (!selected) return;
    if (currentIndex === MATURITY_QUESTIONS.length - 1) {
      setState("finished");
      return;
    }
    setCurrentIndex((prev) => prev + 1);
  }

  function goBack(): void {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  }

  if (state === "testing") {
    const block = MATURITY_BLOCKS.find((item) => item.key === question.block);

    return (
      <section className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_30px_80px_rgba(15,23,42,0.1)]">
        <div className="grid gap-0 lg:grid-cols-[0.75fr_1.25fr]">
          <aside className="border-b border-slate-200 bg-slate-950 p-6 text-white md:p-8 lg:border-b-0 lg:border-r">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
              Вопрос {currentIndex + 1} из {MATURITY_QUESTIONS.length}
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight">{block?.title}</h2>
            <p className="mt-3 text-sm leading-7 text-white/70">{block?.description}</p>
            <div className="mt-7 h-3 overflow-hidden rounded-full bg-white/10">
              <div className="h-full rounded-full bg-[#f5d45d] transition-all" style={{ width: `${progress}%` }} />
            </div>
            <p className="mt-3 text-sm font-semibold text-white/60">Прогресс: {progress}%</p>
            <div className="mt-7 rounded-2xl border border-white/10 bg-white/[0.06] p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45">Правило качества</p>
              <p className="mt-2 text-sm leading-6 text-white/72">
                Отвечайте по реальному поведению за последние 3-6 месяцев, а не по идеальному образу руководителя.
              </p>
            </div>
          </aside>

          <div className="p-6 md:p-8">
            <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
              {question.format === "reverse" ? "Проверочный вопрос" : "Диагностический вопрос"}
            </span>
            <h3 className="mt-5 text-2xl font-black leading-tight tracking-tight text-slate-900 md:text-3xl">
              {question.text}
            </h3>
            <div className="mt-6 grid gap-3">
              {MANAGEMENT_MATURITY_INDEX.scoreOptions.map((option) => {
                const isSelected = selected === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => chooseAnswer(option.value)}
                    className={`rounded-[1.35rem] border p-4 text-left transition hover:-translate-y-0.5 ${
                      isSelected
                        ? "border-slate-950 bg-slate-950 text-white shadow-[0_18px_40px_rgba(15,23,42,0.18)]"
                        : "border-slate-200 bg-slate-50 text-slate-900 hover:bg-white"
                    }`}
                  >
                    <span className="flex items-start gap-3">
                      <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm font-black ${
                          isSelected ? "bg-white text-slate-950" : "bg-white text-slate-700"
                        }`}
                      >
                        {option.value}
                      </span>
                      <span>
                        <span className="block text-base font-black">{option.label}</span>
                        <span className={`mt-1 block text-sm leading-6 ${isSelected ? "text-white/75" : "text-slate-600"}`}>
                          {option.text}
                        </span>
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={goBack}
                disabled={currentIndex === 0}
                className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Назад
              </button>
              <button
                type="button"
                onClick={goNext}
                disabled={!selected}
                className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {currentIndex === MATURITY_QUESTIONS.length - 1 ? "Показать отчет" : "Следующий вопрос"}
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (state === "finished") {
    return <MaturityResult answers={answers} onRestart={startTest} />;
  }

  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-[2.35rem] border border-slate-800 bg-slate-950 p-7 text-white shadow-[0_36px_92px_rgba(15,23,42,0.24)] md:p-10">
        <div className="pointer-events-none absolute -right-20 top-10 h-64 w-64 rounded-full border-[18px] border-[#f5d45d]/35" />
        <div className="pointer-events-none absolute -bottom-28 left-10 h-72 w-72 rounded-full border-[16px] border-[#2bd0e2]/30" />
        <div className="relative grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/50">
              {MANAGEMENT_MATURITY_INDEX.price}
            </p>
            <h1 className="mt-4 max-w-[12ch] text-5xl font-black leading-[0.92] tracking-tight md:text-7xl">
              {MANAGEMENT_MATURITY_INDEX.title}
            </h1>
            <p className="mt-5 max-w-[60ch] text-xl font-semibold leading-tight text-white/90 md:text-2xl">
              {MANAGEMENT_MATURITY_INDEX.promise}
            </p>
            <p className="mt-5 max-w-[68ch] text-base leading-8 text-white/72">
              {MANAGEMENT_MATURITY_INDEX.subtitle}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#access"
                className="rounded-2xl bg-white px-6 py-3 text-base font-black text-slate-950 transition hover:-translate-y-0.5 hover:bg-slate-100"
              >
                Получить доступ
              </a>
              <Link
                href={TELEGRAM_CONSULT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl border border-white/20 bg-white/[0.06] px-6 py-3 text-base font-bold text-white transition hover:-translate-y-0.5 hover:bg-white/[0.1]"
              >
                Запросить счет
              </Link>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {[
              ["180", "вопросов"],
              ["9", "блоков зрелости"],
              ["900", "максимальный индекс"],
              ["PDF", "персональный отчет"]
            ].map(([value, label]) => (
              <div key={label} className="rounded-[1.5rem] border border-white/10 bg-white/[0.06] p-5">
                <p className="text-4xl font-black leading-none">{value}</p>
                <p className="mt-2 text-sm font-semibold leading-6 text-white/68">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div id="access" className="scroll-mt-28 rounded-[2rem] border border-[#f1d973] bg-[#fff9d4] p-6 shadow-soft md:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8a6e00]">Платный доступ</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900">Диагностика открывается после оплаты</h2>
          <p className="mt-4 text-base leading-8 text-slate-700">
            В MVP-версии здесь стоит код доступа. После выбора платежного провайдера этот блок заменяется на оплату,
            автоматическую проверку платежа и выдачу персональной ссылки.
          </p>
          <div className="mt-5 grid gap-3">
            <input
              value={accessCode}
              onChange={(event) => setAccessCode(event.target.value)}
              placeholder="Введите код доступа"
              className="w-full rounded-2xl border border-[#e3c95f] bg-white px-4 py-3 text-sm font-semibold text-slate-900 outline-none transition focus:border-slate-950"
            />
            <button
              type="button"
              onClick={unlock}
              className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-black text-white transition hover:bg-slate-800"
            >
              Открыть премиум-тест
            </button>
          </div>
          {accessError ? (
            <p className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-800">
              Код не подошел. Для проверки MVP используйте код {MANAGEMENT_MATURITY_INDEX.accessCode}.
            </p>
          ) : null}
          {state === "ready" ? (
            <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
              <p className="text-sm font-bold text-emerald-900">Доступ открыт. Можно проходить полную диагностику.</p>
              <button
                type="button"
                onClick={startTest}
                className="mt-4 rounded-2xl bg-emerald-700 px-5 py-3 text-sm font-black text-white transition hover:bg-emerald-800"
              >
                Начать 180 вопросов
              </button>
            </div>
          ) : null}
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft md:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Что получает клиент</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900">Не тип личности, а карта управленческой способности</h2>
          <div className="mt-5 grid gap-3">
            {MANAGEMENT_MATURITY_INDEX.reportSections.map((item, index) => (
              <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-400">0{index + 1}</p>
                <p className="mt-2 text-sm font-semibold leading-6 text-slate-800">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft md:p-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Методология</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900">9 блоков управленческой зрелости</h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-slate-600">
            Каждый блок нормируется до 100 баллов. Итоговый индекс складывается в шкалу от 0 до 900.
          </p>
        </div>
        <div className="mt-6 grid gap-3 md:grid-cols-3">
          {MATURITY_BLOCKS.map((block) => (
            <article key={block.key} className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4">
              <h3 className="text-lg font-black tracking-tight text-slate-900">{block.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{block.description}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

function MaturityResult({ answers, onRestart }: { answers: AnswerMap; onRestart: () => void }): JSX.Element {
  const result = useMemo(() => calculateResult(answers), [answers]);
  const level = resolveMaturityLevel(result.totalIndex);
  const profile = resolveMaturityProfile(result.blockScores.map((item) => item.key));
  const redBlocks = result.blockScores.filter((item) => item.zone === "red");
  const yellowBlocks = result.blockScores.filter((item) => item.zone === "yellow");
  const greenBlocks = result.blockScores.filter((item) => item.zone === "green");
  const priorityBlocks = redBlocks.length > 0 ? redBlocks : [...result.blockScores].reverse().slice(0, 3);
  const strongestBlocks = greenBlocks.length > 0 ? greenBlocks.slice(0, 3) : result.blockScores.slice(0, 3);

  return (
    <section className="space-y-6 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_30px_80px_rgba(15,23,42,0.1)] md:p-8">
      <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="rounded-[1.8rem] border border-slate-800 bg-slate-950 p-6 text-white">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">Ваш индекс</p>
          <p className="mt-4 text-6xl font-black leading-none">{result.totalIndex}</p>
          <p className="mt-2 text-sm font-semibold text-white/60">из 900 баллов</p>
          <h2 className="mt-5 text-3xl font-black leading-tight tracking-tight">{level.title}</h2>
          <p className="mt-4 text-base leading-8 text-white/75">{level.summary}</p>
        </div>

        <div className="space-y-4">
          <div className="rounded-[1.8rem] border border-[#f1d973] bg-[#fff9d4] p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8a6e00]">Профиль руководителя</p>
            <h3 className="mt-2 text-2xl font-black tracking-tight text-slate-900">{profile.title}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-700">{profile.summary}</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <StatusCounter label="Красные" value={redBlocks.length} className="border-red-200 bg-red-50 text-red-800" />
            <StatusCounter label="Желтые" value={yellowBlocks.length} className="border-amber-200 bg-amber-50 text-amber-800" />
            <StatusCounter label="Зеленые" value={greenBlocks.length} className="border-emerald-200 bg-emerald-50 text-emerald-800" />
          </div>
        </div>
      </div>

      <section className="rounded-[1.8rem] border border-slate-200 bg-slate-50 p-5">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Дашборд компетенций</p>
            <h3 className="mt-2 text-3xl font-black tracking-tight text-slate-900">Карта сильных и проблемных зон</h3>
          </div>
          <div className="flex flex-wrap gap-2 text-xs font-bold">
            <span className={`rounded-full border px-3 py-1 ${ZONE_STYLES.red.chip}`}>0-44 красная</span>
            <span className={`rounded-full border px-3 py-1 ${ZONE_STYLES.yellow.chip}`}>45-69 желтая</span>
            <span className={`rounded-full border px-3 py-1 ${ZONE_STYLES.green.chip}`}>70-100 зеленая</span>
          </div>
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {result.blockScores.map((item) => (
            <CompetencyCard key={item.key} item={item} />
          ))}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-[1.8rem] border border-red-200 bg-red-50 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-red-800">Индивидуальный план развития</p>
          <h3 className="mt-2 text-3xl font-black tracking-tight text-slate-900">
            Что делать с красными зонами
          </h3>
          <p className="mt-3 text-sm leading-7 text-slate-700">
            Приоритет на ближайшие 30 дней - не развивать все сразу, а закрыть ограничения, которые сильнее всего мешают
            управленческому масштабу. Начните с блоков ниже.
          </p>
          <div className="mt-5 space-y-4">
            {priorityBlocks.map((block, index) => (
              <DevelopmentPlanCard key={block.key} block={block} index={index} />
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-[1.8rem] border border-emerald-200 bg-emerald-50 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-800">На что опираться</p>
            <h3 className="mt-2 text-2xl font-black tracking-tight text-slate-900">Сильные компетенции</h3>
            <div className="mt-4 space-y-3">
              {strongestBlocks.map((block) => (
                <div key={block.key} className="rounded-2xl border border-emerald-200 bg-white/70 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-black text-slate-900">{block.fullTitle}</p>
                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-black text-emerald-800">
                      {block.score}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-700">
                    Используйте этот блок как ресурс для развития слабых зон, а не как повод оставить их без внимания.
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[1.8rem] border border-[#f1d973] bg-[#fff9d4] p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8a6e00]">Рекомендация по уровню</p>
            <p className="mt-3 text-sm leading-7 text-slate-700">{level.recommendation}</p>
          </div>
        </div>
      </section>

      <section className="rounded-[1.8rem] border border-slate-200 bg-white p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Подробно по компетенциям</p>
        <div className="mt-5 grid gap-3 md:grid-cols-3">
        {result.blockScores.map((item) => (
          <div key={item.key} className={`rounded-2xl border p-4 ${ZONE_STYLES[item.zone].card}`}>
            <span className={`rounded-full border px-3 py-1 text-xs font-black ${ZONE_STYLES[item.zone].chip}`}>
              {ZONE_STYLES[item.zone].label}
            </span>
            <h4 className="mt-3 text-lg font-black tracking-tight text-slate-900">{item.fullTitle}</h4>
            <p className="mt-2 text-sm leading-6 text-slate-700">{item.description}</p>
            <p className="mt-3 text-sm font-bold text-slate-900">Риск: <span className="font-semibold">{item.risk}</span></p>
          </div>
        ))}
        </div>
      </section>

      <section className="rounded-[1.8rem] border border-slate-200 bg-slate-50 p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">План на 3 месяца</p>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {[
            ["30 дней", "Закрыть красную зону", "Выберите 1-2 самых слабых блока, внедрите действия из плана и каждую неделю фиксируйте изменения в поведении."],
            ["60 дней", "Закрепить управленческую практику", "Переведите новые действия в регулярные ритуалы: встречи, обратную связь, критерии решений, работу с рисками."],
            ["90 дней", "Проверить эффект", "Повторно оцените красные блоки, сравните динамику и выберите следующий ограничитель управленческого роста."]
          ].map(([period, title, text]) => (
            <div key={period} className="rounded-2xl border border-slate-200 bg-white p-4">
              <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-400">{period}</p>
              <h4 className="mt-2 text-lg font-black text-slate-900">{title}</h4>
              <p className="mt-2 text-sm leading-6 text-slate-700">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Следующий шаг</p>
        <p className="mt-3 text-sm leading-7 text-slate-700">
          Этот отчет уже показывает не только уровень, но и управленческие ограничения. Следующий слой премиум-продукта:
          PDF с расширенной расшифровкой, персональными текстами по каждому блоку и подборкой материалов под слабые зоны.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() =>
              printMaturityReport({
                result,
                levelTitle: level.title,
                levelSummary: level.summary,
                profileTitle: profile.title,
                profileSummary: profile.summary,
                priorityBlocks
              })
            }
            className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-800 transition hover:bg-slate-50"
          >
            Сохранить отчет в PDF
          </button>
          <Link
            href={TELEGRAM_CONSULT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
          >
            Обсудить результат
          </Link>
          <button
            type="button"
            onClick={onRestart}
            className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-800 transition hover:bg-slate-50"
          >
            Пройти заново
          </button>
        </div>
      </div>
    </section>
  );
}

function StatusCounter({ label, value, className }: { label: string; value: number; className: string }): JSX.Element {
  return (
    <div className={`rounded-2xl border p-4 ${className}`}>
      <p className="text-3xl font-black leading-none">{value}</p>
      <p className="mt-2 text-xs font-black uppercase tracking-[0.14em]">{label}</p>
    </div>
  );
}

function CompetencyCard({ item }: { item: BlockScore }): JSX.Element {
  const styles = ZONE_STYLES[item.zone];

  return (
    <div className={`rounded-2xl border p-4 ${styles.card}`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-black text-slate-900">{item.fullTitle}</p>
          <p className={`mt-1 text-xs font-black uppercase tracking-[0.12em] ${styles.text}`}>{styles.label}</p>
        </div>
        <span className={`rounded-full border px-3 py-1 text-sm font-black ${styles.chip}`}>{item.score}</span>
      </div>
      <div className="mt-4 h-3 overflow-hidden rounded-full bg-white">
        <div className={`h-full rounded-full ${styles.bar}`} style={{ width: `${item.score}%` }} />
      </div>
      <p className="mt-3 text-xs font-semibold leading-5 text-slate-600">{item.developmentFocus}</p>
    </div>
  );
}

function DevelopmentPlanCard({ block, index }: { block: BlockScore; index: number }): JSX.Element {
  return (
    <article className="rounded-[1.5rem] border border-red-200 bg-white p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.14em] text-red-700">Приоритет {index + 1}</p>
          <h4 className="mt-1 text-xl font-black tracking-tight text-slate-900">{block.fullTitle}</h4>
        </div>
        <span className="rounded-full border border-red-200 bg-red-50 px-3 py-1 text-sm font-black text-red-800">
          {block.score}/100
        </span>
      </div>
      <p className="mt-3 text-sm font-bold leading-6 text-slate-900">Фокус: {block.developmentFocus}</p>
      <p className="mt-2 text-sm leading-6 text-slate-700">Почему важно: {block.risk}</p>
      <div className="mt-4 grid gap-2">
        {block.actions.map((action, actionIndex) => (
          <div key={action} className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
            <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-400">Шаг {actionIndex + 1}</p>
            <p className="mt-1 text-sm font-semibold leading-6 text-slate-800">{action}</p>
          </div>
        ))}
      </div>
    </article>
  );
}

function calculateResult(answers: AnswerMap): {
  totalIndex: number;
  blockScores: BlockScore[];
} {
  const blockScores = MATURITY_BLOCKS.map((block) => {
    const questions = MATURITY_QUESTIONS.filter((question) => question.block === block.key);
    const raw = questions.reduce((sum, question) => {
      const answer = answers[question.id] ?? 1;
      const score = question.reverse ? 6 - answer : answer;
      return sum + score;
    }, 0);
    const score = Math.round(((raw - questions.length) / (questions.length * 4)) * 100);

    return {
      key: block.key,
      title: block.shortTitle,
      fullTitle: block.title,
      description: block.description,
      score,
      zone: resolveZone(score),
      risk: block.risk,
      developmentFocus: block.developmentFocus,
      actions: block.actions
    };
  }).sort((left, right) => right.score - left.score);

  return {
    totalIndex: blockScores.reduce((sum, block) => sum + block.score, 0),
    blockScores
  };
}

function resolveZone(score: number): CompetencyZone {
  if (score < 45) return "red";
  if (score < 70) return "yellow";
  return "green";
}

function printMaturityReport({
  result,
  levelTitle,
  levelSummary,
  profileTitle,
  profileSummary,
  priorityBlocks
}: {
  result: {
    totalIndex: number;
    blockScores: BlockScore[];
  };
  levelTitle: string;
  levelSummary: string;
  profileTitle: string;
  profileSummary: string;
  priorityBlocks: BlockScore[];
}): void {
  const createdAt = new Intl.DateTimeFormat("ru-RU", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  }).format(new Date());
  const competencyRows = result.blockScores
    .map((block) => {
      const zoneLabel = ZONE_STYLES[block.zone].label;
      return `
        <tr class="${block.zone}">
          <td><strong>${escapeHtml(block.fullTitle)}</strong><span>${escapeHtml(block.description)}</span></td>
          <td>${block.score}/100</td>
          <td>${escapeHtml(zoneLabel)}</td>
          <td>${escapeHtml(block.developmentFocus)}</td>
        </tr>
      `;
    })
    .join("");
  const planCards = priorityBlocks
    .map(
      (block, index) => `
        <section class="plan-card">
          <p class="eyebrow">Приоритет ${index + 1}</p>
          <h3>${escapeHtml(block.fullTitle)} - ${block.score}/100</h3>
          <p><strong>Фокус:</strong> ${escapeHtml(block.developmentFocus)}</p>
          <p><strong>Риск:</strong> ${escapeHtml(block.risk)}</p>
          <ol>
            ${block.actions.map((action) => `<li>${escapeHtml(action)}</li>`).join("")}
          </ol>
        </section>
      `
    )
    .join("");
  const html = `<!doctype html>
    <html lang="ru">
      <head>
        <meta charset="utf-8" />
        <title>Индекс управленческой зрелости</title>
        <style>
          @page { size: A4; margin: 16mm; }
          * { box-sizing: border-box; }
          body { margin: 0; background: #f3f4f6; font-family: "Segoe UI", Arial, sans-serif; color: #111827; line-height: 1.45; }
          main { width: 210mm; min-height: 297mm; margin: 0 auto; background: #ffffff; padding: 18mm; }
          h1 { margin: 0; max-width: 720px; font-size: 36px; line-height: 1.05; letter-spacing: -0.04em; }
          h2 { margin: 26px 0 12px; font-size: 23px; letter-spacing: -0.02em; }
          h3 { margin: 0 0 10px; font-size: 18px; }
          p { margin: 0; }
          .eyebrow { margin: 0 0 8px; color: #64748b; font-size: 10px; font-weight: 900; letter-spacing: 0.14em; text-transform: uppercase; }
          .lead { margin-top: 14px; max-width: 760px; color: #475569; font-size: 15px; }
          .summary-grid { display: grid; grid-template-columns: 0.72fr 1.28fr; gap: 12px; margin-top: 22px; }
          .score { padding: 22px; border-radius: 22px; background: #111827; color: white; }
          .score b { display: block; font-size: 64px; line-height: 1; }
          .score span { color: rgba(255,255,255,0.65); font-size: 12px; font-weight: 800; }
          .score h2 { margin: 16px 0 8px; color: #ffffff; }
          .score p { color: rgba(255,255,255,0.76); font-size: 13px; }
          .card, .plan-card { padding: 16px; border: 1px solid #e5e7eb; border-radius: 18px; background: #f8fafc; }
          .card p, .plan-card p, li { color: #334155; font-size: 13px; }
          .dashboard { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 8px; margin-top: 14px; }
          .metric { border-radius: 16px; padding: 12px; border: 1px solid #e5e7eb; }
          .metric b { display: block; font-size: 28px; }
          .red-box { background: #fef2f2; border-color: #fecaca; color: #991b1b; }
          .yellow-box { background: #fffbeb; border-color: #fde68a; color: #92400e; }
          .green-box { background: #ecfdf5; border-color: #a7f3d0; color: #065f46; }
          table { width: 100%; border-collapse: collapse; margin-top: 12px; font-size: 11px; }
          th { background: #111827; color: #ffffff; padding: 8px; text-align: left; }
          td { border: 1px solid #e5e7eb; padding: 8px; vertical-align: top; }
          td span { display: block; margin-top: 4px; color: #64748b; }
          tr.red td { background: #fef2f2; }
          tr.yellow td { background: #fffbeb; }
          tr.green td { background: #ecfdf5; }
          .plan-grid { display: grid; gap: 10px; margin-top: 12px; }
          .plan-card { border-color: #fecaca; background: #fff7f7; break-inside: avoid; }
          .plan-card ol { margin: 10px 0 0; padding-left: 18px; }
          .roadmap { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px; margin-top: 12px; }
          @media print {
            body { background: #ffffff; }
            main { width: auto; min-height: auto; margin: 0; padding: 0; }
            tr, .card, .plan-card, .metric { break-inside: avoid; }
          }
        </style>
      </head>
      <body>
        <main>
          <p class="eyebrow">Персональный отчет - ${escapeHtml(createdAt)}</p>
          <h1>Индекс управленческой зрелости</h1>
          <p class="lead">
            Премиум-диагностика показывает не тип личности, а способность руководителя создавать результат через
            людей, процессы, решения, изменения, бизнес-логику и собственную зрелость.
          </p>

          <section class="summary-grid">
            <div class="score">
              <span>Итоговый индекс</span>
              <b>${result.totalIndex}</b>
              <span>из 900 баллов</span>
              <h2>${escapeHtml(levelTitle)}</h2>
              <p>${escapeHtml(levelSummary)}</p>
            </div>
            <div class="card">
              <p class="eyebrow">Профиль руководителя</p>
              <h2>${escapeHtml(profileTitle)}</h2>
              <p>${escapeHtml(profileSummary)}</p>
              <div class="dashboard">
                <div class="metric red-box"><b>${result.blockScores.filter((block) => block.zone === "red").length}</b><span>красные зоны</span></div>
                <div class="metric yellow-box"><b>${result.blockScores.filter((block) => block.zone === "yellow").length}</b><span>желтые зоны</span></div>
                <div class="metric green-box"><b>${result.blockScores.filter((block) => block.zone === "green").length}</b><span>зеленые зоны</span></div>
              </div>
            </div>
          </section>

          <section>
            <h2>Дашборд компетенций</h2>
            <table>
              <thead>
                <tr>
                  <th>Компетенция</th>
                  <th>Балл</th>
                  <th>Зона</th>
                  <th>Фокус развития</th>
                </tr>
              </thead>
              <tbody>${competencyRows}</tbody>
            </table>
          </section>

          <section>
            <h2>Индивидуальный план развития по красным зонам</h2>
            <div class="plan-grid">${planCards}</div>
          </section>

          <section>
            <h2>План на 3 месяца</h2>
            <div class="roadmap">
              <div class="card"><p class="eyebrow">30 дней</p><h3>Закрыть красную зону</h3><p>Выберите 1-2 слабых блока, внедрите действия из плана и каждую неделю фиксируйте изменения в поведении.</p></div>
              <div class="card"><p class="eyebrow">60 дней</p><h3>Закрепить практику</h3><p>Переведите новые действия в регулярные ритуалы: встречи, обратную связь, критерии решений, работу с рисками.</p></div>
              <div class="card"><p class="eyebrow">90 дней</p><h3>Проверить эффект</h3><p>Повторно оцените красные блоки, сравните динамику и выберите следующий ограничитель управленческого роста.</p></div>
            </div>
          </section>
        </main>
        <script>window.addEventListener("load", () => setTimeout(() => window.print(), 250));</script>
      </body>
    </html>`;
  const reportWindow = window.open("", "_blank", "width=980,height=1200");
  if (!reportWindow) return;
  reportWindow.document.open();
  reportWindow.document.write(html);
  reportWindow.document.close();
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
