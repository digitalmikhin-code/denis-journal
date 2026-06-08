"use client";

import type { FormEvent, ReactNode } from "react";
import { useMemo, useState } from "react";
import { LEADS_API_URL } from "@/lib/constants";

type VisibleMetric = "profit" | "team" | "clients" | "control";
type SystemMetric = "chaos" | "trust" | "growth" | "dependency" | "debt";
type Metric = VisibleMetric | SystemMetric;
type ZoneId = "now" | "delegate" | "postpone" | "reject";
type EndingType = "firefighter" | "controller" | "inspirer" | "architect" | "scaler";
type Metrics = Record<Metric, number>;

type Initiative = {
  id: string;
  title: string;
  area: string;
  description: string;
  upside: string;
  risk: string;
  effects: Record<ZoneId, Partial<Record<Metric, number>>>;
  feedback: Record<ZoneId, string>;
};

type Round = {
  day: number;
  title: string;
  signal: string;
  pressure: string;
  focus: string;
  initiatives: Initiative[];
};

type Decision = {
  day: number;
  initiative: Initiative;
  zone: ZoneId;
  effects: Partial<Record<Metric, number>>;
  feedback: string;
};

type LeadForm = {
  name: string;
  company: string;
  role: string;
  email: string;
  telegram: string;
};

const INITIAL_METRICS: Metrics = {
  profit: 49,
  team: 54,
  clients: 58,
  control: 41,
  chaos: 66,
  trust: 52,
  growth: 47,
  dependency: 73,
  debt: 44
};

const VISIBLE_LABELS: Record<VisibleMetric, string> = {
  profit: "Прибыль",
  team: "Команда",
  clients: "Клиенты",
  control: "Управляемость"
};

const SYSTEM_LABELS: Record<SystemMetric, string> = {
  chaos: "Хаос",
  trust: "Доверие",
  growth: "Потенциал роста",
  dependency: "Зависимость от CEO",
  debt: "Долг решений"
};

const ZONES: Record<ZoneId, { title: string; description: string; tone: string }> = {
  now: {
    title: "Взять сейчас",
    description: "Быстрый эффект, но выше риск ручного управления.",
    tone: "from-[#f3c16b] to-[#d97706]"
  },
  delegate: {
    title: "Делегировать",
    description: "Медленнее в моменте, зато строит ответственность.",
    tone: "from-[#43d39e] to-[#0f766e]"
  },
  postpone: {
    title: "Отложить",
    description: "Сохраняет фокус, но копит долг решений.",
    tone: "from-[#94a3b8] to-[#475569]"
  },
  reject: {
    title: "Отклонить",
    description: "Убирает шум, но может стоить роста или доверия.",
    tone: "from-[#fb7185] to-[#be123c]"
  }
};

