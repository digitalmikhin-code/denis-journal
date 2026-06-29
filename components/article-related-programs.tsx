import Link from "next/link";
import { TrackedLink } from "@/components/tracked-link";
import { buildStepikUtmUrl, getCourseIdFromUrl } from "@/lib/analytics";
import type { StepikCourse } from "@/lib/stepik-courses";

type ArticleRelatedProgramsProps = {
  articleTitle: string;
  courses: StepikCourse[];
};

export function ArticleRelatedPrograms({
  articleTitle,
  courses
}: ArticleRelatedProgramsProps): JSX.Element | null {
  const visibleCourses = courses.slice(0, 3);

  if (visibleCourses.length === 0) {
    return null;
  }

  return (
    <section className="space-y-4">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
          Связанные программы
        </p>
        <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950 dark:text-slate-50">
          Продолжить обучение по теме
        </h2>
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        {visibleCourses.map((course) => {
          const courseId = getCourseIdFromUrl(course.url);
          const href = buildStepikUtmUrl(course.url, {
            medium: "article",
            campaign: "article_related_programs",
            content: course.title
          });

          return (
            <article
              key={course.id}
              className="rounded-[1.35rem] border border-slate-200 bg-white p-5 shadow-[0_14px_32px_rgba(15,23,42,0.05)] dark:border-slate-800 dark:bg-slate-900"
            >
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                {course.level}
              </span>
              <h3 className="mt-4 text-xl font-black leading-tight tracking-tight text-slate-950 dark:text-slate-50">
                {course.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{course.result}</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href="/training"
                  className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-bold text-slate-900 transition hover:border-slate-600 dark:border-slate-700 dark:text-slate-100"
                >
                  Подробнее
                </Link>
                <TrackedLink
                  href={href}
                  goal="stepik_click"
                  params={{
                    course_id: courseId,
                    course_title: course.title,
                    course_url: course.url,
                    source: "article_related_programs",
                    article_title: articleTitle
                  }}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-950"
                >
                  Начать обучение
                </TrackedLink>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
