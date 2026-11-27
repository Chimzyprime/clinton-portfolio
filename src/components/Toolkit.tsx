import { toolkit } from "@/data/site";
import { Section } from "./Section";

export function Toolkit() {
  return (
    <Section id="toolkit" index="05" title="Toolkit">
      <div className="grid gap-10 sm:grid-cols-3">
        {toolkit.map((group) => (
          <div key={group.group}>
            <h3 className="label">{group.group}</h3>
            <ul className="mt-4 space-y-2">
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
