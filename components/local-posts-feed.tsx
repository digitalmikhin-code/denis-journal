"use client";

import { useEffect, useState } from "react";
import { CATEGORY_LABELS } from "@/lib/constants";
import { LOCAL_POSTS_KEY, type LocalPost } from "@/lib/local-posts";

export function LocalPostsFeed(): JSX.Element | null {
  const [posts, setPosts] = useState<LocalPost[]>([]);

  useEffect(() => {
    const raw = localStorage.getItem(LOCAL_POSTS_KEY);
    if (!raw) {
      return;
    }
    try {
      const parsed = JSON.parse(raw) as LocalPost[];
      setPosts(parsed.slice(0, 4));
    } catch {
      setPosts([]);
    }
  }, []);

  if (!posts.length) {
    return null;
  }

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="serif-display text-4xl font-semibold tracking-tight">Посты из тест-админки</h2>
        <a href="/studio" className="text-sm font-semibold text-brand hover:underline">
          Открыть студию →
        </a>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {posts.map((item) => (
          <article
            key={item.id}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-brand">
              {CATEGORY_LABELS[item.category as keyof typeof CATEGORY_LABELS]}
            </p>
            <h3 className="mt-2 text-2xl font-bold leading-tight tracking-tight">{item.title}</h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{item.excerpt}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

