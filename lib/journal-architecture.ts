import type { Category } from "@/lib/constants";
import type { ArticleSummary } from "@/lib/content";

export type KnowledgeMapItem = {
  title: string;
  description: string;
  href: string;
  accent: string;
};

export type AuthorPick = {
  title: string;
  reason: string;
  signals: string[];
  categories: Category[];
};

export type ArticleSeries = {
  title: string;
  description: string;
  categories: Category[];
  signals: string[];
  parts: string[];
};

export type ArticlePremiumMeta = {
  format: string;
  level: string;
  seriesTitle: string | null;
};

export const KNOWLEDGE_MAP: KnowledgeMapItem[] = [
  {
    title: "Управление",
    description: "Как принимать решения, выстраивать ответственность и управлять результатом.",
    href: "/hub/management",
    accent: "#cba4ff"
  },
  {
    title: "Системное мышление",
    description: "Как видеть причины, связи, ограничения и управлять не симптомами, а системой.",
    href: "/hub/systems-thinking",
    accent: "#a9e070"
  },
  {
    title: "Проекты",
    description: "Как доводить инициативы до результата, управлять сроками, рисками и приоритетами.",
    href: "/hub/projects",
    accent: "#7ccfff"
  },
  {
    title: "ИИ в управлении",
    description: "Как использовать ИИ для анализа, решений, встреч, проектов и стратегии.",
    href: "/hub/ai-management",
    accent: "#ffb267"
  },
  {
    title: "Agile и трансформации",
    description: "Как внедрять гибкие подходы без имитации, хаоса и методологического театра.",
    href: "/hub/transformations",
    accent: "#9fdcff"
  },
  {
    title: "Практика изменений",
    description: "Разборы управленческих ситуаций, кейсов, ошибок и системных причин.",
    href: "/practice",
    accent: "#9ba3b3"
  },
  {
    title: "Карьера",
    description: "Как расти в профессии, усиливать управленческую зрелость и влияние.",
    href: "/hub/career",
    accent: "#f5d45d"
  },
  {
    title: "Продажи",
    description: "Как смотреть на продажи через систему, процессы, клиентов и точки роста.",
    href: "/hub/sales",
    accent: "#f7b84f"
  }
];

export const AUTHOR_PICKS: AuthorPick[] = [
  {
    title: "Почему стратегии не реализуются",
    reason: "Показывает разрыв между стратегией, инициативами, владельцами и реальным контуром исполнения.",
    categories: ["management", "architecture", "cases"],
    signals: ["стратег", "реализац", "результат", "инициатив", "портфель"]
  },
  {
    title: "Как системное мышление помогает руководителю",
    reason: "Дает базовую оптику: искать не виноватых и симптомы, а связи, ограничения и рычаги.",
    categories: ["thinking", "architecture"],
    signals: ["систем", "мышлен", "причин", "связ", "огранич"]
  },
  {
    title: "Почему проекты буксуют даже при сильной команде",
    reason: "Связывает результат проекта с ролями, прозрачностью, приоритетами и управленческим ритмом.",
    categories: ["management", "cases", "architecture"],
    signals: ["проект", "команд", "буксу", "срок", "прозрач"]
  },
  {
    title: "Как ИИ ускоряет управленческие решения",
    reason: "Практичный вход в ИИ без хайпа: анализ, подготовка решений и снижение ручной нагрузки.",
    categories: ["ai", "management"],
    signals: ["ии", "решен", "аналит", "ускор", "руковод"]
  },
  {
    title: "Как управлять рисками без лишней бюрократии",
    reason: "Помогает увидеть риск-менеджмент как способ спокойствия, а не как дополнительную отчетность.",
    categories: ["management", "architecture"],
    signals: ["риск", "спокой", "проект", "управ"]
  }
];

export const ARTICLE_SERIES: ArticleSeries[] = [
  {
    title: "Системное мышление для руководителя",
    description:
      "Маршрут о том, как перестать лечить симптомы и начать видеть причины, связи и ограничения в системе.",
    categories: ["thinking", "architecture"],
    signals: ["систем", "мышлен", "причин", "связ", "узк", "модель"],
    parts: [
      "Почему руководители лечат симптомы, а не причины",
      "Как найти узкое место в системе",
      "Почему решения не работают без понимания связей",
      "Как видеть бизнес как систему"
    ]
  },
  {
    title: "ИИ для руководителя",
    description:
      "Маршрут о практическом применении ИИ в управлении, встречах, проектах и подготовке решений.",
    categories: ["ai"],
    signals: ["ии", "ai", "промпт", "аналит", "решен", "дашборд", "прогноз"],
    parts: [
      "Как ИИ помогает готовить управленческие решения",
      "Как использовать ИИ для совещаний",
      "Как ИИ помогает анализировать проекты",
      "Где ИИ опасен в управлении"
    ]
  },
  {
    title: "Управление изменениями",
    description:
      "Маршрут о том, почему изменения буксуют и как собрать контур управления, который доводит изменения до результата.",
    categories: ["agile", "architecture", "cases", "management"],
    signals: ["измен", "трансформац", "agile", "команд", "контур", "хаос"],
    parts: [
      "Почему изменения буксуют",
      "Почему команда сопротивляется",
      "Как выстроить контур управления изменениями",
      "Как довести изменения до результата"
    ]
  }
];

