import { YANDEX_METRIKA_ID } from "@/lib/constants";

export type MetrikaParams = Record<string, string | number | boolean | undefined>;

export type CourseUtmMedium = "article" | "diagnostic" | "course_catalog" | "development_plan";

export type CourseUtmOptions = {
  medium: CourseUtmMedium;
  campaign: string;
  content: string;
};

declare global {
  interface Window {
    ym?: (...args: unknown[]) => void;
  }
}

export function trackMetrikaGoal(goal: string, params?: MetrikaParams): void {
  if (typeof window === "undefined" || typeof window.ym !== "function") {
    return;
  }

  window.ym(YANDEX_METRIKA_ID, "reachGoal", goal, params ?? {});
}

export function buildStepikUtmUrl(href: string, options: CourseUtmOptions): string {
  if (!isStepikUrl(href)) {
    return href;
  }

  try {
    const url = new URL(href);
    url.searchParams.set("utm_source", "media_site");
    url.searchParams.set("utm_medium", options.medium);
    url.searchParams.set("utm_campaign", options.campaign);
    url.searchParams.set("utm_content", normalizeUtmContent(options.content));
    return url.toString();
  } catch {
    return href;
  }
}

export function getCourseIdFromUrl(href: string): string {
  const match = href.match(/stepik\.org\/course\/(\d+)/);
  return match ? `course_${match[1]}` : "course_external";
}

function isStepikUrl(href: string): boolean {
  return href.includes("stepik.org");
}

function normalizeUtmContent(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/ё/g, "е")
    .replace(/[^a-zа-я0-9]+/gi, "_")
    .replace(/^_+|_+$/g, "")
    .slice(0, 80);
}
