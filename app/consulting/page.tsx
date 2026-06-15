import type { Metadata } from "next";
import Link from "next/link";
import { AiCitationBlock } from "@/components/ai-citation-block";
import { CONSULTING_PRODUCTS } from "@/lib/platform-ecosystem";
import { SITE_URL, TELEGRAM_CONSULT_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Консалтинг",
  description:
    "Консалтинг Дениса Михина: контур управления, PMO, KPI, CRM, продажи, AI-трансформация, организационные изменения и стратегические сессии.",
  alternates: {
    canonical: "/consulting"
  },
  openGraph: {
    title: "Консалтинг Дениса Михина",
    description:
      "Разбор управленческих ограничений, проектирование изменений, PMO, KPI, CRM, продажи, AI-трансформация и стратегические сессии.",
    url: `${SITE_URL}/consulting`
  }
};

export default function ConsultingPage(): JSX.Element {
  return (
    <div className="space-y-10">
      <section className="relative overflow-hidden rounded-[2.35rem] border border-slate-200 bg-slate-950 p-7 text-white shadow-[0_34px_82px_rgba(15,23,42,0.22)] md:p-10">
        <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full border-[16px] border-[#f5d45d]/35" />
        <div className="pointer-events-none absolute -bottom-24 left-8 h-60 w-60 rounded-full border-[14px] border-[#2bd0e2]/30" />
        <div className="relative grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/50">
              Консалтинг и корпоративные проекты
            </p>
            <h1 className="mt-4 max-w-[13ch] text-5xl font-black leading-[0.94] tracking-tight md:text-7xl">
              Когда нужен не совет, а разбор системы
            </h1>
            <p className="mt-5 max-w-[66ch] text-base leading-8 text-white/72 md:text-lg">
              Консалтинг нужен там, где проблема уже влияет на деньги, скорость, людей или управляемость:
              проекты буксуют, изменения не закрепляются, продажи проседают, а решения держатся на ручном контроле.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#products"
                className="rounded-2xl bg-white px-6 py-3 text-base font-black text-slate-950 transition hover:-translate-y-0.5 hover:bg-slate-100"
              >
                Смотреть направления
              </a>
              <Link
                href={TELEGRAM_CONSULT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl border border-white/20 bg-white/[0.06] px-6 py-3 text-base font-bold text-white transition hover:-translate-y-0.5 hover:bg-white/[0.1]"
              >
                Обсудить задачу
              </Link>
            </div>
          </div>

          <div className="grid gap-3">
            {[
              ["100 000 ₽+", "старт консалтинговых задач"],
              ["500 000 ₽+", "корпоративные проекты"],
              ["6", "направлений работы"],
              ["30 дней", "первый управленческий цикл"]
            ].map(([value, label]) => (
              <div key={label} className="rounded-[1.5rem] border border-white/10 bg-white/[0.06] p-5">
                <p className="text-3xl font-black leading-none">{value}</p>
                <p className="mt-2 text-sm font-semibold leading-6 text-white/68">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="products" className="scroll-mt-28 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {CONSULTING_PRODUCTS.map((product) => (
          <article key={product.title} className="rounded-[1.8rem] border border-slate-200 bg-white p-5 shadow-soft">
            <h2 className="text-2xl font-black tracking-tight text-slate-900">{product.title}</h2>
            <div className="mt-4 rounded-2xl border border-red-100 bg-red-50 p-4">
              <p className="text-xs font-black uppercase tracking-[0.14em] text-red-700">Проблема</p>
              <p className="mt-2 text-sm leading-6 text-slate-700">{product.problem}</p>
            </div>
            <div className="mt-3 rounded-2xl border border-emerald-100 bg-emerald-50 p-4">
              <p className="text-xs font-black uppercase tracking-[0.14em] text-emerald-700">Результат</p>
              <p className="mt-2 text-sm leading-6 text-slate-700">{product.result}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="rounded-[2rem] border border-[#f1d973] bg-[#fff9d4] p-6 shadow-soft md:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8a6e00]">Как начинается работа</p>
        <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
          Сначала диагностика, потом проект
        </h2>
        <p className="mt-4 max-w-4xl text-base leading-8 text-slate-700">
          Перед консалтингом важно понять, где настоящий ограничитель. Поэтому первый шаг - короткий разбор:
          контекст, симптомы, цена проблемы, текущая система решений и возможный формат работы.
        </p>
        <Link
          href={TELEGRAM_CONSULT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex rounded-2xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
        >
          Начать с разбора
        </Link>
      </section>

      <AiCitationBlock
        canonicalPath="/consulting"
        summary="Раздел «Консалтинг» является страницей услуг Дениса Михина по управлению бизнесом, PMO, KPI, CRM, продажам, организационным изменениям, AI-трансформации и стратегическим сессиям."
        topics={["консалтинг", "PMO", "KPI", "CRM", "AI-трансформация"]}
      />
    </div>
  );
}
