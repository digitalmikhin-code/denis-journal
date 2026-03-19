import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const categoryCoverMap = {
  career: "/images/covers/category-career.svg",
  management: "/images/covers/category-management.svg",
  thinking: "/images/covers/category-thinking.svg",
  agile: "/images/covers/category-agile.svg",
  architecture: "/images/covers/category-architecture.svg",
  ai: "/images/covers/category-ai.svg",
  cases: "/images/covers/category-cases.svg"
};

const root = process.cwd();
const articlesDir = path.join(root, "content", "articles");
const publicDir = path.join(root, "public");

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function slugFromFilename(fileName) {
  const withoutExt = fileName.replace(/\.mdx?$/, "");
  const raw = withoutExt.replace(/^\d{4}-\d{2}-\d{2}-/, "");
  const cyrillicMap = {
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

function cleanText(value) {
  return value
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/!\[[^\]]*]\([^)]*\)/g, " ")
    .replace(/\[[^\]]*]\([^)]*\)/g, " ")
    .replace(/[#>*_~\-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function readingTime(text) {
  const words = cleanText(text).split(" ").filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

function main() {
  ensureDir(publicDir);

  const files = fs.readdirSync(articlesDir).filter((file) => file.endsWith(".mdx")).sort();
  const index = files
    .map((fileName) => {
      const filePath = path.join(articlesDir, fileName);
      const raw = fs.readFileSync(filePath, "utf8");
      const parsed = matter(raw);
      if (parsed.data.draft) {
        return null;
      }
      const rawDate = parsed.data.date;
      const normalizedDate =
        rawDate instanceof Date ? rawDate.toISOString().slice(0, 10) : String(rawDate || "");
      const content = cleanText(parsed.content).slice(0, 2800);
      return {
        slug: slugFromFilename(fileName),
        title: parsed.data.title || "",
        category: parsed.data.category || "",
        tags: Array.isArray(parsed.data.tags) ? parsed.data.tags.map((tag) => String(tag).toLowerCase()) : [],
        excerpt: parsed.data.excerpt || "",
        date: normalizedDate,
        cover: categoryCoverMap[parsed.data.category] || "/images/covers/default-cover.svg",
        readingTime: parsed.data.readingTime ? Number(parsed.data.readingTime) : readingTime(parsed.content),
        content
      };
    })
    .filter(Boolean)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  fs.writeFileSync(path.join(publicDir, "search-index.json"), JSON.stringify(index, null, 2));
  console.log(`Generated search-index.json (${index.length} entries).`);
}

main();
