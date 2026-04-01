import type { Metadata } from "next";
import Link from "next/link";
import { AuthorQuote } from "@/components/author-quote";
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
            <h1 className="max-w-[14ch] text-5xl font-extrabold leading-tight tracking-tight md:text-6xl">Денис Михин</h1>
            <p className="max-w-[32ch] text-2xl leading-snug text-white/95">
              Помогаю лидерам строить сильные команды и управленческие системы, которые дают стабильный бизнес-результат.
            </p>
            <p className="max-w-[58ch] text-base text-white/90">
              Работаю на стыке управления, процессов и человеческого фактора. Убираю хаос в операционке, выстраиваю рабочие
              ритмы и внедряю практики, которые команда реально применяет каждый день.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href={TELEGRAM_CONSULT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl bg-white px-6 py-3 text-base font-bold text-[#5e58ce] transition hover:bg-slate-100"
              >
                Получить консультацию
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

          <div className="grid gap-3">
            <div className="rounded-2xl border-4 border-[#2f2b86] bg-[#8a86ea] p-5 shadow-[0_12px_0_0_rgba(25,22,91,0.35)]">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/80">Фокус</p>
              <ul className="mt-2 space-y-1.5 text-sm leading-snug text-white/95">
                <li>Операционная эффективность команд</li>
                <li>Система управления и зона ответственности</li>
                <li>Agile-подходы под задачи бизнеса</li>
                <li>ИИ в работе руководителя без инфошума</li>
              </ul>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="rounded-xl border border-[#efe37a] bg-[#fff7b8] p-3 text-slate-900">
                <p className="text-[10px] uppercase tracking-[0.15em] text-slate-600">Подход</p>
                <p className="mt-1 text-sm font-bold">Практика</p>
              </div>
              <div className="rounded-xl border border-[#8be7d1] bg-[#d9fff4] p-3 text-slate-900">
                <p className="text-[10px] uppercase tracking-[0.15em] text-slate-600">Фокус</p>
                <p className="mt-1 text-sm font-bold">Результат</p>
              </div>
              <div className="rounded-xl border border-[#f3b7d8] bg-[#ffe7f4] p-3 text-slate-900">
                <p className="text-[10px] uppercase tracking-[0.15em] text-slate-600">Формат</p>
                <p className="mt-1 text-sm font-bold">Система</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AuthorQuote
        className="border-[#d6dcff] bg-[#f7f8ff]"
        quote="Позиция автора важна только тогда, когда она помогает команде действовать точнее и сильнее."
      />
      <section className="grid gap-5 md:grid-cols-2">
        <article className="rounded-3xl border border-[#f1d973] bg-[#fff9d4] p-6 shadow-soft">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8a6e00]">Чем полезен</p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">Задачи, с которыми работаю</h2>
          <ul className="mt-4 space-y-2 text-slate-800">
            <li>Диагностика команд и процессов, поиск узких мест и скрытых потерь</li>
            <li>Перезапуск управленческого ритма и системы контроля задач</li>
            <li>Настройка delivery-процесса под конкретные KPI бизнеса</li>
            <li>Подготовка руководителей к росту зоны ответственности</li>
            <li>Внедрение практик без «теории ради теории»</li>
          </ul>
        </article>

        <article className="rounded-3xl border border-[#efb8d2] bg-[#ffeefa] p-6 shadow-soft">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9f2f73]">Как работаю</p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">Форматы сотрудничества</h2>
          <div className="mt-4 space-y-3">
            <div className="rounded-xl border border-white/70 bg-white/70 p-3 text-slate-800">
              <p className="font-semibold">1:1 сессии для руководителей и специалистов</p>
              <p className="mt-1 text-sm">Фокус на вашей задаче, приоритеты на 30–90 дней и конкретные действия.</p>
            </div>
            <div className="rounded-xl border border-white/70 bg-white/70 p-3 text-slate-800">
              <p className="font-semibold">Командные стратегические и рабочие сессии</p>
              <p className="mt-1 text-sm">Синхронизация ролей, договоренности по ритмам и прозрачный контур управления.</p>
            </div>
            <div className="rounded-xl border border-white/70 bg-white/70 p-3 text-slate-800">
              <p className="font-semibold">Консалтинг и менторинг изменений</p>
              <p className="mt-1 text-sm">Сопровождение внедрения до измеримого эффекта, а не до красивой презентации.</p>
            </div>
          </div>
        </article>
      </section>

      <section className="grid gap-5 md:grid-cols-3">
        <article className="rounded-2xl border border-cyan-200 bg-gradient-to-br from-cyan-50 via-white to-sky-50 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-700">Материалы</p>
          <h3 className="mt-2 text-2xl font-extrabold tracking-tight">Журнал</h3>
          <p className="mt-2 text-sm text-slate-700">
            Разборы по карьере, управлению, системному мышлению, Agile, архитектуре решений и ИИ.
          </p>
          <div className="mt-4 space-y-1 text-sm text-slate-700">
            <p>Практические статьи без воды</p>
            <p>Кейсы и прикладные схемы</p>
            <p>Рабочие шаблоны и чек-листы</p>
          </div>
          <Link href="/articles" className="mt-4 inline-flex text-sm font-semibold text-cyan-700 hover:underline">
            Перейти к статьям
          </Link>
        </article>

        <article className="rounded-2xl border border-indigo-200 bg-gradient-to-br from-indigo-50 via-white to-violet-50 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-indigo-700">Обучение</p>
          <h3 className="mt-2 text-2xl font-extrabold tracking-tight">Курсы и практика</h3>
          <p className="mt-2 text-sm text-slate-700">
            Программы для системного роста управленческих навыков и внедрения инструментов в реальную работу команды.
          </p>
          <div className="mt-4 space-y-1 text-sm text-slate-700">
            <p>Курсы Stepik</p>
            <p>Разборы 1:1</p>
            <p>Практика на ваших кейсах</p>
          </div>
          <Link
            href={STEPIK_TEACH_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex text-sm font-semibold text-indigo-700 hover:underline"
          >
            Открыть курсы Stepik
          </Link>
        </article>

        <article className="rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-lime-50 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700">Медиа</p>
          <h3 className="mt-2 text-2xl font-extrabold tracking-tight">Видео и Telegram</h3>
          <p className="mt-2 text-sm text-slate-700">Короткие практические видео и ежедневные заметки для руководителей.</p>
          <div className="mt-4 space-y-1 text-sm text-slate-700">
            <p>Видеоразборы управленческих решений</p>
            <p>Обновления по новым материалам</p>
            <p>Фокус на применении, а не на хайпе</p>
          </div>
          <div className="mt-4 flex gap-4">
            <Link href="/videos" className="text-sm font-semibold text-emerald-700 hover:underline">
              Видео
            </Link>
            <Link
              href={TELEGRAM_CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-emerald-700 hover:underline"
            >
              Telegram
            </Link>
          </div>
        </article>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft md:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Подход к работе</p>
        <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
          Строгий, прикладной, ориентированный на результат
        </h2>
        <p className="mt-4 max-w-4xl text-lg text-slate-700">
          Я не продаю универсальные методики. Работа строится от вашей ситуации: цели бизнеса, текущие ограничения, зрелость
          команды и управленческий контекст. На выходе вы получаете ясную систему действий, приоритеты и измеримый эффект.
        </p>
        <div className="mt-6 grid gap-3 md:grid-cols-4">
          <div className="rounded-xl border border-[#f5d76f] bg-[#fff8c8] p-4">
            <p className="text-xs uppercase tracking-[0.14em] text-[#896700]">Этап 1</p>
            <p className="mt-1 font-semibold text-slate-900">Диагностика текущего состояния</p>
          </div>
          <div className="rounded-xl border border-[#8edec9] bg-[#ddfff2] p-4">
            <p className="text-xs uppercase tracking-[0.14em] text-[#0f7758]">Этап 2</p>
            <p className="mt-1 font-semibold text-slate-900">Проектирование решений и ролей</p>
          </div>
          <div className="rounded-xl border border-[#f4b0d2] bg-[#ffe7f4] p-4">
            <p className="text-xs uppercase tracking-[0.14em] text-[#9f2f73]">Этап 3</p>
            <p className="mt-1 font-semibold text-slate-900">Внедрение в рабочие ритмы</p>
          </div>
          <div className="rounded-xl border border-[#95dff5] bg-[#def6ff] p-4">
            <p className="text-xs uppercase tracking-[0.14em] text-[#005b75]">Этап 4</p>
            <p className="mt-1 font-semibold text-slate-900">Контроль метрик и корректировка</p>
          </div>
        </div>
      </section>
    </div>
  );
}
