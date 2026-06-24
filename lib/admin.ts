"use client";

import { products as initialProducts } from "@/lib/data";
import type { Product, Order, Category } from "@/types";

// Admin storage keys
const ADMIN_KEY = "thomex-admin-auth";
const ADMIN_PRODUCTS_KEY = "thomex-admin-products";
const ADMIN_SUPPLIERS_KEY = "thomex-admin-suppliers";
const ADMIN_ORDERS_KEY = "thomex-orders";
const ADMIN_CATEGORIES_KEY = "thomex-admin-categories";
const ADMIN_USERS_KEY = "thomex-admin-users";
const ADMIN_SETTINGS_KEY = "thomex-admin-settings";

export interface Supplier {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  status: "active" | "inactive";
  createdAt: string;
}

export interface AdminUser {
  id: string;
  email: string;
  fullName: string;
  role: "admin" | "editor" | "viewer";
  status: "active" | "suspended";
  createdAt: string;
}

export interface SiteSettings {
  storeName: string;
  storeEmail: string;
  storePhone: string;
  currency: string;
  freeShippingThreshold: number;
  taxRate: number;
}

export const defaultSettings: SiteSettings = {
  storeName: "Thomex",
  storeEmail: "support@thomex.co.ke",
  storePhone: "+254 700 000 000",
  currency: "KSh",
  freeShippingThreshold: 5000,
  taxRate: 16,
};

// Auth
export function isAdmin(): boolean {
  if (typeof window === "undefined") return false;
  const admin = localStorage.getItem(ADMIN_KEY);
  if (!admin) return false;
  try {
    const parsed = JSON.parse(admin);
    return parsed.role === "admin" && parsed.loggedIn === true;
  } catch {
    return false;
  }
}

export function loginAdmin(email: string, password: string): boolean {
  // Demo admin login - in production this would validate against Supabase
  if (email === "admin@thomex.co.ke" && password === "admin123") {
    localStorage.setItem(ADMIN_KEY, JSON.stringify({
      email,
      role: "admin",
      loggedIn: true,
      name: "Admin User",
      loginAt: new Date().toISOString(),
    }));
    return true;
  }
  return false;
}

export function logoutAdmin(): void {
  localStorage.removeItem(ADMIN_KEY);
}

export function getAdminSession() {
  if (typeof window === "undefined") return null;
  const admin = localStorage.getItem(ADMIN_KEY);
  if (!admin) return null;
  try {
    return JSON.parse(admin);
  } catch {
    return null;
  }
}

// Products
export function getAdminProducts(): Product[] {
  if (typeof window === "undefined") return initialProducts;
  const saved = localStorage.getItem(ADMIN_PRODUCTS_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return initialProducts;
    }
  }
  // Initialize with default products
  localStorage.setItem(ADMIN_PRODUCTS_KEY, JSON.stringify(initialProducts));
  return initialProducts;
}

export function saveAdminProducts(products: Product[]): void {
  localStorage.setItem(ADMIN_PRODUCTS_KEY, JSON.stringify(products));
}

export function addAdminProduct(product: Product): void {
  const products = getAdminProducts();
  products.unshift(product);
  saveAdminProducts(products);
}

export function updateAdminProduct(id: string, updates: Partial<Product>): void {
  const products = getAdminProducts();
  const idx = products.findIndex((p) => p.id === id);
  if (idx !== -1) {
    products[idx] = { ...products[idx], ...updates };
    saveAdminProducts(products);
  }
}

export function deleteAdminProduct(id: string): void {
  const products = getAdminProducts();
  saveAdminProducts(products.filter((p) => p.id !== id));
}

// Suppliers
export function getSuppliers(): Supplier[] {
  if (typeof window === "undefined") return [];
  const saved = localStorage.getItem(ADMIN_SUPPLIERS_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return [];
    }
  }
  return [];
}

export function saveSuppliers(suppliers: Supplier[]): void {
  localStorage.setItem(ADMIN_SUPPLIERS_KEY, JSON.stringify(suppliers));
}

export function addSupplier(supplier: Supplier): void {
  const suppliers = getSuppliers();
  suppliers.unshift(supplier);
  saveSuppliers(suppliers);
}

