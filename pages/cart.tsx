"use client";

import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, LogIn, Truck, ShieldCheck } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { formatPrice } from "@/lib/data";
import { cn } from "@/lib/utils";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, totalItems, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center px-4">
        <div className="rounded-full bg-muted p-5 sm:p-6">
          <ShoppingBag className="h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground/60" />
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-foreground">Your cart is empty</h1>
        <p className="text-sm text-muted-foreground max-w-xs">Browse our products and add items to your cart.</p>
        <Link href="/" className="mt-2 inline-flex items-center gap-2 rounded-xl bg-primary px-6 sm:px-8 py-2.5 sm:py-3 font-semibold text-white transition hover:bg-primary/90 active:scale-95">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6 pb-8 sm:pb-12">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h1 className="text-xl sm:text-2xl font-bold text-foreground">Shopping Cart ({totalItems})</h1>
        <Link href="/" className="text-xs sm:text-sm text-primary hover:underline">
          Continue Shopping
        </Link>
      </div>

      {/* Guest mode notice */}
      <div className="flex items-start sm:items-center gap-2 rounded-xl border border-dashed border-primary/30 bg-primary/5 p-3 sm:p-4">
        <LogIn className="h-4 w-4 text-primary mt-0.5 sm:mt-0 flex-shrink-0" />
        <p className="text-xs sm:text-sm text-muted-foreground">
          You're shopping as a guest. <Link href="/login" className="font-medium text-primary hover:underline">Sign in</Link> for faster checkout.
        </p>
      </div>

      <div className="grid gap-4 sm:gap-6 lg:grid-cols-3">
        {/* Cart items */}
        <div className="space-y-3 lg:col-span-2">
          {items.map((item) => (
            <div
              key={item.product.id}
              className="flex gap-3 sm:gap-4 rounded-xl border border-border bg-background p-3 sm:p-4 transition-colors hover:border-primary/20"
            >
              <Link
                href={`/product/${item.product.id}`}
                className="relative h-20 w-20 sm:h-24 sm:w-24 shrink-0 overflow-hidden rounded-lg bg-muted"
              >
                <Image
                  src={item.product.image}
                  alt={item.product.name}
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              </Link>
              <div className="flex flex-1 flex-col justify-between min-w-0">
                <div>
                  <Link
                    href={`/product/${item.product.id}`}
                    className="line-clamp-2 text-sm sm:text-base font-medium text-foreground hover:text-primary transition-colors"
                  >
                    {item.product.name}
                  </Link>
                  <p className="mt-0.5 price-tabular text-sm text-foreground font-semibold">
                    {formatPrice(item.product.price)}
                  </p>
                  {item.product.freeShipping && (
                    <span className="inline-flex items-center gap-1 mt-1 text-[10px] sm:text-xs text-success">
                      <Truck className="h-3 w-3" />
                      Free shipping
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center rounded-lg border border-border bg-background">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="px-2.5 sm:px-3 py-1.5 sm:py-2 hover:bg-muted transition-colors active:scale-95"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-8 sm:w-10 text-center text-sm font-mono font-semibold">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="px-2.5 sm:px-3 py-1.5 sm:py-2 hover:bg-muted transition-colors active:scale-95"
                      aria-label="Increase quantity"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <span className="price-tabular text-sm font-semibold text-foreground hidden sm:inline">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="rounded-lg p-2 text-muted-foreground transition hover:bg-destructive/10 hover:text-destructive active:scale-95"
                      aria-label="Remove item"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order summary - sticky on desktop */}
        <div className="lg:sticky lg:top-24 h-fit space-y-4 rounded-xl border border-border bg-muted p-4 sm:p-6">
          <h2 className="text-base sm:text-lg font-bold text-foreground">Order Summary</h2>
          <div className="space-y-2.5 text-sm">
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal ({totalItems} item{totalItems !== 1 ? "s" : ""})</span>
              <span className="price-tabular text-foreground">{formatPrice(totalPrice)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span className="flex items-center gap-1">
                <Truck className="h-3.5 w-3.5" />
                Shipping
              </span>
              <span className="text-success font-medium">Free</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span className="flex items-center gap-1">
                <ShieldCheck className="h-3.5 w-3.5" />
                Tax
              </span>
              <span className="price-tabular text-foreground">KSh 0</span>
            </div>
            <div className="border-t border-border pt-2.5">
              <div className="flex justify-between text-base sm:text-lg font-bold text-foreground">
                <span>Total</span>
                <span className="price-tabular">{formatPrice(totalPrice)}</span>
              </div>
              <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">Including VAT where applicable</p>
            </div>
          </div>
          <Link
            href="/checkout"
            className={cn(
              "flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 sm:py-3.5 font-semibold text-white shadow-sm transition hover:bg-primary/90 active:scale-95"
            )}
          >
            Proceed to Checkout
            <ArrowRight className="h-4 w-4" />
          </Link>
          <div className="text-center">
            <Link href="/products" className="text-xs sm:text-sm font-medium text-primary hover:underline">
              or Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}