"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { TELEGRAM_CONSULT_URL, YANDEX_METRIKA_ID } from "@/lib/constants";

type OptionKey = "A" | "B" | "C" | "D";
type LevelKey = "executor" | "function" | "product" | "system";

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

const QUESTIONS: QuizQuestion[] = [
  { id: 1, text: "Ты начинаешь работу над продуктом:", options: { A: "С задач", B: "С идей", C: "С требований", D: "С проблемы пользователя" } },
  { id: 2, text: "Продукт нужен для:", options: { A: "Реализации задач", B: "Выполнения ТЗ", C: "Закрытия функций", D: "Создания ценности" } },
  { id: 3, text: "Успех продукта:", options: { A: "Сделали фичи", B: "Вышли в срок", C: "Запустили", D: "Дали результат" } },
  { id: 4, text: "Фича не используется:", options: { A: "Нормально", B: "Исправить", C: "Улучшить", D: "Значит не нужна" } },
  { id: 5, text: "Главное в продукте:", options: { A: "Код", B: "Дизайн", C: "Функции", D: "Пользователь" } },
  { id: 6, text: "Ошибка в продукте:", options: { A: "Исправить", B: "Обсудить", C: "Проанализировать", D: "Понять причину" } },
  { id: 7, text: "Ты думаешь:", options: { A: "Что сделать", B: "Как сделать", C: "Что улучшить", D: "Зачем это нужно" } },
  { id: 8, text: "Ты смотришь на продукт:", options: { A: "Как на задачу", B: "Как на проект", C: "Как на решение", D: "Как на систему" } },

  { id: 9, text: "Пользователь:", options: { A: "Клиент", B: "Заказчик", C: "Пользователь", D: "Источник ценности" } },
  { id: 10, text: "Обратная связь:", options: { A: "Не важна", B: "Иногда", C: "Важна", D: "Ключевая" } },
  { id: 11, text: "Интервью:", options: { A: "Не делаю", B: "Иногда", C: "Регулярно", D: "Системно" } },
  { id: 12, text: "Проблема пользователя:", options: { A: "Неясна", B: "Примерная", C: "Понятна", D: "Чётко сформулирована" } },
  { id: 13, text: "Ты проверяешь гипотезы:", options: { A: "Нет", B: "Иногда", C: "Да", D: "Постоянно" } },
  { id: 14, text: "Пользователь не пользуется:", options: { A: "Его проблема", B: "Надо доработать", C: "Надо спросить", D: "Ошибка в продукте" } },
  { id: 15, text: "Метрики:", options: { A: "Нет", B: "Есть", C: "Использую", D: "Управляю через них" } },
  { id: 16, text: "Ты думаешь о:", options: { A: "Продукте", B: "Функциях", C: "Пользователе", D: "Ценности" } },

  { id: 17, text: "Разработка:", options: { A: "Делать", B: "Быстро", C: "Качественно", D: "Целенаправленно" } },
  { id: 18, text: "Приоритеты:", options: { A: "Нет", B: "Есть", C: "Управляю", D: "Пересматриваю" } },
  { id: 19, text: "Бэклог:", options: { A: "Список", B: "Задачи", C: "Приоритеты", D: "Инструмент управления" } },
  { id: 20, text: "MVP:", options: { A: "Минимум", B: "Быстро", C: "Проверка", D: "Гипотеза" } },
  { id: 21, text: "Команда:", options: { A: "Исполняет", B: "Делает", C: "Работает", D: "Создаёт продукт" } },
  { id: 22, text: "Запуск:", options: { A: "Сделали", B: "Выкатили", C: "Проверили", D: "Оценили результат" } },
  { id: 23, text: "Скорость:", options: { A: "Важна", B: "Очень", C: "Баланс", D: "Зависит от цели" } },
  { id: 24, text: "Ошибки:", options: { A: "Плохо", B: "Нормально", C: "Учусь", D: "Использую" } },

  { id: 25, text: "Данные:", options: { A: "Не нужны", B: "Иногда", C: "Использую", D: "Основа решений" } },
  { id: 26, text: "Метрики продукта:", options: { A: "Нет", B: "Есть", C: "Анализирую", D: "Управляю" } },
  { id: 27, text: "Решения:", options: { A: "Интуиция", B: "Опыт", C: "Данные", D: "Система" } },
  { id: 28, text: "Рост:", options: { A: "Случайный", B: "Есть", C: "Управляемый", D: "Системный" } },
  { id: 29, text: "KPI:", options: { A: "Нет", B: "Есть", C: "Использую", D: "Управляю" } },
  { id: 30, text: "Аналитика:", options: { A: "Нет", B: "Частично", C: "Есть", D: "Встроена" } },
  { id: 31, text: "Ты смотришь:", options: { A: "На задачи", B: "На процессы", C: "На метрики", D: "На систему" } },
  { id: 32, text: "Узкие места:", options: { A: "Не вижу", B: "Иногда", C: "Вижу", D: "Убираю" } },

  { id: 33, text: "Ты:", options: { A: "Исполнитель", B: "Менеджер", C: "Продуктолог", D: "Архитектор продукта" } },
  { id: 34, text: "Роль:", options: { A: "Делать", B: "Контролировать", C: "Управлять", D: "Влиять" } },
  { id: 35, text: "Ответственность:", options: { A: "За задачи", B: "За процесс", C: "За результат", D: "За продукт" } },
  { id: 36, text: "Ты влияешь:", options: { A: "Нет", B: "Частично", C: "Да", D: "Системно" } },
  { id: 37, text: "Продукт развивается:", options: { A: "Сам", B: "Частично", C: "Управляемо", D: "Осознанно" } },
  { id: 38, text: "Ты принимаешь решения:", options: { A: "Редко", B: "Иногда", C: "Часто", D: "Ключевые" } },
  { id: 39, text: "Ты видишь:", options: { A: "Задачи", B: "Процессы", C: "Результат", D: "Систему" } },
  { id: 40, text: "Ограничения:", options: { A: "Люди", B: "Время", C: "Ресурсы", D: "Система" } }
];

