import type { Metadata } from "next";
import { AccountClient } from "@/components/account-client";
import { getAccountSnapshot } from "@/lib/account-api";

export const metadata: Metadata = {
  title: "Личный кабинет",
  description: "Персональный dashboard развития, маршрутов, навыков, программ и рекомендаций.",
  robots: {
    index: false,
    follow: false
  }
};

export default function AccountPage(): JSX.Element {
  return <AccountClient snapshot={getAccountSnapshot()} section="dashboard" />;
}
