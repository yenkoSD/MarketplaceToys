import React from 'react';
import { motion } from 'motion/react';
import { X, ShoppingBag } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const { addToCart } = useCart();
  const [activeImage, setActiveImage] = React.useState(product.image);
  
  const galleryImages = product.images || [product.image];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative bg-white w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col md:flex-row shadow-2xl rounded-[32px] border border-black/5"
      >
        <button
          onClick={onClose}
          className="absolute top-8 right-8 z-20 p-2 bg-white/80 backdrop-blur-md rounded-full hover:bg-[#1D1D1F] hover:text-white transition-all shadow-sm border border-black/5"
        >
          <X size={20} />
        </button>

        <div className="w-full md:w-3/5 p-6 md:p-10 flex flex-col gap-6 bg-[#F5F5F7]/30 overflow-y-auto">
          <div className="aspect-square w-full overflow-hidden bg-white rounded-3xl border border-black/5 shadow-inner">
            <motion.img
              key={activeImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              src={activeImage}
              alt={product.name}
              className="w-full h-full object-contain p-8"
            />
          </div>

          {/* Angles & Details Gallery */}
          <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
            {galleryImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(img)}
                className={`flex-shrink-0 w-24 h-24 rounded-2xl overflow-hidden border-2 transition-all ${
                  activeImage === img ? 'border-[#0066CC] shadow-lg scale-95' : 'border-transparent opacity-60 hover:opacity-100 hover:scale-105'
                }`}
              >
                <img src={img} alt={`Angle ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div className="w-full md:w-2/5 p-8 md:p-14 overflow-y-auto flex flex-col bg-white">
          <div className="space-y-10">
            <div className="space-y-4">
              <span className="text-[10px] uppercase font-bold tracking-[0.4em] text-[#86868B]">
                {product.brand} • {product.category}
              </span>
              <h2 className="text-4xl md:text-5xl font-serif font-black italic tracking-tighter leading-none text-[#1D1D1F]">
                {product.name}
              </h2>
            </div>

            <p className="text-base text-[#86868B] leading-relaxed font-medium">
              {product.description}
            </p>

            <div className="pt-10 flex items-center justify-between border-t border-black/5">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#86868B] mb-1">Precio Vault</span>
                <span className="text-4xl font-serif font-black italic tracking-tighter text-[#1D1D1F]">${product.price.toFixed(2)}</span>
              </div>
              <button
                onClick={() => { addToCart(product); onClose(); }}
                className="bg-[#1D1D1F] text-white px-10 py-5 rounded-full text-xs font-bold uppercase tracking-[0.3em] flex items-center gap-3 hover:bg-[#0066CC] transition-all active:scale-95 shadow-xl shadow-black/10"
              >
                <ShoppingBag size={18} /> Añadir
              </button>
            </div>

            <div className="grid grid-cols-2 gap-8 pt-10 text-[9px] uppercase font-bold tracking-[0.3em] text-[#86868B] border-t border-black/5">
              <div className="flex flex-col gap-2">
                <span>Articulación</span>
                <span className="text-[#1D1D1F]">30+ Puntos de Pose</span>
              </div>
              <div className="flex flex-col gap-2">
                <span>Autenticidad</span>
                <span className="text-[#1D1D1F]">100% Genuino</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
