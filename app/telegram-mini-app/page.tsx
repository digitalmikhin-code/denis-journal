import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { TelegramMiniAppClient } from "@/components/telegram-mini-app-client";
import { getTelegramMiniAppSnapshot, pickMiniAppProgram } from "@/lib/telegram-mini-app-api";

export const metadata: Metadata = {
  title: "Telegram Mini App",
  description: "Мобильный навигатор профессионального развития для Telegram.",
  robots: {
    index: false,
    follow: false
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1
};

export default function TelegramMiniAppPage(): JSX.Element {
  const snapshot = getTelegramMiniAppSnapshot();
  const initialPick = pickMiniAppProgram("manager", "management", "beginner");

  return (
    <div className="telegram-mini-app-shell min-h-screen bg-[#f5f7fa] dark:bg-slate-950">
      <Script src="https://telegram.org/js/telegram-web-app.js" strategy="beforeInteractive" />
      <TelegramMiniAppClient snapshot={snapshot} initialPick={initialPick} />
    </div>
  );
}
