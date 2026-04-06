"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { TELEGRAM_CONSULT_URL, YANDEX_METRIKA_ID } from "@/lib/constants";

type OptionKey = "A" | "B" | "C" | "D";
type LevelKey = "imitation" | "processes" | "adaptation" | "transformation";

type QuizQuestion = {
  id: number;
  text: string;
  options: Record<OptionKey, string>;
};

type LevelResult = {
  key: LevelKey;
  title: string;
  scoreRange: string;
  summary: string;
  insights: string[];
  recommendation: string;
  ctaLabel: string;
  ctaHref: string;
};

const OPTION_SCORES: Record<OptionKey, number> = { A: 1, B: 2, C: 3, D: 4 };
const COURSE_URL = "https://stepik.org/course/255881/promo";

const QUESTIONS: QuizQuestion[] = [
  { id: 1, text: "В компании объявили Agile-трансформацию, но решения и цели остаются прежними. Как оценишь ситуацию?", options: { A: "Это нормальный первый этап", B: "Нужно лучше внедрить Agile-практики", C: "Со временем это перерастёт в изменения", D: "Это имитация трансформации без изменения системы" } },
  { id: 2, text: "Внедрили Agile, но KPI и оценка эффективности не изменились. Что произойдёт?", options: { A: "Команды начнут работать быстрее", B: "Agile сам по себе улучшит процессы", C: "Будут частичные улучшения", D: "Возникнет конфликт новой модели со старой системой управления" } },
  { id: 3, text: "Agile внедряют ради «скорости разработки». Насколько это корректная цель?", options: { A: "Полностью корректная", B: "Частично корректная", C: "Это одна из целей", D: "Это подмена цели: Agile про ценность, а не скорость" } },
  { id: 4, text: "Команда работает по спринтам, но бизнес-результаты не изменились. Что это значит?", options: { A: "Нужно больше времени", B: "Команда плохо внедрила Scrum", C: "Нужно улучшить процессы", D: "Изменения не затронули уровень создания ценности" } },
  { id: 5, text: "В компании считают, что Agile — это только про разработку. Насколько это верно?", options: { A: "Да, это про разработку", B: "В основном про разработку", C: "Частично про разработку", D: "Agile — это про управление всей системой создания продукта" } },
  { id: 6, text: "Трансформацию ведут HR и коучи, но топ-менеджмент вне изменений. К чему это приведёт?", options: { A: "Трансформация всё равно состоится", B: "Команды изменятся", C: "Будут локальные улучшения", D: "Трансформация упрётся в уровень управления и остановится" } },
  { id: 7, text: "Фреймворк внедрили, но решения принимаются долго и централизованно. Что это означает?", options: { A: "Нужно подождать", B: "Agile внедрён не до конца", C: "Нужно больше практик", D: "Не изменена система принятия решений" } },
  { id: 8, text: "Как понять, что трансформация реальная, а не имитация?", options: { A: "Появились новые роли", B: "Есть Agile-практики", C: "Команды работают по Scrum", D: "Изменилось то, как компания создаёт и доставляет ценность" } },

  { id: 9, text: "Руководитель продолжает микроконтроль, хотя команда формально в Agile. Что это значит?", options: { A: "Это нормально", B: "Он просто отвечает за результат", C: "Нужно обучить руководителя Agile", D: "Старая система управления блокирует трансформацию" } },
  { id: 10, text: "Команды ждут указаний сверху, несмотря на Agile. Почему?", options: { A: "Люди не готовы", B: "Нужно больше мотивации", C: "Нужно больше встреч", D: "Не изменена система ответственности и автономии" } },
  { id: 11, text: "Роль руководителя в Agile — «меньше вмешиваться». Насколько это корректно?", options: { A: "Да, нужно просто не мешать", B: "Частично", C: "Нужно больше делегировать", D: "Роль меняется: от контроля к управлению системой и условиями" } },
  { id: 12, text: "Культура «наказать за ошибку» в компании. Как это влияет на трансформацию?", options: { A: "Не влияет", B: "Немного влияет", C: "Снижает инициативу", D: "Убивает эксперименты и развитие продукта" } },
  { id: 13, text: "Команды оценивают по количеству задач. Что не так?", options: { A: "Всё нормально", B: "Это базовая метрика", C: "Не хватает других метрик", D: "Это не связано с созданием ценности" } },
  { id: 14, text: "Как должна измениться роль руководителя?", options: { A: "Контролировать меньше", B: "Делегировать больше", C: "Работать с командой", D: "Устранять системные ограничения и управлять средой" } },
  { id: 15, text: "Все продуктовые решения утверждаются сверху. Что это означает?", options: { A: "Контроль важен", B: "Так безопаснее", C: "Нужно ускорить процессы", D: "Нет автономии команд и продуктового управления" } },
  { id: 16, text: "Главный признак зрелого лидерства в Agile-системе:", options: { A: "Контроль", B: "Координация", C: "Поддержка", D: "Способность менять систему и условия работы" } },

  { id: 17, text: "Команда формально в Scrum, но работает по фикс-плану на полгода. Что не так?", options: { A: "Всё нормально", B: "Нужно чаще обновлять план", C: "Scrum внедрён частично", D: "Нет гибкости и работы с гипотезами" } },
  { id: 18, text: "Бэклог — список задач от руководителя. Какие риски?", options: { A: "Никаких", B: "Низкая вовлечённость", C: "Ошибки в задачах", D: "Нет продуктового мышления и работы с ценностью" } },
  { id: 19, text: "Команда перегружена и не успевает. В чём корень?", options: { A: "Люди не справляются", B: "Плохое планирование", C: "Мало ресурсов", D: "Нет управления приоритетами и потоком" } },
  { id: 20, text: "Как формируется бэклог в зрелой системе?", options: { A: "Через список задач", B: "Через запросы", C: "Через идеи", D: "Через гипотезы и ценность" } },
  { id: 21, text: "Команда делает много, но продукт не растёт. Почему?", options: { A: "Нужно больше задач", B: "Нужно быстрее работать", C: "Нужно менять процесс", D: "Нет связи между задачами и результатом" } },
  { id: 22, text: "Ключевое в Agile-процессе:", options: { A: "Ритуалы", B: "Спринты", C: "Команда", D: "Непрерывная поставка ценности" } },
  { id: 23, text: "Почему MVP часто не даёт результат?", options: { A: "Плохая реализация", B: "Недостаточно функций", C: "Ошибки в UX", D: "Не проверяется гипотеза" } },
  { id: 24, text: "Что чаще всего ограничивает скорость разработки?", options: { A: "Люди", B: "Время", C: "Технологии", D: "Узкие места системы" } },

  { id: 25, text: "Успех измеряют по velocity. Насколько это корректно?", options: { A: "Полностью", B: "Частично", C: "Это один из показателей", D: "Это не отражает ценность продукта" } },
  { id: 26, text: "Метрики нужны только для отчётности. К чему это приводит?", options: { A: "Всё нормально", B: "Есть прозрачность", C: "Есть контроль", D: "Метрики не влияют на решения" } },
  { id: 27, text: "Метрики продукта не растут. Как действовать?", options: { A: "Подождать", B: "Усилить контроль", C: "Проанализировать", D: "Изменить подход и систему" } },
  { id: 28, text: "Какие метрики важнее всего?", options: { A: "Сроки", B: "Задачи", C: "Активность", D: "Бизнес-результаты и поведение пользователей" } },
  { id: 29, text: "Как принимаются решения в зрелой системе?", options: { A: "Руководителем", B: "На встречах", C: "На основе опыта", D: "На основе данных и гипотез" } },
  { id: 30, text: "Аналитика в продукте — это:", options: { A: "Дополнительно", B: "Желательно", C: "Важно", D: "Основа управления" } },
  { id: 31, text: "Видишь падение ключевых метрик. Как действуешь?", options: { A: "Реагирую", B: "Исправляю", C: "Анализирую", D: "Ищу корневую причину" } },
  { id: 32, text: "Что отличает сильную продуктовую аналитику?", options: { A: "Наличие данных", B: "Отчёты", C: "Анализ", D: "Влияние на решения" } },

  { id: 33, text: "Agile внедряют «чтобы быть современными». К чему это приведёт?", options: { A: "К улучшениям", B: "К изменениям", C: "К частичному эффекту", D: "К имитации без результата" } },
  { id: 34, text: "Главное препятствие трансформации:", options: { A: "Люди", B: "Время", C: "Бюджет", D: "Система управления" } },
  { id: 35, text: "Трансформация — это:", options: { A: "Проект", B: "Инициатива", C: "Изменение", D: "Системное изменение бизнеса" } },
  { id: 36, text: "С чего должна начинаться трансформация?", options: { A: "С обучения", B: "С внедрения Scrum", C: "С команды", D: "С понимания цели и проблем" } },
  { id: 37, text: "Где чаще всего возникает сопротивление?", options: { A: "В командах", B: "В сроках", C: "В процессах", D: "В мышлении и управлении" } },
  { id: 38, text: "Что меняется первым при реальной трансформации?", options: { A: "Инструменты", B: "Команды", C: "Процессы", D: "Принципы и мышление" } },
  { id: 39, text: "Как понять, что компания готова к трансформации?", options: { A: "Есть желание", B: "Есть ресурсы", C: "Есть план", D: "Есть готовность менять управление" } },
  { id: 40, text: "Что отличает компании, успешно прошедшие трансформацию?", options: { A: "Agile", B: "Процессы", C: "Команды", D: "Способность управлять системой создания ценности" } }
];

