export const SITE_NAME = "\u0416\u0443\u0440\u043d\u0430\u043b \u0414\u0435\u043d\u0438\u0441\u0430 \u041c\u0438\u0445\u0438\u043d\u0430";
export const SITE_DESCRIPTION =
  "\u041f\u0440\u043e\u0444\u0435\u0441\u0441\u0438\u043e\u043d\u0430\u043b\u044c\u043d\u044b\u0439 \u0436\u0443\u0440\u043d\u0430\u043b \u043e \u043a\u0430\u0440\u044c\u0435\u0440\u0435, \u0443\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u0438\u0438, \u043c\u044b\u0448\u043b\u0435\u043d\u0438\u0438 \u0438 \u0418\u0418.";
export const DEFAULT_AUTHOR = "\u0414\u0435\u043d\u0438\u0441 \u041c\u0438\u0445\u0438\u043d";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://media.dmikhin.ru";
export const TELEGRAM_CHANNEL_URL = "https://t.me/scrum_baza";
export const TELEGRAM_CONSULT_URL = "https://t.me/mikhin89";
export const VK_PROFILE_URL = "https://vk.com/mikhin_denis";
export const MAX_CHANNEL_URL = "https://max.ru/join/6nJj0ylh1KaJhZ4d0rjOY8uiCRv3nKAW9-KrBDQC6I0";
export const STEPIK_TEACH_URL = "https://stepik.org/users/861642656/teach";
const DEFAULT_REACTIONS_API_URL = "https://functions.yandexcloud.net/d4elvqt2bon45f1r7i6k";

function normalizeHttpUrl(value: string | undefined): string | null {
  if (!value) return null;
  try {
    const url = new URL(value.trim());
    if (url.protocol !== "http:" && url.protocol !== "https:") return null;
    return value.replace(/\/+$/, "");
  } catch {
    return null;
  }
}

export const REACTIONS_API_URL =
  normalizeHttpUrl(process.env.NEXT_PUBLIC_REACTIONS_API_URL) ?? DEFAULT_REACTIONS_API_URL;
const DEFAULT_SUBSCRIBERS_API_URL =
  "https://functions.yandexcloud.net/d4efmjusqpajbpmg5ckl";
export const SUBSCRIBERS_API_URL =
  normalizeHttpUrl(process.env.NEXT_PUBLIC_SUBSCRIBERS_API_URL) ?? DEFAULT_SUBSCRIBERS_API_URL;
const DEFAULT_LEADS_API_URL = "https://functions.yandexcloud.net/d4ef7l7v9bcnl566u2eg";
export const LEADS_API_URL =
  normalizeHttpUrl(process.env.NEXT_PUBLIC_LEADS_API_URL) ?? DEFAULT_LEADS_API_URL;
export const YANDEX_METRIKA_ID = 107246735;

export const CATEGORY_LABELS = {
  career: "\u041a\u0430\u0440\u044c\u0435\u0440\u0430",
  management: "\u0423\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u0438\u0435 \u0438 \u043f\u0440\u043e\u0435\u043a\u0442\u044b",
  thinking: "\u0421\u0438\u0441\u0442\u0435\u043c\u043d\u043e\u0435 \u043c\u044b\u0448\u043b\u0435\u043d\u0438\u0435",
  agile: "\u0413\u0438\u0431\u043a\u0438\u0435 \u0442\u0440\u0430\u043d\u0441\u0444\u043e\u0440\u043c\u0430\u0446\u0438\u0438",
  architecture: "\u0410\u0440\u0445\u0438\u0442\u0435\u043a\u0442\u0443\u0440\u0430 \u0440\u0435\u0448\u0435\u043d\u0438\u0439",
  cases: "\u0420\u0435\u0430\u043b\u044c\u043d\u044b\u0435 \u043a\u0435\u0439\u0441\u044b",
  ai: "\u0418\u0418 \u0432 \u0443\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u0438\u0438"
} as const;

export type Category = keyof typeof CATEGORY_LABELS;

export const CATEGORY_SHORT_LABELS: Record<Category, string> = {
  career: "\u041a\u0430\u0440\u044c\u0435\u0440\u0430",
  management: "\u0423\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u0438\u0435",
  thinking: "\u041c\u044b\u0448\u043b\u0435\u043d\u0438\u0435",
  agile: "\u0422\u0440\u0430\u043d\u0441\u0444\u043e\u0440\u043c\u0430\u0446\u0438\u044f",
  architecture: "\u0410\u0440\u0445\u0438\u0442\u0435\u043a\u0442\u0443\u0440\u0430",
  cases: "\u041a\u0435\u0439\u0441\u044b",
  ai: "\u0418\u0418"
};

export const CATEGORY_THEME: Record<
  Category,
  {
    chip: string;
    chipSoft: string;
    line: string;
    glow: string;
    icon: string;
    badgeBg: string;
    badgeText: string;
    badgeBorder: string;
  }
