"use client";

import { useState, useEffect } from "react";
import { TrendingUp, DollarSign, ShoppingBag, Users, Package, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { getDashboardStats, getRecentOrders, getTopProducts } from "@/lib/admin";
import { formatPrice } from "@/lib/data";
import { cn } from "@/lib/utils";

export default function AdminAnalyticsPage() {
  const [stats, setStats] = useState<ReturnType<typeof getDashboardStats> | null>(null);
  const [topProducts, setTopProducts] = useState<ReturnType<typeof getTopProducts>>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setStats(getDashboardStats());
    setTopProducts(getTopProducts());
  }, []);

  if (!mounted || !stats) return null;

  const statCards = [
    { label: "Total Revenue", value: formatPrice(stats.totalRevenue), icon: DollarSign, color: "text-success", bg: "bg-success/10" },
    { label: "Total Orders", value: stats.totalOrders.toString(), icon: ShoppingBag, color: "text-primary", bg: "bg-primary/10" },
    { label: "Products", value: stats.totalProducts.toString(), icon: Package, color: "text-accent", bg: "bg-accent/10" },
    { label: "Users", value: stats.totalUsers.toString(), icon: Users, color: "text-warning", bg: "bg-warning/10" },
  ];

  const statusBreakdown = [
    { label: "Pending", value: stats.pendingOrders, color: "bg-warning" },
    { label: "Processing", value: stats.processingOrders, color: "bg-primary" },
    { label: "Shipped", value: stats.shippedOrders, color: "bg-accent" },
    { label: "Delivered", value: stats.deliveredOrders, color: "bg-success" },
  ];

  const maxStatus = Math.max(...statusBreakdown.map((s) => s.value), 1);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-foreground">Analytics</h1>
          <p className="text-sm text-muted-foreground">Business performance overview</p>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {statCards.map((card) => (
            <div key={card.label} className="rounded-xl border border-border bg-card p-4 space-y-2">
              <div className={cn("inline-flex h-8 w-8 items-center justify-center rounded-lg", card.bg)}>
                <card.icon className={cn("h-4 w-4", card.color)} />
              </div>
              <p className="price-tabular text-lg sm:text-xl font-bold text-foreground">{card.value}</p>
              <p className="text-xs text-muted-foreground">{card.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Order status breakdown */}
          <div className="rounded-xl border border-border bg-card p-4 sm:p-6 space-y-4">
            <h2 className="text-sm font-semibold text-foreground">Order Status Breakdown</h2>
            <div className="space-y-3">
              {statusBreakdown.map((s) => (
                <div key={s.label} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">{s.label}</span>
                    <span className="font-medium">{s.value}</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div
                      className={cn("h-full rounded-full transition-all", s.color)}
                      style={{ width: `${(s.value / maxStatus) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top products */}
          <div className="rounded-xl border border-border bg-card p-4 sm:p-6 space-y-4">
            <h2 className="text-sm font-semibold text-foreground">Top Selling Products</h2>
            {topProducts.length === 0 ? (
              <p className="text-sm text-muted-foreground py-4">No sales data yet</p>
            ) : (
              <div className="space-y-3">
                {topProducts.map((item, i) => (
                  <div key={item.product.id} className="flex items-center gap-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-xs font-bold">
                      {i + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{item.product.name}</p>
                      <p className="text-xs text-muted-foreground">{item.count} sold · {formatPrice(item.revenue)}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Today snapshot */}
        <div className="rounded-xl border border-border bg-primary/5 p-4 sm:p-6">
          <h2 className="text-sm font-semibold text-foreground mb-3">Today</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <p className="price-tabular text-xl font-bold text-foreground">{stats.todayOrders}</p>
              <p className="text-xs text-muted-foreground">New Orders</p>
            </div>
            <div>
              <p className="price-tabular text-xl font-bold text-success">{formatPrice(stats.todayRevenue)}</p>
              <p className="text-xs text-muted-foreground">Revenue</p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}