import { getAllArticles, getArticleBySlug } from "@/lib/content";
import {
  getAllCareerPaths,
  getCareerPath,
  getCareerPathPrograms,
  getCareerPathsForProgram,
  getCareerPathsForSkill,
  getRecommendedCareerPathForSolution
} from "@/lib/career-paths";
import { getProgramPageById, getProgramPath } from "@/lib/program-pages";
import { getSearchRelatedItems } from "@/lib/search-engine";
import { getAllSkills, getSkill, getSkillsForArticle, getSkillsForProgram } from "@/lib/skills";
import { getAllSolutions, getSolution } from "@/lib/solutions";
import { STEPIK_COURSES } from "@/lib/stepik-courses";

export type RecommendationPageType = "home" | "article" | "solution" | "skill" | "program" | "career-path";

export type RecommendationItem = {
  type: "article" | "career-path" | "program" | "skill" | "solution";
  title: string;
  description: string;
  href: string;
  label: string;
};

export type RecommendationResult = {
  title: string;
  description: string;
  ctaLabel: string;
  href: string;
  relatedMaterials: RecommendationItem[];
  relatedPrograms: RecommendationItem[];
};

export function getRecommendation(
  pageType: RecommendationPageType,
  id?: string | number
): RecommendationResult {
  switch (pageType) {
    case "article":
      return recommendAfterArticle(String(id));
    case "solution":
      return recommendAfterSolution(String(id));
    case "skill":
      return recommendAfterSkill(String(id));
    case "program":
      return recommendAfterProgram(Number(id));
    case "career-path":
      return recommendAfterCareerPath(String(id));
    case "home":
    default:
      return recommendForHome();
  }
}

function recommendForHome(): RecommendationResult {
  const path = getCareerPath("manager") ?? getAllCareerPaths()[0];
  return {
    title: "Рекомендуем начать с карьерного маршрута",
    description: path.description,
    ctaLabel: "Открыть маршрут",
    href: `/career-paths/${path.slug}`,
    relatedMaterials: getSearchRelatedItems(path.title, `/career-paths/${path.slug}`, 3).map(searchItem),
    relatedPrograms: getCareerPathPrograms(path).slice(0, 3).map(programItem)
  };
}

function recommendAfterArticle(slug: string): RecommendationResult {
  const article = getArticleBySlug(slug);
  if (!article) {
    return recommendForHome();
  }

  const skill = getSkillsForArticle(article, 1)[0] ?? getAllSkills()[0];
  const solution = getAllSolutions().find((item) => skill.solutionSlugs.includes(item.slug)) ?? getAllSolutions()[0];
  const programs = skill.programIds
    .map((id) => STEPIK_COURSES.find((course) => course.id === id))
    .filter((course): course is (typeof STEPIK_COURSES)[number] => Boolean(course))
    .slice(0, 3);

  return {
    title: "Следующий рекомендуемый шаг",
    description: `Перейдите к рабочей задаче «${solution.title}», чтобы применить тему статьи на практике.`,
    ctaLabel: "Открыть задачу",
    href: `/solutions/${solution.slug}`,
    relatedMaterials: [skillItem(skill), ...getAllArticles(false).filter((item) => item.slug !== slug).slice(0, 2).map(articleItem)].slice(0, 3),
    relatedPrograms: programs.map(programItem)
  };
}

function recommendAfterSolution(slug: string): RecommendationResult {
  const solution = getSolution(slug);
  if (!solution) {
    return recommendForHome();
  }

  const careerPath = getRecommendedCareerPathForSolution(solution.slug);
  const firstProgram = solution.programIds
    .map((id) => STEPIK_COURSES.find((course) => course.id === id))
    .find(Boolean);

  return {
    title: careerPath ? "Следующий рекомендуемый маршрут" : "Следующий рекомендуемый шаг",
    description: careerPath
      ? careerPath.description
      : `Начните с программы «${firstProgram?.title ?? "по теме задачи"}», чтобы перейти от задачи к практике.`,
    ctaLabel: careerPath ? "Открыть маршрут" : "Открыть программу",
    href: careerPath ? `/career-paths/${careerPath.slug}` : firstProgram ? getProgramPath(firstProgram) : "/training",
    relatedMaterials: getAllSolutions()
      .filter((item) => item.slug !== solution.slug)
      .slice(0, 3)
      .map(solutionItem),
    relatedPrograms: solution.programIds
      .map((id) => STEPIK_COURSES.find((course) => course.id === id))
      .filter((course): course is (typeof STEPIK_COURSES)[number] => Boolean(course))
      .slice(0, 3)
      .map(programItem)
  };
}

