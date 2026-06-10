"use client";

import { useEffect, useRef, useState } from "react";

type ArticleInPageSearchProps = {
  targetId: string;
};

type SearchMatch = {
  range: Range;
};

type HighlightConstructor = new (...ranges: Range[]) => Highlight;

declare global {
  interface Window {
    Highlight?: HighlightConstructor;
  }

  interface CSS {
    highlights?: Map<string, Highlight>;
  }
}

const SEARCH_HIGHLIGHT = "article-search";
const ACTIVE_HIGHLIGHT = "article-search-active";

export function ArticleInPageSearch({ targetId }: ArticleInPageSearchProps): JSX.Element {
  const [query, setQuery] = useState("");
  const [matches, setMatches] = useState<SearchMatch[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const target = document.getElementById(targetId);
    clearHighlights();

    if (!target || query.trim().length < 2) {
      setMatches([]);
      setActiveIndex(0);
      return;
    }

    const nextMatches = collectMatches(target, query.trim());
    setMatches(nextMatches);
    setActiveIndex(0);
    paintHighlights(nextMatches, 0);

    if (nextMatches[0]) {
      scrollToMatch(nextMatches[0]);
    }

    return clearHighlights;
  }, [query, targetId]);

  useEffect(() => {
    paintHighlights(matches, activeIndex);
  }, [activeIndex, matches]);

  function goToMatch(direction: 1 | -1): void {
    if (matches.length === 0) return;

    const nextIndex = (activeIndex + direction + matches.length) % matches.length;
    setActiveIndex(nextIndex);
    scrollToMatch(matches[nextIndex]);
  }

  function clearSearch(): void {
    setQuery("");
    searchInputRef.current?.focus();
  }

  return (
    <section className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-[0_16px_36px_rgba(15,23,42,0.06)] dark:border-slate-800 dark:bg-slate-900 dark:shadow-[0_16px_36px_rgba(0,0,0,0.22)]">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
          Поиск по статье
        </p>
        {query.trim().length >= 2 ? (
          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-500 dark:bg-slate-800 dark:text-slate-300">
            {matches.length > 0 ? `${activeIndex + 1}/${matches.length}` : "0"}
          </span>
        ) : null}
      </div>

      <div className="mt-4 flex gap-2">
        <input
          ref={searchInputRef}
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Найти мысль"
          className="min-w-0 flex-1 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:bg-white dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-slate-500"
        />
        {query ? (
          <button
            type="button"
            onClick={clearSearch}
            className="rounded-2xl border border-slate-200 bg-white px-3 text-sm font-black text-slate-500 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
            aria-label="Очистить поиск"
          >
            x
          </button>
        ) : null}
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2">
        <button
          type="button"
          disabled={matches.length === 0}
          onClick={() => goToMatch(-1)}
          className="rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-50 disabled:cursor-default disabled:opacity-45 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          Назад
        </button>
        <button
          type="button"
          disabled={matches.length === 0}
          onClick={() => goToMatch(1)}
          className="rounded-2xl bg-slate-900 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-slate-800 disabled:cursor-default disabled:opacity-45 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
        >
          Далее
        </button>
      </div>

      {query.trim().length === 1 ? (
        <p className="mt-3 text-xs leading-5 text-slate-500 dark:text-slate-400">
          Введите минимум 2 символа.
        </p>
      ) : null}
    </section>
  );
}

function collectMatches(target: HTMLElement, query: string): SearchMatch[] {
  const matches: SearchMatch[] = [];
  const normalizedQuery = query.toLowerCase();
  const walker = document.createTreeWalker(target, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;
      if (!parent) return NodeFilter.FILTER_REJECT;
      if (["SCRIPT", "STYLE", "NOSCRIPT", "INPUT", "BUTTON"].includes(parent.tagName)) {
        return NodeFilter.FILTER_REJECT;
      }
      if (!node.textContent?.trim()) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    }
  });

  while (walker.nextNode()) {
    const node = walker.currentNode;
    const text = node.textContent ?? "";
    const normalizedText = text.toLowerCase();
    let startIndex = normalizedText.indexOf(normalizedQuery);

    while (startIndex !== -1) {
      const range = document.createRange();
      range.setStart(node, startIndex);
      range.setEnd(node, startIndex + query.length);
      matches.push({ range });
      startIndex = normalizedText.indexOf(normalizedQuery, startIndex + query.length);
    }
  }

  return matches;
}

function paintHighlights(matches: SearchMatch[], activeIndex: number): void {
  if (!CSS.highlights || !window.Highlight) return;

  CSS.highlights.delete(SEARCH_HIGHLIGHT);
  CSS.highlights.delete(ACTIVE_HIGHLIGHT);

  const passiveRanges = matches
    .filter((_, index) => index !== activeIndex)
    .map((match) => match.range);
  const activeRange = matches[activeIndex]?.range;

  if (passiveRanges.length > 0) {
    CSS.highlights.set(SEARCH_HIGHLIGHT, new window.Highlight(...passiveRanges));
  }

  if (activeRange) {
    CSS.highlights.set(ACTIVE_HIGHLIGHT, new window.Highlight(activeRange));
  }
}

function clearHighlights(): void {
  CSS.highlights?.delete(SEARCH_HIGHLIGHT);
  CSS.highlights?.delete(ACTIVE_HIGHLIGHT);
}

function scrollToMatch(match: SearchMatch | undefined): void {
  if (!match) return;

  const rect = match.range.getBoundingClientRect();
  const top = rect.top + window.scrollY - window.innerHeight * 0.28;
  window.scrollTo({ top, behavior: "smooth" });
}
