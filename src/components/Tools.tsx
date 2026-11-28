import { tools } from "@/data/site";
import { Reveal } from "./Reveal";
import { Section } from "./Section";
import { ToolIcon } from "./ToolIcon";

/**
 * Tools & technologies: one section, two groups with their own look.
 * Brand & graphic design: three large tiles on a soft panel.
 * Full-stack development: a ruled grid of compact, technical cells.
 */
export function Tools() {
  const [design, dev] = tools;
  return (
    <Section id="tools" index="05" title="Tools & technologies">
      <div className="space-y-14">
        <Reveal>
          <h3 className="label">{design.group}</h3>
          <p className="mt-2 max-w-md text-muted">{design.blurb}</p>
          <ul className="mt-6 grid gap-3 rounded-2xl bg-surface p-3 sm:grid-cols-3">
            {design.items.map((t) => (
              <li key={t.name} className="tool-tile flex items-center gap-4 rounded-xl border border-line bg-surface-elevated p-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-line-strong text-fg">
                  <ToolIcon name={t.icon} size={22} />
                </span>
                <span>
                  <span className="block font-semibold tracking-tight">{t.name}</span>
                  <span className="label mt-0.5 block normal-case tracking-normal">{t.kind}</span>
                </span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={80}>
          <h3 className="label">{dev.group}</h3>
          <p className="mt-2 max-w-md text-muted">{dev.blurb}</p>
          <ul className="mt-6 grid grid-cols-2 border-l border-t border-line-strong sm:grid-cols-3 lg:grid-cols-5">
            {dev.items.map((t) => (
              <li key={t.name} className="tool-cell border-b border-r border-line-strong p-4">
                <span className="text-fg">
                  <ToolIcon name={t.icon} size={24} />
                </span>
                <span className="mt-4 block font-semibold tracking-tight">{t.name}</span>
                <span className="mt-1 block font-mono text-[11px] leading-snug text-subtle">{t.kind}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
