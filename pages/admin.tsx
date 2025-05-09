import React, { useState, useEffect } from 'react';
import { products as originalProducts, Product } from '../data/products';
import { categories } from '../data/categories';
import Link from 'next/link';

// Interface para o produto com configurações adicionais
interface ProductWithSettings {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount: number;
  categoryId: number;
  imageUrl?: string;
  checkoutUrl?: string;  // Permitir undefined
  color: string;
  rating?: number;
  isFeatured?: boolean;
}


const Admin: React.FC = () => {
  // Estado para armazenar os produtos com suas configurações
  const [productSettings, setProductSettings] = useState<ProductWithSettings[]>([]);
  const [message, setMessage] = useState<string>('');
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'checkout' | 'images' | 'products'>('checkout');
  
  // Estado para gerenciar os produtos personalizados
  const [customProducts, setCustomProducts] = useState<Product[]>([]);
  
  // Estado para o formulário de novo produto
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    description: '',
    price: 0,
    originalPrice: 0,
    discount: 0,
    categoryId: 1,
    imageUrl: '',
    checkoutUrl: '',
    color: 'F5F5F5',
  });
  
  // Estado para controlar o modo de edição (criar novo ou editar existente)
  const [editProductId, setEditProductId] = useState<number | null>(null);

  // Inicializar o estado com os produtos do sistema
  useEffect(() => {
    // Buscar do localStorage quaisquer configurações já salvas anteriormente
    const savedSettings = typeof window !== 'undefined' ? localStorage.getItem('productSettings') : null;
    
    if (savedSettings) {
      // Se houver dados salvos, usá-los
      setProductSettings(JSON.parse(savedSettings));
    } else {
      // Caso contrário, inicializar com os produtos do sistema sem URLs
      const initialSettings = originalProducts.map((product: Product) => ({
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        originalPrice: product.originalPrice,
        discount: product.discount,
        categoryId: product.categoryId,
        imageUrl: product.imageUrl || '',
        checkoutUrl: product.checkoutUrl || '',
        color: product.color || 'F5F5F5',
        rating: product.rating,
        isFeatured: product.isFeatured
      }));
      setProductSettings(initialSettings);
    }
    
    // Carregar produtos personalizados do localStorage
    const savedCustomProducts = typeof window !== 'undefined' ? localStorage.getItem('customProducts') : null;
    
    if (savedCustomProducts) {
      try {
        setCustomProducts(JSON.parse(savedCustomProducts));
      } catch (error) {
        console.error('Erro ao carregar produtos personalizados:', error);
      }
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

  // Função para criar novo produto
  const handleCreateProduct = () => {
    // Verificar se os campos obrigatórios estão preenchidos
    if (!newProduct.name || !newProduct.description || newProduct.price === undefined) {
      setMessage('Por favor, preencha todos os campos obrigatórios!');
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, 3000);
      return;
    }

    // Determinar o próximo ID disponível
    const allProducts = [...originalProducts, ...customProducts];
    const nextId = allProducts.length > 0 
      ? Math.max(...allProducts.map(p => p.id)) + 1 
      : 1;
    
    // Criar o novo produto
    const product: Product = {
      id: nextId,
      name: newProduct.name || '',
      description: newProduct.description || '',
      price: newProduct.price || 0,
      originalPrice: newProduct.originalPrice || undefined,
      discount: newProduct.discount || 0,
      categoryId: newProduct.categoryId || 1,
      imageUrl: newProduct.imageUrl || "",
      checkoutUrl: newProduct.checkoutUrl || "",
      color: newProduct.color || 'F5F5F5',
      isFeatured: false,
    };
    
    // Adicionar à lista de produtos personalizados
    const updatedCustomProducts = [...customProducts, product];
    setCustomProducts(updatedCustomProducts);
    
    // Adicionar às configurações de produtos
    const newProductSetting: ProductWithSettings = {
      id: product.id,
      name: product.name,
      checkoutUrl: product.checkoutUrl || '',
      imageUrl: product.imageUrl || ''
    };
    
    const updatedSettings = [...productSettings, newProductSetting];
    setProductSettings(updatedSettings);
    
    // Salvar no localStorage
    localStorage.setItem('customProducts', JSON.stringify(updatedCustomProducts));
    localStorage.setItem('productSettings', JSON.stringify(updatedSettings));
    
    // Resetar o formulário
    setNewProduct({
      name: '',
      description: '',
      price: 0,
      originalPrice: 0,
      discount: 0,
      categoryId: 1,
      imageUrl: '',
      checkoutUrl: '',
      color: 'F5F5F5',
    });
    
    // Exibir mensagem de sucesso
    setMessage('Produto criado com sucesso!');
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 3000);
  };
  
  // Função para editar um produto existente
  const handleEditProduct = (product: Product) => {
    // Preencher o formulário com os dados do produto
    setNewProduct({
      name: product.name,
      description: product.description,
      price: product.price,
      originalPrice: product.originalPrice || 0,
      discount: product.discount,
      categoryId: product.categoryId,
      imageUrl: product.imageUrl || '',
      checkoutUrl: product.checkoutUrl || '',
      color: product.color || 'F5F5F5',
    });
    
    // Definir o modo de edição
    setEditProductId(product.id);
    
    // Ativar a aba de gerenciamento de produtos
    setActiveTab('products');
  };
  
  // Função para atualizar um produto existente
  const handleUpdateProduct = () => {
    if (!editProductId) return;
    
    // Verificar se os campos obrigatórios estão preenchidos
    if (!newProduct.name || !newProduct.description || newProduct.price === undefined) {
      setMessage('Por favor, preencha todos os campos obrigatórios!');
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, 3000);
      return;
    }
    
  // Atualizar o produto na lista de produtos personalizados
const updatedCustomProducts = customProducts.map(product => {
  if (product.id === editProductId) {
    return {
      ...product,
      name: newProduct.name || '',
      description: newProduct.description || '',
      price: newProduct.price || 0,
      originalPrice: newProduct.originalPrice || undefined,
      discount: newProduct.discount || 0,
      categoryId: newProduct.categoryId || 1,
      imageUrl: newProduct.imageUrl || '', // Alterado aqui
      checkoutUrl: newProduct.checkoutUrl || '', // Alterado aqui
      color: newProduct.color || 'F5F5F5',
    };
  }
  return product;
});

setCustomProducts(updatedCustomProducts);

// Atualizar nas configurações do produto
const updatedSettings = productSettings.map(product => {
  if (product.id === editProductId) {
    return {
      ...product,
      name: newProduct.name || '',
      imageUrl: newProduct.imageUrl || '', // Alterado aqui
      checkoutUrl: newProduct.checkoutUrl || '', // Alterado aqui
    };
  }
  return product;
});

setProductSettings(updatedSettings);

// Salvar no localStorage
localStorage.setItem('customProducts', JSON.stringify(updatedCustomProducts));
localStorage.setItem('productSettings', JSON.stringify(updatedSettings));

// Resetar o formulário e o modo de edição
setNewProduct({
  name: '',
  description: '',
  price: 0,
  originalPrice: 0,
  discount: 0,
  categoryId: 1,
  imageUrl: '',
  checkoutUrl: '',
  color: 'F5F5F5',
});

setEditProductId(null);

// Exibir mensagem de sucesso
setMessage('Produto atualizado com sucesso!');
setShowMessage(true);
setTimeout(() => {
  setShowMessage(false);
}, 3000);
};

  // Funções auxiliares para o formulário
  const handleInputChange = (field: string, value: string | number) => {
    setNewProduct({
      ...newProduct,
      [field]: value
    });
  };
  
  // Função para cancelar a edição
  const handleCancelEdit = () => {
    setEditProductId(null);
    setNewProduct({
      name: '',
      description: '',
      price: 0,
      originalPrice: 0,
      discount: 0,
      categoryId: 1,
      imageUrl: '',
      checkoutUrl: '',
      color: 'F5F5F5',
    });
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
              <button 
                className={`px-4 py-2 font-medium ${activeTab === 'products' 
                  ? 'text-primary border-b-2 border-primary' 
                  : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => setActiveTab('products')}
              >
                Gerenciar Produtos
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
            
            {/* Conteúdo da Tab de Gerenciamento de Produtos */}
            {activeTab === 'products' && (
              <>
                <div className="mb-8">
                  <h3 className="text-lg font-bold mb-4">
                    {editProductId ? 'Editar Produto' : 'Adicionar Novo Produto'}
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Produto*</label>
                      <input
                        type="text"
                        value={newProduct.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="Ex: Pizza Margherita"
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Categoria*</label>
                      <select
                        value={newProduct.categoryId}
                        onChange={(e) => handleInputChange('categoryId', parseInt(e.target.value))}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                      >
                        {categories.map(category => (
                          <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Descrição*</label>
                      <textarea
                        value={newProduct.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        placeholder="Descrição do produto..."
                        rows={3}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Preço (R$)*</label>
                      <input
                        type="number"
                        value={newProduct.price}
                        onChange={(e) => handleInputChange('price', parseFloat(e.target.value))}
                        placeholder="29.90"
                        min="0"
                        step="0.01"
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Preço Original (R$)</label>
                      <input
                        type="number"
                        value={newProduct.originalPrice || ''}
                        onChange={(e) => handleInputChange('originalPrice', e.target.value ? parseFloat(e.target.value) : undefined)}
                        placeholder="39.90"
                        min="0"
                        step="0.01"
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Desconto (%)</label>
                      <input
                        type="number"
                        value={newProduct.discount}
                        onChange={(e) => handleInputChange('discount', parseInt(e.target.value))}
                        placeholder="10"
                        min="0"
                        max="100"
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Cor (Hex sem #)</label>
                      <input
                        type="text"
                        value={newProduct.color}
                        onChange={(e) => handleInputChange('color', e.target.value)}
                        placeholder="F5F5F5"
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">URL da Imagem</label>
                      <input
                        type="text"
                        value={newProduct.imageUrl}
                        onChange={(e) => handleInputChange('imageUrl', e.target.value)}
                        placeholder="https://exemplo.com/imagens/produto.jpg"
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">URL de Checkout</label>
                      <input
                        type="text"
                        value={newProduct.checkoutUrl}
                        onChange={(e) => handleInputChange('checkoutUrl', e.target.value)}
                        placeholder="https://seu-gateway-pagamento.com/checkout?id=123"
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                    
                    <div className="md:col-span-2 flex space-x-2">
                      {editProductId ? (
                        <>
                          <button
                            onClick={handleUpdateProduct}
                            className="bg-primary text-white py-2 px-6 rounded-xl font-medium hover:bg-primary/90 transition"
                          >
                            Atualizar Produto
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className="bg-gray-200 text-gray-700 py-2 px-6 rounded-xl font-medium hover:bg-gray-300 transition"
                          >
                            Cancelar
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={handleCreateProduct}
                          className="bg-primary text-white py-2 px-6 rounded-xl font-medium hover:bg-primary/90 transition"
                        >
                          Adicionar Produto
                        </button>
                      )}
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-bold mb-4">Produtos Personalizados</h3>
                  
                  {customProducts.length === 0 ? (
                    <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                      <p className="text-gray-500">Nenhum produto personalizado adicionado ainda.</p>
                      <p className="text-gray-500 text-sm mt-1">Use o formulário acima para adicionar produtos.</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              ID
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Nome
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Categoria
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Preço
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Desconto
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Ações
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {customProducts.map((product) => (
                            <tr key={product.id}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {product.id}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {product.name}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {categories.find(c => c.id === product.categoryId)?.name || '-'}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                R$ {product.price.toFixed(2)}
                                {product.originalPrice && (
                                  <span className="text-gray-400 text-xs line-through ml-2">
                                    R$ {product.originalPrice.toFixed(2)}
                                  </span>
                                )}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {product.discount > 0 ? `${product.discount}%` : '-'}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 space-x-2">
                                <button
                                  onClick={() => handleEditProduct(product)}
                                  className="text-blue-600 hover:text-blue-800"
                                >
                                  Editar
                                </button>
                                <button
                                  onClick={() => handleDeleteProduct(product.id)}
                                  className="text-red-600 hover:text-red-800"
                                >
                                  Excluir
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </>
            )}

            {(activeTab === 'checkout' || activeTab === 'images') && (
              <div className="mt-6">
                <button
                  onClick={saveSettings}
                  className="bg-primary text-white py-2 px-6 rounded-xl font-medium hover:bg-primary/90 transition"
                >
                  Salvar Configurações
                </button>
              </div>
            )}
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
