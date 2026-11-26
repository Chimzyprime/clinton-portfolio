import { site } from "@/data/site";
import { ThemeToggle } from "./ThemeToggle";

// Order matches the page. Toolkit has no link: it is supporting detail.
const nav = [
  { href: "#work", label: "Work" },
  { href: "#services", label: "Services" },
  { href: "#writing", label: "Writing" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
] as const;

export function Header() {
  return (
    // Fixed 56px (h-14) height: the bar never changes size, so it cannot
    // cause layout shift as the page loads or scrolls.
    <header className="sticky top-0 z-40 border-b border-line bg-bg">
      <div className="page-x flex h-14 items-center justify-between gap-6">
        <a href="#main" className="text-sm font-semibold tracking-tight">
          {site.shortName}
        </a>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex gap-8 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="link">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-5">
          {/* On small screens the full nav is hidden; keep the key action. */}
          <a href="#contact" className="link text-sm md:hidden">
            Contact
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
