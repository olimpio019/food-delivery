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

// Função para obter URL de checkout para um produto
const generateCheckoutUrl = (product: Product): string => {
  // Primeiro, verifique se existe um checkoutUrl configurado no produto
  if (product.checkoutUrl) {
    return product.checkoutUrl;
  }
  
  // Em seguida, verifica se há links salvos no localStorage
  const savedLinks = typeof window !== 'undefined' ? localStorage.getItem('productCheckoutUrls') : null;
  
  if (savedLinks) {
    try {
      const links = JSON.parse(savedLinks);
      const productLink = links.find((link: any) => link.id === product.id);
      
      if (productLink && productLink.checkoutUrl) {
        return productLink.checkoutUrl;
      }
    } catch (error) {
      console.error('Erro ao buscar links de checkout:', error);
    }
  }
  
  // Como fallback, usa a página de checkout interna
  return `/product/${product.id}/checkout`;
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
