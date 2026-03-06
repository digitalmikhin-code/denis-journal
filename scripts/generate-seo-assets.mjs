import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const root = process.cwd();
const articlesDir = path.join(root, "content", "articles");
const publicDir = path.join(root, "public");
const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://example.com").replace(/\/$/, "");

function slugFromFilename(fileName) {
  return fileName.replace(/\.mdx?$/, "").replace(/^\d{4}-\d{2}-\d{2}-/, "");
}

function xmlEscape(input) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function getPublishedArticles() {
  return fs
    .readdirSync(articlesDir)
    .filter((file) => file.endsWith(".mdx"))
    .map((fileName) => {
      const raw = fs.readFileSync(path.join(articlesDir, fileName), "utf8");
      const parsed = matter(raw);
      if (parsed.data.draft) {
        return null;
      }
      const rawDate = parsed.data.date;
      const normalizedDate =
        rawDate instanceof Date ? rawDate.toISOString().slice(0, 10) : String(rawDate || "");
      return {
        slug: slugFromFilename(fileName),
        title: parsed.data.title || "",
        excerpt: parsed.data.excerpt || "",
        date: normalizedDate,
        category: parsed.data.category || "",
        tags: Array.isArray(parsed.data.tags) ? parsed.data.tags.map((tag) => String(tag).toLowerCase()) : []
      };
    })
    .filter(Boolean)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

function writeRobots() {
  const robots = `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`;
  fs.writeFileSync(path.join(publicDir, "robots.txt"), robots);
}

function writeSitemap(articles) {
  const staticRoutes = ["/", "/articles", "/search", "/about", "/training"];
  const categoryRoutes = [...new Set(articles.map((item) => `/category/${item.category}`))];
  const tagRoutes = [...new Set(articles.flatMap((item) => item.tags.map((tag) => `/tag/${tag}`)))];
  const articleRoutes = articles.map((item) => `/article/${item.slug}`);
  const allRoutes = [...staticRoutes, ...categoryRoutes, ...tagRoutes, ...articleRoutes];

  const entries = allRoutes
    .map((route) => {
      const loc = `${siteUrl}${route}`;
      return `<url><loc>${xmlEscape(loc)}</loc></url>`;
    })
    .join("");

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${entries}</urlset>`;
  fs.writeFileSync(path.join(publicDir, "sitemap.xml"), sitemap);
}

function writeFeed(articles) {
  const items = articles
    .slice(0, 30)
    .map((article) => {
      const link = `${siteUrl}/article/${article.slug}`;
      return `<item><title>${xmlEscape(article.title)}</title><link>${xmlEscape(link)}</link><guid>${xmlEscape(link)}</guid><pubDate>${new Date(
        article.date
      ).toUTCString()}</pubDate><description>${xmlEscape(article.excerpt)}</description></item>`;
    })
    .join("");

  const feed = `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0"><channel><title>Журнал Дениса Михина</title><link>${xmlEscape(
    siteUrl
  )}</link><description>RSS-лента публикаций</description>${items}</channel></rss>`;
  fs.writeFileSync(path.join(publicDir, "feed.xml"), feed);
}

function main() {
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  const articles = getPublishedArticles();
  writeRobots();
  writeSitemap(articles);
  writeFeed(articles);
  console.log("Generated robots.txt, sitemap.xml, feed.xml");
}

main();