const LEVELS: Record<LevelKey, LevelResult> = {
  imitation: {
    key: "imitation",
    title: "Имитация",
    scoreRange: "40–80",
    summary: "Вы внедряете внешние атрибуты Agile, но система управления и логика решений не меняются.",
    insights: [
      "Agile воспринимается как набор ритуалов.",
      "Изменения носят локальный, а не системный характер.",
      "Бизнес-результат от трансформации почти не проявляется."
    ],
    recommendation: "Начните с сути трансформации: цели, ценность, управленческие принципы и архитектура решений.",
    ctaLabel: "Пройти курс по Agile / AI трансформации",
    ctaHref: COURSE_URL
  },
  processes: {
    key: "processes",
    title: "Процессы",
    scoreRange: "81–120",
    summary: "Вы меняете процессы, но пока не меняете систему управления и создания ценности.",
    insights: [
      "Есть ритм и практики, но мало системного эффекта.",
      "Команды работают иначе, управление — по-старому.",
      "Результаты нестабильны и зависят от ручного усилия."
    ],
    recommendation: "Сместите фокус с процессов на результат и системные ограничения управления.",
    ctaLabel: "Перейти к системному уровню",
    ctaHref: COURSE_URL
  },
  adaptation: {
    key: "adaptation",
    title: "Адаптация",
    scoreRange: "121–140",
    summary: "Вы уже меняете подход, но системе пока не хватает устойчивости и масштаба.",
    insights: [
      "Есть зрелые элементы продуктового и Agile-подхода.",
      "Сохраняются узкие места в принятии решений и ответственности.",
      "Следующий шаг — закрепить системную модель управления."
    ],
    recommendation: "Усильте системное мышление руководителей и связку метрик, гипотез и ценности.",
    ctaLabel: "Усилить трансформацию",
    ctaHref: COURSE_URL
  },
  transformation: {
    key: "transformation",
    title: "Трансформация",
    scoreRange: "141–160",
    summary: "Вы реально меняете систему: управление, продуктовую логику и контур создания ценности.",
    insights: [
      "Есть зрелая управленческая модель и автономия команд.",
      "Решения принимаются через данные, гипотезы и системное мышление.",
      "Рост теперь упирается в масштабирование и влияние."
    ],
    recommendation: "Фокусируйтесь на масштабе трансформации, портфеле инициатив и архитектуре влияния.",
    ctaLabel: "Обсудить продвинутый уровень / консалтинг",
    ctaHref: TELEGRAM_CONSULT_URL
  }
};

