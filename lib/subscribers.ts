export const CONTACT_STATUSES = [
  "new",
  "qualified",
  "nurturing",
  "offer_sent",
  "customer",
  "archived"
] as const;

export type ContactStatus = (typeof CONTACT_STATUSES)[number];

export type SubscriberContact = {
  id: string;
  fullName: string;
  email: string;
  status: ContactStatus;
  source: string;
  sourceHistory: string[];
  tags: string[];
  notes: string;
  subscribedAt: string;
  updatedAt: string;
};

export type SubscriberFilters = {
  query?: string;
  status?: ContactStatus | "all";
  source?: string;
  tag?: string;
};

export const DEFAULT_CONTACT_STATUS: ContactStatus = "new";

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function normalizeName(fullName: string): string {
  return fullName.trim().replace(/\s+/g, " ");
}

export function normalizeTag(tag: string): string {
  return tag.trim().toLowerCase();
}

export function isContactStatus(value: string): value is ContactStatus {
  return CONTACT_STATUSES.includes(value as ContactStatus);
}

export function parseTagList(input: string | string[] | undefined): string[] {
  if (!input) {
    return [];
  }

  const source = Array.isArray(input) ? input : input.split(",");
  return Array.from(new Set(source.map((tag) => normalizeTag(tag)).filter(Boolean)));
}

