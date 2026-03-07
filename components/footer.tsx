import Link from "next/link";
import { TELEGRAM_CHANNEL_URL } from "@/lib/constants";

export function SiteFooter(): JSX.Element {
  return (
    <footer className="mt-12">
      <div className="container-shell">
        <div className="grid gap-6 rounded-t-[2rem] border border-b-0 border-[#efb8d2] bg-[#f6c6dd] p-6 md:grid-cols-[1.05fr_0.95fr] md:p-8">
          <div className="space-y-5">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
              Журнал Дениса Михина
            </h2>
            <p className="max-w-[56ch] text-base text-slate-800">
              Материалы о карьере, управлении, мышлении и практическом ИИ. Копирование и
              использование статей без письменного разрешения автора запрещено.
            </p>
            <p className="text-sm text-slate-700">
              © 2025-{new Date().getFullYear()} Денис Михин. Все права защищены.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-900/15 bg-white/65 p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">
              Полезные ссылки
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <Link
                href="/articles"
                className="rounded-xl border border-slate-900/15 bg-white px-4 py-2 text-sm font-semibold text-slate-800 transition hover:border-slate-900/30 hover:bg-white"
              >
                Все статьи
              </Link>
              <Link
                href="/training"
                className="rounded-xl border border-slate-900/15 bg-white px-4 py-2 text-sm font-semibold text-slate-800 transition hover:border-slate-900/30 hover:bg-white"
              >
                Обучение
              </Link>
              <Link
                href="/about"
                className="rounded-xl border border-slate-900/15 bg-white px-4 py-2 text-sm font-semibold text-slate-800 transition hover:border-slate-900/30 hover:bg-white"
              >
                Обо мне
              </Link>
              <Link
                href={TELEGRAM_CHANNEL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-slate-900/15 bg-white px-4 py-2 text-sm font-semibold text-slate-800 transition hover:border-slate-900/30 hover:bg-white"
              >
                Telegram-канал
              </Link>
            </div>
            <div className="mt-4 flex items-center gap-4 text-sm">
              <a
                href="/feed.xml"
                className="font-medium text-slate-700 underline underline-offset-4 hover:text-slate-900"
              >
                RSS
              </a>
              <Link
                href="/articles"
                className="font-medium text-slate-700 underline underline-offset-4 hover:text-slate-900"
              >
                Последние публикации
              </Link>
            </div>
          </div>

          <div className="md:col-span-2 pt-1">
            <Link
              href={TELEGRAM_CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full md:w-auto md:max-w-max items-center justify-center rounded-xl bg-[#1b1b3a] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#12122c]"
            >
              Подписаться на Telegram-канал ScrumBaza
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
