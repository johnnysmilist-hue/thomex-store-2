"use client";

import { RotateCcw, Package, Clock, CheckCircle, AlertCircle } from "lucide-react";

const steps = [
  { icon: AlertCircle, title: "Check Eligibility", desc: "Items must be unused, in original packaging, within 7 days." },
  { icon: Package, title: "Initiate Return", desc: "Go to My Orders and click 'Return' on eligible items." },
  { icon: Clock, title: "Pickup Scheduled", desc: "Our courier collects from your address within 1-2 days." },
  { icon: CheckCircle, title: "Refund Issued", desc: "Funds returned to original payment method in 5-10 days." },
];

export default function ReturnsPage() {
  return (
    <div className="py-6 md:py-8 max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-2">Returns & Refunds</h1>
        <p className="text-muted-foreground">Hassle-free returns within 7 days of delivery.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {steps.map((step, i) => {
          const Icon = step.icon;
          return (
            <div key={i} className="text-center p-4 bg-muted/30 rounded-xl">
              <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-sm font-semibold mb-1">{step.title}</h3>
              <p className="text-xs text-muted-foreground">{step.desc}</p>
            </div>
          );
        })}
      </div>

      <div className="space-y-4 bg-background border border-border rounded-2xl p-5 md:p-6">
        <h2 className="text-lg font-bold text-foreground mb-2">Return Policy</h2>
        <ul className="space-y-3 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
            <span>Items must be in original, unused condition with all tags attached.</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
            <span>Electronics must be returned with original accessories and packaging.</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
            <span>Perishable goods (food, cosmetics) cannot be returned once opened.</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
            <span>Refunds are processed within 5-10 business days to the original payment method.</span>
          </li>
        </ul>
      </div>
    </div>
  );
}