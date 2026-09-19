"use client";

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
  return (
    <TrackedLink
      href={href}
      goal="stepik_click"
      params={params}
      extraGoals={[{ goal: "course_page_view", params }]}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      Перейти к курсу на Stepik
      <span className="sr-only">: {courseTitle}</span>
    </TrackedLink>
  );
}
