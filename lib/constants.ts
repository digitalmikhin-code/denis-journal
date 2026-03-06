export const SITE_NAME = "Журнал Дениса Михина";
export const SITE_DESCRIPTION =
  "Профессиональный журнал о карьере, управлении, мышлении и ИИ.";
export const DEFAULT_AUTHOR = "Денис Михин";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://example.com";

export const CATEGORY_LABELS = {
  career: "Карьера",
  management: "Управление",
  thinking: "Мышление",
  ai: "ИИ",
  projects: "Проекты",
  cases: "Кейсы"
} as const;

export type Category = keyof typeof CATEGORY_LABELS;

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
