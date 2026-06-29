import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { TrackedLink } from "@/components/tracked-link";
import { buildStepikUtmUrl, getCourseIdFromUrl } from "@/lib/analytics";
import {
  CATEGORY_LABELS,
  CATEGORY_SHORT_LABELS,
  CATEGORY_THEME,
  SITE_URL,
  TELEGRAM_CHANNEL_URL,
  type Category
} from "@/lib/constants";
import { getFeaturedArticles, getLatestArticles, type ArticleSummary } from "@/lib/content";
import { STEPIK_COURSES, STEPIK_PROFILE_FACTS, type StepikCourse } from "@/lib/stepik-courses";

export const metadata: Metadata = {
  title: "Журнал Дениса Михина",
  description:
    "Журнал Дениса Михина для руководителей и сильных специалистов: как принимать решения, расти и управлять сложными системами.",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "Журнал Дениса Михина",
    description:
      "Журнал Дениса Михина для руководителей и сильных специалистов: как принимать решения, расти и управлять сложными системами.",
    url: SITE_URL
  }
};

const workTasks = [
  {
    title: "Меня повысили до руководителя",
    text: "Собрать управленческую базу, границы ответственности и первые решения в новой роли.",
    href: "/start"
  },
  {
    title: "Нужно внедрить ИИ",
    text: "Понять, где ИИ помогает управлению, аналитике, решениям и ежедневной работе.",
    href: "/category/ai"
  },
  {
    title: "Хочу перейти в управление проектами",
    text: "Разобраться с проектной логикой, сроками, рисками, коммуникацией и результатом.",
    href: "/category/management"
  },
  {
    title: "Не понимаю Agile",
    text: "Отделить рабочие принципы Agile от ритуалов, терминов и командного театра.",
    href: "/category/agile"
  },
  {
    title: "Команда не берет ответственность",
    text: "Найти, где ломаются договоренности, владельцы, контроль и управленческий фокус.",
    href: "/category/management"
  },
  {
    title: "Постоянно не хватает времени",
    text: "Снизить перегруз, вернуть контроль над задачами и убрать лишнюю операционку.",
    href: "/training#management"
  },
  {
    title: "Хочу стать Product Manager",
    text: "Перейти от задач и функций к ценности, пользователю, гипотезам и метрикам.",
    href: "/training#product-thinking"
  },
  {
    title: "Нужно выстроить систему управления",
    text: "Собрать цели, ритм, ответственность, метрики и прозрачность исполнения.",
    href: "/category/architecture"
  }
] as const;

const developmentDirections: Array<{
  title: string;
  description: string;
  category?: Category;
  programsCount: number;
  href: string;
}> = [
  {
    title: "Руководство",
    description: "Решения, ответственность, команда, управленческая зрелость и спокойный контроль.",
    category: "management",
    programsCount: 5,
    href: "/category/management"
  },
  {
    title: "Управление проектами",
    description: "Сроки, риски, требования, коммуникация и предсказуемое движение к результату.",
    category: "management",
    programsCount: 4,
    href: "/training#project-management"
  },
  {
    title: "Искусственный интеллект",
    description: "Практичное применение ИИ в управлении, аналитике, текстах и подготовке решений.",
    category: "ai",
    programsCount: 3,
    href: "/category/ai"
  },
  {
    title: "Agile",
    description: "Scrum, Kanban, поток, гибкие изменения и командная работа без лишних ритуалов.",
    category: "agile",
    programsCount: 6,
    href: "/category/agile"
  },
  {
    title: "Product Management",
    description: "Ценность, пользователь, продуктовая логика, гипотезы, метрики и запуск.",
    programsCount: 2,
    href: "/training#product-thinking"
  },
  {
    title: "Личная эффективность",
    description: "Фокус, задачи, перегруз, карьерный капитал и рост внутри сложной системы.",
    category: "career",
    programsCount: 3,
    href: "/category/career"
  }
];

