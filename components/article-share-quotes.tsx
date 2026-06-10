"use client";

import { useEffect, useState } from "react";
import type { ShareQuote } from "@/lib/share-quotes";

type ArticleShareQuotesProps = {
  articleTitle: string;
  author: string;
  quotes: ShareQuote[];
  url: string;
};

type CardStatus = "idle" | "ready" | "shared" | "downloaded";

export function ArticleShareQuotes({
  articleTitle,
  author,
  quotes,
  url
}: ArticleShareQuotesProps): JSX.Element | null {
  const [currentUrl, setCurrentUrl] = useState(url);
  const [copiedQuoteId, setCopiedQuoteId] = useState<string | null>(null);
  const [cardQuoteId, setCardQuoteId] = useState<string | null>(null);
  const [cardUrl, setCardUrl] = useState<string | null>(null);
  const [cardStatus, setCardStatus] = useState<CardStatus>("idle");

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  useEffect(() => {
    return () => {
      if (cardUrl) URL.revokeObjectURL(cardUrl);
    };
  }, [cardUrl]);

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

  async function createQuoteCard(quote: ShareQuote): Promise<void> {
    const blob = await renderQuoteCard({
      quote: quote.text,
      author,
      articleTitle,
      url: currentUrl
    });

    if (cardUrl) URL.revokeObjectURL(cardUrl);

    setCardQuoteId(quote.id);
    setCardUrl(URL.createObjectURL(blob));
    setCardStatus("ready");
  }

  async function shareQuoteCard(): Promise<void> {
    if (!cardUrl) return;

    const response = await fetch(cardUrl);
    const blob = await response.blob();
    const file = new File([blob], "quote-card.png", { type: "image/png" });

    if (
      typeof navigator !== "undefined" &&
      "share" in navigator &&
      "canShare" in navigator &&
      navigator.canShare({ files: [file] })
    ) {
      try {
        await navigator.share({
          title: articleTitle,
          text: `Цитата из статьи «${articleTitle}»`,
          files: [file]
        });
        setCardStatus("shared");
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
      }
    }

    setCardStatus("ready");
  }

  return (
    <section className="rounded-[2rem] border border-slate-200 bg-[linear-gradient(135deg,#fffdf3_0%,#eef9ff_55%,#fff1f7_100%)] p-5 shadow-[0_22px_48px_rgba(15,23,42,0.06)] dark:border-slate-800 dark:bg-slate-900 dark:bg-none md:p-6">
      <div className="grid gap-5 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
            Цитата для пересылки
          </p>
          <h2 className="mt-3 text-2xl font-black tracking-tight text-slate-900 dark:text-slate-50 md:text-3xl">
            Скопируйте мысль или сделайте карточку
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
            Можно отправить текстом или сгенерировать красивую PNG-картинку для Telegram, WhatsApp и других мессенджеров.
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
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => void copyQuote(quote)}
                    className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-bold text-slate-800 transition hover:-translate-y-0.5 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-700"
                  >
                    {copiedQuoteId === quote.id ? "Скопировано" : "Скопировать цитату"}
                  </button>
                  <button
                    type="button"
                    onClick={() => void createQuoteCard(quote)}
                    className="rounded-2xl bg-slate-900 px-4 py-2.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
                  >
                    Сделать карточку цитаты
                  </button>
                </div>
              </figcaption>

              {cardQuoteId === quote.id && cardUrl ? (
                <div className="mt-4 rounded-[1.25rem] border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-900">
                  {/* Blob previews are generated in-browser, so next/image is not useful here. */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={cardUrl}
                    alt="Карточка цитаты для шаринга"
                    className="w-full rounded-[1rem] border border-white shadow-sm dark:border-slate-800"
                  />
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <a
                      href={cardUrl}
                      download="quote-card.png"
                      onClick={() => setCardStatus("downloaded")}
                      className="rounded-2xl bg-slate-900 px-4 py-2.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
                    >
                      Скачать PNG
                    </a>
                    <button
                      type="button"
                      onClick={() => void shareQuoteCard()}
                      className="rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-800 transition hover:-translate-y-0.5 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
                    >
                      Отправить картинку
                    </button>
                    <span className="text-sm font-medium text-slate-500 dark:text-slate-400" aria-live="polite">
                      {cardStatus === "shared"
                        ? "Меню отправки открыто"
                        : cardStatus === "downloaded"
                          ? "Карточка скачана"
                          : "Готово для Telegram и WhatsApp"}
                    </span>
                  </div>
                </div>
              ) : null}
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

type QuoteCardInput = {
  quote: string;
  author: string;
  articleTitle: string;
  url: string;
};

async function renderQuoteCard({ quote, author, articleTitle, url }: QuoteCardInput): Promise<Blob> {
  const canvas = document.createElement("canvas");
  const width = 1080;
  const height = 1350;
  const scale = window.devicePixelRatio > 1 ? 1.5 : 1;
  canvas.width = width * scale;
  canvas.height = height * scale;

  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas is not supported");

  ctx.scale(scale, scale);

  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, "#fff7df");
  gradient.addColorStop(0.45, "#eef9ff");
  gradient.addColorStop(1, "#fff1f7");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  drawCircle(ctx, 930, 90, 230, "rgba(125, 211, 252, 0.55)");
  drawCircle(ctx, 116, 1200, 210, "rgba(242, 207, 99, 0.5)");
  drawCircle(ctx, 875, 1110, 140, "rgba(236, 72, 153, 0.18)");

  roundRect(ctx, 70, 78, 940, 1194, 54, "#0f172a");
  roundRect(ctx, 102, 110, 876, 1130, 42, "rgba(255,255,255,0.055)");

  ctx.fillStyle = "rgba(255,255,255,0.58)";
  ctx.font = "700 27px Segoe UI, Arial, sans-serif";
  ctx.fillText("ЦИТАТА ИЗ ЖУРНАЛА", 140, 190);

  ctx.fillStyle = "#f2cf63";
  ctx.font = "900 112px Georgia, Times New Roman, serif";
  ctx.fillText("“", 134, 338);

  ctx.fillStyle = "#ffffff";
  ctx.font = "900 58px Segoe UI, Arial, sans-serif";
  const quoteLines = wrapText(ctx, quote, 790, 7);
  let y = 390;
  quoteLines.forEach((line) => {
    ctx.fillText(line, 140, y);
    y += 76;
  });

  const metaTop = Math.max(y + 50, 885);
  ctx.strokeStyle = "rgba(255,255,255,0.18)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(140, metaTop);
  ctx.lineTo(940, metaTop);
  ctx.stroke();

  ctx.fillStyle = "rgba(255,255,255,0.78)";
  ctx.font = "800 34px Segoe UI, Arial, sans-serif";
  ctx.fillText(author, 140, metaTop + 72);

  ctx.fillStyle = "rgba(255,255,255,0.52)";
  ctx.font = "600 28px Segoe UI, Arial, sans-serif";
  wrapText(ctx, articleTitle, 720, 2).forEach((line, index) => {
    ctx.fillText(line, 140, metaTop + 122 + index * 40);
  });

  roundRect(ctx, 140, 1128, 800, 62, 31, "rgba(255,255,255,0.1)");
  ctx.fillStyle = "rgba(255,255,255,0.7)";
  ctx.font = "700 24px Segoe UI, Arial, sans-serif";
  ctx.fillText(shortenUrl(url), 172, 1168);

  ctx.fillStyle = "#f2cf63";
  ctx.font = "900 29px Segoe UI, Arial, sans-serif";
  ctx.fillText("Денис Михин", 140, 1248);

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error("Could not create quote card"));
    }, "image/png");
  });
}

