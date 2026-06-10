"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import Link from "next/link";
import { LEADS_API_URL, TELEGRAM_CONSULT_URL } from "@/lib/constants";
import { BUSINESS_CONTROL_DIAGNOSTIC } from "@/lib/business-control-diagnostic";

type LeadForm = {
  fullName: string;
  email: string;
  company: string;
  role: string;
  telegram: string;
};

type Status = "idle" | "sending" | "success" | "error";
type AnswerMap = Record<number, number>;

const SCORE_OPTIONS = [
  {
    value: 0,
    title: "Почти нет",
    text: "Практика отсутствует или работает случайно."
  },
  {
    value: 1,
    title: "Есть фрагментарно",
    text: "Что-то делаем, но сильно зависит от людей и ручного контроля."
  },
  {
    value: 2,
    title: "Работает регулярно",
    text: "Практика есть, но не всегда связана с бизнес-результатом."
  },
  {
    value: 3,
    title: "Встроено в систему",
    text: "Практика помогает управлять, расти и принимать решения."
  }
];

export function BusinessControlLeadForm(): JSX.Element {
  const [form, setForm] = useState<LeadForm>({
    fullName: "",
    email: "",
    company: "",
    role: "",
    telegram: ""
  });
  const [status, setStatus] = useState<Status>("idle");
  const [isUnlocked, setIsUnlocked] = useState(false);

  async function submitLead(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    setStatus("sending");

    try {
      if (LEADS_API_URL) {
        const response = await fetch(LEADS_API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fullName: form.fullName,
            email: form.email,
            company: form.company,
            role: form.role,
            telegram: form.telegram,
            source: "lead-magnet-business-control-diagnostic",
            result: "Запросил лид-магнит: Диагностика управляемости бизнеса",
            leadMagnet: BUSINESS_CONTROL_DIAGNOSTIC.title,
            pageUrl: window.location.href
          })
        });

        if (!response.ok) {
          throw new Error("Lead API request failed");
        }
      }

      setStatus("success");
      setIsUnlocked(true);
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
      <div className="rounded-[2rem] border border-[#efb8d2] bg-[linear-gradient(135deg,#fff0f7_0%,#fff8e8_100%)] p-6 shadow-soft md:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9f2f73]">
          Лид-магнит
        </p>
        <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900">
          {BUSINESS_CONTROL_DIAGNOSTIC.formTitle}
        </h2>
        <p className="mt-4 text-base leading-8 text-slate-700">
          Оставьте контакты, чтобы открыть интерактивную диагностику. Заявка уйдет Денису в Telegram,
          а после формы вы пройдете тест вопрос за вопросом и получите итоговый профиль управляемости.
        </p>

        <form onSubmit={submitLead} className="mt-6 space-y-3">
          <LeadInput label="Имя" value={form.fullName} required onChange={(value) => setForm((prev) => ({ ...prev, fullName: value }))} />
          <LeadInput label="Email" type="email" value={form.email} required onChange={(value) => setForm((prev) => ({ ...prev, email: value }))} />
          <div className="grid gap-3 sm:grid-cols-2">
            <LeadInput label="Компания" value={form.company} onChange={(value) => setForm((prev) => ({ ...prev, company: value }))} />
            <LeadInput label="Должность" value={form.role} onChange={(value) => setForm((prev) => ({ ...prev, role: value }))} />
          </div>
          <LeadInput label="Telegram" value={form.telegram} onChange={(value) => setForm((prev) => ({ ...prev, telegram: value }))} />

          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full rounded-2xl bg-slate-950 px-6 py-4 text-base font-black text-white shadow-[0_7px_0_0_rgba(15,23,42,0.18)] transition hover:-translate-y-0.5 hover:bg-slate-800 disabled:cursor-wait disabled:opacity-70"
          >
            {status === "sending" ? "Открываем диагностику..." : "Открыть диагностику"}
          </button>
        </form>

        {status === "success" ? (
          <p className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800">
            Контакты отправлены. Диагностика открыта ниже.
          </p>
        ) : null}
        {status === "error" ? (
          <p className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-800">
            Не удалось отправить заявку. Проверьте соединение или напишите Денису в Telegram.
          </p>
        ) : null}
      </div>

      <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft md:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
          Как это будет работать
        </p>
        <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900">
          Не PDF-анкета, а живой тест
        </h2>
        <div className="mt-5 grid gap-3">
          {[
            "24 вопроса по 6 блокам управляемости бизнеса.",
            "Каждый вопрос открывается отдельно: выберите один из 4 вариантов.",
            "В конце появится уровень зрелости, слабые зоны и рекомендации.",
            "Результат можно сохранить как PDF, обсудить с Денисом или отправить диагностику в Telegram."
          ].map((item, index) => (
            <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-400">
                0{index + 1}
              </p>
              <p className="mt-2 text-sm font-semibold leading-6 text-slate-800">{item}</p>
            </div>
          ))}
        </div>
      </div>

      {isUnlocked ? (
        <div className="lg:col-span-2">
          <InteractiveDiagnostic form={form} />
        </div>
      ) : null}
    </section>
  );
}