const ROUNDS: Round[] = [
  {
    day: 7,
    title: "Собственник снова стал главным диспетчером",
    signal: "За неделю к вам пришло 43 согласования. Руководители ждут вашего решения даже по операционным вопросам.",
    pressure: "Если оставить так, бизнес будет двигаться только со скоростью вашего внимания.",
    focus: "Снять зависимость от одного сильного центра",
    initiatives: [
      initiative("r1-map", "Карта эскалаций", "Управление", "Разобрать, какие решения реально должны доходить до собственника, а какие обязаны закрываться ниже.", "Станет понятно, где компания теряет скорость.", "Команда увидит, что часть привычных обходных путей больше не работает.", {
        now: { control: 7, chaos: -5, dependency: -3, debt: -2 },
        delegate: { control: 10, chaos: -8, dependency: -9, trust: 4, team: 3 },
        postpone: { chaos: 5, dependency: 5, debt: 6 },
        reject: { control: -4, dependency: 6, chaos: 4 }
      }),
      initiative("r1-chat", "Чат быстрых решений", "Операции", "Создать канал, где спорные вопросы будут решаться мгновенно с вашим участием.", "Можно быстро снять текущий завал.", "Команда привыкнет тащить наверх еще больше вопросов.", {
        now: { clients: 4, profit: 3, control: 3, dependency: 9, chaos: 3 },
        delegate: { control: 4, team: 2, dependency: -2, chaos: -2 },
        postpone: { clients: -3, chaos: 4, debt: 5 },
        reject: { dependency: -3, chaos: 2, team: -2 }
      }),
      initiative("r1-board", "Совет решений", "Топ-команда", "Собрать руководителей вокруг пяти ключевых решений недели и назначить владельцев.", "Появляется ритм управления, а не бесконечные разовые совещания.", "Без дисциплины совет быстро станет разговорным клубом.", {
        now: { control: 8, trust: 3, dependency: -3, team: 2, chaos: -3 },
        delegate: { control: 9, trust: 6, dependency: -8, team: 5, chaos: -5 },
        postpone: { debt: 4, control: -2 },
        reject: { team: -3, trust: -3, dependency: 4 }
      })
    ]
  },
  {
    day: 22,
    title: "Продажи спорят с операциями",
    signal: "Коммерция обещает клиентам сроки, которые сервис не выдерживает. Жалобы растут, маржа тает.",
    pressure: "Каждый отдел оптимизирует свою правду, а клиент видит одну компанию.",
    focus: "Сшить обещания, производство и клиентский опыт",
    initiatives: [
      initiative("r2-margin", "Диспетчер маржи", "Финансы", "Крупные сделки проходят проверку маржи, сроков и операционной готовности.", "Меньше убыточных побед и авральных обещаний.", "Продажи могут воспринять это как тормоз роста.", {
        now: { profit: 8, clients: -2, control: 5, chaos: -3, team: -2 },
        delegate: { profit: 7, control: 8, chaos: -5, trust: 3, dependency: -4 },
        postpone: { profit: -4, chaos: 6, debt: 5 },
        reject: { clients: 4, profit: -6, chaos: 5 }
      }),
      initiative("r2-warroom", "Штаб клиентских обещаний", "Клиенты", "На две недели собрать продажи, сервис и операции вокруг самых болезненных клиентских кейсов.", "Быстро снизит раздражение ключевых клиентов.", "Если не закрепить правила, штаб станет пожарной командой навсегда.", {
        now: { clients: 9, profit: -2, chaos: -2, dependency: 4, trust: 2 },
        delegate: { clients: 8, control: 6, chaos: -6, trust: 5, dependency: -3 },
        postpone: { clients: -6, chaos: 5, debt: 4 },
        reject: { clients: -7, profit: 2, trust: -5 }
      }),
      initiative("r2-standard", "Стандарт обещаний", "Операции", "Определить, какие сроки можно обещать без согласования, а какие требуют проверки ресурсов.", "Снижает конфликт между продажами и исполнением.", "Первые недели могут казаться медленнее.", {
        now: { control: 9, clients: 3, chaos: -7, profit: 3, dependency: -2 },
        delegate: { control: 10, clients: 5, chaos: -9, trust: 4, dependency: -6 },
        postpone: { chaos: 5, clients: -3, debt: 5 },
        reject: { clients: -4, control: -5, chaos: 6 }
      })
    ]
  },
  {
    day: 39,
    title: "Руководители перегружены инициативами",
    signal: "В работе 19 проектов. Все важные, но ни один не двигается с нужной скоростью.",
    pressure: "Премиальный бизнес растет не от количества инициатив, а от качества фокуса.",
    focus: "Выбрать, что действительно двигает систему",
    initiatives: [
      initiative("r3-cut", "Сократить портфель проектов", "Стратегия", "Оставить пять инициатив, которые сильнее всего влияют на прибыль, управляемость и клиентский опыт.", "Фокус высвобождает управленческую энергию.", "Авторы закрытых проектов будут защищать свои идеи.", {
        now: { control: 8, profit: 4, chaos: -6, team: -2, debt: -4 },
        delegate: { control: 9, trust: 4, chaos: -8, team: 3, dependency: -5 },
        postpone: { chaos: 6, debt: 7, team: -3 },
        reject: { growth: 3, chaos: 5, control: -5 }
      }),
      initiative("r3-crm", "Новая CRM-платформа", "IT", "Купить более мощную CRM, чтобы навести порядок в продажах и отчетности.", "Данные станут красивее и доступнее.", "Технология не исправит процесс, если правила не описаны.", {
        now: { control: 4, profit: -7, growth: 5, chaos: 4, debt: 3 },
        delegate: { control: 5, growth: 6, profit: -5, trust: 2, chaos: 1 },
        postpone: { profit: 3, debt: 2, control: -1 },
        reject: { profit: 4, growth: -3, control: -2 }
      }),
      initiative("r3-rituals", "Спринт управленческих ритуалов", "Команда", "Ввести короткий цикл: цель, владелец, срок, метрика, обзор результата каждые семь дней.", "Проекты становятся управляемыми обязательствами.", "Без дисциплины ритуал превратится в отчетность ради отчетности.", {
        now: { control: 9, team: 2, chaos: -5, dependency: -3, debt: -2 },
        delegate: { control: 10, team: 6, trust: 5, dependency: -7, chaos: -7 },
        postpone: { debt: 5, control: -2 },
        reject: { team: -2, control: -4, chaos: 3 }
      })
    ]
  },
  {
    day: 56,
    title: "Команда вежливо сопротивляется изменениям",
    signal: "Формально все согласны, но стандарты обходят, встречи переносят, решения возвращают наверх.",
    pressure: "Сопротивление редко выглядит как бунт. Чаще оно выглядит как вежливая инерция.",
    focus: "Превратить изменения из приказа в рабочую норму",
    initiatives: [
      initiative("r4-pressure", "Публично усилить дисциплину", "CEO Office", "Жестко проговорить последствия за саботаж новых правил.", "Сопротивление станет тише уже завтра.", "Тихое несогласие может уйти глубже.", {
        now: { control: 7, team: -7, trust: -10, chaos: 2, dependency: 3 },
        delegate: { control: 5, trust: -2, team: -2, dependency: -2 },
        postpone: { control: -3, chaos: 5, debt: 4 },
        reject: { trust: 3, control: -2, chaos: 2 }
      }),
      initiative("r4-coalition", "Коалиция сторонников", "Лидерство", "Найти руководителей, которые реально поддерживают изменения, и дать им роль проводников.", "Изменения перестают быть только вашей волей.", "Если выбрать не тех людей, появится внутренняя политика.", {
        now: { team: 5, trust: 5, control: 5, chaos: -4, dependency: -3 },
        delegate: { team: 8, trust: 8, control: 7, chaos: -7, dependency: -8 },
        postpone: { trust: -2, chaos: 4, debt: 4 },
        reject: { dependency: 3, team: -3, trust: -4 }
      }),
      initiative("r4-loop", "Петля обратной связи", "Команда", "Раз в неделю собирать сигналы: что мешает новым правилам работать на практике.", "Система начнет учиться, а не только требовать.", "Если не закрывать найденные проблемы, доверие упадет.", {
        now: { trust: 7, team: 5, control: 4, chaos: -4, debt: -2 },
        delegate: { trust: 9, team: 6, control: 6, chaos: -6, dependency: -5 },
        postpone: { trust: -3, chaos: 3, debt: 4 },
        reject: { trust: -6, team: -3, control: 2 }
      })
    ]
  },
  {
    day: 73,
    title: "Рост уперся в средний менеджмент",
    signal: "Сильные исполнители стали руководителями, но продолжают решать задачи руками. Люди ждут указаний.",
    pressure: "Без управленческого слоя масштабирование превращается в дорогую суету.",
    focus: "Вырастить руководителей, а не только нагрузку",
    initiatives: [
      initiative("r5-school", "Школа руководителей", "HR", "Учить руководителей на реальных кейсах: конфликты, делегирование, метрики.", "Появится слой, который держит изменения без вас.", "Результат не мгновенный.", {
        now: { team: 6, control: 5, growth: 5, profit: -3, dependency: -4 },
        delegate: { team: 9, trust: 6, control: 8, growth: 7, dependency: -9 },
        postpone: { dependency: 5, team: -4, debt: 5 },
        reject: { profit: 3, team: -5, growth: -5 }
      }),
      initiative("r5-coo", "Нанять операционного директора", "Топ-команда", "Привести человека, который возьмет операционную систему и разгрузит собственника.", "Можно резко усилить управляемость.", "Без мандата новый директор станет еще одним центром конфликта.", {
        now: { control: 6, profit: -8, dependency: -5, chaos: 4, team: -2 },
        delegate: { control: 9, dependency: -10, growth: 5, trust: 2, profit: -6 },
        postpone: { profit: 2, dependency: 4, debt: 3 },
        reject: { dependency: 6, growth: -3, profit: 2 }
      }),
      initiative("r5-rights", "Матрица прав решений", "Управление", "Зафиксировать, кто принимает решения по цене, найму, клиентским исключениям и ресурсам.", "Команда перестает гадать, где заканчиваются полномочия.", "Вскроются зоны размытой ответственности.", {
        now: { control: 10, chaos: -7, dependency: -7, trust: 2, team: 2 },
        delegate: { control: 11, chaos: -9, dependency: -11, trust: 5, team: 5 },
        postpone: { chaos: 5, dependency: 6, debt: 5 },
        reject: { control: -5, chaos: 6, dependency: 5 }
      })
    ]
  },
  {
    day: 90,
    title: "Финальная развилка: компания готова к следующему этапу?",
    signal: "Первые изменения дали эффект, но теперь важно не откатиться в ручное управление после первого успеха.",
    pressure: "Настоящая зрелость видна не в рывке, а в способности повторять результат без героизма.",
    focus: "Закрепить управленческую архитектуру",
    initiatives: [
      initiative("r6-os", "Операционная система на 90 дней", "CEO Office", "Собрать единый контур: цели, метрики, владельцы, ритмы, правила решений и клиентские стандарты.", "Бизнес получает карту управления, а не набор отдельных улучшений.", "Потребуется отказаться от части привычной импровизации.", {
        now: { control: 10, chaos: -8, dependency: -7, growth: 5, debt: -6 },
        delegate: { control: 12, chaos: -10, dependency: -12, trust: 6, growth: 7 },
        postpone: { debt: 8, dependency: 5, chaos: 5 },
        reject: { growth: -4, control: -6, dependency: 6 }
      }),
      initiative("r6-scale", "Ускорить масштабирование", "Рост", "Открыть новые каналы продаж и усилить маркетинг, пока команда чувствует импульс.", "Можно быстро получить видимый рост.", "Если система не дозрела, рост увеличит хаос быстрее прибыли.", {
        now: { clients: 9, growth: 9, profit: -2, chaos: 8, dependency: 4 },
        delegate: { clients: 8, growth: 8, profit: 3, chaos: 2, control: 3 },
        postpone: { control: 4, debt: -2, growth: -2 },
        reject: { profit: 3, growth: -5, clients: -2 }
      }),
      initiative("r6-exit", "Тест: неделя без собственника", "Собственник", "На неделю выйти из операционных решений и проверить, где система держится сама.", "Самый честный способ увидеть зрелость управления.", "Может вскрыть болезненные зависимости.", {
        now: { dependency: -10, control: 4, trust: 6, chaos: 2, team: 5 },
        delegate: { dependency: -13, control: 7, trust: 8, team: 6, chaos: -3 },
        postpone: { dependency: 5, debt: 4 },
        reject: { dependency: 7, control: 2, trust: -2 }
      })
    ]
  }
];

