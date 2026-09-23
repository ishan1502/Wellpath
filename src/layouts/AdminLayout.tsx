import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  UserCheck, 
  Calendar, 
  CreditCard, 
  MessageSquare, 
  FileText, 
  LifeBuoy, 
  BarChart, 
  Settings, 
  LogOut, 
  Menu,
  Search
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Users', path: '/admin/users', icon: Users },
    { name: 'Professionals', path: '/admin/professionals', icon: UserCheck },
    { name: 'Verification', path: '/admin/verification', icon: FileText },
    { name: 'Appointments', path: '/admin/appointments', icon: Calendar },
    { name: 'Events & Webinars', path: '/admin/events', icon: Calendar },
    { name: 'Payments', path: '/admin/payments', icon: CreditCard },
    { name: 'Reviews', path: '/admin/reviews', icon: MessageSquare },
    { name: 'Content', path: '/admin/content', icon: FileText },
    { name: 'Support', path: '/admin/support', icon: LifeBuoy },
    { name: 'Analytics', path: '/admin/analytics', icon: BarChart },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 flex-col bg-gray-900 text-white border-r border-gray-800 sticky top-0 h-screen">
        <div className="p-6">
          <Link to="/admin" className="text-2xl font-bold text-white tracking-tight">WELLPath</Link>
          <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-widest font-bold">Admin Portal</p>
        </div>
        
        <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || (location.pathname.startsWith(item.path) && item.path !== '/admin');
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive
                    ? 'bg-gray-800 text-white'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <item.icon className={`mr-3 h-5 w-5 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-800 bg-gray-950">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-9 w-9 rounded-full bg-gray-800 flex items-center justify-center text-white font-bold border border-gray-700">
              {user?.firstName?.charAt(0) || 'A'}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-medium text-white truncate">{user?.firstName} {user?.lastName}</p>
              <p className="text-xs text-gray-400 capitalize truncate">{user?.role || 'Admin'}</p>
            </div>
          </div>
          
          <button 
            onClick={handleLogout}
            className="flex w-full items-center px-3 py-2 text-sm font-medium text-gray-400 hover:text-red-400 hover:bg-gray-900 rounded-md transition-colors"
          >
            <LogOut className="mr-3 h-5 w-5" />
            Log Out
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 flex">
          <div className="fixed inset-0 bg-gray-900/80" onClick={() => setMobileMenuOpen(false)}></div>
          <aside className="relative flex w-64 flex-col bg-gray-900 text-white h-full max-w-xs shadow-xl">
             <div className="p-6">
              <Link to="/admin" className="text-2xl font-bold text-white tracking-tight">WELLPath</Link>
              <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-widest font-bold">Admin Portal</p>
            </div>
            <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path || (location.pathname.startsWith(item.path) && item.path !== '/admin');
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      isActive
                        ? 'bg-gray-800 text-white'
                        : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                    }`}
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
            <div className="p-4 border-t border-gray-800 bg-gray-950">
               <button 
                onClick={handleLogout}
                className="flex w-full items-center px-3 py-2 text-sm font-medium text-gray-400 hover:text-red-400 transition-colors"
              >
                <LogOut className="mr-3 h-5 w-5" />
                Log Out
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 p-4 flex items-center justify-between sticky top-0 z-10 shadow-sm">
          <div className="flex items-center">
            <button 
              className="md:hidden mr-4 text-gray-500 hover:text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-xl font-semibold text-gray-800">
              {navItems.find(item => 
                location.pathname === item.path || 
                (location.pathname.startsWith(item.path) && item.path !== '/admin')
              )?.name || 'Admin'}
            </h1>
          </div>
          
          {/* Global Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search users, professionals, or appointments..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:bg-white focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm transition-colors"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center text-sm">
              <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
              <span className="text-gray-500">System Online</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
