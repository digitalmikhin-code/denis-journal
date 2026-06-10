"use client";

import { useEffect, useState } from "react";
import type { ShareQuote } from "@/lib/share-quotes";

type ArticleShareQuotesProps = {
  articleTitle: string;
  author: string;
  quotes: ShareQuote[];
  url: string;
};

export function ArticleShareQuotes({
  articleTitle,
  author,
  quotes,
  url
}: ArticleShareQuotesProps): JSX.Element | null {
  const [currentUrl, setCurrentUrl] = useState(url);
  const [copiedQuoteId, setCopiedQuoteId] = useState<string | null>(null);

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  if (quotes.length === 0) return null;

  async function copyQuote(quote: ShareQuote): Promise<void> {
    const text = `«${quote.text}»\n\n${author}, «${articleTitle}»\n${currentUrl}`;

    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(text);
      }
      setCopiedQuoteId(quote.id);
    } catch {
      setCopiedQuoteId(null);
    }
  }

  return (
    <section className="rounded-[2rem] border border-slate-200 bg-[linear-gradient(135deg,#fffdf3_0%,#eef9ff_55%,#fff1f7_100%)] p-5 shadow-[0_22px_48px_rgba(15,23,42,0.06)] dark:border-slate-800 dark:bg-slate-900 dark:bg-none md:p-6">
      <div className="grid gap-5 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
            Цитата для пересылки
          </p>
          <h2 className="mt-3 text-2xl font-black tracking-tight text-slate-900 dark:text-slate-50 md:text-3xl">
            Скопируйте сильную мысль
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
            Иногда человеку проще отправить не всю статью сразу, а одну точную фразу со ссылкой на материал.
          </p>
        </div>

        <div className="grid gap-3">
          {quotes.map((quote) => (
            <figure
              key={quote.id}
              className="rounded-[1.5rem] border border-white/75 bg-white/85 p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800"
            >
              <blockquote className="text-base font-bold leading-7 text-slate-900 dark:text-slate-50">
                “{quote.text}”
              </blockquote>
              <figcaption className="mt-3 flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                  {author}
                </span>
                <button
                  type="button"
                  onClick={() => void copyQuote(quote)}
                  className="rounded-2xl bg-slate-900 px-4 py-2.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
                >
                  {copiedQuoteId === quote.id ? "Скопировано" : "Скопировать цитату"}
                </button>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
