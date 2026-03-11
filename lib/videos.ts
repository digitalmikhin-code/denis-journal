import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { VideoItem, VideoPlatform } from "@/lib/video-shared";
export type { VideoFrontmatter, VideoItem, VideoPlatform } from "@/lib/video-shared";
export { resolveEmbedUrl } from "@/lib/video-shared";

const VIDEOS_DIR = path.join(process.cwd(), "content", "videos");

function slugFromFilename(fileName: string): string {
  return fileName
    .replace(/\.mdx?$/, "")
    .replace(/^\d{4}-\d{2}-\d{2}-/, "");
}

function normalizeDate(value: unknown): string {
  if (value instanceof Date) {
    return value.toISOString().slice(0, 10);
  }
  return String(value || "");
}

export function getAllVideos(includeDraft = false): VideoItem[] {
  if (!fs.existsSync(VIDEOS_DIR)) {
    return [];
  }

  const files = fs
    .readdirSync(VIDEOS_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .sort((a, b) => b.localeCompare(a));

  const items = files.map((fileName) => {
    const raw = fs.readFileSync(path.join(VIDEOS_DIR, fileName), "utf8");
    const parsed = matter(raw);
    const platform = String(parsed.data.platform || "").toLowerCase() as VideoPlatform;

    if (!["youtube", "rutube", "vk"].includes(platform)) {
      throw new Error(`Unknown video platform "${parsed.data.platform}" in ${fileName}`);
    }

    return {
      slug: slugFromFilename(fileName),
      fileName,
      frontmatter: {
        title: String(parsed.data.title || slugFromFilename(fileName)),
        date: normalizeDate(parsed.data.date),
        platform,
        url: String(parsed.data.url || ""),
        description: parsed.data.description ? String(parsed.data.description) : "",
        draft: Boolean(parsed.data.draft)
      }
    } satisfies VideoItem;
  });

  const filtered = includeDraft ? items : items.filter((item) => !item.frontmatter.draft);

  return filtered.sort(
    (a, b) =>
      new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
  );
}
