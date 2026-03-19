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
  const raw = withoutExt.replace(/^\d{4}-\d{2}-\d{2}-/, "");

  const cyrillicMap: Record<string, string> = {
    "\u0430": "a",
    "\u0431": "b",
    "\u0432": "v",
    "\u0433": "g",
    "\u0434": "d",
    "\u0435": "e",
    "\u0451": "e",
    "\u0436": "zh",
    "\u0437": "z",
    "\u0438": "i",
    "\u0439": "y",
    "\u043a": "k",
    "\u043b": "l",
    "\u043c": "m",
    "\u043d": "n",
    "\u043e": "o",
    "\u043f": "p",
    "\u0440": "r",
    "\u0441": "s",
    "\u0442": "t",
    "\u0443": "u",
    "\u0444": "f",
    "\u0445": "h",
    "\u0446": "ts",
    "\u0447": "ch",
    "\u0448": "sh",
    "\u0449": "sch",
    "\u044a": "",
    "\u044b": "y",
    "\u044c": "",
    "\u044d": "e",
    "\u044e": "yu",
    "\u044f": "ya"
  };

  const transliterated = raw
    .toLowerCase()
    .split("")
    .map((char) => cyrillicMap[char] ?? char)
    .join("");

  return transliterated
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

export function normalizeTag(tag: string): string {
  return tag.trim().toLowerCase().replace(/\s+/g, "-");
}
