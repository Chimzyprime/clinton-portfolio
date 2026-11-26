import type { ReactNode } from "react";

interface SectionProps {
  /** Anchor id used by the navigation, e.g. "work" links to #work. */
  id: string;
  /** Short mono index shown in the left column, e.g. "01". */
  index: string;
  title: string;
  children: ReactNode;
}

/**
 * The one layout every content section shares: a hairline rule, a narrow left
 * column for the index and heading, and a wide right column for content.
 * Using a single wrapper keeps every section on exactly the same grid.
 */
export function Section({ id, index, title, children }: SectionProps) {
  const headingId = `${id}-heading`;

  return (
    <section
      id={id}
      // Names the region for screen-reader landmark navigation.
      aria-labelledby={headingId}
      // Offsets anchor jumps so the sticky header never covers the heading.
      className="scroll-mt-16 border-t border-line"
    >
      <div className="page-x grid gap-8 py-16 lg:grid-cols-12 lg:gap-12 lg:py-24">
        <div className="lg:col-span-3">
          <p className="label">{index}</p>
          <h2
            id={headingId}
            className="mt-3 text-2xl font-semibold tracking-tight"
          >
            {title}
          </h2>
        </div>
        <div className="lg:col-span-9">{children}</div>
      </div>
    </section>
  );
}
