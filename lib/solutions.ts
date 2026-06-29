import type { Category } from "@/lib/constants";

export type SolutionMaterial = {
  title: string;
  description: string;
  status: string;
  href: string;
};

export type SolutionPlanStep = {
  title: string;
  text: string;
  href: string;
};

export type SolutionNextStep = {
  label: string;
  text: string;
  href: string;
};

export type Solution = {
  slug: string;
  title: string;
  description: string;
  heroText: string;
  category: Category;
  problemIntro: string;
  symptoms: string[];
  reasonsTitle: string;
  reasons: string[];
  plan: SolutionPlanStep[];
  materials: SolutionMaterial[];
  articleSlugs: string[];
  articleSignals: string[];
  programIds: number[];
  nextStep: SolutionNextStep;
  relatedSolutionSlugs: string[];
};

const commonManagementArticles = [
  "kak-svyazat-tseli-i-deystviya",
  "kak-vystroit-ritm-raboty-proekta",
  "upravlenie-ozhidaniyami-bez-konfliktov",
  "kak-sdelat-vstrechi-produktivnymi"
];

const soonMaterials = (slug: string, titles: string[]): SolutionMaterial[] =>
  titles.map((title) => ({
    title,
    description: "Практический материал для самостоятельной настройки процесса.",
    status: "Скоро",
    href: `/solutions/${slug}`
  }));

