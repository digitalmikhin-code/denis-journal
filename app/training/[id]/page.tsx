import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { ProgramStepikCta } from "@/components/program-stepik-cta";
import { buildStepikUtmUrl, getCourseIdFromUrl } from "@/lib/analytics";
import {
  SITE_NAME,
  SITE_URL,
  TELEGRAM_CHANNEL_URL,
  TELEGRAM_CONSULT_URL
} from "@/lib/constants";
import { getProgramPage, getProgramPageById, getProgramPath } from "@/lib/program-pages";
import { STEPIK_COURSES, type StepikCourse } from "@/lib/stepik-courses";

type Props = {
  params: { id: string };
};

export function generateStaticParams(): Array<{ id: string }> {
  return STEPIK_COURSES.map((course) => ({ id: String(course.id) }));
}

export function generateMetadata({ params }: Props): Metadata {
  const program = getProgramPageById(params.id);
  if (!program) {
    return {};
  }

  return {
    title: `${program.course.title} | ${SITE_NAME}`,
    description: program.course.summary,
    alternates: {
      canonical: program.path
    },
    openGraph: {
      title: program.course.title,
      description: program.course.summary,
      url: `${SITE_URL}${program.path}`,
      type: "article"
    },
    robots: {
      index: true,
      follow: true
    }
  };
}

export default function ProgramPage({ params }: Props): JSX.Element {
  const program = getProgramPageById(params.id);
  if (!program) {
    notFound();
  }

  const course = program.course;
  const courseId = getCourseIdFromUrl(course.url);
  const stepikHref = buildStepikUtmUrl(course.url, {
    medium: "course_catalog",
    campaign: "program_page_to_stepik",
    content: course.title
  });
  const schema = buildCourseSchema(course, program.path);

  return (
    <article className="space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <section className="relative overflow-hidden rounded-[2.5rem] border border-slate-200 bg-slate-950 p-7 text-white shadow-[0_34px_82px_rgba(15,23,42,0.22)] md:p-10">
        <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-[#f2c14e]/20 blur-3xl" />
        <div className="relative grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div>
            <Link
              href="/training"
              className="rounded-full border border-white/15 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-white/60 transition hover:border-white/40 hover:text-white"
            >
              Все программы
            </Link>
            <h1 className="mt-5 max-w-4xl text-5xl font-black leading-[0.95] tracking-tight md:text-7xl">
              {course.title}
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-white/72 md:text-lg">
              {course.summary}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <ProgramStepikCta
                href={stepikHref}
                courseTitle={course.title}
                params={{
                  course_id: courseId,
                  course_title: course.title,
                  course_url: course.url,
                  source: "program_page"
                }}
                className="rounded-2xl bg-white px-6 py-3 text-base font-black text-slate-950 transition hover:-translate-y-0.5"
              />
              <Link
                href="/solutions"
                className="rounded-2xl border border-white/20 px-6 py-3 text-base font-bold text-white transition hover:border-white/45"
              >
                Посмотреть маршрут развития
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/8 p-5 backdrop-blur">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-white/45">Коротко</p>
            <div className="mt-4 grid gap-3">
              <ProgramFact label="Уровень" value={course.level} />
              <ProgramFact label="Длительность" value={course.duration} />
              <ProgramFact label="Формат" value="онлайн на Stepik" />
              <ProgramFact label="Стоимость" value={course.price} />
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
        <ContentBlock eyebrow="Проблема" title="Когда стоит проходить эту программу">
          <div className="grid gap-3">
            {program.problem.map((item) => (
              <ChecklistItem key={item}>{item}</ChecklistItem>
            ))}
          </div>
        </ContentBlock>

        <ContentBlock eyebrow="Для кого" title="Кому подойдет">
          <div className="grid gap-3">
            {program.audience.map((item) => (
              <ChecklistItem key={item}>{item}</ChecklistItem>
            ))}
            <div className="rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-650">
              Уровень подготовки: <span className="font-bold text-slate-950">{course.level}</span>
            </div>
          </div>
        </ContentBlock>
      </section>

      <ContentBlock eyebrow="Результаты" title="Что сможет пользователь после завершения">
        <div className="grid gap-3 md:grid-cols-2">
          {program.results.map((result) => (
            <ChecklistItem key={result}>{result}</ChecklistItem>
          ))}
        </div>
      </ContentBlock>

      <section id="skills" className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.05)] md:p-8">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">Навыки</p>
        <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">Какие навыки будут развиты</h2>
        <div className="mt-6 grid gap-3 md:grid-cols-3">
          {program.skills.map((skill) => (
            <Link
              key={skill.title}
              href={skill.href}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm font-bold text-slate-800 transition hover:-translate-y-0.5 hover:border-slate-400 hover:bg-white"
            >
              {skill.title}
              <span className="mt-2 block text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                Страница навыка скоро
              </span>
            </Link>
          ))}
        </div>
      </section>

      <ContentBlock eyebrow="Программа обучения" title="Компактная структура модулей">
        <div className="space-y-3">
          {program.modules.map((module, index) => (
            <details
              key={module.title}
              className="group rounded-2xl border border-slate-200 bg-slate-50 p-4 open:bg-white"
            >
              <summary className="cursor-pointer list-none">
                <span className="flex items-start justify-between gap-4">
                  <span>
                    <span className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">
                      Модуль {index + 1}
                    </span>
                    <span className="mt-1 block text-lg font-black text-slate-950">{module.title}</span>
                    <span className="mt-1 block text-sm leading-6 text-slate-600">{module.summary}</span>
                  </span>
                  <span className="rounded-full bg-white px-3 py-1 text-sm font-black text-slate-500 group-open:bg-slate-950 group-open:text-white">
                    +
                  </span>
                </span>
              </summary>
              <div className="mt-4 grid gap-2 border-t border-slate-200 pt-4 md:grid-cols-3">
                {module.items.map((item) => (
                  <p key={item} className="rounded-xl bg-slate-100 p-3 text-sm leading-6 text-slate-650">
                    {item}
                  </p>
                ))}
              </div>
            </details>
          ))}
        </div>
      </ContentBlock>

      {program.extras.length > 0 ? (
        <ContentBlock eyebrow="Дополнительно" title="Что входит кроме уроков">
          <div className="grid gap-3 md:grid-cols-3">
            {program.extras.map((extra) => (
              <ChecklistItem key={extra}>{extra}</ChecklistItem>
            ))}
          </div>
        </ContentBlock>
      ) : null}

      {program.reviews.length > 0 ? (
        <ContentBlock eyebrow="Отзывы" title="Что отмечают слушатели">
          <div className="grid gap-4 md:grid-cols-2">
            {program.reviews.map((review) => (
              <article key={`${review.name}-${review.problem}`} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-lg font-black text-slate-950">{review.name}</p>
                <p className="mt-1 text-sm text-slate-500">{review.role}</p>
                <p className="mt-4 text-xs font-black uppercase tracking-[0.16em] text-slate-400">
                  Проблема
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-650">{review.problem}</p>
                <p className="mt-4 text-xs font-black uppercase tracking-[0.16em] text-slate-400">
                  Результат
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-650">{review.result}</p>
              </article>
            ))}
          </div>
        </ContentBlock>
      ) : null}

      <ContentBlock eyebrow="Следующий этап" title="Что рекомендуется дальше">
        <div className="grid gap-4 md:grid-cols-3">
          {program.nextCourses.map((nextCourse) => (
            <NextCourseCard key={nextCourse.id} course={nextCourse} />
          ))}
        </div>
      </ContentBlock>

      <section className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
        <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.05)] md:p-8">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">Автор программы</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">Денис Михин</h2>
          <p className="mt-4 text-sm leading-7 text-slate-650">
            Автор образовательной экосистемы для руководителей, Project Manager, Product Manager и специалистов,
            которые растут в управление. Соединяет системное мышление, практику изменений и прикладные инструменты.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href={TELEGRAM_CHANNEL_URL} target="_blank" rel="noopener noreferrer" className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-bold text-white">
              Telegram
            </Link>
            <Link href="/articles" className="rounded-2xl border border-slate-300 px-5 py-3 text-sm font-bold text-slate-950">
              Журнал
            </Link>
            <Link href="/training" className="rounded-2xl border border-slate-300 px-5 py-3 text-sm font-bold text-slate-950">
              Все программы
            </Link>
          </div>
        </section>

        <section className="rounded-[2rem] border border-[#d8c7a5] bg-[#f7ead2] p-6 text-slate-950 md:p-8">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">Telegram</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight">Получайте новые статьи, шаблоны и практические материалы</h2>
          <p className="mt-4 text-sm leading-7 text-slate-700">
            В канале выходят разборы по управлению, ИИ, Agile, проектам и продуктовой работе.
          </p>
          <Link
            href={TELEGRAM_CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex rounded-2xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
          >
            Перейти в Telegram
          </Link>
        </section>
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 md:p-8">
        <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">Маршрут</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">
              Нужна программа под вашу задачу?
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-650">
              Если задача шире одного курса, можно перейти к рабочим задачам или обсудить персональный маршрут.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
            <Link href="/solutions" className="rounded-2xl bg-slate-950 px-5 py-3 text-center text-sm font-bold text-white">
              Открыть рабочие задачи
            </Link>
            <Link href={TELEGRAM_CONSULT_URL} target="_blank" rel="noopener noreferrer" className="rounded-2xl border border-slate-300 px-5 py-3 text-center text-sm font-bold text-slate-950">
              Обсудить обучение
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}

