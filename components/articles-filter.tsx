"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { CATEGORY_LABELS, type Category } from "@/lib/constants";
import { ArticleCard } from "@/components/article-card";
import type { ArticleSummary } from "@/lib/content";
import { normalizeTag } from "@/lib/utils";

type Props = {
  items: ArticleSummary[];
  allTags: string[];
};

export function ArticlesFilter({ items, allTags }: Props): JSX.Element {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<"all" | Category>("all");
  const [tag, setTag] = useState<string>("all");

  const filtered = useMemo(() => {
      const q = query.toLowerCase().trim();
    return items.filter((item) => {
      const byCategory = category === "all" || item.frontmatter.category === category;
      const byTag = tag === "all" || item.frontmatter.tags.includes(tag);
      if (!byCategory || !byTag) {
        return false;
      }
      if (!q) {
        return true;
      }
      const haystack =
        `${item.frontmatter.title} ${item.frontmatter.excerpt} ${item.frontmatter.tags.join(" ")}`.toLowerCase();
      return haystack.includes(q);
    });
  }, [items, query, category, tag]);

  return (
    <section className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900">
        <div className="grid gap-3 md:grid-cols-3">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Поиск по заголовку, тегам, тексту..."
            className="rounded-xl border border-slate-300 px-4 py-2 text-sm outline-none ring-brand/25 focus:ring dark:border-slate-700 dark:bg-slate-950"
          />
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value as "all" | Category)}
            className="rounded-xl border border-slate-300 px-4 py-2 text-sm outline-none ring-brand/25 focus:ring dark:border-slate-700 dark:bg-slate-950"
          >
            <option value="all">Все рубрики</option>
            {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
          <select
            value={tag}
            onChange={(event) => setTag(event.target.value)}
            className="rounded-xl border border-slate-300 px-4 py-2 text-sm outline-none ring-brand/25 focus:ring dark:border-slate-700 dark:bg-slate-950"
          >
            <option value="all">Все теги</option>
            {allTags.map((itemTag) => (
              <option key={itemTag} value={itemTag}>
                #{normalizeTag(itemTag)}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-3 text-sm text-slate-500">
          Найдено: <span className="font-semibold text-slate-700 dark:text-slate-200">{filtered.length}</span>
          {" · "}
          <Link href="/search" className="font-semibold text-brand hover:underline">
            Расширенный поиск
          </Link>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((item) => (
          <ArticleCard key={item.slug} article={item} />
        ))}
      </div>
    </section>
  );
}
