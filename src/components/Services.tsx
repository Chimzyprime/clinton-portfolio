"use client";

import { MotionConfig, motion } from "framer-motion";
import { services } from "@/data/site";
import { rise, stagger, viewport } from "./motion";

/**
 * Centred like About. Each service is one card (number, title, description,
 * capabilities) that scales up slightly on hover. Tool names live in
 * Tools.tsx, not here.
 */
export function Services() {
  return (
    <section id="services" aria-labelledby="services-heading" className="scroll-mt-24 border-t border-line md:scroll-mt-28">
      <MotionConfig reducedMotion="user">
        <div className="page-x py-16 lg:py-24">
          <motion.div variants={rise} initial="hidden" whileInView="show" viewport={viewport} className="text-center">
            <h2 id="services-heading" className="text-[clamp(1.75rem,3.6vw,3rem)] font-bold tracking-[-0.03em]">
              Services
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-muted">
              Brand identity, campaign graphics and full-stack development: designed and built
              by one person, from first idea to finished site.
            </p>
          </motion.div>

          <motion.ul
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            className="mt-12 grid gap-4 lg:mt-16 lg:grid-cols-3 lg:gap-6"
          >
            {services.map((s) => (
              <motion.li key={s.n} variants={rise}>
                <article className="capability-card flex h-full flex-col rounded-2xl border border-line bg-surface p-6 sm:p-8">
                  <p className="font-mono text-sm text-subtle">{s.n}</p>
                  <h3 className="mt-4 text-2xl font-semibold tracking-tight">{s.title}</h3>
                  <p className="mt-4 text-muted">{s.description}</p>
                  <div className="mt-8 border-t border-line pt-6">
                    <p className="label">Capabilities</p>
                    <ul className="mt-4 space-y-2 text-sm text-muted">
                      {s.capabilities.map((c) => (
                        <li key={c}>{c}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </MotionConfig>
    </section>
  );
}
