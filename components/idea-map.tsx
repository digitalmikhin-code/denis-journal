"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { CATEGORY_SHORT_LABELS, CATEGORY_THEME, type Category } from "@/lib/constants";
import type { ArticleSummary } from "@/lib/content";

export type IdeaMapNode = {
  id: string;
  label: string;
  shortLabel: string;
  description: string;
  category: Category;
  href: string;
  x: number;
  y: number;
  articles: ArticleSummary[];
};

export type IdeaMapConnection = {
  from: string;
  to: string;
  label: string;
};

type IdeaMapProps = {
  nodes: IdeaMapNode[];
  connections: IdeaMapConnection[];
};

export function IdeaMap({ nodes, connections }: IdeaMapProps): JSX.Element | null {
  const [activeId, setActiveId] = useState(nodes[0]?.id ?? "");

  const nodeById = useMemo(() => new Map(nodes.map((node) => [node.id, node])), [nodes]);
  const activeNode = nodeById.get(activeId) ?? nodes[0];

  if (!activeNode) return null;

  const activeConnectionIds = new Set(
    connections
      .filter((connection) => connection.from === activeNode.id || connection.to === activeNode.id)
      .flatMap((connection) => [connection.from, connection.to])
  );

  return (
    <section className="relative overflow-hidden rounded-[2.5rem] border border-[#19233f] bg-[radial-gradient(circle_at_18%_18%,rgba(125,211,252,0.22),transparent_34%),radial-gradient(circle_at_82%_22%,rgba(242,207,99,0.2),transparent_30%),linear-gradient(135deg,#08111f_0%,#101827_52%,#172033_100%)] p-5 text-white shadow-[0_34px_80px_rgba(15,23,42,0.22)] md:p-8">
      <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:radial-gradient(circle,rgba(255,255,255,0.16)_1px,transparent_1px)] [background-size:28px_28px]" />
      <div className="relative grid gap-7 xl:grid-cols-[1.1fr_0.9fr] xl:items-stretch">
        <div className="min-h-[520px] rounded-[2rem] border border-white/10 bg-slate-950/38 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur md:p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/45">Карта идей</p>
              <h2 className="mt-2 max-w-[13ch] text-3xl font-black leading-[0.98] tracking-tight md:text-5xl">
                Созвездие журнала
              </h2>
            </div>
            <p className="max-w-[34ch] text-sm leading-6 text-white/58">
              Нажмите на тему, чтобы увидеть связанные статьи и соседние направления.
            </p>
          </div>

          <div className="relative mt-6 h-[390px] overflow-hidden rounded-[1.6rem] border border-white/10 bg-slate-950/42">
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" role="img" aria-label="Карта связанных тем журнала">
              <defs>
                <filter id="idea-map-glow" x="-40%" y="-40%" width="180%" height="180%">
                  <feGaussianBlur stdDeviation="2.8" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {connections.map((connection) => {
                const from = nodeById.get(connection.from);
                const to = nodeById.get(connection.to);
                if (!from || !to) return null;

                const isActive = connection.from === activeNode.id || connection.to === activeNode.id;

                return (
                  <g key={`${connection.from}-${connection.to}`}>
                    <line
                      x1={from.x}
                      y1={from.y}
                      x2={to.x}
                      y2={to.y}
                      className={isActive ? "stroke-white/58" : "stroke-white/14"}
                      strokeWidth={isActive ? "0.62" : "0.34"}
                    />
                    {isActive ? (
                      <text
                        x={(from.x + to.x) / 2}
                        y={(from.y + to.y) / 2 - 1.8}
                        textAnchor="middle"
                        className="fill-white/54 text-[2.8px] font-bold uppercase tracking-[0.14em]"
                      >
                        {connection.label}
                      </text>
                    ) : null}
                  </g>
                );
              })}

              {nodes.map((node) => {
                const theme = CATEGORY_THEME[node.category];
                const isActive = node.id === activeNode.id;
                const isConnected = activeConnectionIds.has(node.id);

                return (
                  <g key={node.id} filter={isActive ? "url(#idea-map-glow)" : undefined}>
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={isActive ? 7.7 : isConnected ? 5.9 : 4.7}
                      fill={theme.badgeBg}
                      opacity={isActive ? 1 : isConnected ? 0.86 : 0.58}
                    />
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={isActive ? 12.6 : isConnected ? 9.5 : 7.5}
                      fill="transparent"
                      stroke={theme.badgeBg}
                      strokeWidth={isActive ? 0.58 : 0.3}
                      opacity={isActive ? 0.52 : 0.24}
                    />
                  </g>
                );
              })}
            </svg>

            {nodes.map((node) => {
              const theme = CATEGORY_THEME[node.category];
              const isActive = node.id === activeNode.id;
              const isConnected = activeConnectionIds.has(node.id);

              return (
                <button
                  key={node.id}
                  type="button"
                  onClick={() => setActiveId(node.id)}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full border px-3 py-2 text-xs font-black uppercase tracking-[0.12em] shadow-[0_12px_26px_rgba(0,0,0,0.24)] transition hover:-translate-y-[calc(50%+2px)] ${
                    isActive ? "scale-105" : isConnected ? "opacity-95" : "opacity-72 hover:opacity-100"
                  }`}
                  style={{
                    left: `${node.x}%`,
                    top: `${node.y}%`,
                    backgroundColor: isActive ? theme.badgeBg : "rgba(15,23,42,0.82)",
                    color: isActive ? theme.badgeText : "#ffffff",
                    borderColor: isActive ? theme.badgeBorder : "rgba(255,255,255,0.16)"
                  }}
                >
                  {node.shortLabel}
                </button>
              );
            })}
          </div>
        </div>

        <aside className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur md:p-6">
          <div className="flex flex-wrap items-center gap-3">
            <span
              className="rounded-full border px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.14em]"
              style={{
                backgroundColor: CATEGORY_THEME[activeNode.category].badgeBg,
                color: CATEGORY_THEME[activeNode.category].badgeText,
                borderColor: CATEGORY_THEME[activeNode.category].badgeBorder
              }}
            >
              {CATEGORY_SHORT_LABELS[activeNode.category]}
            </span>
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-white/42">
              {activeNode.articles.length} материала
            </span>
          </div>

          <h3 className="mt-4 text-3xl font-black leading-tight tracking-tight">{activeNode.label}</h3>
          <p className="mt-3 text-base leading-7 text-white/68">{activeNode.description}</p>

          <div className="mt-5 space-y-3">
            {activeNode.articles.slice(0, 4).map((article) => (
              <Link
                key={article.slug}
                href={`/article/${article.slug}`}
                className="block rounded-[1.35rem] border border-white/10 bg-slate-950/46 p-4 transition hover:-translate-y-0.5 hover:border-white/24 hover:bg-slate-900"
              >
                <p className="text-sm font-black leading-5 text-white">{article.frontmatter.title}</p>
                <p className="mt-2 line-clamp-2 text-sm leading-6 text-white/52">{article.frontmatter.excerpt}</p>
              </Link>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href={activeNode.href}
              className="rounded-2xl bg-white px-5 py-3 text-sm font-black text-slate-950 transition hover:-translate-y-0.5 hover:bg-[#f2cf63]"
            >
              Открыть направление
            </Link>
            <button
              type="button"
              onClick={() => {
                const currentIndex = nodes.findIndex((node) => node.id === activeNode.id);
                setActiveId(nodes[(currentIndex + 1) % nodes.length]?.id ?? activeNode.id);
              }}
              className="rounded-2xl border border-white/12 bg-white/[0.06] px-5 py-3 text-sm font-bold text-white/72 transition hover:-translate-y-0.5 hover:bg-white/[0.1] hover:text-white"
            >
              Следующая идея
            </button>
          </div>
        </aside>
      </div>
    </section>
  );
}
