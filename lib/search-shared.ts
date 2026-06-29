export type SearchItemType = "article" | "program" | "solution" | "skill" | "career-path";

export type SearchItem = {
  id: string;
  type: SearchItemType;
  title: string;
  description: string;
  href: string;
  label: string;
  actionLabel: string;
  direction: string;
  level: string;
  format: string;
  keywords: string[];
  content: string;
  priority: number;
};

export type SearchFilters = {
  type?: SearchItemType | "all";
  direction?: string;
  level?: string;
  format?: string;
};

export type SearchResult = SearchItem & {
  score: number;
};

export type SearchGroup = {
  type: SearchItemType;
  title: string;
  items: SearchResult[];
};

export const SEARCH_TYPE_LABELS: Record<SearchItemType, string> = {
  solution: "Рабочие задачи",
  skill: "Навыки",
  program: "Программы",
  article: "Статьи",
  "career-path": "Маршруты"
};

export const SEARCH_TYPE_ORDER: SearchItemType[] = ["solution", "skill", "program", "article", "career-path"];

export const POPULAR_SEARCH_QUERIES = ["ИИ", "Agile", "Kanban", "Руководитель", "Делегирование", "OKR", "Product Manager"];

export const SEO_SEARCH_PAGES: Array<{ slug: string; query: string; title: string; description: string }> = [
  {
    slug: "ai",
    query: "ИИ",
    title: "Материалы про ИИ для руководителей",
    description: "Программы, статьи, навыки и рабочие задачи про внедрение ИИ в управление."
  },
  {
    slug: "agile",
    query: "Agile",
    title: "Agile, Scrum и Kanban",
    description: "Единая подборка материалов по гибкому управлению, Scrum, Kanban и изменениям."
  },
  {
    slug: "delegation",
    query: "Делегирование",
    title: "Делегирование для руководителя",
    description: "Навыки, программы и статьи, которые помогают передавать ответственность без потери результата."
  },
  {
    slug: "okr",
    query: "OKR",
    title: "OKR и стратегический ритм",
    description: "Материалы про цели, ключевые результаты, фокус и управленческий ритм."
  },
  {
    slug: "product-manager",
    query: "Product Manager",
    title: "Материалы для Product Manager",
    description: "Маршруты, программы и статьи для развития продуктового мышления."
  }
];

const SEMANTIC_EXPANSIONS: Array<{ signals: string[]; terms: string[] }> = [
  {
    signals: ["как стать начальником", "стать начальником", "начальник", "повысили", "повышение", "руководящая должность"],
    terms: ["руководитель", "менеджер", "повысили", "лидерство", "делегирование", "команда"]
  },
  {
    signals: ["команда не берет", "нет ответственности", "все ждут указаний", "сотрудники не отвечают"],
    terms: ["ответственность", "команда", "делегирование", "обратная связь", "постановка задач"]
  },
  {
    signals: ["много хаоса", "нет системы", "все горит", "ручное управление"],
    terms: ["система", "управление", "ритм", "процессы", "приоритеты", "планирование"]
  },
  {
    signals: ["внедрить ии", "чат gpt", "chatgpt", "нейросеть", "автоматизация"],
    terms: ["ии", "ai", "промт", "prompt", "автоматизация", "внедрение"]
  },
  {
    signals: ["сорваны сроки", "не успеваем", "проект буксует", "риск проекта"],
    terms: ["проект", "сроки", "риски", "статус", "планирование", "kanban"]
  }
];

export function searchItems(items: SearchItem[], query: string, filters: SearchFilters = {}): SearchResult[] {
  const normalizedQuery = normalizeSearchText(query);
  const queryTerms = getQueryTerms(normalizedQuery);

  return items
    .filter((item) => matchesFilters(item, filters))
    .map((item) => ({ ...item, score: scoreItem(item, normalizedQuery, queryTerms) }))
    .filter((item) => !normalizedQuery || item.score > 0)
    .sort((left, right) => {
      if (right.score !== left.score) return right.score - left.score;
      if (right.priority !== left.priority) return right.priority - left.priority;
      return left.title.localeCompare(right.title, "ru");
    });
}

export function groupSearchResults(results: SearchResult[]): SearchGroup[] {
  return SEARCH_TYPE_ORDER.map((type) => ({
    type,
    title: SEARCH_TYPE_LABELS[type],
    items: results.filter((item) => item.type === type)
  })).filter((group) => group.items.length > 0);
}

export function getSearchSuggestions(items: SearchItem[], query: string, limit = 6): SearchResult[] {
  return searchItems(items, query).slice(0, limit);
}

export function getSearchFacets(items: SearchItem[]): {
  directions: string[];
  levels: string[];
  formats: string[];
} {
  return {
    directions: unique(items.map((item) => item.direction)),
    levels: unique(items.map((item) => item.level)),
    formats: unique(items.map((item) => item.format))
  };
}

export function getSeoSearchPage(slug: string): (typeof SEO_SEARCH_PAGES)[number] | undefined {
  return SEO_SEARCH_PAGES.find((page) => page.slug === slug);
}

export function normalizeSearchText(value: string): string {
  return value
    .toLowerCase()
    .replace(/ё/g, "е")
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getQueryTerms(normalizedQuery: string): string[] {
  if (!normalizedQuery) return [];

  const terms = new Set(normalizedQuery.split(" ").filter(Boolean));
  SEMANTIC_EXPANSIONS.forEach((group) => {
    if (group.signals.some((signal) => normalizedQuery.includes(normalizeSearchText(signal)))) {
      group.terms.forEach((term) => terms.add(normalizeSearchText(term)));
    }
  });

  return [...terms];
}

function scoreItem(item: SearchItem, normalizedQuery: string, terms: string[]): number {
  if (!normalizedQuery) {
    return item.priority;
  }

  const title = normalizeSearchText(item.title);
  const description = normalizeSearchText(item.description);
  const keywords = normalizeSearchText(item.keywords.join(" "));
  const content = normalizeSearchText(item.content);
  const meta = normalizeSearchText(`${item.direction} ${item.level} ${item.format} ${item.label}`);
  const haystack = `${title} ${description} ${keywords} ${content} ${meta}`;

  let score = 0;
  if (title === normalizedQuery) score += 120;
  if (title.includes(normalizedQuery)) score += 70;
  if (description.includes(normalizedQuery)) score += 35;
  if (keywords.includes(normalizedQuery)) score += 45;
  if (content.includes(normalizedQuery)) score += 16;
  if (meta.includes(normalizedQuery)) score += 12;

  terms.forEach((term) => {
    if (title.includes(term)) score += 24;
    if (keywords.includes(term)) score += 18;
    if (description.includes(term)) score += 10;
    if (content.includes(term)) score += 4;
  });

  return score + Math.min(item.priority, 10);
}

function matchesFilters(item: SearchItem, filters: SearchFilters): boolean {
  if (filters.type && filters.type !== "all" && item.type !== filters.type) return false;
  if (filters.direction && item.direction !== filters.direction) return false;
  if (filters.level && item.level !== filters.level) return false;
  if (filters.format && item.format !== filters.format) return false;
  return true;
}

function unique(values: string[]): string[] {
  return [...new Set(values.filter(Boolean))].sort((left, right) => left.localeCompare(right, "ru"));
}
