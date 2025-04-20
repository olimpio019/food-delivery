import React, { useContext, useState } from 'react';
import { CartContext } from '../contexts/CartContext';
import { useRouter } from 'next/router';

const Navbar: React.FC = () => {
  const { toggleCart, cartItem } = useContext(CartContext);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (searchQuery.trim()) {
      // Navigate to home page with search query
      router.push({
        pathname: '/',
        query: { search: searchQuery },
      });
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 bg-white shadow-md z-50 h-16">
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <div className="text-primary font-bold text-2xl">
            <div className="h-8 w-24 relative">
              <div className="flex items-center">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="currentColor" 
                  className="w-8 h-8"
                >
                  <path d="M12 2C7.58 2 4 5.58 4 10c0 4.41 3.59 8 8 8s8-3.59 8-8c0-4.42-3.58-8-8-8zm-1 6V6h2v2h2v2h-2v2h-2v-2H9v-2h2z" />
                </svg>
                <span className="ml-1 hidden md:inline">FoodDelivery</span>
              </div>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex-1 mx-4 max-w-md">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Buscar produtos..."
              className="w-full py-2 pl-10 pr-4 text-sm bg-gray-100 border border-transparent rounded-xl focus:outline-none focus:bg-white focus:border-gray-300"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <button
              type="submit"
              className="absolute inset-y-0 right-0 flex items-center pr-3"
            >
              <span className="text-xs font-medium text-primary">Buscar</span>
            </button>
          </form>
        </div>

        {/* Cart Icon */}
        <div 
          className="relative" 
          onClick={toggleCart}
        >
          <div className="p-2 cursor-pointer">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-7 w-7 text-gray-700" 
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
            
            {/* Cart Item Counter */}
            {cartItem && (
              <div className="absolute -top-1 -right-1 bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                1
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
