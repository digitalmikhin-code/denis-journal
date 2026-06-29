"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  getSearchSuggestions,
  type SearchItem
} from "@/lib/search-shared";
import {
  MINI_APP_FOCUSES,
  MINI_APP_LEVELS,
  MINI_APP_ROLES,
  type MiniAppFocus,
  type MiniAppLevel,
  type MiniAppProgramPick,
  type MiniAppRole,
  type TelegramMiniAppSnapshot
} from "@/lib/telegram-mini-app-shared";
import { cn } from "@/lib/utils";

type TelegramMiniAppClientProps = {
  snapshot: TelegramMiniAppSnapshot;
  initialPick: MiniAppProgramPick;
};

type MiniAppView = "home" | "picker" | "solutions" | "continue" | "search" | "career-paths" | "programs" | "favorites";

type TelegramWebApp = {
  ready?: () => void;
  expand?: () => void;
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

export function TelegramMiniAppClient({
  snapshot,
  initialPick
}: TelegramMiniAppClientProps): JSX.Element {
  const [view, setView] = useState<MiniAppView>("home");
  const [role, setRole] = useState<MiniAppRole>("manager");
  const [focus, setFocus] = useState<MiniAppFocus>("management");
  const [level, setLevel] = useState<MiniAppLevel>("beginner");
  const [query, setQuery] = useState("");
  const [selectedSolution, setSelectedSolution] = useState(snapshot.solutions[0]);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [userName, setUserName] = useState("гость");
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    const telegram = window.Telegram?.WebApp;
    telegram?.ready?.();
    telegram?.expand?.();

    const telegramUser = telegram?.initDataUnsafe?.user;
    const accountSession = readJson<{ name?: string }>(ACCOUNT_SESSION_KEY);
    setIsAuthorized(Boolean(telegramUser || accountSession));
    setUserName(telegramUser?.first_name || accountSession?.name || "гость");
    const favorites = readJson<Array<{ id: string }>>(FAVORITES_KEY) ?? [];
    setFavoriteIds(new Set(favorites.map((item) => item.id)));
  }, []);

  const searchResults = useMemo(
    () => (query.trim() ? getSearchSuggestions(snapshot.searchItems, query, 8) : []),
    [query, snapshot.searchItems]
  );

  const programPick = useMemo(
    () => pickProgramFromSnapshot(snapshot, initialPick, role, focus, level),
    [focus, initialPick, level, role, snapshot]
  );

  return (
    <div className="mx-auto min-h-[calc(100vh-4rem)] max-w-[520px] space-y-4 rounded-[2rem] bg-slate-950 p-3 text-white shadow-[0_24px_80px_rgba(15,23,42,0.28)]">
      <header className="rounded-[1.7rem] bg-gradient-to-br from-[#2AABEE] to-[#1788D4] p-5">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-white/75">Telegram Mini App</p>
        <h1 className="mt-2 text-3xl font-black leading-tight">Навигатор развития</h1>
        <p className="mt-2 text-sm font-semibold leading-6 text-white/85">
          Привет, {userName}. Что хотите сделать сегодня?
        </p>
      </header>

      <nav className="grid grid-cols-4 gap-2">
        <TabButton active={view === "home"} onClick={() => setView("home")} label="Главная" />
        <TabButton active={view === "search"} onClick={() => setView("search")} label="Поиск" />
        <TabButton active={view === "programs"} onClick={() => setView("programs")} label="Курсы" />
        <TabButton active={view === "favorites"} onClick={() => setView("favorites")} label="Избранное" />
      </nav>

      {view === "home" ? (
        <HomeView
          snapshot={snapshot}
          isAuthorized={isAuthorized}
          onOpen={setView}
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
      {view === "continue" ? (
        <ContinueView snapshot={snapshot} isAuthorized={isAuthorized} />
      ) : null}
      {view === "search" ? (
        <SearchView query={query} setQuery={setQuery} results={searchResults} />
      ) : null}
      {view === "career-paths" ? <CareerPathsView snapshot={snapshot} /> : null}
      {view === "programs" ? <ProgramsView snapshot={snapshot} /> : null}
      {view === "favorites" ? (
        <FavoritesView snapshot={snapshot} isAuthorized={isAuthorized} favoriteIds={favoriteIds} />
      ) : null}

      <footer className="rounded-[1.5rem] bg-white/5 p-4 text-center text-xs font-bold text-white/45">
        Mini App использует Search Engine, Recommendation Engine и API личного кабинета сайта.
      </footer>
    </div>
  );
}

function HomeView({
  snapshot,
  isAuthorized,
  onOpen
}: {
  snapshot: TelegramMiniAppSnapshot;
  isAuthorized: boolean;
  onOpen: (view: MiniAppView) => void;
}): JSX.Element {
  return (
    <section className="grid gap-3">
      {snapshot.homeActions.map((action) => {
        if (action.id === "continue" && !isAuthorized) return null;
        const view = mapActionToView(action.id);
        return (
          <button
            key={action.id}
            type="button"
            onClick={() => {
              if (view) onOpen(view);
              if (action.id === "site") window.location.href = "/";
            }}
            className="rounded-[1.5rem] bg-white p-4 text-left text-slate-950 transition active:scale-[0.98]"
          >
            <span className="block text-lg font-black">{action.title}</span>
            <span className="mt-1 block text-sm font-bold text-slate-500">{action.description}</span>
          </button>
        );
      })}
      <MiniRecommendation recommendation={snapshot.recommendation} />
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
      <ChoiceGroup title="Что хотите улучшить?" value={focus} options={MINI_APP_FOCUSES} onChange={(value) => setFocus(value as MiniAppFocus)} />
      <ChoiceGroup title="Какой уровень?" value={level} options={MINI_APP_LEVELS} onChange={(value) => setLevel(value as MiniAppLevel)} />
      <div className="rounded-[1.5rem] bg-white p-4 text-slate-950">
        <p className="text-xs font-black uppercase tracking-[0.16em] text-[#1788D4]">Рекомендация</p>
        <h2 className="mt-2 text-xl font-black">{pick.program.title}</h2>
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
              "rounded-[1.25rem] p-4 text-left font-black transition active:scale-[0.98]",
              selectedSlug === solution.slug ? "bg-[#2AABEE] text-white" : "bg-white text-slate-950"
            )}
          >
            {solution.title}
          </button>
        ))}
      </div>
      <div className="rounded-[1.5rem] bg-white p-4 text-slate-950">
        <h2 className="text-xl font-black">{selectedSolution.title}</h2>
        <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">{selectedSolution.description}</p>
        <MiniLink href={selectedSolution.href} label="Открыть подробное решение на сайте" />
      </div>
    </section>
  );
}

