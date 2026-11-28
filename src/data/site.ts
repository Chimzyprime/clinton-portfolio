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

export interface WorkImage {
  src: string; // path under /public, e.g. "/work/talorify.jpg"
  alt: string; // describe what the image shows, for screen readers
  width: number; // intrinsic pixel width of the file
  height: number; // intrinsic pixel height of the file
}

/**
 * Hero portrait: a transparent cutout (WebP with alpha) in /public.
 * width and height MUST be the file's real pixel size: they reserve the space
 * before the image loads, so nothing shifts. The lighting behind it is CSS
 * (see .portrait-light in globals.css), not part of the image.
 */
export const portrait: WorkImage = {
  src: "/portrait.webp",
  alt: "Portrait of Nwachukwu Clinton Chimaroke in a black suit, white shirt and black tie",
  width: 1145,
  height: 1254,
};

export const site = {
  name: "Nwachukwu Clinton Chimaroke",
  shortName: "Clinton Chimaroke",
  location: "Umudike, Abia State, Nigeria",
  email: "chimzyprime@gmail.com",
  intro:
    "A multidisciplinary creative and technical builder working across brand identity, campaign design, frontend development and technical writing.",
  /** Hero copy, as written in the creative brief. */
  hero: {
    headline: "I build brands and digital experiences.",
    title: "Brand Designer × Full-Stack Developer",
    description:
      "I combine thoughtful brand design with technology to create distinctive identities and meaningful digital experiences.",
  },
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
    n: "01",
    title: "Brand identity design",
    description:
      "Building distinctive and cohesive brand identities that give businesses a recognisable visual presence. From logo design and logo systems to typography, colour systems and brand guidelines, I create visual identities that communicate a brand\u2019s personality and values.",
    capabilities: [
      "Logo design",
      "Logo systems",
      "Brand identity development",
      "Typography",
      "Colour systems",
      "Brand guidelines",
      "Visual identity applications",
    ],
    visual: "brand",
  },
  {
    n: "02",
    title: "Campaign & community graphics",
    description:
      "Creating engaging visual content that helps brands, projects and online communities communicate, promote and connect with their audiences. From campaign creatives to event materials and social media assets, I design visuals that bring ideas and campaigns to life.",
    capabilities: [
      "Campaign graphics",
      "Community graphics",
      "Promotional flyers",
      "Banners",
      "Event graphics",
      "Social media assets",
      "Launch creatives",
    ],
    visual: "campaign",
  },
  {
    n: "03",
    title: "Full-stack development",
    description:
      "Building responsive, functional and accessible websites and web applications. I work across frontend and backend development to turn ideas and existing designs into practical digital experiences.",
    capabilities: [
      "Website development",
      "Web application development",
      "Frontend development",
      "Backend development",
      "Landing page implementation from existing designs",
    ],
    visual: "code",
  },
] as const;

export const book = {
  title: "UAV Software Development",
  description:
    "A technical reference for UAV software development, self-published on Amazon KDP as a paperback and a Kindle eBook.",
  published: "September–October 2026",
  // href: "https://www.amazon.com/...", // add the Amazon link and it will render
} as const;

/** Tools grouped by discipline. Keep this list to things you actually use. */
/**
 * Tools & technologies. `icon` is a key of brandIcons (an official mark) or a
 * neutral Lucide icon name for tools that have no mark in that set.
 */
export interface Tool {
  name: string;
  kind: string;
  icon: string;
}

export const tools: { group: string; blurb: string; items: readonly Tool[] }[] = [
  {
    group: "Brand & graphic design",
    blurb: "The software behind identities, campaign graphics and print.",
    items: [
      { name: "Adobe Illustrator", kind: "Vector graphics", icon: "PenTool" },
      { name: "Adobe Photoshop", kind: "Image editing", icon: "ImageIcon" },
      { name: "Canva Pro", kind: "Design platform", icon: "LayoutTemplate" },
    ],
  },
  {
    group: "Full-stack development",
    blurb: "Languages, frameworks and platforms I build websites with.",
    items: [
      { name: "HTML", kind: "Language", icon: "html" },
      { name: "CSS", kind: "Language", icon: "css" },
      { name: "JavaScript", kind: "Language", icon: "javascript" },
      { name: "TypeScript", kind: "Language", icon: "typescript" },
      { name: "React", kind: "UI library", icon: "react" },
      { name: "Next.js", kind: "React framework", icon: "nextjs" },
      { name: "Tailwind CSS", kind: "CSS framework", icon: "tailwind" },
      { name: "Framer", kind: "No-code website platform", icon: "framer" },
      { name: "Framer Motion", kind: "React animation library", icon: "Waypoints" },
      { name: "GitHub", kind: "Code hosting & version control", icon: "github" },
    ],
  },
];

