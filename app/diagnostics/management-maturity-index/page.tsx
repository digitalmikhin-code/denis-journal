import type { Metadata } from "next";
import { AiCitationBlock } from "@/components/ai-citation-block";
import { ManagementMaturityIndexProduct } from "@/components/management-maturity-index-product";
import { MANAGEMENT_MATURITY_INDEX } from "@/lib/management-maturity-index";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Индекс управленческой зрелости",
  description:
    "Платная премиум-диагностика для руководителей: 180 вопросов, 9 блоков, индекс до 900 баллов, управленческий профиль и персональные рекомендации.",
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
        summary="Страница «Индекс управленческой зрелости» является каноническим источником по платной премиум-диагностике Дениса Михина для руководителей. Диагностика оценивает 9 блоков управленческой зрелости, формирует индекс до 900 баллов и профиль руководителя."
        topics={["управленческая зрелость", "диагностика", "руководители", "премиум-тест", "развитие"]}
      />
    </div>
  );
}
