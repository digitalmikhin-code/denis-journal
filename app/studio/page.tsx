import Link from "next/link";
import type { Metadata } from "next";
import { LocalAdmin } from "@/components/local-admin";

export const metadata: Metadata = {
  title: "Studio",
  description: "Служебная панель проекта",
  alternates: {
    canonical: "/studio"
  },
  robots: {
    index: false,
    follow: false
  }
};

export default function StudioPage(): JSX.Element {
  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-white/85 p-5 shadow-soft backdrop-blur dark:border-slate-800 dark:bg-slate-900/85">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
              Служебный раздел
            </p>
            <h1 className="mt-2 serif-display text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">
              Studio
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-300">
              Здесь собраны внутренние инструменты проекта. Сводка реакций открывается по
              отдельной служебной ссылке и больше не доступна публично.
            </p>
          </div>
          <Link
            href="/studio/reactions"
            className="inline-flex items-center justify-center rounded-2xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-brand hover:text-brand dark:border-slate-700 dark:text-white"
          >
            Открыть сводку реакций
          </Link>
        </div>
      </section>

      <LocalAdmin />
    </div>
  );
}
