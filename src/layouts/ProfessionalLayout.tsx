import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  MessageSquare, 
  Settings, 
  LogOut, 
  PieChart,
  DollarSign,
  GraduationCap,
  Star,
  Briefcase,
  CalendarPlus,
  Clock,
  Menu,
  X
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { NotificationBell } from '@/components/shared/NotificationBell';

export default function ProfessionalLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const clinicalNav = [
    { name: 'Dashboard', path: '/professional/dashboard', icon: LayoutDashboard },
    { name: 'Calendar', path: '/professional/calendar', icon: Calendar },
    { name: 'Appointments', path: '/professional/appointments', icon: Clock },
    { name: 'Clients', path: '/professional/clients', icon: Users },
    { name: 'Messages', path: '/professional/messages', icon: MessageSquare },
    { name: 'Interns', path: '/professional/interns', icon: GraduationCap },
  ];

  const businessNav = [
    { name: 'Analytics', path: '/professional/analytics', icon: PieChart },
    { name: 'Earnings', path: '/professional/earnings', icon: DollarSign },
    { name: 'Reviews', path: '/professional/reviews', icon: Star },
    { name: 'Post Job', path: '/professional/post-job', icon: Briefcase },
    { name: 'Post Event', path: '/professional/post-event', icon: CalendarPlus },
    { name: 'Settings', path: '/professional/settings', icon: Settings },
  ];

  const renderNavGroup = (items: typeof clinicalNav, title?: string) => (
    <div className="mb-6">
      {title && <p className="px-4 mb-2 text-xs font-bold text-emerald-400/70 uppercase tracking-wider">{title}</p>}
      {items.map((item) => {
        const isActive = location.pathname.startsWith(item.path) || (item.path === '/professional/dashboard' && location.pathname === '/professional');
        return (
          <Link
            key={item.name}
            to={item.path}
            onClick={() => setIsMobileMenuOpen(false)}
            className={`flex items-center px-4 py-3 mb-1 text-sm font-medium rounded-2xl transition-all duration-300 ${
              isActive
                ? 'bg-emerald-800 text-white shadow-sm'
                : 'text-emerald-100 hover:bg-emerald-800/50 hover:text-white'
            }`}
          >
            <item.icon className="mr-3 h-5 w-5" />
            {item.name}
          </Link>
        );
      })}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Desktop & Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-emerald-900/50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed md:sticky top-0 z-50 h-screen w-72 bg-emerald-900 flex flex-col transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="p-6 pb-4 flex justify-between items-center">
          <div>
            <Link to="/professional/dashboard" className="text-2xl font-bold text-white">WELLPath</Link>
            <p className="text-xs text-emerald-300 mt-1 uppercase tracking-wider font-semibold">For Professionals</p>
          </div>
          <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(false)}>
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <nav className="flex-1 px-4 py-4 overflow-y-auto no-scrollbar">
          {renderNavGroup(clinicalNav, 'Clinical')}
          {renderNavGroup(businessNav, 'Growth & Business')}
        </nav>

        <div className="p-4 border-t border-emerald-800">
          <div className="flex items-center gap-3 mb-4 px-4">
            <div className="h-10 w-10 rounded-full bg-emerald-700 flex items-center justify-center text-white font-bold shadow-sm">
              {user?.firstName?.charAt(0) || 'D'}
            </div>
            <div className="overflow-hidden flex-1">
              <p className="text-sm font-medium text-white truncate">Dr. {user?.firstName} {user?.lastName}</p>
              <p className="text-xs text-emerald-300 capitalize truncate">{(user as any)?.type || 'Professional'}</p>
            </div>
          </div>
          
          <button 
            onClick={handleLogout}
            className="flex w-full items-center px-4 py-3 text-sm font-medium text-emerald-200 hover:text-white hover:bg-emerald-800 rounded-2xl transition-all duration-300"
          >
            <LogOut className="mr-3 h-5 w-5" />
            Log Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden h-screen">
        {/* Mobile Header */}
        <header className="md:hidden bg-white shadow-sm p-4 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button onClick={() => setIsMobileMenuOpen(true)} className="text-emerald-900">
              <Menu className="h-6 w-6" />
            </button>
            <div>
              <Link to="/professional/dashboard" className="text-xl font-bold text-emerald-900">WELLPath</Link>
              <span className="text-[10px] ml-2 text-emerald-600 uppercase font-bold">Pro</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <NotificationBell />
            <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-900 font-medium text-sm">
              {user?.firstName?.charAt(0) || 'D'}
            </div>
          </div>
        </header>

        {/* Desktop Header */}
        <header className="hidden md:flex bg-gray-50 p-6 pb-0 items-center justify-end sticky top-0 z-10">
          <div className="flex items-center gap-6">
            <NotificationBell />
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 pb-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
