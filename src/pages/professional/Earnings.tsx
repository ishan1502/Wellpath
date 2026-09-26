import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { DollarSign, TrendingUp, CreditCard } from 'lucide-react';

const earningsData = [
  { name: 'Mon', amount: 1200 },
  { name: 'Tue', amount: 900 },
  { name: 'Wed', amount: 1500 },
  { name: 'Thu', amount: 200 },
  { name: 'Fri', amount: 700 },
  { name: 'Sat', amount: 150 },
  { name: 'Sun', amount: 0 },
];

export default function Earnings() {
  const totalWeekly = earningsData.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-emerald-950 tracking-tight">Earnings</h1>
        <p className="text-emerald-700/80 mt-1 font-medium">Track your revenue and payment history.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border-0 bg-white">
          <CardContent className="p-6 md:p-8">
            <div className="flex items-center space-x-5">
              <div className="p-4 bg-emerald-100 text-emerald-700 rounded-2xl shadow-sm">
                <DollarSign className="h-7 w-7" />
              </div>
              <div>
                <p className="text-sm font-bold text-emerald-800/70 uppercase tracking-wider">Weekly Earnings</p>
                <h3 className="text-3xl font-bold text-emerald-950 mt-1">₹{totalWeekly}</h3>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border-0 bg-white">
          <CardContent className="p-6 md:p-8">
            <div className="flex items-center space-x-5">
              <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl shadow-sm border border-emerald-100">
                <TrendingUp className="h-7 w-7" />
              </div>
              <div>
                <p className="text-sm font-bold text-emerald-800/70 uppercase tracking-wider">Monthly Projected</p>
                <h3 className="text-3xl font-bold text-emerald-950 mt-1">₹{(totalWeekly * 4.2).toFixed(0)}</h3>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border-0 bg-white">
          <CardContent className="p-6 md:p-8">
            <div className="flex items-center space-x-5">
              <div className="p-4 bg-emerald-100 text-emerald-700 rounded-2xl shadow-sm">
                <CreditCard className="h-7 w-7" />
              </div>
              <div>
                <p className="text-sm font-bold text-emerald-800/70 uppercase tracking-wider">Next Payout</p>
                <h3 className="text-3xl font-bold text-emerald-950 mt-1">Sep 15</h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border-0 bg-white">
        <CardHeader className="pb-2 md:p-8">
          <CardTitle className="text-xl font-bold text-emerald-950">Earnings Overview (This Week)</CardTitle>
        </CardHeader>
        <CardContent className="md:px-8 pb-8">
          <div className="h-80 w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={earningsData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#d1fae5" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#047857', fontSize: 13, fontWeight: 600 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#047857', fontSize: 13, fontWeight: 600 }} dx={-10} tickFormatter={(value) => `₹${value}`} />
                <Tooltip 
                  cursor={{ fill: '#ecfdf5' }} 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', backgroundColor: '#ffffff', color: '#022c22', fontWeight: 'bold' }} 
                />
                <Bar dataKey="amount" fill="#059669" radius={[8, 8, 0, 0]} barSize={48} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
