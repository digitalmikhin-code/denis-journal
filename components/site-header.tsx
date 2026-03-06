"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FIRST_MENU, SECOND_MENU } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function SiteHeader(): JSX.Element {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const initialDark = saved === "dark";
    setDark(initialDark);
    document.documentElement.classList.toggle("dark", initialDark);
  }, []);

  function toggleTheme(): void {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  }

  return (
    <header className="rainbow-line sticky top-0 z-40 border-b border-slate-200/70 bg-white/85 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/85">
      <div className="container-shell py-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <Link href="/" className="group leading-none">
            <span className="block text-xs font-semibold uppercase tracking-[0.22em] text-slate-500 transition group-hover:text-brand">
              Журнал
            </span>
            <span className="serif-display mt-1 block text-[2.15rem] font-bold tracking-tight text-slate-900 transition group-hover:text-brand dark:text-slate-100 md:text-[2.55rem]">
              Дениса Михина
            </span>
          </Link>
          <div className="flex items-center gap-2 pt-1">
            <Link
              href="/search"
              className="rounded-xl border border-cyan-200 bg-cyan-50 px-3 py-2 text-sm font-semibold text-cyan-700 transition hover:-translate-y-px hover:border-cyan-400 dark:border-cyan-900 dark:bg-cyan-950/40 dark:text-cyan-300"
            >
              Поиск
            </Link>
            <Link
              href="/admin/"
              className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700 transition hover:-translate-y-px hover:border-emerald-400 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300"
            >
              /admin
            </Link>
            <button
              type="button"
              onClick={toggleTheme}
              className={cn(
                "rounded-xl border px-3 py-2 text-sm font-semibold",
                "border-amber-200 bg-amber-50 text-amber-700 transition hover:-translate-y-px hover:border-amber-400 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-300"
              )}
            >
              {dark ? "Светлая" : "Тёмная"}
            </button>
          </div>
        </div>
        <nav className="mt-4 flex flex-wrap gap-2.5">
          {FIRST_MENU.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full border border-fuchsia-200/80 bg-gradient-to-r from-fuchsia-50 to-rose-50 px-4 py-2 text-sm font-semibold text-fuchsia-700 transition hover:-translate-y-px hover:border-fuchsia-400 hover:shadow-sm dark:border-fuchsia-900 dark:from-fuchsia-950/40 dark:to-rose-950/30 dark:text-fuchsia-300"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <nav className="mt-3 flex flex-wrap gap-2.5">
          {SECOND_MENU.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full border border-transparent bg-gradient-to-r from-slate-100 to-sky-50 px-4 py-2 text-sm font-medium transition hover:-translate-y-px hover:border-slate-200 hover:from-brand-soft hover:to-rose-100 hover:text-brand dark:from-slate-800 dark:to-slate-800 dark:hover:border-slate-700"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
