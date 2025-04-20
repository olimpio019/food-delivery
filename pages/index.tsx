import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Banner from '../components/Banner';
import CategoryCard from '../components/CategoryCard';
import ProductCard from '../components/ProductCard';
import { categories } from '../data/categories';
import { Product, products as originalProducts, getProductsByCategory as originalGetProductsByCategory } from '../data/products';

const Home: React.FC = () => {
  const router = useRouter();
  const { search } = router.query;
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [products, setProducts] = useState<Product[]>([]);
  
  // Load product settings from localStorage
  useEffect(() => {
    const loadProductSettings = () => {
      // Start with original products
      let productsWithSettings = [...originalProducts];
      
      // Check if we have saved settings
      const savedSettings = typeof window !== 'undefined' ? localStorage.getItem('productSettings') : null;
      
      if (savedSettings) {
        try {
          const settings = JSON.parse(savedSettings);
          
          // Apply settings to products
          productsWithSettings = originalProducts.map(product => {
            const productSetting = settings.find((s: any) => s.id === product.id);
            
            if (productSetting) {
              return {
                ...product,
                imageUrl: productSetting.imageUrl || product.imageUrl,
                checkoutUrl: productSetting.checkoutUrl || product.checkoutUrl
              };
            }
            
            return product;
          });
        } catch (error) {
          console.error('Error loading product settings:', error);
        }
      }
      
      setProducts(productsWithSettings);
    };
    
    loadProductSettings();
  }, []);
  
  // Function to get products by category with settings applied
  const getProductsByCategory = (categoryId: number): Product[] => {
    return products.filter(product => product.categoryId === categoryId);
  };
  
  useEffect(() => {
    // Update the search query when the URL parameter changes
    if (search && typeof search === 'string') {
      setSearchQuery(search);
      // Reset category filter when searching
      setSelectedCategory(0);
    } else {
      setSearchQuery('');
    }
  }, [search]);

  // Filter products based on category and search query
  const getFilteredProducts = () => {
    let filtered = selectedCategory 
      ? getProductsByCategory(selectedCategory) 
      : products;
      
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(query) || 
        product.description.toLowerCase().includes(query)
      );
    }
    
    return filtered;
  };
  
  // Wait for products to be loaded before filtering
  const filteredProducts = products.length > 0 ? getFilteredProducts() : [];

  const handleCategorySelect = (categoryId: number) => {
    setSelectedCategory(categoryId);
    // Clear search query when selecting category
    if (searchQuery) {
      router.push('/');
    }
  };

  return (
    <div className="container mx-auto px-4">
      {/* Banner (hide when searching) */}
      {!searchQuery && <Banner />}
      
      {/* Search results heading */}
      {searchQuery && (
        <div className="mt-4 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Resultados para: "{searchQuery}"
          </h2>
          <p className="text-gray-500 text-sm">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'produto encontrado' : 'produtos encontrados'}
          </p>
        </div>
      )}
      
      {/* Categories */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4 px-4">Categorias</h2>
        <div className="flex overflow-x-auto hide-scrollbar">
          <div 
            className={`min-w-[100px] p-3 mx-2 first:ml-4 flex flex-col items-center 
              justify-center cursor-pointer transition-all duration-300 
              ${selectedCategory === 0 
                ? 'bg-primary/10 border-b-2 border-primary' 
                : 'hover:bg-gray-100'
              } rounded-t-xl`}
            onClick={() => handleCategorySelect(0)}
          >
            <div 
              className={`w-12 h-12 rounded-full flex items-center justify-center
              ${selectedCategory === 0 ? 'bg-primary text-white' : 'bg-gray-100 text-gray-500'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M3.97 12.97c-.12.14-.23.29-.34.44-.01.01-.02.02-.02.03-.11.15-.22.3-.31.46-.02.02-.03.05-.05.07-.09.15-.17.3-.25.46l-.02.06c-.07.15-.14.31-.2.47-.01.02-.02.05-.02.07-.06.16-.11.33-.16.49v.07c-.05.16-.09.33-.12.5v.06c-.04.17-.07.35-.09.52v.07c-.02.17-.04.35-.05.52v.24c0 .06 0 .11-.01.17s.01.11.01.16v.24c.01.18.03.35.05.52v.07c.02.18.05.35.09.52v.06c.04.17.08.34.12.5v.07c.05.17.1.33.16.49.01.03.02.05.02.07.06.16.13.32.2.47l.02.06c.08.16.16.31.25.46.02.02.03.05.05.07.09.16.19.31.31.46.01.01.02.02.02.03a5.12 5.12 0 00.34.44l.09.1c.09.1.19.19.29.28.44.44.96.78 1.56 1.01.24.09.5.16.75.21.14.03.28.05.43.07.05 0 .1.01.15.02.15.01.31.02.47.02 3.58 0 6.5-2.92 6.5-6.5s-2.92-6.5-6.5-6.5c-.16 0-.32.01-.48.02-.05 0-.1.01-.14.02-.15.02-.3.04-.44.07-.26.05-.51.12-.75.21-.59.23-1.12.57-1.56 1.01-.1.09-.2.18-.29.28l-.09.1z" />
              </svg>
            </div>
            <p className={`mt-2 text-xs font-medium ${selectedCategory === 0 ? 'text-primary' : 'text-gray-700'}`}>
              Todos
            </p>
          </div>
          
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              isActive={selectedCategory === category.id}
              onClick={() => handleCategorySelect(category.id)}
            />
          ))}
        </div>
      </div>
      
      {/* Products */}
      <div>
        <div className="flex justify-between items-center mb-4 px-4">
          <h2 className="text-xl font-bold text-gray-800">
            {searchQuery 
              ? 'Resultados da pesquisa'
              : selectedCategory 
                ? categories.find(c => c.id === selectedCategory)?.name 
                : 'Produtos populares'
            }
          </h2>
          {!searchQuery && (
            <div className="text-primary font-medium text-sm cursor-pointer hover:underline">
              Ver todos
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">
              {searchQuery 
                ? `Nenhum produto encontrado para "${searchQuery}".` 
                : 'Nenhum produto encontrado nesta categoria.'
              }
            </p>
            <button 
              onClick={() => {
                setSelectedCategory(0);
                if (searchQuery) {
                  router.push('/');
                }
              }}
              className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition"
            >
              Ver todos os produtos
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
