"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const STORAGE_KEY = "dm_cookie_consent_accepted";

export function CookieConsentBanner(): JSX.Element | null {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.location.pathname.startsWith("/telegram-mini-app")) {
      setVisible(false);
      return;
    }

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
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 border border-slate-200 bg-white p-4 shadow-[0_18px_44px_rgba(9,22,43,0.12)] md:flex-row md:items-center md:justify-between md:gap-6 md:px-6 md:py-5">
        <p className="max-w-[62ch] text-sm leading-7 text-slate-700 sm:text-[0.95rem]">
          Мы используем cookies, чтобы сайт работал стабильно, запоминал ваши действия и
          помогал анализировать посещаемость. Подробнее:{" "}
          <Link href="/privacy#cookies" className="font-semibold text-brand underline underline-offset-4 hover:no-underline">
            политика cookies
          </Link>{" "}
          и{" "}
          <Link
            href="/privacy#personal-data"
            className="font-semibold text-brand underline underline-offset-4 hover:no-underline"
          >
            обработка данных
          </Link>
          .
        </p>
        <button
          type="button"
          onClick={handleAccept}
          className="inline-flex shrink-0 items-center justify-center bg-brand px-6 py-3 text-base font-bold text-white transition hover:bg-brand-dark"
        >
          Принять
        </button>
      </div>
    </div>
  );
}
