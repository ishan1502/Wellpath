import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { GraduationCap, Search, Briefcase, MessageSquare, LogOut, UserCircle } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { NotificationBell } from '@/components/shared/NotificationBell';

export default function StudentLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/student/dashboard', icon: GraduationCap },
    { name: 'Find Internships', path: '/student/find-internship', icon: Search },
    { name: 'My Applications', path: '/student/applications', icon: Briefcase },
    { name: 'Messages', path: '/student/messages', icon: MessageSquare },
    { name: 'My Profile', path: '/student/profile', icon: UserCircle },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans text-emerald-900">
      {/* Desktop Sidebar (Floating Premium Style) */}
      <aside className="hidden md:flex w-72 flex-col bg-white m-4 rounded-3xl shadow-sm h-[calc(100vh-2rem)] sticky top-4 overflow-hidden border border-gray-100">
        <div className="p-8 pb-4">
          <Link to="/student/dashboard" className="text-3xl font-bold text-emerald-900 tracking-tight">WELLPath</Link>
          <p className="text-xs text-emerald-600 mt-2 uppercase tracking-widest font-bold bg-emerald-50 inline-block px-3 py-1 rounded-full">Student Portal</p>
        </div>
        
        <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname.startsWith(item.path);
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

        <div className="p-4 border-t border-gray-100 bg-gray-50/50">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="h-12 w-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-900 font-bold text-lg shadow-sm">
              {user?.firstName?.charAt(0) || 'S'}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-bold text-emerald-900 truncate">{user?.firstName} {user?.lastName}</p>
              <p className="text-xs text-emerald-600 font-medium capitalize truncate">Medical Student</p>
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
          <div>
            <Link to="/student/dashboard" className="text-2xl font-bold text-emerald-900 tracking-tight">WELLPath</Link>
            <span className="text-[10px] ml-2 text-emerald-600 uppercase font-bold bg-emerald-50 px-2 py-0.5 rounded-full">Student</span>
          </div>
          <div className="flex items-center gap-4">
            <NotificationBell />
            <div className="h-9 w-9 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-900 font-bold text-sm shadow-sm">
              {user?.firstName?.charAt(0) || 'S'}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 pb-24 md:pb-8">
          <Outlet />
        </div>

        {/* Mobile Bottom Navigation */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex justify-around p-2 pb-safe z-30 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] rounded-t-3xl">
          {navItems.map((item) => {
            const isActive = location.pathname.startsWith(item.path);
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
        </nav>
      </main>
    </div>
  );
}
