import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { RecommendationBlock } from "@/components/recommendation-block";
import { TrackedLink } from "@/components/tracked-link";
import { buildStepikUtmUrl, getCourseIdFromUrl } from "@/lib/analytics";
import {
  CATEGORY_LABELS,
  CATEGORY_SHORT_LABELS,
  CATEGORY_THEME,
  SITE_URL,
  TELEGRAM_CHANNEL_URL,
  type Category
} from "@/lib/constants";
import { getAllCareerPaths, getCareerPathPrograms, type CareerPath } from "@/lib/career-paths";
import { getFeaturedArticles, getLatestArticles, type ArticleSummary } from "@/lib/content";
import { getRecommendation } from "@/lib/recommendations";
import { STEPIK_COURSES, STEPIK_PROFILE_FACTS, type StepikCourse } from "@/lib/stepik-courses";

export const metadata: Metadata = {
  title: "Р–СѓСЂРЅР°Р» Р”РµРЅРёСЃР° РњРёС…РёРЅР°",
  description:
    "Р–СѓСЂРЅР°Р» Р”РµРЅРёСЃР° РњРёС…РёРЅР° РґР»СЏ СЂСѓРєРѕРІРѕРґРёС‚РµР»РµР№ Рё СЃРёР»СЊРЅС‹С… СЃРїРµС†РёР°Р»РёСЃС‚РѕРІ: РєР°Рє РїСЂРёРЅРёРјР°С‚СЊ СЂРµС€РµРЅРёСЏ, СЂР°СЃС‚Рё Рё СѓРїСЂР°РІР»СЏС‚СЊ СЃР»РѕР¶РЅС‹РјРё СЃРёСЃС‚РµРјР°РјРё.",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "Р–СѓСЂРЅР°Р» Р”РµРЅРёСЃР° РњРёС…РёРЅР°",
    description:
      "Р–СѓСЂРЅР°Р» Р”РµРЅРёСЃР° РњРёС…РёРЅР° РґР»СЏ СЂСѓРєРѕРІРѕРґРёС‚РµР»РµР№ Рё СЃРёР»СЊРЅС‹С… СЃРїРµС†РёР°Р»РёСЃС‚РѕРІ: РєР°Рє РїСЂРёРЅРёРјР°С‚СЊ СЂРµС€РµРЅРёСЏ, СЂР°СЃС‚Рё Рё СѓРїСЂР°РІР»СЏС‚СЊ СЃР»РѕР¶РЅС‹РјРё СЃРёСЃС‚РµРјР°РјРё.",
    url: SITE_URL
  }
};

