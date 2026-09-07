"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { YANDEX_METRIKA_ID } from "@/lib/constants";

export function YandexMetrika(): null {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const previousUrl = useRef<string | null>(null);

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
