"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { brandSystems, designs, type DesignPiece } from "@/data/site";
import { DesignArt } from "./DesignArt";
import { DesignDialog } from "./DesignDialog";

/**
 * Home-page design work. 1) Brand systems: big cards, each opens a case
 * study. 2) A slow, hover-pausing strip of single pieces; a tap opens the
 * piece large, "View all" opens the filterable gallery.
 */
export function DesignWork() {
  const [open, setOpen] = useState<DesignPiece | null>(null);
  const loop = [...designs, ...designs];

  return (
    <section id="design-work" aria-labelledby="design-work-heading" className="scroll-mt-24 border-t border-line md:scroll-mt-28">
      <div className="page-x pt-16 lg:pt-24">
        <h2 id="design-work-heading" className="text-2xl font-semibold tracking-tight">
          Design <span className="text-highlight">work</span>
        </h2>

        <p className="label mt-10">Brand systems</p>
        <ul className="mt-4 grid gap-4 sm:grid-cols-2">
          {brandSystems.map((b, i) => (
            <li key={b.slug}>
              <Link href={`/work/${b.slug}`} className="brand-card group block rounded-2xl border border-line bg-surface p-5 sm:p-6">
                <div className="relative aspect-[16/10] overflow-hidden rounded-xl">
                  <DesignArt
                    piece={{ title: b.title, category: "Web3", image: b.image }}
                    sizes="(min-width: 640px) 45vw, 92vw"
                    label="Brand identity"
                  />
                  <span className="absolute left-4 top-4 font-mono text-[10px] uppercase tracking-widest text-white/60">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="mt-5 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold tracking-tight">{b.title}</h3>
                    <p className="label mt-1">Brand identity{b.year ? ` · ${b.year}` : ""}</p>
                  </div>
                  <ArrowUpRight size={20} aria-hidden="true" className="mt-1 shrink-0 text-muted transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-highlight" />
                </div>
                <p className="mt-3 text-muted">{b.summary}</p>
                <p className="link mt-4 inline-block text-sm">View case study</p>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-16 flex items-end justify-between gap-4">
          <p className="label">Flyers, social and more</p>
          <Link href="/designs" className="link inline-flex items-center gap-1 text-sm">
            View all <ArrowUpRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </div>

      <div className="marquee mt-6 pb-16 lg:pb-24">
        <ul className="marquee-track">
          {loop.map((d, i) => {
            const dup = i >= designs.length;
            return (
              <li key={i} aria-hidden={dup || undefined} className="marquee-item">
                <button type="button" tabIndex={dup ? -1 : 0} onClick={() => setOpen(d)} className="marquee-tile" aria-label={`Open ${d.title}, ${d.category}`}>
                  <DesignArt piece={d} sizes="260px" />
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <DesignDialog piece={open} onClose={() => setOpen(null)} />
    </section>
  );
}
