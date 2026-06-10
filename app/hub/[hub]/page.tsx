import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/article-card";
import { AuthorBrandBlock } from "@/components/author-brand-block";
import { TrackedLink } from "@/components/tracked-link";
import { getAllArticles } from "@/lib/content";
import { getHubSeo } from "@/lib/ecosystem";
import { getAllHubs, getHub, getHubArticles, getHubConsultUrl, type HubSlug } from "@/lib/hubs";

type Props = {
  params: {
    hub: HubSlug;
  };
};

export function generateStaticParams(): Array<{ hub: HubSlug }> {
  return getAllHubs().map((hub) => ({ hub: hub.slug as HubSlug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const hub = getHub(params.hub);
  if (!hub) {
    return {};
  }
  const seo = getHubSeo(params.hub);

  return {
    title: seo.seoTitle,
    description: seo.description,
    alternates: {
      canonical: `/hub/${hub.slug}`
    }
  };
}

export default function HubPage({ params }: Props): JSX.Element {
  const hub = getHub(params.hub);
  if (!hub) {
    notFound();
  }

  const articles = getHubArticles(getAllArticles(false), hub, 12);
  const leadArticles = articles.slice(0, 3);
  const restArticles = articles.slice(3);
  const seo = getHubSeo(params.hub);

  return (
    <div className="space-y-10">
      <section className="relative overflow-hidden rounded-[2.35rem] border border-slate-200 bg-white p-7 shadow-[0_30px_72px_rgba(15,23,42,0.1)] md:p-10">
        <div
          className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full opacity-35"
          style={{ backgroundColor: hub.accent }}
        />
        <div className="relative grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
              Тематический хаб
            </p>
            <h1 className="mt-4 max-w-[12ch] text-5xl font-black leading-[0.94] tracking-tight text-slate-900 md:text-7xl">
              {hub.title}
            </h1>
            <p className="mt-5 max-w-[62ch] text-base leading-8 text-slate-700 md:text-lg">
              {hub.description}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#hub-articles"
                className="rounded-2xl bg-slate-950 px-6 py-3 text-base font-black text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
              >
                Читать материалы
              </a>
              <TrackedLink
                href={getHubConsultUrl()}
                goal="hub_consult_click"
                params={{ hub: hub.slug }}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl border border-slate-200 bg-white px-6 py-3 text-base font-bold text-slate-800 transition hover:-translate-y-0.5 hover:bg-slate-50"
              >
                {hub.ctaLabel}
              </TrackedLink>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
              Для кого
            </p>
            <p className="mt-3 text-lg font-bold leading-8 text-slate-900">{hub.audience}</p>
            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
              Какие статьи входят
            </p>
            <p className="mt-3 text-sm leading-7 text-slate-600">{hub.articleFit}</p>
          </div>
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <article className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft md:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            SEO-контур хаба
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900">
            Какие запросы закрывает тема
          </h2>
          <div className="mt-5 flex flex-wrap gap-2">
            {seo.searchQueries.map((query) => (
              <span key={query} className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700">
                {query}
              </span>
            ))}
          </div>
          <p className="mt-5 text-sm leading-7 text-slate-600">
            {seo.returnMechanic}
          </p>
        </article>

        <article className="rounded-[2rem] border border-slate-200 bg-[linear-gradient(135deg,#f8fafc_0%,#fff8e8_100%)] p-6 shadow-soft md:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            Внутренняя перелинковка
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900">
            Куда вести читателя дальше
          </h2>
          <div className="mt-5 grid gap-3">
            {seo.internalLinks.map((link) => (
              <TrackedLink
                key={link.href}
                href={link.href}
                goal="hub_internal_route_click"
                params={{ hub: hub.slug, label: link.label }}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="rounded-2xl border border-white/80 bg-white/85 p-4 text-sm font-bold leading-6 text-slate-800 transition hover:-translate-y-0.5 hover:border-slate-300"
              >
                {link.label}
              </TrackedLink>
            ))}
          </div>
        </article>
      </section>

      <section className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <article className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft md:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            Боли, которые закрывает хаб
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900">
            Когда стоит начать отсюда
          </h2>
          <div className="mt-5 grid gap-3">
            {hub.pains.map((pain, index) => (
              <div key={pain} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-400">
                  0{index + 1}
                </p>
                <p className="mt-2 text-sm font-semibold leading-6 text-slate-800">{pain}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-[2rem] border border-slate-200 bg-[linear-gradient(135deg,#f7fbff_0%,#fff8e8_100%)] p-6 shadow-soft md:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            Лид-магниты
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900">
            Что можно добавить в хаб
          </h2>
          <div className="mt-5 grid gap-3">
            {hub.leadMagnets.map((item) => (
              <div key={item} className="rounded-2xl border border-white/80 bg-white/80 p-4">
                {item === "Диагностика управляемости бизнеса" || item === "50 промтов для руководителя" ? (
                  <Link
                    href={
                      item === "Диагностика управляемости бизнеса"
                        ? "/lead/business-control-diagnostic"
                        : "/lead/manager-ai-prompts"
                    }
                    className="text-sm font-bold leading-6 text-slate-800 hover:text-brand"
                  >
                    {item}
                  </Link>
                ) : (
                  <p className="text-sm font-bold leading-6 text-slate-800">{item}</p>
                )}
              </div>
            ))}
          </div>
          <p className="mt-5 text-sm leading-7 text-slate-600">
            Эти материалы можно использовать как точки входа: диагностика → персональный вывод →
            подборка статей → курс или консультация.
          </p>
        </article>
      </section>

      {leadArticles.length > 0 ? (
        <section id="hub-articles" className="scroll-mt-28 space-y-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Маршрут чтения
            </p>
            <h2 className="mt-2 text-4xl font-black tracking-tight text-slate-900">
              С чего начать в теме «{hub.title}»
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {leadArticles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </section>
      ) : null}

      <section className="grid gap-5 lg:grid-cols-[1fr_0.8fr]">
        <article className="rounded-[2rem] border border-[#95dff5] bg-[linear-gradient(135deg,#eaf8ff_0%,#f7fbff_100%)] p-6 shadow-soft md:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#005b75]">
            Связанный курс
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900">
            {hub.course.title}
          </h2>
          <p className="mt-4 text-base leading-8 text-slate-700">{hub.course.note}</p>
          <TrackedLink
            href={hub.course.href}
            goal="hub_course_click"
            params={{ hub: hub.slug, course: hub.course.title }}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex rounded-2xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
          >
            Смотреть курс
          </TrackedLink>
        </article>

        <article className="rounded-[2rem] border border-[#efb8d2] bg-[linear-gradient(135deg,#fff0f7_0%,#fff8e8_100%)] p-6 shadow-soft md:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9f2f73]">
            Консалтинг
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900">
            Нужна работа с вашей ситуацией?
          </h2>
          <p className="mt-4 text-base leading-8 text-slate-700">
            Можно разобрать контекст, найти ограничения и собрать практичный план изменений под вашу
            компанию, команду или проект.
          </p>
          <TrackedLink
            href={getHubConsultUrl()}
            goal="hub_consult_click"
            params={{ hub: hub.slug, source: "consulting_card" }}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex rounded-2xl bg-[#ff6a3d] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#ef5d31]"
          >
            {hub.ctaLabel}
          </TrackedLink>
        </article>
      </section>

      {restArticles.length > 0 ? (
        <section className="space-y-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Библиотека хаба
            </p>
            <h2 className="mt-2 text-4xl font-black tracking-tight text-slate-900">
              Еще материалы по теме
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {restArticles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </section>
      ) : null}

      <AuthorBrandBlock variant="soft-sell" />
    </div>
  );
}
