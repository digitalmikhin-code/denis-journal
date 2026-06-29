"use client";

import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import {
  ACCOUNT_SECTIONS,
  type AccountSection,
  type AccountSkillStatus,
  type AccountSnapshot,
  type AuthProviderId
} from "@/lib/account-shared";
import { getSearchSuggestions, type SearchItem } from "@/lib/search-shared";
import { cn } from "@/lib/utils";

type AccountClientProps = {
  snapshot: AccountSnapshot;
  section: AccountSection;
};

type AccountSession = {
  name: string;
  provider: AuthProviderId;
  language: "ru" | "en";
  notifications: boolean;
  photoUrl?: string;
};

type FavoriteItem = {
  id: string;
  type: SearchItem["type"];
  title: string;
  description: string;
  href: string;
  savedAt: string;
};

type ActivityItem = {
  id: string;
  text: string;
  href?: string;
  createdAt: string;
};

const SESSION_KEY = "journal_account_session";
const SKILL_STATUS_KEY = "journal_account_skill_status";
const FAVORITES_KEY = "journal_account_favorites";
const ACTIVITY_KEY = "journal_account_activity";

const skillStatusLabels: Record<AccountSkillStatus, string> = {
  "not-started": "Не изучал",
  "in-progress": "В процессе",
  mastered: "Освоен"
};

