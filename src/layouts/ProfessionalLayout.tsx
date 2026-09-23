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
  Menu
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
      {title && <p className="px-4 mb-2 text-xs font-bold text-gray-400 uppercase tracking-wider">{title}</p>}
      {items.map((item) => {
        const isActive = location.pathname.startsWith(item.path) || (item.path === '/professional/dashboard' && location.pathname === '/professional');
        return (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center px-4 py-2.5 mb-1 text-sm font-medium rounded-lg transition-colors ${
              isActive
                ? 'bg-primary/10 text-primary'
                : 'text-text-muted hover:bg-gray-100 hover:text-text-main'
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
    <div className="min-h-screen bg-background flex">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 flex-col bg-surface border-r border-border sticky top-0 h-screen">
        <div className="p-6 pb-2">
          <Link to="/professional/dashboard" className="text-2xl font-bold text-primary">WELLPath</Link>
          <p className="text-xs text-text-muted mt-1 uppercase tracking-wider font-semibold">For Professionals</p>
        </div>
        
        <nav className="flex-1 px-4 py-4 overflow-y-auto">
          {renderNavGroup(clinicalNav, 'Clinical')}
          {renderNavGroup(businessNav, 'Growth & Business')}
        </nav>

        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3 mb-4 px-4">
            <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
              {user?.firstName?.charAt(0) || 'D'}
            </div>
            <div className="overflow-hidden flex-1">
              <p className="text-sm font-medium text-text-main truncate">Dr. {user?.firstName} {user?.lastName}</p>
              <p className="text-xs text-text-muted capitalize truncate">{(user as any)?.type || 'Professional'}</p>
            </div>
            <NotificationBell placement="top" align="left" />
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
            <Link to="/professional/dashboard" className="text-xl font-bold text-primary">WELLPath</Link>
            <span className="text-[10px] ml-2 text-text-muted uppercase font-bold">Pro</span>
          </div>
          <div className="flex items-center gap-4">
            <NotificationBell />
            <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-medium text-sm">
              {user?.firstName?.charAt(0) || 'D'}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 pb-24 md:pb-8">
          <Outlet />
        </div>

        {/* Mobile Bottom Navigation Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-20 flex flex-col justify-end">
            <div className="fixed inset-0 bg-black/50" onClick={() => setIsMobileMenuOpen(false)}></div>
            <div className="relative bg-white rounded-t-2xl p-4 shadow-xl pb-24 h-[70vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4 pb-2 border-b">
                <h3 className="font-bold text-gray-900">More Options</h3>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-gray-500">
                  <Menu className="w-5 h-5 hidden" /> {/* Just for spacing or use X from lucide, but Menu is already imported */}
                  <span className="font-bold">X</span>
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Clinical</p>
                  <div className="grid grid-cols-2 gap-3">
                    {[clinicalNav[4], clinicalNav[5]].map((item) => (
                      <Link
                        key={item.name}
                        to={item.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex flex-col items-center p-3 rounded-xl border border-gray-100 bg-gray-50 text-gray-700"
                      >
                        <item.icon className="h-5 w-5 mb-1 text-primary" />
                        <span className="text-[10px] font-medium">{item.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Business</p>
                  <div className="grid grid-cols-2 gap-3">
                    {businessNav.map((item) => (
                      <Link
                        key={item.name}
                        to={item.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex flex-col items-center p-3 rounded-xl border border-gray-100 bg-gray-50 text-gray-700"
                      >
                        <item.icon className="h-5 w-5 mb-1 text-primary" />
                        <span className="text-[10px] font-medium">{item.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Bottom Navigation */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-surface border-t border-border flex justify-around p-2 pb-safe z-30 bg-white">
          {[clinicalNav[0], clinicalNav[1], clinicalNav[2], clinicalNav[3]].map((item) => {
            const isActive = location.pathname.startsWith(item.path) || (item.path === '/professional/dashboard' && location.pathname === '/professional');
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
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`flex flex-col items-center p-2 rounded-lg ${
              isMobileMenuOpen ? 'text-primary' : 'text-text-muted'
            }`}
          >
            <Menu className="h-6 w-6 mb-1" />
            <span className="text-[10px] font-medium">Menu</span>
          </button>
        </nav>
      </main>
    </div>
  );
}
