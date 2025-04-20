import React, { useState, useEffect } from 'react';
import { products } from '../data/products';
import Link from 'next/link';

// Interface para o produto com configurações adicionais
interface ProductWithSettings {
  id: number;
  name: string;
  checkoutUrl: string;
  imageUrl: string;
}

const Admin: React.FC = () => {
  // Estado para armazenar os produtos com suas configurações
  const [productSettings, setProductSettings] = useState<ProductWithSettings[]>([]);
  const [message, setMessage] = useState<string>('');
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'checkout' | 'images'>('checkout');

  // Inicializar o estado com os produtos do sistema
  useEffect(() => {
    // Buscar do localStorage quaisquer configurações já salvas anteriormente
    const savedSettings = localStorage.getItem('productSettings');
    
    if (savedSettings) {
      // Se houver dados salvos, usá-los
      setProductSettings(JSON.parse(savedSettings));
    } else {
      // Caso contrário, inicializar com os produtos do sistema sem URLs
      const initialSettings = products.map(product => ({
        id: product.id,
        name: product.name,
        checkoutUrl: product.checkoutUrl || '',
        imageUrl: product.imageUrl || ''
      }));
      setProductSettings(initialSettings);
    }
  }, []);

  // Função para atualizar a URL de checkout de um produto
  const handleCheckoutUrlChange = (id: number, url: string) => {
    const updatedSettings = productSettings.map(product => 
      product.id === id ? { ...product, checkoutUrl: url } : product
    );
    setProductSettings(updatedSettings);
  };
  
  // Função para atualizar a URL da imagem de um produto
  const handleImageUrlChange = (id: number, url: string) => {
    const updatedSettings = productSettings.map(product => 
      product.id === id ? { ...product, imageUrl: url } : product
    );
    setProductSettings(updatedSettings);
  };

  // Função para salvar as configurações
  const saveSettings = () => {
    // Salvar ambas configurações no localStorage
    localStorage.setItem('productSettings', JSON.stringify(productSettings));
    
    // Também salvar no formato antigo para compatibilidade
    localStorage.setItem('productCheckoutUrls', JSON.stringify(
      productSettings.map(p => ({ id: p.id, name: p.name, checkoutUrl: p.checkoutUrl }))
    ));
    
    // Exibir mensagem de sucesso
    setMessage('Configurações salvas com sucesso!');
    setShowMessage(true);
    
    // Ocultar a mensagem após 3 segundos
    setTimeout(() => {
      setShowMessage(false);
    }, 3000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Configurações do Produto</h1>
          <Link href="/" className="bg-gray-100 text-gray-700 py-2 px-4 rounded-xl hover:bg-gray-200 transition">
            Voltar para a Loja
          </Link>
        </div>

        {showMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            <p>{message}</p>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="p-6">
            {/* Tabs */}
            <div className="flex border-b mb-6">
              <button 
                className={`px-4 py-2 font-medium ${activeTab === 'checkout' 
                  ? 'text-primary border-b-2 border-primary' 
                  : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => setActiveTab('checkout')}
              >
                Links de Checkout
              </button>
              <button 
                className={`px-4 py-2 font-medium ${activeTab === 'images' 
                  ? 'text-primary border-b-2 border-primary' 
                  : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => setActiveTab('images')}
              >
                Imagens dos Produtos
              </button>
            </div>

            {/* Conteúdo da Tab de Checkout */}
            {activeTab === 'checkout' && (
              <>
                <p className="text-gray-600 mb-4">
                  Configure abaixo os links de checkout externos para cada produto da sua loja. 
                  Estes links serão usados nos botões "Comprar" e "Finalizar Pedido".
                </p>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          ID
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Nome do Produto
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Link de Checkout
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {productSettings.map((product) => (
                        <tr key={product.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {product.id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {product.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <input
                              type="text"
                              value={product.checkoutUrl}
                              onChange={(e) => handleCheckoutUrlChange(product.id, e.target.value)}
                              placeholder="https://seu-gateway-pagamento.com/checkout?id=123"
                              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}

            {/* Conteúdo da Tab de Imagens */}
            {activeTab === 'images' && (
              <>
                <p className="text-gray-600 mb-4">
                  Configure abaixo as URLs das imagens para cada produto da sua loja.
                  Estas imagens serão mostradas nos cards de produtos e no checkout.
                </p>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          ID
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Nome do Produto
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          URL da Imagem
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Prévia
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {productSettings.map((product) => (
                        <tr key={product.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {product.id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {product.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <input
                              type="text"
                              value={product.imageUrl}
                              onChange={(e) => handleImageUrlChange(product.id, e.target.value)}
                              placeholder="https://exemplo.com/imagens/produto.jpg"
                              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                            />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {product.imageUrl ? (
                              <div 
                                className="w-16 h-16 rounded-lg bg-cover bg-center border border-gray-200"
                                style={{
                                  backgroundImage: `url("${product.imageUrl}")`
                                }}
                              ></div>
                            ) : (
                              <div 
                                className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 text-xs"
                              >
                                Sem imagem
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}

            <div className="mt-6">
              <button
                onClick={saveSettings}
                className="bg-primary text-white py-2 px-6 rounded-xl font-medium hover:bg-primary/90 transition"
              >
                Salvar Configurações
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-700">
            <p>
              <strong>Dica:</strong> Você pode configurar diferentes URLs de gateway de pagamento para cada produto. 
              Assegure-se de que as URLs inseridas são válidas e apontam para páginas de checkout existentes em seu provedor de pagamentos.
            </p>
          </div>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-sm text-yellow-700">
            <p>
              <strong>Acesso:</strong> Esta página de administração não é visível no menu principal. 
              Para acessá-la no futuro, digite diretamente a URL: <code className="bg-yellow-100 px-1 py-0.5 rounded">/admin</code>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;