import React from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { CartProvider } from '../contexts/CartContext';
import Layout from '../components/Layout';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Food Delivery - Peça Online</title>
        <meta name="description" content="Peça comida online com entrega rápida" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CartProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </CartProvider>
    </>
  );
}

export default MyApp;
