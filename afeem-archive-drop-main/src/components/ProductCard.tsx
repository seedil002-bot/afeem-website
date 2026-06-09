import { Link } from "@tanstack/react-router";
import type { Product } from "@/lib/data";

function PatternFill({ pattern, color }: { pattern?: Product["pattern"]; color: string }) {
  const id = `p-${Math.random().toString(36).slice(2, 8)}`;
  return (
    <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
      <defs>
        {pattern === "stripe" && (
          <pattern id={id} width="6" height="6" patternUnits="userSpaceOnUse">
            <rect width="6" height="6" fill={color} />
            <line x1="0" y1="0" x2="0" y2="6" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
          </pattern>
        )}
        {pattern === "grid" && (
          <pattern id={id} width="16" height="16" patternUnits="userSpaceOnUse">
            <rect width="16" height="16" fill={color} />
            <path d="M16 0H0V16" fill="none" stroke="rgba(0,0,0,0.08)" strokeWidth="0.5" />
          </pattern>
        )}
        {pattern === "diag" && (
          <pattern id={id} width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <rect width="10" height="10" fill={color} />
            <line x1="0" y1="0" x2="0" y2="10" stroke="rgba(255,255,255,0.05)" strokeWidth="2" />
          </pattern>
        )}
        {(!pattern || pattern === "solid") && (
          <pattern id={id} width="4" height="4" patternUnits="userSpaceOnUse">
            <rect width="4" height="4" fill={color} />
          </pattern>
        )}
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

export function ProductCard({ product, index }: { product: Product; index?: number }) {
  return (
    <Link
      to="/shop/$slug"
      params={{ slug: product.slug }}
      className="group block"
    >
      <div className="relative aspect-[4/5] overflow-hidden border border-border bg-muted grain-overlay">
        <PatternFill pattern={product.pattern} color={product.swatch} />
        {/* Garment silhouette hint */}
        <div className="absolute inset-0 flex items-center justify-center opacity-30 transition-opacity group-hover:opacity-50">
          <span className="mono text-[10px] uppercase tracking-[0.2em] text-foreground/70">
            {product.name}
          </span>
        </div>
        {/* Top-left index */}
        <div className="absolute left-3 top-3 mono text-[10px] uppercase tracking-[0.18em] text-foreground/60">
          {String((index ?? 0) + 1).padStart(3, "0")} / {product.releaseLabel}
        </div>
        {/* Status tag */}
        <div className="absolute right-3 top-3 mono text-[10px] uppercase tracking-[0.18em]">
          {product.status === "early-access" && (
            <span className="border border-accent/60 bg-background/50 px-1.5 py-0.5 text-accent">
              early access
            </span>
          )}
          {product.status === "coming-soon" && (
            <span className="border border-foreground/40 bg-background/50 px-1.5 py-0.5 text-foreground/80">
              coming soon
            </span>
          )}
          {product.status === "sample" && (
            <span className="border border-foreground/30 bg-background/50 px-1.5 py-0.5 text-foreground/70">
              sample
            </span>
          )}
        </div>
        <div className="absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-between border-t border-border bg-background/85 px-3 py-2 transition-transform duration-300 group-hover:translate-y-0">
          <span className="mono text-[10px] uppercase tracking-[0.18em]">view</span>
          <span className="mono text-[10px] uppercase tracking-[0.18em]">{product.category}</span>
        </div>
      </div>
      <div className="mt-3 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-medium leading-tight">{product.name}</h3>
          <p className="mono mt-1 text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
            {product.color}
          </p>
        </div>
        <div className="mono text-[11px] tracking-[0.1em] text-foreground/80">
          ${product.price}
        </div>
      </div>
    </Link>
  );
}
