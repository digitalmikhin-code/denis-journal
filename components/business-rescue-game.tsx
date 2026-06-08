"use client";

import type { FormEvent } from "react";
import { useMemo, useState } from "react";
import { LEADS_API_URL } from "@/lib/constants";

type VisibleMetric = "profit" | "team" | "clients" | "control";
type HiddenMetric = "chaos" | "resilience" | "trust" | "growth";
type EndingType = "firefighter" | "authoritarian" | "popular" | "architect" | "changeMaster";

type Metrics = Record<VisibleMetric, number> & Record<HiddenMetric, number>;

type Choice = {
  id: string;
  label: string;
  effects: Partial<Record<keyof Metrics, number>>;
  explanation: string;
  signal?: string;
};

type Round = {
  title: string;
  situation: string;
  choices: Choice[];
};

type GameEvent = {
  round: number;
  choiceId: string;
  choiceLabel: string;
  effects: Choice["effects"];
  explanation: string;
  signal?: string;
};

type Analytics = {
  starts: number;
  completions: number;
  totalDurationMs: number;
  choices: Record<string, number>;
  endings: Record<string, number>;
};

type LeadForm = {
  name: string;
  company: string;
  role: string;
  email: string;
  telegram: string;
};

const INITIAL_METRICS: Metrics = {
  profit: 50,
  team: 50,
  clients: 50,
  control: 50,
  chaos: 70,
  resilience: 30,
  trust: 50,
  growth: 40
};

const METRIC_LABELS: Record<VisibleMetric, string> = {
  profit: "Прибыль",
  team: "Команда",
  clients: "Клиенты",
  control: "Управляемость"
};

