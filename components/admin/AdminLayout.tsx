"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  LayoutDashboard,
  Package,
  Users,
  ShoppingCart,
  Tags,
  Truck,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Store,
  ShieldCheck,
} from "lucide-react";
import { logoutAdmin, isAdmin, getAdminSession } from "@/lib/admin";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/categories", label: "Categories", icon: Tags },
  { href: "/admin/suppliers", label: "Suppliers", icon: Truck },
  { href: "/admin/orders", label: "Orders", icon: ShoppingCart },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const [adminName, setAdminName] = useState("Admin");

  useEffect(() => {
    const checkAuth = () => {
      if (!isAdmin()) {
        router.replace("/admin/login");
      } else {
        setAuthorized(true);
        const session = getAdminSession();
        if (session?.name) setAdminName(session.name);
      }
      setLoading(false);
    };
    checkAuth();
  }, [router]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-muted">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!authorized) return null;

  const handleLogout = () => {
    logoutAdmin();
    router.replace("/admin/login");
  };

  return (
    <div className="flex h-screen bg-muted overflow-hidden">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-[#0f172a] text-white transition-transform duration-300 lg:static lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Store className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight">Thomex</h1>
              <p className="text-[10px] text-white/50 uppercase tracking-wider">Admin Panel</p>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="ml-auto p-1.5 rounded-lg hover:bg-white/10 lg:hidden"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Nav */}
          <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
            {navItems.map((item) => {
              const isActive = router.pathname === item.href || router.pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-white"
                      : "text-white/70 hover:bg-white/10 hover:text-white"
                  )}
                >
                  <item.icon className="h-4 w-4 flex-shrink-0" />
                  <span className="flex-1">{item.label}</span>
                  {isActive && <ChevronRight className="h-3.5 w-3.5" />}
                </Link>
              );
            })}
          </nav>

          {/* Bottom */}
          <div className="border-t border-white/10 p-3 space-y-1">
            <div className="flex items-center gap-3 px-3 py-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20">
                <ShieldCheck className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{adminName}</p>
                <p className="text-xs text-white/50">Administrator</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-white/70 hover:bg-destructive/20 hover:text-destructive transition-colors"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col min-w-0 overflow-hidden">
        {/* Top bar */}
        <header className="flex items-center gap-3 bg-background border-b border-border px-4 py-3 lg:px-6">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/admin" className="hover:text-foreground transition-colors">Admin</Link>
            {router.pathname !== "/admin" && (
              <>
                <ChevronRight className="h-3.5 w-3.5" />
                <span className="text-foreground font-medium capitalize">
                  {router.pathname.replace("/admin/", "").replace(/-/g, " ")}
                </span>
              </>
            )}
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Link
              href="/"
              target="_blank"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted transition-colors"
            >
              <Store className="h-3.5 w-3.5" />
              View Store
            </Link>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}