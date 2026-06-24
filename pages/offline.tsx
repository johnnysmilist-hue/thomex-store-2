"use client";

import Link from "next/link";
import { WifiOff, RefreshCw } from "lucide-react";

export default function OfflinePage() {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center px-4">
      <div className="rounded-full bg-muted p-5">
        <WifiOff className="h-10 w-10 text-muted-foreground" />
      </div>
      <h1 className="text-2xl font-heading font-bold text-foreground">You're Offline</h1>
      <p className="max-w-sm text-sm text-muted-foreground">
        It looks like you've lost your internet connection. Some pages may still be available from cache.
      </p>
      <div className="flex flex-col sm:flex-row items-center gap-3 mt-2">
        <button
          onClick={handleRefresh}
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 font-semibold text-white shadow-sm transition hover:bg-primary/90 active:scale-95"
        >
          <RefreshCw className="h-4 w-4" />
          Try Again
        </button>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl border border-border px-6 py-2.5 font-medium text-foreground transition hover:bg-muted"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}