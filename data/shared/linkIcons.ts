import {
  FaAmazon,
  FaArrowUpRightFromSquare,
  FaAward,
  FaBookOpen,
  FaDna,
  FaFileLines,
  FaGithub,
  FaGitlab,
  FaGlobe,
  FaYoutube,
} from "react-icons/fa6";
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
  "Amazon",
  "Award",
  "Cosense",
  "crates.io",
  "E-Book",
  "GitHub",
  "GitLab",
  "Hatena Blog",
  "note",
  "npm",
  "Paper",
  "Qiita",
  "TogoTV",
  "Website",
  "Wiki",
  "YouTube",
  "Zenn",
] as const;

export type LinkLabel = (typeof LINK_LABELS)[number];

export const LINK_ICONS: Record<LinkLabel, IconType> = {
  Amazon: FaAmazon,
  Award: FaAward,
  Cosense: SiScrapbox,
  "crates.io": SiRust,
  "E-Book": FaBookOpen,
  GitHub: FaGithub,
  GitLab: FaGitlab,
  "Hatena Blog": SiHatenabookmark,
  note: SiNote,
  npm: SiNpm,
  Paper: FaFileLines,
  Qiita: SiQiita,
  TogoTV: FaDna,
  Website: FaGlobe,
  Wiki: SiWikipedia,
  YouTube: FaYoutube,
  Zenn: SiZenn,
};

export { FaArrowUpRightFromSquare as FallbackIcon };
