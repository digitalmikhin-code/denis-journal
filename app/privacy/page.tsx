import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cookies и обработка данных",
  alternates: {
    canonical: "/privacy"
  }
};

export default function PrivacyPage(): JSX.Element {
  return (
    <div className="space-y-8">
      <section className="rounded-[2.1rem] border border-slate-200 bg-white p-8 shadow-[0_18px_40px_rgba(15,23,42,0.06)] md:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          Информация
        </p>
        <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-900 md:text-5xl">
          Cookies и обработка данных
        </h1>
        <p className="mt-4 max-w-4xl text-lg leading-8 text-slate-700">
          На сайте `media.dmikhin.ru` используются технические и аналитические cookies, чтобы
          страницы работали корректно, а владелец сайта мог видеть общую статистику посещаемости.
        </p>
      </section>

      <section className="grid gap-5 md:grid-cols-2">
        <article className="rounded-3xl border border-[#95dff5] bg-[#def6ff] p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#005b75]">
            Какие данные
          </p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">
            Что может фиксироваться
          </h2>
          <ul className="mt-4 space-y-2 text-sm leading-7 text-slate-700">
            <li>адрес и технические параметры устройства;</li>
            <li>просмотренные страницы и действия на сайте;</li>
            <li>источник перехода и базовая статистика визитов;</li>
            <li>технические cookies для стабильной работы сайта.</li>
          </ul>
        </article>

        <article className="rounded-3xl border border-[#f4b0d2] bg-[#ffe7f4] p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9f2f73]">
            Зачем это нужно
          </p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">
            Для работы и улучшения сайта
          </h2>
          <ul className="mt-4 space-y-2 text-sm leading-7 text-slate-700">
            <li>чтобы страницы открывались корректно и быстрее;</li>
            <li>чтобы понимать, какие материалы полезны читателям;</li>
            <li>чтобы улучшать структуру, навигацию и качество публикаций;</li>
            <li>чтобы анализировать посещаемость через системы веб-аналитики.</li>
          </ul>
        </article>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.06)] md:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
          Важно
        </p>
        <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">
          Используя сайт, вы соглашаетесь с такой обработкой
        </h2>
        <p className="mt-4 max-w-4xl text-base leading-8 text-slate-700">
          Если вы продолжаете пользоваться сайтом и подтверждаете уведомление о cookies,
          это означает согласие на использование технических и аналитических cookies в объёме,
          необходимом для работы сайта и анализа его посещаемости.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/"
            className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Вернуться на главную
          </Link>
          <Link
            href="/about"
            className="rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
          >
            Об авторе
          </Link>
        </div>
      </section>
    </div>
  );
}
