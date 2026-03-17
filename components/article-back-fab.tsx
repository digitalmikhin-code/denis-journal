"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function ArticleBackFab(): JSX.Element {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 320);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-6 right-6 z-40 transition duration-300 ${
        visible ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 translate-y-2"
      }`}
    >
      <Link
        href="/articles"
        className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 shadow-lg shadow-slate-900/10 transition hover:-translate-y-0.5 hover:bg-slate-50"
      >
        <span aria-hidden="true">←</span>
        <span>К статьям</span>
      </Link>
    </div>
  );
}
