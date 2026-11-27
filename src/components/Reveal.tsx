"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Scroll-triggered fade-and-rise, built on IntersectionObserver (no extra
 * animation dependency). Plays once, the moment the element is ~15% into
 * the viewport. Falls back to fully visible, no motion, for
 * prefers-reduced-motion, for pre-hydration paint, and if JS never runs.
 */
export function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  from = "up",
  className = "",
}: {
  children: ReactNode;
  /** Stagger, in ms. */
  delay?: number;
  as?: "div" | "span" | "li";
  /** Direction it enters from. */
  from?: "up" | "left" | "right";
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as never}
      className={`reveal-up ${from === "up" ? "" : `from-${from}`} ${shown ? "is-shown" : ""} ${className}`}
      style={{ ["--d" as string]: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