const LEVEL_STYLES: Record<LevelKey, { chip: string; panel: string }> = {
  imitation: {
    chip: "border-[#ef9a9a] bg-[#ffebee] text-[#9f2f2f]",
    panel: "border-[#efc7c7] bg-[linear-gradient(135deg,#fff3f3_0%,#fff8f8_100%)]"
  },
  processes: {
    chip: "border-[#f4b36a] bg-[#fff3e5] text-[#9c5300]",
    panel: "border-[#f3d1a7] bg-[linear-gradient(135deg,#fff7ea_0%,#fffaf2_100%)]"
  },
  adaptation: {
    chip: "border-[#e9d06b] bg-[#fffbe6] text-[#7c6800]",
    panel: "border-[#efe19a] bg-[linear-gradient(135deg,#fffde8_0%,#fffef5_100%)]"
  },
  transformation: {
    chip: "border-[#7ccf8d] bg-[#e8f9ed] text-[#1e7a38]",
    panel: "border-[#b8e6c4] bg-[linear-gradient(135deg,#edfdf2_0%,#f7fff9_100%)]"
  }
};

function resolveLevel(score: number): LevelResult {
  if (score <= 80) return LEVELS.imitation;
  if (score <= 120) return LEVELS.processes;
  if (score <= 140) return LEVELS.adaptation;
  return LEVELS.transformation;
}

