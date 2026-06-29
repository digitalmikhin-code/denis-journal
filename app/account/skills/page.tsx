import type { Metadata } from "next";
import { AccountClient } from "@/components/account-client";
import { getAccountSnapshot } from "@/lib/account-api";

export const metadata: Metadata = {
  title: "Мои навыки",
  robots: {
    index: false,
    follow: false
  }
};

export default function AccountSkillsPage(): JSX.Element {
  return <AccountClient snapshot={getAccountSnapshot()} section="skills" />;
}
