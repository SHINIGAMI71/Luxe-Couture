import React, { useState, useEffect } from 'react';
import { db } from '../../lib/firebase';
import { collection, query, orderBy, getDocs, addDoc, serverTimestamp, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { Plus, Search, MoreHorizontal, Edit, Trash2, X } from 'lucide-react';
import { Product } from '../../types';
import { formatCurrency } from '../../lib/utils';
import { DUMMY_PRODUCTS } from '../../constants';

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Women',
    stock: '',
    images: ['https://picsum.photos/seed/new-fashion/800/1200']
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const fetched: any[] = [];
      querySnapshot.forEach((doc) => {
        fetched.push({ id: doc.id, ...doc.data() });
      });
      // Fallback to dummy if empty for demo
      setProducts(fetched.length > 0 ? fetched : DUMMY_PRODUCTS as any);
    } catch (error) {
      console.error(error);
      setProducts(DUMMY_PRODUCTS as any);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'products'), {
        ...newProduct,
        price: parseFloat(newProduct.price),
        stock: parseInt(newProduct.stock),
        sizes: ['XS', 'S', 'M', 'L'],
        featured: false,
        createdAt: new Date().toISOString()
      });
      setIsModalOpen(false);
      fetchProducts();
    } catch (error) {
      alert('Error adding product. Check rules.');
    }
  };

  return (
    <div className="space-y-12">
      <div className="flex justify-between items-end border-b border-luxury-border pb-8 text-luxury-white">
        <div>
          <h1 className="text-4xl font-serif italic mb-2 text-luxury-gold text-luxury-white">Inventory Archives</h1>
          <p className="editorial-label text-luxury-gray">Management of curated pieces.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center space-x-2 bg-luxury-gold text-black px-8 py-4 text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-white transition-all shadow-xl"
        >
          <Plus className="w-4 h-4" />
          <span>Curate New Piece</span>
        </button>
      </div>

      {/* Table Container */}
      <div className="bg-luxury-surface border border-luxury-border shadow-2xl overflow-hidden">
        <div className="p-8 border-b border-luxury-border flex items-center justify-between">
          <div className="relative w-full max-w-md">
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-luxury-gray font-bold" />
             <input 
              type="text" 
              placeholder="SEARCH COLLECTION..." 
              className="w-full pl-12 pr-6 py-4 bg-luxury-black border border-luxury-border text-[10px] uppercase tracking-[0.2em] text-luxury-white focus:border-luxury-gold outline-none transition-colors" 
             />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left font-sans">
            <thead className="bg-[#f0f0f2] text-luxury-gray text-[10px] uppercase tracking-[0.2em] font-bold border-b border-luxury-border">
              <tr>
                <th className="px-8 py-6">Product Image & Name</th>
                <th className="px-8 py-6">Category</th>
                <th className="px-8 py-6">Valuation</th>
                <th className="px-8 py-6">Inventory</th>
                <th className="px-8 py-6 text-right">Operations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-luxury-border">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-white/5 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center space-x-6">
                      <div className="w-12 h-16 border border-luxury-border overflow-hidden">
                        <img src={p.images[0]} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="text-[11px] font-bold text-luxury-white uppercase tracking-widest">{p.name}</p>
                        <p className="text-[9px] text-luxury-gray truncate max-w-xs">{p.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-[9px] px-3 py-1 border border-luxury-gold/30 text-luxury-gold font-bold uppercase tracking-widest">{p.category}</span>
                  </td>
                  <td className="px-8 py-6 text-[11px] font-bold text-luxury-gold">{formatCurrency(p.price)}</td>
                  <td className="px-8 py-6 text-[11px] text-luxury-white">{p.stock} Units</td>
                  <td className="px-8 py-6 text-right">
                    <button className="p-2 hover:text-luxury-gold transition-colors"><MoreHorizontal className="w-5 h-5" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-6 backdrop-blur-sm">
          <div className="bg-luxury-surface w-full max-w-2xl border border-luxury-border shadow-2xl overflow-hidden">
            <div className="p-8 border-b border-luxury-border flex justify-between items-center bg-luxury-black">
              <h3 className="text-2xl font-serif italic text-luxury-white">New Archive Entry</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-luxury-gray hover:text-luxury-gold transition-colors"
              >
                <X className="w-8 h-8 font-light" />
              </button>
            </div>
            <form onSubmit={handleAddProduct} className="p-10 space-y-8">
               <div className="grid grid-cols-2 gap-8">
                 <div className="space-y-4">
                   <label className="editorial-label font-bold text-luxury-gray">Designation</label>
                   <input 
                    required 
                    type="text" 
                    value={newProduct.name} 
                    onChange={e => setNewProduct({...newProduct, name: e.target.value})} 
                    className="w-full bg-luxury-black border border-luxury-border p-4 text-[11px] uppercase tracking-widest text-luxury-white focus:border-luxury-gold outline-none transition-colors" 
                    placeholder="E.G. SILK GOWN" 
                   />
                 </div>
                 <div className="space-y-4">
                   <label className="editorial-label font-bold text-luxury-gray">Collection</label>
                   <select 
                    value={newProduct.category} 
                    onChange={e => setNewProduct({...newProduct, category: e.target.value})} 
                    className="w-full bg-luxury-black border border-luxury-border p-4 text-[11px] uppercase tracking-widest text-luxury-white outline-none cursor-pointer"
                   >
                     <option>Women</option>
                     <option>Men</option>
                     <option>Accessories</option>
                   </select>
                 </div>
               </div>
               <div className="grid grid-cols-2 gap-8">
                 <div className="space-y-4">
                   <label className="editorial-label font-bold text-luxury-gray">Valuation ($)</label>
                   <input required type="number" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} className="w-full bg-luxury-black border border-luxury-border p-4 text-[11px] uppercase tracking-widest text-luxury-white outline-none" placeholder="0.00" />
                 </div>
                 <div className="space-y-4">
                   <label className="editorial-label font-bold text-luxury-gray">Inventory Count</label>
                   <input required type="number" value={newProduct.stock} onChange={e => setNewProduct({...newProduct, stock: e.target.value})} className="w-full bg-luxury-black border border-luxury-border p-4 text-[11px] uppercase tracking-widest text-luxury-white outline-none" placeholder="0" />
                 </div>
               </div>
               <div className="space-y-4">
                  <label className="editorial-label font-bold text-luxury-gray">Provenance & Narrative</label>
                  <textarea rows={4} value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})} className="w-full bg-luxury-black border border-luxury-border p-4 text-[11px] uppercase tracking-widest text-luxury-white outline-none" placeholder="DESCRIBE THE PIECE'S JOURNEY..." />
               </div>
               <button type="submit" className="w-full py-6 bg-luxury-gold text-black font-bold text-[10px] uppercase tracking-[0.4em] hover:bg-white transition-all shadow-xl">Commit to Registry</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
