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
    <div className="min-h-screen bg-background flex font-sans">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-72 flex-col bg-primary-dark text-primary-muted sticky top-0 h-screen shadow-md rounded-r-3xl">
        <div className="p-8 pb-4">
          <Link to="/admin" className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-xl flex items-center justify-center shadow-sm">
              <span className="text-white text-xl">W</span>
            </div>
            WellPath
          </Link>
          <p className="text-xs text-emerald-300/80 mt-2 uppercase tracking-[0.2em] font-semibold">Admin Portal</p>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto custom-scrollbar">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || (location.pathname.startsWith(item.path) && item.path !== '/admin');
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-300 ${
                  isActive
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-primary-muted hover:bg-primary-dark/50 hover:text-white'
                }`}
              >
                <item.icon className={`mr-4 h-5 w-5 ${isActive ? 'text-white' : 'text-primary-muted'}`} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-6 m-4 mt-0 bg-primary-dark rounded-xl border border-primary-dark shadow-sm">
          <div className="flex items-center gap-4 mb-5">
            <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center text-white font-bold shadow-sm">
              {user?.firstName?.charAt(0) || 'A'}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-semibold text-white truncate">{user?.firstName} {user?.lastName}</p>
              <p className="text-xs text-primary-muted capitalize truncate">{user?.role || 'Admin'}</p>
            </div>
          </div>
          
          <button 
            onClick={handleLogout}
            className="flex w-full items-center px-4 py-2.5 text-sm font-medium text-primary-muted hover:text-white hover:bg-primary-dark rounded-lg transition-all duration-300"
          >
            <LogOut className="mr-3 h-5 w-5 text-primary-muted" />
            Log Out
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-primary-dark/60 backdrop-blur-sm transition-opacity" onClick={() => setMobileMenuOpen(false)}></div>
          <aside className="relative flex w-72 flex-col bg-primary-dark text-primary-muted h-full shadow-lg rounded-r-3xl">
            <div className="p-6 pb-2 flex justify-between items-center">
              <div>
                <Link to="/admin" className="text-2xl font-extrabold text-white tracking-tight">WellPath</Link>
                <p className="text-[10px] text-emerald-300/80 mt-1 uppercase tracking-widest font-bold">Admin Portal</p>
              </div>
              <button onClick={() => setMobileMenuOpen(false)} className="text-primary-muted hover:text-white bg-primary-dark p-2 rounded-xl">
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
                    className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-300 ${
                      isActive
                        ? 'bg-primary text-white shadow-sm'
                        : 'text-primary-muted hover:bg-primary-dark/50 hover:text-white'
                    }`}
                  >
                    <item.icon className={`mr-4 h-5 w-5 ${isActive ? 'text-white' : 'text-primary-muted'}`} />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
            <div className="p-5 m-4 bg-primary-dark rounded-xl border border-primary-dark">
               <button 
                onClick={handleLogout}
                className="flex w-full items-center px-4 py-2 text-sm font-medium text-primary-muted hover:text-white transition-all duration-300"
              >
                <LogOut className="mr-3 h-5 w-5 text-primary-muted" />
                Log Out
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-background">
        {/* Header */}
        <header className="bg-surface/80 backdrop-blur-md border-b border-primary-muted/50 p-4 lg:px-8 flex items-center justify-between sticky top-0 z-10 shadow-sm rounded-b-3xl mx-2 md:mx-6 mt-2">
          <div className="flex items-center">
            <button 
              className="md:hidden mr-4 p-2 bg-primary-muted text-primary-hover rounded-xl hover:bg-primary-muted transition-colors"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-2xl font-bold text-foreground">
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
                <Search className="h-5 w-5 text-primary-muted-foreground" />
              </div>
              <input
                type="text"
                placeholder="Search users, professionals, or appointments..."
                className="block w-full pl-11 pr-4 py-2.5 border border-primary-muted rounded-lg leading-5 bg-primary-muted/50 placeholder-emerald-400 text-primary-dark focus:outline-none focus:bg-surface focus:ring-2 focus:ring-ring/20 focus:border-primary sm:text-sm transition-all duration-300 shadow-sm hover:shadow-md"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center px-4 py-2 bg-primary-muted rounded-lg shadow-sm border border-primary-muted">
              <span className="relative flex h-3 w-3 mr-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
              </span>
              <span className="text-sm font-medium text-primary-dark">System Online</span>
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
