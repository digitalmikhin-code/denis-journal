"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import Link from "next/link";
import { LEADS_API_URL, TELEGRAM_CONSULT_URL } from "@/lib/constants";
import { ALL_MANAGER_PROMPTS, MANAGER_AI_PROMPTS } from "@/lib/manager-ai-prompts";

type LeadForm = {
  fullName: string;
  email: string;
  company: string;
  role: string;
  telegram: string;
};

type Status = "idle" | "sending" | "success" | "error";

export function ManagerAiPromptsLeadForm(): JSX.Element {
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
            source: "lead-magnet-50-manager-ai-prompts",
            result: "Запросил лид-магнит: 50 промтов для руководителя",
            leadMagnet: MANAGER_AI_PROMPTS.fullTitle
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
      <div className="rounded-[2rem] border border-[#ec9a48] bg-[linear-gradient(135deg,#fff0df_0%,#fff8e8_100%)] p-6 shadow-soft md:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9a4d00]">
          PDF-лид-магнит
        </p>
        <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900">
          Получить 50 промтов
        </h2>
        <p className="mt-4 text-base leading-8 text-slate-700">
          Оставьте контакты, и заявка уйдет Денису в Telegram. После отправки на странице откроется
          полный набор промтов с задачами, сценариями применения и ожидаемым результатом.
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
            {status === "sending" ? "Отправляем..." : "Получить PDF"}
          </button>
        </form>

        {status === "success" ? (
          <p className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800">
            Заявка отправлена. Подборка промтов открыта ниже.
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
          Структура PDF
        </p>
        <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900">
          Что внутри подборки
        </h2>
        <div className="mt-5 grid gap-3">
          {[
            "Введение: где ИИ реально помогает руководителю.",
            "Как пользоваться промтами и адаптировать их под контекст.",
            "Промты для анализа ситуации и подготовки решений.",
            "Промты для совещаний, проектов, продаж, HR и команды.",
            "Промты для стратегии и финальный CTA на курс или консультацию."
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
          <UnlockedPrompts />
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

function UnlockedPrompts(): JSX.Element {
  return (
    <section className="space-y-6 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft md:p-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
          Материал открыт
        </p>
        <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900">
          {MANAGER_AI_PROMPTS.fullTitle}
        </h2>
        <p className="mt-4 max-w-4xl text-base leading-8 text-slate-700">
          {MANAGER_AI_PROMPTS.intro}
        </p>
      </div>

      <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
          Как пользоваться
        </p>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {MANAGER_AI_PROMPTS.howToUse.map((item) => (
            <p key={item} className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-700">
              {item}
            </p>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        {MANAGER_AI_PROMPTS.sections.map((section) => (
          <section key={section.title} className="space-y-3">
            <h3 className="text-2xl font-black tracking-tight text-slate-900">{section.title}</h3>
            <div className="grid gap-3">
              {section.prompts.map((prompt) => {
                const index = ALL_MANAGER_PROMPTS.findIndex((item) => item.prompt === prompt.prompt) + 1;
                return (
                  <article key={prompt.prompt} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-slate-950 px-3 py-1 text-xs font-black text-white">
                        {index}
                      </span>
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
                        {prompt.task}
                      </span>
                    </div>
                    <p className="mt-3 rounded-xl bg-slate-50 p-4 text-sm font-semibold leading-7 text-slate-800">
                      {prompt.prompt}
                    </p>
                    <div className="mt-3 grid gap-3 md:grid-cols-2">
                      <p className="text-sm leading-6 text-slate-600">
                        <span className="font-bold text-slate-900">Когда применять: </span>
                        {prompt.whenToUse}
                      </p>
                      <p className="text-sm leading-6 text-slate-600">
                        <span className="font-bold text-slate-900">Результат: </span>
                        {prompt.expectedResult}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      <div className="rounded-[1.75rem] border border-[#ec9a48] bg-[#fff0df] p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9a4d00]">
          Следующий шаг
        </p>
        <p className="mt-3 text-sm leading-7 text-slate-700">{MANAGER_AI_PROMPTS.courseCta}</p>
        <p className="mt-3 text-sm leading-7 text-slate-700">{MANAGER_AI_PROMPTS.afterDownloadMessage}</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => window.print()}
            className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-800 transition hover:bg-slate-50"
          >
            Распечатать / сохранить PDF
          </button>
          <Link
            href="https://stepik.org/course/243614/promo"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-800 transition hover:bg-slate-50"
          >
            Смотреть курс
          </Link>
          <Link
            href={TELEGRAM_CONSULT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
          >
            Обсудить внедрение ИИ
          </Link>
        </div>
      </div>
    </section>
  );
}