export function AgileAiTransformationQuiz(): JSX.Element {
  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Partial<Record<number, OptionKey>>>({});
  const [finished, setFinished] = useState(false);

  const question = QUESTIONS[index];
  const selected = answers[question?.id];
  const progress = Math.round(((index + 1) / QUESTIONS.length) * 100);

  const totalScore = useMemo(
    () =>
      QUESTIONS.reduce((sum, item) => {
        const key = answers[item.id];
        return sum + (key ? OPTION_SCORES[key] : 0);
      }, 0),
    [answers]
  );
  const result = useMemo(() => resolveLevel(totalScore), [totalScore]);

  function trackGoal(goal: string, params?: Record<string, string | number>): void {
    if (typeof window === "undefined") return;
    const ym = (window as Window & { ym?: (...args: unknown[]) => void }).ym;
    if (typeof ym !== "function") return;
    ym(YANDEX_METRIKA_ID, "reachGoal", goal, params ?? {});
  }

  function startQuiz(): void {
    setStarted(true);
    setFinished(false);
    setIndex(0);
    setAnswers({});
    trackGoal("diagnostics_agile_ai_quiz_start", { questions_total: QUESTIONS.length });
  }

  function chooseAnswer(key: OptionKey): void {
    setAnswers((prev) => ({ ...prev, [question.id]: key }));
  }

  function goBack(): void {
    if (index > 0) setIndex((prev) => prev - 1);
  }

  function goNext(): void {
    if (!selected) return;
    trackGoal("diagnostics_agile_ai_quiz_step_next", {
      question_id: question.id,
      answer_option: selected,
      answer_score: OPTION_SCORES[selected]
    });

    if (index === QUESTIONS.length - 1) {
      const finalScore = QUESTIONS.reduce((sum, item) => {
        const key = item.id === question.id ? selected : answers[item.id];
        return sum + (key ? OPTION_SCORES[key] : 0);
      }, 0);
      const finalLevel = resolveLevel(finalScore);
      trackGoal("diagnostics_agile_ai_quiz_complete", { score_total: finalScore, level: finalLevel.key });
      setFinished(true);
      return;
    }
    setIndex((prev) => prev + 1);
  }

  if (!started) {
    return (
      <section className="rounded-[2rem] border border-[#bfd9ef] bg-[linear-gradient(135deg,#eef8ff_0%,#f7f2ff_52%,#fff6ec_100%)] p-7 shadow-[0_18px_40px_rgba(15,23,42,0.06)] md:p-9">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Новая диагностика</p>
        <h2 className="mt-3 max-w-[18ch] text-4xl font-black leading-[0.95] tracking-tight text-slate-900 md:text-5xl">
          Насколько вы готовы к Agile / AI трансформации
        </h2>
        <p className="mt-4 text-base leading-8 text-slate-700 md:text-lg">
          5–7 минут → честная диагностика → план роста
        </p>
        <div className="mt-5 grid gap-2 text-sm text-slate-600 md:grid-cols-3">
          <p>Ситуационные кейсы</p>
          <p>Оценка зрелости трансформации</p>
          <p>Рекомендации и следующий шаг</p>
        </div>
        <button
          type="button"
          onClick={startQuiz}
          className="mt-7 inline-flex rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Начать тест
        </button>
      </section>
    );
  }

  if (finished) {
    const styles = LEVEL_STYLES[result.key];
    return (
      <section className={`rounded-[2rem] border p-7 shadow-[0_18px_40px_rgba(15,23,42,0.06)] md:p-9 ${styles.panel}`}>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Результат диагностики</p>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] ${styles.chip}`}>
            Уровень: {result.title}
          </span>
          <span className="text-sm font-medium text-slate-600">
            {totalScore} из 160 баллов • диапазон {result.scoreRange}
          </span>
        </div>
        <p className="mt-4 text-lg leading-8 text-slate-800">{result.summary}</p>

        <div className="mt-5 space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">3 инсайта</p>
          <ul className="space-y-2 text-sm leading-7 text-slate-700">
            {result.insights.map((item) => (
              <li key={item} className="rounded-xl border border-slate-200/80 bg-white/70 px-4 py-3">
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-5 rounded-xl border border-slate-200/80 bg-white/70 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Что делать дальше</p>
          <p className="mt-2 text-sm leading-7 text-slate-700">{result.recommendation}</p>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href={result.ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackGoal("diagnostics_agile_ai_quiz_cta_click", { level: result.key, score_total: totalScore })
            }
            className="inline-flex rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            {result.ctaLabel}
          </Link>
          <button
            type="button"
            onClick={startQuiz}
            className="inline-flex rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Пройти заново
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-[0_18px_40px_rgba(15,23,42,0.06)] md:p-9">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
          Вопрос {index + 1} из {QUESTIONS.length}
        </p>
        <p className="text-sm font-medium text-slate-600">{progress}%</p>
      </div>
      <div className="mt-2 h-2 rounded-full bg-slate-100">
        <div className="h-2 rounded-full bg-slate-900 transition-all" style={{ width: `${progress}%` }} />
      </div>

      <h3 className="mt-6 text-2xl font-black leading-tight tracking-tight text-slate-900 md:text-3xl">{question.text}</h3>

      <div className="mt-5 grid gap-3">
        {(["A", "B", "C", "D"] as OptionKey[]).map((key) => {
          const active = selected === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => chooseAnswer(key)}
              className={`rounded-xl border px-4 py-3 text-left text-sm leading-7 transition ${
                active
                  ? "border-slate-900 bg-slate-900 text-white"
                  : "border-slate-200 bg-slate-50 text-slate-800 hover:border-slate-300 hover:bg-slate-100"
              }`}
            >
              <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full border border-current text-xs font-bold">
                {key}
              </span>
              {question.options[key]}
            </button>
          );
        })}
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={goBack}
          disabled={index === 0}
          className="inline-flex rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Назад
        </button>
        <button
          type="button"
          onClick={goNext}
          disabled={!selected}
          className="inline-flex rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {index === QUESTIONS.length - 1 ? "Показать результат" : "Далее"}
        </button>
      </div>
    </section>
  );
}
