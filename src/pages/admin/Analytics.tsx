import React, { useState } from 'react';
import { 
  TrendingUp, 
  Users, 
  Calendar, 
  DollarSign, 
  ArrowUpRight, 
  Download, 
  Activity, 
  ShieldCheck, 
  Clock, 
  Award,
  MapPin
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

// Monthly Revenue and Appointment Volume data
const REVENUE_DATA = [
  { month: 'Jan', gmv: 280000, revenue: 28000, appointments: 190 },
  { month: 'Feb', gmv: 320000, revenue: 32000, appointments: 220 },
  { month: 'Mar', gmv: 390000, revenue: 39000, appointments: 265 },
  { month: 'Apr', gmv: 430000, revenue: 43000, appointments: 295 },
  { month: 'May', gmv: 490000, revenue: 49000, appointments: 340 },
  { month: 'Jun', gmv: 560000, revenue: 56000, appointments: 380 },
  { month: 'Jul', gmv: 610000, revenue: 61000, appointments: 415 },
  { month: 'Aug', gmv: 690000, revenue: 69000, appointments: 470 },
  { month: 'Sep', gmv: 780000, revenue: 78000, appointments: 530 },
];

// User Growth Data
const USER_GROWTH_DATA = [
  { month: 'Apr', patients: 140, professionals: 18, students: 25 },
  { month: 'May', patients: 180, professionals: 24, students: 30 },
  { month: 'Jun', patients: 220, professionals: 29, students: 42 },
  { month: 'Jul', patients: 290, professionals: 35, students: 50 },
  { month: 'Aug', patients: 350, professionals: 40, students: 65 },
  { month: 'Sep', patients: 420, professionals: 48, students: 80 },
];

// Specialization Distribution Data
const SPECIALIZATION_DATA = [
  { name: 'Anxiety & Panic', value: 38, color: '#10B981' }, // emerald-500
  { name: 'Depression & Mood', value: 27, color: '#3B82F6' }, // blue-500
  { name: 'Relationships & Family', value: 16, color: '#8B5CF6' }, // purple-500
  { name: 'ADHD & Neurodivergence', value: 11, color: '#F59E0B' }, // amber-500
  { name: 'Trauma & PTSD', value: 8, color: '#EC4899' }, // pink-500
];

// Top Cities
const CITY_METRICS = [
  { city: 'Bengaluru', sessions: 840, share: '28%', growth: '+19%' },
  { city: 'Mumbai', sessions: 760, share: '25%', growth: '+15%' },
  { city: 'Delhi NCR', sessions: 690, share: '23%', growth: '+22%' },
  { city: 'Pune', sessions: 410, share: '14%', growth: '+12%' },
  { city: 'Hyderabad', sessions: 310, share: '10%', growth: '+17%' },
];

export default function Analytics() {
  const [timeRange, setTimeRange] = useState<'30d' | '90d' | 'ytd' | 'all'>('90d');

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
            <TrendingUp className="h-7 w-7 text-emerald-600" />
            Platform Analytics & Insights
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Real-time telemetry on platform growth, consultation volumes, provider retention, and financial metrics.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="inline-flex rounded-lg border border-gray-300 bg-white p-1 text-xs font-medium text-gray-700 shadow-sm">
            {(['30d', '90d', 'ytd', 'all'] as const).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1.5 rounded-md transition-colors uppercase ${
                  timeRange === range
                    ? 'bg-emerald-600 text-white font-semibold'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {range === '30d' ? '30 Days' : range === '90d' ? '90 Days' : range === 'ytd' ? 'Year to Date' : 'All Time'}
              </button>
            ))}
          </div>

          <button
            onClick={() => alert('Exporting Analytics Report as PDF...')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 shadow-sm transition-colors"
          >
            <Download className="h-4 w-4 text-gray-500" />
            Export Report
          </button>
        </div>
      </div>

      {/* Top Level Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Gross Booking Volume (GMV)</span>
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
              <DollarSign className="h-5 w-5" />
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900">₹40,60,000</div>
          <div className="flex items-center gap-1 text-xs text-emerald-600 mt-2 font-medium">
            <ArrowUpRight className="h-4 w-4" />
            <span>+18.4%</span>
            <span className="text-gray-400 font-normal">vs previous period</span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Platform Take (10%)</span>
            <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
              <Activity className="h-5 w-5" />
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900">₹4,06,000</div>
          <div className="flex items-center gap-1 text-xs text-emerald-600 mt-2 font-medium">
            <ArrowUpRight className="h-4 w-4" />
            <span>+18.4%</span>
            <span className="text-gray-400 font-normal">net commission</span>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Completed Sessions</span>
            <div className="p-2 rounded-lg bg-purple-50 text-purple-600">
              <Calendar className="h-5 w-5" />
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900">3,105</div>
          <div className="flex items-center gap-1 text-xs text-emerald-600 mt-2 font-medium">
            <ArrowUpRight className="h-4 w-4" />
            <span>+14.8%</span>
            <span className="text-gray-400 font-normal">98.2% completion rate</span>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Active Verified Therapists</span>
            <div className="p-2 rounded-lg bg-amber-50 text-amber-600">
              <ShieldCheck className="h-5 w-5" />
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900">184</div>
          <div className="flex items-center gap-1 text-xs text-emerald-600 mt-2 font-medium">
            <ArrowUpRight className="h-4 w-4" />
            <span>+12 new</span>
            <span className="text-gray-400 font-normal">in verification queue</span>
          </div>
        </div>
      </div>

      {/* Primary Chart: Revenue and GMV Trend */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Gross Booking Value & Platform Revenue Trend</h2>
            <p className="text-xs text-gray-500">Monthly breakdown of gross patient bookings vs platform commission</p>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-full bg-emerald-500" />
              <span className="text-gray-600">Gross Value (₹)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-full bg-blue-500" />
              <span className="text-gray-600">Platform Revenue (₹)</span>
            </div>
          </div>
        </div>

        <div className="h-72 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={REVENUE_DATA} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorGmv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} dy={8} />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#6B7280', fontSize: 12 }} 
                tickFormatter={(val) => `₹${val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val}`} 
                dx={-8}
              />
              <Tooltip 
                formatter={(value: any) => [`₹${Number(value).toLocaleString()}`, '']}
                contentStyle={{ borderRadius: '8px', border: '1px solid #E5E7EB', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }} 
              />
              <Area type="monotone" dataKey="gmv" stroke="#10B981" strokeWidth={2.5} fillOpacity={1} fill="url(#colorGmv)" name="Gross Value" />
              <Area type="monotone" dataKey="revenue" stroke="#3B82F6" strokeWidth={2.5} fillOpacity={1} fill="url(#colorRev)" name="Platform Fee" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Secondary Charts: User Growth & Specializations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Acquisition Bar Chart */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-gray-900">New User Sign-ups by Role</h3>
              <p className="text-xs text-gray-500">Monthly new registered accounts</p>
            </div>
            <Users className="h-5 w-5 text-gray-400" />
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={USER_GROWTH_DATA} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} dy={6} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #E5E7EB' }} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Bar dataKey="patients" fill="#10B981" name="Patients" radius={[4, 4, 0, 0]} />
                <Bar dataKey="professionals" fill="#3B82F6" name="Therapists" radius={[4, 4, 0, 0]} />
                <Bar dataKey="students" fill="#8B5CF6" name="Students" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Specialization Breakdown */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-gray-900">Consultations by Clinical Domain</h3>
              <p className="text-xs text-gray-500">Percentage distribution across primary concerns</p>
            </div>
            <Award className="h-5 w-5 text-gray-400" />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-2">
            <div className="h-56 w-56 relative flex-shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={SPECIALIZATION_DATA}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={3}
                  >
                    {SPECIALIZATION_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: any) => [`${value}%`, 'Share']} />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-xs text-gray-400">Total</span>
                <span className="text-lg font-bold text-gray-900">100%</span>
              </div>
            </div>

            <div className="flex-1 space-y-2.5 w-full">
              {SPECIALIZATION_DATA.map((spec) => (
                <div key={spec.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full" style={{ backgroundColor: spec.color }} />
                    <span className="font-medium text-gray-700">{spec.name}</span>
                  </div>
                  <span className="font-bold text-gray-900">{spec.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Operational Highlights & City Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Operational Highlights Card */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
            <Clock className="h-5 w-5 text-emerald-600" />
            Clinical Quality & Operations
          </h3>

          <div className="space-y-4 text-xs">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-500">Average Session Fee:</span>
              <span className="font-semibold text-gray-900 text-sm">₹1,520 / 50 min</span>
            </div>

            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-500">Patient Repeat Rate (30d):</span>
              <span className="font-semibold text-emerald-600 text-sm">74.6%</span>
            </div>

            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-500">Average Booking Lead Time:</span>
              <span className="font-semibold text-gray-900 text-sm">26 hours</span>
            </div>

            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-500">Dispute / Refund Rate:</span>
              <span className="font-semibold text-gray-900 text-sm">0.28%</span>
            </div>

            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-500">Overall Patient CSAT:</span>
              <span className="font-semibold text-amber-600 text-sm">★ 4.88 / 5.0</span>
            </div>
          </div>
        </div>

        {/* Top Geographic Hubs */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4 lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-emerald-600" />
                Top Geographic Service Hubs
              </h3>
              <p className="text-xs text-gray-500">Highest volume consultation regions and in-person care</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-xs text-left">
              <thead className="bg-gray-50 text-gray-500 uppercase font-semibold">
                <tr>
                  <th className="px-4 py-3">Metropolitan Area</th>
                  <th className="px-4 py-3">Sessions Completed</th>
                  <th className="px-4 py-3">Platform Share</th>
                  <th className="px-4 py-3">MoM Growth</th>
                  <th className="px-4 py-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {CITY_METRICS.map((item) => (
                  <tr key={item.city} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 font-semibold text-gray-900">{item.city}</td>
                    <td className="px-4 py-3 text-gray-600">{item.sessions.toLocaleString()}</td>
                    <td className="px-4 py-3 text-gray-600">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-gray-200 rounded-full h-1.5 overflow-hidden">
                          <div className="bg-emerald-600 h-1.5 rounded-full" style={{ width: item.share }} />
                        </div>
                        <span>{item.share}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-emerald-600 font-semibold">{item.growth}</td>
                    <td className="px-4 py-3 text-right">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-medium">
                        Active Hub
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
