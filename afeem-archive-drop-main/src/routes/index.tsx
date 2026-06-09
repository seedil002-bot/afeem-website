import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Layout } from "@/components/Layout";
import { ProductCard } from "@/components/ProductCard";
import { products, collections } from "@/lib/data";
import emblemAsset from "@/assets/afeem-emblem.png.asset.json";
import markAsset from "@/assets/afeem-mark.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "afeem — early access" },
      { name: "description", content: "afeem. independent clothing archive in early development. mockups, samples, pre-release." },
      { property: "og:title", content: "afeem — early access" },
      { property: "og:description", content: "Independent clothing archive in early development." },
    ],
  }),
  component: Home,
});

function useCountTo(target: number, ms = 1400) {
  const [n, setN] = useState(0);
  useEffect(() => {
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / ms);
      setN(Math.floor(p * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, ms]);
  return n;
}

function Countdown() {
  const target = new Date();
  target.setMonth(target.getMonth() + 2);
  target.setHours(0, 0, 0, 0);
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, target.getTime() - now);
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff / 3600000) % 24);
  const m = Math.floor((diff / 60000) % 60);
  const s = Math.floor((diff / 1000) % 60);
  const cell = (v: number, l: string) => (
    <div className="flex flex-col items-center">
      <span className="display text-3xl tabular-nums sm:text-5xl">{String(v).padStart(2, "0")}</span>
      <span className="mono mt-1 text-[10px] uppercase tracking-[0.22em] text-muted-foreground">{l}</span>
    </div>
  );
  return (
    <div className="flex items-end gap-6 sm:gap-10">
      {cell(d, "days")}
      <span className="display pb-6 text-2xl text-muted-foreground sm:pb-8 sm:text-4xl">:</span>
      {cell(h, "hrs")}
      <span className="display pb-6 text-2xl text-muted-foreground sm:pb-8 sm:text-4xl">:</span>
      {cell(m, "min")}
      <span className="display pb-6 text-2xl text-muted-foreground sm:pb-8 sm:text-4xl">:</span>
      {cell(s, "sec")}
    </div>
  );
}

