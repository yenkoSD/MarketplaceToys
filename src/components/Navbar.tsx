import React, { useState, useEffect, useRef } from 'react';
import { ShoppingBag, User, Menu, X, Skull, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ onOpenAuth }: { onOpenAuth: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { totalItems, setIsCartOpen } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const navRef = useRef<HTMLElement>(null);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  // Close submenu on route change
  useEffect(() => {
    setIsProductsOpen(false);
    setIsUserMenuOpen(false);
    setIsOpen(false);
  }, [location.pathname]);

  // Click outside listener
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsProductsOpen(false);
        setIsUserMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const productBrands = [
    { name: 'Mezco', href: '/brand/Mezco', icon: '/src/assets/mezco.svg', description: 'One:12 Collective' },
    { name: 'Mafex', href: '/brand/Mafex', icon: '/src/assets/mafex.svg', description: 'Medicom Toy' },
    { name: 'Bandai', href: '/brand/Bandai', icon: '/src/assets/bandai.svg', description: 'S.H. Figuarts & More' },
    { name: 'Storm Collectibles', href: '/brand/Storm Collectibles', icon: '/src/assets/storm.svg', description: 'Action Fighting' },
    { name: 'Otros Productos', href: '/brand/Otros', icon: '/src/assets/inventory.svg', description: 'Accesorios y más' },
  ];

  return (
    <nav 
      ref={navRef}
      className="h-20 flex items-center justify-between px-8 z-[100] bg-white/80 backdrop-blur-[12px] sticky top-0 w-full border-b border-black/5"
      onMouseLeave={() => setIsProductsOpen(false)}
    >
      <Link to="/" className="flex items-center gap-3 group">
        <div className="text-2xl filter brightness-0 transition-all">💀</div>
        <span className="font-serif font-black text-2xl tracking-tighter uppercase whitespace-nowrap text-[#1D1D1F] transition-all">EZ-TOYS</span>
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex gap-12 text-[11px] font-normal tracking-[0.25em] uppercase items-center text-black">
        <NavLink 
          to="/" 
          onMouseEnter={() => setIsProductsOpen(false)}
          className={({ isActive }) => `relative py-2 transition-all duration-300 group ${isActive ? 'text-[#1D1D1F] font-medium' : 'text-[#86868B] hover:text-[#1D1D1F]'}`}
        >
          {({ isActive }) => (
            <>
              Inicio
              {isActive && (
                <motion.div 
                  layoutId="nav-underline"
                  className="absolute bottom-0 left-0 w-full h-[1px] bg-[#1D1D1F]"
                />
              )}
            </>
          )}
        </NavLink>
        
        <div 
          className="relative py-8 cursor-pointer group"
          onMouseEnter={() => setIsProductsOpen(true)}
          onMouseLeave={() => setIsProductsOpen(false)}
        >
          <span className={`flex items-center gap-1 transition-all duration-300 ${isProductsOpen ? 'text-[#1D1D1F] font-medium' : 'text-[#86868B] hover:text-[#1D1D1F]'}`}>
            Productos <ChevronDown size={12} className={`transition-transform duration-300 ${isProductsOpen ? 'rotate-180' : ''}`} />
          </span>
          
          <AnimatePresence>
            {isProductsOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: 10 }}
                transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                className="absolute top-[100%] left-1/2 -translate-x-1/2 w-[850px] bg-white/90 backdrop-blur-[20px] text-[#1D1D1F] p-10 shadow-[0_30px_60px_rgba(0,0,0,0.05)] rounded-[32px] overflow-hidden mt-[8px] border border-black/5 z-[101]"
              >
                <div className="grid grid-cols-2 gap-12">
                  <div className="space-y-8">
                    <h4 className="text-[10px] font-bold tracking-[0.3em] text-zinc-400 uppercase">Explorar Marcas</h4>
                    <div className="grid grid-cols-2 gap-6">
                      {productBrands.map((brand) => (
                        <button
                          key={brand.name}
                          onClick={() => {
                            navigate(brand.href);
                            setIsProductsOpen(false);
                          }}
                          className="flex items-center gap-5 p-5 rounded-2xl border border-transparent hover:bg-zinc-50/50 transition-all group/item text-left"
                        >
                          <img src={brand.icon} alt={brand.name} className="w-8 h-8 object-contain group-hover/item:scale-110 transition-transform duration-500" />
                          <div>
                            <span className="inline-block font-medium text-base tracking-tight text-black border-b-2 border-transparent group-hover/item:border-black pb-[2px] transition-all [font-variant:small-caps]">
                              {brand.name}
                            </span>
                            <p className="text-[9px] text-zinc-400 font-medium uppercase tracking-[0.1em] mt-1">{brand.description}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-black/[0.03] rounded-3xl p-8 flex flex-col justify-center items-center text-center space-y-5 border border-black/5">
                    <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center text-4xl shadow-xl">🔥</div>
                    <div>
                      <p className="font-serif italic text-2xl font-bold tracking-tight">New Arrivals</p>
                      <p className="text-[11px] text-zinc-500 max-w-[220px] font-medium leading-relaxed mt-2 uppercase tracking-wider">Tokyo Artifacts direct to vault.</p>
                    </div>
                    <button 
                      onClick={() => { navigate('/'); setIsProductsOpen(false); }}
                      className="bg-black text-white px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-zinc-800 transition-all shadow-lg"
                    >
                      View All
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <NavLink 
          to="/about" 
          onMouseEnter={() => setIsProductsOpen(false)}
          className={({ isActive }) => `relative py-2 transition-all duration-300 ${isActive ? 'text-[#1D1D1F] font-medium' : 'text-[#86868B] hover:text-[#1D1D1F]'}`}
        >
          {({ isActive }) => (
            <>
              Quienes somos
              {isActive && (
                <motion.div 
                  layoutId="nav-underline"
                  className="absolute bottom-0 left-0 w-full h-[1px] bg-[#1D1D1F]"
                />
              )}
            </>
          )}
        </NavLink>
        
        <NavLink 
          to="/contact" 
          onMouseEnter={() => setIsProductsOpen(false)}
          className={({ isActive }) => `relative py-2 transition-all duration-300 ${isActive ? 'text-[#1D1D1F] font-medium' : 'text-[#86868B] hover:text-[#1D1D1F]'}`}
        >
          {({ isActive }) => (
            <>
              Contacto
              {isActive && (
                <motion.div 
                  layoutId="nav-underline"
                  className="absolute bottom-0 left-0 w-full h-[1px] bg-[#1D1D1F]"
                />
              )}
            </>
          )}
        </NavLink>
      </div>

      {/* User Area */}
      <div className="flex items-center gap-6 text-[#1D1D1F]">
        <div 
          className="relative cursor-pointer group"
          onClick={() => setIsCartOpen(true)}
        >
          <span className="text-xl transition-all inline-block group-hover:scale-105">🛒</span>
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-[#0066CC] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
              {totalItems}
            </span>
          )}
        </div>
        
        {user ? (
          <div className="relative">
            <button 
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="w-10 h-10 rounded-full bg-[#1D1D1F] border border-black/10 flex items-center justify-center text-white text-[10px] font-black tracking-tighter hover:bg-[#0066CC] transition-all overflow-hidden"
            >
              {getInitials(user.name)}
            </button>

            <AnimatePresence>
              {isUserMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-4 w-56 bg-white/90 backdrop-blur-[20px] rounded-[24px] shadow-2xl border border-black/5 overflow-hidden z-[110]"
                >
                  <div className="p-6 border-b border-black/5">
                    <p className="text-[10px] font-black tracking-[0.2em] text-[#86868B] uppercase mb-1">Identificado</p>
                    <p className="text-sm font-serif font-black italic text-[#1D1D1F] tracking-tighter">{user.name}</p>
                  </div>
                  <div className="p-2">
                    <button 
                      onClick={() => { navigate('/orders'); setIsUserMenuOpen(false); }}
                      className="w-full text-left px-5 py-3 text-[10px] uppercase font-bold tracking-widest text-[#1D1D1F] hover:bg-[#0066CC] hover:text-white rounded-xl transition-all flex items-center justify-between group"
                    >
                      Mis Pedidos <div className="w-1 h-1 rounded-full bg-[#0066CC] group-hover:bg-white" />
                    </button>
                    <button 
                      onClick={() => { logout(); setIsUserMenuOpen(false); }}
                      className="w-full text-left px-5 py-3 text-[10px] uppercase font-bold tracking-widest text-[#ff3131] hover:bg-[#ff3131] hover:text-white rounded-xl transition-all"
                    >
                      Cerrar Sesión
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <button onClick={onOpenAuth} className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center hover:border-[#0066CC] transition-all">
            <User size={14} />
          </button>
        )}

        {/* Mobile menu toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black overflow-hidden absolute top-20 left-0 w-full z-50 border-b border-white/10"
          >
            <div className="px-8 pt-2 pb-10 space-y-6">
              <NavLink 
                to="/" 
                onClick={() => setIsOpen(false)}
                className={({ isActive }) => `block text-sm uppercase tracking-[0.2em] font-bold py-2 transition-all ${isActive ? 'text-[#0066CC]' : 'text-white hover:text-zinc-400'}`}
              >
                Inicio
              </NavLink>
              
              <div className="space-y-4">
                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Productos</p>
                <div className="grid grid-cols-2 gap-4">
                  {productBrands.map((brand) => (
                    <button
                      key={brand.name}
                      onClick={() => {
                        navigate(brand.href);
                        setIsOpen(false);
                      }}
                      className="flex items-center gap-3 p-3 rounded-xl bg-zinc-900 text-white text-left"
                    >
                      <img src={brand.icon} alt={brand.name} className="w-8 h-8 object-contain" />
                      <span className="text-xs font-bold uppercase tracking-tighter">{brand.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <NavLink 
                to="/about" 
                onClick={() => setIsOpen(false)}
                className={({ isActive }) => `block text-sm uppercase tracking-[0.2em] font-bold py-2 transition-all ${isActive ? 'text-[#0066CC]' : 'text-white hover:text-zinc-400'}`}
              >
                Quienes somos
              </NavLink>
              
              <NavLink 
                to="/contact" 
                onClick={() => setIsOpen(false)}
                className={({ isActive }) => `block text-sm uppercase tracking-[0.2em] font-bold py-2 transition-all ${isActive ? 'text-[#0066CC]' : 'text-white hover:text-zinc-400'}`}
              >
                Contacto
              </NavLink>

              <div className="pt-6 border-t border-white/10 space-y-4">
                {user ? (
                  <>
                    <button onClick={() => { navigate('/orders'); setIsOpen(false); }} className="w-full text-left flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full border border-white/20 bg-white/10 flex items-center justify-center text-[10px] font-black text-white">
                        {getInitials(user.name)}
                      </div>
                      <span className="text-sm font-bold uppercase text-white hover:text-[#0066CC] transition-colors">Mis Pedidos</span>
                    </button>
                    <button onClick={() => { logout(); setIsOpen(false); }} className="w-full text-left flex items-center gap-3">
                      <span className="text-sm font-bold uppercase text-red-500 hover:text-red-400 transition-colors">Cerrar Sesión</span>
                    </button>
                  </>
                ) : (
                  <button onClick={() => { onOpenAuth(); setIsOpen(false); }} className="flex items-center gap-3 text-sm font-bold uppercase text-white hover:text-[#0066CC] transition-colors">
                    <User size={20} />
                    Login / Register
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
