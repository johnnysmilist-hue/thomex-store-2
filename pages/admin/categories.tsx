"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Tag } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { getAdminCategories, saveAdminCategories } from "@/lib/admin";
import { cn } from "@/lib/utils";
import type { Category } from "@/types";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);
  const [form, setForm] = useState({ name: "", slug: "", icon: "Package" });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const cats = getAdminCategories();
    if (cats.length === 0) {
      // Seed with default categories
      const defaults: Category[] = [
        { id: "cat_electronics", name: "Electronics", slug: "electronics", icon: "Smartphone", productCount: 0 },
        { id: "cat_fashion", name: "Fashion", slug: "fashion", icon: "Shirt", productCount: 0 },
        { id: "cat_home", name: "Home & Living", slug: "home-living", icon: "Home", productCount: 0 },
        { id: "cat_beauty", name: "Beauty", slug: "beauty", icon: "Heart", productCount: 0 },
        { id: "cat_sports", name: "Sports", slug: "sports", icon: "Dumbbell", productCount: 0 },
        { id: "cat_grocery", name: "Grocery", slug: "grocery", icon: "Apple", productCount: 0 },
        { id: "cat_gaming", name: "Gaming", slug: "gaming", icon: "Gamepad2", productCount: 0 },
        { id: "cat_automotive", name: "Automotive", slug: "automotive", icon: "Car", productCount: 0 },
      ];
      saveAdminCategories(defaults);
      setCategories(defaults);
    } else {
      setCategories(cats);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newCat: Category = editing || {
      id: "cat_" + Date.now(),
      name: form.name,
      slug: form.slug || form.name.toLowerCase().replace(/\s+/g, "-"),
      icon: form.icon,
      productCount: 0,
    };

    const updated = editing
      ? categories.map((c) => (c.id === editing.id ? { ...c, ...form, slug: form.slug || form.name.toLowerCase().replace(/\s+/g, "-") } : c))
      : [...categories, newCat];

    saveAdminCategories(updated);
    setCategories(updated);
    setShowForm(false);
    setEditing(null);
    setForm({ name: "", slug: "", icon: "Package" });
  };

  const handleDelete = (id: string) => {
    const updated = categories.filter((c) => c.id !== id);
    saveAdminCategories(updated);
    setCategories(updated);
  };

  const startEdit = (cat: Category) => {
    setEditing(cat);
    setForm({ name: cat.name, slug: cat.slug, icon: cat.icon });
    setShowForm(true);
  };

  if (!mounted) return null;

  return (
    <AdminLayout>
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-foreground">Categories</h1>
            <p className="text-sm text-muted-foreground">{categories.length} categories</p>
          </div>
          <button
            onClick={() => { setShowForm(true); setEditing(null); setForm({ name: "", slug: "", icon: "Package" }); }}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary/90 transition"
          >
            <Plus className="h-4 w-4" />
            Add Category
          </button>
        </div>

        {/* Category list */}
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <div className="grid grid-cols-12 gap-3 px-4 py-3 bg-muted/50 text-xs font-medium text-muted-foreground uppercase tracking-wider">
            <div className="col-span-5 sm:col-span-4">Name</div>
            <div className="col-span-4 sm:col-span-4">Slug</div>
            <div className="col-span-3 sm:col-span-2">Icon</div>
            <div className="col-span-3 sm:col-span-2 text-right">Actions</div>
          </div>
          <div className="divide-y divide-border">
            {categories.map((cat) => (
              <div key={cat.id} className="grid grid-cols-12 gap-3 px-4 py-3 items-center">
                <div className="col-span-5 sm:col-span-4 font-medium text-sm">{cat.name}</div>
                <div className="col-span-4 sm:col-span-4 text-sm text-muted-foreground truncate">{cat.slug}</div>
                <div className="col-span-3 sm:col-span-2 text-sm text-muted-foreground">{cat.icon}</div>
                <div className="col-span-3 sm:col-span-2 flex justify-end gap-1">
                  <button onClick={() => startEdit(cat)} className="p-1.5 rounded-lg hover:bg-primary/10 text-muted-foreground hover:text-primary transition">
                    <Pencil className="h-3.5 w-3.5" />
                  </button>
                  <button onClick={() => handleDelete(cat.id)} className="p-1.5 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition">
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <form onSubmit={handleSubmit} className="w-full max-w-md rounded-2xl bg-card p-6 shadow-lg space-y-4">
              <h3 className="text-lg font-semibold">{editing ? "Edit Category" : "Add Category"}</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium">Name *</label>
                  <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm mt-1 focus:outline-none focus:border-primary" />
                </div>
                <div>
                  <label className="text-sm font-medium">Slug</label>
                  <input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder="auto-generated if empty" className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm mt-1 focus:outline-none focus:border-primary" />
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                <button type="button" onClick={() => setShowForm(false)} className="flex-1 rounded-lg border border-border px-4 py-2.5 text-sm font-medium hover:bg-muted transition">
                  Cancel
                </button>
                <button type="submit" className="flex-1 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary/90 transition">
                  {editing ? "Save" : "Add"}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}