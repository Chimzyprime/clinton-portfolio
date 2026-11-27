/**
 * All portfolio content lives here. Components only render what is in this
 * file, so editing your work never means touching layout code.
 *
 * Rules for this file:
 *  - Only facts that are true and can be defended. No invented metrics,
 *    client results, or roles.
 *  - `year` is optional: leave it out when you are not sure.
 *  - `href` is optional: a project only shows a link when one is set.
 *  - `image` is optional: when you add one you MUST give width and height so
 *    the browser can reserve the space and nothing shifts while it loads.
 */

export type DisciplineName =
  | "Brand identity"
  | "Campaign & community graphics"
  | "Frontend development";

export interface WorkImage {
  src: string; // path under /public, e.g. "/work/talorify.jpg"
  alt: string; // describe what the image shows, for screen readers
  width: number; // intrinsic pixel width of the file
  height: number; // intrinsic pixel height of the file
}

export interface WorkItem {
  title: string;
  discipline: DisciplineName;
  year?: string;
  summary: string;
  href?: string;
  image?: WorkImage;
}

/**
 * Hero portrait. Leave as `undefined` until you have the photo; the hero then
 * shows a same-sized placeholder so the layout is identical either way.
 * Put the file in /public (e.g. /public/portrait.jpg) and set its real pixel
 * width and height. A 4:5 portrait (e.g. 1200 x 1500) fits the frame best.
 */
export const portrait: WorkImage | undefined = undefined;

export const site = {
  name: "Nwachukwu Clinton Chimaroke",
  shortName: "Clinton Chimaroke",
  location: "Umudike, Abia State, Nigeria",
  email: "chimzyprime@gmail.com",
  intro:
    "A multidisciplinary creative and technical builder working across brand identity, campaign design, frontend development and technical writing.",
  socials: [
    { label: "X", handle: "@chimzyprime", href: "https://x.com/chimzyprime" },
    {
      label: "LinkedIn",
      handle: "clinton-nwachukwu",
      href: "https://www.linkedin.com/in/clinton-nwachukwu",
    },
    {
      label: "GitHub",
      handle: "Chimzyprime",
      href: "https://github.com/Chimzyprime",
    },
  ],
} as const;

/** What you offer. UI/UX design is deliberately not listed. */
export const services = [
  {
    title: "Brand identity",
    description:
      "Logo systems, typography and colour, and the guidelines that keep a brand consistent.",
  },
  {
    title: "Campaign & community graphics",
    description:
      "Flyers, banners and social assets for launches, events and online communities.",
  },
  {
    title: "Frontend development",
    description:
      "Fast, accessible websites built with HTML, CSS, JavaScript, TypeScript, React, Next.js and Tailwind CSS.",
  },
  {
    title: "Technical writing & books",
    description:
      "Long-form technical reference, written and self-published through Amazon KDP.",
  },
] as const;

export const work: WorkItem[] = [
  // ---- Brand identity ------------------------------------------------------
  {
    title: "Talorify",
    discipline: "Brand identity",
    year: "2026",
    summary:
      "Logo and two-colour identity for a Chrome extension that helps job seekers get past ATS filters.",
  },
  {
    title: "KAIDIVOX Technologies",
    discipline: "Brand identity",
    year: "2026",
    summary:
      "Logo system and brand pack for a technology company, from monogram exploration to a full identity kit.",
  },
  {
    title: "MetaKeySwap",
    discipline: "Brand identity",
    year: "2025",
    summary: "Official project logo and launch marketing materials.",
  },
  {
    title: "ZeroXKing",
    discipline: "Brand identity",
    year: "2025",
    summary: "Official project logo and launch marketing materials.",
  },
  // ---- Campaign & community graphics --------------------------------------
  {
    title: "FOMO Life (FOMO人生)",
    discipline: "Campaign & community graphics",
    year: "2026",
    summary:
      "Pitch-deck visuals and an educational campaign for a Web3 protocol, led as the visual designer.",
  },
  {
    title: "Lucky Sheep (幸运羊)",
    discipline: "Campaign & community graphics",
    year: "2026",
    summary:
      "Fire-themed ram profile picture, banner and promotional graphics for a Web3 community.",
  },
  {
    title: "Abia Web3 Network",
    discipline: "Campaign & community graphics",
    year: "2026",
    summary:
      "Brand assets and a LinkedIn content calendar for a regional Web3 community.",
  },
  {
    title: "Abia Fashion Week",
    discipline: "Campaign & community graphics",
    year: "2026",
    summary:
      "Event flyer for the “Show Us Your Style” edition with Navade Brew.",
  },
  {
    title: "APEX Foundation",
    discipline: "Campaign & community graphics",
    summary:
      "Banner for a Web3 brand, built on a gold, black and orange palette and a phoenix theme.",
  },
  // ---- Frontend development -------------------------------------------------
  {
    title: "ThemisX",
    discipline: "Frontend development",
    summary:
      "Brand and front-end work with Pantheon Forge Ltd on the digital-fraud track of Zenith Bank Zecathon 6.0.",
  },
];

export const book = {
  title: "UAV Software Development",
  description:
    "A technical reference for UAV software development, self-published on Amazon KDP as a paperback and a Kindle eBook.",
  published: "September–October 2026",
  // href: "https://www.amazon.com/...", // add the Amazon link and it will render
} as const;

/** Tools grouped by discipline. Keep this list to things you actually use. */
export const toolkit = [
  {
    group: "Brand & graphics",
    items: ["Adobe Illustrator", "Adobe Photoshop", "CorelDRAW", "Canva", "Figma"],
  },
  {
    group: "Frontend",
    items: [
      "HTML",
      "CSS",
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Tailwind CSS",
      "Vite",
      "Git & GitHub",
    ],
  },
  {
    group: "Publishing",
    items: ["Amazon KDP"],
  },
] as const;

export const about = {
  paragraphs: [
    "I am based in Umudike, Abia State, Nigeria, and I am studying Computer Engineering at Michael Okpara University of Agriculture, Umudike.",
    "Most of my work is for Web3, fintech and community projects. I treat identity, graphics and code as one system: a consistent visual language that is also built properly for the web.",
  ],
} as const;
