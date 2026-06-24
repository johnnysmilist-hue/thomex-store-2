"use client";

import { useState } from "react";
import { ChevronDown, Package, CreditCard, Truck, RotateCcw, User } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    icon: Package,
    q: "How do I place an order?",
    a: "Browse products, click 'Add to Cart', then proceed to checkout. You can pay via M-Pesa, card, or mobile money.",
  },
  {
    icon: CreditCard,
    q: "What payment methods are accepted?",
    a: "We accept M-Pesa, Visa, Mastercard, Airtel Money, and PayPal. All transactions are encrypted and secure.",
  },
  {
    icon: Truck,
    q: "How long does delivery take?",
    a: "Nairobi: 1-2 days. Other major towns: 2-4 days. Remote areas: 3-7 days. You'll receive tracking info via SMS.",
  },
  {
    icon: RotateCcw,
    q: "Can I return an item?",
    a: "Yes, unused items in original packaging can be returned within 7 days. Contact support to initiate a return.",
  },
  {
    icon: User,
    q: "Do I need an account to shop?",
    a: "No. You can add items to cart and checkout as a guest. Creating an account lets you track orders and save your details.",
  },
];

export default function HelpPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="py-6 md:py-8 max-w-3xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground text-center mb-2">Help Center</h1>
      <p className="text-muted-foreground text-center mb-8">Find answers to common questions below.</p>

      <div className="space-y-3">
        {faqs.map((faq, i) => {
          const Icon = faq.icon;
          const isOpen = openIndex === i;
          return (
            <div
              key={i}
              className="border border-border rounded-xl overflow-hidden bg-background"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="flex items-center gap-3 w-full px-5 py-4 text-left hover:bg-muted/30 transition-colors"
              >
                <Icon className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="flex-1 font-medium text-sm text-foreground">{faq.q}</span>
                <ChevronDown className={cn("w-4 h-4 text-muted-foreground transition-transform", isOpen && "rotate-180")} />
              </button>
              {isOpen && (
                <div className="px-5 pb-4 pl-12">
                  <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}