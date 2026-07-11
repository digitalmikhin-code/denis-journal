"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { GlobalSearch } from "@/components/global-search";
import { FIRST_MENU, SECOND_MENU } from "@/lib/constants";
import type { SearchItem } from "@/lib/search-shared";
import { cn } from "@/lib/utils";

type SiteHeaderProps = {
  searchItems: SearchItem[];
};

type MobileMenuItem = {
  label: string;
  href: string;
};

export function SiteHeader({ searchItems }: SiteHeaderProps): JSX.Element {
  const [dark, setDark] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const headerMenuItems: MobileMenuItem[] = [...FIRST_MENU, ...SECOND_MENU.slice(0, 5)];

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
        "site-header sticky top-0 z-40 border-b border-slate-200 bg-white/94 backdrop-blur-xl transition-all duration-500 ease-out dark:border-slate-800/80 dark:bg-slate-950/92",
        isVisible ? "translate-y-0 shadow-[0_10px_30px_rgba(9,22,43,0.05)]" : "-translate-y-[calc(100%-10px)] shadow-none"
      )}
    >
      <div className="container-shell py-2.5 md:py-3">
        <div className="flex items-center justify-between gap-3">
          <Link href="/" className="group flex min-w-0 items-center gap-3 leading-none">
            <span className="relative size-11 overflow-hidden rounded-full border border-slate-200 bg-slate-950 shadow-[0_10px_24px_rgba(9,22,43,0.14)] transition group-hover:border-brand dark:border-slate-700 md:size-12">
              <Image
                src="/images/denis-mikhin-logo.png"
                alt="Логотип Дениса Михина"
                fill
                sizes="48px"
                className="object-cover"
                priority
              />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-[9px] font-semibold uppercase text-slate-500 transition group-hover:text-brand dark:text-slate-400 md:text-[10px]">
                Авторский журнал
              </span>
              <span className="mt-1 block truncate text-[1rem] font-black uppercase text-slate-950 transition group-hover:text-brand dark:text-slate-100 md:text-[1.25rem]">
                Денис Михин
              </span>
            </span>
          </Link>
          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            <Link
              href="/training"
              className="inline-flex shrink-0 items-center border border-brand bg-brand px-4 py-2 text-xs font-black uppercase text-white shadow-[0_12px_28px_rgba(11,77,186,0.24)] transition hover:border-brand-dark hover:bg-brand-dark dark:border-blue-400 dark:bg-blue-500 dark:hover:bg-blue-400 md:text-sm"
            >
              Курсы
            </Link>
            <GlobalSearch items={searchItems} />
            <button
              type="button"
              onClick={toggleTheme}
              className={cn(
                "hidden border px-3 py-1.5 text-xs font-semibold transition sm:inline-flex md:text-sm",
                "border-slate-300 bg-white text-slate-700 hover:border-brand hover:text-brand dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
              )}
            >
              {dark ? "Светлая" : "Тёмная"}
            </button>
          </div>
        </div>
        <nav className="no-scrollbar -mx-4 mt-2 flex gap-2 overflow-x-auto px-4 pb-1">
          {headerMenuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="shrink-0 border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-brand hover:text-brand dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 md:px-4 md:text-sm"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
