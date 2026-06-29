import type { Metadata } from "next";
import { AccountClient } from "@/components/account-client";
import { getAccountSnapshot } from "@/lib/account-api";

export const metadata: Metadata = {
  title: "Настройки кабинета",
  robots: {
    index: false,
    follow: false
  }
};

export default function AccountSettingsPage(): JSX.Element {
  return <AccountClient snapshot={getAccountSnapshot()} section="settings" />;
}
