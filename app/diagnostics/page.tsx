import type { Metadata } from "next";
import { DiagnosticsQuiz } from "@/components/diagnostics-quiz";

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
          Диагностика помогает быстро понять текущий уровень управленческого мышления и увидеть точку роста.
          Ниже вы можете пройти тест и получить персональные рекомендации.
        </p>
      </header>

      <DiagnosticsQuiz />
    </div>
  );
}
