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
  title = "РџРѕРґРїРёС€РёС‚РµСЃСЊ РЅР° email-СЂР°СЃСЃС‹Р»РєСѓ",
  subtitle = "РџРѕР»СѓС‡Р°Р№С‚Рµ РЅРѕРІС‹Рµ СЂР°Р·Р±РѕСЂС‹, РїСЂР°РєС‚РёС‡РµСЃРєРёРµ РјР°С‚РµСЂРёР°Р»С‹ Рё Р°РЅРѕРЅСЃС‹ РїСЂРѕРґСѓРєС‚РѕРІ РІ РїРѕС‡С‚Сѓ.",
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
      setError("API РїРѕРґРїРёСЃС‡РёРєРѕРІ РЅРµ РїРѕРґРєР»СЋС‡С‘РЅ. РЈРєР°Р¶РёС‚Рµ NEXT_PUBLIC_SUBSCRIBERS_API_URL.");
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
        throw new Error(payload.error ?? "РќРµ СѓРґР°Р»РѕСЃСЊ РїРѕРґРїРёСЃР°С‚СЊСЃСЏ.");
      }

      setSuccess("Р“РѕС‚РѕРІРѕ. Р’С‹ РІ Р±Р°Р·Рµ, СЃРєРѕСЂРѕ РїРѕР»СѓС‡РёС‚Рµ РјР°С‚РµСЂРёР°Р»С‹ РЅР° РїРѕС‡С‚Сѓ.");
      setForm(INITIAL_FORM);
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "РќРµ СѓРґР°Р»РѕСЃСЊ РѕС‚РїСЂР°РІРёС‚СЊ С„РѕСЂРјСѓ. РџРѕРїСЂРѕР±СѓР№С‚Рµ СЃРЅРѕРІР°."
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
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Email-Р±Р°Р·Р°</p>
      <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-900 md:text-4xl">{title}</h2>
      <p className="mt-3 max-w-[58ch] text-base leading-7 text-slate-600">{subtitle}</p>

      <form onSubmit={handleSubmit} className="mt-6 grid gap-4 md:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Р¤РРћ</span>
          <input
            value={form.fullName}
            onChange={(event) => setForm((prev) => ({ ...prev, fullName: event.target.value }))}
            placeholder="РРІР°РЅ РРІР°РЅРѕРІ"
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
            disabled={submitting}
            className="rounded-2xl bg-slate-900 px-6 py-3 text-sm font-bold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "РћС‚РїСЂР°РІР»СЏСЋ..." : "РџРѕРґРїРёСЃР°С‚СЊСЃСЏ"}
          </button>
          <p className="text-xs text-slate-500">РќР°Р¶РёРјР°СЏ РєРЅРѕРїРєСѓ, РІС‹ СЃРѕРіР»Р°С€Р°РµС‚РµСЃСЊ РїРѕР»СѓС‡Р°С‚СЊ РїРёСЃСЊРјР° Рё РјР°С‚РµСЂРёР°Р»С‹ Р¶СѓСЂРЅР°Р»Р°.</p>
        </div>
      </form>

      {error ? <p className="mt-4 text-sm font-medium text-[#b42318]">{error}</p> : null}
      {!SUBSCRIBERS_API_URL ? (
        <p className="mt-4 text-sm font-medium text-amber-700">
          CRM API РЅРµ РЅР°СЃС‚СЂРѕРµРЅ. Р”РѕР±Р°РІСЊС‚Рµ `NEXT_PUBLIC_SUBSCRIBERS_API_URL` РІ РїРµСЂРµРјРµРЅРЅС‹Рµ РѕРєСЂСѓР¶РµРЅРёСЏ СЃР°Р№С‚Р°.
        </p>
      ) : null}
      {success ? <p className="mt-4 text-sm font-medium text-emerald-700">{success}</p> : null}
    </section>
  );
}

