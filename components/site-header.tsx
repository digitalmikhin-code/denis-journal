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
      <div className="container-shell py-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link href="/" className="text-2xl font-extrabold tracking-tight md:text-3xl">
            <span className="serif-display mr-1">Журнал</span>
            <span className="text-brand">Дениса Михина</span>
          </Link>
          <div className="flex items-center gap-2">
            <Link
              href="/search"
              className="rounded-xl border border-cyan-200 bg-cyan-50 px-3 py-2 text-sm font-semibold text-cyan-700 hover:border-cyan-400 dark:border-cyan-900 dark:bg-cyan-950/40 dark:text-cyan-300"
            >
              Поиск
            </Link>
            <Link
              href="/admin/"
              className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700 hover:border-emerald-400 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300"
            >
              /admin
            </Link>
            <button
              type="button"
              onClick={toggleTheme}
              className={cn(
                "rounded-xl border px-3 py-2 text-sm font-semibold",
                "border-amber-200 bg-amber-50 text-amber-700 hover:border-amber-400 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-300"
              )}
            >
              {dark ? "Светлая" : "Тёмная"}
            </button>
          </div>
        </div>
        <nav className="mt-4 flex flex-wrap gap-2">
          {FIRST_MENU.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full border border-fuchsia-200 bg-fuchsia-50 px-4 py-2 text-sm font-semibold text-fuchsia-700 hover:border-fuchsia-400 dark:border-fuchsia-900 dark:bg-fuchsia-950/30 dark:text-fuchsia-300"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <nav className="mt-3 flex flex-wrap gap-2">
          {SECOND_MENU.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full bg-gradient-to-r from-slate-100 to-sky-50 px-4 py-2 text-sm font-medium hover:from-brand-soft hover:to-rose-100 hover:text-brand dark:from-slate-800 dark:to-slate-800"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
