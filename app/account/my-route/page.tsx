import type { Metadata } from "next";
import { AccountClient } from "@/components/account-client";
import { getAccountSnapshot } from "@/lib/account-api";

export const metadata: Metadata = {
  title: "Мой маршрут",
  robots: {
    index: false,
    follow: false
  }
};

export default function AccountRoutePage(): JSX.Element {
  return <AccountClient snapshot={getAccountSnapshot()} section="route" />;
}
