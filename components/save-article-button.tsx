"use client";

import { useEffect, useState } from "react";
import { SAVED_ARTICLE_STORAGE_KEY, type SavedArticle } from "@/lib/reading-list";

type SaveArticleButtonProps = {
  article: Omit<SavedArticle, "savedAt">;
  compact?: boolean;
};

export function SaveArticleButton({ article, compact = false }: SaveArticleButtonProps): JSX.Element {
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(SAVED_ARTICLE_STORAGE_KEY);
      if (!raw) return;

      const saved = JSON.parse(raw) as Partial<SavedArticle>;
      setIsSaved(saved.slug === article.slug);
    } catch {
      setIsSaved(false);
    }
  }, [article.slug]);

  function saveArticle(): void {
    const nextArticle: SavedArticle = {
      ...article,
      savedAt: new Date().toISOString()
    };

    window.localStorage.setItem(SAVED_ARTICLE_STORAGE_KEY, JSON.stringify(nextArticle));
    setIsSaved(true);
    window.dispatchEvent(new Event("journal:saved-article-updated"));
  }

  return (
    <button
      type="button"
      onClick={saveArticle}
      className={`inline-flex w-full items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 font-bold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800 ${
        compact ? "py-2.5 text-sm" : "py-3 text-base"
      }`}
    >
      {isSaved ? "Сохранено для чтения" : "Продолжить позже"}
    </button>
  );
}