function ProgramFact({ label, value }: { label: string; value: string }): JSX.Element {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/8 p-4">
      <p className="text-[0.68rem] font-black uppercase tracking-[0.16em] text-white/40">{label}</p>
      <p className="mt-1 font-bold text-white">{value}</p>
    </div>
  );
}

function ContentBlock({
  eyebrow,
  title,
  children
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
}): JSX.Element {
  return (
    <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.05)] md:p-8">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">{eyebrow}</p>
      <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">{title}</h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}

function ChecklistItem({ children }: { children: ReactNode }): JSX.Element {
  return (
    <div className="flex gap-3 rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-650">
      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-950 text-[0.65rem] font-black text-white">
        ✓
      </span>
      <span>{children}</span>
    </div>
  );
}

function NextCourseCard({ course }: { course: StepikCourse }): JSX.Element {
  const program = getProgramPage(course);

  return (
    <Link
      href={getProgramPath(course)}
      className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-1 hover:border-slate-400 hover:bg-white"
    >
      <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">{course.level}</p>
      <h3 className="mt-3 text-xl font-black leading-tight text-slate-950">{course.title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-650">{program.problem[0]}</p>
      <span className="mt-5 inline-flex text-sm font-black text-slate-950">Открыть программу →</span>
    </Link>
  );
}

function buildCourseSchema(course: StepikCourse, path: string): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.title,
    description: course.summary,
    url: `${SITE_URL}${path}`,
    provider: {
      "@type": "Person",
      name: "Денис Михин",
      url: SITE_URL
    },
    courseMode: "online",
    educationalLevel: course.level,
    timeRequired: course.duration,
    offers: {
      "@type": "Offer",
      price: course.price,
      url: course.url,
      availability: "https://schema.org/InStock"
    }
  };
}
