import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from "react";
import { ChevronRight, SlidersHorizontal, X, ArrowUpDown } from "lucide-react";
import { categories, getProductsByCategory } from "@/lib/data";
import { ProductCard } from "@/components/home/ProductCard";
import { cn } from "@/lib/utils";

const sortOptions = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Top Rated", value: "rating" },
];

export default function CategoryPage() {
  const router = useRouter();
  const { slug } = router.query;
  const category = categories.find((c) => c.slug === slug);
  const [sortBy, setSortBy] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500000]);

  let products = slug ? getProductsByCategory(slug as string) : [];

  // Sort
  products = [...products].sort((a, b) => {
    switch (sortBy) {
      case "price-asc": return a.price - b.price;
      case "price-desc": return b.price - a.price;
      case "rating": return b.rating - a.rating;
      default: return 0;
    }
  });

  // Price filter
  products = products.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

  if (router.isFallback || !category) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-4 pb-8 sm:pb-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-xs sm:text-sm text-muted-foreground overflow-x-auto scrollbar-hide">
        <Link href="/" className="hover:text-foreground whitespace-nowrap">Home</Link>
        <ChevronRight className="h-3 w-3 flex-shrink-0" />
        <span className="text-foreground">{category.name}</span>
      </nav>

      {/* Hero banner */}
      <div className="relative overflow-hidden rounded-xl sm:rounded-2xl">
        <div className="bg-gradient-to-r from-[#023E8A] to-[#0096C7] px-5 py-6 sm:px-10 sm:py-10">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white">{category.name}</h1>
          <p className="mt-1 text-xs sm:text-sm text-white/80">{products.length} products available</p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <p className="text-xs sm:text-sm text-muted-foreground">{products.length} products found</p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={cn(
              "lg:hidden flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-medium transition",
              showFilters ? "bg-primary text-white border-primary" : "border-border text-foreground hover:bg-muted"
            )}
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            Filters
          </button>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none rounded-lg border border-border bg-background px-3 py-2 pr-8 text-xs sm:text-sm font-medium text-foreground outline-none focus:border-primary cursor-pointer"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <ArrowUpDown className="absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Mobile filters */}
      {showFilters && (
        <div className="lg:hidden rounded-xl border border-border bg-muted p-3 space-y-3 animate-fade-in">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-foreground">Filters</p>
            <button onClick={() => setShowFilters(false)} className="p-1 rounded-lg hover:bg-background">
              <X className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>
          <div>
            <p className="text-xs font-medium text-foreground mb-2">Price Range</p>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={priceRange[0]}
                onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                className="w-full rounded-lg border border-border bg-background px-2 py-1.5 text-xs text-foreground outline-none"
                placeholder="Min"
              />
              <span className="text-muted-foreground">-</span>
              <input
                type="number"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                className="w-full rounded-lg border border-border bg-background px-2 py-1.5 text-xs text-foreground outline-none"
                placeholder="Max"
              />
            </div>
          </div>
          <button
            onClick={() => setShowFilters(false)}
            className="w-full rounded-lg bg-primary py-2 text-xs font-semibold text-white"
          >
            Apply Filters
          </button>
        </div>
      )}

      {/* Desktop sidebar + grid */}
      <div className="flex gap-6">
        {/* Desktop filters */}
        <aside className="hidden lg:block w-56 shrink-0 space-y-4">
          <div className="rounded-xl border border-border bg-muted p-4">
            <p className="text-sm font-semibold text-foreground mb-3">Price Range</p>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={priceRange[0]}
                onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                className="w-full rounded-lg border border-border bg-background px-2 py-1.5 text-xs text-foreground outline-none"
                placeholder="Min"
              />
              <span className="text-muted-foreground">-</span>
              <input
                type="number"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                className="w-full rounded-lg border border-border bg-background px-2 py-1.5 text-xs text-foreground outline-none"
                placeholder="Max"
              />
            </div>
          </div>
        </aside>

        {/* Products */}
        <div className="flex-1 min-w-0">
          {products.length > 0 ? (
            <div className="product-grid">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="flex min-h-[30vh] flex-col items-center justify-center text-center rounded-2xl bg-muted/50 py-12">
              <SlidersHorizontal className="h-10 w-10 text-muted-foreground/40 mb-3" />
              <p className="text-base sm:text-lg font-semibold text-foreground">No products found</p>
              <p className="text-xs sm:text-sm text-muted-foreground">Try adjusting your filters.</p>
              <button
                onClick={() => { setPriceRange([0, 500000]); setSortBy("featured"); }}
                className="mt-4 rounded-xl bg-primary px-5 py-2 text-sm font-semibold text-white hover:bg-primary/90 transition"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}