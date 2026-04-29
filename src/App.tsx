/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import HistorySection from './components/HistorySection';
import AppleCarousel from './components/AppleCarousel';
import AboutSection from './components/AboutSection';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import CartDrawer from './components/CartDrawer';
import BrandLayout from './components/BrandLayout';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { ChatWidget } from './components/ChatWidget';

function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function HomePage() {
  return (
    <>
      <Hero />
      <ProductGrid />
      <HistorySection />
      <AppleCarousel />
    </>
  );
}

function AboutPage() {
  return <AboutSection />;
}

function NavigationChatWrapper() {
  const { pathname } = useLocation();
  const hiddenPaths = ['/checkout', '/payment', '/success', '/cart'];
  const showChat = !hiddenPaths.includes(pathname);

  return (
    <AnimatePresence>
      {showChat && (
        <motion.div
          key="chat-widget-container"
          initial={{ opacity: 0, y: 40, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.8 }}
          transition={{ duration: 0.4, ease: "circOut" }}
          className="fixed bottom-6 right-6 z-[100]"
        >
          <ChatWidget />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function App() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <ScrollToTop />
          <div className="min-h-screen Selection:bg-black Selection:text-white">
            <Navbar onOpenAuth={() => setIsAuthOpen(true)} />
            
            <main>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/brand/:brandName" element={<BrandLayout />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/contact" element={<div className="min-h-screen py-40 flex items-center justify-center font-serif italic text-4xl">Página de Contacto (Próximamente)</div>} />
              </Routes>
            </main>

            <Footer />
            <CartDrawer />
            <NavigationChatWrapper />

            <AnimatePresence>
              {isAuthOpen && (
                <AuthModal onClose={() => setIsAuthOpen(false)} />
              )}
            </AnimatePresence>
          </div>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}
