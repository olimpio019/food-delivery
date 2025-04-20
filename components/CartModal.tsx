import React, { useContext, useRef, useEffect } from 'react';
import { CartContext } from '../contexts/CartContext';

const CartModal: React.FC = () => {
  const { isCartOpen, toggleCart, cartItem, removeFromCart } = useContext(CartContext);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      toggleCart();
    }
  };

  useEffect(() => {
    if (isCartOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isCartOpen, toggleCart]);

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div 
        ref={modalRef}
        className="bg-white rounded-2xl shadow-lg w-[90%] max-w-md mx-auto max-h-[80vh] overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-800">Seu Carrinho</h2>
          <button
            onClick={toggleCart}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {cartItem ? (
            <div className="bg-gray-50 rounded-xl p-4 flex items-center">
              <div 
                className="w-20 h-20 bg-gray-200 rounded-xl mr-3 flex-shrink-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 80 80'%3E%3Crect fill='%23${cartItem.color || 'F5F5F5'}' width='80' height='80'/%3E%3Ctext fill='%23555' font-family='sans-serif' font-size='10' x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle'%3E${cartItem.name}%3C/text%3E%3C/svg%3E")`
                }}
              ></div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-800">{cartItem.name}</h3>
                <p className="text-primary font-bold">R$ {cartItem.price.toFixed(2)}</p>
                <button
                  onClick={removeFromCart}
                  className="text-red-500 text-sm mt-1 hover:text-red-600 transition"
                >
                  Remover
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 mx-auto text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <p className="mt-2 text-gray-500">Seu carrinho está vazio</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t">
          <div className="flex justify-between items-center mb-4">
            <span className="font-medium">Total:</span>
            <span className="font-bold text-lg">
              R$ {cartItem ? cartItem.price.toFixed(2) : '0.00'}
            </span>
          </div>
          <button
            className={`w-full py-3 rounded-xl font-bold text-white ${
              cartItem
                ? 'bg-primary hover:bg-primary/90'
                : 'bg-gray-300 cursor-not-allowed'
            } transition`}
            disabled={!cartItem}
          >
            Finalizar Pedido
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartModal;