function Home() {
  const founders = useCountTo(1247);
  const today = useCountTo(38);
  const featured = products.slice(0, 4);

  return (
    <Layout>
      {/* HERO */}
      <section className="relative border-b border-border grain-overlay">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-10 px-4 pb-20 pt-16 sm:px-6 md:grid-cols-12 md:pb-32 md:pt-24">
          <div className="md:col-span-7">
            <div className="mono mb-6 flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              LIVE - EARLY ACCESS — PHASE 01 / 03
            </div>
            <h1 className="display text-[18vw] font-medium leading-[0.85] tracking-[-0.04em] sm:text-[14vw] md:text-[10.5vw] lg:text-[160px]">
              afeem<span className="text-accent">.</span>
            </h1>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Not your average clothing brand
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                to="/early-access"
                className="mono group inline-flex items-center gap-3 border border-foreground bg-foreground px-5 py-3 text-[11px] uppercase tracking-[0.22em] text-background transition-colors hover:bg-accent hover:border-accent"
              >
                join early access
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
              <Link
                to="/shop"
                className="mono inline-flex items-center gap-3 border border-border px-5 py-3 text-[11px] uppercase tracking-[0.22em] text-foreground hover:border-foreground"
              >
                browse archive
              </Link>
            </div>
          </div>

          <div className="md:col-span-5">
            <div className="hairline border-l-0 md:border-l md:pl-6">
              <div className="space-y-6">
                <div className="relative overflow-hidden border border-border bg-[#f4f1ea]">
                  <img
                    src={emblemAsset.url}
                    alt="afeem emblem — designed mark"
                    className="aspect-square w-full object-contain p-6"
                  />
                  <div className="mono absolute left-3 top-3 text-[9px] uppercase tracking-[0.22em] text-black/60">
                    emblem / 001
                  </div>
                  <div className="mono absolute bottom-3 right-3 text-[9px] uppercase tracking-[0.22em] text-black/60">
                    afm — archive
                  </div>
                </div>
                <div>
                  <div className="mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Index</div>
                  <div className="mt-2 mono text-xs">AFM // 2026 — DROP 01</div>
                </div>
                <div>
                  <div className="mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Status</div>
                  <div className="mt-2 text-sm">Mockups & samples only. Pre-release.</div>
                </div>
                <div>
                  <div className="mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Note</div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Drops, fits, and details may change before release. Early members get private previews.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4 border-t border-border pt-6">
                  <div>
                    <div className="display text-2xl tabular-nums">{founders.toLocaleString()}</div>
                    <div className="mono mt-1 text-[10px] uppercase tracking-[0.22em] text-muted-foreground">VISITORS</div>
                  </div>
                  <div>
                    <div className="display text-2xl tabular-nums">+{today}</div>
                    <div className="mono mt-1 text-[10px] uppercase tracking-[0.22em] text-muted-foreground">today</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* watermark mark behind hero */}
        <img
          src={markAsset.url}
          alt=""
          aria-hidden
          className="pointer-events-none absolute -bottom-10 right-4 hidden h-72 w-72 object-contain opacity-[0.06] dark:invert md:block"
        />
      </section>

      {/* DROP PHASE */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <div className="mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">drop phase</div>
              <h2 className="display mt-2 text-3xl sm:text-4xl">Next release in</h2>
            </div>
            <Link to="/early-access" className="mono hidden text-[11px] uppercase tracking-[0.22em] text-muted-foreground hover:text-foreground sm:block">
              reserve →
            </Link>
          </div>
          <Countdown />
          <div className="mt-12 grid grid-cols-3 gap-4 border-t border-border pt-8">
            {[
              { i: "01", label: "Early Access", state: "active" },
              { i: "02", label: "Drop 01 — SS / 26", state: "pending" },
              { i: "03", label: "Public Store", state: "pending" },
            ].map((p) => (
              <div key={p.i}>
                <div className="mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">phase {p.i}</div>
                <div className="mt-2 text-sm sm:text-base">{p.label}</div>
                <div className={`mt-2 h-px ${p.state === "active" ? "bg-accent" : "bg-border"}`} />
                <div className={`mono mt-2 text-[10px] uppercase tracking-[0.22em] ${p.state === "active" ? "text-accent" : "text-muted-foreground"}`}>
                  {p.state === "active" ? "now open" : "soon"}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <div className="mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">featured</div>
              <h2 className="display mt-2 text-3xl sm:text-4xl">Pre-release samples</h2>
            </div>
            <Link to="/shop" className="mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground hover:text-foreground">
              view all →
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
            {featured.map((p, i) => (
              <ProductCard key={p.slug} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* COLLECTIONS STRIP */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <div className="mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">collections</div>
              <h2 className="display mt-2 text-3xl sm:text-4xl">in progress</h2>
            </div>
            <Link to="/collection" className="mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground hover:text-foreground">
              view all →
            </Link>
          </div>
          <div className="grid grid-cols-1 divide-y divide-border border-y border-border">
            {collections.map((c) => (
              <Link
                key={c.slug}
                to="/collection"
                className="group flex items-center justify-between gap-6 py-6 transition-colors hover:bg-secondary/40"
              >
                <div className="flex items-center gap-6">
                  <span className="mono w-8 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">{c.index}</span>
                  <span className="display text-2xl sm:text-3xl">{c.name}</span>
                </div>
                <div className="flex items-center gap-6">
                  <span className="mono hidden text-[11px] uppercase tracking-[0.22em] text-muted-foreground sm:block">
                    {c.items.length} pieces
                  </span>
                  <span className="mono text-[11px] uppercase tracking-[0.22em] text-foreground/60 transition-transform group-hover:translate-x-2">
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* STORY */}
      <section className="border-b border-border">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-10 px-4 py-20 sm:px-6 md:grid-cols-12">
          <div className="md:col-span-4">
            <div className="mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">note 001</div>
            <h2 className="display mt-2 text-3xl">A working archive.</h2>
          </div>
          <div className="md:col-span-7 md:col-start-6 md:text-lg">
            <p className="text-muted-foreground">
              afeem isn&apos;t finished. We&apos;re building the brand in public so the people who care can see it move.
            </p>
            <p className="mt-4 text-muted-foreground">
              No mid ahh pieces.
            </p>
            <Link
              to="/about"
              className="mono mt-8 inline-block border-b border-foreground pb-1 text-xs uppercase tracking-[0.22em] hover:text-accent hover:border-accent"
            >
              read more
            </Link>
          </div>
        </div>
      </section>

      {/* SIGNUP */}
      <section className="border-b border-border bg-secondary/30">
        <div className="mx-auto max-w-[1400px] px-4 py-20 text-center sm:px-6">
          <div className="mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">waitlist</div>
          <h2 className="display mx-auto mt-4 max-w-3xl text-4xl leading-tight sm:text-6xl">
            Join us early.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm text-muted-foreground">
            Private previews, first dibs on samples, early-member pricing. No spam — only when something drops.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget);
              alert(`saved: ${fd.get("email")}`);
              (e.currentTarget as HTMLFormElement).reset();
            }}
            className="mx-auto mt-8 flex max-w-md items-center border border-border bg-background"
          >
            <input
              required
              type="email"
              name="email"
              placeholder="your email"
              className="mono flex-1 bg-transparent px-4 py-3 text-xs uppercase tracking-[0.18em] outline-none placeholder:text-muted-foreground"
            />
            <button className="mono bg-foreground px-5 py-3 text-[11px] uppercase tracking-[0.22em] text-background hover:bg-accent">
              notify me
            </button>
          </form>
          <div className="mono mt-6 text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            also on{" "}
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-foreground hover:text-accent">
              instagram ↗
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
