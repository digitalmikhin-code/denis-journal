import { getSkillsBySlugs, type Skill } from "@/lib/skills";
import { getSolution, type Solution } from "@/lib/solutions";
import { STEPIK_COURSES, type StepikCourse } from "@/lib/stepik-courses";

export type CareerPathStage = {
  label: string;
  title: string;
  text: string;
  programId?: number;
};

export type CareerPath = {
  slug: string;
  title: string;
  description: string;
  outcome: string;
  audience: string[];
  results: string[];
  taskSlugs: string[];
  skillSlugs: string[];
  programIds: number[];
  articleSlugs: string[];
  stages: CareerPathStage[];
  materials: string[];
  nextPathSlug?: string;
};

export const CAREER_PATHS: CareerPath[] = [
  {
    slug: "manager",
    title: "Руководитель",
    description: "Научитесь управлять людьми, принимать решения, делегировать задачи и строить эффективные команды.",
    outcome: "уверенный руководитель, который держит результат через людей, ритм и ответственность",
    audience: ["начинающие руководители", "Team Lead", "руководители отделов", "специалисты перед повышением"],
    results: ["управлять людьми без микроменеджмента", "делегировать задачи", "проводить One-to-One", "давать обратную связь", "строить управленческий ритм", "развивать ответственность команды"],
    taskSlugs: ["promoted-manager", "team-responsibility", "time-management", "management-system"],
    skillSlugs: ["delegation", "feedback", "one-to-one", "leadership", "task-setting", "planning"],
    programIds: [271020, 273143, 270055, 259560, 244887],
    articleSlugs: [],
    stages: [
      { label: "Новичок", title: "Понять роль", text: "Отделить экспертную работу от управленческой." },
      { label: "Основы", title: "Собрать базу", text: "Делегирование, встречи, обратная связь.", programId: 271020 },
      { label: "Практика", title: "Настроить команду", text: "Ответственность, владельцы и ритм.", programId: 273143 },
      { label: "Продвинутый", title: "Управлять системой", text: "Цели, метрики, процессы.", programId: 244887 }
    ],
    materials: ["карта первых 30 дней руководителя", "чек-лист делегирования", "шаблон One-to-One", "матрица ответственности"],
    nextPathSlug: "agile-leader"
  },
  {
    slug: "project-manager",
    title: "Руководитель проектов",
    description: "Соберите путь в проектное управление: цели, сроки, риски, коммуникации и предсказуемый результат.",
    outcome: "Project Manager, который управляет сроками, рисками, ожиданиями и командным ритмом",
    audience: ["Project Manager", "координаторы проектов", "Team Lead", "специалисты, переходящие в PM"],
    results: ["запускать проект с понятной целью", "разбирать работу на этапы", "вести статусы", "управлять рисками", "синхронизировать участников", "закрывать проект с результатом"],
    taskSlugs: ["project-management", "time-management", "management-system"],
    skillSlugs: ["project-management", "planning", "task-setting", "kanban", "feedback"],
    programIds: [259560, 238810, 265445, 271020],
    articleSlugs: [],
    stages: [
      { label: "Старт", title: "Проектная логика", text: "Цель, участники, ограничения.", programId: 259560 },
      { label: "Практика", title: "Поток работ", text: "План, Kanban, статусы.", programId: 265445 },
      { label: "Управление", title: "Риски и ожидания", text: "Коммуникации и решения.", programId: 238810 },
      { label: "Рост", title: "Лидерство проекта", text: "Команда, влияние, ответственность.", programId: 271020 }
    ],
    materials: ["карта проекта", "шаблон статуса", "реестр рисков", "чек-лист коммуникаций"],
    nextPathSlug: "manager"
  },
  {
    slug: "ai-leader",
    title: "AI Leader",
    description: "Научитесь внедрять ИИ в работу команды как управленческий инструмент, а не модную игрушку.",
    outcome: "лидер, который видит AI-сценарии, запускает пилоты и управляет эффектом",
    audience: ["руководители", "Project Manager", "Product Manager", "аналитики", "лидеры изменений"],
    results: ["выбирать AI-сценарии", "ставить задачи ChatGPT", "проверять результат ИИ", "снижать риски данных", "запускать пилоты", "измерять эффект внедрения"],
    taskSlugs: ["implement-ai", "management-system", "time-management"],
    skillSlugs: ["ai", "task-setting", "planning", "change-management", "leadership"],
    programIds: [243614, 269291, 255881],
    articleSlugs: [],
    stages: [
      { label: "Основы", title: "Промты и задачи", text: "Контекст, формат, критерии.", programId: 243614 },
      { label: "Практика", title: "AI для управления", text: "Анализ, решения, коммуникации.", programId: 269291 },
      { label: "Внедрение", title: "AI-трансформация", text: "Пилоты, эффект, правила.", programId: 255881 }
    ],
    materials: ["матрица AI-сценариев", "шаблон промта", "чек-лист проверки ответа", "правила безопасного пилота"],
    nextPathSlug: "agile-leader"
  },
  {
    slug: "product-manager",
    title: "Product Manager",
    description: "Перейдите к продуктовому мышлению: пользователь, ценность, гипотезы, метрики и развитие решения.",
    outcome: "Product Manager, который связывает потребности пользователя, цели бизнеса и работу команды",
    audience: ["Product Manager", "Project Manager", "предприниматели", "аналитики", "руководители продукта"],
    results: ["формулировать продуктовую проблему", "работать с гипотезами", "приоритизировать идеи", "выбирать метрики", "проверять ценность", "синхронизировать команду"],
    taskSlugs: ["product-manager", "project-management", "management-system"],
    skillSlugs: ["planning", "okr", "task-setting", "project-management", "ai"],
    programIds: [264335, 284646, 244887, 269291],
    articleSlugs: [],
    stages: [
      { label: "Новичок", title: "Продуктовая логика", text: "Пользователь, проблема, ценность.", programId: 264335 },
      { label: "Практика", title: "Гипотезы и метрики", text: "Проверка идей и приоритеты.", programId: 284646 },
      { label: "Система", title: "Продукт как система", text: "Связи, ограничения, рост.", programId: 244887 }
    ],
    materials: ["шаблон гипотезы", "матрица приоритизации", "карта метрик", "чек-лист пользовательской проблемы"],
    nextPathSlug: "ai-leader"
  },
  {
    slug: "agile-leader",
    title: "Agile Leader",
    description: "Научитесь внедрять Scrum, Kanban и изменения без ритуального театра и перегруза команды.",
    outcome: "лидер изменений, который улучшает поток работы, командный ритм и качество поставки",
    audience: ["Scrum Master", "Agile Coach", "Project Manager", "Team Lead", "руководители команд"],
    results: ["понимать Scrum и Kanban", "видеть поток работы", "ограничивать WIP", "проводить ретроспективы", "внедрять изменения", "управлять сопротивлением"],
    taskSlugs: ["implement-agile", "team-responsibility", "project-management"],
    skillSlugs: ["scrum", "kanban", "change-management", "planning", "leadership"],
    programIds: [264335, 265445, 238810, 255881],
    articleSlugs: [],
    stages: [
      { label: "Основы", title: "Agile без мифов", text: "Принципы, роли, ритм.", programId: 264335 },
      { label: "Поток", title: "Kanban и WIP", text: "Визуализация и ограничения.", programId: 265445 },
      { label: "Масштаб", title: "Изменения", text: "Пилоты, метрики, закрепление.", programId: 255881 }
    ],
    materials: ["шаблон Kanban-доски", "чек-лист ретроспективы", "карта внедрения Agile", "памятка по WIP"],
    nextPathSlug: "ai-leader"
  },
  {
    slug: "career-growth",
    title: "Карьерный рост",
    description: "Соберите путь профессионального роста: влияние, видимость, управленческая база и следующий карьерный шаг.",
    outcome: "специалист, который осознанно растет в управление, продукт или экспертную роль",
    audience: ["сильные специалисты", "эксперты", "будущие руководители", "Product/Project специалисты", "люди перед повышением"],
    results: ["упаковать профессиональный опыт", "выбрать следующий карьерный шаг", "развивать влияние", "строить личную стратегию", "готовиться к повышению", "говорить на языке результата"],
    taskSlugs: ["promoted-manager", "product-manager", "time-management"],
    skillSlugs: ["leadership", "planning", "feedback", "task-setting", "ai"],
    programIds: [230630, 241779, 271020, 264335],
    articleSlugs: [],
    stages: [
      { label: "Диагностика", title: "Понять точку роста", text: "Роль, цели, ограничения." },
      { label: "Упаковка", title: "Показать ценность", text: "Опыт, кейсы, позиционирование.", programId: 230630 },
      { label: "Переход", title: "Собрать управленческую базу", text: "Решения, ответственность, влияние.", programId: 271020 },
      { label: "Выбор", title: "Углубить траекторию", text: "Продукт, проекты или управление.", programId: 264335 }
    ],
    materials: ["карта карьерного шага", "шаблон кейса", "чек-лист подготовки к повышению", "матрица навыков"],
    nextPathSlug: "manager"
  }
];