export function updateSupplier(id: string, updates: Partial<Supplier>): void {
  const suppliers = getSuppliers();
  const idx = suppliers.findIndex((s) => s.id === id);
  if (idx !== -1) {
    suppliers[idx] = { ...suppliers[idx], ...updates };
    saveSuppliers(suppliers);
  }
}

export function deleteSupplier(id: string): void {
  const suppliers = getSuppliers();
  saveSuppliers(suppliers.filter((s) => s.id !== id));
}

// Orders
export function getAllOrders(): Order[] {
  if (typeof window === "undefined") return [];
  const saved = localStorage.getItem(ADMIN_ORDERS_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return [];
    }
  }
  return [];
}

export function updateOrderStatus(orderId: string, status: Order["status"]): void {
  const orders = getAllOrders();
  const idx = orders.findIndex((o) => o.id === orderId);
  if (idx !== -1) {
    orders[idx].status = status;
    localStorage.setItem(ADMIN_ORDERS_KEY, JSON.stringify(orders));
  }
}

// Categories
export function getAdminCategories(): Category[] {
  if (typeof window === "undefined") return [];
  const saved = localStorage.getItem(ADMIN_CATEGORIES_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return [];
    }
  }
  return [];
}

export function saveAdminCategories(categories: Category[]): void {
  localStorage.setItem(ADMIN_CATEGORIES_KEY, JSON.stringify(categories));
}

// Users
export function getAdminUsers(): AdminUser[] {
  if (typeof window === "undefined") return [];
  const saved = localStorage.getItem(ADMIN_USERS_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return [];
    }
  }
  return [];
}

export function saveAdminUsers(users: AdminUser[]): void {
  localStorage.setItem(ADMIN_USERS_KEY, JSON.stringify(users));
}

// Settings
export function getSettings(): SiteSettings {
  if (typeof window === "undefined") return defaultSettings;
  const saved = localStorage.getItem(ADMIN_SETTINGS_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return defaultSettings;
    }
  }
  return defaultSettings;
}

export function saveSettings(settings: SiteSettings): void {
  localStorage.setItem(ADMIN_SETTINGS_KEY, JSON.stringify(settings));
}

// Analytics
export function getDashboardStats() {
  const allProducts = getAdminProducts();
  const allOrders = getAllOrders();
  const allSuppliers = getSuppliers();
  const allUsers = getAdminUsers();

  const totalRevenue = allOrders.reduce((sum, o) => sum + o.total, 0);
  const totalOrders = allOrders.length;
  const totalProducts = allProducts.length;
  const totalSuppliers = allSuppliers.length;
  const totalUsers = allUsers.length;

  const pendingOrders = allOrders.filter((o) => o.status === "pending").length;
  const processingOrders = allOrders.filter((o) => o.status === "processing").length;
  const shippedOrders = allOrders.filter((o) => o.status === "shipped").length;
  const deliveredOrders = allOrders.filter((o) => o.status === "delivered").length;

  const today = new Date().toISOString().split("T")[0];
  const todayOrders = allOrders.filter((o) => o.createdAt.startsWith(today)).length;
  const todayRevenue = allOrders
    .filter((o) => o.createdAt.startsWith(today))
    .reduce((sum, o) => sum + o.total, 0);

  return {
    totalRevenue,
    totalOrders,
    totalProducts,
    totalSuppliers,
    totalUsers,
    pendingOrders,
    processingOrders,
    shippedOrders,
    deliveredOrders,
    todayOrders,
    todayRevenue,
  };
}

export function getRecentOrders(limit = 10) {
  return getAllOrders().sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, limit);
}

export function getTopProducts(limit = 5) {
  const orders = getAllOrders();
  const productCounts: Record<string, { product: Product; count: number; revenue: number }> = {};
  
  orders.forEach((order) => {
    order.items.forEach((item) => {
      if (!productCounts[item.product.id]) {
        productCounts[item.product.id] = { product: item.product, count: 0, revenue: 0 };
      }
      productCounts[item.product.id].count += item.quantity;
      productCounts[item.product.id].revenue += item.product.price * item.quantity;
    });
  });

  return Object.values(productCounts)
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
}