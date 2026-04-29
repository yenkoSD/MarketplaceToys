import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ChevronRight } from 'lucide-react';

const CARDS = [
  {
    id: 1,
    title: "Masterpiece Series",
    category: "Optimus Prime",
    description: "The definitive representation of the Autobot leader.",
    image: "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?q=80&w=1000&auto=format&fit=crop",
    gradient: "from-blue-600/20 to-red-600/20"
  },
  {
    id: 2,
    title: "Mafex Edition",
    category: "Spider-Man",
    description: "Unmatched articulation for the most dynamic poses.",
    image: "https://images.unsplash.com/photo-1533512930330-4ac257c86793?q=80&w=1000&auto=format&fit=crop",
    gradient: "from-red-600/20 to-blue-900/20"
  },
  {
    id: 3,
    title: "Mezco One:12",
    category: "Batman",
    description: "Real fabric clothing and high-end accessories.",
    image: "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?q=80&w=1000&auto=format&fit=crop",
    gradient: "from-zinc-800/20 to-zinc-900/20"
  },
  {
    id: 4,
    title: "S.H. Figuarts",
    category: "Goku",
    description: "The gold standard for anime action figures.",
    image: "https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?q=80&w=1000&auto=format&fit=crop",
    gradient: "from-orange-500/20 to-blue-500/20"
  },
  {
    id: 5,
    title: "Storm Collectibles",
    category: "Mortal Kombat",
    description: "Brutal details for the ultimate fighting game fan.",
    image: "https://images.unsplash.com/photo-1620336655055-188d7f6245a4?q=80&w=1000&auto=format&fit=crop",
    gradient: "from-amber-600/20 to-red-900/20"
  }
];

export default function AppleCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  return (
    <section className="bg-[#f5f5f7] py-24 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 mb-12 text-center md:text-left">
        <h2 className="text-3xl md:text-6xl font-semibold tracking-tight text-black">
          Nuevas colecciones disponibles.
        </h2>
      </div>

      <div 
        ref={containerRef}
        className="flex gap-8 overflow-x-auto pb-24 px-[max(1.5rem,calc((100vw-1440px)/2+1.5rem))] scrollbar-hide snap-x snap-proximity"
      >
        {CARDS.map((card, index) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex-none w-[85vw] md:w-[460px] aspect-[4/5] md:aspect-[3/4.2] relative rounded-[32px] overflow-hidden bg-[#FBFBFD] shadow-sm border border-black/[0.04] group snap-start cursor-pointer transition-all duration-300 ease-out hover:shadow-2xl will-change-transform [perspective:1000px]"
          >
            {/* Subtle Texture/Background (Z-0) */}
            <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-20`} />
            
            {/* Dynamic Gradient Mask: Clears the text area */}
            <div className="absolute top-0 left-0 w-full h-[40%] bg-gradient-to-b from-[#FBFBFD] via-[#FBFBFD]/80 to-transparent z-[5]" />

            {/* Hover Contrast Overlay (White Glare) */}
            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/20 transition-colors duration-300 ease-out z-[8] pointer-events-none" />

            {/* Header Content (Highest Z-Index: 30) */}
            <div className="absolute top-0 left-0 w-full p-12 z-30 pointer-events-none">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400 mb-4 group-hover:tracking-[0.5em] transition-all duration-300 ease-out">
                {card.category}
              </p>
              <h3 
                className="text-4xl md:text-6xl font-black text-[#1D1D1F] leading-[0.9] tracking-tighter transition-all duration-300 ease-out"
              >
                <span className="transition-all duration-300 ease-out">
                  {card.title.split(' ').map((word, i) => (
                    <span key={i} className="block">{word}</span>
                  ))}
                </span>
              </h3>
            </div>
            
            {/* Main Figure (Middle Z-Index: 10) */}
            <div className={`absolute inset-0 flex items-center justify-center p-8 pt-[35%] z-10 pointer-events-none select-none transition-all duration-300 ease-out group-hover:scale-105 group-hover:[transform:translateZ(-20px)_translateY(48px)_translateX(${index % 2 === 0 ? '-48px' : '48px'})] ${index % 2 === 0 ? '-translate-x-12' : 'translate-x-12'} translate-y-12`}>
              <motion.div 
                className="relative w-full h-full flex items-end justify-center"
              >
                <img 
                  src={card.image} 
                  alt={card.title}
                  className="w-[120%] h-[120%] object-contain filter drop-shadow-[0_30px_50px_rgba(0,0,0,0.08)]"
                  style={{ maskImage: 'linear-gradient(to top, black 80%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to top, black 80%, transparent 100%)' }}
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            </div>

            {/* Footer Content (High Z-Index: 20) */}
            <div className="absolute bottom-0 left-0 w-full p-12 z-20">
              <div className="space-y-8">
                <p className="text-[#1D1D1F] text-sm md:text-base font-medium leading-[1.7] tracking-tight opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 max-w-[300px]">
                  {card.description}
                </p>
                <button className="bg-[#1D1D1F] text-white px-10 py-4 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-2 hover:bg-[#0066CC] transition-all duration-300 shadow-xl active:scale-95">
                  Más información
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
