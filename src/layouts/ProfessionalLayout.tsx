import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Calendar, Users, MessageSquare, User, Star, DollarSign, BarChart2, Settings, LogOut, Bell, GraduationCap, Clock } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export default function ProfessionalLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/professional/dashboard', icon: LayoutDashboard },
    { name: 'Calendar', path: '/professional/calendar', icon: Calendar },
    { name: 'Appointments', path: '/professional/appointments', icon: Clock },
    { name: 'Clients', path: '/professional/clients', icon: Users },
    { name: 'Interns', path: '/professional/interns', icon: GraduationCap },
    { name: 'Messages', path: '/professional/messages', icon: MessageSquare },
    { name: 'Profile', path: '/professional/profile', icon: User },
    { name: 'Reviews', path: '/professional/reviews', icon: Star },
    { name: 'Earnings', path: '/professional/earnings', icon: DollarSign },
    { name: 'Analytics', path: '/professional/analytics', icon: BarChart2 },
    { name: 'Settings', path: '/professional/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 flex-col bg-surface border-r border-border sticky top-0 h-screen">
        <div className="p-6">
          <Link to="/" className="text-2xl font-bold text-primary">WELLPath</Link>
          <p className="text-xs text-text-muted mt-1 uppercase tracking-wider font-semibold">For Professionals</p>
        </div>
        
        <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname.startsWith(item.path);
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-text-muted hover:bg-gray-100 hover:text-text-main'
                }`}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3 mb-4 px-4">
            <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
              {user?.firstName?.charAt(0) || 'D'}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-medium text-text-main truncate">Dr. {user?.firstName} {user?.lastName}</p>
              <p className="text-xs text-text-muted capitalize truncate">{(user as any)?.type || 'Professional'}</p>
            </div>
          </div>
          
          <button 
            onClick={handleLogout}
            className="flex w-full items-center px-4 py-2 text-sm font-medium text-text-muted hover:text-error transition-colors"
          >
            <LogOut className="mr-3 h-5 w-5" />
            Log Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile Header */}
        <header className="md:hidden bg-surface border-b border-border p-4 flex items-center justify-between sticky top-0 z-10">
          <div>
            <Link to="/" className="text-xl font-bold text-primary">WELLPath</Link>
            <span className="text-[10px] ml-2 text-text-muted uppercase font-bold">Pro</span>
          </div>
          <div className="flex items-center gap-4">
            <Bell className="h-5 w-5 text-text-muted" />
            <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-medium text-sm">
              {user?.firstName?.charAt(0) || 'D'}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 pb-24 md:pb-8">
          <Outlet />
        </div>

        {/* Mobile Bottom Navigation */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-surface border-t border-border flex justify-around p-2 pb-safe z-10">
          {[navItems[0], navItems[1], navItems[2], navItems[4], navItems[5]].map((item) => {
            const isActive = location.pathname.startsWith(item.path);
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex flex-col items-center p-2 rounded-lg ${
                  isActive ? 'text-primary' : 'text-text-muted'
                }`}
              >
                <item.icon className="h-6 w-6 mb-1" />
                <span className="text-[10px] font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </main>
    </div>
  );
}
