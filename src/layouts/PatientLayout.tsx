import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, Search, Calendar, MessageSquare, Bookmark, BookOpen, LogOut, User as UserIcon, Menu, ShieldAlert, X, GraduationCap } from 'lucide-react';
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
    { name: 'Dashboard',         path: '/patient/dashboard',         icon: Home },
    { name: 'Find Professionals', path: '/patient/find-professional', icon: Search },
    { name: 'Appointments',       path: '/patient/appointments',      icon: Calendar },
    { name: 'Messages',           path: '/patient/messages',          icon: MessageSquare },
    { name: 'My Courses',         path: '/patient/courses',           icon: GraduationCap },
    { name: 'Saved',              path: '/patient/saved',             icon: Bookmark },
    { name: 'Profile',            path: '/patient/profile',           icon: UserIcon },
    { name: 'Resources',          path: '/patient/resources',         icon: BookOpen },
  ];

  return (
    <div className="min-h-screen bg-background flex font-sans text-primary-dark">
      {/* Desktop Sidebar (Floating Premium Style) */}
      <aside className="hidden md:flex w-72 flex-col bg-surface m-4 rounded-xl shadow-sm h-[calc(100vh-2rem)] sticky top-4 overflow-hidden border border-gray-100">
        <div className="p-8 pb-4">
          <Link to="/patient/dashboard" className="text-3xl font-bold text-primary-dark tracking-tight">WellPath</Link>
        </div>
        
        <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname.startsWith(item.path) || (item.path === '/patient/find-professional' && location.pathname.includes('/find-professional'));
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center px-4 py-3.5 text-sm font-semibold rounded-lg transition-all duration-300 ${
                  isActive
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-muted-foreground hover:bg-primary-muted hover:text-primary-dark'
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
            className="w-full flex items-center justify-center gap-2 px-4 py-3.5 bg-red-50 text-red-700 hover:bg-red-100 hover:shadow-md font-bold rounded-lg text-sm transition-all duration-300 border border-red-100"
          >
            <ShieldAlert className="w-5 h-5" />
            Crisis Support
          </button>
        </div>

        <div className="p-4 border-t border-gray-100 bg-background/50">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="h-12 w-12 rounded-lg bg-primary-muted flex items-center justify-center text-primary-dark font-bold text-lg shadow-sm">
              {user?.firstName?.charAt(0) || 'U'}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-bold text-primary-dark truncate">{user?.firstName} {user?.lastName}</p>
              <p className="text-xs text-primary font-medium capitalize truncate">{user?.role}</p>
            </div>
            <NotificationBell placement="top" align="left" />
          </div>

          <button
            onClick={handleLogout}
            className="flex w-full items-center px-4 py-3 text-sm font-semibold text-muted-foreground hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-300"
          >
            <LogOut className="mr-4 h-5 w-5" />
            Log Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile Header */}
        <header className="md:hidden bg-surface border-b border-gray-100 p-4 flex items-center justify-between sticky top-0 z-10 shadow-sm">
          <Link to="/patient/dashboard" className="text-2xl font-bold text-primary-dark">WellPath</Link>
          <div className="flex items-center gap-4">
            <NotificationBell />
            <div className="h-9 w-9 rounded-xl bg-primary-muted flex items-center justify-center text-primary-dark font-bold text-sm shadow-sm">
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
            <div className="fixed inset-0 bg-primary-dark/40 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}></div>
            <div className="relative bg-surface rounded-t-3xl p-6 shadow-md pb-24 border-t border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-primary-dark text-lg">More Options</h3>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 bg-background rounded-full text-muted-foreground hover:text-primary-dark transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {navItems.slice(4).map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex flex-col items-center p-4 rounded-lg border border-gray-100 bg-background text-primary-dark active:bg-primary-muted transition-colors"
                  >
                    <item.icon className="h-6 w-6 mb-2 text-primary" />
                    <span className="text-sm font-semibold">{item.name}</span>
                  </Link>
                ))}
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsCrisisModalOpen(true);
                  }}
                  className="flex flex-col items-center p-4 rounded-lg border border-red-100 bg-red-50 text-red-700 active:bg-red-100 transition-colors"
                >
                  <ShieldAlert className="h-6 w-6 mb-2" />
                  <span className="text-sm font-semibold text-center">Crisis Support</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="flex flex-col items-center p-4 rounded-lg border border-gray-100 bg-background text-muted-foreground active:bg-surface-hover transition-colors col-span-2"
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
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-surface border-t border-gray-100 flex justify-around p-2 pb-safe z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] rounded-t-3xl">
          {[navItems[0], navItems[1], navItems[2], navItems[3]].map((item) => {
            const isActive = location.pathname.startsWith(item.path) || (item.path === '/patient/find-professional' && location.pathname.includes('/find-professional'));
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex flex-col items-center p-3 rounded-lg transition-all duration-300 ${
                  isActive ? 'text-primary-dark bg-primary-muted' : 'text-gray-400 hover:text-primary'
                }`}
              >
                <item.icon className="h-6 w-6 mb-1" />
                <span className="text-[10px] font-bold">{item.name}</span>
              </Link>
            );
          })}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`flex flex-col items-center p-3 rounded-lg transition-all duration-300 ${
              isMobileMenuOpen ? 'text-primary-dark bg-primary-muted' : 'text-gray-400 hover:text-primary'
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
