import Link from "next/link";
import { KNOWLEDGE_MAP } from "@/lib/journal-architecture";

export function KnowledgeMapSection(): JSX.Element {
  return (
    <section className="overflow-hidden rounded-[2.25rem] border border-slate-200 bg-white p-6 shadow-[0_26px_64px_rgba(15,23,42,0.07)] md:p-8">
      <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            Карта знаний журнала
          </p>
          <h2 className="mt-3 max-w-[13ch] text-4xl font-black leading-[0.96] tracking-tight text-slate-900 md:text-5xl">
            Не лента статей, а система тем
          </h2>
          <p className="mt-4 max-w-[48ch] text-base leading-8 text-slate-600">
            Здесь собраны материалы о том, как руководителям, командам и компаниям выстраивать
            управление, находить точки роста, внедрять изменения и использовать современные инструменты:
            от системного мышления до ИИ.
          </p>
          <Link
            href="/hubs"
            className="mt-6 inline-flex rounded-2xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
          >
            Открыть все хабы
          </Link>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {KNOWLEDGE_MAP.map((item, index) => (
            <Link
              key={item.title}
              href={item.href}
              className="group relative overflow-hidden rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_18px_40px_rgba(15,23,42,0.08)]"
            >
              <span
                className="absolute right-4 top-4 h-10 w-10 rounded-2xl opacity-25 transition group-hover:scale-125"
                style={{ backgroundColor: item.accent }}
              />
              <div className="relative">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">
                  0{index + 1}
                </p>
                <h3 className="mt-3 text-xl font-black tracking-tight text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
