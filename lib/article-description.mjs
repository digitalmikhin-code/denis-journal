/** Preserve editorial descriptions; repair empty/author-only imports with existing prose. */
export function getArticleDescription(excerpt, content, author = "Денис Михин") {
  const existing = String(excerpt ?? "").trim();
  if (existing && existing !== author.trim() && existing !== "Денис Михин") return existing;
  const paragraphs = String(content)
    .replace(/```[\s\S]*?```/g, "")
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter((paragraph) => !/^(?:#|>|[-*+]\s|\d+\.\s|<|!\[)/.test(paragraph))
    .map((paragraph) => paragraph.replace(/\[([^\]]+)\]\([^)]*\)/g, "$1").replace(/<[^>]*>/g, "").replace(/[*_`~]/g, "").replace(/\s+/g, " ").trim())
    .filter((paragraph) => paragraph.length >= 60 && !paragraph.startsWith("Данный материал"));
  const opening = paragraphs[0] ?? "";
  if (opening.length <= 200) return opening;
  const clipped = opening.slice(0, 197);
  const lastSentence = Math.max(clipped.lastIndexOf("."), clipped.lastIndexOf("?"), clipped.lastIndexOf("!"));
  if (lastSentence >= 90) return clipped.slice(0, lastSentence + 1);
  return clipped.slice(0, clipped.lastIndexOf(" ")).trimEnd() + "…";
}
