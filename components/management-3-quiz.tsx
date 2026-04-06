"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { YANDEX_METRIKA_ID } from "@/lib/constants";

type OptionKey = "A" | "B" | "C" | "D";
type LevelKey = "control" | "coordination" | "development" | "management3";

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
  recommendation: string;
  ctaLabel: string;
  ctaHref: string;
};

const COURSE_URL = "https://stepik.org/course/270055/promo";
const OPTION_SCORES: Record<OptionKey, number> = { A: 1, B: 2, C: 3, D: 4 };

function getBlockTitle(questionId: number): string {
  if (questionId <= 8) return "Блок 1: Роль руководителя";
  if (questionId <= 16) return "Блок 2: Мотивация и вовлечённость";
  if (questionId <= 24) return "Блок 3: Делегирование и автономия";
  if (questionId <= 32) return "Блок 4: Обратная связь и развитие";
  return "Блок 5: Сложность и зрелость";
}

const QUESTIONS: QuizQuestion[] = [
  { id: 1, text: "Команда ждёт твоих решений по каждому сложному вопросу. Как интерпретируешь ситуацию?", options: { A: "Так и должно быть", B: "Нужно усилить дисциплину", C: "Людям не хватает опыта", D: "Система управления делает команду зависимой от руководителя" } },
  { id: 2, text: "Сильные специалисты работают разрозненно и не чувствуют общей ответственности. Что это значит?", options: { A: "Нужны личные KPI", B: "Так бывает всегда", C: "Нужно больше синхронизаций", D: "Нет общей цели и коллективной ответственности за результат" } },
  { id: 3, text: "Какой подход ближе к зрелому руководителю?", options: { A: "Лично контролировать всё важное", B: "Жёстко управлять через регламенты", C: "Быть главным центром решений", D: "Строить условия для ответственности, роста и самостоятельности команды" } },
  { id: 4, text: "Фраза «без меня всё развалится» чаще всего означает:", options: { A: "Высокую вовлечённость", B: "Сильное лидерство", C: "Глубокое понимание бизнеса", D: "Слабую систему, зависящую от одного человека" } },
  { id: 5, text: "Ключевое отличие Management 3.0 от старой школы:", options: { A: "Больше поддержки, меньше критики", B: "Более мягкий стиль", C: "Меньше операционки", D: "Управление системой мотивации, взаимодействия и развития, а не только людьми" } },
  { id: 6, text: "Команда выполняет план, но не инициирует улучшений. Какой вывод точнее?", options: { A: "Значит всех устраивает", B: "Инициатива не обязательна", C: "Нужно поставить задачу на идеи", D: "В команде нет безопасной среды для инициативы и влияния" } },
  { id: 7, text: "Почему директивный менеджмент перестаёт работать в сложной среде?", options: { A: "Люди стали менее дисциплинированными", B: "Плохо воспринимают иерархию", C: "Удалёнка мешает контролю", D: "Сложность нельзя эффективно вести только приказами и контролем" } },
  { id: 8, text: "Как понять, что руководитель реально движется к современному управлению?", options: { A: "Реже критикует", B: "Чаще делает 1:1", C: "Даёт больше свободы", D: "Меняет систему ответственности, обратной связи и развития" } },

  { id: 9, text: "Люди выполняют задачи без интереса и инициативы. Какой подход зрелый?", options: { A: "Усилить контроль", B: "Добавить деньги", C: "Чаще напоминать о важности", D: "Разобрать системные причины: смысл, автономия, признание, рост" } },
  { id: 10, text: "Почему мотивация только через бонусы/штрафы ограничена?", options: { A: "Привыкают к деньгам", B: "Система не всегда справедлива", C: "Все люди разные", D: "Нужны внутренние драйверы: смысл, влияние, развитие и доверие" } },
  { id: 11, text: "Сотрудник делает только то, что сказали. Что проверить сначала?", options: { A: "Зарплату", B: "Выгорание", C: "Сложность задач", D: "Есть ли смысл, влияние и пространство для инициативы" } },
  { id: 12, text: "Один сотрудник мотивирован, остальные «на минимуме». Реакция зрелого руководителя:", options: { A: "Сделать ставку на сильного", B: "Поднять требования ко всем", C: "Ужесточить включение", D: "Искать системные причины в среде и управлении" } },
  { id: 13, text: "Почему мотивация — это не только личность сотрудника?", options: { A: "Настроение меняется", B: "Все зависят от руководителя", C: "Поколения разные", D: "Среда управления напрямую влияет на вовлечённость" } },
  { id: 14, text: "Что чаще всего убивает вовлечённость сильных людей?", options: { A: "Большой объём работы", B: "Сложные задачи", C: "Непонятные KPI", D: "Нет смысла, влияния и развития при высокой нагрузке" } },
  { id: 15, text: "Если команда «без огня в глазах», какой вопрос полезнее руководителю?", options: { A: "Как заставить включаться", B: "Какую мотивацию дать", C: "Кого заменить", D: "Что в моей системе управления делает людей пассивными" } },
  { id: 16, text: "Что отличает зрелый подход к мотивации?", options: { A: "Сильная бонусная схема", B: "Поддержка в сложные периоды", C: "Чёткие цели и контроль", D: "Среда, где люди включаются из внутренней мотивации" } },

  { id: 17, text: "«Команда слишком слабая для делегирования». Наиболее зрелый вывод:", options: { A: "Действительно слабая команда", B: "Делегировать только простое", C: "Сложное держать у себя", D: "Проблема может быть в системе делегирования и развития автономии" } },
  { id: 18, text: "Делегировали задачу без контекста и полномочий. Что произойдёт?", options: { A: "Ничего критичного", B: "Будут уточняющие вопросы", C: "Сделают медленнее", D: "Сотрудник останется зависимым и не сможет влиять на результат" } },
  { id: 19, text: "Признак незрелого делегирования:", options: { A: "Руководитель проверяет результат", B: "Люди задают уточнения", C: "Не всё делают идеально", D: "Ответственность фактически остаётся у руководителя" } },
  { id: 20, text: "Почему автономия не появляется от фразы «работайте самостоятельно»?", options: { A: "Нужно время", B: "Люди неуверенные", C: "Нужен опыт", D: "Нужны границы, доверие, полномочия и отказ от возврата к микроконтролю" } },
  { id: 21, text: "Сотрудник сделал не так, как ожидали. Подход ближе к Management 3.0:", options: { A: "Забрать задачи обратно", B: "Жёстко указать и не рисковать", C: "Ещё раз объяснить", D: "Использовать как точку обучения и роста самостоятельности" } },
  { id: 22, text: "Главная сложность делегирования для руководителя:", options: { A: "Люди не хотят новых задач", B: "Нужно много объяснять", C: "Сложно выбрать исполнителя", D: "Нужно отпустить роль единственного центра решений" } },
  { id: 23, text: "Что отличает зрелое доверие от наивного?", options: { A: "Позитив к сотрудникам", B: "Минимум контроля", C: "Уверенность, что не подведут", D: "Договорённости, прозрачность, границы и развитие ответственности" } },
  { id: 24, text: "Как понять, что команда взрослеет?", options: { A: "Меньше жалуются", B: "Быстрее закрывают задачи", C: "Меньше вопросов на встречах", D: "Самостоятельно решают, улучшают и берут ответственность за общий результат" } },

  { id: 25, text: "Обратная связь только при ошибках. Последствие чаще всего:", options: { A: "Больше внимательности", B: "Понимание слабых мест", C: "Рост дисциплины", D: "Люди боятся расти и начинают избегать ошибок любой ценой" } },
  { id: 26, text: "Почему обратная связь не должна сводиться к критике?", options: { A: "Критика демотивирует", B: "Людям важна поддержка", C: "Критика редко меняет поведение", D: "Сильная обратная связь усиливает поведение и рост" } },
  { id: 27, text: "Люди не поднимают проблемы открыто, обсуждают кулуарно. Что это значит?", options: { A: "Сложные характеры", B: "Мало встреч", C: "Нужна коммуникация", D: "Низкая психологическая безопасность и слабый конструктивный диалог" } },
  { id: 28, text: "Почему важно работать с качеством взаимодействия, а не только задачами?", options: { A: "Атмосфера приятнее", B: "Лояльность выше", C: "Меньше конфликтов", D: "Результат зависит от способности команды договариваться и решать проблемы вместе" } },
  { id: 29, text: "Признак зрелой обратной связи:", options: { A: "Умеют говорить неприятное", B: "Регулярные one-to-one", C: "Есть правила обсуждений", D: "Обратная связь усиливает поведение и результат" } },
  { id: 30, text: "Сотрудник повторяет ошибку, несмотря на замечания. Зрелый подход:", options: { A: "Ужесточить контроль", B: "Убрать такие задачи", C: "Снова объяснить", D: "Проверить, почему не меняется поведение: навык, контекст, мотивация, среда" } },
  { id: 31, text: "Почему развитие команды не сводится к обучению отдельных людей?", options: { A: "Обучение редко работает", B: "Быстро забывают", C: "Нужно через KPI", D: "Команда развивается как система: культура, правила, взаимодействие, ответственность" } },
  { id: 32, text: "Если команда не растёт, какой вопрос полезнее руководителю?", options: { A: "Кого заменить", B: "Каких компетенций не хватает", C: "Какие тренинги нужны", D: "Что в системе мешает росту зрелости людей и команды" } },

  { id: 33, text: "Среда сложная и непредсказуемая. Какой стиль опаснее всего?", options: { A: "Поддерживающий с синхронизацией", B: "Гибкий, через контекст", C: "Командный с обсуждением", D: "Жёстко директивный, как в линейной среде" } },
  { id: 34, text: "Почему нельзя опираться только на инструкции и регламенты?", options: { A: "Их не читают", B: "Это долго", C: "Быстро устаревают", D: "Нужны самостоятельное мышление, договорённости и адаптация команды" } },
  { id: 35, text: "Что больше показывает зрелость руководителя в изменениях?", options: { A: "Быстро меняет планы", B: "Держит людей в тонусе", C: "Лично всё разруливает", D: "Удерживает направление и растит адаптивность без возврата к тотальному контролю" } },
  { id: 36, text: "Компания декларирует гибкость, но поощряет только безошибочность и подчинение. Что это создаёт?", options: { A: "Высокую дисциплину", B: "Устойчивую культуру", C: "Предсказуемость", D: "Конфликт между декларируемой гибкостью и реальным управлением" } },
  { id: 37, text: "Что чаще тормозит переход на Management 3.0?", options: { A: "Нет времени на обучение", B: "Перегруз операционкой", C: "Мало HR-поддержки", D: "Привычка управлять через контроль и личную незаменимость" } },
  { id: 38, text: "Почему современное управление нельзя свести к инструментам?", options: { A: "Техники устаревают", B: "Команды разные", C: "Не везде работают", D: "Без смены управленческой логики инструменты становятся формальностью" } },
  { id: 39, text: "Как понять, что команда реально взрослеет?", options: { A: "Меньше спорят", B: "Встречи быстрее", C: "Реже вмешивается руководитель", D: "Команда самостоятельнее, ответственнее и улучшает работу без внешнего давления" } },
  { id: 40, text: "Что отличает руководителя уровня Management 3.0?", options: { A: "Лучше знает людей", B: "Умеет вдохновлять", C: "Хорошо сочетает контроль и доверие", D: "Управляет системой мотивации, развития и взаимодействия в сложной среде" } }
];

