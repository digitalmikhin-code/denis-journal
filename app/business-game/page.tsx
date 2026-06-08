import type { Metadata } from "next";
import { BusinessRescueGame } from "@/components/business-rescue-game";

export const metadata: Metadata = {
  title: "Спасти бизнес за 90 дней",
  description:
    "Интерактивная браузерная бизнес-игра Дениса Михина: управленческие решения, последствия, финальный отчет и персональные рекомендации.",
  alternates: {
    canonical: "/business-game"
  },
  openGraph: {
    title: "Спасти бизнес за 90 дней",
    description:
      "Бизнес-симуляция, в которой вы становитесь генеральным директором и проверяете управленческие решения на последствиях.",
    url: "/business-game"
  }
};

export default function BusinessGamePage(): JSX.Element {
  return <BusinessRescueGame />;
}
