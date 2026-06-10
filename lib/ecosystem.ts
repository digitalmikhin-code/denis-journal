import type { HubSlug } from "@/lib/hubs";

export type EcosystemLink = {
  label: string;
  href: string;
};

export type AudienceRoute = {
  id: string;
  title: string;
  pains: string[];
  needs: string[];
  searchQueries: string[];
  firstContent: EcosystemLink;
  nextStep: EcosystemLink;
  leadMagnet: EcosystemLink;
  course: EcosystemLink;
  consultation: string;
  returnScenario: string;
};

export type EntryScenario = {
  source: string;
  path: string[];
  trustPoint: string;
  returnPoint: string;
  salePoint: string;
};

export type HubSeoArchitecture = {
  slug: HubSlug;
  seoTitle: string;
  description: string;
  h1: string;
  h2: string[];
  h3: string[];
  searchQueries: string[];
  internalLinks: EcosystemLink[];
  returnMechanic: string;
};

export type LeadMagnetRoute = {
  title: string;
  audience: string;
  place: string;
  hubHref: string;
  courseHref: string;
  consultationCta: string;
  returnScenario: string;
};

export type CtaRule = {
  stage: string;
  cta: string;
  where: string;
  audience: string;
  expectedConversion: string;
};

export type EcosystemMetric = {
  metric: string;
  why: string;
  target: string;
  actionIfLow: string;
};

export const ECOSYSTEM_FUNNEL = [
  "Статья",
  "Следующая статья",
  "Подборка материалов",
  "Тематический хаб",
  "Лид-магнит или диагностика",
  "Telegram / VK",
  "Курс",
  "Кейс",
  "Консультация"
] as const;

