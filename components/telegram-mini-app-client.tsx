"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getSearchSuggestions, type SearchItem } from "@/lib/search-shared";
import {
  MINI_APP_FOCUSES,
  MINI_APP_LEVELS,
  MINI_APP_ROLES,
  type MiniAppFocus,
  type MiniAppLevel,
  type MiniAppProgram,
  type MiniAppProgramPick,
  type MiniAppRole,
  type TelegramMiniAppSnapshot
} from "@/lib/telegram-mini-app-shared";
import { cn } from "@/lib/utils";

type TelegramMiniAppClientProps = {
  snapshot: TelegramMiniAppSnapshot;
  initialPick: MiniAppProgramPick;
};

type MiniAppView = "home" | "programs" | "picker" | "search" | "solutions" | "career-paths" | "continue";

type TelegramWebApp = {
  ready?: () => void;
  expand?: () => void;
  setHeaderColor?: (color: string) => void;
  setBackgroundColor?: (color: string) => void;
  openLink?: (url: string) => void;
  HapticFeedback?: {
    impactOccurred?: (style: "light" | "medium" | "heavy") => void;
    selectionChanged?: () => void;
  };
  colorScheme?: "light" | "dark";
  initDataUnsafe?: {
    user?: {
      id?: number;
      first_name?: string;
      username?: string;
    };
  };
};

declare global {
  interface Window {
    Telegram?: {
      WebApp?: TelegramWebApp;
    };
  }
}

const ACCOUNT_SESSION_KEY = "journal_account_session";
const FAVORITES_KEY = "journal_account_favorites";

