"use client";

import { useState } from "react";
import { useRouter } from "next/router";
import { ArrowLeft, Save, Plus, ImageIcon } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { addAdminProduct } from "@/lib/admin";
import { categories } from "@/lib/data";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";

export default function NewProductPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    oldPrice: "",
    category: "",
    sku: "",
    stock: "",
    rating: "4.5",
    reviewCount: "0",
    image: "",
    freeShipping: false,
    featured: false,
    deal: false,
    tags: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const product: Product = {
      id: "prod_" + Date.now(),
      name: form.name,
      description: form.description,
      price: Number(form.price),
      oldPrice: form.oldPrice ? Number(form.oldPrice) : undefined,
      category: form.category,
      sku: form.sku || undefined,
      stock: Number(form.stock) || 0,
      rating: Number(form.rating),
      reviewCount: Number(form.reviewCount),
      image: form.image || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
      gallery: [],
      freeShipping: form.freeShipping,
      featured: form.featured,
      deal: form.deal,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
      createdAt: new Date().toISOString(),
    };

    addAdminProduct(product);
    setTimeout(() => {
      setSaving(false);
      router.push("/admin/products");
    }, 500);
  };

  const inputClass = "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary";

  return (
    <AdminLayout>
      <div className="space-y-4 max-w-3xl">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="p-2 rounded-lg hover:bg-muted transition"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-foreground">Add Product</h1>
            <p className="text-sm text-muted-foreground">Create a new product listing</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border border-border bg-card p-4 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2 space-y-1.5">
              <label className="text-sm font-medium">Product Name *</label>
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. Samsung Galaxy S24 Ultra"
                className={inputClass}
              />
            </div>

            <div className="sm:col-span-2 space-y-1.5">
              <label className="text-sm font-medium">Description</label>
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Product description..."
                rows={3}
                className={inputClass}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium">Price (KSh) *</label>
              <input
                required
                type="number"
                min="0"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                placeholder="e.g. 150000"
                className={inputClass}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium">Old Price (KSh)</label>
              <input
                type="number"
                min="0"
                value={form.oldPrice}
                onChange={(e) => setForm({ ...form, oldPrice: e.target.value })}
                placeholder="For deals / discounts"
                className={inputClass}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium">Category *</label>
              <select
                required
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className={inputClass}
              >
                <option value="">Select category</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium">SKU</label>
              <input
                value={form.sku}
                onChange={(e) => setForm({ ...form, sku: e.target.value })}
                placeholder="e.g. SAM-S24U-256"
                className={inputClass}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium">Stock *</label>
              <input
                required
                type="number"
                min="0"
                value={form.stock}
                onChange={(e) => setForm({ ...form, stock: e.target.value })}
                placeholder="Available quantity"
                className={inputClass}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium">Image URL</label>
              <input
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
                placeholder="https://..."
                className={inputClass}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium">Tags</label>
              <input
                value={form.tags}
                onChange={(e) => setForm({ ...form, tags: e.target.value })}
                placeholder="samsung, phone, android (comma separated)"
                className={inputClass}
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            {[
              { key: "freeShipping", label: "Free Shipping" },
              { key: "featured", label: "Featured" },
              { key: "deal", label: "Flash Deal" },
            ].map((opt) => (
              <label key={opt.key} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form[opt.key as keyof typeof form] as boolean}
                  onChange={(e) => setForm({ ...form, [opt.key]: e.target.checked })}
                  className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                />
                <span className="text-sm">{opt.label}</span>
              </label>
            ))}
          </div>

          <div className="flex items-center gap-3 pt-4 border-t border-border">
            <button
              type="button"
              onClick={() => router.back()}
              className="rounded-lg border border-border px-5 py-2.5 text-sm font-medium hover:bg-muted transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className={cn(
                "inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary/90 transition",
                saving && "opacity-70 cursor-not-allowed"
              )}
            >
              {saving ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                <Save className="h-4 w-4" />
              )}
              Save Product
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}