export const ECOSYSTEM_AUDIENCES: AudienceRoute[] = [
  {
    id: "business-owner",
    title: "Собственник бизнеса",
    pains: ["рост держится на ручном управлении", "непонятно, где точка роста", "много инициатив без эффекта"],
    needs: ["быстро увидеть ограничения", "понять управляемость", "связать изменения с деньгами"],
    searchQueries: ["как найти точки роста бизнеса", "диагностика управляемости бизнеса", "как снизить хаос в компании"],
    firstContent: { label: "Диагностика управляемости бизнеса", href: "/lead/business-control-diagnostic" },
    nextStep: { label: "Практика изменений", href: "/practice" },
    leadMagnet: { label: "Диагностика управляемости бизнеса", href: "/lead/business-control-diagnostic" },
    course: { label: "Курсы для управленческой базы", href: "/training" },
    consultation: "Разбор системы управления, точек роста и портфеля изменений.",
    returnScenario: "Получить результат диагностики, затем серию материалов по управляемости и приглашение в Telegram."
  },
  {
    id: "ceo",
    title: "Генеральный директор",
    pains: ["стратегия не доходит до исполнения", "руководители тянут в разные стороны", "сложно удерживать фокус"],
    needs: ["связать стратегию, проекты и ритмы управления", "увидеть разрывы исполнения"],
    searchQueries: ["как связать стратегию и исполнение", "управленческий контур компании", "портфель проектов компании"],
    firstContent: { label: "Хаб Управление", href: "/hub/management" },
    nextStep: { label: "Хаб Проекты", href: "/hub/projects" },
    leadMagnet: { label: "Карта рисков", href: "/diagnostics" },
    course: { label: "Управление проектами", href: "https://stepik.org/course/259560/promo" },
    consultation: "Разбор управленческого контура и портфеля инициатив.",
    returnScenario: "Вернуть через подборку про стратегию, проекты и управленческие ритмы."
  },
  {
    id: "department-lead",
    title: "Руководитель подразделения",
    pains: ["команда занята, но результат неустойчив", "много контроля", "не хватает самостоятельности"],
    needs: ["наладить ответственность", "упростить приоритизацию", "выстроить регулярный менеджмент"],
    searchQueries: ["как управлять командой без микроменеджмента", "эффективный руководитель", "управляемость команды"],
    firstContent: { label: "С чего начать", href: "/start" },
    nextStep: { label: "Хаб Управление", href: "/hub/management" },
    leadMagnet: { label: "Чек-лист управленческого хаоса", href: "/diagnostics" },
    course: { label: "Эффективный руководитель", href: "https://stepik.org/course/271020/promo" },
    consultation: "Настройка регулярного менеджмента и ответственности в команде.",
    returnScenario: "Вернуть через статьи про ритмы, ответственность и принятие решений."
  },
  {
    id: "hr-director",
    title: "HR-директор",
    pains: ["HR-инициативы не всегда связаны с бизнес-результатом", "изменения буксуют", "сложно доказать эффект"],
    needs: ["связать людей, процессы и результат", "управлять изменениями", "показать вклад HR"],
    searchQueries: ["как связать HR и бизнес результат", "HR трансформация", "управление изменениями в компании"],
    firstContent: { label: "Хаб Трансформации", href: "/hub/transformations" },
    nextStep: { label: "Практика изменений", href: "/practice" },
    leadMagnet: { label: "Шаблон стратегической сессии", href: "/diagnostics" },
    course: { label: "Agile AI Transformation", href: "https://stepik.org/course/255881/promo" },
    consultation: "Разбор HR-инициатив через бизнес-эффект и систему изменений.",
    returnScenario: "Вернуть через кейсы о связке HR, проектов и результата."
  },
  {
    id: "hr-bp",
    title: "HR BP",
    pains: ["много запросов от бизнеса", "не всегда понятна корневая причина", "сложно влиять без формальной власти"],
    needs: ["системно диагностировать ситуацию", "говорить с бизнесом на языке результата"],
    searchQueries: ["HR BP бизнес партнерство", "диагностика команды", "как HR влияет на бизнес"],
    firstContent: { label: "Хаб Системное мышление", href: "/hub/systems-thinking" },
    nextStep: { label: "Хаб Управление", href: "/hub/management" },
    leadMagnet: { label: "Инструменты системного мышления", href: "/diagnostics" },
    course: { label: "Курсы по управлению", href: "/training" },
    consultation: "Разбор бизнес-запроса и поиск системной причины.",
    returnScenario: "Вернуть через статьи о системных причинах, влиянии и диагностике."
  },
  {
    id: "project-manager",
    title: "Project Manager",
    pains: ["сроки разъезжаются", "риски всплывают поздно", "заказчик меняет ожидания"],
    needs: ["управлять рисками", "держать контур коммуникаций", "вести проект к результату"],
    searchQueries: ["как управлять рисками проекта", "проектное управление для руководителя", "как снизить хаос в проектах"],
    firstContent: { label: "Хаб Проекты", href: "/hub/projects" },
    nextStep: { label: "Практика изменений", href: "/practice" },
    leadMagnet: { label: "Карта рисков", href: "/diagnostics" },
    course: { label: "Управление проектами", href: "https://stepik.org/course/259560/promo" },
    consultation: "Разбор проектного контура, рисков и портфеля.",
    returnScenario: "Вернуть через подборку по рискам, статусам и управлению ожиданиями."
  },
  {
    id: "product-manager",
    title: "Product Manager",
    pains: ["много гипотез", "сложно связать продукт с системой бизнеса", "не хватает фокуса"],
    needs: ["видеть продукт как систему", "приоритизировать", "связать ценность и delivery"],
    searchQueries: ["продуктовое мышление", "продукт как система", "приоритизация продуктовых гипотез"],
    firstContent: { label: "Хаб Системное мышление", href: "/hub/systems-thinking" },
    nextStep: { label: "Хаб Проекты", href: "/hub/projects" },
    leadMagnet: { label: "Матрица приоритизации", href: "/diagnostics" },
    course: { label: "Продукт - это система", href: "https://stepik.org/course/244887/promo" },
    consultation: "Разбор продукта, гипотез и системы принятия решений.",
    returnScenario: "Вернуть через материалы о продуктовой системе и ограничениях роста."
  },
  {
    id: "portfolio-manager",
    title: "Portfolio Manager",
    pains: ["портфель перегружен", "неясно, что остановить", "нет единой картины эффекта"],
    needs: ["связать проекты с целями", "видеть приоритеты", "управлять ограничениями"],
    searchQueries: ["управление портфелем проектов", "приоритизация проектов", "как выбрать проекты"],
    firstContent: { label: "Хаб Проекты", href: "/hub/projects" },
    nextStep: { label: "Практика изменений", href: "/practice" },
    leadMagnet: { label: "Матрица приоритизации", href: "/diagnostics" },
    course: { label: "Управление проектами", href: "https://stepik.org/course/259560/promo" },
    consultation: "Разбор портфеля проектов и правил приоритизации.",
    returnScenario: "Вернуть через кейсы о хаосе в портфеле и прозрачности."
  },
  {
    id: "agile-coach",
    title: "Agile Coach",
    pains: ["Agile превращается в ритуалы", "бизнес не видит результата", "команды сопротивляются"],
    needs: ["связать Agile с управленческим контуром", "показать эффект", "работать с изменениями"],
    searchQueries: ["почему agile не работает", "agile трансформация", "scrum kanban управление"],
    firstContent: { label: "Хаб Трансформации", href: "/hub/transformations" },
    nextStep: { label: "Хаб Проекты", href: "/hub/projects" },
    leadMagnet: { label: "Чек-лист внедрения ИИ и Agile без инфошума", href: "/diagnostics" },
    course: { label: "Agile AI Transformation", href: "https://stepik.org/course/255881/promo" },
    consultation: "Разбор Agile как системы изменений, а не набора церемоний.",
    returnScenario: "Вернуть через разборы Agile, Kanban, Scrum и управленческого контура."
  },
  {
    id: "scrum-master",
    title: "Scrum Master",
    pains: ["команда формально делает Scrum", "нет зрелости взаимодействия", "сложно влиять на систему"],
    needs: ["понимать роль", "видеть ограничения", "развивать командную зрелость"],
    searchQueries: ["scrum master роль", "scrum master диагностика", "scrum master развитие"],
    firstContent: { label: "Диагностики", href: "/diagnostics" },
    nextStep: { label: "Хаб Проекты", href: "/hub/projects" },
    leadMagnet: { label: "Диагностика роли Scrum Master", href: "/diagnostics" },
    course: { label: "Scrum / Kanban курсы", href: "/training" },
    consultation: "Разбор роли Scrum Master и ограничений команды.",
    returnScenario: "Вернуть через диагностику зрелости и подборку по Scrum/Kanban."
  },
  {
    id: "transformation-lead",
    title: "Руководитель трансформаций",
    pains: ["инициатив много, системных изменений мало", "люди устали", "эффект трудно удержать"],
    needs: ["собрать архитектуру изменений", "связать инициативы с бизнесом", "управлять сопротивлением"],
    searchQueries: ["управление трансформацией", "как проводить изменения", "почему изменения не закрепляются"],
    firstContent: { label: "Хаб Трансформации", href: "/hub/transformations" },
    nextStep: { label: "Практика изменений", href: "/practice" },
    leadMagnet: { label: "Шаблон стратегической сессии", href: "/diagnostics" },
    course: { label: "Agile AI Transformation", href: "https://stepik.org/course/255881/promo" },
    consultation: "Проектирование системы изменений и управленческого контура.",
    returnScenario: "Вернуть через серию материалов о трансформациях и кейс-библиотеку."
  },
  {
    id: "project-lead",
    title: "Руководитель проектов",
    pains: ["много проектов и мало прозрачности", "команды перегружены", "результат зависит от героизма"],
    needs: ["собрать систему управления проектами", "наладить статусы", "видеть риски"],
    searchQueries: ["руководитель проектов как управлять", "управление проектами с нуля", "проектный офис"],
    firstContent: { label: "Хаб Проекты", href: "/hub/projects" },
    nextStep: { label: "Курсы", href: "/training" },
    leadMagnet: { label: "Карта рисков", href: "/diagnostics" },
    course: { label: "Управление проектами", href: "https://stepik.org/course/259560/promo" },
    consultation: "Разбор проектной системы, ролей и метрик.",
    returnScenario: "Вернуть через практические статьи и курс по проектному управлению."
  },
  {
    id: "ai-lead",
    title: "Руководитель, внедряющий ИИ",
    pains: ["много хайпа", "непонятно, где экономия", "команда использует ИИ хаотично"],
    needs: ["найти сценарии применения", "встроить ИИ в процессы", "измерить эффект"],
    searchQueries: ["ИИ в управлении", "как внедрить ИИ в бизнес процессы", "промты для руководителя"],
    firstContent: { label: "50 промтов для руководителя", href: "/lead/manager-ai-prompts" },
    nextStep: { label: "Хаб ИИ в управлении", href: "/hub/ai-management" },
    leadMagnet: { label: "50 промтов для руководителя", href: "/lead/manager-ai-prompts" },
    course: { label: "Промт-инжиниринг", href: "https://stepik.org/course/243614/promo" },
    consultation: "Разбор сценариев ИИ и внедрения в управленческие процессы.",
    returnScenario: "Вернуть через чек-листы, промты, кейсы и Telegram-разборы."
  },
  {
    id: "career-specialist",
    title: "Специалист, который хочет карьерного роста",
    pains: ["экспертиза есть, роста нет", "непонятно, как стать заметнее", "сложно перейти в управление"],
    needs: ["понять траекторию", "усилить управленческое мышление", "упаковать опыт"],
    searchQueries: ["как вырасти в руководителя", "карьерный рост специалиста", "как стать заметным в компании"],
    firstContent: { label: "Хаб Карьера", href: "/hub/career" },
    nextStep: { label: "С чего начать", href: "/start" },
    leadMagnet: { label: "Карта карьерного роста на 90 дней", href: "/diagnostics" },
    course: { label: "Эффективный руководитель", href: "https://stepik.org/course/271020/promo" },
    consultation: "Карьерный разбор через систему влияния, роли и управленческой зрелости.",
    returnScenario: "Вернуть через карьерные подборки, Telegram и курс для руководителей."
  },
  {
    id: "corporate-learning",
    title: "Корпоративный заказчик обучения",
    pains: ["нужна программа под бизнес-задачу", "обычные курсы не меняют практику", "нужен измеримый эффект"],
    needs: ["связать обучение с изменениями", "подобрать маршрут", "получить формат под компанию"],
    searchQueries: ["корпоративное обучение руководителей", "обучение project manager", "обучение ИИ для руководителей"],
    firstContent: { label: "Курсы", href: "/training" },
    nextStep: { label: "Практика изменений", href: "/practice" },
    leadMagnet: { label: "Диагностика управляемости бизнеса", href: "/lead/business-control-diagnostic" },
    course: { label: "Витрина курсов", href: "/training" },
    consultation: "Проектирование корпоративной программы обучения под бизнес-задачу.",
    returnScenario: "Вернуть через кейсы, хабы и предложение обсудить корпоративный маршрут."
  }
];

