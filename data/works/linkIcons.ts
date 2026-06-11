import { FaArrowUpRightFromSquare, FaDna, FaGithub, FaGitlab, FaGlobe } from "react-icons/fa6";
import {
  SiScrapbox,
  SiQiita,
  SiZenn,
  SiNote,
  SiHatenabookmark,
  SiWikipedia,
  SiNpm,
  SiRust,
} from "react-icons/si";
import type { IconType } from "react-icons";

export const LINK_LABELS = [
  "Cosense",
  "crates.io",
  "GitHub",
  "GitLab",
  "Hatena Blog",
  "note",
  "npm",
  "Qiita",
  "TogoTV",
  "Website",
  "Wiki",
  "Zenn",
] as const;

export type LinkLabel = (typeof LINK_LABELS)[number];

export const LINK_ICONS: Record<LinkLabel, IconType> = {
  Cosense: SiScrapbox,
  "crates.io": SiRust,
  GitHub: FaGithub,
  GitLab: FaGitlab,
  "Hatena Blog": SiHatenabookmark,
  note: SiNote,
  npm: SiNpm,
  Qiita: SiQiita,
  TogoTV: FaDna,
  Website: FaGlobe,
  Wiki: SiWikipedia,
  Zenn: SiZenn,
};

export { FaArrowUpRightFromSquare as FallbackIcon };
