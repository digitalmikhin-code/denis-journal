import type { Metadata } from "next";
import Link from "next/link";
import { ArticleCard } from "@/components/article-card";
import { getAllArticles, type ArticleSummary } from "@/lib/content";
import { STEPIK_TEACH_URL, TELEGRAM_CONSULT_URL, type Category } from "@/lib/constants";

type StartRoute = {
  slug: string;
  audience: string;
  title: string;
  description: string;
  categories: Category[];
  signals: string[];
  tool: string;
  toolHref: string;
  course: {
    title: string;
    href: string;
  };
  consultWhen: string;
  accent: string;
};

const START_ROUTES: StartRoute[] = [
  {
    slug: "business-owner",
    audience: "Собственник бизнеса",
    title: "Найти точки роста и связать изменения с результатом",
    description:
      "Маршрут для тех, кому важно видеть бизнес как систему: продажи, управление, процессы, команда и изменения должны работать на общий результат.",
    categories: ["management", "thinking", "architecture", "cases"],
    signals: ["рост", "бизнес", "продаж", "результат", "точк", "систем", "управ"],
    tool: "Диагностика управляемости бизнеса",
    toolHref: "/lead/business-control-diagnostic",
    course: {
      title: "Все курсы Дениса Михина",
      href: STEPIK_TEACH_URL
    },
    consultWhen:
      "Когда есть задача роста, но непонятно, где главный ограничитель: продажи, процессы, команда или система управления.",
    accent: "#f5d45d"
  },
  {
    slug: "department-lead",
    audience: "Руководитель подразделения",
    title: "Собрать управляемость без ручного контроля",
    description:
      "Маршрут для руководителя, которому нужно больше предсказуемости: понятные роли, ответственность, ритмы и решения.",
    categories: ["management", "architecture", "thinking"],
    signals: ["руковод", "управ", "команд", "ответствен", "ритм", "контроль", "решен"],
    tool: "Чек-лист управляемости команды",
    toolHref: "/diagnostics",
    course: {
      title: "Эффективный руководитель",
      href: "https://stepik.org/course/271020/promo"
    },
    consultWhen:
      "Когда команда перегружена, задачи расползаются, а руководителю приходится держать систему вручную.",
    accent: "#cba4ff"
  },
  {
    slug: "project-product-agile",
    audience: "Project / Product / Agile-менеджер",
    title: "Навести порядок в проектах, приоритетах и delivery",
    description:
      "Маршрут для тех, кто отвечает за движение задач к результату: сроки, риски, приоритеты, поток работы и прозрачность.",
    categories: ["management", "agile", "architecture", "cases"],
    signals: ["проект", "agile", "scrum", "kanban", "приоритет", "срок", "риск", "delivery"],
    tool: "Карта здоровья проекта",
    toolHref: "/hub/projects",
    course: {
      title: "Основы управления проектами",
      href: "https://stepik.org/course/259560/promo"
    },
    consultWhen:
      "Когда проект важный, сроки давят, риски растут, а команда теряет общий фокус.",
    accent: "#7ccfff"
  },
  {
    slug: "hr-lead",
    audience: "HR-руководитель",
    title: "Провести изменения так, чтобы они закрепились в работе",
    description:
      "Маршрут для HR и лидеров изменений: как соединить культуру, процессы, управленческий ритм и бизнес-задачи.",
    categories: ["agile", "management", "architecture", "cases"],
    signals: ["изменен", "трансформац", "команд", "культур", "адаптив", "ответствен", "ритм"],
    tool: "Карта готовности команды к изменениям",
    toolHref: "/hub/transformations",
    course: {
      title: "Agile AI Transformation",
      href: "https://stepik.org/course/255881/promo"
    },
    consultWhen:
      "Когда изменения запускаются, но команда устает, сопротивляется или не переносит новые практики в ежедневную работу.",
    accent: "#9ba3b3"
  },
  {
    slug: "career-specialist",
    audience: "Специалист, который хочет карьерного роста",
    title: "Стать заметнее и перейти к большей ответственности",
    description:
      "Маршрут для сильного специалиста: как нарастить влияние, показать результат, развить управленческое мышление и двигаться дальше.",
    categories: ["career", "management", "thinking"],
    signals: ["карьер", "рост", "влия", "замет", "специалист", "руковод", "ответствен"],
    tool: "Карта карьерного роста на 90 дней",
    toolHref: "/hub/career",
    course: {
      title: "Эффективный руководитель",
      href: "https://stepik.org/course/271020/promo"
    },
    consultWhen:
      "Когда вы готовы расти, но неясно, какой следующий шаг даст заметность, влияние и доверие руководства.",
    accent: "#ff9aa2"
  },
  {
    slug: "ai-work",
    audience: "Хочу разобраться с ИИ в работе",
    title: "Понять, где ИИ реально помогает руководителю",
    description:
      "Маршрут для тех, кто хочет использовать ИИ без шума: анализ, подготовка решений, дашборды, прогнозы и рабочие ассистенты.",
    categories: ["ai", "architecture", "management"],
    signals: ["ии", "ai", "аналит", "прогноз", "дашборд", "ассист", "решен", "цифров"],
    tool: "50 промтов для руководителя",
    toolHref: "/lead/manager-ai-prompts",
    course: {
      title: "Промт-инжиниринг с нуля",
      href: "https://stepik.org/course/243614/promo"
    },
    consultWhen:
      "Когда ИИ уже нужен в работе команды, но пока нет понятной карты сценариев, правил и управленческого эффекта.",
    accent: "#ffb267"
  }
];

