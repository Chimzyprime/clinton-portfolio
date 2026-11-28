import { ImageIcon, LayoutTemplate, PenTool, Waypoints } from "lucide-react";
import { brandIcons, type BrandIconName } from "@/data/brandIcons";

const neutral = { PenTool, ImageIcon, LayoutTemplate, Waypoints } as const;

/**
 * A tool's icon: its official mark when the Simple Icons set has one
 * (brandIcons), otherwise a neutral Lucide icon. Decorative: the tool name is
 * always printed beside it.
 */
export function ToolIcon({ name, size = 24 }: { name: string; size?: number }) {
  if (name in brandIcons) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d={brandIcons[name as BrandIconName]} />
      </svg>
    );
  }
  const Icon = neutral[name as keyof typeof neutral];
  return Icon ? <Icon size={size} strokeWidth={1.5} aria-hidden="true" /> : null;
}
