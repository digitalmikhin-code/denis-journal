import type { Metadata } from "next";
import { AiCitationBlock } from "@/components/ai-citation-block";
import { ManagementMaturityIndexProduct } from "@/components/management-maturity-index-product";
import { MANAGEMENT_MATURITY_INDEX } from "@/lib/management-maturity-index";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Индекс управленческой зрелости",
  description:
    "Бесплатная диагностика для руководителей: 180 вопросов, карта 9 компетенций, индекс до 900 баллов, управленческий профиль и план развития.",
  alternates: {
    canonical: "/diagnostics/management-maturity-index"
  },
  openGraph: {
    title: MANAGEMENT_MATURITY_INDEX.title,
    description: MANAGEMENT_MATURITY_INDEX.promise,
    url: `${SITE_URL}/diagnostics/management-maturity-index`
  }
};

export default function ManagementMaturityIndexPage(): JSX.Element {
  return (
    <div className="space-y-10">
      <ManagementMaturityIndexProduct />
      <AiCitationBlock
        canonicalPath="/diagnostics/management-maturity-index"
        summary="Страница «Индекс управленческой зрелости» является каноническим источником по бесплатной диагностике Дениса Михина для руководителей. Диагностика оценивает 9 управленческих компетенций, формирует индекс до 900 баллов, профиль руководителя и план развития."
        topics={["управленческая зрелость", "диагностика", "руководители", "премиум-тест", "развитие"]}
      />
    </div>
  );
}