export const ENTRY_SCENARIOS: EntryScenario[] = [
  {
    source: "Яндекс",
    path: ["SEO-статья", "продолжить маршрут", "хаб", "лид-магнит", "Telegram"],
    trustPoint: "авторская рамка и связанный хаб",
    returnPoint: "подписка или сохранение материала",
    salePoint: "курс после 2-3 материалов по теме"
  },
  {
    source: "Google",
    path: ["статья", "похожие материалы", "курс по теме"],
    trustPoint: "глубина материала и структурная навигация",
    returnPoint: "подборка статей",
    salePoint: "Stepik-курс как продолжение темы"
  },
  {
    source: "Telegram",
    path: ["новая статья", "реакция", "сохранение", "хаб"],
    trustPoint: "личный тон и регулярность автора",
    returnPoint: "следующий пост в канале",
    salePoint: "курс или консультация через повторные касания"
  },
  {
    source: "VK",
    path: ["короткий анонс", "статья", "диагностика"],
    trustPoint: "простое объяснение пользы",
    returnPoint: "подписка на VK или Telegram",
    salePoint: "лид-магнит с дальнейшим прогревом"
  },
  {
    source: "Рекомендация",
    path: ["главная", "об авторе", "с чего начать", "практика изменений"],
    trustPoint: "позиционирование и кейсы",
    returnPoint: "сохранение маршрута",
    salePoint: "консультация после диагностики"
  },
  {
    source: "Stepik",
    path: ["курс", "журнал", "хаб", "Telegram"],
    trustPoint: "авторская экспертность за пределами курса",
    returnPoint: "подписка на обновления",
    salePoint: "следующий курс или корпоративное обучение"
  },
  {
    source: "Диагностика",
    path: ["форма", "результат", "PDF", "отправить Денису", "консультация"],
    trustPoint: "персональный вывод",
    returnPoint: "PDF и письмо/сообщение",
    salePoint: "разбор результата"
  },
  {
    source: "Запрос про ИИ",
    path: ["лид-магнит с промтами", "хаб ИИ", "курс", "консультация"],
    trustPoint: "практические промты без хайпа",
    returnPoint: "новые промты и статьи",
    salePoint: "курс по промт-инжинирингу"
  },
  {
    source: "Запрос про управление",
    path: ["статья", "диагностика", "хаб Управление", "курс"],
    trustPoint: "управленческая механика, а не мотивация",
    returnPoint: "карта знаний и Telegram",
    salePoint: "курс для руководителя или консультация"
  },
  {
    source: "Запрос про карьеру",
    path: ["карьерная статья", "хаб Карьера", "маршрут", "курс"],
    trustPoint: "практическая рамка роста",
    returnPoint: "подборка карьерных материалов",
    salePoint: "курс или карьерный разбор"
  }
];