const workTasks = [
  {
    title: "РњРµРЅСЏ РїРѕРІС‹СЃРёР»Рё РґРѕ СЂСѓРєРѕРІРѕРґРёС‚РµР»СЏ",
    text: "РЎРѕР±СЂР°С‚СЊ СѓРїСЂР°РІР»РµРЅС‡РµСЃРєСѓСЋ Р±Р°Р·Сѓ, РіСЂР°РЅРёС†С‹ РѕС‚РІРµС‚СЃС‚РІРµРЅРЅРѕСЃС‚Рё Рё РїРµСЂРІС‹Рµ СЂРµС€РµРЅРёСЏ РІ РЅРѕРІРѕР№ СЂРѕР»Рё.",
    href: "/solutions/promoted-manager"
  },
  {
    title: "РќСѓР¶РЅРѕ РІРЅРµРґСЂРёС‚СЊ РР",
    text: "РџРѕРЅСЏС‚СЊ, РіРґРµ РР РїРѕРјРѕРіР°РµС‚ СѓРїСЂР°РІР»РµРЅРёСЋ, Р°РЅР°Р»РёС‚РёРєРµ, СЂРµС€РµРЅРёСЏРј Рё РµР¶РµРґРЅРµРІРЅРѕР№ СЂР°Р±РѕС‚Рµ.",
    href: "/solutions/implement-ai"
  },
  {
    title: "РҐРѕС‡Сѓ РїРµСЂРµР№С‚Рё РІ СѓРїСЂР°РІР»РµРЅРёРµ РїСЂРѕРµРєС‚Р°РјРё",
    text: "Р Р°Р·РѕР±СЂР°С‚СЊСЃСЏ СЃ РїСЂРѕРµРєС‚РЅРѕР№ Р»РѕРіРёРєРѕР№, СЃСЂРѕРєР°РјРё, СЂРёСЃРєР°РјРё, РєРѕРјРјСѓРЅРёРєР°С†РёРµР№ Рё СЂРµР·СѓР»СЊС‚Р°С‚РѕРј.",
    href: "/solutions/project-management"
  },
  {
    title: "РќРµ РїРѕРЅРёРјР°СЋ Agile",
    text: "РћС‚РґРµР»РёС‚СЊ СЂР°Р±РѕС‡РёРµ РїСЂРёРЅС†РёРїС‹ Agile РѕС‚ СЂРёС‚СѓР°Р»РѕРІ, С‚РµСЂРјРёРЅРѕРІ Рё РєРѕРјР°РЅРґРЅРѕРіРѕ С‚РµР°С‚СЂР°.",
    href: "/solutions/implement-agile"
  },
  {
    title: "РљРѕРјР°РЅРґР° РЅРµ Р±РµСЂРµС‚ РѕС‚РІРµС‚СЃС‚РІРµРЅРЅРѕСЃС‚СЊ",
    text: "РќР°Р№С‚Рё, РіРґРµ Р»РѕРјР°СЋС‚СЃСЏ РґРѕРіРѕРІРѕСЂРµРЅРЅРѕСЃС‚Рё, РІР»Р°РґРµР»СЊС†С‹, РєРѕРЅС‚СЂРѕР»СЊ Рё СѓРїСЂР°РІР»РµРЅС‡РµСЃРєРёР№ С„РѕРєСѓСЃ.",
    href: "/solutions/team-responsibility"
  },
  {
    title: "РџРѕСЃС‚РѕСЏРЅРЅРѕ РЅРµ С…РІР°С‚Р°РµС‚ РІСЂРµРјРµРЅРё",
    text: "РЎРЅРёР·РёС‚СЊ РїРµСЂРµРіСЂСѓР·, РІРµСЂРЅСѓС‚СЊ РєРѕРЅС‚СЂРѕР»СЊ РЅР°Рґ Р·Р°РґР°С‡Р°РјРё Рё СѓР±СЂР°С‚СЊ Р»РёС€РЅСЋСЋ РѕРїРµСЂР°С†РёРѕРЅРєСѓ.",
    href: "/solutions/time-management"
  },
  {
    title: "РҐРѕС‡Сѓ СЃС‚Р°С‚СЊ Product Manager",
    text: "РџРµСЂРµР№С‚Рё РѕС‚ Р·Р°РґР°С‡ Рё С„СѓРЅРєС†РёР№ Рє С†РµРЅРЅРѕСЃС‚Рё, РїРѕР»СЊР·РѕРІР°С‚РµР»СЋ, РіРёРїРѕС‚РµР·Р°Рј Рё РјРµС‚СЂРёРєР°Рј.",
    href: "/solutions/product-manager"
  },
  {
    title: "РќСѓР¶РЅРѕ РІС‹СЃС‚СЂРѕРёС‚СЊ СЃРёСЃС‚РµРјСѓ СѓРїСЂР°РІР»РµРЅРёСЏ",
    text: "РЎРѕР±СЂР°С‚СЊ С†РµР»Рё, СЂРёС‚Рј, РѕС‚РІРµС‚СЃС‚РІРµРЅРЅРѕСЃС‚СЊ, РјРµС‚СЂРёРєРё Рё РїСЂРѕР·СЂР°С‡РЅРѕСЃС‚СЊ РёСЃРїРѕР»РЅРµРЅРёСЏ.",
    href: "/solutions/management-system"
  }
] as const;

