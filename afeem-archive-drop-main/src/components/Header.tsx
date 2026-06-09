import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useStore } from "@/lib/store";
import logoAsset from "@/assets/afeem-mark.png.asset.json";

const NAV = [
  { to: "/shop", label: "Shop" },
  { to: "/collection", label: "Collection" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const { cart, theme, toggleTheme } = useStore();
  const count = cart.reduce((s, i) => s + i.qty, 0);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-colors ${
        scrolled ? "border-border bg-background/85 backdrop-blur-md" : "border-transparent bg-background"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-6 px-5 sm:h-20 sm:px-8">
        <Link
          to="/"
          className="display group -ml-1 flex items-center gap-3 rounded-sm py-1.5 pl-2 pr-4 text-xl font-medium tracking-tight transition-colors hover:bg-secondary/40"
        >
          <img
            src={logoAsset.url}
            alt="afeem mark"
            width={36}
            height={36}
            className="h-9 w-9 object-contain mix-blend-multiply dark:mix-blend-screen dark:invert"
          />
          <span className="leading-none">
            afeem<span className="text-accent">.</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "mono text-[11px] uppercase tracking-[0.2em] text-foreground" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            aria-label="toggle theme"
            className="mono hidden text-[11px] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground sm:block"
          >
            {theme === "dark" ? "[light]" : "[dark]"}
          </button>
          <Link
            to="/early-access"
            className="mono hidden text-[11px] uppercase tracking-[0.2em] text-accent hover:opacity-80 sm:block"
          >
            early access
          </Link>
          <Link
            to="/cart"
            className="mono text-[11px] uppercase tracking-[0.2em] text-foreground hover:text-accent"
          >
            cart({count})
          </Link>
          <button
            className="mono text-[11px] uppercase tracking-[0.2em] md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label="menu"
          >
            {open ? "close" : "menu"}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <div className="flex flex-col px-6 py-4">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="mono py-2 text-xs uppercase tracking-[0.2em]"
              >
                {n.label}
              </Link>
            ))}
            <Link
              to="/early-access"
              onClick={() => setOpen(false)}
              className="mono py-2 text-xs uppercase tracking-[0.2em] text-accent"
            >
              early access
            </Link>
            <button
              onClick={toggleTheme}
              className="mono py-2 text-left text-xs uppercase tracking-[0.2em]"
            >
              {theme === "dark" ? "[light mode]" : "[dark mode]"}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
