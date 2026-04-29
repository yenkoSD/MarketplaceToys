import React, { useState, useMemo, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Filter, ArrowLeft } from 'lucide-react';
import { MOCK_PRODUCTS } from '../constants';
import ProductCard from './ProductCard';
import ProductModal from './ProductModal';
import Pagination from './Pagination';
import { Product } from '../types';

const CATEGORIES_MAP: Record<string, string[]> = {
  'Mezco': ['DC', 'Marvel', 'RUMBLE'],
  'Mafex': ['Anime', 'Movies', 'Comics'],
  'Bandai': ['Anime', 'Movies', 'Comics'],
  'Storm Collectibles': ['Mortal Kombat', 'Tekken', 'DC'],
  'Otros': ['Accesorios', 'Personalización']
};

// Technical Asset Architecture & Neon Logic
const BRAND_CONFIG: Record<string, { logo: string, glow: string, fallbackColor: string, description: string }> = {
  'Mezco': {
    logo: '/assets/logos/logo-mezco.png',
    glow: 'drop-shadow(0 0 15px rgba(255, 255, 255, 0.4)) drop-shadow(0 0 30px rgba(6, 182, 212, 0.3))',
    fallbackColor: '#00FFFF',
    description: 'One:12 Collective / Premium Fabric Figures'
  },
  'Mafex': {
    logo: '/assets/logos/logo-mafex.png',
    glow: 'drop-shadow(0 0 15px rgba(220, 38, 38, 0.5)) drop-shadow(0 0 25px rgba(234, 179, 8, 0.3))',
    fallbackColor: '#FFD700',
    description: 'Medicom Toy / Ultimate Articulation Comics'
  },
  'Bandai': {
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Bandai_Namco_Holdings_logo.svg/2560px-Bandai_Namco_Holdings_logo.svg.png',
    glow: 'drop-shadow(0 0 20px rgba(255, 0, 0, 0.6))',
    fallbackColor: '#FF0000',
    description: 'S.H. Figuarts / The Anime Standard'
  },
  'Storm Collectibles': {
    logo: 'https://stormco.com.hk/cdn/shop/files/Storm_Logo_Black.png?v=1614332344',
    glow: 'drop-shadow(0 0 15px rgba(255, 255, 255, 0.4))',
    fallbackColor: '#000000',
    description: 'Fighting Game Legends / Perfectly Posed'
  },
  'Otros': {
    logo: '/src/assets/inventory.svg',
    glow: 'drop-shadow(0 0 15px rgba(255, 255, 255, 0.2))',
    fallbackColor: '#71717A',
    description: 'Archive Gear / Accessories & Customs'
  }
};

