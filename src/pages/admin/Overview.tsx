import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area 
} from 'recharts';
import { TrendingUp, ShoppingBag, Users, DollarSign } from 'lucide-react';

const data = [
  { name: 'Mon', revenue: 4000, orders: 24 },
  { name: 'Tue', revenue: 3000, orders: 18 },
  { name: 'Wed', revenue: 2000, orders: 12 },
  { name: 'Thu', revenue: 2780, orders: 20 },
  { name: 'Fri', revenue: 1890, orders: 15 },
  { name: 'Sat', revenue: 2390, orders: 22 },
  { name: 'Sun', revenue: 3490, orders: 28 },
];

export default function Overview() {
  const stats = [
    { name: 'Total Revenue', value: '$128,430', icon: DollarSign, change: '+12.5%', trend: 'up' },
    { name: 'Active Orders', value: '42', icon: ShoppingBag, change: '+5.2%', trend: 'up' },
    { name: 'New Customers', value: '12', icon: Users, change: '-2.1%', trend: 'down' },
    { name: 'Avg. Order Value', value: '$2,450', icon: TrendingUp, change: '+8.4%', trend: 'up' },
  ];

  return (
    <div className="space-y-12">
      <div className="flex justify-between items-end border-b border-luxury-border pb-8">
        <div>
          <h1 className="text-4xl font-serif italic mb-2 text-luxury-gold">Governance Overview</h1>
          <p className="editorial-label text-luxury-gray">Performance Metrics / 2026</p>
        </div>
        <div className="text-right">
          <p className="editorial-label text-luxury-white font-bold">Status: Online</p>
          <p className="editorial-label text-emerald-500">All Nodes Functional</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-luxury-surface p-8 border border-luxury-border hover:border-luxury-gold/50 transition-colors shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <div className="p-3 bg-luxury-black border border-luxury-border">
                <stat.icon className="w-5 h-5 text-luxury-gold" />
              </div>
              <span className={`text-[10px] font-bold uppercase tracking-widest ${stat.trend === 'up' ? 'text-emerald-500' : 'text-rose-500'}`}>
                {stat.change}
              </span>
            </div>
            <p className="editorial-label text-luxury-gray mb-2">{stat.name}</p>
            <h3 className="text-3xl font-serif italic text-luxury-white">{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="bg-luxury-surface p-10 border border-luxury-border shadow-2xl">
          <h3 className="editorial-label text-luxury-white mb-10 font-bold border-b border-luxury-border pb-4">Revenue Flow (Weekly)</h3>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#D4AF37" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#666666' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#666666' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', fontSize: '10px', textTransform: 'uppercase' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#B8860B" fillOpacity={1} fill="url(#colorRev)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-luxury-surface p-10 border border-luxury-border shadow-2xl">
          <h3 className="editorial-label text-luxury-white mb-10 font-bold border-b border-luxury-border pb-4">Order Frequency</h3>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#666666' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#666666' }} />
                <Tooltip 
                   cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
                   contentStyle={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', fontSize: '10px', textTransform: 'uppercase' }}
                />
                <Bar dataKey="orders" fill="#B8860B" radius={[0, 0, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
