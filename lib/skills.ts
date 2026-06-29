import type { Category } from "@/lib/constants";
import type { Article, ArticleSummary } from "@/lib/content";

export type Skill = {
  slug: string;
  title: string;
  description: string;
  outcome: string;
  overview: string[];
  importance: string[];
  mistakes: string[];
  algorithm: string[];
  articleSlugs: string[];
  articleSignals: string[];
  programIds: number[];
  solutionSlugs: string[];
  nextSkillSlugs: string[];
};

type ArticleLike = Article | ArticleSummary;

export const SKILLS: Skill[] = [
  skill("delegation", "Делегирование", "Передача задач и ответственности без потери результата.", "ставить задачу так, чтобы человек понимал результат, границы и контрольные точки", {
    importance: ["снимает перегруз с руководителя", "помогает команде брать ответственность", "ускоряет развитие сотрудников"],
    mistakes: ["передают задачи слишком поздно", "не объясняют ожидаемый результат", "контролируют каждую мелочь", "не дают обратную связь", "забирают задачу обратно"],
    algorithm: ["Подготовить задачу", "Передать ответственность", "Определить контрольные точки", "Проверить результат", "Провести обратную связь"],
    signals: ["делег", "ответствен", "руковод", "команд"],
    programs: [271020, 273143, 259560],
    solutions: ["promoted-manager", "team-responsibility", "time-management"],
    next: ["feedback", "task-setting", "leadership"]
  }),
  skill("task-setting", "Постановка задач", "Формулирование результата, критериев готовности и границ ответственности.", "ставить задачи так, чтобы исполнитель понимал, что именно считается хорошим результатом", {
    importance: ["снижает переделки", "делает ожидания прозрачными", "помогает контролировать результат без микроменеджмента"],
    mistakes: ["формулируют только действие, а не результат", "не задают критерии готовности", "не фиксируют срок", "не уточняют владельца", "не проверяют понимание"],
    algorithm: ["Описать результат", "Задать критерии", "Назначить владельца", "Согласовать срок", "Проверить понимание"],
    signals: ["задач", "цели", "результат", "ожид"],
    programs: [259560, 271020, 244887],
    solutions: ["project-management", "team-responsibility", "management-system"],
    next: ["delegation", "planning", "feedback"]
  }),
  skill("feedback", "Обратная связь", "Разговор о результате, действиях и последствиях без обвинений.", "давать обратную связь так, чтобы она помогала улучшать работу, а не защищаться", {
    importance: ["ускоряет обучение команды", "помогает удерживать договоренности", "снижает повторение ошибок"],
    mistakes: ["обсуждают личность вместо действия", "копят обратную связь слишком долго", "говорят слишком общо", "не связывают с результатом", "не договариваются о следующем шаге"],
    algorithm: ["Назвать факт", "Показать влияние", "Связать с результатом", "Обсудить варианты", "Зафиксировать следующий шаг"],
    signals: ["обрат", "feedback", "команд", "ответствен"],
    programs: [271020, 273143, 270055],
    solutions: ["promoted-manager", "team-responsibility", "management-system"],
    next: ["one-to-one", "leadership", "task-setting"]
  }),
  skill("one-to-one", "Проведение One-to-One", "Регулярная управленческая встреча для фокуса, обратной связи и развития.", "проводить One-to-One так, чтобы встреча помогала управлять ожиданиями, ростом и рисками", {
    importance: ["помогает раньше видеть проблемы", "укрепляет доверие", "делает развитие сотрудника регулярным процессом"],
    mistakes: ["проводят встречу как статус", "нет повестки", "не фиксируют договоренности", "говорит только руководитель", "не возвращаются к прошлым решениям"],
    algorithm: ["Собрать повестку", "Обсудить прогресс", "Снять блокеры", "Дать обратную связь", "Зафиксировать договоренности"],
    signals: ["one-to-one", "встреч", "руковод", "команд"],
    programs: [271020, 273143, 270055],
    solutions: ["promoted-manager", "team-responsibility", "time-management"],
    next: ["feedback", "delegation", "leadership"]
  }),
  skill("scrum", "Scrum", "Фреймворк командной работы короткими циклами с прозрачным результатом.", "понимать роли, события и артефакты Scrum и применять их без ритуального театра", {
    importance: ["помогает работать итерациями", "делает прогресс видимым", "усиливает командную обратную связь"],
    mistakes: ["копируют события без цели", "не работают с backlog", "игнорируют Definition of Done", "не используют ретроспективы", "смешивают роли"],
    algorithm: ["Определить продуктовую цель", "Собрать backlog", "Запланировать sprint", "Показать increment", "Улучшить процесс"],
    signals: ["scrum", "спринт", "agile", "ретро"],
    programs: [264335, 238810, 271603],
    solutions: ["implement-agile", "project-management", "team-responsibility"],
    next: ["kanban", "planning", "change-management"]
  }),
  skill("kanban", "Kanban", "Управление потоком работы через визуализацию, WIP и регулярные улучшения.", "видеть поток задач, ограничивать параллельную работу и находить узкие места", {
    importance: ["снижает перегруз", "показывает реальные блокеры", "ускоряет поток работы"],
    mistakes: ["делают доску складом задач", "не ограничивают WIP", "не обновляют статусы", "не анализируют блокеры", "путают занятость с потоком"],
    algorithm: ["Визуализировать поток", "Ограничить WIP", "Найти блокеры", "Измерить скорость", "Улучшить правила работы"],
    signals: ["kanban", "wip", "поток", "перегруз"],
    programs: [265445, 264335, 238810],
    solutions: ["implement-agile", "time-management", "management-system"],
    next: ["scrum", "planning", "project-management"]
  }),
  skill("okr", "OKR", "Система целей и ключевых результатов для фокуса и прозрачного прогресса.", "связывать цели, метрики и действия команды в один управленческий ритм", {
    importance: ["удерживает фокус", "помогает выбирать приоритеты", "связывает стратегию с работой команды"],
    mistakes: ["пишут KPI вместо результатов", "берут слишком много целей", "не проводят check-in", "не связывают OKR с решениями", "меняют цели каждую неделю"],
    algorithm: ["Сформулировать Objective", "Выбрать Key Results", "Связать инициативы", "Проводить check-in", "Подвести итоги"],
    signals: ["okr", "цели", "метрик", "стратег"],
    programs: [270800, 270637, 244887],
    solutions: ["management-system", "project-management", "time-management"],
    next: ["planning", "leadership", "change-management"]
  }),
  skill("project-management", "Управление проектами", "Сбор цели, сроков, рисков, коммуникаций и результата в управляемую систему.", "вести проект так, чтобы команда понимала цель, сроки, риски и ближайшие решения", {
    importance: ["делает работу предсказуемой", "снижает риск сорванных сроков", "помогает синхронизировать участников"],
    mistakes: ["стартуют без цели", "не фиксируют риски", "теряют решения после встреч", "не управляют ожиданиями", "путают план с реальностью"],
    algorithm: ["Определить цель", "Разложить работу", "Назначить владельцев", "Управлять рисками", "Проводить статусы"],
    signals: ["проект", "срок", "риск", "статус"],
    programs: [259560, 238810, 271020],
    solutions: ["project-management", "management-system", "time-management"],
    next: ["planning", "kanban", "okr"]
  }),
  skill("change-management", "Управление изменениями", "Проведение изменений через смысл, коммуникацию, ритм и закрепление новых практик.", "внедрять изменения так, чтобы они не разваливались после первого сопротивления", {
    importance: ["снижает сопротивление", "помогает закреплять новые практики", "делает внедрение управляемым"],
    mistakes: ["объявляют изменение без причины", "не работают с ожиданиями", "недооценивают сопротивление", "не измеряют эффект", "не закрепляют новый ритм"],
    algorithm: ["Назвать причину", "Описать новую практику", "Найти сторонников", "Запустить пилот", "Закрепить ритм"],
    signals: ["измен", "трансформ", "внедр", "agile"],
    programs: [255881, 238810, 271020],
    solutions: ["implement-agile", "implement-ai", "management-system"],
    next: ["leadership", "okr", "planning"]
  }),
  skill("ai", "Использование AI", "Применение ИИ в рабочих сценариях: анализ, тексты, решения, автоматизация и проверка.", "использовать AI как помощника в работе, сохраняя качество, безопасность и ответственность", {
    importance: ["ускоряет рутинную работу", "помогает анализировать информацию", "усиливает подготовку решений"],
    mistakes: ["начинают с инструмента, а не задачи", "не проверяют результат", "отдают чувствительные данные", "пишут слишком общие промты", "не измеряют эффект"],
    algorithm: ["Выбрать сценарий", "Дать контекст", "Задать формат", "Проверить результат", "Встроить в процесс"],
    signals: ["ии", "ai", "chatgpt", "промт"],
    programs: [243614, 269291, 255881],
    solutions: ["implement-ai", "management-system", "time-management"],
    next: ["task-setting", "planning", "change-management"]
  }),
  skill("leadership", "Лидерство", "Влияние, ясность и ответственность руководителя в работе с людьми и решениями.", "вести команду через смысл, ожидания, решения и личный пример", {
    importance: ["усиливает доверие", "помогает проводить сложные решения", "создает устойчивость команды"],
    mistakes: ["путают лидерство с контролем", "избегают сложных разговоров", "не объясняют смысл", "не держат фокус", "решают все вместо команды"],
    algorithm: ["Назвать направление", "Объяснить смысл", "Передать ответственность", "Поддержать команду", "Закрепить результат"],
    signals: ["лидер", "влия", "руковод", "команд"],
    programs: [271020, 273143, 270055],
    solutions: ["promoted-manager", "team-responsibility", "management-system"],
    next: ["delegation", "feedback", "change-management"]
  }),
  skill("planning", "Планирование", "Превращение целей и задач в понятный порядок действий, сроков и ресурсов.", "планировать работу так, чтобы команда видела приоритеты, зависимости и реалистичный следующий шаг", {
    importance: ["снижает хаос", "помогает выбирать приоритеты", "делает работу предсказуемой"],
    mistakes: ["планируют все сразу", "не учитывают ограничения", "не оставляют буфер", "не пересматривают план", "не связывают план с целями"],
    algorithm: ["Собрать задачи", "Выбрать приоритеты", "Оценить ограничения", "Разложить шаги", "Проверять прогресс"],
    signals: ["план", "приоритет", "срок", "ресурс"],
    programs: [259560, 270800, 271020],
    solutions: ["time-management", "project-management", "management-system"],
    next: ["project-management", "okr", "kanban"]
  })
];

