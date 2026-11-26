import Image from "next/image";
import { work } from "@/data/site";
import { Section } from "./Section";

export function Work() {
  return (
    <Section id="work" index="01" title="Selected work">
      {/* An ordered list: the order is meaningful and screen readers announce the count. */}
      <ol className="border-t border-line">
        {work.map((item, i) => (
          <li key={item.title} className="border-b border-line">
            <article className="grid gap-x-8 gap-y-3 py-6 md:grid-cols-12">
              {/* 1 + 4 + 3 + 4 columns = a full 12-column row on desktop. */}
              <p className="label md:col-span-1 md:pt-1.5">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="text-xl font-medium tracking-tight md:col-span-4">
                {item.title}
              </h3>
              <p className="label md:col-span-3 md:pt-1.5">
                {item.discipline}
                {item.year ? ` · ${item.year}` : ""}
              </p>
              <p className="text-muted md:col-span-4">{item.summary}</p>

              {/*
                Image slot. Rendered only when an image is set in data/site.ts.
                width/height are required there, so the browser reserves the
                exact aspect ratio before the file loads: zero layout shift.
              */}
              {item.image && (
                <div className="md:col-span-8 md:col-start-5">
                  <Image
                    src={item.image.src}
                    alt={item.image.alt}
                    width={item.image.width}
                    height={item.image.height}
                    sizes="(min-width: 1024px) 55vw, 100vw"
                    className="h-auto w-full"
                  />
                </div>
              )}

              {item.href && (
                <p className="md:col-span-8 md:col-start-5">
                  <a
                    href={item.href}
                    className="link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View project
                    <span className="sr-only"> {item.title} (opens in a new tab)</span>
                    <span aria-hidden="true"> ↗</span>
                  </a>
                </p>
              )}
            </article>
          </li>
        ))}
      </ol>
    </Section>
  );
}
