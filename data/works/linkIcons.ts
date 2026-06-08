import { FaArrowUpRightFromSquare, FaGithub, FaGitlab, FaDna } from "react-icons/fa6";
import { SiScrapbox, SiQiita, SiZenn, SiNote, SiHatenabookmark, SiWikipedia } from "react-icons/si";
import type { IconType } from "react-icons";

export const LINK_LABELS = [
  "GitHub",
  "GitLab",
  "Cosense",
  "TogoTV",
  "Qiita",
  "Zenn",
  "note",
  "Hatena Blog",
  "Wiki",
] as const;

export type LinkLabel = (typeof LINK_LABELS)[number];

export const LINK_ICONS: Record<LinkLabel, IconType> = {
  GitHub: FaGithub,
  GitLab: FaGitlab,
  Cosense: SiScrapbox,
  TogoTV: FaDna,
  Qiita: SiQiita,
  Zenn: SiZenn,
  note: SiNote,
  "Hatena Blog": SiHatenabookmark,
  Wiki: SiWikipedia,
};

export { FaArrowUpRightFromSquare as FallbackIcon };
