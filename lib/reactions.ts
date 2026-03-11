export const ARTICLE_REACTIONS = [
  {
    key: "helpful",
    emoji: "💡",
    label: "Полезно",
    accent: "#7ccfff",
    text: "#0a4f7b"
  },
  {
    key: "strong",
    emoji: "🔥",
    label: "Сильно",
    accent: "#ff9aa2",
    text: "#7f1610"
  },
  {
    key: "accurate",
    emoji: "🎯",
    label: "В точку",
    accent: "#cba4ff",
    text: "#4e1eb3"
  },
  {
    key: "practical",
    emoji: "🛠️",
    label: "Беру в работу",
    accent: "#a9e070",
    text: "#224f18"
  },
  {
    key: "save",
    emoji: "📌",
    label: "Сохранил",
    accent: "#f5d45d",
    text: "#5c3b00"
  },
  {
    key: "share",
    emoji: "🚀",
    label: "Хочу обсудить",
    accent: "#ffb267",
    text: "#7a3a00"
  }
] as const;

export type ReactionDefinition = (typeof ARTICLE_REACTIONS)[number];
export type ReactionKey = ReactionDefinition["key"];

export type ReactionCountMap = Record<ReactionKey, number>;

export function createEmptyReactionCounts(): ReactionCountMap {
  return ARTICLE_REACTIONS.reduce((acc, reaction) => {
    acc[reaction.key] = 0;
    return acc;
  }, {} as ReactionCountMap);
}
