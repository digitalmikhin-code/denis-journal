import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { mdxComponents } from "@/components/mdx-components";
import { getPageContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Обо мне",
  alternates: {
    canonical: "/about"
  }
};

export default function AboutPage(): JSX.Element {
  const page = getPageContent("about");

  return (
    <article className="space-y-6">
      <h1 className="text-4xl font-extrabold tracking-tight">{page.title}</h1>
      <div className="prose-journal">
        <MDXRemote
          source={page.content}
          components={mdxComponents}
          options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
        />
      </div>
    </article>
  );
}

