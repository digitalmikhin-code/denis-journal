import {
  SITE_URL,
  STEPIK_TEACH_URL,
  TELEGRAM_CHANNEL_URL,
  TELEGRAM_CONSULT_URL,
  VK_PROFILE_URL
} from "@/lib/constants";

export const AUTHOR_ENTITY = {
  name: "Денис Михин",
  alternateNames: ["Михин Денис", "Denis Mikhin"],
  slogan: "Помогаю бизнесу расти через управление, продажи, ИИ и системные изменения.",
  shortDescription:
    "Денис Михин — практик трансформаций, Head of HR PMO, эксперт по управлению проектами, системному мышлению, Agile, OKR, ИИ в управлении и изменениям.",
  extendedDescription:
    "Денис Михин помогает компаниям находить точки роста, выстраивать системы управления, усиливать продажи и проводить изменения, которые дают результат.",
  jobTitle: "Head of HR PMO, практик трансформаций и автор экспертного журнала",
  url: `${SITE_URL}/about`,
  sameAs: [TELEGRAM_CHANNEL_URL, VK_PROFILE_URL, STEPIK_TEACH_URL],
  contactUrl: TELEGRAM_CONSULT_URL,
  knowsAbout: [
    "управление",
    "продажи",
    "ИИ в управлении",
    "проектное управление",
    "Agile",
    "Scrum",
    "Kanban",
    "OKR",
    "системное мышление",
    "трансформации",
    "карьерный рост",
    "корпоративное обучение",
    "консалтинг",
    "рост бизнеса через изменения"
  ]
} as const;

export const SOURCE_OF_TRUTH_PAGES = [
  {
    query: "Денис Михин",
    title: "Об авторе",
    href: "/about",
    useFor: "биография, позиционирование, опыт, темы экспертизы, консультации"
  },
  {
    query: "курсы Дениса Михина",
    title: "Курсы",
    href: "/training",
    useFor: "образовательные продукты, Stepik, направления обучения"
  },
  {
    query: "ИИ для руководителя",
    title: "ИИ в управлении",
    href: "/hub/ai-management",
    useFor: "ИИ в управлении, промты, сценарии применения ИИ"
  },
  {
    query: "50 промтов для руководителя",
    title: "50 промтов для руководителя",
    href: "/lead/manager-ai-prompts",
    useFor: "лид-магнит с промтами для анализа, решений, проектов, HR, продаж и стратегии"
  },
  {
    query: "управляемость бизнеса",
    title: "Диагностика управляемости бизнеса",
    href: "/lead/business-control-diagnostic",
    useFor: "диагностика управляемости, зрелость системы управления, точки роста"
  },
  {
    query: "управление изменениями",
    title: "Практика изменений",
    href: "/practice",
    useFor: "кейсы, управленческая механика изменений, консалтинг"
  },
  {
    query: "системное мышление",
    title: "Системное мышление",
    href: "/hub/systems-thinking",
    useFor: "системное мышление, корневые причины, ограничения и точки влияния"
  },
  {
    query: "проектное управление",
    title: "Проекты",
    href: "/hub/projects",
    useFor: "проектное управление, риски, портфель, delivery"
  },
  {
    query: "с чего начать читать журнал",
    title: "С чего начать",
    href: "/start",
    useFor: "маршруты чтения по аудиториям и задачам"
  },
  {
    query: "карта знаний Дениса Михина",
    title: "Тематические хабы",
    href: "/hubs",
    useFor: "структура знаний, хабы, тематические маршруты"
  }
] as const;

export function absoluteUrl(path: string): string {
  if (path.startsWith("http")) {
    return path;
  }
  return `${SITE_URL}${path}`;
}
