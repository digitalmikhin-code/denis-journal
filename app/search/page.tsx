import type { Metadata } from "next";
import { SearchClient } from "@/components/search-client";

export const metadata: Metadata = {
  title: "Поиск",
  description: "Поиск по материалам журнала",
  alternates: {
    canonical: "/search"
  }
};

export default function SearchPage(): JSX.Element {
  return (
    <div className="space-y-6">
      <header className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">Поиск</p>
        <h1 className="text-4xl font-extrabold tracking-tight">Найти материал</h1>
        <p className="max-w-reading text-slate-600 dark:text-slate-300">
          Локальный поиск без внешних сервисов. Индекс собирается при билде.
        </p>
      </header>
      <SearchClient />
    </div>
  );
}

