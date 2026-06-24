"use client";

import Link from "next/link";
import { Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center text-center px-4">
      <div className="mb-6">
        <h1 className="text-8xl font-extrabold text-primary/20">404</h1>
      </div>
      <h2 className="text-2xl font-bold text-foreground mb-2">Page Not Found</h2>
      <p className="text-muted-foreground max-w-md mb-8">
        Sorry, we couldn&apos;t find the page you requested. It may have been moved, deleted, or never existed.
      </p>
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-primary/90 active:scale-95"
        >
          <Home className="w-4 h-4" />
          Back to Home
        </Link>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-6 py-3 font-semibold text-foreground transition hover:bg-muted active:scale-95"
        >
          <Search className="w-4 h-4" />
          Browse Products
        </Link>
      </div>
    </div>
  );
}