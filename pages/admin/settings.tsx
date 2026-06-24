"use client";

import { useState, useEffect } from "react";
import { Save, Store, Mail, Phone, DollarSign, Truck, Percent } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { getSettings, saveSettings, defaultSettings } from "@/lib/admin";
import { cn } from "@/lib/utils";
import type { SiteSettings } from "@/lib/admin";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [saved, setSaved] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setSettings(getSettings());
  }, []);

  const handleSave = () => {
    saveSettings(settings);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (!mounted) return null;

  return (
    <AdminLayout>
      <div className="space-y-4 max-w-2xl">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-foreground">Settings</h1>
          <p className="text-sm text-muted-foreground">Configure your store preferences</p>
        </div>

        <div className="space-y-4 rounded-xl border border-border bg-card p-4 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium flex items-center gap-2">
                <Store className="h-3.5 w-3.5 text-muted-foreground" />
                Store Name
              </label>
              <input
                value={settings.storeName}
                onChange={(e) => setSettings({ ...settings, storeName: e.target.value })}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:border-primary"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium flex items-center gap-2">
                <DollarSign className="h-3.5 w-3.5 text-muted-foreground" />
                Currency
              </label>
              <select
                value={settings.currency}
                onChange={(e) => setSettings({ ...settings, currency: e.target.value })}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:border-primary"
              >
                <option value="KSh">KSh (Kenyan Shilling)</option>
                <option value="USD">$ (US Dollar)</option>
                <option value="EUR">€ (Euro)</option>
                <option value="GBP">£ (British Pound)</option>
                <option value="UGX">UGX (Ugandan Shilling)</option>
                <option value="TZS">TZS (Tanzanian Shilling)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                Store Email
              </label>
              <input
                type="email"
                value={settings.storeEmail}
                onChange={(e) => setSettings({ ...settings, storeEmail: e.target.value })}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:border-primary"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                Store Phone
              </label>
              <input
                value={settings.storePhone}
                onChange={(e) => setSettings({ ...settings, storePhone: e.target.value })}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:border-primary"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium flex items-center gap-2">
                <Truck className="h-3.5 w-3.5 text-muted-foreground" />
                Free Shipping Threshold (KSh)
              </label>
              <input
                type="number"
                min="0"
                value={settings.freeShippingThreshold}
                onChange={(e) => setSettings({ ...settings, freeShippingThreshold: Number(e.target.value) })}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:border-primary"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium flex items-center gap-2">
                <Percent className="h-3.5 w-3.5 text-muted-foreground" />
                Tax Rate (%)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={settings.taxRate}
                onChange={(e) => setSettings({ ...settings, taxRate: Number(e.target.value) })}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-border">
            <button
              onClick={handleSave}
              className={cn(
                "inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition",
                saved ? "bg-success" : "bg-primary hover:bg-primary/90"
              )}
            >
              <Save className="h-4 w-4" />
              {saved ? "Saved!" : "Save Settings"}
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}