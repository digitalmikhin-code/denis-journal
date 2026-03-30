import Link from "next/link";
import { TELEGRAM_CHANNEL_URL, TELEGRAM_CONSULT_URL } from "@/lib/constants";

export function SiteFooter(): JSX.Element {
  return (
    <footer className="mt-14">
      <div className="container-shell">
        <div className="rounded-t-[2.2rem] border border-b-0 border-[#efb8d2] bg-[linear-gradient(135deg,#f6c6dd_0%,#ffddeb_34%,#ecf7ff_100%)] p-6 md:p-8">
          <div className="grid gap-6 md:grid-cols-[1.05fr_0.95fr]">
            <div className="space-y-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Авторский журнал
                </p>
                <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
                  Денис Михин
                </h2>
              </div>

              <p className="max-w-[58ch] text-base leading-8 text-slate-800">
                Материалы о карьере, управлении, мышлении, архитектуре решений и практическом ИИ.
                Копирование и использование публикаций без письменного разрешения автора запрещено.
              </p>

              <p className="text-sm leading-7 text-slate-700">
                © 2025-{new Date().getFullYear()} Денис Михин. Все права защищены.
              </p>

              <div className="rounded-[1.5rem] border border-slate-900/10 bg-white/70 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Разработка сайта
                </p>
                <p className="mt-2 text-sm leading-7 text-slate-700">
                  Концепция, структура и реализация сайта разработаны Денисом Михиным. Если вам нужен
                  похожий экспертный журнал, медиа-портал или персональный сайт под задачи бренда,
                  это можно обсудить отдельно.
                </p>
                <Link
                  href={TELEGRAM_CONSULT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  Обсудить разработку сайта
                </Link>
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-900/10 bg-white/70 p-5 backdrop-blur-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">
                Полезные ссылки
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <Link
                  href="/articles"
                  className="rounded-xl border border-slate-900/12 bg-white px-4 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
                >
                  Все статьи
                </Link>
                <Link
                  href="/videos"
                  className="rounded-xl border border-slate-900/12 bg-white px-4 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
                >
                  Видео
                </Link>
                <Link
                  href="/training"
                  className="rounded-xl border border-slate-900/12 bg-white px-4 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
                >
                  Обучение
                </Link>
                <Link
                  href="/about"
                  className="rounded-xl border border-slate-900/12 bg-white px-4 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
                >
                  Обо мне
                </Link>
                <Link
                  href={TELEGRAM_CHANNEL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border border-slate-900/12 bg-white px-4 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
                >
                  Telegram-канал
                </Link>
                <Link
                  href="/newsletter"
                  className="rounded-xl border border-slate-900/12 bg-white px-4 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
                >
                  Email-рассылка
                </Link>
                <Link
                  href="/rss"
                  className="rounded-xl border border-slate-900/12 bg-white px-4 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
                >
                  RSS
                </Link>
                <Link
                  href="/privacy"
                  className="rounded-xl border border-slate-900/12 bg-white px-4 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
                >
                  Cookies и данные
                </Link>
              </div>
              <div className="mt-5 rounded-[1.5rem] bg-[#6964d9] p-5 text-white shadow-[0_16px_0_0_rgba(46,42,130,0.28)]">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/70">
                  Поддерживать контакт
                </p>
                <p className="mt-2 text-2xl font-black leading-tight">
                  Подпишитесь на email или Telegram, чтобы не пропускать новые материалы.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Link
                    href="/newsletter"
                    className="inline-flex rounded-xl bg-white px-5 py-3 text-sm font-semibold text-[#2e2a82]"
                  >
                    Подписаться на email
                  </Link>
                  <Link
                    href={TELEGRAM_CHANNEL_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex rounded-xl border border-white/35 bg-transparent px-5 py-3 text-sm font-semibold text-white"
                  >
                    Telegram-канал
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
