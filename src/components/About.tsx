import Image from "next/image";
import { about, portrait } from "@/data/site";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

/**
 * About: a two-column editorial layout — portrait and identity on the
 * left, the introduction on the right — then two sub-sections below
 * ("How I approach the work", "What I work across"). Content and copy
 * live in data/site.ts; this file is layout and the scroll reveal only.
 */
export function About() {
  return (
    <Section id="about" index="02" title="About">
      <div className="about-grid">
        {/* Left column: portrait, name, title, location */}
        <div>
          <Reveal className="about-portrait">
            <Image
              src={portrait.src}
              alt={portrait.alt}
              fill
              sizes="(min-width: 1024px) 34vw, 92vw"
              className="object-cover"
            />
          </Reveal>
          <Reveal delay={120} className="mt-6">
            <p className="text-xl font-semibold tracking-tight">Nwachukwu Clinton Chimaroke</p>
            <p className="mt-1 text-text-secondary">{about.title}</p>
            <p className="label mt-2">{about.location}</p>
          </Reveal>
        </div>

        {/* Right column: introduction */}
        <div>
          <Reveal as="span" className="label block">
            About
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-4 max-w-[11em] text-[clamp(1.75rem,3.6vw,3rem)] font-bold leading-[1.08] tracking-[-0.03em]">
              {about.heading}
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-6 max-w-[38em] text-lg text-text-secondary">{about.intro}</p>
          </Reveal>
          <Reveal delay={240}>
            <p className="mt-4 max-w-[38em] text-lg text-text-secondary">{about.paragraph}</p>
          </Reveal>
        </div>
      </div>

      {/* How I approach the work */}
      <div className="mt-20 border-t border-line pt-14 lg:mt-28 lg:pt-20">
        <Reveal as="span" className="label block">
          How I approach the work
        </Reveal>
        <ul className="mt-8 grid gap-x-10 gap-y-10 sm:grid-cols-2">
          {about.principles.map((p, i) => (
            <Reveal key={p.n} as="li" delay={80 + i * 90} className="max-w-[28em]">
              <p className="font-mono text-sm text-text-muted">{p.n}</p>
              <p className="mt-2 text-lg font-semibold tracking-tight">{p.title}</p>
              <p className="mt-2 text-text-secondary">{p.body}</p>
            </Reveal>
          ))}
        </ul>
      </div>

      {/* What I work across */}
      <div className="mt-20 border-t border-line pt-14 lg:mt-24 lg:pt-20">
        <Reveal as="span" className="label block">
          What I work across
        </Reveal>
        <div className="mt-8 grid gap-10 sm:grid-cols-2">
          {about.capabilities.map((group, gi) => (
            <Reveal key={group.heading} delay={80 + gi * 100}>
              <p className="text-lg font-semibold tracking-tight">{group.heading}</p>
              <ul className="mt-4">
                {group.items.map((item) => (
                  <li key={item} className="about-fact text-text-secondary">
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
