"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

type Theme = "dark" | "light";

/**
 * Round sun/moon button that switches the whole site between dark (default)
 * and light, and saves the choice in localStorage.
 *
 * Layout-shift note: which icon shows is decided by CSS keyed on
 * <html data-theme> (see [data-show-in] in globals.css), not by React state,
 * so the correct icon is there at first paint and nothing flips on hydration.
 * The button has a fixed size.
 */
export function ThemeToggle({ className = "" }: { className?: string }) {
  // null until mounted, so the server and first client render match.
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    // Read what the pre-paint script in layout.tsx already applied.
    const current = document.documentElement.getAttribute("data-theme");
    setTheme(current === "light" ? "light" : "dark");
  }, []);

  function toggle() {
    const root = document.documentElement;
    const next: Theme = theme === "light" ? "dark" : "light";

    // Ease colours across the page for this one switch only.
    root.classList.add("theme-transition");
    root.setAttribute("data-theme", next);
    window.setTimeout(() => root.classList.remove("theme-transition"), 300);

    try {
      localStorage.setItem("theme", next);
    } catch {
      // Storage can be blocked (private mode); the theme still switches.
    }
    setTheme(next);
  }

  // The accessible name states the action. Before mount it assumes dark,
  // which is also what the server renders.
  const label =
    theme === "light" ? "Switch to dark theme" : "Switch to light theme";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className={`icon-btn h-10 w-10 ${className}`}
    >
      {/* In dark mode, offer the sun (go light). */}
      <Sun data-show-in="dark" aria-hidden="true" size={18} strokeWidth={1.75} />
      {/* In light mode, offer the moon (go dark). */}
      <Moon data-show-in="light" aria-hidden="true" size={18} strokeWidth={1.75} />
    </button>
  );
}
