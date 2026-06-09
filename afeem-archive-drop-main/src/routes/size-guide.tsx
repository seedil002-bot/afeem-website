import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";

export const Route = createFileRoute("/size-guide")({
  head: () => ({
    meta: [
      { title: "Size Guide — afeem" },
      { name: "description", content: "Size charts for afeem tees, shirts, denim, and outerwear." },
      { property: "og:title", content: "Size Guide — afeem" },
      { property: "og:description", content: "Sizing reference." },
    ],
  }),
  component: SizeGuide,
});

const tops = [
  ["XS", "52", "68"],
  ["S", "54", "70"],
  ["M", "56", "72"],
  ["L", "58", "74"],
  ["XL", "60", "76"],
];

const bottoms = [
  ["28", "71", "84"],
  ["30", "76", "85"],
  ["32", "81", "86"],
  ["34", "86", "86"],
  ["36", "91", "87"],
];

function Table({ head, rows }: { head: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto border border-border">
      <table className="mono w-full text-xs">
        <thead>
          <tr className="border-b border-border bg-secondary/40">
            {head.map((h) => (
              <th key={h} className="px-4 py-3 text-left uppercase tracking-[0.22em] text-muted-foreground">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-b border-border/60 last:border-b-0">
              {r.map((c, j) => <td key={j} className="px-4 py-3">{c}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SizeGuide() {
  return (
    <Layout>
      <section className="border-b border-border">
        <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6">
          <div className="mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">reference</div>
          <h1 className="display mt-2 text-5xl sm:text-7xl">Size Guide</h1>
          <p className="mt-4 max-w-xl text-sm text-muted-foreground">
            Measurements are flat-lay, in centimeters. Samples may vary by ±1cm.
          </p>
        </div>
      </section>
      <section>
        <div className="mx-auto max-w-4xl space-y-10 px-4 py-12 sm:px-6">
          <div>
            <h2 className="display mb-4 text-2xl">Tops (tee, shirt)</h2>
            <Table head={["Size", "Chest", "Length"]} rows={tops} />
          </div>
          <div>
            <h2 className="display mb-4 text-2xl">Bottoms (jeans)</h2>
            <Table head={["Size", "Waist", "Inseam"]} rows={bottoms} />
          </div>
        </div>
      </section>
    </Layout>
  );
}
