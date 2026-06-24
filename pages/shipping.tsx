"use client";

import { Truck, MapPin, Clock, Package } from "lucide-react";

const rates = [
  { area: "Nairobi CBD & Surrounds", time: "1-2 days", cost: "Free over KSh 5,000" },
  { area: "Major Towns (Mombasa, Kisumu, Nakuru, Eldoret)", time: "2-4 days", cost: "KSh 350" },
  { area: "Other Towns", time: "3-5 days", cost: "KSh 500" },
  { area: "Remote Areas", time: "5-10 days", cost: "KSh 750" },
];

export default function ShippingPage() {
  return (
    <div className="py-6 md:py-8 max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-2">Shipping Information</h1>
        <p className="text-muted-foreground">Fast, reliable delivery across East Africa.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="text-center p-4 bg-muted/30 rounded-xl">
          <Truck className="w-6 h-6 text-primary mx-auto mb-2" />
          <p className="text-sm font-semibold">Nationwide</p>
          <p className="text-xs text-muted-foreground">All of Kenya</p>
        </div>
        <div className="text-center p-4 bg-muted/30 rounded-xl">
          <Clock className="w-6 h-6 text-primary mx-auto mb-2" />
          <p className="text-sm font-semibold">1-10 Days</p>
          <p className="text-xs text-muted-foreground">Depending on location</p>
        </div>
        <div className="text-center p-4 bg-muted/30 rounded-xl">
          <Package className="w-6 h-6 text-primary mx-auto mb-2" />
          <p className="text-sm font-semibold">Free Shipping</p>
          <p className="text-xs text-muted-foreground">On orders over KSh 5,000</p>
        </div>
        <div className="text-center p-4 bg-muted/30 rounded-xl">
          <MapPin className="w-6 h-6 text-primary mx-auto mb-2" />
          <p className="text-sm font-semibold">Live Tracking</p>
          <p className="text-xs text-muted-foreground">SMS updates</p>
        </div>
      </div>

      <div className="bg-background border border-border rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left px-4 py-3 font-semibold text-foreground">Delivery Area</th>
              <th className="text-left px-4 py-3 font-semibold text-foreground">Est. Time</th>
              <th className="text-left px-4 py-3 font-semibold text-foreground">Cost</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {rates.map((r, i) => (
              <tr key={i}>
                <td className="px-4 py-3 text-muted-foreground">{r.area}</td>
                <td className="px-4 py-3 font-medium">{r.time}</td>
                <td className="px-4 py-3 font-mono font-semibold">{r.cost}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}