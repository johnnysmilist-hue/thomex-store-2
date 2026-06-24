"use client";

import { useState, useEffect } from "react";
import { Package, Truck, CheckCircle, Clock, XCircle, Eye, Filter, ChevronDown } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { getAllOrders, updateOrderStatus } from "@/lib/admin";
import { formatPrice } from "@/lib/data";
import { cn } from "@/lib/utils";
import type { Order } from "@/types";

const statusIcons: Record<string, React.ReactNode> = {
  pending: <Clock className="h-3.5 w-3.5" />,
  processing: <Package className="h-3.5 w-3.5" />,
  shipped: <Truck className="h-3.5 w-3.5" />,
  delivered: <CheckCircle className="h-3.5 w-3.5" />,
  cancelled: <XCircle className="h-3.5 w-3.5" />,
};

const statusColors: Record<string, string> = {
  pending: "bg-warning/10 text-warning",
  processing: "bg-primary/10 text-primary",
  shipped: "bg-accent/10 text-accent",
  delivered: "bg-success/10 text-success",
  cancelled: "bg-destructive/10 text-destructive",
};

const statusOptions: Order["status"][] = ["pending", "processing", "shipped", "delivered", "cancelled"];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState<Order["status"] | "all">("all");
  const [mounted, setMounted] = useState(false);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    setOrders(getAllOrders());
  }, []);

  const handleStatusChange = (orderId: string, status: Order["status"]) => {
    updateOrderStatus(orderId, status);
    setOrders(getAllOrders());
  };

  const filtered = filter === "all" ? orders : orders.filter((o) => o.status === filter);

  if (!mounted) return null;

  return (
    <AdminLayout>
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-foreground">Orders</h1>
            <p className="text-sm text-muted-foreground">{orders.length} total orders</p>
          </div>
          <div className="relative">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as Order["status"] | "all")}
              className="appearance-none rounded-lg border border-border bg-background px-4 py-2 pr-10 text-sm focus:outline-none focus:border-primary"
            >
              <option value="all">All Status</option>
              {statusOptions.map((s) => (
                <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          </div>
        </div>

        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-card py-16">
            <Package className="h-10 w-10 text-muted-foreground/40 mb-3" />
            <p className="text-sm text-muted-foreground">No orders yet</p>
          </div>
        ) : (
          <div className="space-y-2">
            {filtered.map((order) => (
              <div key={order.id} className="rounded-xl border border-border bg-card overflow-hidden">
                <div
                  className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-muted/50 transition"
                  onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                >
                  <div className="flex items-center gap-3">
                    <span className={cn("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium", statusColors[order.status])}>
                      {statusIcons[order.status]}
                      {order.status}
                    </span>
                    <span className="text-sm font-medium">{order.id}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="price-tabular text-sm font-semibold">{formatPrice(order.total)}</span>
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>

                {expandedOrder === order.id && (
                  <div className="px-4 pb-4 border-t border-border pt-3 space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Customer</p>
                        <p className="font-medium">{order.shippingAddress.fullName}</p>
                        <p className="text-muted-foreground">{order.shippingAddress.phone}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Shipping Address</p>
                        <p>{order.shippingAddress.address}</p>
                        <p className="text-muted-foreground">{order.shippingAddress.city}, {order.shippingAddress.region}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Payment</p>
                        <p>{order.paymentMethod}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Date</p>
                        <p>{new Date(order.createdAt).toLocaleDateString("en-KE")}</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-xs text-muted-foreground mb-2">Items</p>
                      <div className="space-y-1.5">
                        {order.items.map((item, i) => (
                          <div key={i} className="flex justify-between text-sm">
                            <span>{item.product.name} x{item.quantity}</span>
                            <span className="price-tabular">{formatPrice(item.product.price * item.quantity)}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-2">
                      <span className="text-xs text-muted-foreground">Update status:</span>
                      {statusOptions.map((s) => (
                        <button
                          key={s}
                          onClick={() => handleStatusChange(order.id, s)}
                          className={cn(
                            "px-2.5 py-1 rounded-full text-xs font-medium transition",
                            order.status === s
                              ? statusColors[s]
                              : "bg-muted text-muted-foreground hover:bg-muted/80"
                          )}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}