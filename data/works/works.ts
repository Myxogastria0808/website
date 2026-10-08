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
    name: "なついろにっき。",
    description:
      "Natsuiro Nikki (なついろにっき。), the debut visual novel by the circle Kirinoha Novel, created together with its members and released on DLsite.",
    tags: ["Novel Game", "DLsite"],
    year: "2026",
    isTopic: false,
    links: [
      { label: "DLsite", href: "https://www.dlsite.com/maniax/work/=/product_id/RJ01703526.html" },
      { label: "Website", href: "https://natsuiro.kirinohanovel.com" },
    ],
  },
  {
    name: "スクリプトに落とせない反復作業を Claude に覚えさせる 〜Skills 入門〜",
    description:
      '"Teaching Claude Repetitive Tasks That Can\'t Be Scripted: An Introduction to Skills" (スクリプトに落とせない反復作業を Claude に覚えさせる 〜Skills 入門〜), a presentation introducing Claude Skills for teaching AI repetitive tasks that cannot be scripted, given at Bio"Pack"athon 2026 #8 @ Tokyo and archived on TogoTV.',
    tags: ["Presentation", "BioPackathon", "Claude"],
    year: "2026",
    isTopic: false,
    links: [{ label: "TogoTV", href: "https://togotv.dbcls.jp/20260902.html" }],
  },
  {
    name: "Nixpkgs Maintainer",
    description:
      "Became a maintainer of nixpkgs, the package collection for the Nix package manager.",
    tags: ["Nix"],
    year: "2026",
    isTopic: false,
    links: [{ label: "GitHub", href: "https://github.com/NixOS/nixpkgs" }],
  },
  {
    name: "Category Theory Notes",
    description:
      "A Scrapbox wiki collecting notes on core concepts of category theory, from categories and functors to limits and Grothendieck fibrations.",
    tags: ["Category Theory", "Wiki"],
    year: "2026",
    isTopic: false,
    links: [{ label: "Cosense", href: "https://scrapbox.io/category-theory-scrap/" }],
  },
  {
    name: "Nix ~再現性のある環境を用意する手段の1つとしての使い方~",
    description:
      '"Nix ~One Way to Prepare a Reproducible Environment~" (Nix ~再現性のある環境を用意する手段の1つとしての使い方~), a presentation on Nix as a tool for reproducible development environments, given at Bio"Pack"athon 2025 #1 and archived on TogoTV.',
    tags: ["Presentation", "BioPackathon", "Nix"],
    year: "2025",
    isTopic: false,
    links: [{ label: "TogoTV", href: "https://togotv.dbcls.jp/20250124.html" }],
  },
  {
    name: "Web API × R package",
    description:
      '"Web API x R package", a presentation on turning R functions into Web APIs with plumber and building documentation pages with Hugging Face Spaces, given at Bio"Pack"athon 2024 #11 and archived on TogoTV.',
    tags: ["Presentation", "BioPackathon", "R", "Web API"],
    year: "2024",
    isTopic: false,
    links: [{ label: "TogoTV", href: "https://togotv.dbcls.jp/20241120.html" }],
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
  {
    name: "R言語でWebAppを作成する",
    description:
      '"Creating a Web App with R" (R言語でWebAppを作成する), a presentation on building web applications in R with Shiny and publishing them via Cloudflare Tunnel, given at Bio"Pack"athon 2023 #11 and archived on TogoTV.',
    tags: ["Presentation", "BioPackathon", "R", "Web Application"],
    year: "2023",
    isTopic: false,
    links: [{ label: "TogoTV", href: "https://togotv.dbcls.jp/20231124.html" }],
  },
];

export const ALL_WORKS: Work[] = [...WORKS].sort((a, b) => parseInt(b.year) - parseInt(a.year));