export function TelegramMiniAppClient({ snapshot, initialPick }: TelegramMiniAppClientProps): JSX.Element {
  const [view, setView] = useState<MiniAppView>("home");
  const [role, setRole] = useState<MiniAppRole>("manager");
  const [focus, setFocus] = useState<MiniAppFocus>("management");
  const [level, setLevel] = useState<MiniAppLevel>("beginner");
  const [query, setQuery] = useState("");
  const [programQuery, setProgramQuery] = useState("");
  const [programCategory, setProgramCategory] = useState("all");
  const [selectedSolution, setSelectedSolution] = useState(snapshot.solutions[0]);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [userName, setUserName] = useState("гость");
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    const telegram = window.Telegram?.WebApp;
    telegram?.ready?.();
    telegram?.expand?.();
    telegram?.setHeaderColor?.("#0b4dba");
    telegram?.setBackgroundColor?.("#f5f7fa");

    const telegramUser = telegram?.initDataUnsafe?.user;
    const accountSession = readJson<{ name?: string }>(ACCOUNT_SESSION_KEY);
    setIsAuthorized(Boolean(telegramUser || accountSession));
    setUserName(telegramUser?.first_name || accountSession?.name || "гость");

    const favorites = readJson<Array<{ id: string }>>(FAVORITES_KEY) ?? [];
    setFavoriteIds(new Set(favorites.map((item) => item.id)));
  }, []);

  const searchResults = useMemo(
    () => (query.trim() ? getSearchSuggestions(snapshot.searchItems, query, 8) : snapshot.searchItems.slice(0, 8)),
    [query, snapshot.searchItems]
  );

  const programCategories = useMemo(() => {
    const categories = new Map<string, string>();
    snapshot.programs.forEach((program) => categories.set(program.category, program.categoryTitle));
    return Array.from(categories, ([id, title]) => ({ id, title }));
  }, [snapshot.programs]);

  const visiblePrograms = useMemo(() => {
    const normalizedQuery = programQuery.trim().toLowerCase();
    return snapshot.programs.filter((program) => {
      const categoryMatches = programCategory === "all" || program.category === programCategory;
      const queryMatches =
        !normalizedQuery ||
        `${program.title} ${program.summary} ${program.result} ${program.categoryTitle}`.toLowerCase().includes(normalizedQuery);
      return categoryMatches && queryMatches;
    });
  }, [programCategory, programQuery, snapshot.programs]);

  const programPick = useMemo(
    () => pickProgramFromSnapshot(snapshot, initialPick, role, focus, level),
    [focus, initialPick, level, role, snapshot]
  );

  function openView(nextView: MiniAppView): void {
    window.Telegram?.WebApp?.HapticFeedback?.selectionChanged?.();
    setView(nextView);
  }

  function openSite(): void {
    const url = "https://media.dmikhin.ru/";
    window.Telegram?.WebApp?.openLink?.(url);
    if (!window.Telegram?.WebApp?.openLink) window.location.href = "/";
  }

  return (
    <div className="mx-auto min-h-screen w-full max-w-[520px] bg-[#f5f7fa] text-slate-950">
      <div className="sticky top-0 z-20 border-b border-slate-200 bg-white/96 px-3 py-3 backdrop-blur">
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <span className="relative size-11 shrink-0 overflow-hidden rounded-full border border-slate-200 bg-slate-950">
              <Image src="/images/denis-mikhin-logo.png" alt="Денис Михин" fill sizes="44px" className="object-cover" priority />
            </span>
            <div className="min-w-0">
              <p className="truncate text-[10px] font-black uppercase text-slate-500">Мини-приложение канала</p>
              <p className="truncate text-base font-black uppercase text-slate-950">Денис Михин</p>
            </div>
          </div>
          <button
            type="button"
            onClick={openSite}
            className="shrink-0 border border-slate-300 bg-white px-3 py-2 text-xs font-black text-slate-800"
          >
            Сайт
          </button>
        </div>
      </div>

      <main className="space-y-3 px-3 py-3">
        <section className="relative overflow-hidden border border-slate-200 bg-white p-4 shadow-[0_18px_44px_rgba(9,22,43,0.06)]">
          <div className="pointer-events-none absolute bottom-0 right-0 h-20 w-32 bg-[linear-gradient(135deg,transparent_0%,transparent_42%,rgba(11,77,186,0.14)_42%,rgba(11,77,186,0.14)_68%,rgba(8,46,115,0.95)_68%)]" />
          <p className="border-l-4 border-brand pl-3 text-[11px] font-black uppercase tracking-[0.16em] text-brand">
            Привет, {userName}
          </p>
          <h1 className="mt-3 max-w-[18rem] text-3xl font-black uppercase leading-[1.02] text-slate-950">
            Курсы, статьи и маршруты
          </h1>
          <p className="mt-3 max-w-[21rem] text-sm font-semibold leading-6 text-slate-600">
            Быстрый вход в экосистему журнала прямо из Telegram: выбрать курс, найти разбор или собрать следующий шаг.
          </p>
          <div className="relative mt-4 grid grid-cols-2 gap-2">
            <button type="button" onClick={() => openView("programs")} className="bg-brand px-4 py-3 text-sm font-black text-white">
              Смотреть курсы
            </button>
            <button type="button" onClick={() => openView("picker")} className="border border-slate-300 bg-white px-4 py-3 text-sm font-black">
              Подобрать
            </button>
          </div>
        </section>

        <nav className="grid grid-cols-4 gap-2">
          <TabButton active={view === "home"} onClick={() => openView("home")} label="Главная" />
          <TabButton active={view === "programs"} onClick={() => openView("programs")} label="Курсы" />
          <TabButton active={view === "picker"} onClick={() => openView("picker")} label="Подбор" />
          <TabButton active={view === "search"} onClick={() => openView("search")} label="Поиск" />
        </nav>

        {view === "home" ? <HomeView snapshot={snapshot} isAuthorized={isAuthorized} onOpen={openView} onOpenSite={openSite} /> : null}
        {view === "programs" ? (
          <ProgramsView
            programs={visiblePrograms}
            categories={programCategories}
            selectedCategory={programCategory}
            query={programQuery}
            setQuery={setProgramQuery}
            setCategory={setProgramCategory}
            totalCount={snapshot.programs.length}
          />
        ) : null}
        {view === "picker" ? (
          <PickerView
            role={role}
            focus={focus}
            level={level}
            pick={programPick}
            setRole={setRole}
            setFocus={setFocus}
            setLevel={setLevel}
          />
        ) : null}
        {view === "solutions" ? (
          <SolutionsView
            solutions={snapshot.solutions}
            selectedSlug={selectedSolution.slug}
            onSelect={(slug) => setSelectedSolution(snapshot.solutions.find((item) => item.slug === slug) ?? snapshot.solutions[0])}
            selectedSolution={selectedSolution}
          />
        ) : null}
        {view === "continue" ? <ContinueView snapshot={snapshot} isAuthorized={isAuthorized} /> : null}
        {view === "career-paths" ? <CareerPathsView snapshot={snapshot} /> : null}
        {view === "search" ? <SearchView query={query} setQuery={setQuery} results={searchResults} /> : null}

        <footer className="border border-slate-200 bg-white p-4 text-center text-xs font-bold text-slate-500">
          Журнал Дениса Михина: управление, карьера, проекты, Agile и ИИ.
        </footer>
      </main>
    </div>
  );
}

