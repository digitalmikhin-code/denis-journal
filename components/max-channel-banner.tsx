import Link from "next/link";
import { MAX_CHANNEL_URL } from "@/lib/constants";

type MaxChannelBannerProps = {
  title?: string;
  subtitle?: string;
  label?: string;
  ctaLabel?: string;
  className?: string;
};

export function MaxChannelBanner({
  title = "Подпишитесь на мой канал в Max",
  subtitle = "Там я делюсь новыми материалами журнала, короткими наблюдениями и практическими разборами по управлению, карьере, системному мышлению и ИИ.",
  label = "Канал в Max",
  ctaLabel = "Подписаться в Max",
  className = "relative overflow-hidden rounded-[2rem] border border-[#8fd3fb] bg-[radial-gradient(circle_at_10%_18%,rgba(255,255,255,0.78)_0%,rgba(255,255,255,0)_34%),radial-gradient(circle_at_84%_18%,rgba(143,211,251,0.34)_0%,rgba(143,211,251,0)_42%),linear-gradient(135deg,#eaf8ff_0%,#f4f0ff_56%,#fff7df_100%)] p-6 shadow-[0_22px_52px_rgba(15,23,42,0.07),inset_0_1px_0_rgba(255,255,255,0.78)] md:p-8"
}: MaxChannelBannerProps): JSX.Element {
  return (
    <section className={className}>
      <div className="pointer-events-none absolute -right-16 -top-20 h-52 w-52 rounded-full border-[12px] border-white/65" />
      <div className="pointer-events-none absolute -bottom-20 left-8 h-44 w-44 rounded-full border-[10px] border-[#2bd0e2]/35" />

      <div className="relative grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{label}</p>
          <h2 className="mt-3 max-w-[18ch] text-3xl font-black leading-tight tracking-tight text-slate-900 md:text-5xl">
            {title}
          </h2>
          <p className="mt-4 max-w-[56ch] text-base leading-8 text-slate-700 md:text-lg">{subtitle}</p>
        </div>

        <Link
          href={MAX_CHANNEL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex justify-center rounded-2xl bg-slate-900 px-6 py-3 text-base font-bold text-white shadow-[0_7px_0_0_rgba(15,23,42,0.18)] transition hover:-translate-y-0.5 hover:bg-slate-800"
        >
          {ctaLabel}
        </Link>
      </div>
    </section>
  );
}
