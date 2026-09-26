import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, Eye, MousePointerClick } from 'lucide-react';

const analyticsData = [
  { name: 'Mon', views: 40, clicks: 12 },
  { name: 'Tue', views: 30, clicks: 8 },
  { name: 'Wed', views: 55, clicks: 18 },
  { name: 'Thu', views: 45, clicks: 14 },
  { name: 'Fri', views: 70, clicks: 25 },
  { name: 'Sat', views: 80, clicks: 30 },
  { name: 'Sun', views: 65, clicks: 22 },
];

export default function Analytics() {
  const totalViews = analyticsData.reduce((acc, curr) => acc + curr.views, 0);
  const totalClicks = analyticsData.reduce((acc, curr) => acc + curr.clicks, 0);

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-emerald-950 tracking-tight">Analytics</h1>
        <p className="text-emerald-700/80 mt-1 font-medium">Monitor your profile performance and engagement.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border-0 bg-white">
          <CardContent className="p-6 md:p-8">
            <div className="flex items-center space-x-5">
              <div className="p-4 bg-emerald-100 text-emerald-700 rounded-2xl shadow-sm">
                <Eye className="h-7 w-7" />
              </div>
              <div>
                <p className="text-sm font-bold text-emerald-800/70 uppercase tracking-wider">Profile Views</p>
                <h3 className="text-3xl font-bold text-emerald-950 mt-1">{totalViews}</h3>
                <p className="text-xs font-bold text-emerald-600 mt-2 bg-emerald-50 inline-block px-2 py-1 rounded-lg">+12% from last week</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border-0 bg-white">
          <CardContent className="p-6 md:p-8">
            <div className="flex items-center space-x-5">
              <div className="p-4 bg-emerald-100 text-emerald-700 rounded-2xl shadow-sm">
                <MousePointerClick className="h-7 w-7" />
              </div>
              <div>
                <p className="text-sm font-bold text-emerald-800/70 uppercase tracking-wider">Profile Clicks</p>
                <h3 className="text-3xl font-bold text-emerald-950 mt-1">{totalClicks}</h3>
                <p className="text-xs font-bold text-emerald-600 mt-2 bg-emerald-50 inline-block px-2 py-1 rounded-lg">+8% from last week</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border-0 bg-white">
          <CardContent className="p-6 md:p-8">
            <div className="flex items-center space-x-5">
              <div className="p-4 bg-emerald-100 text-emerald-700 rounded-2xl shadow-sm">
                <Users className="h-7 w-7" />
              </div>
              <div>
                <p className="text-sm font-bold text-emerald-800/70 uppercase tracking-wider">Conversion Rate</p>
                <h3 className="text-3xl font-bold text-emerald-950 mt-1">{((totalClicks / totalViews) * 100).toFixed(1)}%</h3>
                <p className="text-xs font-bold text-rose-600 mt-2 bg-rose-50 inline-block px-2 py-1 rounded-lg">-2% from last week</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border-0 bg-white">
        <CardHeader className="pb-4 md:p-8">
          <CardTitle className="text-xl font-bold text-emerald-950">Profile Views vs Clicks (This Week)</CardTitle>
        </CardHeader>
        <CardContent className="md:px-8 pb-8">
          <div className="h-80 w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={analyticsData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#d1fae5" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#047857', fontSize: 13, fontWeight: 600 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#047857', fontSize: 13, fontWeight: 600 }} dx={-10} />
                <Tooltip 
                  cursor={{ stroke: '#a7f3d0', strokeWidth: 2, strokeDasharray: '4 4' }} 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', backgroundColor: '#ffffff', color: '#022c22', fontWeight: 'bold' }} 
                />
                <Line type="monotone" dataKey="views" stroke="#059669" strokeWidth={4} dot={{ r: 5, strokeWidth: 2, fill: '#fff', stroke: '#059669' }} activeDot={{ r: 8 }} name="Views" />
                <Line type="monotone" dataKey="clicks" stroke="#10b981" strokeWidth={4} dot={{ r: 5, strokeWidth: 2, fill: '#fff', stroke: '#10b981' }} activeDot={{ r: 8 }} name="Clicks" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
