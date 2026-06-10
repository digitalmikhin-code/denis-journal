"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { CATEGORY_LABELS, type Category } from "@/lib/constants";
import { ArticleCard } from "@/components/article-card";
import type { ArticleSummary } from "@/lib/content";
import { normalizeTag } from "@/lib/utils";

type Props = {
  items: ArticleSummary[];
  allTags: string[];
};

type SortMode = "newest" | "popular" | "short" | "deep";
type QuickFilterKey = "leader" | "specialist" | "ai" | "career";

const QUICK_FILTERS: Array<{
  key: QuickFilterKey;
  label: string;
  category?: Category;
  query?: string;
}> = [
  { key: "leader", label: "Для руководителя", query: "руковод управлен команд решен" },
  { key: "specialist", label: "Для специалиста", query: "специалист карьер рост влияние" },
  { key: "ai", label: "Для ИИ", category: "ai" },
  { key: "career", label: "Для карьеры", category: "career" }
];

export function ArticlesFilter({ items, allTags }: Props): JSX.Element {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<"all" | Category>("all");
  const [tag, setTag] = useState<string>("all");
  const [sortMode, setSortMode] = useState<SortMode>("newest");
  const [quickFilter, setQuickFilter] = useState<QuickFilterKey | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const params = new URLSearchParams(window.location.search);
    const tagFromUrl = normalizeTag(params.get("tag") || "");
    if (tagFromUrl && allTags.includes(tagFromUrl)) {
      setTag(tagFromUrl);
    }
  }, [allTags]);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    const selectedQuickFilter = QUICK_FILTERS.find((item) => item.key === quickFilter);
    const quickSignals = selectedQuickFilter?.query?.toLowerCase().split(" ") ?? [];

    const result = items.filter((item) => {
      const itemTags = Array.isArray(item.frontmatter.tags) ? item.frontmatter.tags : [];
      const itemCategory = item.frontmatter.category as Category;
      const haystack =
        `${item.frontmatter.title} ${item.frontmatter.excerpt} ${itemTags.join(" ")}`.toLowerCase();
      const byCategory = category === "all" || itemCategory === category;
      const byTag = tag === "all" || itemTags.includes(tag);
      const byQuickCategory = !selectedQuickFilter?.category || itemCategory === selectedQuickFilter.category;
      const byQuickSignals =
        quickSignals.length === 0 || quickSignals.some((signal) => haystack.includes(signal));

      if (!byCategory || !byTag || !byQuickCategory || !byQuickSignals) {
        return false;
      }

      return !q || haystack.includes(q);
    });

    return [...result].sort((left, right) => {
      if (sortMode === "popular") {
        const featuredDelta = Number(right.frontmatter.featured) - Number(left.frontmatter.featured);
        if (featuredDelta !== 0) return featuredDelta;
      }

      if (sortMode === "short") {
        return (left.frontmatter.readingTime ?? 0) - (right.frontmatter.readingTime ?? 0);
      }

      if (sortMode === "deep") {
        return (right.frontmatter.readingTime ?? 0) - (left.frontmatter.readingTime ?? 0);
      }

      return new Date(right.frontmatter.date).getTime() - new Date(left.frontmatter.date).getTime();
    });
  }, [items, query, category, tag, sortMode, quickFilter]);

  const hasActiveFilters =
    query.trim() !== "" || category !== "all" || tag !== "all" || sortMode !== "newest" || quickFilter !== null;

  function resetFilters(): void {
    setQuery("");
    setCategory("all");
    setTag("all");
    setSortMode("newest");
    setQuickFilter(null);
  }

  return (
    <section className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900">
        <div className="grid gap-3 lg:grid-cols-[1.2fr_1fr_1fr_1fr]">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Поиск по заголовку, тегам, тексту..."
            className="rounded-xl border border-slate-300 px-4 py-2 text-sm outline-none ring-brand/25 focus:ring dark:border-slate-700 dark:bg-slate-950"
          />
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value as "all" | Category)}
            className="rounded-xl border border-slate-300 px-4 py-2 text-sm outline-none ring-brand/25 focus:ring dark:border-slate-700 dark:bg-slate-950"
          >
            <option value="all">Все рубрики</option>
            {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
          <select
            value={tag}
            onChange={(event) => setTag(event.target.value)}
            className="rounded-xl border border-slate-300 px-4 py-2 text-sm outline-none ring-brand/25 focus:ring dark:border-slate-700 dark:bg-slate-950"
          >
            <option value="all">Все теги</option>
            {allTags.map((itemTag) => (
              <option key={itemTag} value={itemTag}>
                #{normalizeTag(itemTag)}
              </option>
            ))}
          </select>
          <select
            value={sortMode}
            onChange={(event) => setSortMode(event.target.value as SortMode)}
            className="rounded-xl border border-slate-300 px-4 py-2 text-sm outline-none ring-brand/25 focus:ring dark:border-slate-700 dark:bg-slate-950"
          >
            <option value="newest">Сначала новые</option>
            <option value="popular">Популярные</option>
            <option value="short">Короткие</option>
            <option value="deep">Глубокие</option>
          </select>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {QUICK_FILTERS.map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => setQuickFilter((current) => (current === item.key ? null : item.key))}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                quickFilter === item.key
                  ? "border-slate-900 bg-slate-900 text-white dark:border-white dark:bg-white dark:text-slate-950"
                  : "border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm text-slate-500">
          <div>
            Найдено: <span className="font-semibold text-slate-700 dark:text-slate-200">{filtered.length}</span>
            {" · "}
            <Link href="/search" className="font-semibold text-brand hover:underline">
              Расширенный поиск
            </Link>
          </div>
          {hasActiveFilters ? (
            <button
              type="button"
              onClick={resetFilters}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              Сбросить фильтры
            </button>
          ) : null}
        </div>
      </div>

      {filtered.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((item) => (
            <ArticleCard key={item.slug} article={item} />
          ))}
        </div>
      ) : (
        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 text-center shadow-soft dark:border-slate-800 dark:bg-slate-900">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Ничего не найдено</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900 dark:text-slate-50">
            Попробуйте ослабить фильтры
          </h2>
          <p className="mx-auto mt-3 max-w-[48ch] text-base leading-7 text-slate-600 dark:text-slate-300">
            Иногда хороший материал прячется в соседней рубрике или под другим тегом. Сбросьте фильтры
            и начните поиск шире.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="mt-5 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
          >
            Сбросить фильтры
          </button>
        </div>
      )}
    </section>
  );
}