export const HUB_SEO_ARCHITECTURE: Record<HubSlug, HubSeoArchitecture> = {
  management: {
    slug: "management",
    seoTitle: "Управление бизнесом и командой: статьи, диагностики и курсы Дениса Михина",
    description:
      "Хаб о системном управлении, управляемости бизнеса, ответственности команды, регулярном менеджменте и принятии решений.",
    h1: "Управление бизнесом и командой",
    h2: ["Управленческие боли", "Маршрут чтения", "Лид-магниты", "Курсы", "Когда нужен разбор"],
    h3: ["управляемость", "ответственность", "решения", "регулярный менеджмент"],
    searchQueries: ["управляемость бизнеса", "как управлять командой", "регулярный менеджмент", "эффективный руководитель"],
    internalLinks: [
      { label: "Диагностика управляемости", href: "/lead/business-control-diagnostic" },
      { label: "С чего начать", href: "/start" },
      { label: "Практика изменений", href: "/practice" }
    ],
    returnMechanic: "Предложить сохранить маршрут и подписаться на Telegram для новых управленческих разборов."
  },
  sales: {
    slug: "sales",
    seoTitle: "Продажи и рост бизнеса через систему управления",
    description: "Хаб о точках роста продаж, управлении коммерческим процессом, ответственности и бизнес-эффекте изменений.",
    h1: "Продажи как управляемая система",
    h2: ["Точки роста", "Системные причины", "Материалы по продажам", "Диагностика", "Консалтинг"],
    h3: ["воронка", "процессы", "ответственность", "эффект"],
    searchQueries: ["точки роста продаж", "как увеличить продажи через управление", "система продаж", "диагностика продаж"],
    internalLinks: [
      { label: "Диагностика управляемости", href: "/lead/business-control-diagnostic" },
      { label: "Практика изменений", href: "/practice" },
      { label: "Курсы", href: "/training" }
    ],
    returnMechanic: "Вернуть через кейсы о коммерческих ограничениях и Telegram-разборы."
  },
  "ai-management": {
    slug: "ai-management",
    seoTitle: "ИИ в управлении: промты, сценарии и внедрение в бизнес-процессы",
    description: "Хаб о практическом применении ИИ в управлении, проектах, анализе решений и работе руководителя.",
    h1: "ИИ в управлении",
    h2: ["Сценарии ИИ", "Промты", "Управленческие решения", "Курс", "Внедрение"],
    h3: ["промты", "анализ", "совещания", "проекты"],
    searchQueries: ["ИИ в управлении", "промты для руководителя", "как внедрить ИИ в бизнес", "prompt engineering для менеджера"],
    internalLinks: [
      { label: "50 промтов для руководителя", href: "/lead/manager-ai-prompts" },
      { label: "Курс по промт-инжинирингу", href: "https://stepik.org/course/243614/promo" },
      { label: "Диагностики", href: "/diagnostics" }
    ],
    returnMechanic: "Предложить скачать промты и подписаться на новые сценарии применения ИИ."
  },
  "systems-thinking": {
    slug: "systems-thinking",
    seoTitle: "Системное мышление для руководителей и специалистов",
    description: "Хаб о системном мышлении, поиске причин, ограничениях, взаимосвязях и принятии решений в сложных системах.",
    h1: "Системное мышление",
    h2: ["Причины и симптомы", "Ограничения", "Инструменты", "Маршрут чтения", "Курс"],
    h3: ["связи", "корневые причины", "модели", "точки влияния"],
    searchQueries: ["системное мышление", "как найти корневую причину", "системный анализ проблемы", "точки влияния"],
    internalLinks: [
      { label: "С чего начать", href: "/start" },
      { label: "Практика изменений", href: "/practice" },
      { label: "Курсы", href: "/training" }
    ],
    returnMechanic: "Вернуть через серию материалов о системных инструментах и практических промптах."
  },
  projects: {
    slug: "projects",
    seoTitle: "Управление проектами: сроки, риски, портфель и delivery",
    description: "Хаб о проектном управлении, рисках, сроках, приоритетах, портфеле проектов и управлении результатом.",
    h1: "Управление проектами",
    h2: ["Проектный хаос", "Риски", "Портфель", "Маршрут чтения", "Курс"],
    h3: ["сроки", "риски", "приоритеты", "delivery"],
    searchQueries: ["управление проектами", "как управлять рисками проекта", "портфель проектов", "проектный менеджмент"],
    internalLinks: [
      { label: "Карта рисков", href: "/diagnostics" },
      { label: "Курс по управлению проектами", href: "https://stepik.org/course/259560/promo" },
      { label: "Практика изменений", href: "/practice" }
    ],
    returnMechanic: "Вернуть через чек-листы рисков и подборки по проектной прозрачности."
  },
  career: {
    slug: "career",
    seoTitle: "Карьера руководителя и сильного специалиста",
    description: "Хаб о карьерном росте, управленческой зрелости, влиянии, заметности и переходе в руководящую роль.",
    h1: "Карьера и управленческий рост",
    h2: ["Карьерные боли", "Маршрут роста", "Навыки руководителя", "Курс", "Разбор"],
    h3: ["заметность", "влияние", "управленческая роль", "рост"],
    searchQueries: ["как вырасти в руководителя", "карьерный рост специалиста", "навыки руководителя", "как стать заметнее"],
    internalLinks: [
      { label: "С чего начать", href: "/start" },
      { label: "Курс Эффективный руководитель", href: "https://stepik.org/course/271020/promo" },
      { label: "Об авторе", href: "/about" }
    ],
    returnMechanic: "Вернуть через карьерные маршруты и Telegram с короткими управленческими наблюдениями."
  },
  transformations: {
    slug: "transformations",
    seoTitle: "Управление изменениями и бизнес-трансформации",
    description: "Хаб о трансформациях, изменениях, Agile, ИИ, сопротивлении, управленческом контуре и закреплении результата.",
    h1: "Трансформации и изменения",
    h2: ["Почему изменения буксуют", "Agile и ИИ", "Кейсы", "Лид-магниты", "Консалтинг"],
    h3: ["изменения", "сопротивление", "Agile", "эффект"],
    searchQueries: ["управление изменениями", "бизнес трансформация", "почему изменения не работают", "agile трансформация"],
    internalLinks: [
      { label: "Практика изменений", href: "/practice" },
      { label: "Agile AI Transformation", href: "https://stepik.org/course/255881/promo" },
      { label: "Диагностика", href: "/diagnostics" }
    ],
    returnMechanic: "Вернуть через кейс-библиотеку и серию материалов о закреплении изменений."
  }
};

