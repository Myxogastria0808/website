export const TAGS = [
  "AC Entrance Exam",
  "Category Theory",
  "DB Theory",
  "Entrance Exam",
  "NII",
  "Portfolio",
  "Proof",
  "SOKENDAI",
  "University of Tsukuba",
  "Website",
] as const;

export type Tag = (typeof TAGS)[number];
