export const TAGS = [
  "AC Entrance Exam",
  "Category Theory",
  "DB Theory",
  "University of Tsukuba",
] as const;

export type Tag = (typeof TAGS)[number];
