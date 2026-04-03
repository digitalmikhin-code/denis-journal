"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { YANDEX_METRIKA_ID } from "@/lib/constants";

type OptionKey = "A" | "B" | "C" | "D";

type QuizQuestion = {
  id: number;
  text: string;
  options: Record<OptionKey, string>;
};

type LevelKey = "base" | "process" | "result" | "system";

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

const OPTION_SCORES: Record<OptionKey, number> = {
  A: 1,
  B: 2,
  C: 3,
  D: 4
};

const QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    text: "Проект начинает «плыть» по срокам. Ты:",
    options: {
      A: "Начинаю чаще контролировать задачи",
      B: "Уточняю, где отставание",
      C: "Перераспределяю ресурсы",
      D: "Ищу системную причину сбоя"
    }
  },
  {
    id: 2,
    text: "Команда не берёт ответственность:",
    options: {
      A: "Усиливаю контроль",
      B: "Напоминаю о дедлайнах",
      C: "Назначаю ответственных",
      D: "Пересматриваю систему ответственности"
    }
  },
  {
    id: 3,
    text: "Ты получаешь задачу сверху:",
    options: {
      A: "Сразу начинаю делать",
      B: "Уточняю детали",
      C: "Спрашиваю про результат",
      D: "Проверяю связь с бизнес-целью"
    }
  },
  {
    id: 4,
    text: "Проект идёт, но пользы нет:",
    options: {
      A: "Значит, плохо работают",
      B: "Надо лучше контролировать",
      C: "Нужно уточнить цели",
      D: "Ошибка в постановке результата"
    }
  },
  {
    id: 5,
    text: "Ты планируешь проект:",
    options: {
      A: "С задач",
      B: "С дедлайнов",
      C: "С этапов",
      D: "С ценности и результата"
    }
  },
  {
    id: 6,
    text: "В команде перегруз:",
    options: {
      A: "Давлю на ускорение",
      B: "Перераспределяю задачи",
      C: "Ставлю приоритеты",
      D: "Пересматриваю объём работы"
    }
  },
  {
    id: 7,
    text: "Конфликт в команде:",
    options: {
      A: "Игнорирую",
      B: "Решаю вручную",
      C: "Ищу причины",
      D: "Смотрю на систему взаимодействия"
    }
  },
  {
    id: 8,
    text: "Как ты понимаешь успех проекта:",
    options: {
      A: "Сделали задачи",
      B: "Уложились в срок",
      C: "Достигли целей",
      D: "Дали бизнес-результат"
    }
  },
  {
    id: 9,
    text: "Команда ждёт указаний:",
    options: {
      A: "Даю инструкции",
      B: "Расписываю задачи",
      C: "Делегирую",
      D: "Выстраиваю самостоятельность"
    }
  },
  {
    id: 10,
    text: "Проект тормозит:",
    options: {
      A: "Усиливаю контроль",
      B: "Провожу встречи",
      C: "Убираю блокеры",
      D: "Перестраиваю систему работы"
    }
  },
  {
    id: 11,
    text: "Ты оцениваешь риски:",
    options: {
      A: "Когда уже проблема",
      B: "По ходу работы",
      C: "На старте проекта",
      D: "Постоянно системно"
    }
  },
  {
    id: 12,
    text: "Как принимаешь решения:",
    options: {
      A: "Быстро и интуитивно",
      B: "По ситуации",
      C: "На основе данных",
      D: "С учётом системы и последствий"
    }
  },
  {
    id: 13,
    text: "Команда не даёт результат:",
    options: {
      A: "Люди слабые",
      B: "Надо сильнее давить",
      C: "Нужно обучить",
      D: "Проблема в системе управления"
    }
  },
  {
    id: 14,
    text: "Ты управляешь проектом через:",
    options: {
      A: "Контроль",
      B: "Коммуникации",
      C: "Приоритеты",
      D: "Архитектуру работы"
    }
  },
  {
    id: 15,
    text: "Что для тебя проект:",
    options: {
      A: "Набор задач",
      B: "План работ",
      C: "Достижение цели",
      D: "Система создания результата"
    }
  },
  {
    id: 16,
    text: "Что ограничивает результат:",
    options: {
      A: "Люди",
      B: "Время",
      C: "Ресурсы",
      D: "Узкие места системы"
    }
  }
];

