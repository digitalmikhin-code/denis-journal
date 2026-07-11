import type { Metadata } from "next";
import Link from "next/link";
import { TrackedLink } from "@/components/tracked-link";
import { buildStepikUtmUrl, getCourseIdFromUrl } from "@/lib/analytics";
import { STEPIK_TEACH_URL, TELEGRAM_CONSULT_URL } from "@/lib/constants";
import { getProgramPath } from "@/lib/program-pages";
import { COURSE_CATEGORIES, STEPIK_COURSES, STEPIK_PROFILE_FACTS, type StepikCourse } from "@/lib/stepik-courses";

export const metadata: Metadata = {
  title: "Курсы Дениса Михина",
  description:
    "Краткая витрина курсов Дениса Михина по управлению, Agile, Scrum, Kanban, OKR, системному мышлению, продуктам, SAFe, ИИ и промт-инжинирингу.",
  alternates: {
    canonical: "/training"
  }
};

function getCoursesByCategory(category: StepikCourse["category"]): StepikCourse[] {
  return STEPIK_COURSES.filter((course) => course.category === category);
}

function compactText(value: string, maxLength = 170): string {
  const normalized = value.replace(/\s+/g, " ").trim();
  if (normalized.length <= maxLength) {
    return normalized;
  }

  const clipped = normalized.slice(0, maxLength);
  const sentenceEnd = Math.max(clipped.lastIndexOf("."), clipped.lastIndexOf("!"), clipped.lastIndexOf("?"));
  if (sentenceEnd > 80) {
    return clipped.slice(0, sentenceEnd + 1);
  }

  const lastSpace = clipped.lastIndexOf(" ");
  return `${clipped.slice(0, lastSpace > 80 ? lastSpace : maxLength).trim()}...`;
}

function formatLearners(value: number | null): string {
  if (value === null) return "данные Stepik";
  return new Intl.NumberFormat("ru-RU").format(value);
}

