import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden border-b border-luxury-border">
      {/* Background with Zoom Effect */}
      <motion.div 
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease: 'linear' }}
        className="absolute inset-0 z-0"
      >
        <img 
          src="https://picsum.photos/seed/luxury-fashion-hero/1920/1080?blur=1" 
          alt="Maison Hero"
          className="w-full h-full object-cover opacity-60"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-luxury-black/60" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 text-center text-luxury-white px-6">
        <motion.div
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 1 }}
           className="brand text-2xl md:text-3xl font-serif italic text-luxury-gold tracking-[4px] uppercase mb-12"
        >
          Maison
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="editorial-label mb-6 text-luxury-gold"
        >
          Signature Archives / 2026
        </motion.p>
        
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-6xl md:text-9xl font-serif mb-12 drop-shadow-2xl leading-none italic font-light"
        >
          The <span className="text-luxury-gold">Prestige</span> <br /> Standard
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-12 underline-offset-8"
        >
          <Link 
            to="/shop" 
            className="px-12 py-5 bg-luxury-gold text-black text-[10px] uppercase tracking-[0.3em] font-bold overflow-hidden hover:bg-white transition-all duration-500 shadow-2xl"
          >
            Enter Boutique
          </Link>
          
          <Link 
            to="/shop?category=Women" 
            className="editorial-label font-bold text-luxury-white hover:text-luxury-gold transition-colors underline decoration-luxury-gold/30"
          >
            Women's
          </Link>
          <Link 
            to="/shop?category=Men" 
            className="editorial-label font-bold text-luxury-white hover:text-luxury-gold transition-colors underline decoration-luxury-gold/30"
          >
            Men's
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center"
      >
        <span className="editorial-label mb-2 text-luxury-gold/50">Descend</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-luxury-gold/50 to-transparent" />
      </motion.div>
    </section>
  );
}
