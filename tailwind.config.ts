import type { Config } from "tailwindcss";

// Every colour comes from a CSS variable (see globals.css) so the light/dark
// themes swap by changing one attribute on <html>, with no re-render.
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Short utility names (bg-bg, text-fg, text-muted...) map onto the
        // semantic tokens in globals.css.
        bg: "var(--background)",
        fg: "var(--foreground)",
        muted: "var(--text-secondary)",
        subtle: "var(--text-muted)",
        surface: "var(--surface)",
        "surface-elevated": "var(--surface-elevated)",
        line: "var(--border)",
        "line-strong": "var(--border-strong)",
        accent: "var(--accent)",
        "accent-fg": "var(--accent-foreground)",
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
