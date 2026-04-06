"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { YANDEX_METRIKA_ID } from "@/lib/constants";

type OptionKey = "A" | "B" | "C" | "D";
type LevelKey = "visualization" | "flow" | "system" | "pro";

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
  strengths: string[];
  gaps: string[];
  blocker: string;
  recommendation: string;
  ctaLabel: string;
  ctaHref: string;
};

const OPTION_SCORES: Record<OptionKey, number> = { A: 1, B: 2, C: 3, D: 4 };
const COURSE_URL = "https://stepik.org/course/265445/promo";

function getBlockTitle(questionId: number): string {
  if (questionId <= 8) return "Блок 1: Основы Kanban-мышления";
  if (questionId <= 16) return "Блок 2: Визуализация и Policies";
  if (questionId <= 24) return "Блок 3: Flow и WIP";
  if (questionId <= 32) return "Блок 4: Метрики и Predictability";
  return "Блок 5: Системная зрелость";
}

const QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    text: "Команда создала доску, но перегруз и срывы сроков остались. Как интерпретируешь ситуацию?",
    options: {
      A: "Нужно больше времени привыкнуть",
      B: "Проблема в дисциплине сотрудников",
      C: "Нужно чаще синхронизироваться",
      D: "Внедрили визуализацию, но не начали управлять системой потока"
    }
  },
  {
    id: 2,
    text: "Руководитель говорит: «У нас Kanban есть, потому что задачи на доске». Самое слабое место?",
    options: {
      A: "Недооценивает пользу визуализации",
      B: "Путает Kanban с отображением задач",
      C: "Не учитывает важность встреч",
      D: "Думает об инструменте, а не о системе управления потоком"
    }
  },
  {
    id: 3,
    text: "Когда можно сказать, что команда реально начала работать в Kanban-подходе?",
    options: {
      A: "Когда у каждой задачи есть исполнитель",
      B: "Когда все задачи видны на доске",
      C: "Когда статусы регулярно обновляются",
      D: "Когда команда управляет потоком, ограничениями и правилами движения задач"
    }
  },
  {
    id: 4,
    text: "Много параллельных задач, все заняты, но пробуксовка растёт. Что важнее всего?",
    options: {
      A: "Улучшить декомпозицию",
      B: "Чаще проводить встречи",
      C: "Точнее формулировать требования",
      D: "Снижать незавершённую работу, а не повышать занятость"
    }
  },
  {
    id: 5,
    text: "Что отличает зрелое Kanban-мышление от поверхностного?",
    options: {
      A: "Быстро обновлять доску",
      B: "Ставить дедлайны по задачам",
      C: "Следить за занятостью команды",
      D: "Видеть работу как систему потока, а не набор карточек"
    }
  },
  {
    id: 6,
    text: "Почему Kanban часто не доходит до зрелого уровня?",
    options: {
      A: "У людей мало времени",
      B: "Его считают слишком простым",
      C: "Команды не любят ограничения",
      D: "Визуализация проста, а управление системой требует зрелого мышления"
    }
  },
  {
    id: 7,
    text: "Команда: «Kanban не нужен, у нас есть таск-трекер». Что это показывает?",
    options: {
      A: "Команда не хочет меняться",
      B: "Недооценивают Jira",
      C: "Избегают новых практик",
      D: "Фокус на инструменте, а не на принципах управления потоком"
    }
  },
  {
    id: 8,
    text: "Главная ценность Kanban для зрелой команды:",
    options: {
      A: "Больше прозрачности по задачам",
      B: "Более красивая доска",
      C: "Удобное распределение работы",
      D: "Предсказуемый, управляемый и устойчивый поток"
    }
  },

  {
    id: 9,
    text: "В колонке «В работе» смешаны анализ, согласование, разработка, тестирование. Главный риск?",
    options: {
      A: "Колонка слишком длинная",
      B: "Неудобно обновлять статусы",
      C: "Сложно считать задачи",
      D: "Скрываются реальные стадии потока и узкие места"
    }
  },
  {
    id: 10,
    text: "Когда стоит пересматривать структуру Kanban-доски?",
    options: {
      A: "Когда не нравится визуально",
      B: "Когда пришёл новый руководитель",
      C: "Когда задач стало много",
      D: "Когда визуализация перестаёт отражать реальную систему потока"
    }
  },
  {
    id: 11,
    text: "Policies описаны, но не используются. Что это показывает?",
    options: {
      A: "Слишком сложные правила",
      B: "Команда не любит регламенты",
      C: "Нужно чаще напоминать",
      D: "Policies не встроены в реальные решения и поведение системы"
    }
  },
  {
    id: 12,
    text: "Зачем explicit policies, если команда «и так всё понимает»?",
    options: {
      A: "Для формальности",
      B: "Для онбординга",
      C: "Для контроля руководителя",
      D: "Чтобы снизить неоднозначность и сделать поток управляемым"
    }
  },
  {
    id: 13,
    text: "Есть срочные, плановые и support-задачи. Как смотреть на это в Kanban?",
    options: {
      A: "Смешать в один поток",
      B: "Срочное просто делать быстрее",
      C: "Добавить ярлыки",
      D: "Определить типы работ и правила прохождения через систему"
    }
  },
  {
    id: 14,
    text: "Почему плохая визуализация опасна даже в сильной команде?",
    options: {
      A: "Портит интерфейс",
      B: "Люди путаются в цветах",
      C: "Слишком много элементов",
      D: "Скрывает накопления, ожидания и блокировки"
    }
  },
  {
    id: 15,
    text: "Команда хочет добавить много статусов для «точности». Главный риск?",
    options: {
      A: "Некрасиво",
      B: "Забудут обновлять",
      C: "Руководитель запутается",
      D: "Избыточная детализация ухудшит управляемость системы"
    }
  },
  {
    id: 16,
    text: "Что показывает зрелую визуализацию в Kanban?",
    options: {
      A: "Много цветов и пометок",
      B: "Каждый ведёт свои карточки",
      C: "Совпадает со структурой отдела",
      D: "Отражает систему работы, которой реально управляют"
    }
  },

  {
    id: 17,
    text: "Высокая загрузка людей = эффективность. Почему это опасно в Kanban?",
    options: {
      A: "Люди устают",
      B: "Задачи сложнее",
      C: "Снижается мотивация",
      D: "Локальная загрузка ухудшает общий flow и увеличивает срок поставки"
    }
  },
  {
    id: 18,
    text: "WIP не ограничивают, чтобы никто не простаивал. Главный просчёт?",
    options: {
      A: "Мало задач в бэклоге",
      B: "Ошибка ресурсного плана",
      C: "Слабый контроль менеджера",
      D: "Путают занятость с управлением скоростью и качеством потока"
    }
  },
  {
    id: 19,
    text: "Что чаще всего становится видно после ввода WIP-лимитов?",
    options: {
      A: "Люди работают медленнее",
      B: "Слишком мало задач",
      C: "Нужно больше людей",
      D: "Скрытые блокировки, ожидания и узкие места"
    }
  },
  {
    id: 20,
    text: "Как понять, что WIP-лимиты работают плохо?",
    options: {
      A: "Команде не нравятся ограничения",
      B: "На доске мало карточек",
      C: "Руководитель не успевает следить",
      D: "Лимиты не улучшают flow и не меняют поведение системы"
    }
  },
  {
    id: 21,
    text: "Почему важно смотреть на возраст задач?",
    options: {
      A: "Быстрее закрывать старые",
      B: "Не забывать дедлайны",
      C: "Оценивать сотрудников",
      D: "Видеть риск накопления проблем и падения предсказуемости"
    }
  },
  {
    id: 22,
    text: "Команда быстро начинает, но медленно завершает. Как это влияет на систему?",
    options: {
      A: "Ничего страшного",
      B: "Это нормально",
      C: "Нужно улучшить планирование",
      D: "Flow становится нестабильным и predictability падает"
    }
  },
  {
    id: 23,
    text: "Что означает хороший flow?",
    options: {
      A: "Задачи двигаются каждый день",
      B: "Все постоянно заняты",
      C: "Нет простаивающих сотрудников",
      D: "Работа проходит с понятной скоростью и без хаотических пробок"
    }
  },
  {
    id: 24,
    text: "Что выгоднее системно: начинать больше задач или завершать начатые?",
    options: {
      A: "Начинать больше",
      B: "Зависит от настроения команды",
      C: "Нужен баланс",
      D: "Улучшать завершение работы и снижать фронт незавершёнки"
    }
  },

  {
    id: 25,
    text: "Успех меряют количеством закрытых задач. Почему этого недостаточно?",
    options: {
      A: "Задач может быть мало",
      B: "Это неинтересная метрика",
      C: "Руководству нужны другие отчёты",
      D: "Не видно качество потока, предсказуемость и ценность поставки"
    }
  },
  {
    id: 26,
    text: "Throughput растёт. Значит система точно стала лучше?",
    options: {
      A: "Да",
      B: "Почти всегда да",
      C: "Скорее да",
      D: "Нет, без контекста качества, размера работы и результата это не доказательство"
    }
  },
  {
    id: 27,
    text: "Почему Cycle Time — ключевая метрика?",
    options: {
      A: "Её легко считать",
      B: "Она нравится руководителям",
      C: "Показывает скорость сотрудников",
      D: "Показывает реальное время прохождения работы через систему"
    }
  },
  {
    id: 28,
    text: "Сроки обещают «по ощущениям», без probabilistic forecasting. Что это показывает?",
    options: {
      A: "У команды хороший опыт",
      B: "Это нормальный подход",
      C: "Если раньше срабатывало, то ок",
      D: "Команда ещё не перешла к зрелому управлению predictability"
    }
  },
  {
    id: 29,
    text: "Зачем нужны Flow Metrics, кроме статусов на доске?",
    options: {
      A: "Красивые отчёты",
      B: "Сравнивать сотрудников",
      C: "Контролировать дисциплину",
      D: "Принимать решения по поведению системы, а не по интуиции"
    }
  },
  {
    id: 30,
    text: "SLE регулярно не выполняется. Как правильно смотреть на проблему?",
    options: {
      A: "Люди недостаточно стараются",
      B: "Нужно сильнее давить",
      C: "Чаще напоминать о дедлайнах",
      D: "Система не обеспечивает стабильный flow — нужен анализ причин"
    }
  },
  {
    id: 31,
    text: "Что отличает зрелый подход к метрикам в Kanban?",
    options: {
      A: "Много графиков",
      B: "Регулярные отчёты",
      C: "Подсчёт продуктивности сотрудников",
      D: "Метрики как инструмент управления системой, а не отчётности"
    }
  },
  {
    id: 32,
    text: "Есть застревающие задачи, но смотрят только средние значения. В чём ошибка?",
    options: {
      A: "Средние всегда точнее",
      B: "Не хватает аналитика",
      C: "Нужно больше данных",
      D: "Средние скрывают вариативность, а управлять нужно распределением"
    }
  },

  {
    id: 33,
    text: "Компания хочет внедрить Kanban сразу во всех отделах. Насколько это зрелый подход?",
    options: {
      A: "Полностью зрелый",
      B: "В целом нормально",
      C: "Допустимо при сильном проектном управлении",
      D: "Kanban строится на evolutionary change, а не на массовом внедрении"
    }
  },
  {
    id: 34,
    text: "Почему Kanban называют эволюционным методом изменений?",
    options: {
      A: "Он внедряется дольше",
      B: "Не требует митингов",
      C: "Только для зрелых команд",
      D: "Позволяет улучшать текущую систему шаг за шагом"
    }
  },
  {
    id: 35,
    text: "Ввели WIP и метрики, но руководитель постоянно обходит систему. Что это означает?",
    options: {
      A: "Это нормально для бизнеса",
      B: "Руководитель помогает",
      C: "Иногда так можно",
      D: "Локальные практики не удержатся при противоречивом управлении"
    }
  },
  {
    id: 36,
    text: "Что показывает высокий уровень Kanban-зрелости у руководителя?",
    options: {
      A: "Знает терминологию",
      B: "Требует вести доску",
      C: "Ходит на статус-встречи",
      D: "Принимает решения по поведению системы потока, а не вручную"
    }
  },
  {
    id: 37,
    text: "Почему важно смотреть и на maturity системы, а не только на текущий поток?",
    options: {
      A: "Чтобы добавлять практики",
      B: "Чтобы лучше обучать команду",
      C: "Чтобы соответствовать стандартам",
      D: "Без роста зрелости система быстро упирается в потолок"
    }
  },
  {
    id: 38,
    text: "Какой вопрос чаще задаёт человек уровня Kanban Pro?",
    options: {
      A: "Какие колонки добавить?",
      B: "Кто отвечает за задачу?",
      C: "Когда закроем?",
      D: "Что в системе мешает потоку быть предсказуемым и устойчивым?"
    }
  },
  {
    id: 39,
    text: "Команда «знает Kanban, потому что использует каждый день». Что проверишь первым делом?",
    options: {
      A: "Как часто обновляют карточки",
      B: "Как оформлены задачи",
      C: "Сколько колонок",
      D: "Как управляют WIP, метриками, policies, predictability и улучшениями"
    }
  },
  {
    id: 40,
    text: "Что отличает уровень Kanban Pro от просто хорошей практики?",
    options: {
      A: "Знание терминов",
      B: "Умение вести доску",
      C: "Опыт в нескольких командах",
      D: "Способность управлять зрелостью системы, а не только потоком задач"
    }
  }
];

