"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { YANDEX_METRIKA_ID } from "@/lib/constants";

type OptionKey = "A" | "B" | "C" | "D";
type LevelKey = "low-fit" | "base-fit" | "good-fit" | "strong-fit";

type QuizQuestion = {
  id: number;
  text: string;
  options: Record<OptionKey, string>;
  scores: Record<OptionKey, number>;
};

type LevelResult = {
  key: LevelKey;
  title: string;
  scoreRange: string;
  summary: string;
  insights: string[];
  recommendation: string;
};

const COURSE_URL = "https://stepik.org/course/271603/promo";

function getBlockTitle(questionId: number): string {
  if (questionId <= 8) return "Блок 1: Взаимодействие с людьми и командой";
  if (questionId <= 16) return "Блок 2: Неопределённость и изменения";
  if (questionId <= 24) return "Блок 3: Фасилитация и диалог";
  if (questionId <= 32) return "Блок 4: Системное и процессное мышление";
  return "Блок 5: Лидерство без власти";
}

const DEFAULT_SCORES: Record<OptionKey, number> = {
  A: 1,
  B: 4,
  C: 3,
  D: 2
};

const QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    text: "В команде нарастает напряжение между двумя сильными специалистами. Что тебе ближе?",
    options: {
      A: "Не вмешиваться сразу: взрослые люди сами разберутся",
      B: "Понять корень напряжения и помочь команде спокойно проговорить проблему",
      C: "Быстро остановить спор и выбрать одно решение ради скорости",
      D: "Передать урегулирование руководителю"
    },
    scores: DEFAULT_SCORES
  },
  {
    id: 2,
    text: "На встречах часть команды молчит, хотя у людей есть мысли. Какой подход тебе ближе?",
    options: {
      A: "Если молчат, значит нечего добавить",
      B: "Создать более безопасный формат, чтобы включались даже тихие участники",
      C: "Спрашивать каждого по очереди, чтобы все высказались",
      D: "Сосредоточиться на активных, чтобы не затягивать встречу"
    },
    scores: DEFAULT_SCORES
  },
  {
    id: 3,
    text: "Один человек в команде стал тише и меньше вовлекаться, но задачи делает. Как ты на это смотришь?",
    options: {
      A: "Если задачи выполняются, всё в порядке",
      B: "Это сигнал: важно понять, не потерял ли человек смысл и влияние",
      C: "Поднимать тему только если начнёт мешать работе",
      D: "Это личная ответственность сотрудника, не командный вопрос"
    },
    scores: DEFAULT_SCORES
  },
  {
    id: 4,
    text: "В сложном обсуждении тебе ближе какая внутренняя позиция?",
    options: {
      A: "Главное быстро прийти к решению",
      B: "Важно и решение, и качество взаимопонимания в команде",
      C: "Поддержать более сильную по сути позицию",
      D: "Мне некомфортны такие обсуждения, лучше заранее известный ответ"
    },
    scores: DEFAULT_SCORES
  },
  {
    id: 5,
    text: "Что в командной работе интереснее всего лично тебе?",
    options: {
      A: "Распределение задач и контроль исполнения",
      B: "Как устроены отношения, договорённости и взаимодействие в команде",
      C: "Быстрое достижение результата любой ценой",
      D: "Сделать свою часть самому и не зависеть от остальных"
    },
    scores: DEFAULT_SCORES
  },
  {
    id: 6,
    text: "После нескольких неудачных спринтов команда теряет уверенность. Что тебе ближе?",
    options: {
      A: "Нужно жёстче требовать результат",
      B: "Помочь команде честно разобрать ситуацию без обвинений",
      C: "Дать людям время, пусть сами переживут период",
      D: "Быстро поднять мотивацию вдохновляющей речью"
    },
    scores: DEFAULT_SCORES
  },
  {
    id: 7,
    text: "В команде недоверие, недосказанность и перестраховка. Как ты это воспринимаешь?",
    options: {
      A: "Нормальная рабочая реальность",
      B: "Ключевая проблема: без доверия команда имитирует взаимодействие",
      C: "Некритично, если есть сильный руководитель",
      D: "Главное результат, личная химия вторична"
    },
    scores: DEFAULT_SCORES
  },
  {
    id: 8,
    text: "Что тебе ближе в работе с людьми?",
    options: {
      A: "Помогать группе договариваться и становиться сильнее как система",
      B: "Ставить задачи и контролировать темп",
      C: "Работать самому без долгих групповых процессов",
      D: "Подключаться только когда уже начались проблемы"
    },
    scores: {
      A: 4,
      B: 2,
      C: 1,
      D: 3
    }
  },
  {
    id: 9,
    text: "Приоритеты внезапно поменялись, команда раздражена. Что тебе ближе?",
    options: {
      A: "Если договорились, нужно идти по старому плану",
      B: "Это часть реальности: помочь команде перестроиться и вернуть ясность",
      C: "Сначала закончить старое, потом новое",
      D: "Ждать финальных указаний сверху"
    },
    scores: DEFAULT_SCORES
  },
  {
    id: 10,
    text: "В неопределённости у тебя чаще включается:",
    options: {
      A: "Желание срочно всё зафиксировать",
      B: "Интерес: отделить важное от шума",
      C: "Раздражение, потому что люблю предсказуемость",
      D: "Желание переложить решение на более властную роль"
    },
    scores: DEFAULT_SCORES
  },
  {
    id: 11,
    text: "Требования меняются, ясности мало. Что кажется самым правильным?",
    options: {
      A: "Добиться полной стабильности требований",
      B: "Помочь команде работать в условиях частичной неопределённости",
      C: "Просто ускориться, чтобы не тонуть в путанице",
      D: "Заморозить изменения, пока всё не прояснится"
    },
    scores: DEFAULT_SCORES
  },
  {
    id: 12,
    text: "План оказался слишком оптимистичным. Что тебе ближе?",
    options: {
      A: "План лучше не трогать",
      B: "Честно пересобрать ожидания и обсудить реальность",
      C: "Надавить, чтобы дотянуть исходный объём",
      D: "Не поднимать тему, пока не станет критично"
    },
    scores: DEFAULT_SCORES
  },
  {
    id: 13,
    text: "Как ты относишься к идее, что не всё можно идеально спланировать заранее?",
    options: {
      A: "Не близко: хорошая работа начинается с чёткого плана",
      B: "Естественно: важна адаптация без потери смысла",
      C: "Частично согласен, но лучше продумать всё максимально подробно",
      D: "Если нельзя спланировать, значит плохо подготовились"
    },
    scores: DEFAULT_SCORES
  },
  {
    id: 14,
    text: "Новая проблема без очевидного ответа. Какой стиль тебе ближе?",
    options: {
      A: "Найти эксперта и делать как он скажет",
      B: "Помочь команде выдвигать гипотезы, пробовать и извлекать выводы",
      C: "Отложить тему до большей ясности",
      D: "Взять первое рабочее решение без обсуждения"
    },
    scores: DEFAULT_SCORES
  },
  {
    id: 15,
    text: "Что тебе ближе по внутреннему ощущению?",
    options: {
      A: "Уверенность там, где всё заранее определено",
      B: "Полезен там, где нужно наводить порядок в сложной меняющейся среде",
      C: "Комфортнее в чёткой иерархии и следовании указаниям",
      D: "Постоянная адаптация отнимает слишком много энергии"
    },
    scores: DEFAULT_SCORES
  },
  {
    id: 16,
    text: "Неожиданные препятствия в работе команды. Какой взгляд тебе ближе?",
    options: {
      A: "Это просто помехи",
      B: "Это часть среды: важно учиться работать с ними как с системой",
      C: "Всё зависит от силы начальника",
      D: "Если препятствий много, команда плохо организована"
    },
    scores: DEFAULT_SCORES
  },
  {
    id: 17,
    text: "На встрече разговор уходит в сторону и ясности не прибавляется. Что тебе ближе?",
    options: {
      A: "Прервать и самому подвести итог",
      B: "Вернуть группу к сути: цель, структура, выход к решению",
      C: "Пусть говорят, пока не выговорятся",
      D: "Если не умеют обсуждать, встреча не нужна"
    },
    scores: DEFAULT_SCORES
  },
  {
    id: 18,
    text: "Когда группа застряла, какой стиль тебе ближе?",
    options: {
      A: "Дать готовый ответ",
      B: "Задать точные вопросы, чтобы команда сама увидела, где застряла",
      C: "Подождать, пока кто-то сильнее возьмёт разговор",
      D: "Сменить тему, чтобы снять напряжение"
    },
    scores: DEFAULT_SCORES
  },
  {
    id: 19,
    text: "После встречи нет ясности, к чему пришли. Как ты к этому относишься?",
    options: {
      A: "Нормально, потом разберутся",
      B: "Это проблема: встреча должна давать ясность и следующий шаг",
      C: "Главное, чтобы начальник понял итог",
      D: "Так всегда бывает, ничего страшного"
    },
    scores: DEFAULT_SCORES
  },
  {
    id: 20,
    text: "Обсуждение между людьми с разными взглядами. Что для тебя важнее?",
    options: {
      A: "Доказать, какая позиция сильнее",
      B: "Удержать пространство, где люди слышат друг друга и двигаются к решению",
      C: "Быстро свести всё к голосованию",
      D: "Минимизировать эмоции, остальное вторично"
    },
    scores: DEFAULT_SCORES
  },
  {
    id: 21,
    text: "Когда слушаешь людей на встрече, что тебе ближе?",
    options: {
      A: "Сразу определить, кто по делу",
      B: "Понять, что стоит за словами: страх, сопротивление, неясность, реальная проблема",
      C: "Сразу формулировать ответ",
      D: "Ждать своей очереди для решения"
    },
    scores: DEFAULT_SCORES
  },
  {
    id: 22,
    text: "Как тебе идея: фасилитация — это помогать людям думать лучше, а не вести за собой?",
    options: {
      A: "На практике людям нужен тот, кто скажет, что делать",
      B: "Это близко: сила роли в усилении коллективного мышления",
      C: "Работает только с очень зрелыми командами",
      D: "Мне ближе роль эксперта, чем процессного лидера"
    },
    scores: DEFAULT_SCORES
  },
  {
    id: 23,
    text: "Обсуждение превращается в монологи. Как воспринимаешь?",
    options: {
      A: "Обычная рабочая ситуация",
      B: "Признак слабого совместного мышления, с этим надо работать",
      C: "Повод сократить встречу",
      D: "Это ответственность самих участников"
    },
    scores: DEFAULT_SCORES
  },
  {
    id: 24,
    text: "Что важнее в хорошей встрече?",
    options: {
      A: "Чтобы была короткой",
      B: "Чтобы после неё было общее понимание и движение вперёд",
      C: "Чтобы присутствовали все нужные люди",
      D: "Чтобы никто не спорил"
    },
    scores: DEFAULT_SCORES
  },
  {
    id: 25,
    text: "Похожие задачи срываются уже третий раз. Какой взгляд тебе ближе?",
    options: {
      A: "Такое бывает, не надо искать глубокий смысл",
      B: "Повторяемость сигналит о системной проблеме",
      C: "Нужно жёстче спрашивать с исполнителей",
      D: "Главное закрыть текущий провал"
    },
    scores: DEFAULT_SCORES
  },
  {
    id: 26,
    text: "Команда много работает, но прогресс слабый. Что тебе ближе?",
    options: {
      A: "Поднять темп и контроль",
      B: "Похоже на проблему процесса: активности много, ценности мало",
      C: "Вероятно, не хватает мотивации",
      D: "Ничего необычного, так у всех"
    },
    scores: DEFAULT_SCORES
  },
  {
    id: 27,
    text: "Когда видишь проблему, тебе чаще хочется:",
    options: {
      A: "Найти, кто ошибся",
      B: "Понять, какая конструкция процесса регулярно даёт такой результат",
      C: "Быстро убрать симптом и идти дальше",
      D: "Поднять вопрос наверх, чтобы дали решение"
    },
    scores: DEFAULT_SCORES
  },
  {
    id: 28,
    text: "Команда постоянно жалуется на перегруз. Реакция ближе к:",
    options: {
      A: "Нужно учиться работать быстрее",
      B: "Это часто следствие системных перекосов: приоритетов, границ и потока",
      C: "Пусть сами перераспределят задачи",
      D: "Значит, люди недостаточно организованы"
    },
    scores: DEFAULT_SCORES
  },
  {
    id: 29,
    text: "Одна из сильных сторон Scrum Master — видеть узкие места системы. Тебе это близко?",
    options: {
      A: "Слишком сложно, главное чтобы задачи делались",
      B: "Да, команда часто страдает из-за потока и договорённостей, а не из-за людей",
      C: "Это скорее роль менеджера или аналитика",
      D: "Узкие места и так всем видны"
    },
    scores: DEFAULT_SCORES
  },
  {
    id: 30,
    text: "Спринт стартует с энтузиазмом, а заканчивается выгоранием. Зрелый взгляд ближе к:",
    options: {
      A: "Надо лучше мотивировать людей",
      B: "Смотреть на систему: объём обязательств, вбросы, зависимости, ожидания",
      C: "Команда недостаточно сильная",
      D: "Достаточно просто сократить объём задач"
    },
    scores: DEFAULT_SCORES
  },
  {
    id: 31,
    text: "Когда что-то не работает, тебе ближе:",
    options: {
      A: "Исправить точку сбоя и не усложнять",
      B: "Проверить, не воспроизводит ли система этот сбой снова",
      C: "Найти виноватого и повысить дисциплину",
      D: "Подождать, возможно само пройдёт"
    },
    scores: DEFAULT_SCORES
  },
  {
    id: 32,
    text: "Какое утверждение тебе ближе?",
    options: {
      A: "Каждый делает своё и не мешает",
      B: "Система взаимодействия должна помогать людям двигаться к результату",
      C: "Нужен сильный руководитель, который всё координирует",
      D: "Хорошо, когда команда занята весь день"
    },
    scores: DEFAULT_SCORES
  },
  {
    id: 33,
    text: "Нужно двигать команду без формальной власти. Что тебе ближе?",
    options: {
      A: "Без власти это слабая позиция",
      B: "Интересно влиять через доверие, вопросы и ясность",
      C: "Лучше не брать на себя много в такой позиции",
      D: "Избегать ситуаций без формальных полномочий"
    },
    scores: DEFAULT_SCORES
  },
  {
    id: 34,
    text: "Scrum Master помогает расти, но не забирает ответственность у команды. Твоя позиция?",
    options: {
      A: "Проще самому принять решение",
      B: "Это суть роли: не спасать, а развивать самостоятельность",
      C: "Работает только в идеальных условиях",
      D: "Если не справляются, надо жёстче перехватывать управление"
    },
    scores: DEFAULT_SCORES
  },
  {
    id: 35,
    text: "Команда просит «просто сказать как правильно». Что тебе ближе?",
    options: {
      A: "Сразу дать ответ, чтобы не тянуть",
      B: "Поддержать так, чтобы команда сама пришла к более зрелому решению",
      C: "Действовать по настроению: иногда ответить, иногда нет",
      D: "Раз просят ответ, значит им нужен директивный лидер"
    },
    scores: DEFAULT_SCORES
  },
  {
    id: 36,
    text: "В роли без власти важно работать с сопротивлением. Как тебе это?",
    options: {
      A: "Тяжело, когда люди не соглашаются сразу",
      B: "Сопротивление — сигнал, который нужно понять и перевести в диалог",
      C: "Лучше обходить сопротивляющихся",
      D: "Если сопротивляется, значит мешает"
    },
    scores: DEFAULT_SCORES
  },
  {
    id: 37,
    text: "Что тебе ближе в лидерстве?",
    options: {
      A: "Принимать решения и контролировать исполнение",
      B: "Помогать другим становиться сильнее и лучше взаимодействовать",
      C: "Быть экспертом, к которому приходят за ответами",
      D: "Избегать лидерской роли как слишком энергозатратной"
    },
    scores: DEFAULT_SCORES
  },
  {
    id: 38,
    text: "Команда делает ошибку. Какая реакция тебе ближе?",
    options: {
      A: "Жёстко указать, чтобы не повторяли",
      B: "Помочь извлечь пользу: что система пытается показать и как стать сильнее",
      C: "Быстро закрыть тему и идти дальше",
      D: "Если ошибка серьёзная, кого-то заменить"
    },
    scores: DEFAULT_SCORES
  },
  {
    id: 39,
    text: "В Scrum Master много невидимой работы без мгновенного признания. Как тебе это?",
    options: {
      A: "Хочется более заметной и статусной позиции",
      B: "Это близко: важнее реальный системный эффект, чем внешний статус",
      C: "Слишком размыто, люблю более видимую зону ответственности",
      D: "Если эффект не заметен сразу, роль вряд ли стоит усилий"
    },
    scores: DEFAULT_SCORES
  },
  {
    id: 40,
    text: "Какое утверждение тебе ближе всего?",
    options: {
      A: "Мне комфортнее власть, иерархия и прямое управление людьми",
      B: "Мне близка роль: помогать команде, видеть систему и влиять без давления",
      C: "Мне ближе экспертная роль, чем процессное лидерство",
      D: "Мне нужны инструкции и стабильная структура, а не живая динамика"
    },
    scores: DEFAULT_SCORES
  }
];

