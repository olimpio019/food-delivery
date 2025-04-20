import React from 'react';
import { Category } from '../data/categories';

interface CategoryCardProps {
  category: Category;
  isActive: boolean;
  onClick: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, isActive, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`min-w-[100px] p-3 mx-2 first:ml-4 last:mr-4 flex flex-col items-center 
        justify-center cursor-pointer transition-all duration-300 
        ${isActive 
          ? 'bg-primary/10 border-b-2 border-primary' 
          : 'hover:bg-gray-100'
        } rounded-t-xl`}
    >
      <div 
        className={`w-12 h-12 rounded-full flex items-center justify-center
        ${isActive ? 'bg-primary text-white' : 'bg-gray-100 text-gray-500'}`}
      >
        {/* Icon based on category type */}
        <div className="w-6 h-6">
          {category.icon === 'pizza' && (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2c-5.5 0-10 4.5-10 10 0 5.5 4.5 10 10 10s10-4.5 10-10c0-5.5-4.5-10-10-10zm-4.5 10c0-.8.7-1.5 1.5-1.5s1.5.7 1.5 1.5-.7 1.5-1.5 1.5-1.5-.7-1.5-1.5zm3 4c0-.8.7-1.5 1.5-1.5s1.5.7 1.5 1.5-.7 1.5-1.5 1.5-1.5-.7-1.5-1.5zm3-7c0-.8.7-1.5 1.5-1.5s1.5.7 1.5 1.5-.7 1.5-1.5 1.5-1.5-.7-1.5-1.5zm3 2c0-.8.7-1.5 1.5-1.5s1.5.7 1.5 1.5-.7 1.5-1.5 1.5-1.5-.7-1.5-1.5z" />
            </svg>
          )}
          {category.icon === 'burger' && (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M2 16h20v2c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2v-2zm0-5c0-.6.4-1 1-1h18c.6 0 1 .4 1 1v3H2v-3zm10.6-7.8c3.2 0 5.9 1.8 7.3 4.4-1.9.8-7.3.8-11.8 0-1.1-.3-2-.5-3.1-.7 1.4-2.2 4.4-3.7 7.6-3.7zM22 8c0-1.1-.9-2-2-2h-.9c-.7-2.4-2.6-4.3-5-5.1-1.2-.4-2.5-.7-3.7-.7-4.3 0-8.1 2.9-9.2 7H4c-1.1 0-2 .9-2 2v1h20V8z" />
            </svg>
          )}
          {category.icon === 'dessert' && (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 6C7.03 6 3 10.03 3 15v4c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-4c0-4.97-4.03-9-9-9zm0 2c3.87 0 7 3.13 7 7v2H5v-2c0-3.87 3.13-7 7-7zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
            </svg>
          )}
          {category.icon === 'drink' && (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 2l2.21 20H18.8L21 2H3zm9 17c-1.66 0-3-1.34-3-3 0-1.55 1.18-2.83 2.7-2.98L12.85 5h1.5l1.15 8.02c1.52.15 2.7 1.43 2.7 2.98 0 1.66-1.34 3-3 3z" />
            </svg>
          )}
          {category.icon === 'pasta' && (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8.5 8.5C7.1 9.9 5.6 11.4 4 13l.7.7c1.6-1.6 3.1-3.1 4.5-4.5L8.5 8.5zm12.1.7c-.4.4-.8.7-1.2 1-1.1 1-2.2 1.9-3.3 3 .2.5.3 1.1.3 1.6 0 2.8-2.2 5-5 5-1.3 0-2.5-.5-3.4-1.3l-.6.6c1.1 1 2.5 1.6 4 1.6 3.3 0 6-2.7 6-6 0-.9-.2-1.7-.5-2.5l-.6.6c.9-1 1.7-1.9 2.8-2.9l-1.3-1.3 2.8.9.9-2.8-1.9 1.5zm-10 1.9c-1-1.1-1.9-2.2-2.9-3.3-.3.4-.6.8-1 1.2l-1.5-1.9 2.8-.9-.9-2.8-1.9 1.5 2.8 2.8c.4.4.7.8 1 1.2 1.1 1.1 2.2 2.2 3.3 3.3.5-.2 1.1-.3 1.6-.3.6 0 1.1.1 1.6.3 1.3-1.3 2.7-2.6 4-4l.8-.8c-1.4 1.4-2.9 2.8-4.5 4.2-1-.6-2.1-.9-3.3-.9-.5 0-1.1.1-1.6.3-.9-1-1.8-2-2.8-3L9 11.2c.5-.3 1-.5 1.6-.1z" />
            </svg>
          )}
          {!['pizza', 'burger', 'dessert', 'drink', 'pasta'].includes(category.icon) && (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8.1 13.34l2.83-2.83L3.91 3.5c-1.56 1.56-1.56 4.09 0 5.66l4.19 4.18zm6.78-1.81c1.53.71 3.68.21 5.27-1.38 1.91-1.91 2.28-4.65.81-6.12-1.46-1.46-4.2-1.1-6.12.81-1.59 1.59-2.09 3.74-1.38 5.27L3.7 19.87l1.41 1.41L12 14.41l6.88 6.88 1.41-1.41L13.41 13l1.47-1.47z" />
            </svg>
          )}
        </div>
      </div>
      <p className={`mt-2 text-xs font-medium ${isActive ? 'text-primary' : 'text-gray-700'}`}>
        {category.name}
      </p>
    </div>
  );
};

export default CategoryCard;
