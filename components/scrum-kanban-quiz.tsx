"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { YANDEX_METRIKA_ID } from "@/lib/constants";

type OptionKey = "A" | "B" | "C" | "D";
type LevelKey = "rituals" | "practice" | "awareness" | "mastery";

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
const COURSE_URL = "https://stepik.org/course/264335/promo";

const QUESTIONS: QuizQuestion[] = [
  { id: 1, text: "Команда проводит все Scrum-церемонии, но не понимает, зачем. Как оценишь ситуацию?", options: { A: "Это нормально — со временем поймут", B: "Главное, что процессы соблюдаются", C: "Нужно объяснить правила", D: "Это ритуалы без понимания ценности" } },
  { id: 2, text: "В Scrum команда фокусируется на выполнении всех задач спринта. Что может быть проблемой?", options: { A: "Проблемы нет", B: "Нужно просто быстрее работать", C: "Нужно лучше планировать", D: "Фокус смещён с ценности на выполнение задач" } },
  { id: 3, text: "В Kanban команда просто ведёт доску и двигает карточки. Это:", options: { A: "Достаточно", B: "Базовый уровень", C: "Нужно добавить правила", D: "Нет управления потоком" } },
  { id: 4, text: "Что ключевое в Scrum?", options: { A: "Спринты", B: "Встречи", C: "Команда", D: "Создание ценности" } },
  { id: 5, text: "Что ключевое в Kanban?", options: { A: "Доска", B: "Карточки", C: "Визуализация", D: "Управление потоком" } },
  { id: 6, text: "Команда строго следует Scrum, но не улучшается. Почему?", options: { A: "Нужно больше времени", B: "Нужно больше дисциплины", C: "Нужно обучение", D: "Нет работы с улучшениями и системой" } },
  { id: 7, text: "Scrum Master выполняет роль контролёра. Что это значит?", options: { A: "Это нормально", B: "Он помогает", C: "Нужно скорректировать", D: "Роль искажена" } },
  { id: 8, text: "Как понять, что Scrum реально работает?", options: { A: "Есть встречи", B: "Есть спринты", C: "Команда работает", D: "Есть результат и ценность" } },

  { id: 9, text: "Команда регулярно не успевает в спринте. В чём причина?", options: { A: "Люди не справляются", B: "Плохая дисциплина", C: "Ошибки планирования", D: "Нет управления объёмом и приоритетами" } },
  { id: 10, text: "В спринт постоянно добавляют новые задачи. Что это означает?", options: { A: "Гибкость", B: "Нормальная практика", C: "Нужно контролировать", D: "Нарушен фокус и управление" } },
  { id: 11, text: "Команда закрывает задачи, но ценности нет. Почему?", options: { A: "Нужно больше задач", B: "Нужно быстрее работать", C: "Нужно улучшить качество", D: "Нет ориентации на результат" } },
  { id: 12, text: "В Kanban нет WIP-лимитов. К чему это приводит?", options: { A: "Ничего страшного", B: "Больше задач", C: "Загруженность", D: "Потеря контроля над потоком" } },
  { id: 13, text: "Что показывает Lead Time?", options: { A: "Скорость", B: "Время", C: "Выполнение", D: "Время прохождения задачи через систему" } },
  { id: 14, text: "Команда работает быстро, но постоянно перегружена. Почему?", options: { A: "Много задач", B: "Сложная работа", C: "Нет ресурсов", D: "Нет управления потоком" } },
  { id: 15, text: "Как правильно управлять спринтом?", options: { A: "Следить за задачами", B: "Контролировать", C: "Координировать", D: "Управлять достижением цели спринта" } },
  { id: 16, text: "Что важнее в Kanban?", options: { A: "Скорость", B: "Количество задач", C: "Загрузка", D: "Стабильный поток" } },

  { id: 17, text: "Product Owner просто пишет задачи и отдаёт в разработку. Что не так?", options: { A: "Всё нормально", B: "Нужно больше описаний", C: "Нужно уточнить задачи", D: "Нет управления ценностью продукта" } },
  { id: 18, text: "Команда ждёт указаний от Scrum Master. Почему?", options: { A: "Так удобнее", B: "Он лидер", C: "Нужно обучить", D: "Нет самоорганизации" } },
  { id: 19, text: "Разработчики не понимают цель спринта. К чему это ведёт?", options: { A: "Ничего", B: "Путаница", C: "Снижение эффективности", D: "Потеря смысла работы" } },
  { id: 20, text: "Scrum Master устраняет блокеры. Это:", options: { A: "Достаточно", B: "Основная задача", C: "Важно", D: "Только часть роли" } },
  { id: 21, text: "Команда не улучшает процесс. Почему?", options: { A: "Нет времени", B: "Нет мотивации", C: "Нет идей", D: "Нет культуры улучшений" } },
  { id: 22, text: "Что делает команду сильной?", options: { A: "Опыт", B: "Навыки", C: "Коммуникация", D: "Общая ответственность за результат" } },
  { id: 23, text: "Команда делает задачи, но не думает о продукте. Почему?", options: { A: "Это нормально", B: "Их задача — делать", C: "Нужно объяснить", D: "Нет продуктового мышления" } },
  { id: 24, text: "Роль Scrum Master в зрелой команде:", options: { A: "Контроль", B: "Помощь", C: "Координация", D: "Развитие системы" } },

  { id: 25, text: "Успех меряют количеством задач. В чём проблема?", options: { A: "Нет проблемы", B: "Нужно больше задач", C: "Нужны другие метрики", D: "Это не связано с ценностью" } },
  { id: 26, text: "Velocity используют как KPI. Что происходит?", options: { A: "Всё хорошо", B: "Контроль", C: "Улучшение", D: "Искажение поведения" } },
  { id: 27, text: "Метрики не растут. Что делать?", options: { A: "Подождать", B: "Давить", C: "Анализировать", D: "Менять систему" } },
  { id: 28, text: "Какие метрики важны?", options: { A: "Задачи", B: "Скорость", C: "Сроки", D: "Ценность и результат" } },
  { id: 29, text: "Как принимаются решения?", options: { A: "Руководителем", B: "Командой", C: "По опыту", D: "По данным" } },
  { id: 30, text: "Что важнее?", options: { A: "Выполнение", B: "Скорость", C: "Качество", D: "Результат" } },
  { id: 31, text: "Ты видишь падение эффективности. Что делаешь?", options: { A: "Реагирую", B: "Исправляю", C: "Анализирую", D: "Ищу причину" } },
  { id: 32, text: "Метрики должны:", options: { A: "Отражать задачи", B: "Отражать процесс", C: "Отражать работу", D: "Влиять на решения" } },

  { id: 33, text: "Команда использует Scrum, но не понимает зачем. Это:", options: { A: "Нормально", B: "Этап", C: "Проблема", D: "Имитация" } },
  { id: 34, text: "Главная ошибка в Scrum:", options: { A: "Ошибки в задачах", B: "Планирование", C: "Коммуникации", D: "Фокус на ритуалах" } },
  { id: 35, text: "Kanban без метрик — это:", options: { A: "Достаточно", B: "Частично", C: "Нужно доработать", D: "Не управление" } },
  { id: 36, text: "Scrum без цели спринта — это:", options: { A: "Нормально", B: "Можно работать", C: "Сложно", D: "Потеря смысла" } },
  { id: 37, text: "Команда делает всё правильно, но результата нет. Почему?", options: { A: "Нужно время", B: "Нужно ускориться", C: "Нужно обучение", D: "Нет связи с ценностью" } },
  { id: 38, text: "Что отличает сильного Scrum-мастера?", options: { A: "Опыт", B: "Знания", C: "Навыки", D: "Умение развивать систему" } },
  { id: 39, text: "Что отличает зрелую команду?", options: { A: "Скорость", B: "Качество", C: "Опыт", D: "Ответственность за результат" } },
  { id: 40, text: "Что такое высокий уровень Agile?", options: { A: "Scrum", B: "Kanban", C: "Практики", D: "Система управления ценностью" } }
];

