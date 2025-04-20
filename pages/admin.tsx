import React, { useState, useEffect } from 'react';
import { products } from '../data/products';
import Link from 'next/link';

// Interface para o produto com links de checkout
interface ProductWithCheckout {
  id: number;
  name: string;
  checkoutUrl: string;
}

const Admin: React.FC = () => {
  // Estado para armazenar os produtos com seus links de checkout
  const [productLinks, setProductLinks] = useState<ProductWithCheckout[]>([]);
  const [message, setMessage] = useState<string>('');
  const [showMessage, setShowMessage] = useState<boolean>(false);

  // Inicializar o estado com os produtos do sistema
  useEffect(() => {
    // Buscar do localStorage quaisquer URLs já salvas anteriormente
    const savedLinks = localStorage.getItem('productCheckoutUrls');
    
    if (savedLinks) {
      // Se houver dados salvos, usá-los
      setProductLinks(JSON.parse(savedLinks));
    } else {
      // Caso contrário, inicializar com os produtos do sistema sem URLs
      const initialLinks = products.map(product => ({
        id: product.id,
        name: product.name,
        checkoutUrl: product.checkoutUrl || ''
      }));
      setProductLinks(initialLinks);
    }
  }, []);

  // Função para atualizar a URL de checkout de um produto
  const handleUrlChange = (id: number, url: string) => {
    const updatedLinks = productLinks.map(product => 
      product.id === id ? { ...product, checkoutUrl: url } : product
    );
    setProductLinks(updatedLinks);
  };

  // Função para salvar as configurações
  const saveSettings = () => {
    // Salvar no localStorage
    localStorage.setItem('productCheckoutUrls', JSON.stringify(productLinks));
    
    // Exibir mensagem de sucesso
    setMessage('Links de checkout salvos com sucesso!');
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
          <h1 className="text-2xl font-bold">Configuração de Links de Checkout</h1>
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
                  {productLinks.map((product) => (
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
                          onChange={(e) => handleUrlChange(product.id, e.target.value)}
                          placeholder="https://seu-gateway-pagamento.com/checkout?id=123"
                          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

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

        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-700">
          <p>
            <strong>Dica:</strong> Você pode configurar diferentes URLs de gateway de pagamento para cada produto. 
            Assegure-se de que as URLs inseridas são válidas e apontam para páginas de checkout existentes em seu provedor de pagamentos.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Admin;