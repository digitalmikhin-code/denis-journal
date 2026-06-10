import type { Metadata } from "next";
import Link from "next/link";
import { DiagnosticsHub } from "@/components/diagnostics-hub";

export const metadata: Metadata = {
  title: "Диагностика",
  description: "Раздел для материалов по диагностике: разборы, инструменты и рабочие схемы."
};

export default function DiagnosticsPage(): JSX.Element {
  return (
    <div className="space-y-6">
      <header className="rounded-[2rem] border border-slate-200 bg-[linear-gradient(135deg,#eef8ff_0%,#f7f2ff_52%,#fff6ec_100%)] p-7 shadow-[0_18px_40px_rgba(15,23,42,0.06)] md:p-9">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Новый раздел</p>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl">Диагностика</h1>
        <p className="mt-4 max-w-[64ch] text-base leading-8 text-slate-700 md:text-lg">
          В этом разделе собраны диагностические тесты по управлению, командам и системам работы.
          Выбирайте актуальную диагностику, проходите за несколько минут и получайте персональные ориентиры для роста.
        </p>
      </header>

      <section className="rounded-[2rem] border border-[#f1d973] bg-[#fff9d4] p-6 shadow-[0_18px_40px_rgba(15,23,42,0.06)] md:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8a6e00]">
          Лид-магнит для бизнеса
        </p>
        <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900">
          Диагностика управляемости бизнеса
        </h2>
        <p className="mt-3 max-w-[64ch] text-base leading-8 text-slate-700">
          24 вопроса для собственников, директоров и руководителей подразделений: где бизнес теряет
          управляемость, продажи, фокус или способность проводить изменения.
        </p>
        <Link
          href="/lead/business-control-diagnostic"
          className="mt-5 inline-flex rounded-2xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
        >
          Получить диагностику
        </Link>
      </section>

      <DiagnosticsHub />
    </div>
  );
}