const LEVELS: Record<LevelKey, LevelResult> = {
  rituals: {
    key: "rituals",
    title: "Ритуалы",
    scoreRange: "40–80",
    summary: "Ты следуешь процессам, но пока не используешь Scrum/Kanban как систему управления ценностью.",
    insights: [
      "Фокус в основном на церемониях и внешней форме.",
      "Решения слабо связаны с результатом для пользователя и бизнеса.",
      "Система улучшений работает эпизодически."
    ],
    recommendation: "Закрепи базу Scrum/Kanban и понимание, как практики связаны с ценностью и результатом.",
    ctaLabel: "Освоить базу Scrum / Kanban",
    ctaHref: COURSE_URL
  },
  practice: {
    key: "practice",
    title: "Практика",
    scoreRange: "81–120",
    summary: "Ты уже применяешь инструменты, но пока не управляешь системой целиком.",
    insights: [
      "Есть рабочие практики и ритм исполнения.",
      "Узкие места часто остаются на уровне управления потоком.",
      "Нужен переход от инструментов к системному мышлению."
    ],
    recommendation: "Развивай понимание потока, приоритетов и связи метрик с ценностью.",
    ctaLabel: "Перейти на следующий уровень",
    ctaHref: COURSE_URL
  },
  awareness: {
    key: "awareness",
    title: "Осознанность",
    scoreRange: "121–140",
    summary: "Ты понимаешь, как Scrum/Kanban работают в системе и влияешь на результат команды.",
    insights: [
      "Хороший уровень управляемости процесса и прозрачности.",
      "Есть устойчивые практики улучшений и анализа.",
      "Точка роста — масштаб и архитектура системы."
    ],
    recommendation: "Усили системность: развивай сквозное управление ценностью и масштабируемые механики.",
    ctaLabel: "Усилить системный уровень",
    ctaHref: COURSE_URL
  },
  mastery: {
    key: "mastery",
    title: "Мастерство",
    scoreRange: "141–160",
    summary: "Ты управляешь не ритуалами, а системой создания ценности и умеешь развивать её на уровне команды и организации.",
    insights: [
      "Высокая зрелость Agile-мышления и практик.",
      "Решения принимаются через данные, поток и ценность.",
      "Следующий шаг — масштабировать подход на уровень бизнеса."
    ],
    recommendation: "Фокус на масштабировании, продуктовом контуре и организационном влиянии.",
    ctaLabel: "Открыть продвинутый уровень",
    ctaHref: COURSE_URL
  }
};

