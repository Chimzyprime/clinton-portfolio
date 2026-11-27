import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { site } from "@/data/site";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

// Font files live in src/fonts (latin subset), so the build never has to
// download anything. next/font/local still generates size-adjusted fallbacks,
// so swapping from fallback to web font does not move any text.
const sans = localFont({
  src: "../fonts/inter-latin-wght-normal.woff2",
  weight: "100 900",
  variable: "--font-sans",
  display: "swap",
});
// Display face for headings. Weights limited to what the design uses.
const display = localFont({
  src: [
    { path: "../fonts/manrope-latin-600-normal.woff2", weight: "600" },
    { path: "../fonts/manrope-latin-700-normal.woff2", weight: "700" },
  ],
  variable: "--font-display",
  display: "swap",
});
const mono = localFont({
  src: "../fonts/ibm-plex-mono-latin-400-normal.woff2",
  weight: "400",
  variable: "--font-mono",
  display: "swap",
});

// Absolute URLs for social previews. Vercel provides the production host.
const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} — Brand identity, graphics & frontend`,
    template: `%s — ${site.name}`,
  },
  description: site.intro,
  authors: [{ name: site.name }],
  openGraph: {
    type: "website",
    title: site.name,
    description: site.intro,
    siteName: site.name,
  },
};

export const viewport: Viewport = {
  // Colours the mobile browser bar to match the default (dark) theme.
  themeColor: "#12110e",
};

/**
 * Runs before first paint. Reads the saved theme and sets it on <html>, so a
 * visitor who chose "light" never sees a dark flash (or a layout jump).
 * Dark is the default; warm light is the alternate. Wrapped in try/catch because storage can be blocked.
 */
const themeScript = `
(function () {
  var theme = "dark";
  try {
    var saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") theme = saved;
  } catch (e) {}
  document.documentElement.setAttribute("data-theme", theme);
})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // suppressHydrationWarning: the script above changes data-theme before
    // React hydrates, which is intentional.
    <html
      lang="en"
      data-theme="dark"
      className={`${sans.variable} ${display.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        {/* First tab stop: lets keyboard users jump past the navigation. */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-fg focus:px-4 focus:py-2 focus:text-bg"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
