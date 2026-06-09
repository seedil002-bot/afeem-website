import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Layout } from "@/components/Layout";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — afeem" },
      { name: "description", content: "Frequently asked questions about afeem early access, samples, sizing, and drops." },
      { property: "og:title", content: "FAQ — afeem" },
      { property: "og:description", content: "Common questions about early access and drops." },
    ],
  }),
  component: FAQ,
});

const QA = [
  { q: "Is afeem live?", a: "Not yet. We're in early access. Pieces shown are samples and mockups. Drop 01 opens to early members first." },
  { q: "Can I buy something now?", a: "Items marked 'early access' are available to reserve at founding-member pricing. Everything else is pre-release." },
  { q: "Will the designs change?", a: "Possibly. We're building in public, so cuts, fabrics, and small details may shift before final release." },
  { q: "When does Drop 01 release?", a: "We're targeting SS / 26. Members get a private heads-up two weeks before the public window." },
  { q: "How do I cancel a reservation?", a: "Just reply to any of our emails. No charge, no questions." },
  { q: "Do you ship internationally?", a: "Yes — once the store opens. Rates and timing will be finalized closer to launch." },
  { q: "Are you on TikTok?", a: "No. Email and Instagram only." },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <Layout>
      <section className="border-b border-border">
        <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6">
          <div className="mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">help</div>
          <h1 className="display mt-2 text-5xl sm:text-7xl">FAQ</h1>
        </div>
      </section>
      <section>
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
          <div className="divide-y divide-border border-y border-border">
            {QA.map((item, i) => (
              <div key={i}>
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="flex w-full items-center justify-between gap-6 py-5 text-left"
                >
                  <span className="display text-lg sm:text-xl">{item.q}</span>
                  <span className="mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                    {open === i ? "−" : "+"}
                  </span>
                </button>
                {open === i && (
                  <p className="pb-6 text-sm leading-relaxed text-muted-foreground sm:text-base">{item.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
