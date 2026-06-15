"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { trackMetrikaGoal, type MetrikaParams } from "@/lib/analytics";

type TrackedLinkProps = {
  href: string;
  goal: string;
  params?: MetrikaParams;
  extraGoals?: Array<{ goal: string; params?: MetrikaParams }>;
  children: ReactNode;
  className?: string;
  target?: string;
  rel?: string;
};

export function TrackedLink({
  href,
  goal,
  params,
  extraGoals,
  children,
  className,
  target,
  rel
}: TrackedLinkProps): JSX.Element {
  function handleClick(): void {
    trackMetrikaGoal(goal, {
      href,
      ...params
    });

    extraGoals?.forEach((item) => {
      trackMetrikaGoal(item.goal, {
        href,
        ...item.params
      });
    });
  }

  return (
    <Link href={href} target={target} rel={rel} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
}
