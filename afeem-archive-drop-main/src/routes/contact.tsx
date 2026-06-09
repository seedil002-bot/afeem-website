import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Layout } from "@/components/Layout";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — afeem" },
      { name: "description", content: "Get in touch with afeem. Email and Instagram." },
      { property: "og:title", content: "Contact — afeem" },
      { property: "og:description", content: "Email or Instagram." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <Layout>
      <section className="border-b border-border">
        <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6">
          <div className="mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">say something</div>
          <h1 className="display mt-2 text-5xl sm:text-7xl">Contact</h1>
        </div>
      </section>

      <section>
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-12 px-4 py-16 sm:px-6 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="space-y-6">
              <div>
                <div className="mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">email</div>
                <a href="mailto:hello@afeem.studio" className="display mt-2 block text-2xl hover:text-accent">hello@afeem.studio</a>
              </div>
              <div>
                <div className="mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">instagram</div>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="display mt-2 block text-2xl hover:text-accent">@afeem ↗</a>
              </div>
              <div>
                <div className="mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">press / wholesale</div>
                <a href="mailto:press@afeem.studio" className="display mt-2 block text-2xl hover:text-accent">press@afeem.studio</a>
              </div>
            </div>
          </div>

          <div className="md:col-span-7">
            {sent ? (
              <div className="border border-border p-10 text-center">
                <div className="mono text-[10px] uppercase tracking-[0.22em] text-accent">message received</div>
                <p className="display mt-4 text-2xl">we&apos;ll get back to you.</p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
                className="space-y-5"
              >
                {[
                  { name: "name", label: "name", type: "text" },
                  { name: "email", label: "email", type: "email" },
                ].map((f) => (
                  <div key={f.name}>
                    <label className="mono block text-[10px] uppercase tracking-[0.22em] text-muted-foreground">{f.label}</label>
                    <input required name={f.name} type={f.type} className="mt-2 w-full border-b border-border bg-transparent py-2.5 text-sm outline-none focus:border-foreground" />
                  </div>
                ))}
                <div>
                  <label className="mono block text-[10px] uppercase tracking-[0.22em] text-muted-foreground">message</label>
                  <textarea required name="message" rows={6} className="mt-2 w-full border border-border bg-transparent p-3 text-sm outline-none focus:border-foreground" />
                </div>
                <button className="mono bg-foreground px-6 py-3 text-[11px] uppercase tracking-[0.22em] text-background hover:bg-accent">
                  send →
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}
