import type { LinkLabel } from "../shared/linkIcons";

type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type Year = `19${Digit}${Digit}` | `20${Digit}${Digit}`;
export type Month = `0${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}` | `1${0 | 1 | 2}`;
export type YearMonth = `${Year}-${Month}`;

const MONTH_NAMES = {
  "01": "Jan",
  "02": "Feb",
  "03": "Mar",
  "04": "Apr",
  "05": "May",
  "06": "Jun",
  "07": "Jul",
  "08": "Aug",
  "09": "Sep",
  "10": "Oct",
  "11": "Nov",
  "12": "Dec",
} as const satisfies Record<Month, string>;

export const formatYearMonth = (ym: YearMonth): string => {
  const year = ym.slice(0, 4);
  const month = ym.slice(5) as Month;
  return `${year} ${MONTH_NAMES[month]}`;
};

export type HistoryLink = {
  label: LinkLabel | (string & {});
  href: string;
};

export type HistoryFeature = {
  category: "Affiliations";
  title: string;
  description: string;
};

export type HistoryEntry = {
  name: string;
  description: string;
  year: YearMonth;
  feature?: HistoryFeature;
  links?: HistoryLink[];
};

export const HISTORIES: HistoryEntry[] = [
  {
    name: "Enrolled in Hyogo Prefectural Ono High School",
    description: "Enrolled in Hyogo Prefectural Ono High School.",
    year: "2020-04",
  },
  {
    name: "Graduated from Hyogo Prefectural Ono High School",
    description: "Graduated from Hyogo Prefectural Ono High School.",
    year: "2023-03",
  },
  {
    name: "Enrolled in University of Tsukuba",
    description: "Enrolled in the School of Informatics, University of Tsukuba.",
    year: "2023-04",
    links: [{ label: "Website", href: "https://www.tsukuba.ac.jp" }],
  },
  {
    name: "Joined Sohosai Executive Committee",
    description:
      "Joined the Sohosai Executive Committee, a student body organizing the University of Tsukuba's annual university festival (雙峰祭).",
    year: "2023-04",
    links: [{ label: "Website", href: "https://sohosai.com/" }],
  },
  {
    name: "Biopackathon",
    description:
      "A community hackathon focused on packaging life science databases and data analysis tools as open source software.",
    year: "2023-08",
    feature: {
      category: "Affiliations",
      title: "Biopackathon",
      description:
        "A community hackathon focused on packaging life science databases and data analysis tools as open source software.",
    },
    links: [{ label: "Website", href: "https://sites.google.com/view/biopackathon/" }],
  },
  {
    name: "WORD Editorial Board",
    description:
      "A student-run magazine of the School of Informatics at the University of Tsukuba.",
    year: "2023-12",
    feature: {
      category: "Affiliations",
      title: "WORD Editorial Board",
      description: "Member of WORD, a student-run magazine of the School of Informatics.",
    },
    links: [{ label: "Website", href: "https://www.word-ac.net/" }],
  },
  {
    name: "Ultra-Coins",
    description:
      "A student computing organization at the University of Tsukuba, focused on server management and network infrastructure operation.",
    year: "2024-12",
    feature: {
      category: "Affiliations",
      title: "Ultra-Coins",
      description:
        "Member of Ultra-Coins, a student computing organization at the University of Tsukuba.",
    },
    links: [{ label: "Website", href: "https://ultra.coins.tsukuba.ac.jp/" }],
  },
  {
    name: "Genshiken",
    description:
      "A subculture circle at the University of Tsukuba, with activities spanning manga, anime, cosplay, doujinshi, and more.",
    year: "2025-04",
    feature: {
      category: "Affiliations",
      title: "Genshiken",
      description:
        "Member of Genshiken (現代視覚文化研究会), a subculture circle at the University of Tsukuba.",
    },
    links: [{ label: "Website", href: "https://gsk-tsukuba.net/" }],
  },
  {
    name: "Kirinohanovel",
    description: "A novel game production circle.",
    year: "2025-07",
    feature: {
      category: "Affiliations",
      title: "Kirinohanovel",
      description: "Member of Kirinohanovel, a novel game production circle.",
    },
    links: [{ label: "Website", href: "https://kirinohanovel.com/" }],
  },
];
