"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { SAVED_ARTICLE_STORAGE_KEY, type SavedArticle } from "@/lib/reading-list";

function readSavedArticle(): SavedArticle | null {
  try {
    const raw = window.localStorage.getItem(SAVED_ARTICLE_STORAGE_KEY);
    if (!raw) return null;

    const saved = JSON.parse(raw) as SavedArticle;
    if (!saved.slug || !saved.href || !saved.title) return null;

    return saved;
  } catch {
    return null;
  }
}

export function ContinueReadingCard(): JSX.Element | null {
  const [article, setArticle] = useState<SavedArticle | null>(null);

  useEffect(() => {
    function syncSavedArticle(): void {
      setArticle(readSavedArticle());
    }

    syncSavedArticle();
    window.addEventListener("storage", syncSavedArticle);
    window.addEventListener("journal:saved-article-updated", syncSavedArticle);

    return () => {
      window.removeEventListener("storage", syncSavedArticle);
      window.removeEventListener("journal:saved-article-updated", syncSavedArticle);
    };
  }, []);

  if (!article) return null;

  return (
    <section className="rounded-[1.75rem] border border-[#c8d8ef] bg-[linear-gradient(135deg,#f4f9ff_0%,#fff8ef_55%,#fff1f7_100%)] p-5 shadow-[0_16px_36px_rgba(15,23,42,0.06)] md:p-6">
      <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
              Вы читали
            </p>
            <span className="rounded-full bg-white/80 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500">
              {article.categoryLabel}
            </span>
          </div>
          <h2 className="mt-3 text-2xl font-black tracking-tight text-slate-900 md:text-3xl">
            {article.title}
          </h2>
          <p className="mt-2 max-w-[64ch] text-sm leading-7 text-slate-600">{article.excerpt}</p>
        </div>

        <Link
          href={article.href}
          className="inline-flex justify-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
        >
          Продолжить чтение
        </Link>
      </div>
    </section>
  );
}
