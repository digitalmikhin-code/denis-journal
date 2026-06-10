export type TableOfContentsItem = {
  id: string;
  level: 2 | 3;
  title: string;
};

function cleanHeadingTitle(value: string): string {
  return value
    .replace(/\[(.*?)\]\((.*?)\)/g, "$1")
    .replace(/[`*_~]/g, "")
    .replace(/<[^>]+>/g, "")
    .trim();
}

export function addTableOfContentsAnchors(content: string): {
  content: string;
  items: TableOfContentsItem[];
} {
  const items: TableOfContentsItem[] = [];

  const contentWithAnchors = content.replace(/^(#{2,3})\s+(.+)$/gm, (line, marks: string, rawTitle: string) => {
    const title = cleanHeadingTitle(rawTitle);
    if (!title) return line;

    const item: TableOfContentsItem = {
      id: `section-${items.length + 1}`,
      level: marks.length as 2 | 3,
      title
    };

    items.push(item);
    return `${marks} <span id="${item.id}" className="scroll-mt-28"></span>${rawTitle}`;
  });

  return {
    content: contentWithAnchors,
    items
  };
}
