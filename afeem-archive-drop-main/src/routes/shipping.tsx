import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";

export const Route = createFileRoute("/shipping")({
  head: () => ({
    meta: [
      { title: "Shipping & Returns — afeem" },
      { name: "description", content: "Shipping and returns policy for afeem orders." },
      { property: "og:title", content: "Shipping & Returns — afeem" },
      { property: "og:description", content: "Shipping & returns details." },
    ],
  }),
  component: Shipping,
});

function Shipping() {
  return (
    <Layout>
      <section className="border-b border-border">
        <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6">
          <div className="mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">policy</div>
          <h1 className="display mt-2 text-5xl sm:text-7xl">Shipping / Returns (soon)</h1>
        </div>
      </section>
      <section>
        <div className="mx-auto max-w-3xl space-y-10 px-4 py-16 sm:px-6">
          {[
            { t: "Shipping", d: "Orders ship from our studio within 3–5 business days once Drop 01 opens. International rates calculated at checkout." },
            { t: "Returns", d: "30-day return window on unworn pieces with original tags. Returns ship at customer expense unless the item arrived damaged." },
            { t: "Pre-release reservations", d: "Reserved items are not charged. You'll receive a confirmation email when your piece is ready and a checkout link is available." },
            { t: "Exchanges", d: "Size exchanges are free during the first 30 days, subject to stock availability." },
          ].map((s) => (
            <div key={s.t}>
              <div className="mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">section</div>
              <h2 className="display mt-2 text-2xl">{s.t}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">{s.d}</p>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}
