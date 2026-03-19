"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type SearchIndexItem = {
  slug: string;
  title: string;
  category: string;
  tags: string[];
  excerpt: string;
  date: string;
  cover: string;
  readingTime: number;
  content: string;
};

export function SearchClient(): JSX.Element {
  const [query, setQuery] = useState("");
  const [items, setItems] = useState<SearchIndexItem[]>([]);

  useEffect(() => {
    void fetch("/search-index.json")
      .then((response) => response.json())
      .then((data: SearchIndexItem[]) => setItems(data))
      .catch(() => setItems([]));
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      return items.slice(0, 20);
    }
    return items.filter((item) => {
      const haystack = `${item.title} ${item.excerpt} ${item.tags.join(" ")} ${item.content}`.toLowerCase();
      return haystack.includes(q);
    });
  }, [items, query]);

  return (
    <section className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Найти статью по теме, тегу или фразе"
          className="w-full rounded-xl border border-slate-300 px-4 py-3 text-base outline-none ring-brand/25 focus:ring dark:border-slate-700 dark:bg-slate-950"
        />
      </div>

      <div className="space-y-4">
        {filtered.map((item) => (
          <article
            key={item.slug}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900"
          >
            <p className="text-xs uppercase tracking-wide text-brand">{item.category}</p>
            <h3 className="mt-1 text-2xl font-bold leading-tight tracking-tight">
              <Link href={`/article/${item.slug}`} className="hover:text-brand">
                {item.title}
              </Link>
            </h3>
            <p className="mt-2 text-slate-600 dark:text-slate-300">{item.excerpt}</p>
            <p className="mt-2 text-sm text-slate-500">Теги: {item.tags.map((tag) => `#${tag}`).join(" ")}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
