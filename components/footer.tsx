import Link from "next/link";
import { TELEGRAM_CHANNEL_URL, TELEGRAM_CONSULT_URL } from "@/lib/constants";

const footerGroups = [
  {
    title: "Навигация",
    links: [
      { label: "Главная", href: "/" },
      { label: "С чего начать", href: "/start" },
      { label: "Поиск", href: "/search" },
    ]
  },
  {
    title: "Обучение",
    links: [
      { label: "Курсы", href: "/training" },
      { label: "Карьерные маршруты", href: "/career-paths" },
      { label: "Навыки", href: "/skills" },
      { label: "Рабочие задачи", href: "/solutions" }
    ]
  },
  {
    title: "Журнал",
    links: [
      { label: "Статьи", href: "/articles" },
      { label: "Хабы", href: "/hubs" },
      { label: "Видео", href: "/videos" },
      { label: "Практика", href: "/practice" }
    ]
  },
  {
    title: "Проекты",
    links: [
      { label: "Диагностика", href: "/diagnostics" },
      { label: "Зрелость руководителя", href: "/diagnostics/management-maturity-index" },
      { label: "Telegram Mini App", href: "/telegram-mini-app" },
      { label: "Консалтинг", href: "/consulting" }
    ]
  }
] as const;

export function SiteFooter(): JSX.Element {
  return (
    <footer className="site-footer mt-14 border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="container-shell py-10">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_1.6fr] lg:items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
              Денис Михин
            </p>
            <h2 className="mt-2 max-w-xl text-2xl font-black tracking-tight text-slate-950 dark:text-slate-50">
              Образовательная экосистема для управленческого роста
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-300">
              Статьи, программы, маршруты и практические материалы для руководителей, Project Manager,
              Product Manager и специалистов, которые растут в управление.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href={TELEGRAM_CHANNEL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-brand px-5 py-3 text-sm font-bold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-brand-dark dark:bg-white dark:text-slate-950"
              >
                Telegram
              </Link>
              <Link
                href={TELEGRAM_CONSULT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-slate-300 px-5 py-3 text-sm font-bold text-slate-900 transition duration-300 hover:-translate-y-0.5 hover:border-brand hover:text-brand dark:border-slate-700 dark:text-slate-100"
              >
                Связаться
              </Link>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {footerGroups.map((group) => (
              <nav key={group.title} className="border border-slate-200 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-900/70">
                <h3 className="text-xs font-black uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                  {group.title}
                </h3>
                <div className="mt-3 grid gap-2">
                  {group.links.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="px-2 py-1.5 text-sm font-semibold text-slate-700 transition hover:bg-white hover:text-brand dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-slate-200 pt-5 text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400 md:flex-row md:items-center md:justify-between">
          <p>© 2025-{new Date().getFullYear()} Денис Михин. Все права защищены.</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/privacy" className="hover:text-slate-950 dark:hover:text-white">
              Политика конфиденциальности
            </Link>
            <Link href="/privacy#personal-data" className="hover:text-slate-950 dark:hover:text-white">
              Пользовательское соглашение
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
