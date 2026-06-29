import { getAccountSnapshot } from "@/lib/account-api";
import { getAllCareerPaths, getCareerPathPrograms } from "@/lib/career-paths";
import { getRecommendation } from "@/lib/recommendations";
import { getSearchIndex, runSearch } from "@/lib/search-engine";
import { getAllSolutions } from "@/lib/solutions";
import { STEPIK_COURSES } from "@/lib/stepik-courses";
import type {
  MiniAppCareerPath,
  MiniAppFocus,
  MiniAppLevel,
  MiniAppProgram,
  MiniAppProgramPick,
  MiniAppRole,
  TelegramMiniAppSnapshot
} from "@/lib/telegram-mini-app-shared";

export function getTelegramMiniAppSnapshot(): TelegramMiniAppSnapshot {
  return {
    homeActions: [
      { id: "program-picker", title: "Подобрать программу", description: "3 быстрых вопроса" },
      { id: "solutions", title: "Решить рабочую задачу", description: "Готовые сценарии" },
      { id: "continue", title: "Продолжить обучение", description: "Для авторизованных" },
      { id: "articles", title: "Найти статью", description: "Поиск по смыслу" },
      { id: "career-paths", title: "Посмотреть маршруты", description: "Путь развития" },
      { id: "site", title: "Перейти на сайт", description: "Полная версия" }
    ],
    recommendation: getRecommendation("home"),
    account: getAccountSnapshot(),
    solutions: getMiniAppSolutions(),
    careerPaths: getMiniAppCareerPaths(),
    programs: getMiniAppPrograms(),
    searchItems: getSearchIndex(),
    hiddenCapabilities: {
      aiMentorReady: true
    }
  };
}

export function pickMiniAppProgram(
  role: MiniAppRole,
  focus: MiniAppFocus,
  level: MiniAppLevel
): MiniAppProgramPick {
  const query = buildProgramQuery(role, focus, level);
  const results = runSearch(query);
  const programItem = results.find((item) => item.type === "program");
  const routeItem = results.find((item) => item.type === "career-path");
  const articleItem = results.find((item) => item.type === "article") ?? getSearchIndex()[0];
  const fallbackProgram = getMiniAppPrograms()[0];
  const fallbackRoute = getMiniAppCareerPaths()[0];

  return {
    program: programItem
      ? {
          id: Number(programItem.id.replace("program:", "")),
          title: programItem.title,
          level: programItem.level,
          result: programItem.description,
          href: programItem.href
        }
      : fallbackProgram,
    route: routeItem
      ? {
          slug: routeItem.id.replace("career-path:", ""),
          title: routeItem.title,
          description: routeItem.description,
          href: routeItem.href,
          stagesCount: 4,
          programsCount: 3
        }
      : fallbackRoute,
    article: articleItem
  };
}

function getMiniAppSolutions() {
  return getAllSolutions()
    .filter((solution) =>
      ["promoted-manager", "time-management", "implement-ai", "implement-agile", "team-responsibility"].includes(
        solution.slug
      )
    )
    .map((solution) => ({
      slug: solution.slug,
      title: solution.title,
      description: solution.description,
      href: `/solutions/${solution.slug}`
    }));
}

function getMiniAppCareerPaths(): MiniAppCareerPath[] {
  return getAllCareerPaths().map((path) => ({
    slug: path.slug,
    title: path.title,
    description: path.description,
    href: `/career-paths/${path.slug}`,
    stagesCount: path.stages.length,
    programsCount: getCareerPathPrograms(path).length
  }));
}

function getMiniAppPrograms(): MiniAppProgram[] {
  return STEPIK_COURSES.map((course) => ({
    id: course.id,
    title: course.title,
    level: course.level,
    result: course.result || course.summary,
    href: `/training/${course.id}`
  }));
}

function buildProgramQuery(role: MiniAppRole, focus: MiniAppFocus, level: MiniAppLevel): string {
  const roleText: Record<MiniAppRole, string> = {
    manager: "руководитель",
    "project-manager": "project manager управление проектами",
    "product-manager": "product manager продукт",
    "scrum-master": "scrum master agile",
    specialist: "карьерный рост специалист"
  };
  const focusText: Record<MiniAppFocus, string> = {
    management: "управление команда",
    ai: "ии ai промт",
    agile: "agile scrum kanban",
    projects: "проекты сроки риски",
    career: "карьера руководитель рост"
  };
  const levelText: Record<MiniAppLevel, string> = {
    beginner: "с нуля начинающий",
    middle: "практика",
    advanced: "продвинутый система"
  };

  return `${roleText[role]} ${focusText[focus]} ${levelText[level]}`;
}
