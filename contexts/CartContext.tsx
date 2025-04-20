import React, { createContext, useState, ReactNode } from 'react';
import { Product } from '../data/products';

interface CartContextType {
  cartItem: Product | null;
  isCartOpen: boolean;
  addToCart: (product: Product) => void;
  removeFromCart: () => void;
  toggleCart: () => void;
}

export const CartContext = createContext<CartContextType>({
  cartItem: null,
  isCartOpen: false,
  addToCart: () => {},
  removeFromCart: () => {},
  toggleCart: () => {},
});

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItem, setCartItem] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  const addToCart = (product: Product) => {
    setCartItem(product);
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
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
