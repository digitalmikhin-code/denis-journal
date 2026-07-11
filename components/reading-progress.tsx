"use client";

import { useEffect, useState } from "react";

type ReadingProgressProps = {
  targetId: string;
};

export function ReadingProgress({ targetId }: ReadingProgressProps): JSX.Element {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function updateProgress(): void {
      const target = document.getElementById(targetId);
      if (!target) return;

      const rect = target.getBoundingClientRect();
      const scrollTop = window.scrollY;
      const articleTop = rect.top + scrollTop;
      const articleHeight = target.scrollHeight;
      const viewportHeight = window.innerHeight;
      const readableDistance = Math.max(articleHeight - viewportHeight * 0.55, 1);
      const current = scrollTop - articleTop + viewportHeight * 0.25;
      const nextProgress = Math.min(Math.max(current / readableDistance, 0), 1);

      setProgress(Math.round(nextProgress * 100));
    }

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, [targetId]);

  return (
    <div
      aria-hidden="true"
      className="fixed left-0 right-0 top-0 z-50 h-1 bg-transparent"
    >
      <div
        className="h-full bg-[linear-gradient(90deg,#082e73_0%,#0b4dba_100%)] shadow-[0_0_14px_rgba(11,77,186,0.24)] transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
