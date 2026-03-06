import type { Metadata } from "next";
import Link from "next/link";
import { STEPIK_TEACH_URL, TELEGRAM_CHANNEL_URL, TELEGRAM_CONSULT_URL } from "@/lib/constants";
import { getPageContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Обучение",
  alternates: {
    canonical: "/training"
  }
};

export default function TrainingPage(): JSX.Element {
  const page = getPageContent("training");

  return (
    <div className="space-y-10">
      <section className="relative overflow-hidden rounded-3xl bg-[#6863d8] p-8 text-white shadow-soft md:p-10">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full border-[14px] border-white/90" />
        <div className="pointer-events-none absolute -bottom-36 right-24 h-72 w-72 rounded-full border-[10px] border-white/70" />
        <div className="relative grid gap-8 md:grid-cols-[1.05fr_0.95fr] md:items-center">
          <div className="space-y-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/75">Обучение и развитие</p>
            <h1 className="max-w-[14ch] text-5xl font-extrabold leading-tight tracking-tight md:text-6xl">
              {page.title} с реальным результатом
            </h1>
            <p className="max-w-[24ch] text-2xl leading-snug text-white/95">
              Практические курсы и разбор вашей ситуации 1:1 для карьерного и управленческого роста.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href="#courses"
                className="rounded-2xl bg-white px-6 py-3 text-lg font-bold text-[#5f59cf] transition hover:bg-slate-100"
              >
                Смотреть обучение
              </Link>
            </div>
          </div>
          <div className="relative hidden h-full min-h-[260px] md:block">
            <div className="absolute right-0 top-4 w-[88%] rounded-3xl border-4 border-[#2f2b86] bg-[#8c87ea] p-6 shadow-[0_18px_0_0_rgba(25,22,91,0.35)]">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/80">Формат</p>
              <p className="mt-2 text-2xl font-extrabold">Stepik + сессия 1:1</p>
              <p className="mt-3 text-base text-white/90">Курсы дают систему, консультация дает фокус под вашу задачу.</p>
              <Link
                href="#session"
                className="mt-5 inline-flex rounded-xl border-2 border-white/80 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20"
              >
                Перейти к разбору 1:1
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section
        id="courses"
        className="grid gap-5 rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900/80 md:grid-cols-2"
      >
        <div className="rounded-2xl border border-cyan-200 bg-gradient-to-br from-cyan-50 via-white to-sky-50 p-5 dark:border-cyan-900/60 dark:from-cyan-950/40 dark:via-slate-900 dark:to-sky-950/30">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
            Курсы
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight">Обучение на Stepik</h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Все мои курсы в одном месте: карьерный рост, управление, мышление и рабочие инструменты.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href={STEPIK_TEACH_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-xl bg-cyan-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-cyan-700"
            >
              Перейти к курсам на Stepik
            </Link>
            <Link
              href={TELEGRAM_CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-xl border border-cyan-300 bg-white px-4 py-2.5 text-sm font-semibold text-cyan-700 transition hover:border-cyan-500 dark:border-cyan-800 dark:bg-slate-900 dark:text-cyan-300"
            >
              Telegram-канал ScrumBaza
            </Link>
          </div>
        </div>

        <div
          id="session"
          className="rounded-2xl border border-brand/20 bg-gradient-to-br from-brand-soft via-white to-rose-50 p-5 dark:border-brand/30 dark:from-brand/20 dark:via-slate-900 dark:to-rose-950/20"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">Стратегическая сессия</p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight">Разбор вашей ситуации 1:1</h2>
          <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
            Помогу сфокусировать цель, определить точки роста и собрать рабочий план действий.
          </p>
          <Link
            href={TELEGRAM_CONSULT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-dark"
          >
            Получить консультацию Дениса бесплатно
          </Link>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        <h3 className="text-xl font-bold tracking-tight">Для кого это обучение</h3>
        <ul className="mt-3 space-y-2 text-slate-700 dark:text-slate-300">
          <li>Руководители, которые хотят усилить команду и процессы.</li>
          <li>Специалисты, которым нужен карьерный рост и понятная система развития.</li>
          <li>Предприниматели и проектные лидеры, которым нужен внешний разбор и стратегия.</li>
        </ul>
      </section>
    </div>
  );
}
