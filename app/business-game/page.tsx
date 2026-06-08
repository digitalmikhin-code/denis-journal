import type { Metadata } from "next";
import { BusinessRescueGame } from "@/components/business-rescue-game";

export const metadata: Metadata = {
  title: "CEO Dashboard: бизнес-симуляция на 90 дней",
  description:
    "Премиальная браузерная бизнес-симуляция: управляйте портфелем решений, делегированием, системными рисками и получите персональный управленческий профиль.",
  alternates: {
    canonical: "/business-game"
  },
  openGraph: {
    title: "CEO Dashboard: бизнес-симуляция на 90 дней",
    description:
      "Интерактивный CEO Dashboard, где собственник принимает управленческие решения и видит последствия для бизнеса.",
    url: "/business-game"
  }
};

export default function BusinessGamePage(): JSX.Element {
  return <BusinessRescueGame />;
}
