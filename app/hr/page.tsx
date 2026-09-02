import type { Metadata } from "next";
import { HrSubscriptionClient } from "@/components/hr-subscription-client";
import { SITE_URL } from "@/lib/constants";
import { HR_SOLUTIONS } from "@/lib/hr-subscription-data";

const title = "HR по подписке — HR для бизнеса без расширения штата | Денис Михин";
const description = "Внешний HR для бизнеса: подбор, адаптация, HR-аудит, аналитика, организационное развитие, HRBP и HRD без найма в штат. Готовые решения с открытой стоимостью.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  keywords: ["HR по подписке", "HR-консалтинг", "внешний HR", "HR-аутсорсинг", "HR-сопровождение", "HR услуги для бизнеса", "HRBP по подписке", "HRD по подписке", "HR аудит", "HR-система", "организационное развитие", "подбор персонала"],
  alternates: { canonical: "/hr" },
  openGraph: {
    type: "website",
    title,
    description,
    url: `${SITE_URL}/hr`,
    siteName: "Денис Михин",
    locale: "ru_RU"
  },
  twitter: { card: "summary", title, description }
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "HR по подписке",
  description,
  url: `${SITE_URL}/hr`,
  provider: {
    "@type": "Person",
    name: "Денис Михин",
    url: `${SITE_URL}/about`
  },
  areaServed: "RU",
  serviceType: "HR по подписке и HR-консалтинг для бизнеса",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "HR-решения",
    itemListElement: HR_SOLUTIONS.map((solution) => ({
      "@type": "OfferCatalog",
      name: solution.title,
      description: solution.description,
      itemListElement: solution.packages.map((item) => ({
        "@type": "Offer",
        name: `${solution.title} — ${item.name}`,
        priceCurrency: "RUB",
        description: item.lead
      }))
    }))
  }
};

export default function HrSubscriptionPage(): JSX.Element {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <HrSubscriptionClient />
    </>
  );
}