export const SOLUTIONS: Solution[] = [
  {
    slug: "promoted-manager",
    title: "Меня повысили до руководителя",
    description:
      "План адаптации к управленческой роли: ответственность, делегирование, решения, команда и первые ритмы управления.",
    heroText:
      "Новая роль меняет не только должность, но и способ думать о работе. Здесь собраны шаги, которые помогают быстрее перейти от экспертной логики к управленческой.",
    category: "career",
    problemIntro:
      "После повышения сильный специалист часто продолжает тащить задачи сам, хотя результат теперь зависит от команды, ясных ожиданий и регулярных решений.",
    symptoms: [
      "сложно делегировать и отпускать задачи",
      "бывшие коллеги не воспринимают новую роль",
      "приходится принимать больше решений",
      "времени постоянно не хватает",
      "непонятно, как оценивать работу команды"
    ],
    reasonsTitle: "Почему переход в руководители ощущается сложным",
    reasons: [
      "Экспертная роль вознаграждала личную скорость, а управленческая требует собирать результат через других.",
      "Команда ждет ясности: что важно, кто владеет задачей, как принимаются решения.",
      "Без ритма встреч, обратной связи и делегирования руководитель быстро становится узким местом."
    ],
    plan: [
      { title: "Разделить роли", text: "Отделить экспертные задачи от управленческих зон ответственности.", href: "/category/career" },
      { title: "Настроить делегирование", text: "Передавать не поручения, а результат, критерии и границы решения.", href: "/category/management" },
      { title: "Собрать ритм встреч", text: "Ввести короткие регулярные синхронизации без микроменеджмента.", href: "/category/management" },
      { title: "Уточнить ожидания", text: "Сделать видимыми цели, роли, договоренности и критерии готовности.", href: "/category/thinking" },
      { title: "Развить лидерскую базу", text: "Усилить влияние, обратную связь и управленческое мышление.", href: "/training#management" }
    ],
    materials: soonMaterials("promoted-manager", [
      "Карта первых 30 дней",
      "Чек-лист делегирования",
      "Шаблон управленческой встречи"
    ]),
    articleSlugs: [
      "karernyy-perehod-iz-spetsialista-v-rukovoditelya-bez-stressa",
      "perehod-v-rukovoditeli-myagkiy-stsenariy-bez-vygoraniya",
      ...commonManagementArticles
    ],
    articleSignals: ["руковод", "карьер", "делег", "ответствен"],
    programIds: [271020, 273143, 259560],
    nextStep: {
      label: "Начать программу «Эффективный руководитель»",
      text: "Если новая роль уже началась, лучше быстро собрать управленческую базу и не учиться только на ошибках.",
      href: "https://stepik.org/course/271020/"
    },
    relatedSolutionSlugs: ["team-responsibility", "time-management", "management-system", "project-management"]
  },
  {
    slug: "implement-ai",
    title: "Нужно внедрить ИИ",
    description:
      "Практичный путь внедрения ИИ в работу руководителя и команды: сценарии, правила, пилоты и измеримый эффект.",
    heroText:
      "ИИ полезен не сам по себе, а когда помогает быстрее принимать решения, видеть данные и разгружать повторяющуюся работу.",
    category: "ai",
    problemIntro:
      "Команды часто обсуждают ИИ, но начинают с инструментов вместо рабочих задач, поэтому эффект остается случайным.",
    symptoms: [
      "много разговоров про ИИ, но мало сценариев",
      "сотрудники пробуют инструменты хаотично",
      "непонятно, где ИИ экономит время",
      "есть риск ошибок и утечек данных",
      "руководитель не видит измеримого эффекта"
    ],
    reasonsTitle: "Почему внедрение ИИ буксует",
    reasons: [
      "Внедрение начинается с модного инструмента, а не с конкретной рабочей боли.",
      "Без правил команда быстро уходит в эксперименты без результата.",
      "Эффект появляется там, где есть понятный процесс, повторяемая работа и критерий пользы."
    ],
    plan: [
      { title: "Выбрать сценарии", text: "Найти задачи, где ИИ снимает рутину или улучшает качество решения.", href: "/category/ai" },
      { title: "Определить правила", text: "Зафиксировать ограничения по данным, проверке и ответственности.", href: "/category/ai" },
      { title: "Запустить пилот", text: "Проверить один сценарий на коротком цикле.", href: "/category/thinking" },
      { title: "Измерить эффект", text: "Сравнить скорость, качество, риски и нагрузку до и после.", href: "/category/ai" },
      { title: "Встроить в ритм", text: "Перевести удачный сценарий в регулярную практику.", href: "/training#ai-prompting" }
    ],
    materials: soonMaterials("implement-ai", [
      "Матрица AI-сценариев",
      "Правила безопасного пилота",
      "Шаблон оценки эффекта"
    ]),
    articleSlugs: [
      "kak-ii-usilivaet-upravlencheskie-resheniya",
      "kak-ii-uskoryaet-podgotovku-upravlencheskih-resheniy",
      "ii-dlya-analiza-proektov-bez-peregruza",
      "kak-ispolzovat-ii-v-portfelnom-upravlenii"
    ],
    articleSignals: ["ии", "ai", "данн", "аналит"],
    programIds: [243614, 269291, 255881],
    nextStep: {
      label: "Начать программу по промт-инжинирингу",
      text: "Сначала важно научиться ставить ИИ точные задачи и проверять качество результата.",
      href: "https://stepik.org/course/243614/"
    },
    relatedSolutionSlugs: ["management-system", "time-management", "project-management", "implement-agile"]
  },
  {
    slug: "project-management",
    title: "Хочу перейти в управление проектами",
    description:
      "Путь входа в проектное управление: цели, сроки, риски, коммуникации, статусы и управляемый результат.",
    heroText:
      "Проектное управление начинается не с диаграмм, а с умения удерживать цель, ожидания, риски и командный ритм.",
    category: "management",
    problemIntro:
      "Переход в проектную роль часто начинается с ощущения, что задач много, а системы пока нет.",
    symptoms: [
      "сроки и ожидания разъезжаются",
      "задачи зависят от устных договоренностей",
      "риски всплывают слишком поздно",
      "статусы не помогают принимать решения",
      "команда занята, но результат непредсказуем"
    ],
    reasonsTitle: "Почему проектная роль требует отдельной оптики",
    reasons: [
      "Проектный менеджер отвечает не за отдельную задачу, а за связность всей работы.",
      "Слабое управление ожиданиями быстро превращает проект в набор срочных реакций.",
      "Предсказуемость появляется, когда цель, риски, решения и коммуникации становятся видимыми."
    ],
    plan: [
      { title: "Понять цель проекта", text: "Сформулировать результат, критерии и ограничения.", href: "/category/management" },
      { title: "Разложить работу", text: "Собрать шаги, владельцев и зависимости.", href: "/category/management" },
      { title: "Настроить коммуникации", text: "Сделать статусы и решения понятными для участников.", href: "/category/cases" },
      { title: "Управлять рисками", text: "Замечать слабые сигналы до кризиса.", href: "/category/management" },
      { title: "Закрепить ритм", text: "Поддерживать регулярный контур контроля и адаптации.", href: "/training#project-management" }
    ],
    materials: soonMaterials("project-management", [
      "Карта проекта на одну страницу",
      "Шаблон статуса проекта",
      "Чек-лист рисков"
    ]),
    articleSlugs: [
      "proekt-kak-sistema-prostoy-vzglyad-na-slozhnuyu-rabotu",
      "kak-upravlyat-proektami-spokoyno-i-sistemno",
      "upravlenie-riskami-kak-sposob-spokoystviya",
      "kak-vystroit-ritm-raboty-proekta"
    ],
    articleSignals: ["проект", "срок", "риск", "ритм"],
    programIds: [259560, 238810, 255881],
    nextStep: {
      label: "Начать программу по управлению проектами",
      text: "Соберите базу по срокам, рискам, требованиям и коммуникациям в проекте.",
      href: "https://stepik.org/course/259560/"
    },
    relatedSolutionSlugs: ["time-management", "management-system", "implement-agile", "team-responsibility"]
  },
  {
    slug: "team-responsibility",
    title: "Команда не берет ответственность",
    description:
      "Как выстроить ответственность без жесткости: роли, ожидания, договоренности, обратная связь и управленческий ритм.",
    heroText:
      "Ответственность появляется там, где понятны результат, границы, решения и последствия.",
    category: "management",
    problemIntro:
      "Когда команда не берет ответственность, руководитель постепенно превращается в ручной центр управления.",
    symptoms: [
      "сотрудники ждут указаний",
      "договоренности не исполняются",
      "задачи возвращаются к руководителю",
      "ошибки объясняются внешними обстоятельствами",
      "контроль занимает все больше времени"
    ],
    reasonsTitle: "Почему ответственность не удерживается в команде",
    reasons: [
      "Ответственность часто передается как ожидание, а не как четкая договоренность.",
      "Если результат не определен, команда выбирает занятость вместо владения итогом.",
      "Руководитель может случайно забирать ответственность обратно, когда решает все сам."
    ],
    plan: [
      { title: "Определить результат", text: "Согласовать, за что именно отвечает человек или команда.", href: "/category/thinking" },
      { title: "Назначить владельцев", text: "Разделить исполнителей, владельцев решений и участников.", href: "/category/architecture" },
      { title: "Сделать договоренности видимыми", text: "Фиксировать сроки, критерии и следующий шаг.", href: "/category/management" },
      { title: "Настроить обратную связь", text: "Обсуждать результат, действия и последствия без обвинений.", href: "/category/management" },
      { title: "Удерживать ритм", text: "Регулярно проверять прогресс без микроменеджмента.", href: "/training#management" }
    ],
    materials: soonMaterials("team-responsibility", [
      "Матрица ответственности",
      "Шаблон договоренности",
      "Сценарий обратной связи"
    ]),
    articleSlugs: [
      "arhitektura-otvetstvennosti-v-komande",
      "upravlyaemost-komandy-bez-mikromenedzhmenta",
      "prozrachnost-kak-instrument-silnogo-upravleniya",
      "kak-vystroit-otvetstvennost-bez-zhestkosti"
    ],
    articleSignals: ["ответствен", "команд", "договор", "прозрач"],
    programIds: [271020, 273143, 238810],
    nextStep: {
      label: "Перейти к задаче про систему управления",
      text: "Ответственность лучше закрепляется, когда встроена в общий контур целей, решений и ритма.",
      href: "/solutions/management-system"
    },
    relatedSolutionSlugs: ["management-system", "promoted-manager", "time-management", "project-management"]
  },
  {
    slug: "time-management",
    title: "Постоянно не хватает времени",
    description:
      "Как вернуть контроль над задачами: фокус, приоритеты, делегирование, ограничения WIP и управленческий ритм.",
    heroText:
      "Нехватка времени часто говорит не о слабой дисциплине, а о перегруженной системе задач, решений и ожиданий.",
    category: "management",
    problemIntro:
      "Если времени постоянно не хватает, проблему редко решает только личная продуктивность.",
    symptoms: [
      "день заполнен срочными задачами",
      "важное постоянно откладывается",
      "много переключений и контекстов",
      "часть задач живет только в голове",
      "вечером кажется, что главное не сделано"
    ],
    reasonsTitle: "Почему перегруз становится нормой",
    reasons: [
      "Система пропускает больше задач, чем реально может переварить.",
      "Приоритеты существуют в голове, а не в явном порядке решений.",
      "Без делегирования и ограничения WIP руководитель становится узким местом."
    ],
    plan: [
      { title: "Выгрузить задачи", text: "Собрать все обязательства в один видимый список.", href: "/category/management" },
      { title: "Выбрать приоритеты", text: "Отделить важное от шумного и срочного.", href: "/category/thinking" },
      { title: "Ограничить WIP", text: "Сократить число параллельных задач и переключений.", href: "/category/management" },
      { title: "Делегировать лишнее", text: "Передать задачи, где руководитель не должен быть владельцем.", href: "/solutions/promoted-manager" },
      { title: "Закрепить недельный ритм", text: "Планировать решения, встречи и фокус заранее.", href: "/category/management" }
    ],
    materials: soonMaterials("time-management", [
      "Карта перегруза",
      "Шаблон недельного фокуса",
      "Чек-лист ограничения WIP"
    ]),
    articleSlugs: [
      "kak-prioritizatsiya-uproschaet-zhizn-komande",
      "upravlenie-resursami-bez-peregruza",
      "kak-sdelat-vstrechi-produktivnymi",
      "kak-vystroit-ritm-raboty-proekta"
    ],
    articleSignals: ["время", "перегруз", "приоритет", "ритм"],
    programIds: [271020, 259560, 238810],
    nextStep: {
      label: "Начать с диагностики управленческой зрелости",
      text: "Диагностика покажет, где перегруз рождается: в целях, ролях, встречах, решениях или делегировании.",
      href: "/diagnostics/management-maturity-index"
    },
    relatedSolutionSlugs: ["promoted-manager", "team-responsibility", "project-management", "management-system"]
  },
  {
    slug: "implement-agile",
    title: "Нужно внедрить Agile",
    description:
      "Как внедрять Agile без ритуального театра: поток ценности, прозрачность, обратная связь, Scrum, Kanban и управленческие решения.",
    heroText:
      "Agile помогает не тогда, когда команда выучила термины, а когда быстрее замечает проблемы, учится и поставляет ценность.",
    category: "agile",
    problemIntro:
      "Внедрение Agile часто превращается в набор встреч, если не связать практики с конкретной рабочей болью.",
    symptoms: [
      "ритуалы есть, эффекта нет",
      "доска задач не показывает реальную картину",
      "ретроспективы не приводят к изменениям",
      "команда спорит о терминах вместо результата",
      "руководитель не понимает, что именно улучшилось"
    ],
    reasonsTitle: "Почему Agile не взлетает",
    reasons: [
      "Команды внедряют фреймворк раньше, чем понимают проблему потока работы.",
      "Прозрачность путают с отчетностью, а ретроспективы — с обсуждением настроения.",
      "Без управленческих решений улучшения остаются разговорами."
    ],
    plan: [
      { title: "Назвать рабочую боль", text: "Определить, что именно должно стать быстрее, прозрачнее или качественнее.", href: "/category/agile" },
      { title: "Выбрать подход", text: "Понять, где нужен Scrum, Kanban или гибрид.", href: "/category/agile" },
      { title: "Сделать поток видимым", text: "Показать задачи, блокеры, WIP и ожидания.", href: "/category/management" },
      { title: "Настроить обратную связь", text: "Проводить ретроспективы с конкретными экспериментами.", href: "/category/agile" },
      { title: "Закрепить метрики", text: "Следить за скоростью, качеством, предсказуемостью и нагрузкой.", href: "/training#agile" }
    ],
    materials: soonMaterials("implement-agile", [
      "Карта Agile-внедрения",
      "Шаблон ретроспективы",
      "Чек-лист Kanban-доски"
    ]),
    articleSlugs: [
      "scrum-kak-instrument-prozrachnosti",
      "iterativnyy-podhod-k-bolshim-tselyam",
      "prozrachnost-kak-instrument-silnogo-upravleniya",
      "kak-vystroit-ritm-raboty-proekta"
    ],
    articleSignals: ["agile", "scrum", "kanban", "итератив"],
    programIds: [238810, 259560, 271020],
    nextStep: {
      label: "Перейти к материалам по Agile",
      text: "Начните с рабочих принципов и только потом выбирайте ритуалы и фреймворк.",
      href: "/category/agile"
    },
    relatedSolutionSlugs: ["project-management", "team-responsibility", "management-system", "implement-ai"]
  },
  {
    slug: "product-manager",
    title: "Хочу стать Product Manager",
    description:
      "Переход в продуктовую роль: пользователь, ценность, гипотезы, приоритизация, метрики и работа с командой.",
    heroText:
      "Product Manager соединяет потребности пользователей, цели бизнеса и возможности команды в понятные решения.",
    category: "thinking",
    problemIntro:
      "Переход в продуктовую роль сложен тем, что нужно думать не задачами, а ценностью и проверяемыми гипотезами.",
    symptoms: [
      "много идей, но непонятно, что делать первым",
      "сложно говорить на языке ценности и метрик",
      "не хватает опыта работы с пользователями",
      "команда ждет четких приоритетов",
      "страшно брать ответственность за продуктовые решения"
    ],
    reasonsTitle: "Почему продуктовая роль отличается от проектной",
    reasons: [
      "Проект чаще отвечает за поставку результата, а продукт — за ценность и развитие решения.",
      "Product Manager работает с неопределенностью, гипотезами и метриками.",
      "Хорошие решения появляются через исследования, приоритизацию и быстрые проверки."
    ],
    plan: [
      { title: "Понять продуктовую логику", text: "Связать пользователя, проблему, ценность и бизнес-цель.", href: "/category/thinking" },
      { title: "Собрать гипотезы", text: "Перевести идеи в проверяемые предположения.", href: "/category/thinking" },
      { title: "Расставить приоритеты", text: "Выбирать не самое громкое, а самое ценное и проверяемое.", href: "/category/management" },
      { title: "Настроить метрики", text: "Понять, как измерять прогресс и эффект.", href: "/category/ai" },
      { title: "Собрать портфель навыков", text: "Развивать коммуникацию, аналитику и системное мышление.", href: "/training#product-thinking" }
    ],
    materials: soonMaterials("product-manager", [
      "Карта продуктовой роли",
      "Шаблон гипотезы",
      "Матрица приоритизации"
    ]),
    articleSlugs: [
      "bystroe-testirovanie-idey-bez-riskov",
      "kak-prioritizatsiya-uproschaet-zhizn-komande",
      "upravlenie-na-dannyh-novyy-standart",
      "iterativnyy-podhod-k-bolshim-tselyam"
    ],
    articleSignals: ["продукт", "гипотез", "метрик", "приоритет"],
    programIds: [264335, 284646, 269291],
    nextStep: {
      label: "Перейти к программам по продуктовой логике",
      text: "Для входа в роль полезно быстро собрать язык ценности, гипотез, приоритетов и метрик.",
      href: "/training#product-thinking"
    },
    relatedSolutionSlugs: ["project-management", "implement-ai", "time-management", "management-system"]
  },
  {
    slug: "management-system",
    title: "Нужно выстроить систему управления",
    description:
      "Как собрать управляемость: цели, роли, ритм, решения, ответственность, метрики и прозрачность исполнения.",
    heroText:
      "Система управления нужна, когда результат больше нельзя удерживать личной памятью, героизмом и ручным контролем.",
    category: "architecture",
    problemIntro:
      "Если цели, решения и ответственность живут в разных местах, команда работает много, но управляемость остается слабой.",
    symptoms: [
      "цели не связаны с ежедневными действиями",
      "решения теряются после встреч",
      "ответственность размыта",
      "метрики не помогают управлять",
      "руководитель держит систему на себе"
    ],
    reasonsTitle: "Почему система управления распадается",
    reasons: [
      "Отдельные практики не связаны в единый контур целей, решений и обратной связи.",
      "Команда видит задачи, но не всегда видит логику приоритетов.",
      "Без прозрачности и регулярного ритма управление превращается в реакцию на пожары."
    ],
    plan: [
      { title: "Связать цели и действия", text: "Показать, как стратегические цели переходят в задачи.", href: "/category/thinking" },
      { title: "Описать роли", text: "Зафиксировать владельцев результатов, решений и процессов.", href: "/category/architecture" },
      { title: "Настроить ритм", text: "Собрать календарь встреч, решений и проверок прогресса.", href: "/category/management" },
      { title: "Ввести метрики", text: "Выбрать показатели, которые помогают действовать, а не только отчитываться.", href: "/category/ai" },
      { title: "Сделать систему прозрачной", text: "Собрать единый контур видимости для команды и руководителя.", href: "/category/architecture" }
    ],
    materials: soonMaterials("management-system", [
      "Карта системы управления",
      "Шаблон управленческого ритма",
      "Матрица решений и ролей"
    ]),
    articleSlugs: [
      "kak-svyazat-tseli-i-deystviya",
      "arhitektura-otvetstvennosti-v-komande",
      "upravlenie-na-dannyh-novyy-standart",
      "prozrachnost-kak-instrument-silnogo-upravleniya"
    ],
    articleSignals: ["систем", "архитект", "метрик", "цели"],
    programIds: [271020, 259560, 244887],
    nextStep: {
      label: "Начать с диагностики управленческой зрелости",
      text: "Диагностика поможет понять, какой элемент системы проседает сильнее всего.",
      href: "/diagnostics/management-maturity-index"
    },
    relatedSolutionSlugs: ["team-responsibility", "time-management", "project-management", "implement-ai"]
  }
];

export function getAllSolutions(): Solution[] {
  return SOLUTIONS;
}

export function getSolution(slug: string): Solution | undefined {
  return SOLUTIONS.find((solution) => solution.slug === slug);
}

export function getRelatedSolutions(solution: Solution, limit = 4): Solution[] {
  const related = solution.relatedSolutionSlugs
    .map((slug) => getSolution(slug))
    .filter((item): item is Solution => Boolean(item));

  if (related.length >= limit) {
    return related.slice(0, limit);
  }

  const fallback = SOLUTIONS.filter(
    (item) => item.slug !== solution.slug && !related.some((relatedItem) => relatedItem.slug === item.slug)
  );

  return [...related, ...fallback].slice(0, limit);
}
