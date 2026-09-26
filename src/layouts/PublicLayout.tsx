import React from 'react';
import { Outlet, Link, useLocation, Navigate } from 'react-router-dom';
import { HeartPulse, Menu, ChevronDown } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const PublicLayout = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();

  if (isAuthenticated && location.pathname === '/') {
    if (user?.role === 'admin') return <Navigate to="/admin" replace />;
    if (user?.role === 'professional') return <Navigate to="/professional/dashboard" replace />;
    if (user?.role === 'student') return <Navigate to="/student/dashboard" replace />;
    return <Navigate to="/patient/dashboard" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-50 text-emerald-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-emerald-100 p-2 rounded-2xl">
                <HeartPulse className="w-8 h-8 text-emerald-600" />
              </div>
              <span className="font-bold text-2xl tracking-tight text-emerald-900">WELLPath</span>
            </Link>
            
            <nav className="hidden md:flex space-x-8 items-center">
              <div className="relative group">
                <button className="flex items-center gap-1 text-emerald-800 hover:text-emerald-600 font-medium text-sm transition-colors py-2">
                  Services <ChevronDown className="w-4 h-4" />
                </button>
                <div className="absolute top-full left-0 hidden group-hover:block w-56 bg-white border border-gray-100 shadow-xl rounded-2xl py-3 z-50 transition-all duration-300">
                  <Link to="/courses" className="block px-5 py-2.5 text-sm text-emerald-800 hover:bg-emerald-50 hover:text-emerald-600 transition-colors">Courses</Link>
                  <Link to="/jobs" className="block px-5 py-2.5 text-sm text-emerald-800 hover:bg-emerald-50 hover:text-emerald-600 transition-colors">Jobs & Internships</Link>
                  <Link to="/events" className="block px-5 py-2.5 text-sm text-emerald-800 hover:bg-emerald-50 hover:text-emerald-600 transition-colors">Events & Webinars</Link>
                </div>
              </div>

              <div className="relative group">
                <button className="flex items-center gap-1 text-emerald-800 hover:text-emerald-600 font-medium text-sm transition-colors py-2">
                  Company <ChevronDown className="w-4 h-4" />
                </button>
                <div className="absolute top-full left-0 hidden group-hover:block w-56 bg-white border border-gray-100 shadow-xl rounded-2xl py-3 z-50 transition-all duration-300">
                  <Link to="/about" className="block px-5 py-2.5 text-sm text-emerald-800 hover:bg-emerald-50 hover:text-emerald-600 transition-colors">About Us</Link>
                  <Link to="/how-it-works" className="block px-5 py-2.5 text-sm text-emerald-800 hover:bg-emerald-50 hover:text-emerald-600 transition-colors">How It Works</Link>
                  <Link to="/for-professionals" className="block px-5 py-2.5 text-sm text-emerald-800 hover:bg-emerald-50 hover:text-emerald-600 transition-colors">For Professionals</Link>
                </div>
              </div>

              <Link to="/resources" className="text-emerald-800 hover:text-emerald-600 font-medium text-sm transition-colors">Resources</Link>

              <div className="flex items-center gap-4 ml-4 border-l pl-8 border-gray-200">
                {isAuthenticated ? (
                  <>
                    <Link to={user?.role === 'admin' ? '/admin' : `/${user?.role || 'patient'}/dashboard`} className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-semibold text-sm transition-all duration-300 shadow-sm hover:shadow-xl">
                      Dashboard
                    </Link>
                    <button onClick={logout} className="px-5 py-2.5 text-emerald-800 hover:bg-emerald-50 rounded-2xl font-medium text-sm transition-all duration-300">
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="px-5 py-2.5 text-emerald-700 hover:bg-emerald-50 rounded-2xl font-semibold text-sm transition-all duration-300">Login</Link>
                    <Link to="/signup" className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-semibold text-sm transition-all duration-300 shadow-sm hover:shadow-xl">Sign Up</Link>
                  </>
                )}
              </div>
            </nav>
            
            <div className="md:hidden">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-emerald-800 hover:text-emerald-600 p-2 rounded-xl hover:bg-emerald-50 transition-colors"
                aria-label="Toggle Menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
          
          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-6 border-t border-gray-100 flex flex-col space-y-6">
              <div className="space-y-2 bg-white p-4 rounded-3xl shadow-sm">
                <p className="px-4 pb-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">Services</p>
                <Link to="/find-professional" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2 text-emerald-800 hover:bg-emerald-50 font-medium text-sm rounded-xl transition-colors">Find Professional</Link>
                <Link to="/courses" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2 text-emerald-800 hover:bg-emerald-50 font-medium text-sm rounded-xl transition-colors">Courses</Link>
                <Link to="/jobs" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2 text-emerald-800 hover:bg-emerald-50 font-medium text-sm rounded-xl transition-colors">Jobs & Internships</Link>
                <Link to="/events" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2 text-emerald-800 hover:bg-emerald-50 font-medium text-sm rounded-xl transition-colors">Events</Link>
              </div>
              <div className="space-y-2 bg-white p-4 rounded-3xl shadow-sm">
                <p className="px-4 pb-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">Company</p>
                <Link to="/how-it-works" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2 text-emerald-800 hover:bg-emerald-50 font-medium text-sm rounded-xl transition-colors">How It Works</Link>
                <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2 text-emerald-800 hover:bg-emerald-50 font-medium text-sm rounded-xl transition-colors">About Us</Link>
                <Link to="/for-professionals" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2 text-emerald-800 hover:bg-emerald-50 font-medium text-sm rounded-xl transition-colors">For Professionals</Link>
                <Link to="/resources" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2 text-emerald-800 hover:bg-emerald-50 font-medium text-sm rounded-xl transition-colors">Resources</Link>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-2">
                {isAuthenticated ? (
                  <>
                    <Link to={user?.role === 'admin' ? '/admin' : `/${user?.role || 'patient'}/dashboard`} onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-center px-4 py-3 bg-emerald-600 text-white font-semibold text-sm rounded-2xl shadow-sm">Dashboard</Link>
                    <button onClick={() => { logout(); setMobileMenuOpen(false); }} className="flex items-center justify-center px-4 py-3 text-emerald-800 bg-white shadow-sm font-semibold text-sm rounded-2xl">Logout</button>
                  </>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-center px-4 py-3 text-emerald-700 bg-emerald-100 font-semibold text-sm rounded-2xl">Login</Link>
                    <Link to="/signup" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-center px-4 py-3 bg-emerald-600 text-white font-semibold text-sm rounded-2xl shadow-sm">Sign Up</Link>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col">
        <Outlet />
      </main>

      {/* Footer */}
      {!['/login', '/signup'].includes(location.pathname) && (
        <footer className="bg-white border-t border-gray-200 mt-16 rounded-t-3xl shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-1">
              <Link to="/" className="flex items-center space-x-2 mb-6">
                <div className="bg-emerald-100 p-2 rounded-2xl">
                  <HeartPulse className="w-6 h-6 text-emerald-600" />
                </div>
                <span className="font-bold text-xl text-emerald-900">WELLPath</span>
              </Link>
              <p className="text-emerald-700/80 text-sm leading-relaxed">
                Your journey to mental wellness begins here. Professional support tailored to you.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-emerald-900 mb-6">Services</h3>
              <ul className="space-y-4 text-sm text-emerald-800/80">
                <li><Link to="/find-professional" className="hover:text-emerald-600 transition-colors">Find a Therapist</Link></li>
                <li><Link to="/courses" className="hover:text-emerald-600 transition-colors">Courses</Link></li>
                <li><Link to="/how-it-works" className="hover:text-emerald-600 transition-colors">How It Works</Link></li>
                <li><Link to="/resources" className="hover:text-emerald-600 transition-colors">Mental Health Resources</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-emerald-900 mb-6">Company</h3>
              <ul className="space-y-4 text-sm text-emerald-800/80">
                <li><Link to="/about" className="hover:text-emerald-600 transition-colors">About Us</Link></li>
                <li><Link to="/for-professionals" className="hover:text-emerald-600 transition-colors">For Professionals</Link></li>
                <li><Link to="/jobs" className="hover:text-emerald-600 transition-colors">Student Internships</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-emerald-900 mb-6">Legal</h3>
              <ul className="space-y-4 text-sm text-emerald-800/80">
                <li><Link to="/privacy" className="hover:text-emerald-600 transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-emerald-600 transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-emerald-100 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-emerald-700/60">
            <p>&copy; {new Date().getFullYear()} WELLPath. All rights reserved.</p>
          </div>
        </div>
      </footer>
      )}
    </div>
  );
};

export default PublicLayout;

