import type { LucideIcon } from 'lucide-react';

export interface Dish {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  video: string;
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

export interface Offer {
  id: number;
  title: string;
  description: string;
  image: string;
  dataAiHint: string;
  cta: string;
}