export const METHODOLOGY_STEPS = [
  "Диагностика текущей системы",
  "Поиск узких мест",
  "Определение приоритетов",
  "Формирование контура управления",
  "Запуск изменений",
  "Измерение результата",
  "Закрепление новой системы"
];

export const MANAGEMENT_THOUGHTS = [
  "Скорость без управляемости часто создает не результат, а новый слой хаоса.",
  "Проект без владельца почти всегда превращается в набор встреч и добрых намерений.",
  "Стратегия без реализации остается презентацией, даже если она красиво оформлена.",
  "ИИ не заменяет мышление. Он усиливает того, кто умеет задавать хорошие вопросы.",
  "Команда буксует не всегда из-за людей. Часто ее тормозит сама система работы."
];

export function getArticlePremiumMeta(article: ArticleSummary): ArticlePremiumMeta {
  const readingTime = article.frontmatter.readingTime ?? 0;
  const title = article.frontmatter.title.toLowerCase();
  const category = article.frontmatter.category as Category;
  const series = getArticleSeries(article);

  const format =
    category === "cases" || title.includes("кейс") || title.includes("пример") || title.includes("разбор")
      ? "Разбор"
      : category === "ai" || title.includes("как ")
        ? "Практика"
        : category === "thinking" || category === "architecture"
          ? "Аналитика"
          : "Гайд";

  const level = readingTime >= 9 ? "Глубокий материал" : readingTime <= 4 ? "Короткий разбор" : "Средняя глубина";

  return {
    format,
    level,
    seriesTitle: series?.title ?? null
  };
}

export function getArticleSeries(article: ArticleSummary): ArticleSeries | null {
  const category = article.frontmatter.category as Category;
  const haystack = `${article.frontmatter.title} ${article.frontmatter.excerpt} ${article.frontmatter.tags.join(" ")}`.toLowerCase();

  return (
    ARTICLE_SERIES
      .map((series) => ({
        series,
        score:
          (series.categories.includes(category) ? 4 : 0) +
          series.signals.reduce((sum, signal) => sum + (haystack.includes(signal) ? 1 : 0), 0)
      }))
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)[0]?.series ?? null
  );
}

export function getSeriesArticles(
  current: ArticleSummary,
  articles: ArticleSummary[],
  limit = 4
): ArticleSummary[] {
  const series = getArticleSeries(current);
  if (!series) return [];

  return articles
    .filter((article) => article.slug !== current.slug)
    .map((article) => {
      const category = article.frontmatter.category as Category;
      const haystack = `${article.frontmatter.title} ${article.frontmatter.excerpt} ${article.frontmatter.tags.join(" ")}`.toLowerCase();
      const score =
        (series.categories.includes(category) ? 4 : 0) +
        series.signals.reduce((sum, signal) => sum + (haystack.includes(signal) ? 1 : 0), 0) +
        (article.frontmatter.featured ? 1 : 0);

      return { article, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return new Date(b.article.frontmatter.date).getTime() - new Date(a.article.frontmatter.date).getTime();
    })
    .slice(0, limit)
    .map((item) => item.article);
}

export function pickAuthorSelection(articles: ArticleSummary[], limit = 5): Array<AuthorPick & { article: ArticleSummary | null }> {
  return AUTHOR_PICKS.slice(0, limit).map((pick) => {
    const scored = articles
      .map((article) => {
        const category = article.frontmatter.category as Category;
        const haystack = `${article.frontmatter.title} ${article.frontmatter.excerpt} ${article.frontmatter.tags.join(" ")}`.toLowerCase();
        const score =
          (pick.categories.includes(category) ? 3 : 0) +
          pick.signals.reduce((sum, signal) => sum + (haystack.includes(signal) ? 1 : 0), 0) +
          (article.frontmatter.featured ? 1 : 0);

        return { article, score };
      })
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score);

    return {
      ...pick,
      article: scored[0]?.article ?? null
    };
  });
}
