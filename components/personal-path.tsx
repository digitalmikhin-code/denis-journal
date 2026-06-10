"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { CATEGORY_SHORT_LABELS, CATEGORY_THEME, type Category } from "@/lib/constants";
import type { ArticleSummary } from "@/lib/content";
import type { CoursePromo } from "@/lib/course-promos";

const STORAGE_KEY = "journal.personalPath";

export type PersonalPathItem = {
  id: string;
  buttonLabel: string;
  title: string;
  description: string;
  promise: string;
  accentClassName: string;
  glowColor: string;
  href: string;
  topics: string[];
  articles: ArticleSummary[];
  course: CoursePromo;
};

type PersonalPathProps = {
  paths: PersonalPathItem[];
};

export function PersonalPath({ paths }: PersonalPathProps): JSX.Element | null {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    const savedId = window.localStorage.getItem(STORAGE_KEY);
    const hasSavedPath = savedId ? paths.some((path) => path.id === savedId) : false;
    setSelectedId(hasSavedPath ? savedId : paths[0]?.id ?? null);
  }, [paths]);

  const selectedPath = useMemo(
    () => paths.find((path) => path.id === selectedId) ?? paths[0],
    [paths, selectedId]
  );

  if (!selectedPath) return null;

  const handleSelect = (id: string) => {
    setSelectedId(id);
    window.localStorage.setItem(STORAGE_KEY, id);
  };

  return (
    <section className="relative overflow-hidden rounded-[2.5rem] border border-slate-900/10 bg-slate-950 p-5 text-white shadow-[0_34px_80px_rgba(15,23,42,0.18)] md:p-8">
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full blur-3xl"
        style={{ backgroundColor: selectedPath.glowColor }}
      />
      <div className="pointer-events-none absolute -bottom-28 left-8 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
      <div className="relative grid gap-7 xl:grid-cols-[0.82fr_1.18fr]">
        <div className="space-y-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/50">
              Персональная траектория
            </p>
            <h2 className="mt-3 max-w-[13ch] text-3xl font-black leading-[0.98] tracking-tight md:text-5xl">
              Выберите свой путь
            </h2>
            <p className="mt-4 max-w-[48ch] text-base leading-8 text-white/68">
              Сайт запомнит выбор и будет поднимать материалы, курс и темы, которые ближе к вашей задаче.
            </p>
          </div>

          <div className="grid gap-2 sm:grid-cols-2">
            {paths.map((path) => {
              const isActive = path.id === selectedPath.id;

              return (
                <button
                  key={path.id}
                  type="button"
                  onClick={() => handleSelect(path.id)}
                  className={`rounded-[1.35rem] border px-4 py-3 text-left text-sm font-black transition hover:-translate-y-0.5 ${
                    isActive
                      ? `${path.accentClassName} shadow-[0_14px_32px_rgba(255,255,255,0.08)]`
                      : "border-white/10 bg-white/[0.04] text-white/72 hover:border-white/22 hover:bg-white/[0.08]"
                  }`}
                >
                  {path.buttonLabel}
                </button>
              );
            })}
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur md:p-5">
          <div className="grid gap-5 lg:grid-cols-[1fr_0.86fr]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/48">
                Ваш маршрут
              </p>
              <h3 className="mt-2 text-2xl font-black leading-tight tracking-tight md:text-3xl">
                {selectedPath.title}
              </h3>
              <p className="mt-3 text-base leading-7 text-white/72">{selectedPath.description}</p>
              <div className="mt-4 rounded-[1.4rem] border border-white/10 bg-slate-950/55 p-4">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/42">
                  Что получите
                </p>
                <p className="mt-2 text-sm font-semibold leading-6 text-white/82">{selectedPath.promise}</p>
              </div>
            </div>

            <div className="rounded-[1.55rem] border border-white/10 bg-white/[0.07] p-4">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/45">
                Курс под траекторию
              </p>
              <h4 className="mt-2 text-lg font-black leading-tight">{selectedPath.course.title}</h4>
              {selectedPath.course.note ? (
                <p className="mt-2 text-sm leading-6 text-white/65">{selectedPath.course.note}</p>
              ) : null}
              <Link
                href={selectedPath.course.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex rounded-2xl bg-white px-4 py-2.5 text-sm font-black text-slate-950 transition hover:-translate-y-0.5 hover:bg-[#f2cf63]"
              >
                Смотреть курс
              </Link>
            </div>
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {selectedPath.articles.slice(0, 3).map((article) => {
              const category = article.frontmatter.category as Category;
              const theme = CATEGORY_THEME[category];

              return (
                <Link
                  key={article.slug}
                  href={`/article/${article.slug}`}
                  className="group rounded-[1.45rem] border border-white/10 bg-slate-950/50 p-4 transition hover:-translate-y-0.5 hover:border-white/24 hover:bg-slate-900"
                >
                  <span
                    className="inline-flex rounded-full border px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.12em]"
                    style={{
                      backgroundColor: theme.badgeBg,
                      color: theme.badgeText,
                      borderColor: theme.badgeBorder
                    }}
                  >
                    {CATEGORY_SHORT_LABELS[category]}
                  </span>
                  <h4 className="mt-3 text-base font-black leading-tight text-white group-hover:text-[#f2cf63]">
                    {article.frontmatter.title}
                  </h4>
                  <p className="mt-2 line-clamp-3 text-sm leading-6 text-white/55">
                    {article.frontmatter.excerpt}
                  </p>
                </Link>
              );
            })}
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Link
              href={selectedPath.href}
              className="rounded-2xl bg-[#f2cf63] px-5 py-3 text-sm font-black text-slate-950 transition hover:-translate-y-0.5 hover:bg-[#ffe084]"
            >
              Открыть все материалы пути
            </Link>
            {selectedPath.topics.map((topic) => (
              <span
                key={topic}
                className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-2 text-xs font-bold text-white/66"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