function ContinueView({
  snapshot,
  isAuthorized
}: {
  snapshot: TelegramMiniAppSnapshot;
  isAuthorized: boolean;
}): JSX.Element {
  if (!isAuthorized) {
    return (
      <section className="rounded-[1.5rem] bg-white p-5 text-slate-950">
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

function SearchView({
  query,
  setQuery,
  results
}: {
  query: string;
  setQuery: (query: string) => void;
  results: SearchItem[];
}): JSX.Element {
  return (
    <section className="space-y-3">
      <input
        value={query}
        type="search"
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Поиск по статьям, программам, навыкам"
        className="w-full rounded-[1.5rem] border-0 bg-white px-4 py-4 text-base font-black text-slate-950 outline-none"
      />
      <div className="grid gap-2">
        {results.map((item) => (
          <Link key={item.id} href={item.href} className="rounded-[1.25rem] bg-white p-4 text-slate-950">
            <span className="text-xs font-black uppercase tracking-[0.14em] text-[#1788D4]">{item.label}</span>
            <span className="mt-1 block text-lg font-black">{item.title}</span>
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
        <div key={path.slug} className="rounded-[1.5rem] bg-white p-4 text-slate-950">
          <h2 className="text-xl font-black">{path.title}</h2>
          <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">{path.description}</p>
          <p className="mt-3 text-xs font-black text-slate-400">
            {path.stagesCount} этапа · {path.programsCount} программ
          </p>
          <MiniLink href={path.href} label="Открыть маршрут на сайте" />
        </div>
      ))}
    </section>
  );
}

function ProgramsView({ snapshot }: { snapshot: TelegramMiniAppSnapshot }): JSX.Element {
  return (
    <section className="grid gap-3">
      {snapshot.programs.slice(0, 12).map((program) => (
        <div key={program.id} className="rounded-[1.5rem] bg-white p-4 text-slate-950">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-[#1788D4]">{program.level}</p>
          <h2 className="mt-1 text-xl font-black">{program.title}</h2>
          <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">{program.result}</p>
          <MiniLink href={program.href} label="Начать обучение" />
        </div>
      ))}
    </section>
  );
}

function FavoritesView({
  snapshot,
  isAuthorized,
  favoriteIds
}: {
  snapshot: TelegramMiniAppSnapshot;
  isAuthorized: boolean;
  favoriteIds: Set<string>;
}): JSX.Element {
  if (!isAuthorized) {
    return (
      <section className="rounded-[1.5rem] bg-white p-5 text-slate-950">
        <h2 className="text-xl font-black">Избранное доступно после входа</h2>
        <p className="mt-2 text-sm font-semibold text-slate-500">Данные берутся из API личного кабинета.</p>
      </section>
    );
  }

  const favorites = snapshot.searchItems.filter((item) => favoriteIds.has(item.id));

  return (
    <section className="grid gap-3">
      {(favorites.length > 0 ? favorites : snapshot.account.favoriteCandidates.slice(0, 5)).map((item) => (
        <Link key={item.id} href={item.href} className="rounded-[1.25rem] bg-white p-4 text-slate-950">
          <span className="text-xs font-black uppercase tracking-[0.14em] text-[#1788D4]">{item.label}</span>
          <span className="mt-1 block text-lg font-black">{item.title}</span>
        </Link>
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
    <section className="rounded-[1.5rem] bg-white/8 p-4">
      <p className="text-sm font-black">{title}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => onChange(option.id)}
            className={cn(
              "rounded-full px-3 py-2 text-xs font-black transition",
              value === option.id ? "bg-[#2AABEE] text-white" : "bg-white text-slate-950"
            )}
          >
            {option.label}
          </button>
        ))}
      </div>
    </section>
  );
}

function MiniRecommendation({ recommendation }: { recommendation: TelegramMiniAppSnapshot["recommendation"] }): JSX.Element {
  return (
    <section className="rounded-[1.5rem] bg-white p-4 text-slate-950">
      <p className="text-xs font-black uppercase tracking-[0.16em] text-[#1788D4]">Следующий шаг</p>
      <h2 className="mt-2 text-xl font-black">{recommendation.title}</h2>
      <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">{recommendation.description}</p>
      <MiniLink href={recommendation.href} label={recommendation.ctaLabel} />
    </section>
  );
}

function MiniList({ title, items }: { title: string; items: Array<{ title: string; href: string }> }): JSX.Element {
  return (
    <section className="rounded-[1.5rem] bg-white p-4 text-slate-950">
      <h2 className="text-lg font-black">{title}</h2>
      <div className="mt-3 grid gap-2">
        {items.map((item) => (
          <Link key={item.href} href={item.href} className="rounded-2xl bg-slate-100 p-3 text-sm font-black">
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
        "mt-4 inline-flex w-full justify-center rounded-2xl px-4 py-3 text-center text-sm font-black",
        secondary ? "bg-slate-100 text-slate-800" : "bg-[#2AABEE] text-white"
      )}
    >
      {label}
    </Link>
  );
}

function TabButton({
  active,
  label,
  onClick
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}): JSX.Element {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-2xl px-2 py-2.5 text-xs font-black transition",
        active ? "bg-white text-slate-950" : "bg-white/8 text-white"
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
          level: program.level,
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
