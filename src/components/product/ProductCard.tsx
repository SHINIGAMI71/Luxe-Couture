import React from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { motion } from 'motion/react';
import { Product } from '../../types';
import { formatCurrency } from '../../lib/utils';
import { useCart } from '../../context/CartContext';

interface ProductCardProps {
  product: Product;
  key?: React.Key;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group"
    >
      <Link to={`/product/${product.id}`}>
        <div className="relative aspect-[3/4] overflow-hidden bg-luxury-surface mb-6 border border-luxury-border group-hover:border-luxury-gold/50 transition-colors duration-500">
          <img 
            src={product.images[0]} 
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-90 group-hover:opacity-100"
            referrerPolicy="no-referrer"
          />
          
          {/* Action Overlay */}
          <div className="absolute inset-x-0 bottom-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
            <button 
              onClick={(e) => {
                e.preventDefault();
                addToCart(product, product.sizes[0]);
              }}
              className="w-full bg-luxury-gold py-4 flex items-center justify-center space-x-2 text-[10px] uppercase tracking-[0.2em] font-bold text-black shadow-2xl hover:bg-white transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Acquire</span>
            </button>
          </div>

          {/* New/Exclusive Badge */}
          {product.featured && (
            <span className="absolute top-6 left-6 text-[8px] uppercase tracking-[0.3em] bg-luxury-gold text-black px-3 py-1 font-bold">
              Exclusive
            </span>
          )}
        </div>

        <div className="text-center space-y-2">
          <p className="editorial-label">
            {product.category}
          </p>
          <h3 className="font-serif text-lg tracking-tight group-hover:text-luxury-gold transition-colors text-luxury-white">
            {product.name}
          </h3>
          <p className="text-sm font-light text-luxury-gold">
            {formatCurrency(product.price)}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
