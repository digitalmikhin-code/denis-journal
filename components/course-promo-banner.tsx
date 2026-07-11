"use client";

import { useEffect, useMemo, useState } from "react";
import { TrackedLink } from "@/components/tracked-link";
import { buildStepikUtmUrl, getCourseIdFromUrl, type CourseUtmMedium } from "@/lib/analytics";

type CoursePromoBannerProps = {
  title: string;
  href: string;
  note?: string;
  label?: string;
  ctaLabel?: string;
  ctaLabelAlt?: string;
  experimentId?: string;
  utmMedium?: CourseUtmMedium;
  utmCampaign?: string;
  utmContent?: string;
  analyticsSource?: string;
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
  utmMedium = "article",
  utmCampaign = "article_to_course",
  utmContent = title,
  analyticsSource = "course_banner",
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
    return buildStepikUtmUrl(href, {
      medium: utmMedium,
      campaign: utmCampaign,
      content: `${utmContent}_variant_${variant.toLowerCase()}`
    });
  }, [href, utmCampaign, utmContent, utmMedium, variant]);

  const courseId = getCourseIdFromUrl(href);
  const ctaText = variant === "A" ? ctaLabel : ctaLabelAlt;
  const ctaClassName =
    variant === "A"
      ? "inline-flex w-fit shrink-0 items-center bg-brand px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-dark"
      : "inline-flex w-fit shrink-0 items-center border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 transition hover:border-brand hover:text-brand";

  return (
    <section
      data-ab-test={experimentId}
      data-ab-variant={variant}
      className={
        className ??
        "border border-slate-200 bg-white p-4 shadow-[0_14px_34px_rgba(9,22,43,0.06)] md:p-5"
      }
    >
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div className="space-y-1.5">
          <p className="text-[11px] font-semibold uppercase text-brand">{label}</p>
          <h3 className="text-lg font-black leading-tight text-slate-950 md:text-xl">{title}</h3>
          {note ? <p className="text-sm leading-6 text-slate-600">{note}</p> : null}
        </div>
        <TrackedLink
          href={hrefWithUtm}
          goal="stepik_click"
          params={{
            course_id: courseId,
            course_title: title,
            course_url: href,
            source: analyticsSource,
            utm_medium: utmMedium,
            ab_variant: variant
          }}
          extraGoals={[
            {
              goal: "course_page_view",
              params: {
                course_id: courseId,
                course_title: title,
                course_url: href
              }
            },
            {
              goal: "course_recommendation_click",
              params: {
                course_id: courseId,
                course_title: title,
                recommendation_source: analyticsSource
              }
            }
          ]}
          target="_blank"
          rel="noopener noreferrer"
          className={ctaClassName}
        >
          {ctaText}
        </TrackedLink>
      </div>
    </section>
  );
}
