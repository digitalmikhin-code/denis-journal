import type { Metadata } from "next";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { mdxComponents } from "@/components/mdx-components";
import { TELEGRAM_CHANNEL_URL } from "@/lib/constants";
import { getPageContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Обучение",
  alternates: {
    canonical: "/training"
  }
};

export default function TrainingPage(): JSX.Element {
  const page = getPageContent("training");

  return (
    <div className="space-y-8">
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
      <section className="rounded-2xl border border-brand/20 bg-brand-soft p-6">
        <h2 className="text-2xl font-bold tracking-tight">Хочешь программу под команду?</h2>
        <p className="mt-2 text-slate-700">
          Напиши в Telegram, разберем вашу задачу и подберем формат обучения.
        </p>
        <Link
          href={TELEGRAM_CHANNEL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-white hover:bg-brand-dark"
        >
          Написать в Telegram-канал ScrumBaza
        </Link>
      </section>
    </div>
  );
}
