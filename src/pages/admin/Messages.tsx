import React, { useState, useEffect } from 'react';
import { db } from '../../lib/firebase';
import { collection, query, orderBy, getDocs, doc, updateDoc } from 'firebase/firestore';
import { Mail, CheckCircle, Clock } from 'lucide-react';

export default function Messages() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const q = query(collection(db, 'supportMessages'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const fetched: any[] = [];
      querySnapshot.forEach((doc) => {
        fetched.push({ id: doc.id, ...doc.data() });
      });
      setMessages(fetched);
    } catch (error) {
       console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id: string) => {
    try {
      await updateDoc(doc(db, 'supportMessages', id), { status: 'replied' });
      fetchMessages();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="space-y-12">
      <div className="flex justify-between items-end border-b border-luxury-border pb-8 text-luxury-white">
        <div>
          <h1 className="text-4xl font-serif italic mb-2 text-luxury-gold">Concierge Inquiries</h1>
          <p className="editorial-label text-luxury-gray">Direct correspondence from the Maison's patrons.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {loading ? (
           <div className="p-32 text-center text-luxury-gray editorial-label italic tracking-[0.5em]">Syncing Communications...</div>
        ) : messages.length === 0 ? (
          <div className="bg-luxury-surface p-32 text-center border border-luxury-border shadow-2xl">
             <Mail className="w-16 h-16 text-luxury-border mx-auto mb-8" />
             <p className="text-luxury-gray italic font-serif text-2xl uppercase tracking-tighter">The correspondence is resolved.</p>
          </div>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className="bg-luxury-surface p-10 border border-luxury-border shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center space-y-8 md:space-y-0 hover:border-luxury-gold/50 transition-colors text-luxury-white">
               <div className="space-y-6 max-w-3xl">
                  <div className="flex items-center space-x-4 text-luxury-white">
                    <span className={`text-[9px] uppercase font-bold tracking-[0.2em] px-3 py-1 border ${
                      msg.status === 'unread' ? 'bg-luxury-gold text-black border-luxury-gold' : 'bg-transparent text-luxury-gray border-luxury-border'
                    }`}>
                      {msg.status}
                    </span>
                    <h3 className="text-[11px] font-bold uppercase tracking-widest text-luxury-white">
                      {msg.name} 
                      <span className="text-luxury-gold font-normal ml-4 italic lowercase tracking-normal">({msg.email})</span>
                    </h3>
                  </div>
                  <p className="text-luxury-white text-base font-serif italic leading-relaxed">"{msg.message}"</p>
                  <p className="text-[9px] text-luxury-gray uppercase tracking-[0.2em]">Received on {new Date(msg.createdAt?.toDate()).toLocaleString()}</p>
               </div>
               
               {msg.status === 'unread' ? (
                 <button 
                  onClick={() => markAsRead(msg.id)}
                  className="px-8 py-4 bg-luxury-gold text-black text-[9px] uppercase tracking-[0.2em] font-bold hover:bg-white transition-all shadow-xl"
                 >
                   Archive Request
                 </button>
               ) : (
                 <div className="flex items-center space-x-2 text-emerald-500">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-[9px] font-bold uppercase tracking-widest">Resolved</span>
                 </div>
               )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
