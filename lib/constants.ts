export const SITE_NAME = "\u0416\u0443\u0440\u043d\u0430\u043b \u0414\u0435\u043d\u0438\u0441\u0430 \u041c\u0438\u0445\u0438\u043d\u0430";
export const SITE_DESCRIPTION =
  "\u041f\u0440\u043e\u0444\u0435\u0441\u0441\u0438\u043e\u043d\u0430\u043b\u044c\u043d\u044b\u0439 \u0436\u0443\u0440\u043d\u0430\u043b \u043e \u043a\u0430\u0440\u044c\u0435\u0440\u0435, \u0443\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u0438\u0438, \u043c\u044b\u0448\u043b\u0435\u043d\u0438\u0438 \u0438 \u0418\u0418.";
export const DEFAULT_AUTHOR = "\u0414\u0435\u043d\u0438\u0441 \u041c\u0438\u0445\u0438\u043d";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://example.com";
export const TELEGRAM_CHANNEL_URL = "https://t.me/scrum_baza";
export const TELEGRAM_CONSULT_URL = "https://t.me/mikhin89";
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
export const SUBSCRIBERS_API_URL =
  normalizeHttpUrl(process.env.NEXT_PUBLIC_SUBSCRIBERS_API_URL) ?? null;
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
    chip: "border-[#dfbf45] bg-[#f5d45d] text-[#5c3b00]",
    chipSoft: "bg-[#fff6d6] text-[#8b5a00]",
    line: "from-[#f5d45d] to-[#f59e0b]",
    glow: "rgba(245, 212, 93, 0.22)",
    icon: "\u25d0",
    badgeBg: "#f5d45d",
    badgeText: "#5c3b00",
    badgeBorder: "#dfbf45"
  },
  management: {
    chip: "border-[#b98cf2] bg-[#cba4ff] text-[#4e1eb3]",
    chipSoft: "bg-[#f4e9ff] text-[#6d28d9]",
    line: "from-[#b78cf7] to-[#7c3aed]",
    glow: "rgba(183, 140, 247, 0.2)",
    icon: "\u25c6",
    badgeBg: "#cba4ff",
    badgeText: "#4e1eb3",
    badgeBorder: "#b98cf2"
  },
  thinking: {
    chip: "border-[#8fc95d] bg-[#a9e070] text-[#224f18]",
    chipSoft: "bg-[#edfbe3] text-[#2f6a22]",
    line: "from-[#a5e06f] to-[#22c55e]",
    glow: "rgba(165, 224, 111, 0.22)",
    icon: "\u2726",
    badgeBg: "#a9e070",
    badgeText: "#224f18",
    badgeBorder: "#8fc95d"
  },
  agile: {
    chip: "border-[#63bceb] bg-[#7ccfff] text-[#0a4f7b]",
    chipSoft: "bg-[#e9f7ff] text-[#0f5f93]",
    line: "from-[#79c8ff] to-[#0284c7]",
    glow: "rgba(121, 200, 255, 0.24)",
    icon: "\u25c9",
    badgeBg: "#7ccfff",
    badgeText: "#0a4f7b",
    badgeBorder: "#63bceb"
  },
  architecture: {
    chip: "border-[#ef7d86] bg-[#ff9aa2] text-[#7f1610]",
    chipSoft: "bg-[#ffebee] text-[#b42318]",
    line: "from-[#ff8d95] to-[#ef4444]",
    glow: "rgba(255, 141, 149, 0.24)",
    icon: "\u25b2",
    badgeBg: "#ff9aa2",
    badgeText: "#7f1610",
    badgeBorder: "#ef7d86"
  },
  cases: {
    chip: "border-[#8790a1] bg-[#9ba3b3] text-[#17202c]",
    chipSoft: "bg-[#f2f4f7] text-[#263142]",
    line: "from-[#6b7280] to-[#111827]",
    glow: "rgba(107, 114, 128, 0.18)",
    icon: "\u25a0",
    badgeBg: "#9ba3b3",
    badgeText: "#17202c",
    badgeBorder: "#8790a1"
  },
  ai: {
    chip: "border-[#ec9a48] bg-[#ffb267] text-[#7a3a00]",
    chipSoft: "bg-[#fff0df] text-[#9a4d00]",
    line: "from-[#ffb267] to-[#f97316]",
    glow: "rgba(255, 178, 103, 0.24)",
    icon: "\u2b22",
    badgeBg: "#ffb267",
    badgeText: "#7a3a00",
    badgeBorder: "#ec9a48"
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
  { label: "\u0421\u0442\u0430\u0442\u044c\u0438", href: "/articles" },
  { label: "Email \u0440\u0430\u0441\u0441\u044b\u043b\u043a\u0430", href: "/newsletter" },
  { label: "\u0412\u0438\u0434\u0435\u043e", href: "/videos" },
  { label: "\u0414\u0438\u0430\u0433\u043d\u043e\u0441\u0442\u0438\u043a\u0430", href: "/diagnostics" },
  { label: "\u0413\u0438\u0431\u043a\u0438\u0435 \u0442\u0440\u0430\u043d\u0441\u0444\u043e\u0440\u043c\u0430\u0446\u0438\u0438", href: "/category/agile" },
  { label: "\u0410\u0440\u0445\u0438\u0442\u0435\u043a\u0442\u0443\u0440\u0430", href: "/category/architecture" },
  { label: "\u041a\u0435\u0439\u0441\u044b", href: "/category/cases" },
  { label: "\u0418\u0418", href: "/category/ai" },
  { label: "\u041e\u0431\u0443\u0447\u0435\u043d\u0438\u0435", href: "/training" },
  { label: "\u041e\u0431\u043e \u043c\u043d\u0435", href: "/about" }
];
