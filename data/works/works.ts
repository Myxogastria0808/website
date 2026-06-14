import type { LinkLabel } from "../shared/linkIcons";
import type { Tag } from "./tags";

type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type Year = `${Digit}${Digit}${Digit}${Digit}`;

export type WorkLink = {
  label: LinkLabel | (string & {});
  href: string;
};

export type Work = {
  name: string;
  description: string;
  tags: Tag[];
  year: Year;
  isTopic: boolean;
  links?: WorkLink[];
};

export const WORKS: Work[] = [
  {
    name: "The Proof of DB Schema Migration",
    description: "The proof for validation of DB schema migrations.",
    tags: ["Category Theory", "DB Theory", "Proof"],
    year: "2026",
    isTopic: true,
    links: [],
  },
  {
    name: "Yuki Osada's Revamped Portfolio",
    description: "Yuki Osada's Portfolio for the entrance exam at the NII.",
    tags: ["Entrance Exam", "NII", "SOKENDAI", "Portfolio", "Website"],
    year: "2026",
    isTopic: false,
    links: [
      { label: "Website", href: "https://yukiosada.work/" },
      { label: "GitHub", href: "https://github.com/Myxogastria0808/website" },
    ],
  },
  {
    name: "The Archive of Yuki Osada's Portfolio",
    description: "Yuki Osada's Portfolio for the AC entrance exam at the University of Tsukuba.",
    tags: ["AC Entrance Exam", "University of Tsukuba", "Portfolio", "Website"],
    year: "2023",
    isTopic: false,
    links: [
      { label: "Website", href: "https://archive.yukiosada.work/" },
      { label: "GitHub", href: "https://github.com/Myxogastria0808/ac-entrance-exam-portfolio" },
    ],
  },
];

export const ALL_WORKS: Work[] = [...WORKS].sort((a, b) => parseInt(b.year) - parseInt(a.year));
