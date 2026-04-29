import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

export default function CartDrawer() {
  const { items, totalPrice, updateQuantity, removeFromCart, isCartOpen, setIsCartOpen } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-[101] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-8 flex justify-between items-center bg-white">
              <div className="flex items-center gap-3">
                <ShoppingBag size={20} className="text-[#1D1D1F]" />
                <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#1D1D1F]">TU BÓVEDA</h2>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 hover:bg-[#F5F5F7] rounded-full transition-colors"
                aria-label="Close cart"
              >
                <X size={20} />
              </button>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-8 space-y-8">
              {items.length > 0 ? (
                items.map((item) => (
                  <div key={item.id} className="flex gap-6 group">
                    <div className="w-24 h-28 bg-[#F5F5F7] flex-shrink-0 rounded-2xl overflow-hidden border border-black/5">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                      />
                    </div>
                    <div className="flex-1 flex flex-col pt-1">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-sm font-serif font-black italic tracking-tighter leading-tight max-w-[150px] text-[#1D1D1F]">
                          {item.name}
                        </h4>
                        <span className="font-mono text-sm font-bold text-[#0066CC] tracking-tighter">${item.price.toFixed(2)}</span>
                      </div>
                      <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#86868B] mb-auto">
                        {item.brand}
                      </p>
                      
                      {/* Controls */}
                      <div className="flex items-center justify-between mt-6">
                        <div className="flex items-center bg-[#F5F5F7] rounded-full p-1">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-1 px-2 hover:bg-white rounded-full transition-all"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="w-8 text-center text-[11px] font-black text-[#1D1D1F]">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-1 px-2 hover:bg-white rounded-full transition-all"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-[#86868B]/40 hover:text-[#ff3131] transition-colors p-2"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                  <div className="w-20 h-20 rounded-full bg-[#F5F5F7] flex items-center justify-center text-[#86868B]/30">
                    <ShoppingBag size={32} />
                  </div>
                  <p className="font-serif italic text-xl text-[#86868B]">
                    Tu colección está esperando nuevas piezas
                  </p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="text-[10px] font-black uppercase tracking-[0.4em] border-b border-[#1D1D1F] pb-1 hover:text-[#0066CC] hover:border-[#0066CC] transition-all"
                  >
                    CONTINUAR NAVEGANDO
                  </button>
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-10 bg-white border-t border-black/5 space-y-8">
                <div className="flex justify-between items-baseline">
                  <span className="text-[10px] uppercase font-black tracking-[0.4em] text-[#86868B]">Total Est.</span>
                  <span className="text-4xl font-serif font-black italic tracking-tighter text-[#1D1D1F]">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
                <button 
                  onClick={handleCheckout}
                  className="w-full bg-[#1D1D1F] text-white py-5 rounded-full text-xs font-bold uppercase tracking-[0.4em] hover:bg-[#0066CC] transition-all flex items-center justify-center gap-3 shadow-[0_20px_40px_rgba(0,0,0,0.1)] active:scale-95"
                >
                  FINALIZAR COMPRA
                </button>
                <p className="text-center text-[8px] font-bold uppercase tracking-[0.3em] text-[#86868B]">
                  ENVÍO E IMPUESTOS CALCULADOS AL FINALIZAR
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
