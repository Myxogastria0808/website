export const TAGS = ["Category Theory", "DB Theory"] as const;

export type Tag = (typeof TAGS)[number];

