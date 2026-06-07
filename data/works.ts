export type Work = {
  name: string;
  description: string;
  tags: string[];
  date: string; // ISO date string e.g. "2025-01-15"
  github?: string;
  demo?: string;
};

export const WORKS: Work[] = [
  {
    name: "Project Alpha",
    description: "ここにプロジェクトの説明を書きます。",
    tags: ["TypeScript", "React"],
    date: "2025-01-15",
    github: "https://github.com/Myxogastria0808",
  },
  {
    name: "Project Beta",
    description: "ここにプロジェクトの説明を書きます。",
    tags: ["Haskell", "Category Theory"],
    date: "2024-11-20",
    github: "https://github.com/Myxogastria0808",
  },
  {
    name: "Project Gamma",
    description: "ここにプロジェクトの説明を書きます。",
    tags: ["Nix", "NixOS"],
    date: "2024-09-05",
    github: "https://github.com/Myxogastria0808",
  },
];

