import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { db } from '../lib/firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      await addDoc(collection(db, 'supportMessages'), {
        ...formData,
        status: 'unread',
        createdAt: serverTimestamp()
      });
      setStatus('sent');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <div className="pt-48 pb-32 bg-luxury-black min-h-screen text-luxury-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-32">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-[10px] uppercase tracking-[0.8em] text-luxury-gold mb-6 font-bold"
          >
            Concierge Direct
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="text-7xl md:text-9xl font-serif italic"
          >
            Liaise with <br /> <span className="text-luxury-gold">the Maison</span>
          </motion.h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-32">
          {/* Info */}
          <div className="space-y-24">
            <div>
              <h2 className="text-4xl font-serif mb-12 italic border-b border-luxury-border pb-6">Global Ateliers</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-12">
                <div className="flex items-start space-x-8 group">
                  <MapPin className="w-6 h-6 text-luxury-gold flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <div>
                    <h3 className="text-[11px] font-bold uppercase tracking-[0.3em] mb-3 text-luxury-white">London Flagship</h3>
                    <p className="text-luxury-gray font-light text-sm leading-relaxed">123 Bond Street, Mayfair<br />London, W1S 1SR, UK</p>
                  </div>
                </div>
                <div className="flex items-start space-x-8 group">
                  <MapPin className="w-6 h-6 text-luxury-gold flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <div>
                    <h3 className="text-[11px] font-bold uppercase tracking-[0.3em] mb-3 text-luxury-white">Milan Showroom</h3>
                    <p className="text-luxury-gray font-light text-sm leading-relaxed">Via Montenapoleone, 8<br />20121 Milano MI, Italy</p>
                  </div>
                </div>
                <div className="flex items-start space-x-8 group">
                  <Mail className="w-6 h-6 text-luxury-gold flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <div>
                    <h3 className="text-[11px] font-bold uppercase tracking-[0.3em] mb-3 text-luxury-white">Digital Enquiries</h3>
                    <p className="text-luxury-gray font-light text-sm">concierge@maison.luxury</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-luxury-surface p-12 border border-luxury-border shadow-2xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-luxury-gold/5 blur-3xl rounded-full -mr-16 -mt-16 group-hover:bg-luxury-gold/10 transition-colors" />
               <h3 className="text-3xl font-serif italic mb-6 text-luxury-white">Private Appointments</h3>
               <p className="text-base font-serif italic text-luxury-gray leading-relaxed mb-10">
                 "Experience the pinnacle of personal styling in our dedicated private suites. Each session is an tailored journey into the heart of luxury."
               </p>
               <button className="text-[10px] uppercase tracking-[0.4em] text-luxury-gold border-b-2 border-luxury-gold/30 hover:border-luxury-gold pb-2 font-bold transition-all">
                 Request Session
               </button>
            </div>
          </div>

          {/* Form */}
          <div className="bg-luxury-surface p-12 md:p-20 shadow-2xl border border-luxury-border relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-luxury-gold shadow-[0_0_15px_rgba(212,175,55,0.3)]" />
            <h2 className="text-5xl font-serif italic mb-16 text-luxury-white">Commence <br />Correspondence</h2>
            <form onSubmit={handleSubmit} className="space-y-12">
              <div className="space-y-4">
                <label className="editorial-label font-bold text-luxury-gray text-[10px] tracking-[0.4em]">Full Legal Name</label>
                <input 
                  required
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-luxury-black border border-luxury-border p-5 text-sm focus:border-luxury-gold outline-none transition-all text-luxury-white placeholder:text-luxury-gray/30"
                  placeholder="ALEXANDER MCQUEEN"
                />
              </div>
              <div className="space-y-4">
                <label className="editorial-label font-bold text-luxury-gray text-[10px] tracking-[0.4em]">Digital Address</label>
                <input 
                  required
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-luxury-black border border-luxury-border p-5 text-sm focus:border-luxury-gold outline-none transition-all text-luxury-white placeholder:text-luxury-gray/30"
                  placeholder="NAME@EXAMPLE.COM"
                />
              </div>
              <div className="space-y-4">
                <label className="editorial-label font-bold text-luxury-gray text-[10px] tracking-[0.4em]">The Narrative</label>
                <textarea 
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-luxury-black border border-luxury-border p-5 text-sm focus:border-luxury-gold outline-none transition-all text-luxury-white placeholder:text-luxury-gray/30 resize-none"
                  placeholder="TELL US HOW WE MAY ASSIST YOUR JOURNEY..."
                />
              </div>

              <button 
                type="submit"
                disabled={status === 'sending'}
                className="w-full py-8 bg-luxury-gold text-black text-[10px] uppercase tracking-[0.6em] font-extrabold shadow-2xl hover:bg-white hover:tracking-[0.8em] transition-all flex items-center justify-center space-x-6 disabled:opacity-50"
              >
                {status === 'sending' ? (
                  <span className="animate-pulse">TRANSMITTING...</span>
                ) : status === 'sent' ? (
                  <span>CORRESPONDENCE LOGGED</span>
                ) : (
                  <>
                    <span>SUBMIT ENQUIRY</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
              
              {status === 'error' && (
                <p className="text-center text-[10px] text-rose-500 uppercase tracking-widest font-bold border border-rose-500/20 py-4">
                  Transmission failed. Please attempt again.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
