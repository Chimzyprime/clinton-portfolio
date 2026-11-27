"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import type { DesignPiece } from "@/data/site";
import { DesignArt } from "./DesignArt";

/** A modal that shows one piece large. Native <dialog>: focus trap, Esc, backdrop. */
export function DesignDialog({ piece, onClose }: { piece: DesignPiece | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (piece && !d.open) d.showModal();
    if (!piece && d.open) d.close();
  }, [piece]);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => { if (e.target === ref.current) onClose(); }}
      aria-label={piece ? piece.title : "Design"}
      className="design-dialog"
    >
      {piece && (
        <div className="relative">
          <div className="relative aspect-[4/5] max-h-[78vh] w-full overflow-hidden rounded-xl">
            <DesignArt piece={piece} sizes="(min-width: 768px) 560px, 92vw" />
          </div>
          <p className="mt-3 text-base font-semibold tracking-tight">{piece.title}</p>
          <p className="label mt-1">{piece.category}</p>
          <button type="button" className="icon-btn absolute right-2 top-2 bg-black/50" aria-label="Close" onClick={onClose}>
            <X size={18} aria-hidden="true" />
          </button>
        </div>
      )}
    </dialog>
  );
}