export const LEAD_MAGNET_ROUTES: LeadMagnetRoute[] = [
  {
    title: "Диагностика управляемости бизнеса",
    audience: "собственники, CEO, руководители подразделений",
    place: "главная, статьи про управление, хаб Управление, практика изменений",
    hubHref: "/hub/management",
    courseHref: "/training",
    consultationCta: "Обсудить результат диагностики",
    returnScenario: "PDF-результат, отправка Денису, затем подборка статей по слабым зонам."
  },
  {
    title: "50 промтов для руководителя",
    audience: "руководители, PM, HR, специалисты, внедряющие ИИ",
    place: "хаб ИИ, статьи про ИИ, страница курсов",
    hubHref: "/hub/ai-management",
    courseHref: "https://stepik.org/course/243614/promo",
    consultationCta: "Обсудить внедрение ИИ",
    returnScenario: "Письмо/сообщение с промтами и приглашение в Telegram."
  },
  {
    title: "Шаблон стратегической сессии",
    audience: "CEO, HRD, руководители трансформаций",
    place: "хаб Трансформации, статьи про стратегию и изменения",
    hubHref: "/hub/transformations",
    courseHref: "/training",
    consultationCta: "Собрать стратегическую сессию",
    returnScenario: "Серия материалов о стратегии, проектах и управленческом контуре."
  },
  {
    title: "Карта рисков",
    audience: "PM, portfolio manager, руководители проектов",
    place: "хаб Проекты, статьи о рисках и портфеле",
    hubHref: "/hub/projects",
    courseHref: "https://stepik.org/course/259560/promo",
    consultationCta: "Разобрать риски проекта",
    returnScenario: "Подборка о рисках, статусах и проектной прозрачности."
  },
  {
    title: "Шаблон OKR",
    audience: "CEO, руководители подразделений, product manager",
    place: "статьи про цели, хабы Управление и Проекты",
    hubHref: "/hub/management",
    courseHref: "/training",
    consultationCta: "Связать OKR с управлением",
    returnScenario: "Материалы о целях, приоритетах и ритмах исполнения."
  },
  {
    title: "Матрица приоритизации",
    audience: "product manager, portfolio manager, руководители",
    place: "хабы Проекты и Системное мышление",
    hubHref: "/hub/projects",
    courseHref: "https://stepik.org/course/244887/promo",
    consultationCta: "Разобрать портфель решений",
    returnScenario: "Подборка о системных ограничениях и решениях."
  },
  {
    title: "Чек-лист внедрения ИИ",
    audience: "руководители, AI-лиды, HRD, PMO",
    place: "хаб ИИ, статьи про автоматизацию и управленческие решения",
    hubHref: "/hub/ai-management",
    courseHref: "https://stepik.org/course/243614/promo",
    consultationCta: "Обсудить сценарии ИИ",
    returnScenario: "Серия сценариев применения ИИ и приглашение на курс."
  },
  {
    title: "Чек-лист управленческого хаоса",
    audience: "собственники, руководители, CEO",
    place: "главная, хаб Управление, статьи о хаосе в проектах",
    hubHref: "/hub/management",
    courseHref: "https://stepik.org/course/271020/promo",
    consultationCta: "Найти источник хаоса",
    returnScenario: "Диагностика, затем материалы по управляемости и ответственности."
  },
  {
    title: "Инструменты системного мышления",
    audience: "руководители, специалисты, консультанты, HR BP",
    place: "хаб Системное мышление, статьи о причинах и ограничениях",
    hubHref: "/hub/systems-thinking",
    courseHref: "https://stepik.org/course/244887/promo",
    consultationCta: "Разобрать систему",
    returnScenario: "Подборка практических рамок и кейсов."
  }
];