export const metadata: Metadata = {
  title: "С чего начать",
  description:
    "Маршруты для новых посетителей журнала Дениса Михина: собственник, руководитель, Project/Product/Agile-менеджер, HR, карьерный рост и ИИ в работе.",
  alternates: {
    canonical: "/start"
  }
};

function pickRouteArticles(articles: ArticleSummary[], route: StartRoute): ArticleSummary[] {
  const signals = route.signals.map((signal) => signal.toLowerCase());

  return articles
    .map((article) => {
      const text = `${article.frontmatter.title} ${article.frontmatter.excerpt} ${
        article.frontmatter.tags?.join(" ") ?? ""
      }`.toLowerCase();
      const categoryScore = route.categories.includes(article.frontmatter.category as Category) ? 5 : 0;
      const signalScore = signals.reduce((score, signal) => score + (text.includes(signal) ? 2 : 0), 0);
      const featuredScore = article.frontmatter.featured ? 2 : 0;

      return {
        article,
        score: categoryScore + signalScore + featuredScore
      };
    })
    .filter((item) => item.score > 0)
    .sort((left, right) => {
      if (right.score !== left.score) {
        return right.score - left.score;
      }
      return new Date(right.article.frontmatter.date).getTime() - new Date(left.article.frontmatter.date).getTime();
    })
    .slice(0, 3)
    .map((item) => item.article);
}

