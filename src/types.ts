/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  images?: string[];
  description: string;
  category: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar: string;
}

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  total: number;
  status: 'Entregado' | 'En camino' | 'Procesando';
  items: OrderItem[];
  shippingAddress: {
    fullName: string;
    street: string;
    extNumber: string;
    intNumber?: string;
    zipCode: string;
    city: string;
    state: string;
    references?: string;
  };
  subtotal: number;
  shippingCost: number;
}