function HomeView({
  snapshot,
  isAuthorized,
  onOpen,
  onOpenSite
}: {
  snapshot: TelegramMiniAppSnapshot;
  isAuthorized: boolean;
  onOpen: (view: MiniAppView) => void;
  onOpenSite: () => void;
}): JSX.Element {
  const actions = snapshot.homeActions.filter((action) => action.id !== "site" && (action.id !== "continue" || isAuthorized));

  return (
    <section className="grid gap-3">
      <div className="grid grid-cols-2 gap-2">
        {actions.map((action) => {
          const view = mapActionToView(action.id);
          return (
            <button
              key={action.id}
              type="button"
              onClick={() => view && onOpen(view)}
              className={cn(
                "min-h-[6.25rem] border p-3 text-left transition active:scale-[0.98]",
                action.id === "program-picker" ? "border-brand bg-brand text-white" : "border-slate-200 bg-white text-slate-950"
              )}
            >
              <span className="block text-base font-black leading-tight">{action.title}</span>
              <span className={cn("mt-2 block text-xs font-bold leading-5", action.id === "program-picker" ? "text-white/78" : "text-slate-500")}>
                {action.description}
              </span>
            </button>
          );
        })}
      </div>
      <MiniRecommendation recommendation={snapshot.recommendation} />
      <button type="button" onClick={onOpenSite} className="border border-slate-300 bg-white px-4 py-3 text-sm font-black text-slate-900">
        Открыть полную версию сайта
      </button>
    </section>
  );
}

function ProgramsView({
  programs,
  categories,
  selectedCategory,
  query,
  setQuery,
  setCategory,
  totalCount
}: {
  programs: MiniAppProgram[];
  categories: Array<{ id: string; title: string }>;
  selectedCategory: string;
  query: string;
  setQuery: (query: string) => void;
  setCategory: (category: string) => void;
  totalCount: number;
}): JSX.Element {
  return (
    <section className="space-y-3">
      <div className="border border-slate-200 bg-white p-4">
        <p className="text-[11px] font-black uppercase tracking-[0.16em] text-brand">{totalCount} курсов</p>
        <h2 className="mt-2 text-2xl font-black uppercase leading-tight">Каталог обучения</h2>
        <input
          value={query}
          type="search"
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Найти курс по задаче"
          className="mt-4 w-full border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold outline-none focus:border-brand focus:bg-white"
        />
      </div>
      <div className="no-scrollbar -mx-3 flex gap-2 overflow-x-auto px-3">
        <FilterChip active={selectedCategory === "all"} label="Все" onClick={() => setCategory("all")} />
        {categories.map((category) => (
          <FilterChip
            key={category.id}
            active={selectedCategory === category.id}
            label={category.title}
            onClick={() => setCategory(category.id)}
          />
        ))}
      </div>
      <div className="grid gap-3">
        {programs.map((program) => (
          <article key={program.id} className="border border-slate-200 bg-white p-4">
            <div className="flex items-start justify-between gap-3">
              <p className="text-[11px] font-black uppercase tracking-[0.14em] text-brand">{program.categoryTitle}</p>
              <span className="shrink-0 border border-slate-200 bg-slate-50 px-2 py-1 text-[11px] font-black text-slate-600">
                {program.price}
              </span>
            </div>
            <h3 className="mt-2 text-lg font-black leading-tight">{program.title}</h3>
            <p className="mt-2 line-clamp-3 text-sm font-semibold leading-6 text-slate-600">{program.summary || program.result}</p>
            <MiniLink href={program.href} label="Подробнее о курсе" />
          </article>
        ))}
        {programs.length === 0 ? (
          <div className="border border-slate-200 bg-white p-5 text-sm font-bold text-slate-500">Курсов по этому фильтру не найдено.</div>
        ) : null}
      </div>
    </section>
  );
}