const LEVEL_STYLES: Record<LevelKey, { chip: string; panel: string }> = {
  rituals: {
    chip: "border-[#ef9a9a] bg-[#ffebee] text-[#9f2f2f]",
    panel: "border-[#efc7c7] bg-[linear-gradient(135deg,#fff3f3_0%,#fff8f8_100%)]"
  },
  practice: {
    chip: "border-[#f4b36a] bg-[#fff3e5] text-[#9c5300]",
    panel: "border-[#f3d1a7] bg-[linear-gradient(135deg,#fff7ea_0%,#fffaf2_100%)]"
  },
  awareness: {
    chip: "border-[#e9d06b] bg-[#fffbe6] text-[#7c6800]",
    panel: "border-[#efe19a] bg-[linear-gradient(135deg,#fffde8_0%,#fffef5_100%)]"
  },
  mastery: {
    chip: "border-[#7ccf8d] bg-[#e8f9ed] text-[#1e7a38]",
    panel: "border-[#b8e6c4] bg-[linear-gradient(135deg,#edfdf2_0%,#f7fff9_100%)]"
  }
};

function resolveLevel(score: number): LevelResult {
  if (score <= 80) return LEVELS.rituals;
  if (score <= 120) return LEVELS.practice;
  if (score <= 140) return LEVELS.awareness;
  return LEVELS.mastery;
}

export function ScrumKanbanQuiz(): JSX.Element {
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
    trackGoal("diagnostics_scrum_kanban_quiz_start", { questions_total: QUESTIONS.length });
  }

  function chooseAnswer(key: OptionKey): void {
    setAnswers((prev) => ({ ...prev, [question.id]: key }));
  }

  function goBack(): void {
    if (index > 0) setIndex((prev) => prev - 1);
  }

  function goNext(): void {
    if (!selected) return;
    trackGoal("diagnostics_scrum_kanban_quiz_step_next", {
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
      trackGoal("diagnostics_scrum_kanban_quiz_complete", { score_total: finalScore, level: finalLevel.key });
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
          Насколько ты реально понимаешь Scrum и Kanban
        </h2>
        <p className="mt-4 text-base leading-8 text-slate-700 md:text-lg">
          5–7 минут → честная диагностика → рекомендации по росту
        </p>
        <div className="mt-5 grid gap-2 text-sm text-slate-600 md:grid-cols-3">
          <p>Ситуационные кейсы</p>
          <p>Проверка реального уровня практики</p>
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
              trackGoal("diagnostics_scrum_kanban_quiz_cta_click", { level: result.key, score_total: totalScore })
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
