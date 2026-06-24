"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Truck, Mail, Phone, MapPin, CheckCircle, XCircle } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { getSuppliers, saveSuppliers } from "@/lib/admin";
import { cn } from "@/lib/utils";
import type { Supplier } from "@/lib/admin";

export default function AdminSuppliersPage() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Supplier | null>(null);
  const [form, setForm] = useState<{ name: string; email: string; phone: string; address: string; status: "active" | "inactive" }>({ name: "", email: "", phone: "", address: "", status: "active" });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setSuppliers(getSuppliers());
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newSupplier: Supplier = editing || {
      id: "sup_" + Date.now(),
      name: form.name,
      email: form.email,
      phone: form.phone,
      address: form.address,
      status: form.status,
      createdAt: new Date().toISOString(),
    };

    const updated = editing
      ? suppliers.map((s) => (s.id === editing.id ? { ...s, ...form } : s))
      : [...suppliers, newSupplier];

    saveSuppliers(updated);
    setSuppliers(updated);
    setShowForm(false);
    setEditing(null);
    setForm({ name: "", email: "", phone: "", address: "", status: "active" });
  };

  const handleDelete = (id: string) => {
    const updated = suppliers.filter((s) => s.id !== id);
    saveSuppliers(updated);
    setSuppliers(updated);
  };

  const startEdit = (s: Supplier) => {
    setEditing(s);
    setForm({ name: s.name, email: s.email, phone: s.phone, address: s.address, status: s.status });
    setShowForm(true);
  };

  if (!mounted) return null;

  return (
    <AdminLayout>
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-foreground">Suppliers</h1>
            <p className="text-sm text-muted-foreground">{suppliers.length} suppliers</p>
          </div>
          <button
            onClick={() => { setShowForm(true); setEditing(null); setForm({ name: "", email: "", phone: "", address: "", status: "active" }); }}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary/90 transition"
          >
            <Plus className="h-4 w-4" />
            Add Supplier
          </button>
        </div>

        {suppliers.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-card py-16">
            <Truck className="h-10 w-10 text-muted-foreground/40 mb-3" />
            <p className="text-sm text-muted-foreground">No suppliers yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {suppliers.map((s) => (
              <div key={s.id} className="rounded-xl border border-border bg-card p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-sm">{s.name}</h3>
                    <span className={cn("inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full text-[10px] font-medium", s.status === "active" ? "bg-success/10 text-success" : "bg-muted text-muted-foreground")}>
                      {s.status === "active" ? <CheckCircle className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
                      {s.status}
                    </span>
                  </div>
                  <div className="flex gap-1">
                    <button onClick={() => startEdit(s)} className="p-1.5 rounded-lg hover:bg-primary/10 text-muted-foreground hover:text-primary transition">
                      <Pencil className="h-3.5 w-3.5" />
                    </button>
                    <button onClick={() => handleDelete(s.id)} className="p-1.5 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition">
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
                <div className="space-y-1.5 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2"><Mail className="h-3 w-3" /> {s.email}</div>
                  <div className="flex items-center gap-2"><Phone className="h-3 w-3" /> {s.phone}</div>
                  <div className="flex items-center gap-2"><MapPin className="h-3 w-3" /> {s.address}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Form */}
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <form onSubmit={handleSubmit} className="w-full max-w-md rounded-2xl bg-card p-6 shadow-lg space-y-4">
              <h3 className="text-lg font-semibold">{editing ? "Edit Supplier" : "Add Supplier"}</h3>
              <div className="space-y-3">
                <div><label className="text-sm font-medium">Name *</label><input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm mt-1 focus:outline-none focus:border-primary" /></div>
                <div><label className="text-sm font-medium">Email *</label><input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm mt-1 focus:outline-none focus:border-primary" /></div>
                <div><label className="text-sm font-medium">Phone *</label><input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm mt-1 focus:outline-none focus:border-primary" /></div>
                <div><label className="text-sm font-medium">Address</label><input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm mt-1 focus:outline-none focus:border-primary" /></div>
                <div><label className="text-sm font-medium">Status</label>
                  <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as "active" | "inactive" })} className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm mt-1 focus:outline-none focus:border-primary">
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                <button type="button" onClick={() => setShowForm(false)} className="flex-1 rounded-lg border border-border px-4 py-2.5 text-sm font-medium hover:bg-muted transition">Cancel</button>
                <button type="submit" className="flex-1 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary/90 transition">{editing ? "Save" : "Add"}</button>
              </div>
            </form>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}