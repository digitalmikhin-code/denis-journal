"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  getSearchSuggestions,
  POPULAR_SEARCH_QUERIES,
  type SearchItem,
  type SearchResult
} from "@/lib/search-shared";
import { cn } from "@/lib/utils";

type GlobalSearchProps = {
  items: SearchItem[];
};

const RECENT_SEARCHES_KEY = "journal_recent_searches";

export function GlobalSearch({ items }: GlobalSearchProps): JSX.Element {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [recentQueries, setRecentQueries] = useState<string[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    setRecentQueries(readRecentQueries());
  }, []);

  const suggestions = useMemo(() => getSearchSuggestions(items, query, 5), [items, query]);
  const showPanel = isFocused && (query.trim().length > 0 || recentQueries.length > 0);

  function submitSearch(event?: FormEvent<HTMLFormElement>): void {
    event?.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) {
      router.push("/search");
      return;
    }

    saveRecentQuery(trimmed);
    setRecentQueries(readRecentQueries());
    setIsMobileOpen(false);
    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
  }

  return (
    <>
      <form onSubmit={submitSearch} className="relative hidden min-w-[260px] md:block">
        <input
          value={query}
          type="search"
          onFocus={() => setIsFocused(true)}
          onBlur={() => window.setTimeout(() => setIsFocused(false), 140)}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Найти задачу, навык, программу"
          className="w-full rounded-2xl border border-slate-300/70 bg-white/80 px-4 py-2 text-sm font-semibold text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-brand focus:bg-white focus:ring-4 focus:ring-brand/10 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
        />
        {showPanel ? <SuggestionPanel query={query} suggestions={suggestions} recentQueries={recentQueries} /> : null}
      </form>

      <button
        type="button"
        onClick={() => setIsMobileOpen(true)}
        className="rounded-xl border border-slate-300/70 bg-white/75 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-slate-500/60 hover:bg-white md:hidden"
      >
        Поиск
      </button>

      {isMobileOpen ? (
        <div className="fixed inset-0 z-50 bg-white p-4 dark:bg-slate-950 md:hidden">
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">Поисковый центр</p>
            <button
              type="button"
              onClick={() => setIsMobileOpen(false)}
              className="rounded-full border border-slate-200 px-3 py-1 text-sm font-black dark:border-slate-700"
            >
              ×
            </button>
          </div>
          <form onSubmit={submitSearch} className="mt-5">
            <input
              autoFocus
              value={query}
              type="search"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Что хотите решить?"
              className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-base font-bold outline-none focus:border-brand focus:bg-white dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            />
          </form>
          <div className="mt-4">
            <SuggestionPanel query={query} suggestions={suggestions} recentQueries={recentQueries} fullWidth />
          </div>
        </div>
      ) : null}
    </>
  );
}

function SuggestionPanel({
  query,
  suggestions,
  recentQueries,
  fullWidth = false
}: {
  query: string;
  suggestions: SearchResult[];
  recentQueries: string[];
  fullWidth?: boolean;
}): JSX.Element {
  const trimmed = query.trim();

  return (
    <div
      className={cn(
        "rounded-3xl border border-slate-200 bg-white p-3 shadow-[0_24px_70px_rgba(15,23,42,0.18)] dark:border-slate-800 dark:bg-slate-900",
        fullWidth ? "w-full" : "absolute right-0 top-[calc(100%+0.55rem)] w-[420px]"
      )}
    >
      {trimmed ? (
        <div className="grid gap-2">
          {suggestions.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="rounded-2xl p-3 transition hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              <span className="text-[11px] font-black uppercase tracking-[0.14em] text-brand">{item.label}</span>
              <span className="mt-1 block text-sm font-black text-slate-950 dark:text-slate-50">{item.title}</span>
              <span className="mt-1 line-clamp-2 text-xs leading-5 text-slate-500 dark:text-slate-400">
                {item.description}
              </span>
            </Link>
          ))}
          <Link
            href={`/search?q=${encodeURIComponent(trimmed)}`}
            className="rounded-2xl bg-slate-950 px-4 py-3 text-center text-sm font-black text-white dark:bg-white dark:text-slate-950"
          >
            Смотреть все результаты
          </Link>
        </div>
      ) : (
        <div className="space-y-4 p-2">
          {recentQueries.length > 0 ? <QueryChips title="Последние запросы" queries={recentQueries} /> : null}
          <QueryChips title="Популярные запросы" queries={POPULAR_SEARCH_QUERIES} />
        </div>
      )}
    </div>
  );
}

function QueryChips({ title, queries }: { title: string; queries: string[] }): JSX.Element {
  return (
    <div>
      <p className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-400">{title}</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {queries.map((query) => (
          <Link
            key={query}
            href={`/search?q=${encodeURIComponent(query)}`}
            className="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-700 transition hover:border-brand hover:text-brand dark:border-slate-700 dark:text-slate-200"
          >
            {query}
          </Link>
        ))}
      </div>
    </div>
  );
}

export function saveRecentQuery(query: string): void {
  try {
    const current = readRecentQueries();
    const next = [query, ...current.filter((item) => item.toLowerCase() !== query.toLowerCase())].slice(0, 6);
    window.localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(next));
  } catch {
    // Local Storage is optional: search still works without it.
  }
}

function readRecentQueries(): string[] {
  try {
    const raw = window.localStorage.getItem(RECENT_SEARCHES_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.map(String).filter(Boolean).slice(0, 6) : [];
  } catch {
    return [];
  }
}
