import type { Category } from "@/lib/constants";

export type CoursePromo = {
  title: string;
  href: string;
  note?: string;
};

export const SECTION_COURSE_PROMOS = {
  home: {
    title: "Лидерство в условиях AI-трансформации",
    href: "https://stepik.org/course/258008/promo",
    note: "Курс для руководителей, которые строят сильные решения в новой среде."
  },
  articles: {
    title: "Промт-инжиниринг с нуля: как эффективно использовать ИИ",
    href: "https://stepik.org/course/243614/promo",
    note: "Практический курс по работе с ИИ без лишней теории."
  },
  newsletter: {
    title: "Создание цифровых продуктов с нуля",
    href: "https://stepik.org/course/270800/promo",
    note: "Пошаговая система создания и запуска цифрового продукта."
  },
  about: {
    title: "Все мои курсы на Stepik",
    href: "https://stepik.org/users/861642656/teach",
    note: "Полная линейка программ по управлению, продуктам, Agile и ИИ."
  },
  agile: {
    title: "Agile AI Transformation",
    href: "https://stepik.org/course/255881/promo",
    note: "Как соединить гибкие практики и AI-трансформацию в реальной работе."
  },
  architecture: {
    title: "Management 3.0",
    href: "https://stepik.org/course/270055/promo",
    note: "Современные управленческие подходы для сложных систем."
  },
  cases: {
    title: "Лидерство в условиях AI-трансформации",
    href: "https://stepik.org/course/258008/promo",
    note: "Инструменты лидерства для команд, процессов и решений."
  },
  ai: {
    title: "ИИ для менеджеров: что важно понимать",
    href: "https://stepik.org/course/269291/promo",
    note: "Что руководителю важно знать про ИИ, чтобы принимать сильные решения."
  }
} as const;

export const ARTICLE_CATEGORY_COURSE_PROMOS: Record<Category, CoursePromo> = {
  career: {
    title: "Эффективный руководитель",
    href: "https://stepik.org/course/271020/promo",
    note: "Для тех, кто хочет усиливать управленческий стиль и результат."
  },
  management: {
    title: "Основы управления проектами",
    href: "https://stepik.org/course/259560/promo",
    note: "База проектного управления для предсказуемого результата."
  },
  thinking: {
    title: "Продукт — это система",
    href: "https://stepik.org/course/244887/promo",
    note: "Системный взгляд на продукт и управленческие решения."
  },
  agile: {
    title: "Agile: Scrum и Kanban в работе над продуктом",
    href: "https://stepik.org/course/264335/promo",
    note: "Практика Agile-подходов для команд и продуктовой работы."
  },
  architecture: {
    title: "Agile AI Transformation",
    href: "https://stepik.org/course/255881/promo",
    note: "Архитектура решений на стыке гибкости и AI."
  },
  cases: {
    title: "Kanban PRO — профессиональная система управления потоком",
    href: "https://stepik.org/course/265445/promo",
    note: "Курс по потоковому управлению и повышению предсказуемости."
  },
  ai: {
    title: "Промт-инжиниринг с нуля: как эффективно использовать ИИ",
    href: "https://stepik.org/course/243614/syllabus",
    note: "От основ до практики: как работать с ИИ в управленческом контексте."
  }
};

export const CATEGORY_SECTION_PROMO_KEYS: Partial<Record<Category, keyof typeof SECTION_COURSE_PROMOS>> = {
  agile: "agile",
  architecture: "architecture",
  cases: "cases",
  ai: "ai"
};
