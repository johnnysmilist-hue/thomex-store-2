import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useCallback, useRef } from "react";
import { Star, Truck, ShieldCheck, RotateCcw, Minus, Plus, ShoppingCart, Heart, ChevronRight, Share2, ZoomIn } from "lucide-react";
import { getProductById, getProductsByCategory, formatPrice } from "@/lib/data";
import { useCart } from "@/contexts/CartContext";
import { ProductCard } from "@/components/home/ProductCard";
import { cn } from "@/lib/utils";

const RECENT_KEY = "thomex_recent_finds";

function trackProductView(productId: string) {
  if (typeof window === "undefined") return;
  try {
    const raw = localStorage.getItem(RECENT_KEY);
    const existing: string[] = raw ? JSON.parse(raw) : [];
    const updated = [productId, ...existing.filter((id) => id !== productId)].slice(0, 20);
    localStorage.setItem(RECENT_KEY, JSON.stringify(updated));
  } catch {
    // ignore
  }
}

export default function ProductPage() {
  const router = useRouter();
  const { id } = router.query;
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const touchStartX = useRef(0);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  const product = id ? getProductById(id as string) : undefined;
  const related = product ? getProductsByCategory(product.category).filter((p) => p.id !== product.id).slice(0, 4) : [];

  useEffect(() => {
    if (id) trackProductView(id as string);
  }, [id]);

  const handleAddToCart = useCallback(() => {
    if (!product) return;
    addToCart(product, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  }, [product, quantity, addToCart]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!product) return;
    const images = [product.image, ...(product.gallery || [])];
    if (images.length <= 1) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        setSelectedImage((prev) => (prev + 1) % images.length);
      } else {
        setSelectedImage((prev) => (prev - 1 + images.length) % images.length);
      }
    }
  };

  if (router.isFallback || !product) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  const images = [product.image, ...(product.gallery || [])];
  const discount = product.oldPrice ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) : 0;

  return (
    <div className="space-y-6 pb-8 sm:pb-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-xs sm:text-sm text-muted-foreground overflow-x-auto scrollbar-hide">
        <Link href="/" className="hover:text-foreground whitespace-nowrap">Home</Link>
        <ChevronRight className="h-3 w-3 flex-shrink-0" />
        <Link href={`/category/${product.category}`} className="capitalize hover:text-foreground whitespace-nowrap">{product.category.replace(/-/g, " ")}</Link>
        <ChevronRight className="h-3 w-3 flex-shrink-0" />
        <span className="text-foreground truncate">{product.name}</span>
      </nav>

      <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
        {/* Image Gallery */}
        <div className="space-y-2 sm:space-y-3">
          <div
            ref={imageContainerRef}
            className="relative aspect-square overflow-hidden rounded-xl sm:rounded-2xl bg-muted cursor-zoom-in active:cursor-zoom-in"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onClick={() => setIsZoomed(!isZoomed)}
          >
            <Image
              src={images[selectedImage]}
              alt={product.name}
              fill
              className={cn(
                "object-cover transition-transform duration-300",
                isZoomed && "scale-150"
              )}
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            {product.isDeal && (
              <span className="absolute left-2 top-2 sm:left-3 sm:top-3 rounded-full bg-accent px-2 py-0.5 sm:px-2.5 sm:py-1 text-[10px] sm:text-xs font-bold text-white">
                -{discount}%
              </span>
            )}
            <button
              className="absolute right-2 top-2 sm:right-3 sm:top-3 p-1.5 sm:p-2 rounded-full bg-black/30 backdrop-blur-sm text-white hover:bg-black/50 transition"
              onClick={(e) => { e.stopPropagation(); setIsZoomed(!isZoomed); }}
            >
              <ZoomIn className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </button>
            {images.length > 1 && (
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={(e) => { e.stopPropagation(); setSelectedImage(i); }}
                    className={cn(
                      "h-1.5 rounded-full transition-all",
                      selectedImage === i ? "w-4 bg-white" : "w-1.5 bg-white/50"
                    )}
                  />
                ))}
              </div>
            )}
          </div>
          {images.length > 1 && (
            <div className="flex gap-1.5 sm:gap-2 overflow-x-auto scrollbar-hide pb-1">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={cn(
                    "relative h-14 w-14 sm:h-16 sm:w-16 md:h-20 md:w-20 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all",
                    selectedImage === i ? "border-primary ring-1 ring-primary/30" : "border-transparent opacity-70 hover:opacity-100"
                  )}
                >
                  <Image src={img} alt="" fill className="object-cover" sizes="80px" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-3 sm:space-y-4">
          <div>
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground leading-tight">{product.name}</h1>
            <div className="mt-1.5 flex items-center gap-2 flex-wrap">
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={cn("h-3.5 w-3.5 sm:h-4 sm:w-4", i < Math.floor(product.rating) ? "fill-warning text-warning" : "text-muted-foreground")} />
                ))}
              </div>
              <span className="text-xs sm:text-sm text-muted-foreground">({product.reviewCount} reviews)</span>
              {product.freeShipping && (
                <span className="inline-flex items-center gap-1 rounded-full bg-success/10 px-2 py-0.5 text-[10px] sm:text-xs font-medium text-success">
                  <Truck className="h-3 w-3" />
                  Free Shipping
                </span>
              )}
            </div>
          </div>

          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="price-tabular text-xl sm:text-2xl md:text-3xl text-foreground">{formatPrice(product.price)}</span>
            {product.oldPrice && (
              <span className="price-tabular text-sm sm:text-lg text-muted-foreground line-through">{formatPrice(product.oldPrice)}</span>
            )}
            {product.isDeal && (
              <span className="rounded-full bg-accent/10 px-2 py-0.5 text-[10px] sm:text-xs font-bold text-accent">SAVE {formatPrice(product.oldPrice! - product.price)}</span>
            )}
          </div>

          <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground">{product.description}</p>

          {/* Trust badges - horizontal scroll on mobile */}
          <div className="flex gap-2 overflow-x-auto scrollbar-hide -mx-1 px-1 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-1 sm:gap-2 sm:rounded-xl sm:bg-muted sm:p-4">
            <div className="flex items-center gap-1.5 sm:gap-2 rounded-lg bg-muted sm:bg-transparent px-2.5 py-1.5 sm:px-0 sm:py-0 whitespace-nowrap">
              <Truck className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary flex-shrink-0" />
              <span className="text-xs sm:text-sm">{product.freeShipping ? "Free delivery" : "Delivery from KSh 250"}</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 rounded-lg bg-muted sm:bg-transparent px-2.5 py-1.5 sm:px-0 sm:py-0 whitespace-nowrap">
              <ShieldCheck className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-success flex-shrink-0" />
              <span className="text-xs sm:text-sm">2-year warranty</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 rounded-lg bg-muted sm:bg-transparent px-2.5 py-1.5 sm:px-0 sm:py-0 whitespace-nowrap">
              <RotateCcw className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary flex-shrink-0" />
              <span className="text-xs sm:text-sm">14-day returns</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-3 pt-1">
            <div className="flex items-center rounded-lg border border-border bg-background">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-2.5 sm:px-3 py-2 sm:py-2.5 hover:bg-muted transition-colors active:scale-95"
                aria-label="Decrease quantity"
              >
                <Minus className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </button>
              <span className="w-8 sm:w-10 text-center text-sm sm:text-base font-mono font-semibold">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="px-2.5 sm:px-3 py-2 sm:py-2.5 hover:bg-muted transition-colors active:scale-95"
                aria-label="Increase quantity"
              >
                <Plus className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              className={cn(
                "flex flex-1 items-center justify-center gap-2 rounded-xl px-4 sm:px-6 py-2.5 sm:py-3 font-semibold text-white shadow-sm transition-all active:scale-95",
                addedToCart ? "bg-success" : "bg-primary hover:bg-primary/90"
              )}
            >
              <ShoppingCart className="h-4 w-4" />
              {addedToCart ? "Added!" : "Add to Cart"}
            </button>
            <button className="rounded-xl border border-border p-2.5 sm:p-3 text-muted-foreground transition hover:bg-muted hover:text-destructive active:scale-95">
              <Heart className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
            <button className="rounded-xl border border-border p-2.5 sm:p-3 text-muted-foreground transition hover:bg-muted active:scale-95 sm:hidden">
              <Share2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <div className="space-y-3 sm:space-y-4 pt-4 sm:pt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-base sm:text-lg font-bold text-foreground">Related Products</h2>
            <Link href={`/category/${product.category}`} className="text-xs sm:text-sm text-primary hover:underline">
              View All
            </Link>
          </div>
          <div className="product-grid">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}