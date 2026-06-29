import { getAllCareerPaths } from "@/lib/career-paths";
import { getAllArticles } from "@/lib/content";
import { getProgramPath } from "@/lib/program-pages";
import { getAllSkills } from "@/lib/skills";
import { getAllSolutions } from "@/lib/solutions";
import { STEPIK_COURSES } from "@/lib/stepik-courses";
import {
  groupSearchResults,
  searchItems,
  type SearchFilters,
  type SearchItem,
  type SearchItemType,
  type SearchResult
} from "@/lib/search-shared";

type SearchRegistry = {
  type: SearchItemType;
  getItems: () => SearchItem[];
};

const SEARCH_REGISTRY: SearchRegistry[] = [
  {
    type: "solution",
    getItems: () =>
      getAllSolutions().map((solution, index) => ({
        id: `solution:${solution.slug}`,
        type: "solution",
        title: solution.title,
        description: solution.description,
        href: `/solutions/${solution.slug}`,
        label: "Рабочая задача",
        actionLabel: "Открыть решение",
        direction: solution.category,
        level: "Практика",
        format: "Решение",
        keywords: [
          solution.category,
          ...solution.symptoms,
          ...solution.reasons,
          ...solution.articleSignals,
          ...solution.plan.map((step) => step.title)
        ],
        content: `${solution.heroText} ${solution.problemIntro}`,
        priority: 95 - index
      }))
  },
  {
    type: "skill",
    getItems: () =>
      getAllSkills().map((skill, index) => ({
        id: `skill:${skill.slug}`,
        type: "skill",
        title: skill.title,
        description: skill.description,
        href: `/skills/${skill.slug}`,
        label: "Навык",
        actionLabel: "Начать изучение",
        direction: inferDirection(skill.articleSignals),
        level: "Навык",
        format: "Навык",
        keywords: [
          skill.outcome,
          ...skill.articleSignals,
          ...skill.importance,
          ...skill.mistakes,
          ...skill.algorithm
        ],
        content: skill.overview.join(" "),
        priority: 85 - index
      }))
  },
  {
    type: "program",
    getItems: () =>
      STEPIK_COURSES.map((course, index) => ({
        id: `program:${course.id}`,
        type: "program",
        title: course.title,
        description: course.result || course.summary,
        href: getProgramPath(course),
        label: "Программа",
        actionLabel: "Начать обучение",
        direction: course.category,
        level: course.level || "Любой уровень",
        format: "Курс",
        keywords: [
          course.category,
          course.summary,
          course.forWhom,
          course.modules,
          course.duration,
          course.status,
          ...course.gives
        ],
        content: `${course.summary} ${course.result} ${course.forWhom}`,
        priority: 75 - index
      }))
  },
  {
    type: "article",
    getItems: () =>
      getAllArticles(false).map((article, index) => ({
        id: `article:${article.slug}`,
        type: "article",
        title: article.frontmatter.title,
        description: article.frontmatter.excerpt,
        href: `/article/${article.slug}`,
        label: "Статья",
        actionLabel: "Читать",
        direction: article.frontmatter.category,
        level: `${article.frontmatter.readingTime ?? 1} мин`,
        format: "Статья",
        keywords: [
          article.frontmatter.category,
          ...(article.frontmatter.tags ?? []),
          ...(article.frontmatter.skills ?? []),
          ...(article.frontmatter.workTasks ?? [])
        ],
        content: article.content.slice(0, 5000),
        priority: article.frontmatter.featured ? 70 : 50 - Math.min(index, 40)
      }))
  },
  {
    type: "career-path",
    getItems: () =>
      getAllCareerPaths().map((path, index) => ({
        id: `career-path:${path.slug}`,
        type: "career-path",
        title: path.title,
        description: path.description,
        href: `/career-paths/${path.slug}`,
        label: "Маршрут",
        actionLabel: "Открыть маршрут",
        direction: "Карьера",
        level: "Маршрут",
        format: "Маршрут",
        keywords: [
          path.outcome,
          ...path.audience,
          ...path.results,
          ...path.materials,
          ...path.skillSlugs,
          ...path.taskSlugs
        ],
        content: path.stages.map((stage) => `${stage.label} ${stage.title} ${stage.text}`).join(" "),
        priority: 65 - index
      }))
  }
];

export function getSearchIndex(): SearchItem[] {
  return SEARCH_REGISTRY.flatMap((registry) => registry.getItems());
}

export function runSearch(query: string, filters: SearchFilters = {}): SearchResult[] {
  return searchItems(getSearchIndex(), query, filters);
}

export function getGroupedSearchResults(query: string, filters: SearchFilters = {}) {
  return groupSearchResults(runSearch(query, filters));
}

export function getSearchRelatedItems(query: string, currentHref?: string, limit = 3): SearchResult[] {
  return runSearch(query)
    .filter((item) => item.href !== currentHref)
    .slice(0, limit);
}

function inferDirection(signals: string[]): string {
  const joined = signals.join(" ").toLowerCase();
  if (joined.includes("ai") || joined.includes("ии") || joined.includes("промт")) return "ai";
  if (joined.includes("agile") || joined.includes("scrum") || joined.includes("kanban")) return "agile";
  if (joined.includes("проект") || joined.includes("срок") || joined.includes("риск")) return "management";
  if (joined.includes("карьер") || joined.includes("руковод")) return "career";
  return "management";
}
