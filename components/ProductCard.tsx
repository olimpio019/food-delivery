import React, { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';
import { Product } from '../data/products';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { cartItem, addToCart, removeFromCart } = useContext(CartContext);
  
  const isInCart = cartItem?.id === product.id;

  const handleCartAction = () => {
    if (isInCart) {
      removeFromCart();
    } else {
      addToCart(product);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Product Image */}
      <div className="h-36 bg-gray-200 relative">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 300 200'%3E%3Crect fill='%23${product.color || 'F5F5F5'}' width='300' height='200'/%3E%3Ctext fill='%23555' font-family='sans-serif' font-size='18' x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle'%3E${product.name}%3C/text%3E%3C/svg%3E")`
          }}
        />
        {product.discount > 0 && (
          <div className="absolute top-2 left-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded-full">
            {product.discount}% OFF
          </div>
        )}
      </div>
      
      {/* Product Info */}
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-gray-800">{product.name}</h3>
            <p className="text-gray-500 text-sm mb-1">{product.description}</p>
          </div>
          
          {product.rating && (
            <div className="flex items-center bg-gray-100 px-2 py-1 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-xs font-bold ml-1">{product.rating}</span>
            </div>
          )}
        </div>
        
        <div className="flex justify-between items-center mt-3">
          <div>
            <p className="text-primary font-bold text-lg">R$ {product.price.toFixed(2)}</p>
            {product.originalPrice && (
              <p className="text-gray-400 text-xs line-through">
                R$ {product.originalPrice.toFixed(2)}
              </p>
            )}
          </div>
          
          <button
            onClick={handleCartAction}
            className={`px-3 py-2 rounded-xl text-sm font-bold transition-all duration-300 ${
              isInCart
                ? 'bg-green-100 text-green-700 hover:bg-green-200'
                : 'bg-primary text-white hover:bg-primary/90'
            }`}
          >
            {isInCart ? 'No Carrinho' : 'Adicionar'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
