import { getDealProducts } from "@/lib/data";
import { ProductCard } from "@/components/home/ProductCard";
import { Clock } from "lucide-react";

export default function DealsPage() {
  const deals = getDealProducts();

  return (
    <div className="space-y-4 pb-8 sm:pb-12">
      <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-accent">
        <div className="px-5 py-6 sm:px-10 sm:py-10">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white">Flash Deals</h1>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-white/80">Limited-time offers across all categories. Grab them before they are gone!</p>
        </div>
      </div>

      {deals.length > 0 ? (
        <div className="product-grid">
          {deals.map((product) => (
            <ProductCard key={product.id} product={product} showBadge />
          ))}
        </div>
      ) : (
        <div className="flex min-h-[30vh] flex-col items-center justify-center text-center rounded-2xl bg-muted/50 py-12">
          <Clock className="h-10 w-10 text-muted-foreground/40 mb-3" />
          <p className="text-base sm:text-lg font-semibold text-foreground">No active deals</p>
          <p className="text-xs sm:text-sm text-muted-foreground">Check back soon for new flash sales.</p>
        </div>
      )}
    </div>
  );
}