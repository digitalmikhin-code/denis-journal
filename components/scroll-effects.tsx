"use client";

import { useEffect } from "react";

const TARGET_SELECTOR = "main > *, main article, [data-reveal]";

export function ScrollEffects(): null {
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      return;
    }

    const targets = Array.from(document.querySelectorAll<HTMLElement>(TARGET_SELECTOR));
    if (!targets.length) {
      return;
    }

    targets.forEach((node) => {
      node.classList.add("reveal-on-scroll");
    });

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      {
        rootMargin: "0px 0px -10% 0px",
        threshold: 0.12
      }
    );

    targets.forEach((node) => observer.observe(node));

    return () => observer.disconnect();
  }, []);

  return null;
}
