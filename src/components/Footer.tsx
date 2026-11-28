import { ArrowUp } from "lucide-react";
import { site } from "@/data/site";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="page-x flex flex-col items-center gap-6 py-10">
        <a
          href="#main"
          aria-label="Back to top"
          className="icon-btn h-12 w-12 border border-line-strong transition-transform duration-200 hover:-translate-y-1"
        >
          <ArrowUp size={20} strokeWidth={1.75} aria-hidden="true" />
        </a>
        <p className="label text-center">
          © {new Date().getFullYear()} {site.name}
        </p>
      </div>
    </footer>
  );
}
