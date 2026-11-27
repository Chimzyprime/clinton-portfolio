import { site } from "@/data/site";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="page-x flex flex-col gap-3 py-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="label">
          © {new Date().getFullYear()} {site.name}
        </p>
        <a href="#main" className="label link">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
