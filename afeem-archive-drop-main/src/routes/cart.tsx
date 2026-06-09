import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { useStore } from "@/lib/store";
import { getProduct } from "@/lib/data";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Cart — afeem" },
      { name: "description", content: "Your saved pieces and waitlist items." },
      { property: "og:title", content: "Cart — afeem" },
      { property: "og:description", content: "Saved pieces and waitlist items." },
    ],
  }),
  component: Cart,
});

function Cart() {
  const { cart, removeFromCart, wishlist, toggleWishlist } = useStore();

  const total = cart.reduce((s, i) => {
    const p = getProduct(i.slug);
    return s + (p ? p.price * i.qty : 0);
  }, 0);

  return (
    <Layout>
      <section className="border-b border-border">
        <div className="mx-auto max-w-[1400px] px-4 py-12 sm:px-6">
          <div className="mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">your archive</div>
          <h1 className="display mt-2 text-5xl sm:text-7xl">Cart</h1>
          <p className="mt-3 max-w-xl text-sm text-muted-foreground">
            Pre-release cart. Acts as your waitlist + future purchase list. Checkout opens with Drop 01.
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-12 px-4 py-12 sm:px-6 md:grid-cols-12">
          <div className="md:col-span-8">
            {cart.length === 0 ? (
              <div className="border border-dashed border-border py-20 text-center">
                <p className="mono text-xs uppercase tracking-[0.22em] text-muted-foreground">no pieces saved yet</p>
                <Link to="/shop" className="mono mt-4 inline-block text-xs uppercase tracking-[0.22em] text-accent">browse archive →</Link>
              </div>
            ) : (
              <ul className="divide-y divide-border border-y border-border">
                {cart.map((item) => {
                  const p = getProduct(item.slug);
                  if (!p) return null;
                  return (
                    <li key={`${item.slug}-${item.size}`} className="flex items-start gap-4 py-6">
                      <Link to="/shop/$slug" params={{ slug: p.slug }} className="relative h-28 w-24 flex-shrink-0 overflow-hidden border border-border" style={{ backgroundColor: p.swatch }}>
                        <div className="mono absolute inset-0 flex items-center justify-center text-[9px] uppercase tracking-[0.2em] text-foreground/40">{p.slug.split("-")[1]}</div>
                      </Link>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-start justify-between gap-2">
                          <div>
                            <Link to="/shop/$slug" params={{ slug: p.slug }} className="text-sm font-medium hover:text-accent">{p.name}</Link>
                            <div className="mono mt-1 text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                              {p.category} — size {item.size} — qty {item.qty}
                            </div>
                            <div className={`mono mt-1 text-[10px] uppercase tracking-[0.22em] ${p.status === "early-access" ? "text-accent" : "text-muted-foreground"}`}>
                              {p.status.replace("-", " ")}
                            </div>
                          </div>
                          <div className="mono text-sm tracking-[0.05em]">${p.price * item.qty}</div>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.slug, item.size)}
                          className="mono mt-4 text-[10px] uppercase tracking-[0.22em] text-muted-foreground hover:text-accent"
                        >
                          remove
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}

            {wishlist.length > 0 && (
              <div className="mt-12">
                <h2 className="mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">saved for later</h2>
                <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {wishlist.map((slug) => {
                    const p = getProduct(slug);
                    if (!p) return null;
                    return (
                      <li key={slug} className="border border-border p-3">
                        <Link to="/shop/$slug" params={{ slug }} className="block">
                          <div className="aspect-[4/5] w-full" style={{ backgroundColor: p.swatch }} />
                          <div className="mt-2 text-sm">{p.name}</div>
                          <div className="mono mt-1 text-[10px] uppercase tracking-[0.22em] text-muted-foreground">${p.price}</div>
                        </Link>
                        <button onClick={() => toggleWishlist(slug)} className="mono mt-2 text-[10px] uppercase tracking-[0.22em] text-muted-foreground hover:text-accent">
                          remove
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>

          <aside className="md:col-span-4">
            <div className="sticky top-20 border border-border p-6">
              <div className="mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">summary</div>
              <div className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between"><span>Items</span><span className="mono">{cart.length}</span></div>
                <div className="flex justify-between"><span>Subtotal</span><span className="mono">${total}</span></div>
                <div className="flex justify-between text-muted-foreground"><span>Shipping</span><span className="mono">tbd</span></div>
              </div>
              <div className="mono mt-6 border border-dashed border-border bg-secondary/30 p-3 text-[10px] uppercase leading-relaxed tracking-[0.18em] text-muted-foreground">
                checkout opens with drop 01. items here will be held for early-access members at member pricing.
              </div>
              <button
                disabled
                className="mono mt-6 w-full cursor-not-allowed border border-border py-3 text-[11px] uppercase tracking-[0.22em] text-muted-foreground"
              >
                checkout — opens soon
              </button>
              <Link
                to="/early-access"
                className="mono mt-3 block w-full bg-foreground py-3 text-center text-[11px] uppercase tracking-[0.22em] text-background hover:bg-accent"
              >
                lock in early access
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </Layout>
  );
}