const LEVELS: Record<LevelKey, LevelResult> = {
  visualization: {
    key: "visualization",
    title: "Визуализация",
    scoreRange: "40–80",
    summary:
      "Ты уже используешь элементы Kanban, но пока воспринимаешь его в первую очередь как доску задач.",
    strengths: [
      "Есть прозрачность текущей работы",
      "Команда видит статус задач",
      "Есть база для перехода к зрелому подходу"
    ],
    gaps: [
      "WIP, policies и flow пока не стали частью мышления",
      "Решения слабо опираются на поведение системы",
      "Метрики потока используются ограниченно"
    ],
    blocker: "Главный барьер: Kanban пока инструмент прозрачности, а не управляемости.",
    recommendation:
      "Прокачай логику потока, explicit policies, роль WIP-лимитов и базовые Flow Metrics.",
    ctaLabel: "Перейти к Kanban Pro",
    ctaHref: COURSE_URL
  },
  flow: {
    key: "flow",
    title: "Поток",
    scoreRange: "81–120",
    summary:
      "Ты уже понимаешь, что Kanban — это не просто доска, и начинаешь осознанно работать с flow.",
    strengths: [
      "Замечаешь перегруз и узкие места",
      "Понимаешь ценность ограничения WIP",
      "Есть практическая база управления потоком"
    ],
    gaps: [
      "Нестабильная predictability",
      "Метрики и policies не всегда влияют на решения",
      "SLE и forecasting используются нерегулярно"
    ],
    blocker: "Главный барьер: от понимания потока к управлению системой целиком.",
    recommendation:
      "Усиль работу с Cycle Time, throughput, SLE и probabilistic forecasting.",
    ctaLabel: "Выйти на уровень Kanban Pro",
    ctaHref: COURSE_URL
  },
  system: {
    key: "system",
    title: "Управление системой",
    scoreRange: "121–140",
    summary:
      "Ты смотришь на Kanban глубже среднего и используешь его как инструмент управления системой.",
    strengths: [
      "Работаешь с ограничениями и метриками осознанно",
      "Умеешь видеть системные узкие места",
      "Понимаешь связь predictability и управляемости"
    ],
    gaps: [
      "Не всё доведено до уровня организационной зрелости",
      "Сервисный подход применяется не везде",
      "Эволюционные изменения не всегда масштабируются"
    ],
    blocker: "Главный барьер: переход от сильной практики к уровню Pro-лидера системы.",
    recommendation:
      "Прокачай maturity-подход, сервисную модель и управленческую интерпретацию метрик.",
    ctaLabel: "Перейти на уровень Pro",
    ctaHref: COURSE_URL
  },
  pro: {
    key: "pro",
    title: "Kanban Pro",
    scoreRange: "141–160",
    summary:
      "У тебя сильное Kanban-мышление: ты управляешь системой потока, зрелостью и эволюционными изменениями.",
    strengths: [
      "Смотришь на Kanban как на управленческую систему",
      "Умеешь связывать метрики, predictability и результат",
      "Видишь архитектуру работы, а не только локальные проблемы"
    ],
    gaps: [
      "Потенциал роста — масштаб влияния",
      "Усиление бизнес-контекста применения",
      "Глубже встроить Kanban в стратегический контур"
    ],
    blocker: "Главный барьер: не уровень практики, а уровень масштаба.",
    recommendation:
      "Усиль архитектурный слой: применяй Kanban для системных изменений на уровне бизнеса.",
    ctaLabel: "Усилить уровень Kanban Pro",
    ctaHref: COURSE_URL
  }
};