const developmentDirections: Array<{
  title: string;
  description: string;
  category?: Category;
  programsCount: number;
  href: string;
}> = [
  {
    title: "Р СѓРєРѕРІРѕРґСЃС‚РІРѕ",
    description: "Р РµС€РµРЅРёСЏ, РѕС‚РІРµС‚СЃС‚РІРµРЅРЅРѕСЃС‚СЊ, РєРѕРјР°РЅРґР°, СѓРїСЂР°РІР»РµРЅС‡РµСЃРєР°СЏ Р·СЂРµР»РѕСЃС‚СЊ Рё СЃРїРѕРєРѕР№РЅС‹Р№ РєРѕРЅС‚СЂРѕР»СЊ.",
    category: "management",
    programsCount: 5,
    href: "/category/management"
  },
  {
    title: "РЈРїСЂР°РІР»РµРЅРёРµ РїСЂРѕРµРєС‚Р°РјРё",
    description: "РЎСЂРѕРєРё, СЂРёСЃРєРё, С‚СЂРµР±РѕРІР°РЅРёСЏ, РєРѕРјРјСѓРЅРёРєР°С†РёСЏ Рё РїСЂРµРґСЃРєР°Р·СѓРµРјРѕРµ РґРІРёР¶РµРЅРёРµ Рє СЂРµР·СѓР»СЊС‚Р°С‚Сѓ.",
    category: "management",
    programsCount: 4,
    href: "/training#project-management"
  },
  {
    title: "РСЃРєСѓСЃСЃС‚РІРµРЅРЅС‹Р№ РёРЅС‚РµР»Р»РµРєС‚",
    description: "РџСЂР°РєС‚РёС‡РЅРѕРµ РїСЂРёРјРµРЅРµРЅРёРµ РР РІ СѓРїСЂР°РІР»РµРЅРёРё, Р°РЅР°Р»РёС‚РёРєРµ, С‚РµРєСЃС‚Р°С… Рё РїРѕРґРіРѕС‚РѕРІРєРµ СЂРµС€РµРЅРёР№.",
    category: "ai",
    programsCount: 3,
    href: "/category/ai"
  },
  {
    title: "Agile",
    description: "Scrum, Kanban, РїРѕС‚РѕРє, РіРёР±РєРёРµ РёР·РјРµРЅРµРЅРёСЏ Рё РєРѕРјР°РЅРґРЅР°СЏ СЂР°Р±РѕС‚Р° Р±РµР· Р»РёС€РЅРёС… СЂРёС‚СѓР°Р»РѕРІ.",
    category: "agile",
    programsCount: 6,
    href: "/category/agile"
  },
  {
    title: "Product Management",
    description: "Р¦РµРЅРЅРѕСЃС‚СЊ, РїРѕР»СЊР·РѕРІР°С‚РµР»СЊ, РїСЂРѕРґСѓРєС‚РѕРІР°СЏ Р»РѕРіРёРєР°, РіРёРїРѕС‚РµР·С‹, РјРµС‚СЂРёРєРё Рё Р·Р°РїСѓСЃРє.",
    programsCount: 2,
    href: "/training#product-thinking"
  },
  {
    title: "Р›РёС‡РЅР°СЏ СЌС„С„РµРєС‚РёРІРЅРѕСЃС‚СЊ",
    description: "Р¤РѕРєСѓСЃ, Р·Р°РґР°С‡Рё, РїРµСЂРµРіСЂСѓР·, РєР°СЂСЊРµСЂРЅС‹Р№ РєР°РїРёС‚Р°Р» Рё СЂРѕСЃС‚ РІРЅСѓС‚СЂРё СЃР»РѕР¶РЅРѕР№ СЃРёСЃС‚РµРјС‹.",
    category: "career",
    programsCount: 3,
    href: "/category/career"
  }
];

