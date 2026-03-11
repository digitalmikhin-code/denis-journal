"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { CATEGORY_SHORT_LABELS, CATEGORY_THEME, REACTIONS_API_URL, type Category } from "@/lib/constants";
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

export function ReactionsDashboard({ articles }: ReactionsDashboardProps): JSX.Element {
  const [snapshots, setSnapshots] = useState<Record<string, ArticleReactionSnapshot>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
    return articles
      .map((article) => {
        const counts = snapshots[article.slug]?.counts ?? createEmptyReactionCounts();
        const total = getTotalReactionCount(counts);
        const topReaction = getTopReaction(counts);
        return {
          ...article,
          counts,
          total,
          topReaction
        };
      })
      .sort((left, right) => right.total - left.total || right.date.localeCompare(left.date));
  }, [articles, snapshots]);

  const totalReactions = useMemo(
    () => rankedArticles.reduce((sum, article) => sum + article.total, 0),
    [rankedArticles]
  );

  const mostResponsive = rankedArticles[0] ?? null;

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

      {error ? <p className="text-sm font-medium text-[#b42318]">{error}</p> : null}

      <section className="grid gap-5 xl:grid-cols-2">
        {rankedArticles.map((article, index) => {
          const theme = CATEGORY_THEME[article.category];
          return (
            <article
              key={article.slug}
              className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.06)]"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-semibold text-slate-400">#{String(index + 1).padStart(2, "0")}</span>
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
    </div>
  );
}
