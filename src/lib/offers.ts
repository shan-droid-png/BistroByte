import type { Offer } from './types';

export const offers: Offer[] = [
    {
      id: 1,
      title: '20% OFF Biryanis!',
      description: 'Aromatic and flavorful Biryanis at a special price, only for today. A deal you can\'t resist!',
      image: 'https://placehold.co/600x400.png',
      dataAiHint: 'biryani promotion',
      cta: 'Order Now',
    },
    {
      id: 2,
      title: 'Thali + Lassi Combo',
      description: 'Experience a complete meal with our special Thali and a refreshing Sweet Lassi for just ₹299.',
      image: 'https://images.unsplash.com/photo-1596819659877-a740ed357e32?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxJbmRpYW4lMjB0aGFsaXxlbnwwfHx8fDE3NTk2Nzk2NDF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      dataAiHint: 'thali',
      cta: 'Try Today',
    },
    {
      id: 3,
      title: 'New: Butter Garlic Naan',
      description: 'Introducing our new Butter Garlic Naan, baked to perfection. Aromatic and delicious, only ₹55.',
      image: 'https://placehold.co/600x400.png',
      dataAiHint: 'garlic naan',
      cta: 'Taste Now',
    },
    {
      id: 4,
      title: 'Happy Hour: 4-6 PM',
      description: 'Get a complimentary Masala Chai with any order during our happy hours. The perfect evening treat!',
      image: 'https://placehold.co/600x400.png',
      dataAiHint: 'happy hour',
      cta: 'View Menu',
    },
    {
      id: 5,
      title: 'Festive Special Offer',
      description: 'Celebrate with us! Get a free dessert on all orders above ₹500. A sweet end to your meal.',
      image: 'https://placehold.co/600x400.png',
      dataAiHint: 'dessert festival',
      cta: 'Claim Offer',
    },
];