export const CTA_SYSTEM: CtaRule[] = [
  {
    stage: "После первого экрана статьи",
    cta: "Сохранить материал / открыть содержание",
    where: "статья, боковая колонка",
    audience: "все читатели",
    expectedConversion: "8-15% взаимодействий"
  },
  {
    stage: "После чтения статьи",
    cta: "Продолжить маршрут",
    where: "конец статьи",
    audience: "читатели, дочитавшие материал",
    expectedConversion: "12-25% переходов"
  },
  {
    stage: "После 2 материалов по теме",
    cta: "Открыть тематический хаб",
    where: "блок рекомендаций и хабы",
    audience: "тёплая аудитория",
    expectedConversion: "10-18% переходов"
  },
  {
    stage: "После хаба",
    cta: "Скачать лид-магнит или пройти диагностику",
    where: "хаб, главная, стартовая страница",
    audience: "читатели с выраженной задачей",
    expectedConversion: "3-8% заявок"
  },
  {
    stage: "После диагностики",
    cta: "Отправить диагностику Денису / обсудить результат",
    where: "финальный экран диагностики",
    audience: "потенциальные клиенты консалтинга",
    expectedConversion: "5-12% обращений"
  },
  {
    stage: "После лид-магнита",
    cta: "Подписаться на Telegram",
    where: "страницы лид-магнитов, письмо/сообщение после скачивания",
    audience: "не готовые покупать сейчас",
    expectedConversion: "15-30% подписок"
  },
  {
    stage: "После курса/страницы курсов",
    cta: "Перейти на Stepik",
    where: "витрина курсов и карточки курсов",
    audience: "готовые учиться самостоятельно",
    expectedConversion: "5-15% переходов"
  },
  {
    stage: "После кейса",
    cta: "Обсудить похожую ситуацию",
    where: "практика изменений",
    audience: "бизнес и корпоративные заказчики",
    expectedConversion: "2-6% обращений"
  }
];

