import Image from "next/image";
import { portrait, site, work } from "@/data/site";

/**
 * Split-screen editorial hero.
 *  Left  (7 of 12 columns): label, name as the only h1, intro, two links.
 *  Right (5 of 12 columns): 4:5 portrait frame.
 *  Below (full width):      slow strip of selected project names.
 *
 * Layout-shift notes: the portrait frame reserves its space with aspect-ratio
 * whether or not the photo exists, and the strip has a fixed height and only
 * animates transform. Nothing on this section can move after first paint.
 */
export function Hero() {
  const projects = work.map((item) => item.title);

  return (
    <section aria-labelledby="hero-heading" className="border-b border-line">
      <div className="page-x grid gap-12 pb-16 pt-12 sm:pt-16 lg:min-h-[calc(100svh-3.5rem-3.5rem)] lg:grid-cols-12 lg:items-end lg:gap-12 lg:pb-20 lg:pt-20">
        {/* LEFT: text block */}
        <div className="lg:col-span-7">
          <p className="label flex items-center gap-3">
            {/* Single accent mark: the only resting use of the gold. */}
            <span aria-hidden="true" className="inline-block h-2 w-2 bg-accent" />
            Portfolio · 2026
          </p>

          {/* The only h1. clamp() is resolved by CSS before paint, so no jump. */}
          <h1
            id="hero-heading"
            className="mt-6 max-w-[14ch] text-balance text-[clamp(2.75rem,7.5vw,7rem)] font-bold leading-[0.95] tracking-[-0.04em]"
          >
            {site.name}
          </h1>

          <p className="mt-8 max-w-[34ch] text-lg leading-relaxed text-muted sm:text-xl">
            {site.intro}
          </p>

          <div className="mt-12 flex flex-wrap gap-x-8 gap-y-4 lg:mt-24">
            <a href="#work" className="link text-lg font-medium">
              View work
            </a>
            <a href="#contact" className="link text-lg font-medium">
              Contact
            </a>
          </div>
        </div>

        {/* RIGHT: portrait frame */}
        <figure className="lg:col-span-5">
          <div className="relative aspect-[4/5] w-full overflow-hidden border border-line bg-line">
            {portrait ? (
              <Image
                src={portrait.src}
                alt={portrait.alt}
                width={portrait.width}
                height={portrait.height}
                // Above the fold: load first, and tell the browser its size.
                priority
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="h-full w-full object-cover grayscale"
              />
            ) : (
              // Placeholder until the photo is added. Same box, same size.
              <div className="flex h-full w-full items-end p-5">
                <span className="label">Portrait</span>
              </div>
            )}
          </div>
          <figcaption className="label mt-3">Umudike, Nigeria</figcaption>
        </figure>
      </div>

      {/*
        PROJECT STRIP. Decorative motion, so it is hidden from screen readers;
        the same projects are a real list in the Work section below.
      */}
      <div
        aria-hidden="true"
        className="strip h-14 overflow-hidden border-t border-line"
      >
        <div className="strip-track flex h-full w-max items-center">
          {[0, 1].map((copy) => (
            <ul
              key={copy}
              className={`flex shrink-0 items-center ${copy === 1 ? "strip-copy" : ""}`}
            >
              {projects.map((name) => (
                <li
                  key={name}
                  className="label flex items-center whitespace-nowrap !text-fg"
                >
                  <span className="px-6">{name}</span>
                  <span className="text-accent">/</span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