const ENDINGS: Record<EndingType, { title: string; subtitle: string; diagnosis: string; recommendation: string }> = {
  firefighter: {
    title: "Пожарный собственник",
    subtitle: "Вы умеете спасать ситуацию, но бизнес слишком часто зовет вас к пульту.",
    diagnosis: "Система реагирует на вашу скорость и авторитет, но без вас решения замедляются. Главный риск: компания привыкает к героизму вместо управляемой архитектуры.",
    recommendation: "Начните с карты эскалаций и матрицы прав решений. Ваша задача не решать больше, а настроить контур, где меньше решений требуют вас лично."
  },
  controller: {
    title: "Жесткий контролер результата",
    subtitle: "Вы держите дисциплину и цифры, но можете недополучать инициативу команды.",
    diagnosis: "Контроль стал сильнее, но доверие и самостоятельность могут проседать. Такой стиль полезен в кризисе, но опасен как постоянная операционная модель.",
    recommendation: "Сохраните прозрачность целей, но добавьте правила делегирования и обратную связь. Контроль должен быть системой, а не давлением."
  },
  inspirer: {
    title: "Лидер доверия",
    subtitle: "Команда рядом, но системе может не хватать жесткости исполнения.",
    diagnosis: "Вы хорошо удерживаете людей и энергию изменений, но бизнесу нужны ясные владельцы, сроки и критерии результата.",
    recommendation: "Добавьте управленческие ритмы: цель, владелец, срок, метрика, обзор. Это сохранит человечность и повысит скорость."
  },
  architect: {
    title: "Архитектор управления",
    subtitle: "Вы строите систему, которая начинает работать не только на личной силе собственника.",
    diagnosis: "У компании появились правила, ритмы и владельцы решений. Следующий риск: не превратить архитектуру в бюрократию и связать ее с ростом.",
    recommendation: "Проверьте, какие процессы готовы к масштабированию, где данные приходят поздно и где команда еще не понимает критерии успеха."
  },
  scaler: {
    title: "Собственник масштаба",
    subtitle: "Вы управляете не задачами, а системой, которая способна расти без постоянного ручного режима.",
    diagnosis: "Баланс результата, доверия, управляемости и роста высокий. Компания уже похожа на бизнес, который можно развивать через архитектуру, а не через героизм.",
    recommendation: "Закрепите операционную систему на 90 дней: цели, владельцы, метрики, клиентские стандарты и регулярную диагностику ограничений."
  }
};

