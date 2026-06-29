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
    <div className="-mx-4 -my-8 bg-slate-950 px-4 py-5 md:mx-0 md:my-0 md:rounded-[2rem]">
      <TelegramMiniAppClient snapshot={snapshot} initialPick={initialPick} />
    </div>
  );
}
