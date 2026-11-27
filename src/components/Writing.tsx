import { book } from "@/data/site";
import { Section } from "./Section";

export function Writing() {
  // `href` is optional in the data; this keeps the component safe either way.
  const href = "href" in book ? (book as { href?: string }).href : undefined;

  return (
    <Section id="writing" index="04" title="Technical writing">
      <article className="border-t border-line-strong pt-5">
        <p className="label">Book · {book.published}</p>
        <h3 className="mt-3 text-[clamp(1.75rem,4vw,3rem)] font-semibold leading-tight tracking-tight">
          {book.title}
        </h3>
        <p className="mt-4 max-w-xl text-muted">{book.description}</p>
        {href && (
          <p className="mt-6">
            <a
              href={href}
              className="link"
              target="_blank"
              rel="noopener noreferrer"
            >
              View on Amazon
              <span className="sr-only"> (opens in a new tab)</span>
              <span aria-hidden="true"> ↗</span>
            </a>
          </p>
        )}
      </article>
    </Section>
  );
}
