export interface Category {
  id: number;
  name: string;
  icon: string;
  color?: string;
}

export const categories: Category[] = [
  {
    id: 1,
    name: 'Pizzas',
    icon: 'pizza',
    color: 'E53935'
  },
  {
    id: 2,
    name: 'Hambúrgueres',
    icon: 'burger',
    color: 'F4511E'
  },
  {
    id: 3,
    name: 'Massas',
    icon: 'pasta',
    color: 'FB8C00'
  },
  {
    id: 4,
    name: 'Sobremesas',
    icon: 'dessert',
    color: '7B1FA2'
  },
  {
    id: 5,
    name: 'Bebidas',
    icon: 'drink',
    color: '1976D2'
  },
  {
    id: 6,
    name: 'Veganos',
    icon: 'leaf',
    color: '43A047'
  },
  {
    id: 7,
    name: 'Saudáveis',
    icon: 'food',
    color: '00897B'
  },
  {
    id: 8,
    name: 'Promoções',
    icon: 'discount',
    color: 'C2185B'
  }
];
