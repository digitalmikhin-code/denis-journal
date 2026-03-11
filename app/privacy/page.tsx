import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL, TELEGRAM_CONSULT_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Cookies и обработка персональных данных",
  description:
    "Информация об использовании cookies, веб-аналитики и обработке персональных данных на сайте media.dmikhin.ru.",
  alternates: {
    canonical: "/privacy"
  }
};

const updatedAt = "11 марта 2026";

export default function PrivacyPage(): JSX.Element {
  return (
    <div className="space-y-8">
      <section className="rounded-[2.3rem] border border-slate-200 bg-white p-8 shadow-[0_18px_40px_rgba(15,23,42,0.06)] md:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Юридическая информация</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-900 md:text-5xl">
          Cookies и обработка персональных данных
        </h1>
        <p className="mt-4 max-w-4xl text-lg leading-8 text-slate-700">
          На сайте <span className="font-semibold text-slate-900">{SITE_URL}</span> используются технические и аналитические
          cookies, а также инструменты веб-аналитики. Ниже описано, какие данные могут обрабатываться, зачем это
          делается и как пользователь может управлять своим согласием.
        </p>

        <div className="mt-6 grid gap-3 md:grid-cols-3">
          <a
            href="#cookies"
            className="rounded-2xl border border-[#95dff5] bg-[#def6ff] px-5 py-4 text-sm font-semibold text-[#045a72] transition hover:bg-[#d1f1ff]"
          >
            Политика cookies
          </a>
          <a
            href="#personal-data"
            className="rounded-2xl border border-[#f4b0d2] bg-[#ffe7f4] px-5 py-4 text-sm font-semibold text-[#96306e] transition hover:bg-[#ffdced]"
          >
            Политика обработки персональных данных
          </a>
          <a
            href="#contacts"
            className="rounded-2xl border border-[#c7b8ff] bg-[#f1ecff] px-5 py-4 text-sm font-semibold text-[#5443b8] transition hover:bg-[#e9e1ff]"
          >
            Контакты и запросы
          </a>
        </div>
      </section>

      <section id="cookies" className="rounded-[2rem] border border-[#95dff5] bg-[#eefbff] p-7 shadow-sm md:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0b6881]">Раздел 1</p>
        <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">Политика использования cookies</h2>
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <article className="rounded-3xl border border-white/70 bg-white/80 p-5">
            <h3 className="text-xl font-bold text-slate-900">Что такое cookies</h3>
            <p className="mt-3 text-sm leading-7 text-slate-700">
              Cookies — это небольшие текстовые файлы, которые браузер сохраняет на устройстве пользователя. Они помогают
              сайту работать корректно, запоминать выбранные параметры и собирать обезличенную статистику посещаемости.
            </p>
          </article>
          <article className="rounded-3xl border border-white/70 bg-white/80 p-5">
            <h3 className="text-xl font-bold text-slate-900">Какие cookies используются</h3>
            <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-700">
              <li>технические — для стабильной работы интерфейса и сохранения пользовательских настроек;</li>
              <li>аналитические — для оценки посещаемости, поведения на страницах и улучшения структуры сайта;</li>
              <li>
                сторонние — при воспроизведении встроенных видео с внешних платформ или переходе по внешним ссылкам.
              </li>
            </ul>
          </article>
        </div>

        <div className="mt-5 rounded-3xl border border-white/70 bg-white/80 p-6">
          <h3 className="text-xl font-bold text-slate-900">Для чего они нужны</h3>
          <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-700">
            <li>обеспечивать корректную работу сайта и клиентских функций;</li>
            <li>анализировать общую посещаемость и востребованность материалов;</li>
            <li>улучшать навигацию, подачу контента и пользовательский опыт;</li>
            <li>не показывать повторно уведомление о согласии с cookies после подтверждения.</li>
          </ul>
        </div>

        <div className="mt-5 rounded-3xl border border-[#bfe9f7] bg-[#dff6ff] p-6">
          <p className="text-sm leading-7 text-slate-700">
            Пользователь может ограничить использование cookies в настройках браузера. При отключении части cookies
            отдельные функции сайта могут работать некорректно или недоступно.
          </p>
        </div>
      </section>

      <section id="personal-data" className="rounded-[2rem] border border-[#f4b0d2] bg-[#fff2f8] p-7 shadow-sm md:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9f2f73]">Раздел 2</p>
        <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">
          Политика обработки персональных данных
        </h2>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <article className="rounded-3xl border border-white/70 bg-white/85 p-5">
            <h3 className="text-xl font-bold text-slate-900">Оператор</h3>
            <p className="mt-3 text-sm leading-7 text-slate-700">
              Оператором персональных данных в рамках работы сайта является Денис Михин, владелец и администратор
              ресурса {SITE_URL}.
            </p>
          </article>
          <article className="rounded-3xl border border-white/70 bg-white/85 p-5">
            <h3 className="text-xl font-bold text-slate-900">Какие данные могут обрабатываться</h3>
            <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-700">
              <li>IP-адрес, cookie-идентификаторы, user-agent, сведения о браузере и устройстве;</li>
              <li>адреса просмотренных страниц, дата и время посещения, источник перехода;</li>
              <li>обезличенные данные о действиях пользователя на сайте;</li>
              <li>данные, которые пользователь добровольно передаёт через внешние каналы связи.</li>
            </ul>
          </article>
        </div>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <article className="rounded-3xl border border-white/70 bg-white/85 p-5">
            <h3 className="text-xl font-bold text-slate-900">Цели обработки</h3>
            <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-700">
              <li>обеспечение работы сайта и его клиентских функций;</li>
              <li>оценка посещаемости и улучшение структуры контента;</li>
              <li>подготовка статистических и аналитических отчётов о работе ресурса;</li>
              <li>обработка обращений, если пользователь сам инициировал связь с оператором.</li>
            </ul>
          </article>
          <article className="rounded-3xl border border-white/70 bg-white/85 p-5">
            <h3 className="text-xl font-bold text-slate-900">Правовые основания</h3>
            <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-700">
              <li>согласие пользователя, выраженное через использование сайта и подтверждение cookie-баннера;</li>
              <li>необходимость технического функционирования сайта;</li>
              <li>законные интересы оператора по анализу и улучшению собственного ресурса.</li>
            </ul>
          </article>
        </div>

        <div className="mt-5 rounded-3xl border border-white/70 bg-white/85 p-6">
          <h3 className="text-xl font-bold text-slate-900">Передача данных третьим лицам</h3>
          <p className="mt-3 text-sm leading-7 text-slate-700">
            Для аналитики сайт использует Яндекс Метрику. При открытии встроенных видео или переходе на внешние платформы
            пользователь также взаимодействует с сервисами соответствующих площадок. Их обработка данных регулируется
            собственными документами этих сервисов.
          </p>
        </div>

        <div className="mt-5 rounded-3xl border border-[#f7c4de] bg-[#ffe7f4] p-6">
          <h3 className="text-xl font-bold text-slate-900">Сроки хранения и права пользователя</h3>
          <p className="mt-3 text-sm leading-7 text-slate-700">
            Данные хранятся не дольше, чем это необходимо для достижения заявленных целей или в пределах сроков,
            предусмотренных настройками аналитических сервисов. Пользователь вправе запросить уточнение, ограничение
            обработки или удаление данных, если это применимо к конкретному случаю.
          </p>
        </div>
      </section>

      <section id="contacts" className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-[0_18px_40px_rgba(15,23,42,0.06)] md:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Раздел 3</p>
        <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">Контакты и важная оговорка</h2>
        <div className="mt-5 grid gap-5 md:grid-cols-[1.15fr_0.85fr]">
          <article className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm leading-7 text-slate-700">
              По вопросам, связанным с использованием материалов сайта, cookies и обработкой персональных данных, можно
              обратиться к оператору через основной канал связи:
            </p>
            <Link
              href={TELEGRAM_CONSULT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Написать оператору
            </Link>
          </article>

          <article className="rounded-3xl border border-[#ffe3aa] bg-[#fff7db] p-5">
            <p className="text-sm leading-7 text-slate-700">
              Этот документ — практическая политика для работы сайта и cookie-уведомления. Для полной юридической
              настройки под ваш формат деятельности может дополнительно потребоваться отдельная правовая проверка,
              реквизиты оператора и, при наличии оснований, уведомление Роскомнадзора.
            </p>
            <p className="mt-3 text-sm font-semibold text-slate-900">Дата последнего обновления: {updatedAt}</p>
          </article>
        </div>
      </section>
    </div>
  );
}