const ROUNDS: Round[] = [
  {
    title: "Раунд 1. Собственник требует быстрых действий",
    situation: "Показатели ухудшаются уже полгода. Нужно выбрать первое управленческое решение.",
    choices: [
      {
        id: "r1-fire-commercial",
        label: "Уволить коммерческого директора",
        effects: { profit: -4, team: -8, clients: 2, control: -4, chaos: 8, trust: -12 },
        explanation: "Вы показали жесткость, но команда увидела поиск виноватого вместо поиска причины."
      },
      {
        id: "r1-ads",
        label: "Увеличить рекламный бюджет",
        effects: { profit: -8, clients: 7, control: -2, chaos: 5, growth: 3 },
        explanation: "Реклама дала поток заявок, но слабые процессы стали еще заметнее."
      },
      {
        id: "r1-diagnostic",
        label: "Провести диагностику бизнеса",
        effects: { team: 5, control: 10, chaos: -10, resilience: 6, trust: 4 },
        explanation: "Вы начали с поиска причины, а не борьбы с симптомами.",
        signal: "Появилась первая карта ограничений бизнеса."
      },
      {
        id: "r1-freeze",
        label: "Заморозить расходы",
        effects: { profit: 6, team: -7, clients: -5, chaos: 3, growth: -5 },
        explanation: "Краткосрочно деньги сохранились, но компания стала осторожнее и медленнее."
      }
    ]
  },
  {
    title: "Раунд 2. Результаты диагностики",
    situation: "CRM заполнена на 30%, единых KPI нет, филиалы работают по своим правилам, текучесть растет.",
    choices: [
      {
        id: "r2-kpi",
        label: "Создать KPI",
        effects: { control: 7, team: -3, chaos: -3, trust: -4, growth: 3 },
        explanation: "KPI добавили видимость, но без стандартов люди спорят о трактовках."
      },
      {
        id: "r2-fire-staff",
        label: "Уволить часть сотрудников",
        effects: { profit: 8, team: -12, clients: -7, chaos: 6, trust: -14 },
        explanation: "Расходы снизились, но оставшиеся сотрудники начали защищаться."
      },
      {
        id: "r2-discounts",
        label: "Увеличить продажи через скидки",
        effects: { profit: -5, clients: 8, control: -3, chaos: 4, growth: -2 },
        explanation: "Скидки оживили продажи, но маржинальность и дисциплина просели."
      },
      {
        id: "r2-standards",
        label: "Внедрить единые стандарты работы",
        effects: { control: 10, team: 3, chaos: -9, resilience: 7, trust: 3 },
        explanation: "Филиалы начали говорить на одном языке. Скорость пока не выросла, но система стала понятнее."
      }
    ]
  },
  {
    title: "Раунд 3. Продажи буксуют",
    situation: "Отдел продаж жалуется на качество лидов, маркетинг обвиняет менеджеров, клиенты ждут дольше обычного.",
    choices: [
      {
        id: "r3-script",
        label: "Ввести единый скрипт продаж",
        effects: { clients: 4, control: 5, team: -2, chaos: -3 },
        explanation: "Скрипт стабилизировал коммуникацию, но часть сильных менеджеров почувствовала жесткие рамки."
      },
      {
        id: "r3-funnel",
        label: "Разобрать воронку от лида до оплаты",
        effects: { profit: 5, clients: 6, control: 8, chaos: -7, growth: 6 },
        explanation: "Вы нашли потери между этапами и убрали несколько лишних согласований."
      },
      {
        id: "r3-more-leads",
        label: "Купить больше лидов",
        effects: { profit: -7, clients: 5, chaos: 7, control: -3 },
        explanation: "Поток вырос, но старая система обработки стала узким местом."
      },
      {
        id: "r3-bonus",
        label: "Повысить бонусы продавцам",
        effects: { profit: -3, team: 4, clients: 2, trust: 3, chaos: 2 },
        explanation: "Мотивация поднялась, но проблема в процессе осталась."
      }
    ]
  },
  {
    title: "Раунд 4. Текучесть персонала",
    situation: "За месяц ушли два опытных сотрудника. Руководители говорят, что люди не выдерживают темп.",
    choices: [
      {
        id: "r4-hire",
        label: "Срочно нанять новых людей",
        effects: { team: 4, profit: -5, chaos: 4, growth: 4 },
        explanation: "Ресурсов стало больше, но онбординг без процесса усилил нагрузку на старую команду."
      },
      {
        id: "r4-retention",
        label: "Провести интервью причин ухода",
        effects: { team: 6, trust: 8, control: 3, chaos: -4, resilience: 4 },
        explanation: "Команда увидела, что вы готовы слышать неудобную правду."
      },
      {
        id: "r4-pressure",
        label: "Усилить контроль дисциплины",
        effects: { control: 6, team: -8, trust: -10, chaos: 2 },
        explanation: "Дисциплина выросла, но люди стали меньше говорить о проблемах."
      },
      {
        id: "r4-training",
        label: "Запустить обучение руководителей",
        effects: { team: 5, control: 4, profit: -3, resilience: 7, growth: 5 },
        explanation: "Результат не мгновенный, зато компания начала выращивать управленческий слой."
      }
    ]
  },
  {
    title: "Раунд 5. Сопротивление изменениям",
    situation: "Часть руководителей саботирует стандарты: формально соглашаются, но работают по-старому.",
    choices: [
      {
        id: "r5-punish",
        label: "Наказать публично",
        effects: { control: 5, team: -8, trust: -12, chaos: 4 },
        explanation: "Саботаж стал тише, но доверие к изменениям резко снизилось."
      },
      {
        id: "r5-coalition",
        label: "Собрать коалицию сторонников",
        effects: { team: 5, control: 7, chaos: -6, trust: 6, resilience: 5 },
        explanation: "Изменения перестали быть только вашим приказом и стали общей работой."
      },
      {
        id: "r5-ignore",
        label: "Игнорировать сопротивление",
        effects: { profit: 2, control: -7, chaos: 8, trust: -3 },
        explanation: "В моменте конфликт не вспыхнул, но старые правила продолжили жить внутри системы."
      },
      {
        id: "r5-consultants",
        label: "Позвать внешних консультантов",
        effects: { control: 5, profit: -6, team: -1, growth: 5 },
        explanation: "Экспертиза помогла, но команда пока воспринимает изменения как внешний проект."
      }
    ]
  },
  {
    title: "Раунд 6. Конфликт руководителей",
    situation: "Операционный директор и коммерческий спорят о приоритетах. Решения зависают на стыке функций.",
    choices: [
      {
        id: "r6-side",
        label: "Встать на сторону сильнейшего",
        effects: { profit: 3, team: -6, control: -3, trust: -7 },
        explanation: "Вы ускорили одно решение, но усилили политическое поведение."
      },
      {
        id: "r6-roles",
        label: "Развести зоны ответственности",
        effects: { control: 9, chaos: -7, team: 4, resilience: 6 },
        explanation: "Конфликт снизился, потому что у решений появились владельцы и границы."
      },
      {
        id: "r6-meeting",
        label: "Провести большую встречу со всеми",
        effects: { team: 3, trust: 4, control: 2, chaos: -2 },
        explanation: "Напряжение стало видимым, но без новых правил встреча дала только частичный эффект."
      },
      {
        id: "r6-owner",
        label: "Попросить собственника вмешаться",
        effects: { control: 4, team: -4, trust: -5, resilience: -3 },
        explanation: "Авторитет собственника помог, но ваша управленческая самостоятельность ослабла."
      }
    ]
  },
  {
    title: "Раунд 7. Собственник перегружен",
    situation: "Собственник продолжает согласовывать мелкие решения и спрашивает, почему без него ничего не двигается.",
    choices: [
      {
        id: "r7-delegate",
        label: "Настроить уровни делегирования",
        effects: { control: 9, team: 6, chaos: -8, resilience: 8, growth: 6 },
        explanation: "Решения стали быстрее, а собственник увидел управляемый контур вместо ручного контроля.",
        signal: "Собственник доволен первыми признаками системности."
      },
      {
        id: "r7-report",
        label: "Делать больше отчетов",
        effects: { control: 4, team: -4, chaos: 3, trust: -2 },
        explanation: "Прозрачности стало больше, но люди тратят время на отчеты вместо решений."
      },
      {
        id: "r7-board",
        label: "Создать еженедельный совет решений",
        effects: { control: 7, team: 3, chaos: -4, resilience: 5 },
        explanation: "Сложные решения получили ритм, но операционные вопросы все еще требуют фильтра."
      },
      {
        id: "r7-speed",
        label: "Разрешить всем действовать быстрее",
        effects: { clients: 4, control: -6, chaos: 8, growth: 3 },
        explanation: "Скорость выросла, но без границ решений появилось больше несогласованности."
      }
    ]
  },
  {
    title: "Раунд 8. Автоматизация",
    situation: "Команда просит новую CRM и дашборды. Часть процессов пока не описана.",
    choices: [
      {
        id: "r8-buy-crm",
        label: "Купить CRM немедленно",
        effects: { profit: -8, control: 3, team: -2, chaos: 5, growth: 4 },
        explanation: "Инструмент появился раньше процесса, поэтому часть хаоса просто стала цифровой."
      },
      {
        id: "r8-process-first",
        label: "Сначала описать ключевые процессы",
        effects: { control: 9, chaos: -8, resilience: 7, team: 3 },
        explanation: "Автоматизация получила основу: теперь понятно, что именно нужно переносить в систему."
      },
      {
        id: "r8-dashboard",
        label: "Собрать простой дашборд вручную",
        effects: { control: 6, profit: 2, chaos: -3, growth: 3 },
        explanation: "Вы быстро получили управленческую видимость без большого внедрения."
      },
      {
        id: "r8-vendor",
        label: "Передать внедрение подрядчику",
        effects: { control: 5, profit: -7, team: -3, growth: 5 },
        explanation: "Подрядчик ускорил техническую часть, но бизнес-владельцы процесса пока слабо вовлечены."
      }
    ]
  },
  {
    title: "Раунд 9. KPI начинают давить",
    situation: "Показатели появились, но люди оптимизируют цифры, а не результат для клиента.",
    choices: [
      {
        id: "r9-more-kpi",
        label: "Добавить больше KPI",
        effects: { control: 4, team: -6, clients: -4, chaos: 4 },
        explanation: "Метрик стало больше, но фокус размылся."
      },
      {
        id: "r9-balance",
        label: "Связать KPI с клиентским результатом",
        effects: { clients: 8, control: 7, chaos: -5, growth: 6, trust: 4 },
        explanation: "Команда начала видеть не только цифры, но и смысл управленческих показателей."
      },
      {
        id: "r9-remove",
        label: "Отменить KPI до лучших времен",
        effects: { team: 5, control: -8, chaos: 7, trust: 3 },
        explanation: "Напряжение снизилось, но система управления снова потеряла опору."
      },
      {
        id: "r9-bonus-kpi",
        label: "Привязать бонусы к KPI",
        effects: { profit: 5, control: 5, team: -4, trust: -5 },
        explanation: "Производительность выросла, но часть команды стала играть в показатели."
      }
    ]
  },
  {
    title: "Раунд 10. Кризис ключевого клиента",
    situation: "Крупный клиент угрожает уйти из-за срыва сроков и разных ответов от филиалов.",
    choices: [
      {
        id: "r10-personal",
        label: "Лично решить проблему клиента",
        effects: { clients: 8, profit: 3, control: -3, chaos: 3 },
        explanation: "Клиент успокоился, но команда увидела, что критичные вопросы снова уходят наверх."
      },
      {
        id: "r10-war-room",
        label: "Собрать кросс-функциональную группу",
        effects: { clients: 7, team: 4, control: 6, chaos: -5, resilience: 5 },
        explanation: "Проблему решили через совместный процесс, а не через героизм одного руководителя."
      },
      {
        id: "r10-discount",
        label: "Дать большую компенсацию",
        effects: { clients: 6, profit: -9, chaos: 1 },
        explanation: "Клиент остался, но причина сбоя не устранена."
      },
      {
        id: "r10-blame",
        label: "Найти виновный филиал",
        effects: { control: 3, team: -9, clients: -3, trust: -10, chaos: 4 },
        explanation: "Вы получили объяснение, но филиалы стали скрывать проблемы раньше."
      }
    ]
  },
  {
    title: "Раунд 11. Рост нагрузки",
    situation: "После первых улучшений заказов стало больше. Старые процессы выдерживают не все.",
    choices: [
      {
        id: "r11-scale-process",
        label: "Усилить процессы перед масштабированием",
        effects: { control: 9, profit: 2, clients: 5, chaos: -7, resilience: 8, growth: 7 },
        explanation: "Вы подготовили систему к росту, не превращая успех в новый источник хаоса."
      },
      {
        id: "r11-hire-sales",
        label: "Нанять больше продавцов",
        effects: { profit: 4, clients: 4, team: 2, chaos: 5, growth: 5 },
        explanation: "Рост ускорился, но нагрузка на операционный контур стала выше."
      },
      {
        id: "r11-overtime",
        label: "Временно перевести команду на переработки",
        effects: { profit: 6, team: -10, clients: 3, trust: -8, resilience: -5 },
        explanation: "Краткосрочный рывок получился дорогим для устойчивости."
      },
      {
        id: "r11-limit",
        label: "Ограничить прием новых заказов",
        effects: { profit: -4, clients: -2, control: 6, chaos: -5, resilience: 5 },
        explanation: "Вы защитили качество, но часть рыночной возможности ушла."
      }
    ]
  },
  {
    title: "Раунд 12. Стратегическое развитие",
    situation: "90 дней почти прошли. Собственник спрашивает, готова ли компания к следующему этапу роста.",
    choices: [
      {
        id: "r12-expansion",
        label: "Сразу открыть новые филиалы",
        effects: { profit: 5, clients: 5, control: -5, chaos: 7, growth: 8 },
        explanation: "Амбиция высокая, но система может не выдержать темп масштабирования."
      },
      {
        id: "r12-roadmap",
        label: "Собрать дорожную карту масштабирования",
        effects: { control: 8, team: 4, chaos: -6, resilience: 7, growth: 9 },
        explanation: "Рост стал управляемым проектом с владельцами, рисками и контрольными точками."
      },
      {
        id: "r12-stabilize",
        label: "Закрепить текущие изменения",
        effects: { control: 6, team: 5, clients: 3, resilience: 8, growth: 2 },
        explanation: "Компания стала устойчивее, хотя собственник хотел бы больше скорости."
      },
      {
        id: "r12-profit",
        label: "Сфокусироваться только на прибыли",
        effects: { profit: 10, team: -6, clients: -3, trust: -6, growth: -2 },
        explanation: "Финальный отчет выглядит лучше, но часть системных ограничений осталась внутри."
      }
    ]
  }
];

