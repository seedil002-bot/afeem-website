import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { ProductCard } from "@/components/ProductCard";
import { getProduct, products } from "@/lib/data";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/shop/$slug")({
  loader: ({ params }) => {
    const p = getProduct(params.slug);
    if (!p) throw notFound();
    return { product: p };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.name} — afeem` },
          { name: "description", content: loaderData.product.description },
          { property: "og:title", content: `${loaderData.product.name} — afeem` },
          { property: "og:description", content: loaderData.product.description },
        ]
      : [],
  }),
  component: ProductPage,
  notFoundComponent: () => (
    <Layout>
      <div className="mx-auto max-w-[1400px] px-6 py-24 text-center">
        <h1 className="display text-4xl">Piece not found</h1>
        <Link to="/shop" className="mono mt-6 inline-block text-xs uppercase tracking-[0.22em] text-accent">
          back to shop →
        </Link>
      </div>
    </Layout>
  ),
});

const SIZES = ["XS", "S", "M", "L", "XL"];

function ProductPage() {
  const { product } = Route.useLoaderData();
  const [size, setSize] = useState("M");
  const [activeImg, setActiveImg] = useState(0);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const { addToCart, toggleWishlist, wishlist } = useStore();
  const inWish = wishlist.includes(product.slug);

  const similar = products.filter((p) => p.slug !== product.slug && p.category === product.category).slice(0, 4);

  const isAvailable = product.status === "early-access";

  const images = [0, 1, 2, 3];

  return (
    <Layout>
      <div className="mx-auto max-w-[1400px] px-4 py-10 sm:px-6">
        <div className="mono mb-6 flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
          <Link to="/shop" className="hover:text-foreground">shop</Link>
          <span>/</span>
          <span>{product.category}</span>
          <span>/</span>
          <span className="text-foreground">{product.slug}</span>
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          {/* Gallery */}
          <div className="md:col-span-7">
            <div className="grid grid-cols-12 gap-3">
              <div className="order-2 col-span-12 sm:order-1 sm:col-span-2">
                <div className="flex gap-3 sm:flex-col">
                  {images.map((i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImg(i)}
                      className={`relative aspect-square w-16 overflow-hidden border sm:w-full ${
                        activeImg === i ? "border-foreground" : "border-border"
                      }`}
                    >
                      <div className="absolute inset-0" style={{ backgroundColor: product.swatch, opacity: 0.7 + i * 0.05 }} />
                      <div className="mono absolute inset-0 flex items-center justify-center text-[8px] uppercase tracking-[0.2em] text-foreground/50">
                        0{i + 1}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              <div className="order-1 col-span-12 sm:order-2 sm:col-span-10">
                <div className="group relative aspect-[4/5] overflow-hidden border border-border grain-overlay">
                  <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-110" style={{ backgroundColor: product.swatch }} />
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="display text-6xl text-foreground/15">afeem</span>
                    <span className="mono mt-2 text-[10px] uppercase tracking-[0.3em] text-foreground/40">view 0{activeImg + 1} — hover to zoom</span>
                  </div>
                  <div className="mono absolute left-4 top-4 text-[10px] uppercase tracking-[0.22em] text-foreground/60">
                    {product.slug}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="md:col-span-5">
            <div className="mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">{product.releaseLabel}</div>
            <h1 className="display mt-2 text-4xl sm:text-5xl">{product.name}</h1>
            <div className="mt-3 flex items-center gap-4">
              <div className="mono text-sm tracking-[0.05em]">${product.price}</div>
              <div className="h-3 w-px bg-border" />
              <div className={`mono text-[10px] uppercase tracking-[0.22em] ${product.status === "early-access" ? "text-accent" : "text-muted-foreground"}`}>
                {product.status.replace("-", " ")}
              </div>
            </div>

            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">{product.description}</p>

            {/* Spec grid */}
            <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-border pt-6 text-sm">
              {[
                ["Material", product.material],
                ["Fit", product.fit],
                ["Color", product.color],
                ["Measurements", product.measurements],
                ["Category", product.category],
                ["Release", product.releaseLabel],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">{k}</dt>
                  <dd className="mt-1">{v}</dd>
                </div>
              ))}
            </dl>

            {/* Size */}
            <div className="mt-8">
              <div className="flex items-center justify-between">
                <div className="mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">size</div>
                <button onClick={() => setShowSizeGuide(true)} className="mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground underline-offset-4 hover:text-foreground hover:underline">
                  size guide
                </button>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {SIZES.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`mono w-12 border py-2 text-xs uppercase tracking-[0.2em] transition-colors ${
                      size === s ? "border-foreground bg-foreground text-background" : "border-border hover:border-foreground"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-8 flex flex-col gap-3">
              {isAvailable ? (
                <button
                  onClick={() => addToCart(product.slug, size)}
                  className="mono w-full bg-foreground py-4 text-[11px] uppercase tracking-[0.22em] text-background hover:bg-accent"
                >
                  add to cart — ${product.price}
                </button>
              ) : (
                <button
                  onClick={() => addToCart(product.slug, size)}
                  className="mono w-full border border-foreground py-4 text-[11px] uppercase tracking-[0.22em] hover:bg-foreground hover:text-background"
                >
                  notify me / join waitlist
                </button>
              )}
              <button
                onClick={() => toggleWishlist(product.slug)}
                className="mono w-full border border-border py-3 text-[11px] uppercase tracking-[0.22em] text-muted-foreground hover:border-foreground hover:text-foreground"
              >
                {inWish ? "saved ✓" : "save for later"}
              </button>
            </div>

            <p className="mono mt-6 text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              details subject to revision before release.
            </p>
          </div>
        </div>

        {/* Similar */}
        {similar.length > 0 && (
          <section className="mt-24 border-t border-border pt-12">
            <h2 className="display mb-8 text-2xl">Similar pieces</h2>
            <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
              {similar.map((p, i) => (
                <ProductCard key={p.slug} product={p} index={i} />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Size guide */}
      {showSizeGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4" onClick={() => setShowSizeGuide(false)}>
          <div className="w-full max-w-lg border border-border bg-card p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between">
              <div>
                <div className="mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">reference</div>
                <h3 className="display mt-1 text-2xl">Size guide</h3>
              </div>
              <button onClick={() => setShowSizeGuide(false)} className="mono text-[11px] uppercase tracking-[0.22em] hover:text-accent">close ×</button>
            </div>
            <table className="mono mt-6 w-full text-xs">
              <thead>
                <tr className="border-b border-border text-muted-foreground">
                  <th className="py-2 text-left uppercase tracking-[0.2em]">size</th>
                  <th className="py-2 text-left uppercase tracking-[0.2em]">chest</th>
                  <th className="py-2 text-left uppercase tracking-[0.2em]">length</th>
                </tr>
              </thead>
              <tbody>
                {[["XS","52","68"],["S","54","70"],["M","56","72"],["L","58","74"],["XL","60","76"]].map(([s,c,l]) => (
                  <tr key={s} className="border-b border-border/60">
                    <td className="py-2.5">{s}</td>
                    <td className="py-2.5">{c} cm</td>
                    <td className="py-2.5">{l} cm</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mono mt-6 text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              Measurements are approximate. Samples may vary by ±1cm.
            </p>
          </div>
        </div>
      )}
    </Layout>
  );
}
