---
title: Dark/Light Mode + PWA Cross-Platform Support
status: done
priority: urgent
type: feature
tags: [theme, dark-mode, pwa, responsive]
created_by: agent
created_at: 2026-06-24T09:15:00Z
position: 6
---

## Notes
Dark/light theme toggle + PWA installability for Android, iOS, and desktop.

## Checklist
- [x] Install next-themes for theme management
- [x] Build ThemeProvider with next-themes
- [x] Build ThemeSwitch component (dropdown + icons)
- [x] Add .dark CSS variables for dark mode palette
- [x] Wire ThemeProvider into _app.tsx with suppressHydrationWarning
- [x] Add ThemeSwitch to Header (desktop + mobile)
- [x] Create PWA manifest.json with icons, display modes
- [x] Add PWA meta tags to _document.tsx (viewport-fit, theme-color, apple-mobile-web-app)

## Acceptance
- Theme switcher toggles between light, dark, and system
- Dark mode renders purple/navy palette correctly on all components
- PWA manifest allows "Add to Home Screen" on Android and iOS
- Site is responsive on mobile, tablet, and desktop
---

@import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --radius: 0.75rem;
    --background: 0 0% 100%;
    --foreground: 220 13% 9%;
    --card: 0 0% 100%;
    --card-foreground: 220 13% 9%;
    --popover: 0 0% 100%;
    --popover-foreground: 220 13% 9%;
    --primary: 24 95% 53%;
    --primary-foreground: 0 0% 100%;
    --secondary: 220 13% 9%;
    --secondary-foreground: 0 0% 100%;
    --muted: 210 40% 96%;
    --muted-foreground: 215 16% 47%;
    --accent: 0 79% 54%;
    --accent-foreground: 0 0% 100%;
    --destructive: 0 79% 54%;
    --destructive-foreground: 0 0% 100%;
    --border: 214 32% 91%;
    --input: 214 32% 91%;
    --ring: 24 95% 53%;
    --success: 142 71% 45%;
    --warning: 38 92% 50%;
    --chart-1: 24 95% 53%;
    --chart-2: 0 79% 54%;
    --chart-3: 142 71% 45%;
    --chart-4: 38 92% 50%;
    --chart-5: 220 13% 9%;
    --sidebar: 0 0% 98%;
    --sidebar-foreground: 220 13% 9%;
    --sidebar-primary: 24 95% 53%;
    --sidebar-primary-foreground: 0 0% 100%;
    --sidebar-accent: 210 40% 96%;
    --sidebar-accent-foreground: 220 13% 9%;
    --sidebar-border: 214 32% 91%;
    --sidebar-ring: 24 95% 53%;
  }

  .dark {
    --background: 220 20% 6%;
    --foreground: 210 40% 96%;
    --card: 220 18% 10%;
    --card-foreground: 210 40% 96%;
    --popover: 220 18% 10%;
    --popover-foreground: 210 40% 96%;
    --primary: 24 95% 53%;
    --primary-foreground: 0 0% 100%;
    --secondary: 210 20% 18%;
    --secondary-foreground: 210 40% 96%;
    --muted: 220 16% 14%;
    --muted-foreground: 215 16% 60%;
    --accent: 0 79% 54%;
    --accent-foreground: 0 0% 100%;
    --destructive: 0 79% 54%;
    --destructive-foreground: 0 0% 100%;
    --border: 220 14% 18%;
    --input: 220 14% 18%;
    --ring: 24 95% 53%;
    --success: 142 71% 45%;
    --warning: 38 92% 50%;
    --chart-1: 24 95% 53%;
    --chart-2: 0 79% 54%;
    --chart-3: 142 71% 45%;
    --chart-4: 38 92% 50%;
    --chart-5: 210 40% 96%;
    --sidebar: 220 18% 10%;
    --sidebar-foreground: 210 40% 96%;
    --sidebar-primary: 24 95% 53%;
    --sidebar-primary-foreground: 0 0% 100%;
    --sidebar-accent: 220 16% 14%;
    --sidebar-accent-foreground: 210 40% 96%;
    --sidebar-border: 220 14% 18%;
    --sidebar-ring: 24 95% 53%;
  }

  * {
    @apply border-border;
  }

  body {
    @apply bg-background text-foreground font-sans antialiased transition-colors duration-300;
  }

  h1, h2, h3, h4, h5, h6 {
    @apply font-heading font-bold tracking-tight;
  }
}

@layer components {
  .container-market {
    @apply mx-auto px-3 md:px-4 lg:px-6 max-w-[1440px] w-full;
  }

  .product-grid {
    @apply grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4;
  }

  .deal-badge {
    @apply inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-accent text-accent-foreground;
  }

  .category-pill {
    @apply inline-flex items-center px-4 py-2 rounded-full text-sm font-medium border border-primary/20 bg-card text-primary hover:bg-primary hover:text-primary-foreground transition-colors;
  }
}

@layer utilities {
  .text-balance {
    text-wrap: balance;
  }

  .price-tabular {
    @apply font-mono font-semibold tabular-nums;
  }
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  X,
  Smartphone,
  Shirt,
  Home,
  Heart,
  Dumbbell,
  Apple,
  Gamepad2,
  Car,
  ChevronDown,
} from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { categories } from "@/lib/data";
import { cn } from "@/lib/utils";
import { ThemeSwitch } from "@/components/ThemeSwitch";

