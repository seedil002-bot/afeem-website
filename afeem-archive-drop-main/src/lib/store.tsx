import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type CartItem = { slug: string; size: string; qty: number };

type StoreCtx = {
  cart: CartItem[];
  wishlist: string[];
  addToCart: (slug: string, size: string) => void;
  removeFromCart: (slug: string, size: string) => void;
  toggleWishlist: (slug: string) => void;
  theme: "dark" | "light";
  toggleTheme: () => void;
};

const Ctx = createContext<StoreCtx | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    try {
      const c = localStorage.getItem("afeem.cart");
      const w = localStorage.getItem("afeem.wish");
      const t = localStorage.getItem("afeem.theme") as "dark" | "light" | null;
      if (c) setCart(JSON.parse(c));
      if (w) setWishlist(JSON.parse(w));
      if (t) setTheme(t);
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem("afeem.cart", JSON.stringify(cart));
  }, [cart]);
  useEffect(() => {
    localStorage.setItem("afeem.wish", JSON.stringify(wishlist));
  }, [wishlist]);
  useEffect(() => {
    localStorage.setItem("afeem.theme", theme);
    const root = document.documentElement;
    if (theme === "light") root.classList.add("light");
    else root.classList.remove("light");
  }, [theme]);

  const addToCart = (slug: string, size: string) => {
    setCart((c) => {
      const i = c.findIndex((x) => x.slug === slug && x.size === size);
      if (i >= 0) {
        const next = [...c];
        next[i] = { ...next[i], qty: next[i].qty + 1 };
        return next;
      }
      return [...c, { slug, size, qty: 1 }];
    });
  };
  const removeFromCart = (slug: string, size: string) =>
    setCart((c) => c.filter((x) => !(x.slug === slug && x.size === size)));
  const toggleWishlist = (slug: string) =>
    setWishlist((w) => (w.includes(slug) ? w.filter((s) => s !== slug) : [...w, slug]));
  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <Ctx.Provider value={{ cart, wishlist, addToCart, removeFromCart, toggleWishlist, theme, toggleTheme }}>
      {children}
    </Ctx.Provider>
  );
}

export const useStore = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error("StoreProvider missing");
  return c;
};
