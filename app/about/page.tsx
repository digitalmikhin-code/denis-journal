import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL, STEPIK_TEACH_URL, TELEGRAM_CHANNEL_URL, TELEGRAM_CONSULT_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Обо мне",
  description:
    "Денис Михин: стратегический консультант по управлению, Agile и системному росту команд. Форматы работы, экспертиза и контакты.",
  alternates: {
    canonical: "/about"
  },
  openGraph: {
    title: "Обо мне | Журнал Дениса Михина",
    description:
      "Стратегический консультант по управлению, Agile и системному росту команд. Практика, обучение и форматы сотрудничества.",
    url: `${SITE_URL}/about`
  }
};

export default function AboutPage(): JSX.Element {
  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-3xl bg-[#6964d9] p-8 text-white shadow-soft md:p-10">
        <div className="pointer-events-none absolute -right-24 -top-20 h-64 w-64 rounded-full border-[12px] border-white/80" />
        <div className="pointer-events-none absolute -bottom-32 right-20 h-72 w-72 rounded-full border-[10px] border-white/60" />
        <div className="relative grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-center">
          <div className="space-y-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80">Профиль</p>
            <h1 className="max-w-[14ch] text-5xl font-extrabold leading-tight tracking-tight md:text-6xl">
              Денис Михин
            </h1>
            <p className="max-w-[28ch] text-2xl leading-snug text-white/95">
              Стратегический консультант по управлению, Agile и системной трансформации команд.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href={TELEGRAM_CONSULT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl bg-white px-6 py-3 text-base font-bold text-[#5e58ce] transition hover:bg-slate-100"
              >
                Запросить консультацию
              </Link>
              <Link
                href={TELEGRAM_CHANNEL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl border-2 border-white/80 bg-white/10 px-5 py-3 text-base font-semibold text-white transition hover:bg-white/20"
              >
                Telegram-канал
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border-4 border-[#2f2b86] bg-[#8a86ea] p-6 shadow-[0_18px_0_0_rgba(25,22,91,0.35)]">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/80">Экспертиза</p>
            <ul className="mt-3 space-y-2 text-lg leading-snug text-white/95">
              <li>• Управленческие системы и операционная эффективность</li>
              <li>• Agile-подходы под реальные задачи бизнеса</li>
              <li>• Системное мышление в сложных решениях</li>
              <li>• Практическое внедрение ИИ в работу руководителя</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-2">
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">Чем полезен</p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">Задачи, с которыми работаю</h2>
          <ul className="mt-4 space-y-2 text-slate-700">
            <li>Диагностика команд и процессов, поиск узких мест</li>
            <li>Перезапуск управленческого ритма и системы контроля</li>
            <li>Настройка delivery-процесса под цели бизнеса</li>
            <li>Подготовка руководителей к росту зоны ответственности</li>
            <li>Сборка рабочих практик без «теории ради теории»</li>
          </ul>
        </article>

        <article className="rounded-3xl border border-[#efb8d2] bg-[#ffeefa] p-6 shadow-soft">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9f2f73]">Как работаю</p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">Форматы сотрудничества</h2>
          <ul className="mt-4 space-y-2 text-slate-700">
            <li>1:1 сессии для руководителей и специалистов</li>
            <li>Командные стратегические и рабочие сессии</li>
            <li>Консалтинг по трансформации процессов</li>
            <li>Обучение и менторинг на основе реальных кейсов</li>
          </ul>
        </article>
      </section>

      <section className="grid gap-5 md:grid-cols-3">
        <article className="rounded-2xl border border-cyan-200 bg-gradient-to-br from-cyan-50 via-white to-sky-50 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-700">Материалы</p>
          <h3 className="mt-2 text-2xl font-extrabold tracking-tight">Журнал</h3>
          <p className="mt-2 text-sm text-slate-700">
            Разборы по карьере, управлению, мышлению, Agile, архитектуре решений и ИИ.
          </p>
          <Link href="/articles" className="mt-4 inline-flex text-sm font-semibold text-cyan-700 hover:underline">
            Перейти к статьям
          </Link>
        </article>

        <article className="rounded-2xl border border-indigo-200 bg-gradient-to-br from-indigo-50 via-white to-violet-50 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-indigo-700">Обучение</p>
          <h3 className="mt-2 text-2xl font-extrabold tracking-tight">Курсы и практика</h3>
          <p className="mt-2 text-sm text-slate-700">
            Практические программы по системному росту и управленческим инструментам.
          </p>
          <Link
            href={STEPIK_TEACH_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex text-sm font-semibold text-indigo-700 hover:underline"
          >
            Открыть курсы Stepik
          </Link>
        </article>

        <article className="rounded-2xl border border-rose-200 bg-gradient-to-br from-rose-50 via-white to-orange-50 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-rose-700">Медиа</p>
          <h3 className="mt-2 text-2xl font-extrabold tracking-tight">Видео и канал</h3>
          <p className="mt-2 text-sm text-slate-700">
            Короткие практические видео и материалы в Telegram без инфошума.
          </p>
          <div className="mt-4 flex gap-4">
            <Link href="/videos" className="text-sm font-semibold text-rose-700 hover:underline">
              Видео
            </Link>
            <Link
              href={TELEGRAM_CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-rose-700 hover:underline"
            >
              Telegram
            </Link>
          </div>
        </article>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft md:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Подход</p>
        <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
          Строгий, прикладной, ориентированный на результат
        </h2>
        <p className="mt-4 max-w-4xl text-lg text-slate-700">
          Я не продаю универсальные «волшебные» методики. Работа строится от вашей реальной
          ситуации: текущие ограничения, цели, уровень команды, контекст бизнеса. На выходе —
          конкретные управленческие решения, приоритеты и план внедрения.
        </p>
      </section>
    </div>
  );
}

