import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { RecommendationBlock } from "@/components/recommendation-block";
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
import { getAllCareerPaths, getCareerPathPrograms, type CareerPath } from "@/lib/career-paths";
import { getFeaturedArticles, getLatestArticles, type ArticleSummary } from "@/lib/content";
import { getRecommendation } from "@/lib/recommendations";
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
    href: "/solutions/promoted-manager"
  },
  {
    title: "Нужно внедрить ИИ",
    text: "Понять, где ИИ помогает управлению, аналитике, решениям и ежедневной работе.",
    href: "/solutions/implement-ai"
  },
  {
    title: "Хочу перейти в управление проектами",
    text: "Разобраться с проектной логикой, сроками, рисками, коммуникацией и результатом.",
    href: "/solutions/project-management"
  },
  {
    title: "Не понимаю Agile",
    text: "Отделить рабочие принципы Agile от ритуалов, терминов и командного театра.",
    href: "/solutions/implement-agile"
  },
  {
    title: "Команда не берет ответственность",
    text: "Найти, где ломаются договоренности, владельцы, контроль и управленческий фокус.",
    href: "/solutions/team-responsibility"
  },
  {
    title: "Постоянно не хватает времени",
    text: "Снизить перегруз, вернуть контроль над задачами и убрать лишнюю операционку.",
    href: "/solutions/time-management"
  },
  {
    title: "Хочу стать Product Manager",
    text: "Перейти от задач и функций к ценности, пользователю, гипотезам и метрикам.",
    href: "/solutions/product-manager"
  },
  {
    title: "Нужно выстроить систему управления",
    text: "Собрать цели, ритм, ответственность, метрики и прозрачность исполнения.",
    href: "/solutions/management-system"
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
    badge: "Product",
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
  ["150+", "выступлений и разборов"]
] as const;

export default function HomePage(): JSX.Element {
  const popularArticles = getPopularArticles();
  const popularPrograms = getPopularPrograms();
  const homepageCareerPaths = getAllCareerPaths().slice(0, 4);
  const recommendation = getRecommendation("home");

  return (
    <div className="space-y-14">
      <HeroSection />
      <WorkTasksSection />
      <DevelopmentDirectionsSection />
      <CareerRoutesSection paths={homepageCareerPaths} />
      <PopularArticlesSection articles={popularArticles} />
      <PopularProgramsSection courses={popularPrograms} />
      <RecommendationBlock recommendation={recommendation} />
      <TrustSection />
      <TelegramSection />
    </div>
  );
}

