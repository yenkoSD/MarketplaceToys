import React from 'react';
import { BRANDS } from '../constants';

interface SidebarProps {
  search: string;
  setSearch: (val: string) => void;
  brand: string;
  setBrand: (val: string) => void;
  price: number;
  setPrice: (val: number) => void;
}

export default function Sidebar({ search, setSearch, brand, setBrand, price, setPrice }: SidebarProps) {
  return (
    <aside className="w-full lg:w-72 border-r border-black p-6 flex flex-col gap-10 bg-gray-50 lg:sticky lg:top-20 lg:h-[calc(100vh-80px)] overflow-y-auto">
      <div>
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 mb-4">Search Figure</h3>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="SEARCH..."
          className="w-full border-b border-black/20 py-2 text-sm focus:border-black outline-none transition-colors uppercase font-medium placeholder:text-zinc-300 bg-transparent"
        />
      </div>

      <div>
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 mb-4">Brand Archives</h3>
        <div className="flex flex-col gap-3">
          <button
            onClick={() => setBrand('')}
            className={`text-left text-sm uppercase tracking-wider font-medium transition-colors ${
              brand === '' ? 'text-black' : 'text-zinc-400 hover:text-black'
            }`}
          >
            • All Brands
          </button>
          {BRANDS.map((b) => (
            <button
              key={b}
              onClick={() => setBrand(b)}
              className={`text-left text-sm uppercase tracking-wider font-medium transition-colors ${
                brand === b ? 'text-black font-black' : 'text-zinc-400 hover:text-black'
              }`}
            >
              • {b}
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">Price Limit</h3>
          <span className="font-mono text-[10px] font-bold">${price}</span>
        </div>
        <input
          type="range"
          min="0"
          max="300"
          value={price}
          onChange={(e) => setPrice(parseInt(e.target.value))}
          className="w-full h-1 bg-black appearance-none cursor-pointer accent-black"
        />
        <div className="flex justify-between text-[8px] font-mono mt-2 uppercase opacity-40">
          <span>$0</span>
          <span>$300</span>
        </div>
      </div>

      <div className="mt-auto pt-6 border-t border-black/10">
        <p className="neon-cantina mb-2">Live Status</p>
        <p className="text-[10px] leading-relaxed italic opacity-70 uppercase tracking-tighter">
          Stock verified in Tokyo Warehouse. Shipments arriving daily.
        </p>
      </div>
    </aside>
  );
}
