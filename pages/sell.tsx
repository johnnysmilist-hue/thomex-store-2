"use client";

import { useState } from "react";
import { Store, TrendingUp, ShieldCheck, Headphones, CheckCircle } from "lucide-react";

export default function SellPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="py-6 md:py-8">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">Sell on Thomex</h1>
        <p className="text-muted-foreground leading-relaxed">
          Reach millions of customers across East Africa. Join thousands of sellers growing their business on our platform.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-10">
        <div className="text-center p-4 md:p-6 bg-muted/30 rounded-2xl">
          <Store className="w-8 h-8 text-primary mx-auto mb-3" />
          <h3 className="font-semibold text-sm mb-1">Easy Setup</h3>
          <p className="text-xs text-muted-foreground">List products in minutes</p>
        </div>
        <div className="text-center p-4 md:p-6 bg-muted/30 rounded-2xl">
          <TrendingUp className="w-8 h-8 text-primary mx-auto mb-3" />
          <h3 className="font-semibold text-sm mb-1">Grow Sales</h3>
          <p className="text-xs text-muted-foreground">Reach new customers daily</p>
        </div>
        <div className="text-center p-4 md:p-6 bg-muted/30 rounded-2xl">
          <ShieldCheck className="w-8 h-8 text-primary mx-auto mb-3" />
          <h3 className="font-semibold text-sm mb-1">Secure Payments</h3>
          <p className="text-xs text-muted-foreground">Get paid on time, every time</p>
        </div>
        <div className="text-center p-4 md:p-6 bg-muted/30 rounded-2xl">
          <Headphones className="w-8 h-8 text-primary mx-auto mb-3" />
          <h3 className="font-semibold text-sm mb-1">Seller Support</h3>
          <p className="text-xs text-muted-foreground">Dedicated help team</p>
        </div>
      </div>

      {submitted ? (
        <div className="text-center py-12 bg-muted/30 rounded-2xl">
          <CheckCircle className="w-12 h-12 text-success mx-auto mb-4" />
          <h2 className="text-xl font-bold text-foreground mb-2">Application Received!</h2>
          <p className="text-muted-foreground">Our team will contact you within 2 business days.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-background border border-border rounded-2xl p-5 md:p-8 space-y-4">
          <h2 className="text-lg font-bold text-foreground mb-2">Apply to Sell</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Business Name</label>
              <input required type="text" className="w-full px-3 py-2.5 bg-muted rounded-lg border border-border text-sm focus:outline-none focus:border-primary" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Contact Person</label>
              <input required type="text" className="w-full px-3 py-2.5 bg-muted rounded-lg border border-border text-sm focus:outline-none focus:border-primary" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Email</label>
            <input required type="email" className="w-full px-3 py-2.5 bg-muted rounded-lg border border-border text-sm focus:outline-none focus:border-primary" />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Phone</label>
            <input required type="tel" className="w-full px-3 py-2.5 bg-muted rounded-lg border border-border text-sm focus:outline-none focus:border-primary" />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">What do you sell?</label>
            <textarea required rows={3} className="w-full px-3 py-2.5 bg-muted rounded-lg border border-border text-sm focus:outline-none focus:border-primary resize-none" />
          </div>
          <button
            type="submit"
            className="w-full py-2.5 bg-primary text-primary-foreground font-medium rounded-xl hover:bg-primary/90 transition-colors"
          >
            Submit Application
          </button>
        </form>
      )}
    </div>
  );
}