/**
 * Shared Framer Motion variants so Services, Tools and Contact move the same
 * way: a short fade-rise, staggered by the parent. Components wrap their tree
 * in <MotionConfig reducedMotion="user">, which removes the movement (keeping
 * a plain fade) for people who ask for reduced motion.
 */
import type { Variants } from "framer-motion";

export const ease = [0.2, 0.7, 0.2, 1] as const;

export const stagger = (gap = 0.08, delay = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: gap, delayChildren: delay } },
});

export const rise: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

export const viewport = { once: true, margin: "0px 0px -12% 0px" } as const;