export function AccountClient({ snapshot, section }: AccountClientProps): JSX.Element {
  const [session, setSession] = useState<AccountSession | null>(null);
  const [skillStatuses, setSkillStatuses] = useState<Record<string, AccountSkillStatus>>({});
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [activity, setActivity] = useState<ActivityItem[]>([]);
  const [accountSearch, setAccountSearch] = useState("");

  useEffect(() => {
    setSession(readJson<AccountSession>(SESSION_KEY));
    setSkillStatuses(readJson<Record<string, AccountSkillStatus>>(SKILL_STATUS_KEY) ?? {});
    setFavorites(readJson<FavoriteItem[]>(FAVORITES_KEY) ?? []);
    setActivity(readJson<ActivityItem[]>(ACTIVITY_KEY) ?? []);
  }, []);

  const searchResults = useMemo(
    () => (accountSearch.trim() ? getSearchSuggestions(snapshot.searchItems, accountSearch, 5) : []),
    [accountSearch, snapshot.searchItems]
  );

  function signIn(provider: AuthProviderId): void {
    const nextSession: AccountSession = {
      name: provider === "telegram" ? "Пользователь Telegram" : "Пользователь",
      provider,
      language: "ru",
      notifications: true
    };
    setSession(nextSession);
    writeJson(SESSION_KEY, nextSession);
    pushActivity(`Вошёл через ${providerTitle(provider)}`);
  }

  function signOut(): void {
    setSession(null);
    window.localStorage.removeItem(SESSION_KEY);
  }

  function updateSkillStatus(slug: string, status: AccountSkillStatus): void {
    const next = { ...skillStatuses, [slug]: status };
    setSkillStatuses(next);
    writeJson(SKILL_STATUS_KEY, next);
    const skill = snapshot.skills.find((item) => item.slug === slug);
    if (skill) {
      pushActivity(`Изменил статус навыка: ${skill.title} — ${skillStatusLabels[status]}`, `/skills/${slug}`);
    }
  }

  function toggleFavorite(item: SearchItem): void {
    const exists = favorites.some((favorite) => favorite.id === item.id);
    const next = exists
      ? favorites.filter((favorite) => favorite.id !== item.id)
      : [
          {
            id: item.id,
            type: item.type,
            title: item.title,
            description: item.description,
            href: item.href,
            savedAt: new Date().toISOString()
          },
          ...favorites
        ].slice(0, 40);

    setFavorites(next);
    writeJson(FAVORITES_KEY, next);
    pushActivity(exists ? `Убрал из избранного: ${item.title}` : `Добавил в избранное: ${item.title}`, item.href);
  }

  function updateSettings(nextSession: AccountSession): void {
    setSession(nextSession);
    writeJson(SESSION_KEY, nextSession);
    pushActivity("Обновил настройки профиля");
  }

  function pushActivity(text: string, href?: string): void {
    const nextActivity = [
      {
        id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
        text,
        href,
        createdAt: new Date().toISOString()
      },
      ...(readJson<ActivityItem[]>(ACTIVITY_KEY) ?? [])
    ].slice(0, 30);
    setActivity(nextActivity);
    writeJson(ACTIVITY_KEY, nextActivity);
  }

  if (!session) {
    return <AuthGate snapshot={snapshot} onSignIn={signIn} />;
  }

  return (
    <div className="grid gap-7 lg:grid-cols-[260px_1fr]">
      <aside className="space-y-4">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-3">
            <div className="grid size-12 place-items-center rounded-full bg-brand/10 text-lg font-black text-brand">
              {session.name.slice(0, 1).toUpperCase()}
            </div>
            <div>
              <p className="font-black text-slate-950 dark:text-slate-50">{session.name}</p>
              <p className="text-xs font-bold text-slate-400">{providerTitle(session.provider)}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={signOut}
            className="mt-4 w-full rounded-2xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-600 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            Выйти
          </button>
        </div>

        <nav className="grid gap-2 rounded-[2rem] border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900">
          {ACCOUNT_SECTIONS.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={cn(
                "rounded-2xl px-4 py-3 text-sm font-black transition",
                section === item.id
                  ? "bg-slate-950 text-white dark:bg-white dark:text-slate-950"
                  : "text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      <main className="space-y-7">
        <AccountSearch query={accountSearch} setQuery={setAccountSearch} results={searchResults} />
        {section === "dashboard" ? (
          <Dashboard snapshot={snapshot} favorites={favorites} activity={activity} />
        ) : null}
        {section === "route" ? <RouteSection snapshot={snapshot} /> : null}
        {section === "skills" ? (
          <SkillsSection snapshot={snapshot} statuses={skillStatuses} onChange={updateSkillStatus} />
        ) : null}
        {section === "programs" ? <ProgramsSection snapshot={snapshot} /> : null}
        {section === "articles" ? <ArticlesSection snapshot={snapshot} /> : null}
        {section === "favorites" ? (
          <FavoritesSection snapshot={snapshot} favorites={favorites} onToggle={toggleFavorite} />
        ) : null}
        {section === "activity" ? <ActivitySection activity={activity} /> : null}
        {section === "settings" ? (
          <SettingsSection session={session} providers={snapshot.authProviders} onChange={updateSettings} />
        ) : null}
      </main>
    </div>
  );
}

function AuthGate({
  snapshot,
  onSignIn
}: {
  snapshot: AccountSnapshot;
  onSignIn: (provider: AuthProviderId) => void;
}): JSX.Element {
  return (
    <section className="rounded-[2.25rem] border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900 md:p-8">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-brand">Личный кабинет</p>
      <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950 dark:text-slate-50">
        Войдите, чтобы видеть маршрут, прогресс и рекомендации
      </h1>
      <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600 dark:text-slate-300">
        На статическом сайте включён безопасный demo-режим: в браузере хранится только имя, провайдер и настройки.
        Чувствительные данные и токены не сохраняются.
      </p>
      <div className="mt-6 grid gap-3 md:grid-cols-3">
        {snapshot.authProviders.map((provider) => (
          <button
            key={provider.id}
            type="button"
            onClick={() => onSignIn(provider.id)}
            className="rounded-3xl border border-slate-200 p-5 text-left transition hover:-translate-y-0.5 hover:border-brand dark:border-slate-700"
          >
            <span className="text-lg font-black text-slate-950 dark:text-slate-50">{provider.title}</span>
            <span className="mt-2 block text-sm leading-6 text-slate-500 dark:text-slate-400">
              {provider.description}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}

function AccountSearch({
  query,
  setQuery,
  results
}: {
  query: string;
  setQuery: (query: string) => void;
  results: SearchItem[];
}): JSX.Element {
  return (
    <section className="rounded-[2rem] border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
      <label className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">Поиск внутри кабинета</label>
      <input
        value={query}
        type="search"
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Найти статью, программу, навык или задачу"
        className="mt-3 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold outline-none focus:border-brand dark:border-slate-700 dark:bg-slate-950"
      />
      {results.length > 0 ? (
        <div className="mt-3 grid gap-2">
          {results.map((item) => (
            <Link key={item.id} href={item.href} className="rounded-2xl p-3 transition hover:bg-slate-50 dark:hover:bg-slate-800">
              <span className="text-[11px] font-black uppercase tracking-[0.14em] text-brand">{item.label}</span>
              <span className="mt-1 block font-black">{item.title}</span>
            </Link>
          ))}
        </div>
      ) : null}
    </section>
  );
}

function Dashboard({
  snapshot,
  favorites,
  activity
}: {
  snapshot: AccountSnapshot;
  favorites: FavoriteItem[];
  activity: ActivityItem[];
}): JSX.Element {
  return (
    <div className="space-y-7">
      <section className="rounded-[2rem] border border-brand/20 bg-[#fff7fb] p-6 dark:border-brand/30 dark:bg-slate-900">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-brand">Рекомендуемый следующий шаг</p>
        <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 dark:text-slate-50">
          {snapshot.recommendation.title}
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600 dark:text-slate-300">
          {snapshot.recommendation.description}
        </p>
        <Link
          href={snapshot.recommendation.href}
          className="mt-5 inline-flex rounded-2xl bg-slate-950 px-5 py-3 text-sm font-black text-white dark:bg-white dark:text-slate-950"
        >
          {snapshot.recommendation.ctaLabel}
        </Link>
      </section>
      <div className="grid gap-5 md:grid-cols-3">
        <MetricCard title="Текущий маршрут" value={snapshot.currentRoute.title} note={snapshot.currentRoute.currentStage} />
        <MetricCard title="Прогресс развития" value={`${snapshot.currentRoute.progress}%`} note="Можно обновлять вручную" />
        <MetricCard title="Избранное" value={String(favorites.length)} note="Статьи, программы, задачи, навыки" />
      </div>
      <div className="grid gap-5 lg:grid-cols-2">
        <CompactList title="Последние материалы" items={snapshot.recentMaterials.slice(0, 4)} />
        <ActivitySection activity={activity.slice(0, 5)} compact />
      </div>
    </div>
  );
}

function RouteSection({ snapshot }: { snapshot: AccountSnapshot }): JSX.Element {
  return (
    <section className="rounded-[2rem] border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-brand">Мой маршрут</p>
      <h1 className="mt-3 text-3xl font-black tracking-tight">{snapshot.currentRoute.title}</h1>
      <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600 dark:text-slate-300">
        {snapshot.currentRoute.description}
      </p>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <MetricCard title="Текущий этап" value={snapshot.currentRoute.currentStage} note="В работе" />
        <MetricCard title="Завершено" value={snapshot.currentRoute.completedStages.join(", ")} note="Этапы маршрута" />
        <MetricCard title="Следующий этап" value={snapshot.currentRoute.nextStage} note="После текущего шага" />
      </div>
    </section>
  );
}

function SkillsSection({
  snapshot,
  statuses,
  onChange
}: {
  snapshot: AccountSnapshot;
  statuses: Record<string, AccountSkillStatus>;
  onChange: (slug: string, status: AccountSkillStatus) => void;
}): JSX.Element {
  return (
    <section className="space-y-4">
      <SectionTitle title="Мои навыки" text="Статусы пока меняются вручную, но модель готова к автоматизации." />
      <div className="grid gap-4 md:grid-cols-2">
        {snapshot.skills.map((skill) => {
          const status = statuses[skill.slug] ?? skill.recommendedStatus;
          return (
            <article key={skill.slug} className="rounded-[1.5rem] border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
              <h3 className="text-xl font-black">{skill.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{skill.description}</p>
              <select
                value={status}
                onChange={(event) => onChange(skill.slug, event.target.value as AccountSkillStatus)}
                className="mt-4 w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm font-bold dark:border-slate-700 dark:bg-slate-950"
              >
                {Object.entries(skillStatusLabels).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function ProgramsSection({ snapshot }: { snapshot: AccountSnapshot }): JSX.Element {
  return (
    <section className="space-y-4">
      <SectionTitle title="Мои программы" text="Stepik-прогресс пока подготовлен архитектурно, без подключения API." />
      <div className="grid gap-4 md:grid-cols-2">
        {snapshot.programs.map((program) => (
          <MaterialCard
            key={`${program.status}-${program.id}`}
            label={programStatusLabel(program.status)}
            title={program.title}
            description={program.description}
            href={program.href}
            cta="Открыть программу"
          />
        ))}
      </div>
    </section>
  );
}

function ArticlesSection({ snapshot }: { snapshot: AccountSnapshot }): JSX.Element {
  return (
    <section className="space-y-4">
      <SectionTitle title="Мои статьи" text="Недавно прочитанные, избранные и материалы для продолжения чтения." />
      <div className="grid gap-4 md:grid-cols-2">
        {snapshot.articles.map((article) => (
          <MaterialCard
            key={`${article.status}-${article.slug}`}
            label={articleStatusLabel(article.status)}
            title={article.title}
            description={article.description}
            href={article.href}
            cta="Читать"
          />
        ))}
      </div>
    </section>
  );
}

function FavoritesSection({
  snapshot,
  favorites,
  onToggle
}: {
  snapshot: AccountSnapshot;
  favorites: FavoriteItem[];
  onToggle: (item: SearchItem) => void;
}): JSX.Element {
  const favoriteIds = new Set(favorites.map((item) => item.id));

  return (
    <section className="space-y-6">
      <SectionTitle title="Избранное" text="Сохраняйте статьи, программы, рабочие задачи и навыки в одном месте." />
      {favorites.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2">
          {favorites.map((item) => (
            <MaterialCard key={item.id} label={item.type} title={item.title} description={item.description} href={item.href} cta="Открыть" />
          ))}
        </div>
      ) : (
        <p className="rounded-2xl border border-slate-200 bg-white p-5 text-sm font-bold text-slate-500 dark:border-slate-800 dark:bg-slate-900">
          Пока избранного нет. Ниже — быстрые материалы для сохранения.
        </p>
      )}
      <div className="grid gap-4 md:grid-cols-2">
        {snapshot.favoriteCandidates.map((item) => (
          <article key={item.id} className="rounded-[1.5rem] border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <p className="text-xs font-black uppercase tracking-[0.14em] text-brand">{item.label}</p>
            <h3 className="mt-2 text-xl font-black">{item.title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{item.description}</p>
            <button
              type="button"
              onClick={() => onToggle(item)}
              className="mt-4 rounded-2xl border border-slate-200 px-4 py-2.5 text-sm font-black transition hover:border-brand hover:text-brand dark:border-slate-700"
            >
              {favoriteIds.has(item.id) ? "Убрать из избранного" : "Сохранить"}
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

function ActivitySection({ activity, compact = false }: { activity: ActivityItem[]; compact?: boolean }): JSX.Element {
  return (
    <section className="rounded-[2rem] border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
      <SectionTitle title="История активности" text={compact ? "" : "Последние действия пользователя внутри экосистемы."} />
      <div className="mt-4 grid gap-3">
        {activity.length > 0 ? (
          activity.map((item) => (
            <LinkOrSpan
              key={item.id}
              href={item.href}
              className="rounded-2xl border border-slate-200 p-3 text-sm font-bold dark:border-slate-700"
            >
              {item.text}
            </LinkOrSpan>
          ))
        ) : (
          <p className="text-sm font-bold text-slate-500">Активность появится после действий в кабинете.</p>
        )}
      </div>
    </section>
  );
}

function SettingsSection({
  session,
  providers,
  onChange
}: {
  session: AccountSession;
  providers: AccountSnapshot["authProviders"];
  onChange: (session: AccountSession) => void;
}): JSX.Element {
  const [draft, setDraft] = useState(session);

  return (
    <section className="rounded-[2rem] border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
      <SectionTitle title="Настройки пользователя" text="Профиль, язык, уведомления и способ авторизации." />
      <div className="mt-5 grid gap-4">
        <label className="grid gap-2">
          <span className="text-sm font-black">Имя</span>
          <input
            value={draft.name}
            onChange={(event) => setDraft({ ...draft, name: event.target.value })}
            className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold dark:border-slate-700 dark:bg-slate-950"
          />
        </label>
        <label className="grid gap-2">
          <span className="text-sm font-black">Фотография</span>
          <input
            value={draft.photoUrl ?? ""}
            onChange={(event) => setDraft({ ...draft, photoUrl: event.target.value })}
            placeholder="URL фотографии"
            className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold dark:border-slate-700 dark:bg-slate-950"
          />
        </label>
        <div className="grid gap-4 md:grid-cols-3">
          <SelectSetting label="Язык" value={draft.language} options={["ru", "en"]} onChange={(value) => setDraft({ ...draft, language: value as "ru" | "en" })} />
          <SelectSetting label="Авторизация" value={draft.provider} options={providers.map((item) => item.id)} onChange={(value) => setDraft({ ...draft, provider: value as AuthProviderId })} />
          <label className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3 dark:border-slate-700">
            <input
              type="checkbox"
              checked={draft.notifications}
              onChange={(event) => setDraft({ ...draft, notifications: event.target.checked })}
            />
            <span className="text-sm font-black">Уведомления</span>
          </label>
        </div>
        <button
          type="button"
          onClick={() => onChange(draft)}
          className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-black text-white dark:bg-white dark:text-slate-950"
        >
          Сохранить настройки
        </button>
      </div>
    </section>
  );
}

function MetricCard({ title, value, note }: { title: string; value: string; note: string }): JSX.Element {
  return (
    <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
      <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">{title}</p>
      <p className="mt-3 text-2xl font-black leading-tight text-slate-950 dark:text-slate-50">{value}</p>
      <p className="mt-2 text-sm font-bold text-slate-500">{note}</p>
    </div>
  );
}

function CompactList({ title, items }: { title: string; items: SearchItem[] }): JSX.Element {
  return (
    <section className="rounded-[2rem] border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
      <SectionTitle title={title} text="" />
      <div className="mt-4 grid gap-3">
        {items.map((item) => (
          <Link key={item.id} href={item.href} className="rounded-2xl border border-slate-200 p-3 transition hover:border-brand dark:border-slate-700">
            <span className="text-xs font-black uppercase tracking-[0.14em] text-brand">{item.label}</span>
            <span className="mt-1 block font-black">{item.title}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

function MaterialCard({
  label,
  title,
  description,
  href,
  cta
}: {
  label: string;
  title: string;
  description: string;
  href: string;
  cta: string;
}): JSX.Element {
  return (
    <article className="rounded-[1.5rem] border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
      <p className="text-xs font-black uppercase tracking-[0.14em] text-brand">{label}</p>
      <h3 className="mt-2 text-xl font-black">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{description}</p>
      <Link href={href} className="mt-4 inline-flex text-sm font-black text-brand hover:underline">
        {cta} →
      </Link>
    </article>
  );
}

function SectionTitle({ title, text }: { title: string; text: string }): JSX.Element {
  return (
    <div>
      <h2 className="text-2xl font-black tracking-tight text-slate-950 dark:text-slate-50">{title}</h2>
      {text ? <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{text}</p> : null}
    </div>
  );
}

function SelectSetting({
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
    <label className="grid gap-2">
      <span className="text-sm font-black">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold dark:border-slate-700 dark:bg-slate-950"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function LinkOrSpan({
  href,
  className,
  children
}: {
  href?: string;
  className: string;
  children: ReactNode;
}): JSX.Element {
  return href ? (
    <Link href={href} className={className}>
      {children}
    </Link>
  ) : (
    <span className={className}>{children}</span>
  );
}

function readJson<T>(key: string): T | null {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function writeJson<T>(key: string, value: T): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Local storage is optional in this static MVP.
  }
}

function providerTitle(provider: AuthProviderId): string {
  if (provider === "google") return "Google";
  if (provider === "telegram") return "Telegram";
  return "Email";
}

function programStatusLabel(status: "started" | "completed" | "recommended"): string {
  if (status === "started") return "Начата";
  if (status === "completed") return "Завершена";
  return "Рекомендуется";
}

function articleStatusLabel(status: "recent" | "favorite" | "continue"): string {
  if (status === "recent") return "Недавно прочитано";
  if (status === "favorite") return "Избранное";
  return "Продолжить чтение";
}
