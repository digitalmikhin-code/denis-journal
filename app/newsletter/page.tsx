import type { Metadata } from "next";
import Link from "next/link";
import { CoursePromoBanner } from "@/components/course-promo-banner";
import { MaxChannelBanner } from "@/components/max-channel-banner";
import { SECTION_COURSE_PROMOS } from "@/lib/course-promos";

export const metadata: Metadata = {
  title: "Канал в Max",
  description:
    "Подпишитесь на канал Дениса Михина в Max: новые разборы, практические инструменты и анонсы материалов журнала."
};

export default function NewsletterPage(): JSX.Element {
  return (
    <div className="space-y-10">
      <section className="rounded-[2.2rem] border border-slate-200 bg-[linear-gradient(135deg,#fff8e8_0%,#fff0f8_48%,#eef8ff_100%)] p-7 shadow-[0_26px_56px_rgba(15,23,42,0.08)] md:p-9">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Канал в Max</p>
        <h1 className="mt-3 max-w-[18ch] text-4xl font-black leading-[0.95] tracking-tight text-slate-900 md:text-6xl">
          Подпишитесь на мой канал в Max
        </h1>
        <p className="mt-4 max-w-[58ch] text-base leading-8 text-slate-700 md:text-lg">
          Старую рассылку я пока убрал. Новые материалы журнала, короткие наблюдения и практические
          разборы теперь удобнее получать через канал в Max.
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

      <MaxChannelBanner />

      <CoursePromoBanner
        {...SECTION_COURSE_PROMOS.newsletter}
        label="Курс из раздела канала"
        ctaLabel="Смотреть курс"
      />
    </div>
  );
}