export const ECOSYSTEM_METRICS: EcosystemMetric[] = [
  {
    metric: "Глубина просмотра",
    why: "показывает, превращается ли статья в маршрут",
    target: "2.2-3.0 страницы за визит",
    actionIfLow: "усилить блоки продолжения, хабы и внутренние ссылки"
  },
  {
    metric: "Время на сайте",
    why: "показывает качество чтения и вовлеченность",
    target: "3-5 минут для статей",
    actionIfLow: "улучшить первые экраны, оглавление и смысловые блоки"
  },
  {
    metric: "Переходы между статьями",
    why: "измеряет удержание после чтения",
    target: "12-25% дочитавших",
    actionIfLow: "переписать заголовки блока продолжения и маршруты"
  },
  {
    metric: "Переходы в хабы",
    why: "показывает, работает ли журнал как система знаний",
    target: "8-15% с главной и статей",
    actionIfLow: "усилить ссылки на хабы в статьях и на главной"
  },
  {
    metric: "Скачивания лид-магнитов",
    why: "главная метрика прогрева и сбора контактов",
    target: "3-8% от целевых посадочных",
    actionIfLow: "уточнить обещание результата и место показа"
  },
  {
    metric: "Переходы в Telegram/VK",
    why: "создают возврат аудитории",
    target: "5-12% вовлеченных читателей",
    actionIfLow: "сделать CTA более контекстным и менее общим"
  },
  {
    metric: "Переходы на Stepik",
    why: "измеряют прогрев к курсам",
    target: "4-10% с карточек курсов",
    actionIfLow: "связать курсы с конкретными задачами и статьями"
  },
  {
    metric: "Заявки на консультацию",
    why: "измеряют готовность к консалтингу",
    target: "1-4% с диагностики и кейсов",
    actionIfLow: "усилить кейсы, диагностику и мягкий CTA на разбор"
  },
  {
    metric: "Поисковый трафик Яндекса",
    why: "ключевой канал стабильного роста",
    target: "рост 10-20% месяц к месяцу после индексации хабов",
    actionIfLow: "доработать SEO-title, H1-H3, внутреннюю перелинковку и обновляемость статей"
  }
];

