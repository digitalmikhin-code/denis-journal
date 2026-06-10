"use client";

import { useEffect, useMemo, useState } from "react";

type ArticleShareProps = {
  title: string;
  excerpt: string;
  url: string;
  compact?: boolean;
};

type ShareTarget = {
  label: string;
  href: string;
  tone: string;
};

export function ArticleShare({ title, excerpt, url, compact = false }: ArticleShareProps): JSX.Element {
  const [status, setStatus] = useState<"idle" | "copied" | "shared">("idle");
  const [currentUrl, setCurrentUrl] = useState(url);

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  const targets = useMemo<ShareTarget[]>(
    () => [
      {
        label: "Telegram",
        href: `https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(title)}`,
        tone: "border-[#229ed9]/25 bg-[#eef9ff] text-[#0b5f86] hover:bg-[#ddf3ff]"
      },
      {
        label: "WhatsApp",
        href: `https://wa.me/?text=${encodeURIComponent(`${title} ${currentUrl}`)}`,
        tone: "border-[#25d366]/25 bg-[#effdf5] text-[#0d6b35] hover:bg-[#dcfce7]"
      },
      {
        label: "VK",
        href: `https://vk.com/share.php?url=${encodeURIComponent(currentUrl)}&title=${encodeURIComponent(title)}`,
        tone: "border-[#2787f5]/25 bg-[#eef6ff] text-[#155fa8] hover:bg-[#deefff]"
      }
    ],
    [currentUrl, title]
  );

  async function shareArticle(): Promise<void> {
    if (typeof navigator !== "undefined" && "share" in navigator) {
      try {
        await navigator.share({
          title,
          text: excerpt,
          url: currentUrl
        });
        setStatus("shared");
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
      }
    }

    await copyLink();
  }

  async function copyLink(): Promise<void> {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(currentUrl);
      }
      setStatus("copied");
    } catch {
      setStatus("idle");
    }
  }

  return (
    <section className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-[0_16px_36px_rgba(15,23,42,0.06)] dark:border-slate-800 dark:bg-slate-900 dark:shadow-[0_16px_36px_rgba(0,0,0,0.22)]">
      <div className={compact ? "space-y-3" : "grid gap-5 md:grid-cols-[1fr_auto] md:items-center"}>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
            Поделиться
          </p>
          <h2 className={`${compact ? "mt-2 text-xl" : "mt-3 text-3xl"} font-black tracking-tight text-slate-900 dark:text-slate-50`}>
            Отправьте статью в мессенджер
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
            Кнопка откроет стандартное меню телефона, а ниже есть быстрые варианты для популярных сервисов.
          </p>
        </div>

        <button
          type="button"
          onClick={() => void shareArticle()}
          className="inline-flex w-full items-center justify-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-slate-800 md:w-auto dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
        >
          Поделиться
        </button>
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-3">
        {targets.map((target) => (
          <a
            key={target.label}
            href={target.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`rounded-2xl border px-4 py-3 text-center text-sm font-bold transition hover:-translate-y-0.5 ${target.tone}`}
          >
            {target.label}
          </a>
        ))}
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => void copyLink()}
          className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
        >
          Скопировать ссылку
        </button>
        <span className="text-sm font-medium text-slate-500 dark:text-slate-400" aria-live="polite">
          {status === "copied" ? "Ссылка скопирована" : status === "shared" ? "Меню отправки открыто" : ""}
        </span>
      </div>
    </section>
  );
}