const LEVELS: Record<LevelKey, LevelResult> = {
  "low-fit": {
    key: "low-fit",
    title: "Пока роль Scrum Master тебе скорее не подходит",
    scoreRange: "40–79",
    summary:
      "Тебе, вероятно, ближе роли с прямым управлением, более жёсткой структурой или чёткой исполнительской зоной. Роль Scrum Master строится на другом типе силы: влиянии без давления, работе с командой и системой.",
    insights: [
      "Сильнее проявляется ориентация на контроль и прямые решения",
      "Сложнее работать с неопределённостью и динамикой команды",
      "Роль служащего лидера пока может даваться тяжело"
    ],
    recommendation:
      "Если хочешь проверить роль на практике и понять её глубже, курс даст ясную картину: что делает Scrum Master каждый день и за счёт чего реально влияет на результат."
  },
  "base-fit": {
    key: "base-fit",
    title: "У тебя есть база, но роль ещё не раскрыта",
    scoreRange: "80–109",
    summary:
      "У тебя уже есть важные качества для Scrum Master: ты замечаешь командную динамику и понимаешь ценность взаимодействия. При этом часть реакций ещё тянет к контролю и готовым решениям.",
    insights: [
      "Есть потенциал к фасилитации и работе с людьми",
      "Системное мышление включается, но пока не стабильно",
      "В стрессовых точках может возвращаться директивный стиль"
    ],
    recommendation:
      "Тебе важно закрепить подходы Scrum Master в реальных сценариях: как вести сложные диалоги, работать с сопротивлением и усиливать команду без микроменеджмента."
  },
  "good-fit": {
    key: "good-fit",
    title: "Роль Scrum Master тебе вполне подходит",
    scoreRange: "110–139",
    summary:
      "У тебя заметна хорошая предрасположенность к роли: тебе близка работа с людьми, командным взаимодействием и поиском причин глубже симптомов. Это сильная база для входа в профессию.",
    insights: [
      "Хорошо проявляется фасилитационное и системное мышление",
      "Есть устойчивость к неопределённости и изменениям",
      "Ты умеешь поддерживать рост команды без давления"
    ],
    recommendation:
      "Следующий шаг — перевести сильную интуицию в устойчивую практику: структуры встреч, паттерны диагностики команды, инструменты Scrum и зрелая роль служащего лидера."
  },
  "strong-fit": {
    key: "strong-fit",
    title: "У тебя сильный потенциал Scrum Master",
    scoreRange: "140–160",
    summary:
      "Тебе действительно близка эта роль: у тебя сочетаются системное мышление, спокойствие в неопределённости, интерес к людям и способность влиять без формальной власти.",
    insights: [
      "Высокая зрелость в работе с командной динамикой",
      "Сильная ориентация на развитие системы, а не на ручной контроль",
      "Хорошая база для уверенного старта и роста в роли Scrum Master"
    ],
    recommendation:
      "Курс поможет структурировать и усилить уже сильный потенциал: превратить его в воспроизводимую практику работы Scrum Master в реальных командах."
  }
};

