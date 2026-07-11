import Link from "next/link";
import type { Metadata } from "next";
import { VideoGallery } from "@/components/video-gallery";
import { SITE_URL, TELEGRAM_CHANNEL_URL } from "@/lib/constants";
import { formatDate } from "@/lib/utils";
import { getAllVideos } from "@/lib/videos";

const PLATFORM_LABEL: Record<string, string> = {
  youtube: "YouTube",
  rutube: "RuTube",
  vk: "VK Видео"
};

export const metadata: Metadata = {
  title: "Видео",
  description:
    "Видео Дениса Михина о карьере, управлении, системном мышлении и практических инструментах для руководителей.",
  alternates: {
    canonical: "/videos"
  },
  openGraph: {
    title: "Видео | Журнал Дениса Михина",
    description:
      "Видео Дениса Михина о карьере, управлении, системном мышлении и практических инструментах для руководителей.",
    url: `${SITE_URL}/videos`
  }
};

export default function VideosPage(): JSX.Element {
  const videos = getAllVideos(false);
  const latest = videos[0] ?? null;
  const byPlatform = videos.reduce<Record<string, number>>((acc, item) => {
    acc[item.frontmatter.platform] = (acc[item.frontmatter.platform] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden border border-slate-200 bg-white p-6 shadow-[0_24px_70px_rgba(9,22,43,0.08)] dark:border-slate-800 dark:bg-slate-900 md:p-8">
        <div className="pointer-events-none absolute inset-0 ambient-grid opacity-50" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-28 w-44 bg-brand/95 [clip-path:polygon(42%_0,100%_0,100%_100%,0_100%)]" />

        <div className="relative grid gap-8 md:grid-cols-[1.08fr_0.92fr] md:items-center">
          <div className="space-y-5">
            <p className="border-l-4 border-brand pl-3 text-xs font-black uppercase tracking-[0.18em] text-brand">
              Видеоматериалы
            </p>
            <h1 className="max-w-3xl text-4xl font-black leading-[0.98] tracking-tight text-slate-950 dark:text-white md:text-6xl">
              Видео Дениса Михина
            </h1>
            <p className="max-w-2xl text-base leading-8 text-slate-650 dark:text-slate-300 md:text-lg">
              Здесь собраны разборы, вебинары и короткие практические видео о карьере,
              управлении и системном росте.
            </p>
            <div className="grid max-w-3xl gap-3 md:grid-cols-3">
              <div className="border border-slate-200 bg-slate-50 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950">
                <p className="text-xs font-black uppercase tracking-[0.14em] text-brand">
                  Формат
                </p>
                <p className="mt-2 text-sm font-medium leading-6 text-slate-650 dark:text-slate-300">
                  Коротко, по делу, без перегруза и лишних теорий.
                </p>
              </div>
              <div className="border border-slate-200 bg-slate-50 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950">
                <p className="text-xs font-black uppercase tracking-[0.14em] text-brand">
                  Польза
                </p>
                <p className="mt-2 text-sm font-medium leading-6 text-slate-650 dark:text-slate-300">
                  Конкретные управленческие выводы, которые можно применить в работе.
                </p>
              </div>
              <div className="border border-slate-200 bg-slate-50 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950">
                <p className="text-xs font-black uppercase tracking-[0.14em] text-brand">
                  Канал
                </p>
                <p className="mt-2 text-sm font-medium leading-6 text-slate-650 dark:text-slate-300">
                  Видео дополняют статьи и Telegram, а не дублируют их.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="border border-slate-200 bg-slate-950 p-6 text-white shadow-[0_18px_40px_rgba(9,22,43,0.14)] dark:border-slate-700">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/60">
                Внутри раздела
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <div className="border border-white/10 bg-white/[0.06] p-4">
                  <p className="text-3xl font-black leading-none">{videos.length}</p>
                  <p className="mt-2 text-sm text-white/90">Видео в архиве</p>
                </div>
                <div className="border border-white/10 bg-white/[0.06] p-4">
                  <p className="text-3xl font-black leading-none">{byPlatform.rutube || 0}</p>
                  <p className="mt-2 text-sm text-white/90">RuTube</p>
                </div>
                <div className="border border-white/10 bg-white/[0.06] p-4">
                  <p className="text-3xl font-black leading-none">
                    {(byPlatform.youtube || 0) + (byPlatform.vk || 0)}
                  </p>
                  <p className="mt-2 text-sm text-white/90">Другие платформы</p>
                </div>
              </div>
              <p className="mt-5 max-w-[34ch] text-sm leading-6 text-white/92">
                Здесь удобно держать всё в одном месте: вебинары, короткие видеоразборы и
                записи выступлений без привязки к одной площадке.
              </p>
            </div>

            {latest ? (
              <article className="border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
                  Свежий выпуск
                </p>
                <h2 className="mt-3 text-2xl font-black leading-tight tracking-tight text-slate-950 dark:text-white">
                  {latest.frontmatter.title}
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                  {formatDate(latest.frontmatter.date)} • {PLATFORM_LABEL[latest.frontmatter.platform] || latest.frontmatter.platform}
                </p>
              </article>
            ) : null}
          </div>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-3">
        <article className="border border-slate-200 bg-white p-6 shadow-[0_18px_40px_rgba(9,22,43,0.06)] dark:border-slate-800 dark:bg-slate-900">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-brand">
            Как использовать
          </p>
          <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900">
            Смотреть как быстрый вход в тему
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-700">
            Видео работают как короткая точка входа: понять идею, забрать подход и уже потом
            пойти глубже в статью или разбор.
          </p>
        </article>

        <article className="border border-slate-200 bg-white p-6 shadow-[0_18px_40px_rgba(9,22,43,0.06)] dark:border-slate-800 dark:bg-slate-900">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-brand">
            Что внутри
          </p>
          <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900">
            Разборы, вебинары и рабочие наблюдения
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-700">
            Не мотивационный контент, а управленческая практика: решения, ошибки,
            инструменты и рамки мышления для реальной работы.
          </p>
        </article>

        <article className="border border-slate-200 bg-white p-6 shadow-[0_18px_40px_rgba(9,22,43,0.06)] dark:border-slate-800 dark:bg-slate-900">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-brand">
            Связанный канал
          </p>
          <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900">
            Telegram дополняет видео
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-700">
            В канале выходят короткие мысли, наблюдения и ссылки на новые материалы между
            большими публикациями и видео.
          </p>
          <Link
            href={TELEGRAM_CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex text-sm font-bold text-brand hover:underline"
          >
            Перейти в Telegram
          </Link>
        </article>
      </section>

      {videos.length === 0 ? (
        <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
          <h2 className="text-2xl font-bold text-slate-900">Пока нет видео</h2>
          <p className="mt-2 text-slate-600">
            Добавь первую запись в админке в раздел <code>Videos</code>.
          </p>
        </section>
      ) : (
        <section className="space-y-5">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                Архив
              </p>
              <h2 className="serif-display text-4xl font-semibold tracking-tight text-slate-900">
                Все видео
              </h2>
            </div>
            <p className="max-w-[34ch] text-sm leading-6 text-slate-600">
              Каждый выпуск можно смотреть прямо на сайте, а при необходимости открывать
              оригинал на площадке.
            </p>
          </div>

          <VideoGallery videos={videos} />
        </section>
      )}
    </div>
  );
}
