import type { Metadata } from "next";
import Link from "next/link";
import { getAllHubs } from "@/lib/hubs";

export const metadata: Metadata = {
  title: "Тематические хабы",
  description:
    "Карта знаний журнала Дениса Михина: управление, продажи, ИИ, системное мышление, проекты, карьера и трансформации.",
  alternates: {
    canonical: "/hubs"
  }
};

export default function HubsPage(): JSX.Element {
  const hubs = getAllHubs();

  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden border border-slate-200 bg-white p-6 shadow-[0_24px_70px_rgba(9,22,43,0.08)] dark:border-slate-800 dark:bg-slate-900 md:p-8">
        <div className="pointer-events-none absolute inset-0 ambient-grid opacity-50" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-40 w-72 bg-[linear-gradient(135deg,transparent_0%,transparent_42%,rgba(11,77,186,0.14)_42%,rgba(11,77,186,0.14)_68%,rgba(8,46,115,0.9)_68%)]" />
        <div className="relative max-w-4xl">
          <p className="border-l-4 border-brand pl-3 text-xs font-semibold uppercase text-brand">
            Карта знаний
          </p>
          <h1 className="mt-4 max-w-[13ch] text-4xl font-black uppercase leading-[1.02] text-slate-950 dark:text-slate-50 md:text-6xl">
            Тематические хабы
          </h1>
          <p className="mt-5 max-w-[62ch] text-base leading-8 text-slate-700 dark:text-slate-300 md:text-lg">
            Не архив отдельных статей, а система знаний: выберите тему, погрузитесь в материалы,
            пройдите диагностику, заберите инструмент и перейдите к курсу или консалтингу.
          </p>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {hubs.map((hub) => (
          <Link
            key={hub.slug}
            href={`/hub/${hub.slug}`}
            className="group overflow-hidden border border-slate-200 bg-white shadow-[0_16px_40px_rgba(9,22,43,0.06)] transition hover:-translate-y-0.5 hover:border-brand dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="h-1 bg-brand" />
            <div className="p-6">
              <p className="text-xs font-semibold uppercase text-brand">
                Хаб
              </p>
              <h2 className="mt-3 text-3xl font-black uppercase text-slate-950 dark:text-slate-50">
                {hub.title}
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{hub.description}</p>
              <div className="mt-5 border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
                <p className="text-xs font-semibold uppercase text-slate-500">
                  Для кого
                </p>
                <p className="mt-2 text-sm font-semibold leading-6 text-slate-800 dark:text-slate-200">{hub.audience}</p>
              </div>
              <div className="mt-5 flex items-center justify-between gap-3">
                <span className="text-sm font-black uppercase text-brand">Открыть хаб</span>
                <span className="text-xl font-black text-brand transition group-hover:translate-x-1">→</span>
              </div>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}
