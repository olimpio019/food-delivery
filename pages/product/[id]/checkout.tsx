import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { products } from '../../../data/products';
import Link from 'next/link';

const ProductCheckout: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [checkoutUrl, setCheckoutUrl] = useState('');

  useEffect(() => {
    if (id) {
      // Encontrar o produto pelo ID
      const productId = parseInt(id as string);
      
      // Carregar produtos padrão e personalizados
      let allProducts = [...products];
      const savedCustomProducts = typeof window !== 'undefined' ? localStorage.getItem('customProducts') : null;
      
      if (savedCustomProducts) {
        try {
          const customProducts = JSON.parse(savedCustomProducts);
          allProducts = [...allProducts, ...customProducts];
        } catch (error) {
          console.error('Erro ao carregar produtos personalizados:', error);
        }
      }
      
      let foundProduct = allProducts.find(p => p.id === productId);
      
      if (foundProduct) {
        // Verificar se existem configurações guardadas para o produto
        const savedSettings = typeof window !== 'undefined' ? localStorage.getItem('productSettings') : null;
        
        if (savedSettings) {
          try {
            const settings = JSON.parse(savedSettings);
            const productSetting = settings.find((s: any) => s.id === foundProduct.id);
            
            if (productSetting) {
              // Aplicar as configurações salvas
              foundProduct = {
                ...foundProduct,
                imageUrl: productSetting.imageUrl || foundProduct.imageUrl,
                checkoutUrl: productSetting.checkoutUrl || foundProduct.checkoutUrl
              };
            }
          } catch (error) {
            console.error('Erro ao carregar configurações do produto:', error);
          }
        }
        
        setProduct(foundProduct);
        
        // Usar o checkout URL configurado ou gerar um simulado
        let checkoutUrl = foundProduct.checkoutUrl;
        if (!checkoutUrl) {
          // Gerar URL de checkout simulado
          const baseUrl = 'https://checkout.example.com';
          const params = new URLSearchParams({
            product_id: foundProduct.id.toString(),
            price: foundProduct.price.toString(),
            name: foundProduct.name,
            currency: 'BRL'
          });
          
          checkoutUrl = `${baseUrl}?${params.toString()}`;
        }
        
        setCheckoutUrl(checkoutUrl);
      }
      
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-10 text-center">
        <div className="animate-spin w-10 h-10 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
        <p className="mt-4 text-gray-600">Carregando...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-10 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Produto não encontrado</h2>
        <p className="text-gray-600 mb-6">O produto que você está procurando não existe.</p>
        <Link href="/" className="inline-block bg-primary text-white py-2 px-6 rounded-xl hover:bg-primary/90 transition">
          Voltar para a loja
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Checkout do Produto</h1>
        
        <div className="bg-white rounded-2xl shadow-md overflow-hidden mb-6">
          <div className="p-6">
            <div className="flex flex-col md:flex-row items-start">
              <div 
                className="w-full md:w-1/3 h-48 bg-gray-200 rounded-xl mr-0 md:mr-6 mb-4 md:mb-0 bg-cover bg-center"
                style={{
                  backgroundImage: product.imageUrl 
                    ? `url("${product.imageUrl}")` 
                    : `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 300 200'%3E%3Crect fill='%23${product.color || 'F5F5F5'}' width='300' height='200'/%3E%3Ctext fill='%23555' font-family='sans-serif' font-size='18' x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle'%3E${product.name}%3C/text%3E%3C/svg%3E")`
                }}
              ></div>
              
              <div className="flex-1">
                <h2 className="text-xl font-bold mb-2">{product.name}</h2>
                <p className="text-gray-600 mb-4">{product.description}</p>
                
                <div className="flex items-center mb-4">
                  <span className="text-primary font-bold text-2xl">R$ {product.price.toFixed(2)}</span>
                  {product.originalPrice && (
                    <span className="text-gray-400 text-sm line-through ml-2">
                      R$ {product.originalPrice.toFixed(2)}
                    </span>
                  )}
                  {product.discount > 0 && (
                    <span className="bg-primary/10 text-primary text-xs font-bold px-2 py-1 rounded-full ml-2">
                      {product.discount}% OFF
                    </span>
                  )}
                </div>

                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">ID do produto: {product.id}</h3>
                  <p className="text-xs text-gray-500">
                    Esta página permite que você acesse diretamente o checkout para este produto específico.
                  </p>
                </div>
                
                {product.id === 7 && (
                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Escolha sua bebida de brinde:</h3>
                    <select 
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      defaultValue=""
                    >
                      <option value="" disabled>Selecione uma bebida</option>
                      <option value="coca">Coca-Cola 350ml</option>
                      <option value="guarana">Guaraná 350ml</option>
                      <option value="suco">Suco Natural 300ml</option>
                    </select>
                  </div>
                )}

                <div className="flex space-x-4">
                  <a
                    href={checkoutUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-primary text-white py-3 rounded-xl font-bold hover:bg-primary/90 transition text-center"
                  >
                    Finalizar Compra
                  </a>
                  
                  <Link href="/" className="bg-gray-100 text-gray-700 py-3 px-6 rounded-xl font-medium hover:bg-gray-200 transition">
                    Voltar
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-700">
          <p>
            <strong>Simulação:</strong> Em um ambiente de produção, esta página redirecionaria para o serviço de pagamento 
            real como Stripe, PayPal ou MercadoPago com os detalhes do produto.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCheckout;