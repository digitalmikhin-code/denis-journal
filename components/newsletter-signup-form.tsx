"use client";

import { useState } from "react";
import { SUBSCRIBERS_API_URL } from "@/lib/constants";

type NewsletterSignupFormProps = {
  source: string;
  title?: string;
  subtitle?: string;
  className?: string;
  tags?: string[];
};

type FormState = {
  fullName: string;
  email: string;
};

const INITIAL_FORM: FormState = {
  fullName: "",
  email: ""
};

export function NewsletterSignupForm({
  source,
  title = "Подпишитесь на email-рассылку",
  subtitle = "Получайте новые разборы, практические материалы и анонсы продуктов в почту.",
  className,
  tags = []
}: NewsletterSignupFormProps): JSX.Element {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();

    if (!SUBSCRIBERS_API_URL) {
      setError("API подписчиков не подключён. Укажите NEXT_PUBLIC_SUBSCRIBERS_API_URL.");
      return;
    }

    setSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(SUBSCRIBERS_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.fullName,
          email: form.email,
          source,
          tags
        })
      });

      const payload = (await response.json()) as { error?: string };
      if (!response.ok) {
        throw new Error(payload.error ?? "Не удалось подписаться.");
      }

      setSuccess("Готово. Вы в базе, скоро получите материалы на почту.");
      setForm(INITIAL_FORM);
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Не удалось отправить форму. Попробуйте снова."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section
      className={
        className ??
        "rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.06)] md:p-8"
      }
    >
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Email-база</p>
      <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-900 md:text-4xl">{title}</h2>
      <p className="mt-3 max-w-[58ch] text-base leading-7 text-slate-600">{subtitle}</p>

      <form onSubmit={handleSubmit} className="mt-6 grid gap-4 md:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">ФИО</span>
          <input
            value={form.fullName}
            onChange={(event) => setForm((prev) => ({ ...prev, fullName: event.target.value }))}
            placeholder="Иван Иванов"
            autoComplete="name"
            required
            minLength={3}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#6964d9] focus:bg-white"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Email</span>
          <input
            type="email"
            value={form.email}
            onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
            placeholder="name@company.com"
            autoComplete="email"
            required
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#6964d9] focus:bg-white"
          />
        </label>

        <div className="md:col-span-2 flex flex-wrap items-center gap-3">
          <button
            type="submit"
            disabled={submitting || !SUBSCRIBERS_API_URL}
            className="rounded-2xl bg-slate-900 px-6 py-3 text-sm font-bold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "Отправляю..." : "Подписаться"}
          </button>
          <p className="text-xs text-slate-500">Нажимая кнопку, вы соглашаетесь получать письма и материалы журнала.</p>
        </div>
      </form>

      {error ? <p className="mt-4 text-sm font-medium text-[#b42318]">{error}</p> : null}
      {!SUBSCRIBERS_API_URL ? (
        <p className="mt-4 text-sm font-medium text-amber-700">
          CRM API не настроен. Добавьте `NEXT_PUBLIC_SUBSCRIBERS_API_URL` в переменные окружения сайта.
        </p>
      ) : null}
      {success ? <p className="mt-4 text-sm font-medium text-emerald-700">{success}</p> : null}
    </section>
  );
}
