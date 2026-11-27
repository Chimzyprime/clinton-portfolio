import Image from "next/image";
import type { DesignPiece } from "@/data/site";

/** Hue per category so placeholder tiles are told apart without real art. */
const HUE: Record<string, number> = {
  "Social Media": 215,
  Web3: 8,
  "Pitch Decks": 265,
  Thumbnails: 150,
  Events: 38,
};

/**
 * The picture for a design piece: the real image when set, otherwise soft
 * placeholder art. Fills its parent (give the parent an aspect ratio).
 */
export function DesignArt({ piece, sizes, label }: { piece: DesignPiece; sizes: string; label?: string }) {
  if (piece.image) {
    return <Image src={piece.image.src} alt={piece.image.alt} fill sizes={sizes} className="object-cover" />;
  }
  const h = HUE[piece.category] ?? 8;
  return (
    <div
      className="absolute inset-0 flex items-end p-4"
      style={{
        background: `radial-gradient(120% 90% at 20% 10%, hsl(${h} 55% 45% / 0.55), transparent 65%), linear-gradient(160deg, hsl(${h} 25% 16%), hsl(${h} 20% 9%))`,
      }}
      role="img"
      aria-label={`Placeholder for ${piece.title}`}
    >
      <span className="font-mono text-[10px] uppercase tracking-widest text-white/55">{label ?? piece.category}</span>
    </div>
  );
}