> = {
  career: {
    chip: "border-[#c8d5e8] bg-[#eef3fa] text-[#17365f]",
    chipSoft: "bg-[#f5f8fc] text-[#17365f]",
    line: "from-[#0b4dba] to-[#082e73]",
    glow: "rgba(8, 46, 115, 0.16)",
    icon: "\u25d0",
    badgeBg: "#eef3fa",
    badgeText: "#17365f",
    badgeBorder: "#c8d5e8"
  },
  management: {
    chip: "border-[#b9d8cf] bg-[#edf8f4] text-[#11614d]",
    chipSoft: "bg-[#f2faf7] text-[#11614d]",
    line: "from-[#11614d] to-[#1f8a70]",
    glow: "rgba(17, 97, 77, 0.16)",
    icon: "\u25c6",
    badgeBg: "#edf8f4",
    badgeText: "#11614d",
    badgeBorder: "#b9d8cf"
  },
  thinking: {
    chip: "border-[#d3d8df] bg-[#f6f7f9] text-[#111827]",
    chipSoft: "bg-[#f6f7f9] text-[#111827]",
    line: "from-[#111827] to-[#374151]",
    glow: "rgba(17, 24, 39, 0.12)",
    icon: "\u2726",
    badgeBg: "#f6f7f9",
    badgeText: "#111827",
    badgeBorder: "#d3d8df"
  },
  agile: {
    chip: "border-[#bfd4e8] bg-[#eff6fb] text-[#0f4f76]",
    chipSoft: "bg-[#f4f9fc] text-[#0f4f76]",
    line: "from-[#0f4f76] to-[#2f7fa9]",
    glow: "rgba(15, 79, 118, 0.15)",
    icon: "\u25c9",
    badgeBg: "#eff6fb",
    badgeText: "#0f4f76",
    badgeBorder: "#bfd4e8"
  },
  architecture: {
    chip: "border-[#bfc7d2] bg-[#f2f5f8] text-[#1f2a3a]",
    chipSoft: "bg-[#f7f9fb] text-[#1f2a3a]",
    line: "from-[#1f2a3a] to-[#0b4dba]",
    glow: "rgba(31, 42, 58, 0.14)",
    icon: "\u25b2",
    badgeBg: "#f2f5f8",
    badgeText: "#1f2a3a",
    badgeBorder: "#bfc7d2"
  },
  cases: {
    chip: "border-[#cad0d8] bg-[#f4f6f8] text-[#263142]",
    chipSoft: "bg-[#f4f6f8] text-[#263142]",
    line: "from-[#263142] to-[#111827]",
    glow: "rgba(38, 49, 66, 0.12)",
    icon: "\u25a0",
    badgeBg: "#f4f6f8",
    badgeText: "#263142",
    badgeBorder: "#cad0d8"
  },
  ai: {
    chip: "border-[#b5c7e7] bg-[#edf4ff] text-[#08377f]",
    chipSoft: "bg-[#f1f6ff] text-[#08377f]",
    line: "from-[#08377f] to-[#0b4dba]",
    glow: "rgba(8, 55, 127, 0.16)",
    icon: "\u2b22",
    badgeBg: "#edf4ff",
    badgeText: "#08377f",
    badgeBorder: "#b5c7e7"
  }
};

export const CATEGORY_COVER_MAP: Record<Category, string> = {
  career: "/images/covers/category-career-v2.svg",
  management: "/images/covers/category-management-v2.svg",
  thinking: "/images/covers/category-thinking-v2.svg",
  agile: "/images/covers/category-agile-v2.svg",
  architecture: "/images/covers/category-architecture-v2.svg",
  ai: "/images/covers/category-ai-v2.svg",
  cases: "/images/covers/category-cases-v2.svg"
};

export const FIRST_MENU: Array<{ label: string; href: string }> = [
  { label: "\u041a\u0430\u0440\u044c\u0435\u0440\u0430", href: "/category/career" },
  {
    label: "\u0423\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u0438\u0435 \u0438 \u043f\u0440\u043e\u0435\u043a\u0442\u044b",
    href: "/category/management"
  },
  { label: "\u0421\u0438\u0441\u0442\u0435\u043c\u043d\u043e\u0435 \u043c\u044b\u0448\u043b\u0435\u043d\u0438\u0435", href: "/category/thinking" }
];

export const SECOND_MENU: Array<{ label: string; href: string }> = [
  { label: "\u0421 \u0447\u0435\u0433\u043e \u043d\u0430\u0447\u0430\u0442\u044c", href: "/start" },
  { label: "\u0421\u0442\u0430\u0442\u044c\u0438", href: "/articles" },
  { label: "Карьерные маршруты", href: "/career-paths" },
  { label: "Рабочие задачи", href: "/solutions" },
  { label: "Навыки", href: "/skills" },
  { label: "\u0425\u0430\u0431\u044b", href: "/hubs" },
  { label: "Инструменты", href: "/tools" },
  { label: "Практика изменений", href: "/practice" },
  { label: "\u0418\u0433\u0440\u0430", href: "/business-game" },
  { label: "\u041a\u0430\u043d\u0430\u043b \u0432 Max", href: MAX_CHANNEL_URL },
  { label: "\u0412\u0438\u0434\u0435\u043e", href: "/videos" },
  { label: "\u0414\u0438\u0430\u0433\u043d\u043e\u0441\u0442\u0438\u043a\u0430", href: "/diagnostics" },
  { label: "Зрелость руководителя", href: "/diagnostics/management-maturity-index" },
  { label: "\u0413\u0438\u0431\u043a\u0438\u0435 \u0442\u0440\u0430\u043d\u0441\u0444\u043e\u0440\u043c\u0430\u0446\u0438\u0438", href: "/category/agile" },
  { label: "\u0410\u0440\u0445\u0438\u0442\u0435\u043a\u0442\u0443\u0440\u0430", href: "/category/architecture" },
  { label: "\u041a\u0435\u0439\u0441\u044b", href: "/category/cases" },
  { label: "\u0418\u0418", href: "/category/ai" },
  { label: "Курсы", href: "/training" },
  { label: "Консалтинг", href: "/consulting" },
  { label: "\u041e\u0431\u043e \u043c\u043d\u0435", href: "/about" }
];

