import type { Metadata } from "next";
import { AccountClient } from "@/components/account-client";
import { getAccountSnapshot } from "@/lib/account-api";

export const metadata: Metadata = {
  title: "История активности",
  robots: {
    index: false,
    follow: false
  }
};

export default function AccountActivityPage(): JSX.Element {
  return <AccountClient snapshot={getAccountSnapshot()} section="activity" />;
}
