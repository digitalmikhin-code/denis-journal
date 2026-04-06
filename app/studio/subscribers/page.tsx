import Link from "next/link";
import { SubscribersCrm } from "@/components/subscribers-crm";

export const metadata = {
  title: "CRM подписчиков",
  robots: {
    index: false,
    follow: false,
    nocache: true
  }
};

export default function SubscribersAdminPage(): JSX.Element {
  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] border border-slate-200 bg-[linear-gradient(135deg,#f3f4ff_0%,#eef8ff_100%)] p-6 shadow-[0_20px_44px_rgba(15,23,42,0.08)] md:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Служебный раздел</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-900 md:text-5xl">
          CRM-база email-подписчиков
        </h1>
        <p className="mt-4 max-w-[62ch] text-base leading-8 text-slate-700">
          Закрытый раздел для вашей собственной базы контактов: статус лида, источник подписки, теги,
          заметки и дата. Используйте CRM для сегментации рассылок, прогрева и продвижения продуктов.
        </p>
        <p className="mt-2 max-w-[62ch] text-sm leading-7 text-slate-600">
          Безопасность: вход в страницу защищён Basic Auth, а операции с данными дополнительно защищены CRM
          токеном.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="/newsletter"
            className="rounded-2xl border border-slate-900/15 bg-white px-5 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
          >
            Открыть страницу рассылки
          </Link>
        </div>
      </section>

      <SubscribersCrm />
    </div>
  );
}
