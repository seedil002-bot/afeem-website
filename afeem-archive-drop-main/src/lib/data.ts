export type Product = {
  slug: string;
  name: string;
  category: Category;
  price: number; // in USD
  status: "early-access" | "coming-soon" | "sample";
  collection: string; // collection slug
  material: string;
  fit: string;
  color: string;
  measurements: string;
  description: string;
  releaseLabel: string;
  swatch: string; // css color for the placeholder card
  pattern?: "stripe" | "grid" | "diag" | "solid";
};

export const CATEGORIES = [
  "T-shirt",
  "Shirt",
  "Jeans",
  "Bootcut",
  "Wax",
  "Outerwear",
  "Accessories",
  "Other",
] as const;
export type Category = (typeof CATEGORIES)[number];

export type Collection = {
  slug: string;
  name: string;
  index: string; // "01", "02"
  blurb: string;
  items: string[]; // product slugs
};

export const products: Product[] = [
  {
    slug: "afm-01-tee-faded",
    name: "Faded Logo Tee",
    category: "T-shirt",
    price: 48,
    status: "sample",
    collection: "drop-01",
    material: "240gsm heavyweight cotton",
    fit: "Boxy, dropped shoulder",
    color: "Washed black",
    measurements: "L: chest 56cm, length 71cm",
    description: "Sample garment. Print placement and wash may shift before release.",
    releaseLabel: "SS / 26",
    swatch: "#1a1a1a",
    pattern: "solid",
  },
  {
    slug: "afm-02-shirt-archive",
    name: "Archive Work Shirt",
    category: "Shirt",
    price: 145,
    status: "coming-soon",
    collection: "workwear-study",
    material: "Japanese selvedge cotton twill",
    fit: "Relaxed, straight hem",
    color: "Bone",
    measurements: "M: chest 58cm, length 74cm",
    description: "Mock-up from the workwear study. Buttons and pocket spec still in revision.",
    releaseLabel: "FW / 26",
    swatch: "#e8e2d5",
    pattern: "grid",
  },
  {
    slug: "afm-03-jean-bootcut",
    name: "Bootcut 02",
    category: "Bootcut",
    price: 220,
    status: "early-access",
    collection: "core-pieces",
    material: "14oz raw denim",
    fit: "Mid-rise, kicked hem",
    color: "Indigo raw",
    measurements: "32: waist 84cm, inseam 86cm",
    description: "Early-access sample. Final wash and rivet hardware may evolve.",
    releaseLabel: "Pre-order",
    swatch: "#1e2a3a",
    pattern: "diag",
  },
  {
    slug: "afm-04-jean-straight",
    name: "Straight 01",
    category: "Jeans",
    price: 195,
    status: "sample",
    collection: "core-pieces",
    material: "13oz Japanese denim",
    fit: "Mid-rise, straight leg",
    color: "Onyx",
    measurements: "32: waist 84cm, inseam 84cm",
    description: "Sample. Pocket lining in test rotation.",
    releaseLabel: "SS / 26",
    swatch: "#0e0e10",
    pattern: "diag",
  },
  {
    slug: "afm-05-wax-jacket",
    name: "Wax Field Jacket",
    category: "Wax",
    price: 380,
    status: "coming-soon",
    collection: "underground-selection",
    material: "Waxed British cotton, brass hardware",
    fit: "Long, slightly tapered",
    color: "Field olive",
    measurements: "M: chest 60cm, length 86cm",
    description: "Single sample. Hand-finished. Subject to material change.",
    releaseLabel: "FW / 26",
    swatch: "#3a3a2a",
    pattern: "solid",
  },
  {
    slug: "afm-06-outer-coach",
    name: "Coach Jacket — Mockup",
    category: "Outerwear",
    price: 240,
    status: "sample",
    collection: "underground-selection",
    material: "Coated nylon shell",
    fit: "Boxy, cropped",
    color: "Asphalt",
    measurements: "M: chest 58cm, length 64cm",
    description: "Mockup. Snap placement under revision.",
    releaseLabel: "FW / 26",
    swatch: "#2a2a2e",
    pattern: "solid",
  },
  {
    slug: "afm-07-tee-blank",
    name: "Blank Tee 01",
    category: "T-shirt",
    price: 42,
    status: "early-access",
    collection: "archive-basics",
    material: "220gsm combed cotton",
    fit: "Regular",
    color: "Off-white",
    measurements: "L: chest 54cm, length 70cm",
    description: "Early-access basic. The first piece available.",
    releaseLabel: "Now",
    swatch: "#ede8df",
    pattern: "solid",
  },
  {
    slug: "afm-08-cap-mono",
    name: "Mono Cap",
    category: "Accessories",
    price: 55,
    status: "coming-soon",
    collection: "drop-01",
    material: "Brushed cotton, leather strap",
    fit: "Adjustable",
    color: "Black",
    measurements: "One size",
    description: "Logo placement in test.",
    releaseLabel: "SS / 26",
    swatch: "#111",
    pattern: "stripe",
  },
];

export const collections: Collection[] = [
  {
    slug: "drop-01",
    name: "AfeemKore",
    index: "01",
    blurb: "First public mock-ups. Subject to revision.",
    items: ["afm-01-tee-faded", "afm-08-cap-mono"],
  },
  {
    slug: "archive-basics",
    name: "AfeemKustom",
    index: "02",
    blurb: "The foundation. Quiet, repeatable garments.",
    items: ["afm-07-tee-blank"],
  },
  {
    slug: "core-pieces",
    name: "collection 3 (soon)",
    index: "03",
    blurb: "Denim study. Two cuts, repeated.",
    items: ["afm-03-jean-bootcut", "afm-04-jean-straight"],
  },
  {
    slug: "workwear-study",
    name: "collection 4 (soon)",
    index: "04",
    blurb: "Notes on shape and seam from old workwear.",
    items: ["afm-02-shirt-archive"],
  },
  {
    slug: "underground-selection",
    name: "collection 5 (soon)",
    index: "05",
    blurb: "Outerwear research. Limited samples.",
    items: ["afm-05-wax-jacket", "afm-06-outer-coach"],
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const getCollection = (slug: string) => collections.find((c) => c.slug === slug);
