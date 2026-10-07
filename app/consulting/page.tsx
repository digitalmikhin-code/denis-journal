import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import type { Metadata } from "next";
import Link from "next/link";
import { TrackedLink } from "@/components/tracked-link";
import { AiCitationBlock } from "@/components/ai-citation-block";
import { AUTHOR_ENTITY } from "@/lib/entity-profile";
import { CONSULTING_PRODUCTS } from "@/lib/platform-ecosystem";
import { SITE_URL, TELEGRAM_CONSULT_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Управленческий консалтинг для бизнеса — Денис Михин",
  description:
    "Управленческий консалтинг Дениса Михина: диагностика проблем бизнеса, ответственность, PMO, KPI и внедрение изменений. Направления, выбор формата и подготовка к разбору.",
  alternates: {
    canonical: "/consulting"
  },
  openGraph: {
    title: "Консалтинг Дениса Михина",
    description:
      "Разбор управленческих ограничений, проектирование изменений, PMO, KPI, CRM, продажи, AI-трансформация и стратегические сессии.",
    url: `${SITE_URL}/consulting`
  }
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${SITE_URL}/consulting/#service`,
  name: "Консалтинг Дениса Михина",
  description: metadata.description,
  url: `${SITE_URL}/consulting/`,
  serviceType: "Управленческий консалтинг и корпоративные проекты",
  provider: {
    "@type": "Person",
    "@id": AUTHOR_ENTITY.id,
    name: AUTHOR_ENTITY.name,
    url: AUTHOR_ENTITY.url
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Направления консалтинга",
    itemListElement: CONSULTING_PRODUCTS.map((product) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: product.title,
        description: `${product.problem} ${product.result}`,
        provider: { "@id": AUTHOR_ENTITY.id }
      }
    }))
  }
};

