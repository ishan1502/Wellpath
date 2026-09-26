import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, Search, Calendar, MessageSquare, Bookmark, BookOpen, LogOut, User as UserIcon, Menu, ShieldAlert, X } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { NotificationBell } from '@/components/shared/NotificationBell';
import { CrisisSupportModal } from '@/components/shared/CrisisSupportModal';

export default function PatientLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCrisisModalOpen, setIsCrisisModalOpen] = useState(false);

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
    <div className="min-h-screen bg-gray-50 flex font-sans text-emerald-900">
      {/* Desktop Sidebar (Floating Premium Style) */}
      <aside className="hidden md:flex w-72 flex-col bg-white m-4 rounded-3xl shadow-sm h-[calc(100vh-2rem)] sticky top-4 overflow-hidden border border-gray-100">
        <div className="p-8 pb-4">
          <Link to="/patient/dashboard" className="text-3xl font-bold text-emerald-900 tracking-tight">WELLPath</Link>
        </div>
        
        <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname.startsWith(item.path) || (item.path === '/patient/find-professional' && location.pathname.includes('/find-professional'));
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center px-4 py-3.5 text-sm font-semibold rounded-2xl transition-all duration-300 ${
                  isActive
                    ? 'bg-emerald-900 text-white shadow-sm'
                    : 'text-gray-500 hover:bg-emerald-50 hover:text-emerald-900'
                }`}
              >
                <item.icon className="mr-4 h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="px-4 py-4 mt-auto">
          <button 
            onClick={() => setIsCrisisModalOpen(true)}
            className="w-full flex items-center justify-center gap-2 px-4 py-3.5 bg-red-50 text-red-700 hover:bg-red-100 hover:shadow-xl font-bold rounded-2xl text-sm transition-all duration-300 border border-red-100"
          >
            <ShieldAlert className="w-5 h-5" />
            Crisis Support
          </button>
        </div>

        <div className="p-4 border-t border-gray-100 bg-gray-50/50">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="h-12 w-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-900 font-bold text-lg shadow-sm">
              {user?.firstName?.charAt(0) || 'U'}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-bold text-emerald-900 truncate">{user?.firstName} {user?.lastName}</p>
              <p className="text-xs text-emerald-600 font-medium capitalize truncate">{user?.role}</p>
            </div>
            <NotificationBell placement="top" align="left" />
          </div>

          <button
            onClick={handleLogout}
            className="flex w-full items-center px-4 py-3 text-sm font-semibold text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-2xl transition-all duration-300"
          >
            <LogOut className="mr-4 h-5 w-5" />
            Log Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile Header */}
        <header className="md:hidden bg-white border-b border-gray-100 p-4 flex items-center justify-between sticky top-0 z-10 shadow-sm">
          <Link to="/patient/dashboard" className="text-2xl font-bold text-emerald-900">WELLPath</Link>
          <div className="flex items-center gap-4">
            <NotificationBell />
            <div className="h-9 w-9 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-900 font-bold text-sm shadow-sm">
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
          <div className="md:hidden fixed inset-0 z-40 flex flex-col justify-end">
            <div className="fixed inset-0 bg-emerald-900/40 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}></div>
            <div className="relative bg-white rounded-t-3xl p-6 shadow-xl pb-24 border-t border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-emerald-900 text-lg">More Options</h3>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 bg-gray-50 rounded-full text-gray-500 hover:text-emerald-900 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[navItems[4], navItems[5], navItems[6]].map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex flex-col items-center p-4 rounded-2xl border border-gray-100 bg-gray-50 text-emerald-900 active:bg-emerald-50 transition-colors"
                  >
                    <item.icon className="h-6 w-6 mb-2 text-emerald-600" />
                    <span className="text-sm font-semibold">{item.name}</span>
                  </Link>
                ))}
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsCrisisModalOpen(true);
                  }}
                  className="flex flex-col items-center p-4 rounded-2xl border border-red-100 bg-red-50 text-red-700 active:bg-red-100 transition-colors"
                >
                  <ShieldAlert className="h-6 w-6 mb-2" />
                  <span className="text-sm font-semibold text-center">Crisis Support</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="flex flex-col items-center p-4 rounded-2xl border border-gray-100 bg-gray-50 text-gray-500 active:bg-gray-100 transition-colors col-span-2"
                >
                  <LogOut className="h-6 w-6 mb-2" />
                  <span className="text-sm font-semibold text-center">Log Out</span>
                </button>
              </div>
            </div>
          </div>
        )}

        <CrisisSupportModal 
          isOpen={isCrisisModalOpen} 
          onClose={() => setIsCrisisModalOpen(false)} 
        />

        {/* Mobile Bottom Navigation */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex justify-around p-2 pb-safe z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] rounded-t-3xl">
          {[navItems[0], navItems[1], navItems[2], navItems[3]].map((item) => {
            const isActive = location.pathname.startsWith(item.path) || (item.path === '/patient/find-professional' && location.pathname.includes('/find-professional'));
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex flex-col items-center p-3 rounded-2xl transition-all duration-300 ${
                  isActive ? 'text-emerald-900 bg-emerald-50' : 'text-gray-400 hover:text-emerald-600'
                }`}
              >
                <item.icon className="h-6 w-6 mb-1" />
                <span className="text-[10px] font-bold">{item.name}</span>
              </Link>
            );
          })}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`flex flex-col items-center p-3 rounded-2xl transition-all duration-300 ${
              isMobileMenuOpen ? 'text-emerald-900 bg-emerald-50' : 'text-gray-400 hover:text-emerald-600'
            }`}
          >
            <Menu className="h-6 w-6 mb-1" />
            <span className="text-[10px] font-bold">Menu</span>
          </button>
        </nav>
      </main>
    </div>
  );
}
