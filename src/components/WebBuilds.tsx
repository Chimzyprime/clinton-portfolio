"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { webBuilds as BUILDS, type WebBuild } from "@/data/site";

/**
 * Web builds: an auto-drifting 3D carousel. The centre card is flat and
 * readable; its neighbours tilt away in perspective.
 *
 * The cards come from `webBuilds` in data/site.ts. Placeholders render a
 * generic CSS mockup (never someone else's real site); a real build renders
 * its hero screenshot inside the same browser frame.
 *
 * Motion: advances every few seconds; pauses on hover, focus and touch;
 * stays still for prefers-reduced-motion (arrows/dots/swipe still work).
 */

const AUTOPLAY_MS = 2400;

function Frame({ b }: { b: WebBuild }) {
  if (!b.image) return <Mock b={b} />;
  const host = b.href ? b.href.replace(/^https?:\/\//, "").replace(/\/$/, "") : "";
  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-xl border border-white/10 bg-surface shadow-xl">
      <div className="flex items-center gap-1.5 border-b border-white/10 bg-black/25 px-3 py-2" aria-hidden="true">
        <span className="h-2 w-2 rounded-full bg-white/25" />
        <span className="h-2 w-2 rounded-full bg-white/25" />
        <span className="h-2 w-2 rounded-full bg-white/25" />
        {host && (
          <span className="mx-auto rounded-full bg-white/10 px-3 py-0.5 font-mono text-[9px] opacity-70">{host}</span>
        )}
      </div>
      <div className="relative flex-1">
        <Image src={b.image.src} alt={b.image.alt} fill sizes="(min-width: 768px) 720px, 78vw" className="object-cover object-top" />
      </div>
    </div>
  );
}

