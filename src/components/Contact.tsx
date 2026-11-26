import { site } from "@/data/site";
import { Section } from "./Section";

export function Contact() {
  return (
    <Section id="contact" index="06" title="Contact">
      {/*
        Email is the primary action, so it is the largest thing in the section.
        overflow-wrap lets the address break on very narrow screens instead of
        forcing a horizontal scrollbar.
      */}
      <a
        href={`mailto:${site.email}`}
        className="link block text-[clamp(1.5rem,5vw,4rem)] font-semibold leading-tight tracking-tight [overflow-wrap:anywhere]"
      >
        {site.email}
      </a>

      <ul className="mt-12 grid gap-6 sm:grid-cols-3">
        {site.socials.map((social) => (
          <li key={social.label}>
            <p className="label">{social.label}</p>
            <a
              href={social.href}
              className="link mt-2 inline-block"
              target="_blank"
              rel="noopener noreferrer"
            >
              {social.handle}
              <span className="sr-only"> on {social.label} (opens in a new tab)</span>
              <span aria-hidden="true"> ↗</span>
            </a>
          </li>
        ))}
      </ul>
    </Section>
  );
}
