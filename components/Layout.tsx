import React, { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import CartModal from './CartModal';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-16">
        {children}
      </main>
      <CartModal />
      <Footer />
    </div>
  );
};

export default Layout;
