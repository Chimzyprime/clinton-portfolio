import { about } from "@/data/site";
import { Section } from "./Section";

export function About() {
  return (
    <Section id="about" index="05" title="About">
      <div className="max-w-2xl space-y-6 text-xl leading-relaxed">
        {about.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </Section>
  );
}
