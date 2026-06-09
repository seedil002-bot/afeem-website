import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Layout } from "@/components/Layout";
import { ProductCard } from "@/components/ProductCard";
import { products, CATEGORIES, type Category } from "@/lib/data";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop — afeem" },
      { name: "description", content: "Browse early-stage pieces, mockups, and pre-release samples from afeem." },
      { property: "og:title", content: "Shop — afeem" },
      { property: "og:description", content: "Pre-release samples and mockups." },
    ],
  }),
  component: Shop,
});

type Sort = "newest" | "featured" | "price-asc" | "category";

function Shop() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<Category | "all">("all");
  const [sort, setSort] = useState<Sort>("newest");

  const list = useMemo(() => {
    let l = products.filter((p) => (cat === "all" ? true : p.category === cat));
    if (q.trim()) {
      const s = q.toLowerCase();
      l = l.filter((p) => p.name.toLowerCase().includes(s) || p.color.toLowerCase().includes(s) || p.category.toLowerCase().includes(s));
    }
    switch (sort) {
      case "price-asc":
        l = [...l].sort((a, b) => a.price - b.price);
        break;
      case "category":
        l = [...l].sort((a, b) => a.category.localeCompare(b.category));
        break;
      case "featured":
        l = [...l].sort((a, b) => (a.status === "early-access" ? -1 : 1));
        break;
      default:
        break;
    }
    return l;
  }, [q, cat, sort]);

  return (
    <Layout>
      <section className="border-b border-border">
        <div className="mx-auto max-w-[1400px] px-4 pb-10 pt-12 sm:px-6">
          <div className="mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">archive / shop</div>
          <h1 className="display mt-2 text-5xl sm:text-7xl">Pieces in study</h1>
          <p className="mt-4 max-w-2xl text-sm text-muted-foreground sm:text-base">
            All items are pre-release. Mockups and samples shown for reference. Final fit, color, and material may change.
          </p>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3 border border-border px-3 md:w-72">
              <span className="mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">search</span>
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="name, color, category"
                className="mono w-full bg-transparent py-2.5 text-xs uppercase tracking-[0.15em] outline-none placeholder:text-muted-foreground"
              />
            </div>
            <div className="flex items-center gap-3">
              <span className="mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">sort</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as Sort)}
                className="mono border border-border bg-background px-3 py-2 text-[11px] uppercase tracking-[0.18em] outline-none"
              >
                <option value="newest">newest</option>
                <option value="featured">featured</option>
                <option value="price-asc">price low → high</option>
                <option value="category">category</option>
              </select>
            </div>
          </div>

          <div className="-mx-1 mt-6 flex flex-wrap gap-2">
            {(["all", ...CATEGORIES] as const).map((c) => (
              <button
                key={c}
                onClick={() => setCat(c as Category | "all")}
                className={`mono border px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] transition-colors ${
                  cat === c
                    ? "border-foreground bg-foreground text-background"
                    : "border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-[1400px] px-4 py-12 sm:px-6">
          <div className="mono mb-6 text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            {String(list.length).padStart(2, "0")} pieces
          </div>
          {list.length === 0 ? (
            <div className="border border-dashed border-border py-24 text-center">
              <p className="mono text-xs uppercase tracking-[0.22em] text-muted-foreground">nothing matches</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
              {list.map((p, i) => (
                <ProductCard key={p.slug} product={p} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
