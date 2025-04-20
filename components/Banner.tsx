import React from 'react';

const Banner: React.FC = () => {
  return (
    <div className="w-full h-48 md:h-64 lg:h-80 bg-primary relative rounded-2xl overflow-hidden my-4">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(/images/banner.png)' }}
      ></div>
      <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-12">
        <h1 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold mb-2">
          Peça sua comida favorita
        </h1>
        <p className="text-white/90 text-sm md:text-base mb-4 max-w-md">
          Entrega rápida e pagamento fácil. Milhares de restaurantes para você escolher.
        </p>
        <button className="bg-white text-primary font-bold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 w-fit">
          Pedir agora
        </button>
      </div>
    </div>
  );
};

export default Banner;