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
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Analytics</h1>
        <p className="text-gray-500">Monitor your profile performance and engagement.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-100 text-blue-600 rounded-full">
                <Eye className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Profile Views</p>
                <h3 className="text-2xl font-bold text-gray-900">{totalViews}</h3>
                <p className="text-xs text-green-500 mt-1">+12% from last week</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-indigo-100 text-indigo-600 rounded-full">
                <MousePointerClick className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Profile Clicks</p>
                <h3 className="text-2xl font-bold text-gray-900">{totalClicks}</h3>
                <p className="text-xs text-green-500 mt-1">+8% from last week</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-orange-100 text-orange-600 rounded-full">
                <Users className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Conversion Rate</p>
                <h3 className="text-2xl font-bold text-gray-900">{((totalClicks / totalViews) * 100).toFixed(1)}%</h3>
                <p className="text-xs text-red-500 mt-1">-2% from last week</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Profile Views vs Clicks (This Week)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80 w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={analyticsData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} dx={-10} />
                <Tooltip cursor={{ stroke: '#D1D5DB', strokeWidth: 1, strokeDasharray: '4 4' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} />
                <Line type="monotone" dataKey="views" stroke="#3B82F6" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} name="Views" />
                <Line type="monotone" dataKey="clicks" stroke="#8B5CF6" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} name="Clicks" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
