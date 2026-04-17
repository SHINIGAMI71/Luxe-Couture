import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/product/ProductCard';
import { DUMMY_PRODUCTS } from '../constants';
import { ChevronDown, SlidersHorizontal, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const categoryFilter = searchParams.get('category');
  
  const categories = ['All', 'Men', 'Women', 'Accessories'];
  const priceRanges = [
    { label: 'All', min: 0, max: Infinity },
    { label: 'Under $1,000', min: 0, max: 1000 },
    { label: '$1,000 - $2,500', min: 1000, max: 2500 },
    { label: 'Over $2,500', min: 2500, max: Infinity },
  ];

  const filteredProducts = useMemo(() => {
    return DUMMY_PRODUCTS.filter(product => {
      const matchCategory = !categoryFilter || categoryFilter === 'All' || product.category === categoryFilter;
      return matchCategory;
    });
  }, [categoryFilter]);

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto bg-luxury-black min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 space-y-8 md:space-y-0 border-b border-luxury-border pb-12">
        <div>
          <h1 className="text-5xl md:text-7xl font-serif mb-4 italic text-luxury-gold">The Archives</h1>
          <p className="editorial-label text-luxury-gray">
            {filteredProducts.length} Curated Masterpieces
          </p>
        </div>
        
        <div className="flex items-center space-x-8">
          <button 
             onClick={() => setIsFilterOpen(!isFilterOpen)}
             className="flex items-center space-x-2 editorial-label font-bold border-b border-luxury-gold pb-1 hover:text-luxury-white hover:border-luxury-white transition-colors"
          >
            <SlidersHorizontal className="w-3 h-3" />
            <span>Refine</span>
          </button>
          
          <div className="relative group">
            <button className="flex items-center space-x-2 editorial-label font-bold border-b border-luxury-gold pb-1 hover:text-luxury-white hover:border-luxury-white transition-colors">
              <span>Sequence</span>
              <ChevronDown className="w-3 h-3 group-hover:rotate-180 transition-transform" />
            </button>
            <div className="absolute top-full right-0 mt-4 bg-luxury-surface border border-luxury-border p-6 min-w-[220px] hidden group-hover:block z-20 shadow-2xl">
              <button className="w-full text-left py-2 editorial-label hover:text-luxury-gold transition-colors">Chronological</button>
              <button className="w-full text-left py-2 editorial-label hover:text-luxury-gold transition-colors">Ascending Value</button>
              <button className="w-full text-left py-2 editorial-label hover:text-luxury-gold transition-colors">Descending Value</button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-12">
        {/* Desktop Filters Sidebar */}
        <aside className="hidden lg:block w-56 flex-shrink-0">
          <div className="space-y-16">
            <div>
              <h3 className="editorial-label font-bold mb-8 text-luxury-white">Category</h3>
              <div className="flex flex-col space-y-6">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSearchParams({ category: cat })}
                    className={cn(
                      "text-[10px] uppercase tracking-[0.2em] text-left transition-all",
                      (categoryFilter === cat || (!categoryFilter && cat === 'All')) ? "text-luxury-gold font-bold scale-105 origin-left" : "text-luxury-gray hover:text-luxury-white"
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="editorial-label font-bold mb-8 text-luxury-white">Valuation</h3>
              <div className="flex flex-col space-y-6">
                {priceRanges.map(range => (
                  <button
                    key={range.label}
                    className="text-[10px] uppercase tracking-[0.2em] text-left text-luxury-gray hover:text-luxury-white transition-colors"
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-grow">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="py-24 text-center">
              <p className="font-serif italic text-3xl text-luxury-gray">The archives are quiet.</p>
              <button 
                onClick={() => setSearchParams({})} 
                className="mt-8 editorial-label text-luxury-gold border-b border-luxury-gold pb-1"
              >
                Reset Curated View
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      <AnimatePresence>
        {isFilterOpen && (
          <>
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setIsFilterOpen(false)}
               className="fixed inset-0 bg-luxury-black/40 z-[90] backdrop-blur-sm"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-luxury-white z-[100] p-12 overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-16">
                <h2 className="text-3xl font-serif">Refine</h2>
                <button onClick={() => setIsFilterOpen(false)}><X className="w-6 h-6" /></button>
              </div>
              
              <div className="space-y-16">
                <div>
                   <h3 className="text-[10px] uppercase tracking-widest font-bold mb-6 border-b border-luxury-black/10 pb-4">Categories</h3>
                   <div className="flex flex-wrap gap-4">
                      {categories.map(cat => (
                        <button
                          key={cat}
                          onClick={() => {
                            setSearchParams({ category: cat });
                            setIsFilterOpen(false);
                          }}
                          className={cn(
                            "px-6 py-2 text-[10px] uppercase tracking-widest border transition-all",
                            (categoryFilter === cat || (!categoryFilter && cat === 'All')) ? "bg-luxury-black text-white border-luxury-black" : "border-luxury-black/10 hover:border-luxury-black"
                          )}
                        >
                          {cat}
                        </button>
                      ))}
                   </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}
