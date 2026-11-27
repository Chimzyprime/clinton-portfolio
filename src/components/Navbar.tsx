"use client";

import { ArrowUpRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";

/**
 * Centred floating pill navbar, sized to its content.
 *
 *  [ CHIMZY ]   [ Work  About  Services  Contact ]   [ theme | LET'S TALK ]
 *
 * Mobile: CHIMZY, theme toggle and a menu button; the menu opens a panel with
 * the same destinations and the CTA, and closes after a choice or on Escape.
 *
 * Layout-shift notes: the bar is position:fixed, so it takes no space in the
 * page flow. Its size never changes; scrolling only firms up the background.
 * The mobile panel is also fixed, so opening it pushes nothing down.
 */

// Order requested in the brief. Each id matches a <Section id="..."> on the page.
const links = [
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "contact", label: "Contact" },
] as const;

type SectionId = (typeof links)[number]["id"];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<SectionId | null>(null);
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  // 1. "Scrolled" state: a slightly more opaque bar once the page moves, so
  //    text stays readable over any section. Throttled with rAF.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 8);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  // 2. Active section: whichever section crosses the middle band of the
  //    viewport. Cheaper and steadier than measuring on every scroll.
  useEffect(() => {
    const sections = links
      .map((link) => document.getElementById(link.id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id as SectionId);
        }
      },
      // A thin band around the vertical middle of the screen.
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((section) => observer.observe(section));

    // Back at the hero: nothing is active. At the very bottom: Contact, even
    // when that last section is too short to reach the middle band.
    const onTop = () => {
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 4;
      if (atBottom) setActive("contact");
      else if (window.scrollY < window.innerHeight * 0.4) setActive(null);
    };
    window.addEventListener("scroll", onTop, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onTop);
    };
  }, []);

  // 3. Mobile menu: Escape closes it and returns focus to the button.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  // Close the menu if the screen grows past the mobile breakpoint.
  useEffect(() => {
    const query = window.matchMedia("(min-width: 768px)");
    const onChange = () => query.matches && setOpen(false);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  // iOS Safari only shows :active (tap) styles when the page has a touch
  // listener, so register an empty passive one.
  useEffect(() => {
    const noop = () => {};
    document.addEventListener("touchstart", noop, { passive: true });
    return () => document.removeEventListener("touchstart", noop);
  }, []);

  const close = () => setOpen(false);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-3 z-50 px-3 md:top-6">
      <div
        data-scrolled={scrolled || open ? "true" : "false"}
        className="nav-pill pointer-events-auto mx-auto flex h-[60px] w-full items-center justify-between rounded-full pl-5 pr-2 md:w-fit md:justify-start md:gap-8 md:pl-7 md:pr-2 lg:gap-12"
      >
        {/* GROUP 1: brand */}
        <Link
          href="/#main"
          aria-label="Chimzy, back to top"
          onClick={close}
          className="nav-item -ml-2.5 flex h-10 items-center rounded-full px-2.5 font-display text-[1.0625rem] font-bold tracking-[0.08em] text-fg"
        >
          CHIMZY
        </Link>

        {/* GROUP 2: links (tablet and up) */}
        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1 lg:gap-2">
            {links.map((link) => {
              const isActive = active === link.id;
              return (
                <li key={link.id}>
                  <a
                    href={`/#${link.id}`}
                    aria-current={isActive ? "location" : undefined}
                    className={`nav-item relative flex h-10 items-center rounded-full px-3.5 text-sm ${
                      isActive ? "text-fg" : "text-muted hover:text-fg"
                    }`}
                  >
                    {link.label}
                    {/* Active indicator: a small dot under the label. */}
                    <span
                      aria-hidden="true"
                      className={`absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-accent transition-opacity duration-300 ${
                        isActive ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* GROUP 3: actions */}
        <div className="flex items-center gap-1 md:gap-2">
          <ThemeToggle />
          <Link
            href="/#contact"
            className="btn btn-primary hidden h-11 px-5 md:inline-flex"
          >
            Let&rsquo;s Talk
            <ArrowUpRight aria-hidden="true" size={15} strokeWidth={2} className="btn-arrow" />
          </Link>
          <button
            ref={menuButton}
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
            className="icon-btn h-11 w-11 md:hidden"
          >
            {open ? (
              <X aria-hidden="true" size={20} strokeWidth={1.75} />
            ) : (
              <Menu aria-hidden="true" size={20} strokeWidth={1.75} />
            )}
          </button>
        </div>
      </div>

      {/* MOBILE PANEL. `hidden` removes it from tab order and screen readers
          when closed; it sits in fixed space, so opening it moves nothing. */}
      <div
        id="mobile-menu"
        hidden={!open}
        data-scrolled="true"
        className="nav-pill pointer-events-auto mx-auto mt-2 rounded-[1.75rem] p-3 md:hidden"
      >
        <nav aria-label="Mobile">
          <ul>
            {links.map((link, index) => (
              <li key={link.id} className={index > 0 ? "border-t border-line" : ""}>
                <a
                  href={`/#${link.id}`}
                  onClick={close}
                  aria-current={active === link.id ? "location" : undefined}
                  className="nav-item flex h-14 items-center justify-between rounded-2xl px-4 font-display text-2xl font-semibold tracking-tight text-fg"
                >
                  {link.label}
                  <span className="label" aria-hidden="true">
                    0{index + 1}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <Link href="/#contact" onClick={close} className="btn btn-primary mt-3 flex h-12 w-full">
          Let&rsquo;s Talk
          <ArrowUpRight aria-hidden="true" size={15} strokeWidth={2} className="btn-arrow" />
        </Link>
      </div>
    </header>
  );
}