const LEVELS: Record<LevelKey, LevelResult> = {
  executor: {
    key: "executor",
    title: "Исполнитель",
    scoreRange: "40–80",
    summary: "Ты пока выполняешь задачи, но ещё не управляешь продуктом как целостной системой.",
    insights: [
      "Фокус смещён на активность, а не на ценность.",
      "Решения часто реактивные, без опоры на логику продукта.",
      "Продуктовое мышление пока не стало рабочим инструментом."
    ],
    recommendation: "Сначала закрепи базу продуктового подхода: проблема, ценность, гипотеза, результат.",
    ctaLabel: "Пройти базовый курс по продукту",
    ctaHref: "https://stepik.org/course/244887/promo"
  },
  function: {
    key: "function",
    title: "Функция",
    scoreRange: "81–120",
    summary: "Ты уже работаешь в продукте, но чаще управляешь задачами, а не продуктовой системой.",
    insights: [
      "Есть процессы и ритм, но не хватает фокуса на ценности.",
      "Много операционного контроля, мало системного влияния.",
      "Рост упирается в переход от исполнения к управлению продуктом."
    ],
    recommendation: "Смести фокус с задач на управление продуктом через цели, гипотезы и приоритеты.",
    ctaLabel: "Перейти к управлению продуктом",
    ctaHref: "https://stepik.org/course/270800/promo"
  },
  product: {
    key: "product",
    title: "Продукт",
    scoreRange: "121–140",
    summary: "Ты уже продуктолог и умеешь вести продукт к результату, но масштаб пока ограничен.",
    insights: [
      "Сильный уровень продуктовых решений и ответственности.",
      "Есть потенциал к росту влияния на бизнес-систему.",
      "Следующий шаг — усиление архитектурного уровня управления."
    ],
    recommendation: "Развивай системность: портфель решений, масштабируемые механики, архитектуру продукта.",
    ctaLabel: "Прокачать продвинутый уровень",
    ctaHref: "https://stepik.org/course/258008/promo"
  },
  system: {
    key: "system",
    title: "Система",
    scoreRange: "141–160",
    summary: "Ты управляешь продуктом как системой и влияешь не только на фичи, но и на бизнес-результат.",
    insights: [
      "Высокая зрелость продуктового мышления.",
      "Сильное влияние на архитектуру решений и результат.",
      "Точка роста — масштаб, трансформации и стратегическое влияние."
    ],
    recommendation: "Следующий уровень — работа с трансформацией бизнеса и усилением управленческого контура.",
    ctaLabel: "Обсудить консалтинг",
    ctaHref: TELEGRAM_CONSULT_URL
  }
};

