import Image from "next/image";
import { portrait, site, work } from "@/data/site";

/**
 * Split-screen editorial hero, always dark (data-theme="dark" scopes the dark
 * colour tokens to this section only) so the cinematic lighting reads.
 *  Left:  label, name as the only h1, intro, two links.
 *  Right: transparent portrait cutout emerging from the bottom edge, lit from
 *         behind by CSS gradients (blue left, red right).
 *  Below: slow strip of selected project names.
 *
 * Layout-shift notes: the portrait box reserves its space from the image's
 * real width and height; the strip has a fixed height and only animates
 * transform. Nothing in this section moves after first paint.
 */
export function Hero() {
  const projects = work.map((item) => item.title);

  return (
    <section
      aria-labelledby="hero-heading"
      data-theme="dark"
      className="relative overflow-hidden bg-bg text-fg"
    >
      {/* Very faint overall falloff so the lighting has a room to sit in. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_75%_55%,rgb(40_50_80/0.25),transparent_70%)]"
      />

      <div className="page-x relative grid gap-4 pt-28 md:pt-32 lg:min-h-[calc(100svh-3.5rem)] lg:grid-cols-12 lg:gap-12 lg:pt-[7.5rem]">
        {/* LEFT: text block, with generous negative space */}
        <div className="pb-4 lg:col-span-6 lg:self-center lg:py-24">
          <p className="label flex items-center gap-3">
            {/* Single accent mark: the only resting use of the gold. */}
            <span aria-hidden="true" className="inline-block h-2 w-2 bg-accent" />
            Portfolio · 2026
          </p>

          {/* The only h1. clamp() is resolved by CSS before paint, so no jump. */}
          <h1
            id="hero-heading"
            className="mt-6 max-w-[14ch] text-balance text-[clamp(2.75rem,6.5vw,6.5rem)] font-bold leading-[0.95] tracking-[-0.04em]"
          >
            {site.name}
          </h1>

          <p className="mt-8 max-w-[34ch] text-lg leading-relaxed text-muted sm:text-xl">
            {site.intro}
          </p>

          <div className="mt-12 flex flex-wrap gap-x-8 gap-y-4 lg:mt-20">
            <a href="#work" className="link text-lg font-medium">
              View work
            </a>
            <a href="#contact" className="link text-lg font-medium">
              Contact
            </a>
          </div>
        </div>

        {/* RIGHT: portrait, anchored to the bottom so the figure rises out of it */}
        <figure className="relative mx-auto w-full max-w-[26rem] self-end sm:max-w-[30rem] lg:col-span-6 lg:max-w-[38rem]">
          <div className="portrait-light">
            <div aria-hidden="true" className="portrait-core" />
            <Image
              src={portrait.src}
              alt={portrait.alt}
              width={portrait.width}
              height={portrait.height}
              // Above the fold: fetch first.
              priority
              sizes="(min-width: 1024px) 38rem, (min-width: 640px) 30rem, 90vw"
              className="portrait-img relative block h-auto w-full"
            />
          </div>
        </figure>
      </div>

      {/*
        PROJECT STRIP. Decorative motion, so it is hidden from screen readers;
        the same projects are a real list in the Work section below.
      */}
      <div
        aria-hidden="true"
        className="strip relative h-14 overflow-hidden border-y border-line bg-bg"
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
