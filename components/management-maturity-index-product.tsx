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
  const weakestBlocks = [...result.blockScores].reverse().slice(0, 2);

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
          <div className="rounded-[1.8rem] border border-[#efb8d2] bg-[#fff0f7] p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9f2f73]">Главные зоны роста</p>
            <h3 className="mt-2 text-2xl font-black tracking-tight text-slate-900">
              {weakestBlocks.map((item) => item.title).join(" и ")}
            </h3>
            <p className="mt-3 text-sm leading-7 text-slate-700">{level.recommendation}</p>
          </div>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        {result.blockScores.map((item) => (
          <div key={item.key} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-black text-slate-900">{item.title}</p>
              <p className="text-sm font-black text-slate-500">{item.score}</p>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-white">
              <div className="h-full rounded-full bg-slate-950" style={{ width: `${item.score}%` }} />
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Следующий шаг</p>
        <p className="mt-3 text-sm leading-7 text-slate-700">
          Это MVP-отчет. Следующий слой премиум-продукта: автоматический PDF с расшифровкой каждого блока,
          рекомендациями на 3, 6 и 12 месяцев и персональной подборкой материалов.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => printMaturityReport(result.totalIndex, level.title, profile.title)}
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

function calculateResult(answers: AnswerMap): {
  totalIndex: number;
  blockScores: Array<{ key: MaturityBlockKey; title: string; score: number }>;
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
      score
    };
  }).sort((left, right) => right.score - left.score);

  return {
    totalIndex: blockScores.reduce((sum, block) => sum + block.score, 0),
    blockScores
  };
}

function printMaturityReport(totalIndex: number, level: string, profile: string): void {
  const html = `<!doctype html>
    <html lang="ru">
      <head>
        <meta charset="utf-8" />
        <title>Индекс управленческой зрелости</title>
        <style>
          body { margin: 0; font-family: "Segoe UI", Arial, sans-serif; color: #111827; }
          main { padding: 36px; }
          h1 { margin: 0; font-size: 34px; line-height: 1.05; }
          .score { margin-top: 24px; padding: 22px; border-radius: 22px; background: #111827; color: white; }
          .score b { display: block; font-size: 64px; line-height: 1; }
          .card { margin-top: 16px; padding: 18px; border: 1px solid #e5e7eb; border-radius: 18px; background: #f8fafc; }
          p { line-height: 1.6; }
        </style>
      </head>
      <body>
        <main>
          <h1>Индекс управленческой зрелости</h1>
          <p>Премиум-диагностика Дениса Михина: итоговый индекс, уровень зрелости и профиль руководителя.</p>
          <section class="score"><span>Итоговый индекс</span><b>${totalIndex}</b><span>из 900 баллов</span></section>
          <section class="card"><h2>${escapeHtml(level)}</h2><p>Уровень управленческой зрелости по итогам прохождения.</p></section>
          <section class="card"><h2>${escapeHtml(profile)}</h2><p>Профиль руководителя по сочетанию наиболее сильных блоков.</p></section>
          <section class="card"><h2>Следующий шаг</h2><p>Расширенная версия отчета должна включать радар 9 блоков, сильные стороны, ограничения, риски и рекомендации на 3, 6 и 12 месяцев.</p></section>
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
