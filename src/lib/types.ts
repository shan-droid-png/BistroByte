import type { LucideIcon } from 'lucide-react';

export interface Dish {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  ingredients: string[];
  dataAiHint: string;
}

export interface Category {
  id: string;
  name: string;
  icon: LucideIcon;
}

export interface CartItem {
  dish: Dish;
  quantity: number;
}
