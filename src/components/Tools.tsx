"use client";

import { MotionConfig, motion } from "framer-motion";
import { tools } from "@/data/site";
import { Section } from "./Section";
import { ToolIcon } from "./ToolIcon";
import { rise, stagger, viewport } from "./motion";

/**
 * Two categories on one shared tile grid, so the groups line up and read as a
 * system. Tiles are deliberately light: a hairline border, a small mark and a
 * name. Heavier than nothing, lighter than Services.
 */
export function Tools() {
  return (
    <Section id="tools" index="05" title="Tools & technologies">
      <MotionConfig reducedMotion="user">
        <motion.p
          variants={rise}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="max-w-xl text-lg text-muted"
        >
          The design software and web technologies I work with, grouped by discipline.
        </motion.p>

        <div className="mt-12 space-y-12 lg:mt-16">
          {tools.map((group) => (
            <div key={group.group} className="border-t border-line-strong pt-5">
              <h3 className="label">{group.group}</h3>
              <motion.ul
                variants={stagger(0.05)}
                initial="hidden"
                whileInView="show"
                viewport={viewport}
                className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5"
              >
                {group.items.map((t) => (
                  <motion.li
                    key={t.name}
                    variants={rise}
                    whileHover={{ y: -3 }}
                    transition={{ duration: 0.2 }}
                    className="tool-tile flex items-center gap-3 rounded-lg border border-line p-4"
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
      </MotionConfig>
    </Section>
  );
}
