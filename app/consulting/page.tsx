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
    <div className="space-y-8">
      <section className="relative overflow-hidden border border-slate-200 bg-white p-6 shadow-[0_24px_70px_rgba(9,22,43,0.08)] dark:border-slate-800 dark:bg-slate-900 md:p-8">
        <div className="pointer-events-none absolute inset-0 ambient-grid opacity-50" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-28 w-44 bg-brand/95 [clip-path:polygon(42%_0,100%_0,100%_100%,0_100%)]" />
        <div className="relative grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div>
            <p className="border-l-4 border-brand pl-3 text-xs font-black uppercase tracking-[0.18em] text-brand">
              Консалтинг и корпоративные проекты
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl font-black leading-[0.98] tracking-tight text-slate-950 dark:text-white md:text-6xl">
              Когда нужен не совет, а разбор системы
            </h1>
            <p className="mt-5 max-w-[66ch] text-base leading-8 text-slate-650 dark:text-slate-300 md:text-lg">
              Консалтинг нужен там, где проблема уже влияет на деньги, скорость, людей или управляемость:
              проекты буксуют, изменения не закрепляются, продажи проседают, а решения держатся на ручном контроле.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#products"
                className="bg-brand px-6 py-3 text-base font-black text-white transition hover:bg-brand-dark"
              >
                Смотреть направления
              </a>
              <Link
                href={TELEGRAM_CONSULT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-slate-300 bg-white px-6 py-3 text-base font-bold text-slate-950 transition hover:border-brand hover:text-brand dark:border-slate-700 dark:bg-slate-950 dark:text-white"
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
              <div key={label} className="border border-slate-200 bg-slate-950 p-5 text-white dark:border-slate-700">
                <p className="text-3xl font-black leading-none">{value}</p>
                <p className="mt-2 text-sm font-semibold leading-6 text-white/68">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="products" className="scroll-mt-28 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {CONSULTING_PRODUCTS.map((product) => (
          <article key={product.title} className="border border-slate-200 bg-white p-5 shadow-[0_18px_44px_rgba(9,22,43,0.06)] dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-2xl font-black tracking-tight text-slate-900">{product.title}</h2>
            <div className="mt-4 border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
              <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">Проблема</p>
              <p className="mt-2 text-sm leading-6 text-slate-700">{product.problem}</p>
            </div>
            <div className="mt-3 border border-brand/20 bg-brand/5 p-4">
              <p className="text-xs font-black uppercase tracking-[0.14em] text-brand">Результат</p>
              <p className="mt-2 text-sm leading-6 text-slate-700">{product.result}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="border border-slate-200 bg-white p-6 shadow-[0_18px_44px_rgba(9,22,43,0.06)] dark:border-slate-800 dark:bg-slate-900 md:p-8">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-brand">Как начинается работа</p>
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
          className="mt-5 inline-flex bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-brand"
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
