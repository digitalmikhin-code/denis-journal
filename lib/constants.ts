export const SITE_NAME = "Р–СѓСЂРЅР°Р» Р”РµРЅРёСЃР° РњРёС…РёРЅР°";
export const SITE_DESCRIPTION =
  "РџСЂРѕС„РµСЃСЃРёРѕРЅР°Р»СЊРЅС‹Р№ Р¶СѓСЂРЅР°Р» Рѕ РєР°СЂСЊРµСЂРµ, СѓРїСЂР°РІР»РµРЅРёРё, РјС‹С€Р»РµРЅРёРё Рё РР.";
export const DEFAULT_AUTHOR = "Р”РµРЅРёСЃ РњРёС…РёРЅ";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://example.com";
export const TELEGRAM_CHANNEL_URL = "https://t.me/scrum_baza";
export const TELEGRAM_CONSULT_URL = "https://t.me/mikhin89";
export const STEPIK_TEACH_URL = "https://stepik.org/users/861642656/teach";

export const CATEGORY_LABELS = {
  career: "РљР°СЂСЊРµСЂР°",
  management: "РЈРїСЂР°РІР»РµРЅРёРµ Рё РїСЂРѕРµРєС‚С‹",
  thinking: "РЎРёСЃС‚РµРјРЅРѕРµ РјС‹С€Р»РµРЅРёРµ",
  agile: "Agile Рё С‚СЂР°РЅСЃС„РѕСЂРјР°С†РёРё",
  architecture: "РђСЂС…РёС‚РµРєС‚СѓСЂР° СЂРµС€РµРЅРёР№",
  cases: "Р РµР°Р»СЊРЅС‹Рµ РєРµР№СЃС‹",
  ai: "РР РІ СѓРїСЂР°РІР»РµРЅРёРё"
} as const;

export type Category = keyof typeof CATEGORY_LABELS;

export const CATEGORY_COVER_MAP: Record<Category, string> = {
  career: "/images/covers/category-career.svg",
  management: "/images/covers/category-management.svg",
  thinking: "/images/covers/category-thinking.svg",
  agile: "/images/covers/category-agile.svg",
  architecture: "/images/covers/category-architecture.svg",
  ai: "/images/covers/category-ai.svg",
  cases: "/images/covers/category-cases.svg"
};

export const FIRST_MENU: Array<{ label: string; href: string }> = [
  { label: "РљР°СЂСЊРµСЂР°", href: "/category/career" },
  { label: "РЈРїСЂР°РІР»РµРЅРёРµ Рё РїСЂРѕРµРєС‚С‹", href: "/category/management" },
  { label: "РЎРёСЃС‚РµРјРЅРѕРµ РјС‹С€Р»РµРЅРёРµ", href: "/category/thinking" }
];

export const SECOND_MENU: Array<{ label: string; href: string }> = [
  { label: "РЎС‚Р°С‚СЊРё", href: "/articles" },
  { label: "Видео", href: "/videos" },
  { label: "Agile", href: "/category/agile" },
  { label: "РђСЂС…РёС‚РµРєС‚СѓСЂР°", href: "/category/architecture" },
  { label: "РљРµР№СЃС‹", href: "/category/cases" },
  { label: "РР", href: "/category/ai" },
  { label: "РћР±СѓС‡РµРЅРёРµ", href: "/training" },
  { label: "РћР±Рѕ РјРЅРµ", href: "/about" }
];
