import { site } from "@/data/site";
import { ThemeToggle } from "./ThemeToggle";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="page-x flex flex-col gap-3 py-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="label">
          © {new Date().getFullYear()} {site.name}
        </p>
        <div className="flex items-center gap-6">
          <a href="#main" className="label link">
            Back to top ↑
          </a>
          <ThemeToggle />
        </div>
      </div>
    </footer>
  );
}