export function getAllSkills(): Skill[] {
  return SKILLS;
}

export function getSkill(slug: string): Skill | undefined {
  return SKILLS.find((skillItem) => skillItem.slug === slug);
}

export function getSkillsBySlugs(slugs: string[], limit = slugs.length): Skill[] {
  return slugs
    .map((slug) => getSkill(slug))
    .filter((skillItem): skillItem is Skill => Boolean(skillItem))
    .slice(0, limit);
}

export function getSkillsForArticle(article: ArticleLike, limit = 4): Skill[] {
  const manual = article.frontmatter.skills?.length ? getSkillsBySlugs(article.frontmatter.skills, limit) : [];
  if (manual.length >= limit) {
    return manual;
  }

  const haystack = [
    article.frontmatter.title,
    article.frontmatter.excerpt,
    article.frontmatter.category,
    ...(article.frontmatter.tags ?? [])
  ]
    .join(" ")
    .toLowerCase();

  const inferred = SKILLS.map((skillItem) => ({
    skill: skillItem,
    score:
      skillItem.articleSignals.filter((signal) => haystack.includes(signal.toLowerCase())).length +
      scoreByCategory(skillItem, article.frontmatter.category)
  }))
    .filter((item) => item.score > 0 && !manual.some((skillItem) => skillItem.slug === item.skill.slug))
    .sort((left, right) => right.score - left.score)
    .map((item) => item.skill);

  return [...manual, ...inferred, ...SKILLS].filter(uniqueSkill).slice(0, limit);
}