function drawCircle(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  color: string
): void {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
  color: string
): void {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + width, y, x + width, y + height, radius);
  ctx.arcTo(x + width, y + height, x, y + height, radius);
  ctx.arcTo(x, y + height, x, y, radius);
  ctx.arcTo(x, y, x + width, y, radius);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  maxLines: number
): string[] {
  const words = text.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let current = "";

  words.forEach((word) => {
    const next = current ? `${current} ${word}` : word;
    if (ctx.measureText(next).width <= maxWidth) {
      current = next;
      return;
    }

    if (current) lines.push(current);
    current = word;
  });

  if (current) lines.push(current);
  if (lines.length <= maxLines) return lines;

  const trimmed = lines.slice(0, maxLines);
  const lastIndex = trimmed.length - 1;
  while (trimmed[lastIndex] && ctx.measureText(`${trimmed[lastIndex]}…`).width > maxWidth) {
    trimmed[lastIndex] = trimmed[lastIndex].split(" ").slice(0, -1).join(" ");
  }
  trimmed[lastIndex] = `${trimmed[lastIndex]}…`;
  return trimmed;
}

function shortenUrl(value: string): string {
  try {
    const parsed = new URL(value);
    return `${parsed.hostname}${parsed.pathname}`;
  } catch {
    return value;
  }
}
