"use client";

import { useEffect } from "react";

const TARGET_SELECTOR = "main > *, main article, [data-reveal]";
const TONE_SELECTOR = "main > *";
const BRAND_TONES = [
  "rgba(251, 113, 133, 0.2)",
  "rgba(167, 139, 250, 0.2)",
  "rgba(56, 189, 248, 0.2)",
  "rgba(52, 211, 153, 0.18)",
  "rgba(250, 204, 21, 0.16)"
];

export function ScrollEffects(): null {
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobileViewport = window.matchMedia("(max-width: 1024px)").matches;
    const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
    if (reduceMotion || isMobileViewport || isCoarsePointer) {
      const visibleTargets = Array.from(document.querySelectorAll<HTMLElement>(TARGET_SELECTOR));
      visibleTargets.forEach((node) => {
        node.classList.remove("reveal-pending");
        node.classList.remove("reveal-on-scroll");
        node.classList.remove("is-visible");
      });
      return;
    }

    const targets = Array.from(document.querySelectorAll<HTMLElement>(TARGET_SELECTOR));
    if (!targets.length) {
      return;
    }

    targets.forEach((node) => {
      node.classList.add("reveal-on-scroll");
      node.classList.add("reveal-pending");
    });

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            entry.target.classList.remove("reveal-pending");
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

    const toneTargets = Array.from(document.querySelectorAll<HTMLElement>(TONE_SELECTOR)).filter(
      (node) => node.offsetHeight > 180
    );

    const root = document.documentElement;
    const defaultTone = BRAND_TONES[0];

    const getTone = (node: HTMLElement, index: number) =>
      node.dataset.scrollTone?.trim() || BRAND_TONES[index % BRAND_TONES.length] || defaultTone;

    let rafId = 0;
    const updateTone = () => {
      if (!toneTargets.length) {
        root.style.setProperty("--scroll-tone", defaultTone);
        return;
      }

      const focusY = window.innerHeight * 0.42;
      let bestIndex = 0;
      let bestDistance = Number.POSITIVE_INFINITY;

      for (let index = 0; index < toneTargets.length; index += 1) {
        const rect = toneTargets[index].getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > window.innerHeight) {
          continue;
        }

        const center = (rect.top + rect.bottom) / 2;
        const distance = Math.abs(center - focusY);
        if (distance < bestDistance) {
          bestDistance = distance;
          bestIndex = index;
        }
      }

      root.style.setProperty("--scroll-tone", getTone(toneTargets[bestIndex], bestIndex));
    };

    const onScroll = () => {
      if (rafId) {
        return;
      }

      rafId = window.requestAnimationFrame(() => {
        rafId = 0;
        updateTone();
      });
    };

    updateTone();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);

      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, []);

  return null;
}
