export const SITE_NAME = "Журнал Дениса Михина";
export const SITE_DESCRIPTION =
  "Профессиональный журнал о карьере, управлении, мышлении и ИИ.";
export const DEFAULT_AUTHOR = "Денис Михин";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://example.com";
export const TELEGRAM_CHANNEL_URL = "https://t.me/scrum_baza";
export const TELEGRAM_CONSULT_URL = "https://t.me/mikhin89";
export const STEPIK_TEACH_URL = "https://stepik.org/users/861642656/teach";

export const CATEGORY_LABELS = {
  career: "Карьера",
  management: "Управление",
  thinking: "Мышление",
  ai: "ИИ",
  projects: "Проекты",
  cases: "Кейсы"
} as const;

export type Category = keyof typeof CATEGORY_LABELS;

export const CATEGORY_COVER_MAP: Record<Category, string> = {
  career: "/images/covers/category-career.svg",
  management: "/images/covers/category-management.svg",
  thinking: "/images/covers/category-thinking.svg",
  ai: "/images/covers/category-ai.svg",
  projects: "/images/covers/category-projects.svg",
  cases: "/images/covers/category-cases.svg"
};

export const FIRST_MENU: Array<{ label: string; href: string }> = [
  { label: "Карьера", href: "/category/career" },
  { label: "Управление", href: "/category/management" },
  { label: "Мышление", href: "/category/thinking" }
];

export const SECOND_MENU: Array<{ label: string; href: string }> = [
  { label: "Статьи", href: "/articles" },
  { label: "Кейсы", href: "/category/cases" },
  { label: "Проекты", href: "/category/projects" },
  { label: "ИИ", href: "/category/ai" },
  { label: "Обучение", href: "/training" },
  { label: "Обо мне", href: "/about" }
];
