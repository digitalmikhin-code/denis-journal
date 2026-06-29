"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { saveRecentQuery } from "@/components/global-search";
import {
  getSearchFacets,
  groupSearchResults,
  POPULAR_SEARCH_QUERIES,
  searchItems,
  SEARCH_TYPE_LABELS,
  SEARCH_TYPE_ORDER,
  type SearchFilters,
  type SearchItem,
  type SearchItemType,
  type SearchResult
} from "@/lib/search-shared";
import { cn } from "@/lib/utils";

type SearchClientProps = {
  items: SearchItem[];
  initialQuery?: string;
};

const typeOptions: Array<SearchItemType | "all"> = ["all", ...SEARCH_TYPE_ORDER];

export function SearchClient({ items, initialQuery = "" }: SearchClientProps): JSX.Element {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);
  const [filters, setFilters] = useState<SearchFilters>({ type: "all" });
  const [recentQueries, setRecentQueries] = useState<string[]>([]);

  useEffect(() => {
    setRecentQueries(readRecentQueries());
    if (initialQuery) return;

    const params = new URLSearchParams(window.location.search);
    const urlQuery = params.get("q");
    if (urlQuery) {
      setQuery(urlQuery);
    }
  }, [initialQuery]);

  const facets = useMemo(() => getSearchFacets(items), [items]);
  const results = useMemo(() => searchItems(items, query, filters), [filters, items, query]);
  const groups = useMemo(() => groupSearchResults(results), [results]);
  const hasQuery = query.trim().length > 0;
  const recommendation = results[0];

  function submitSearch(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const trimmed = query.trim();
    if (trimmed) {
      saveRecentQuery(trimmed);
      setRecentQueries(readRecentQueries());
      router.replace(`/search?q=${encodeURIComponent(trimmed)}`);
    } else {
      router.replace("/search");
    }
  }

  function updateFilter<Key extends keyof SearchFilters>(key: Key, value: SearchFilters[Key] | ""): void {
    setFilters((current) => ({
      ...current,
      [key]: value || undefined
    }));
  }

  return (
    <section className="space-y-7">
      <form
        onSubmit={submitSearch}
        className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900 md:p-7"
      >
        <label htmlFor="search-center-input" className="text-xs font-black uppercase tracking-[0.18em] text-brand">
          Что хотите решить?
        </label>
        <div className="mt-3 grid gap-3 md:grid-cols-[1fr_auto]">
          <input
            id="search-center-input"
            value={query}
            type="search"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Например: как стать начальником, делегирование, внедрить ИИ"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-base font-bold text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-brand focus:bg-white focus:ring-4 focus:ring-brand/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
          />
          <button
            type="submit"
            className="rounded-2xl bg-slate-950 px-6 py-4 text-sm font-black text-white transition hover:-translate-y-0.5 dark:bg-white dark:text-slate-950"
          >
            Найти
          </button>
        </div>
        {!hasQuery ? (
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {recentQueries.length > 0 ? (
              <QueryBlock title="Последние запросы" queries={recentQueries} onSelect={selectQuery} />
            ) : null}
            <QueryBlock title="Популярные запросы" queries={POPULAR_SEARCH_QUERIES} onSelect={selectQuery} />
          </div>
        ) : null}
      </form>

      <Filters filters={filters} facets={facets} onChange={updateFilter} />

      {recommendation ? <NextStepCard item={recommendation} related={results.slice(1, 4)} /> : null}

      {groups.length > 0 ? (
        <div className="space-y-8">
          {groups.map((group) => (
            <section key={group.type} className="space-y-4">
              <div className="flex items-end justify-between gap-3">
                <h2 className="text-2xl font-black tracking-tight text-slate-950 dark:text-slate-50">{group.title}</h2>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-500 dark:bg-slate-800 dark:text-slate-300">
                  {group.items.length}
                </span>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {group.items.slice(0, 8).map((item) => (
                  <ResultCard key={item.id} item={item} />
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <FallbackResults items={items} />
      )}
    </section>
  );

  function selectQuery(value: string): void {
    setQuery(value);
    saveRecentQuery(value);
    setRecentQueries(readRecentQueries());
    router.replace(`/search?q=${encodeURIComponent(value)}`);
  }
}

function Filters({
  filters,
  facets,
  onChange
}: {
  filters: SearchFilters;
  facets: ReturnType<typeof getSearchFacets>;
  onChange: <Key extends keyof SearchFilters>(key: Key, value: SearchFilters[Key] | "") => void;
}): JSX.Element {
  return (
    <section className="rounded-[2rem] border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">Фильтры без перезагрузки</p>
      <div className="mt-4 grid gap-4 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div className="flex flex-wrap gap-2">
          {typeOptions.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => onChange("type", type)}
              className={cn(
                "rounded-full border px-3 py-2 text-xs font-black transition",
                (filters.type ?? "all") === type
                  ? "border-slate-950 bg-slate-950 text-white dark:border-white dark:bg-white dark:text-slate-950"
                  : "border-slate-200 text-slate-600 hover:border-slate-400 dark:border-slate-700 dark:text-slate-300"
              )}
            >
              {type === "all" ? "Все" : SEARCH_TYPE_LABELS[type]}
            </button>
          ))}
        </div>
        <SelectFilter
          label="Направление"
          value={filters.direction ?? ""}
          options={facets.directions}
          onChange={(value) => onChange("direction", value)}
        />
        <SelectFilter
          label="Уровень"
          value={filters.level ?? ""}
          options={facets.levels}
          onChange={(value) => onChange("level", value)}
        />
        <SelectFilter
          label="Формат"
          value={filters.format ?? ""}
          options={facets.formats}
          onChange={(value) => onChange("format", value)}
        />
      </div>
    </section>
  );
}

function SelectFilter({
  label,
  value,
  options,
  onChange
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}): JSX.Element {
  return (
    <label className="block">
      <span className="text-[11px] font-black uppercase tracking-[0.14em] text-slate-400">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm font-bold text-slate-700 outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
      >
        <option value="">Все</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function NextStepCard({ item, related }: { item: SearchResult; related: SearchResult[] }): JSX.Element {
  return (
    <section className="rounded-[2rem] border border-brand/20 bg-[#fff7fb] p-6 dark:border-brand/30 dark:bg-slate-900">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-brand">Главный следующий шаг</p>
      <div className="mt-4 grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <h2 className="text-3xl font-black tracking-tight text-slate-950 dark:text-slate-50">{item.title}</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600 dark:text-slate-300">{item.description}</p>
        </div>
        <Link
          href={item.href}
          className="rounded-2xl bg-slate-950 px-5 py-3 text-center text-sm font-black text-white transition hover:-translate-y-0.5 dark:bg-white dark:text-slate-950"
        >
          {item.actionLabel}
        </Link>
      </div>
      {related.length > 0 ? (
        <div className="mt-5 flex flex-wrap gap-2">
          {related.map((relatedItem) => (
            <Link
              key={relatedItem.id}
              href={relatedItem.href}
              className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 transition hover:border-brand hover:text-brand dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
            >
              {relatedItem.label}: {relatedItem.title}
            </Link>
          ))}
        </div>
      ) : null}
    </section>
  );
}

function ResultCard({ item }: { item: SearchResult }): JSX.Element {
  return (
    <article className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-soft transition hover:-translate-y-0.5 hover:border-slate-400 dark:border-slate-800 dark:bg-slate-900">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-black uppercase tracking-[0.12em] text-slate-500 dark:bg-slate-800 dark:text-slate-300">
          {item.label}
        </span>
        <span className="text-xs font-bold text-slate-400">{item.direction}</span>
        <span className="text-xs font-bold text-slate-400">•</span>
        <span className="text-xs font-bold text-slate-400">{item.format}</span>
      </div>
      <h3 className="mt-3 text-xl font-black leading-tight tracking-tight text-slate-950 dark:text-slate-50">
        <Link href={item.href} className="hover:text-brand">
          {item.title}
        </Link>
      </h3>
      <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{item.description}</p>
      <Link href={item.href} className="mt-4 inline-flex text-sm font-black text-brand hover:underline">
        {item.actionLabel} →
      </Link>
    </article>
  );
}

function FallbackResults({ items }: { items: SearchItem[] }): JSX.Element {
  const skills = items.filter((item) => item.type === "skill").slice(0, 3);
  const solutions = items.filter((item) => item.type === "solution").slice(0, 3);
  const programs = items.filter((item) => item.type === "program").slice(0, 3);
  const articles = items.filter((item) => item.type === "article").slice(0, 3);

  return (
    <section className="rounded-[2rem] border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">Продолжим без тупика</p>
      <h2 className="mt-3 text-2xl font-black tracking-tight text-slate-950 dark:text-slate-50">
        Точного совпадения нет, но вот близкие точки входа
      </h2>
      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <FallbackList title="Похожие навыки" items={skills} />
        <FallbackList title="Похожие рабочие задачи" items={solutions} />
        <FallbackList title="Популярные программы" items={programs} />
        <FallbackList title="Популярные статьи" items={articles} />
      </div>
    </section>
  );
}

function FallbackList({ title, items }: { title: string; items: SearchItem[] }): JSX.Element {
  return (
    <div>
      <h3 className="text-sm font-black uppercase tracking-[0.16em] text-slate-400">{title}</h3>
      <div className="mt-3 grid gap-2">
        {items.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className="rounded-2xl border border-slate-200 p-3 text-sm font-bold transition hover:border-brand hover:text-brand dark:border-slate-700"
          >
            {item.title}
          </Link>
        ))}
      </div>
    </div>
  );
}

function QueryBlock({
  title,
  queries,
  onSelect
}: {
  title: string;
  queries: string[];
  onSelect: (query: string) => void;
}): JSX.Element {
  return (
    <div>
      <p className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-400">{title}</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {queries.map((item) => (
          <button
            key={item}
            type="button"
            className="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-700 transition hover:border-brand hover:text-brand dark:border-slate-700 dark:text-slate-200"
            onClick={() => onSelect(item)}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}

function readRecentQueries(): string[] {
  try {
    const raw = window.localStorage.getItem("journal_recent_searches");
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.map(String).filter(Boolean).slice(0, 6) : [];
  } catch {
    return [];
  }
}
