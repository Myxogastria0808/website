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
    name: "Natsuiro Nikki",
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
    name: "Teaching Claude Repetitive Tasks That Can't Be Scripted: An Introduction to Skills",
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
    name: "Trying Out ReproZip",
    description:
      "An exploration of ReproZip, a tool for capturing and reproducing computational experiments.",
    tags: ["Qiita", "ReproZip"],
    year: "2026",
    isTopic: false,
    links: [
      { label: "Qiita", href: "https://qiita.com/Myxogastria0808/items/3bb27c244f2d50642a73" },
    ],
  },
  {
    name: "Nix ~One Way to Prepare a Reproducible Environment~",
    description:
      '"Nix ~One Way to Prepare a Reproducible Environment~" (Nix ~再現性のある環境を用意する手段の1つとしての使い方~), a presentation on Nix as a tool for reproducible development environments, given at Bio"Pack"athon 2025 #1 and archived on TogoTV.',
    tags: ["Presentation", "BioPackathon", "Nix"],
    year: "2025",
    isTopic: false,
    links: [{ label: "TogoTV", href: "https://togotv.dbcls.jp/20250124.html" }],
  },
  {
    name: "Creating cf-r2-sdk, a Rust Crate for Manipulating Cloudflare R2 Objects",
    description:
      "The story of building cf-r2-sdk, a Rust crate for manipulating objects in Cloudflare R2.",
    tags: ["Qiita", "Rust", "Cloudflare", "Cloudflare R2"],
    year: "2025",
    isTopic: false,
    links: [
      { label: "Qiita", href: "https://qiita.com/Myxogastria0808/items/10734e3d701a519b3d5f" },
    ],
  },
  {
    name: "How to Install Ghostty on NixOS",
    description: "A guide to installing the Ghostty terminal emulator on NixOS.",
    tags: ["Qiita", "NixOS", "Ghostty"],
    year: "2025",
    isTopic: false,
    links: [
      { label: "Qiita", href: "https://qiita.com/Myxogastria0808/items/09e068d8031d3448ad3a" },
    ],
  },
  {
    name: "Web API x R package",
    description:
      '"Web API x R package", a presentation on turning R functions into Web APIs with plumber and building documentation pages with Hugging Face Spaces, given at Bio"Pack"athon 2024 #11 and archived on TogoTV.',
    tags: ["Presentation", "BioPackathon", "R", "Web API"],
    year: "2024",
    isTopic: false,
    links: [{ label: "TogoTV", href: "https://togotv.dbcls.jp/20241120.html" }],
  },
  {
    name: "An Introduction to rix",
    description: "An introduction to rix, an R package for building reproducible Nix environments.",
    tags: ["Qiita", "R", "Nix", "rix"],
    year: "2024",
    isTopic: false,
    links: [
      { label: "Qiita", href: "https://qiita.com/Myxogastria0808/items/f1089d8687cdf71bd6b4" },
    ],
  },
  {
    name: "How to Host a plumber Web API on Hugging Face Spaces",
    description:
      "A guide to hosting a Web API built with the R package plumber on Hugging Face Spaces.",
    tags: ["Qiita", "R", "Web API", "Hugging Face"],
    year: "2024",
    isTopic: false,
    links: [
      { label: "Qiita", href: "https://qiita.com/Myxogastria0808/items/72644b62d5a7d1e19eda" },
    ],
  },
  {
    name: "How to Use ActiveEnum with SeaORM",
    description: "A guide to using ActiveEnum with SeaORM, a Rust ORM.",
    tags: ["Qiita", "Rust", "SeaORM"],
    year: "2024",
    isTopic: false,
    links: [
      { label: "Qiita", href: "https://qiita.com/Myxogastria0808/items/c64f9b72e4cbca4e03bc" },
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
  {
    name: "Creating a Web App with R",
    description:
      '"Creating a Web App with R" (R言語でWebAppを作成する), a presentation on building web applications in R with Shiny and publishing them via Cloudflare Tunnel, given at Bio"Pack"athon 2023 #11 and archived on TogoTV.',
    tags: ["Presentation", "BioPackathon", "R", "Web Application"],
    year: "2023",
    isTopic: false,
    links: [{ label: "TogoTV", href: "https://togotv.dbcls.jp/20231124.html" }],
  },
  {
    name: 'Fixing a "had non-zero exit status" Error When Installing the R devtools Package on Ubuntu',
    description:
      'A fix for the "had non-zero exit status" error encountered when installing the R devtools package on Ubuntu.',
    tags: ["Qiita", "R", "Ubuntu"],
    year: "2023",
    isTopic: false,
    links: [
      { label: "Qiita", href: "https://qiita.com/Myxogastria0808/items/1f50c3e865ba4ef0d37f" },
    ],
  },
  {
    name: "Serving a Shiny Application via Cloudflare Tunnel",
    description: "A guide to serving an R Shiny application to the internet via Cloudflare Tunnel.",
    tags: ["Qiita", "R", "Shiny", "Cloudflare", "Cloudflare Tunnel"],
    year: "2023",
    isTopic: false,
    links: [
      { label: "Qiita", href: "https://qiita.com/Myxogastria0808/items/2d26dbb605f8c9a93371" },
    ],
  },
  {
    name: 'Fixing the "nothing matches org.mozilla.firefox in remote flathub" Error When Installing Firefox on a Chromebook',
    description:
      'A fix for the "nothing matches org.mozilla.firefox in remote flathub" error encountered when installing Firefox on a Chromebook.',
    tags: ["Qiita", "Chromebook", "Firefox"],
    year: "2023",
    isTopic: false,
    links: [
      { label: "Qiita", href: "https://qiita.com/Myxogastria0808/items/f335dfeab3b781a4f3fe" },
    ],
  },
  {
    name: "Learning LaTeX as a Beginner",
    description: "Notes on learning LaTeX from scratch as a beginner.",
    tags: ["Qiita", "LaTeX"],
    year: "2023",
    isTopic: false,
    links: [
      { label: "Qiita", href: "https://qiita.com/Myxogastria0808/items/5e1ac8c71373c665d847" },
    ],
  },
  {
    name: "Still Wanting to Save Passwords in Notepad!",
    description:
      "A workaround for saving passwords in Notepad using Google Drive and a CLSID batch file trick.",
    tags: ["Qiita", "Windows"],
    year: "2023",
    isTopic: false,
    links: [
      { label: "Qiita", href: "https://qiita.com/Myxogastria0808/items/945b7d9dcaed97864c8e" },
    ],
  },
  {
    name: "How to Implement CSP in Flask with flask-talisman",
    description: "A guide to implementing a Content Security Policy in Flask using flask-talisman.",
    tags: ["Qiita", "Flask", "Python"],
    year: "2023",
    isTopic: false,
    links: [
      { label: "Qiita", href: "https://qiita.com/Myxogastria0808/items/bd051d3e3ee2a37e7ba7" },
    ],
  },
  {
    name: "Fixing an app.app_context() Error When Creating a SQLite Database in Flask",
    description:
      "A fix for an app.app_context() error encountered when creating a SQLite database in Flask.",
    tags: ["Qiita", "Flask", "Python", "SQLite"],
    year: "2023",
    isTopic: false,
    links: [
      { label: "Qiita", href: "https://qiita.com/Myxogastria0808/items/38cba342e9108f2c66f8" },
    ],
  },
  {
    name: 'Fixing the "Unable to find bundled Java version" Error When Setting Up Flutter on Windows 11',
    description:
      'A fix for the "Unable to find bundled Java version" error encountered when setting up Flutter on Windows 11.',
    tags: ["Qiita", "Flutter", "Windows"],
    year: "2023",
    isTopic: false,
    links: [
      { label: "Qiita", href: "https://qiita.com/Myxogastria0808/items/cf1f596b57aecddafbff" },
    ],
  },
  {
    name: "Nagino Mashiro Unofficial Fan Site",
    description: "An unofficial fan site for the VTuber Nagino Mashiro (凪乃ましろ).",
    tags: ["VTuber", "Website"],
    year: "2023",
    isTopic: false,
    links: [{ label: "Website", href: "https://mashirono-oyatsu.web.app/" }],
  },
  {
    name: "Flood Hazard Map of Ozu City, Ehime",
    description:
      "An interactive hazard map built with QGIS and QGIS2web, visualizing the 2018 flooding in Ozu City, Ehime Prefecture, using geospatial data from the Geospatial Information Authority of Japan.",
    tags: ["QGIS", "GIS", "Website"],
    year: "2022",
    isTopic: false,
    links: [
      { label: "Website", href: "https://myxogastria0808.github.io/QGIS/" },
      { label: "YouTube", href: "https://www.youtube.com/watch?v=GwC8YU3UmuE" },
    ],
  },
  {
    name: "BSSO (Brief Simulation System using OpenFOAM)",
    description:
      "Research and development of BSSO (Brief Simulation System using OpenFOAM), a proprietary pipeline combining Blender, XSim, and OpenFOAM to simplify 3D fluid simulation, built to study how differences in slime mold fruiting body shape affect spore dispersal. Co-developed with Ryoji Yasugi, Yugo Fujiwara, Shiyu Kanamori, and Soshi Murakami, and selected (入選) in the System Software category at JSEC2022 (Japan Science & Engineering Challenge).",
    tags: ["CFD", "OpenFOAM", "Blender", "Myxogastria"],
    year: "2022",
    isTopic: false,
    links: [
      { label: "Website", href: "https://myxogastria0808.github.io/BSSO/" },
      { label: "Paper", href: "https://ipsj.ixsq.nii.ac.jp/records/224084" },
      { label: "Award", href: "https://manabu.asahi.com/jsec/2022/award/index.html" },
      { label: "YouTube", href: "https://www.youtube.com/watch?v=n4zT5GOVXco" },
      { label: "YouTube", href: "https://www.youtube.com/watch?v=fjehOPjSw-8" },
    ],
  },
  {
    name: "About PCA",
    description:
      "A site explaining an R-based PCA (Principal Component Analysis) framework that compresses multi-dimensional vectors into 3D, letting users visualize 4+ dimensional CSV data via ggbiplot or rgl/pca3d.",
    tags: ["R", "PCA", "Website"],
    year: "2022",
    isTopic: false,
    links: [{ label: "Website", href: "https://myxogastria0808.github.io/AboutPCA/" }],
  },
  {
    name: "CG Animation",
    description:
      "A portfolio site for 3D CG animation work made with Blender, including a short animation screened at a high school culture festival and a 3D city reconstruction built with the BlenderGIS add-on from real GIS data.",
    tags: ["Blender", "GIS", "Website"],
    year: "2022",
    isTopic: false,
    links: [
      { label: "Website", href: "https://myxogastria0808.github.io/CG-Animation/" },
      { label: "YouTube (blenderGIS)", href: "https://www.youtube.com/watch?v=HF1L8oaYq4U" },
      { label: "YouTube (Animation)", href: "https://www.youtube.com/watch?v=hAxmn4Z_DuI" },
    ],
  },
  {
    name: "Code Hack",
    description:
      "A collection of small, practical programming techniques to make everyday life more convenient, including audio waveform plotting in Python, 3D scatter plots in R, a Swiper.js-based slider, a hover-expanding card UI, a GitHub Pages auto-update batch script, and a Flask/Gunicorn template for Heroku.",
    tags: ["Python", "R", "JavaScript", "Flask", "Website"],
    year: "2022",
    isTopic: false,
    links: [{ label: "Website", href: "https://myxogastria0808.github.io/CodeHack/" }],
  },
  {
    name: "The Quest for the 4 Dimensions",
    description:
      'An educational site explaining how to conceptualize the 4th dimension by analogy, imagining how inhabitants of a 2D world would perceive 3D objects as "magic," illustrated with diagrams and mathematical notation.',
    tags: ["Geometry", "Website"],
    year: "2022",
    isTopic: false,
    links: [
      {
        label: "Website",
        href: "https://myxogastria0808.github.io/The-Quest-for-the-4-Dimensions/",
      },
    ],
  },
  {
    name: "Website Update System",
    description:
      "Documentation for a GitHub Pages update automation system (SimpleGitHubPagesCycleSystem) that manages the site's directory structure, compresses images with Squoosh CLI, and streamlines the Git-based deployment workflow.",
    tags: ["GitHub Pages", "Website"],
    year: "2022",
    isTopic: false,
    links: [
      { label: "Website", href: "https://myxogastria0808.github.io/AboutWebsiteUpdateSystem/" },
    ],
  },
  {
    name: "PCA Machine",
    description:
      "An index site linking to a set of R Shiny PCA (Principal Component Analysis) tools, each handling a different number of data elements (3 to 20), letting users pick a tool matching their data's complexity and edit/plot it interactively.",
    tags: ["R", "Shiny", "PCA", "Website"],
    year: "2022",
    isTopic: false,
    links: [{ label: "Website", href: "https://myxogastria0808.github.io/PCA_App/" }],
  },
  {
    name: "PCA Plot (iris version)",
    description:
      "An R Shiny app that runs PCA on the iris dataset and lets users interactively customize the resulting plots.",
    tags: ["R", "Shiny", "PCA", "Website"],
    year: "2022",
    isTopic: false,
    links: [{ label: "Website", href: "https://pcaplot.shinyapps.io/irisPCA/" }],
  },
  {
    name: "In Praise of R",
    description:
      "In Praise of R (R言語のススメ), a beginner's textbook on R and RStudio focused on command-line operation, self-published and sold on Amazon. The free web edition on GitHub Pages renders it as a page-flipping animation built with the jQuery plugin BookBlock, with the source code published on GitHub.",
    tags: ["R", "Book"],
    year: "2022",
    isTopic: false,
    links: [
      { label: "E-Book", href: "https://myxogastria0808.github.io/R-book/" },
      { label: "Amazon", href: "https://www.amazon.co.jp/dp/B0BCD5HZKJ/" },
      { label: "GitHub", href: "https://github.com/Myxogastria0808/R-book" },
      { label: "YouTube", href: "https://www.youtube.com/watch?v=0tEtxw7SL9c" },
    ],
  },
  {
    name: "data.library",
    description:
      "An R package for browsing R's built-in datasets by category through an interactive, argument-free menu, with data_library() showing summary statistics and scatter plots and help_data_library() showing dataset help pages. Installable from GitHub via devtools.",
    tags: ["R", "Package"],
    year: "2022",
    isTopic: false,
    links: [
      { label: "Website", href: "https://myxogastria0808.github.io/About-data.library/" },
      { label: "GitHub", href: "https://github.com/Myxogastria0808/data.library" },
      { label: "YouTube", href: "https://www.youtube.com/watch?v=t0EsbldqyQU" },
    ],
  },
];

export const ALL_WORKS: Work[] = [...WORKS].sort((a, b) => parseInt(b.year) - parseInt(a.year));
