"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Package, Truck, CheckCircle, Clock, ChevronRight } from "lucide-react";
import type { Order } from "@/types";
import { formatPrice } from "@/lib/data";

const statusConfig = {
  pending: { icon: Clock, label: "Pending", color: "text-warning bg-warning/10" },
  processing: { icon: Package, label: "Processing", color: "text-primary bg-primary/10" },
  shipped: { icon: Truck, label: "Shipped", color: "text-info bg-info/10" },
  delivered: { icon: CheckCircle, label: "Delivered", color: "text-success bg-success/10" },
  cancelled: { icon: Clock, label: "Cancelled", color: "text-muted-foreground bg-muted" },
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("thomex-orders");
    if (saved) {
      try {
        setOrders(JSON.parse(saved));
      } catch {
        setOrders([]);
      }
    }
  }, []);

  if (!mounted) return null;

  return (
    <div className="py-6 md:py-8">
      <h1 className="text-2xl font-heading font-bold text-foreground mb-6">My Orders</h1>

      {orders.length === 0 ? (
        <div className="text-center py-16 bg-muted/30 rounded-2xl">
          <Package className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
          <p className="text-muted-foreground mb-2">No orders yet</p>
          <p className="text-sm text-muted-foreground/70 mb-4">Start shopping to see your orders here.</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground font-medium rounded-xl hover:bg-primary/90 transition-colors"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            const StatusIcon = statusConfig[order.status].icon;
            return (
              <div key={order.id} className="bg-background border border-border rounded-xl p-4 md:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Order ID</p>
                    <p className="font-mono font-semibold">{order.id}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${statusConfig[order.status].color}`}>
                      <StatusIcon className="w-3.5 h-3.5" />
                      {statusConfig[order.status].label}
                    </span>
                    <span className="text-sm text-muted-foreground">{new Date(order.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="space-y-3">
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

                <div className="border-t border-border mt-4 pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="text-sm">
                    <span className="text-muted-foreground">Total: </span>
                    <span className="font-mono font-bold">{formatPrice(order.total)}</span>
                  </div>
                  <Link
                    href={`/orders/${order.id}`}
                    className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                  >
                    View Details <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}