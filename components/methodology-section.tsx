import Link from "next/link";
import { MANAGEMENT_THOUGHTS, METHODOLOGY_STEPS } from "@/lib/journal-architecture";

export function MethodologySection(): JSX.Element {
  return (
    <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
      <div className="relative overflow-hidden rounded-[2.25rem] border border-slate-900 bg-slate-950 p-6 text-white shadow-[0_30px_72px_rgba(15,23,42,0.2)] md:p-8">
        <div className="pointer-events-none absolute -right-14 -top-16 h-52 w-52 rounded-full border-[14px] border-[#2bd0e2]/35" />
        <div className="pointer-events-none absolute -bottom-16 left-8 h-44 w-44 rounded-full border-[12px] border-[#f5d45d]/30" />
        <div className="relative">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">Как я смотрю на управление</p>
          <h2 className="mt-3 max-w-[13ch] text-4xl font-black leading-[0.96] tracking-tight md:text-5xl">
            Контур управляемости
          </h2>
          <p className="mt-4 max-w-[58ch] text-base leading-8 text-white/72">
            Управление ломается не потому, что люди “плохо стараются”. Чаще в системе нет ясности:
            кто принимает решения, что важнее, где узкое место и как понять, что работа дала результат.
            Поэтому я начинаю не с методологий, а с устройства управляемости.
          </p>

          <div className="mt-6 grid gap-2 sm:grid-cols-2">
            {METHODOLOGY_STEPS.map((step, index) => (
              <div key={step} className="rounded-2xl border border-white/10 bg-white/[0.06] p-3">
                <span className="text-xs font-black uppercase tracking-[0.16em] text-white/35">
                  0{index + 1}
                </span>
                <p className="mt-1 text-sm font-bold leading-6 text-white/88">{step}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/lead/business-control-diagnostic"
              className="rounded-2xl bg-white px-5 py-3 text-sm font-black text-slate-950 transition hover:-translate-y-0.5 hover:bg-slate-100"
            >
              Найти слабое место
            </Link>
            <Link
              href="/about"
              className="rounded-2xl border border-white/18 bg-white/[0.06] px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-white/[0.1]"
            >
              Как я работаю
            </Link>
          </div>
        </div>
      </div>

      <div className="rounded-[2.25rem] border border-slate-200 bg-white p-6 shadow-[0_24px_56px_rgba(15,23,42,0.07)] md:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
          Наблюдения из практики
        </p>
        <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900">То, что часто решает исход</h2>
        <div className="mt-5 space-y-3">
          {MANAGEMENT_THOUGHTS.map((thought) => (
            <blockquote
              key={thought}
              className="rounded-[1.35rem] border border-slate-200 bg-slate-50 p-4 text-base font-semibold leading-7 text-slate-800"
            >
              {thought}
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
