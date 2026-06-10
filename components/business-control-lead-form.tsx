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
            leadMagnet: BUSINESS_CONTROL_DIAGNOSTIC.title
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
        <p className="mt-4 text-base leading-8 text-slate-700">{BUSINESS_CONTROL_DIAGNOSTIC.formText}</p>

        <form onSubmit={submitLead} className="mt-6 space-y-3">
          <LeadInput
            label="Имя"
            value={form.fullName}
            required
            onChange={(value) => setForm((prev) => ({ ...prev, fullName: value }))}
          />
          <LeadInput
            label="Email"
            type="email"
            value={form.email}
            required
            onChange={(value) => setForm((prev) => ({ ...prev, email: value }))}
          />
          <div className="grid gap-3 sm:grid-cols-2">
            <LeadInput
              label="Компания"
              value={form.company}
              onChange={(value) => setForm((prev) => ({ ...prev, company: value }))}
            />
            <LeadInput
              label="Должность"
              value={form.role}
              onChange={(value) => setForm((prev) => ({ ...prev, role: value }))}
            />
          </div>
          <LeadInput
            label="Telegram"
            value={form.telegram}
            onChange={(value) => setForm((prev) => ({ ...prev, telegram: value }))}
          />

          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full rounded-2xl bg-slate-950 px-6 py-4 text-base font-black text-white shadow-[0_7px_0_0_rgba(15,23,42,0.18)] transition hover:-translate-y-0.5 hover:bg-slate-800 disabled:cursor-wait disabled:opacity-70"
          >
            {status === "sending" ? "Отправляем..." : "Получить диагностику"}
          </button>
        </form>

        {status === "success" ? (
          <p className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800">
            Заявка отправлена. Материалы диагностики открыты ниже.
          </p>
        ) : null}
        {status === "error" ? (
          <p className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-800">
            Не удалось отправить заявку. Проверьте соединение или напишите Денису в Telegram.
          </p>
        ) : null}

        <p className="mt-4 text-xs leading-5 text-slate-500">
          Нажимая кнопку, вы отправляете контакты для получения материала и возможного ответа по теме диагностики.
        </p>
      </div>

      <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft md:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
          Что внутри
        </p>
        <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900">
          PDF-структура диагностики
        </h2>
        <div className="mt-5 grid gap-3">
          {BUSINESS_CONTROL_DIAGNOSTIC.pdfStructure.map((item, index) => (
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
          <UnlockedDiagnostic />
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

function UnlockedDiagnostic(): JSX.Element {
  return (
    <section className="space-y-6 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft md:p-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
          Материал открыт
        </p>
        <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900">
          Полная диагностика
        </h2>
        <p className="mt-4 max-w-4xl text-base leading-8 text-slate-700">
          Оцените каждый пункт по шкале от 0 до 3. Максимальный результат — 72 балла.
          После оценки посмотрите уровень зрелости и выберите самый слабый блок как первую точку роста.
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {BUSINESS_CONTROL_DIAGNOSTIC.scoringScale.map((item) => (
          <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm font-semibold leading-6 text-slate-800">{item}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-4">
        {BUSINESS_CONTROL_DIAGNOSTIC.questions.map((question, index) => (
          <div key={question.text} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-slate-950 px-3 py-1 text-xs font-black text-white">
                {index + 1}
              </span>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
                {question.area}
              </span>
            </div>
            <p className="mt-3 text-base font-semibold leading-7 text-slate-800">{question.text}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {BUSINESS_CONTROL_DIAGNOSTIC.levels.map((level) => (
          <article key={level.title} className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
              {level.range}
            </p>
            <h3 className="mt-2 text-2xl font-black tracking-tight text-slate-900">{level.title}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-700">{level.summary}</p>
            <div className="mt-4 space-y-2">
              {level.recommendations.map((item) => (
                <p key={item} className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-700">
                  {item}
                </p>
              ))}
            </div>
          </article>
        ))}
      </div>

      <div className="rounded-[1.75rem] border border-[#efb8d2] bg-[#fff0f7] p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9f2f73]">
          Сообщение после скачивания
        </p>
        <p className="mt-3 text-sm leading-7 text-slate-700">
          {BUSINESS_CONTROL_DIAGNOSTIC.afterDownloadMessage}
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => window.print()}
            className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-800 transition hover:bg-slate-50"
          >
            Распечатать / сохранить PDF
          </button>
          <Link
            href={TELEGRAM_CONSULT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
          >
            Обсудить результаты
          </Link>
        </div>
      </div>
    </section>
  );
}