function PickerView({
  role,
  focus,
  level,
  pick,
  setRole,
  setFocus,
  setLevel
}: {
  role: MiniAppRole;
  focus: MiniAppFocus;
  level: MiniAppLevel;
  pick: MiniAppProgramPick;
  setRole: (role: MiniAppRole) => void;
  setFocus: (focus: MiniAppFocus) => void;
  setLevel: (level: MiniAppLevel) => void;
}): JSX.Element {
  return (
    <section className="space-y-3">
      <ChoiceGroup title="Кто вы?" value={role} options={MINI_APP_ROLES} onChange={(value) => setRole(value as MiniAppRole)} />
      <ChoiceGroup title="Что хотите усилить?" value={focus} options={MINI_APP_FOCUSES} onChange={(value) => setFocus(value as MiniAppFocus)} />
      <ChoiceGroup title="Уровень" value={level} options={MINI_APP_LEVELS} onChange={(value) => setLevel(value as MiniAppLevel)} />
      <div className="border border-slate-200 bg-white p-4">
        <p className="text-[11px] font-black uppercase tracking-[0.16em] text-brand">Рекомендация</p>
        <h2 className="mt-2 text-xl font-black leading-tight">{pick.program.title}</h2>
        <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">{pick.program.result}</p>
        <div className="mt-4 grid gap-2">
          <MiniLink href={pick.program.href} label="Открыть программу" />
          <MiniLink href={pick.route.href} label={`Маршрут: ${pick.route.title}`} secondary />
          <MiniLink href={pick.article.href} label={`Статья: ${pick.article.title}`} secondary />
        </div>
      </div>
    </section>
  );
}

function SolutionsView({
  solutions,
  selectedSlug,
  selectedSolution,
  onSelect
}: {
  solutions: TelegramMiniAppSnapshot["solutions"];
  selectedSlug: string;
  selectedSolution: TelegramMiniAppSnapshot["solutions"][number];
  onSelect: (slug: string) => void;
}): JSX.Element {
  return (
    <section className="space-y-3">
      <div className="grid gap-2">
        {solutions.map((solution) => (
          <button
            key={solution.slug}
            type="button"
            onClick={() => onSelect(solution.slug)}
            className={cn(
              "border p-4 text-left font-black transition active:scale-[0.98]",
              selectedSlug === solution.slug ? "border-brand bg-brand text-white" : "border-slate-200 bg-white text-slate-950"
            )}
          >
            {solution.title}
          </button>
        ))}
      </div>
      <div className="border border-slate-200 bg-white p-4">
        <h2 className="text-xl font-black">{selectedSolution.title}</h2>
        <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">{selectedSolution.description}</p>
        <MiniLink href={selectedSolution.href} label="Открыть решение" />
      </div>
    </section>
  );
}

function ContinueView({ snapshot, isAuthorized }: { snapshot: TelegramMiniAppSnapshot; isAuthorized: boolean }): JSX.Element {
  if (!isAuthorized) {
    return (
      <section className="border border-slate-200 bg-white p-5">
        <h2 className="text-xl font-black">Раздел доступен после входа</h2>
        <p className="mt-2 text-sm font-semibold text-slate-500">Откройте личный кабинет на сайте или войдите через Telegram.</p>
      </section>
    );
  }

  return (
    <section className="space-y-3">
      <MiniRecommendation recommendation={snapshot.recommendation} />
      <MiniList title="Последний маршрут" items={[{ title: snapshot.account.currentRoute.title, href: `/career-paths/${snapshot.account.currentRoute.slug}` }]} />
      <MiniList title="Последние статьи" items={snapshot.account.articles.slice(0, 3).map((item) => ({ title: item.title, href: item.href }))} />
      <MiniList title="Последние программы" items={snapshot.account.programs.slice(0, 3).map((item) => ({ title: item.title, href: item.href }))} />
    </section>
  );
}

function SearchView({ query, setQuery, results }: { query: string; setQuery: (query: string) => void; results: SearchItem[] }): JSX.Element {
  return (
    <section className="space-y-3">
      <input
        value={query}
        type="search"
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Поиск по статьям, курсам, навыкам"
        className="w-full border border-slate-200 bg-white px-4 py-4 text-base font-black text-slate-950 outline-none focus:border-brand"
      />
      <div className="grid gap-2">
        {results.map((item) => (
          <Link key={item.id} href={item.href} className="border border-slate-200 bg-white p-4">
            <span className="text-[11px] font-black uppercase tracking-[0.14em] text-brand">{item.label}</span>
            <span className="mt-1 block text-lg font-black leading-tight">{item.title}</span>
            <span className="mt-2 line-clamp-2 text-sm font-semibold leading-6 text-slate-600">{item.description}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

function CareerPathsView({ snapshot }: { snapshot: TelegramMiniAppSnapshot }): JSX.Element {
  return (
    <section className="grid gap-3">
      {snapshot.careerPaths.map((path) => (
        <div key={path.slug} className="border border-slate-200 bg-white p-4">
          <h2 className="text-xl font-black leading-tight">{path.title}</h2>
          <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">{path.description}</p>
          <p className="mt-3 text-xs font-black uppercase text-slate-400">
            {path.stagesCount} этапа · {path.programsCount} программ
          </p>
          <MiniLink href={path.href} label="Открыть маршрут" />
        </div>
      ))}
    </section>
  );
}

function ChoiceGroup({
  title,
  value,
  options,
  onChange
}: {
  title: string;
  value: string;
  options: Array<{ id: string; label: string }>;
  onChange: (value: string) => void;
}): JSX.Element {
  return (
    <section className="border border-slate-200 bg-white p-4">
      <p className="text-sm font-black">{title}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => onChange(option.id)}
            className={cn(
              "border px-3 py-2 text-xs font-black transition",
              value === option.id ? "border-brand bg-brand text-white" : "border-slate-200 bg-slate-50 text-slate-800"
            )}
          >
            {option.label}
          </button>
        ))}
      </div>
    </section>
  );
}

function FilterChip({ active, label, onClick }: { active: boolean; label: string; onClick: () => void }): JSX.Element {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "shrink-0 border px-3 py-2 text-xs font-black",
        active ? "border-brand bg-brand text-white" : "border-slate-200 bg-white text-slate-700"
      )}
    >
      {label}
    </button>
  );
}