export default function ConsultingPage(): JSX.Element {
  return (
    <div className="space-y-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema).replace(/</g, "\\u003c") }}
      />
      <PageBreadcrumbs items={[{ name: "Консалтинг", href: "/consulting/" }]} />
      <section className="relative overflow-hidden border border-slate-200 bg-white p-6 shadow-[0_24px_70px_rgba(9,22,43,0.08)] dark:border-slate-800 dark:bg-slate-900 md:p-8">
        <div className="pointer-events-none absolute inset-0 ambient-grid opacity-50" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-28 w-44 bg-brand/95 [clip-path:polygon(42%_0,100%_0,100%_100%,0_100%)]" />
        <div className="relative grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div>
            <p className="border-l-4 border-brand pl-3 text-xs font-black uppercase tracking-[0.18em] text-brand">
              Консалтинг и корпоративные проекты
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl font-black leading-[0.98] tracking-tight text-slate-950 dark:text-white md:text-6xl">
              Когда нужен не совет, а разбор системы
            </h1>
            <p className="mt-5 max-w-[66ch] text-base leading-8 text-slate-650 dark:text-slate-300 md:text-lg">
              Консалтинг нужен там, где проблема уже влияет на деньги, скорость, людей или управляемость:
              проекты буксуют, изменения не закрепляются, продажи проседают, а решения держатся на ручном контроле.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#products"
                className="bg-brand px-6 py-3 text-base font-black text-white transition hover:bg-brand-dark"
              >
                Смотреть направления
              </a>
              <TrackedLink
                href={TELEGRAM_CONSULT_URL}
                goal="consulting_contact_click"
                params={{ source: "hero" }}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-slate-300 bg-white px-6 py-3 text-base font-bold text-slate-950 transition hover:border-brand hover:text-brand dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              >
                Обсудить задачу
              </TrackedLink>
            </div>
          </div>

          <div className="grid gap-3">
            {[
              ["100 000 ₽+", "старт консалтинговых задач"],
              ["500 000 ₽+", "корпоративные проекты"],
              ["6", "направлений работы"],
              ["30 дней", "первый управленческий цикл"]
            ].map(([value, label]) => (
              <div key={label} className="border border-slate-200 bg-slate-950 p-5 text-white dark:border-slate-700">
                <p className="text-3xl font-black leading-none">{value}</p>
                <p className="mt-2 text-sm font-semibold leading-6 text-white/68">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="products" className="scroll-mt-28 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {CONSULTING_PRODUCTS.map((product) => (
          <article key={product.title} className="flex flex-col border border-slate-200 bg-white p-5 shadow-[0_18px_44px_rgba(9,22,43,0.06)] dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-2xl font-black tracking-tight text-slate-900">{product.title}</h2>
            <div className="mt-4 border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
              <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">Проблема</p>
              <p className="mt-2 text-sm leading-6 text-slate-700">{product.problem}</p>
            </div>
            <div className="mt-3 border border-brand/20 bg-brand/5 p-4">
              <p className="text-xs font-black uppercase tracking-[0.14em] text-brand">Результат</p>
              <p className="mt-2 text-sm leading-6 text-slate-700">{product.result}</p>
            </div>
            <div className="mt-auto pt-5">
              <TrackedLink
                href={TELEGRAM_CONSULT_URL}
                goal="consulting_contact_click"
                params={{ source: "product_card", direction: product.title }}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center rounded-lg border border-brand px-4 py-3 text-sm font-bold text-brand transition hover:bg-brand hover:text-white dark:text-blue-300"
              >
                Обсудить направление
                <span className="sr-only">: {product.title}</span>
              </TrackedLink>
            </div>
          </article>
        ))}
      </section>

      <section aria-labelledby="consulting-choice" className="border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 md:p-8">
        <h2 id="consulting-choice" className="text-2xl font-black md:text-3xl">С какой задачей обращаться</h2>
        <p className="mt-4 text-base leading-8">Управленческий консалтинг помогает разобрать повторяющуюся проблему на уровне целей, решений, ролей и процессов. Отправная точка — наблюдаемая ситуация, а не заранее выбранный инструмент. Внедрение CRM, KPI или ИИ имеет смысл, когда понятно, какое ограничение оно должно снять.</p>
        <div className="mt-5 grid gap-6 md:grid-cols-2">
          <div>
            <h3 className="text-lg font-bold">Проблема проходит через несколько функций</h3>
            <p className="mt-2 text-sm leading-7">Например, продажи обещают сроки, производство меняет приоритеты, а руководитель ежедневно разбирает конфликты. Здесь важно исследовать весь путь выполнения обязательства: кто принимает заказ, распределяет ресурсы и согласует изменения.</p>
          </div>
          <div>
            <h3 className="text-lg font-bold">Локальное исправление не удерживает результат</h3>
            <p className="mt-2 text-sm leading-7">Новый регламент или встреча временно помогают, затем возвращаются задержки и ручной контроль. В разборе стоит проверить не только исполнение, но и совместимость целей, полномочий, нагрузки и обратной связи.</p>
          </div>
        </div>
        <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">Это примеры ситуаций, а не описание клиентских кейсов. Если задача ограничена HR-процессом, начните с <Link href="/hr/" className="font-bold text-brand underline dark:text-blue-300">HR по подписке</Link>. Если нужно освоить метод и работать самостоятельно — с <Link href="/training/" className="font-bold text-brand underline dark:text-blue-300">программы обучения</Link>.</p>
      </section>

      <section aria-labelledby="consulting-scope" className="border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 md:p-8">
        <h2 id="consulting-scope" className="text-2xl font-black md:text-3xl">Что важно согласовать до начала проекта</h2>
        <div className="mt-5 grid gap-6 md:grid-cols-3">
          <div>
            <h3 className="text-lg font-bold">Границы диагностики</h3>
            <p className="mt-2 text-sm leading-7">Какой процесс рассматриваем, какие симптомы проверяем и какие данные доступны. Важно отделить наблюдаемые факты от предположений о причинах, чтобы не проектировать изменения под неподтверждённый диагноз.</p>
          </div>
          <div>
            <h3 className="text-lg font-bold">Результат работы</h3>
            <p className="mt-2 text-sm leading-7">В зависимости от задачи предметом работы могут быть карта процесса, распределение ответственности, правила приоритизации или план пилота. Конкретные материалы, сроки и критерии приёмки нужно согласовать для выбранного проекта.</p>
          </div>
          <div>
            <h3 className="text-lg font-bold">Участие команды</h3>
            <p className="mt-2 text-sm leading-7">Кто со стороны компании принимает решения, предоставляет данные и отвечает за внедрение. Рекомендация сама по себе не меняет работу: нужны полномочия, ресурсы и способ проверять результат после изменений.</p>
          </div>
        </div>
        <p className="mt-5 text-sm leading-7 text-slate-600 dark:text-slate-300">Указанные на странице суммы — стартовые ориентиры, а не одинаковый пакет для всех направлений. Объём, стоимость и формат определяются после уточнения задачи. Рост выручки или другой бизнес-показатель нельзя обещать без анализа исходных условий.</p>
      </section>

      <section className="border border-slate-200 bg-white p-6 shadow-[0_18px_44px_rgba(9,22,43,0.06)] dark:border-slate-800 dark:bg-slate-900 md:p-8">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-brand">Как начинается работа</p>
        <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
          Сначала диагностика, потом проект
        </h2>
        <p className="mt-4 max-w-4xl text-base leading-8 text-slate-700">
          Перед консалтингом важно понять, где настоящий ограничитель. Поэтому первый шаг - короткий разбор:
          контекст, симптомы, цена проблемы, текущая система решений и возможный формат работы.
        </p>
        <p className="mt-3 max-w-4xl text-base leading-8 text-slate-700 dark:text-slate-300">
          Для первого сообщения достаточно описать, что происходит, как часто повторяется проблема,
          на что она влияет и что уже пробовали изменить. Не присылайте персональные данные сотрудников
          или конфиденциальные документы: на старте достаточно обезличенного описания.
        </p>
        <TrackedLink
          href={TELEGRAM_CONSULT_URL}
          goal="consulting_contact_click"
          params={{ source: "diagnostic" }}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-brand"
        >
          Начать с разбора
        </TrackedLink>
      </section>

      <section aria-labelledby="consulting-approach" className="border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 md:p-8">
        <h2 id="consulting-approach" className="text-2xl font-black md:text-3xl">Познакомиться с подходом Дениса Михина</h2>
        <p className="mt-4 text-base leading-8">В основе подхода — рассмотрение бизнеса как системы взаимосвязанных решений. На <Link href="/about/" className="font-bold text-brand underline dark:text-blue-300">странице автора</Link> собраны направления работы. В журнале можно изучить <Link href="/hub/systems-thinking/" className="font-bold text-brand underline dark:text-blue-300">системное мышление</Link> и <Link href="/hub/management/" className="font-bold text-brand underline dark:text-blue-300">управление бизнесом</Link>, прежде чем обсуждать собственную задачу.</p>
      </section>

      <AiCitationBlock
        canonicalPath="/consulting"
        summary="Раздел «Консалтинг» является страницей услуг Дениса Михина по управлению бизнесом, PMO, KPI, CRM, продажам, организационным изменениям, AI-трансформации и стратегическим сессиям."
        topics={["консалтинг", "PMO", "KPI", "CRM", "AI-трансформация"]}
      />
    </div>
  );
}
