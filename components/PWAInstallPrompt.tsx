"use client";

import { useState, useEffect } from "react";
import { X, Download, Smartphone } from "lucide-react";
import { usePWA } from "@/hooks/usePWA";

export function PWAInstallPrompt() {
  const { canInstall, promptInstall, isInstalled } = usePWA();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (canInstall && sessionStorage.getItem("thomex-pwa-dismissed") !== "true") {
      // Small delay so it doesn't appear immediately on load
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, [canInstall]);

  const handleInstall = async () => {
    const accepted = await promptInstall();
    if (accepted) setIsVisible(false);
  };

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem("thomex-pwa-dismissed", "true");
  };

  if (!isVisible || isInstalled) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 sm:left-auto sm:right-4 sm:w-[360px] animate-slide-up">
      <div className="rounded-2xl border border-border bg-background p-4 shadow-lg dark:shadow-black/20">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
            <Smartphone className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-foreground">Install Thomex</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Add to your home screen for faster shopping and offline access.
            </p>
          </div>
          <button
            onClick={handleDismiss}
            className="p-1 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted"
            aria-label="Dismiss"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="mt-3 flex items-center gap-2">
          <button
            onClick={handleInstall}
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-primary/90 active:scale-95"
          >
            <Download className="h-4 w-4" />
            Install App
          </button>
          <button
            onClick={handleDismiss}
            className="px-4 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-xl hover:bg-muted"
          >
            Not Now
          </button>
        </div>
      </div>
    </div>
  );
}