const LEVELS: Record<LevelKey, LevelResult> = {
  base: {
    key: "base",
    title: "База",
    scoreRange: "16–32",
    summary:
      "Ты пока не управляешь проектами системно: в основном реагируешь на задачи и тушишь последствия.",
    insights: [
      "Ты внутри потока задач, но не управляешь логикой проекта.",
      "Высокая перегрузка и зависимость от ручного контроля.",
      "Слабая предсказуемость результата команды."
    ],
    recommendation:
      "Перейди от управления задачами к управлению результатом и причинно-следственными связями.",
    ctaLabel: "Пройти базовый курс",
    ctaHref: "https://stepik.org/course/259560/promo"
  },
  process: {
    key: "process",
    title: "Процесс",
    scoreRange: "33–48",
    summary:
      "Ты уже управляешь процессом, но пока ограниченно влияешь на итоговый бизнес-результат.",
    insights: [
      "Фокус на дедлайнах и активности вместо ценности результата.",
      "Команда движется, но не всегда в нужную бизнес-точку.",
      "Риск застревания в операционном контроле."
    ],
    recommendation:
      "Смести фокус с процесса на цели, приоритеты и управленческую архитектуру исполнения.",
    ctaLabel: "Перейти на следующий уровень",
    ctaHref: "https://stepik.org/course/264335/promo"
  },
  result: {
    key: "result",
    title: "Результат",
    scoreRange: "49–56",
    summary:
      "Ты умеешь доводить проекты до результата, но устойчивость пока зависит от тебя лично.",
    insights: [
      "Сильный уровень достижения целей и завершения проектов.",
      "Есть перегруз и зависимость команды от твоего участия.",
      "Управленческая система ещё не полностью масштабируема."
    ],
    recommendation:
      "Развивай системное мышление: убирай узкие места и усиливай автономность команды.",
    ctaLabel: "Прокачать системный уровень",
    ctaHref: "https://stepik.org/course/244887/promo"
  },
  system: {
    key: "system",
    title: "Система",
    scoreRange: "57–64",
    summary:
      "Ты управляешь не задачами, а системой: видишь узкие места и влияешь на результат устойчиво.",
    insights: [
      "Высокая зрелость управленческого мышления и архитектуры работы.",
      "Результат достигается не за счёт ручного давления, а за счёт системы.",
      "Следующий шаг роста лежит в масштабе и трансформации."
    ],
    recommendation:
      "Фокус на портфеле проектов, влиянии на бизнес-систему и трансформации управленческой модели.",
    ctaLabel: "Вход в продвинутую программу",
    ctaHref: "https://stepik.org/course/258008/promo"
  }
};

function resolveLevel(totalScore: number): LevelResult {
  if (totalScore <= 32) return LEVELS.base;
  if (totalScore <= 48) return LEVELS.process;
  if (totalScore <= 56) return LEVELS.result;
  return LEVELS.system;
}

const LEVEL_STYLES: Record<LevelKey, { chip: string; panel: string }> = {
  base: {
    chip: "border-[#ef9a9a] bg-[#ffebee] text-[#9f2f2f]",
    panel: "border-[#efc7c7] bg-[linear-gradient(135deg,#fff3f3_0%,#fff8f8_100%)]"
  },
  process: {
    chip: "border-[#f4b36a] bg-[#fff3e5] text-[#9c5300]",
    panel: "border-[#f3d1a7] bg-[linear-gradient(135deg,#fff7ea_0%,#fffaf2_100%)]"
  },
  result: {
    chip: "border-[#e9d06b] bg-[#fffbe6] text-[#7c6800]",
    panel: "border-[#efe19a] bg-[linear-gradient(135deg,#fffde8_0%,#fffef5_100%)]"
  },
  system: {
    chip: "border-[#7ccf8d] bg-[#e8f9ed] text-[#1e7a38]",
    panel: "border-[#b8e6c4] bg-[linear-gradient(135deg,#edfdf2_0%,#f7fff9_100%)]"
  }
};

export function DiagnosticsQuiz(): JSX.Element {
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
    trackGoal("diagnostics_quiz_start", { questions_total: QUESTIONS.length });
  }

  function chooseAnswer(key: OptionKey): void {
    setAnswers((prev) => ({ ...prev, [question.id]: key }));
  }

  function goBack(): void {
    if (index > 0) {
      setIndex((prev) => prev - 1);
    }
  }

  function goNext(): void {
    if (!selected) return;
    trackGoal("diagnostics_quiz_step_next", {
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
      trackGoal("diagnostics_quiz_complete", {
        score_total: finalScore,
        level: finalLevel.key
      });
      setFinished(true);
      return;
    }
    setIndex((prev) => prev + 1);
  }

  if (!started) {
    return (
      <section className="rounded-[2rem] border border-[#bfd9ef] bg-[linear-gradient(135deg,#eef8ff_0%,#f7f2ff_52%,#fff6ec_100%)] p-7 shadow-[0_18px_40px_rgba(15,23,42,0.06)] md:p-9">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Диагностика</p>
        <h2 className="mt-3 max-w-[18ch] text-4xl font-black leading-[0.95] tracking-tight text-slate-900 md:text-5xl">
          Какой у тебя уровень в управлении проектами на самом деле
        </h2>
        <p className="mt-4 text-base leading-8 text-slate-700 md:text-lg">
          2 минуты → честный разбор → рекомендации по росту
        </p>
        <div className="mt-5 grid gap-2 text-sm text-slate-600 md:grid-cols-3">
          <p>16 вопросов</p>
          <p>Подсчёт зрелости мышления</p>
          <p>Персональная рекомендация</p>
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
            {totalScore} из 64 баллов • диапазон {result.scoreRange}
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
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Что менять дальше</p>
          <p className="mt-2 text-sm leading-7 text-slate-700">{result.recommendation}</p>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href={result.ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackGoal("diagnostics_quiz_cta_click", {
                level: result.key,
                score_total: totalScore
              })
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
