"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FIRST_MENU, SECOND_MENU } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function SiteHeader(): JSX.Element {
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
        "sticky top-0 z-40 border-b border-[#efb8d2]/80 bg-[#fff7fb]/92 backdrop-blur-xl transition-transform duration-300 ease-out dark:border-slate-800 dark:bg-slate-950/85",
        isVisible ? "translate-y-0" : "-translate-y-full"
      )}
    >
      <div className="container-shell py-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <Link href="/" className="group leading-none">
            <span className="block text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500 transition group-hover:text-brand">
              Авторский журнал
            </span>
            <span className="serif-display mt-1 block text-[1.8rem] font-bold tracking-tight text-slate-900 transition group-hover:text-brand dark:text-slate-100 md:text-[2.05rem]">
              Дениса Михина
            </span>
            <span className="mt-1 block text-xs font-medium tracking-[0.02em] text-slate-500">
              Системное мышление, управление, карьера, ИИ
            </span>
          </Link>
          <div className="flex items-center gap-2 pt-1">
            <Link
              href="/search"
              className="rounded-xl border border-slate-300/70 bg-white/75 px-3 py-1.5 text-sm font-semibold text-slate-700 transition hover:border-slate-500/60 hover:bg-white"
            >
              Поиск
            </Link>
            <Link
              href="/admin/"
              className="rounded-xl border border-slate-300/70 bg-white/75 px-3 py-1.5 text-sm font-semibold text-slate-700 transition hover:border-slate-500/60 hover:bg-white"
            >
              /admin
            </Link>
            <button
              type="button"
              onClick={toggleTheme}
              className={cn(
                "rounded-xl border px-3 py-1.5 text-sm font-semibold transition",
                "border-slate-300/70 bg-white/75 text-slate-700 hover:border-slate-500/60 hover:bg-white"
              )}
            >
              {dark ? "Светлая" : "Тёмная"}
            </button>
          </div>
        </div>
        <nav className="mt-3 flex flex-wrap gap-2">
          {FIRST_MENU.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full border border-[#efb8d2] bg-[#ffeefa] px-4 py-1.5 text-sm font-semibold text-[#9f2f73] transition hover:border-[#e78ac2] hover:bg-[#ffe2f4]"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <nav className="mt-2.5 flex flex-wrap gap-2">
          {SECOND_MENU.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full border border-slate-200 bg-white/75 px-4 py-1.5 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