function Mock({ b }: { b: WebBuild }) {
  // No invented domain for a real project with no mock set: show neutral
  // placeholder art and the project name instead of a made-up URL.
  const m = b.mock ?? { accent: "#8c8a84", bg: "#1b1b19", ink: "#f2f0eb", url: null };
  return (
    <div
      className="flex h-full w-full flex-col overflow-hidden rounded-xl border border-white/10 shadow-xl"
      style={{ background: m.bg, color: m.ink }}
      aria-hidden="true"
    >
      {/* Browser chrome */}
      <div className="flex items-center gap-1.5 border-b border-white/10 bg-black/25 px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-white/25" />
        <span className="h-2 w-2 rounded-full bg-white/25" />
        <span className="h-2 w-2 rounded-full bg-white/25" />
        {m.url && (
          <span className="mx-auto rounded-full bg-white/10 px-3 py-0.5 font-mono text-[9px] opacity-70">
            {m.url}
          </span>
        )}
      </div>
      {/* Page */}
      <div className="relative flex-1 p-[6%]">
        <div className="flex items-center justify-between">
          <span className="h-2 w-12 rounded-full" style={{ background: m.ink, opacity: 0.85 }} />
          <span className="flex gap-2">
            <span className="h-1.5 w-6 rounded-full" style={{ background: m.ink, opacity: 0.3 }} />
            <span className="h-1.5 w-6 rounded-full" style={{ background: m.ink, opacity: 0.3 }} />
            <span className="h-1.5 w-6 rounded-full" style={{ background: m.ink, opacity: 0.3 }} />
          </span>
        </div>
        <div className="mt-[7%] max-w-[55%]">
          <span className="block h-[14px] w-full rounded-sm" style={{ background: m.ink }} />
          <span className="mt-2 block h-[14px] w-[78%] rounded-sm" style={{ background: m.ink }} />
          <span className="mt-2 block h-[14px] w-[48%] rounded-sm" style={{ background: m.accent }} />
          <span className="mt-4 block h-1.5 w-[85%] rounded-full" style={{ background: m.ink, opacity: 0.3 }} />
          <span className="mt-1.5 block h-1.5 w-[65%] rounded-full" style={{ background: m.ink, opacity: 0.3 }} />
          <span className="mt-5 inline-block h-5 w-20 rounded-full" style={{ background: m.accent }} />
        </div>
        {/* Abstract hero shape */}
        <span
          className="absolute right-[6%] top-[18%] h-[52%] w-[34%] rounded-[40%_60%_55%_45%/50%_45%_55%_50%]"
          style={{
            background: `radial-gradient(circle at 30% 30%, ${m.accent}99, transparent 72%), ${m.accent}1f`,
            filter: "blur(6px)",
            opacity: 0.85,
          }}
        />
        <div className="absolute inset-x-[6%] bottom-[6%] grid grid-cols-3 gap-2">
          {[0, 1, 2].map((k) => (
            <span key={k} className="h-9 rounded-md border border-white/10" style={{ background: `${m.ink}12` }} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function WebBuilds() {
  const n = BUILDS.length;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(true); // safe default until measured
  const resume = useRef<ReturnType<typeof setTimeout> | null>(null);
  const current = BUILDS[active];
  const touchX = useRef<number | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const on = () => setReduced(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  const go = useCallback((d: number) => setActive((a) => (a + d + n) % n), [n]);

  useEffect(() => {
    if (reduced || paused) return;
    const id = setInterval(() => {
      if (!document.hidden) go(1);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [reduced, paused, go]);

  useEffect(() => () => { if (resume.current) clearTimeout(resume.current); }, []);

  // Touch: pause while touching, swipe to move, resume after a quiet spell.
  const onTouchStart = (e: React.TouchEvent) => {
    touchX.current = e.touches[0].clientX;
    setPaused(true);
    if (resume.current) clearTimeout(resume.current);
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current !== null) {
      const dx = e.changedTouches[0].clientX - touchX.current;
      if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
    }
    touchX.current = null;
    resume.current = setTimeout(() => setPaused(false), 4000);
  };

  return (
    <section
      id="web-builds"
      aria-labelledby="web-builds-heading"
      className="scroll-mt-24 border-t border-line md:scroll-mt-28"
    >
      <div className="page-x pt-16 lg:pt-24">
        <h2 id="web-builds-heading" className="text-2xl font-semibold tracking-tight">
          Web <span className="text-highlight">builds</span>
        </h2>
      </div>

      <div
        className="webbuilds mt-10 overflow-hidden pb-16 lg:pb-24"
        role="group"
        aria-roledescription="carousel"
        aria-label="Web builds"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") go(1);
          if (e.key === "ArrowLeft") go(-1);
        }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div className="wb-stage" aria-live="off">
          {BUILDS.map((b, i) => {
            let o = i - active;
            if (o > n / 2) o -= n;
            if (o < -n / 2) o += n;
            const isActive = o === 0;
            const host = b.mock?.url ?? b.href?.replace(/^https?:\/\//, "").replace(/\/$/, "");
            return (
              <div
                key={b.title}
                className="wb-card"
                data-active={isActive}
                data-hidden={Math.abs(o) > 2}
                style={{ ["--o" as string]: o, ["--a" as string]: Math.abs(o) }}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${n}: ${b.title}`}
                aria-hidden={Math.abs(o) > 2 ? true : undefined}
              >
                <button
                  type="button"
                  className="wb-hit"
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActive(i)}
                  aria-label={`${isActive ? "Current: " : "Show "}${b.title}${host ? `, ${host}` : ""}`}
                >
                  <Frame b={b} />
                </button>
              </div>
            );
          })}
        </div>

        <div className="page-x mt-8 flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="label">
              <span className="text-highlight">{String(active + 1).padStart(2, "0")}</span> /{" "}
              {String(n).padStart(2, "0")}
            </p>
            <p className="mt-2 font-display text-lg font-semibold tracking-tight">{current.title}</p>
            <p className="label mt-1">{current.tagline}</p>
            {current.href && (
              <a href={current.href} target="_blank" rel="noopener noreferrer" className="link mt-3 inline-flex items-center gap-1 text-sm">
                Visit site <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            )}
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <button type="button" className="icon-btn" aria-label="Previous build" onClick={() => go(-1)}>
              <ChevronLeft size={18} aria-hidden="true" />
            </button>
            <button type="button" className="icon-btn" aria-label="Next build" onClick={() => go(1)}>
              <ChevronRight size={18} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
