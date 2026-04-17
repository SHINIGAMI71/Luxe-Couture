import React from 'react';
import Hero from '../components/home/Hero';
import ProductCard from '../components/product/ProductCard';
import { DUMMY_PRODUCTS } from '../constants';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export default function Home() {
  const featured = DUMMY_PRODUCTS.filter(p => p.featured).slice(0, 4);

  return (
    <div className="w-full bg-luxury-black">
      <Hero />

      {/* Collections Section */}
      <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative aspect-[16/10] md:aspect-square overflow-hidden group border border-luxury-border"
          >
            <img 
              src="https://picsum.photos/seed/womens-luxury/1000/1000" 
              alt="Women's Collection"
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80 group-hover:opacity-100"
            />
            <div className="absolute inset-0 bg-luxury-black/40 group-hover:bg-luxury-black/60 transition-colors" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-luxury-white">
              <h2 className="text-4xl md:text-5xl font-serif mb-6 italic text-luxury-gold">Womens</h2>
              <Link to="/shop?category=Women" className="text-[10px] uppercase tracking-[0.4em] border-b border-luxury-gold pb-2 hover:text-luxury-white hover:border-luxury-white transition-colors font-sans">
                Discover
              </Link>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 gap-8">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative aspect-[16/10] overflow-hidden group border border-luxury-border"
            >
              <img 
                src="https://picsum.photos/seed/mens-luxury/1000/600" 
                alt="Men's Collection"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-luxury-black/40 group-hover:bg-luxury-black/60 transition-colors" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-luxury-white">
                <h2 className="text-3xl font-serif mb-4 italic text-luxury-gold">Mens</h2>
                <Link to="/shop?category=Men" className="text-[10px] uppercase tracking-[0.4em] border-b border-luxury-gold pb-2 hover:border-luxury-white transition-colors font-sans">
                  View All
                </Link>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative aspect-[16/10] overflow-hidden group border border-luxury-border"
            >
              <img 
                src="https://picsum.photos/seed/luxury-accessories/1000/600" 
                alt="Accessories"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-luxury-black/40 group-hover:bg-luxury-black/60 transition-colors" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-luxury-white">
                <h2 className="text-3xl font-serif mb-4 italic text-luxury-gold">Accessories</h2>
                <Link to="/shop?category=Accessories" className="text-[10px] uppercase tracking-[0.4em] border-b border-luxury-gold pb-2 hover:border-luxury-white transition-colors font-sans">
                  Explore
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="bg-luxury-surface py-32 px-6 md:px-12 border-y border-luxury-border">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 space-y-4 md:space-y-0 text-center md:text-left w-full border-b border-luxury-border pb-12">
            <div>
              <p className="editorial-label text-luxury-gold mb-3 font-semibold">Exquisite Selection</p>
              <h2 className="text-5xl font-serif italic mb-2 leading-tight text-luxury-white">Featured Pieces</h2>
            </div>
            <Link to="/shop" className="editorial-label font-bold border-b border-luxury-gold pb-1 hover:text-luxury-white transition-colors">
              The Collection
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16 text-luxury-white">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Brand Ethos */}
      <section className="py-40 px-6 md:px-12 bg-luxury-black overflow-hidden relative">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
           <span className="text-[20vw] font-serif italic whitespace-nowrap uppercase tracking-tighter text-luxury-white">Maison</span>
        </div>
        <div className="max-w-5xl mx-auto text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-serif mb-12 italic text-luxury-gold">Artistry in Every Stitch</h2>
            <p className="text-lg md:text-xl font-light text-luxury-white/60 leading-relaxed max-w-3xl mx-auto font-serif italic">
              "We believe that true luxury is found in the harmony between traditional craftsmanship and modern vision. Each piece in our collection is a testament to the artisans who dedicate their lives to perfection."
            </p>
            <div className="mt-16 flex justify-center font-sans">
              <Link to="/shop" className="px-16 py-5 bg-luxury-gold text-black text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-white transition-colors shadow-2xl">
                The Heritage
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
