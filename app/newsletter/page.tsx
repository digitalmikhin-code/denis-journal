import type { Metadata } from "next";
import Link from "next/link";
import { NewsletterSignupForm } from "@/components/newsletter-signup-form";

export const metadata: Metadata = {
  title: "Email-рассылка",
  description:
    "Подпишитесь на email-рассылку Дениса Михина: новые разборы, практические инструменты и анонсы продуктов."
};

export default function NewsletterPage(): JSX.Element {
  return (
    <div className="space-y-10">
      <section className="rounded-[2.2rem] border border-slate-200 bg-[linear-gradient(135deg,#fff8e8_0%,#fff0f8_48%,#eef8ff_100%)] p-7 shadow-[0_26px_56px_rgba(15,23,42,0.08)] md:p-9">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Email-канал</p>
        <h1 className="mt-3 max-w-[18ch] text-4xl font-black leading-[0.95] tracking-tight text-slate-900 md:text-6xl">
          Рассылка с рабочими решениями по управлению и росту
        </h1>
        <p className="mt-4 max-w-[58ch] text-base leading-8 text-slate-700 md:text-lg">
          Если хотите получать сильные материалы напрямую в почту, подпишитесь ниже.
          В рассылке: свежие статьи, фреймворки, практические разборы и анонсы новых продуктов.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="/articles"
            className="rounded-2xl border border-slate-900/15 bg-white px-5 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
          >
            Читать статьи
          </Link>
          <Link
            href="/about"
            className="rounded-2xl border border-slate-900/15 bg-white px-5 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
          >
            Об авторе
          </Link>
        </div>
      </section>

      <NewsletterSignupForm
        source="newsletter-page"
        tags={["newsletter", "landing"]}
        title="Подписка на рассылку"
        subtitle="Оставьте ФИО и email. Мы добавим вас в базу и начнем присылать лучшие материалы журнала."
      />
    </div>
  );
}

