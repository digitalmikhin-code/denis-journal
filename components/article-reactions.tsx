"use client";

import { ARTICLE_REACTIONS } from "@/lib/reactions";
import { useArticleReactionData } from "@/components/use-article-reaction-data";

type ArticleReactionsProps = {
  slug: string;
};

export function ArticleReactions({ slug }: ArticleReactionsProps): JSX.Element | null {
  const {
    counts,
    totalVotes,
    topReaction,
    selectedReaction,
    loading,
    submitting,
    error,
    isConfigured,
    vote
  } = useArticleReactionData(slug);

  return (
    <section className="overflow-hidden rounded-[2rem] border border-slate-200 bg-[linear-gradient(135deg,#fff9ed_0%,#fff4f9_48%,#eef8ff_100%)] shadow-[0_24px_56px_rgba(15,23,42,0.08)]">
      <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="border-b border-slate-200/80 p-6 md:p-8 lg:border-b-0 lg:border-r">
          <div className="space-y-5">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex rounded-full bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                После чтения
              </span>
              {topReaction ? (
                <span
                  className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em]"
                  style={{
                    backgroundColor: `${topReaction.reaction.accent}22`,
                    color: topReaction.reaction.text
                  }}
                >
                  <span>{topReaction.reaction.emoji}</span>
                  Топ-реакция
                </span>
              ) : null}
            </div>

            <div>
              <h2 className="text-3xl font-black tracking-tight text-slate-900 md:text-[2.35rem]">
                Какой отклик победил у читателей
              </h2>
              <p className="mt-3 max-w-[42ch] text-base leading-8 text-slate-700">
                Здесь нет негативных оценок. Только сигналы, что реально сработало: что оказалось полезным,
                точным, сильным и что люди унесли в свою работу.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.5rem] border border-slate-200/80 bg-white/85 p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Всего реакций
                </p>
                <p className="mt-3 text-4xl font-black tracking-tight text-slate-900">{totalVotes}</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {selectedReaction
                    ? "Ваш отклик уже учтён и сохранён в этой статье."
                    : loading
                      ? "Загружаю текущее распределение реакций."
                      : "Чем больше откликов, тем яснее видно, что реально резонирует у читателей."}
                </p>
              </div>

              <div className="rounded-[1.5rem] border border-slate-200/80 bg-slate-900 p-4 text-white">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">
                  Топ-реакция статьи
                </p>
                {topReaction ? (
                  <>
                    <div className="mt-3 flex items-center gap-3">
                      <span
                        className="inline-flex h-12 w-12 items-center justify-center rounded-2xl text-2xl"
                        style={{ backgroundColor: `${topReaction.reaction.accent}33` }}
                      >
                        {topReaction.reaction.emoji}
                      </span>
                      <div>
                        <p className="text-xl font-black leading-tight">{topReaction.reaction.label}</p>
                        <p className="text-sm text-white/70">{topReaction.count} голосов</p>
                      </div>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-white/75">
                      Это сейчас самый частый отклик читателей на материал.
                    </p>
                  </>
                ) : (
                  <p className="mt-3 text-sm leading-6 text-white/75">
                    Пока нет откликов. Первый голос задаст тон реакции на статью.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 md:p-8">
          <div className="mb-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              Выберите один отклик
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              После выбора кнопка сохранится и второй раз нажать уже нельзя.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {ARTICLE_REACTIONS.map((reaction) => {
              const isSelected = selectedReaction === reaction.key;
              const isBusy = submitting === reaction.key;

              return (
                <button
                  key={reaction.key}
                  type="button"
                  disabled={!isConfigured || Boolean(selectedReaction) || Boolean(submitting)}
                  onClick={() => void vote(reaction.key)}
                  className="rounded-[1.5rem] border bg-white p-4 text-left shadow-[0_12px_24px_rgba(15,23,42,0.05)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_30px_rgba(15,23,42,0.08)] disabled:cursor-default disabled:opacity-100"
                  style={{
                    borderColor: isSelected ? reaction.accent : "#e2e8f0",
                    backgroundColor: isSelected ? `${reaction.accent}12` : "#ffffff",
                    boxShadow: isSelected ? `0 18px 36px -24px ${reaction.accent}` : undefined
                  }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <span
                      className="inline-flex h-12 w-12 items-center justify-center rounded-2xl text-2xl"
                      style={{ backgroundColor: `${reaction.accent}33` }}
                    >
                      {reaction.emoji}
                    </span>
                    <span
                      className="rounded-full px-2.5 py-1 text-xs font-bold uppercase tracking-[0.12em]"
                      style={{
                        backgroundColor: reaction.accent,
                        color: reaction.text
                      }}
                    >
                      {counts[reaction.key]}
                    </span>
                  </div>
                  <div className="mt-4">
                    <p className="text-base font-black leading-tight text-slate-900">{reaction.label}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {isSelected
                        ? "Ваш отклик уже учтён."
                        : isBusy
                          ? "Сохраняю реакцию…"
                          : "Нажмите, если именно такой отклик у вас после чтения."}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {error && (
        <p className="border-t border-slate-200 bg-white/70 px-6 py-4 text-sm font-medium text-[#b42318] md:px-8">
          {error}
        </p>
      )}
    </section>
  );
}