function MiniRecommendation({ recommendation }: { recommendation: TelegramMiniAppSnapshot["recommendation"] }): JSX.Element {
  return (
    <section className="border border-slate-200 bg-white p-4">
      <p className="text-[11px] font-black uppercase tracking-[0.16em] text-brand">Следующий шаг</p>
      <h2 className="mt-2 text-xl font-black leading-tight">{recommendation.title}</h2>
      <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">{recommendation.description}</p>
      <MiniLink href={recommendation.href} label={recommendation.ctaLabel} />
    </section>
  );
}

function MiniList({ title, items }: { title: string; items: Array<{ title: string; href: string }> }): JSX.Element {
  return (
    <section className="border border-slate-200 bg-white p-4">
      <h2 className="text-lg font-black">{title}</h2>
      <div className="mt-3 grid gap-2">
        {items.map((item) => (
          <Link key={item.href} href={item.href} className="bg-slate-100 p-3 text-sm font-black">
            {item.title}
          </Link>
        ))}
      </div>
    </section>
  );
}

function MiniLink({ href, label, secondary = false }: { href: string; label: string; secondary?: boolean }): JSX.Element {
  return (
    <Link
      href={href}
      className={cn(
        "mt-4 inline-flex w-full justify-center px-4 py-3 text-center text-sm font-black",
        secondary ? "border border-slate-200 bg-white text-slate-800" : "bg-brand text-white"
      )}
    >
      {label}
    </Link>
  );
}

function TabButton({ active, label, onClick }: { active: boolean; label: string; onClick: () => void }): JSX.Element {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "border px-2 py-2.5 text-xs font-black transition",
        active ? "border-brand bg-brand text-white" : "border-slate-200 bg-white text-slate-700"
      )}
    >
      {label}
    </button>
  );
}

function mapActionToView(actionId: TelegramMiniAppSnapshot["homeActions"][number]["id"]): MiniAppView | undefined {
  if (actionId === "program-picker") return "picker";
  if (actionId === "articles") return "search";
  if (actionId === "site") return undefined;
  return actionId;
}

function pickProgramFromSnapshot(
  snapshot: TelegramMiniAppSnapshot,
  fallback: MiniAppProgramPick,
  role: MiniAppRole,
  focus: MiniAppFocus,
  level: MiniAppLevel
): MiniAppProgramPick {
  const terms = [role, focus, level].join(" ");
  const searchResults = getSearchSuggestions(snapshot.searchItems, terms, 20);
  const program = searchResults.find((item) => item.type === "program");
  const route = searchResults.find((item) => item.type === "career-path");
  const article = searchResults.find((item) => item.type === "article");

  return {
    program: program
      ? {
          id: Number(program.id.replace("program:", "")),
          title: program.title,
          category: "search",
          categoryTitle: program.label,
          level: program.level,
          price: "Stepik",
          summary: program.description,
          result: program.description,
          href: program.href
        }
      : fallback.program,
    route: route
      ? {
          slug: route.id.replace("career-path:", ""),
          title: route.title,
          description: route.description,
          href: route.href,
          stagesCount: fallback.route.stagesCount,
          programsCount: fallback.route.programsCount
        }
      : fallback.route,
    article: article ?? fallback.article
  };
}

function readJson<T>(key: string): T | null {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}
