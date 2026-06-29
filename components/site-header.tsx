"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { GlobalSearch } from "@/components/global-search";
import { FIRST_MENU, SECOND_MENU } from "@/lib/constants";
import type { SearchItem } from "@/lib/search-shared";
import { cn } from "@/lib/utils";

type SiteHeaderProps = {
  searchItems: SearchItem[];
};

export function SiteHeader({ searchItems }: SiteHeaderProps): JSX.Element {
  const [dark, setDark] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let initialDark = false;

    try {
      const saved = window.localStorage.getItem("theme");
      initialDark = saved === "dark";
    } catch {
      initialDark = false;
    }

    setDark(initialDark);
    document.documentElement.classList.toggle("dark", initialDark);
  }, []);

  useEffect(() => {
    let lastY = window.scrollY;

    const onScroll = (): void => {
      const currentY = window.scrollY;
      const delta = currentY - lastY;

      if (currentY < 24) {
        setIsVisible(true);
        lastY = currentY;
        return;
      }

      if (Math.abs(delta) < 8) {
        return;
      }

      if (delta > 0) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      lastY = currentY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function toggleTheme(): void {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      window.localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      // Ignore storage failures and keep theme only for the current session.
    }
  }

  return (
    <header
      className={cn(
        "site-header sticky top-0 z-40 border-b border-slate-200/70 bg-white/86 backdrop-blur-2xl transition-all duration-500 ease-out dark:border-slate-800/80 dark:bg-slate-950/84",
        isVisible ? "translate-y-0 shadow-[0_12px_34px_rgba(15,23,42,0.06)]" : "-translate-y-[calc(100%-10px)] shadow-none"
      )}
    >
      <div className="container-shell py-2.5 md:py-3">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="group leading-none">
            <span className="block text-[9px] font-semibold uppercase tracking-[0.2em] text-slate-500 transition group-hover:text-brand dark:text-slate-400 md:text-[10px] md:tracking-[0.22em]">
              Авторский журнал
            </span>
            <span className="serif-display mt-0.5 block text-[1.2rem] font-bold tracking-tight text-slate-900 transition group-hover:text-brand dark:text-slate-100 md:text-[1.55rem]">
              Дениса Михина
            </span>
          </Link>
          <nav className="hidden items-center gap-1 lg:flex">
            {[...FIRST_MENU, ...SECOND_MENU.slice(0, 6)].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="rounded-full px-3 py-2 text-sm font-bold text-slate-600 transition hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex shrink-0 items-center gap-2">
            <GlobalSearch items={searchItems} />
            <button
              type="button"
              onClick={toggleTheme}
              className={cn(
                "rounded-xl border px-3 py-1.5 text-xs font-semibold transition md:text-sm",
                "border-slate-300/70 bg-white/75 text-slate-700 hover:border-slate-500/60 hover:bg-white dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
              )}
            >
              {dark ? "Светлая" : "Тёмная"}
            </button>
          </div>
        </div>
        <nav className="-mx-4 mt-2 flex gap-2 overflow-x-auto px-4 pb-1 lg:hidden">
          {FIRST_MENU.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="shrink-0 rounded-full border border-[#efb8d2] bg-[#ffeefa] px-3 py-1.5 text-xs font-semibold text-[#9f2f73] transition hover:border-[#e78ac2] hover:bg-[#ffe2f4] md:px-4 md:text-sm"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
