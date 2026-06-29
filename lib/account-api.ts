import { getAllArticles } from "@/lib/content";
import { getRecommendation } from "@/lib/recommendations";
import { getSearchIndex, getSearchRelatedItems } from "@/lib/search-engine";
import { getAllCareerPaths, getCareerPathPrograms, getCareerPathSkills } from "@/lib/career-paths";
import { getAllSkills } from "@/lib/skills";
import { STEPIK_COURSES } from "@/lib/stepik-courses";
import { ACCOUNT_AUTH_PROVIDERS, type AccountSnapshot } from "@/lib/account-shared";

export function getAccountSnapshot(): AccountSnapshot {
  const searchItems = getSearchIndex();
  const route = getAllCareerPaths()[0];
  const routePrograms = getCareerPathPrograms(route);
  const routeSkills = getCareerPathSkills(route);
  const latestArticles = getAllArticles(false).slice(0, 6);
  const recommendation = getRecommendation("home");
  const related = getSearchRelatedItems(route.title, `/career-paths/${route.slug}`, 8);

  return {
    authProviders: ACCOUNT_AUTH_PROVIDERS,
    recommendation,
    currentRoute: {
      slug: route.slug,
      title: route.title,
      description: route.description,
      currentStage: route.stages[1]?.title ?? route.stages[0]?.title ?? "Старт",
      completedStages: route.stages.slice(0, 1).map((stage) => stage.title),
      nextStage: route.stages[2]?.title ?? "Следующий этап маршрута",
      progress: 25
    },
    skills: routeSkills.concat(getAllSkills()).filter(uniqueBySlug).slice(0, 12).map((skill, index) => ({
      slug: skill.slug,
      title: skill.title,
      description: skill.description,
      recommendedStatus: index === 0 ? "in-progress" : "not-started"
    })),
    programs: [
      ...routePrograms.slice(0, 1).map((course) => accountProgram(course, "started")),
      ...routePrograms.slice(1, 2).map((course) => accountProgram(course, "completed")),
      ...routePrograms.slice(2, 5).map((course) => accountProgram(course, "recommended"))
    ],
    articles: latestArticles.map((article, index) => ({
      slug: article.slug,
      title: article.frontmatter.title,
      description: article.frontmatter.excerpt,
      href: `/article/${article.slug}`,
      status: index === 0 ? "continue" : index < 3 ? "recent" : "favorite"
    })),
    favoriteCandidates: searchItems
      .filter((item) => ["article", "program", "solution", "skill"].includes(item.type))
      .slice(0, 16),
    recentMaterials: related.length > 0 ? related : searchItems.slice(0, 8),
    searchItems
  };
}

function accountProgram(
  course: (typeof STEPIK_COURSES)[number],
  status: "started" | "completed" | "recommended"
): AccountSnapshot["programs"][number] {
  return {
    id: course.id,
    title: course.title,
    description: course.result || course.summary,
    href: `/training/${course.id}`,
    status
  };
}

function uniqueBySlug<T extends { slug: string }>(item: T, index: number, items: T[]): boolean {
  return items.findIndex((candidate) => candidate.slug === item.slug) === index;
}
