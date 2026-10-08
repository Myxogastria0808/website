export const TAGS = [
  "AC Entrance Exam",
  "BioPackathon",
  "Category Theory",
  "Claude",
  "DB Theory",
  "DLsite",
  "Entrance Exam",
  "NII",
  "Nix",
  "Novel Game",
  "Portfolio",
  "Presentation",
  "Proof",
  "R",
  "SOKENDAI",
  "University of Tsukuba",
  "Web API",
  "Web Application",
  "Website",
  "Wiki",
] as const;

export type Tag = (typeof TAGS)[number];
