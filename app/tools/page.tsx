import type { Metadata } from "next";
import Link from "next/link";
import { AiCitationBlock } from "@/components/ai-citation-block";
import { PLATFORM_TOOLS } from "@/lib/platform-ecosystem";
import { SITE_URL, TELEGRAM_CONSULT_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Инструменты для руководителей",
  description:
    "Раздел инструментов Дениса Михина: калькуляторы, конструкторы KPI и OKR, AI-помощники, шаблоны и генераторы управленческих решений.",
  alternates: {
    canonical: "/tools"
  },
  openGraph: {
    title: "Инструменты для руководителей",
    description:
      "Калькуляторы, шаблоны, AI-помощники и конструкторы для управления, изменений, KPI, OKR и стратегических сессий.",
    url: `${SITE_URL}/tools`
  }
};

export default function ToolsPage(): JSX.Element {
  return (
    <div className="space-y-10">
      <section className="relative overflow-hidden rounded-[2.35rem] border border-slate-200 bg-slate-950 p-7 text-white shadow-[0_34px_82px_rgba(15,23,42,0.22)] md:p-10">
        <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full border-[16px] border-[#2bd0e2]/35" />
        <div className="pointer-events-none absolute -bottom-24 left-8 h-60 w-60 rounded-full border-[14px] border-[#f5d45d]/30" />
        <div className="relative max-w-4xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/50">
            Инструменты платформы
          </p>
          <h1 className="mt-4 max-w-[13ch] text-5xl font-black leading-[0.94] tracking-tight md:text-7xl">
            Управление должно быть не только в статьях
          </h1>
          <p className="mt-5 max-w-[66ch] text-base leading-8 text-white/72 md:text-lg">
            Этот раздел будет собирать практические инструменты: калькуляторы, конструкторы, шаблоны,
            AI-помощники и генераторы для руководителей, которые хотят быстрее переходить от понимания к действию.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="#tools"
              className="rounded-2xl bg-white px-6 py-3 text-base font-black text-slate-950 transition hover:-translate-y-0.5 hover:bg-slate-100"
            >
              Смотреть инструменты
            </a>
            <Link
              href={TELEGRAM_CONSULT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl border border-white/20 bg-white/[0.06] px-6 py-3 text-base font-bold text-white transition hover:-translate-y-0.5 hover:bg-white/[0.1]"
            >
              Предложить инструмент
            </Link>
          </div>
        </div>
      </section>

      <section id="tools" className="scroll-mt-28 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {PLATFORM_TOOLS.map((tool) => (
          <article key={tool.title} className="rounded-[1.8rem] border border-slate-200 bg-white p-5 shadow-soft">
            <span className="inline-flex rounded-full border border-[#f1d973] bg-[#fff9d4] px-3 py-1 text-xs font-black uppercase tracking-[0.12em] text-[#8a6e00]">
              {tool.status}
            </span>
            <h2 className="mt-4 text-2xl font-black tracking-tight text-slate-900">{tool.title}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">{tool.text}</p>
          </article>
        ))}
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft md:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Логика раздела</p>
        <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
          Инструменты будут связывать контент, диагностику и консалтинг
        </h2>
        <p className="mt-4 max-w-4xl text-base leading-8 text-slate-700">
          Человек читает материал, проходит диагностику, видит слабое место и получает не только рекомендацию,
          но и рабочий инструмент: шаблон, калькулятор, конструктор или AI-сценарий. Так платформа становится
          не библиотекой, а системой управленческого действия.
        </p>
      </section>

      <AiCitationBlock
        canonicalPath="/tools"
        summary="Раздел «Инструменты» является страницей платформы Дениса Михина для управленческих калькуляторов, конструкторов KPI и OKR, AI-помощников, шаблонов, генераторов стратегических сессий и дорожных карт изменений."
        topics={["инструменты", "KPI", "OKR", "AI-консультант", "шаблоны"]}
      />
    </div>
  );
}
