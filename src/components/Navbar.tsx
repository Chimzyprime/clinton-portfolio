"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Floating, centred, pill-shaped navbar.
 *
 *  Left:   CHIMZY® wordmark (back to top)
 *  Centre: Work, About, Services, Contact, with an active-section indicator
 *  Right:  "Let's Talk" call to action (to #contact)
 *  Mobile: wordmark + menu button, opening a glass panel with the same links
 *
 * Layout-shift notes: the bar is position:fixed, so it takes no space in the
 * page flow and nothing below it moves. Its height never changes; scrolling
 * only changes background opacity. The mobile panel is also fixed, so opening
 * it pushes nothing down.
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

  const close = () => setOpen(false);

  return (
    // data-theme="dark": the bar always uses the dark tokens, on any theme.
    <header
      data-theme="dark"
      className="pointer-events-none fixed inset-x-0 top-3 z-50 px-3 md:top-5 lg:top-6"
    >
      <div
        data-scrolled={scrolled || open ? "true" : "false"}
        className="nav-pill pointer-events-auto mx-auto flex h-14 max-w-[1050px] items-center justify-between rounded-full pl-5 pr-2 md:h-16 md:pl-7 md:pr-2.5 lg:h-[76px] lg:pl-8 lg:pr-3"
      >
        {/* LEFT: wordmark */}
        <a
          href="#main"
          aria-label="Chimzy, back to top"
          onClick={close}
          className="nav-focus rounded-full font-display text-[1.0625rem] font-bold tracking-[0.06em] text-fg lg:text-lg"
        >
          CHIMZY
          <sup className="ml-0.5 align-super text-[0.55em] font-semibold text-accent">
            ®
          </sup>
        </a>

        {/* CENTRE: links (tablet and up) */}
        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1 lg:gap-3">
            {links.map((link) => {
              const isActive = active === link.id;
              return (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    aria-current={isActive ? "location" : undefined}
                    className={`nav-link nav-focus relative flex h-11 items-center rounded-full px-4 text-[0.9375rem] transition-colors duration-200 ${
                      isActive ? "text-fg" : "text-muted hover:text-fg"
                    }`}
                  >
                    {link.label}
                    {/* Active indicator: a small gold dot under the label. */}
                    <span
                      aria-hidden="true"
                      className={`absolute bottom-1.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-accent transition-opacity duration-300 ${
                        isActive ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* RIGHT: CTA (tablet and up) */}
        <a
          href="#contact"
          className="nav-cta nav-focus hidden h-11 items-center gap-2 rounded-full px-5 text-[0.9375rem] font-medium text-fg md:inline-flex lg:h-12 lg:px-6"
        >
          Let&rsquo;s Talk
          <span aria-hidden="true" className="nav-cta-arrow text-accent">
            ↗
          </span>
        </a>

        {/* MOBILE: menu button */}
        <button
          ref={menuButton}
          type="button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
          className="nav-focus flex h-11 w-11 items-center justify-center rounded-full text-fg md:hidden"
        >
          {/* Two lines that turn into an X. Pure CSS, no icon library. */}
          <span aria-hidden="true" className="relative block h-3 w-5">
            <span
              className={`absolute left-0 h-px w-5 bg-current transition-transform duration-300 ${
                open ? "top-1.5 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 h-px w-5 bg-current transition-transform duration-300 ${
                open ? "top-1.5 -rotate-45" : "top-3"
              }`}
            />
          </span>
        </button>
      </div>

      {/* MOBILE PANEL. `hidden` removes it from tab order and screen readers
          when closed; it sits in fixed space, so opening it moves nothing. */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="nav-pill nav-panel pointer-events-auto mx-auto mt-2 max-w-[1050px] rounded-[1.75rem] p-3 md:hidden"
        data-scrolled="true"
      >
        <nav aria-label="Mobile">
          <ul>
            {links.map((link, index) => (
              <li key={link.id} className={index > 0 ? "border-t border-line" : ""}>
                <a
                  href={`#${link.id}`}
                  onClick={close}
                  aria-current={active === link.id ? "location" : undefined}
                  className="nav-focus flex h-14 items-center justify-between rounded-2xl px-4 font-display text-2xl font-semibold tracking-tight text-fg"
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
        <a
          href="#contact"
          onClick={close}
          className="nav-cta nav-focus mt-3 flex h-12 items-center justify-center gap-2 rounded-full text-base font-medium text-fg"
        >
          Let&rsquo;s Talk
          <span aria-hidden="true" className="text-accent">
            ↗
          </span>
        </a>
      </div>
    </header>
  );
}
