import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Users, UserCheck, Calendar, IndianRupee } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    users: 0,
    professionals: 0,
    appointments: 0,
    revenue: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch total users (count)
        const { count: usersCount } = await supabase.from('users').select('*', { count: 'exact', head: true });
        
        // Fetch total professionals (count)
        const { count: profsCount } = await supabase.from('professionals').select('*', { count: 'exact', head: true });
        
        // Fetch appointments to calculate revenue
        const { data: appointments } = await supabase.from('appointments').select('fee, status');
        
        let apptsCount = 0;
        let revenue = 0;
        
        if (appointments) {
          apptsCount = appointments.length;
          revenue = appointments
            .filter(a => a.status === 'completed')
            .reduce((sum, a) => sum + (a.fee || 1500), 0);
        }

        setStats({
          users: usersCount || 0,
          professionals: profsCount || 0,
          appointments: apptsCount,
          revenue: revenue
        });
      } catch (error) {
        console.error('Failed to fetch admin stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-foreground tracking-tight">System Overview</h1>
        <p className="text-primary-hover/80 mt-1 font-medium">Platform metrics and pending actions.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-primary-muted bg-surface rounded-xl shadow-sm hover:shadow-md transition-all duration-300 group">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-semibold text-primary">Total Users</CardTitle>
            <div className="p-3 bg-primary-muted rounded-lg group-hover:bg-primary-muted transition-colors">
              <Users className="h-5 w-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-extrabold text-foreground">{loading ? '-' : stats.users}</div>
            <p className="text-sm font-medium text-primary mt-2 flex items-center">
              Total registered users
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-primary-muted bg-surface rounded-xl shadow-sm hover:shadow-md transition-all duration-300 group">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-semibold text-primary">Active Professionals</CardTitle>
            <div className="p-3 bg-primary-muted rounded-lg group-hover:bg-primary-muted transition-colors">
              <UserCheck className="h-5 w-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-extrabold text-foreground">{loading ? '-' : stats.professionals}</div>
            <p className="text-sm font-medium text-primary mt-2 flex items-center">
              Registered providers
            </p>
          </CardContent>
        </Card>

        <Card className="border-primary-muted bg-surface rounded-xl shadow-sm hover:shadow-md transition-all duration-300 group">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-semibold text-primary">Total Appointments</CardTitle>
            <div className="p-3 bg-primary-muted rounded-lg group-hover:bg-primary-muted transition-colors">
              <Calendar className="h-5 w-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-extrabold text-foreground">{loading ? '-' : stats.appointments}</div>
            <p className="text-sm font-medium text-primary mt-2">
              Across the platform
            </p>
          </CardContent>
        </Card>

        <Card className="border-primary-muted bg-surface rounded-xl shadow-sm hover:shadow-md transition-all duration-300 group">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-semibold text-primary">Platform Revenue</CardTitle>
            <div className="p-3 bg-primary-muted rounded-lg group-hover:bg-primary-muted transition-colors">
              <IndianRupee className="h-5 w-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-extrabold text-foreground">
              {loading ? '-' : `₹${(stats.revenue * 0.1).toLocaleString()}`}
            </div>
            <p className="text-sm font-medium text-primary mt-2">10% platform fee estimated</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="border-primary-muted bg-surface rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-bold text-foreground">Pending Verifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-10 bg-primary-muted/50 rounded-lg border border-dashed border-primary-muted">
              <p className="text-primary-hover font-medium">No pending professional verifications.</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-primary-muted bg-surface rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-bold text-foreground">Recent Support Tickets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-10 bg-primary-muted/50 rounded-lg border border-dashed border-primary-muted">
              <p className="text-primary-hover font-medium">All caught up! No open support tickets.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
