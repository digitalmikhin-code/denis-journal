import type { Metadata } from "next";
import Link from "next/link";
import { STEPIK_TEACH_URL, TELEGRAM_CHANNEL_URL, TELEGRAM_CONSULT_URL } from "@/lib/constants";
import { getPageContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Обучение",
  description:
    "Практические программы Дениса Михина: курсы, разборы 1:1 и рабочие форматы развития для руководителей и специалистов.",
  alternates: {
    canonical: "/training"
  }
};

export default function TrainingPage(): JSX.Element {
  const page = getPageContent("training");

  return (
    <div className="space-y-10">
      <section className="relative overflow-hidden rounded-[2.25rem] border border-[#b7a9ff] bg-[#6d67df] px-8 py-10 text-white shadow-[0_32px_72px_rgba(67,56,202,0.24)] md:px-10 md:py-12">
        <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full border-[14px] border-white/75" />
        <div className="pointer-events-none absolute -bottom-24 right-20 h-72 w-72 rounded-full border-[10px] border-white/55" />
        <div className="pointer-events-none absolute left-[58%] top-[18%] h-36 w-36 rounded-[2rem] border-2 border-[#2f2b86]/70 bg-white/15" />

        <div className="relative grid gap-8 md:grid-cols-[1.08fr_0.92fr] md:items-center">
          <div className="space-y-5">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/80">
              Обучение и развитие
            </p>
            <h1 className="max-w-[11ch] text-5xl font-black leading-[0.93] tracking-tight md:text-7xl">
              {page.title} с реальным результатом
            </h1>
            <p className="max-w-[30ch] text-[1.45rem] leading-tight text-white/95 md:text-[1.8rem]">
              Практические курсы, разборы 1:1 и рабочие форматы, которые помогают не просто
              узнать новое, а внедрить это в реальную работу.
            </p>
            <div className="grid max-w-3xl gap-3 md:grid-cols-3">
              <div className="rounded-[1.4rem] border border-[#f1e786] bg-[#fff7c8] p-4 text-[#403300] shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#7c6800]">
                  Формат
                </p>
                <p className="mt-2 text-sm font-medium leading-6">
                  Короткий путь от материала к понятному следующему шагу.
                </p>
              </div>
              <div className="rounded-[1.4rem] border border-[#96e4cf] bg-[#ddfff3] p-4 text-[#104e3b] shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#0f7758]">
                  Фокус
                </p>
                <p className="mt-2 text-sm font-medium leading-6">
                  Карьера, управление, рабочие процессы и системный рост.
                </p>
              </div>
              <div className="rounded-[1.4rem] border border-[#f3b7d8] bg-[#ffe8f4] p-4 text-[#6f164c] shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9f2f73]">
                  Подход
                </p>
                <p className="mt-2 text-sm font-medium leading-6">
                  Меньше теории ради теории, больше применимости в работе.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 pt-1">
              <Link
                href={STEPIK_TEACH_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl bg-white px-6 py-3 text-base font-bold text-[#5e58ce] transition hover:bg-slate-100"
              >
                Смотреть форматы
              </Link>
              <Link
                href={TELEGRAM_CONSULT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl border-2 border-white/80 bg-white/10 px-6 py-3 text-base font-semibold text-white transition hover:bg-white/20"
              >
                Обсудить задачу
              </Link>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="rounded-[2rem] border-4 border-[#2f2b86] bg-[#8b87eb] p-6 shadow-[0_14px_0_0_rgba(39,34,106,0.34)]">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/80">
                Главная идея
              </p>
              <p className="mt-3 text-3xl font-black leading-[1.02] tracking-tight">
                Не просто курс, а система + применение на вашей ситуации.
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-white/16 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/70">
                    Основа
                  </p>
                  <p className="mt-2 text-sm leading-6 text-white/92">
                    Курсы на Stepik дают структуру, логику и последовательность.
                  </p>
                </div>
                <div className="rounded-2xl bg-white/16 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/70">
                    Усиление
                  </p>
                  <p className="mt-2 text-sm leading-6 text-white/92">
                    Разбор 1:1 помогает быстро перевести знания в решение под ваш контекст.
                  </p>
                </div>
              </div>
            </div>

            <article className="rounded-[1.8rem] border border-white/25 bg-white/14 p-5 backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/75">
                Для кого это
              </p>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-white/90">
                <li>Руководители, которые хотят выстроить сильную операционную систему.</li>
                <li>Специалисты, которым нужен следующий шаг в карьере без хаоса.</li>
                <li>Лидеры изменений, которым нужен внешний взгляд и рабочая рамка.</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section id="programs" className="grid gap-5 md:grid-cols-2">
        <article className="rounded-3xl border border-cyan-200 bg-gradient-to-br from-cyan-50 via-white to-sky-50 p-6 shadow-[0_18px_40px_rgba(8,145,178,0.08)]">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700">
            Курсы
          </p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">
            Обучение на Stepik
          </h2>
          <p className="mt-3 text-base leading-7 text-slate-700">
            Все программы в одном месте: карьерный рост, управление, мышление, рабочие
            инструменты и прикладные управленческие практики.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-cyan-100 bg-white/85 p-4">
              <p className="text-sm font-semibold text-slate-900">Что получаете</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Пошаговую структуру, концентрат опыта и материал, к которому можно возвращаться.
              </p>
            </div>
            <div className="rounded-2xl border border-cyan-100 bg-white/85 p-4">
              <p className="text-sm font-semibold text-slate-900">Когда полезно</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Когда нужен системный рост, а не разрозненные советы из разных источников.
              </p>
            </div>
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href={STEPIK_TEACH_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-xl bg-cyan-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-cyan-700"
            >
              Перейти к курсам
            </Link>
            <Link
              href={TELEGRAM_CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-xl border border-cyan-300 bg-white px-4 py-2.5 text-sm font-semibold text-cyan-700 transition hover:border-cyan-500"
            >
              Telegram-канал
            </Link>
          </div>
        </article>

        <article className="rounded-3xl border border-[#efb8d2] bg-gradient-to-br from-[#fff0f7] via-white to-[#ffe6f3] p-6 shadow-[0_18px_40px_rgba(159,47,115,0.08)]">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9f2f73]">
            Разбор 1:1
          </p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">
            Стратегическая сессия под вашу задачу
          </h2>
          <p className="mt-3 text-base leading-7 text-slate-700">
            Если задача уже есть и время важно, разбор помогает быстро определить фокус,
            убрать лишнее и собрать рабочий план действий.
          </p>
          <div className="mt-5 space-y-3">
            <div className="rounded-2xl border border-white/70 bg-white/85 p-4">
              <p className="text-sm font-semibold text-slate-900">Что разбираем</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Команду, процессы, управленческие узкие места, личную карьерную стратегию и зоны роста.
              </p>
            </div>
            <div className="rounded-2xl border border-white/70 bg-white/85 p-4">
              <p className="text-sm font-semibold text-slate-900">Что на выходе</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Приоритеты, ясная рамка действий и понимание, что делать в ближайшие 30–90 дней.
              </p>
            </div>
          </div>
          <Link
            href={TELEGRAM_CONSULT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex rounded-xl bg-[#ff6a3d] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#ef5d31]"
          >
            Получить консультацию Дениса бесплатно
          </Link>
        </article>
      </section>

      <section className="grid gap-5 md:grid-cols-3">
        <article className="rounded-2xl border border-[#f5d76f] bg-[#fff8c8] p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#896700]">
            Путь 1
          </p>
          <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900">
            Сначала система
          </h3>
          <p className="mt-3 text-sm leading-7 text-slate-700">
            Идеально, когда нужно спокойно выстроить основу: изучить рамку, увидеть логику и
            пройти материал в своём темпе.
          </p>
        </article>

        <article className="rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-lime-50 p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700">
            Путь 2
          </p>
          <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900">
            Сразу в свою ситуацию
          </h3>
          <p className="mt-3 text-sm leading-7 text-slate-700">
            Подходит, когда вопрос уже горит: нужен внешний взгляд, быстрая структура и более
            точное управленческое решение.
          </p>
        </article>

        <article className="rounded-2xl border border-indigo-200 bg-gradient-to-br from-indigo-50 via-white to-violet-50 p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-indigo-700">
            Путь 3
          </p>
          <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900">
            Курс + разбор
          </h3>
          <p className="mt-3 text-sm leading-7 text-slate-700">
            Самый сильный формат: сначала база и общий контур, потом адаптация материала под ваш
            контекст через 1:1 сессию.
          </p>
        </article>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.06)] md:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
          Как это устроено
        </p>
        <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
          Обучение не заканчивается на просмотре материала
        </h2>
        <p className="mt-4 max-w-4xl text-lg text-slate-700">
          Смысл этой страницы не в том, чтобы просто показать ссылки на курсы. Она собирает единый
          контур развития: материалы, обучение, личный разбор и канал, где можно держать фокус между
          большими этапами.
        </p>
        <div className="mt-6 grid gap-3 md:grid-cols-4">
          <div className="rounded-xl border border-[#95dff5] bg-[#def6ff] p-4">
            <p className="text-xs uppercase tracking-[0.14em] text-[#005b75]">Этап 1</p>
            <p className="mt-1 font-semibold text-slate-900">Выбрать задачу и формат</p>
          </div>
          <div className="rounded-xl border border-[#f5d76f] bg-[#fff8c8] p-4">
            <p className="text-xs uppercase tracking-[0.14em] text-[#896700]">Этап 2</p>
            <p className="mt-1 font-semibold text-slate-900">Собрать базу и рамку мышления</p>
          </div>
          <div className="rounded-xl border border-[#8edec9] bg-[#ddfff2] p-4">
            <p className="text-xs uppercase tracking-[0.14em] text-[#0f7758]">Этап 3</p>
            <p className="mt-1 font-semibold text-slate-900">Перенести это в рабочую практику</p>
          </div>
          <div className="rounded-xl border border-[#f4b0d2] bg-[#ffe7f4] p-4">
            <p className="text-xs uppercase tracking-[0.14em] text-[#9f2f73]">Этап 4</p>
            <p className="mt-1 font-semibold text-slate-900">Уточнить и усилить через разбор</p>
          </div>
        </div>
      </section>
    </div>
  );
}

