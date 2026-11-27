"use client";

import { useState } from "react";
import { designCategories, designs, type DesignPiece } from "@/data/site";
import { DesignArt } from "./DesignArt";
import { DesignDialog } from "./DesignDialog";

export function DesignGallery() {
  const [cat, setCat] = useState<string>("All");
  const [open, setOpen] = useState<DesignPiece | null>(null);
  const shown = cat === "All" ? designs : designs.filter((d) => d.category === cat);

  return (
    <>
      <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2">
        {["All", ...designCategories].map((c) => (
          <button key={c} type="button" aria-pressed={cat === c} onClick={() => setCat(c)} className="filter-chip">
            {c}
          </button>
        ))}
      </div>

      {shown.length === 0 ? (
        <p className="mt-10 text-muted">{cat} work is coming soon.</p>
      ) : (
        <ul className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
          {shown.map((d) => (
            <li key={d.title}>
              <button type="button" onClick={() => setOpen(d)} className="marquee-tile block w-full text-left" aria-label={`Open ${d.title}, ${d.category}`}>
                <DesignArt piece={d} sizes="(min-width: 1024px) 22vw, 45vw" />
              </button>
              <p className="mt-2 text-sm font-medium">{d.title}</p>
              <p className="label mt-0.5">{d.category}</p>
            </li>
          ))}
        </ul>
      )}
      <DesignDialog piece={open} onClose={() => setOpen(null)} />
    </>
  );
}
