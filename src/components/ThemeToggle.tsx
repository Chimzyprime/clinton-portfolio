"use client";

import { useEffect, useState } from "react";

type Theme = "dark" | "light";

/**
 * Switches between the dark (default) and warm light themes.
 *
 * Layout-shift note: the visible label ("Light" / "Dark") is swapped with CSS
 * keyed on <html data-theme>, not with React state, and the button has a fixed
 * width. The label is therefore correct on the very first paint and nothing
 * moves when React hydrates.
 */
export function ThemeToggle() {
  // null until mounted, so server and first client render match exactly.
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    // Read what the pre-paint script already applied.
    const current = document.documentElement.getAttribute("data-theme");
    setTheme(current === "light" ? "light" : "dark");
  }, []);

  function toggle() {
    const next: Theme = theme === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Storage can be blocked (private mode); the theme still switches.
    }
    setTheme(next);
  }

  // Screen-reader name states the action, not the current state.
  const label =
    theme === "light" ? "Switch to dark theme" : "Switch to light theme";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      className="label inline-flex h-9 w-[5.25rem] items-center justify-center border border-fg !text-fg transition-colors hover:border-accent hover:!text-accent"
    >
      {/* Shown while the theme is dark: offers "Light". */}
      <span data-show-in="dark">Light</span>
      {/* Shown while the theme is light: offers "Dark". */}
      <span data-show-in="light">Dark</span>
    </button>
  );
}
