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
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-foreground tracking-tight flex items-center gap-3">
            <TrendingUp className="h-8 w-8 text-primary" />
            Platform Analytics & Insights
          </h1>
          <p className="text-primary-hover font-medium text-sm mt-1">
            Real-time telemetry on platform growth, consultation volumes, provider retention, and financial metrics.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="inline-flex rounded-xl border border-primary-muted bg-surface p-1 text-sm font-bold text-primary-hover shadow-sm">
            {(['30d', '90d', 'ytd', 'all'] as const).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 rounded-lg transition-all uppercase tracking-wider text-xs ${
                  timeRange === range
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-primary hover:text-primary-dark hover:bg-primary-muted'
                }`}
              >
                {range === '30d' ? '30 Days' : range === '90d' ? '90 Days' : range === 'ytd' ? 'YTD' : 'All Time'}
              </button>
            ))}
          </div>

          <button
            onClick={() => alert('Exporting Analytics Report as PDF...')}
            className="inline-flex items-center gap-2 px-5 py-2.5 border-2 border-primary-muted rounded-xl text-sm font-bold text-primary-hover bg-surface hover:bg-primary-muted shadow-sm transition-all hover:shadow"
          >
            <Download className="h-4 w-4 text-primary" />
            Export Report
          </button>
        </div>
      </div>

      {/* Top Level Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Metric 1 */}
        <div className="bg-surface p-6 rounded-xl border border-primary-muted shadow-sm hover:shadow-md transition-all duration-300 group">
          <div className="flex items-center justify-between text-primary mb-4">
            <span className="text-xs font-bold uppercase tracking-widest">Gross Booking Volume (GMV)</span>
            <div className="p-2.5 rounded-xl bg-primary-muted text-primary group-hover:scale-110 transition-transform">
              <DollarSign className="h-5 w-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-foreground">₹40,60,000</div>
          <div className="flex items-center gap-1.5 text-sm text-primary mt-2 font-bold">
            <ArrowUpRight className="h-4 w-4" />
            <span>+18.4%</span>
            <span className="text-primary-muted-foreground font-medium">vs previous</span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-surface p-6 rounded-xl border border-primary-muted shadow-sm hover:shadow-md transition-all duration-300 group">
          <div className="flex items-center justify-between text-primary mb-4">
            <span className="text-xs font-bold uppercase tracking-widest">Platform Take (10%)</span>
            <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 group-hover:scale-110 transition-transform">
              <Activity className="h-5 w-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-foreground">₹4,06,000</div>
          <div className="flex items-center gap-1.5 text-sm text-primary mt-2 font-bold">
            <ArrowUpRight className="h-4 w-4" />
            <span>+18.4%</span>
            <span className="text-primary-muted-foreground font-medium">net commission</span>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-surface p-6 rounded-xl border border-primary-muted shadow-sm hover:shadow-md transition-all duration-300 group">
          <div className="flex items-center justify-between text-primary mb-4">
            <span className="text-xs font-bold uppercase tracking-widest">Completed Sessions</span>
            <div className="p-2.5 rounded-xl bg-purple-50 text-purple-600 group-hover:scale-110 transition-transform">
              <Calendar className="h-5 w-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-foreground">3,105</div>
          <div className="flex items-center gap-1.5 text-sm text-primary mt-2 font-bold">
            <ArrowUpRight className="h-4 w-4" />
            <span>+14.8%</span>
            <span className="text-primary-muted-foreground font-medium">98.2% completion</span>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-surface p-6 rounded-xl border border-primary-muted shadow-sm hover:shadow-md transition-all duration-300 group">
          <div className="flex items-center justify-between text-primary mb-4">
            <span className="text-xs font-bold uppercase tracking-widest">Active Verified Therapists</span>
            <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600 group-hover:scale-110 transition-transform">
              <ShieldCheck className="h-5 w-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-foreground">184</div>
          <div className="flex items-center gap-1.5 text-sm text-primary mt-2 font-bold">
            <ArrowUpRight className="h-4 w-4" />
            <span>+12 new</span>
            <span className="text-primary-muted-foreground font-medium">in queue</span>
          </div>
        </div>
      </div>

      {/* Primary Chart: Revenue and GMV Trend */}
      <div className="bg-surface p-8 rounded-xl border border-primary-muted shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-extrabold text-foreground">Gross Booking Value & Platform Revenue Trend</h2>
            <p className="text-sm font-medium text-primary mt-1">Monthly breakdown of gross patient bookings vs platform commission</p>
          </div>
          <div className="flex items-center gap-6 text-sm font-bold">
            <div className="flex items-center gap-2">
              <span className="h-4 w-4 rounded-full bg-primary shadow-sm" />
              <span className="text-primary-dark">Gross Value (₹)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-4 w-4 rounded-full bg-blue-500 shadow-sm" />
              <span className="text-primary-dark">Platform Revenue (₹)</span>
            </div>
          </div>
        </div>

        <div className="h-80 w-full pt-4">
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
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#059669', fontSize: 13, fontWeight: 600 }} dy={10} />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#059669', fontSize: 13, fontWeight: 600 }} 
                tickFormatter={(val) => `₹${val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val}`} 
                dx={-10}
              />
              <Tooltip 
                formatter={(value: any) => [`₹${Number(value).toLocaleString()}`, '']}
                contentStyle={{ borderRadius: '16px', border: '1px solid #D1FAE5', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', padding: '12px' }} 
              />
              <Area type="monotone" dataKey="gmv" stroke="#10B981" strokeWidth={3} fillOpacity={1} fill="url(#colorGmv)" name="Gross Value" />
              <Area type="monotone" dataKey="revenue" stroke="#3B82F6" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" name="Platform Fee" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Secondary Charts: User Growth & Specializations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* User Acquisition Bar Chart */}
        <div className="bg-surface p-8 rounded-xl border border-primary-muted shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-extrabold text-foreground">New User Sign-ups by Role</h3>
              <p className="text-sm font-medium text-primary mt-1">Monthly new registered accounts</p>
            </div>
            <div className="bg-primary-muted p-3 rounded-lg">
              <Users className="h-6 w-6 text-primary" />
            </div>
          </div>

          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={USER_GROWTH_DATA} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#059669', fontSize: 13, fontWeight: 600 }} dy={8} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#059669', fontSize: 13, fontWeight: 600 }} />
                <Tooltip contentStyle={{ borderRadius: '16px', border: '1px solid #D1FAE5', padding: '12px' }} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '14px', fontWeight: 600, paddingTop: '20px' }} />
                <Bar dataKey="patients" fill="#10B981" name="Patients" radius={[6, 6, 0, 0]} />
                <Bar dataKey="professionals" fill="#3B82F6" name="Therapists" radius={[6, 6, 0, 0]} />
                <Bar dataKey="students" fill="#8B5CF6" name="Students" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Specialization Breakdown */}
        <div className="bg-surface p-8 rounded-xl border border-primary-muted shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-extrabold text-foreground">Consultations by Clinical Domain</h3>
              <p className="text-sm font-medium text-primary mt-1">Percentage distribution across primary concerns</p>
            </div>
            <div className="bg-primary-muted p-3 rounded-lg">
              <Award className="h-6 w-6 text-primary" />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-8 pt-4">
            <div className="h-64 w-64 relative flex-shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={SPECIALIZATION_DATA}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={65}
                    outerRadius={95}
                    paddingAngle={4}
                    stroke="none"
                  >
                    {SPECIALIZATION_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: any) => [`${value}%`, 'Share']} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-sm font-bold text-primary uppercase tracking-widest">Total</span>
                <span className="text-3xl font-extrabold text-foreground">100%</span>
              </div>
            </div>

            <div className="flex-1 space-y-4 w-full bg-primary-muted/50 p-6 rounded-lg border border-primary-muted">
              {SPECIALIZATION_DATA.map((spec) => (
                <div key={spec.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-3">
                    <span className="h-4 w-4 rounded-full shadow-sm" style={{ backgroundColor: spec.color }} />
                    <span className="font-bold text-primary-dark">{spec.name}</span>
                  </div>
                  <span className="font-extrabold text-foreground">{spec.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Operational Highlights & City Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Operational Highlights Card */}
        <div className="bg-surface p-8 rounded-xl border border-primary-muted shadow-sm space-y-6">
          <h3 className="text-xl font-extrabold text-foreground flex items-center gap-3">
            <div className="bg-primary-muted p-2 rounded-xl text-primary-hover">
              <Clock className="h-6 w-6" />
            </div>
            Clinical Quality & Operations
          </h3>

          <div className="space-y-5 text-sm">
            <div className="flex justify-between items-center py-3 border-b border-primary-muted">
              <span className="text-primary-hover font-bold">Average Session Fee:</span>
              <span className="font-extrabold text-foreground">₹1,520 / 50 min</span>
            </div>

            <div className="flex justify-between items-center py-3 border-b border-primary-muted">
              <span className="text-primary-hover font-bold">Patient Repeat Rate (30d):</span>
              <span className="font-extrabold text-primary bg-primary-muted px-2 py-1 rounded-lg">74.6%</span>
            </div>

            <div className="flex justify-between items-center py-3 border-b border-primary-muted">
              <span className="text-primary-hover font-bold">Average Booking Lead Time:</span>
              <span className="font-extrabold text-foreground">26 hours</span>
            </div>

            <div className="flex justify-between items-center py-3 border-b border-primary-muted">
              <span className="text-primary-hover font-bold">Dispute / Refund Rate:</span>
              <span className="font-extrabold text-foreground">0.28%</span>
            </div>

            <div className="flex justify-between items-center py-3 border-b border-primary-muted">
              <span className="text-primary-hover font-bold">Overall Patient CSAT:</span>
              <span className="font-extrabold text-amber-500 bg-amber-50 px-2 py-1 rounded-lg flex items-center gap-1">★ 4.88 / 5.0</span>
            </div>
          </div>
        </div>

        {/* Top Geographic Hubs */}
        <div className="bg-surface p-8 rounded-xl border border-primary-muted shadow-sm space-y-6 lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-extrabold text-foreground flex items-center gap-3">
                <div className="bg-primary-muted p-2 rounded-xl text-primary-hover">
                  <MapPin className="h-6 w-6" />
                </div>
                Top Geographic Service Hubs
              </h3>
              <p className="text-sm font-medium text-primary mt-2">Highest volume consultation regions and in-person care</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-emerald-100 text-sm text-left">
              <thead className="bg-primary-muted/80 text-primary-hover uppercase font-bold tracking-wider text-xs">
                <tr>
                  <th className="px-6 py-4">Metropolitan Area</th>
                  <th className="px-6 py-4">Sessions Completed</th>
                  <th className="px-6 py-4">Platform Share</th>
                  <th className="px-6 py-4">MoM Growth</th>
                  <th className="px-6 py-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-emerald-50 bg-surface">
                {CITY_METRICS.map((item) => (
                  <tr key={item.city} className="hover:bg-primary-muted/50 transition-colors">
                    <td className="px-6 py-4 font-extrabold text-foreground">{item.city}</td>
                    <td className="px-6 py-4 text-primary-hover font-bold">{item.sessions.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-20 bg-primary-muted rounded-full h-2.5 overflow-hidden shadow-inner">
                          <div className="bg-primary h-2.5 rounded-full" style={{ width: item.share }} />
                        </div>
                        <span className="font-bold text-primary-dark">{item.share}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-primary font-extrabold">{item.growth}</td>
                    <td className="px-6 py-4 text-right">
                      <span className="px-3 py-1 rounded-xl bg-primary-muted text-primary-dark text-xs font-bold shadow-sm">
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