const LEVEL_STYLES: Record<LevelKey, { chip: string; panel: string }> = {
  "low-fit": {
    chip: "border-[#ef9a9a] bg-[#ffebee] text-[#9f2f2f]",
    panel: "border-[#efc7c7] bg-[linear-gradient(135deg,#fff3f3_0%,#fff8f8_100%)]"
  },
  "base-fit": {
    chip: "border-[#f4b36a] bg-[#fff3e5] text-[#9c5300]",
    panel: "border-[#f3d1a7] bg-[linear-gradient(135deg,#fff7ea_0%,#fffaf2_100%)]"
  },
  "good-fit": {
    chip: "border-[#e9d06b] bg-[#fffbe6] text-[#7c6800]",
    panel: "border-[#efe19a] bg-[linear-gradient(135deg,#fffde8_0%,#fffef5_100%)]"
  },
  "strong-fit": {
    chip: "border-[#7ccf8d] bg-[#e8f9ed] text-[#1e7a38]",
    panel: "border-[#b8e6c4] bg-[linear-gradient(135deg,#edfdf2_0%,#f7fff9_100%)]"
  }
};

function resolveLevel(score: number): LevelResult {
  if (score <= 79) return LEVELS["low-fit"];
  if (score <= 109) return LEVELS["base-fit"];
  if (score <= 139) return LEVELS["good-fit"];
  return LEVELS["strong-fit"];
}