const iconMap: Record<string, React.ReactNode> = {
  Smartphone: <Smartphone className="w-4 h-4" />,
  Shirt: <Shirt className="w-4 h-4" />,
  Home: <Home className="w-4 h-4" />,
  Heart: <Heart className="w-4 h-4" />,
  Dumbbell: <Dumbbell className="w-4 h-4" />,
  Apple: <Apple className="w-4 h-4" />,
  Gamepad2: <Gamepad2 className="w-4 h-4" />,
  Car: <Car className="w-4 h-4" />,
};

export function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const { totalItems } = useCart();
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-background shadow-sm transition-colors duration-300">
      {/* Top bar */}
      <div className="bg-primary text-primary-foreground text-xs py-1.5">
        <div className="container-market flex items-center justify-between">
          <p className="hidden sm:block">Free delivery on orders over KSh 5,000</p>
          <div className="flex items-center gap-4 ml-auto">
            <Link href="/help" className="hover:underline">Help Center</Link>
            <Link href="/sell" className="hover:underline">Sell on Thomex</Link>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container-market py-3 md:py-4">
        <div className="flex items-center gap-3 md:gap-6">
          {/* Mobile menu toggle */}
          <button
            className="lg:hidden p-2 -ml-2 hover:bg-muted rounded-lg"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <div className="flex items-center">
              <img 
                src="/thomex-logo.png" 
                alt="Thomex" 
                className="h-8 md:h-10 w-auto object-contain"
              />
            </div>
          </Link>

          {/* Search */}
          <form
            onSubmit={handleSearch}
            className={cn(
              "flex-1 max-w-2xl hidden md:flex",
              searchFocused && "ring-2 ring-primary/30 rounded-xl"
            )}
          >
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search products, brands, categories..."
                className="w-full pl-4 pr-12 py-2.5 bg-muted rounded-xl border border-border focus:outline-none focus:border-primary text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Actions */}
          <div className="flex items-center gap-1 md:gap-3 ml-auto">
            <button
              className="md:hidden p-2 hover:bg-muted rounded-lg"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Search className="w-5 h-5" />
            </button>
            <div className="hidden md:flex">
              <ThemeSwitch />
            </div>
            <Link
              href="/account"
              className="flex items-center gap-1.5 p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <User className="w-5 h-5" />
              <span className="hidden lg:inline text-sm font-medium">Account</span>
            </Link>
            <Link
              href="/cart"
              className="flex items-center gap-1.5 p-2 hover:bg-muted rounded-lg transition-colors relative"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="hidden lg:inline text-sm font-medium">Cart</span>
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-accent text-accent-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile search */}
        <form
          onSubmit={handleSearch}
          className={cn(
            "mt-2 md:hidden",
            !mobileMenuOpen && "flex",
            mobileMenuOpen && "hidden"
          )}
        >
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-4 pr-10 py-2 bg-muted rounded-lg border border-border focus:outline-none focus:border-primary text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2"
            >
              <Search className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        </form>
      </div>

      {/* Category nav - desktop */}
      <nav className="hidden lg:block border-t border-border">
        <div className="container-market">
          <div className="flex items-center gap-1 py-2 overflow-x-auto scrollbar-hide">
            <Link
              href="/products"
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-foreground hover:text-primary hover:bg-muted rounded-lg transition-colors whitespace-nowrap"
            >
              All Categories
              <ChevronDown className="w-3.5 h-3.5" />
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-muted rounded-lg transition-colors whitespace-nowrap"
              >
                {iconMap[cat.icon]}
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-border bg-background animate-fade-in">
          <div className="container-market py-3 space-y-1">
            <div className="flex items-center justify-between px-3 py-2">
              <span className="text-sm font-medium text-muted-foreground">Theme</span>
              <ThemeSwitch />
            </div>
            <div className="border-t border-border my-2" />
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="text-primary">{iconMap[cat.icon]}</span>
                {cat.name}
              </Link>
            ))}
            <div className="border-t border-border my-2" />
            <Link
              href="/products"
              className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              All Products
            </Link>
            <Link
              href="/deals"
              className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-accent hover:bg-muted rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Flash Deals
            </Link>
            <Link
              href="/orders"
              className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              My Orders
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

import { Toaster } from "@/components/ui/toaster";
import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/SEO";
import { ThemeProvider } from "@/contexts/ThemeProvider";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Layout>
        <SEO
          title="Thomex - East Africa's Marketplace"
          description="Shop electronics, fashion, home & living, groceries and more on Thomex. Great prices, fast delivery across Kenya."
        />
        <Component {...pageProps} />
        <Toaster />
      </Layout>
    </ThemeProvider>
  );
}

{
  "name": "Thomex - East Africa's Marketplace",
  "short_name": "Thomex",
  "description": "Shop electronics, fashion, home & living, groceries and more. Great prices, fast delivery.",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#F97316",
  "orientation": "portrait",
  "scope": "/",
  "icons": [
    {
      "src": "/thomex-logo.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/thomex-logo.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any maskable"
    }
  ],
  "categories": ["shopping", "lifestyle", "business"],
  "lang": "en",
  "dir": "ltr"
}