export function getSkillsForProgram(programId: number, limit = 6): Skill[] {
  return SKILLS.filter((skillItem) => skillItem.programIds.includes(programId)).slice(0, limit);
}

export function getSkillsForSolution(solutionSlug: string, limit = 5): Skill[] {
  return SKILLS.filter((skillItem) => skillItem.solutionSlugs.includes(solutionSlug)).slice(0, limit);
}

function skill(
  slug: string,
  title: string,
  description: string,
  outcome: string,
  options: {
    importance: string[];
    mistakes: string[];
    algorithm: string[];
    signals: string[];
    programs: number[];
    solutions: string[];
    next: string[];
    articles?: string[];
  }
): Skill {
  return {
    slug,
    title,
    description,
    outcome,
    overview: [
      `${title} — это прикладной навык, который помогает действовать в рабочей ситуации, а не просто знать термин.`,
      description,
      "На этой странице собраны связанные статьи, программы и рабочие задачи, чтобы навык можно было развивать последовательно."
    ],
    importance: options.importance,
    mistakes: options.mistakes,
    algorithm: options.algorithm,
    articleSlugs: options.articles ?? [],
    articleSignals: options.signals,
    programIds: options.programs,
    solutionSlugs: options.solutions,
    nextSkillSlugs: options.next
  };
}

function scoreByCategory(skillItem: Skill, category: Category): number {
  const categoryMap: Record<Category, string[]> = {
    career: ["delegation", "feedback", "one-to-one", "leadership"],
    management: ["delegation", "task-setting", "project-management", "planning", "feedback"],
    thinking: ["okr", "planning", "ai"],
    agile: ["scrum", "kanban", "change-management"],
    architecture: ["okr", "planning", "change-management", "project-management"],
    cases: ["project-management", "planning", "leadership"],
    ai: ["ai", "task-setting", "change-management"]
  };

  return categoryMap[category]?.includes(skillItem.slug) ? 1 : 0;
}

function uniqueSkill(skillItem: Skill, index: number, items: Skill[]): boolean {
  return items.findIndex((item) => item.slug === skillItem.slug) === index;
}
