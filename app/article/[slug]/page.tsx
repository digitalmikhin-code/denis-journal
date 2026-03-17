import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { ArticleCard } from "@/components/article-card";
import ArticleBackFab from "@/components/article-back-fab";
import { ArticleReactions } from "@/components/article-reactions";
import { ArticleReactionSummary } from "@/components/article-reaction-summary";
import { mdxComponents } from "@/components/mdx-components";
import {
  CATEGORY_LABELS,
  CATEGORY_SHORT_LABELS,
  CATEGORY_THEME,
  SITE_NAME,
  SITE_URL,
  TELEGRAM_CHANNEL_URL,
  TELEGRAM_CONSULT_URL,
  type Category
} from "@/lib/constants";
import { getAllArticles, getArticleBySlug, getRelatedArticles } from "@/lib/content";
import { formatDate } from "@/lib/utils";

type Props = {
  params: { slug: string };
};

export function generateStaticParams(): Array<{ slug: string }> {
  return getAllArticles(false).map((article) => ({ slug: article.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const article = getArticleBySlug(params.slug);
  if (!article || article.frontmatter.draft) {
    return {};
  }

  return {
    title: article.frontmatter.title,
    description: article.frontmatter.excerpt,
    robots: {
      index: true,
      follow: true
    },
    alternates: {
      canonical: `/article/${article.slug}`
    },
    openGraph: {
      title: article.frontmatter.title,
      description: article.frontmatter.excerpt,
      url: `${SITE_URL}/article/${article.slug}`,
      siteName: SITE_NAME,
      type: "article",
      images: [{ url: `${SITE_URL}${article.frontmatter.cover}` }]
    }
  };
}
function ArticleBackButtons({ centered = false }: { centered?: boolean }): JSX.Element {
  return (
    <div className={`flex flex-wrap items-center gap-3 ${centered ? "justify-center" : ""}`}>
      <Link
        href="/articles"
        className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-50"
      >
        <span aria-hidden="true">←</span>
        <span>Ко всем статьям</span>
      </Link>

      <Link
        href="/"
        className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-50"
      >
        <span aria-hidden="true">⌂</span>
        <span>На главную</span>
      </Link>
    </div>
  );
}


export default function ArticlePage({ params }: Props): JSX.Element {
  const article = getArticleBySlug(params.slug);
  if (!article || article.frontmatter.draft) {
    notFound();
  }

  const related = getRelatedArticles(article.slug, 3);
  const articleUrl = `${SITE_URL}/article/${article.slug}`;
  const category = article.frontmatter.category as Category;
  const theme = CATEGORY_THEME[category];

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.frontmatter.title,
    description: article.frontmatter.excerpt,
    datePublished: article.frontmatter.date,
    dateModified: article.frontmatter.date,
    inLanguage: "ru-RU",
    mainEntityOfPage: articleUrl,
    image: [`${SITE_URL}${article.frontmatter.cover}`],
    author: {
      "@type": "Person",
      name: article.frontmatter.author
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Р“Р»Р°РІРЅР°СЏ",
        item: SITE_URL
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "РЎС‚Р°С‚СЊРё",
        item: `${SITE_URL}/articles`
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.frontmatter.title,
        item: articleUrl
      }
    ]
  };

  return (
    <div className="space-y-12">
      <ArticleBackFab />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <ArticleBackButtons />

      <article className="space-y-10">
        <header className="relative overflow-hidden rounded-[2.25rem] border border-slate-200/80 bg-white p-6 shadow-[0_28px_60px_rgba(15,23,42,0.08)] md:p-8">
          <div
            className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full opacity-80"
            style={{ backgroundColor: theme.glow }}
          />
          <div className="relative grid gap-8 xl:grid-cols-[0.95fr_1.05fr] xl:items-start">
            <div className="space-y-5">
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className={`inline-flex rounded-full border px-4 py-1.5 text-xs font-bold uppercase tracking-[0.16em] ${theme.chip}`}
                >
                  {CATEGORY_SHORT_LABELS[category]}
                </span>
                <span className="text-sm font-medium text-slate-500">
                  {formatDate(article.frontmatter.date)} В· {article.frontmatter.readingTime} РјРёРЅ С‡С‚РµРЅРёСЏ
                </span>
              </div>

              <h1 className="max-w-[14ch] text-4xl font-black leading-[0.94] tracking-tight text-slate-900 md:text-6xl">
                {article.frontmatter.title}
              </h1>

              <p className="max-w-[38ch] text-[1.15rem] leading-8 text-slate-600 md:text-[1.22rem]">
                {article.frontmatter.excerpt}
              </p>

              <ArticleReactionSummary slug={article.slug} />

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-[1.5rem] border border-slate-200 bg-[#faf7ff] p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                    РђРІС‚РѕСЂ
                  </p>
                  <p className="mt-3 text-2xl font-black leading-tight text-slate-900">
                    Р”РµРЅРёСЃ РњРёС…РёРЅ
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    РџРёС€Сѓ Рѕ РєР°СЂСЊРµСЂРµ, СѓРїСЂР°РІР»РµРЅРёРё, СЃРёСЃС‚РµРјРЅРѕРј РјС‹С€Р»РµРЅРёРё Рё РР С‚Р°Рє, С‡С‚РѕР±С‹ СЌС‚Рѕ РјРѕР¶РЅРѕ Р±С‹Р»Рѕ
                    РїСЂРёРјРµРЅРёС‚СЊ РІ СЂРµР°Р»СЊРЅРѕР№ СЂР°Р±РѕС‚Рµ, Р° РЅРµ РїСЂРѕСЃС‚Рѕ РїСЂРѕС‡РёС‚Р°С‚СЊ.
                  </p>
                </div>

                <div className="rounded-[1.5rem] border border-slate-200 bg-[#fff8e3] p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                    Р§С‚Рѕ РІРЅСѓС‚СЂРё
                  </p>
                  <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-700">
                    <li>РљРѕРЅРєСЂРµС‚РЅР°СЏ РїРѕР·РёС†РёСЏ, Р° РЅРµ РЅРµР№С‚СЂР°Р»СЊРЅС‹Р№ РїРµСЂРµСЃРєР°Р·</li>
                    <li>РџСЂР°РєС‚РёС‡РµСЃРєРёРµ РІС‹РІРѕРґС‹ Рё СЂР°Р±РѕС‡РёРµ РѕСЂРёРµРЅС‚РёСЂС‹</li>
                    <li>РЎРІСЏР·РєР° СЃС‚СЂР°С‚РµРіРёРё, СѓРїСЂР°РІР»РµРЅРёСЏ Рё РµР¶РµРґРЅРµРІРЅРѕР№ РїСЂР°РєС‚РёРєРё</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="relative aspect-[16/11] overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-100">
                <Image
                  src={article.frontmatter.cover}
                  alt={article.frontmatter.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="rounded-[1.5rem] border border-slate-200 bg-slate-900 p-5 text-white">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/55">
                  Р РµРґР°РєС†РёРѕРЅРЅР°СЏ РїРѕРјРµС‚РєР°
                </p>
                <p className="mt-3 text-lg font-semibold leading-8">
                  Р­С‚РѕС‚ С‚РµРєСЃС‚ СЃС‚РѕРёС‚ С‡РёС‚Р°С‚СЊ РЅРµ РєР°Рє В«РјРЅРµРЅРёРµ СЂР°РґРё РјРЅРµРЅРёСЏВ», Р° РєР°Рє СЂР°Р±РѕС‡СѓСЋ СЂР°РјРєСѓ РґР»СЏ
                  СЂРµС€РµРЅРёР№, РєРѕС‚РѕСЂС‹Рµ РІР»РёСЏСЋС‚ РЅР° СЂРѕСЃС‚, СѓРїСЂР°РІР»РµРЅРёРµ Рё РєР°С‡РµСЃС‚РІРѕ РІР°С€РёС… РґРµР№СЃС‚РІРёР№.
                </p>
              </div>
            </div>
          </div>
        </header>

        <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_300px]">
          <div className="rounded-[2rem] border border-slate-200/80 bg-white px-6 py-8 shadow-[0_22px_48px_rgba(15,23,42,0.06)] md:px-10">
            <div className="prose-journal">
              <MDXRemote
                source={article.content}
                components={mdxComponents}
                options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
              />
            </div>
          </div>

          <aside className="space-y-4 xl:sticky xl:top-24 xl:self-start">
            <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-[0_16px_36px_rgba(15,23,42,0.06)]">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                РќР°РІРёРіР°С†РёСЏ
              </p>
              <div className="mt-4 space-y-3 text-sm font-semibold text-slate-700">
                <Link href="/articles" className="block rounded-xl bg-slate-50 px-4 py-3 hover:bg-slate-100">
                  Р’СЃРµ СЃС‚Р°С‚СЊРё
                </Link>
                <Link
                  href={`/category/${category}`}
                  className={`block rounded-xl px-4 py-3 ${theme.chipSoft}`}
                >
                  Р•С‰Рµ РїРѕ С‚РµРјРµ: {CATEGORY_LABELS[category]}
                </Link>
                <Link
                  href="/about"
                  className="block rounded-xl bg-slate-50 px-4 py-3 hover:bg-slate-100"
                >
                  РћР± Р°РІС‚РѕСЂРµ
                </Link>
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-slate-200 bg-[linear-gradient(135deg,#fff0f7_0%,#eef9ff_100%)] p-5 shadow-[0_16px_36px_rgba(15,23,42,0.06)]">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                Р•СЃР»Рё РѕС‚РєР»РёРєРЅСѓР»РѕСЃСЊ
              </p>
              <p className="mt-3 text-base leading-7 text-slate-700">
                РџРѕРґРїРёС€РёС‚РµСЃСЊ РЅР° Telegram, С‡С‚РѕР±С‹ РЅРµ С‚РµСЂСЏС‚СЊ РЅРѕРІС‹Рµ СЂР°Р·Р±РѕСЂС‹, РёР»Рё РЅР°РїРёС€РёС‚Рµ РјРЅРµ, РµСЃР»Рё
                РЅСѓР¶РµРЅ РІР·РіР»СЏРґ РЅР° РІР°С€Сѓ СЃРёС‚СѓР°С†РёСЋ РІ СѓРїСЂР°РІР»РµРЅРёРё, СЂРѕСЃС‚Рµ РёР»Рё СЃРёСЃС‚РµРјРµ СЂР°Р±РѕС‚С‹ РєРѕРјР°РЅРґС‹.
              </p>
              <div className="mt-4 flex flex-col gap-3">
                <Link
                  href={TELEGRAM_CHANNEL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border border-slate-900/12 bg-white px-4 py-3 text-center text-sm font-semibold text-slate-800"
                >
                  РќР°РїРёСЃР°С‚СЊ Р”РµРЅРёСЃСѓ
                </Link>
              </div>
            </div>
          </aside>
        </div>

        <ArticleReactions slug={article.slug} />

        <ArticleBackButtons centered />

        <section className="rounded-[2rem] border border-slate-200 bg-[linear-gradient(135deg,#fff8e5_0%,#fff1f7_100%)] p-6 md:p-8">
          <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                РђРІС‚РѕСЂСЃРєР°СЏ СЂРµРјР°СЂРєР°
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900">
                Р•СЃР»Рё РІР°Рј РЅСѓР¶РµРЅ РЅРµ РїСЂРѕСЃС‚Рѕ РєРѕРЅС‚РµРЅС‚, Р° С‚РѕС‡РєР° РѕРїРѕСЂС‹ РґР»СЏ СЂРµС€РµРЅРёР№
              </h2>
              <p className="mt-3 max-w-[54ch] text-base leading-8 text-slate-700">
                Р’ Р¶СѓСЂРЅР°Р»Рµ СЏ РїСѓР±Р»РёРєСѓСЋ РјР°С‚РµСЂРёР°Р»С‹ РІ РѕС‚РєСЂС‹С‚РѕРј С„РѕСЂРјР°С‚Рµ. Р•СЃР»Рё РЅСѓР¶РµРЅ Р±РѕР»РµРµ РіР»СѓР±РѕРєРёР№ СЂР°Р·Р±РѕСЂ
                РІР°С€РµР№ Р·Р°РґР°С‡Рё, РєРѕРјР°РЅРґС‹ РёР»Рё СѓРїСЂР°РІР»РµРЅС‡РµСЃРєРѕР№ СЃРёС‚СѓР°С†РёРё, СЌС‚Рѕ РјРѕР¶РЅРѕ РѕР±СЃСѓРґРёС‚СЊ РѕС‚РґРµР»СЊРЅРѕ.
              </p>
            </div>
            <Link
              href={TELEGRAM_CONSULT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-2xl bg-slate-900 px-6 py-3 text-base font-bold text-white transition hover:bg-slate-800"
            >
              РћР±СЃСѓРґРёС‚СЊ Р·Р°РґР°С‡Сѓ
            </Link>
          </div>
        </section>
      </article>

      {related.length > 0 && (
        <section className="space-y-5 border-t border-slate-200 pt-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Р”Р°Р»СЊС€Рµ РїРѕ С‚РµРјРµ</p>
            <h2 className="serif-display text-4xl font-semibold tracking-tight text-slate-900">
              РџРѕС…РѕР¶РёРµ РјР°С‚РµСЂРёР°Р»С‹
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {related.map((item) => (
              <ArticleCard key={item.slug} article={item} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
