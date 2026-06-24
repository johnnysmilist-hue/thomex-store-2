import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { Search, X, SlidersHorizontal, ChevronDown } from "lucide-react";
import { products } from "@/lib/data";
import { ProductCard } from "@/components/home/ProductCard";
import { cn } from "@/lib/utils";

const sortOptions = [
  { label: "Relevance", value: "relevance" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Top Rated", value: "rating" },
];

export default function SearchPage() {
  const router = useRouter();
  const q = (router.query.q as string) || "";
  const [sortBy, setSortBy] = useState("relevance");
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500000]);

  const results = useMemo(() => {
    if (!q.trim()) return [];
    const term = q.toLowerCase();
    let filtered = products.filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term) ||
        p.tags.some((t) => t.toLowerCase().includes(term))
    );

    // Price filter
    filtered = filtered.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Sort
    switch (sortBy) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
    }

    return filtered;
  }, [q, sortBy, priceRange]);

  return (
    <div className="space-y-4 pb-8 sm:pb-12">
      {/* Search Bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const input = (e.target as HTMLFormElement).querySelector("input") as HTMLInputElement;
          if (input.value.trim()) {
            router.push(`/search?q=${encodeURIComponent(input.value.trim())}`);
          }
        }}
        className="flex items-center gap-2"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            name="q"
            defaultValue={q}
            placeholder="Search products, brands, categories..."
            className="w-full rounded-xl border border-border bg-background py-2.5 sm:py-3 pl-10 pr-10 text-sm text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-shadow"
          />
          {q && (
            <button
              type="button"
              onClick={() => router.push("/search")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        <button
          type="submit"
          className="rounded-xl bg-primary px-4 sm:px-5 py-2.5 sm:py-3 text-sm font-semibold text-white transition hover:bg-primary/90 active:scale-95 whitespace-nowrap"
        >
          Search
        </button>
      </form>

      {q && (
        <>
          {/* Results header with sort and filter */}
          <div className="flex items-center justify-between flex-wrap gap-2">
            <p className="text-xs sm:text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">{results.length}</span> result{results.length !== 1 ? "s" : ""} for &quot;<span className="font-medium text-foreground">{q}</span>&quot;
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={cn(
                  "sm:hidden flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs font-medium transition",
                  showFilters ? "bg-primary text-white border-primary" : "text-foreground hover:bg-muted"
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
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Mobile filters */}
          {showFilters && (
            <div className="sm:hidden rounded-xl border border-border bg-muted p-3 space-y-3 animate-fade-in">
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

          {/* Results grid */}
          {results.length > 0 ? (
            <div className="product-grid">
              {results.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="flex min-h-[30vh] flex-col items-center justify-center text-center rounded-2xl bg-muted/50 py-12">
              <Search className="h-10 w-10 text-muted-foreground/40 mb-3" />
              <p className="text-base sm:text-lg font-semibold text-foreground">No results found</p>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">Try a different search term or adjust your filters.</p>
              <button
                onClick={() => { setPriceRange([0, 500000]); setSortBy("relevance"); }}
                className="mt-4 rounded-xl bg-primary px-5 py-2 text-sm font-semibold text-white hover:bg-primary/90 transition"
              >
                Clear Filters
              </button>
            </div>
          )}
        </>
      )}

      {!q && (
        <div className="flex min-h-[30vh] flex-col items-center justify-center text-center rounded-2xl bg-muted/50 py-12">
          <Search className="h-12 w-12 text-muted-foreground/40 mb-3" />
          <p className="text-lg font-semibold text-foreground">What are you looking for?</p>
          <p className="text-sm text-muted-foreground mt-1">Type a product name, brand, or category above.</p>
        </div>
      )}
    </div>
  );
}