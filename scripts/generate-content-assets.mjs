import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const categoryCoverMap = {
  career: "/images/covers/category-career.svg",
  management: "/images/covers/category-management.svg",
  thinking: "/images/covers/category-thinking.svg",
  ai: "/images/covers/category-ai.svg",
  projects: "/images/covers/category-projects.svg",
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
  return fileName.replace(/\.mdx?$/, "").replace(/^\d{4}-\d{2}-\d{2}-/, "");
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
