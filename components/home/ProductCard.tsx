"use client";

import Link from "next/link";
import Image from "next/image";
import { Star, ShoppingCart, Heart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import type { Product } from "@/types";
import { formatPrice, calculateDiscount } from "@/lib/data";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
  showBadge?: boolean;
  className?: string;
}

export function ProductCard({ product, showBadge, className }: ProductCardProps) {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [liked, setLiked] = useState(false);
  const discount = calculateDiscount(product.price, product.oldPrice);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    toast({
      title: "Added to cart",
      description: `${product.name.substring(0, 40)}${product.name.length > 40 ? "..." : ""}`,
    });
  };

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setLiked(!liked);
  };

  return (
    <Link href={`/product/${product.id}`} className={cn("group block", className)}>
      <div className="relative overflow-hidden rounded-xl border border-border bg-card shadow-sm transition hover:shadow-md">
        <div className="relative aspect-square overflow-hidden bg-muted">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
          />
          {showBadge && discount > 0 && (
            <span className="absolute left-2 top-2 rounded-full bg-accent px-2 py-0.5 text-xs font-bold text-white">
              -{discount}%
            </span>
          )}
          {product.badges?.[0] && !showBadge && (
            <span className="absolute left-2 top-2 rounded-full bg-primary px-2 py-0.5 text-xs font-bold text-white">
              {product.badges[0]}
            </span>
          )}
          <button
            onClick={handleLike}
            className={cn(
              "absolute right-2 top-2 rounded-full p-1.5 transition",
              liked ? "bg-accent text-white" : "bg-white/80 text-muted-foreground hover:text-accent"
            )}
            aria-label="Add to wishlist"
          >
            <Heart className={cn("h-3.5 w-3.5", liked && "fill-current")} />
          </button>
        </div>

        <div className="space-y-1 p-2.5 sm:p-3">
          <p className="text-xs text-muted-foreground line-clamp-1">{product.vendor}</p>
          <h3 className="text-xs font-medium text-foreground line-clamp-2 sm:text-sm">{product.name}</h3>

          <div className="flex items-center gap-1">
            <Star className="h-3 w-3 fill-warning text-warning" />
            <span className="text-xs font-medium text-foreground">{product.rating}</span>
            <span className="text-xs text-muted-foreground">({product.reviews})</span>
          </div>

          <div className="flex items-end justify-between">
            <div>
              <p className="price-tabular text-sm font-bold text-foreground sm:text-base">
                {formatPrice(product.price)}
              </p>
              {product.oldPrice && product.oldPrice > product.price && (
                <p className="text-xs text-muted-foreground line-through">
                  {formatPrice(product.oldPrice)}
                </p>
              )}
            </div>
            <button
              onClick={handleAdd}
              className="rounded-full bg-primary p-1.5 text-white shadow-sm transition hover:bg-primary/90 active:scale-90 sm:p-2"
              aria-label="Add to cart"
            >
              <ShoppingCart className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}