const careerRoutes = [
  {
    label: "РњР°СЂС€СЂСѓС‚",
    title: "Р СѓРєРѕРІРѕРґРёС‚РµР»СЊ",
    result: "РЈРІРµСЂРµРЅРЅРѕ РїРµСЂРµР№С‚Рё РѕС‚ СЌРєСЃРїРµСЂС‚РЅРѕР№ СЂРѕР»Рё Рє СѓРїСЂР°РІР»РµРЅРёСЋ Р»СЋРґСЊРјРё, СЂРµС€РµРЅРёСЏРјРё Рё СЂРµР·СѓР»СЊС‚Р°С‚РѕРј.",
    programs: "5 РїСЂРѕРіСЂР°РјРј",
    href: "/start"
  },
  {
    label: "РњР°СЂС€СЂСѓС‚",
    title: "Project Manager",
    result: "РЎРѕР±СЂР°С‚СЊ Р±Р°Р·Сѓ РїРѕ РїСЂРѕРµРєС‚Р°Рј, СЃСЂРѕРєР°Рј, СЂРёСЃРєР°Рј, РєРѕРјРјСѓРЅРёРєР°С†РёСЏРј Рё СѓРїСЂР°РІР»РµРЅРёСЋ РѕР¶РёРґР°РЅРёСЏРјРё.",
    programs: "4 РїСЂРѕРіСЂР°РјРјС‹",
    href: "/training#project-management"
  },
  {
    label: "РњР°СЂС€СЂСѓС‚",
    title: "AI Leader",
    result: "РќР°СѓС‡РёС‚СЊСЃСЏ РїСЂРёРјРµРЅСЏС‚СЊ РР РєР°Рє СѓРїСЂР°РІР»РµРЅС‡РµСЃРєРёР№ РёРЅСЃС‚СЂСѓРјРµРЅС‚, Р° РЅРµ РєР°Рє РјРѕРґРЅСѓСЋ РёРіСЂСѓС€РєСѓ.",
    programs: "3 РїСЂРѕРіСЂР°РјРјС‹",
    href: "/training#ai-prompting"
  },
  {
    label: "РњР°СЂС€СЂСѓС‚",
    title: "Product Manager",
    badge: "Product",
    result: "РџРµСЂРµР№С‚Рё Рє РїСЂРѕРґСѓРєС‚РѕРІРѕРјСѓ РјС‹С€Р»РµРЅРёСЋ: С†РµРЅРЅРѕСЃС‚СЊ, РїРѕР»СЊР·РѕРІР°С‚РµР»СЊ, РіРёРїРѕС‚РµР·С‹ Рё РјРµС‚СЂРёРєРё.",
    programs: "2 РїСЂРѕРіСЂР°РјРјС‹",
    href: "/training#product-thinking"
  }
] as const;

const trustFacts = [
  [String(STEPIK_PROFILE_FACTS.coursesCount), "РїСЂРѕРіСЂР°РјРј РІ РїСЂРѕС„РёР»Рµ Stepik"],
  [STEPIK_PROFILE_FACTS.studentsText, "РїСЂРѕС€Р»Рё РїСЂРѕРіСЂР°РјРјС‹"],
  ["10+", "Р»РµС‚ РїСЂР°РєС‚РёС‡РµСЃРєРѕРіРѕ РѕРїС‹С‚Р°"],
  ["PMO / KPI / CRM", "РєРѕСЂРїРѕСЂР°С‚РёРІРЅС‹Рµ РїСЂРѕРµРєС‚С‹"],
  ["150+", "РІС‹СЃС‚СѓРїР»РµРЅРёР№ Рё СЂР°Р·Р±РѕСЂРѕРІ"]
] as const;

export default function HomePage(): JSX.Element {
  const popularArticles = getPopularArticles();
  const popularPrograms = getPopularPrograms();
  const homepageCareerPaths = getAllCareerPaths().slice(0, 4);
  const recommendation = getRecommendation("home");

  return (
    <div className="space-y-16">
      <HeroSection />
      <WorkTasksSection />
      <DevelopmentDirectionsSection />
      <CareerRoutesSection paths={homepageCareerPaths} />
      <PopularArticlesSection articles={popularArticles} />
      <PopularProgramsSection courses={popularPrograms} />
      <RecommendationBlock recommendation={recommendation} />
      <TrustSection />
      <TelegramSection />
    </div>
  );
}