const LEVELS: Record<LevelKey, LevelResult> = {
  control: {
    key: "control",
    title: "Контроль",
    scoreRange: "40–80",
    summary:
      "Ты управляешь в основном через задачи, личное участие и контроль. Это даёт управляемость, но ограничивает рост команды.",
    strengths: [
      "Сильный личный контроль исполнения",
      "Высокая вовлечённость руководителя",
      "Способность оперативно решать задачи вручную"
    ],
    gaps: [
      "Слабая автономия и делегирование",
      "Зависимость результата от одного человека",
      "Ограниченная вовлечённость и ответственность команды"
    ],
    recommendation:
      "Переходи от ручного контроля к управлению системой: мотивация, автономия, обратная связь и рост людей.",
    ctaLabel: "Перейти к курсу Management 3.0",
    ctaHref: COURSE_URL
  },
  coordination: {
    key: "coordination",
    title: "Координация",
    scoreRange: "81–120",
    summary:
      "Ты уже выходишь из жёсткого контроля, но управленческая система пока недостаточно зрелая и устойчивая.",
    strengths: [
      "Есть понимание командной динамики",
      "Работаешь не только с задачами, но и с людьми",
      "Есть зачатки доверия и делегирования"
    ],
    gaps: [
      "Недостаточно среды для инициативы",
      "Обратная связь не всегда развивающая",
      "Самоорганизация команды нестабильна"
    ],
    recommendation:
      "Усиль культуру обратной связи, автономию и системную мотивацию, чтобы команда стала устойчиво самостоятельной.",
    ctaLabel: "Выйти на уровень Management 3.0",
    ctaHref: COURSE_URL
  },
  development: {
    key: "development",
    title: "Развитие",
    scoreRange: "121–140",
    summary:
      "Ты уже работаешь через развитие, доверие и среду. Это сильный уровень современного руководства.",
    strengths: [
      "Видишь команду как систему, а не набор исполнителей",
      "Поддерживаешь рост автономии и ответственности",
      "Работаешь с вовлечённостью и культурой взаимодействия"
    ],
    gaps: [
      "Не всегда хватает системного лидерства в сложной среде",
      "Нужна более воспроизводимая архитектура мотивации",
      "Рост команды может зависеть от личного стиля руководителя"
    ],
    recommendation:
      "Собери практику в цельную систему: усили управленческий дизайн среды, развития и командной зрелости.",
    ctaLabel: "Усилить свой уровень в Management 3.0",
    ctaHref: COURSE_URL
  },
  management3: {
    key: "management3",
    title: "Management 3.0",
    scoreRange: "141–160",
    summary:
      "У тебя зрелое современное управление: ты работаешь через систему взаимодействия, мотивации, развития и устойчивого результата.",
    strengths: [
      "Управляешь условиями, а не только исполнением",
      "Сильная работа с доверием и ответственностью команды",
      "Хорошее понимание сложности и адаптивности среды"
    ],
    gaps: [
      "Точка роста — масштабирование подхода на большее число команд",
      "Усиление воспроизводимости практик на уровне организации",
      "Более глубокая связка управленческой системы и бизнес-целей"
    ],
    recommendation:
      "Структурируй и усили текущие практики, чтобы применять Management 3.0 стабильнее, глубже и шире.",
    ctaLabel: "Пройти курс Management 3.0",
    ctaHref: COURSE_URL
  }
};

