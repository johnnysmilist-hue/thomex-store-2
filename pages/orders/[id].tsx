"use client";

import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Package, Truck, CheckCircle, Clock, MapPin } from "lucide-react";
import { formatPrice } from "@/lib/data";
import type { Order } from "@/types";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

const statusConfig = {
  pending: { icon: Clock, label: "Pending", color: "text-warning bg-warning/10" },
  processing: { icon: Package, label: "Processing", color: "text-primary bg-primary/10" },
  shipped: { icon: Truck, label: "Shipped", color: "text-info bg-info/10" },
  delivered: { icon: CheckCircle, label: "Delivered", color: "text-success bg-success/10" },
  cancelled: { icon: Clock, label: "Cancelled", color: "text-muted-foreground bg-muted" },
};

export default function OrderDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [order, setOrder] = useState<Order | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!id) return;
    const saved = localStorage.getItem("thomex-orders");
    if (saved) {
      try {
        const orders: Order[] = JSON.parse(saved);
        setOrder(orders.find((o) => o.id === id) || null);
      } catch { /* ignore */ }
    }
  }, [id]);

  if (!mounted || router.isFallback) return null;

  if (!order) {
    return (
      <div className="py-6 md:py-8 text-center">
        <Package className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
        <p className="text-muted-foreground mb-4">Order not found.</p>
        <Link href="/orders" className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground font-medium rounded-xl hover:bg-primary/90 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Orders
        </Link>
      </div>
    );
  }

  const StatusIcon = statusConfig[order.status].icon;

  return (
    <div className="py-6 md:py-8 max-w-3xl">
      <Link href="/orders" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="w-4 h-4" />
        Back to Orders
      </Link>

      <div className="bg-background border border-border rounded-2xl p-5 md:p-6 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <p className="text-sm text-muted-foreground">Order ID</p>
            <p className="font-mono font-semibold text-lg">{order.id}</p>
          </div>
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${statusConfig[order.status].color}`}>
            <StatusIcon className="w-3.5 h-3.5" />
            {statusConfig[order.status].label}
          </span>
        </div>

        <div className="flex items-start gap-2 text-sm text-muted-foreground mb-4">
          <MapPin className="w-4 h-4 mt-0.5 text-primary" />
          <div>
            <p className="font-medium text-foreground">{order.shippingAddress?.fullName}</p>
            <p>{order.shippingAddress?.phone}</p>
            <p>{order.shippingAddress?.address}, {order.shippingAddress?.city}</p>
          </div>
        </div>

        <div className="border-t border-border pt-4 space-y-3">
          {order.items.map((item) => (
            <div key={item.product.id} className="flex items-center gap-3">
              <div className="relative w-14 h-14 shrink-0 overflow-hidden rounded-lg bg-muted">
                <Image
                  src={item.product.image}
                  alt={item.product.name}
                  fill
                  className="object-cover"
                  sizes="56px"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{item.product.name}</p>
                <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
              </div>
              <p className="text-sm font-mono font-semibold">{formatPrice(item.product.price * item.quantity)}</p>
            </div>
          ))}
        </div>

        <div className="border-t border-border mt-4 pt-4 space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Subtotal</span>
            <span className="font-mono text-foreground">{formatPrice(order.total)}</span>
          </div>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Shipping</span>
            <span className="text-success">Free</span>
          </div>
          <div className="flex justify-between text-base font-bold text-foreground pt-2 border-t border-border">
            <span>Total</span>
            <span className="font-mono">{formatPrice(order.total)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}