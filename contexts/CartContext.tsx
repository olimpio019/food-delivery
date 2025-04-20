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

// Função para obter as configurações de um produto (checkout URL, imageUrl, etc)
const getProductSettings = (product: Product): { checkoutUrl: string, imageUrl: string } => {
  // Valores padrão
  let checkoutUrl = product.checkoutUrl || '';
  let imageUrl = product.imageUrl || '';
  
  // Primeiro, verifique se existem configurações salvas no localStorage
  const savedSettings = typeof window !== 'undefined' ? localStorage.getItem('productSettings') : null;
  
  if (savedSettings) {
    try {
      const settings = JSON.parse(savedSettings);
      const productSetting = settings.find((setting: any) => setting.id === product.id);
      
      if (productSetting) {
        // Atualizar com as configurações salvas
        if (productSetting.checkoutUrl) checkoutUrl = productSetting.checkoutUrl;
        if (productSetting.imageUrl) imageUrl = productSetting.imageUrl;
      }
    } catch (error) {
      console.error('Erro ao buscar configurações do produto:', error);
    }
  } else {
    // Compatibilidade com formato antigo
    const savedLinks = typeof window !== 'undefined' ? localStorage.getItem('productCheckoutUrls') : null;
    
    if (savedLinks) {
      try {
        const links = JSON.parse(savedLinks);
        const productLink = links.find((link: any) => link.id === product.id);
        
        if (productLink && productLink.checkoutUrl) {
          checkoutUrl = productLink.checkoutUrl;
        }
      } catch (error) {
        console.error('Erro ao buscar links de checkout:', error);
      }
    }
  }
  
  // Se checkoutUrl ainda estiver vazio, use o fallback da página interna
  if (!checkoutUrl) {
    checkoutUrl = `/product/${product.id}/checkout`;
  }
  
  return { checkoutUrl, imageUrl };
};

// Função para obter URL de checkout para um produto
const generateCheckoutUrl = (product: Product): string => {
  return getProductSettings(product).checkoutUrl;
};

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItem, setCartItem] = useState<CartItem | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  const getCheckoutUrl = (product: Product): string => {
    return generateCheckoutUrl(product);
  };

  const addToCart = (product: Product) => {
    const { checkoutUrl, imageUrl } = getProductSettings(product);
    setCartItem({
      ...product,
      checkoutUrl,
      imageUrl: imageUrl || product.imageUrl
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