const careerRoutes = [
  {
    label: "Маршрут",
    title: "Руководитель",
    result: "Уверенно перейти от экспертной роли к управлению людьми, решениями и результатом.",
    programs: "5 программ",
    href: "/start"
  },
  {
    label: "Маршрут",
    title: "Project Manager",
    result: "Собрать базу по проектам, срокам, рискам, коммуникациям и управлению ожиданиями.",
    programs: "4 программы",
    href: "/training#project-management"
  },
  {
    label: "Маршрут",
    title: "AI Leader",
    result: "Научиться применять ИИ как управленческий инструмент, а не как модную игрушку.",
    programs: "3 программы",
    href: "/training#ai-prompting"
  },
  {
    label: "Маршрут",
    title: "Product Manager",
    result: "Перейти к продуктовому мышлению: ценность, пользователь, гипотезы и метрики.",
    programs: "2 программы",
    href: "/training#product-thinking"
  }
] as const;

const trustFacts = [
  [String(STEPIK_PROFILE_FACTS.coursesCount), "программ в профиле Stepik"],
  [STEPIK_PROFILE_FACTS.studentsText, "прошли программы"],
  ["10+", "лет практического опыта"],
  ["PMO / KPI / CRM", "корпоративные проекты"],
  [String(STEPIK_PROFILE_FACTS.certificatesCount), "международных сертификата"],
  ["150+", "выступлений и разборов"]
] as const;

export default function HomePage(): JSX.Element {
  const popularArticles = getPopularArticles();
  const popularPrograms = getPopularPrograms();

  return (
    <div className="space-y-16">
      <HeroSection />
      <WorkTasksSection />
      <DevelopmentDirectionsSection />
      <CareerRoutesSection />
      <PopularArticlesSection articles={popularArticles} />
      <PopularProgramsSection courses={popularPrograms} />
      <TrustSection />
      <TelegramSection />
    </div>
  );
}

function HeroSection(): JSX.Element {
  return (
    <section className="border-b border-slate-200 pb-14 pt-8 md:pb-20 md:pt-14">
      <div className="max-w-5xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#9f2f73]">
          Образовательная экосистема Дениса Михина
        </p>
        <h1 className="mt-5 max-w-4xl text-4xl font-black leading-[1.02] tracking-tight text-slate-950 md:text-6xl">
          Рост в карьере начинается с правильного следующего шага.
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-700 md:text-xl">
          Практические статьи, программы обучения и инструменты для руководителей, Project Manager,
          Product Manager и специалистов, которые хотят расти быстрее.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/training"
            className="inline-flex justify-center rounded-lg bg-slate-950 px-6 py-3 text-base font-bold text-white transition hover:bg-slate-800"
          >
            Подобрать программу развития
          </Link>
          <Link
            href="/articles"
            className="inline-flex justify-center rounded-lg border border-slate-300 bg-white px-6 py-3 text-base font-bold text-slate-900 transition hover:border-slate-500"
          >
            Читать журнал
          </Link>
        </div>
      </div>
    </section>
  );
}

