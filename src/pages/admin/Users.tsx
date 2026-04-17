import React, { useState, useEffect } from 'react';
import { db } from '../../lib/firebase';
import { collection, query, getDocs } from 'firebase/firestore';
import { Shield, User } from 'lucide-react';

export default function UsersList() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const querySnapshot = await getDocs(query(collection(db, 'users')));
      const fetched: any[] = [];
      querySnapshot.forEach((doc) => {
        fetched.push({ id: doc.id, ...doc.data() });
      });
      setUsers(fetched);
    } catch (error) {
       console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-12">
      <div className="flex justify-between items-end border-b border-luxury-border pb-8 text-luxury-white">
        <div>
          <h1 className="text-4xl font-serif italic mb-2 text-luxury-gold">Patron Registry</h1>
          <p className="editorial-label text-luxury-gray">The distinguished list of Maison members.</p>
        </div>
      </div>

      <div className="bg-luxury-surface border border-luxury-border shadow-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-sans">
            <thead className="bg-luxury-black/50 text-luxury-gray text-[10px] uppercase tracking-[0.2em] font-bold border-b border-luxury-border">
              <tr>
                <th className="px-8 py-6 uppercase tracking-widest">The Patron</th>
                <th className="px-8 py-6 uppercase tracking-widest">Governance Role</th>
                <th className="px-8 py-6 uppercase tracking-widest">Registry Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-luxury-border">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-8 py-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-luxury-black border border-luxury-border flex items-center justify-center">
                        <User className="w-4 h-4 text-luxury-gold" />
                      </div>
                      <div>
                        <p className="text-[11px] font-bold text-luxury-white uppercase tracking-widest">{u.displayName || 'Unnamed VIP'}</p>
                        <p className="text-[9px] text-luxury-gray">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center space-x-2">
                       {u.role === 'admin' ? (
                         <div className="flex items-center space-x-2 bg-luxury-gold/10 text-luxury-gold px-3 py-1 border border-luxury-gold/30">
                           <Shield className="w-3 h-3" />
                           <span className="text-[9px] uppercase font-bold tracking-widest leading-none">Supreme Curator</span>
                         </div>
                       ) : (
                         <span className="text-[9px] uppercase font-bold tracking-widest text-luxury-gray">Patron</span>
                       )}
                    </div>
                  </td>
                  <td className="px-8 py-6 text-[10px] text-luxury-gray uppercase tracking-widest">
                    {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : 'Historical Entry'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
