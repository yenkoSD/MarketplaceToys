import React from 'react';
import { Facebook, Instagram, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';

// Custom TikTok Icon (since it might not be in the standard lucide set or we want a specific look)
const TikTokIcon = ({ size = 20, className = "" }: { size?: number, className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.06-2.89-.44-4.14-1.17-.11 3.51.02 7.02-.03 10.53-.05 1.61-.43 3.23-1.41 4.51-1.34 1.78-3.69 2.66-5.83 2.37-2.12-.22-4.1-1.54-5.02-3.48-1.05-2.2-.6-5.01 1.11-6.85 1.11-1.22 2.69-1.89 4.34-2.02v4.05c-.8.06-1.6.35-2.19.9-.75.71-1.04 1.83-.75 2.8.31 1 1.25 1.74 2.29 1.75 1.05.02 2.05-.69 2.33-1.7.1-.38.12-.77.12-1.16V0h-.01z"/>
  </svg>
);

export default function Footer() {
  const socialIcons = [
    { Icon: Facebook, href: "https://facebook.com", name: "Facebook" },
    { Icon: Instagram, href: "https://instagram.com", name: "Instagram" },
    { Icon: TikTokIcon, href: "https://tiktok.com", name: "TikTok" },
    { Icon: Youtube, href: "https://youtube.com", name: "YouTube" },
  ];

  const quickLinks = [
    { title: "Inicio", href: "/" },
    { title: "Quiénes somos", href: "/about" },
    { title: "Contáctanos", href: "/contact" },
  ];

  return (
    <footer className="bg-[#F5F5F7] text-black pt-16 pb-12 border-t border-black/5">
      <div className="max-w-[1440px] mx-auto px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10 md:gap-20 border-b border-black/5 pb-10">
          
          {/* Logo Section */}
          <div className="flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-2 group">
              <span className="text-3xl filter grayscale group-hover:grayscale-0 transition-all duration-500 hover:scale-110">🐱</span>
              <span className="font-serif font-black text-xl tracking-tighter uppercase whitespace-nowrap text-[#1D1D1F]">EZ-TOYS</span>
            </Link>
            <p className="text-[12px] font-medium text-[#86868B] max-w-[200px] leading-relaxed uppercase tracking-wider">
              Arquitectos de la nostalgia. Curadores del artefacto.
            </p>
          </div>

          {/* Navigation Section */}
          <div className="flex flex-col gap-6">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#86868B]">Enlaces Rápidos</h4>
            <div className="flex flex-col md:flex-row gap-6 md:gap-12">
              {quickLinks.map((link) => (
                <Link 
                  key={link.title}
                  to={link.href}
                  className="text-sm font-medium tracking-tight text-[#1D1D1F] hover:text-[#0066CC] transition-colors"
                >
                  {link.title}
                </Link>
              ))}
            </div>
          </div>

          {/* Social Icons Section */}
          <div className="flex flex-col gap-6 items-start md:items-end w-full md:w-auto">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#86868B]">Síguenos</h4>
            <div className="flex gap-6">
              {socialIcons.map(({ Icon, href, name }) => (
                <a 
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#1D1D1F]/60 hover:text-[#0066CC] hover:scale-110 transition-all duration-300"
                  aria-label={name}
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-medium uppercase tracking-[0.2em] text-[#86868B]">
          <span>© 2024 EZ-TOYS • TODOS LOS DERECHOS RESERVADOS.</span>
          <div className="flex gap-8">
            <span className="cursor-pointer hover:text-[#1D1D1F] transition-colors">Términos</span>
            <span className="cursor-pointer hover:text-[#1D1D1F] transition-colors">Privacidad</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
