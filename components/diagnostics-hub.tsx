"use client";

import { useState } from "react";
import { DiagnosticsQuiz } from "@/components/diagnostics-quiz";
import { ProductCreationQuiz } from "@/components/product-creation-quiz";

type QuizKey = "project-management" | "product-creation";

export function DiagnosticsHub(): JSX.Element {
  const [activeQuiz, setActiveQuiz] = useState<QuizKey>("product-creation");

  return (
    <section className="space-y-4">
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_10px_24px_rgba(15,23,42,0.05)]">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Выберите диагностику</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveQuiz("product-creation")}
            className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
              activeQuiz === "product-creation"
                ? "border-slate-900 bg-slate-900 text-white"
                : "border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 hover:bg-slate-100"
            }`}
          >
            Создание продуктов
          </button>
          <button
            type="button"
            onClick={() => setActiveQuiz("project-management")}
            className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
              activeQuiz === "project-management"
                ? "border-slate-900 bg-slate-900 text-white"
                : "border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 hover:bg-slate-100"
            }`}
          >
            Управление проектами
          </button>
        </div>
      </div>

      {activeQuiz === "product-creation" ? <ProductCreationQuiz /> : <DiagnosticsQuiz />}
    </section>
  );
}
