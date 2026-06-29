import type { Metadata } from "next";
import { AccountClient } from "@/components/account-client";
import { getAccountSnapshot } from "@/lib/account-api";

export const metadata: Metadata = {
  title: "Мои статьи",
  robots: {
    index: false,
    follow: false
  }
};

export default function AccountArticlesPage(): JSX.Element {
  return <AccountClient snapshot={getAccountSnapshot()} section="articles" />;
}
