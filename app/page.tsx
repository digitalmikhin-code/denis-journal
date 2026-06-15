import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArticleCard } from "@/components/article-card";
import { AuthorChoiceSection } from "@/components/author-choice-section";
import { AuthorQuote } from "@/components/author-quote";
import { ContinueReadingCard } from "@/components/continue-reading-card";
import { IdeaMap, type IdeaMapConnection, type IdeaMapNode } from "@/components/idea-map";
import { KnowledgeMapSection } from "@/components/knowledge-map-section";
import { MaxChannelBanner } from "@/components/max-channel-banner";
import { MethodologySection } from "@/components/methodology-section";
import { PersonalPath, type PersonalPathItem } from "@/components/personal-path";
import { ReadingGuides, type ReadingGuide } from "@/components/reading-guides";
import { SmartCollections, type SmartCollection } from "@/components/smart-collections";
import { StarterMap, type StarterMapItem } from "@/components/starter-map";
import {
  CATEGORY_LABELS,
  CATEGORY_SHORT_LABELS,
  CATEGORY_THEME,
  SITE_URL,
  TELEGRAM_CONSULT_URL,
  TELEGRAM_CHANNEL_URL,
  VK_PROFILE_URL,
  type Category
} from "@/lib/constants";
import { getLatestArticles, type ArticleSummary } from "@/lib/content";
import { ARTICLE_CATEGORY_COURSE_PROMOS } from "@/lib/course-promos";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Журнал Дениса Михина",
  description:
    "Журнал Дениса Михина для руководителей и сильных специалистов: как принимать решения, расти и управлять сложными системами.",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "Журнал Дениса Михина",
    description:
      "Журнал Дениса Михина для руководителей и сильных специалистов: как принимать решения, расти и управлять сложными системами.",
    url: SITE_URL
  }
};