export default function BrandLayout() {
  const { brandName } = useParams<{ brandName: string }>();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [imageError, setImageError] = useState(false);
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Reset to page 1 and auto-scroll when brand or filters change
  useEffect(() => {
    setCurrentPage(1);
    
    // Auto-scroll logic for search/category changes
    if (search || selectedCategory) {
      const element = document.getElementById('brand-toolbar');
      if (element) {
        const offset = element.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top: offset, behavior: 'smooth' });
      }
    }
  }, [brandName, search, selectedCategory]);
  // Background selection logic
  // FUTURE: This content can be connected to the Spring Boot backend API to fetch dynamic imagery
  const brandBackground = useMemo(() => {
    // Objeto de configuración de fondos (URLs externas para el demo)
    const BACKGROUNDS_MAP: Record<string, string> = {
      'Mezco': 'https://vignette.wikia.nocookie.net/batman/images/f/f6/Mezco_One_12_Collective_Batman_figures.jpg/revision/latest?cb=20160228001041',
      'Mafex': 'https://i.pinimg.com/originals/af/8d/64/af8d641c2c3175c00e19a4e2197f4a56.jpg',
      'Bandai': 'https://i.ebayimg.com/images/g/Yv0AAOSw7z1j~95W/s-l1600.jpg',
      'Storm Collectibles': 'https://media.eventhubs.com/images/2016/09/26_stormcollectibles01.jpg',
      'Otros': 'https://w.wallhaven.cc/full/xl/wallhaven-xlrxw3.jpg'
    };

    const brandNameNormalized = brandName || 'Otros';
    
    // Retorna la URL correspondiente o una imagen por defecto de cómic
    return BACKGROUNDS_MAP[brandNameNormalized] || 'https://www.transparenttextures.com/patterns/comic-book.png';
  }, [brandName]);

  const brandState = useMemo(() => {
    const config = brandName ? BRAND_CONFIG[brandName] : null;
    return {
      config,
      displayName: brandName?.toUpperCase(),
      hasImage: !!config && !imageError
    };
  }, [brandName, imageError]);

  const categories = brandName ? CATEGORIES_MAP[brandName] || ['All'] : ['All'];

  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter((p) => {
      const matchesBrand = p.brand.toLowerCase() === brandName?.toLowerCase();
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = !selectedCategory || p.category.toLowerCase().includes(selectedCategory.toLowerCase()) || p.description.toLowerCase().includes(selectedCategory.toLowerCase());
      return matchesBrand && matchesSearch && matchesCategory;
    });
  }, [brandName, search, selectedCategory]);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredProducts.slice(startIndex, startIndex + pageSize);
  }, [filteredProducts, currentPage]);

  const totalPages = Math.ceil(filteredProducts.length / pageSize);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: document.getElementById('brand-toolbar')?.offsetTop ? document.getElementById('brand-toolbar')!.offsetTop : 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Brand Banner - Dynamic Background with Comic Overlay */}
      <div className="min-h-[50vh] min-h-[400px] relative overflow-hidden bg-zinc-900">
        <AnimatePresence mode="wait">
          <motion.div
            key={brandBackground}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${brandBackground})` }}
          />
        </AnimatePresence>

        {/* Semi-transparent Overlay for visibility of both image and text */}
        <div className="absolute inset-0 bg-black/60 z-0"></div>
        
        <div className="flex flex-col items-center justify-center relative pt-24 pb-20 px-8 h-full min-h-[50vh]">
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 opacity-10 pointer-events-none z-0" 
               style={{ backgroundImage: 'radial-gradient(#fff 2px, transparent 2px)', backgroundSize: '32px 32px' }}>
          </div>
          
          <motion.div 
            key={brandName}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="z-10 w-full max-w-6xl mx-auto"
          >
            <Link to="/" className="text-[10px] uppercase font-bold tracking-[0.4em] text-white/60 hover:text-white transition-colors flex items-center gap-2 mb-16">
              <ArrowLeft size={12} strokeWidth={2} /> Regresar al Archivo
            </Link>
            
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
              {/* Left side: The Logo with Glow */}
              {brandState.config && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="relative flex-shrink-0"
                >
                  <div className="p-8 rounded-[40px] bg-white/5 backdrop-blur-xl border border-white/10" style={{ boxShadow: brandState.config.glow.includes('rgba') ? brandState.config.glow : 'none' }}>
                    {!imageError ? (
                      <img 
                        src={brandState.config.logo} 
                        alt={brandName} 
                        onError={() => setImageError(true)}
                        className="h-24 md:h-32 w-auto object-contain brightness-0 invert opacity-90"
                      />
                    ) : (
                      <div 
                        className="h-24 w-48 md:h-32 md:w-64 flex items-center justify-center font-serif italic text-4xl text-white"
                      >
                        {brandState.displayName}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Right side: Modern Typography Header */}
              <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-6"
                >
                  <h1 className="text-6xl md:text-8xl font-serif font-black italic tracking-tighter text-white leading-none">
                    {brandName}
                  </h1>
                  <p className="text-lg md:text-xl font-medium text-white/70 max-w-xl leading-relaxed uppercase tracking-tight">
                    {brandState.config?.description || 'ARCHIVAL QUALITY SCALE FIGURES FOR DISCERNING COLLECTORS.'}
                  </p>
                  
                  <div className="flex items-center gap-4 pt-4 justify-center lg:justify-start">
                    <div className="h-[1px] w-8 bg-white/20"></div>
                    <span className="text-[10px] font-bold tracking-[0.4em] text-white/40 uppercase">Vault Authenticated v.24</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Toolbar - Minimalist */}
      <div id="brand-toolbar" className="border-b border-zinc-100 bg-white sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="relative w-full md:w-96">
            <Search size={14} className="absolute left-0 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={`BUSCAR EN ${brandName?.toUpperCase()}...`}
              className="w-full pl-6 pr-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] outline-none border-b border-transparent focus:border-zinc-200 transition-all"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-6 py-2.5 text-[10px] font-bold uppercase tracking-widest rounded-full transition-all whitespace-nowrap ${
                !selectedCategory 
                  ? 'bg-black text-white' 
                  : 'text-zinc-400 hover:text-black hover:bg-zinc-50'
              }`}
            >
              TODAS LAS SERIES
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2.5 text-[10px] font-bold uppercase tracking-widest rounded-full transition-all whitespace-nowrap ${
                  selectedCategory === cat 
                    ? 'bg-black text-white' 
                    : 'text-zinc-400 hover:text-black hover:bg-zinc-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Product List */}
      <main className="max-w-7xl mx-auto px-8 py-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={brandName + search + selectedCategory + currentPage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10"
          >
            {paginatedProducts.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onInfo={(prod) => setSelectedProduct(prod)}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {paginatedProducts.length > 0 ? (
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            activeColor={brandState.config?.fallbackColor}
          />
        ) : (
          filteredProducts.length === 0 && (
            <div className="py-40 text-center">
              <p className="font-serif italic text-2xl text-zinc-300">No archival data found for this selection.</p>
            </div>
          )
        )}
      </main>

      <AnimatePresence>
        {selectedProduct && (
          <ProductModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

