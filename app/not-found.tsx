import Link from "next/link";

export default function NotFoundPage(): JSX.Element {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-soft dark:border-slate-800 dark:bg-slate-900">
      <h1 className="text-3xl font-extrabold tracking-tight">Страница не найдена</h1>
      <p className="mt-3 text-slate-600 dark:text-slate-300">
        Проверьте ссылку или вернитесь на главную.
      </p>
      <Link
        href="/"
        className="mt-5 inline-flex rounded-xl bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-dark"
      >
        На главную
      </Link>
    </div>
  );
}

