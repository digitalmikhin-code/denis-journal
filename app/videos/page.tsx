import Link from "next/link";
import type { Metadata } from "next";
import { SITE_URL, TELEGRAM_CHANNEL_URL } from "@/lib/constants";
import { formatDate } from "@/lib/utils";
import { getAllVideos, resolveEmbedUrl } from "@/lib/videos";

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

const PLATFORM_LABEL: Record<string, string> = {
  youtube: "YouTube",
  rutube: "RuTube",
  vk: "VK Видео"
};

const PLATFORM_THEME: Record<
  string,
  { chip: string; surface: string; accent: string; button: string }
> = {
  youtube: {
    chip: "bg-[#ffe2e2] text-[#991b1b] border-[#f6b3b3]",
    surface: "from-[#fff4f4] via-white to-[#ffe8e8]",
    accent: "text-[#991b1b]",
    button: "border-[#f2b5b5] bg-white text-[#991b1b]"
  },
  rutube: {
    chip: "bg-[#e7e4ff] text-[#4338ca] border-[#c5bcff]",
    surface: "from-[#f4f2ff] via-white to-[#ebe7ff]",
    accent: "text-[#4338ca]",
    button: "border-[#cfc6ff] bg-white text-[#4338ca]"
  },
  vk: {
    chip: "bg-[#ddf4ff] text-[#0c4a6e] border-[#a8dfff]",
    surface: "from-[#eef9ff] via-white to-[#def4ff]",
    accent: "text-[#0c4a6e]",
    button: "border-[#b8e6ff] bg-white text-[#0c4a6e]"
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
    <div className="space-y-10">
      <section className="relative overflow-hidden rounded-[2.25rem] border border-[#b7a9ff] bg-[#6d67df] px-8 py-10 text-white shadow-[0_32px_72px_rgba(67,56,202,0.24)] md:px-10 md:py-12">
        <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full border-[14px] border-white/75" />
        <div className="pointer-events-none absolute -bottom-24 right-20 h-72 w-72 rounded-full border-[10px] border-white/55" />
        <div className="pointer-events-none absolute left-[56%] top-[18%] h-36 w-36 rounded-[2rem] border-2 border-[#2f2b86]/70 bg-white/15" />

        <div className="relative grid gap-8 md:grid-cols-[1.08fr_0.92fr] md:items-center">
          <div className="space-y-5">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/80">
              Видеоматериалы
            </p>
            <h1 className="max-w-[11ch] text-5xl font-black leading-[0.93] tracking-tight md:text-7xl">
              Видео Дениса Михина
            </h1>
            <p className="max-w-[31ch] text-[1.45rem] leading-tight text-white/95 md:text-[1.8rem]">
              Здесь собраны разборы, вебинары и короткие практические видео о карьере,
              управлении и системном росте.
            </p>
            <div className="grid max-w-3xl gap-3 md:grid-cols-3">
              <div className="rounded-[1.4rem] border border-[#f1e786] bg-[#fff7c8] p-4 text-[#403300] shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#7c6800]">
                  Формат
                </p>
                <p className="mt-2 text-sm font-medium leading-6">
                  Коротко, по делу, без перегруза и лишних теорий.
                </p>
              </div>
              <div className="rounded-[1.4rem] border border-[#96e4cf] bg-[#ddfff3] p-4 text-[#104e3b] shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#0f7758]">
                  Польза
                </p>
                <p className="mt-2 text-sm font-medium leading-6">
                  Конкретные управленческие выводы, которые можно применить в работе.
                </p>
              </div>
              <div className="rounded-[1.4rem] border border-[#f3b7d8] bg-[#ffe8f4] p-4 text-[#6f164c] shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9f2f73]">
                  Канал
                </p>
                <p className="mt-2 text-sm font-medium leading-6">
                  Видео дополняют статьи и Telegram, а не дублируют их.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="rounded-[2rem] border-4 border-[#2f2b86] bg-[#8b87eb] p-6 shadow-[0_14px_0_0_rgba(39,34,106,0.34)]">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/80">
                Внутри раздела
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl bg-white/16 p-4">
                  <p className="text-3xl font-black leading-none">{videos.length}</p>
                  <p className="mt-2 text-sm text-white/90">Видео в архиве</p>
                </div>
                <div className="rounded-2xl bg-white/16 p-4">
                  <p className="text-3xl font-black leading-none">{byPlatform.rutube || 0}</p>
                  <p className="mt-2 text-sm text-white/90">RuTube</p>
                </div>
                <div className="rounded-2xl bg-white/16 p-4">
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
              <article className="rounded-[1.8rem] border border-white/25 bg-white/14 p-5 backdrop-blur">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/75">
                  Свежий выпуск
                </p>
                <h2 className="mt-3 text-2xl font-black leading-tight tracking-tight">
                  {latest.frontmatter.title}
                </h2>
                <p className="mt-2 text-sm leading-6 text-white/85">
                  {formatDate(latest.frontmatter.date)} •{" "}
                  {PLATFORM_LABEL[latest.frontmatter.platform] || latest.frontmatter.platform}
                </p>
              </article>
            ) : null}
          </div>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-3">
        <article className="rounded-[1.8rem] border border-cyan-200 bg-gradient-to-br from-cyan-50 via-white to-sky-50 p-6 shadow-[0_18px_40px_rgba(8,145,178,0.08)]">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-700">
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

        <article className="rounded-[1.8rem] border border-indigo-200 bg-gradient-to-br from-indigo-50 via-white to-violet-50 p-6 shadow-[0_18px_40px_rgba(99,102,241,0.08)]">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-indigo-700">
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

        <article className="rounded-[1.8rem] border border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-lime-50 p-6 shadow-[0_18px_40px_rgba(16,185,129,0.08)]">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700">
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
            className="mt-4 inline-flex text-sm font-semibold text-emerald-700 hover:underline"
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

          <div className="grid gap-6 xl:grid-cols-2">
            {videos.map((item, index) => {
              const embedUrl = resolveEmbedUrl(item.frontmatter.platform, item.frontmatter.url);
              const theme =
                PLATFORM_THEME[item.frontmatter.platform] || PLATFORM_THEME.rutube;

              return (
                <article
                  key={item.slug}
                  className={`overflow-hidden rounded-[2rem] border border-slate-200 bg-gradient-to-br ${theme.surface} shadow-[0_22px_48px_rgba(15,23,42,0.08)]`}
                >
                  <div className="grid gap-0 lg:grid-cols-[1.04fr_0.96fr]">
                    <div className="aspect-video bg-slate-100 lg:h-full lg:aspect-auto">
                      {embedUrl ? (
                        <iframe
                          src={embedUrl}
                          title={item.frontmatter.title}
                          className="h-full w-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                          loading="lazy"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center p-6 text-center text-sm text-slate-600">
                          Не удалось встроить плеер по этой ссылке.
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col justify-between gap-6 p-6">
                      <div className="space-y-4">
                        <div className="flex flex-wrap items-center gap-3">
                          <span
                            className={`inline-flex rounded-full border px-3 py-1 text-[0.72rem] font-bold uppercase tracking-[0.14em] ${theme.chip}`}
                          >
                            {PLATFORM_LABEL[item.frontmatter.platform] ||
                              item.frontmatter.platform}
                          </span>
                          <span className="text-sm font-medium text-slate-500">
                            {formatDate(item.frontmatter.date)}
                          </span>
                          <span className="text-sm font-medium text-slate-400">
                            #{String(index + 1).padStart(2, "0")}
                          </span>
                        </div>

                        <h3 className="text-3xl font-black leading-[1.04] tracking-tight text-slate-900">
                          {item.frontmatter.title}
                        </h3>

                        <p className="text-base leading-7 text-slate-700">
                          {item.frontmatter.description ||
                            "Короткий видеоразбор по теме управления, карьеры и прикладных решений для реальной работы."}
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-3">
                        <Link
                          href={item.frontmatter.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex rounded-2xl border px-5 py-3 text-sm font-semibold transition hover:bg-slate-50 ${theme.button}`}
                        >
                          Открыть оригинал
                        </Link>
                        <Link
                          href="/about"
                          className={`text-sm font-semibold ${theme.accent} hover:underline`}
                        >
                          Кто комментирует и почему это полезно
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
