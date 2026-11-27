"use client";

import { useEffect, useRef } from "react";
import { Reveal } from "./Reveal";

interface Principle {
  n: string;
  title: string;
  body: string;
}

/**
 * "How I approach the work": a vertical guide line with the four principles
 * zig-zagging either side (01 right, 02 left, 03 right, 04 left). A small
 * light travels down the line with the scroll and each stop lights up as it
 * is passed. One passive, rAF-throttled scroll listener; the light is
 * transform/height only. On phones the line sits at the left edge.
 * Reduced motion: the line is simply drawn complete, nothing moves.
 */
export function ApproachTimeline({ principles }: { principles: readonly Principle[] }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const nodes = Array.from(el.querySelectorAll<HTMLElement>(".tl-node"));

    const paint = (p: number, passed: (n: HTMLElement) => boolean) => {
      el.style.setProperty("--p", String(p));
      nodes.forEach((n) => n.toggleAttribute("data-passed", passed(n)));
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      paint(1, () => true);
      return;
    }

    let raf = 0;
    const update = () => {
      raf = 0;
      const line = window.innerHeight * 0.6;
      const r = el.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (line - r.top) / r.height));
      paint(p, (n) => n.getBoundingClientRect().top < line);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={root} className="tl" style={{ ["--p" as string]: 0 }}>
      <span className="tl-line" aria-hidden="true" />
      <span className="tl-fill" aria-hidden="true" />
      <span className="tl-dot" aria-hidden="true" />
      <ol>
        {principles.map((p, i) => {
          const right = i % 2 === 0; // 01 and 03 on the right of the line
          return (
            <li key={p.n} className="tl-item">
              <span className="tl-node" aria-hidden="true" />
              <Reveal
                from={right ? "right" : "left"}
                delay={60}
                className={`tl-card ${right ? "tl-right" : "tl-left"}`}
              >
                <p className="font-mono text-sm text-text-muted">{p.n}</p>
                <p className="mt-2 text-lg font-semibold tracking-tight">{p.title}</p>
                <p className="mt-2 text-text-secondary">{p.body}</p>
              </Reveal>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
