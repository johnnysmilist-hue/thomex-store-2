"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Search, Pencil, Trash2, Package, Eye, Filter } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { getAdminProducts, deleteAdminProduct } from "@/lib/admin";
import { formatPrice } from "@/lib/data";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setProducts(getAdminProducts());
  }, []);

  const categories = Array.from(new Set(products.map((p) => p.category)));

  const filtered = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.sku?.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = !categoryFilter || p.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleDelete = (id: string) => {
    deleteAdminProduct(id);
    setProducts(getAdminProducts());
    setDeleteId(null);
  };

  if (!mounted) return null;

  return (
    <AdminLayout>
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-foreground">Products</h1>
            <p className="text-sm text-muted-foreground">{products.length} products in catalog</p>
          </div>
          <Link
            href="/admin/products/new"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary/90 transition active:scale-95"
          >
            <Plus className="h-4 w-4" />
            Add Product
          </Link>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-border bg-background pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:border-primary"
          >
            <option value="">All Categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Products Grid */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-card py-16">
            <Package className="h-10 w-10 text-muted-foreground/40 mb-3" />
            <p className="text-sm text-muted-foreground">No products found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
            {filtered.map((product) => (
              <div key={product.id} className="group rounded-xl border border-border bg-card overflow-hidden hover:shadow-md transition-all">
                <div className="relative aspect-square bg-muted">
                  <Image src={product.image} alt={product.name} fill className="object-cover" sizes="300px" />
                  {product.oldPrice && (
                    <span className="absolute top-2 left-2 rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold text-white">
                      -{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
                    </span>
                  )}
                </div>
                <div className="p-3 space-y-2">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">{product.category}</p>
                  <h3 className="text-sm font-semibold text-foreground line-clamp-1">{product.name}</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="font-mono font-bold text-sm">{formatPrice(product.price)}</span>
                    {product.oldPrice && (
                      <span className="text-xs text-muted-foreground line-through">{formatPrice(product.oldPrice)}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <span className={cn("h-2 w-2 rounded-full", product.stock && product.stock > 0 ? "bg-success" : "bg-destructive")} />
                    <span className="text-xs text-muted-foreground">{product.stock && product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}</span>
                  </div>
                  <div className="flex items-center gap-1 pt-1">
                    <Link
                      href={`/admin/products/edit/${product.id}`}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg bg-muted px-3 py-2 text-xs font-medium hover:bg-primary/10 hover:text-primary transition"
                    >
                      <Pencil className="h-3 w-3" /> Edit
                    </Link>
                    <Link
                      href={`/product/${product.id}`}
                      target="_blank"
                      className="inline-flex items-center justify-center rounded-lg bg-muted px-3 py-2 text-xs font-medium hover:bg-primary/10 hover:text-primary transition"
                    >
                      <Eye className="h-3 w-3" />
                    </Link>
                    <button
                      onClick={() => setDeleteId(product.id)}
                      className="inline-flex items-center justify-center rounded-lg bg-muted px-3 py-2 text-xs font-medium text-destructive hover:bg-destructive/10 transition"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete confirmation */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-sm rounded-2xl bg-card p-6 shadow-lg space-y-4">
            <h3 className="text-lg font-semibold">Delete Product?</h3>
            <p className="text-sm text-muted-foreground">This action cannot be undone.</p>
            <div className="flex gap-2">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 rounded-lg border border-border px-4 py-2.5 text-sm font-medium hover:bg-muted transition"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteId)}
                className="flex-1 rounded-lg bg-destructive px-4 py-2.5 text-sm font-semibold text-white hover:bg-destructive/90 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}