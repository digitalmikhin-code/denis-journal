import type { Metadata } from "next";
import { SearchClient } from "@/components/search-client";
import { getSearchIndex } from "@/lib/search-engine";

export const metadata: Metadata = {
  title: "Поисковый центр",
  description: "Интеллектуальный поиск по статьям, программам, навыкам, рабочим задачам и карьерным маршрутам.",
  robots: {
    index: false,
    follow: true
  },
  alternates: {
    canonical: "/search"
  }
};

export default function SearchPage(): JSX.Element {
  const items = getSearchIndex();

  return (
    <div className="space-y-8">
      <header className="relative overflow-hidden border border-slate-200 bg-white p-6 shadow-[0_24px_70px_rgba(9,22,43,0.08)] dark:border-slate-800 dark:bg-slate-900 md:p-8">
        <div className="pointer-events-none absolute inset-0 ambient-grid opacity-50" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-24 w-40 bg-brand/95 [clip-path:polygon(44%_0,100%_0,100%_100%,0_100%)]" />
        <div className="relative max-w-4xl space-y-4">
        <p className="border-l-4 border-brand pl-3 text-xs font-black uppercase tracking-[0.18em] text-brand">Поисковый центр</p>
        <h1 className="text-4xl font-black leading-tight tracking-tight text-slate-950 dark:text-white md:text-6xl">Найдите решение рабочей задачи</h1>
        <p className="max-w-reading text-base leading-8 text-slate-650 dark:text-slate-300">
          Единый поиск объединяет статьи, программы, навыки, рабочие задачи и карьерные маршруты. Он ищет не только
          точные слова, но и смысл запроса.
        </p>
        </div>
      </header>
      <SearchClient items={items} />
    </div>
  );
}
