"use client";

import { useEffect, useMemo, useState } from "react";
import { REACTIONS_API_URL } from "@/lib/constants";
import {
  ARTICLE_REACTIONS,
  createEmptyReactionCounts,
  getTopReaction,
  getTotalReactionCount,
  type ReactionCountMap,
  type ReactionKey
} from "@/lib/reactions";

const STORAGE_PREFIX = "article-reaction:";

type ReactionsApiResponse = {
  slug: string;
  counts: ReactionCountMap;
};

export type ArticleReactionData = {
  counts: ReactionCountMap;
  totalVotes: number;
  topReaction: ReturnType<typeof getTopReaction>;
  selectedReaction: ReactionKey | null;
  loading: boolean;
  submitting: ReactionKey | null;
  error: string | null;
  isConfigured: boolean;
  vote: (reaction: ReactionKey) => Promise<void>;
};

export function useArticleReactionData(slug: string): ArticleReactionData {
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

  const totalVotes = useMemo(() => getTotalReactionCount(counts), [counts]);
  const topReaction = useMemo(() => getTopReaction(counts), [counts]);

  async function vote(reaction: ReactionKey): Promise<void> {
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

  return {
    counts,
    totalVotes,
    topReaction,
    selectedReaction,
    loading,
    submitting,
    error,
    isConfigured: Boolean(REACTIONS_API_URL),
    vote
  };
}