const LEVEL_STYLES: Record<LevelKey, { chip: string; panel: string }> = {
  control: {
    chip: "border-[#ef9a9a] bg-[#ffebee] text-[#9f2f2f]",
    panel: "border-[#efc7c7] bg-[linear-gradient(135deg,#fff3f3_0%,#fff8f8_100%)]"
  },
  coordination: {
    chip: "border-[#f4b36a] bg-[#fff3e5] text-[#9c5300]",
    panel: "border-[#f3d1a7] bg-[linear-gradient(135deg,#fff7ea_0%,#fffaf2_100%)]"
  },
  development: {
    chip: "border-[#e9d06b] bg-[#fffbe6] text-[#7c6800]",
    panel: "border-[#efe19a] bg-[linear-gradient(135deg,#fffde8_0%,#fffef5_100%)]"
  },
  management3: {
    chip: "border-[#7ccf8d] bg-[#e8f9ed] text-[#1e7a38]",
    panel: "border-[#b8e6c4] bg-[linear-gradient(135deg,#edfdf2_0%,#f7fff9_100%)]"
  }
};

function resolveLevel(score: number): LevelResult {
  if (score <= 80) return LEVELS.control;
  if (score <= 120) return LEVELS.coordination;
  if (score <= 140) return LEVELS.development;
  return LEVELS.management3;
}

export function Management3Quiz(): JSX.Element {
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
    trackGoal("diagnostics_management3_quiz_start", { questions_total: QUESTIONS.length });
  }

  function chooseAnswer(key: OptionKey): void {
    setAnswers((prev) => ({ ...prev, [question.id]: key }));
  }

  function goBack(): void {
    if (index > 0) setIndex((prev) => prev - 1);
  }

  function goNext(): void {
    if (!selected) return;
    trackGoal("diagnostics_management3_quiz_step_next", {
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
      trackGoal("diagnostics_management3_quiz_complete", {
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
          Насколько ты готов к Management 3.0
        </h2>
        <p className="mt-4 text-base leading-8 text-slate-700 md:text-lg">
          Диагностика для руководителей, которые хотят усилить команды в сложной среде.
        </p>
        <div className="mt-5 grid gap-2 text-sm text-slate-600 md:grid-cols-3">
          <p>Ситуационные кейсы управления</p>
          <p>Оценка зрелости руководителя</p>
          <p>Разрыв + рекомендации + следующий шаг</p>
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
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Рекомендация</p>
          <p className="mt-2 text-sm leading-7 text-slate-700">{result.recommendation}</p>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href={result.ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackGoal("diagnostics_management3_quiz_cta_click", {
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
