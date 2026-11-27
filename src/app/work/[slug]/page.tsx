import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { brandSystems } from "@/data/site";
import { DesignArt } from "@/components/DesignArt";

export function generateStaticParams() {
  return brandSystems.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const b = brandSystems.find((x) => x.slug === slug);
  return { title: b ? b.title : "Case study", description: b?.summary };
}

/** A tile in the bento grid. Placeholder until real images are added. */
function Tile({ label, className = "" }: { label: string; className?: string }) {
  return (
    <div className={`bento-tile ${className}`}>
      <span className="label">{label}</span>
      <span className="font-mono text-[10px] uppercase tracking-widest text-muted/70">Placeholder</span>
    </div>
  );
}

export default async function CaseStudy({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const i = brandSystems.findIndex((x) => x.slug === slug);
  if (i < 0) notFound();
  const b = brandSystems[i];
  const next = brandSystems[(i + 1) % brandSystems.length];

  return (
    <article className="page-x pb-24 pt-32 md:pt-40" aria-labelledby="case-heading">
      <Link href="/#design-work" className="label link inline-flex items-center gap-1">
        <ArrowLeft size={14} aria-hidden="true" /> Design work
      </Link>
      <p className="label mt-8">Brand identity{b.year ? ` · ${b.year}` : ""}</p>
      <h1 id="case-heading" className="mt-2 text-[clamp(2.25rem,5vw,4.25rem)] font-bold leading-[1.02] tracking-[-0.035em]">
        {b.title}
      </h1>
      <p className="mt-5 max-w-xl text-lg text-muted">{b.summary}</p>

      {/* Bento grid: one rhythm, big logo tile first. Swap tiles for real images. */}
      <div className="bento mt-12">
        <div className="bento-tile bento-logo relative overflow-hidden p-0">
          <DesignArt piece={{ title: b.title, category: "Web3", image: b.image }} sizes="(min-width: 1024px) 50vw, 92vw" label="Logo" />
        </div>
        <Tile label="Colour" />
        <Tile label="Typography" />
        <Tile label="Mockup" className="bento-wide" />
        <Tile label="The story" className="bento-wide" />
        <Tile label="Mockup" />
        <Tile label="Mockup" />
      </div>

      <Link href={`/work/${next.slug}`} className="brand-card group mt-16 flex items-center justify-between gap-4 rounded-2xl border border-line bg-surface p-5 sm:p-6">
        <span>
          <span className="label block">Next project</span>
          <span className="mt-1 block text-xl font-semibold tracking-tight">{next.title}</span>
        </span>
        <ArrowUpRight size={20} aria-hidden="true" className="text-muted transition-transform duration-300 group-hover:text-highlight" />
      </Link>
    </article>
  );
}