export function BusinessRescueGame(): JSX.Element {
  const [roundIndex, setRoundIndex] = useState(0);
  const [metrics, setMetrics] = useState<Metrics>(INITIAL_METRICS);
  const [history, setHistory] = useState<Decision[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(ROUNDS[0].initiatives[0].id);
  const [leadForm, setLeadForm] = useState<LeadForm>({ name: "", company: "", role: "", email: "", telegram: "" });
  const [leadStatus, setLeadStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const isFinished = roundIndex >= ROUNDS.length;
  const round = ROUNDS[Math.min(roundIndex, ROUNDS.length - 1)];
  const selected = round.initiatives.find((item) => item.id === selectedId) ?? round.initiatives[0];
  const result = useMemo(() => calculateResult(metrics), [metrics]);
  const recommendations = useMemo(() => buildRecommendations(metrics, history), [metrics, history]);

  function decide(zone: ZoneId): void {
    const effects = selected.effects[zone];
    const decision: Decision = { day: round.day, initiative: selected, zone, effects, feedback: selected.feedback[zone] };
    const nextIndex = roundIndex + 1;

    setMetrics((current) => applyEffects(current, effects));
    setHistory((current) => [...current, decision]);
    setRoundIndex(nextIndex);
    setSelectedId(ROUNDS[nextIndex]?.initiatives[0]?.id ?? null);
    window.requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "smooth" }));
  }

  function restart(): void {
    setRoundIndex(0);
    setMetrics(INITIAL_METRICS);
    setHistory([]);
    setSelectedId(ROUNDS[0].initiatives[0].id);
    setLeadStatus("idle");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function submitLead(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    if (!LEADS_API_URL) {
      setLeadStatus("error");
      return;
    }

    setLeadStatus("sending");
    try {
      const response = await fetch(LEADS_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: leadForm.name,
          email: leadForm.email,
          company: leadForm.company,
          role: leadForm.role,
          telegram: leadForm.telegram,
          source: "business-game-premium-dashboard",
          result: `${result.title}. ${result.subtitle}`,
          metrics,
          decisions: history.map((item) => `${item.day}: ${item.initiative.title} - ${ZONES[item.zone].title}`)
        })
      });

      if (!response.ok) throw new Error("Lead request failed");
      setLeadStatus("success");
    } catch {
      setLeadStatus("error");
    }
  }

  return (
    <main className="relative left-1/2 min-h-screen w-screen -translate-x-1/2 overflow-hidden bg-[#f5f0e8] text-[#15130f]">
      <section className="relative isolate px-4 pb-10 pt-8 sm:px-6 lg:px-8">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_10%_5%,rgba(199,150,82,0.28),transparent_28%),radial-gradient(circle_at_90%_0%,rgba(30,64,175,0.22),transparent_24%),linear-gradient(135deg,#f8f2e8_0%,#eef2f5_52%,#f7efe5_100%)]" />
        <div className="mx-auto max-w-[1440px]">
          <Hero metrics={metrics} progress={Math.min(roundIndex + 1, ROUNDS.length)} finished={isFinished} />
          {isFinished ? (
            <ResultScreen
              metrics={metrics}
              history={history}
              result={result}
              recommendations={recommendations}
              leadForm={leadForm}
              leadStatus={leadStatus}
              onFormChange={setLeadForm}
              onSubmit={submitLead}
              onRestart={restart}
            />
          ) : (
            <Dashboard
              round={round}
              metrics={metrics}
              history={history}
              selected={selected}
              selectedId={selectedId}
              roundIndex={roundIndex}
              onSelect={setSelectedId}
              onDecision={decide}
            />
          )}
        </div>
      </section>
    </main>
  );
}

