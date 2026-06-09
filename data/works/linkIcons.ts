import { FaArrowUpRightFromSquare, FaDna, FaGithub, FaGitlab } from "react-icons/fa6";
import { SiScrapbox, SiQiita, SiZenn, SiNote, SiHatenabookmark, SiWikipedia } from "react-icons/si";
import type { IconType } from "react-icons";

export const LINK_LABELS = [
  "Cosense",
  "GitHub",
  "GitLab",
  "Hatena Blog",
  "note",
  "Qiita",
  "TogoTV",
  "Wiki",
  "Zenn",
] as const;

export type LinkLabel = (typeof LINK_LABELS)[number];

export const LINK_ICONS: Record<LinkLabel, IconType> = {
  Cosense: SiScrapbox,
  GitHub: FaGithub,
  GitLab: FaGitlab,
  "Hatena Blog": SiHatenabookmark,
  note: SiNote,
  Qiita: SiQiita,
  TogoTV: FaDna,
  Wiki: SiWikipedia,
  Zenn: SiZenn,
};

export { FaArrowUpRightFromSquare as FallbackIcon };
