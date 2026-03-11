"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { CATEGORY_LABELS, CATEGORY_SHORT_LABELS, CATEGORY_THEME, REACTIONS_API_URL, type Category } from "@/lib/constants";
import {
  ARTICLE_REACTIONS,
  createEmptyReactionCounts,
  getTopReaction,
  getTotalReactionCount,
  type ReactionCountMap
} from "@/lib/reactions";
import { formatDate } from "@/lib/utils";

type ReactionDashboardItem = {
  slug: string;
  title: string;
  date: string;
  category: Category;
};

type ReactionsApiResponse = {
  slug: string;
  counts: ReactionCountMap;
};

type ReactionsDashboardProps = {
  articles: ReactionDashboardItem[];
};

type ArticleReactionSnapshot = {
  slug: string;
  counts: ReactionCountMap;
};

type SortMode = "popular" | "recent" | "title";

const PAGE_SIZE = 24;

export function ReactionsDashboard({ articles }: ReactionsDashboardProps): JSX.Element {
  const [snapshots, setSnapshots] = useState<Record<string, ArticleReactionSnapshot>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<Category | "all">("all");
  const [sortMode, setSortMode] = useState<SortMode>("popular");
  const [page, setPage] = useState(1);

  useEffect(() => {
    let isMounted = true;

    async function load(): Promise<void> {
      if (!REACTIONS_API_URL) {
        setError("API реакций не подключён к сборке сайта.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const entries = await Promise.all(
          articles.map(async (article) => {
            const response = await fetch(`${REACTIONS_API_URL}?slug=${encodeURIComponent(article.slug)}`, {
              headers: { Accept: "application/json" },
              cache: "no-store"
            });

            if (!response.ok) {
              throw new Error(`Failed to load ${article.slug}`);
            }

            const payload = (await response.json()) as ReactionsApiResponse;
            return [
              article.slug,
              {
                slug: article.slug,
                counts: { ...createEmptyReactionCounts(), ...payload.counts }
              }
            ] as const;
          })
        );

        if (isMounted) {
          setSnapshots(Object.fromEntries(entries));
        }
      } catch {
        if (isMounted) {
          setError("Не удалось загрузить сводку реакций. Попробуйте обновить страницу позже.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    void load();

    return () => {
      isMounted = false;
    };
  }, [articles]);

  const rankedArticles = useMemo(() => {
    return articles.map((article) => {
      const counts = snapshots[article.slug]?.counts ?? createEmptyReactionCounts();
      const total = getTotalReactionCount(counts);
      const topReaction = getTopReaction(counts);
      return {
        ...article,
        counts,
        total,
        topReaction
      };
    });
  }, [articles, snapshots]);

  const totalReactions = useMemo(
    () => rankedArticles.reduce((sum, article) => sum + article.total, 0),
    [rankedArticles]
  );

  const mostResponsive = useMemo(() => {
    return [...rankedArticles].sort((left, right) => right.total - left.total || right.date.localeCompare(left.date))[0] ?? null;
  }, [rankedArticles]);

  const filteredArticles = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    const filtered = rankedArticles.filter((article) => {
      const categoryMatches = categoryFilter === "all" || article.category === categoryFilter;
      const queryMatches =
        !normalizedQuery ||
        article.title.toLowerCase().includes(normalizedQuery) ||
        article.slug.toLowerCase().includes(normalizedQuery) ||
        CATEGORY_LABELS[article.category].toLowerCase().includes(normalizedQuery);

      return categoryMatches && queryMatches;
    });

    return filtered.sort((left, right) => {
      if (sortMode === "recent") {
        return right.date.localeCompare(left.date);
      }

      if (sortMode === "title") {
        return left.title.localeCompare(right.title, "ru");
      }

      return right.total - left.total || right.date.localeCompare(left.date);
    });
  }, [categoryFilter, query, rankedArticles, sortMode]);

  const totalPages = Math.max(1, Math.ceil(filteredArticles.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pagedArticles = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredArticles.slice(start, start + PAGE_SIZE);
  }, [currentPage, filteredArticles]);

  useEffect(() => {
    setPage(1);
  }, [categoryFilter, query, sortMode]);

  const categoryCounts = useMemo(() => {
    return (Object.keys(CATEGORY_LABELS) as Category[]).map((category) => ({
      category,
      count: rankedArticles.filter((article) => article.category === category).length
    }));
  }, [rankedArticles]);

  return (
    <div className="space-y-8">
      <section className="rounded-[2.25rem] border border-slate-200 bg-[linear-gradient(135deg,#6964d9_0%,#8e7af7_52%,#9fd8ff_100%)] p-6 text-white shadow-[0_32px_64px_rgba(50,40,130,0.18)] md:p-8">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">Служебная сводка</p>
            <h1 className="mt-3 max-w-[12ch] text-4xl font-black leading-[0.95] tracking-tight md:text-6xl">
              Реакции по всем статьям
            </h1>
            <p className="mt-4 max-w-[48ch] text-base leading-8 text-white/85 md:text-lg">
              Здесь видно, какие материалы реально цепляют аудиторию, какие отклики побеждают и какие темы набирают больше всего реакции.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[1.75rem] border border-white/20 bg-white/10 p-5 backdrop-blur-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/65">Всего реакций</p>
              <p className="mt-3 text-4xl font-black tracking-tight">{loading ? "…" : totalReactions}</p>
              <p className="mt-2 text-sm leading-6 text-white/75">Сумма всех откликов по опубликованным материалам.</p>
            </div>
            <div className="rounded-[1.75rem] border border-white/20 bg-white/10 p-5 backdrop-blur-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/65">Лидер по отклику</p>
              {loading ? (
                <p className="mt-3 text-sm text-white/75">Загружаю данные…</p>
              ) : mostResponsive ? (
                <>
                  <p className="mt-3 text-xl font-black leading-tight">{mostResponsive.title}</p>
                  <p className="mt-2 text-sm text-white/75">{mostResponsive.total} реакций</p>
                </>
              ) : (
                <p className="mt-3 text-sm text-white/75">Пока нет данных.</p>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-[0_18px_40px_rgba(15,23,42,0.06)] md:p-6">
        <div className="grid gap-4 xl:grid-cols-[minmax(0,1.2fr)_auto_auto] xl:items-center">
          <label className="block">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Поиск по статьям</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Название статьи или slug"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#6964d9] focus:bg-white"
            />
          </label>

          <label className="block xl:min-w-[240px]">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Рубрика</span>
            <select
              value={categoryFilter}
              onChange={(event) => setCategoryFilter(event.target.value as Category | "all")}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#6964d9] focus:bg-white"
            >
              <option value="all">Все рубрики</option>
              {(Object.keys(CATEGORY_LABELS) as Category[]).map((category) => (
                <option key={category} value={category}>
                  {CATEGORY_LABELS[category]}
                </option>
              ))}
            </select>
          </label>

          <label className="block xl:min-w-[220px]">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Сортировка</span>
            <select
              value={sortMode}
              onChange={(event) => setSortMode(event.target.value as SortMode)}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#6964d9] focus:bg-white"
            >
              <option value="popular">Сначала самые реактивные</option>
              <option value="recent">Сначала новые</option>
              <option value="title">По алфавиту</option>
            </select>
          </label>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setCategoryFilter("all")}
            className={`rounded-full border px-3 py-2 text-xs font-bold transition ${
              categoryFilter === "all"
                ? "border-slate-900 bg-slate-900 text-white"
                : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
            }`}
          >
            Все ({articles.length})
          </button>
          {categoryCounts.map(({ category, count }) => {
            const theme = CATEGORY_THEME[category];
            const active = categoryFilter === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setCategoryFilter(category)}
                className="rounded-full border px-3 py-2 text-xs font-bold transition"
                style={{
                  borderColor: active ? theme.badgeBorder : "#e2e8f0",
                  backgroundColor: active ? theme.badgeBg : "#ffffff",
                  color: active ? theme.badgeText : "#475569"
                }}
              >
                {CATEGORY_SHORT_LABELS[category]} ({count})
              </button>
            );
          })}
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm text-slate-600">
          <p>
            Показано <span className="font-semibold text-slate-900">{pagedArticles.length}</span> из <span className="font-semibold text-slate-900">{filteredArticles.length}</span>
          </p>
          {totalPages > 1 ? (
            <p>
              Страница <span className="font-semibold text-slate-900">{currentPage}</span> из <span className="font-semibold text-slate-900">{totalPages}</span>
            </p>
          ) : null}
        </div>
      </section>

      {error ? <p className="text-sm font-medium text-[#b42318]">{error}</p> : null}

      <section className="grid gap-5 xl:grid-cols-2">
        {pagedArticles.map((article, index) => {
          const theme = CATEGORY_THEME[article.category];
          return (
            <article
              key={article.slug}
              className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.06)]"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-semibold text-slate-400">#{String((currentPage - 1) * PAGE_SIZE + index + 1).padStart(2, "0")}</span>
                    <span
                      className="inline-flex rounded-full border px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em]"
                      style={{
                        backgroundColor: theme.badgeBg,
                        color: theme.badgeText,
                        borderColor: theme.badgeBorder
                      }}
                    >
                      {CATEGORY_SHORT_LABELS[article.category]}
                    </span>
                    <span className="text-sm text-slate-500">{formatDate(article.date)}</span>
                  </div>

                  <h2 className="max-w-[24ch] text-2xl font-black leading-tight text-slate-900">
                    <Link href={`/article/${article.slug}`} className="hover:text-brand">
                      {article.title}
                    </Link>
                  </h2>
                  <p className="text-xs text-slate-400">/{article.slug}</p>
                </div>

                <div className="rounded-[1.25rem] border border-slate-200 bg-slate-50 px-4 py-3 text-right">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">Всего</p>
                  <p className="mt-2 text-2xl font-black text-slate-900">{article.total}</p>
                </div>
              </div>

              <div className="mt-5 grid gap-4 lg:grid-cols-[0.92fr_1.08fr]">
                <div className="rounded-[1.5rem] border border-slate-200 bg-[linear-gradient(135deg,#fff8e5_0%,#f8fbff_100%)] p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">Топ-реакция</p>
                  {article.topReaction ? (
                    <div className="mt-3 flex items-center gap-3">
                      <span
                        className="inline-flex h-12 w-12 items-center justify-center rounded-2xl text-2xl"
                        style={{ backgroundColor: `${article.topReaction.reaction.accent}33` }}
                      >
                        {article.topReaction.reaction.emoji}
                      </span>
                      <div>
                        <p className="text-lg font-black text-slate-900">{article.topReaction.reaction.label}</p>
                        <p className="text-sm text-slate-600">{article.topReaction.count} голосов</p>
                      </div>
                    </div>
                  ) : (
                    <p className="mt-3 text-sm leading-6 text-slate-600">Пока без реакций.</p>
                  )}
                </div>

                <div className="flex flex-wrap gap-2">
                  {ARTICLE_REACTIONS.map((reaction) => {
                    const count = article.counts[reaction.key] ?? 0;
                    return (
                      <span
                        key={reaction.key}
                        className="inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-bold"
                        style={{
                          backgroundColor: count ? `${reaction.accent}22` : "#f8fafc",
                          borderColor: count ? `${reaction.accent}88` : "#e2e8f0",
                          color: count ? reaction.text : "#64748b"
                        }}
                      >
                        <span>{reaction.emoji}</span>
                        <span>{reaction.label}</span>
                        <span>{count}</span>
                      </span>
                    );
                  })}
                </div>
              </div>
            </article>
          );
        })}
      </section>

      {filteredArticles.length === 0 && !loading ? (
        <section className="rounded-[2rem] border border-slate-200 bg-white p-8 text-center shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
          <p className="text-lg font-semibold text-slate-900">Ничего не найдено</p>
          <p className="mt-2 text-sm text-slate-600">Измени запрос или сбрось фильтры.</p>
        </section>
      ) : null}

      {totalPages > 1 ? (
        <nav className="flex flex-wrap items-center justify-center gap-2">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => setPage((prev) => Math.max(1, prev - 1))}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Назад
          </button>
          {Array.from({ length: totalPages }, (_, index) => index + 1)
            .filter((pageNumber) => Math.abs(pageNumber - currentPage) <= 2 || pageNumber === 1 || pageNumber === totalPages)
            .map((pageNumber, index, array) => (
              <span key={pageNumber} className="contents">
                {index > 0 && pageNumber - array[index - 1] > 1 ? (
                  <span className="px-2 text-slate-400">…</span>
                ) : null}
                <button
                  type="button"
                  onClick={() => setPage(pageNumber)}
                  className={`rounded-xl border px-4 py-2 text-sm font-semibold ${
                    pageNumber === currentPage
                      ? "border-slate-900 bg-slate-900 text-white"
                      : "border-slate-200 bg-white text-slate-700"
                  }`}
                >
                  {pageNumber}
                </button>
              </span>
            ))}
          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Вперёд
          </button>
        </nav>
      ) : null}
    </div>
  );
}
