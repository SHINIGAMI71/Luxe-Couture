import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, User, Menu, X, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { cn } from '../../lib/utils';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, login, logout, isAdmin } = useAuth();
  const { cartCount } = useCart();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Women', path: '/shop?category=Women' },
    { name: 'Men', path: '/shop?category=Men' },
    { name: 'Accessories', path: '/shop?category=Accessories' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className={cn(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-500 py-6 px-6 md:px-12 border-b border-transparent',
      scrolled ? 'bg-luxury-black/95 backdrop-blur-md border-luxury-border py-4' : 'bg-transparent'
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Mobile Menu Toggle */}
        <button onClick={() => setIsOpen(true)} className="md:hidden">
          <Menu className="w-6 h-6 text-luxury-white" />
        </button>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.slice(1, 4).map((link) => (
            <Link 
              key={link.name} 
              to={link.path} 
              className="text-[10px] uppercase tracking-[0.2em] text-luxury-gray hover:text-luxury-gold transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Logo */}
        <Link to="/" className="text-xl md:text-2xl font-serif italic text-luxury-accent tracking-[2px] uppercase text-luxury-gold flex items-center">
          Maison
        </Link>

        {/* Actions */}
        <div className="flex items-center space-x-6 text-luxury-gray">
          {isAdmin && (
            <Link to="/admin" className="hidden md:block text-luxury-gold">
              <ShieldCheck className="w-5 h-5" />
            </Link>
          )}
          
          <button onClick={user ? logout : login} className="flex items-center space-x-2 hover:text-luxury-white transition-colors">
            <User className="w-5 h-5" />
            {user && <span className="hidden md:block text-[9px] uppercase tracking-widest truncate max-w-[80px]">{user.displayName}</span>}
          </button>

          <Link to="/cart" className="relative hover:text-luxury-white transition-colors">
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-luxury-gold text-black text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-luxury-black z-[60] p-12 flex flex-col"
          >
            <button onClick={() => setIsOpen(false)} className="absolute top-8 right-8 text-luxury-white">
              <X className="w-8 h-8" />
            </button>
            <div className="flex flex-col space-y-8 mt-12">
              <div className="brand font-serif italic text-3xl text-luxury-gold tracking-[2px] uppercase mb-12">Maison</div>
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="text-2xl font-serif text-luxury-white hover:text-luxury-gold transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              {isAdmin && (
                <Link to="/admin" onClick={() => setIsOpen(false)} className="text-2xl font-serif text-luxury-gold">
                  Governance
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
