import React from 'react';
import { Plus, Info } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { motion } from 'motion/react';

interface ProductCardProps {
  product: Product;
  onInfo: (product: Product) => void;
  key?: string;
}

export default function ProductCard({ product, onInfo }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <div className="group flex flex-col bg-white rounded-[32px] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-black/[0.03]">
      <div className="aspect-[4/5] overflow-hidden bg-[#F5F5F7] relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
        />
        
        {/* Brand Tag */}
        <div className="absolute top-6 left-6 bg-white/80 backdrop-blur-md text-[#1D1D1F] text-[9px] font-bold uppercase tracking-[0.2em] px-3 py-1.5 rounded-full border border-black/5">
          {product.brand}
        </div>
      </div>

      <div className="p-8 flex-1 flex flex-col bg-white">
        <div className="flex justify-between items-start mb-2">
          <h4 className="font-serif text-xl font-black italic tracking-tighter text-[#1D1D1F] truncate pr-2">
            {product.name}
          </h4>
          <span className="font-mono text-sm font-bold text-[#0066CC] flex-shrink-0 tracking-tighter">${product.price.toFixed(2)}</span>
        </div>
        
        <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#86868B] mb-8">
          {product.category} figura artifact
        </p>

        <div className="mt-auto grid grid-cols-2 gap-3">
          <button
            onClick={() => onInfo(product)}
            className="bg-[#F5F5F7] text-[#1D1D1F] py-3.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-[#E8E8ED] transition-all flex items-center justify-center gap-2"
          >
            <Info size={12} /> Detalle
          </button>
          <button
            onClick={() => addToCart(product)}
            className="bg-[#1D1D1F] text-white py-3.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-[#0066CC] transition-all flex items-center justify-center gap-2 shadow-lg shadow-black/5"
          >
            <Plus size={14} /> Añadir
          </button>
        </div>
      </div>
    </div>
  );
}