export function getAllCareerPaths(): CareerPath[] {
  return CAREER_PATHS;
}

export function getCareerPath(slug: string): CareerPath | undefined {
  return CAREER_PATHS.find((path) => path.slug === slug);
}

export function getCareerPathPrograms(path: CareerPath): StepikCourse[] {
  return path.programIds
    .map((id) => STEPIK_COURSES.find((course) => course.id === id))
    .filter((course): course is StepikCourse => Boolean(course));
}

export function getCareerPathSkills(path: CareerPath): Skill[] {
  return getSkillsBySlugs(path.skillSlugs);
}

export function getCareerPathSolutions(path: CareerPath): Solution[] {
  return path.taskSlugs
    .map((slug) => getSolution(slug))
    .filter((solution): solution is Solution => Boolean(solution));
}

export function getCareerPathsForProgram(programId: number): CareerPath[] {
  return CAREER_PATHS.filter((path) => path.programIds.includes(programId));
}

export function getCareerPathsForSkill(skillSlug: string): CareerPath[] {
  return CAREER_PATHS.filter((path) => path.skillSlugs.includes(skillSlug));
}

export function getRecommendedCareerPathForSolution(solutionSlug: string): CareerPath | undefined {
  return CAREER_PATHS.find((path) => path.taskSlugs.includes(solutionSlug));
}
