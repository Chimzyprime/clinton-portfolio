"use client";

import { MotionConfig, motion } from "framer-motion";
import { tools } from "@/data/site";
import { ToolIcon } from "./ToolIcon";
import { rise, stagger, viewport } from "./motion";

/**
 * Centred like About: heading and intro on the centre line, then the two
 * kits (design, development) one under the other, tiles centred in each.
 */
export function Tools() {
  return (
    <section id="tools" aria-labelledby="tools-heading" className="scroll-mt-24 border-t border-line md:scroll-mt-28">
      <MotionConfig reducedMotion="user">
        <div className="page-x py-16 lg:py-24">
          <motion.div variants={rise} initial="hidden" whileInView="show" viewport={viewport} className="text-center">
            <h2 id="tools-heading" className="text-[clamp(1.75rem,3.6vw,3rem)] font-bold tracking-[-0.03em]">
              Tools &amp; technologies
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-muted">
              The design software and web technologies I work with, grouped by discipline.
            </p>
          </motion.div>

          <div className="mx-auto mt-12 max-w-4xl space-y-12 lg:mt-16">
            {tools.map((group) => (
              <div key={group.group} className="border-t border-line pt-6 text-center">
                <h3 className="label">{group.group}</h3>
                <motion.ul
                  variants={stagger(0.05)}
                  initial="hidden"
                  whileInView="show"
                  viewport={viewport}
                  className="mt-6 flex flex-wrap justify-center gap-3"
                >
                  {group.items.map((t) => (
                    <motion.li
                      key={t.name}
                      variants={rise}
                      whileHover={{ y: -3 }}
                      transition={{ duration: 0.2 }}
                      className="tool-tile flex w-[calc(50%-0.375rem)] items-center gap-3 rounded-lg border border-line p-4 text-left sm:w-[calc(33.333%-0.5rem)] lg:w-[calc(20%-0.6rem)]"
                    >
                      <span className="shrink-0 text-fg">
                        <ToolIcon name={t.icon} size={22} />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-sm font-medium leading-tight">{t.name}</span>
                        <span className="mt-1 block text-xs leading-snug text-subtle">{t.kind}</span>
                      </span>
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            ))}
          </div>
        </div>
      </MotionConfig>
    </section>
  );
}