function Dashboard({
  round,
  metrics,
  history,
  selected,
  selectedId,
  roundIndex,
  onSelect,
  onDecision
}: {
  round: Round;
  metrics: Metrics;
  history: Decision[];
  selected: Initiative;
  selectedId: string | null;
  roundIndex: number;
  onSelect: (id: string) => void;
  onDecision: (zone: ZoneId) => void;
}): JSX.Element {
  const last = history[history.length - 1];

  return (
    <div className="mx-auto max-w-[1320px] space-y-6">
      <section className="overflow-hidden rounded-[2rem] border border-[#ddc69f] bg-white shadow-[0_24px_70px_rgba(91,65,26,0.14)]">
        <div className="grid gap-0 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="bg-[#fffaf1] p-6 sm:p-8">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-[#15130f] px-4 py-2 text-sm font-black uppercase tracking-[0.18em] text-[#f3c16b]">Шаг 1</span>
              <span className="text-sm font-black uppercase tracking-[0.18em] text-[#9c6a24]">День {round.day}. Раунд {roundIndex + 1} из {ROUNDS.length}</span>
            </div>
            <h2 className="mt-5 max-w-3xl text-4xl font-black tracking-[-0.05em] text-[#15130f] sm:text-5xl">{round.title}</h2>
            <p className="mt-5 max-w-3xl text-xl leading-9 text-[#5d5548]">{round.signal}</p>
            <div className="mt-6 rounded-3xl border border-[#ead8b9] bg-white p-5">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#a66f1f]">Что давит на систему</p>
              <p className="mt-2 text-base leading-7 text-[#5d5548]">{round.pressure}</p>
            </div>
          </div>

          <div className="border-t border-[#ead8b9] bg-[#15130f] p-6 text-[#fbf3e5] sm:p-8 lg:border-l lg:border-t-0">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#d8b46a]">Пульс бизнеса</p>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <BusinessCellDark label="Продажи" value={metrics.clients} />
              <BusinessCellDark label="Финансы" value={metrics.profit} />
              <BusinessCellDark label="Команда" value={metrics.team} />
              <BusinessCellDark label="Процессы" value={metrics.control} />
            </div>
            <div className="mt-5 grid gap-3">
              {(Object.keys(SYSTEM_LABELS) as SystemMetric[]).map((key) => (
                <MiniMetricDark key={key} label={SYSTEM_LABELS[key]} value={metrics[key]} inverse={["chaos", "dependency", "debt"].includes(key)} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] border border-[#ddc69f] bg-[#fffaf1] p-5 shadow-[0_24px_70px_rgba(91,65,26,0.12)] sm:p-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="rounded-full bg-[#ead8b9] px-4 py-2 text-sm font-black uppercase tracking-[0.18em] text-[#8a5f20]">Шаг 2</span>
            <h2 className="mt-4 text-4xl font-black tracking-[-0.05em] text-[#15130f]">Выберите управленческую инициативу</h2>
            <p className="mt-3 max-w-3xl text-lg leading-8 text-[#6c6253]">Фокус раунда: {round.focus}. Сначала выберите, с каким рычагом бизнеса вы работаете.</p>
          </div>
          <div className="rounded-3xl bg-white px-5 py-4 text-sm font-black text-[#15130f] shadow-[0_12px_30px_rgba(91,65,26,0.08)]">
            {round.initiatives.length} варианта на столе
          </div>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {round.initiatives.map((initiativeItem, index) => (
            <button
              key={initiativeItem.id}
              type="button"
              onClick={() => onSelect(initiativeItem.id)}
              className={`group min-h-[250px] rounded-[1.75rem] border p-6 text-left transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_44px_rgba(67,46,17,0.16)] ${
                selectedId === initiativeItem.id ? "border-[#15130f] bg-[#15130f] text-[#fbf3e5]" : "border-[#ead8b9] bg-white text-[#15130f]"
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <span className={`rounded-full px-3 py-1 text-xs font-black uppercase tracking-[0.18em] ${selectedId === initiativeItem.id ? "bg-[#d8b46a] text-[#15130f]" : "bg-[#f2e6d0] text-[#8a5f20]"}`}>
                  {initiativeItem.area}
                </span>
                <span className="text-4xl font-black opacity-20">0{index + 1}</span>
              </div>
              <h3 className="mt-6 text-3xl font-black tracking-[-0.04em]">{initiativeItem.title}</h3>
              <p className={`mt-4 text-base leading-7 ${selectedId === initiativeItem.id ? "text-[#e8dcc9]" : "text-[#6c6253]"}`}>{initiativeItem.description}</p>
            </button>
          ))}
        </div>
      </section>

      <section className="rounded-[2rem] border border-[#ddc69f] bg-white p-5 shadow-[0_24px_70px_rgba(91,65,26,0.12)] sm:p-8">
        <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
          <div>
            <span className="rounded-full bg-[#15130f] px-4 py-2 text-sm font-black uppercase tracking-[0.18em] text-[#f3c16b]">Шаг 3</span>
            <h2 className="mt-5 text-4xl font-black tracking-[-0.05em] text-[#15130f]">Что делаем с инициативой?</h2>
            <div className="mt-6 rounded-[1.75rem] border border-[#ead8b9] bg-[#fffaf1] p-6">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#a66f1f]">Выбрано</p>
              <h3 className="mt-3 text-3xl font-black tracking-[-0.04em] text-[#15130f]">{selected.title}</h3>
              <Insight label="Потенциал" text={selected.upside} />
              <Insight label="Риск" text={selected.risk} />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {(Object.keys(ZONES) as ZoneId[]).map((zone) => (
              <button
                key={zone}
                type="button"
                onClick={() => onDecision(zone)}
                className="group overflow-hidden rounded-[1.75rem] border border-[#ead8b9] bg-[#fffaf1] text-left transition duration-300 hover:-translate-y-1 hover:border-[#15130f] hover:shadow-[0_18px_36px_rgba(67,46,17,0.14)]"
              >
                <div className={`h-3 bg-gradient-to-r ${ZONES[zone].tone}`} />
                <div className="p-6">
                  <p className="text-2xl font-black tracking-[-0.03em] text-[#15130f]">{ZONES[zone].title}</p>
                  <p className="mt-3 text-base leading-7 text-[#6c6253]">{ZONES[zone].description}</p>
                  <EffectPreview effects={selected.effects[zone]} spacious />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] border border-[#ddc69f] bg-[#15130f] p-6 text-[#fbf3e5] shadow-[0_24px_70px_rgba(21,19,15,0.18)] sm:p-8">
        <div className="grid gap-6 lg:grid-cols-[0.35fr_0.65fr]">
          <div>
            <span className="rounded-full bg-[#d8b46a] px-4 py-2 text-sm font-black uppercase tracking-[0.18em] text-[#15130f]">Шаг 4</span>
            <h2 className="mt-5 text-3xl font-black tracking-[-0.04em]">Последний эффект</h2>
          </div>
          {last ? (
            <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.06] p-6">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#d8b46a]">{ZONES[last.zone].title}</p>
              <h3 className="mt-3 text-2xl font-black tracking-[-0.03em]">{last.initiative.title}</h3>
              <p className="mt-4 text-lg leading-8 text-[#e8dcc9]">{last.feedback}</p>
              <EffectPreview effects={last.effects} spacious />
            </div>
          ) : (
            <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.06] p-6">
              <p className="text-lg leading-8 text-[#e8dcc9]">После первого решения здесь появится объяснение: что изменилось в бизнесе и почему. Так игрок видит причинно-следственную связь, а не просто набор цифр.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function Hero({ metrics, progress, finished }: { metrics: Metrics; progress: number; finished: boolean }): JSX.Element {
  return (
    <header className="mb-6 overflow-hidden rounded-[2rem] border border-[#e5d4b8] bg-[#16140f] text-[#fbf3e5] shadow-[0_24px_80px_rgba(35,27,14,0.22)]">
      <div className="grid lg:grid-cols-[1.2fr_0.8fr]">
        <div className="relative p-6 sm:p-8 lg:p-10">
          <p className="mb-5 inline-flex rounded-full border border-[#d8b46a]/35 bg-[#d8b46a]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.28em] text-[#d8b46a]">Premium business simulation</p>
          <h1 className="max-w-4xl text-4xl font-black tracking-[-0.05em] sm:text-6xl lg:text-7xl">CEO Dashboard: 90 дней до управляемого бизнеса</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-[#e8dcc9]">Вы управляете портфелем решений: что забрать себе, что делегировать, что отложить, а что остановить. Симулятор показывает, строите ли вы бизнес-систему или снова становитесь главным аккумулятором компании.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Badge label="Формат" value="управленческий штаб" />
            <Badge label="Горизонт" value="90 дней" />
            <Badge label="Прогресс" value={finished ? "финал" : `${progress} / ${ROUNDS.length}`} />
          </div>
        </div>
        <div className="border-t border-white/10 bg-white/[0.04] p-6 sm:p-8 lg:border-l lg:border-t-0 lg:p-10">
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#d8b46a]">Пульс компании</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {(Object.keys(VISIBLE_LABELS) as VisibleMetric[]).map((key) => (
              <MetricDial key={key} label={VISIBLE_LABELS[key]} value={metrics[key]} />
            ))}
          </div>
          <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-4">
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm text-[#e8dcc9]">Зависимость от собственника</span>
              <span className="text-2xl font-black text-[#f2c56b]">{metrics.dependency}</span>
            </div>
            <div className="mt-3 h-2 rounded-full bg-white/10">
              <div className="h-2 rounded-full bg-gradient-to-r from-[#43d39e] via-[#f2c56b] to-[#fb7185]" style={{ width: `${metrics.dependency}%` }} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function ResultScreen({
  metrics,
  history,
  result,
  recommendations,
  leadForm,
  leadStatus,
  onFormChange,
  onSubmit,
  onRestart
}: {
  metrics: Metrics;
  history: Decision[];
  result: ReturnType<typeof calculateResult>;
  recommendations: string[];
  leadForm: LeadForm;
  leadStatus: "idle" | "sending" | "success" | "error";
  onFormChange: (form: LeadForm) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onRestart: () => void;
}): JSX.Element {
  return (
    <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
      <section className="rounded-[2rem] border border-[#e1cfad] bg-[#fffaf1] p-6 shadow-[0_24px_70px_rgba(96,68,28,0.14)] sm:p-8">
        <p className="text-xs font-black uppercase tracking-[0.25em] text-[#a66f1f]">Финальный управленческий профиль</p>
        <h2 className="mt-3 text-4xl font-black tracking-[-0.05em] sm:text-5xl">{result.title}</h2>
        <p className="mt-4 text-xl leading-8 text-[#4f4638]">{result.subtitle}</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-4">
          {(Object.keys(VISIBLE_LABELS) as VisibleMetric[]).map((key) => (
            <ResultMetric key={key} label={VISIBLE_LABELS[key]} value={metrics[key]} />
          ))}
        </div>
        <div className="mt-8 rounded-3xl border border-[#ead8b9] bg-white p-6">
          <h3 className="text-2xl font-black tracking-[-0.03em]">Диагноз</h3>
          <p className="mt-3 text-base leading-8 text-[#5d5548]">{result.diagnosis}</p>
          <p className="mt-4 text-base leading-8 text-[#5d5548]">{result.recommendation}</p>
        </div>
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {recommendations.map((item, index) => (
            <div key={item} className="rounded-3xl border border-[#ead8b9] bg-white p-5">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#a66f1f]">Рекомендация {index + 1}</p>
              <p className="mt-3 text-sm leading-6 text-[#5d5548]">{item}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 rounded-3xl border border-[#e1cfad] bg-[#15130f] p-5 text-[#fbf3e5]">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#d8b46a]">Последние решения</p>
          <div className="mt-4 space-y-3">
            {history.slice(-4).map((item) => (
              <div key={`${item.day}-${item.initiative.id}`} className="flex gap-3 rounded-2xl bg-white/[0.06] p-3">
                <span className="text-sm font-black text-[#d8b46a]">D{item.day}</span>
                <div>
                  <p className="text-sm font-bold">{item.initiative.title}</p>
                  <p className="text-xs text-[#e8dcc9]">{ZONES[item.zone].title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="rounded-[2rem] border border-[#c9d4ea] bg-white p-6 shadow-[0_24px_70px_rgba(42,54,82,0.12)] sm:p-8">
        <p className="text-xs font-black uppercase tracking-[0.25em] text-[#315186]">Персональный разбор</p>
        <h2 className="mt-3 text-3xl font-black tracking-[-0.04em]">Получить разбор вашей управленческой модели</h2>
        <p className="mt-3 text-base leading-7 text-[#5d6470]">Оставьте контакты, и заявка уйдет в Telegram. В сообщении будет видно, какой финал вы получили.</p>
        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <LeadInput label="Имя" value={leadForm.name} required onChange={(value) => onFormChange({ ...leadForm, name: value })} />
          <LeadInput label="Компания" value={leadForm.company} onChange={(value) => onFormChange({ ...leadForm, company: value })} />
          <LeadInput label="Должность" value={leadForm.role} onChange={(value) => onFormChange({ ...leadForm, role: value })} />
          <LeadInput label="Email" type="email" value={leadForm.email} required onChange={(value) => onFormChange({ ...leadForm, email: value })} />
          <LeadInput label="Telegram" value={leadForm.telegram} onChange={(value) => onFormChange({ ...leadForm, telegram: value })} />
          <button type="submit" disabled={leadStatus === "sending"} className="w-full rounded-2xl border border-[#15130f] bg-[#1f5eff] px-6 py-4 text-base font-black text-white shadow-[0_10px_0_#15130f] transition hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-70">
            {leadStatus === "sending" ? "Отправляем заявку..." : "Получить экспертный разбор"}
          </button>
        </form>
        {leadStatus === "success" && <Status tone="success" text="Заявка отправлена. Проверьте Telegram." />}
        {leadStatus === "error" && <Status tone="error" text="Не удалось отправить заявку. Проверим API или настройки функции." />}
        <button type="button" onClick={onRestart} className="mt-5 w-full rounded-2xl border border-[#d7dde8] bg-[#f7f9fc] px-6 py-4 text-sm font-black transition hover:border-[#1f5eff]">
          Пройти симуляцию заново
        </button>
      </section>
    </div>
  );
}

function Panel({ title, eyebrow, children }: { title: string; eyebrow: string; children: ReactNode }): JSX.Element {
  return (
    <section className="rounded-[2rem] border border-[#e1cfad] bg-[#fffaf1]/90 p-5 shadow-[0_18px_50px_rgba(96,68,28,0.1)] backdrop-blur">
      <p className="text-xs font-black uppercase tracking-[0.22em] text-[#a66f1f]">{eyebrow}</p>
      <h2 className="mb-5 mt-1 text-xl font-black tracking-[-0.03em]">{title}</h2>
      {children}
    </section>
  );
}

function Badge({ label, value }: { label: string; value: string }): JSX.Element {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.08] px-4 py-3">
      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#d8b46a]">{label}</p>
      <p className="mt-1 text-sm font-black">{value}</p>
    </div>
  );
}

function MetricDial({ label, value }: { label: string; value: number }): JSX.Element {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#e8dcc9]">{label}</p>
        <p className="text-2xl font-black">{value}</p>
      </div>
      <div className="mt-3 h-2 rounded-full bg-white/10">
        <div className="h-2 rounded-full bg-gradient-to-r from-[#d8b46a] to-[#1f5eff]" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

function MiniMetric({ label, value, inverse }: { label: string; value: number; inverse?: boolean }): JSX.Element {
  const score = inverse ? 100 - value : value;
  const color = score >= 70 ? "bg-[#43d39e]" : score >= 45 ? "bg-[#d8b46a]" : "bg-[#fb7185]";
  return (
    <div>
      <div className="flex items-center justify-between gap-3 text-sm">
        <span className="font-bold text-[#2c271f]">{label}</span>
        <span className="font-black">{value}</span>
      </div>
      <div className="mt-2 h-2 rounded-full bg-[#ead8b9]">
        <div className={`h-2 rounded-full ${color}`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

function Insight({ label, text }: { label: string; text: string }): JSX.Element {
  return (
    <div className="mt-3 rounded-2xl border border-[#ead8b9] bg-[#fffaf1] p-4">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-[#a66f1f]">{label}</p>
      <p className="mt-2 text-sm leading-6 text-[#5d5548]">{text}</p>
    </div>
  );
}

function EffectPreview({ effects, spacious = false }: { effects: Partial<Record<Metric, number>>; spacious?: boolean }): JSX.Element {
  const entries = Object.entries(effects).filter(([, value]) => value !== 0) as [Metric, number][];
  return (
    <div className={`flex flex-wrap gap-2 ${spacious ? "mt-4" : "mt-3"}`}>
      {entries.map(([key, value]) => (
        <span key={key} className={`rounded-full px-2.5 py-1 text-[11px] font-black ${value > 0 ? "bg-[#e9f8ee] text-[#0f7a4a]" : "bg-[#fff0f0] text-[#be123c]"}`}>
          {metricName(key)} {value > 0 ? "+" : ""}{value}
        </span>
      ))}
    </div>
  );
}

function BusinessCell({ label, value }: { label: string; value: number }): JSX.Element {
  return (
    <div className="rounded-3xl border border-[#ead8b9] bg-white p-4">
      <p className="text-xs font-black uppercase tracking-[0.16em] text-[#a66f1f]">{label}</p>
      <p className="mt-3 text-3xl font-black tracking-[-0.04em]">{value}</p>
    </div>
  );
}

function BusinessCellDark({ label, value }: { label: string; value: number }): JSX.Element {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.07] p-4">
      <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#d8b46a]">{label}</p>
      <p className="mt-3 text-4xl font-black tracking-[-0.05em] text-white">{value}</p>
    </div>
  );
}

function MiniMetricDark({ label, value, inverse }: { label: string; value: number; inverse?: boolean }): JSX.Element {
  const score = inverse ? 100 - value : value;
  const color = score >= 70 ? "bg-[#43d39e]" : score >= 45 ? "bg-[#d8b46a]" : "bg-[#fb7185]";

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-3">
      <div className="flex items-center justify-between gap-3 text-sm">
        <span className="font-bold text-[#e8dcc9]">{label}</span>
        <span className="text-lg font-black text-white">{value}</span>
      </div>
      <div className="mt-2 h-2.5 rounded-full bg-white/10">
        <div className={`h-2.5 rounded-full ${color}`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

function ResultMetric({ label, value }: { label: string; value: number }): JSX.Element {
  return (
    <div className="rounded-3xl border border-[#ead8b9] bg-white p-5">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-[#a66f1f]">{label}</p>
      <p className="mt-3 text-4xl font-black tracking-[-0.05em]">{value}</p>
    </div>
  );
}

function LeadInput({ label, value, onChange, type = "text", required = false }: { label: string; value: string; onChange: (value: string) => void; type?: string; required?: boolean }): JSX.Element {
  return (
    <label className="block">
      <span className="text-xs font-black uppercase tracking-[0.18em] text-[#637083]">{label}</span>
      <input type={type} value={value} required={required} onChange={(event) => onChange(event.target.value)} className="mt-2 w-full rounded-2xl border border-[#d7dde8] bg-[#f7f9fc] px-4 py-4 text-base font-bold outline-none transition focus:border-[#1f5eff] focus:bg-white" />
    </label>
  );
}

function Status({ tone, text }: { tone: "success" | "error"; text: string }): JSX.Element {
  return <div className={`mt-5 rounded-2xl px-4 py-3 text-sm font-bold ${tone === "success" ? "bg-[#e9f8ee] text-[#0f7a4a]" : "bg-[#fff0f0] text-[#be123c]"}`}>{text}</div>;
}

function initiative(id: string, title: string, area: string, description: string, upside: string, risk: string, effects: Initiative["effects"]): Initiative {
  return {
    id,
    title,
    area,
    description,
    upside,
    risk,
    effects,
    feedback: {
      now: "Вы быстро сдвинули ситуацию, но часть эффекта снова держится на вашем личном участии.",
      delegate: "Вы передали не задачу, а ответственность. Система стала взрослее и менее зависимой от вас.",
      postpone: "Вы сохранили фокус, но проблема ушла в управленческий долг и вернется позже.",
      reject: "Вы отсекли инициативу, но вместе с шумом могли убрать часть важного сигнала."
    }
  };
}

function applyEffects(metrics: Metrics, effects: Partial<Record<Metric, number>>): Metrics {
  const next = { ...metrics };
  for (const [key, value] of Object.entries(effects) as [Metric, number][]) next[key] = clamp(next[key] + value);
  return next;
}

function clamp(value: number): number {
  return Math.max(0, Math.min(100, value));
}

function calculateResult(metrics: Metrics): { ending: EndingType; title: string; subtitle: string; diagnosis: string; recommendation: string } {
  const systemScore = Math.round((metrics.control + metrics.trust + metrics.growth + (100 - metrics.chaos) + (100 - metrics.dependency) + (100 - metrics.debt)) / 6);
  const marketScore = Math.round((metrics.profit + metrics.clients + metrics.growth) / 3);
  const peopleScore = Math.round((metrics.team + metrics.trust + (100 - metrics.dependency)) / 3);
  let ending: EndingType = "firefighter";

  if (systemScore >= 74 && marketScore >= 66 && peopleScore >= 64) ending = "scaler";
  else if (systemScore >= 64 && metrics.control >= 62) ending = "architect";
  else if (metrics.profit >= 64 && metrics.trust < 50) ending = "controller";
  else if (peopleScore >= 65 && metrics.control < 62) ending = "inspirer";

  return { ending, ...ENDINGS[ending] };
}

function buildRecommendations(metrics: Metrics, history: Decision[]): string[] {
  const delegated = history.filter((item) => item.zone === "delegate").length;
  const ownerDriven = history.filter((item) => item.zone === "now").length;
  const postponed = history.filter((item) => item.zone === "postpone").length;
  const list: string[] = [];

  if (metrics.dependency > 58 || ownerDriven > delegated) list.push("Снизьте зависимость от собственника: выберите три типа решений, которые больше не должны доходить до вас без готового варианта от руководителя.");
  if (metrics.chaos > 52 || metrics.debt > 52 || postponed >= 2) list.push("Проведите аудит управленческого долга: какие решения откладывались, почему и какой риск они создают для клиентов, маржи и команды.");
  if (metrics.trust < 58 || metrics.team < 58) list.push("Усилите средний менеджмент: не мотивационными речами, а правами решений, ритмом обратной связи и разбором реальных конфликтов.");
  if (metrics.growth > 62 && metrics.control < 65) list.push("Не ускоряйте рост без операционной рамки: сначала закрепите стандарты обещаний клиенту, владельцев процессов и правила исключений.");

  return (list.length ? list : [
    "Закрепите операционную систему на 90 дней: цели, владельцы, метрики, клиентские стандарты и еженедельный совет решений.",
    "Проведите тест недели без собственника, чтобы увидеть, какие контуры зрелые, а какие держатся на личном контроле.",
    "Свяжите рост с качеством денег: карта маржи, правила скидок и премиальные предложения для лучших клиентов."
  ]).slice(0, 3);
}

function metricName(metric: Metric): string {
  return ({ ...VISIBLE_LABELS, ...SYSTEM_LABELS } as Record<Metric, string>)[metric];
}
