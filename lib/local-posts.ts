export const LOCAL_POSTS_KEY = "journal_live_admin_posts_v1";
export const LOCAL_ADMIN_SESSION_KEY = "journal_live_admin_auth_v1";

export type LocalPost = {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  cover: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

export const LOCAL_ADMIN_PASSWORD = "admin123";