function LeadInput({
  label,
  value,
  onChange,
  type = "text",
  required = false
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
}): JSX.Element {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-bold text-slate-700">{label}</span>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900"
      />
    </label>
  );
}

function InteractiveDiagnostic({ form }: { form: LeadForm }): JSX.Element {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [isFinished, setIsFinished] = useState(false);
  const [sendStatus, setSendStatus] = useState<Status>("idle");
  const questions = BUSINESS_CONTROL_DIAGNOSTIC.questions;
  const question = questions[currentIndex];
  const selectedScore = answers[currentIndex];
  const answeredCount = Object.keys(answers).length;
  const progress = Math.round((answeredCount / questions.length) * 100);

  function chooseAnswer(score: number): void {
    setAnswers((prev) => ({ ...prev, [currentIndex]: score }));
  }

  function goNext(): void {
    if (selectedScore === undefined) return;
    if (currentIndex === questions.length - 1) {
      setIsFinished(true);
      return;
    }
    setCurrentIndex((prev) => prev + 1);
  }

  function goBack(): void {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  }

  if (isFinished) {
    return <DiagnosticResult answers={answers} form={form} onRestart={() => {
      setAnswers({});
      setCurrentIndex(0);
      setIsFinished(false);
      setSendStatus("idle");
    }} sendStatus={sendStatus} setSendStatus={setSendStatus} />;
  }

  return (
    <section className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_28px_70px_rgba(15,23,42,0.08)]">
      <div className="grid gap-0 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="border-b border-slate-200 bg-[linear-gradient(135deg,#f7fbff_0%,#fff8e8_100%)] p-6 md:p-8 lg:border-b-0 lg:border-r">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            Вопрос {currentIndex + 1} из {questions.length}
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900">
            {question.area}
          </h2>
          <div className="mt-6 h-3 overflow-hidden rounded-full bg-white">
            <div className="h-full rounded-full bg-slate-950 transition-all" style={{ width: `${progress}%` }} />
          </div>
          <p className="mt-3 text-sm font-semibold text-slate-600">Прогресс: {progress}%</p>
          <p className="mt-6 text-base leading-8 text-slate-700">
            Выбирайте не “как хотелось бы”, а как реально работает сейчас. Диагностика полезна только
            при честной оценке.
          </p>
        </div>

        <div className="p-6 md:p-8">
          <h3 className="text-2xl font-black leading-tight tracking-tight text-slate-900 md:text-3xl">
            {question.text}
          </h3>
          <div className="mt-6 grid gap-3">
            {SCORE_OPTIONS.map((option) => {
              const isSelected = selectedScore === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => chooseAnswer(option.value)}
                  className={`rounded-[1.4rem] border p-4 text-left transition hover:-translate-y-0.5 ${
                    isSelected
                      ? "border-slate-950 bg-slate-950 text-white shadow-[0_18px_40px_rgba(15,23,42,0.18)]"
                      : "border-slate-200 bg-slate-50 text-slate-900 hover:bg-white"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm font-black ${
                      isSelected ? "bg-white text-slate-950" : "bg-white text-slate-700"
                    }`}>
                      {option.value}
                    </span>
                    <span>
                      <span className="block text-base font-black">{option.title}</span>
                      <span className={`mt-1 block text-sm leading-6 ${isSelected ? "text-white/75" : "text-slate-600"}`}>
                        {option.text}
                      </span>
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
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
              disabled={selectedScore === undefined}
              className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {currentIndex === questions.length - 1 ? "Показать результат" : "Следующий вопрос"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function DiagnosticResult({
  answers,
  form,
  onRestart,
  sendStatus,
  setSendStatus
}: {
  answers: AnswerMap;
  form: LeadForm;
  onRestart: () => void;
  sendStatus: Status;
  setSendStatus: (status: Status) => void;
}): JSX.Element {
  const totalScore = Object.values(answers).reduce((sum, score) => sum + score, 0);
  const level = resolveLevel(totalScore);
  const areaScores = calculateAreaScores(answers);
  const weakestArea = [...areaScores].sort((left, right) => left.percent - right.percent)[0];

  async function sendDiagnostic(): Promise<void> {
    setSendStatus("sending");
    try {
      if (!LEADS_API_URL) {
        throw new Error("Lead API is not configured");
      }

      const response = await fetch(LEADS_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.fullName,
          email: form.email,
          company: form.company,
          role: form.role,
          telegram: form.telegram,
          source: "business-control-diagnostic-result",
          result: `${level.title}: ${totalScore}/72. Слабая зона: ${weakestArea?.area ?? "-"}`,
          leadMagnet: BUSINESS_CONTROL_DIAGNOSTIC.title,
          pageUrl: window.location.href,
          scores: {
            total: totalScore,
            max: 72,
            level: level.title,
            weakestArea: weakestArea?.area,
            areas: Object.fromEntries(areaScores.map((item) => [item.area, item.score]))
          },
          details: BUSINESS_CONTROL_DIAGNOSTIC.questions.map((question, index) => ({
            question: question.text,
            area: question.area,
            score: answers[index] ?? 0
          }))
        })
      });

      if (!response.ok) {
        throw new Error("Lead API request failed");
      }

      setSendStatus("success");
    } catch {
      setSendStatus("error");
    }
  }

  return (
    <section className="space-y-6 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_28px_70px_rgba(15,23,42,0.08)] md:p-8">
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div className="rounded-[1.8rem] border border-slate-200 bg-slate-950 p-6 text-white">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
            Итог диагностики
          </p>
          <p className="mt-4 text-6xl font-black leading-none">{totalScore}</p>
          <p className="mt-2 text-sm font-semibold text-white/60">из 72 баллов</p>
          <h2 className="mt-5 text-3xl font-black leading-tight tracking-tight">{level.title}</h2>
          <p className="mt-4 text-base leading-8 text-white/75">{level.summary}</p>
        </div>

        <div className="space-y-4">
          <div className="rounded-[1.8rem] border border-[#f1d973] bg-[#fff9d4] p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8a6e00]">
              Первая точка роста
            </p>
            <h3 className="mt-2 text-2xl font-black tracking-tight text-slate-900">
              {weakestArea?.area ?? "Управляемость бизнеса"}
            </h3>
            <p className="mt-3 text-sm leading-7 text-slate-700">
              Начните с самого слабого блока: там чаще всего находится ограничение, которое мешает
              росту, продажам, скорости решений или внедрению изменений.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {areaScores.map((item) => (
              <div key={item.area} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm font-black text-slate-900">{item.area}</p>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-white">
                  <div className="h-full rounded-full bg-slate-950" style={{ width: `${item.percent}%` }} />
                </div>
                <p className="mt-2 text-xs font-semibold text-slate-500">
                  {item.score} из {item.max} баллов
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {level.recommendations.map((item, index) => (
          <div key={item} className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-400">0{index + 1}</p>
            <p className="mt-2 text-sm font-semibold leading-6 text-slate-800">{item}</p>
          </div>
        ))}
      </div>

      <div className="rounded-[1.75rem] border border-[#efb8d2] bg-[#fff0f7] p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9f2f73]">
          Что можно сделать дальше
        </p>
        <p className="mt-3 text-sm leading-7 text-slate-700">
          Сохраните результат, отправьте диагностику Денису или обсудите выводы в Telegram. Если
          нужно, можно разобрать слабый блок и собрать план изменений на ближайшие 30 дней.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => window.print()}
            className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-800 transition hover:bg-slate-50"
          >
            Скачать / сохранить PDF
          </button>
          <button
            type="button"
            onClick={() => void sendDiagnostic()}
            disabled={sendStatus === "sending"}
            className="rounded-2xl bg-[#ff6a3d] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#ef5d31] disabled:cursor-wait disabled:opacity-70"
          >
            {sendStatus === "sending" ? "Отправляем..." : "Отправить диагностику Денису"}
          </button>
          <Link
            href={TELEGRAM_CONSULT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
          >
            Обсудить результаты
          </Link>
          <button
            type="button"
            onClick={onRestart}
            className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-800 transition hover:bg-slate-50"
          >
            Пройти заново
          </button>
        </div>
        {sendStatus === "success" ? (
          <p className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800">
            Диагностика отправлена Денису в Telegram.
          </p>
        ) : null}
        {sendStatus === "error" ? (
          <p className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-800">
            Не удалось отправить диагностику. Можно написать Денису напрямую в Telegram.
          </p>
        ) : null}
      </div>
    </section>
  );
}

function resolveLevel(totalScore: number) {
  if (totalScore <= 24) return BUSINESS_CONTROL_DIAGNOSTIC.levels[0];
  if (totalScore <= 48) return BUSINESS_CONTROL_DIAGNOSTIC.levels[1];
  if (totalScore <= 64) return BUSINESS_CONTROL_DIAGNOSTIC.levels[2];
  return BUSINESS_CONTROL_DIAGNOSTIC.levels[3];
}

function calculateAreaScores(answers: AnswerMap): Array<{ area: string; score: number; max: number; percent: number }> {
  const areaMap = new Map<string, { score: number; max: number }>();

  BUSINESS_CONTROL_DIAGNOSTIC.questions.forEach((question, index) => {
    const current = areaMap.get(question.area) ?? { score: 0, max: 0 };
    current.score += answers[index] ?? 0;
    current.max += 3;
    areaMap.set(question.area, current);
  });

  return [...areaMap.entries()].map(([area, value]) => ({
    area,
    score: value.score,
    max: value.max,
    percent: value.max ? Math.round((value.score / value.max) * 100) : 0
  }));
}