export const about = {
  heading: "The mind behind the work.",
  intro:
    "I'm Nwachukwu Clinton Chimaroke, a Brand Designer and Full-Stack Developer combining creative thinking, visual design, and technology to build distinctive brands and meaningful digital experiences.",
  paragraph:
    "I approach every project by understanding the problem first, developing a clear creative direction, and bringing that vision to life through thoughtful design and purposeful technology.",
  title: "Brand Designer × Full-Stack Developer",
  location: "Based in Nigeria · Working Worldwide",
  principles: [
    {
      n: "01",
      title: "Understand",
      body: "Every meaningful project begins with understanding the problem, the audience, and the purpose behind the work.",
    },
    {
      n: "02",
      title: "Think",
      body: "Developing a clear direction that connects creative strategy, visual identity, and user experience.",
    },
    {
      n: "03",
      title: "Design",
      body: "Creating thoughtful visual systems and digital experiences with attention to detail, consistency, and usability.",
    },
    {
      n: "04",
      title: "Build",
      body: "Turning ideas and designs into functional, responsive digital experiences through development.",
    },
  ],
  capabilities: [
    {
      heading: "Brand & creative",
      items: ["Brand identity design", "Graphic design", "Visual communication", "Creative direction"],
    },
    {
      heading: "Development",
      items: ["Frontend development", "Backend development", "Full-stack development", "UI implementation"],
    },
  ],
} as const;

/**
 * Web builds carousel (components/WebBuilds.tsx).
 *
 * The six entries below are PLACEHOLDERS: generic mockups, not real projects.
 * To swap one for a real site, replace the entry with:
 *   {
 *     title: "Project name",
 *     tagline: "Brand site, Next.js",
 *     href: "https://the-live-site.com",
 *     image: { src: "/builds/project.webp", alt: "…", width: 1600, height: 1000 },
 *   }
 * Put the hero screenshot (16:10 works best) in /public/builds/. When `image`
 * is set the card shows the screenshot inside the browser frame; when `href`
 * is set the caption shows a "Visit site" link. `placeholder` and the colour
 * fields can then be deleted.
 */
export interface WebBuild {
  title: string;
  tagline: string;
  href?: string;
  image?: { src: string; alt: string; width: number; height: number };
  /** Marks a stand-in mockup. Remove when the entry is a real site. */
  placeholder?: boolean;
  /** Placeholder mockup colours only. */
  mock?: { accent: string; bg: string; ink: string; url: string };
}

export const webBuilds: WebBuild[] = [
  { title: "ThemisX", tagline: "Brand & front-end · Zenith Bank Zecathon 6.0", placeholder: false },
  { title: "Your brand studio site", tagline: "Placeholder · Next.js", placeholder: true, mock: { accent: "#e2574c", bg: "#141413", ink: "#f2f0eb", url: "yourstudio.com" } },
  { title: "Your fintech product", tagline: "Placeholder · Next.js", placeholder: true, mock: { accent: "#3b82f6", bg: "#0e1424", ink: "#e8eefc", url: "yourfintech.io" } },
  { title: "Your creative agency", tagline: "Placeholder · Next.js", placeholder: true, mock: { accent: "#c8f169", bg: "#10130d", ink: "#eef5dc", url: "youragency.co" } },
  { title: "Your Web3 community", tagline: "Placeholder · Next.js", placeholder: true, mock: { accent: "#a78bfa", bg: "#15111f", ink: "#efeaff", url: "yourdao.xyz" } },
  { title: "Your fashion label", tagline: "Placeholder · Next.js", placeholder: true, mock: { accent: "#1a1917", bg: "#efe9dd", ink: "#1a1917", url: "yourlabel.com" } },
  { title: "Your event landing page", tagline: "Placeholder · Next.js", placeholder: true, mock: { accent: "#f59e0b", bg: "#1a1410", ink: "#fbf1e0", url: "yourevent.com" } },
];

/* ------------------------------------------------------------------------ *
 * Design work (components/DesignWork.tsx, /work/[slug], /designs)
 * ------------------------------------------------------------------------ */

/** A full identity project. Opens its own case-study page at /work/<slug>. */
export interface BrandSystem {
  slug: string;
  title: string;
  year?: string;
  summary: string;
  /** Hero image for the card and case study. Placeholder art shows until set. */
  image?: WorkImage;
}

/** Real projects from `work` above; copy is reused, nothing is invented. */
export const brandSystems: BrandSystem[] = [
  { slug: "kaidivox", title: "KAIDIVOX Technologies", year: "2026", summary: "Logo system and brand pack for a technology company, from monogram exploration to a full identity kit." },
  { slug: "talorify", title: "Talorify", year: "2026", summary: "Logo and two-colour identity for a Chrome extension that helps job seekers get past ATS filters." },
];

export const designCategories = ["Social Media", "Web3", "Pitch Decks", "Thumbnails", "Events", "Abia Web3 Network"] as const;
export type DesignCategory = (typeof designCategories)[number];

/**
 * Single pieces (flyers, banners, posts, deck visuals). They feed the moving
 * strip on the home page and the filterable gallery at /designs.
 * Entries without `image` show placeholder art; add an image to replace it
 * (width/height required so nothing shifts while it loads).
 */
export interface DesignPiece {
  title: string;
  category: DesignCategory;
  image?: WorkImage;
}

export const designs: DesignPiece[] = [
  { title: "Lucky Sheep banner", category: "Web3" },
  { title: "APEX Foundation banner", category: "Web3" },
  { title: "FOMO Life pitch-deck visuals", category: "Pitch Decks" },
  { title: "Abia Fashion Week flyer", category: "Events" },
  { title: "Abia Web3 Network LinkedIn graphics", category: "Abia Web3 Network" },
  { title: "Lucky Sheep profile picture", category: "Web3" },
  { title: "FOMO Life campaign graphics", category: "Social Media" },
  { title: "Community meetup flyer", category: "Events" },
];