export default function TrainingPage(): JSX.Element {
  const paidCourses = STEPIK_COURSES.filter((course) => course.price.includes("₽")).length;
  const freeCourses = STEPIK_COURSES.length - paidCourses;

  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden border border-slate-200 bg-white p-6 shadow-[0_24px_70px_rgba(9,22,43,0.08)] dark:border-slate-800 dark:bg-slate-900 md:p-8">
        <div className="pointer-events-none absolute inset-0 ambient-grid opacity-50" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-36 w-64 bg-[linear-gradient(135deg,transparent_0%,transparent_42%,rgba(11,77,186,0.14)_42%,rgba(11,77,186,0.14)_68%,rgba(8,46,115,0.9)_68%)]" />
        <div className="relative max-w-4xl">
          <p className="border-l-4 border-brand pl-3 text-xs font-semibold uppercase text-brand">
            Курсы Дениса Михина
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-black uppercase leading-[1.02] text-slate-950 dark:text-slate-50 md:text-6xl">
            Лаконичная карта обучения
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-slate-700 dark:text-slate-300 md:text-lg">
            Короткая витрина без перегруза: выберите направление, посмотрите название курса и быстро поймите,
            для какого навыка или рабочей задачи он нужен.
          </p>
        </div>
      </section>

      <section className="grid gap-3 border border-slate-200 bg-white p-4 shadow-[0_14px_36px_rgba(9,22,43,0.05)] dark:border-slate-800 dark:bg-slate-900 md:grid-cols-4">
        <Stat value={String(STEPIK_COURSES.length)} label="курса в каталоге" />
        <Stat value={String(paidCourses)} label="платных программ" />
        <Stat value={String(freeCourses)} label="бесплатных или без цены" />
        <Stat value={STEPIK_PROFILE_FACTS.studentsText} label="прошли программы" />
      </section>

      <section className="border border-slate-200 bg-white p-4 shadow-[0_14px_36px_rgba(9,22,43,0.05)] dark:border-slate-800 dark:bg-slate-900 md:p-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase text-slate-500">Направления</p>
            <h2 className="mt-1 text-2xl font-black uppercase text-slate-950 dark:text-slate-50">Быстрая навигация</h2>
          </div>
          <Link
            href={STEPIK_TEACH_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-bold text-brand underline underline-offset-4"
          >
            Профиль Stepik
          </Link>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {COURSE_CATEGORIES.map((category) => {
            const count = getCoursesByCategory(category.id).length;
            if (count === 0) return null;

            return (
              <a
                key={category.id}
                href={`#${category.id}`}
                className="border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-bold text-slate-700 transition hover:border-brand hover:bg-white hover:text-brand dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
              >
                {category.title} · {count}
              </a>
            );
          })}
        </div>
      </section>

      <section id="courses" className="space-y-8">
        {COURSE_CATEGORIES.map((category) => {
          const courses = getCoursesByCategory(category.id);
          if (courses.length === 0) return null;

          return (
            <section key={category.id} id={category.id} className="scroll-mt-28 space-y-4">
              <div className="border-l-4 border-brand pl-4">
                <p className="text-xs font-semibold uppercase text-slate-500">{courses.length} курса</p>
                <h2 className="mt-1 text-3xl font-black uppercase text-slate-950 dark:text-slate-50">
                  {category.title}
                </h2>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600 dark:text-slate-300">
                  {category.note}
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {courses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            </section>
          );
        })}
      </section>

      <section className="border border-slate-200 bg-white p-6 shadow-[0_18px_44px_rgba(9,22,43,0.06)] dark:border-slate-800 dark:bg-slate-900 md:p-8">
        <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="text-xs font-semibold uppercase text-brand">Не знаете, что выбрать?</p>
            <h2 className="mt-2 text-3xl font-black uppercase text-slate-950 dark:text-slate-50">
              Начните не с курса, а с задачи
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600 dark:text-slate-300">
              Если непонятно, какой курс подходит, можно коротко описать ситуацию и собрать первый шаг под вашу роль,
              команду или карьерную цель.
            </p>
          </div>
          <Link
            href={TELEGRAM_CONSULT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-brand px-6 py-3 text-center text-sm font-bold text-white transition hover:bg-brand-dark"
          >
            Подобрать маршрут
          </Link>
        </div>
      </section>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }): JSX.Element {
  const compactValue = value.length > 12;

  return (
    <div className="border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-950">
      <p className={`${compactValue ? "text-lg leading-tight" : "text-2xl"} font-black text-slate-950 dark:text-slate-50`}>
        {value}
      </p>
      <p className="mt-1 text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">{label}</p>
    </div>
  );
}

function CourseCard({ course }: { course: StepikCourse }): JSX.Element {
  const courseId = getCourseIdFromUrl(course.url);
  const courseHref = buildStepikUtmUrl(course.url, {
    medium: "course_catalog",
    campaign: "compact_catalog_to_course",
    content: course.title
  });

  return (
    <article className="flex min-h-[18rem] flex-col justify-between border border-slate-200 bg-white p-5 shadow-[0_14px_34px_rgba(9,22,43,0.05)] transition hover:-translate-y-0.5 hover:border-brand dark:border-slate-800 dark:bg-slate-900">
      <div>
        <div className="flex flex-wrap gap-2 text-[0.68rem] font-bold uppercase text-slate-500">
          <span className="border border-slate-200 bg-slate-50 px-2.5 py-1 dark:border-slate-700 dark:bg-slate-950">
            {course.level}
          </span>
          <span className="border border-blue-100 bg-blue-50 px-2.5 py-1 text-brand dark:border-slate-700 dark:bg-slate-950">
            {formatLearners(course.learners)}
          </span>
        </div>
        <h3 className="mt-4 text-xl font-black leading-tight text-slate-950 dark:text-slate-50">
          {course.title}
        </h3>
        <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
          {compactText(course.summary)}
        </p>
      </div>

      <div className="mt-5 space-y-4">
        <div className="grid grid-cols-2 gap-2 border-t border-slate-200 pt-4 text-xs text-slate-500 dark:border-slate-800">
          <span>{course.modules}</span>
          <span className="text-right">{course.price}</span>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href={getProgramPath(course)}
            className="border border-slate-300 bg-white px-3 py-2 text-sm font-bold text-slate-900 transition hover:border-brand hover:text-brand dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
          >
            Подробнее
          </Link>
          <TrackedLink
            href={courseHref}
            goal="stepik_click"
            params={{
              course_id: courseId,
              course_title: course.title,
              course_url: course.url,
              source: "compact_course_catalog"
            }}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-brand px-3 py-2 text-sm font-bold text-white transition hover:bg-brand-dark"
          >
            Stepik
          </TrackedLink>
        </div>
      </div>
    </article>
  );
}
