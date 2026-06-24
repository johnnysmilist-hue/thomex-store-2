export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  oldPrice?: number;
  image: string;
  images?: string[];
  gallery?: string[];
  category: string;
  subcategory?: string;
  rating: number;
  reviews?: number;
  reviewCount?: number;
  stock?: number;
  vendor?: string;
  vendorId?: string;
  badges?: string[];
  isDeal?: boolean;
  deal?: boolean;
  dealEnds?: string;
  freeShipping?: boolean;
  shipping?: string;
  sku?: string;
  tags?: string[];
  featured?: boolean;
  createdAt?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  variant?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  shipping: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  createdAt: string;
  shippingAddress: ShippingAddress;
  paymentMethod: string;
}

export interface ShippingAddress {
  fullName: string;
  phone: string;
  address: string;
  city: string;
  region: string;
  postalCode?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  addresses: ShippingAddress[];
  wishlist: string[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  image?: string;
  productCount?: number;
}