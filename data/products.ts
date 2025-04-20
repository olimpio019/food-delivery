
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
    imageUrl: 'https://www.minhareceita.com.br/app/uploads/2022/12/pizza-de-pepperoni-caseira-portal-minha-receita.jpg'
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
    checkoutUrl: '/product/2/checkout',
    imageUrl: '/images/pizza-pepperoni.jpg'
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
    checkoutUrl: '/product/3/checkout',
    imageUrl: '/images/hamburguer-classico.jpg'
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
    checkoutUrl: '/product/4/checkout',
    imageUrl: '/images/hamburguer-duplo.jpg'
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
    checkoutUrl: '/product/5/checkout',
    imageUrl: '/images/macarrao-carbonara.jpg'
  },
  {
    id: 6,
    name: 'Lasanha Bolonhesa',
    description: 'Camadas de massa intercaladas com molho bolonhesa e bechamel',
    price: 31.99,
    originalPrice: 36.99,
    discount: 13,
    rating: 4.7,
    categoryId: 3,
    isFeatured: true,
    color: 'FF9800',
    checkoutUrl: '/product/6/checkout',
    imageUrl: '/images/lasanha-bolonhesa.jpg'
  },
  {
    id: 7,
    name: 'Pudim de Leite',
    description: 'Pudim de leite condensado com calda de caramelo',
    price: 12.99,
    discount: 0,
    rating: 4.6,
    categoryId: 4,
    color: '7B1FA2',
    checkoutUrl: '/product/7/checkout',
    imageUrl: '/images/pudim-de-leite.jpg'
  },
  {
    id: 8,
    name: 'Brownie com Sorvete',
    description: 'Brownie quente com sorvete de baunilha e calda de chocolate',
    price: 16.99,
    originalPrice: 19.99,
    discount: 15,
    rating: 4.8,
    categoryId: 4,
    isFeatured: true,
    color: '9C27B0',
    checkoutUrl: '/product/8/checkout',
    imageUrl: '/images/brownie-com-sorvete.jpg'
  },
  {
    id: 9,
    name: 'Refrigerante',
    description: 'Coca-Cola, Pepsi, Guaraná Antarctica ou Sprite (lata 350ml)',
    price: 5.99,
    discount: 0,
    categoryId: 5,
    color: '1976D2',
    checkoutUrl: '/product/9/checkout',
    imageUrl: '/images/refrigerante.jpg'
  },
  {
    id: 10,
    name: 'Suco Natural',
    description: 'Laranja, abacaxi, morango ou limão (300ml)',
    price: 8.99,
    discount: 0,
    rating: 4.5,
    categoryId: 5,
    color: '2196F3',
    checkoutUrl: '/product/10/checkout',
    imageUrl: '/images/suco-natural.jpg'
  },
  {
    id: 11,
    name: 'Hambúrguer Vegano',
    description: 'Burger de lentilha e cogumelos, alface, tomate e maionese vegana',
    price: 26.99,
    originalPrice: 29.99,
    discount: 10,
    rating: 4.4,
    categoryId: 6,
    color: '43A047',
    checkoutUrl: '/product/11/checkout',
    imageUrl: '/images/hamburguer-vegano.jpg'
  },
  {
    id: 12,
    name: 'Pizza Vegana',
    description: 'Molho de tomate, queijo vegano e legumes assados',
    price: 35.99,
    discount: 0,
    rating: 4.3,
    categoryId: 6,
    color: '4CAF50',
    checkoutUrl: '/product/12/checkout',
    imageUrl: '/images/pizza-vegana.jpg'
  },
  {
    id: 13,
    name: 'Bowl de Açaí',
    description: 'Açaí puro com banana, granola e mel',
    price: 18.99,
    originalPrice: 21.99,
    discount: 13,
    rating: 4.7,
    categoryId: 7,
    isFeatured: true,
    color: '00897B',
    checkoutUrl: '/product/13/checkout',
    imageUrl: '/images/bowl-de-acai.jpg'
  },
  {
    id: 14,
    name: 'Salada Caesar',
    description: 'Alface americana, frango grelhado, croutons, queijo parmesão e molho Caesar',
    price: 22.99,
    discount: 0,
    rating: 4.5,
    categoryId: 7,
    color: '009688',
    checkoutUrl: '/product/14/checkout',
    imageUrl: '/images/salada-caesar.jpg'
  },
  {
    id: 15,
    name: 'Combo Pizza + Refrigerante',
    description: 'Pizza média (até 2 sabores) + refrigerante 2L',
    price: 49.99,
    originalPrice: 59.99,
    discount: 16,
    rating: 4.8,
    categoryId: 8,
    isFeatured: true,
    color: 'C2185B',
    checkoutUrl: '/product/15/checkout',
    imageUrl: '/images/combo-pizza-refrigerante.jpg'
  },
  {
    id: 16,
    name: 'Combo Família',
    description: '2 hambúrgueres + 2 batatas médias + 4 refrigerantes',
    price: 74.99,
    originalPrice: 89.99,
    discount: 16,
    rating: 4.9,
    categoryId: 8,
    color: 'D81B60',
    checkoutUrl: '/product/16/checkout',
    imageUrl: '/images/combo-familia.jpg'
  }
];

export const getProductsByCategory = (categoryId: number): Product[] => {
  return products.filter(product => product.categoryId === categoryId);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.isFeatured);
};
