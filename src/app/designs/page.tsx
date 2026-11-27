import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { DesignGallery } from "@/components/DesignGallery";

export const metadata: Metadata = { title: "Design work" };

export default function DesignsPage() {
  return (
    <section className="page-x pb-24 pt-32 md:pt-40" aria-labelledby="designs-heading">
      <Link href="/#design-work" className="label link inline-flex items-center gap-1">
        <ArrowLeft size={14} aria-hidden="true" /> Back
      </Link>
      <h1 id="designs-heading" className="mt-6 text-[clamp(2rem,4vw,3.25rem)] font-bold tracking-[-0.03em]">
        All design <span className="text-highlight">work</span>
      </h1>
      <p className="mt-3 max-w-xl text-muted">Flyers, banners, social graphics and deck visuals. Pick a category to filter.</p>
      <div className="mt-8"><DesignGallery /></div>
    </section>
  );
}