function HeroSection(): JSX.Element {
  return (
    <section className="relative overflow-hidden border border-slate-200 bg-white p-6 shadow-[0_24px_70px_rgba(9,22,43,0.08)] dark:border-slate-800 dark:bg-slate-900 md:p-10">
      <div className="pointer-events-none absolute inset-0 ambient-grid opacity-55" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-40 w-72 bg-[linear-gradient(135deg,transparent_0%,transparent_38%,rgba(11,77,186,0.16)_38%,rgba(11,77,186,0.16)_66%,rgba(8,46,115,0.92)_66%)] md:h-56 md:w-[28rem]" />
      <div className="relative max-w-5xl">
        <p className="text-sm font-semibold uppercase text-brand dark:text-blue-300">
          Навигатор профессионального развития
        </p>
        <h1 className="mt-5 max-w-5xl text-4xl font-black uppercase leading-[1.02] text-slate-950 dark:text-slate-50 md:text-6xl">
          Найдите следующий шаг в карьере, управлении и обучении
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-700 dark:text-slate-300 md:text-xl">
          Сайт помогает не просто читать статьи, а выбрать понятный маршрут: решить рабочую задачу,
          развить навык, подобрать программу и перейти к действию.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/training"
            className="inline-flex justify-center bg-brand px-6 py-3 text-base font-bold text-white shadow-[0_14px_30px_rgba(11,77,186,0.18)] transition duration-300 hover:-translate-y-0.5 hover:bg-brand-dark dark:bg-white dark:text-slate-950"
          >
            Подобрать программу развития
          </Link>
          <Link
            href="/articles"
            className="inline-flex justify-center border border-slate-300 bg-white px-6 py-3 text-base font-bold text-slate-900 transition duration-300 hover:-translate-y-0.5 hover:border-brand hover:text-brand dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          >
            Читать журнал
          </Link>
        </div>
        <div className="mt-12 grid max-w-3xl grid-cols-2 border border-slate-200 bg-white/82 dark:border-slate-800 dark:bg-slate-950/60 md:grid-cols-4">
          {["Управление", "Продажи", "ИИ", "Трансформации"].map((item) => (
            <div key={item} className="border-b border-r border-slate-200 px-4 py-3 text-xs font-black uppercase text-slate-600 last:border-r-0 dark:border-slate-800 dark:text-slate-300 md:border-b-0">
              {item}
            </div>
          ))}
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
            className="group flex min-h-48 flex-col justify-between border border-slate-200 bg-white p-5 shadow-[0_14px_36px_rgba(9,22,43,0.05)] transition duration-300 hover:-translate-y-0.5 hover:border-brand hover:shadow-[0_20px_46px_rgba(9,22,43,0.09)] dark:border-slate-800 dark:bg-slate-900"
          >
            <div>
              <h3 className="text-xl font-black leading-tight tracking-tight text-slate-950 dark:text-slate-50">{task.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{task.text}</p>
            </div>
            <span className="mt-5 inline-flex border border-slate-200 bg-slate-50 px-4 py-3 text-base font-black text-brand transition group-hover:border-brand group-hover:bg-brand group-hover:text-white dark:border-slate-700 dark:bg-slate-950">
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
            <article key={direction.title} className="border border-slate-200 bg-white p-5 shadow-[0_14px_36px_rgba(9,22,43,0.05)] dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-2xl font-black tracking-tight text-slate-950 dark:text-slate-50">{direction.title}</h3>
                {direction.category ? (
                  <span
                    className="border px-3 py-1 text-xs font-bold uppercase"
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
              <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">{direction.description}</p>
              <div className="mt-5 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                <span>{articlesCount || "скоро"} статей</span>
                <span>/</span>
                <span>{direction.programsCount} программ</span>
              </div>
              <Link
                href={direction.href}
                className="mt-5 inline-flex border border-slate-300 bg-white px-4 py-2.5 text-sm font-bold text-slate-900 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-brand hover:bg-brand hover:text-white hover:shadow-[0_14px_30px_rgba(11,77,186,0.18)] dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
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

function CareerRoutesSection({ paths }: { paths: CareerPath[] }): JSX.Element {
  return (
    <section className="space-y-6">
      <SectionHeader
        eyebrow="Карьерные маршруты"
        title="Не набор материалов, а путь к новой роли"
        text="Каждый маршрут показывает ожидаемый результат и количество программ, без слова «курс»."
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {paths.map((route) => (
          <article key={route.slug} className="border border-slate-800 bg-slate-950 p-5 text-white shadow-[0_18px_44px_rgba(9,22,43,0.18)] dark:border-slate-800">
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/55">Маршрут</p>
              {"badge" in route && typeof route.badge === "string" ? (
                <span className="border border-blue-300 bg-blue-50 px-3 py-1 text-xs font-black text-brand">
                  {route.badge}
                </span>
              ) : null}
            </div>
            <h3 className="mt-3 text-2xl font-black tracking-tight">{route.title}</h3>
            <p className="mt-4 text-sm leading-7 text-white/70">{route.description}</p>
            <p className="mt-5 text-sm font-bold text-blue-200">{getCareerPathPrograms(route).length} этапов</p>
            <Link
              href={`/career-paths/${route.slug}`}
              className="mt-5 inline-flex bg-white px-4 py-2.5 text-sm font-bold text-slate-950 transition duration-300 hover:-translate-y-0.5 hover:bg-blue-50 hover:text-brand"
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
          <article key={article.slug} className="overflow-hidden border border-slate-200 bg-white shadow-[0_14px_34px_rgba(9,22,43,0.06)] dark:border-slate-800 dark:bg-slate-900">
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
                <h3 className="mt-3 text-2xl font-black leading-tight tracking-tight text-slate-950 dark:text-slate-50">
                  {article.frontmatter.title}
                </h3>
                <p className="mt-3 line-clamp-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                  {article.frontmatter.excerpt}
                </p>
                <div className="mt-5 flex items-center justify-between gap-3">
                  <span className="text-sm font-semibold text-slate-500">
                    {article.frontmatter.readingTime} мин чтения
                  </span>
                  <span className="bg-brand px-4 py-2 text-sm font-bold text-white">
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
            <article key={course.id} className="border border-slate-200 bg-white p-5 shadow-[0_14px_36px_rgba(9,22,43,0.05)] dark:border-slate-800 dark:bg-slate-900">
              <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.12em]">
                <span className="border border-slate-200 bg-slate-50 px-3 py-1 text-slate-600">{course.level}</span>
                <span className="border border-blue-100 bg-blue-50 px-3 py-1 text-brand">
                  {course.learners ? `${new Intl.NumberFormat("ru-RU").format(course.learners)} слушателей` : "новая программа"}
                </span>
              </div>
              <h3 className="mt-4 text-2xl font-black leading-tight tracking-tight text-slate-950 dark:text-slate-50">
                {course.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{course.result}</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href="/training"
                  className="border border-slate-300 bg-white px-4 py-2.5 text-sm font-bold text-slate-900 transition duration-300 hover:-translate-y-0.5 hover:border-brand hover:bg-brand hover:text-white dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
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
                  className="bg-slate-950 px-4 py-2.5 text-sm font-bold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-brand hover:shadow-[0_14px_30px_rgba(11,77,186,0.18)] dark:bg-white dark:text-slate-950"
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
          <div key={label} className="border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <p className="text-3xl font-black tracking-tight text-slate-950 dark:text-slate-50">{value}</p>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function TelegramSection(): JSX.Element {
  return (
    <section className="border border-slate-200 bg-white p-6 shadow-[0_22px_54px_rgba(9,22,43,0.07)] dark:border-slate-800 dark:bg-slate-900 md:p-8">
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase text-brand dark:text-sky-300">Telegram</p>
          <h2 className="mt-3 max-w-3xl text-3xl font-black tracking-tight text-slate-950 dark:text-slate-50 md:text-4xl">
            Подпишитесь, чтобы не терять полезные разборы и быстрее находить следующий шаг
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-7 text-slate-700 dark:text-slate-300">
            В канале — короткие управленческие идеи, новые статьи, практические материалы и ссылки на программы,
            которые помогают применять знания в работе.
          </p>
        </div>
        <Link
          href={TELEGRAM_CHANNEL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 justify-center bg-brand px-6 py-3 text-base font-bold text-white shadow-[0_16px_34px_rgba(11,77,186,0.18)] transition duration-300 hover:-translate-y-0.5 hover:bg-brand-dark dark:bg-white dark:text-slate-950"
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
      <p className="border-l-4 border-brand pl-3 text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">{eyebrow}</p>
      <h2 className="mt-2 text-3xl font-black uppercase text-slate-950 dark:text-slate-50 md:text-4xl">{title}</h2>
      <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600 dark:text-slate-300">{text}</p>
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
