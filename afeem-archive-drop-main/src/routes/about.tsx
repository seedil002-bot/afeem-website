import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — afeem" },
      { name: "description", content: "afeem is an independent clothing archive in early development. Read the brand note." },
      { property: "og:title", content: "About — afeem" },
      { property: "og:description", content: "Independent clothing archive in early development." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <Layout>
      <section className="border-b border-border">
        <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6">
          <div className="mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">brand note</div>
          <h1 className="display mt-4 text-5xl leading-[0.95] sm:text-8xl">
            A working <br />archive<span className="text-accent">.</span>
          </h1>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-10 px-4 py-20 sm:px-6 md:grid-cols-12">
          <div className="md:col-span-4">
            <div className="mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">001 — what this is</div>
          </div>
          <div className="md:col-span-8 md:text-lg">
            <p className="text-muted-foreground">
              afeem is an independent clothing label in early development. We&apos;re building it in public — the pieces here are samples and mockups from current studies. Some will be released. Some will be cut and never sold.
            </p>
            <p className="mt-4 text-muted-foreground">
              The brand will evolve as we work. Cuts, materials, even names may shift. What stays consistent is the point of view: quiet, slow, well-made.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-10 px-4 py-20 sm:px-6 md:grid-cols-12">
          <div className="md:col-span-4">
            <div className="mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">002 — what we make</div>
          </div>
          <div className="md:col-span-8 md:text-lg">
            <p className="text-muted-foreground">
              Tees, shirts, denim, outerwear, wax. Small drops. The first collection — Drop 01 — is a study in core pieces designed to outlast trend cycles.
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-10 px-4 py-20 sm:px-6 md:grid-cols-12">
          <div className="md:col-span-4">
            <div className="mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">003 — early access</div>
          </div>
          <div className="md:col-span-8 md:text-lg">
            <p className="text-muted-foreground">
              Members see new mockups before anyone else, get first dibs when something releases, and receive founding-member pricing. Limited to the first wave.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
