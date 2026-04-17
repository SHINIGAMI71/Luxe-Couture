import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogIn, ShieldCheck } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { mockLogin } = useAuth();
  const navigate = useNavigate();

  const handleMockLogin = (e: React.FormEvent) => {
    e.preventDefault();
    mockLogin(email || 'admin@maison.luxury');
    navigate('/admin');
  };

  return (
    <div className="min-h-screen pt-32 pb-24 bg-luxury-black flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-luxury-gold/5 blur-[120px] rounded-full pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative"
      >
        <div className="bg-luxury-surface border border-luxury-border p-12 shadow-2xl">
          <div className="text-center mb-12">
            <span className="editorial-label text-luxury-gold tracking-[0.6em] font-bold block mb-6">Maison Entrance</span>
            <h1 className="text-5xl font-serif italic text-luxury-white">Secure Access</h1>
          </div>

          <form onSubmit={handleMockLogin} className="space-y-8">
            <div className="space-y-3">
              <label className="editorial-label text-luxury-gray text-[10px] tracking-[0.4em]">PATRON IDENTITY</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-luxury-black border border-luxury-border p-4 text-[11px] uppercase tracking-widest text-luxury-white focus:border-luxury-gold outline-none transition-all placeholder:text-luxury-gray/20"
                placeholder="EMAIL@MAISON.LUXURY"
                required
              />
            </div>

            <div className="space-y-3">
              <label className="editorial-label text-luxury-gray text-[10px] tracking-[0.4em]">AUTHENTICATION CODE</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-luxury-black border border-luxury-border p-4 text-[11px] uppercase tracking-widest text-luxury-white focus:border-luxury-gold outline-none transition-all placeholder:text-luxury-gray/20"
                placeholder="••••••••"
                required
              />
            </div>

            <button 
              type="submit"
              className="w-full py-6 bg-luxury-gold text-black font-extrabold text-[10px] uppercase tracking-[0.4em] hover:bg-white transition-all shadow-xl flex items-center justify-center space-x-3 group"
            >
              <span>Authenticate Session</span>
              <LogIn className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-12 pt-8 border-t border-luxury-border text-center">
            <p className="text-[10px] text-luxury-gray uppercase tracking-widest leading-loose">
              "To enter is to embrace the legacy of the Maison. <br />
              Ensure your credentials remain private."
            </p>
            <div className="mt-6 flex items-center justify-center space-x-2 text-emerald-500/60">
              <ShieldCheck className="w-4 h-4" />
              <span className="text-[9px] uppercase tracking-widest font-bold">Secure Environment Active</span>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link to="/" className="text-luxury-gray hover:text-luxury-gold text-[10px] uppercase tracking-[0.4em] transition-colors border-b border-transparent hover:border-luxury-gold pb-1">
            Return to Storefront
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
