import { cn } from "@/lib/utils";

type AuthorQuoteProps = {
  quote: string;
  className?: string;
  compact?: boolean;
};

export function AuthorQuote({ quote, className, compact = false }: AuthorQuoteProps): JSX.Element {
  return (
    <blockquote
      className={cn(
        "rounded-[1.4rem] border border-slate-200 bg-white/80 text-slate-800 shadow-[0_10px_26px_rgba(15,23,42,0.06)]",
        compact ? "px-4 py-3" : "px-5 py-4",
        className
      )}
    >
      <p className={cn("font-semibold leading-7", compact ? "text-sm" : "text-base")}>“{quote}”</p>
      <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
        Денис Михин
      </p>
    </blockquote>
  );
}

