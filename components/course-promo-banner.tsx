"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type CoursePromoBannerProps = {
  title: string;
  href: string;
  note?: string;
  label?: string;
  ctaLabel?: string;
  ctaLabelAlt?: string;
  experimentId?: string;
  className?: string;
};

export function CoursePromoBanner({
  title,
  href,
  note,
  label = "Рекомендуемый курс",
  ctaLabel = "Перейти к курсу",
  ctaLabelAlt = "Подробнее о программе",
  experimentId = "course-banner-cta-v1",
  className
}: CoursePromoBannerProps): JSX.Element {
  const [variant, setVariant] = useState<"A" | "B">("A");

  useEffect(() => {
    const storageKey = `ab:${experimentId}`;
    const savedVariant = window.localStorage.getItem(storageKey);
    if (savedVariant === "A" || savedVariant === "B") {
      setVariant(savedVariant);
      return;
    }

    const selectedVariant: "A" | "B" = Math.random() < 0.5 ? "A" : "B";
    window.localStorage.setItem(storageKey, selectedVariant);
    setVariant(selectedVariant);
  }, [experimentId]);

  const hrefWithUtm = useMemo(() => {
    try {
      const url = new URL(href);
      url.searchParams.set("utm_source", "journal");
      url.searchParams.set("utm_medium", "course_banner");
      url.searchParams.set("utm_campaign", experimentId);
      url.searchParams.set("utm_content", `variant_${variant.toLowerCase()}`);
      return url.toString();
    } catch {
      return href;
    }
  }, [experimentId, href, variant]);

  const ctaText = variant === "A" ? ctaLabel : ctaLabelAlt;
  const ctaClassName =
    variant === "A"
      ? "inline-flex w-fit shrink-0 items-center rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
      : "inline-flex w-fit shrink-0 items-center rounded-xl border border-slate-900/20 bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-slate-50";

  return (
    <section
      data-ab-test={experimentId}
      data-ab-variant={variant}
      className={
        className ??
        "rounded-2xl border border-[#c8d8ef] bg-[linear-gradient(135deg,#f4f9ff_0%,#f8f4ff_52%,#fff8ef_100%)] p-4 shadow-[0_10px_24px_rgba(15,23,42,0.06)] md:p-5"
      }
    >
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div className="space-y-1.5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">{label}</p>
          <h3 className="text-lg font-extrabold leading-tight tracking-tight text-slate-900 md:text-xl">{title}</h3>
          {note ? <p className="text-sm leading-6 text-slate-600">{note}</p> : null}
        </div>
        <Link
          href={hrefWithUtm}
          target="_blank"
          rel="noopener noreferrer"
          className={ctaClassName}
        >
          {ctaText}
        </Link>
      </div>
    </section>
  );
}
