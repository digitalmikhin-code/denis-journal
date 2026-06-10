import type { Metadata } from "next";
import Link from "next/link";
import { STEPIK_TEACH_URL, TELEGRAM_CONSULT_URL } from "@/lib/constants";
import { COURSE_CATEGORIES, STEPIK_COURSES, STEPIK_PROFILE_FACTS, type StepikCourse } from "@/lib/stepik-courses";

export const metadata: Metadata = {
  title: "Курсы Дениса Михина",
  description:
    "Витрина курсов Дениса Михина по управлению, Agile, Scrum, Kanban, OKR, системному мышлению, продуктам, SAFe, ИИ и промт-инжинирингу.",
  alternates: {
    canonical: "/training"
  }
};

const audienceBlocks = [
  "Собственникам и руководителям, которым нужно усилить управляемость, фокус и качество решений.",
  "Project, Product и Agile-менеджерам, которые хотят работать не по шаблонам, а через систему.",
  "HR, L&D и лидерам изменений, которые внедряют новые подходы без хаоса и сопротивления.",
  "Специалистам, которые хотят расти в сторону управления, продукта, ИИ или экспертности."
];

const resultBlocks = [
  "Структура мышления: как видеть не отдельные задачи, а систему, связи и последствия решений.",
  "Практические инструменты: Kanban, Scrum, OKR, SAFe, промты, продуктовые и управленческие рамки.",
  "Переход к действию: каждый курс помогает применить материал в работе, а не просто изучить теорию.",
  "Понятный следующий шаг: после курса можно перейти к диагностике, консультации или более глубокому направлению."
];

const faq = [
  {
    question: "Это отдельные курсы или образовательная система?",
    answer:
      "Курсы собраны как линейка: управление, Agile, продукт, OKR, ИИ и экспертность дополняют друг друга. Человек может начать с одной боли и постепенно собрать целостную систему управления."
  },
  {
    question: "Если я не знаю, какой курс выбрать?",
    answer:
      "Начните с блока ниже: можно выбрать маршрут по задаче или написать Денису, чтобы быстро подобрать первый курс под вашу ситуацию."
  },
  {
    question: "Данные по курсам актуальны?",
    answer: `Фактические данные взяты из публичного профиля Stepik ${STEPIK_PROFILE_FACTS.sourceDate}. Если Stepik не показывает цену, рейтинг или длительность, на странице это не додумывается.`
  },
  {
    question: "Есть ли консультация после курса?",
    answer:
      "Да. Если после обучения нужна адаптация под компанию, команду или личную карьерную задачу, можно перейти к консультации и разобрать контекст 1:1."
  }
];

const routeCards = [
  {
    title: "Нужно навести порядок в управлении",
    text: "Начните с управления задачами или эффективного руководителя, затем переходите к проектам и OKR.",
    href: "#management"
  },
  {
    title: "Нужно разобраться с Agile",
    text: "Выберите базу по Agile, Scrum и Kanban, а затем углубляйтесь в Kanban PRO или Agile Project Manager.",
    href: "#agile-scrum-kanban"
  },
  {
    title: "Нужно применять ИИ в работе",
    text: "Начните с промт-инжиниринга или ИИ для менеджеров, затем переходите к AI-трансформации.",
    href: "#ai-prompting"
  }
];

function formatLearners(value: number | null): string {
  if (value === null) return "информация не указана";
  return new Intl.NumberFormat("ru-RU").format(value);
}

function getCoursesByCategory(category: StepikCourse["category"]): StepikCourse[] {
  return STEPIK_COURSES.filter((course) => course.category === category);
}

