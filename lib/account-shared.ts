import type { RecommendationResult } from "@/lib/recommendations";
import type { SearchItem } from "@/lib/search-shared";

export type AuthProviderId = "google" | "telegram" | "email";

export type AccountSection =
  | "dashboard"
  | "route"
  | "skills"
  | "programs"
  | "articles"
  | "favorites"
  | "activity"
  | "settings";

export type AccountSkillStatus = "not-started" | "in-progress" | "mastered";

export type AccountAuthProvider = {
  id: AuthProviderId;
  title: string;
  description: string;
};

export type AccountSnapshot = {
  authProviders: AccountAuthProvider[];
  recommendation: RecommendationResult;
  currentRoute: {
    slug: string;
    title: string;
    description: string;
    currentStage: string;
    completedStages: string[];
    nextStage: string;
    progress: number;
  };
  skills: Array<{
    slug: string;
    title: string;
    description: string;
    recommendedStatus: AccountSkillStatus;
  }>;
  programs: Array<{
    id: number;
    title: string;
    description: string;
    href: string;
    status: "started" | "completed" | "recommended";
  }>;
  articles: Array<{
    slug: string;
    title: string;
    description: string;
    href: string;
    status: "recent" | "favorite" | "continue";
  }>;
  favoriteCandidates: SearchItem[];
  recentMaterials: SearchItem[];
  searchItems: SearchItem[];
};

export const ACCOUNT_SECTIONS: Array<{ id: AccountSection; label: string; href: string }> = [
  { id: "dashboard", label: "Dashboard", href: "/account" },
  { id: "route", label: "Мой маршрут", href: "/account/my-route" },
  { id: "skills", label: "Навыки", href: "/account/skills" },
  { id: "programs", label: "Программы", href: "/account/programs" },
  { id: "articles", label: "Статьи", href: "/account/articles" },
  { id: "favorites", label: "Избранное", href: "/account/favorites" },
  { id: "activity", label: "Активность", href: "/account/activity" },
  { id: "settings", label: "Настройки", href: "/account/settings" }
];

export const ACCOUNT_AUTH_PROVIDERS: AccountAuthProvider[] = [
  {
    id: "google",
    title: "Google",
    description: "Подготовлено для OAuth-входа через Google."
  },
  {
    id: "telegram",
    title: "Telegram",
    description: "Подготовлено для Telegram Login Widget и Mini App."
  },
  {
    id: "email",
    title: "Email",
    description: "Подготовлено для magic-link входа без пароля."
  }
];
