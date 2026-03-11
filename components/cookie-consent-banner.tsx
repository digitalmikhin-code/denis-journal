"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const STORAGE_KEY = "dm_cookie_consent_accepted";

export function CookieConsentBanner(): JSX.Element | null {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const accepted = window.localStorage.getItem(STORAGE_KEY);
      if (!accepted) {
        setVisible(true);
      }
    } catch {
      setVisible(true);
    }
  }, []);

  const handleAccept = (): void => {
    try {
      window.localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // Ignore storage errors and just hide the banner for the current session.
    }
    setVisible(false);
  };

  if (!visible) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-4 z-[140] px-4 sm:bottom-5 sm:px-6">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 rounded-[1.6rem] border border-slate-900/10 bg-white/95 p-4 shadow-[0_22px_54px_rgba(15,23,42,0.18)] backdrop-blur md:flex-row md:items-center md:justify-between md:gap-6 md:px-6 md:py-5">
        <p className="max-w-[62ch] text-sm leading-7 text-slate-700 sm:text-[0.95rem]">
          Мы используем cookies, чтобы сайт работал стабильно, запоминал ваши действия и
          помогал анализировать посещаемость. Подробнее:{" "}
          <Link href="/privacy" className="font-semibold text-[#2563eb] hover:underline">
            политика cookies
          </Link>{" "}
          и{" "}
          <Link href="/privacy" className="font-semibold text-[#2563eb] hover:underline">
            обработка данных
          </Link>
          .
        </p>
        <button
          type="button"
          onClick={handleAccept}
          className="inline-flex shrink-0 items-center justify-center rounded-2xl bg-[#22a447] px-6 py-3 text-base font-bold text-white shadow-[0_8px_22px_rgba(34,164,71,0.28)] transition hover:bg-[#1b8a3a]"
        >
          Принять
        </button>
      </div>
    </div>
  );
}
