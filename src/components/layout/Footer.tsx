import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-luxury-black text-luxury-white pt-24 pb-12 px-6 md:px-12 border-t border-luxury-border">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
        {/* Brand */}
        <div className="col-span-1 md:col-span-1">
          <Link to="/" className="brand font-serif italic text-2xl text-luxury-gold tracking-[2px] uppercase mb-6">Maison</Link>
          <p className="text-[11px] text-luxury-gray font-light leading-relaxed max-w-xs uppercase tracking-widest">
            The standard of uncompromising luxury.
          </p>
        </div>

        {/* Links */}
        <div>
          <h4 className="editorial-label mb-6 font-semibold font-sans">Collections</h4>
          <ul className="space-y-4 text-[11px] text-luxury-gray font-light uppercase tracking-widest">
            <li><Link to="/shop?category=Women" className="hover:text-luxury-gold transition-colors">Women</Link></li>
            <li><Link to="/shop?category=Men" className="hover:text-luxury-gold transition-colors">Men</Link></li>
            <li><Link to="/shop?category=Accessories" className="hover:text-luxury-gold transition-colors">Accessories</Link></li>
            <li><Link to="/shop" className="hover:text-luxury-gold transition-colors">New Arrivals</Link></li>
          </ul>
        </div>

        <div>
           <h4 className="editorial-label mb-6 font-semibold font-sans">Support</h4>
          <ul className="space-y-4 text-[11px] text-luxury-gray font-light uppercase tracking-widest">
            <li><Link to="/contact" className="hover:text-luxury-gold transition-colors">Contact Us</Link></li>
            <li><a href="#" className="hover:text-luxury-gold transition-colors">Shipping & Returns</a></li>
            <li><a href="#" className="hover:text-luxury-gold transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-luxury-gold transition-colors">FAQs</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="editorial-label mb-6 font-semibold font-sans">Join the Circle</h4>
          <p className="text-[11px] text-luxury-gray font-light mb-4 uppercase tracking-widest">Be the first to hear about new collections.</p>
          <div className="relative">
            <input 
              type="email" 
              placeholder="EMAIL ADDRESS" 
              className="w-full bg-transparent border-b border-luxury-border py-2 text-[10px] focus:border-luxury-gold outline-none transition-colors uppercase tracking-widest"
            />
            <button className="absolute right-0 top-2 text-[10px] uppercase tracking-widest text-luxury-gold">Subscribe</button>
          </div>
          <div className="flex space-x-4 mt-8">
            <Instagram className="w-5 h-5 text-luxury-gray hover:text-luxury-gold cursor-pointer transition-colors" />
            <Twitter className="w-5 h-5 text-luxury-gray hover:text-luxury-gold cursor-pointer transition-colors" />
            <Facebook className="w-5 h-5 text-luxury-gray hover:text-luxury-gold cursor-pointer transition-colors" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-luxury-border flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-widest text-luxury-gray">
        <p>© 2026 MAISON. All Rights Reserved.</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a href="#">Terms of Use</a>
          <a href="#">Cookies</a>
        </div>
      </div>
    </footer>
  );
}
