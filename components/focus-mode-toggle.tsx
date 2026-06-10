"use client";

import { useEffect, useState } from "react";

const FOCUS_CLASS = "article-focus";

export function FocusModeToggle(): JSX.Element {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle(FOCUS_CLASS, enabled);
    return () => document.documentElement.classList.remove(FOCUS_CLASS);
  }, [enabled]);

  return (
    <button
      type="button"
      onClick={() => setEnabled((current) => !current)}
      className={`fixed bottom-5 left-4 z-[90] rounded-full border px-4 py-3 text-sm font-black shadow-[0_16px_34px_rgba(15,23,42,0.18)] transition hover:-translate-y-0.5 md:left-6 ${
        enabled
          ? "border-slate-900 bg-[#f2cf63] text-slate-950"
          : "border-slate-200 bg-white/92 text-slate-900 backdrop-blur dark:border-slate-700 dark:bg-slate-900/92 dark:text-white"
      }`}
      aria-pressed={enabled}
    >
      {enabled ? "Вернуть журнал" : "Читать без шума"}
    </button>
  );
}
