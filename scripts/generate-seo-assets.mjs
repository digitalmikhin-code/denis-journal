import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const root = process.cwd();
const articlesDir = path.join(root, "content", "articles");
const publicDir = path.join(root, "public");
const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://example.com").replace(/\/$/, "");

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

function xmlEscape(input) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
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
  const disallow = ["/_dmk-admin", "/admin", "/studio", "/studio/reactions", "/reactions"];
  const disallowLines = disallow.map((blockedPath) => `Disallow: ${blockedPath}`).join("\n");
  const robots = `User-agent: *\nAllow: /\n${disallowLines}\n\nSitemap: ${siteUrl}/sitemap.xml\n`;
  fs.writeFileSync(path.join(publicDir, "robots.txt"), robots);
}

function writeSitemap(articles) {
  const staticRoutes = ["/", "/articles", "/videos", "/search", "/about", "/training"];
  const categoryRoutes = [...new Set(articles.map((item) => `/category/${item.category}`))];
  const articleRoutes = articles.map((item) => `/article/${item.slug}`);
  const allRoutes = [...staticRoutes, ...categoryRoutes, ...articleRoutes];

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
  fs.writeFileSync(path.join(publicDir, "rss"), feed);
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
