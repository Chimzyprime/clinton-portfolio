"use client";

import { ArrowUpRight, Mail } from "lucide-react";
import { MotionConfig, motion } from "framer-motion";
import { site } from "@/data/site";
import { brandIcons } from "@/data/brandIcons";
import { rise, stagger, viewport } from "./motion";

/** LinkedIn has no mark in the open icon sets, so this is drawn in Lucide's line style. */
function LinkedInIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function Brand({ name }: { name: "github" | "x" | "pinterest" }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d={brandIcons[name]} />
    </svg>
  );
}

const href = (label: string) => site.socials.find((s) => s.label === label)?.href ?? "#";

const icons = [
  { label: "Email", href: `mailto:${site.email}`, icon: <Mail size={20} strokeWidth={1.75} aria-hidden="true" />, external: false },
  { label: "LinkedIn", href: href("LinkedIn"), icon: <LinkedInIcon />, external: true },
  { label: "GitHub", href: href("GitHub"), icon: <Brand name="github" />, external: true },
  { label: "X", href: href("X"), icon: <Brand name="x" />, external: true },
  { label: "Pinterest", href: href("Pinterest"), icon: <Brand name="pinterest" />, external: true },
];

/**
 * Typography-led close. The headline is the focal point; one clear email
 * action; icon-only social links (names are in aria-labels, not on screen).
 */
export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="scroll-mt-24 border-t border-line md:scroll-mt-28">
      <MotionConfig reducedMotion="user">
        <motion.div
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="page-x py-24 lg:py-40"
        >
          <motion.h2
            id="contact-heading"
            variants={rise}
            className="font-display text-[clamp(2.75rem,9vw,8rem)] font-semibold leading-[0.95] tracking-tight"
          >
            Let&rsquo;s connect.
          </motion.h2>

          <motion.p variants={rise} className="mt-8 max-w-xl text-lg text-muted lg:mt-10">
            Have a project in mind, a collaboration opportunity, or simply want to talk? I&rsquo;d love to hear from you.
          </motion.p>

          <motion.div variants={rise} className="mt-10 lg:mt-12">
            <motion.a
              href={`mailto:${site.email}`}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="btn btn-primary min-h-12 px-7 py-3.5"
            >
              Send me an email
              <ArrowUpRight size={16} aria-hidden="true" />
            </motion.a>
          </motion.div>

          <motion.ul variants={stagger(0.07, 0.1)} className="mt-14 flex flex-wrap gap-3 lg:mt-20">
            {icons.map((i) => (
              <motion.li key={i.label} variants={rise}>
                <motion.a
                  href={i.href}
                  aria-label={i.external ? `${i.label} (opens in a new tab)` : i.label}
                  {...(i.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.94 }}
                  className="icon-btn h-12 w-12 border border-line-strong"
                >
                  {i.icon}
                </motion.a>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </MotionConfig>
    </section>
  );
}
