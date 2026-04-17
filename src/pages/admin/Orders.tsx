import React, { useState, useEffect } from 'react';
import { db } from '../../lib/firebase';
import { collection, query, orderBy, getDocs, doc, updateDoc } from 'firebase/firestore';
import { formatCurrency } from '../../lib/utils';
import { Package, Truck, CheckCircle, Clock, ShoppingBag as BagIcon } from 'lucide-react';

export default function Orders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const fetched: any[] = [];
      querySnapshot.forEach((doc) => {
        fetched.push({ id: doc.id, ...doc.data() });
      });
      setOrders(fetched);
    } catch (error) {
       console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, 'orders', id), { status: newStatus });
      fetchOrders();
    } catch (error) {
      alert('Error updating status.');
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4 text-amber-500" />;
      case 'processing': return <Package className="w-4 h-4 text-luxury-gold" />;
      case 'shipped': return <Truck className="w-4 h-4 text-purple-400" />;
      case 'delivered': return <CheckCircle className="w-4 h-4 text-emerald-500" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-12">
      <div className="flex justify-between items-end border-b border-luxury-border pb-8 text-luxury-white">
        <div>
          <h1 className="text-4xl font-serif italic mb-2 text-luxury-gold">Transaction Flow</h1>
          <p className="editorial-label text-luxury-gray">Monitoring the movement of archives.</p>
        </div>
      </div>

      <div className="bg-luxury-surface border border-luxury-border shadow-2xl overflow-hidden">
        {loading ? (
          <div className="p-32 text-center text-luxury-gray editorial-label italic tracking-[0.5em]">Syncing Archives...</div>
        ) : orders.length === 0 ? (
          <div className="p-32 text-center">
             <BagIcon className="w-16 h-16 text-luxury-border mx-auto mb-8" />
             <p className="text-luxury-gray italic font-serif text-2xl uppercase tracking-tighter">The history is blank.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left font-sans">
               <thead className="bg-luxury-black/50 text-luxury-gray text-[10px] uppercase tracking-[0.2em] font-bold border-b border-luxury-border">
                 <tr>
                   <th className="px-8 py-6">Identity</th>
                   <th className="px-8 py-6">Patron Details</th>
                   <th className="px-8 py-6">Acquisition Total</th>
                   <th className="px-8 py-6">Lifecycle Phase</th>
                   <th className="px-8 py-6 text-right">Alter Phase</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-luxury-border">
                 {orders.map((order) => (
                   <tr key={order.id} className="hover:bg-white/5 transition-colors">
                     <td className="px-8 py-6 font-mono text-[10px] text-luxury-gold">#{order.id.slice(0, 8).toUpperCase()}</td>
                     <td className="px-8 py-6">
                        <p className="text-[11px] font-bold text-luxury-white uppercase tracking-widest">{order.customerEmail || 'Anonymous Guest'}</p>
                        <p className="text-[9px] text-luxury-gray">{new Date(order.createdAt).toLocaleDateString()}</p>
                     </td>
                     <td className="px-8 py-6 text-[11px] font-bold text-luxury-gold">{formatCurrency(order.total)}</td>
                     <td className="px-8 py-6">
                        <div className="flex items-center space-x-3 bg-luxury-black py-2 px-4 border border-luxury-border w-fit">
                           {getStatusIcon(order.status)}
                           <span className="text-[9px] uppercase font-bold tracking-[0.2em] text-luxury-white">{order.status}</span>
                        </div>
                     </td>
                     <td className="px-8 py-6 text-right">
                        <select 
                          className="bg-luxury-black text-luxury-gray border border-luxury-border rounded-none p-3 text-[10px] uppercase tracking-widest outline-none focus:border-luxury-gold cursor-pointer"
                          value={order.status}
                          onChange={(e) => updateStatus(order.id, e.target.value)}
                        >
                          <option value="pending">Pending</option>
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                        </select>
                     </td>
                   </tr>
                 ))}
               </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
