"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { formatDate } from "@/lib/utils";
import { resolveEmbedUrl, type VideoItem } from "@/lib/video-shared";

const PLATFORM_LABEL: Record<string, string> = {
  youtube: "YouTube",
  rutube: "RuTube",
  vk: "VK Видео"
};

const PLATFORM_THEME: Record<
  string,
  {
    chip: string;
    surface: string;
    accent: string;
    button: string;
    poster: string;
    posterGlow: string;
    posterAccent: string;
  }
> = {
  youtube: {
    chip: "bg-[#ffe2e2] text-[#991b1b] border-[#f6b3b3]",
    surface: "from-[#fff4f4] via-white to-[#ffe8e8]",
    accent: "text-[#991b1b]",
    button: "border-[#f2b5b5] bg-white text-[#991b1b]",
    poster: "from-[#ffb8b8] via-[#ff7d7d] to-[#ef4444]",
    posterGlow: "bg-white/20",
    posterAccent: "bg-[#991b1b]"
  },
  rutube: {
    chip: "bg-[#e7e4ff] text-[#4338ca] border-[#c5bcff]",
    surface: "from-[#f4f2ff] via-white to-[#ebe7ff]",
    accent: "text-[#4338ca]",
    button: "border-[#cfc6ff] bg-white text-[#4338ca]",
    poster: "from-[#b8b2ff] via-[#8b87eb] to-[#5b4fd6]",
    posterGlow: "bg-white/16",
    posterAccent: "bg-[#312e81]"
  },
  vk: {
    chip: "bg-[#ddf4ff] text-[#0c4a6e] border-[#a8dfff]",
    surface: "from-[#eef9ff] via-white to-[#def4ff]",
    accent: "text-[#0c4a6e]",
    button: "border-[#b8e6ff] bg-white text-[#0c4a6e]",
    poster: "from-[#9edcff] via-[#58b8ef] to-[#0ea5e9]",
    posterGlow: "bg-white/18",
    posterAccent: "bg-[#0c4a6e]"
  }
};

type VideoGalleryProps = {
  videos: VideoItem[];
};

export function VideoGallery({ videos }: VideoGalleryProps): JSX.Element {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  useEffect(() => {
    if (!activeSlug) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "Escape") {
        setActiveSlug(null);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeSlug]);

  const activeVideo = videos.find((video) => video.slug === activeSlug) ?? null;
  const activeEmbedUrl = activeVideo
    ? resolveEmbedUrl(activeVideo.frontmatter.platform, activeVideo.frontmatter.url)
    : null;

  return (
    <>
      <div className="grid gap-6 xl:grid-cols-2">
        {videos.map((item, index) => {
          const theme = PLATFORM_THEME[item.frontmatter.platform] || PLATFORM_THEME.rutube;

          return (
            <article
              key={item.slug}
              className={`overflow-hidden rounded-[2rem] border border-slate-200 bg-gradient-to-br ${theme.surface} shadow-[0_22px_48px_rgba(15,23,42,0.08)]`}
            >
              <div className={`relative aspect-video overflow-hidden bg-gradient-to-br ${theme.poster}`}>
                <button
                  type="button"
                  onClick={() => setActiveSlug(item.slug)}
                  className="group absolute inset-0 block w-full text-left"
                  aria-label={`Смотреть видео: ${item.frontmatter.title}`}
                >
                  <div className="absolute left-6 top-6 flex items-center gap-3">
                    <span className="rounded-full border border-white/45 bg-white/18 px-3 py-1 text-[0.72rem] font-bold uppercase tracking-[0.14em] text-white backdrop-blur">
                      {PLATFORM_LABEL[item.frontmatter.platform] || item.frontmatter.platform}
                    </span>
                    <span className="text-sm font-medium text-white/88">
                      {formatDate(item.frontmatter.date)}
                    </span>
                  </div>

                  <div className={`absolute -right-10 -top-12 h-48 w-48 rounded-full ${theme.posterGlow}`} />
                  <div className={`absolute -bottom-16 left-8 h-36 w-36 rounded-full ${theme.posterGlow}`} />

                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="flex h-20 w-20 items-center justify-center rounded-full bg-white/88 text-3xl text-slate-900 shadow-[0_16px_30px_rgba(15,23,42,0.22)] transition group-hover:scale-105">
                      ▶
                    </span>
                  </div>

                  <div className="absolute bottom-6 right-6">
                    <span className={`rounded-full px-4 py-2 text-sm font-semibold text-white ${theme.posterAccent}`}>
                      Смотреть выпуск
                    </span>
                  </div>
                </button>
              </div>

              <div className="flex flex-col justify-between gap-6 p-6">
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className={`inline-flex rounded-full border px-3 py-1 text-[0.72rem] font-bold uppercase tracking-[0.14em] ${theme.chip}`}>
                      {PLATFORM_LABEL[item.frontmatter.platform] || item.frontmatter.platform}
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
                  <button
                    type="button"
                    onClick={() => setActiveSlug(item.slug)}
                    className={`inline-flex rounded-2xl border px-5 py-3 text-sm font-semibold transition hover:bg-slate-50 ${theme.button}`}
                  >
                    Смотреть на сайте
                  </button>
                  <Link
                    href={item.frontmatter.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-sm font-semibold ${theme.accent} hover:underline`}
                  >
                    Открыть оригинал
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {activeVideo ? (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6">
          <button
            type="button"
            aria-label="Закрыть видео"
            className="absolute inset-0 bg-slate-950/75 backdrop-blur-sm"
            onClick={() => setActiveSlug(null)}
          />
          <div className="relative z-[121] w-full max-w-6xl overflow-hidden rounded-[2rem] border border-white/15 bg-slate-950 shadow-[0_30px_90px_rgba(15,23,42,0.48)]">
            <div className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-4 text-white sm:px-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/55">
                  {PLATFORM_LABEL[activeVideo.frontmatter.platform] || activeVideo.frontmatter.platform}
                </p>
                <h3 className="mt-1 text-lg font-bold leading-tight sm:text-xl">
                  {activeVideo.frontmatter.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveSlug(null)}
                className="rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white/90 transition hover:bg-white/10"
              >
                Закрыть
              </button>
            </div>

            <div className="aspect-video bg-slate-950">
              {activeEmbedUrl ? (
                <iframe
                  src={activeEmbedUrl}
                  title={activeVideo.frontmatter.title}
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : (
                <div className="flex h-full items-center justify-center p-8 text-center text-white/75">
                  Не удалось встроить плеер по этой ссылке. Открой оригинал на площадке.
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
