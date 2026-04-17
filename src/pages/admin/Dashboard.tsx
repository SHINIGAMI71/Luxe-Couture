import React from 'react';
import { NavLink, Routes, Route, useNavigate } from 'react-router-dom';
import { 
  BarChart3, 
  Package, 
  ShoppingBag, 
  Users, 
  MessageSquare, 
  Settings, 
  LogOut,
  Home,
  LayoutDashboard
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Overview from './Overview';
import Products from './Products';
import Orders from './Orders';
import UsersList from './Users';
import Messages from './Messages';

export default function AdminDashboard() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const navItems = [
    { name: 'Dashboard', path: '', icon: LayoutDashboard },
    { name: 'Inventory', path: 'products', icon: Package },
    { name: 'Order Flow', path: 'orders', icon: ShoppingBag },
    { name: 'Patrons', path: 'users', icon: Users },
    { name: 'Concierge', path: 'messages', icon: MessageSquare },
  ];

  return (
    <div className="flex h-screen bg-luxury-black pt-[88px] overflow-hidden"> {/* Navbar height offset */}
      {/* Sidebar */}
      <aside className="w-72 bg-luxury-surface border-r border-luxury-border flex flex-col hidden md:flex">
        <div className="p-10 border-b border-luxury-border">
          <p className="editorial-label text-luxury-gold font-bold">Maison Governance</p>
          <div className="mt-6 flex items-center space-x-4">
            <div className="w-10 h-10 rounded-full bg-luxury-gold flex items-center justify-center text-black font-serif italic text-lg">
              {user?.displayName?.charAt(0) || 'A'}
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-luxury-white font-bold">{user?.displayName}</p>
              <p className="text-[8px] uppercase tracking-[0.2em] text-luxury-gray">Supreme Curator</p>
            </div>
          </div>
        </div>
        
        <nav className="flex-grow p-6 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === ''}
              className={({ isActive }) => `
                flex items-center space-x-4 px-6 py-4 transition-all duration-300
                ${isActive ? 'bg-luxury-gold text-black font-bold shadow-xl scale-[1.02]' : 'text-luxury-gray hover:text-luxury-white hover:bg-white/5'}
              `}
            >
              <item.icon className="w-4 h-4" />
              <span className="text-[10px] uppercase tracking-[0.2em]">{item.name}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-6 border-t border-luxury-border">
          <Link to="/" className="flex items-center space-x-4 px-6 py-4 text-[10px] uppercase tracking-[0.2em] text-luxury-gray hover:text-luxury-gold transition-colors mb-2">
            <Home className="w-4 h-4" />
            <span>Storefront</span>
          </Link>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center space-x-4 px-6 py-4 text-[10px] uppercase tracking-[0.2em] text-rose-400 hover:bg-rose-500/10 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Terminate Session</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow overflow-y-auto p-12 bg-luxury-black">
        <div className="max-w-6xl mx-auto">
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/products" element={<Products />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/users" element={<UsersList />} />
            <Route path="/messages" element={<Messages />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

function Link({ to, children, ...props }: any) {
  return <NavLink to={to} {...props}>{children}</NavLink>;
}