const ENDINGS: Record<EndingType, { title: string; summary: string }> = {
  firefighter: {
    title: "Пожарный",
    summary: "Вы постоянно тушили проблемы. Компания выжила, но система не изменилась."
  },
  authoritarian: {
    title: "Авторитарный директор",
    summary: "Результаты выросли, но команда демотивирована и меньше доверяет изменениям."
  },
  popular: {
    title: "Популярный руководитель",
    summary: "Команда довольна, но бизнес растет медленно и не все ограничения устранены."
  },
  architect: {
    title: "Архитектор системы",
    summary: "Вы выстроили процессы и систему управления. Компания стала устойчивой."
  },
  changeMaster: {
    title: "Мастер изменений",
    summary: "Лучший результат: вы устранили ограничения системы и подготовили компанию к масштабированию."
  }
};

const EMPTY_ANALYTICS: Analytics = {
  starts: 0,
  completions: 0,
  totalDurationMs: 0,
  choices: {},
  endings: {}
};

const STORAGE_KEY = "business-rescue-game-analytics";

export function BusinessRescueGame(): JSX.Element {
  const [started, setStarted] = useState(false);
  const [roundIndex, setRoundIndex] = useState(0);
  const [metrics, setMetrics] = useState<Metrics>(INITIAL_METRICS);
  const [history, setHistory] = useState<GameEvent[]>([]);
  const [lastEvent, setLastEvent] = useState<GameEvent | null>(null);
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [finishedAt, setFinishedAt] = useState<number | null>(null);
  const [lead, setLead] = useState<LeadForm>({
    name: "",
    company: "",
    role: "",
    email: "",
    telegram: ""
  });
  const [leadSaved, setLeadSaved] = useState(false);
  const [leadError, setLeadError] = useState<string | null>(null);
  const [leadInfo, setLeadInfo] = useState<string | null>(null);
  const [isLeadSubmitting, setIsLeadSubmitting] = useState(false);

  const isFinished = roundIndex >= ROUNDS.length;
  const visibleMetrics = useMemo(
    () =>
      (Object.keys(METRIC_LABELS) as VisibleMetric[]).map((key) => ({
        key,
        label: METRIC_LABELS[key],
        value: metrics[key]
      })),
    [metrics]
  );
  const result = useMemo(() => calculateResult(metrics), [metrics]);
  const analytics = readAnalytics();

  function startGame(): void {
    setStarted(true);
    setRoundIndex(0);
    setMetrics(INITIAL_METRICS);
    setHistory([]);
    setLastEvent(null);
    setFinishedAt(null);
    setLeadSaved(false);
    setLeadError(null);
    setLeadInfo(null);
    setIsLeadSubmitting(false);
    setStartedAt(Date.now());
    updateAnalytics((current) => ({ ...current, starts: current.starts + 1 }));
  }

  function selectChoice(choice: Choice): void {
    const nextMetrics = applyEffects(metrics, choice.effects);
    const nextEvent: GameEvent = {
      round: roundIndex + 1,
      choiceId: choice.id,
      choiceLabel: choice.label,
      effects: choice.effects,
      explanation: choice.explanation,
      signal: choice.signal ?? buildSignal(nextMetrics)
    };

    setMetrics(nextMetrics);
    setHistory((current) => [...current, nextEvent]);
    setLastEvent(nextEvent);
    updateAnalytics((current) => ({
      ...current,
      choices: {
        ...current.choices,
        [choice.id]: (current.choices[choice.id] ?? 0) + 1
      }
    }));

    const nextRoundIndex = roundIndex + 1;
    setRoundIndex(nextRoundIndex);

    if (nextRoundIndex >= ROUNDS.length) {
      const completedAt = Date.now();
      setFinishedAt(completedAt);
      const ending = calculateResult(nextMetrics).ending;
      updateAnalytics((current) => ({
        ...current,
        completions: current.completions + 1,
        totalDurationMs: current.totalDurationMs + Math.max(0, completedAt - (startedAt ?? completedAt)),
        endings: {
          ...current.endings,
          [ending]: (current.endings[ending] ?? 0) + 1
        }
      }));
    }
  }

  async function saveLead(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();

    if (!LEADS_API_URL) {
      setLeadError("API заявок не подключен. Нужно указать NEXT_PUBLIC_LEADS_API_URL.");
      return;
    }

    setIsLeadSubmitting(true);
    setLeadError(null);
    setLeadInfo(null);

    try {
      const response = await fetch(LEADS_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          fullName: lead.name,
          email: lead.email,
          company: lead.company,
          role: lead.role,
          telegram: lead.telegram,
          source: "business-game",
          result: ENDINGS[result.ending].title,
          scores: {
            controlLevel: result.controlLevel,
            systemThinking: result.systemThinking,
            leadership: result.leadership,
            growthReadiness: result.growthReadiness
          }
        })
      });

      const payload = (await response.json().catch(() => null)) as {
        error?: string;
        message?: string;
        telegram?: { status?: string; reason?: string };
      } | null;

      if (!response.ok) {
        throw new Error(payload?.message || payload?.error || "Не удалось отправить заявку.");
      }

      setLeadSaved(true);
      if (payload?.telegram?.status === "sent") {
        setLeadInfo("Заявка отправлена в Telegram.");
      } else {
        setLeadInfo("Заявка отправлена. Статус Telegram не вернулся от функции.");
      }
    } catch (error) {
      setLeadError(error instanceof Error ? error.message : "Не удалось отправить заявку.");
    } finally {
      setIsLeadSubmitting(false);
    }
  }

  if (!started) {
    return (
      <section className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_28px_70px_rgba(15,23,42,0.08)]">
        <div className="grid gap-0 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="bg-[#1f2328] p-8 text-white md:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8fb0ff]">Бизнес-симуляция</p>
            <h1 className="mt-5 max-w-[11ch] text-5xl font-black leading-[0.95] tracking-tight md:text-7xl">
              Спасти бизнес за 90 дней
            </h1>
            <p className="mt-6 max-w-[38ch] text-lg leading-8 text-white/78">
              Вы становитесь генеральным директором компании ФудПром и принимаете решения, которые меняют прибыль,
              команду, клиентов и управляемость.
            </p>
            <button
              type="button"
              onClick={startGame}
              className="mt-8 rounded-xl bg-[#2f6bff] px-6 py-3 text-base font-bold text-white shadow-[0_8px_0_0_rgba(47,107,255,0.28)] transition hover:-translate-y-0.5 hover:bg-[#255be0]"
            >
              Начать игру
            </button>
          </div>
          <div className="bg-[linear-gradient(135deg,#ffffff_0%,#f4f7ff_55%,#eef8f2_100%)] p-8 md:p-10">
            <div className="grid gap-4 sm:grid-cols-2">
              <IntroStat label="Компания" value="ФудПром" />
              <IntroStat label="Отрасль" value="Продукты питания" />
              <IntroStat label="Срок" value="90 дней" />
              <IntroStat label="Раунды" value="12 решений" />
            </div>
            <div className="mt-8 space-y-4">
              <h2 className="text-2xl font-black tracking-tight text-[#1f2328]">Стартовая ситуация</h2>
              <p className="text-base leading-7 text-slate-600">
                Компания работает 12 лет. Последние полгода показатели ухудшаются. Собственник требует изменить
                ситуацию за 90 дней, но очевидного виновника нет.
              </p>
              <div className="rounded-xl border border-[#f2994a]/35 bg-[#fff8ed] p-4 text-sm leading-6 text-[#7a4600]">
                В игре нет очевидно правильных ответов. Каждое решение имеет цену, а система считает скрытые параметры
                внутри.
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-[0_18px_48px_rgba(15,23,42,0.07)] md:p-7">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2f6bff]">ФудПром</p>
            <h1 className="mt-2 text-3xl font-black tracking-tight text-[#1f2328] md:text-5xl">
              Спасти бизнес за 90 дней
            </h1>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-right">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
              {isFinished ? "Финал" : "Раунд"}
            </p>
            <p className="mt-1 text-2xl font-black text-[#1f2328]">
              {isFinished ? "12/12" : `${roundIndex + 1}/12`}
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-4">
          {visibleMetrics.map((metric) => (
            <MetricBar key={metric.key} label={metric.label} value={metric.value} />
          ))}
        </div>
      </section>

      {lastEvent && !isFinished ? <Consequence event={lastEvent} /> : null}

      {!isFinished ? (
        <RoundView round={ROUNDS[roundIndex]} onSelect={selectChoice} />
      ) : (
        <FinalReport
          result={result}
          metrics={metrics}
          history={history}
          durationMs={finishedAt && startedAt ? finishedAt - startedAt : 0}
          lead={lead}
          leadSaved={leadSaved}
          leadError={leadError}
          leadInfo={leadInfo}
          isLeadSubmitting={isLeadSubmitting}
          analytics={analytics}
          onLeadChange={setLead}
          onLeadSubmit={saveLead}
          onRestart={startGame}
        />
      )}
    </div>
  );
}