function HeroSection(): JSX.Element {
  return (
    <section className="border-b border-slate-200 pb-14 pt-8 dark:border-slate-800 md:pb-20 md:pt-14">
      <div className="max-w-5xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#9f2f73] dark:text-[#f0a6cf]">
          Навигатор профессионального развития
        </p>
        <h1 className="mt-5 max-w-5xl text-4xl font-black leading-[1.02] tracking-tight text-slate-950 dark:text-slate-50 md:text-6xl">
          Найдите следующий шаг в карьере, управлении и обучении
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-700 dark:text-slate-300 md:text-xl">
          Сайт помогает не просто читать статьи, а выбрать понятный маршрут: решить рабочую задачу,
          развить навык, подобрать программу и перейти к действию.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/training"
            className="inline-flex justify-center rounded-2xl bg-slate-950 px-6 py-3 text-base font-bold text-white shadow-[0_14px_30px_rgba(15,23,42,0.18)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#9f2f73] hover:shadow-[0_20px_44px_rgba(159,47,115,0.28)] dark:bg-white dark:text-slate-950"
          >
            РџРѕРґРѕР±СЂР°С‚СЊ РїСЂРѕРіСЂР°РјРјСѓ СЂР°Р·РІРёС‚РёСЏ
          </Link>
          <Link
            href="/articles"
            className="inline-flex justify-center rounded-2xl border border-slate-300 bg-white px-6 py-3 text-base font-bold text-slate-900 transition duration-300 hover:-translate-y-0.5 hover:border-slate-500 hover:shadow-[0_14px_30px_rgba(15,23,42,0.08)] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          >
            Р§РёС‚Р°С‚СЊ Р¶СѓСЂРЅР°Р»
          </Link>
        </div>
      </div>
    </section>
  );
}

