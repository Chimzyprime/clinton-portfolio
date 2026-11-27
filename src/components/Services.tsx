import { services } from "@/data/site";
import { Section } from "./Section";

export function Services() {
  return (
    <Section id="services" index="02" title="Services">
      <ul className="grid gap-x-12 gap-y-12 sm:grid-cols-2">
        {services.map((service) => (
          <li key={service.title} className="border-t border-line-strong pt-5">
            <h3 className="text-xl font-semibold tracking-tight">
              {service.title}
            </h3>
            <p className="mt-3 max-w-md text-muted">{service.description}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
