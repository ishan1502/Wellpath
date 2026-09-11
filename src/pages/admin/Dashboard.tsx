import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Users, UserCheck, Calendar, DollarSign, Activity } from 'lucide-react';
import { getAppointmentsByPatient } from '@/services/appointmentService'; // Hack for mock data load
import { mockUsers, mockProfessionals, mockAppointments } from '@/data/mockData';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    users: 0,
    professionals: 0,
    appointments: 0,
    revenue: 0,
  });

  useEffect(() => {
    // In a real app, this would hit an adminService
    // For mock, we'll just read from local storage if available, else mockData
    const lsUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const totalUsers = lsUsers.length > 0 ? lsUsers.length : mockUsers.length;
    
    const lsProfs = JSON.parse(localStorage.getItem('professionals') || '[]');
    const totalProfs = lsProfs.length > 0 ? lsProfs.length : mockProfessionals.length;

    const lsAppts = JSON.parse(localStorage.getItem('appointments') || '[]');
    const appts = lsAppts.length > 0 ? lsAppts : mockAppointments;
    
    const revenue = appts.filter((a: any) => a.status === 'completed').reduce((sum: number, a: any) => sum + (a.fee || 1500), 0);

    setStats({
      users: totalUsers,
      professionals: totalProfs,
      appointments: appts.length,
      revenue: revenue
    });
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">System Overview</h1>
        <p className="text-gray-500">Platform metrics and pending actions.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-gray-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Users</CardTitle>
            <Users className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{stats.users}</div>
            <p className="text-xs text-green-600 mt-1 flex items-center">
              <Activity className="h-3 w-3 mr-1" /> +12% from last month
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-gray-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Active Professionals</CardTitle>
            <UserCheck className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{stats.professionals}</div>
            <p className="text-xs text-green-600 mt-1 flex items-center">
              <Activity className="h-3 w-3 mr-1" /> +3 this week
            </p>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Appointments</CardTitle>
            <Calendar className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{stats.appointments}</div>
            <p className="text-xs text-gray-500 mt-1">
              across the platform
            </p>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Platform Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">₹{(stats.revenue * 0.1).toLocaleString()}</div>
            <p className="text-xs text-gray-500 mt-1">10% platform fee estimated</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-gray-800">Pending Verifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-6 text-gray-500 text-sm">
              No pending professional verifications.
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-gray-800">Recent Support Tickets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-6 text-gray-500 text-sm">
              All caught up! No open support tickets.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
