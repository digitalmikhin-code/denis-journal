export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  });
}

export function calculateReadingTime(text: string): number {
  const clean = text
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/!\[[^\]]*]\([^)]*\)/g, " ")
    .replace(/\[[^\]]*]\([^)]*\)/g, " ")
    .replace(/[#>*_~\-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const words = clean ? clean.split(" ").length : 0;
  return Math.max(1, Math.ceil(words / 200));
}

export function slugFromFilename(fileName: string): string {
  const withoutExt = fileName.replace(/\.mdx?$/, "");
  return withoutExt.replace(/^\d{4}-\d{2}-\d{2}-/, "");
}

export function normalizeTag(tag: string): string {
  return tag.trim().toLowerCase().replace(/\s+/g, "-");
}

