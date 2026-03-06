import type { Metadata } from "next";
import { LocalAdmin } from "@/components/local-admin";

export const metadata: Metadata = {
  title: "Studio",
  description: "Local test admin panel",
  alternates: {
    canonical: "/studio"
  }
};

export default function StudioPage(): JSX.Element {
  return <LocalAdmin />;
}
