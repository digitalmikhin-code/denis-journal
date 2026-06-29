import Link from "next/link";
import { TELEGRAM_CHANNEL_URL } from "@/lib/constants";

export function ArticleTelegramCta(): JSX.Element {
  return (
    <section className="rounded-[1.75rem] border border-[#7ccfff] bg-[#eaf8ff] p-5 shadow-[0_16px_36px_rgba(15,23,42,0.06)] md:p-6">
      <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#0a4f7b]">Telegram</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">
            Продолжайте профессиональное развитие.
          </h2>
          <p className="mt-3 max-w-3xl text-base leading-7 text-slate-700">
            В Telegram публикуются новые статьи, шаблоны, управленческие решения и материалы,
            которые не попадают в журнал.
          </p>
        </div>
        <Link
          href={TELEGRAM_CHANNEL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex justify-center rounded-2xl bg-slate-950 px-5 py-3 text-sm font-black text-white transition hover:bg-slate-800"
        >
          Перейти в Telegram
        </Link>
      </div>
    </section>
  );
}
