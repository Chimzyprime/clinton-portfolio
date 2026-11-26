import type { Metadata, Viewport } from "next";
import { Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { site } from "@/data/site";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

// next/font self-hosts these files and generates a size-adjusted fallback
// font, so the swap from fallback to web font does not move any text.
const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
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
  themeColor: "#0a0a0a",
};

/**
 * Runs before first paint. Reads the saved theme and sets it on <html>, so a
 * visitor who chose "light" never sees a dark flash (or a layout jump).
 * Dark is the default. Wrapped in try/catch because storage can be blocked.
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
      className={`${sans.variable} ${mono.variable}`}
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
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
