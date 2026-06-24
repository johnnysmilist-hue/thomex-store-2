"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  DollarSign,
  ShoppingBag,
  Package,
  Truck,
  Users,
  TrendingUp,
  ArrowUpRight,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { getDashboardStats, getRecentOrders, getTopProducts } from "@/lib/admin";
import { formatPrice } from "@/lib/data";
import { cn } from "@/lib/utils";
import type { Order } from "@/types";

const statusConfig = {
  pending: { icon: Clock, label: "Pending", color: "text-warning bg-warning/10 border-warning/20" },
  processing: { icon: AlertCircle, label: "Processing", color: "text-primary bg-primary/10 border-primary/20" },
  shipped: { icon: Truck, label: "Shipped", color: "text-info bg-info/10 border-info/20" },
  delivered: { icon: CheckCircle, label: "Delivered", color: "text-success bg-success/10 border-success/20" },
  cancelled: { icon: AlertCircle, label: "Cancelled", color: "text-muted-foreground bg-muted border-border" },
};

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<ReturnType<typeof getDashboardStats> | null>(null);
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [topProducts, setTopProducts] = useState<ReturnType<typeof getTopProducts>>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setStats(getDashboardStats());
    setRecentOrders(getRecentOrders(5));
    setTopProducts(getTopProducts(5));
  }, []);

  if (!mounted) return null;

  const statCards = [
    { label: "Total Revenue", value: formatPrice(stats?.totalRevenue || 0), icon: DollarSign, trend: "+12%", color: "text-success" },
    { label: "Total Orders", value: stats?.totalOrders || 0, icon: ShoppingBag, trend: "+5%", color: "text-primary" },
    { label: "Products", value: stats?.totalProducts || 0, icon: Package, trend: null, color: "text-accent" },
    { label: "Suppliers", value: stats?.totalSuppliers || 0, icon: Truck, trend: null, color: "text-warning" },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-sm text-muted-foreground">Overview of your store performance</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {statCards.map((card) => (
            <div key={card.label} className="rounded-xl border border-border bg-card p-4 shadow-sm">
              <div className="flex items-start justify-between">
                <div className={cn("p-2 rounded-lg", card.color.replace("text-", "bg-").replace("500", "100").replace("600", "100"))}>
                  <card.icon className={cn("h-5 w-5", card.color)} />
                </div>
                {card.trend && (
                  <span className="inline-flex items-center gap-0.5 text-xs font-medium text-success">
                    <TrendingUp className="h-3 w-3" />
                    {card.trend}
                  </span>
                )}
              </div>
              <div className="mt-3">
                <p className="text-xs text-muted-foreground">{card.label}</p>
                <p className="text-lg sm:text-xl font-bold text-foreground mt-0.5">{card.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Order status breakdown */}
        <div className="rounded-xl border border-border bg-card p-4 sm:p-5">
          <h2 className="text-sm font-semibold text-foreground mb-3">Order Status</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "Pending", value: stats?.pendingOrders || 0, color: "text-warning" },
              { label: "Processing", value: stats?.processingOrders || 0, color: "text-primary" },
              { label: "Shipped", value: stats?.shippedOrders || 0, color: "text-info" },
              { label: "Delivered", value: stats?.deliveredOrders || 0, color: "text-success" },
            ].map((item) => (
              <div key={item.label} className="text-center p-3 rounded-lg bg-muted/50">
                <p className={cn("text-xl sm:text-2xl font-bold", item.color)}>{item.value}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
          {/* Recent Orders */}
          <div className="rounded-xl border border-border bg-card shadow-sm">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h2 className="text-sm font-semibold text-foreground">Recent Orders</h2>
              <Link
                href="/admin/orders"
                className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
              >
                View All <ArrowUpRight className="h-3 w-3" />
              </Link>
            </div>
            <div className="divide-y divide-border">
              {recentOrders.length === 0 ? (
                <div className="p-8 text-center text-sm text-muted-foreground">No orders yet</div>
              ) : (
                recentOrders.map((order) => {
                  const StatusIcon = statusConfig[order.status].icon;
                  return (
                    <div key={order.id} className="flex items-center gap-3 p-3 sm:p-4">
                      <div className={cn("flex h-9 w-9 items-center justify-center rounded-lg border", statusConfig[order.status].color)}>
                        <StatusIcon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{order.id}</p>
                        <p className="text-xs text-muted-foreground">{new Date(order.createdAt).toLocaleDateString()}</p>
                      </div>
                      <p className="text-sm font-mono font-semibold">{formatPrice(order.total)}</p>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Top Products */}
          <div className="rounded-xl border border-border bg-card shadow-sm">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h2 className="text-sm font-semibold text-foreground">Top Products</h2>
              <Link
                href="/admin/products"
                className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
              >
                View All <ArrowUpRight className="h-3 w-3" />
              </Link>
            </div>
            <div className="divide-y divide-border">
              {topProducts.length === 0 ? (
                <div className="p-8 text-center text-sm text-muted-foreground">No sales data yet</div>
              ) : (
                topProducts.map((item, i) => (
                  <div key={item.product.id} className="flex items-center gap-3 p-3 sm:p-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                      {i + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{item.product.name}</p>
                      <p className="text-xs text-muted-foreground">{item.count} sold</p>
                    </div>
                    <p className="text-sm font-mono font-semibold">{formatPrice(item.revenue)}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}