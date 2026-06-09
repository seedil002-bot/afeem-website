import { Link } from "@tanstack/react-router";
import markAsset from "@/assets/afeem-mark.png.asset.json";

export function Footer() {
  return (
    <footer className="mt-32 border-t border-border">
      <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div className="col-span-2">
          <Link to="/" className="display flex items-center gap-3 text-2xl">
            <img
              src={markAsset.url}
              alt="afeem mark"
              width={40}
              height={40}
              className="h-10 w-10 object-contain mix-blend-multiply dark:mix-blend-screen dark:invert"
            />
            <span>afeem<span className="text-accent">.</span></span>
          </Link>
          <p className="mono mt-4 max-w-xs text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            Independent clothing archive. In early development. Drops, samples, mockups.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget);
              alert(`added ${fd.get("email")} to the waitlist.`);
              (e.currentTarget as HTMLFormElement).reset();
            }}
            className="mt-6 flex max-w-sm items-center border-b border-border"
          >
            <input
              name="email"
              type="email"
              required
              placeholder="email"
              className="mono flex-1 bg-transparent py-2 text-xs uppercase tracking-[0.18em] outline-none placeholder:text-muted-foreground"
            />
            <button className="mono px-2 text-xs uppercase tracking-[0.2em] text-accent">
              join →
            </button>
          </form>
        </div>

        <div>
          <h4 className="mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Shop</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/shop" className="hover:text-accent">All</Link></li>
            <li><Link to="/collection" className="hover:text-accent">Collections</Link></li>
            <li><Link to="/early-access" className="hover:text-accent">Early Access</Link></li>
            <li><Link to="/cart" className="hover:text-accent">Cart</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Info</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/about" className="hover:text-accent">About</Link></li>
            <li><Link to="/contact" className="hover:text-accent">Contact</Link></li>
            <li><Link to="/faq" className="hover:text-accent">FAQ</Link></li>
            <li><Link to="/shipping" className="hover:text-accent">Shipping / Returns (soon)</Link></li>
            <li><Link to="/size-guide" className="hover:text-accent">Size Guide</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-3 px-4 py-5 text-xs sm:flex-row sm:items-center sm:px-6">
          <div className="mono uppercase tracking-[0.2em] text-muted-foreground">
            © {new Date().getFullYear()} afeem — all rights reserved
          </div>
          <div className="mono flex gap-6 uppercase tracking-[0.2em] text-muted-foreground">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-foreground">instagram</a>
            <a href="mailto:hello@afeem.studio" className="hover:text-foreground">hello@afeem.studio</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
