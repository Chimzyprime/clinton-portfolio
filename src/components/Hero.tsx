import { site } from "@/data/site";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="page-x pb-16 pt-16 sm:pt-24 lg:pb-24 lg:pt-32"
    >
      <p className="label flex items-center gap-3">
        {/* Single accent mark: the only resting use of the accent colour. */}
        <span aria-hidden="true" className="inline-block h-2 w-2 bg-accent" />
        Portfolio · 2026
      </p>

      {/*
        The only h1 on the page. The size is a clamp() of the viewport width,
        which is resolved by CSS before paint, so it never jumps. max-w-[14ch]
        stacks the name on three lines for a strong typographic block.
      */}
      <h1
        id="hero-heading"
        className="mt-6 max-w-[14ch] text-balance text-[clamp(2.75rem,9vw,8rem)] font-semibold leading-[0.95] tracking-[-0.04em]"
      >
        {site.name}
      </h1>

      <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-12">
        <p className="max-w-xl text-lg leading-relaxed sm:text-xl lg:col-span-6">
          {site.intro}
        </p>

        <dl className="grid gap-6 sm:grid-cols-2 lg:col-span-6 lg:col-start-7">
          <div>
            <dt className="label">Based in</dt>
            <dd className="mt-2">{site.location}</dd>
          </div>
          <div>
            <dt className="label">Contact</dt>
            <dd className="mt-2">
              <a href={`mailto:${site.email}`} className="link">
                {site.email}
              </a>
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
