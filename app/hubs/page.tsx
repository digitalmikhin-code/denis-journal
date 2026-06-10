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
    <div className="space-y-10">
      <section className="relative overflow-hidden rounded-[2.35rem] border border-slate-200 bg-slate-950 p-7 text-white shadow-[0_34px_82px_rgba(15,23,42,0.22)] md:p-10">
        <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full border-[16px] border-[#2bd0e2]/35" />
        <div className="pointer-events-none absolute -bottom-24 left-8 h-60 w-60 rounded-full border-[14px] border-[#f5d45d]/30" />
        <div className="relative max-w-4xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/50">
            Карта знаний
          </p>
          <h1 className="mt-4 max-w-[13ch] text-5xl font-black leading-[0.94] tracking-tight md:text-7xl">
            Тематические хабы
          </h1>
          <p className="mt-5 max-w-[62ch] text-base leading-8 text-white/72 md:text-lg">
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
            className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_22px_50px_rgba(15,23,42,0.08)] transition hover:-translate-y-1 hover:shadow-[0_28px_60px_rgba(15,23,42,0.12)]"
          >
            <div className="h-3" style={{ backgroundColor: hub.accent }} />
            <div className="p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                Хаб
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900">
                {hub.title}
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">{hub.description}</p>
              <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Для кого
                </p>
                <p className="mt-2 text-sm font-semibold leading-6 text-slate-800">{hub.audience}</p>
              </div>
              <div className="mt-5 flex items-center justify-between gap-3">
                <span className="text-sm font-black text-slate-900">Открыть хаб</span>
                <span className="text-xl font-black text-slate-400 transition group-hover:text-slate-900">→</span>
              </div>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}
