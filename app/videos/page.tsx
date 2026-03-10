import Link from "next/link";
import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";
import { formatDate } from "@/lib/utils";
import { getAllVideos, resolveEmbedUrl } from "@/lib/videos";

export const metadata: Metadata = {
  title: "Видео",
  description: "Видео Дениса Михина: YouTube, RuTube и VK Video в одном разделе.",
  alternates: {
    canonical: "/videos"
  },
  openGraph: {
    title: "Видео | Журнал Дениса Михина",
    description: "Видео Дениса Михина: YouTube, RuTube и VK Video в одном разделе.",
    url: `${SITE_URL}/videos`
  }
};

const PLATFORM_LABEL: Record<string, string> = {
  youtube: "YouTube",
  rutube: "RuTube",
  vk: "VK Video"
};

export default function VideosPage(): JSX.Element {
  const videos = getAllVideos(false);

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-[#efb8d2] bg-[#ffeefa] p-6 md:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9f2f73]">Видеораздел</p>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
          Видео Дениса Михина
        </h1>
        <p className="mt-3 max-w-3xl text-lg text-slate-700">
          Здесь собраны видео о карьере, управлении и практических инструментах для роста.
        </p>
      </section>

      {videos.length === 0 ? (
        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-soft">
          <h2 className="text-2xl font-bold text-slate-900">Пока нет видео</h2>
          <p className="mt-2 text-slate-600">
            Добавь первую запись в админке: <code>Videos</code>.
          </p>
        </section>
      ) : (
        <section className="grid gap-6 md:grid-cols-2">
          {videos.map((item) => {
            const embedUrl = resolveEmbedUrl(item.frontmatter.platform, item.frontmatter.url);

            return (
              <article
                key={item.slug}
                className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-soft"
              >
                <div className="aspect-video bg-slate-100">
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

                <div className="space-y-3 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                    {PLATFORM_LABEL[item.frontmatter.platform] || item.frontmatter.platform} ·{" "}
                    {formatDate(item.frontmatter.date)}
                  </p>
                  <h2 className="text-2xl font-bold leading-tight text-slate-900">
                    {item.frontmatter.title}
                  </h2>
                  {item.frontmatter.description ? (
                    <p className="text-slate-700">{item.frontmatter.description}</p>
                  ) : null}
                  <Link
                    href={item.frontmatter.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex rounded-xl border border-slate-300 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-white"
                  >
                    Открыть оригинал
                  </Link>
                </div>
              </article>
            );
          })}
        </section>
      )}
    </div>
  );
}
