"use client";

import { MotionConfig, motion } from "framer-motion";
import { services } from "@/data/site";
import { Section } from "./Section";
import { rise, stagger, viewport } from "./motion";

/**
 * Editorial service rows: number | title + description | capabilities,
 * separated by hairlines. No icons or card backgrounds; hierarchy comes from
 * type scale, weight and space. Tool names live in Tools.tsx, not here.
 */
export function Services() {
  return (
    <Section id="services" index="03" title="Services">
      <MotionConfig reducedMotion="user">
        <motion.p
          variants={rise}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="max-w-xl text-lg text-muted"
        >
          Brand identity, campaign graphics and full-stack development: designed and built
          by one person, from first idea to finished site.
        </motion.p>

        <motion.ul
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="mt-12 border-t border-line-strong lg:mt-16"
        >
          {services.map((s) => (
            <motion.li
              key={s.n}
              variants={rise}
              className="service-row grid gap-x-8 gap-y-6 border-b border-line-strong py-10 md:grid-cols-12 lg:py-14"
            >
              <p className="service-num font-mono text-sm text-subtle md:col-span-1 md:pt-2">
                {s.n}
              </p>

              <div className="service-main md:col-span-6">
                <h3 className="text-2xl font-semibold tracking-tight lg:text-3xl">{s.title}</h3>
                <p className="mt-4 max-w-[34em] text-muted">{s.description}</p>
              </div>

              <div className="md:col-span-5 lg:pl-6">
                <p className="label">Capabilities</p>
                <ul className="mt-4 space-y-2 text-sm text-muted">
                  {s.capabilities.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </MotionConfig>
    </Section>
  );
}