function IntroStat({ label, value }: { label: string; value: string }): JSX.Element {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">{label}</p>
      <p className="mt-2 text-xl font-black text-[#1f2328]">{value}</p>
    </div>
  );
}

function MetricBar({ label, value }: { label: string; value: number }): JSX.Element {
  const color = value >= 70 ? "#27ae60" : value >= 42 ? "#2f6bff" : "#eb5757";

  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-bold text-[#1f2328]">{label}</p>
        <p className="text-sm font-black" style={{ color }}>
          {value}
        </p>
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200">
        <div className="h-full rounded-full transition-all duration-500" style={{ width: `${value}%`, background: color }} />
      </div>
    </div>
  );
}

function RoundView({ round, onSelect }: { round: Round; onSelect: (choice: Choice) => void }): JSX.Element {
  return (
    <section className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Ситуация</p>
        <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight text-[#1f2328]">{round.title}</h2>
        <p className="mt-5 text-lg leading-8 text-slate-600">{round.situation}</p>
      </div>
      <div className="grid gap-3">
        {round.choices.map((choice) => (
          <button
            key={choice.id}
            type="button"
            onClick={() => onSelect(choice)}
            className="group rounded-[1.25rem] border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-[#2f6bff]/45 hover:shadow-[0_16px_32px_rgba(47,107,255,0.12)]"
          >
            <span className="text-sm font-semibold uppercase tracking-[0.14em] text-[#2f6bff]">Решение</span>
            <span className="mt-2 block text-xl font-black leading-tight text-[#1f2328] group-hover:text-[#2f6bff]">
              {choice.label}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}

function Consequence({ event }: { event: GameEvent }): JSX.Element {
  return (
    <section className="rounded-[1.5rem] border border-[#2f6bff]/20 bg-[#f4f7ff] p-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#2f6bff]">Последствие</p>
          <h2 className="mt-2 text-xl font-black text-[#1f2328]">{event.choiceLabel}</h2>
          <p className="mt-2 max-w-3xl text-base leading-7 text-slate-600">{event.explanation}</p>
          {event.signal ? <p className="mt-3 text-sm font-semibold text-[#8a4f00]">{event.signal}</p> : null}
        </div>
        <div className="flex flex-wrap gap-2">
          {Object.entries(event.effects).map(([key, value]) => (
            <span
              key={key}
              className="rounded-full border border-white bg-white px-3 py-1 text-xs font-bold text-slate-700 shadow-sm"
            >
              {formatEffectLabel(key as keyof Metrics)} {value && value > 0 ? "+" : ""}
              {value}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalReport({
  result,
  metrics,
  history,
  durationMs,
  lead,
  leadSaved,
  leadError,
  leadInfo,
  isLeadSubmitting,
  analytics,
  onLeadChange,
  onLeadSubmit,
  onRestart
}: {
  result: ReturnType<typeof calculateResult>;
  metrics: Metrics;
  history: GameEvent[];
  durationMs: number;
  lead: LeadForm;
  leadSaved: boolean;
  leadError: string | null;
  leadInfo: string | null;
  isLeadSubmitting: boolean;
  analytics: Analytics;
  onLeadChange: (lead: LeadForm) => void;
  onLeadSubmit: (event: FormEvent<HTMLFormElement>) => void | Promise<void>;
  onRestart: () => void;
}): JSX.Element {
  const ending = ENDINGS[result.ending];
  const popular = getPopularChoice(analytics.choices, "max");
  const rare = getPopularChoice(analytics.choices, "min");

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] bg-[#1f2328] p-6 text-white shadow-[0_26px_70px_rgba(15,23,42,0.18)] md:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8fb0ff]">Итоговый отчет</p>
        <h2 className="mt-3 text-4xl font-black tracking-tight md:text-6xl">{ending.title}</h2>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-white/78">{ending.summary}</p>
        <div className="mt-6 grid gap-3 md:grid-cols-4">
          <ScoreCard label="Управляемость" value={result.controlLevel} />
          <ScoreCard label="Системное мышление" value={result.systemThinking} />
          <ScoreCard label="Лидерство" value={result.leadership} />
          <ScoreCard label="Готовность к росту" value={result.growthReadiness} />
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-[1fr_0.85fr]">
        <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-2xl font-black tracking-tight text-[#1f2328]">Персональные рекомендации</h3>
          <div className="mt-4 space-y-4 text-base leading-8 text-slate-600">
            {buildRecommendation(result.ending, metrics, history).map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div className="space-y-5">
          <form onSubmit={onLeadSubmit} className="rounded-[1.5rem] border border-[#2f6bff]/20 bg-white p-6 shadow-sm">
            <h3 className="text-2xl font-black tracking-tight text-[#1f2328]">Получить персональный разбор</h3>
            <div className="mt-5 grid gap-3">
              <LeadInput label="Имя" value={lead.name} onChange={(name) => onLeadChange({ ...lead, name })} required />
              <LeadInput label="Компания" value={lead.company} onChange={(company) => onLeadChange({ ...lead, company })} />
              <LeadInput label="Должность" value={lead.role} onChange={(role) => onLeadChange({ ...lead, role })} />
              <LeadInput label="Email" value={lead.email} onChange={(email) => onLeadChange({ ...lead, email })} type="email" required />
              <LeadInput label="Telegram" value={lead.telegram} onChange={(telegram) => onLeadChange({ ...lead, telegram })} />
            </div>
            <button
              type="submit"
              disabled={isLeadSubmitting}
              className="mt-5 w-full rounded-xl bg-[#2f6bff] px-5 py-3 text-base font-bold text-white transition hover:bg-[#255be0] disabled:cursor-not-allowed disabled:bg-slate-400"
            >
              {isLeadSubmitting ? "Отправляем..." : "Получить экспертный разбор"}
            </button>
            {leadSaved ? (
              <p className="mt-3 rounded-xl bg-[#effaf3] px-4 py-3 text-sm font-semibold text-[#1f7a3d]">
                Заявка отправлена.
              </p>
            ) : null}
            {leadInfo ? (
              <p className="mt-3 rounded-xl bg-[#eef5ff] px-4 py-3 text-sm font-semibold text-[#1d4ed8]">
                {leadInfo}
              </p>
            ) : null}
            {leadError ? (
              <p className="mt-3 rounded-xl bg-[#fff0f0] px-4 py-3 text-sm font-semibold text-[#b42318]">
                {leadError}
              </p>
            ) : null}
          </form>

          <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-6">
            <h3 className="text-xl font-black text-[#1f2328]">Аналитика MVP</h3>
            <div className="mt-4 grid gap-3 text-sm text-slate-600">
              <AnalyticsRow label="Запусков" value={String(analytics.starts)} />
              <AnalyticsRow label="Завершений" value={String(analytics.completions)} />
              <AnalyticsRow label="Среднее время" value={formatDuration(analytics)} />
              <AnalyticsRow label="Популярное решение" value={popular ?? "Недостаточно данных"} />
              <AnalyticsRow label="Редкое решение" value={rare ?? "Недостаточно данных"} />
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-wrap items-center justify-between gap-3 rounded-[1.5rem] border border-slate-200 bg-white p-5">
        <p className="text-base font-semibold text-[#1f2328]">
          Пройдено за {Math.max(1, Math.round(durationMs / 1000))} сек. Решений принято: {history.length}.
        </p>
        <button
          type="button"
          onClick={onRestart}
          className="rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-bold text-[#1f2328] transition hover:border-[#2f6bff] hover:text-[#2f6bff]"
        >
          Пройти заново
        </button>
      </section>
    </div>
  );
}

function ScoreCard({ label, value }: { label: string; value: number }): JSX.Element {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.06] p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/55">{label}</p>
      <p className="mt-2 text-3xl font-black">{value}</p>
    </div>
  );
}

function LeadInput({
  label,
  value,
  onChange,
  type = "text",
  required = false
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
}): JSX.Element {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">{label}</span>
      <input
        type={type}
        value={value}
        required={required}
        onChange={(event) => onChange(event.target.value)}
        className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-[#1f2328] outline-none transition focus:border-[#2f6bff] focus:bg-white"
      />
    </label>
  );
}

function AnalyticsRow({ label, value }: { label: string; value: string }): JSX.Element {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-slate-200 pb-2 last:border-b-0 last:pb-0">
      <span>{label}</span>
      <span className="text-right font-bold text-[#1f2328]">{value}</span>
    </div>
  );
}

function applyEffects(metrics: Metrics, effects: Choice["effects"]): Metrics {
  const next = { ...metrics };
  for (const [key, value] of Object.entries(effects)) {
    next[key as keyof Metrics] = clamp(next[key as keyof Metrics] + (value ?? 0));
  }
  return next;
}

function clamp(value: number): number {
  return Math.max(0, Math.min(100, value));
}

function calculateResult(metrics: Metrics): {
  ending: EndingType;
  controlLevel: number;
  systemThinking: number;
  leadership: number;
  growthReadiness: number;
} {
  const controlLevel = Math.round((metrics.control + metrics.resilience + (100 - metrics.chaos)) / 3);
  const systemThinking = Math.round((metrics.control + metrics.growth + metrics.resilience + (100 - metrics.chaos)) / 4);
  const leadership = Math.round((metrics.team + metrics.trust + metrics.clients) / 3);
  const growthReadiness = Math.round((metrics.growth + metrics.profit + metrics.resilience + metrics.clients) / 4);

  let ending: EndingType = "firefighter";
  if (systemThinking >= 76 && growthReadiness >= 72 && leadership >= 62) {
    ending = "changeMaster";
  } else if (controlLevel >= 68 && systemThinking >= 64) {
    ending = "architect";
  } else if (metrics.profit >= 68 && leadership < 48) {
    ending = "authoritarian";
  } else if (leadership >= 68 && growthReadiness < 62) {
    ending = "popular";
  }

  return { ending, controlLevel, systemThinking, leadership, growthReadiness };
}

function buildSignal(metrics: Metrics): string | undefined {
  if (metrics.chaos > 78) return "Количество жалоб выросло.";
  if (metrics.trust < 38) return "Команда начинает сопротивляться изменениям.";
  if (metrics.control > 68) return "Появилось больше управленческой прозрачности.";
  if (metrics.growth > 68) return "Появилось новое узкое место роста.";
  return undefined;
}

function formatEffectLabel(key: keyof Metrics): string {
  const labels: Record<keyof Metrics, string> = {
    profit: "Прибыль",
    team: "Команда",
    clients: "Клиенты",
    control: "Управляемость",
    chaos: "Хаос",
    resilience: "Устойчивость",
    trust: "Доверие",
    growth: "Потенциал"
  };
  return labels[key];
}

function readAnalytics(): Analytics {
  if (typeof window === "undefined") return EMPTY_ANALYTICS;
  try {
    return { ...EMPTY_ANALYTICS, ...JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "{}") };
  } catch {
    return EMPTY_ANALYTICS;
  }
}

function updateAnalytics(updater: (current: Analytics) => Analytics): void {
  if (typeof window === "undefined") return;
  const current = readAnalytics();
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updater(current)));
}

function getPopularChoice(choices: Record<string, number>, mode: "max" | "min"): string | null {
  const entries = Object.entries(choices);
  if (!entries.length) return null;
  const selected = entries.reduce((best, entry) => {
    if (mode === "max") return entry[1] > best[1] ? entry : best;
    return entry[1] < best[1] ? entry : best;
  });
  return ROUNDS.flatMap((round) => round.choices).find((choice) => choice.id === selected[0])?.label ?? selected[0];
}

function formatDuration(analytics: Analytics): string {
  if (!analytics.completions) return "Недостаточно данных";
  const seconds = Math.round(analytics.totalDurationMs / analytics.completions / 1000);
  return `${Math.max(1, seconds)} сек.`;
}

function buildRecommendation(ending: EndingType, metrics: Metrics, history: GameEvent[]): string[] {
  const lastChoices = history.slice(-3).map((event) => event.choiceLabel).join(", ");
  const base =
    "Ваш результат показывает, как вы управляете не отдельными симптомами, а всей системой бизнеса. В этой симуляции важны не только прибыль и клиенты, но и скрытые параметры: хаос, устойчивость, доверие команды и потенциал роста. Именно они определяют, сможет ли компания выдержать следующий этап изменений без ручного управления, постоянных срочных совещаний и зависимости от одного сильного руководителя.";

  const byEnding: Record<EndingType, string> = {
    firefighter:
      "Главная рекомендация: снижайте долю реактивных решений. Когда бизнес находится под давлением, легко выбрать быстрый ход, который дает видимый эффект уже сегодня. Но если после каждого решения хаос остается высоким, система будет возвращать вас к тем же проблемам. Начните с карты ограничений: где теряются заявки, где решения зависают, какие правила разные филиалы трактуют по-своему, какие метрики провоцируют неправильное поведение. После этого выберите два-три процесса, которые дадут максимальный управленческий эффект, и закрепите владельцев, правила эскалации и ритм проверки результата.",
    authoritarian:
      "Ваш стиль дает результат через давление и контроль. Это может быть полезно в кризисе, но при длительном применении снижает доверие и инициативу команды. Рекомендация: отделите дисциплину от страха. Сохраните прозрачность целей и требований, но добавьте пространство для диагностики причин. Если люди понимают, почему меняются правила, кто принимает решения и как будет оцениваться прогресс, сопротивление становится ниже. Начните с руководителей среднего уровня: им нужны понятные зоны ответственности, право на решения и регулярная обратная связь без публичного поиска виноватых.",
    popular:
      "Вы хорошо удерживаете команду, но бизнесу может не хватать жесткости в управленческом контуре. Рекомендация: не противопоставляйте доверие и результат. Команда должна видеть, какие процессы являются обязательными, какие метрики отражают клиентскую ценность и где заканчивается обсуждение и начинается исполнение. Добавьте короткие циклы управления: цель, владелец, срок, показатель, обзор результата. Это позволит сохранить человеческий стиль и одновременно ускорить рост. Важно не перегружать систему новыми инициативами, а выбрать несколько точек, где дисциплина исполнения даст максимальный эффект.",
    architect:
      "Вы мыслите через процессы, роли и устойчивость. Это сильная управленческая база: компания начинает работать не только за счет личного контроля, но и за счет понятной системы. Следующий шаг: связать архитектуру управления с ростом. Проверьте, какие процессы готовы к масштабированию, какие решения все еще завязаны на вас или собственника, где данные поступают поздно, а где команда не понимает критерии успеха. Сформируйте дорожную карту на 90 дней: не набор задач, а последовательность управленческих изменений с владельцами, рисками и ожидаемым эффектом.",
    changeMaster:
      "Вы показали самый зрелый сценарий: решения работают не только на текущий результат, но и на способность бизнеса расти дальше. Ваша зона развития теперь не в том, чтобы добавить еще больше контроля, а в том, чтобы сохранить баланс скорости, доверия и системности. Рекомендация: закрепите контур изменений как регулярную практику. Проводите диагностику ограничений, обновляйте метрики, проверяйте качество делегирования и отдельно отслеживайте, не превращаются ли новые правила в бюрократию. Масштабирование будет устойчивым, если команда понимает не только что делать, но и почему именно это двигает бизнес."
  };

  const metricsNote = `Финальные показатели: прибыль ${metrics.profit}, команда ${metrics.team}, клиенты ${metrics.clients}, управляемость ${metrics.control}. Последние решения: ${lastChoices || "нет данных"}. Используйте их как материал для разбора: какие решения усиливали систему, а какие просто снимали напряжение момента.`;

  return [base, byEnding[ending], metricsNote];
}
