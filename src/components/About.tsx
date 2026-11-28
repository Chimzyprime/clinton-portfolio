import Image from "next/image";
import { about, portrait } from "@/data/site";
import { ApproachTimeline } from "./ApproachTimeline";
import { Reveal } from "./Reveal";

/**
 * About: a centred heading, then two equal halves (portrait + identity on
 * the left, the introduction on the right), then "How I approach the work"
 * on a guide line. Copy lives
 * in data/site.ts; this file is layout and reveal only.
 */
export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="scroll-mt-24 border-t border-line md:scroll-mt-28"
    >
      <div className="page-x py-16 lg:py-24">
        <Reveal>
          <h2
            id="about-heading"
            className="text-center text-[clamp(1.75rem,3.6vw,3rem)] font-bold tracking-[-0.03em]"
          >
            About
          </h2>
        </Reveal>

        {/* Two equal halves */}
        <div className="about-halves mt-12 lg:mt-16">
          <div className="flex flex-col items-center text-center">
            <Reveal className="about-portrait">
              <Image
                src={portrait.src}
                alt={portrait.alt}
                fill
                sizes="(min-width: 1024px) 280px, 220px"
                className="object-cover"
              />
            </Reveal>
            <Reveal delay={120} className="mt-6">
              <p className="text-xl font-semibold tracking-tight">Nwachukwu Clinton Chimaroke</p>
              <p className="mt-1 text-text-secondary">{about.title}</p>
              <p className="label mt-2">{about.location}</p>
            </Reveal>
          </div>

          <div className="mx-auto max-w-[34em] text-center lg:text-left">
            <Reveal delay={80}>
              <h3 className="text-[clamp(1.5rem,2.8vw,2.25rem)] font-bold leading-[1.1] tracking-[-0.03em]">
                {about.heading}
              </h3>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-6 text-lg text-text-secondary">{about.intro}</p>
            </Reveal>
            <Reveal delay={240}>
              <p className="mt-4 text-lg text-text-secondary">{about.paragraph}</p>
            </Reveal>
          </div>
        </div>

        {/* How I approach the work */}
        <div className="mt-20 border-t border-line pt-14 [overflow-x:clip] lg:mt-28 lg:pt-20">
          <Reveal>
            <h3 className="text-center text-[clamp(1.25rem,2.2vw,1.75rem)] font-semibold tracking-tight">
              How I approach the work
            </h3>
          </Reveal>
          <div className="mt-12 lg:mt-16">
            <ApproachTimeline principles={about.principles} />
          </div>
        </div>
      </div>
    </section>
  );
}