const LEVEL_STYLES: Record<LevelKey, { chip: string; panel: string }> = {
  executor: {
    chip: "border-[#ef9a9a] bg-[#ffebee] text-[#9f2f2f]",
    panel: "border-[#efc7c7] bg-[linear-gradient(135deg,#fff3f3_0%,#fff8f8_100%)]"
  },
  function: {
    chip: "border-[#f4b36a] bg-[#fff3e5] text-[#9c5300]",
    panel: "border-[#f3d1a7] bg-[linear-gradient(135deg,#fff7ea_0%,#fffaf2_100%)]"
  },
  product: {
    chip: "border-[#e9d06b] bg-[#fffbe6] text-[#7c6800]",
    panel: "border-[#efe19a] bg-[linear-gradient(135deg,#fffde8_0%,#fffef5_100%)]"
  },
  system: {
    chip: "border-[#7ccf8d] bg-[#e8f9ed] text-[#1e7a38]",
    panel: "border-[#b8e6c4] bg-[linear-gradient(135deg,#edfdf2_0%,#f7fff9_100%)]"
  }
};

function resolveLevel(score: number): LevelResult {
  if (score <= 80) return LEVELS.executor;
  if (score <= 120) return LEVELS.function;
  if (score <= 140) return LEVELS.product;
  return LEVELS.system;
}

export function ProductCreationQuiz(): JSX.Element {
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
    trackGoal("diagnostics_product_quiz_start", { questions_total: QUESTIONS.length });
  }

  function chooseAnswer(key: OptionKey): void {
    setAnswers((prev) => ({ ...prev, [question.id]: key }));
  }

  function goBack(): void {
    if (index > 0) setIndex((prev) => prev - 1);
  }

  function goNext(): void {
    if (!selected) return;
    trackGoal("diagnostics_product_quiz_step_next", {
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
      trackGoal("diagnostics_product_quiz_complete", { score_total: finalScore, level: finalLevel.key });
      setFinished(true);
      return;
    }
    setIndex((prev) => prev + 1);
  }

  if (!started) {
    return (
      <section className="rounded-[2rem] border border-[#bfd9ef] bg-[linear-gradient(135deg,#eef8ff_0%,#f7f2ff_52%,#fff6ec_100%)] p-7 shadow-[0_18px_40px_rgba(15,23,42,0.06)] md:p-9">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Новый тест</p>
        <h2 className="mt-3 max-w-[18ch] text-4xl font-black leading-[0.95] tracking-tight text-slate-900 md:text-5xl">
          Какого ты уровня в создании продуктов
        </h2>
        <p className="mt-4 text-base leading-8 text-slate-700 md:text-lg">
          5 минут → честная оценка → рекомендации по росту
        </p>
        <div className="mt-5 grid gap-2 text-sm text-slate-600 md:grid-cols-3">
          <p>40 вопросов</p>
          <p>Оценка продуктового мышления</p>
          <p>Персональная рекомендация + курс</p>
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
              trackGoal("diagnostics_product_quiz_cta_click", { level: result.key, score_total: totalScore })
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
