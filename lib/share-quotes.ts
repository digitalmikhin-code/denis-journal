export type ShareQuote = {
  id: string;
  text: string;
};

function cleanQuote(value: string): string {
  return value
    .replace(/\[(.*?)\]\((.*?)\)/g, "$1")
    .replace(/[`*_~]/g, "")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function getShareQuotes(content: string, limit = 2): ShareQuote[] {
  const quotes: ShareQuote[] = [];
  const seen = new Set<string>();
  const boldLinePattern = /^\*\*(.+?)\*\*$/gm;

  for (const match of content.matchAll(boldLinePattern)) {
    const text = cleanQuote(match[1] ?? "");
    if (text.length < 55 || seen.has(text)) continue;

    seen.add(text);
    quotes.push({
      id: `quote-${quotes.length + 1}`,
      text
    });

    if (quotes.length >= limit) break;
  }

  return quotes;
}
