export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount: number;
  rating?: number;
  categoryId: number;
  isFeatured?: boolean;
  color?: string;
  checkoutUrl: string;
  imageUrl: string;
}

export const products: Product[] = [
 
  {
    id: 2,
    name: 'Pizza Pepperoni',
    description: 'Molho de tomate, mussarela e pepperoni',
    price: 32.99,
    originalPrice: 37.99,
    discount: 13,
    rating: 4.7,
    categoryId: 1,
    color: 'E53935',
    checkoutUrl: 'https://web.syncpay.pro/v3/checkout/?id=2o9uavulpz6i635wb6irkhmn',
    imageUrl: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 3,
    name: 'Hambúrguer Clássico',
    description: 'Burger 150g, queijo, alface, tomate e maionese especial',
    price: 24.99,
    originalPrice: 29.99,
    discount: 16,
    rating: 4.6,
    categoryId: 2,
    isFeatured: true,
    color: 'F4511E',
    checkoutUrl: 'https://web.syncpay.pro/v3/checkout/?id=your-id-here',
    imageUrl: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 4,
    name: 'Hambúrguer Duplo',
    description: 'Dois burgers 150g, queijo cheddar, cebola caramelizada e molho especial',
    price: 34.99,
    originalPrice: 39.99,
    discount: 12,
    rating: 4.9,
    categoryId: 2,
    color: 'FF7043',
    checkoutUrl: 'https://web.syncpay.pro/v3/checkout/?id=your-id-here',
    imageUrl: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 5,
    name: 'Macarrão Carbonara',
    description: 'Espaguete, ovo, queijo parmesão, bacon e pimenta preta',
    price: 27.99,
    discount: 0,
    rating: 4.5,
    categoryId: 3,
    color: 'FB8C00',
    checkoutUrl: 'https://web.syncpay.pro/v3/checkout/?id=your-id-here',
    imageUrl: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 6,
    name: 'Pizza Quatro Queijos',
    description: 'Molho de tomate, mussarela, gorgonzola, parmesão e provolone',
    price: 38.99,
    originalPrice: 45.99,
    discount: 15,
    rating: 4.8,
    categoryId: 1,
    isFeatured: true,
    color: 'FFA726',
    checkoutUrl: 'https://web.syncpay.pro/v3/checkout/?id=your-id-here',
    imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 7,
    name: 'Hambúrguer Bacon Premium',
    description: 'Burger 180g, bacon crocante, queijo cheddar e molho barbecue',
    price: 36.99,
    originalPrice: 42.99,
    discount: 14,
    rating: 4.9,
    categoryId: 2,
    isFeatured: true,
    color: 'FF5722',
    checkoutUrl: 'https://web.syncpay.pro/v3/checkout/?id=your-id-here',
    imageUrl: 'https://images.unsplash.com/photo-1551615593-ef5fe247e8f7?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 8,
    name: 'Salada Caesar Premium',
    description: 'Alface romana, frango grelhado, croutons, parmesão e molho caesar',
    price: 29.99,
    originalPrice: 34.99,
    discount: 14,
    rating: 4.6,
    categoryId: 3,
    color: '8BC34A',
    checkoutUrl: 'https://web.syncpay.pro/v3/checkout/?id=your-id-here',
    imageUrl: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 9,
    name: 'Sushi Combo Especial',
    description: '16 peças variadas de sushi e sashimi premium',
    price: 69.99,
    originalPrice: 79.99,
    discount: 12,
    rating: 4.9,
    categoryId: 4,
    isFeatured: true,
    color: 'E91E63',
    checkoutUrl: 'https://web.syncpay.pro/v3/checkout/?id=your-id-here',
    imageUrl: 'https://images.unsplash.com/photo-1553621042-f6e147245754?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 10,
    name: 'Massa Penne ao Molho Rose',
    description: 'Penne com molho rose cremoso e manjericão fresco',
    price: 32.99,
    originalPrice: 37.99,
    discount: 13,
    rating: 4.7,
    categoryId: 3,
    color: 'FF9800',
    checkoutUrl: 'https://web.syncpay.pro/v3/checkout/?id=your-id-here',
    imageUrl: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 11,
    name: 'Smoothie Bowl Tropical',
    description: 'Smoothie de frutas tropicais com granola e mel',
    price: 24.99,
    originalPrice: 29.99,
    discount: 16,
    rating: 4.5,
    categoryId: 5,
    color: 'CDDC39',
    checkoutUrl: 'https://web.syncpay.pro/v3/checkout/?id=your-id-here',
    imageUrl: 'https://images.unsplash.com/photo-1511690078903-71dc5a49f5e3?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 12,
    name: 'Wrap Vegano',
    description: 'Wrap integral com homus, legumes grelhados e molho tahine',
    price: 26.99,
    originalPrice: 31.99,
    discount: 15,
    rating: 4.6,
    categoryId: 6,
    color: '4CAF50',
    checkoutUrl: 'https://web.syncpay.pro/v3/checkout/?id=your-id-here',
    imageUrl: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 13,
    name: 'Bolo de Chocolate Vegano',
    description: 'Bolo de chocolate vegano com cobertura de ganache',
    price: 28.99,
    originalPrice: 33.99,
    discount: 14,
    rating: 4.8,
    categoryId: 6,
    isFeatured: true,
    color: '795548',
    checkoutUrl: 'https://web.syncpay.pro/v3/checkout/?id=your-id-here',
    imageUrl: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=600&auto=format&fit=crop'
  }
];

export const getProductsByCategory = (categoryId: number): Product[] => {
  return products.filter(product => product.categoryId === categoryId);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.isFeatured);
};