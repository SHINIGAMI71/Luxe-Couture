/**
 * Luxury Fashion App Types
 */

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'Men' | 'Women' | 'Accessories';
  sizes: string[];
  images: string[];
  featured: boolean;
  stock: number;
  createdAt: string;
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
}

export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  role: 'customer' | 'admin';
  createdAt: string;
}

export interface Order {
  id: string;
  userId: string;
  items: {
    productId: string;
    quantity: number;
    price: number;
    name: string;
    image: string;
    size: string;
  }[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  createdAt: string;
  customerName?: string;
  customerEmail?: string;
}

export interface SupportMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  status: 'unread' | 'replied';
  createdAt: string;
}
