export const SAVED_ARTICLE_STORAGE_KEY = "journal:saved-article";

export type SavedArticle = {
  slug: string;
  title: string;
  excerpt: string;
  categoryLabel: string;
  href: string;
  savedAt: string;
};
