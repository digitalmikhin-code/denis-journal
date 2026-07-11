import type { Metadata, Viewport } from "next";
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
    <div className="-mx-4 -my-8 bg-slate-100 px-4 py-5 dark:bg-slate-950 md:mx-0 md:my-0 md:border md:border-slate-200 md:bg-white md:shadow-[0_24px_70px_rgba(9,22,43,0.08)]">
      <TelegramMiniAppClient snapshot={snapshot} initialPick={initialPick} />
    </div>
  );
}
