import { designs } from "@/data/site";
import { DesignArt } from "./DesignArt";

/**
 * The visual for each service. They are built from the site's own colour
 * tokens, so they follow the theme and never use stock imagery or invented
 * clients. The campaign mosaic renders real pieces from `designs` in
 * data/site.ts as soon as images are added there.
 */
export function ServiceVisual({ kind }: { kind: "brand" | "campaign" | "code" }) {
  return (
    <div className="service-visual" aria-hidden="true">
      {kind === "brand" && <BrandPreview />}
      {kind === "campaign" && <CampaignPreview />}
      {kind === "code" && <CodePreview />}
    </div>
  );
}

function BrandPreview() {
  return (
    <div className="grid h-full grid-cols-5 grid-rows-5 gap-2 p-3 sm:gap-3 sm:p-4">
      {/* Logo mark + wordmark */}
      <div className="col-span-3 row-span-3 flex flex-col items-center justify-center gap-3 rounded-lg bg-foreground text-background">
        <span className="grid h-12 w-12 place-items-center rounded-full border-2 border-current font-display text-xl font-bold">
          A
        </span>
        <span className="h-1.5 w-20 rounded-full bg-current opacity-70" />
        <span className="h-1 w-12 rounded-full bg-current opacity-40" />
      </div>
      {/* Type specimen */}
      <div className="col-span-2 row-span-3 flex flex-col justify-between rounded-lg border border-line-strong p-3">
        <span className="font-display text-4xl font-bold leading-none tracking-tight">Aa</span>
        <span className="space-y-1">
          <span className="block h-1 w-full rounded-full bg-subtle/60" />
          <span className="block h-1 w-4/5 rounded-full bg-subtle/60" />
          <span className="block h-1 w-3/5 rounded-full bg-subtle/60" />
        </span>
      </div>
      {/* Colour palette */}
      <div className="col-span-3 row-span-2 grid grid-cols-5 gap-2">
        <span className="rounded-md bg-foreground" />
        <span className="rounded-md bg-muted" />
        <span className="rounded-md bg-subtle" />
        <span className="rounded-md border border-line-strong bg-surface-elevated" />
        <span className="rounded-md" style={{ background: "var(--highlight)" }} />
      </div>
      {/* Business card */}
      <div className="col-span-2 row-span-2 flex flex-col justify-end gap-1 rounded-lg border border-line-strong bg-surface-elevated p-3">
        <span className="h-1.5 w-2/3 rounded-full bg-foreground/80" />
        <span className="h-1 w-1/2 rounded-full bg-subtle/70" />
      </div>
    </div>
  );
}

function CampaignPreview() {
  const [a, b, c, d] = designs;
  return (
    <div className="grid h-full grid-cols-3 grid-rows-2 gap-2 p-3 sm:gap-3 sm:p-4">
      <Tile className="row-span-2" piece={a} />
      <Tile className="col-span-2" piece={b} />
      <Tile piece={c} />
      <Tile piece={d} />
    </div>
  );
}

function Tile({ piece, className = "" }: { piece: (typeof designs)[number]; className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-lg border border-line ${className}`}>
      <DesignArt piece={piece} sizes="200px" label=" " />
    </div>
  );
}

function CodePreview() {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-1.5 border-b border-line px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-line-strong" />
        <span className="h-2 w-2 rounded-full bg-line-strong" />
        <span className="h-2 w-2 rounded-full bg-line-strong" />
        <span className="ml-3 font-mono text-[10px] text-subtle">page.tsx</span>
      </div>
      <div className="flex-1 space-y-1 p-4 font-mono text-[11px] leading-relaxed sm:text-xs">
        <p><span className="text-subtle">export default function</span> <span className="text-foreground">Page</span>() {"{"}</p>
        <p className="pl-4"><span className="text-subtle">return</span> (</p>
        <p className="pl-8"><span className="text-[var(--highlight)]">&lt;main&gt;</span></p>
        <p className="pl-12 text-muted">&lt;Hero /&gt;</p>
        <p className="pl-12 text-muted">&lt;Work /&gt;</p>
        <p className="pl-8"><span className="text-[var(--highlight)]">&lt;/main&gt;</span></p>
        <p className="pl-4">);</p>
        <p>{"}"}</p>
      </div>
      {/* A small page wireframe, as the rendered result */}
      <div className="mx-4 mb-4 rounded-md border border-line-strong bg-surface-elevated p-3">
        <span className="block h-1.5 w-1/3 rounded-full bg-foreground/80" />
        <span className="mt-2 block h-1 w-2/3 rounded-full bg-subtle/60" />
        <span className="mt-3 inline-block h-4 w-14 rounded-full bg-foreground" />
      </div>
    </div>
  );
}