export function ScrumMasterFitQuiz(): JSX.Element {
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
        return sum + (key ? item.scores[key] : 0);
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
    trackGoal("diagnostics_scrum_master_fit_start", { questions_total: QUESTIONS.length });
  }

  function chooseAnswer(key: OptionKey): void {
    setAnswers((prev) => ({ ...prev, [question.id]: key }));
  }

  function goBack(): void {
    if (index > 0) setIndex((prev) => prev - 1);
  }

  function goNext(): void {
    if (!selected) return;

    trackGoal("diagnostics_scrum_master_fit_step_next", {
      question_id: question.id,
      answer_option: selected,
      answer_score: question.scores[selected]
    });

    if (index === QUESTIONS.length - 1) {
      const finalScore = QUESTIONS.reduce((sum, item) => {
        const key = item.id === question.id ? selected : answers[item.id];
        return sum + (key ? item.scores[key] : 0);
      }, 0);
      const finalLevel = resolveLevel(finalScore);
      trackGoal("diagnostics_scrum_master_fit_complete", {
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
        <h2 className="mt-3 max-w-[22ch] text-4xl font-black leading-[0.95] tracking-tight text-slate-900 md:text-5xl">
          Насколько тебе подходит роль Scrum Master
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-8 text-slate-700 md:text-lg">
          Диагностика, которая показывает не знание терминов, а реальную предрасположенность к роли:
          работа с людьми, системой, конфликтами, неопределённостью и ростом команды.
        </p>
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
            {result.title}
          </span>
          <span className="text-sm font-medium text-slate-600">
            {totalScore} из 160 баллов • диапазон {result.scoreRange}
          </span>
        </div>

        <p className="mt-4 text-lg leading-8 text-slate-800">{result.summary}</p>

        <div className="mt-5 rounded-xl border border-slate-200/80 bg-white/70 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Что это показывает</p>
          <ul className="mt-2 space-y-2 text-sm leading-7 text-slate-700">
            {result.insights.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </div>

        <div className="mt-5 rounded-xl border border-slate-200/80 bg-white/70 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Рекомендация</p>
          <p className="mt-2 text-sm leading-7 text-slate-700">{result.recommendation}</p>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href={COURSE_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackGoal("diagnostics_scrum_master_fit_cta_click", {
                level: result.key,
                score_total: totalScore
              })
            }
            className="inline-flex rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Перейти к курсу Scrum Master Junior
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