const LEVEL_STYLES: Record<LevelKey, { chip: string; panel: string }> = {
  visualization: {
    chip: "border-[#ef9a9a] bg-[#ffebee] text-[#9f2f2f]",
    panel: "border-[#efc7c7] bg-[linear-gradient(135deg,#fff3f3_0%,#fff8f8_100%)]"
  },
  flow: {
    chip: "border-[#f4b36a] bg-[#fff3e5] text-[#9c5300]",
    panel: "border-[#f3d1a7] bg-[linear-gradient(135deg,#fff7ea_0%,#fffaf2_100%)]"
  },
  system: {
    chip: "border-[#e9d06b] bg-[#fffbe6] text-[#7c6800]",
    panel: "border-[#efe19a] bg-[linear-gradient(135deg,#fffde8_0%,#fffef5_100%)]"
  },
  pro: {
    chip: "border-[#7ccf8d] bg-[#e8f9ed] text-[#1e7a38]",
    panel: "border-[#b8e6c4] bg-[linear-gradient(135deg,#edfdf2_0%,#f7fff9_100%)]"
  }
};

function resolveLevel(score: number): LevelResult {
  if (score <= 80) return LEVELS.visualization;
  if (score <= 120) return LEVELS.flow;
  if (score <= 140) return LEVELS.system;
  return LEVELS.pro;
}

