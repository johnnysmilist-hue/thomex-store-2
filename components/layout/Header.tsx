"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
  LogIn,
  UserPlus,
  LogOut,
  Package,
} from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
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
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { totalItems } = useCart();
  const { user, logout } = useAuth();
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
          <Link href="/" className="flex-shrink-0 relative w-[100px] h-[36px] md:w-[120px] md:h-[44px]">
            <Image 
              src="/thomex-logo.png" 
              alt="Thomex" 
              fill
              className="object-contain dark:hidden"
              priority
            />
            <Image 
              src="/thomex-logo-dark.png" 
              alt="Thomex" 
              fill
              className="object-contain hidden dark:block"
              priority
            />
          </Link>

          {/* Home button — visible on non-home pages */}
          {router.pathname !== "/" && (
            <Link
              href="/"
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-muted rounded-lg transition-colors"
            >
              Home
            </Link>
          )}

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

            {user ? (
              /* Logged in — user dropdown */
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 p-1.5 pr-3 hover:bg-muted rounded-xl transition-colors"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <span className="text-sm font-bold">
                      {user.fullName.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="hidden lg:inline text-sm font-medium max-w-[80px] truncate">
                    {user.fullName.split(" ")[0]}
                  </span>
                  <ChevronDown className={cn("w-3.5 h-3.5 transition-transform", userMenuOpen && "rotate-180")} />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 rounded-xl border border-border bg-background shadow-lg overflow-hidden z-50">
                    <div className="px-4 py-3 border-b border-border bg-muted/50">
                      <p className="text-sm font-semibold text-foreground truncate">{user.fullName}</p>
                      <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                    </div>
                    <div className="p-1">
                      <Link
                        href="/account"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 text-sm text-foreground hover:bg-muted rounded-lg transition-colors"
                      >
                        <User className="w-4 h-4 text-primary" />
                        My Account
                      </Link>
                      <Link
                        href="/orders"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 text-sm text-foreground hover:bg-muted rounded-lg transition-colors"
                      >
                        <Package className="w-4 h-4 text-primary" />
                        My Orders
                      </Link>
                      <button
                        onClick={() => { logout(); setUserMenuOpen(false); }}
                        className="flex w-full items-center gap-2.5 px-3 py-2 text-sm text-destructive hover:bg-destructive/5 rounded-lg transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Logged out — login/signup buttons */
              <>
                <Link
                  href="/login"
                  className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-primary hover:bg-primary/5 rounded-xl transition-colors"
                >
                  <LogIn className="w-4 h-4" />
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="hidden md:flex items-center gap-1.5 px-3 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors shadow-sm"
                >
                  <UserPlus className="w-4 h-4" />
                  Sign Up
                </Link>
                <Link
                  href="/login"
                  className="sm:hidden p-2 hover:bg-muted rounded-lg transition-colors"
                >
                  <User className="w-5 h-5" />
                </Link>
              </>
            )}

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
            {user && (
              <div className="px-3 py-2 mb-1">
                <div className="flex items-center gap-3 rounded-lg bg-muted p-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <span className="text-base font-bold">{user.fullName.charAt(0).toUpperCase()}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">{user.fullName}</p>
                    <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                  </div>
                </div>
              </div>
            )}
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
            {user ? (
              <>
                <Link
                  href="/account"
                  className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <User className="w-4 h-4 text-primary" />
                  My Account
                </Link>
                <Link
                  href="/orders"
                  className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Package className="w-4 h-4 text-primary" />
                  My Orders
                </Link>
                <button
                  onClick={() => { logout(); setMobileMenuOpen(false); }}
                  className="flex w-full items-center gap-3 px-3 py-2.5 text-sm font-medium text-destructive hover:bg-destructive/5 rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-primary hover:bg-primary/5 rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <LogIn className="w-4 h-4" />
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-primary hover:bg-primary/5 rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <UserPlus className="w-4 h-4" />
                  Create Account
                </Link>
              </>
            )}
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
          </div>
        </div>
      )}
    </header>
  );
}