export default function StartPage(): JSX.Element {
  const articles = getAllArticles(false);
  const routes = START_ROUTES.map((route) => ({
    ...route,
    articles: pickRouteArticles(articles, route)
  }));

  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden border border-slate-200 bg-white p-6 shadow-[0_24px_70px_rgba(9,22,43,0.08)] dark:border-slate-800 dark:bg-slate-900 md:p-8">
        <div className="pointer-events-none absolute inset-0 ambient-grid opacity-50" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-40 w-72 bg-[linear-gradient(135deg,transparent_0%,transparent_42%,rgba(11,77,186,0.14)_42%,rgba(11,77,186,0.14)_68%,rgba(8,46,115,0.9)_68%)]" />
        <div className="relative max-w-4xl">
          <p className="border-l-4 border-brand pl-3 text-xs font-semibold uppercase text-brand">
            Навигатор по журналу
          </p>
          <h1 className="mt-4 max-w-[13ch] text-4xl font-black uppercase leading-[1.02] text-slate-950 dark:text-slate-50 md:text-6xl">
            Найдите свой вход
          </h1>
          <p className="mt-5 max-w-[64ch] text-base leading-8 text-slate-700 dark:text-slate-300 md:text-lg">
            Выберите ситуацию, которая ближе всего к вашей. Я собрал маршруты так, чтобы вы не тонули
            в архиве, а сразу попадали к нужной теме, инструменту и следующему шагу.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="#routes"
              className="bg-brand px-6 py-3 text-base font-black text-white transition hover:-translate-y-0.5 hover:bg-brand-dark"
            >
              Выбрать свою ситуацию
            </a>
            <Link
              href="/hubs"
              className="border border-slate-300 bg-white px-6 py-3 text-base font-bold text-slate-900 transition hover:-translate-y-0.5 hover:border-brand hover:text-brand dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            >
              Смотреть хабы
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {[
          ["1", "Найдите свой контекст", "Не все материалы нужны всем. Начинаем с вашей реальной задачи."],
          ["2", "Соберите оптику", "Одна статья дает вход, следующие материалы помогают увидеть систему."],
          ["3", "Перейдите к действию", "Диагностика, курс или разбор нужны тогда, когда появляется конкретный узел."]
        ].map(([step, title, text]) => (
          <div key={step} className="border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900">
            <span className="flex h-10 w-10 items-center justify-center bg-brand text-sm font-black text-white">
              {step}
            </span>
            <h2 className="mt-4 text-xl font-black text-slate-950 dark:text-slate-50">{title}</h2>
            <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">{text}</p>
          </div>
        ))}
      </section>

      <section id="routes" className="scroll-mt-28 space-y-8">
        {routes.map((route) => {
          const [firstArticle, ...nextArticles] = route.articles;

          return (
            <article
              key={route.slug}
              className="overflow-hidden border border-slate-200 bg-white shadow-[0_22px_54px_rgba(9,22,43,0.07)] dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="grid gap-0 xl:grid-cols-[0.82fr_1.18fr]">
                <div className="relative overflow-hidden border-b border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-950 md:p-8 xl:border-b-0 xl:border-r">
                  <div
                    className="pointer-events-none absolute bottom-0 right-0 h-28 w-48 bg-[linear-gradient(135deg,transparent_0%,transparent_42%,rgba(11,77,186,0.14)_42%,rgba(11,77,186,0.14)_100%)]"
                  />
                  <div className="relative">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                      {route.audience}
                    </p>
                    <h2 className="mt-3 text-3xl font-black uppercase leading-tight text-slate-950 dark:text-slate-50 md:text-4xl">
                      {route.title}
                    </h2>
                    <p className="mt-4 text-base leading-8 text-slate-700 dark:text-slate-300">{route.description}</p>

                    <div className="mt-6 border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                        Инструмент
                      </p>
                      <p className="mt-2 text-lg font-black text-slate-950 dark:text-slate-50">{route.tool}</p>
                      <Link
                        href={route.toolHref}
                        className="mt-3 inline-flex border border-slate-300 bg-white px-4 py-2.5 text-sm font-bold text-slate-800 transition hover:border-brand hover:text-brand dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                      >
                        Перейти к инструменту
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="p-6 md:p-8">
                  {firstArticle ? (
                    <div className="border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                        Начните с этой статьи
                      </p>
                      <h3 className="mt-3 text-2xl font-black text-slate-950 dark:text-slate-50">
                        <Link href={`/article/${firstArticle.slug}`} className="hover:text-brand">
                          {firstArticle.frontmatter.title}
                        </Link>
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                        {firstArticle.frontmatter.excerpt}
                      </p>
                    </div>
                  ) : null}

                  {nextArticles.length > 0 ? (
                    <div className="mt-5 grid gap-4 md:grid-cols-2">
                      {nextArticles.map((article, index) => (
                        <Link
                          key={article.slug}
                          href={`/article/${article.slug}`}
                          className="border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-brand dark:border-slate-800 dark:bg-slate-900"
                        >
                          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                            Читать дальше 0{index + 1}
                          </p>
                          <h3 className="mt-2 text-lg font-black leading-tight text-slate-950 dark:text-slate-50">
                            {article.frontmatter.title}
                          </h3>
                        </Link>
                      ))}
                    </div>
                  ) : null}

                  <div className="mt-5 grid gap-4 lg:grid-cols-2">
                    <div className="border border-blue-100 bg-blue-50 p-4 dark:border-slate-800 dark:bg-slate-950">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
                        Курс
                      </p>
                      <p className="mt-2 text-lg font-black text-slate-950 dark:text-slate-50">{route.course.title}</p>
                      <Link
                        href={route.course.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-flex bg-brand px-4 py-2.5 text-sm font-bold text-white transition hover:bg-brand-dark"
                      >
                        Смотреть курс
                      </Link>
                    </div>

                    <div className="border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
                        Когда нужна консультация
                      </p>
                      <p className="mt-2 text-sm font-semibold leading-6 text-slate-800 dark:text-slate-200">
                        {route.consultWhen}
                      </p>
                      <Link
                        href={TELEGRAM_CONSULT_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-flex bg-slate-950 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-brand dark:bg-white dark:text-slate-950"
                      >
                        Обсудить задачу
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </section>

      <section className="border border-slate-200 bg-white p-6 text-center shadow-soft dark:border-slate-800 dark:bg-slate-900 md:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
          Не уверены, с чего начать?
        </p>
        <h2 className="mt-3 text-3xl font-black uppercase text-slate-950 dark:text-slate-50 md:text-4xl">
          Начните с диагностики или принесите задачу на разбор
        </h2>
        <p className="mx-auto mt-4 max-w-[58ch] text-base leading-8 text-slate-700 dark:text-slate-300">
          Если ситуация уже болит, не обязательно читать все подряд. Быстрее понять, где ограничение,
          и выбрать маршрут под вашу задачу.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            href="/diagnostics"
            className="border border-slate-300 bg-white px-6 py-3 text-base font-bold text-slate-800 transition hover:border-brand hover:text-brand dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
          >
            Пройти диагностику
          </Link>
          <Link
            href={TELEGRAM_CONSULT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-brand px-6 py-3 text-base font-bold text-white transition hover:bg-brand-dark"
          >
            Обсудить задачу
          </Link>
        </div>
      </section>
    </div>
  );
}
