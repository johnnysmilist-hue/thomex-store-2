import { products } from "@/lib/data";
import { ProductCard } from "./ProductCard";

export function FeaturedProducts() {
  const featured = products.filter((p) => !p.isDeal).slice(0, 20);

  return (
    <section className="py-4 sm:py-6">
      <h2 className="mb-3 text-base font-bold text-foreground sm:mb-4 sm:text-lg">Featured for You</h2>
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3 md:grid-cols-4">
        {featured.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}