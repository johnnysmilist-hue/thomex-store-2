"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ArrowLeft, ArrowRight, CreditCard, Truck, CheckCircle, User, LogIn, Lock, ShieldCheck, ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { formatPrice } from "@/lib/data";
import { PaymentLogos } from "@/components/PaymentLogos";
import { cn } from "@/lib/utils";

type CheckoutStep = "auth" | "shipping" | "payment" | "success";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalPrice, clearCart } = useCart();
  const [step, setStep] = useState<CheckoutStep>("auth");
  const [isProcessing, setIsProcessing] = useState(false);

  const [guestEmail, setGuestEmail] = useState("");
  const [guestPhone, setGuestPhone] = useState("");

  const [shipping, setShipping] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    county: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("cod");

  if (items.length === 0 && step !== "success") {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 text-center px-4">
        <ShoppingBag className="h-12 w-12 text-muted-foreground/40" />
        <h1 className="text-xl sm:text-2xl font-bold text-foreground">Your cart is empty</h1>
        <p className="text-sm text-muted-foreground">Add items before checking out.</p>
        <Link href="/" className="mt-2 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 font-semibold text-white transition hover:bg-primary/90">
          Start Shopping
        </Link>
      </div>
    );
  }

  const handleGuestContinue = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("shipping");
  };

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("payment");
  };

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      // Save order to localStorage for demo
      const order = {
        id: `ORD-${Date.now()}`,
        items: items.map(item => ({
          product: {
            id: item.product.id,
            name: item.product.name,
            price: item.product.price,
            image: item.product.image,
            category: item.product.category,
          },
          quantity: item.quantity,
        })),
        total: totalPrice,
        status: "pending" as const,
        shipping: { ...shipping, email: guestEmail },
        paymentMethod,
        createdAt: new Date().toISOString(),
      };
      const existing = JSON.parse(localStorage.getItem("thomex-orders") || "[]");
      localStorage.setItem("thomex-orders", JSON.stringify([order, ...existing]));
      
      clearCart();
      setIsProcessing(false);
      setStep("success");
    }, 2000);
  };

  const steps = [
    { key: "auth", label: "Account" },
    { key: "shipping", label: "Shipping" },
    { key: "payment", label: "Payment" },
  ] as const;

  return (
    <div className="mx-auto max-w-2xl space-y-4 sm:space-y-6 pb-8 sm:pb-12">
      <div className="flex items-center gap-2">
        {step !== "success" && (
          <button
            onClick={() => router.back()}
            className="rounded-lg p-2 hover:bg-muted transition-colors active:scale-95"
            aria-label="Go back"
          >
            <ArrowLeft className="h-5 w-5 text-muted-foreground" />
          </button>
        )}
        <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground">
          {step === "auth" && "Checkout"}
          {step === "shipping" && "Shipping Details"}
          {step === "payment" && "Payment"}
          {step === "success" && "Order Confirmed"}
        </h1>
      </div>

      {/* Progress steps */}
      {step !== "success" && (
        <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
          {steps.map((s, i) => (
            <div key={s.key} className="flex items-center gap-1 sm:gap-2">
              <span className={cn(
                "rounded-full px-2 sm:px-2.5 py-0.5 sm:py-1 font-medium whitespace-nowrap transition-colors",
                step === s.key ? "bg-primary text-white" :
                steps.findIndex(x => x.key === step) > i ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"
              )}>
                {steps.findIndex(x => x.key === step) > i ? "✓" : i + 1}. {s.label}
              </span>
              {i < steps.length - 1 && (
                <span className="text-muted-foreground hidden sm:inline">→</span>
              )}
            </div>
          ))}
        </div>
      )}

      {step === "auth" && (
        <div className="space-y-3 sm:space-y-4">
          {/* Sign in option */}
          <div className="space-y-3 rounded-xl border border-border bg-background p-4 sm:p-6">
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <LogIn className="h-4 w-4 text-primary" />
              Sign in for faster checkout
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground">Access your saved addresses and track your orders easily.</p>
            <Link
              href="/login"
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-primary bg-primary/5 py-2.5 sm:py-3 font-semibold text-primary transition hover:bg-primary hover:text-white active:scale-95 text-center"
            >
              <User className="h-4 w-4" />
              Sign In
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-border" />
            <span className="text-[10px] sm:text-xs text-muted-foreground uppercase font-medium">or</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          {/* Guest checkout */}
          <form onSubmit={handleGuestContinue} className="space-y-3 rounded-xl border border-border bg-background p-4 sm:p-6">
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <Truck className="h-4 w-4 text-primary" />
              Continue as Guest
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground">You can create an account after placing your order.</p>

            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs sm:text-sm font-medium text-foreground">Email Address *</label>
                <input
                  required
                  type="email"
                  value={guestEmail}
                  onChange={(e) => setGuestEmail(e.target.value)}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 sm:py-2.5 text-sm text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-shadow"
                  placeholder="your@email.com"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs sm:text-sm font-medium text-foreground">Phone Number *</label>
                <input
                  required
                  type="tel"
                  value={guestPhone}
                  onChange={(e) => setGuestPhone(e.target.value)}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 sm:py-2.5 text-sm text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-shadow"
                  placeholder="07XX XXX XXX"
                />
              </div>
            </div>

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-2.5 sm:py-3 font-semibold text-white shadow-sm transition hover:bg-primary/90 active:scale-95"
            >
              Continue to Shipping
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}

      {step === "shipping" && (
        <form onSubmit={handleShippingSubmit} className="space-y-4">
          <div className="space-y-3 rounded-xl border border-border bg-background p-4 sm:p-6">
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <Truck className="h-4 w-4 text-primary" />
              Shipping Details
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1 sm:col-span-2">
                <label className="text-xs sm:text-sm font-medium text-foreground">Full Name *</label>
                <input required value={shipping.fullName} onChange={(e) => setShipping((s) => ({ ...s, fullName: e.target.value }))} className="w-full rounded-lg border border-border bg-background px-3 py-2 sm:py-2.5 text-sm text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-shadow" placeholder="John Doe" />
              </div>
              <div className="space-y-1 sm:col-span-2">
                <label className="text-xs sm:text-sm font-medium text-foreground">Phone Number *</label>
                <input required type="tel" value={shipping.phone} onChange={(e) => setShipping((s) => ({ ...s, phone: e.target.value }))} className="w-full rounded-lg border border-border bg-background px-3 py-2 sm:py-2.5 text-sm text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-shadow" placeholder="07XX XXX XXX" />
              </div>
              <div className="space-y-1 sm:col-span-2">
                <label className="text-xs sm:text-sm font-medium text-foreground">Delivery Address *</label>
                <input required value={shipping.address} onChange={(e) => setShipping((s) => ({ ...s, address: e.target.value }))} className="w-full rounded-lg border border-border bg-background px-3 py-2 sm:py-2.5 text-sm text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-shadow" placeholder="Street, building, estate" />
              </div>
              <div className="space-y-1">
                <label className="text-xs sm:text-sm font-medium text-foreground">City *</label>
                <input required value={shipping.city} onChange={(e) => setShipping((s) => ({ ...s, city: e.target.value }))} className="w-full rounded-lg border border-border bg-background px-3 py-2 sm:py-2.5 text-sm text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-shadow" placeholder="Nairobi" />
              </div>
              <div className="space-y-1">
                <label className="text-xs sm:text-sm font-medium text-foreground">County *</label>
                <input required value={shipping.county} onChange={(e) => setShipping((s) => ({ ...s, county: e.target.value }))} className="w-full rounded-lg border border-border bg-background px-3 py-2 sm:py-2.5 text-sm text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-shadow" placeholder="Nairobi County" />
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-muted p-4 sm:p-6">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Order Total</span>
              <span className="price-tabular font-bold text-foreground">{formatPrice(totalPrice)}</span>
            </div>
            <button type="submit" className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-2.5 sm:py-3 font-semibold text-white shadow-sm transition hover:bg-primary/90 active:scale-95">
              Continue to Payment
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </form>
      )}

      {step === "payment" && (
        <div className="space-y-4">
          <div className="space-y-3 rounded-xl border border-border bg-background p-4 sm:p-6">
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <CreditCard className="h-4 w-4 text-primary" />
              Choose Payment Method
            </div>

            <PaymentLogos size="md" showLabel className="py-2" />

            <div className="space-y-2 pt-2">
              {[
                { id: "cod", title: "Pay on Delivery", desc: "Pay with cash, M-Pesa, or card when your order arrives" },
                { id: "mpesa", title: "M-Pesa", desc: "Pay instantly via M-Pesa mobile money" },
                { id: "card", title: "Credit / Debit Card", desc: "Visa, Mastercard, and other cards" },
              ].map((method) => (
                <label
                  key={method.id}
                  onClick={() => setPaymentMethod(method.id)}
                  className={cn(
                    "flex items-center gap-3 rounded-lg border p-3 sm:p-4 cursor-pointer transition-all",
                    paymentMethod === method.id
                      ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                      : "border-border bg-muted hover:border-primary/50"
                  )}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === method.id}
                    onChange={() => setPaymentMethod(method.id)}
                    className="h-4 w-4 accent-primary"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{method.title}</p>
                    <p className="text-xs text-muted-foreground">{method.desc}</p>
                  </div>
                </label>
              ))}
            </div>

            <div className="rounded-lg bg-muted p-3 sm:p-4 text-sm">
              <p className="font-medium text-foreground mb-1 flex items-center gap-1">
                <Lock className="h-3.5 w-3.5 text-success" />
                Secure Checkout
              </p>
              <p className="text-muted-foreground text-xs sm:text-sm">
                <span className="font-medium text-foreground">Delivery to:</span> {shipping.fullName}, {shipping.phone}
              </p>
              <p className="text-muted-foreground text-xs sm:text-sm">{shipping.address}, {shipping.city}, {shipping.county}</p>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-muted p-4 sm:p-6">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-muted-foreground">Order Total</span>
              <span className="price-tabular font-bold text-foreground">{formatPrice(totalPrice)}</span>
            </div>
            <div className="flex items-center gap-1 text-[10px] sm:text-xs text-muted-foreground mb-4">
              <ShieldCheck className="h-3 w-3 text-success" />
              SSL encrypted and secure
            </div>
            <button
              onClick={handlePayment}
              disabled={isProcessing}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-2.5 sm:py-3 font-semibold text-white shadow-sm transition hover:bg-primary/90 active:scale-95 disabled:opacity-60"
            >
              {isProcessing ? (
                <>
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Processing...
                </>
              ) : (
                "Place Order"
              )}
            </button>
          </div>
        </div>
      )}

      {step === "success" && (
        <div className="flex flex-col items-center gap-4 sm:gap-5 py-12 sm:py-16 text-center px-4">
          <div className="rounded-full bg-success/10 p-5 sm:p-6 animate-bounce">
            <CheckCircle className="h-12 w-12 sm:h-14 sm:w-14 text-success" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">Order Placed Successfully!</h2>
          <p className="max-w-sm text-sm text-muted-foreground">Thank you for shopping with Thomex. You will receive a confirmation SMS shortly with your order details.</p>
          <div className="flex flex-col sm:flex-row gap-3 mt-2">
            <Link href="/orders" className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-2.5 font-semibold text-white transition hover:bg-primary/90 active:scale-95">
              View Orders
            </Link>
            <Link href="/" className="inline-flex items-center justify-center gap-2 rounded-xl border border-border px-6 py-2.5 font-semibold text-foreground transition hover:bg-muted active:scale-95">
              Continue Shopping
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}