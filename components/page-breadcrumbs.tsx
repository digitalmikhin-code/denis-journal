import Link from "next/link";
import { SITE_URL } from "@/lib/constants";

type BreadcrumbItem = { name: string; href: string };

export function PageBreadcrumbs({ items }: { items: BreadcrumbItem[] }): JSX.Element {
  const trail = [{ name: "Главная", href: "/" }, ...items];
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.href}`
    }))
  };

  return (
    <nav aria-label="Хлебные крошки" className="mb-6 text-sm font-bold text-slate-500 dark:text-slate-400">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
      />
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {trail.map((item, index) => (
          <li key={item.href} className="flex min-w-0 max-w-full items-baseline gap-2">
            {index > 0 && <span aria-hidden="true">/</span>}
            {index === trail.length - 1 ? (
              <span aria-current="page" className="min-w-0 break-words text-slate-800 dark:text-slate-200">{item.name}</span>
            ) : (
              <Link href={item.href} className="hover:text-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand">{item.name}</Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
