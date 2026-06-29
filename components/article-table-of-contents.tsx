"use client";

import { useEffect, useState } from "react";
import type { TableOfContentsItem } from "@/lib/table-of-contents";

type ArticleTableOfContentsProps = {
  items: TableOfContentsItem[];
};

export function ArticleTableOfContents({ items }: ArticleTableOfContentsProps): JSX.Element | null {
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? "");

  useEffect(() => {
    if (items.length === 0) return;

    function updateActiveSection(): void {
      const current = items
        .map((item) => document.getElementById(item.id))
        .filter((element): element is HTMLElement => Boolean(element))
        .filter((element) => element.getBoundingClientRect().top <= 140)
        .at(-1);

      setActiveId(current?.id ?? items[0]?.id ?? "");
    }

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, [items]);

  if (items.length < 3) return null;

  return (
    <nav
      aria-label="Оглавление статьи"
      className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-[0_16px_36px_rgba(15,23,42,0.06)] dark:border-slate-800 dark:bg-slate-900 dark:shadow-[0_16px_36px_rgba(0,0,0,0.22)]"
    >
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
          Оглавление
        </p>
        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-500 dark:bg-slate-800 dark:text-slate-300">
          {items.length}
        </span>
      </div>

      <ol className="mt-4 space-y-2">
        {items.map((item, index) => (
          <li key={item.id} className={item.level === 3 ? "pl-4" : ""}>
            <a
              href={`#${item.id}`}
              className={`group flex gap-3 rounded-2xl px-3 py-2.5 text-sm font-semibold leading-5 transition ${
                activeId === item.id
                  ? "bg-slate-950 text-white dark:bg-white dark:text-slate-950"
                  : "text-slate-700 hover:bg-slate-50 hover:text-slate-950 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-white"
              }`}
            >
              <span
                className={`mt-0.5 text-[11px] font-black ${
                  activeId === item.id ? "text-white/55 dark:text-slate-500" : "text-slate-400 group-hover:text-slate-500"
                }`}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <span>{item.title}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
