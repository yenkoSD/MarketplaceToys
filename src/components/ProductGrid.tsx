import React, { useState, useMemo, useEffect } from 'react';
import { MOCK_PRODUCTS } from '../constants';
import Sidebar from './Sidebar';
import ProductCard from './ProductCard';
import ProductModal from './ProductModal';
import Pagination from './Pagination';
import { Product } from '../types';
import { AnimatePresence, motion } from 'motion/react';

export default function ProductGrid() {
  const [search, setSearch] = useState('');
  const [brand, setBrand] = useState('');
  const [price, setPrice] = useState(300);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  // Reset to page 1 and auto-scroll when filters change
  useEffect(() => {
    setCurrentPage(1);
    
    // Only scroll if we aren't at the top or if the user actually interacted
    // We check search, brand, and price strings to avoid scrolling on mount if not needed
    if (search || brand || price !== 300) {
      const element = document.getElementById('archive-title');
      if (element) {
        const offset = element.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top: offset, behavior: 'smooth' });
      }
    }
  }, [search, brand, price]);

  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
      const matchesBrand = brand === '' || p.brand === brand;
      const matchesPrice = p.price <= price;
      return matchesSearch && matchesBrand && matchesPrice;
    });
  }, [search, brand, price]);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredProducts.slice(startIndex, startIndex + pageSize);
  }, [filteredProducts, currentPage]);

  const totalPages = Math.ceil(filteredProducts.length / pageSize);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    document.getElementById('search-container')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="border-t border-black min-h-screen pt-20 bg-white">
      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-80px)]">
        <div id="search-container" className="scroll-mt-32">
          <Sidebar
            search={search}
            setSearch={setSearch}
            brand={brand}
            setBrand={setBrand}
            price={price}
            setPrice={setPrice}
          />
        </div>

        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="p-8 border-b border-black flex justify-between items-baseline bg-white sticky top-20 z-10">
            <h2 id="archive-title" className="text-5xl font-serif font-black italic tracking-tighter">THE ARCHIVE</h2>
            <span className="font-mono text-[10px] uppercase font-bold tracking-widest text-zinc-400">
              Artifact Count: {filteredProducts.length}
            </span>
          </div>

          {/* Grid Container - Removed custom-scroll-mask */}
          <div className="flex-1 p-8 bg-white overflow-y-auto">
            <AnimatePresence mode="wait">
              {paginatedProducts.length > 0 ? (
                <motion.div
                  key={currentPage + search + brand + price}
                  initial="hidden"
                  animate="visible"
                  variants={{
                    visible: {
                      transition: {
                        staggerChildren: 0.05
                      }
                    }
                  }}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10">
                    {paginatedProducts.map((product) => (
                      <motion.div
                        key={product.id}
                        variants={{
                          hidden: { opacity: 0, y: 30 },
                          visible: { opacity: 1, y: 0 }
                        }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                      >
                        <ProductCard
                          product={product}
                          onInfo={(p) => setSelectedProduct(p)}
                        />
                      </motion.div>
                    ))}
                  </div>
                  
                  <Pagination 
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </motion.div>
              ) : (
                <div className="h-64 flex flex-col items-center justify-center text-center space-y-4">
                  <p className="text-2xl font-serif italic text-zinc-400">Archival record empty.</p>
                  <button
                    onClick={() => { setSearch(''); setBrand(''); setPrice(300); }}
                    className="text-[10px] uppercase font-bold tracking-widest border-b border-black"
                  >
                    Reset Parameters
                  </button>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedProduct && (
          <ProductModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