function WorkTasksSection(): JSX.Element {
  return (
    <section className="space-y-6">
      <SectionHeader
        eyebrow="Р Р°Р±РѕС‡РёРµ Р·Р°РґР°С‡Рё"
        title="РќР°С‡РЅРёС‚Рµ СЃ С‚РѕРіРѕ, С‡С‚Рѕ СЃРµР№С‡Р°СЃ РјРµС€Р°РµС‚ СЂРѕСЃС‚Сѓ"
        text="Р“Р»Р°РІРЅР°СЏ СЃС‚СЂР°РЅРёС†Р° РІРµРґРµС‚ РЅРµ РІ Р»РµРЅС‚Сѓ Рё РЅРµ РІ РєР°С‚Р°Р»РѕРі, Р° Рє Р±Р»РёР¶Р°Р№С€РµР№ РїСЂРѕС„РµСЃСЃРёРѕРЅР°Р»СЊРЅРѕР№ Р·Р°РґР°С‡Рµ."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {workTasks.map((task) => (
          <Link
            key={task.title}
            href={task.href}
            className="group flex min-h-48 flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_12px_32px_rgba(15,23,42,0.05)] transition duration-300 hover:-translate-y-1 hover:border-[#9f2f73]/40 hover:shadow-[0_20px_46px_rgba(15,23,42,0.10)] dark:border-slate-800 dark:bg-slate-900"
          >
            <div>
              <h3 className="text-xl font-black leading-tight tracking-tight text-slate-950 dark:text-slate-50">{task.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{task.text}</p>
            </div>
            <span className="mt-5 inline-flex rounded-2xl bg-[#fff0f7] px-4 py-3 text-base font-black text-[#9f2f73] transition group-hover:bg-[#9f2f73] group-hover:text-white dark:bg-[#3a1830] dark:text-[#f0a6cf]">
              РЎРѕР±СЂР°С‚СЊ СЃР»РµРґСѓСЋС‰РёР№ С€Р°Рі
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

function DevelopmentDirectionsSection(): JSX.Element {
  const articles = getLatestArticles(200);

  return (
    <section className="space-y-6">
      <SectionHeader
        eyebrow="РќР°РїСЂР°РІР»РµРЅРёСЏ СЂР°Р·РІРёС‚РёСЏ"
        title="Р’С‹Р±РµСЂРёС‚Рµ РѕР±Р»Р°СЃС‚СЊ, РєРѕС‚РѕСЂСѓСЋ РЅСѓР¶РЅРѕ СѓСЃРёР»РёС‚СЊ"
        text="Р’ РєР°СЂС‚РѕС‡РєР°С… СѓР¶Рµ Р·Р°Р»РѕР¶РµРЅС‹ РјРµСЃС‚Р° РґР»СЏ РєРѕР»РёС‡РµСЃС‚РІР° СЃС‚Р°С‚РµР№ Рё РїСЂРѕРіСЂР°РјРј, С‡С‚РѕР±С‹ РґР°Р»СЊС€Рµ РїРѕРґРєР»СЋС‡РёС‚СЊ Р°РІС‚РѕРјР°С‚РёС‡РµСЃРєРёРµ СЃС‡РµС‚С‡РёРєРё."
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {developmentDirections.map((direction) => {
          const articlesCount = direction.category
            ? articles.filter((article) => article.frontmatter.category === direction.category).length
            : 0;

          return (
            <article key={direction.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_12px_32px_rgba(15,23,42,0.05)] dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-2xl font-black tracking-tight text-slate-950 dark:text-slate-50">{direction.title}</h3>
                {direction.category ? (
                  <span
                    className="rounded-full border px-3 py-1 text-xs font-bold"
                    style={{
                      backgroundColor: CATEGORY_THEME[direction.category].badgeBg,
                      borderColor: CATEGORY_THEME[direction.category].badgeBorder,
                      color: CATEGORY_THEME[direction.category].badgeText
                    }}
                  >
                    {CATEGORY_SHORT_LABELS[direction.category]}
                  </span>
                ) : null}
              </div>
              <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">{direction.description}</p>
              <div className="mt-5 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                <span>{articlesCount || "СЃРєРѕСЂРѕ"} СЃС‚Р°С‚РµР№</span>
                <span>В·</span>
                <span>{direction.programsCount} РїСЂРѕРіСЂР°РјРј</span>
              </div>
              <Link
                href={direction.href}
                className="mt-5 inline-flex rounded-2xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-bold text-slate-900 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-[#9f2f73] hover:bg-[#9f2f73] hover:text-white hover:shadow-[0_14px_30px_rgba(159,47,115,0.22)] dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              >
                РџРѕРґСЂРѕР±РЅРµРµ
              </Link>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function CareerRoutesSection({ paths }: { paths: CareerPath[] }): JSX.Element {
  return (
    <section className="space-y-6">
      <SectionHeader
        eyebrow="РљР°СЂСЊРµСЂРЅС‹Рµ РјР°СЂС€СЂСѓС‚С‹"
        title="РќРµ РЅР°Р±РѕСЂ РјР°С‚РµСЂРёР°Р»РѕРІ, Р° РїСѓС‚СЊ Рє РЅРѕРІРѕР№ СЂРѕР»Рё"
        text="РљР°Р¶РґС‹Р№ РјР°СЂС€СЂСѓС‚ РїРѕРєР°Р·С‹РІР°РµС‚ РѕР¶РёРґР°РµРјС‹Р№ СЂРµР·СѓР»СЊС‚Р°С‚ Рё РєРѕР»РёС‡РµСЃС‚РІРѕ РїСЂРѕРіСЂР°РјРј, Р±РµР· СЃР»РѕРІР° В«РєСѓСЂСЃВ»."
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {paths.map((route) => (
          <article key={route.slug} className="rounded-2xl border border-slate-200 bg-slate-950 p-5 text-white shadow-[0_18px_44px_rgba(15,23,42,0.16)] dark:border-slate-800">
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/55">РњР°СЂС€СЂСѓС‚</p>
              {"badge" in route && typeof route.badge === "string" ? (
                <span className="rounded-full bg-[#a9e070] px-3 py-1 text-xs font-black text-[#224f18]">
                  {route.badge}
                </span>
              ) : null}
            </div>
            <h3 className="mt-3 text-2xl font-black tracking-tight">{route.title}</h3>
            <p className="mt-4 text-sm leading-7 text-white/70">{route.description}</p>
            <p className="mt-5 text-sm font-bold text-[#f2cf63]">{getCareerPathPrograms(route).length} СЌС‚Р°РїРѕРІ</p>
            <Link
              href={`/career-paths/${route.slug}`}
              className="mt-5 inline-flex rounded-2xl bg-white px-4 py-2.5 text-sm font-bold text-slate-950 transition duration-300 hover:-translate-y-0.5 hover:bg-[#f2cf63] hover:shadow-[0_14px_30px_rgba(242,207,99,0.24)]"
            >
              РџРѕСЃРјРѕС‚СЂРµС‚СЊ РјР°СЂС€СЂСѓС‚
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}

function PopularArticlesSection({ articles }: { articles: ArticleSummary[] }): JSX.Element {
  return (
    <section className="space-y-6">
      <SectionHeader
        eyebrow="РџРѕРїСѓР»СЏСЂРЅС‹Рµ СЃС‚Р°С‚СЊРё"
        title="РњР°С‚РµСЂРёР°Р»С‹, СЃ РєРѕС‚РѕСЂС‹С… СѓРґРѕР±РЅРѕ РІРѕР№С‚Рё РІ Р¶СѓСЂРЅР°Р»"
        text="РџРѕРґР±РѕСЂРєР° СЃС‚СЂРѕРёС‚СЃСЏ Р°РІС‚РѕРјР°С‚РёС‡РµСЃРєРё РёР· РѕС‚РјРµС‡РµРЅРЅС‹С… РјР°С‚РµСЂРёР°Р»РѕРІ Рё РЅРµ Р·Р°РІРёСЃРёС‚ РѕС‚ СЂСѓС‡РЅРѕРіРѕ РІС‹Р±РѕСЂР° РЅР° РіР»Р°РІРЅРѕР№."
      />
      <div className="grid gap-5 lg:grid-cols-3">
        {articles.map((article) => (
          <article key={article.slug} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_14px_34px_rgba(15,23,42,0.06)] dark:border-slate-800 dark:bg-slate-900">
            <Link href={`/article/${article.slug}`} className="block">
              <div className="relative aspect-[16/9] bg-slate-100">
                <Image
                  src={article.frontmatter.cover}
                  alt={article.frontmatter.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="p-5">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
                  {CATEGORY_LABELS[article.frontmatter.category]}
                </p>
                <h3 className="mt-3 text-2xl font-black leading-tight tracking-tight text-slate-950 dark:text-slate-50">
                  {article.frontmatter.title}
                </h3>
                <p className="mt-3 line-clamp-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                  {article.frontmatter.excerpt}
                </p>
                <div className="mt-5 flex items-center justify-between gap-3">
                  <span className="text-sm font-semibold text-slate-500">
                    {article.frontmatter.readingTime} РјРёРЅ С‡С‚РµРЅРёСЏ
                  </span>
                  <span className="rounded-lg bg-slate-950 px-4 py-2 text-sm font-bold text-white">
                    Р§РёС‚Р°С‚СЊ
                  </span>
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}

function PopularProgramsSection({ courses }: { courses: StepikCourse[] }): JSX.Element {
  return (
    <section className="space-y-6">
      <SectionHeader
        eyebrow="РџРѕРїСѓР»СЏСЂРЅС‹Рµ РїСЂРѕРіСЂР°РјРјС‹"
        title="Р”Рѕ С€РµСЃС‚Рё РїСЂРѕРіСЂР°РјРј, РєРѕС‚РѕСЂС‹Рµ С‡Р°С‰Рµ РІСЃРµРіРѕ РІС‹Р±РёСЂР°СЋС‚"
        text="Р“Р»Р°РІРЅР°СЏ РїРѕРєР°Р·С‹РІР°РµС‚ РєРѕРјРїР°РєС‚РЅСѓСЋ РІРёС‚СЂРёРЅСѓ, Р° РїРѕР»РЅС‹Р№ РєР°С‚Р°Р»РѕРі РѕСЃС‚Р°РµС‚СЃСЏ РЅР° РѕС‚РґРµР»СЊРЅРѕР№ СЃС‚СЂР°РЅРёС†Рµ."
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => {
          const courseId = getCourseIdFromUrl(course.url);
          const courseHref = buildStepikUtmUrl(course.url, {
            medium: "course_catalog",
            campaign: "home_popular_programs",
            content: course.title
          });

          return (
            <article key={course.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_12px_32px_rgba(15,23,42,0.05)] dark:border-slate-800 dark:bg-slate-900">
              <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.12em]">
                <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-600">{course.level}</span>
                <span className="rounded-full bg-[#edf7f1] px-3 py-1 text-[#23704a]">
                  {course.learners ? `${new Intl.NumberFormat("ru-RU").format(course.learners)} СЃР»СѓС€Р°С‚РµР»РµР№` : "РЅРѕРІР°СЏ РїСЂРѕРіСЂР°РјРјР°"}
                </span>
              </div>
              <h3 className="mt-4 text-2xl font-black leading-tight tracking-tight text-slate-950 dark:text-slate-50">
                {course.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{course.result}</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href="/training"
                  className="rounded-2xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-bold text-slate-900 transition duration-300 hover:-translate-y-0.5 hover:border-[#9f2f73] hover:bg-[#9f2f73] hover:text-white dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                >
                  РџРѕРґСЂРѕР±РЅРµРµ
                </Link>
                <TrackedLink
                  href={courseHref}
                  goal="stepik_click"
                  params={{
                    course_id: courseId,
                    course_title: course.title,
                    course_url: course.url,
                    source: "home_popular_programs"
                  }}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-2xl bg-slate-950 px-4 py-2.5 text-sm font-bold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#9f2f73] hover:shadow-[0_14px_30px_rgba(159,47,115,0.22)] dark:bg-white dark:text-slate-950"
                >
                  РќР°С‡Р°С‚СЊ РѕР±СѓС‡РµРЅРёРµ
                </TrackedLink>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function TrustSection(): JSX.Element {
  return (
    <section className="space-y-6">
      <SectionHeader
        eyebrow="РџРѕС‡РµРјСѓ РјРЅРµ РјРѕР¶РЅРѕ РґРѕРІРµСЂСЏС‚СЊ"
        title="РўРѕР»СЊРєРѕ С„Р°РєС‚С‹, Р±РµР· РґР»РёРЅРЅРѕР№ Р±РёРѕРіСЂР°С„РёРё"
        text="Р­С‚РѕС‚ Р±Р»РѕРє РѕС‚РІРµС‡Р°РµС‚ Р·Р° РґРѕРІРµСЂРёРµ С‡РµСЂРµР· РїСЂРѕРІРµСЂСЏРµРјС‹Рµ РїРѕРєР°Р·Р°С‚РµР»Рё Рё РїСЂРѕС„РµСЃСЃРёРѕРЅР°Р»СЊРЅС‹Р№ РєРѕРЅС‚РµРєСЃС‚."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {trustFacts.map(([value, label]) => (
          <div key={label} className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <p className="text-3xl font-black tracking-tight text-slate-950 dark:text-slate-50">{value}</p>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function TelegramSection(): JSX.Element {
  return (
    <section className="rounded-[2rem] border border-[#7ccfff] bg-gradient-to-br from-[#eaf8ff] to-white p-6 shadow-[0_22px_54px_rgba(2,132,199,0.12)] dark:border-sky-800 dark:from-slate-900 dark:to-slate-950 md:p-8">
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0a4f7b] dark:text-sky-300">Telegram</p>
          <h2 className="mt-3 max-w-3xl text-3xl font-black tracking-tight text-slate-950 dark:text-slate-50 md:text-4xl">
            Подпишитесь, чтобы не терять полезные разборы и быстрее находить следующий шаг
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-7 text-slate-700 dark:text-slate-300">
            В канале — короткие управленческие идеи, новые статьи, практические материалы и ссылки на программы,
            которые помогают применять знания в работе.
          </p>
        </div>
        <Link
          href={TELEGRAM_CHANNEL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 justify-center rounded-2xl bg-slate-950 px-6 py-3 text-base font-bold text-white shadow-[0_16px_34px_rgba(15,23,42,0.20)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#0a91d8] hover:shadow-[0_20px_46px_rgba(10,145,216,0.28)] dark:bg-white dark:text-slate-950"
        >
          РџРµСЂРµР№С‚Рё РІ Telegram
        </Link>
      </div>
    </section>
  );
}

function SectionHeader({
  eyebrow,
  title,
  text
}: {
  eyebrow: string;
  title: string;
  text: string;
}): JSX.Element {
  return (
    <div className="max-w-4xl">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">{eyebrow}</p>
      <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950 dark:text-slate-50 md:text-4xl">{title}</h2>
      <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600 dark:text-slate-300">{text}</p>
    </div>
  );
}

function getPopularArticles(): ArticleSummary[] {
  const featured = getFeaturedArticles(6);
  if (featured.length >= 6) {
    return featured.slice(0, 6);
  }

  const selected = new Map(featured.map((article) => [article.slug, article]));
  getLatestArticles(30).forEach((article) => {
    if (selected.size < 6) {
      selected.set(article.slug, article);
    }
  });

  return [...selected.values()].slice(0, 6);
}

function getPopularPrograms(): StepikCourse[] {
  return [...STEPIK_COURSES]
    .sort((a, b) => (b.learners ?? 0) - (a.learners ?? 0))
    .slice(0, 6);
}
