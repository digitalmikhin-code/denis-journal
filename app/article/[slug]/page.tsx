import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { ArticleCard } from "@/components/article-card";
import ArticleBackFab from "@/components/article-back-fab";
import { CoursePromoBanner } from "@/components/course-promo-banner";
import { ArticlePracticePrompts } from "@/components/article-practice-prompts";
import { ArticlePremiumMeta } from "@/components/article-premium-meta";
import { ArticleShare } from "@/components/article-share";
import { ArticleShareQuotes } from "@/components/article-share-quotes";
import { ArticleSmartSummary } from "@/components/article-smart-summary";
import { ArticleTableOfContents } from "@/components/article-table-of-contents";
import { ArticleContinuationRoute } from "@/components/article-continuation-route";
import { ArticleSeriesRoute } from "@/components/article-series-route";
import { ArticleReactions } from "@/components/article-reactions";
import { ArticleReactionSummary } from "@/components/article-reaction-summary";
import { AuthorBrandBlock } from "@/components/author-brand-block";
import { MaxChannelBanner } from "@/components/max-channel-banner";
import { AuthorQuote } from "@/components/author-quote";
import { ArticleInPageSearch } from "@/components/article-in-page-search";
import { FocusModeToggle } from "@/components/focus-mode-toggle";
import { ReadingProgress } from "@/components/reading-progress";
import { SaveArticleButton } from "@/components/save-article-button";
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
import { ARTICLE_CATEGORY_COURSE_PROMOS } from "@/lib/course-promos";
import { getAllArticles, getArticleBySlug, getContinuationArticles, getRelatedArticles } from "@/lib/content";
import { getSeriesArticles } from "@/lib/journal-architecture";
import { getShareQuotes } from "@/lib/share-quotes";
import { addTableOfContentsAnchors } from "@/lib/table-of-contents";
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
        className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
      >
        <span aria-hidden="true">←</span>
        <span>Ко всем статьям</span>
      </Link>

      <Link
        href="/"
        className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
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
  const continuation = getContinuationArticles(article.slug, 3);
  const seriesArticles = getSeriesArticles(article, getAllArticles(false), 4);
  const articleUrl = `${SITE_URL}/article/${article.slug}`;
  const category = article.frontmatter.category as Category;
  const theme = CATEGORY_THEME[category];
  const articleCoursePromo = ARTICLE_CATEGORY_COURSE_PROMOS[category];
  const articleBody = addTableOfContentsAnchors(article.content);
  const shareQuotes = getShareQuotes(article.content);
  const savedArticle = {
    slug: article.slug,
    title: article.frontmatter.title,
    excerpt: article.frontmatter.excerpt,
    categoryLabel: CATEGORY_SHORT_LABELS[category],
    href: `/article/${article.slug}`
  };

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
        name: "Главная",
        item: SITE_URL
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Статьи",
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
      <ReadingProgress targetId="article-content" />
      <FocusModeToggle />
      <ArticleBackFab />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="focus-noise">
        <ArticleBackButtons />
      </div>

      <article className="space-y-10">
        <header className="focus-noise relative overflow-hidden rounded-[2.25rem] border border-slate-200/80 bg-white p-6 shadow-[0_28px_60px_rgba(15,23,42,0.08)] dark:border-slate-800 dark:bg-slate-900 dark:shadow-[0_28px_60px_rgba(0,0,0,0.28)] md:p-8">
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
                <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  {formatDate(article.frontmatter.date)} В· {article.frontmatter.readingTime} мин чтения
                </span>
              </div>

              <ArticlePremiumMeta article={article} />

              <h1 className="max-w-[14ch] text-4xl font-black leading-[0.94] tracking-tight text-slate-900 dark:text-slate-50 md:text-6xl">
                {article.frontmatter.title}
              </h1>

              <p className="max-w-[38ch] text-[1.15rem] leading-8 text-slate-600 dark:text-slate-300 md:text-[1.22rem]">
                {article.frontmatter.excerpt}
              </p>

              <ArticleReactionSummary slug={article.slug} />

              <AuthorQuote
                compact
                className="max-w-[44ch] border-[#e8ddff] bg-[#faf7ff] dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                quote="Система начинается там, где решения становятся повторяемыми и понятными команде."
              />

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-[1.5rem] border border-slate-200 bg-[#faf7ff] p-5 dark:border-slate-700 dark:bg-slate-800">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                    Автор
                  </p>
                  <p className="mt-3 text-2xl font-black leading-tight text-slate-900 dark:text-slate-50">
                    Денис Михин
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                    Помогаю руководителям и сильным специалистам принимать решения в сложных системах:
                    видеть связи, находить ограничения и превращать мысль в действие.
                  </p>
                </div>

                <div className="rounded-[1.5rem] border border-slate-200 bg-[#fff8e3] p-5 dark:border-slate-700 dark:bg-slate-800">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                    Что внутри
                  </p>
                  <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-700 dark:text-slate-300">
                    <li>Конкретная позиция, а не нейтральный пересказ</li>
                    <li>Практические выводы для решений, процессов и роста</li>
                    <li>Связка системного мышления, управления и ежедневной практики</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="relative aspect-[16/11] overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-100 dark:border-slate-700 dark:bg-slate-800">
                <Image
                  src={article.frontmatter.cover}
                  alt={article.frontmatter.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="rounded-[1.5rem] border border-slate-200 bg-slate-900 p-5 text-white">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/55">
                  Редакционная пометка
                </p>
                <p className="mt-3 text-lg font-semibold leading-8">
                  Этот текст стоит читать как рабочую рамку: что заметить в системе, где искать
                  ограничение и какой следующий шаг может усилить решение.
                </p>
              </div>
            </div>
          </div>
        </header>

        <div className="article-reading-layout grid gap-8 xl:grid-cols-[minmax(0,1fr)_300px]">
          <div
            id="article-content"
            className="focus-article-card rounded-[2rem] border border-slate-200/80 bg-white px-6 py-8 shadow-[0_22px_48px_rgba(15,23,42,0.06)] dark:border-slate-800 dark:bg-slate-900 dark:shadow-[0_22px_48px_rgba(0,0,0,0.28)] md:px-10"
          >
            <div className="focus-noise">
              <ArticleSmartSummary
                title={article.frontmatter.title}
                excerpt={article.frontmatter.excerpt}
                category={category}
                readingTime={article.frontmatter.readingTime}
              />
            </div>

            <div className="focus-noise mb-8 xl:hidden">
              <ArticleInPageSearch targetId="article-content" />
            </div>

            <div className="mb-8 xl:hidden">
              <ArticleTableOfContents items={articleBody.items} />
            </div>

            <div className="prose-journal">
              <MDXRemote
                source={articleBody.content}
                components={mdxComponents}
                options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
              />
            </div>
          </div>

          <aside className="space-y-4 xl:sticky xl:top-24 xl:self-start">
            <div className="focus-noise">
              <ArticleShare
                compact
                title={article.frontmatter.title}
                excerpt={article.frontmatter.excerpt}
                url={articleUrl}
              />
            </div>

            <div className="focus-noise">
              <SaveArticleButton compact article={savedArticle} />
            </div>

            <div className="focus-noise hidden xl:block">
              <ArticleInPageSearch targetId="article-content" />
            </div>

            <div className="hidden xl:block">
              <ArticleTableOfContents items={articleBody.items} />
            </div>

            <div className="focus-noise rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-[0_16px_36px_rgba(15,23,42,0.06)] dark:border-slate-800 dark:bg-slate-900 dark:shadow-[0_16px_36px_rgba(0,0,0,0.22)]">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                Навигация
              </p>
              <div className="mt-4 space-y-3 text-sm font-semibold text-slate-700 dark:text-slate-200">
                <Link href="/articles" className="block rounded-xl bg-slate-50 px-4 py-3 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700">
                  Все статьи
                </Link>
                <Link
                  href={`/category/${category}`}
                  className={`block rounded-xl px-4 py-3 ${theme.chipSoft}`}
                >
                  Еще по теме: {CATEGORY_LABELS[category]}
                </Link>
                <Link
                  href="/about"
                  className="block rounded-xl bg-slate-50 px-4 py-3 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700"
                >
                  Об авторе
                </Link>
              </div>
            </div>

            <div className="focus-noise rounded-[1.75rem] border border-slate-200 bg-[linear-gradient(135deg,#fff0f7_0%,#eef9ff_100%)] p-5 shadow-[0_16px_36px_rgba(15,23,42,0.06)] dark:border-slate-800 dark:bg-slate-900 dark:bg-none dark:shadow-[0_16px_36px_rgba(0,0,0,0.22)]">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                Если откликнулось
              </p>
              <p className="mt-3 text-base leading-7 text-slate-700 dark:text-slate-300">
                Подпишитесь на Telegram, чтобы не терять новые разборы, или напишите мне, если
                нужен взгляд на вашу ситуацию в управлении, росте или системе работы команды.
              </p>
              <div className="mt-4 flex flex-col gap-3">
                <Link
                  href={TELEGRAM_CONSULT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border border-slate-900/12 bg-white px-4 py-3 text-center text-sm font-semibold text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                >
                  Написать Денису
                </Link>
              </div>
            </div>
          </aside>
        </div>

        <div className="focus-noise">
          <ArticleShareQuotes
            articleTitle={article.frontmatter.title}
            author={article.frontmatter.author || "Денис Михин"}
            quotes={shareQuotes}
            url={articleUrl}
          />
        </div>

        <div className="focus-noise mx-auto w-full max-w-[420px] xl:hidden">
          <SaveArticleButton article={savedArticle} />
        </div>

        <section className="focus-noise overflow-hidden rounded-[2.25rem] border border-slate-200 bg-white p-5 shadow-[0_28px_70px_rgba(15,23,42,0.08)] dark:border-slate-800 dark:bg-slate-900 dark:shadow-[0_28px_70px_rgba(0,0,0,0.3)] md:p-7">
          <div className="rounded-[1.75rem] bg-[linear-gradient(135deg,#fff8e5_0%,#eef9ff_48%,#fff1f7_100%)] p-5 dark:bg-slate-800 dark:bg-none md:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
              После статьи
            </p>
            <div className="mt-3 grid gap-4 lg:grid-cols-[1fr_0.85fr] lg:items-end">
              <div>
                <h2 className="max-w-[18ch] text-3xl font-black leading-tight tracking-tight text-slate-900 dark:text-slate-50 md:text-5xl">
                  Если материал оказался полезным
                </h2>
                <p className="mt-4 max-w-[58ch] text-base leading-8 text-slate-700 dark:text-slate-300">
                  Оставьте отклик, перешлите статью тому, кому она пригодится, и подпишитесь на новые
                  разборы. Так чтение превращается не в закрытую вкладку, а в следующий полезный шаг.
                </p>
              </div>

              <div className="grid gap-2 sm:grid-cols-2">
                {["Отклик", "Пересылка", "Подписка", "Продолжение"].map((step, index) => (
                  <div
                    key={step}
                    className="rounded-2xl border border-white/70 bg-white/75 p-3 shadow-sm dark:border-slate-700 dark:bg-slate-900/70"
                  >
                    <span className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">
                      0{index + 1}
                    </span>
                    <p className="mt-1 text-sm font-bold text-slate-800 dark:text-slate-100">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            <ArticleReactions slug={article.slug} hasRelatedArticles={continuation.length > 0 || related.length > 0} />

            <ArticleContinuationRoute
              articles={continuation.length > 0 ? continuation : related}
              category={category}
              categoryLabel={CATEGORY_LABELS[category]}
              coursePromo={articleCoursePromo}
            />

            <ArticleSeriesRoute current={article} articles={seriesArticles} />

            <ArticlePracticePrompts category={category} />

            <AuthorBrandBlock variant="short" />

            <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
              <div id="article-share" className="scroll-mt-28">
                <ArticleShare
                  title={article.frontmatter.title}
                  excerpt={article.frontmatter.excerpt}
                  url={articleUrl}
                />
              </div>

              <MaxChannelBanner
                title="Подпишитесь, если хотите читать дальше"
                subtitle="В Max выходят новые материалы, короткие наблюдения и практические разборы по управлению, карьере, системному мышлению и ИИ."
                className="relative h-full overflow-hidden rounded-[1.75rem] border border-[#8fd3fb] bg-[radial-gradient(circle_at_10%_18%,rgba(255,255,255,0.78)_0%,rgba(255,255,255,0)_34%),linear-gradient(135deg,#eaf8ff_0%,#f4f0ff_56%,#fff7df_100%)] p-5 shadow-[0_16px_36px_rgba(15,23,42,0.06)] md:p-6"
              />
            </div>

            <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
              <CoursePromoBanner
                {...articleCoursePromo}
                label={`Продолжение по теме: ${CATEGORY_LABELS[category]}`}
                ctaLabel="Пройти курс"
                className="rounded-[1.75rem] border border-[#c8d8ef] bg-[linear-gradient(135deg,#f4f9ff_0%,#f8f4ff_52%,#fff8ef_100%)] p-5 shadow-[0_16px_36px_rgba(15,23,42,0.06)] md:p-6"
              />

              <section className="rounded-[1.75rem] border border-slate-200 bg-[linear-gradient(135deg,#fff8e5_0%,#fff1f7_100%)] p-5 shadow-[0_16px_36px_rgba(15,23,42,0.06)] dark:border-slate-800 dark:bg-slate-900 dark:bg-none md:p-6">
                <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-end">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                      Авторская ремарка
                    </p>
                    <h2 className="mt-3 text-2xl font-black tracking-tight text-slate-900 dark:text-slate-50">
                      Нужна точка опоры для решения?
                    </h2>
                    <p className="mt-3 max-w-[54ch] text-sm leading-7 text-slate-700 dark:text-slate-300">
                      Если нужен более глубокий разбор вашей задачи, команды или управленческой ситуации,
                      это можно обсудить отдельно.
                    </p>
                  </div>
                  <Link
                    href={TELEGRAM_CONSULT_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex justify-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
                  >
                    Обсудить задачу
                  </Link>
                </div>
              </section>
            </div>
          </div>
        </section>

        <div className="focus-noise">
          <ArticleBackButtons centered />
        </div>
      </article>

      {related.length > 0 && (
        <section id="related-articles" className="focus-noise scroll-mt-28 space-y-5 border-t border-slate-200 pt-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Дальше по теме</p>
            <h2 className="serif-display text-4xl font-semibold tracking-tight text-slate-900">
              Похожие материалы
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
