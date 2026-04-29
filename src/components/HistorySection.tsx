import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

const PARALLAX_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1558021212-51b6ecfa0db9?q=80&w=1000&auto=format&fit=crop",
    className: "w-48 h-48 md:w-64 md:h-64 top-[10%] left-[5%] md:left-[10%]",
    speed: 0.1
  },
  {
    src: "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?q=80&w=1000&auto=format&fit=crop",
    className: "w-40 h-40 md:w-56 md:h-56 top-[20%] right-[10%]",
    speed: 0.15
  },
  {
    src: "https://images.unsplash.com/photo-1533512930330-4ac257c86793?q=80&w=1000&auto=format&fit=crop",
    className: "w-56 h-56 md:w-72 md:h-72 bottom-[15%] left-[5%] md:left-[8%]",
    speed: 0.12
  },
  {
    src: "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?q=80&w=1000&auto=format&fit=crop",
    className: "w-44 h-44 md:w-60 md:h-60 bottom-[10%] right-[5%] md:right-[8%]",
    speed: 0.18
  }
];

interface ParallaxItemProps {
  img: {
    src: string;
    className: string;
    speed: number;
  };
  scrollYProgress: any;
  key?: React.Key;
}

function ParallaxItem({ img, scrollYProgress }: ParallaxItemProps) {
  const y = useTransform(scrollYProgress, [0, 1], [100, -800 * img.speed]);

  return (
    <motion.div
      style={{ y }}
      className={`absolute overflow-hidden rounded-[32px] bg-zinc-900 border border-zinc-800 shadow-2xl gpu-accelerated will-change-composite ${img.className}`}
    >
      <img 
        src={img.src} 
        alt="" 
        className="w-full h-full object-cover opacity-60 grayscale"
        referrerPolicy="no-referrer"
      />
    </motion.div>
  );
}

export default function HistorySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  return (
    <section ref={sectionRef} className="relative h-[300vh] bg-black">
      {/* Pure CSS Sticky Container */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* Parallax Background Images */}
        <div className="absolute inset-0 pointer-events-none">
          {PARALLAX_IMAGES.map((img, i) => (
            <ParallaxItem key={i} img={img} scrollYProgress={scrollYProgress} />
          ))}
        </div>

        {/* Central Content - High Legibility */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center gpu-accelerated will-change-composite">
          <div className="space-y-6">
            <span className="text-[12px] uppercase font-black tracking-[0.6em] text-zinc-500 block">
              NUESTRO LEGADO
            </span>
            <h2 className="text-5xl md:text-8xl font-serif font-black tracking-tighter leading-[0.85] text-white">
              Para quienes saben que <br/>
              <span className="italic text-zinc-400">cada detalle</span> lo es todo.
            </h2>
            <div className="pt-8 space-y-10 max-w-3xl mx-auto">
              <p className="text-2xl md:text-3xl font-medium text-white leading-tight">
                Fundada en los callejones del coleccionismo técnico, EZ-TOYS nació de una obsesión simple: 
                La articulación perfecta.
              </p>
              
              <div className="flex justify-center gap-12 md:gap-24 pt-12 border-t border-zinc-800/50">
                <div className="text-left">
                  <span className="block text-6xl md:text-7xl font-serif italic text-white leading-none">15+</span>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-500">Años Curando</span>
                </div>
                <div className="text-left">
                  <span className="block text-6xl md:text-7xl font-serif italic text-white leading-none">100k+</span>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-500">Envíos Exitosos</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom indicator - CSS only loop */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none">
          <span className="text-[10px] uppercase tracking-widest text-zinc-600 font-bold">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-zinc-500 to-transparent scroll-indicator-loop" />
        </div>
      </div>
    </section>
  );
}