export default function HomePage(): JSX.Element {
  const allLatest = getLatestArticles(80);
  const latest = selectHomepageArticles(allLatest.slice(0, 18));

  const newest = latest[0];
  const spotlight = latest.slice(1, 3);
  const articleBlocks = buildHomepageArticleBlocks(latest);
  const personalPaths = buildPersonalPaths(allLatest);
  const ideaMap = buildIdeaMap(allLatest);
  const smartCollections = buildSmartCollections(allLatest);
  const readingGuides = buildReadingGuides(allLatest);
  const starterMap = buildStarterMap(allLatest);

  return (
    <div className="space-y-14">
      <section className="relative overflow-hidden rounded-[2.25rem] border border-[#f0c6d9] bg-[linear-gradient(135deg,#fff7fb_0%,#ffe5f1_28%,#eef9ff_70%,#f9f7ff_100%)] p-8 shadow-[0_34px_80px_rgba(15,23,42,0.08)] md:p-10">
        <div className="pointer-events-none absolute -right-16 top-0 h-72 w-72 rounded-full border-[18px] border-[#7fd3ff]/70" />
        <div className="pointer-events-none absolute bottom-[-160px] left-[-20px] h-72 w-72 rounded-full border-[14px] border-[#f2cf63]/65" />
        <div className="pointer-events-none absolute left-[56%] top-[18%] h-40 w-40 rounded-[2rem] border-2 border-slate-900/8 bg-white/35 backdrop-blur-sm" />

        <div className="relative grid gap-8 md:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <p className="text-sm font-semibold uppercase tracking-[0.26em] text-slate-500">
              Авторская оптика Дениса Михина
            </p>
            <h1 className="max-w-[17ch] text-4xl font-black leading-[0.96] tracking-tight text-slate-900 md:text-6xl xl:text-[4.1rem]">
              Помогаю видеть систему там, где другие видят хаос
            </h1>
            <p className="max-w-[44ch] text-[1.18rem] leading-[1.36] text-slate-800 md:text-[1.42rem]">
              Журнал для руководителей и сильных специалистов, которым важно не просто работать больше,
              а точнее понимать людей, процессы, решения и ограничения роста.
            </p>
            <AuthorQuote
              compact
              className="max-w-[40ch] border-[#ecd9b6] bg-[#fff8ea]"
              quote="Сильный руководитель отличается не громкостью, а качеством решений в сложном контексте."
            />
            <div className="grid max-w-3xl gap-3 md:grid-cols-3">
              <div className="rounded-[1.5rem] border border-[#f2cf63] bg-[#fff4ce] p-4 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Кто</p>
                <p className="mt-2 text-sm font-medium leading-6 text-slate-800">
                  Денис Михин, консультант по управлению, Agile и системному росту команд.
                </p>
              </div>
              <div className="rounded-[1.5rem] border border-[#9fdcff] bg-[#eaf8ff] p-4 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Для кого</p>
                <p className="mt-2 text-sm font-medium leading-6 text-slate-800">
                  Для тех, кто отвечает за решения, людей, процессы и собственный рост.
                </p>
              </div>
              <div className="rounded-[1.5rem] border border-[#efb8d2] bg-[#fff0f7] p-4 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Зачем читать</p>
                <p className="mt-2 text-sm font-medium leading-6 text-slate-800">
                  Чтобы быстрее находить причины проблем, точки роста и решения, которые выдерживают реальность.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 pt-1">
              <Link
                href="/articles"
                className="rounded-2xl bg-slate-900 px-6 py-3 text-base font-bold text-white transition hover:bg-slate-800"
              >
                Читать журнал
              </Link>
              <Link
                href="/about"
                className="rounded-2xl border border-slate-900/15 bg-white/70 px-6 py-3 text-base font-semibold text-slate-800 transition hover:bg-white"
              >
                Кто такой Денис Михин
              </Link>
            </div>
          </div>

          <div className="grid gap-4 content-start">
            {newest ? (
              <article className="rounded-[2rem] border border-slate-900/10 bg-slate-900 p-6 text-white shadow-[0_20px_45px_rgba(15,23,42,0.18)] self-start">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
                  В центре внимания
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <span
                    className="inline-flex rounded-full border px-3 py-1 text-[0.72rem] font-black uppercase tracking-[0.16em] shadow-[0_8px_20px_rgba(0,0,0,0.18)]"
                    style={{
                      backgroundColor: CATEGORY_THEME[newest.frontmatter.category as Category].badgeBg,
                      color: CATEGORY_THEME[newest.frontmatter.category as Category].badgeText,
                      borderColor: CATEGORY_THEME[newest.frontmatter.category as Category].badgeBorder
                    }}
                  >
                    {CATEGORY_SHORT_LABELS[newest.frontmatter.category as Category]}
                  </span>
                  <span className="text-sm text-white/60">{formatDate(newest.frontmatter.date)}</span>
                </div>
                <h2 className="mt-4 text-3xl font-black leading-tight tracking-tight">
                  <Link href={`/article/${newest.slug}`} className="hover:text-[#f2cf63]">
                    {newest.frontmatter.title}
                  </Link>
                </h2>
                <p className="mt-3 text-base leading-7 text-white/78">{newest.frontmatter.excerpt}</p>
                {spotlight.length > 0 ? (
                  <div className="mt-6 space-y-3 border-t border-white/15 pt-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/60">
                      Еще в фокусе
                    </p>
                    {spotlight.map((item) => (
                      <Link
                        key={item.slug}
                        href={`/article/${item.slug}`}
                        className="block rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 transition hover:border-white/25 hover:bg-white/[0.08]"
                      >
                        <p className="text-[0.72rem] font-bold uppercase tracking-[0.14em] text-white/60">
                          {CATEGORY_SHORT_LABELS[item.frontmatter.category as Category]}
                        </p>
                        <p className="mt-1 text-base font-semibold leading-6 text-white/95">
                          {item.frontmatter.title}
                        </p>
                      </Link>
                    ))}
                  </div>
                ) : null}
              </article>
            ) : null}
          </div>
        </div>
      </section>

      <ContinueReadingCard />

      <KnowledgeMapSection />

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_18px_42px_rgba(15,23,42,0.06)] md:p-8">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Редакционный вход</p>
            <h2 className="serif-display text-4xl font-semibold tracking-tight text-slate-900">С чего начать чтение</h2>
            <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600">
              Если вы попали на журнал впервые, начните не с ленты, а с маршрута: выберите свою роль, тему или управленческую задачу.
              Это помогает быстрее погрузиться в систему знаний, а не в набор отдельных материалов.
            </p>
          </div>
          <Link href="/start" className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-800">
            Выбрать маршрут
          </Link>
        </div>
      </section>

      <StarterMap items={starterMap} />

      <AuthorChoiceSection articles={allLatest} />

      <section className="relative overflow-hidden rounded-[2.25rem] border border-[#1f2937] bg-slate-950 p-6 text-white shadow-[0_30px_72px_rgba(15,23,42,0.2)] md:p-8">
        <div className="pointer-events-none absolute -right-14 -top-20 h-56 w-56 rounded-full border-[14px] border-[#2bd0e2]/40" />
        <div className="pointer-events-none absolute -bottom-20 left-10 h-48 w-48 rounded-full border-[12px] border-[#f5d45d]/35" />
        <div className="relative grid gap-7 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
              Диагностика
            </p>
            <h2 className="mt-3 max-w-[15ch] text-4xl font-black leading-[0.96] tracking-tight md:text-5xl">
              Проверьте, где сейчас ваш главный ограничитель
            </h2>
            <p className="mt-4 max-w-[48ch] text-base leading-8 text-white/72 md:text-lg">
              Диагностики помогают увидеть не абстрактный “уровень”, а конкретное место, где теряется
              управляемость: в решениях, команде, процессах, изменениях или личной зрелости.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/diagnostics"
                className="rounded-2xl bg-white px-6 py-3 text-base font-black text-slate-950 shadow-[0_7px_0_0_rgba(255,255,255,0.22)] transition hover:-translate-y-0.5 hover:bg-slate-100"
              >
                Пройти диагностику
              </Link>
              <Link
                href="/articles"
                className="rounded-2xl border border-white/18 bg-white/[0.06] px-6 py-3 text-base font-bold text-white transition hover:-translate-y-0.5 hover:bg-white/[0.1]"
              >
                Сначала почитать
              </Link>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            {[
              {
                step: "01",
                title: "Выберите контекст",
                text: "Управление, продукт, Agile, Kanban, ИИ или личная управленческая зрелость."
              },
              {
                step: "02",
                title: "Увидьте ограничитель",
                text: "Результат покажет не только балл, но и зону, которая сильнее всего тормозит рост."
              },
              {
                step: "03",
                title: "Соберите следующий шаг",
                text: "После результата можно перейти к материалам, курсу, отчету или разбору ситуации."
              }
            ].map((item) => (
              <div
                key={item.step}
                className="rounded-[1.5rem] border border-white/10 bg-white/[0.05] p-4 shadow-[0_16px_34px_rgba(0,0,0,0.14)]"
              >
                <div className="flex items-start gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#2bd0e2] text-sm font-black text-[#062c35]">
                    {item.step}
                  </span>
                  <div>
                    <h3 className="text-base font-black leading-tight text-white">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-white/68">{item.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PersonalPath paths={personalPaths} />

      <IdeaMap nodes={ideaMap.nodes} connections={ideaMap.connections} />

      <MethodologySection />

      <SmartCollections collections={smartCollections} />

      <ReadingGuides guides={readingGuides} />

      <PracticeChangesTeaser />

      <CourseRoutesBlock />

      <MaxChannelBanner />

      <section className="relative overflow-hidden rounded-[2rem] border border-[#1c57d8] bg-[linear-gradient(135deg,#eaf4ff_0%,#cfe5ff_38%,#a9d0ff_100%)] p-7 shadow-[0_22px_50px_rgba(24,97,210,0.22)] md:p-9">
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full border-[12px] border-white/70" />
        <div className="pointer-events-none absolute -bottom-14 left-8 h-36 w-36 rounded-full border-[10px] border-[#1f6fe0]/35" />
        <div className="relative flex flex-wrap items-end justify-between gap-5">
          <div className="max-w-[52ch]">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#1b4eae]">VK</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight text-[#10367a] md:text-4xl">
              Читайте короткие заметки во VK
            </h2>
            <p className="mt-3 text-base leading-7 text-[#184791] md:text-lg">
              Там выходят короткие мысли, обновления и наблюдения по управлению без длинного формата статей.
            </p>
          </div>
          <Link
            href={VK_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex rounded-2xl bg-[#2787f5] px-6 py-3 text-base font-bold text-white shadow-[0_6px_0_0_rgba(13,61,138,0.35)] transition hover:bg-[#1f79e3]"
          >
            Подписаться во VK
          </Link>
        </div>
      </section>

      <section className="space-y-5">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Подборка</p>
            <h2 className="serif-display text-4xl font-semibold tracking-tight text-slate-900">
              Последние публикации
            </h2>
          </div>
          <Link href="/articles" className="text-sm font-semibold text-slate-700 hover:text-slate-900">
            Смотреть весь архив →
          </Link>
        </div>

        <div className="space-y-6">
          {articleBlocks.map((block, index) => {
            if (block.type === "grid") {
              return (
                <div key={`grid-${index}`} className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {block.articles.map((article) => (
                    <ArticleCard key={article.slug} article={article} />
                  ))}
                </div>
              );
            }

            const category = block.article.frontmatter.category as Category;
            const theme = CATEGORY_THEME[category];
            const isImageRight = block.wideIndex % 2 === 0;

            return (
              <article
                key={block.article.slug}
                className="fade-in overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white shadow-[0_24px_54px_rgba(15,23,42,0.08)]"
                style={{ boxShadow: `0 24px 54px -30px ${theme.glow}` }}
              >
                <Link
                  href={`/article/${block.article.slug}`}
                  className="grid gap-5 p-5 md:min-h-[295px] md:grid-cols-[0.38fr_0.62fr] md:items-center md:p-6"
                >
                  <div
                    className={`relative aspect-[16/9] overflow-hidden rounded-[1.6rem] ${
                      isImageRight ? "md:order-2" : "md:order-1"
                    } md:h-full md:aspect-auto`}
                  >
                    <Image
                      src={block.article.frontmatter.cover}
                      alt={block.article.frontmatter.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className={`space-y-4 ${isImageRight ? "md:order-1" : "md:order-2"}`}>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-sm font-medium text-slate-500">
                        {formatDate(block.article.frontmatter.date)}</span>
                    </div>
                    <span
                      className="inline-flex rounded-full border px-3 py-1 text-[0.72rem] font-bold uppercase tracking-[0.14em] shadow-sm"
                      style={{
                        backgroundColor: theme.badgeBg,
                        color: theme.badgeText,
                        borderColor: theme.badgeBorder
                      }}
                    >
                      {CATEGORY_SHORT_LABELS[category]}
                    </span>
                    <h3 className="max-w-[18ch] text-3xl font-black leading-[1.02] tracking-tight text-slate-900 md:text-[2.2rem]">
                      {block.article.frontmatter.title}
                    </h3>
                    <p className="max-w-[54ch] text-lg leading-8 text-slate-600">
                      {block.article.frontmatter.excerpt}
                    </p>
                    <div className="flex items-center gap-4 pt-1">
                      <span className={`h-2 w-28 rounded-full bg-gradient-to-r ${theme.line}`} />
                      <span className="text-sm font-semibold text-slate-700">Открыть материал</span>
                    </div>
                  </div>
                </Link>
              </article>
            );
          })}
        </div>
      </section>


      <section className="relative overflow-hidden rounded-[2rem] bg-[#6964d9] p-8 text-white shadow-[0_28px_60px_rgba(67,56,202,0.28)] md:p-10">
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full border-[10px] border-white/70" />
        <div className="pointer-events-none absolute -bottom-24 right-16 h-56 w-56 rounded-full border-[8px] border-white/55" />
        <div className="relative grid gap-6 md:grid-cols-[1.2fr_0.8fr] md:items-center">
          <div className="space-y-4">
            <h2 className="text-4xl font-extrabold leading-tight tracking-tight md:text-5xl">
              Подпишитесь на Telegram-канал Дениса
            </h2>
            <p className="max-w-[38ch] text-lg text-white/95">
              Если вам близок такой способ мышления и подачи, канал помогает не терять новые идеи,
              короткие наблюдения и практические разборы между большими публикациями.
            </p>
            <Link
              href={TELEGRAM_CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-2xl bg-[#2bd0e2] px-6 py-3 text-lg font-bold text-[#062c35] shadow-[0_6px_0_0_rgba(8,40,49,0.28)] transition hover:bg-[#22bfd0]"
            >
              Подписаться на канал
            </Link>
          </div>
          <div className="hidden md:flex md:justify-end">
            <div className="rounded-3xl border-4 border-[#2e2a82] bg-[#8c88ea] px-6 py-5 text-right shadow-[0_16px_0_0_rgba(39,34,106,0.35)]">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/80">ScrumBaza</p>
              <p className="mt-2 text-2xl font-extrabold leading-tight">Коротко, по делу, без инфошума</p>
              <p className="mt-2 text-sm text-white/90">Посты о карьере, менеджменте и AI для практики.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] bg-[#d7d7d7] p-8 pb-10 md:p-10">
        <h2 className="text-5xl font-extrabold tracking-tight text-slate-900">Рубрики</h2>
        <p className="mt-3 text-lg text-slate-600">Направления, из которых складывается редакционная карта журнала.</p>
        <div className="mt-7 flex flex-wrap gap-3">
          {(Object.keys(CATEGORY_LABELS) as Category[]).map((slug) => (
            <Link
              key={slug}
              href={`/category/${slug}`}
              className={`rounded-2xl border px-6 py-3 text-xl font-semibold leading-none transition hover:-translate-y-0.5 ${CATEGORY_THEME[slug].chipSoft}`}
            >
              {CATEGORY_LABELS[slug]}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}


function PracticeChangesTeaser(): JSX.Element {
  return (
    <section className="rounded-[2rem] border border-slate-200 bg-[#111827] p-7 text-white shadow-[0_24px_60px_rgba(15,23,42,0.18)] md:p-9">
      <div className="grid gap-6 md:grid-cols-[1fr_0.82fr] md:items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">Практика изменений</p>
          <h2 className="mt-3 max-w-[14ch] text-4xl font-black leading-[0.96] tracking-tight md:text-5xl">Кейсы без раскрытия конфиденциальности</h2>
          <p className="mt-4 max-w-[58ch] text-base leading-8 text-white/72">
            Разборы через управленческую механику: симптомы, системная причина, что изменили и какой эффект получили.
            Это спокойный способ показать опыт без давления и без раскрытия клиентских деталей.
          </p>
        </div>
        <div className="grid gap-3">
          {["Проблема", "Системная причина", "Решение", "Эффект"].map((item, index) => (
            <div key={item} className="rounded-2xl border border-white/10 bg-white/8 p-4">
              <p className="text-xs font-black uppercase tracking-[0.14em] text-[#f2c14e]">0{index + 1}</p>
              <p className="mt-1 text-lg font-black">{item}</p>
            </div>
          ))}
          <Link href="/practice" className="rounded-2xl bg-[#f2c14e] px-5 py-3 text-center text-sm font-black text-slate-950 transition hover:bg-[#ffd76a]">
            Смотреть практику изменений
          </Link>
        </div>
      </div>
    </section>
  );
}

function CourseRoutesBlock(): JSX.Element {
  const routes = [
    {
      title: "Навести порядок в управлении",
      text: "Для руководителей, которым нужно меньше ручного контроля и больше предсказуемости.",
      href: "https://stepik.org/course/271020/promo",
      label: "Эффективный руководитель"
    },
    {
      title: "Разобраться с проектами и Agile",
      text: "Для тех, кто работает на стыке целей, команд, Scrum, Kanban и delivery.",
      href: "https://stepik.org/course/259560/promo",
      label: "Управление проектами"
    },
    {
      title: "Применять ИИ в работе",
      text: "Для руководителей и специалистов, которые хотят использовать ИИ как рабочий инструмент.",
      href: "https://stepik.org/course/243614/promo",
      label: "Промт-инжиниринг"
    }
  ];

  return (
    <section className="rounded-[2rem] border border-slate-200 bg-[#f7f1e7] p-7 shadow-[0_18px_42px_rgba(15,23,42,0.06)] md:p-9">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Курсы по задачам</p>
          <h2 className="serif-display text-4xl font-semibold tracking-tight text-slate-900">Не просто Stepik-ссылки, а образовательные маршруты</h2>
          <p className="mt-3 max-w-3xl text-base leading-7 text-slate-650">
            Курсы встроены в журнал как продолжение тем: сначала понять проблему, затем изучить подход, затем применить в работе.
          </p>
        </div>
        <Link href="/training" className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-800">
          Все курсы
        </Link>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {routes.map((route) => (
          <article key={route.title} className="rounded-2xl border border-[#e2d0b3] bg-white/85 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8a6427]">{route.label}</p>
            <h3 className="mt-2 text-2xl font-black tracking-tight text-slate-950">{route.title}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-650">{route.text}</p>
            <Link href={route.href} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex text-sm font-black text-slate-950 underline underline-offset-4">
              Перейти к курсу
            </Link>
          </article>
        ))}
      </div>
      <div className="mt-5 rounded-2xl border border-slate-200 bg-white/70 p-4">
        <p className="text-sm leading-7 text-slate-700">
          Если задача шире одного курса, можно обсудить корпоративное обучение или консалтинг: выбрать маршрут и связать образовательную часть с реальными изменениями.
        </p>
        <Link href={TELEGRAM_CONSULT_URL} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-slate-900 transition hover:border-slate-500">
          Обсудить маршрут или консалтинг
        </Link>
      </div>
    </section>
  );
}

type HomepageArticleBlock =
  | { type: "grid"; articles: ArticleSummary[] }
  | { type: "wide"; article: ArticleSummary; wideIndex: number };

function buildHomepageArticleBlocks(articles: ArticleSummary[]): HomepageArticleBlock[] {
  const blocks: HomepageArticleBlock[] = [];
  let wideIndex = 0;

  for (let index = 0; index < articles.length; index += 4) {
    const chunk = articles.slice(index, index + 4);

    if (chunk.length === 4) {
      blocks.push({ type: "grid", articles: chunk.slice(0, 3) });
      blocks.push({ type: "wide", article: chunk[3], wideIndex });
      wideIndex += 1;
      continue;
    }

    if (chunk.length > 0) {
      blocks.push({ type: "grid", articles: chunk });
    }
  }

  return blocks;
}

function selectHomepageArticles(articles: ArticleSummary[]): ArticleSummary[] {
  if (articles.length <= 3) {
    return articles;
  }

  const preferredCounts = [15, 12, 10, 9, 8, 6, 5, 4];
  const supportedRemainders = new Set([0, 3]);

  for (const count of preferredCounts) {
    if (articles.length >= count && supportedRemainders.has(count % 4)) {
      return articles.slice(0, count);
    }
  }

  for (let count = articles.length; count >= 4; count -= 1) {
    if (supportedRemainders.has(count % 4)) {
      return articles.slice(0, count);
    }
  }

  return articles.slice(0, 3);
}

function buildPersonalPaths(articles: ArticleSummary[]): PersonalPathItem[] {
  return [
    {
      id: "leader",
      buttonLabel: "Я руководитель",
      title: "Траектория руководителя",
      description: "Материалы про управляемость, решения, команду, риски и спокойный контроль без микроменеджмента.",
      promise: "Быстро собрать управленческую оптику: где теряется контроль, какие связи важны и что чинить первым.",
      accentClassName: "border-[#cba4ff] bg-[#f4e9ff] text-[#4e1eb3]",
      glowColor: "rgba(203,164,255,0.32)",
      href: "/category/management",
      topics: ["управляемость", "команда", "решения"],
      course: ARTICLE_CATEGORY_COURSE_PROMOS.management,
      articles: pickSmartArticles(articles, ["management", "architecture", "cases"], [
        "руковод",
        "управ",
        "команд",
        "решен",
        "риск",
        "ответствен"
      ])
    },
    {
      id: "corporate-growth",
      buttonLabel: "Я расту в корпорации",
      title: "Траектория карьерного роста",
      description: "Подборка про заметность, влияние, карьерный капитал и рост внутри большой системы.",
      promise: "Понять, как расти не случайно, а через понятный набор действий: результаты, видимость, зона влияния.",
      accentClassName: "border-[#dfbf45] bg-[#fff6d6] text-[#5c3b00]",
      glowColor: "rgba(245,212,93,0.28)",
      href: "/category/career",
      topics: ["карьера", "влияние", "заметность"],
      course: ARTICLE_CATEGORY_COURSE_PROMOS.career,
      articles: pickSmartArticles(articles, ["career", "management"], [
        "карьер",
        "корпорац",
        "рост",
        "влия",
        "замет",
        "ответствен"
      ])
    },
    {
      id: "ai",
      buttonLabel: "Я хочу разобраться в ИИ",
      title: "Траектория ИИ без хайпа",
      description: "Статьи про ИИ в управлении, аналитике, подготовке решений и повседневной работе руководителя.",
      promise: "Отделить полезные сценарии от шума и увидеть, где ИИ реально усиливает мышление и скорость работы.",
      accentClassName: "border-[#ec9a48] bg-[#fff0df] text-[#7a3a00]",
      glowColor: "rgba(255,178,103,0.3)",
      href: "/category/ai",
      topics: ["ИИ", "решения", "аналитика"],
      course: ARTICLE_CATEGORY_COURSE_PROMOS.ai,
      articles: pickSmartArticles(articles, ["ai", "architecture"], [
        "ии",
        "ai",
        "цифров",
        "дашборд",
        "аналит",
        "прогноз"
      ])
    },
    {
      id: "systems",
      buttonLabel: "Я строю систему мышления",
      title: "Траектория системного мышления",
      description: "Материалы о взаимосвязях, причинах проблем, архитектуре решений и зрелом взгляде на сложность.",
      promise: "Научиться видеть не отдельные симптомы, а структуру: связи, ограничения, рычаги и последствия решений.",
      accentClassName: "border-[#8fc95d] bg-[#edfbe3] text-[#224f18]",
      glowColor: "rgba(169,224,112,0.28)",
      href: "/category/thinking",
      topics: ["система", "структура", "связи"],
      course: ARTICLE_CATEGORY_COURSE_PROMOS.thinking,
      articles: pickSmartArticles(articles, ["thinking", "architecture", "management"], [
        "систем",
        "связ",
        "структур",
        "причин",
        "мышлен",
        "архитект"
      ])
    }
  ];
}

function buildIdeaMap(articles: ArticleSummary[]): {
  nodes: IdeaMapNode[];
  connections: IdeaMapConnection[];
} {
  const nodes: IdeaMapNode[] = [
    {
      id: "ai",
      label: "ИИ в управлении",
      shortLabel: "ИИ",
      description: "Как использовать ИИ без хайпа: для решений, аналитики, прогнозов и управленческой скорости.",
      category: "ai",
      href: "/category/ai",
      x: 72,
      y: 22,
      articles: pickSmartArticles(articles, ["ai", "architecture"], [
        "ии",
        "ai",
        "прогноз",
        "аналит",
        "дашборд",
        "решен"
      ], 4)
    },
    {
      id: "management",
      label: "Управление",
      shortLabel: "Управление",
      description: "Про управляемость, ответственность, решения, риски и работу с командой в сложной среде.",
      category: "management",
      href: "/category/management",
      x: 48,
      y: 44,
      articles: pickSmartArticles(articles, ["management", "cases"], [
        "управ",
        "решен",
        "риск",
        "команд",
        "ответствен",
        "проект"
      ], 4)
    },
    {
      id: "career",
      label: "Карьера",
      shortLabel: "Карьера",
      description: "Как расти быстрее, становиться заметнее, расширять влияние и превращать работу в карьерный капитал.",
      category: "career",
      href: "/category/career",
      x: 24,
      y: 30,
      articles: pickSmartArticles(articles, ["career"], [
        "карьер",
        "рост",
        "замет",
        "влия",
        "ответствен",
        "руковод"
      ], 4)
    },
    {
      id: "thinking",
      label: "Системное мышление",
      shortLabel: "Мышление",
      description: "Видеть не симптомы, а связи: структуру, причины проблем, ограничения и рычаги изменений.",
      category: "thinking",
      href: "/category/thinking",
      x: 35,
      y: 72,
      articles: pickSmartArticles(articles, ["thinking", "architecture"], [
        "систем",
        "мышлен",
        "связ",
        "структур",
        "причин",
        "модел"
      ], 4)
    },
    {
      id: "corporate",
      label: "Корпорации",
      shortLabel: "Корпорации",
      description: "Как двигаться внутри большой организации: видеть возможности, договариваться и наращивать влияние.",
      category: "career",
      href: "/category/career",
      x: 16,
      y: 58,
      articles: pickSmartArticles(articles, ["career", "management"], [
        "корпорац",
        "компан",
        "влия",
        "рост",
        "возмож",
        "замет"
      ], 4)
    },
    {
      id: "leadership",
      label: "Лидерство",
      shortLabel: "Лидерство",
      description: "Лидерство через решения, смыслы, доверие, зрелость команды и личную управленческую позицию.",
      category: "management",
      href: "/category/management",
      x: 76,
      y: 70,
      articles: pickSmartArticles(articles, ["management", "career", "cases"], [
        "лидер",
        "смысл",
        "команд",
        "довер",
        "решен",
        "ответствен"
      ], 4)
    }
  ];

  return {
    nodes,
    connections: [
      { from: "ai", to: "management", label: "решения" },
      { from: "ai", to: "thinking", label: "модели" },
      { from: "management", to: "leadership", label: "люди" },
      { from: "management", to: "thinking", label: "система" },
      { from: "career", to: "corporate", label: "рост" },
      { from: "career", to: "leadership", label: "влияние" },
      { from: "corporate", to: "management", label: "контекст" },
      { from: "thinking", to: "leadership", label: "зрелость" },
      { from: "corporate", to: "thinking", label: "структура" }
    ]
  };
}

function buildReadingGuides(articles: ArticleSummary[]): ReadingGuide[] {
  return [
    {
      title: "7 статей, чтобы прокачать управленческое мышление",
      description: "Маршрут для тех, кто хочет видеть систему, управляемость, риски и ответственность шире отдельных задач.",
      outcome: "После маршрута появится более цельная рамка: как читать ситуацию, где искать рычаги и что менять в управлении первым.",
      label: "Управление",
      href: "/category/management",
      accent: {
        bg: "#cba4ff",
        border: "#b98cf2",
        text: "#4e1eb3",
        shadow: "rgba(203,164,255,0.28)"
      },
      articles: pickSmartArticles(articles, ["management", "thinking", "architecture", "cases"], [
        "управ",
        "мышлен",
        "систем",
        "структур",
        "ответствен",
        "риск",
        "решен",
        "команд"
      ], 7)
    },
    {
      title: "5 текстов про ИИ без хайпа",
      description: "Короткий маршрут для руководителей и специалистов, которым нужен практичный взгляд на ИИ без шума.",
      outcome: "Поймёте, где ИИ реально помогает: в подготовке решений, аналитике, прогнозировании и повседневной работе.",
      label: "ИИ",
      href: "/category/ai",
      accent: {
        bg: "#ffb267",
        border: "#ec9a48",
        text: "#7a3a00",
        shadow: "rgba(255,178,103,0.28)"
      },
      articles: pickSmartArticles(articles, ["ai", "architecture"], [
        "ии",
        "ai",
        "цифров",
        "аналит",
        "прогноз",
        "дашборд",
        "решен"
      ], 5)
    },
    {
      title: "Что прочитать перед карьерным поворотом",
      description: "Маршрут для момента, когда хочется расти, менять роль, становиться заметнее или заходить в управление.",
      outcome: "Соберёте карьерную опору: какие результаты показывать, как расширять влияние и как не ждать случайного шанса.",
      label: "Карьера",
      href: "/category/career",
      accent: {
        bg: "#f5d45d",
        border: "#dfbf45",
        text: "#5c3b00",
        shadow: "rgba(245,212,93,0.26)"
      },
      articles: pickSmartArticles(articles, ["career", "management"], [
        "карьер",
        "рост",
        "корпорац",
        "влия",
        "замет",
        "ответствен",
        "руковод",
        "поворот"
      ], 6)
    }
  ];
}

function buildStarterMap(articles: ArticleSummary[]): StarterMapItem[] {
  const specs: Array<{
    slug: string;
    category: Category;
    signals: string[];
    scenario: string;
    reason: string;
  }> = [
    {
      slug: "navyki-buduschego-rukovoditelya-chto-razvivat-uzhe-seychas",
      category: "career",
      signals: ["навык", "руковод", "будущ"],
      scenario: "Карьера",
      reason: "Хорошая первая точка для сильного специалиста, который хочет понять, какие навыки будут двигать его дальше."
    },
    {
      slug: "upravlenie-riskami-kak-sposob-spokoystviya",
      category: "management",
      signals: ["риск", "спокой"],
      scenario: "Управление",
      reason: "Помогает увидеть управление не как постоянное тушение пожаров, а как работу с предсказуемостью."
    },
    {
      slug: "kak-ii-uskoryaet-podgotovku-upravlencheskih-resheniy",
      category: "ai",
      signals: ["ии", "решен"],
      scenario: "ИИ",
      reason: "Практичный вход в тему ИИ для руководителя: не про хайп, а про подготовку решений и работу с информацией."
    },
    {
      slug: "upravlenie-cherez-strukturu-vzaimosvyazey",
      category: "thinking",
      signals: ["структур", "взаимосвяз"],
      scenario: "Системное мышление",
      reason: "Базовый материал о том, как смотреть на организацию через связи, а не через отдельные симптомы."
    },
    {
      slug: "karera-kak-proekt-upravlenie-svoim-rostom",
      category: "career",
      signals: ["карьера", "проект", "рост"],
      scenario: "Рост внутри компании",
      reason: "Показывает карьеру как управляемую систему действий, а не как ожидание удачного момента."
    },
    {
      slug: "kak-proektirovat-upravlyaemost",
      category: "architecture",
      signals: ["проектировать", "управляем"],
      scenario: "Архитектура решений",
      reason: "Для тех, кто хочет перейти от разовых улучшений к проектированию управляемой системы."
    }
  ];

  const selected = new Map<string, StarterMapItem>();

  specs.forEach((spec) => {
    const article =
      articles.find((item) => item.slug === spec.slug) ??
      pickSmartArticles(articles, [spec.category], spec.signals, 1)[0];

    if (!article || selected.has(article.slug)) return;

    selected.set(article.slug, {
      article,
      scenario: spec.scenario,
      reason: spec.reason
    });
  });

  return [...selected.values()].slice(0, 6);
}

function buildSmartCollections(articles: ArticleSummary[]): SmartCollection[] {
  return [
    {
      title: "Если вы руководитель",
      description: "Про управляемость, решения, команду, риски и спокойный контроль без микроменеджмента.",
      label: "Управление",
      href: "/category/management",
      accentClassName: "border-[#b98cf2] bg-[#f4e9ff]",
      articles: pickSmartArticles(articles, ["management", "architecture"], [
        "руковод",
        "управ",
        "команд",
        "решен",
        "проект"
      ])
    },
    {
      title: "Если вы растете в корпорации",
      description: "Карьерный капитал, заметность, влияние, переход в руководители и рост внутри системы.",
      label: "Карьера",
      href: "/category/career",
      accentClassName: "border-[#dfbf45] bg-[#fff6d6]",
      articles: pickSmartArticles(articles, ["career"], [
        "карьер",
        "корпорац",
        "рост",
        "руковод",
        "влия"
      ])
    },
    {
      title: "Если интересует ИИ",
      description: "Как применять ИИ в управлении, аналитике, портфеле инициатив и ежедневной работе.",
      label: "ИИ",
      href: "/category/ai",
      accentClassName: "border-[#ec9a48] bg-[#fff0df]",
      articles: pickSmartArticles(articles, ["ai"], ["ии", "ai", "цифров", "дашборд", "аналит"])
    },
    {
      title: "Если нужно видеть систему",
      description: "Системное мышление, взаимосвязи, причины проблем и архитектура сильных решений.",
      label: "Мышление",
      href: "/category/thinking",
      accentClassName: "border-[#8fc95d] bg-[#edfbe3]",
      articles: pickSmartArticles(articles, ["thinking", "architecture"], [
        "систем",
        "связ",
        "структур",
        "архитект",
        "причин"
      ])
    }
  ];
}

function pickSmartArticles(
  articles: ArticleSummary[],
  categories: Category[],
  titleSignals: string[],
  limit = 3
): ArticleSummary[] {
  const normalizedSignals = titleSignals.map((signal) => signal.toLowerCase());

  const scored = articles
    .filter((article) => categories.includes(article.frontmatter.category as Category))
    .map((article) => {
      const title = article.frontmatter.title.toLowerCase();
      const signalScore = normalizedSignals.reduce(
        (score, signal) => score + (title.includes(signal) ? 2 : 0),
        0
      );

      return {
        article,
        score: signalScore + (article.frontmatter.featured ? 3 : 0)
      };
    })
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, limit).map((item) => item.article);
}

