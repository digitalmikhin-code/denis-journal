"use client";

import { useState } from "react";
import { AgileAiTransformationQuiz } from "@/components/agile-ai-transformation-quiz";
import { DiagnosticsQuiz } from "@/components/diagnostics-quiz";
import { KanbanProQuiz } from "@/components/kanban-pro-quiz";
import { Management3Quiz } from "@/components/management-3-quiz";
import { ProductCreationQuiz } from "@/components/product-creation-quiz";
import { ScrumMasterFitQuiz } from "@/components/scrum-master-fit-quiz";
import { ScrumKanbanQuiz } from "@/components/scrum-kanban-quiz";

type QuizKey =
  | "project-management"
  | "product-creation"
  | "agile-ai-transformation"
  | "scrum-kanban"
  | "kanban-pro"
  | "management-3"
  | "scrum-master-fit";

export function DiagnosticsHub(): JSX.Element {
  const [activeQuiz, setActiveQuiz] = useState<QuizKey>("kanban-pro");

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
            onClick={() => setActiveQuiz("agile-ai-transformation")}
            className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
              activeQuiz === "agile-ai-transformation"
                ? "border-slate-900 bg-slate-900 text-white"
                : "border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 hover:bg-slate-100"
            }`}
          >
            Agile / AI трансформация
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
          <button
            type="button"
            onClick={() => setActiveQuiz("scrum-kanban")}
            className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
              activeQuiz === "scrum-kanban"
                ? "border-slate-900 bg-slate-900 text-white"
                : "border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 hover:bg-slate-100"
            }`}
          >
            Scrum / Kanban
          </button>
          <button
            type="button"
            onClick={() => setActiveQuiz("kanban-pro")}
            className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
              activeQuiz === "kanban-pro"
                ? "border-slate-900 bg-slate-900 text-white"
                : "border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 hover:bg-slate-100"
            }`}
          >
            Kanban Pro
          </button>
          <button
            type="button"
            onClick={() => setActiveQuiz("management-3")}
            className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
              activeQuiz === "management-3"
                ? "border-slate-900 bg-slate-900 text-white"
                : "border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 hover:bg-slate-100"
            }`}
          >
            Management 3.0
          </button>
          <button
            type="button"
            onClick={() => setActiveQuiz("scrum-master-fit")}
            className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
              activeQuiz === "scrum-master-fit"
                ? "border-slate-900 bg-slate-900 text-white"
                : "border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 hover:bg-slate-100"
            }`}
          >
            Scrum Master
          </button>
        </div>
      </div>

      {activeQuiz === "kanban-pro" ? <KanbanProQuiz /> : null}
      {activeQuiz === "agile-ai-transformation" ? <AgileAiTransformationQuiz /> : null}
      {activeQuiz === "product-creation" ? <ProductCreationQuiz /> : null}
      {activeQuiz === "project-management" ? <DiagnosticsQuiz /> : null}
      {activeQuiz === "scrum-kanban" ? <ScrumKanbanQuiz /> : null}
      {activeQuiz === "management-3" ? <Management3Quiz /> : null}
      {activeQuiz === "scrum-master-fit" ? <ScrumMasterFitQuiz /> : null}
    </section>
  );
}
