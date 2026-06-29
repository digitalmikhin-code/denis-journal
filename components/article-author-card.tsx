import Image from "next/image";
import Link from "next/link";
import { TELEGRAM_CHANNEL_URL } from "@/lib/constants";

type ArticleAuthorCardProps = {
  author: string;
};

export function ArticleAuthorCard({ author }: ArticleAuthorCardProps): JSX.Element {
  return (
    <section className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-[0_16px_36px_rgba(15,23,42,0.06)] dark:border-slate-800 dark:bg-slate-900 md:p-6">
      <div className="grid gap-5 sm:grid-cols-[88px_1fr] sm:items-center">
        <div className="relative h-[88px] w-[88px] overflow-hidden rounded-[1.5rem] border border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800">
          <Image src="/images/logo.svg" alt={author} fill sizes="88px" className="object-contain p-4" />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
            Автор статьи
          </p>
          <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 dark:text-slate-50">{author}</h2>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300">
            Практик трансформаций и Head of HR PMO. Пишу о системном мышлении,
            управлении, проектах, карьере и применении ИИ в работе руководителя.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href={TELEGRAM_CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-950"
            >
              Telegram
            </Link>
            <Link
              href="/articles"
              className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-bold text-slate-900 transition hover:border-slate-600 dark:border-slate-700 dark:text-slate-100"
            >
              Все статьи автора
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
