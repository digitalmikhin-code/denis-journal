"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { YANDEX_METRIKA_ID } from "@/lib/constants";
import { trackMetrikaGoal } from "@/lib/analytics";

export function YandexMetrika(): null {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const previousUrl = useRef<string | null>(null);

  useEffect(() => {
    function trackRelatedArticle(event: MouseEvent): void {
      if (!(event.target instanceof Element)) return;
      const link = event.target.closest<HTMLAnchorElement>("#related-articles a[href]");
      if (!link || link.origin !== window.location.origin || !link.pathname.startsWith("/article/")) return;

      trackMetrikaGoal("journal_related_article_click", {
        source: "related_articles",
        from: window.location.pathname,
        to: link.pathname
      });
    }

    document.addEventListener("click", trackRelatedArticle);
    return () => document.removeEventListener("click", trackRelatedArticle);
  }, []);

  useEffect(() => {
    const url = window.location.href;
    if (typeof window.ym !== "function" || previousUrl.current === url) return;
    window.ym(YANDEX_METRIKA_ID, "hit", url, {
      title: document.title,
      referer: previousUrl.current ?? document.referrer
    });
    previousUrl.current = url;
  }, [pathname, searchParams]);

  return null;
}