export default function TrainingPage(): JSX.Element {
  const paidCourses = STEPIK_COURSES.filter((course) => course.price.includes("₽")).length;
  const freeCourses = STEPIK_COURSES.length - paidCourses;

  return (
    <div className="space-y-12">
      <section className="relative overflow-hidden rounded-[2.5rem] border border-slate-200 bg-[#f6f1e8] px-6 py-10 shadow-[0_28px_80px_rgba(15,23,42,0.08)] md:px-10 md:py-14">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#ddc7a2] opacity-60 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-52 w-52 rounded-full bg-[#b7d3ca] opacity-50 blur-3xl" />
        <div className="relative grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
              Витрина курсов
            </p>
            <h1 className="mt-4 max-w-4xl text-5xl font-black leading-[0.95] tracking-tight text-slate-950 md:text-7xl">
              Курсы как система управленческого роста
            </h1>
            <p className="mt-6 max-w-3xl text-xl leading-8 text-slate-700 md:text-2xl md:leading-9">
              Не случайные ссылки на Stepik, а образовательная карта Дениса Михина: управление,
              Agile, OKR, продукт, системное мышление, SAFe, ИИ и промт-инжиниринг.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="#courses"
                className="rounded-2xl bg-slate-950 px-6 py-3 text-base font-bold text-white transition hover:bg-slate-800"
              >
                Выбрать курс
              </Link>
              <Link
                href={TELEGRAM_CONSULT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl border border-slate-300 bg-white/80 px-6 py-3 text-base font-semibold text-slate-900 transition hover:border-slate-500"
              >
                Не знаю, с чего начать
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/80 bg-white/75 p-5 shadow-[0_22px_60px_rgba(15,23,42,0.08)] backdrop-blur">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
              Анализ Stepik
            </p>
            <div className="mt-5 grid grid-cols-2 gap-3">
              {[
                [STEPIK_PROFILE_FACTS.coursesCount, "курса в профиле"],
                [STEPIK_PROFILE_FACTS.lessonsCount, "уроков"],
                [STEPIK_PROFILE_FACTS.followersCount, "подписчиков"],
                [STEPIK_PROFILE_FACTS.certificatesCount, "сертификата"]
              ].map(([value, label]) => (
                <div key={label} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-3xl font-black text-slate-950">{value}</p>
                  <p className="mt-1 text-sm text-slate-600">{label}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 rounded-2xl bg-[#e8f4ef] p-4 text-sm leading-6 text-slate-700">
              В профиле Stepik указано: {STEPIK_PROFILE_FACTS.studentsText} прошли программы и
              используют подходы в работе. Источник: публичный профиль автора.
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-3">
        <InfoCard title="Почему у Дениса" text="Курсы построены вокруг практики изменений: как навести порядок, связать цели с работой, управлять потоком и принимать решения в сложных системах." />
        <InfoCard title="Как устроена линейка" text={`Сейчас в витрине ${STEPIK_COURSES.length} курса: ${paidCourses} платных и ${freeCourses} бесплатных или без указанной цены на Stepik.`} />
        <InfoCard title="Честность данных" text="Если Stepik не показывает длительность, рейтинг, отзывы или цену, в карточке указано: информация не указана. Без украшательства." />
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.05)] md:p-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Категории
            </p>
            <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950 md:text-4xl">
              Образовательная карта
            </h2>
          </div>
          <Link href={STEPIK_TEACH_URL} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-slate-700 underline underline-offset-4">
            Открыть профиль Stepik
          </Link>
        </div>
        <div className="mt-6 grid gap-3 md:grid-cols-3">
          {COURSE_CATEGORIES.map((category) => (
            <a
              key={category.id}
              href={`#${category.id}`}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:-translate-y-0.5 hover:border-slate-400 hover:bg-white"
            >
              <p className="font-bold text-slate-950">{category.title}</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">{category.note}</p>
              <p className="mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                {getCoursesByCategory(category.id).length} курса
              </p>
            </a>
          ))}
        </div>
      </section>

      <section id="courses" className="space-y-8">
        {COURSE_CATEGORIES.map((category) => {
          const courses = getCoursesByCategory(category.id);
          if (courses.length === 0) return null;

          return (
            <section key={category.id} id={category.id} className="scroll-mt-24 space-y-4">
              <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                    {courses.length} курса
                  </p>
                  <h2 className="text-3xl font-black tracking-tight text-slate-950">{category.title}</h2>
                  <p className="mt-2 max-w-3xl text-base leading-7 text-slate-650">{category.note}</p>
                </div>
              </div>
              <div className="grid gap-5 lg:grid-cols-2">
                {courses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            </section>
          );
        })}
      </section>

      <section className="grid gap-5 md:grid-cols-2">
        <Panel title="Для кого эти курсы" items={audienceBlocks} />
        <Panel title="Какой результат получает слушатель" items={resultBlocks} />
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-[#101820] p-6 text-white shadow-[0_24px_70px_rgba(15,23,42,0.18)] md:p-8">
        <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/55">
              Не знаете, с чего начать?
            </p>
            <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">
              Выберите маршрут, а не просто курс
            </h2>
            <p className="mt-4 text-base leading-7 text-white/72">
              Витрина должна вести человека по логике задачи: сначала понять проблему, затем выбрать
              базу, потом углубиться или обсудить внедрение.
            </p>
          </div>
          <div className="grid gap-3">
            {routeCards.map((card) => (
              <Link key={card.title} href={card.href} className="rounded-2xl border border-white/10 bg-white/8 p-4 transition hover:bg-white/14">
                <p className="font-bold text-white">{card.title}</p>
                <p className="mt-2 text-sm leading-6 text-white/68">{card.text}</p>
              </Link>
            ))}
            <Link
              href={TELEGRAM_CONSULT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl bg-[#f2c14e] px-5 py-4 text-center font-bold text-slate-950 transition hover:bg-[#ffd76a]"
            >
              Подобрать курс с Денисом
            </Link>
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 md:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          Частые вопросы
        </p>
        <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">Перед покупкой</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {faq.map((item) => (
            <article key={item.question} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <h3 className="text-lg font-bold text-slate-950">{item.question}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-650">{item.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-[2rem] border border-[#d8c7a5] bg-[#f7ead2] p-6 text-slate-950 md:p-8">
        <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              CTA
            </p>
            <h2 className="mt-2 text-3xl font-black tracking-tight md:text-4xl">
              Начните с курса, который решает вашу ближайшую управленческую задачу
            </h2>
            <p className="mt-3 max-w-3xl text-base leading-7 text-slate-700">
              А если задача сложнее одного курса, переходите к консультации: можно собрать маршрут
              обучения и внедрения под команду, продукт или бизнес-систему.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
            <Link href={STEPIK_TEACH_URL} target="_blank" rel="noopener noreferrer" className="rounded-2xl bg-slate-950 px-6 py-3 text-center font-bold text-white transition hover:bg-slate-800">
              Перейти на Stepik
            </Link>
            <Link href={TELEGRAM_CONSULT_URL} target="_blank" rel="noopener noreferrer" className="rounded-2xl border border-slate-300 bg-white px-6 py-3 text-center font-bold text-slate-950 transition hover:border-slate-500">
              Обсудить обучение
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function InfoCard({ title, text }: { title: string; text: string }): JSX.Element {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_14px_38px_rgba(15,23,42,0.05)]">
      <h2 className="text-xl font-black tracking-tight text-slate-950">{title}</h2>
      <p className="mt-3 text-sm leading-7 text-slate-650">{text}</p>
    </article>
  );
}

function CourseCard({ course }: { course: StepikCourse }): JSX.Element {
  return (
    <article className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
      <div className="grid gap-0 md:grid-cols-[170px_1fr]">
        <div className="relative min-h-44 bg-slate-100">
          <img src={course.cover} alt="" className="h-full w-full object-cover" loading="lazy" />
        </div>
        <div className="p-5">
          <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.12em]">
            <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-600">{course.level}</span>
            <span className="rounded-full bg-[#edf7f1] px-3 py-1 text-[#23704a]">{course.price}</span>
            <span className="rounded-full bg-[#f7efe1] px-3 py-1 text-[#8a5c13]">{course.modules}</span>
          </div>
          <h3 className="mt-4 text-2xl font-black leading-tight tracking-tight text-slate-950">
            {course.title}
          </h3>
          <p className="mt-3 text-sm leading-7 text-slate-650">{course.summary}</p>
        </div>
      </div>
      <div className="grid gap-4 border-t border-slate-100 p-5 md:grid-cols-2">
        <Fact title="Для кого" text={course.forWhom} />
        <Fact title="Результат" text={course.result} />
      </div>
      <div className="border-t border-slate-100 p-5">
        <p className="text-sm font-bold text-slate-950">Чему научится</p>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {course.gives.map((item) => (
            <p key={item} className="rounded-xl bg-slate-50 p-3 text-sm leading-6 text-slate-650">
              {item}
            </p>
          ))}
        </div>
        <div className="mt-5 grid gap-2 text-sm text-slate-600 sm:grid-cols-4">
          <Meta label="Длительность" value={course.duration} />
          <Meta label="Ученики" value={formatLearners(course.learners)} />
          <Meta label="Отзывы" value={course.reviews} />
          <Meta label="Статус" value={course.status} />
        </div>
        <Link
          href={course.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex rounded-2xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
        >
          Перейти к курсу
        </Link>
      </div>
    </article>
  );
}

function Fact({ title, text }: { title: string; text: string }): JSX.Element {
  return (
    <div className="rounded-2xl bg-slate-50 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">{title}</p>
      <p className="mt-2 text-sm leading-6 text-slate-650">{text}</p>
    </div>
  );
}

function Meta({ label, value }: { label: string; value: string }): JSX.Element {
  return (
    <div className="rounded-xl border border-slate-200 p-3">
      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-slate-400">{label}</p>
      <p className="mt-1 font-semibold text-slate-800">{value}</p>
    </div>
  );
}

function Panel({ title, items }: { title: string; items: string[] }): JSX.Element {
  return (
    <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.05)] md:p-8">
      <h2 className="text-3xl font-black tracking-tight text-slate-950">{title}</h2>
      <div className="mt-5 grid gap-3">
        {items.map((item) => (
          <p key={item} className="rounded-2xl bg-slate-50 p-4 text-base leading-7 text-slate-700">
            {item}
          </p>
        ))}
      </div>
    </section>
  );
}