function WorkTasksSection(): JSX.Element {
  return (
    <section className="space-y-6">
      <SectionHeader
        eyebrow="Рабочие задачи"
        title="Начните с того, что сейчас мешает росту"
        text="Главная страница ведет не в ленту и не в каталог, а к ближайшей профессиональной задаче."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {workTasks.map((task) => (
          <Link
            key={task.title}
            href={task.href}
            className="group flex min-h-48 flex-col justify-between rounded-lg border border-slate-200 bg-white p-5 shadow-[0_12px_32px_rgba(15,23,42,0.05)] transition hover:-translate-y-0.5 hover:border-slate-400"
          >
            <div>
              <h3 className="text-xl font-black leading-tight tracking-tight text-slate-950">{task.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{task.text}</p>
            </div>
            <span className="mt-5 text-sm font-bold text-[#9f2f73] group-hover:text-slate-950">
              Собрать следующий шаг
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

function DevelopmentDirectionsSection(): JSX.Element {
  const articles = getLatestArticles(200);

  return (
    <section className="space-y-6">
      <SectionHeader
        eyebrow="Направления развития"
        title="Выберите область, которую нужно усилить"
        text="В карточках уже заложены места для количества статей и программ, чтобы дальше подключить автоматические счетчики."
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {developmentDirections.map((direction) => {
          const articlesCount = direction.category
            ? articles.filter((article) => article.frontmatter.category === direction.category).length
            : 0;

          return (
            <article key={direction.title} className="rounded-lg border border-slate-200 bg-white p-5 shadow-[0_12px_32px_rgba(15,23,42,0.05)]">
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-2xl font-black tracking-tight text-slate-950">{direction.title}</h3>
                {direction.category ? (
                  <span
                    className="rounded-full border px-3 py-1 text-xs font-bold"
                    style={{
                      backgroundColor: CATEGORY_THEME[direction.category].badgeBg,
                      borderColor: CATEGORY_THEME[direction.category].badgeBorder,
                      color: CATEGORY_THEME[direction.category].badgeText
                    }}
                  >
                    {CATEGORY_SHORT_LABELS[direction.category]}
                  </span>
                ) : null}
              </div>
              <p className="mt-4 text-sm leading-7 text-slate-600">{direction.description}</p>
              <div className="mt-5 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                <span>{articlesCount || "скоро"} статей</span>
                <span>·</span>
                <span>{direction.programsCount} программ</span>
              </div>
              <Link
                href={direction.href}
                className="mt-5 inline-flex rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-bold text-slate-900 transition hover:border-slate-600"
              >
                Подробнее
              </Link>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function CareerRoutesSection(): JSX.Element {
  return (
    <section className="space-y-6">
      <SectionHeader
        eyebrow="Карьерные маршруты"
        title="Не набор материалов, а путь к новой роли"
        text="Каждый маршрут показывает ожидаемый результат и количество программ, без слова «курс»."
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {careerRoutes.map((route) => (
          <article key={route.title} className="rounded-lg border border-slate-200 bg-slate-950 p-5 text-white shadow-[0_18px_44px_rgba(15,23,42,0.16)]">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/55">{route.label}</p>
            <h3 className="mt-3 text-2xl font-black tracking-tight">{route.title}</h3>
            <p className="mt-4 text-sm leading-7 text-white/70">{route.result}</p>
            <p className="mt-5 text-sm font-bold text-[#f2cf63]">{route.programs}</p>
            <Link
              href={route.href}
              className="mt-5 inline-flex rounded-lg bg-white px-4 py-2.5 text-sm font-bold text-slate-950 transition hover:bg-slate-100"
            >
              Посмотреть маршрут
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}

function PopularArticlesSection({ articles }: { articles: ArticleSummary[] }): JSX.Element {
  return (
    <section className="space-y-6">
      <SectionHeader
        eyebrow="Популярные статьи"
        title="Материалы, с которых удобно войти в журнал"
        text="Подборка строится автоматически из отмеченных материалов и не зависит от ручного выбора на главной."
      />
      <div className="grid gap-5 lg:grid-cols-3">
        {articles.map((article) => (
          <article key={article.slug} className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-[0_14px_34px_rgba(15,23,42,0.06)]">
            <Link href={`/article/${article.slug}`} className="block">
              <div className="relative aspect-[16/9] bg-slate-100">
                <Image
                  src={article.frontmatter.cover}
                  alt={article.frontmatter.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="p-5">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
                  {CATEGORY_LABELS[article.frontmatter.category]}
                </p>
                <h3 className="mt-3 text-2xl font-black leading-tight tracking-tight text-slate-950">
                  {article.frontmatter.title}
                </h3>
                <p className="mt-3 line-clamp-3 text-sm leading-7 text-slate-600">
                  {article.frontmatter.excerpt}
                </p>
                <div className="mt-5 flex items-center justify-between gap-3">
                  <span className="text-sm font-semibold text-slate-500">
                    {article.frontmatter.readingTime} мин чтения
                  </span>
                  <span className="rounded-lg bg-slate-950 px-4 py-2 text-sm font-bold text-white">
                    Читать
                  </span>
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}

function PopularProgramsSection({ courses }: { courses: StepikCourse[] }): JSX.Element {
  return (
    <section className="space-y-6">
      <SectionHeader
        eyebrow="Популярные программы"
        title="До шести программ, которые чаще всего выбирают"
        text="Главная показывает компактную витрину, а полный каталог остается на отдельной странице."
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => {
          const courseId = getCourseIdFromUrl(course.url);
          const courseHref = buildStepikUtmUrl(course.url, {
            medium: "course_catalog",
            campaign: "home_popular_programs",
            content: course.title
          });

          return (
            <article key={course.id} className="rounded-lg border border-slate-200 bg-white p-5 shadow-[0_12px_32px_rgba(15,23,42,0.05)]">
              <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.12em]">
                <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-600">{course.level}</span>
                <span className="rounded-full bg-[#edf7f1] px-3 py-1 text-[#23704a]">
                  {course.learners ? `${new Intl.NumberFormat("ru-RU").format(course.learners)} слушателей` : "новая программа"}
                </span>
              </div>
              <h3 className="mt-4 text-2xl font-black leading-tight tracking-tight text-slate-950">
                {course.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{course.result}</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href="/training"
                  className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-bold text-slate-900 transition hover:border-slate-600"
                >
                  Подробнее
                </Link>
                <TrackedLink
                  href={courseHref}
                  goal="stepik_click"
                  params={{
                    course_id: courseId,
                    course_title: course.title,
                    course_url: course.url,
                    source: "home_popular_programs"
                  }}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-slate-950 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-slate-800"
                >
                  Начать обучение
                </TrackedLink>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function TrustSection(): JSX.Element {
  return (
    <section className="space-y-6">
      <SectionHeader
        eyebrow="Почему мне можно доверять"
        title="Только факты, без длинной биографии"
        text="Этот блок отвечает за доверие через проверяемые показатели и профессиональный контекст."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {trustFacts.map(([value, label]) => (
          <div key={label} className="rounded-lg border border-slate-200 bg-white p-5">
            <p className="text-3xl font-black tracking-tight text-slate-950">{value}</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function TelegramSection(): JSX.Element {
  return (
    <section className="rounded-lg border border-[#7ccfff] bg-[#eaf8ff] p-6 md:p-8">
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0a4f7b]">Telegram</p>
          <h2 className="mt-3 max-w-3xl text-3xl font-black tracking-tight text-slate-950 md:text-4xl">
            Получайте новые статьи, управленческие решения, шаблоны и практические материалы каждую неделю.
          </h2>
        </div>
        <Link
          href={TELEGRAM_CHANNEL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 justify-center rounded-lg bg-slate-950 px-6 py-3 text-base font-bold text-white transition hover:bg-slate-800"
        >
          Перейти в Telegram
        </Link>
      </div>
    </section>
  );
}

function SectionHeader({
  eyebrow,
  title,
  text
}: {
  eyebrow: string;
  title: string;
  text: string;
}): JSX.Element {
  return (
    <div className="max-w-4xl">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{eyebrow}</p>
      <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950 md:text-4xl">{title}</h2>
      <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600">{text}</p>
    </div>
  );
}

function getPopularArticles(): ArticleSummary[] {
  const featured = getFeaturedArticles(6);
  if (featured.length >= 6) {
    return featured.slice(0, 6);
  }

  const selected = new Map(featured.map((article) => [article.slug, article]));
  getLatestArticles(30).forEach((article) => {
    if (selected.size < 6) {
      selected.set(article.slug, article);
    }
  });

  return [...selected.values()].slice(0, 6);
}

function getPopularPrograms(): StepikCourse[] {
  return [...STEPIK_COURSES]
    .sort((a, b) => (b.learners ?? 0) - (a.learners ?? 0))
    .slice(0, 6);
}
