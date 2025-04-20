import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { CartContext } from '../contexts/CartContext';
import Layout from '../components/Layout';

const Checkout: React.FC = () => {
  const { cartItem } = useContext(CartContext);
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    paymentMethod: 'credit'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  // Redirect if cart is empty
  useEffect(() => {
    if (!cartItem) {
      router.push('/');
    }
  }, [cartItem, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate order processing
    setTimeout(() => {
      setIsLoading(false);
      setOrderComplete(true);
    }, 1500);
  };

  if (orderComplete) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="bg-white rounded-2xl p-6 shadow-md">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full mx-auto flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mt-4 mb-2">Pedido Concluído!</h2>
            <p className="text-gray-600 mb-6">
              Seu pedido foi processado com sucesso. Você receberá uma confirmação por e-mail em breve.
            </p>
            <button
              onClick={() => router.push('/')}
              className="bg-primary text-white py-3 px-6 rounded-xl font-medium hover:bg-primary/90 transition"
            >
              Voltar para a Loja
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Finalizar Pedido</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Order Form */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <h2 className="text-lg font-bold mb-4">Informações de Entrega</h2>
              
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Endereço</label>
                    <textarea
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      rows={3}
                      className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">Cidade</label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">CEP</label>
                      <input
                        type="text"
                        id="zipCode"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                        required
                      />
                    </div>
                  </div>
                </div>

                <h2 className="text-lg font-bold mt-8 mb-4">Método de Pagamento</h2>
                
                <div className="space-y-3">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="credit"
                      name="paymentMethod"
                      value="credit"
                      checked={formData.paymentMethod === 'credit'}
                      onChange={handleChange}
                      className="h-4 w-4 text-primary"
                    />
                    <label htmlFor="credit" className="ml-2 text-gray-700">
                      Cartão de Crédito
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="debit"
                      name="paymentMethod"
                      value="debit"
                      checked={formData.paymentMethod === 'debit'}
                      onChange={handleChange}
                      className="h-4 w-4 text-primary"
                    />
                    <label htmlFor="debit" className="ml-2 text-gray-700">
                      Cartão de Débito
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="pix"
                      name="paymentMethod"
                      value="pix"
                      checked={formData.paymentMethod === 'pix'}
                      onChange={handleChange}
                      className="h-4 w-4 text-primary"
                    />
                    <label htmlFor="pix" className="ml-2 text-gray-700">
                      Pix
                    </label>
                  </div>
                </div>

                <div className="mt-8">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full py-3 rounded-xl font-bold text-white ${
                      isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary hover:bg-primary/90'
                    } transition`}
                  >
                    {isLoading ? 'Processando...' : 'Confirmar Pedido'}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-md sticky top-20">
              <h2 className="text-lg font-bold mb-4">Resumo do Pedido</h2>
              
              {cartItem && (
                <div className="border-b pb-4 mb-4">
                  <div className="flex items-center">
                    <div 
                      className="w-16 h-16 bg-gray-200 rounded-xl mr-3 flex-shrink-0 bg-cover bg-center"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 80 80'%3E%3Crect fill='%23${cartItem.color || 'F5F5F5'}' width='80' height='80'/%3E%3Ctext fill='%23555' font-family='sans-serif' font-size='10' x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle'%3E${cartItem.name}%3C/text%3E%3C/svg%3E")`
                      }}
                    ></div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-800">{cartItem.name}</h3>
                      <p className="text-primary font-bold">R$ {cartItem.price.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal:</span>
                  <span>R$ {cartItem ? cartItem.price.toFixed(2) : '0.00'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Taxa de entrega:</span>
                  <span>R$ 5.00</span>
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between font-bold">
                    <span>Total:</span>
                    <span>R$ {cartItem ? (cartItem.price + 5).toFixed(2) : '5.00'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;