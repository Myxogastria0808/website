import type { LinkLabel } from "./linkIcons";
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
  links?: WorkLink[];
};

export const WORKS: Work[] = [
  {
    name: "The proof of DB Schema Migration",
    description: "The proof for validation of DB schema migrations.",
    tags: ["Category Theory", "DB Theory"],
    year: "2026",
    links: [
      { label: "GitHub", href: "https://github.com/Myxogastria0808/RDB-schema-migrations-proof" },
    ],
  },
];

export const ALL_WORKS: Work[] = [...WORKS].sort((a, b) => parseInt(b.year) - parseInt(a.year));

