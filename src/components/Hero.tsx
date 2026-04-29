import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const SLIDES = [
  {
    title: "LIMITED EDITION",
    subtitle: "MEZCO ONE:12 COLLECTIVE",
    image: "https://images.unsplash.com/photo-1594463750939-ebb6bd2d5337?q=80&w=1920&auto=format&fit=crop",
    color: "black"
  },
  {
    title: "THE DARK KNIGHT",
    subtitle: "DC MULTIVERSE ARCHIVES",
    image: "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?q=80&w=1920&auto=format&fit=crop",
    color: "zinc-900"
  },
  {
    title: "AVENGERS ASSEMBLE",
    subtitle: "MARVEL SELECT COLLECTION",
    image: "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?q=80&w=1920&auto=format&fit=crop",
    color: "black"
  },
  {
    title: "RETRO VIBE",
    subtitle: "VINTAGE COMIC ARCHIVES",
    image: "https://images.unsplash.com/photo-1608889175123-8ee362201f81?q=80&w=1920&auto=format&fit=crop",
    color: "black"
  }
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, 6000); // Auto-advance every 6 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-[70vh] w-full bg-black overflow-hidden flex flex-col items-center justify-center text-white text-center pt-24 pb-20">
      {/* Dynamic Background Slider */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0 z-0"
        >
          {/* Ken Burns Animated Layer */}
          <div 
            className="absolute inset-0 bg-cover bg-center ken-burns"
            style={{ backgroundImage: `url(${SLIDES[current].image})` }}
          />
          {/* 50% Black Overlay */}
          <div className="absolute inset-0 bg-black/50 z-10" />
        </motion.div>
      </AnimatePresence>
      
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="relative z-20 px-4"
        >
          <motion.h1 
            className="font-serif text-6xl md:text-9xl font-black italic tracking-tighter leading-none mb-4"
          >
            {SLIDES[current].title}
          </motion.h1>
          <p className="mt-4 font-light tracking-[0.5em] text-sm opacity-80 uppercase">
            {SLIDES[current].subtitle}
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Decorative Archive Line */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4 opacity-30">
        <div className="h-[1px] w-24 bg-white"></div>
        <span className="text-[10px] uppercase font-bold tracking-[0.4em]">Archival Access Control</span>
        <div className="h-[1px] w-24 bg-white"></div>
      </div>
    </section>
  );
}
