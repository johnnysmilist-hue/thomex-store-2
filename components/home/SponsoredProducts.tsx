"use client";

import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Sparkles, ChevronRight as ChevronIcon } from "lucide-react";
import { products, formatPrice, calculateDiscount } from "@/lib/data";
import { useCart } from "@/contexts/CartContext";
import { ShoppingCart, Heart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function SponsoredProducts() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const { addToCart } = useCart();
  const [wishlist, setWishlist] = useState<string[]>([]);

  const sponsored = products.filter((_, i) => i % 3 === 0).slice(0, 10);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 1);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkScroll, { passive: true });
    checkScroll();
    return () => el.removeEventListener("scroll", checkScroll);
  }, []);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollAmount = direction === "left" ? -320 : 320;
    el.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  const toggleWishlist = (id: string) => {
    setWishlist((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  };

  if (sponsored.length === 0) return null;

  return (
    <section className="py-4 sm:py-6">
      <div className="mb-3 flex items-center justify-between sm:mb-4">
        <div className="flex items-center gap-2">
          <div className="rounded-lg bg-warning/10 p-1.5">
            <Sparkles className="h-4 w-4 text-warning" />
          </div>
          <h2 className="text-base font-bold text-foreground sm:text-lg">Sponsored Products</h2>
        </div>
        <Link href="/products" className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors flex items-center gap-0.5">
          View All
          <ChevronRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="relative group/carousel">
        <div className={cn("pointer-events-none absolute left-0 top-0 bottom-0 w-12 z-10 bg-gradient-to-r from-background to-transparent transition-opacity duration-300", canScrollLeft ? "opacity-100" : "opacity-0")} />
        <div className={cn("pointer-events-none absolute right-0 top-0 bottom-0 w-12 z-10 bg-gradient-to-l from-background to-transparent transition-opacity duration-300", canScrollRight ? "opacity-100" : "opacity-0")} />
        <button onClick={() => scroll("left")} className={cn("absolute left-0 top-1/2 -translate-y-1/2 z-20 hidden md:flex items-center justify-center h-10 w-10 rounded-full bg-primary text-white shadow-lg transition-all duration-300 hover:bg-primary/90 hover:scale-110 active:scale-95 opacity-0 group-hover/carousel:opacity-100 -translate-x-2 group-hover/carousel:translate-x-0", canScrollLeft ? "pointer-events-auto" : "pointer-events-none opacity-0")}>
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button onClick={() => scroll("right")} className={cn("absolute right-0 top-1/2 -translate-y-1/2 z-20 hidden md:flex items-center justify-center h-10 w-10 rounded-full bg-primary text-white shadow-lg transition-all duration-300 hover:bg-primary/90 hover:scale-110 active:scale-95 opacity-0 group-hover/carousel:opacity-100 translate-x-2 group-hover/carousel:translate-x-0", canScrollRight ? "pointer-events-auto" : "pointer-events-none opacity-0")}>
          <ChevronRight className="h-5 w-5" />
        </button>

        <div ref={scrollRef} className="flex gap-3 overflow-x-auto cursor-grab active:cursor-grabbing pb-2 snap-x snap-mandatory scroll-smooth scrollbar-hide" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
          {sponsored.map((product) => {
            const discount = calculateDiscount(product.oldPrice, product.price);
            const isWishlisted = wishlist.includes(product.id);
            return (
              <div key={product.id} className="flex-shrink-0 w-[170px] sm:w-[200px] snap-start group select-none">
                <div className="relative rounded-2xl border border-border bg-card overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary/30">
                  <Link href={`/product/${product.id}`} className="block relative aspect-square bg-muted overflow-hidden">
                    <Image src={product.image} alt={product.name} fill className="object-cover transition-transform duration-500 group-hover:scale-110" sizes="200px" />
                    <span className="absolute top-2 left-2 rounded-full bg-warning px-2 py-0.5 text-[10px] font-bold text-white shadow-md">Sponsored</span>
                    {discount > 0 && <span className="absolute top-2 right-2 rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold text-white shadow-md">-{discount}%</span>}
                    <button onClick={(e) => { e.preventDefault(); toggleWishlist(product.id); }} className={cn("absolute bottom-2 right-2 rounded-full p-1.5 shadow-md transition-all backdrop-blur-sm", isWishlisted ? "bg-accent text-white" : "bg-white/90 text-muted-foreground hover:text-accent")}>
                      <Heart className={cn("w-3 h-3", isWishlisted && "fill-current")} />
                    </button>
                  </Link>
                  <div className="p-2.5">
                    <p className="text-[9px] font-medium text-muted-foreground uppercase tracking-wider mb-0.5">{product.category}</p>
                    <Link href={`/product/${product.id}`} className="block"><h3 className="text-xs font-semibold text-foreground line-clamp-2 mb-1 group-hover:text-primary transition-colors">{product.name}</h3></Link>
                    <div className="flex items-baseline gap-1.5 mb-1.5">
                      <span className="text-sm font-bold text-foreground font-mono">{formatPrice(product.price)}</span>
                      {product.oldPrice && <span className="text-[10px] text-muted-foreground line-through">{formatPrice(product.oldPrice)}</span>}
                    </div>
                    <button onClick={() => addToCart(product)} className="w-full flex items-center justify-center gap-1 rounded-lg bg-primary/10 py-1.5 text-[10px] font-semibold text-primary transition-all hover:bg-primary hover:text-primary-foreground active:scale-[0.98]"><ShoppingCart className="w-3 h-3" />Add</button>
                  </div>
                </div>
              </div>
            );
          })}
          <Link href="/products" className="flex-shrink-0 w-[140px] sm:w-[160px] snap-start flex items-center justify-center rounded-2xl border border-dashed border-primary/40 bg-primary/5 hover:bg-primary/10 transition-colors select-none">
            <div className="text-center p-4">
              <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-primary/15"><ChevronIcon className="h-5 w-5 text-primary" /></div>
              <p className="text-sm font-semibold text-primary">See All</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">All Products</p>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}