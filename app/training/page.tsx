import type { Metadata } from "next";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { mdxComponents } from "@/components/mdx-components";
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
      <article className="space-y-6">
        <h1 className="text-4xl font-extrabold tracking-tight">{page.title}</h1>
        <div className="prose-journal">
          <MDXRemote
            source={page.content}
            components={mdxComponents}
            options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
          />
        </div>
      </article>

      <section className="grid gap-5 rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900/80 md:grid-cols-2">
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

        <div className="rounded-2xl border border-brand/20 bg-gradient-to-br from-brand-soft via-white to-rose-50 p-5 dark:border-brand/30 dark:from-brand/20 dark:via-slate-900 dark:to-rose-950/20">
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
