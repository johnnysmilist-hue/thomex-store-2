"use client";

import { Truck, ShieldCheck, RotateCcw, Headphones } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="py-6 md:py-8 space-y-8 md:space-y-12">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">About Thomex</h1>
        <p className="text-muted-foreground leading-relaxed">
          Thomex is East Africa's trusted online marketplace, connecting buyers with quality products at unbeatable prices. From electronics to fashion, home essentials to groceries — we deliver convenience to your doorstep.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        <div className="text-center p-4 md:p-6 bg-muted/30 rounded-2xl">
          <Truck className="w-8 h-8 text-primary mx-auto mb-3" />
          <h3 className="font-semibold text-sm mb-1">Fast Delivery</h3>
          <p className="text-xs text-muted-foreground">2-5 days nationwide</p>
        </div>
        <div className="text-center p-4 md:p-6 bg-muted/30 rounded-2xl">
          <ShieldCheck className="w-8 h-8 text-primary mx-auto mb-3" />
          <h3 className="font-semibold text-sm mb-1">Secure Payments</h3>
          <p className="text-xs text-muted-foreground">M-Pesa & card protection</p>
        </div>
        <div className="text-center p-4 md:p-6 bg-muted/30 rounded-2xl">
          <RotateCcw className="w-8 h-8 text-primary mx-auto mb-3" />
          <h3 className="font-semibold text-sm mb-1">Easy Returns</h3>
          <p className="text-xs text-muted-foreground">7-day hassle-free returns</p>
        </div>
        <div className="text-center p-4 md:p-6 bg-muted/30 rounded-2xl">
          <Headphones className="w-8 h-8 text-primary mx-auto mb-3" />
          <h3 className="font-semibold text-sm mb-1">24/7 Support</h3>
          <p className="text-xs text-muted-foreground">Always here to help</p>
        </div>
      </div>

      <div className="bg-muted/30 rounded-2xl p-6 md:p-10">
        <h2 className="text-xl font-bold text-foreground mb-4">Our Story</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Founded in Nairobi in 2024, Thomex began with a simple mission: make quality shopping accessible to every East African. What started as a small electronics shop has grown into a marketplace serving thousands across Kenya, Uganda, Tanzania, and Rwanda.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          We partner with trusted local and international brands to bring you genuine products at fair prices. Every item on Thomex is vetted for quality, and our delivery network reaches even the most remote corners of the region.
        </p>
      </div>
    </div>
  );
}