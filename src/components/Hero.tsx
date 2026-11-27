import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { CSSProperties } from "react";
import { portrait, site } from "@/data/site";

/** Stagger helper for the entrance animation (see .reveal in globals.css). */
const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

/**
 * Two-column editorial hero (about 1.1fr / 0.9fr on desktop).
 *
 *  Left, one shared left edge, in this order:
 *    name → headline (h1) → professional title → description → CTAs
 *  Right: the portrait cutout as a bust, sitting on the hero's bottom edge.
 *
 * Below 1024px the columns stack (text first, then portrait), because the
 * headline needs the width. The hero follows the site theme.
 *
 * Layout-shift notes: the portrait's crop box reserves its space with
 * aspect-ratio; the headline size is a CSS clamp() resolved before
 * paint; the entrance animation only touches opacity and transform.
 */
export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="relative overflow-hidden">
      {/* No bottom padding: the portrait sits on the hero's bottom edge, which
          meets the hairline at the top of the next section. */}
      <div className="page-x grid gap-14 pt-28 md:pt-36 lg:min-h-[100svh] lg:grid-cols-[1.1fr_0.9fr] lg:gap-12 lg:pt-[8.5rem] xl:gap-20">
        {/* LEFT: text column, vertically centred in the hero */}
        <div className="lg:self-center lg:pb-24">
          {/* A. Name: visible first, deliberately quieter than the headline. */}
          <p
            className="reveal text-[0.9375rem] font-medium tracking-[0.02em] text-fg"
            style={delay(0)}
          >
            {site.name}
          </p>

          {/* B. Headline: the strongest element on the page. max-w in em
              shapes it into three lines: "I build brands / and digital /
              experiences." without forcing breaks into the markup. */}
          <h1
            id="hero-heading"
            className="reveal mt-5 max-w-[7.4em] text-[clamp(2.5rem,5.6vw,5.5rem)] font-bold leading-[1.02] tracking-[-0.035em]"
            style={delay(80)}
          >
            {site.hero.headline}
          </h1>

          {/* C. Professional title */}
          <p
            className="reveal mt-7 font-display text-[clamp(1.125rem,1.5vw,1.375rem)] font-semibold tracking-[-0.01em] text-fg"
            style={delay(160)}
          >
            {site.hero.title}
          </p>

          {/* D. Supporting description */}
          <p
            className="reveal mt-4 max-w-[30rem] text-[0.9375rem] leading-[1.65] text-muted md:text-[1.0625rem]"
            style={delay(240)}
          >
            {site.hero.description}
          </p>

          {/* E. CTAs: same height, same baseline, primary first. */}
          <div className="reveal mt-10 flex flex-wrap gap-3 sm:gap-4" style={delay(320)}>
            <a href="#contact" className="btn btn-primary h-12 px-5 sm:px-6">
              Let&rsquo;s Talk
              <ArrowUpRight aria-hidden="true" size={15} strokeWidth={2} className="btn-arrow" />
            </a>
            <a href="#work" className="btn btn-secondary h-12 px-5 sm:px-6">
              View my work
              <ArrowUpRight aria-hidden="true" size={15} strokeWidth={2} className="btn-arrow" />
            </a>
          </div>
        </div>

        {/* RIGHT: portrait.
            Mobile/tablet: in the flow, under the text, on the hero's bottom edge.
            Desktop: anchored to the bottom-right of the hero and sized from the
            viewport (46vw, 50vw from 1280px), so the bust has real presence.
            It runs to the page edge (but stays inside the 1440px frame on
            wider screens) and always leaves a clear gap from the headline. */}
        <figure className="reveal-portrait portrait-light mx-auto w-full max-w-[24rem] self-end sm:max-w-[28rem] lg:absolute lg:bottom-0 lg:right-[max(0px,calc((100vw-1440px)/2))] lg:mx-0 lg:w-[46vw] lg:max-w-[820px] xl:w-[50vw]">
          <div className="portrait-crop">
            <Image
              src={portrait.src}
              alt={portrait.alt}
              width={portrait.width}
              height={portrait.height}
              // Above the fold: fetch first, at higher quality than the
              // default 75 so skin and hair detail stay crisp.
              priority
              quality={90}
              sizes="(min-width: 1280px) 50vw, (min-width: 1024px) 46vw, (min-width: 640px) 28rem, 90vw"
              className="block h-auto w-full"
            />
          </div>
        </figure>
      </div>
    </section>
  );
}
