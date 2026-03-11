"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ARTICLE_REACTIONS,
  createEmptyReactionCounts,
  type ReactionCountMap,
  type ReactionKey
} from "@/lib/reactions";

type ArticleReactionsProps = {
  slug: string;
};

const STORAGE_PREFIX = "article-reaction:";
const REACTIONS_API_URL = process.env.NEXT_PUBLIC_REACTIONS_API_URL?.replace(/\/$/, "") || "";

type ReactionsApiResponse = {
  slug: string;
  counts: ReactionCountMap;
};

export function ArticleReactions({ slug }: ArticleReactionsProps): JSX.Element | null {
  const [counts, setCounts] = useState<ReactionCountMap>(createEmptyReactionCounts);
  const [selectedReaction, setSelectedReaction] = useState<ReactionKey | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState<ReactionKey | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(`${STORAGE_PREFIX}${slug}`);
      if (stored && ARTICLE_REACTIONS.some((item) => item.key === stored)) {
        setSelectedReaction(stored as ReactionKey);
      }
    } catch {
      // Ignore storage issues; reactions still work without local persistence.
    }
  }, [slug]);

  useEffect(() => {
    let isMounted = true;

    async function loadCounts(): Promise<void> {
      if (!REACTIONS_API_URL) {
        setLoading(false);
        setError("Секция реакций появится после подключения серверной части.");
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`${REACTIONS_API_URL}?slug=${encodeURIComponent(slug)}`, {
          method: "GET",
          headers: {
            Accept: "application/json"
          },
          cache: "no-store"
        });

        if (!response.ok) {
          throw new Error(`Failed to load reactions: ${response.status}`);
        }

        const payload = (await response.json()) as ReactionsApiResponse;
        if (isMounted) {
          setCounts({ ...createEmptyReactionCounts(), ...payload.counts });
        }
      } catch {
        if (isMounted) {
          setError("Не удалось загрузить реакции. Попробуйте позже.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    void loadCounts();

    return () => {
      isMounted = false;
    };
  }, [slug]);

  const totalVotes = useMemo(
    () => Object.values(counts).reduce((sum, value) => sum + value, 0),
    [counts]
  );

  async function handleVote(reaction: ReactionKey): Promise<void> {
    if (!REACTIONS_API_URL || selectedReaction || submitting) {
      return;
    }

    try {
      setSubmitting(reaction);
      setError(null);

      const response = await fetch(REACTIONS_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({ slug, reaction })
      });

      if (!response.ok) {
        throw new Error(`Failed to submit reaction: ${response.status}`);
      }

      const payload = (await response.json()) as ReactionsApiResponse;
      setCounts({ ...createEmptyReactionCounts(), ...payload.counts });
      setSelectedReaction(reaction);

      try {
        window.localStorage.setItem(`${STORAGE_PREFIX}${slug}`, reaction);
      } catch {
        // Ignore storage errors.
      }
    } catch {
      setError("Не удалось сохранить реакцию. Попробуйте ещё раз.");
    } finally {
      setSubmitting(null);
    }
  }

  return (
    <section className="rounded-[2rem] border border-slate-200 bg-[linear-gradient(135deg,#fff8e5_0%,#fff7fb_50%,#eef8ff_100%)] p-6 shadow-[0_22px_48px_rgba(15,23,42,0.06)] md:p-8">
      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <div className="space-y-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
              После чтения
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900">
              Какая реакция ближе всего к вашему отклику?
            </h2>
          </div>
          <p className="max-w-[42ch] text-base leading-8 text-slate-700">
            Здесь нет дизлайков. Только полезные сигналы: что сработало, что зацепило и что
            хочется унести в работу. Это помогает видеть, какие тексты реально находят отклик.
          </p>
          <div className="rounded-[1.5rem] border border-slate-200/80 bg-white/80 px-4 py-3 text-sm text-slate-600">
            {selectedReaction ? (
              <span>
                Реакция сохранена. Уже есть <strong>{totalVotes}</strong>{" "}
                {totalVotes === 1 ? "отклик" : totalVotes < 5 ? "отклика" : "откликов"}.
              </span>
            ) : loading ? (
              <span>Загружаю текущие реакции…</span>
            ) : (
              <span>
                Сейчас в статье <strong>{totalVotes}</strong>{" "}
                {totalVotes === 1 ? "реакция" : totalVotes < 5 ? "реакции" : "реакций"}.
              </span>
            )}
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {ARTICLE_REACTIONS.map((reaction) => {
            const isSelected = selectedReaction === reaction.key;
            const isBusy = submitting === reaction.key;

            return (
              <button
                key={reaction.key}
                type="button"
                disabled={!REACTIONS_API_URL || Boolean(selectedReaction) || Boolean(submitting)}
                onClick={() => void handleVote(reaction.key)}
                className="rounded-[1.5rem] border bg-white p-4 text-left shadow-[0_12px_24px_rgba(15,23,42,0.05)] transition disabled:cursor-default disabled:opacity-100"
                style={{
                  borderColor: isSelected ? reaction.accent : "#e2e8f0",
                  boxShadow: isSelected ? `0 18px 36px -24px ${reaction.accent}` : undefined
                }}
              >
                <div className="flex items-start justify-between gap-3">
                  <span
                    className="inline-flex h-12 w-12 items-center justify-center rounded-2xl text-2xl"
                    style={{ backgroundColor: `${reaction.accent}33` }}
                  >
                    {reaction.emoji}
                  </span>
                  <span
                    className="rounded-full px-2.5 py-1 text-xs font-bold uppercase tracking-[0.12em]"
                    style={{
                      backgroundColor: reaction.accent,
                      color: reaction.text
                    }}
                  >
                    {counts[reaction.key]}
                  </span>
                </div>
                <div className="mt-4">
                  <p className="text-base font-black leading-tight text-slate-900">{reaction.label}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {isSelected
                      ? "Ваш отклик уже учтён."
                      : isBusy
                        ? "Сохраняю реакцию…"
                        : "Нажмите, если именно такой отклик у вас после чтения."}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {error && (
        <p className="mt-5 text-sm font-medium text-[#b42318]">
          {error}
        </p>
      )}
    </section>
  );
}
