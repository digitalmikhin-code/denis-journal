import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { CATEGORY_COVER_MAP, CATEGORY_LABELS, DEFAULT_AUTHOR, type Category } from "@/lib/constants";
import { calculateReadingTime, normalizeTag, slugFromFilename } from "@/lib/utils";

const ARTICLES_DIR = path.join(process.cwd(), "content", "articles");
const PAGES_DIR = path.join(process.cwd(), "content", "pages");

export type ArticleFrontmatter = {
  title: string;
  date: string;
  category: Category;
  tags: string[];
  excerpt: string;
  cover: string;
  draft: boolean;
  author?: string;
  featured?: boolean;
  readingTime?: number;
};

export type Article = {
  slug: string;
  fileName: string;
  content: string;
  frontmatter: ArticleFrontmatter;
};

export type ArticleSummary = Omit<Article, "content">;

export function getAllArticles(includeDraft = false): Article[] {
  const files = fs
    .readdirSync(ARTICLES_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .sort((a, b) => b.localeCompare(a));

  const items = files.map((fileName) => {
    const raw = fs.readFileSync(path.join(ARTICLES_DIR, fileName), "utf8");
    const parsed = matter(raw);
    const slug = slugFromFilename(fileName);
    const category = parsed.data.category as Category;
    const rawDate = parsed.data.date;
    const normalizedDate =
      rawDate instanceof Date ? rawDate.toISOString().slice(0, 10) : String(rawDate || "");
    if (!CATEGORY_LABELS[category]) {
      throw new Error(`Unknown category "${parsed.data.category}" in ${fileName}`);
    }
    const frontmatter: ArticleFrontmatter = {
      title: parsed.data.title || slug,
      date: normalizedDate,
      category,
      tags: Array.isArray(parsed.data.tags)
        ? parsed.data.tags.map((tag: string) => normalizeTag(tag))
        : [],
      excerpt: parsed.data.excerpt || "",
      cover: parsed.data.cover || CATEGORY_COVER_MAP[category] || "/images/covers/default-cover.svg",
      draft: Boolean(parsed.data.draft),
      author: parsed.data.author || DEFAULT_AUTHOR,
      featured: Boolean(parsed.data.featured),
      readingTime: parsed.data.readingTime
        ? Number(parsed.data.readingTime)
        : calculateReadingTime(parsed.content)
    };

    return {
      slug,
      fileName,
      content: parsed.content,
      frontmatter
    } satisfies Article;
  });

  const filtered = includeDraft ? items : items.filter((item) => !item.frontmatter.draft);

  return filtered.sort(
    (a, b) =>
      new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
  );
}

export function getArticleBySlug(slug: string): Article | null {
  return getAllArticles(true).find((article) => article.slug === slug) ?? null;
}

export function getLatestArticles(limit = 10): ArticleSummary[] {
  return getAllArticles(false).slice(0, limit);
}

export function getFeaturedArticles(limit = 3): ArticleSummary[] {
  const all = getAllArticles(false);
  const featured = all.filter((item) => item.frontmatter.featured);
  if (featured.length >= limit) {
    return featured.slice(0, limit);
  }
  return all.slice(0, limit);
}

export function getArticlesByCategory(category: Category): ArticleSummary[] {
  return getAllArticles(false).filter((item) => item.frontmatter.category === category);
}

export function getArticlesByTag(tag: string): ArticleSummary[] {
  const normalized = normalizeTag(tag);
  return getAllArticles(false).filter((item) =>
    item.frontmatter.tags.some((itemTag) => normalizeTag(itemTag) === normalized)
  );
}

export function getAllTags(): string[] {
  const tags = new Set<string>();
  getAllArticles(false).forEach((item) => {
    item.frontmatter.tags.forEach((tag) => tags.add(normalizeTag(tag)));
  });
  return [...tags].sort((a, b) => a.localeCompare(b));
}

export function getRelatedArticles(slug: string, limit = 3): ArticleSummary[] {
  const current = getArticleBySlug(slug);
  if (!current || current.frontmatter.draft) {
    return [];
  }
  const currentTags = new Set(current.frontmatter.tags);
  return getAllArticles(false)
    .filter((article) => article.slug !== slug)
    .map((article) => {
      let score = 0;
      if (article.frontmatter.category === current.frontmatter.category) {
        score += 3;
      }
      article.frontmatter.tags.forEach((tag) => {
        if (currentTags.has(tag)) {
          score += 2;
        }
      });
      return { article, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.article);
}

export function getPageContent(slug: "about" | "training"): { title: string; content: string } {
  const filePath = path.join(PAGES_DIR, `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, "utf8");
  const parsed = matter(raw);
  return {
    title: parsed.data.title || slug,
    content: parsed.content
  };
}
