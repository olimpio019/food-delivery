import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { Product } from '../data/products';

interface CartItem extends Product {
  checkoutUrl: string;
}

interface CartContextType {
  cartItem: CartItem | null;
  isCartOpen: boolean;
  addToCart: (product: Product) => void;
  removeFromCart: () => void;
  toggleCart: () => void;
  getCheckoutUrl: (product: Product) => string;
}

export const CartContext = createContext<CartContextType>({
  cartItem: null,
  isCartOpen: false,
  addToCart: () => {},
  removeFromCart: () => {},
  toggleCart: () => {},
  getCheckoutUrl: () => '',
});

interface CartProviderProps {
  children: ReactNode;
}

// Função para gerar URL de checkout para um produto
const generateCheckoutUrl = (product: Product): string => {
  // Aqui você normalmente teria uma chamada para seu serviço de pagamento
  // Para simular, estamos gerando um link de checkout único baseado no produto
  const baseUrl = 'https://checkout.example.com';
  const params = new URLSearchParams({
    product_id: product.id.toString(),
    price: product.price.toString(),
    name: product.name,
    currency: 'BRL'
  });
  
  return `${baseUrl}?${params.toString()}`;
};

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItem, setCartItem] = useState<CartItem | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  const getCheckoutUrl = (product: Product): string => {
    return generateCheckoutUrl(product);
  };

  const addToCart = (product: Product) => {
    const checkoutUrl = generateCheckoutUrl(product);
    setCartItem({
      ...product,
      checkoutUrl
    });
  };

  const removeFromCart = () => {
    setCartItem(null);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <CartContext.Provider
      value={{
        cartItem,
        isCartOpen,
        addToCart,
        removeFromCart,
        toggleCart,
        getCheckoutUrl
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
