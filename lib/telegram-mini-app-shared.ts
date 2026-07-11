import type { AccountSnapshot } from "@/lib/account-shared";
import type { RecommendationResult } from "@/lib/recommendations";
import type { SearchItem } from "@/lib/search-shared";

export type MiniAppRole = "manager" | "project-manager" | "product-manager" | "scrum-master" | "specialist";

export type MiniAppFocus = "management" | "ai" | "agile" | "projects" | "career";

export type MiniAppLevel = "beginner" | "middle" | "advanced";

export type MiniAppHomeAction = {
  id: "program-picker" | "solutions" | "continue" | "articles" | "career-paths" | "site";
  title: string;
  description: string;
};

export type MiniAppSolution = {
  slug: string;
  title: string;
  description: string;
  href: string;
};

export type MiniAppCareerPath = {
  slug: string;
  title: string;
  description: string;
  href: string;
  stagesCount: number;
  programsCount: number;
};

export type MiniAppProgram = {
  id: number;
  title: string;
  category: string;
  categoryTitle: string;
  level: string;
  price: string;
  summary: string;
  result: string;
  href: string;
};

export type MiniAppProgramPick = {
  program: MiniAppProgram;
  route: MiniAppCareerPath;
  article: SearchItem;
};

export type TelegramMiniAppSnapshot = {
  homeActions: MiniAppHomeAction[];
  recommendation: RecommendationResult;
  account: AccountSnapshot;
  solutions: MiniAppSolution[];
  careerPaths: MiniAppCareerPath[];
  programs: MiniAppProgram[];
  searchItems: SearchItem[];
  hiddenCapabilities: {
    aiMentorReady: boolean;
  };
};

export const MINI_APP_ROLES: Array<{ id: MiniAppRole; label: string }> = [
  { id: "manager", label: "Руководитель" },
  { id: "project-manager", label: "Project Manager" },
  { id: "product-manager", label: "Product Manager" },
  { id: "scrum-master", label: "Scrum Master" },
  { id: "specialist", label: "Специалист" }
];

export const MINI_APP_FOCUSES: Array<{ id: MiniAppFocus; label: string }> = [
  { id: "management", label: "Управление" },
  { id: "ai", label: "AI" },
  { id: "agile", label: "Agile" },
  { id: "projects", label: "Проекты" },
  { id: "career", label: "Карьеру" }
];

export const MINI_APP_LEVELS: Array<{ id: MiniAppLevel; label: string }> = [
  { id: "beginner", label: "Начинающий" },
  { id: "middle", label: "Средний" },
  { id: "advanced", label: "Продвинутый" }
];
