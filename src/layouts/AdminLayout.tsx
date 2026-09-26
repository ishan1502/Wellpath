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
  Search,
  X
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
    <div className="min-h-screen bg-gray-50 flex font-sans">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-72 flex-col bg-emerald-900 text-emerald-50 sticky top-0 h-screen shadow-xl rounded-r-3xl">
        <div className="p-8 pb-4">
          <Link to="/admin" className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-500 rounded-xl flex items-center justify-center shadow-sm">
              <span className="text-white text-xl">W</span>
            </div>
            WELLPath
          </Link>
          <p className="text-xs text-emerald-300 mt-2 uppercase tracking-[0.2em] font-semibold">Admin Portal</p>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto custom-scrollbar">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || (location.pathname.startsWith(item.path) && item.path !== '/admin');
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-2xl transition-all duration-300 ${
                  isActive
                    ? 'bg-emerald-800 text-white shadow-sm'
                    : 'text-emerald-100 hover:bg-emerald-800/50 hover:text-white'
                }`}
              >
                <item.icon className={`mr-4 h-5 w-5 ${isActive ? 'text-emerald-300' : 'text-emerald-400'}`} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-6 m-4 mt-0 bg-emerald-950 rounded-3xl border border-emerald-800 shadow-sm">
          <div className="flex items-center gap-4 mb-5">
            <div className="h-10 w-10 rounded-2xl bg-emerald-600 flex items-center justify-center text-white font-bold shadow-sm">
              {user?.firstName?.charAt(0) || 'A'}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-semibold text-white truncate">{user?.firstName} {user?.lastName}</p>
              <p className="text-xs text-emerald-400 capitalize truncate">{user?.role || 'Admin'}</p>
            </div>
          </div>
          
          <button 
            onClick={handleLogout}
            className="flex w-full items-center px-4 py-2.5 text-sm font-medium text-emerald-200 hover:text-white hover:bg-emerald-900 rounded-2xl transition-all duration-300"
          >
            <LogOut className="mr-3 h-5 w-5 text-emerald-400" />
            Log Out
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-emerald-950/60 backdrop-blur-sm transition-opacity" onClick={() => setMobileMenuOpen(false)}></div>
          <aside className="relative flex w-72 flex-col bg-emerald-900 text-emerald-50 h-full shadow-2xl rounded-r-3xl">
            <div className="p-6 pb-2 flex justify-between items-center">
              <div>
                <Link to="/admin" className="text-2xl font-extrabold text-white tracking-tight">WELLPath</Link>
                <p className="text-[10px] text-emerald-300 mt-1 uppercase tracking-widest font-bold">Admin Portal</p>
              </div>
              <button onClick={() => setMobileMenuOpen(false)} className="text-emerald-200 hover:text-white bg-emerald-800 p-2 rounded-xl">
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path || (location.pathname.startsWith(item.path) && item.path !== '/admin');
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center px-4 py-3 text-sm font-medium rounded-2xl transition-all duration-300 ${
                      isActive
                        ? 'bg-emerald-800 text-white shadow-sm'
                        : 'text-emerald-100 hover:bg-emerald-800/50 hover:text-white'
                    }`}
                  >
                    <item.icon className={`mr-4 h-5 w-5 ${isActive ? 'text-emerald-300' : 'text-emerald-400'}`} />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
            <div className="p-5 m-4 bg-emerald-950 rounded-3xl border border-emerald-800">
               <button 
                onClick={handleLogout}
                className="flex w-full items-center px-4 py-2 text-sm font-medium text-emerald-200 hover:text-white transition-all duration-300"
              >
                <LogOut className="mr-3 h-5 w-5 text-emerald-400" />
                Log Out
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-gray-50">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-md border-b border-emerald-100/50 p-4 lg:px-8 flex items-center justify-between sticky top-0 z-10 shadow-sm rounded-b-3xl mx-2 md:mx-6 mt-2">
          <div className="flex items-center">
            <button 
              className="md:hidden mr-4 p-2 bg-emerald-50 text-emerald-700 rounded-xl hover:bg-emerald-100 transition-colors"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-2xl font-bold text-emerald-950">
              {navItems.find(item => 
                location.pathname === item.path || 
                (location.pathname.startsWith(item.path) && item.path !== '/admin')
              )?.name || 'Admin'}
            </h1>
          </div>
          
          {/* Global Search Bar */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-emerald-400" />
              </div>
              <input
                type="text"
                placeholder="Search users, professionals, or appointments..."
                className="block w-full pl-11 pr-4 py-2.5 border border-emerald-100 rounded-2xl leading-5 bg-emerald-50/50 placeholder-emerald-400 text-emerald-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 sm:text-sm transition-all duration-300 shadow-sm hover:shadow-md"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center px-4 py-2 bg-emerald-50 rounded-2xl shadow-sm border border-emerald-100">
              <span className="relative flex h-3 w-3 mr-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <span className="text-sm font-medium text-emerald-800">System Online</span>
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
