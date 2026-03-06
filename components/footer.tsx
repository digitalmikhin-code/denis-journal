import Link from "next/link";

export function SiteFooter(): JSX.Element {
  return (
    <footer className="border-t border-slate-200 py-10 dark:border-slate-800">
      <div className="container-shell flex flex-wrap items-center justify-between gap-4 text-sm text-slate-500">
        <p>© {new Date().getFullYear()} Журнал Дениса Михина</p>
        <div className="flex items-center gap-4">
          <Link href="/about" className="hover:text-brand">
            Обо мне
          </Link>
          <Link href="/training" className="hover:text-brand">
            Обучение
          </Link>
          <a href="/feed.xml" className="hover:text-brand">
            RSS
          </a>
        </div>
      </div>
    </footer>
  );
}

