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
    <div className="space-y-7">
      <header className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">Поисковый центр</p>
        <h1 className="text-4xl font-extrabold tracking-tight">Найдите решение рабочей задачи</h1>
        <p className="max-w-reading text-slate-600 dark:text-slate-300">
          Единый поиск объединяет статьи, программы, навыки, рабочие задачи и карьерные маршруты. Он ищет не только
          точные слова, но и смысл запроса.
        </p>
      </header>
      <SearchClient items={items} />
    </div>
  );
}