export function KanbanProQuiz(): JSX.Element {
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
    trackGoal("diagnostics_kanban_pro_quiz_start", { questions_total: QUESTIONS.length });
  }

  function chooseAnswer(key: OptionKey): void {
    setAnswers((prev) => ({ ...prev, [question.id]: key }));
  }

  function goBack(): void {
    if (index > 0) setIndex((prev) => prev - 1);
  }

  function goNext(): void {
    if (!selected) return;
    trackGoal("diagnostics_kanban_pro_quiz_step_next", {
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
      trackGoal("diagnostics_kanban_pro_quiz_complete", {
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
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Новая диагностика</p>
        <h2 className="mt-3 max-w-[18ch] text-4xl font-black leading-[0.95] tracking-tight text-slate-900 md:text-5xl">
          Насколько ты готов к уровню Kanban Pro
        </h2>
        <p className="mt-4 text-base leading-8 text-slate-700 md:text-lg">
          Диагностика для тех, кто хочет управлять не доской задач, а системой потока.
        </p>
        <div className="mt-5 grid gap-2 text-sm text-slate-600 md:grid-cols-3">
          <p>Ситуационные кейсы</p>
          <p>Проверка зрелости Kanban-мышления</p>
          <p>Разбор + следующий шаг роста</p>
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

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-slate-200/80 bg-white/70 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Где ты силён</p>
            <ul className="mt-2 space-y-2 text-sm leading-7 text-slate-700">
              {result.strengths.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-slate-200/80 bg-white/70 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Что слабее</p>
            <ul className="mt-2 space-y-2 text-sm leading-7 text-slate-700">
              {result.gaps.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-5 rounded-xl border border-slate-200/80 bg-white/70 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Что мешает перейти выше</p>
          <p className="mt-2 text-sm leading-7 text-slate-700">{result.blocker}</p>
        </div>

        <div className="mt-5 rounded-xl border border-slate-200/80 bg-white/70 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Рекомендация</p>
          <p className="mt-2 text-sm leading-7 text-slate-700">{result.recommendation}</p>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href={result.ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackGoal("diagnostics_kanban_pro_quiz_cta_click", {
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
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{getBlockTitle(question.id)}</p>
          <p className="mt-1 text-sm font-medium text-slate-600">
            Вопрос {index + 1} из {QUESTIONS.length}
          </p>
        </div>
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
