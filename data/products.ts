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
    id: 1,
    name: 'Pizza de calabresa',
    description: 'Deliciosa pizza com molho de tomate artesanal, queijo mussarela derretido e generosas fatias de calabresa crocante sobre uma massa macia e dourada.',
    price: 29.99,
    originalPrice: 34.99,
    discount: 15,
    rating: 4.8,
    categoryId: 1,
    isFeatured: true,
    color: 'F44336',
    checkoutUrl: 'https://web.syncpay.pro/v3/checkout/?id=3pksi2vdkw8nkmzoc5mlyjb9',
    imageUrl: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?q=80&w=600&auto=format&fit=crop'
  },
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
    checkoutUrl: 'https://web.syncpay.pro/v3/checkout/?id=your-id-here',
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
  }
  //  The rest of the products were removed in the edited code.  Adding them back would require more information.
];

export const getProductsByCategory = (categoryId: number): Product[] => {
  return products.filter(product => product.categoryId === categoryId);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.isFeatured);
};