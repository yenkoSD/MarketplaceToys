import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax transforms for collage images
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -250]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, -300]);

  return (
    <section ref={containerRef} className="relative overflow-hidden bg-white">
      {/* Hero Video Section */}
      <div className="relative h-[80vh] w-full overflow-hidden flex items-center justify-center">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
          poster="https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?q=80&w=2000&auto=format&fit=crop"
        >
          {/* Placeholder video - User should replace with Mezco/Mafex high-res loop */}
          <source 
            src="https://joy1.videvo.net/videvo_files/video/free/2019-11/large_watermarked/190828_07_Action_Figures_01_preview.mp4" 
            type="video/mp4" 
          />
        </video>
        
        {/* Cinematic Overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Floating Text Container */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative z-10 px-10 py-16 backdrop-blur-xl bg-white/10 border border-white/20 rounded-[3rem] text-center max-w-4xl mx-4"
        >
          <h2 className="text-4xl md:text-7xl font-serif font-black tracking-tighter uppercase text-white leading-none">
            Nuestra Pasión es <br /> Tu <span className="text-[#0066CC]">Obsesión</span>
          </h2>
        </motion.div>
      </div>

      {/* Summary & Collage Section */}
      <div className="relative py-40 px-8 max-w-7xl mx-auto bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative">
          
          {/* Left Column: Images */}
          <div className="lg:col-span-3 hidden lg:flex flex-col gap-12">
            <motion.div 
              style={{ y: y1 }}
              className="w-40 h-40 rounded-[2rem] overflow-hidden border border-black/5 shadow-2xl self-end"
            >
              <img 
                src="https://images.unsplash.com/photo-1566576721346-d4a3b4eaad5b?q=80&w=400&auto=format&fit=crop" 
                alt="Detail Face" 
                className="w-full h-full object-cover"
              />
            </motion.div>
            <motion.div 
              style={{ y: y3 }}
              className="w-36 h-36 rounded-[2rem] overflow-hidden border border-black/5 shadow-xl self-center"
            >
              <img 
                src="https://images.unsplash.com/photo-1559124410-d9b1cd4c6742?q=80&w=400&auto=format&fit=crop" 
                alt="Articulation" 
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>

          {/* Center Column: Text */}
          <div className="lg:col-span-6 text-center space-y-10 z-20 relative px-4">
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-serif font-black uppercase text-[#1D1D1F] tracking-tight"
            >
              Quiénes somos
            </motion.h3>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg md:text-xl text-[#86868B] font-normal leading-relaxed max-w-lg mx-auto tracking-wide"
            >
              Nacimos en los callejones del coleccionismo técnico. No vendemos juguetes. 
              <span className="font-bold text-[#1D1D1F]"> Curamos artefactos</span> que capturan la esencia hiper-articulada de la cultura pop global. 
              Cada pieza en nuestra bóveda es seleccionada por su fidelidad artesanal y su potencial cinematográfico.
            </motion.p>
          </div>

          {/* Right Column: Images */}
          <div className="lg:col-span-3 hidden lg:flex flex-col gap-16">
            <motion.div 
              style={{ y: y2 }}
              className="w-44 h-44 rounded-[2rem] overflow-hidden border border-black/5 shadow-2xl self-start"
            >
              <img 
                src="https://images.unsplash.com/photo-1608889175123-8ee362201f81?q=80&w=400&auto=format&fit=crop" 
                alt="Accessories" 
                className="w-full h-full object-cover"
              />
            </motion.div>
            <motion.div 
              style={{ y: y4 }}
              className="w-48 h-48 rounded-[2rem] overflow-hidden border border-black/5 shadow-[0_40px_80px_rgba(0,0,0,0.1)] self-center"
            >
              <img 
                src="https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?q=80&w=600&auto=format&fit=crop" 
                alt="Character" 
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>

          {/* Mobile Collage (visible only on small screens) */}
          <div className="lg:hidden flex flex-wrap justify-center gap-4 pt-8">
            <div className="w-24 h-24 rounded-xl overflow-hidden border border-black/5 shadow-md">
              <img src="https://images.unsplash.com/photo-1566576721346-d4a3b4eaad5b?q=80&w=200&auto=format&fit=crop" className="w-full h-full object-cover" alt="" />
            </div>
            <div className="w-24 h-24 rounded-xl overflow-hidden border border-black/5 shadow-md">
              <img src="https://images.unsplash.com/photo-1608889175123-8ee362201f81?q=80&w=200&auto=format&fit=crop" className="w-full h-full object-cover" alt="" />
            </div>
            <div className="w-24 h-24 rounded-xl overflow-hidden border border-black/5 shadow-md">
              <img src="https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?q=80&w=200&auto=format&fit=crop" className="w-full h-full object-cover" alt="" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
