"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { User, Mail, Phone, Calendar, LogOut, ShoppingBag, MapPin, Heart, ChevronRight } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { formatPrice } from "@/lib/data";
import { cn } from "@/lib/utils";

// Mock order history
const mockOrders = [
  {
    id: "ORD-001",
    date: "2026-06-20",
    status: "Delivered",
    total: 54999,
    items: 2,
  },
  {
    id: "ORD-002",
    date: "2026-06-15",
    status: "In Transit",
    total: 12999,
    items: 1,
  },
];

export default function AccountPage() {
  const router = useRouter();
  const { user, isLoading, logout } = useAuth();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="space-y-6 pb-8 sm:pb-12">
      <h1 className="text-xl font-bold text-foreground sm:text-2xl">My Account</h1>

      {/* Profile Card */}
      <div className="rounded-2xl border border-border bg-background p-5 sm:p-6">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
            <User className="h-8 w-8" />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-bold text-foreground">{user.fullName}</h2>
            <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Mail className="h-3.5 w-3.5" />
                {user.email}
              </span>
              <span className="flex items-center gap-1">
                <Phone className="h-3.5 w-3.5" />
                {user.phone}
              </span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              <Calendar className="inline h-3 w-3 mr-1" />
              Member since {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>
          <button
            onClick={() => { logout(); router.push("/"); }}
            className="flex items-center gap-1.5 rounded-xl border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm font-medium text-destructive transition hover:bg-destructive/10"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { icon: ShoppingBag, label: "My Orders", href: "/orders", color: "text-primary", bg: "bg-primary/10" },
          { icon: Heart, label: "Wishlist", href: "/wishlist", color: "text-accent", bg: "bg-accent/10" },
          { icon: MapPin, label: "Addresses", href: "/addresses", color: "text-success", bg: "bg-success/10" },
          { icon: User, label: "Profile", href: "/profile", color: "text-warning", bg: "bg-warning/10" },
        ].map((action) => (
          <Link
            key={action.label}
            href={action.href}
            className="flex flex-col items-center gap-2 rounded-xl border border-border bg-background p-4 transition hover:shadow-md hover:-translate-y-0.5"
          >
            <div className={cn("rounded-full p-2", action.bg)}>
              <action.icon className={cn("h-5 w-5", action.color)} />
            </div>
            <span className="text-sm font-medium text-foreground">{action.label}</span>
          </Link>
        ))}
      </div>

      {/* Order History */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-foreground sm:text-lg">Recent Orders</h2>
          <Link href="/orders" className="text-sm font-medium text-primary hover:underline">
            View All
          </Link>
        </div>

        {mockOrders.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border bg-muted p-8 text-center">
            <ShoppingBag className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">No orders yet</p>
            <Link href="/" className="mt-2 inline-block text-sm font-medium text-primary hover:underline">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-2">
            {mockOrders.map((order) => (
              <Link
                key={order.id}
                href={`/orders/${order.id}`}
                className="flex items-center justify-between rounded-xl border border-border bg-background p-4 transition hover:shadow-sm"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-foreground">{order.id}</span>
                    <span className={cn(
                      "rounded-full px-2 py-0.5 text-[10px] font-bold",
                      order.status === "Delivered" ? "bg-success/10 text-success" : "bg-primary/10 text-primary"
                    )}>
                      {order.status}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {new Date(order.date).toLocaleDateString()} · {order.items} item{order.items > 1 ? "s" : ""}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="price-tabular font-bold text-foreground">{formatPrice(order.total)}</span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}