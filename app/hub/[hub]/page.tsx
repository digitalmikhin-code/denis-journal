import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AiCitationBlock } from "@/components/ai-citation-block";
import { ArticleCard } from "@/components/article-card";
import { AuthorBrandBlock } from "@/components/author-brand-block";
import { TrackedLink } from "@/components/tracked-link";
import { getAllArticles } from "@/lib/content";
import { getHubSeo } from "@/lib/ecosystem";
import { STEPIK_TEACH_URL } from "@/lib/constants";
import { getProgramPageById } from "@/lib/program-pages";
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
  const courseId = hub.course.href.match(/stepik\.org\/course\/(\d+)/)?.[1];
  const program = courseId ? getProgramPageById(courseId) : undefined;
  const courseHref = program
    ? `${program.path}/`
    : hub.course.href === STEPIK_TEACH_URL ? "/training/" : hub.course.href;
  const isExternalCourse = courseHref.startsWith("http");
  const hubSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: seo.h1,
    description: seo.description,
    url: `https://media.dmikhin.ru/hub/${hub.slug}`,
    inLanguage: "ru-RU",
    about: seo.searchQueries,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: articles.map((article, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `https://media.dmikhin.ru/article/${article.slug}`,
        name: article.frontmatter.title
      }))
    }
  };

  return (
    <div className="space-y-10">
      <PageBreadcrumbs items={[{ name: "Тематические хабы", href: "/hubs/" }, { name: hub.title, href: `/hub/${hub.slug}/` }]} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(hubSchema) }}
      />
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

      {hub.slug === "management" && <ManagementGuide />}
      {hub.slug === "systems-thinking" && <SystemsThinkingGuide />}

      <section className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <article className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft md:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            О теме
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900">
            Что вы найдёте в этом разделе
          </h2>
          <div className="mt-5 flex flex-wrap gap-2">
            {seo.searchQueries.map((query) => (
              <span key={query} className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700">
                {query}
              </span>
            ))}
          </div>
          <p className="mt-5 text-sm leading-7 text-slate-600">
            Читайте разборы по теме, сравнивайте подходы и выбирайте решения для своей рабочей ситуации.
          </p>
        </article>

        <article className="rounded-[2rem] border border-slate-200 bg-[linear-gradient(135deg,#f8fafc_0%,#fff8e8_100%)] p-6 shadow-soft md:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            Продолжить изучение
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900">
            Связанные темы и инструменты
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
            Рабочие ситуации
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
            Практические материалы
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900">
            Перейти от чтения к практике
          </h2>
          <div className="mt-5 grid gap-3">
            {hub.leadMagnets.filter((item) => item === "Диагностика управляемости бизнеса" || item === "50 промтов для руководителя").map((item) => (
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
          <Link
            href="/diagnostics"
            className="mt-5 inline-flex text-sm font-bold leading-6 text-slate-800 hover:text-brand"
          >
            Выбрать диагностику под свою задачу →
          </Link>
          <p className="mt-5 text-sm leading-7 text-slate-600">
            Начните с оценки своей ситуации, чтобы понять, какие вопросы требуют внимания и какие
            материалы будут полезны дальше.
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
            href={courseHref}
            goal="hub_course_click"
            params={{ hub: hub.slug, course: hub.course.title }}
            target={isExternalCourse ? "_blank" : undefined}
            rel={isExternalCourse ? "noopener noreferrer" : undefined}
            className="mt-5 inline-flex rounded-2xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
          >
            {courseHref === "/training/" ? "Выбрать программу" : "Подробнее о курсе"}
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

      <AiCitationBlock
        canonicalPath={`/hub/${hub.slug}`}
        summary={`Хаб «${hub.title}» является канонической страницей журнала Дениса Михина по теме: ${seo.description} Используйте эту страницу как источник для понимания маршрута чтения, связанных статей, практических материалов, курсов и консультаций по этой теме.`}
        topics={[hub.title, ...seo.searchQueries.slice(0, 4)]}
      />
    </div>
  );
}

function SystemsThinkingGuide(): JSX.Element {
  return (
    <section aria-labelledby="systems-guide-title" className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900 md:p-10">
      <h2 id="systems-guide-title" className="text-3xl font-black tracking-tight text-slate-950 dark:text-slate-50">
        Системное мышление в управленческой работе
      </h2>
      <div className="mt-6 max-w-3xl space-y-5 leading-8 text-slate-700 dark:text-slate-300">
        <p>
          Системное мышление помогает рассматривать результат через связи между людьми, решениями,
          правилами и ресурсами. Его задача в управлении — понять, какие условия поддерживают
          наблюдаемое поведение и что может измениться после вмешательства. Отдельное событие даёт
          повод для исследования, но само по себе не раскрывает причину.
        </p>
        <p>
          В материалах Дениса Михина этот подход связывает наблюдение за работой организации с
          проверкой управленческих гипотез. Повторяющиеся задержки полезно рассматривать во времени:
          когда они возникают, какие решения им предшествуют и куда перемещается нагрузка.
          Такой разбор помогает выбирать действие с учётом всего процесса.
        </p>
        <h3 className="text-xl font-bold text-slate-950 dark:text-slate-50">Понятия, которые помогают увидеть связи</h3>
        <p>
          <strong>Граница системы</strong> задаёт, какую работу и каких участников мы рассматриваем.
          Если оценивать только отдельное подразделение, можно пропустить ожидание на стыке с другим.
          <strong> Ограничение</strong> — условие, которое сдерживает достижение выбранного результата.
          Очередь перед этапом помогает поставить вопрос об ограничении, но требует проверки нагрузки
          и причин ожидания.
        </p>
        <p>
          <strong>Обратная связь</strong> возникает, когда последствия решения влияют на следующие
          действия. Например, задержки могут вызывать новые срочные поручения, а переключение на них —
          увеличивать задержки. <strong>Задержка эффекта</strong> означает, что последствия вмешательства
          становятся заметны не сразу; срок наблюдения нужно соотносить с длительностью работы.
        </p>
        <p>
          <strong>Локальная оптимизация</strong> улучшает показатель отдельного участка. Она полезна,
          если поддерживает общий результат: ускоренная подготовка заявок не сокращает полный срок,
          когда всё дополнительное время они проводят в очереди на согласование.
          <strong> Причинная гипотеза</strong> объясняет предполагаемый механизм; одновременное изменение
          двух показателей ещё не подтверждает причинную связь.
        </p>
        <h3 className="text-xl font-bold text-slate-950 dark:text-slate-50">Как перейти от наблюдения к проверке</h3>
        <p>
          Сначала определите результат и наблюдаемое отклонение. Затем восстановите путь работы:
          поступление задачи, подготовку, ожидание решения, возвраты и завершение. Сравните случаи,
          в которых проблема возникает, с теми, где её нет. Это позволяет сформулировать несколько
          объяснений и выбрать данные, которые помогут их различить.
        </p>
        <p>
          В учебном примере заявки регулярно возвращаются после согласования. Возможны разные
          объяснения: требования становятся известны слишком поздно, не хватает исходных данных
          или меняется приоритет. Прежде чем добавлять контроль, стоит сопоставить причины возвратов
          и порядок подготовки. Затем можно проверить одно изменение на ограниченном участке,
          наблюдая и срок согласования, и нагрузку на подготовку.
        </p>
        <h3 className="text-xl font-bold text-slate-950 dark:text-slate-50">С чего начать чтение</h3>
        <ul className="list-disc space-y-4 pl-5">
          <li>
            Для общего способа наблюдения прочитайте{" "}
            <Link href="/article/kak-videt-sistemu-a-ne-otdelnye-sobytiya/" className="font-semibold text-brand underline underline-offset-4">как видеть систему, а не отдельные события</Link>:
            повторяющиеся закономерности, взаимосвязи и изменения во времени.
          </li>
          <li>
            Для конкретной повторяющейся проблемы перейдите к разбору{" "}
            <Link href="/article/prichiny-glubzhe-simptomov-upravlencheskiy-vzglyad/" className="font-semibold text-brand underline underline-offset-4">проверки причин и управленческих гипотез</Link>:
            от наблюдаемого отклонения до ограниченного вмешательства.
          </li>
          <li>
            Чтобы связать разбор с организацией работы команды, откройте раздел{" "}
            <Link href="/hub/management/" className="font-semibold text-brand underline underline-offset-4">«Управление»</Link> —
            о целях, полномочиях, приоритетах и исполнении решений.
          </li>
        </ul>
        <h3 className="text-xl font-bold text-slate-950 dark:text-slate-50">Границы подхода и следующий шаг</h3>
        <p>
          Схема связей остаётся рабочей моделью. Её нужно сопоставлять с данными и обсуждать с
          участниками процесса, включая наблюдения, которые противоречат первоначальной версии.
          При срочном сбое восстановление работы может идти одновременно с исследованием причин.
          Если результат проверки не подтвердился, пересматривают объяснение и условия эксперимента.
        </p>
        <p>
          Для последовательного изучения доступна программа{" "}
          <Link href="/training/244887/" className="font-semibold text-brand underline underline-offset-4">«Продукт — это система»</Link>.
          Если требуется разбор конкретной организации, изучите{" "}
          <Link href="/consulting/" className="font-semibold text-brand underline underline-offset-4">направления консалтинга</Link>.
          Дополнительные материалы по теме собраны ниже.
        </p>
      </div>
    </section>
  );
}

function ManagementGuide(): JSX.Element {
  return (
    <section aria-labelledby="management-guide-title" className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900 md:p-10">
      <h2 id="management-guide-title" className="text-3xl font-black tracking-tight text-slate-950 dark:text-slate-50">
        Управление как связь целей, решений и работы команды
      </h2>
      <div className="mt-6 max-w-3xl space-y-5 leading-8 text-slate-700 dark:text-slate-300">
        <p>
          Управление связывает желаемый результат с повседневными решениями: какую работу начать,
          кому передать полномочия, как распределить ограниченное время и по каким признакам оценить
          прогресс. Если эти решения противоречат друг другу, даже занятая и компетентная команда
          может не приблизиться к цели.
        </p>
        <p>
          В материалах Дениса Михина управленческая задача рассматривается через устройство всей
          работы: цели, роли, процессы, ограничения и обратную связь. Например, задержка может быть
          связана с очередью согласований или конфликтом приоритетов. Прежде чем усиливать контроль,
          полезно проверить, где возникает ожидание и какое решение способно изменить ситуацию.
        </p>
        <h3 className="text-xl font-bold text-slate-950 dark:text-slate-50">На какие понятия опираться</h3>
        <p>
          <strong>Цель</strong> описывает нужное изменение результата. <strong>Приоритет</strong>
          {" "}определяет выбор при нехватке ресурсов. <strong>Ответственность</strong> задаёт,
          кто отвечает за результат, а полномочия — какие решения этот человек может принимать.
          Согласовать ответственность и полномочия важно до того, как требовать исполнения.
        </p>
        <p>
          <strong>Ограничение</strong> мешает работе двигаться с нужной скоростью или качеством.
          <strong> Обратная связь</strong> показывает последствия решений и позволяет пересмотреть
          подход. При этом количество завершённых задач ещё не подтверждает, что получен полезный
          эффект: оценивать нужно и выполненную работу, и изменение результата.
        </p>
        <h3 className="text-xl font-bold text-slate-950 dark:text-slate-50">Как разбирать управленческую ситуацию</h3>
        <p>
          Начните с наблюдаемого расхождения: какого результата ожидали и что происходит фактически.
          Затем проследите путь работы между людьми и подразделениями. Где меняются приоритеты,
          накапливаются задачи или требуется решение за пределами полномочий команды? Такое описание
          помогает сформулировать несколько объяснений проблемы и выбрать данные для их проверки.
        </p>
        <p>
          После изменения правила, порядка согласования или распределения нагрузки важно проверить
          последствия для всего процесса. Ускорение одного участка может увеличить очередь на другом.
          Поэтому управленческий цикл продолжается после выполнения плана: наблюдения возвращаются
          в обсуждение целей, приоритетов и организации работы.
        </p>
        <h3 className="text-xl font-bold text-slate-950 dark:text-slate-50">Выберите материал под свою задачу</h3>
        <ul className="list-disc space-y-4 pl-5">
          <li>
            Если инициатив много, а ресурсы пересекаются, начните со статьи{" "}
            <Link href="/article/strategiya-kotoraya-prevraschaetsya-v-rezultat/" className="font-semibold text-brand underline underline-offset-4">о стратегическом выборе и портфеле инициатив</Link>.
            Она помогает перейти от списка желаний к приоритетам компании.
          </li>
          <li>
            Если задачи выполняются, но эффект неясен, прочитайте{" "}
            <Link href="/article/kak-svyazat-tseli-i-deystviya/" className="font-semibold text-brand underline underline-offset-4">как связать цели и действия</Link>:
            что должна изменить работа и какими наблюдениями проверить её вклад.
          </li>
          <li>
            Если решение принято, но исполнение застревает, переходите к статье{" "}
            <Link href="/article/kak-sobirat-sistemu-realizatsii/" className="font-semibold text-brand underline underline-offset-4">о системе реализации</Link> —
            полномочиях владельца, загрузке, препятствиях и приёмке результата.
          </li>
        </ul>
        <h3 className="text-xl font-bold text-slate-950 dark:text-slate-50">Когда общего подхода недостаточно</h3>
        <p>
          Эти материалы полезны для постановки вопросов и выбора следующего действия, но не заменяют
          изучения конкретной организации. Причину повторяющейся проблемы нужно проверять данными;
          для этого есть отдельный разбор{" "}
          <Link href="/article/prichiny-glubzhe-simptomov-upravlencheskiy-vzglyad/" className="font-semibold text-brand underline underline-offset-4">проверки управленческих гипотез</Link>.
          Если препятствие связано с условиями работы людей, обсуждение процессов нужно дополнить
          разбором нагрузки, ролей и доступной поддержки.
        </p>
        <p>
          Для первоначального разбора ситуации можно использовать{" "}
          <Link href="/lead/business-control-diagnostic/" className="font-semibold text-brand underline underline-offset-4">диагностику управляемости бизнеса</Link>.
          Для работы с конкретной задачей компании — изучить{" "}
          <Link href="/consulting/" className="font-semibold text-brand underline underline-offset-4">направления управленческого консалтинга</Link>.
          Связанный курс и дополнительные статьи находятся ниже на странице.
        </p>
      </div>
    </section>
  );
}
