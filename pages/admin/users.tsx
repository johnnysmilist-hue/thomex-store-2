"use client";

import { useState, useEffect } from "react";
import { Users, UserCheck, UserX, Shield, Mail } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { getAdminUsers, saveAdminUsers } from "@/lib/admin";
import { cn } from "@/lib/utils";
import type { AdminUser } from "@/lib/admin";

const roleColors: Record<string, string> = {
  admin: "bg-primary/10 text-primary",
  editor: "bg-accent/10 text-accent",
  viewer: "bg-muted text-muted-foreground",
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const existing = getAdminUsers();
    if (existing.length === 0) {
      // Seed default admin
      const defaults: AdminUser[] = [
        {
          id: "usr_admin",
          email: "admin@thomex.co.ke",
          fullName: "Admin User",
          role: "admin",
          status: "active" as const,
          createdAt: new Date().toISOString(),
        },
      ];
      saveAdminUsers(defaults);
      setUsers(defaults);
    } else {
      setUsers(existing);
    }
  }, []);

  const toggleRole = (id: string) => {
    const updated = users.map((u) => {
      if (u.id === id) {
        const roles: ("admin" | "editor" | "viewer")[] = ["viewer", "editor", "admin"];
        const currentIdx = roles.indexOf(u.role);
        const nextRole = roles[(currentIdx + 1) % roles.length];
        return { ...u, role: nextRole };
      }
      return u;
    });
    saveAdminUsers(updated);
    setUsers(updated);
  };

  const toggleStatus = (id: string) => {
    const updated = users.map((u) =>
      u.id === id ? { ...u, status: (u.status === "active" ? "suspended" : "active") as "active" | "suspended" } : u
    );
    saveAdminUsers(updated);
    setUsers(updated);
  };

  if (!mounted) return null;

  return (
    <AdminLayout>
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-foreground">Users</h1>
            <p className="text-sm text-muted-foreground">{users.length} users</p>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <div className="grid grid-cols-12 gap-3 px-4 py-3 bg-muted/50 text-xs font-medium text-muted-foreground uppercase tracking-wider">
            <div className="col-span-4 sm:col-span-3">User</div>
            <div className="col-span-3 sm:col-span-3">Email</div>
            <div className="col-span-3 sm:col-span-2">Role</div>
            <div className="col-span-2 sm:col-span-2">Status</div>
            <div className="col-span-3 sm:col-span-2 text-right">Actions</div>
          </div>
          <div className="divide-y divide-border">
            {users.map((user) => (
              <div key={user.id} className="grid grid-cols-12 gap-3 px-4 py-3 items-center">
                <div className="col-span-4 sm:col-span-3">
                  <p className="font-medium text-sm truncate">{user.fullName}</p>
                  <p className="text-xs text-muted-foreground">{new Date(user.createdAt).toLocaleDateString("en-KE")}</p>
                </div>
                <div className="col-span-3 sm:col-span-3 text-sm text-muted-foreground truncate">{user.email}</div>
                <div className="col-span-3 sm:col-span-2">
                  <span className={cn("inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium", roleColors[user.role])}>
                    <Shield className="h-3 w-3" />
                    {user.role}
                  </span>
                </div>
                <div className="col-span-2 sm:col-span-2">
                  <span className={cn(
                    "inline-flex items-center gap-1 text-xs",
                    user.status === "active" ? "text-success" : "text-destructive"
                  )}>
                    {user.status === "active" ? <UserCheck className="h-3.5 w-3.5" /> : <UserX className="h-3.5 w-3.5" />}
                    {user.status}
                  </span>
                </div>
                <div className="col-span-3 sm:col-span-2 flex justify-end gap-1">
                  <button
                    onClick={() => toggleRole(user.id)}
                    className="p-1.5 rounded-lg hover:bg-primary/10 text-muted-foreground hover:text-primary transition"
                    title="Cycle role"
                  >
                    <Shield className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => toggleStatus(user.id)}
                    className={cn(
                      "p-1.5 rounded-lg transition",
                      user.status === "active"
                        ? "hover:bg-destructive/10 text-muted-foreground hover:text-destructive"
                        : "hover:bg-success/10 text-muted-foreground hover:text-success"
                    )}
                    title={user.status === "active" ? "Suspend" : "Activate"}
                  >
                    {user.status === "active" ? <UserX className="h-3.5 w-3.5" /> : <UserCheck className="h-3.5 w-3.5" />}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}