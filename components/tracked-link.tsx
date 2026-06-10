"use client";

import Link from "next/link";
import type { MouseEvent, ReactNode } from "react";
import { YANDEX_METRIKA_ID } from "@/lib/constants";

type TrackedLinkProps = {
  href: string;
  goal: string;
  params?: Record<string, string | number | boolean | undefined>;
  children: ReactNode;
  className?: string;
  target?: string;
  rel?: string;
};

declare global {
  interface Window {
    ym?: (...args: unknown[]) => void;
  }
}

export function TrackedLink({
  href,
  goal,
  params,
  children,
  className,
  target,
  rel
}: TrackedLinkProps): JSX.Element {
  function handleClick(event: MouseEvent<HTMLAnchorElement>): void {
    if (typeof window === "undefined" || typeof window.ym !== "function") {
      return;
    }

    window.ym(YANDEX_METRIKA_ID, "reachGoal", goal, {
      href,
      ...params
    });
  }

  return (
    <Link href={href} target={target} rel={rel} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
}
