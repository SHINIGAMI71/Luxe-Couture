import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DUMMY_PRODUCTS } from '../constants';
import { formatCurrency } from '../lib/utils';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Minus, Plus, ShoppingBag, ArrowLeft } from 'lucide-react';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const product = DUMMY_PRODUCTS.find((p) => p.id === id);

  const [currentImage, setCurrentImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  if (!product) {
    return (
      <div className="pt-40 pb-24 px-6 text-center">
        <h1 className="text-3xl font-serif mb-8">Piece Not Found</h1>
        <button onClick={() => navigate('/shop')} className="text-[10px] uppercase tracking-[0.4em] text-luxury-gold">Return to Collection</button>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    addToCart(product, selectedSize);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto bg-luxury-black min-h-screen">
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center space-x-2 text-[10px] uppercase tracking-widest text-luxury-gold hover:text-luxury-white transition-colors mb-12"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24">
        {/* Gallery */}
        <div className="space-y-6">
          <div className="relative aspect-[3/4] overflow-hidden bg-luxury-surface border border-luxury-border">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentImage}
                src={product.images[currentImage]}
                alt={product.name}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </AnimatePresence>
            
            {product.images.length > 1 && (
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4">
                <button 
                  onClick={() => setCurrentImage((prev) => (prev - 1 + product.images.length) % product.images.length)}
                  className="w-10 h-10 rounded-full bg-luxury-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-luxury-gold text-white transition-colors border border-luxury-border"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button 
                  onClick={() => setCurrentImage((prev) => (prev + 1) % product.images.length)}
                  className="w-10 h-10 rounded-full bg-luxury-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-luxury-gold text-white transition-colors border border-luxury-border"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            )}
          </div>
          
          <div className="flex space-x-4">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImage(idx)}
                className={`w-20 aspect-[3/4] overflow-hidden border transition-all ${currentImage === idx ? 'border-luxury-gold' : 'border-luxury-border opacity-50'}`}
              >
                <img src={img} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col">
          <p className="editorial-label text-luxury-gold mb-6 font-bold">In-house Exclusive</p>
          <h1 className="text-4xl md:text-5xl font-serif mb-6 leading-tight italic font-light text-luxury-white">{product.name}</h1>
          <p className="text-2xl font-serif italic text-luxury-gold mb-12">{formatCurrency(product.price)}</p>
          
          <div className="space-y-12 flex-grow">
            {/* Description */}
            <div className="border-t border-luxury-border pt-8">
               <h3 className="editorial-label font-bold mb-4">Provenance</h3>
               <p className="text-luxury-gray font-light leading-relaxed font-sans text-sm">{product.description}</p>
            </div>

            {/* Size selection */}
            <div className="border-t border-luxury-border pt-8">
               <div className="flex justify-between items-center mb-6">
                 <h3 className="editorial-label font-bold">Imperial Sizing</h3>
                 <button className="text-[9px] uppercase tracking-widest text-luxury-gold border-b border-luxury-gold/30 pb-1 italic">Guide</button>
               </div>
               <div className="flex flex-wrap gap-4">
                 {product.sizes.map(size => (
                   <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-14 h-14 flex items-center justify-center text-[10px] uppercase font-bold transition-all border ${
                      selectedSize === size 
                        ? 'bg-luxury-gold text-black border-luxury-gold' 
                        : 'border-luxury-border text-luxury-gray hover:border-luxury-white hover:text-white'
                    }`}
                   >
                     {size}
                   </button>
                 ))}
               </div>
            </div>

            {/* Actions */}
            <div className="pt-8 space-y-6">
              <div className="flex items-center border border-luxury-border w-fit h-14">
                <button 
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="px-4 h-full hover:bg-luxury-gold/10 transition-colors"
                >
                  <Minus className="w-3 h-3 text-luxury-gold" />
                </button>
                <span className="w-12 text-center text-xs font-bold font-sans text-luxury-white">{quantity}</span>
                <button 
                  onClick={() => setQuantity(q => q + 1)}
                  className="px-4 h-full hover:bg-luxury-gold/10 transition-colors"
                >
                  <Plus className="w-3 h-3 text-luxury-gold" />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={!selectedSize}
                className={`w-full py-6 flex items-center justify-center space-x-6 text-[10px] uppercase tracking-[0.4em] font-bold transition-all duration-700 shadow-2xl ${
                  isAdded 
                    ? 'bg-emerald-600 text-white' 
                    : !selectedSize
                      ? 'bg-luxury-border text-luxury-gray border-none cursor-not-allowed opacity-50'
                      : 'bg-luxury-gold text-black hover:bg-white hover:scale-[1.02]'
                }`}
              >
                <ShoppingBag className="w-5 h-5" />
                <span>{isAdded ? 'Added to Archive' : 'Acquire for Archive'}</span>
              </button>
            </div>
          </div>
          
          <div className="mt-16 grid grid-cols-2 gap-12 pt-12 border-t border-luxury-border">
             <div>
               <h4 className="editorial-label mb-2 font-bold text-luxury-white">Curation</h4>
               <p className="text-[10px] text-luxury-gray uppercase tracking-widest">100% Sustainable Organic Silk</p>
             </div>
             <div>
               <h4 className="editorial-label mb-2 font-bold text-luxury-white">Ancestry</h4>
               <p className="text-[10px] text-luxury-gray uppercase tracking-widest">Handcrafted in Florence, Italy</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
