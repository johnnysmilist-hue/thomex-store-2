"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { ArrowLeft, Save, Trash2 } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { getAdminProducts, updateAdminProduct, deleteAdminProduct } from "@/lib/admin";
import { categories } from "@/lib/data";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";

export default function EditProductPage() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState<Product | null>(null);
  const [saving, setSaving] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  useEffect(() => {
    if (!id) return;
    const products = getAdminProducts();
    const found = products.find((p) => p.id === id);
    if (found) setProduct(found);
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;
    setSaving(true);
    updateAdminProduct(product.id, product);
    setTimeout(() => {
      setSaving(false);
      router.push("/admin/products");
    }, 500);
  };

  const handleDelete = () => {
    if (!product) return;
    deleteAdminProduct(product.id);
    router.push("/admin/products");
  };

  const inputClass = "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary";

  if (!product) {
    return (
      <AdminLayout>
        <div className="flex min-h-[50vh] items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-4 max-w-3xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => router.back()} className="p-2 rounded-lg hover:bg-muted transition">
              <ArrowLeft className="h-4 w-4" />
            </button>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-foreground">Edit Product</h1>
              <p className="text-sm text-muted-foreground">{product.name}</p>
            </div>
          </div>
          <button
            onClick={() => setShowDelete(true)}
            className="inline-flex items-center gap-2 rounded-lg border border-destructive/20 px-3 py-2 text-sm font-medium text-destructive hover:bg-destructive/10 transition"
          >
            <Trash2 className="h-4 w-4" />
            <span className="hidden sm:inline">Delete</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border border-border bg-card p-4 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2 space-y-1.5">
              <label className="text-sm font-medium">Product Name</label>
              <input
                value={product.name}
                onChange={(e) => setProduct({ ...product, name: e.target.value })}
                className={inputClass}
              />
            </div>

            <div className="sm:col-span-2 space-y-1.5">
              <label className="text-sm font-medium">Description</label>
              <textarea
                value={product.description}
                onChange={(e) => setProduct({ ...product, description: e.target.value })}
                rows={3}
                className={inputClass}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium">Price (KSh)</label>
              <input
                type="number"
                value={product.price}
                onChange={(e) => setProduct({ ...product, price: Number(e.target.value) })}
                className={inputClass}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium">Old Price (KSh)</label>
              <input
                type="number"
                value={product.oldPrice || ""}
                onChange={(e) => setProduct({ ...product, oldPrice: e.target.value ? Number(e.target.value) : undefined })}
                className={inputClass}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium">Category</label>
              <select
                value={product.category}
                onChange={(e) => setProduct({ ...product, category: e.target.value })}
                className={inputClass}
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium">SKU</label>
              <input
                value={product.sku || ""}
                onChange={(e) => setProduct({ ...product, sku: e.target.value })}
                className={inputClass}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium">Stock</label>
              <input
                type="number"
                value={product.stock || 0}
                onChange={(e) => setProduct({ ...product, stock: Number(e.target.value) })}
                className={inputClass}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium">Rating</label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="5"
                value={product.rating}
                onChange={(e) => setProduct({ ...product, rating: Number(e.target.value) })}
                className={inputClass}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium">Image URL</label>
              <input
                value={product.image}
                onChange={(e) => setProduct({ ...product, image: e.target.value })}
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
                  checked={product[opt.key as keyof Product] as boolean}
                  onChange={(e) => setProduct({ ...product, [opt.key]: e.target.checked })}
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
              Save Changes
            </button>
          </div>
        </form>
      </div>

      {/* Delete confirmation */}
      {showDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-sm rounded-2xl bg-card p-6 shadow-lg space-y-4">
            <h3 className="text-lg font-semibold">Delete Product?</h3>
            <p className="text-sm text-muted-foreground">{product.name} will be permanently removed.</p>
            <div className="flex gap-2">
              <button onClick={() => setShowDelete(false)} className="flex-1 rounded-lg border border-border px-4 py-2.5 text-sm font-medium hover:bg-muted transition">
                Cancel
              </button>
              <button onClick={handleDelete} className="flex-1 rounded-lg bg-destructive px-4 py-2.5 text-sm font-semibold text-white hover:bg-destructive/90 transition">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}