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
  canVote: boolean;
  vote: (reaction: ReactionKey) => Promise<void>;
  resetLocalReaction: () => void;
};

export function useArticleReactionData(slug: string): ArticleReactionData {
  const apiUrl = REACTIONS_API_URL;
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
      if (!apiUrl) {
        setLoading(false);
        setError("Секция реакций появится после подключения серверной части.");
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`${apiUrl}?slug=${encodeURIComponent(slug)}`, {
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
          const nextCounts = { ...createEmptyReactionCounts(), ...payload.counts };
          setCounts(nextCounts);
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
  }, [apiUrl, slug]);

  const totalVotes = useMemo(() => getTotalReactionCount(counts), [counts]);
  const topReaction = useMemo(() => getTopReaction(counts), [counts]);
  const canVote = Boolean(apiUrl) && !selectedReaction && !submitting;

  async function vote(reaction: ReactionKey): Promise<void> {
    if (!apiUrl || !canVote) {
      return;
    }

    try {
      setSubmitting(reaction);
      setError(null);

      const response = await fetch(apiUrl, {
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

  function resetLocalReaction(): void {
    try {
      window.localStorage.removeItem(`${STORAGE_PREFIX}${slug}`);
    } catch {
      // ignore
    }
    setSelectedReaction(null);
    setError(null);
  }

  return {
    counts,
    totalVotes,
    topReaction,
    selectedReaction,
    loading,
    submitting,
    error,
    isConfigured: Boolean(apiUrl),
    canVote,
    vote,
    resetLocalReaction
  };
}
