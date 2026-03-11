import type { Metadata } from "next";
import { ReactionsDashboard } from "@/components/reactions-dashboard";
import { getAllArticles } from "@/lib/content";

export const metadata: Metadata = {
  title: "Сводка реакций",
  description: "Служебная страница со сводкой реакций по статьям.",
  robots: {
    index: false,
    follow: false
  }
};

export default function ReactionsPage(): JSX.Element {
  const articles = getAllArticles(false).map((article) => ({
    slug: article.slug,
    title: article.frontmatter.title,
    date: article.frontmatter.date,
    category: article.frontmatter.category
  }));

  return <ReactionsDashboard articles={articles} />;
}
