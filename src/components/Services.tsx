import { Check } from "lucide-react";
import { services } from "@/data/site";
import { Reveal } from "./Reveal";
import { Section } from "./Section";
import { ServiceVisual } from "./ServiceVisual";

/** What I offer. Tools are deliberately kept out of here: see Tools.tsx. */
export function Services() {
  return (
    <Section id="services" index="03" title="Services">
      <ul>
        {services.map((s, i) => (
          <Reveal as="li" key={s.n} delay={60} className={`service-row ${i === 0 ? "border-t border-line-strong" : ""}`}>
            <div className="grid gap-8 py-10 md:grid-cols-12 md:gap-10 lg:py-14">
              <div className="md:col-span-7">
                <p className="font-mono text-sm text-subtle">{s.n}</p>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight lg:text-3xl">{s.title}</h3>
                <p className="mt-4 max-w-[34em] text-muted">{s.description}</p>
                <ul className="mt-6 grid gap-x-6 gap-y-2 sm:grid-cols-2">
                  {s.capabilities.map((c) => (
                    <li key={c} className="flex items-start gap-2 text-sm text-muted">
                      <Check size={14} strokeWidth={2} aria-hidden="true" className="mt-0.5 shrink-0 text-subtle" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="md:col-span-5">
                <ServiceVisual kind={s.visual} />
              </div>
            </div>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
