"use client";

import { useState } from "react";
import { TrackedLink } from "@/components/tracked-link";
import type { MetrikaParams } from "@/lib/analytics";

type ProgramStepikCtaProps = {
  href: string;
  courseTitle: string;
  params: MetrikaParams;
  className?: string;
};

export function ProgramStepikCta({
  href,
  courseTitle,
  params,
  className
}: ProgramStepikCtaProps): JSX.Element {
  const [isMessageVisible, setIsMessageVisible] = useState(false);

  if (isMessageVisible) {
    return (
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
        <p className="text-sm leading-6 text-slate-700">
          Обучение проходит на платформе Stepik. После завершения вы сможете продолжить развитие
          внутри экосистемы Дениса Михина.
        </p>
        <TrackedLink
          href={href}
          goal="stepik_click"
          params={params}
          extraGoals={[{ goal: "course_page_view", params }]}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex rounded-2xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
        >
          Продолжить на Stepik
        </TrackedLink>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setIsMessageVisible(true)}
      className={className}
      aria-label={`Начать обучение: ${courseTitle}`}
    >
      Начать обучение
    </button>
  );
}
