import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Layout } from "@/components/Layout";

export const Route = createFileRoute("/early-access")({
  head: () => ({
    meta: [
      { title: "Early Access — afeem" },
      { name: "description", content: "Join afeem early access. Private previews, first dibs on samples, founding-member pricing." },
      { property: "og:title", content: "Early Access — afeem" },
      { property: "og:description", content: "Private previews, first dibs, founding-member pricing." },
    ],
  }),
  component: EarlyAccess,
});

function EarlyAccess() {
  const [joined, setJoined] = useState(false);
  const spotsLeft = 247;

  return (
    <Layout>
      <section className="border-b border-border grain-overlay">
        <div className="mx-auto max-w-[1400px] px-4 py-20 text-center sm:px-6">
          <div className="mono flex items-center justify-center gap-3 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            phase 01 — open now
          </div>
          <h1 className="display mx-auto mt-6 max-w-4xl text-5xl leading-[0.95] sm:text-8xl">
            Join us early.
          </h1>
          <p className="mx-auto mt-6 max-w-md text-sm text-muted-foreground sm:text-base">
            Limited to the first wave. Founding members get the first look at every piece.
          </p>

          {!joined ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setJoined(true);
              }}
              className="mx-auto mt-10 flex max-w-md items-center border border-border bg-background"
            >
              <input
                required
                type="email"
                placeholder="your email"
                className="mono flex-1 bg-transparent px-4 py-3.5 text-xs uppercase tracking-[0.18em] outline-none placeholder:text-muted-foreground"
              />
              <button className="mono bg-foreground px-5 py-3.5 text-[11px] uppercase tracking-[0.22em] text-background hover:bg-accent">
                reserve →
              </button>
            </form>
          ) : (
            <div className="mx-auto mt-10 max-w-md border border-accent/60 p-6">
              <div className="mono text-[10px] uppercase tracking-[0.22em] text-accent">welcome to the archive</div>
              <p className="display mt-2 text-xl">You&apos;re in. Member #1,248.</p>
              <p className="mono mt-4 text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                expect the first preview within 7 days.
              </p>
            </div>
          )}

          <div className="mono mt-6 text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            {spotsLeft} spots left in the founding wave
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-[1400px] px-4 py-20 sm:px-6">
          <div className="mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">what you get</div>
          <h2 className="display mt-2 text-4xl sm:text-5xl">Founding perks</h2>

          <div className="mt-10 grid grid-cols-1 divide-y divide-border border-y border-border md:grid-cols-2 md:divide-x md:divide-y-0">
            {[
              { i: "01", t: "Private previews", d: "See every new mockup before it goes public." },
              { i: "02", t: "First dibs", d: "Reserve pieces before they release." },
              { i: "03", t: "Founding-member pricing", d: "Discount applied automatically on Drop 01." },
              { i: "04", t: "Member-only releases", d: "Occasional pieces only sold to the early wave." },
            ].map((p) => (
              <div key={p.i} className="p-8 md:p-10">
                <div className="mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">perk {p.i}</div>
                <h3 className="display mt-3 text-2xl">{p.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
