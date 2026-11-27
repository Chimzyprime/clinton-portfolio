import type { Config } from "tailwindcss";

// Every colour comes from a CSS variable (see globals.css) so the light/dark
// themes swap by changing one attribute on <html>, with no re-render.
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        fg: "var(--fg)",
        muted: "var(--muted)",
        line: "var(--line)",
        "line-strong": "var(--line-strong)",
        surface: "var(--surface)",
        accent: "var(--accent)",
      },
      fontFamily: {
        // Set by next/font in layout.tsx; fallbacks are size-adjusted by Next
        // so swapping to the web font does not shift the layout.
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      maxWidth: {
        page: "1440px",
      },
    },
  },
  plugins: [],
};

export default config;
