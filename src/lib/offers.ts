import type { Offer } from './types';

export const offers: Offer[] = [
    {
      id: 1,
      title: '20% OFF Biryanis!',
      description: 'Aromatic and flavorful Biryanis at a special price, only for today. A deal you can\'t resist!',
      image: 'https://images.unsplash.com/photo-1701579231305-d84d8af9a3fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxiaXJ5YW5pfGVufDB8fHx8MTc1MzQyNTk3OXww&ixlib=rb-4.1.0&q=80&w=1080',
      dataAiHint: 'biryani promotion',
      cta: 'Order Now',
    },
    {
      id: 2,
      title: 'Thali + Lassi Combo',
      description: 'Experience a complete meal with our special Thali and a refreshing Sweet Lassi for just ₹299.',
      image: 'https://images.unsplash.com/photo-1680993032090-1ef7ea9b51e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHx0aGFsaXxlbnwwfHx8fDE3NTM0MjQ2MzR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      dataAiHint: 'thali',
      cta: 'Try Today',
    },
    {
      id: 3,
      title: 'New: Butter Garlic Naan',
      description: 'Introducing our new Butter Garlic Naan, baked to perfection. Aromatic and delicious, only ₹55.',
      image: 'https://images.unsplash.com/photo-1697155406014-04dc649b0953?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxuYWFufGVufDB8fHx8MTc1MzQyNTkzMHww&ixlib=rb-4.1.0&q=80&w=1080',
      dataAiHint: 'garlic naan',
      cta: 'Taste Now',
    },
    {
      id: 4,
      title: 'Happy Hour: 4-6 PM',
      description: 'Get a complimentary Masala Chai with any order during our happy hours. The perfect evening treat!',
      image: 'https://images.unsplash.com/photo-1683533699004-7f6b9e5a073f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHxjaGFpfGVufDB8fHx8MTc1MzQyNTM1OHww&ixlib=rb-4.1.0&q=80&w=1080',
      dataAiHint: 'happy hour',
      cta: 'View Menu',
    },
    {
      id: 5,
      title: 'Festive Special Offer',
      description: 'Celebrate with us! Get a free dessert on all orders above ₹500. A sweet end to your meal.',
      image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxkZXNzZXJ0fGVufDB8fHx8MTc1MzQyNjA5Mnww&ixlib=rb-4.1.0&q=80&w=1080',
      dataAiHint: 'dessert festival',
      cta: 'Claim Offer',
    },
];
