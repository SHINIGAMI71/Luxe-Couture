import React from 'react';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../lib/utils';
import { Trash2, ShoppingBag, ArrowRight, Minus, Plus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();
  const navigate = useNavigate();

  if (cartCount === 0) {
    return (
      <div className="pt-40 pb-24 px-6 text-center max-w-xl mx-auto">
        <div className="flex justify-center mb-8">
          <ShoppingBag className="w-16 h-16 text-luxury-black/10" />
        </div>
        <h1 className="text-4xl font-serif mb-6">Your Bag is Empty</h1>
        <p className="text-luxury-black/60 font-light mb-12">Discover our latest collection and find the perfect pieces to add to your wardrobe.</p>
        <Link 
          to="/shop" 
          className="inline-block px-16 py-6 bg-luxury-black text-white text-[10px] uppercase tracking-[0.4em] font-bold shadow-xl hover:bg-luxury-gold transition-colors"
        >
          Explore Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
      <h1 className="text-5xl font-serif mb-16">Shopping Bag</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        {/* Items */}
        <div className="lg:col-span-2 space-y-12">
          {cart.map((item) => (
            <div key={`${item.id}-${item.selectedSize}`} className="flex flex-col sm:flex-row space-y-6 sm:space-y-0 sm:space-x-8 pb-12 border-b border-luxury-black/10">
              <div className="w-full sm:w-40 aspect-[3/4] bg-white overflow-hidden flex-shrink-0">
                <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
              </div>
              
              <div className="flex-grow flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-serif">{item.name}</h3>
                    <p className="text-sm font-semibold">{formatCurrency(item.price)}</p>
                  </div>
                  <p className="text-[10px] uppercase tracking-widest text-luxury-black/40 mb-1">Category: {item.category}</p>
                  <p className="text-[10px] uppercase tracking-widest text-luxury-black/40 mb-6">Size: {item.selectedSize}</p>
                </div>

                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center border border-luxury-black/10 w-fit">
                    <button 
                      onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity - 1)}
                      className="p-2 hover:bg-luxury-black/5"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-10 text-center text-xs">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity + 1)}
                      className="p-2 hover:bg-luxury-black/5"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <button 
                    onClick={() => removeFromCart(item.id, item.selectedSize)}
                    className="flex items-center space-x-2 text-[10px] uppercase tracking-widest text-rose-500 hover:text-rose-700 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Remove</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white p-10 shadow-sm border border-luxury-black/5">
            <h2 className="text-[10px] uppercase tracking-[0.4em] font-bold mb-10 border-b border-luxury-black/10 pb-4">Order Summary</h2>
            
            <div className="space-y-6 text-sm font-light mb-10">
              <div className="flex justify-between">
                <span className="text-luxury-black/60">Subtotal</span>
                <span>{formatCurrency(cartTotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-luxury-black/60">Shipping</span>
                <span className="text-luxury-gold uppercase text-[10px] font-bold">Complimentary</span>
              </div>
              <div className="pt-6 border-t border-luxury-black/10 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>{formatCurrency(cartTotal)}</span>
              </div>
            </div>

            <button 
               onClick={() => alert('Luxury Checkout simulated. Thank you for your interest!')}
               className="w-full py-6 bg-luxury-black text-white text-[10px] uppercase tracking-[0.4em] font-bold shadow-xl hover:bg-luxury-gold transition-colors flex items-center justify-center space-x-4"
            >
              <span>Begin Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="mt-8 space-y-4">
               <p className="text-[10px] text-center text-luxury-black/40 uppercase tracking-widest">Secure Payments</p>
               <div className="flex justify-center space-x-4 opacity-30 grayscale">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" className="h-4" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-4" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" className="h-4" />
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
