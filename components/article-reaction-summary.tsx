"use client";

import { ARTICLE_REACTIONS } from "@/lib/reactions";
import { useArticleReactionData } from "@/components/use-article-reaction-data";

type ArticleReactionSummaryProps = {
  slug: string;
};

export function ArticleReactionSummary({ slug }: ArticleReactionSummaryProps): JSX.Element | null {
  const { counts, totalVotes, topReaction, loading, isConfigured } = useArticleReactionData(slug);

  if (!isConfigured) {
    return null;
  }

  return (
    <div className="rounded-[1.5rem] border border-slate-200/80 bg-[linear-gradient(135deg,#fff8e9_0%,#ffffff_55%,#eef7ff_100%)] p-4 shadow-[0_16px_34px_rgba(15,23,42,0.06)] md:p-5">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="space-y-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            Отклик читателей
          </p>
          {loading ? (
            <p className="text-sm text-slate-600">Загружаю реакции…</p>
          ) : topReaction ? (
            <div className="flex flex-wrap items-center gap-3">
              <span
                className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-black"
                style={{
                  backgroundColor: `${topReaction.reaction.accent}22`,
                  borderColor: `${topReaction.reaction.accent}99`,
                  color: topReaction.reaction.text
                }}
              >
                <span className="text-base">{topReaction.reaction.emoji}</span>
                Топ-реакция: {topReaction.reaction.label}
              </span>
              <span className="text-sm font-medium text-slate-600">
                {topReaction.count} из {totalVotes}
              </span>
            </div>
          ) : (
            <p className="text-sm text-slate-600">Пока нет реакций. Можно задать первый тон отклика.</p>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {ARTICLE_REACTIONS.map((reaction) => {
            const count = counts[reaction.key] ?? 0;
            if (!count && totalVotes > 0) {
              return null;
            }

            return (
              <span
                key={reaction.key}
                className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-bold"
                style={{
                  backgroundColor: count ? `${reaction.accent}22` : "#ffffff",
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
    </div>
  );
}