export const IMPLEMENTATION_PLAN_30_60_90 = {
  "30": [
    "Свести все аудитории, CTA, лид-магниты и хабы в единую карту.",
    "Усилить хабы SEO-блоками, поисковыми запросами и внутренними ссылками.",
    "Проверить, что после каждой статьи есть продолжение, курс, Telegram и мягкий CTA.",
    "Настроить базовые цели аналитики: хабы, лид-магниты, Stepik, Telegram, консультации."
  ],
  "60": [
    "Добавить недостающие лид-магниты: карта рисков, OKR, матрица приоритизации, чек-лист ИИ.",
    "Собрать серии материалов и обновляемые подборки под Яндекс.",
    "Связать курсы с хабами и статьями через конкретные задачи аудитории.",
    "Доработать сценарии возврата через Telegram/VK и новые материалы."
  ],
  "90": [
    "Запустить регулярный аудит метрик и доработку слабых мест воронки.",
    "Собрать корпоративные маршруты обучения из курсов, диагностик и практики изменений.",
    "Усилить кейс-библиотеку новыми разборными материалами.",
    "Сформировать контент-план по SEO-кластерам Яндекса на квартал."
  ]
} as const;

export function getHubSeo(slug: HubSlug): HubSeoArchitecture {
  return HUB_SEO_ARCHITECTURE[slug];
}
