import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, Search, Calendar, MessageSquare, Bookmark, BookOpen, LogOut, User as UserIcon, Menu, ShieldAlert, X } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { NotificationBell } from '@/components/shared/NotificationBell';

export default function PatientLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/patient/dashboard', icon: Home },
    { name: 'Find Professionals', path: '/patient/find-professional', icon: Search },
    { name: 'Appointments', path: '/patient/appointments', icon: Calendar },
    { name: 'Messages', path: '/patient/messages', icon: MessageSquare },
    { name: 'Saved', path: '/patient/saved', icon: Bookmark },
    { name: 'Profile', path: '/patient/profile', icon: UserIcon },
    { name: 'Resources', path: '/patient/resources', icon: BookOpen },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 flex-col bg-surface border-r border-border sticky top-0 h-screen">
        <div className="p-6">
          <Link to="/" className="text-2xl font-bold text-primary">WELLPath</Link>
        </div>
        
        <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname.startsWith(item.path) || (item.path === '/patient/find-professional' && location.pathname.includes('/find-professional'));
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
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
        </nav>

        <div className="px-4 py-4 mt-auto">
          <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-red-50 text-red-700 hover:bg-red-100 font-semibold rounded-lg text-sm transition-colors border border-red-100">
            <ShieldAlert className="w-5 h-5" />
            Crisis Support
          </button>
        </div>

        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3 mb-4 px-4">
            <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
              {user?.firstName?.charAt(0) || 'U'}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-medium text-text-main">{user?.firstName} {user?.lastName}</p>
              <p className="text-xs text-text-muted capitalize">{user?.role}</p>
            </div>
            <NotificationBell placement="top" />
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
          <Link to="/" className="text-xl font-bold text-primary">WELLPath</Link>
          <div className="flex items-center gap-4">
            <NotificationBell />
            <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-medium text-sm">
              {user?.firstName?.charAt(0) || 'U'}
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
            <div className="relative bg-white rounded-t-2xl p-4 shadow-xl pb-24">
              <div className="flex justify-between items-center mb-4 pb-2 border-b">
                <h3 className="font-bold text-gray-900">More Options</h3>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-gray-500">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[navItems[4], navItems[5], navItems[6]].map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex flex-col items-center p-4 rounded-xl border border-gray-100 bg-gray-50 text-gray-700 active:bg-gray-100"
                  >
                    <item.icon className="h-6 w-6 mb-2 text-primary" />
                    <span className="text-xs font-medium">{item.name}</span>
                  </Link>
                ))}
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex flex-col items-center p-4 rounded-xl border border-red-100 bg-red-50 text-red-700 active:bg-red-100"
                >
                  <ShieldAlert className="h-6 w-6 mb-2" />
                  <span className="text-xs font-medium text-center">Crisis Support</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Bottom Navigation */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-surface border-t border-border flex justify-around p-2 pb-safe z-30 bg-white">
          {[navItems[0], navItems[1], navItems[2], navItems[3]].map((item) => {
            const isActive = location.pathname.startsWith(item.path) || (item.path === '/patient/find-professional' && location.pathname.includes('/find-professional'));
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
