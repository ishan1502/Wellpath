import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { HeartPulse, Menu, ChevronDown } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const PublicLayout = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-50 text-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <HeartPulse className="w-8 h-8 text-emerald-600" />
              <span className="font-semibold text-xl tracking-tight text-gray-900">WELLPath</span>
            </Link>
            
            <nav className="hidden md:flex space-x-6 items-center">
              <div className="relative group">
                <button className="flex items-center gap-1 text-gray-600 hover:text-emerald-600 font-medium text-sm transition-colors py-2">
                  Services <ChevronDown className="w-4 h-4" />
                </button>
                <div className="absolute top-full left-0 hidden group-hover:block w-48 bg-white border border-gray-100 shadow-lg rounded-lg py-2">
                  <Link to="/jobs" className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-emerald-600">Jobs & Internships</Link>
                  <Link to="/events" className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-emerald-600">Events & Webinars</Link>
                </div>
              </div>

              <div className="relative group">
                <button className="flex items-center gap-1 text-gray-600 hover:text-emerald-600 font-medium text-sm transition-colors py-2">
                  Company <ChevronDown className="w-4 h-4" />
                </button>
                <div className="absolute top-full left-0 hidden group-hover:block w-48 bg-white border border-gray-100 shadow-lg rounded-lg py-2">
                  <Link to="/about" className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-emerald-600">About Us</Link>
                  <Link to="/how-it-works" className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-emerald-600">How It Works</Link>
                  <Link to="/for-professionals" className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-emerald-600">For Professionals</Link>
                </div>
              </div>

              <Link to="/resources" className="text-gray-600 hover:text-emerald-600 font-medium text-sm transition-colors">Resources</Link>

              <div className="flex items-center gap-3 ml-4 border-l pl-6 border-gray-200">
                {isAuthenticated ? (
                  <>
                    <Link to={user?.role === 'admin' ? '/admin' : `/${user?.role || 'patient'}/dashboard`} className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold text-sm transition-colors shadow-sm">
                      Dashboard
                    </Link>
                    <button onClick={logout} className="px-4 py-2 text-gray-600 hover:text-emerald-600 font-medium text-sm transition-colors">
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="px-4 py-2 text-emerald-600 hover:bg-emerald-50 border border-emerald-600 rounded-lg font-semibold text-sm transition-colors">Login</Link>
                    <Link to="/signup" className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold text-sm transition-colors shadow-sm">Sign Up</Link>
                  </>
                )}
              </div>
            </nav>
            
            <div className="md:hidden">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-500 hover:text-gray-700 p-1"
                aria-label="Toggle Menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-100 flex flex-col space-y-4">
              <div className="space-y-2">
                <p className="px-2 text-xs font-bold text-gray-400 uppercase tracking-wider">Services</p>
                <Link to="/find-professional" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2 text-gray-600 hover:bg-gray-50 font-medium text-sm rounded-lg">Find Professional</Link>
                <Link to="/jobs" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2 text-gray-600 hover:bg-gray-50 font-medium text-sm rounded-lg">Jobs & Internships</Link>
                <Link to="/events" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2 text-gray-600 hover:bg-gray-50 font-medium text-sm rounded-lg">Events</Link>
              </div>
              <div className="space-y-2">
                <p className="px-2 text-xs font-bold text-gray-400 uppercase tracking-wider">Company</p>
                <Link to="/how-it-works" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2 text-gray-600 hover:bg-gray-50 font-medium text-sm rounded-lg">How It Works</Link>
                <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2 text-gray-600 hover:bg-gray-50 font-medium text-sm rounded-lg">About Us</Link>
                <Link to="/for-professionals" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2 text-gray-600 hover:bg-gray-50 font-medium text-sm rounded-lg">For Professionals</Link>
                <Link to="/resources" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2 text-gray-600 hover:bg-gray-50 font-medium text-sm rounded-lg">Resources</Link>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-2">
                {isAuthenticated ? (
                  <>
                    <Link to={user?.role === 'admin' ? '/admin' : `/${user?.role || 'patient'}/dashboard`} onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-center px-4 py-2 bg-emerald-600 text-white font-semibold text-sm rounded-lg">Dashboard</Link>
                    <button onClick={() => { logout(); setMobileMenuOpen(false); }} className="flex items-center justify-center px-4 py-2 text-gray-600 border border-gray-300 font-semibold text-sm rounded-lg">Logout</button>
                  </>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-center px-4 py-2 text-emerald-600 border border-emerald-600 font-semibold text-sm rounded-lg">Login</Link>
                    <Link to="/signup" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-center px-4 py-2 bg-emerald-600 text-white font-semibold text-sm rounded-lg">Sign Up</Link>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-1">
              <Link to="/" className="flex items-center space-x-2 mb-4">
                <HeartPulse className="w-6 h-6 text-emerald-600" />
                <span className="font-semibold text-lg text-gray-900">WELLPath</span>
              </Link>
              <p className="text-gray-500 text-sm">
                Your journey to mental wellness begins here. Professional support tailored to you.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Services</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link to="/find-professional" className="hover:text-emerald-600">Find a Therapist</Link></li>
                <li><Link to="/how-it-works" className="hover:text-emerald-600">How It Works</Link></li>
                <li><Link to="/resources" className="hover:text-emerald-600">Mental Health Resources</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link to="/about" className="hover:text-emerald-600">About Us</Link></li>
                <li><Link to="/for-professionals" className="hover:text-emerald-600">For Professionals</Link></li>
                <li><Link to="/jobs" className="hover:text-emerald-600">Student Internships</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link to="/privacy" className="hover:text-emerald-600">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-emerald-600">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-100 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
            <p>&copy; {new Date().getFullYear()} WELLPath. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;
