import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { collections, getProduct, type Collection } from "@/lib/data";

export const Route = createFileRoute("/collection")({
  head: () => ({
    meta: [
      { title: "Collections — afeem" },
      { name: "description", content: "afeem collections in development. AfeemKore, AfeemKustom, collection 3 (soon), collection 4 (soon), collection 5 (soon)." },
      { property: "og:title", content: "Collections — afeem" },
      { property: "og:description", content: "Studies and drops in progress." },
    ],
  }),
  component: CollectionsPage,
});

function CollectionsPage() {
  const [open, setOpen] = useState<Collection | null>(null);

  return (
    <Layout>
      <section className="border-b border-border">
        <div className="mx-auto max-w-[1400px] px-4 pb-12 pt-12 sm:px-6">
          <div className="mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">archive / collections</div>
          <h1 className="display mt-2 text-5xl sm:text-7xl">in progress</h1>
          <p className="mt-4 max-w-2xl text-sm text-muted-foreground sm:text-base">
            Each collection is a study. Some will become drops, some will stay in the archive.
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6">
          <div className="grid grid-cols-1 gap-px bg-border md:grid-cols-2">
            {collections.map((c) => (
              <button
                key={c.slug}
                onClick={() => setOpen(c)}
                className="group relative flex aspect-[5/4] flex-col justify-between bg-background p-8 text-left transition-colors hover:bg-secondary/30 sm:p-10 grain-overlay"
              >
                <div className="flex items-start justify-between">
                  <span className="mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">collection {c.index}</span>
                  <span className="mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">{c.items.length} pieces</span>
                </div>
                <div>
                  <h2 className="display text-4xl sm:text-6xl">{c.name}</h2>
                  <p className="mt-3 max-w-md text-sm text-muted-foreground">{c.blurb}</p>
                  <div className="mono mt-6 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-accent">
                    open
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-end bg-background/70 backdrop-blur-sm sm:items-stretch"
          onClick={() => setOpen(null)}
        >
          <aside
            className="h-[88vh] w-full overflow-y-auto border-l border-border bg-card grain-overlay sm:h-full sm:max-w-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 z-10 flex items-start justify-between border-b border-border bg-card/95 px-6 py-5 backdrop-blur">
              <div>
                <div className="mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">collection {open.index}</div>
                <h2 className="display mt-1 text-3xl">{open.name}</h2>
              </div>
              <button
                onClick={() => setOpen(null)}
                className="mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground hover:text-accent"
              >
                close ×
              </button>
            </div>

            <div className="px-6 py-6">
              <p className="text-sm text-muted-foreground">{open.blurb}</p>
              <div className="mono mt-4 text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                {open.items.length} pieces in study
              </div>
            </div>

            <div className="divide-y divide-border border-y border-border">
              {open.items.map((slug, i) => {
                const p = getProduct(slug);
                if (!p) return null;
                return (
                  <Link
                    key={slug}
                    to="/shop/$slug"
                    params={{ slug }}
                    onClick={() => setOpen(null)}
                    className="group flex items-center gap-4 px-6 py-4 transition-colors hover:bg-secondary/40"
                  >
                    <div className="relative h-20 w-16 flex-shrink-0 overflow-hidden border border-border" style={{ backgroundColor: p.swatch }}>
                      <div className="mono absolute inset-0 flex items-center justify-center text-[8px] uppercase tracking-[0.2em] text-foreground/40">0{i + 1}</div>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm">{p.name}</div>
                      <div className="mono mt-1 text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                        {p.category} — {p.color}
                      </div>
                    </div>
                    <div className="mono text-[11px] tracking-[0.05em] text-foreground/70">${p.price}</div>
                    <span className="mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground transition-transform group-hover:translate-x-1">→</span>
                  </Link>
                );
              })}
            </div>
          </aside>
        </div>
      )}
    </Layout>
  );
}