function recommendAfterSkill(slug: string): RecommendationResult {
  const skill = getSkill(slug);
  if (!skill) {
    return recommendForHome();
  }

  const nextSkill = getSkill(skill.nextSkillSlugs[0]) ?? getAllSkills()[0];
  const program = skill.programIds
    .map((id) => STEPIK_COURSES.find((course) => course.id === id))
    .find(Boolean);
  const solution = skill.solutionSlugs.map((solutionSlug) => getSolution(solutionSlug)).find(Boolean);

  return {
    title: "Следующий рекомендуемый навык",
    description: `После навыка «${skill.title}» логично развивать «${nextSkill.title}».`,
    ctaLabel: "Открыть навык",
    href: `/skills/${nextSkill.slug}`,
    relatedMaterials: [program ? programItem(program) : undefined, solution ? solutionItem(solution) : undefined]
      .filter((item): item is RecommendationItem => Boolean(item))
      .concat(skill.nextSkillSlugs.slice(1, 3).map((nextSlug) => getSkill(nextSlug)).filter((item): item is NonNullable<ReturnType<typeof getSkill>> => Boolean(item)).map(skillItem))
      .slice(0, 3),
    relatedPrograms: skill.programIds
      .map((id) => STEPIK_COURSES.find((course) => course.id === id))
      .filter((course): course is (typeof STEPIK_COURSES)[number] => Boolean(course))
      .slice(0, 3)
      .map(programItem)
  };
}

function recommendAfterProgram(id: number): RecommendationResult {
  const program = getProgramPageById(String(id));
  if (!program) {
    return recommendForHome();
  }

  const careerPath = getCareerPathsForProgram(program.course.id)[0];
  const pathPrograms = careerPath ? getCareerPathPrograms(careerPath) : [];
  const currentIndex = pathPrograms.findIndex((course) => course.id === program.course.id);
  const nextProgram = currentIndex >= 0 ? pathPrograms[currentIndex + 1] : undefined;
  const nextSkill = getSkillsForProgram(program.course.id, 1)[0];

  return {
    title: nextProgram ? "Следующий этап развития" : "Следующий рекомендуемый навык",
    description: nextProgram
      ? `Продолжите маршрут программой «${nextProgram.title}».`
      : nextSkill
        ? `Закрепите обучение через навык «${nextSkill.title}».`
        : "Перейдите к рабочим задачам, чтобы применить программу на практике.",
    ctaLabel: nextProgram ? "Открыть программу" : nextSkill ? "Открыть навык" : "Открыть задачи",
    href: nextProgram ? getProgramPath(nextProgram) : nextSkill ? `/skills/${nextSkill.slug}` : "/solutions",
    relatedMaterials: [
      ...(careerPath ? [careerPathItem(careerPath)] : []),
      ...getSkillsForProgram(program.course.id, 2).map(skillItem)
    ].slice(0, 3),
    relatedPrograms: pathPrograms.filter((course) => course.id !== program.course.id).slice(0, 3).map(programItem)
  };
}

function recommendAfterCareerPath(slug: string): RecommendationResult {
  const careerPath = getCareerPath(slug);
  if (!careerPath) {
    return recommendForHome();
  }

  const programs = getCareerPathPrograms(careerPath);
  const nextPath = careerPath.nextPathSlug ? getCareerPath(careerPath.nextPathSlug) : undefined;

  return {
    title: nextPath ? "Следующий рекомендуемый маршрут" : "Следующий этап развития",
    description: nextPath ? nextPath.description : `Начните с программы «${programs[0]?.title ?? "из маршрута"}».`,
    ctaLabel: nextPath ? "Открыть маршрут" : "Открыть программу",
    href: nextPath ? `/career-paths/${nextPath.slug}` : programs[0] ? getProgramPath(programs[0]) : "/training",
    relatedMaterials: careerPath.skillSlugs
      .map((skillSlug) => getSkill(skillSlug))
      .filter((skill): skill is NonNullable<ReturnType<typeof getSkill>> => Boolean(skill))
      .slice(0, 3)
      .map(skillItem),
    relatedPrograms: programs.slice(0, 3).map(programItem)
  };
}

function articleItem(article: ReturnType<typeof getAllArticles>[number]): RecommendationItem {
  return {
    type: "article",
    title: article.frontmatter.title,
    description: article.frontmatter.excerpt,
    href: `/article/${article.slug}`,
    label: "Статья"
  };
}

function careerPathItem(path: NonNullable<ReturnType<typeof getCareerPath>>): RecommendationItem {
  return {
    type: "career-path",
    title: path.title,
    description: path.description,
    href: `/career-paths/${path.slug}`,
    label: "Маршрут"
  };
}

function programItem(program: (typeof STEPIK_COURSES)[number]): RecommendationItem {
  return {
    type: "program",
    title: program.title,
    description: program.result,
    href: getProgramPath(program),
    label: "Программа"
  };
}

function skillItem(skill: NonNullable<ReturnType<typeof getSkill>>): RecommendationItem {
  return {
    type: "skill",
    title: skill.title,
    description: skill.description,
    href: `/skills/${skill.slug}`,
    label: "Навык"
  };
}

function solutionItem(solution: NonNullable<ReturnType<typeof getSolution>>): RecommendationItem {
  return {
    type: "solution",
    title: solution.title,
    description: solution.description,
    href: `/solutions/${solution.slug}`,
    label: "Рабочая задача"
  };
}

function searchItem(item: ReturnType<typeof getSearchRelatedItems>[number]): RecommendationItem {
  return {
    type: item.type,
    title: item.title,
    description: item.description,
    href: item.href,
    label: item.label
  };
}
