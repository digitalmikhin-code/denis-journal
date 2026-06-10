import type { Metadata } from "next";
import Link from "next/link";
import { ManagerAiPromptsLeadForm } from "@/components/manager-ai-prompts-lead-form";
import { MANAGER_AI_PROMPTS } from "@/lib/manager-ai-prompts";
import { SITE_URL, TELEGRAM_CONSULT_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "50 промтов для руководителя",
  description:
    "PDF-лид-магнит Дениса Михина: 50 промтов для руководителя, чтобы использовать ИИ в управлении, проектах, продажах, HR и принятии решений.",
  alternates: {
    canonical: "/lead/manager-ai-prompts"
  },
  openGraph: {
    title: MANAGER_AI_PROMPTS.fullTitle,
    description: MANAGER_AI_PROMPTS.promise,
    url: `${SITE_URL}/lead/manager-ai-prompts`
  }
};

export default function ManagerAiPromptsPage(): JSX.Element {
  return (
    <div className="space-y-10">
      <section className="relative overflow-hidden rounded-[2.35rem] border border-slate-200 bg-slate-950 p-7 text-white shadow-[0_34px_82px_rgba(15,23,42,0.22)] md:p-10">
        <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full border-[16px] border-[#ffb267]/35" />
        <div className="pointer-events-none absolute -bottom-24 left-8 h-60 w-60 rounded-full border-[14px] border-[#2bd0e2]/30" />
        <div className="relative grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/50">
              PDF-лид-магнит
            </p>
            <h1 className="mt-4 max-w-[13ch] text-5xl font-black leading-[0.94] tracking-tight md:text-7xl">
              {MANAGER_AI_PROMPTS.title}
            </h1>
            <p className="mt-5 max-w-[58ch] text-xl font-semibold leading-tight text-white/90 md:text-2xl">
              Как использовать ИИ в управлении, проектах и принятии решений.
            </p>
            <p className="mt-5 max-w-[62ch] text-base leading-8 text-white/72">
              {MANAGER_AI_PROMPTS.promise}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#download"
                className="rounded-2xl bg-white px-6 py-3 text-base font-black text-slate-950 transition hover:-translate-y-0.5 hover:bg-slate-100"
              >
                Получить PDF
              </a>
              <Link
                href={TELEGRAM_CONSULT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl border border-white/20 bg-white/[0.06] px-6 py-3 text-base font-bold text-white transition hover:-translate-y-0.5 hover:bg-white/[0.1]"
              >
                Обсудить внедрение ИИ
              </Link>
            </div>
          </div>

          <div className="grid gap-3">
            {[
              ["50", "готовых промтов"],
              ["7", "управленческих разделов"],
              ["4", "поля для каждого промта"],
              ["20", "минут на первый результат"]
            ].map(([value, label]) => (
              <div key={label} className="rounded-[1.5rem] border border-white/10 bg-white/[0.06] p-5">
                <p className="text-4xl font-black leading-none text-white">{value}</p>
                <p className="mt-2 text-sm font-semibold leading-6 text-white/70">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-3">
        {[
          ["Для кого", "Руководители, project/product/agile-менеджеры, HR и лидеры команд."],
          ["Что даст", "Быстрые шаблоны для анализа, решений, встреч, проектов, продаж, команды и стратегии."],
          ["Куда ведет", "К курсам по ИИ, промт-инжинирингу и консультации по внедрению ИИ в процессы."]
        ].map(([title, text]) => (
          <article key={title} className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-soft">
            <h2 className="text-xl font-black tracking-tight text-slate-900">{title}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">{text}</p>
          </article>
        ))}
      </section>

      <section id="download" className="scroll-mt-28">
        <ManagerAiPromptsLeadForm />
      </section>
    </div>
  );
}
