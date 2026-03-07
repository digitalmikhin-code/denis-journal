"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { TELEGRAM_CHANNEL_URL } from "@/lib/constants";

const DISMISSED_KEY = "telegram-scroll-banner-dismissed";

export function TelegramScrollBanner(): JSX.Element | null {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    try {
      setIsDismissed(window.localStorage.getItem(DISMISSED_KEY) === "1");
    } catch {
      setIsDismissed(false);
    }
  }, []);

  useEffect(() => {
    if (isDismissed) {
      setIsVisible(false);
      return;
    }

    const onScroll = (): void => {
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (documentHeight <= 0) {
        setIsVisible(false);
        return;
      }

      const progress = window.scrollY / documentHeight;
      setIsVisible(progress > 0.45);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [isDismissed]);

  if (pathname.startsWith("/admin") || pathname.startsWith("/studio")) {
    return null;
  }

  if (!isVisible || isDismissed) {
    return null;
  }

  const onClose = (): void => {
    try {
      window.localStorage.setItem(DISMISSED_KEY, "1");
    } catch {
      // Ignore storage failures.
    }
    setIsDismissed(true);
    setIsVisible(false);
  };

  return (
    <aside className="fixed inset-x-3 bottom-3 z-50 md:inset-x-6 md:bottom-6">
      <div className="mx-auto flex max-w-[1100px] items-center gap-3 rounded-2xl border border-[#4c45b8] bg-[#6964d9] px-4 py-3 text-white shadow-[0_12px_40px_rgba(35,29,97,0.45)] md:px-5">
        <p className="flex-1 text-sm font-semibold leading-tight md:text-base">
          Подпишитесь на Telegram-канал Дениса, чтобы не пропускать важные новости и новые статьи.
        </p>
        <Link
          href={TELEGRAM_CHANNEL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 rounded-xl bg-white px-4 py-2 text-sm font-bold text-[#2f2b8f] transition hover:bg-[#eef0ff]"
        >
          Подписаться
        </Link>
        <button
          type="button"
          onClick={onClose}
          className="shrink-0 rounded-lg border border-white/35 px-2.5 py-1.5 text-sm font-bold text-white/90 transition hover:bg-white/10 hover:text-white"
          aria-label="Закрыть баннер"
        >
          ×
        </button>
      </div>
    </aside>
  );
}
