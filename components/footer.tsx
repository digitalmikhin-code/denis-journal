import Link from "next/link";
import { TELEGRAM_CHANNEL_URL, TELEGRAM_CONSULT_URL } from "@/lib/constants";

const footerLinks = [
  { label: "Главная", href: "/", external: false },
  { label: "Журнал", href: "/articles", external: false },
  { label: "Направления", href: "/hubs", external: false },
  { label: "Рабочие задачи", href: "/solutions", external: false },
  { label: "Навыки", href: "/skills", external: false },
  { label: "Карьерные маршруты", href: "/start", external: false },
  { label: "Программы", href: "/training", external: false },
  { label: "Контакты", href: TELEGRAM_CONSULT_URL, external: true },
  { label: "Политика конфиденциальности", href: "/privacy", external: false },
  { label: "Пользовательское соглашение", href: "/privacy#personal-data", external: false }
] as const;

export function SiteFooter(): JSX.Element {
  return (
    <footer className="site-footer mt-14 border-t border-slate-200 bg-white">
      <div className="container-shell py-8">
        <div className="grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Денис Михин
            </p>
            <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950">
              Образовательная экосистема для управленческого роста
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-600">
              Статьи, программы, маршруты и практические материалы для руководителей,
              Project Manager, Product Manager и специалистов, которые растут в управление.
            </p>
            <p className="mt-4 text-sm text-slate-500">
              © 2025-{new Date().getFullYear()} Денис Михин. Все права защищены.
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Навигация
            </p>
            <nav className="mt-4 grid gap-2 sm:grid-cols-2">
              {footerLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  className="rounded-lg border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-800 transition hover:border-slate-400 hover:bg-slate-50"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href={TELEGRAM_CHANNEL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
              >
                Перейти в Telegram
              </Link>
              <Link
                href="/articles"
                className="rounded-lg border border-slate-300 px-5 py-3 text-sm font-bold text-slate-900 transition hover:border-slate-600"
              >
                Читать журнал
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
