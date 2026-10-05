import React from 'react';
import { Outlet, Link, useLocation, Navigate } from 'react-router-dom';
import { HeartPulse, Menu, ChevronDown } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { InstallAppButton } from '@/components/shared/InstallAppButton';

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
    <div className="min-h-screen flex flex-col font-sans bg-background text-primary-dark">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-surface/90 backdrop-blur-md border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-primary-muted p-2 rounded-lg">
                <HeartPulse className="w-8 h-8 text-primary" />
              </div>
              <span className="font-bold text-2xl tracking-tight text-primary-dark">WellPath</span>
            </Link>
            
            <nav className="hidden md:flex space-x-8 items-center">
              <div className="relative group">
                <button className="flex items-center gap-1 text-primary-dark hover:text-primary font-medium text-sm transition-colors py-2">
                  Services <ChevronDown className="w-4 h-4" />
                </button>
                <div className="absolute top-full left-0 hidden group-hover:block w-56 bg-surface border border-gray-100 shadow-md rounded-lg py-3 z-50 transition-all duration-300">
                  <Link to="/find-professional" className="block px-5 py-2.5 text-sm text-primary-dark hover:bg-primary-muted hover:text-primary transition-colors">Find a Professional</Link>
                  <Link to="/courses" className="block px-5 py-2.5 text-sm text-primary-dark hover:bg-primary-muted hover:text-primary transition-colors">Courses</Link>
                  <Link to="/jobs" className="block px-5 py-2.5 text-sm text-primary-dark hover:bg-primary-muted hover:text-primary transition-colors">Jobs & Internships</Link>
                  <Link to="/events" className="block px-5 py-2.5 text-sm text-primary-dark hover:bg-primary-muted hover:text-primary transition-colors">Events & Webinars</Link>
                </div>
              </div>

              <div className="relative group">
                <button className="flex items-center gap-1 text-primary-dark hover:text-primary font-medium text-sm transition-colors py-2">
                  Company <ChevronDown className="w-4 h-4" />
                </button>
                <div className="absolute top-full left-0 hidden group-hover:block w-56 bg-surface border border-gray-100 shadow-md rounded-lg py-3 z-50 transition-all duration-300">
                  <Link to="/about" className="block px-5 py-2.5 text-sm text-primary-dark hover:bg-primary-muted hover:text-primary transition-colors">About Us</Link>
                  <Link to="/how-it-works" className="block px-5 py-2.5 text-sm text-primary-dark hover:bg-primary-muted hover:text-primary transition-colors">How It Works</Link>
                  <Link to="/for-professionals" className="block px-5 py-2.5 text-sm text-primary-dark hover:bg-primary-muted hover:text-primary transition-colors">For Professionals</Link>
                </div>
              </div>

              <Link to="/resources" className="text-primary-dark hover:text-primary font-medium text-sm transition-colors">Resources</Link>

              <div className="flex items-center gap-4 ml-4 border-l pl-8 border-border">
                <InstallAppButton variant="header" />
                {isAuthenticated ? (
                  <>
                    <Link to={user?.role === 'admin' ? '/admin' : `/${user?.role || 'patient'}/dashboard`} className="px-5 py-2.5 bg-primary hover:bg-primary-hover text-white rounded-lg font-semibold text-sm transition-all duration-300 shadow-sm hover:shadow-md">
                      Dashboard
                    </Link>
                    <button onClick={logout} className="px-5 py-2.5 text-primary-dark hover:bg-primary-muted rounded-lg font-medium text-sm transition-all duration-300">
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="px-5 py-2.5 text-primary-hover hover:bg-primary-muted rounded-lg font-semibold text-sm transition-all duration-300">Login</Link>
                    <Link to="/signup" className="px-5 py-2.5 bg-primary hover:bg-primary-hover text-white rounded-lg font-semibold text-sm transition-all duration-300 shadow-sm hover:shadow-md">Sign Up</Link>
                  </>
                )}
              </div>
            </nav>
            
            <div className="md:hidden flex items-center gap-2">
              <InstallAppButton variant="header" className="py-1 px-2.5 text-[11px]" />
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-primary-dark hover:text-primary p-2 rounded-xl hover:bg-primary-muted transition-colors"
                aria-label="Toggle Menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
          
          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-6 border-t border-gray-100 flex flex-col space-y-6">
              <div className="space-y-2 bg-surface p-4 rounded-xl shadow-sm">
                <p className="px-4 pb-2 text-xs font-bold text-primary-muted-foreground uppercase tracking-wider">Services</p>
                <Link to="/find-professional" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2 text-primary-dark hover:bg-primary-muted font-medium text-sm rounded-xl transition-colors">Find Professional</Link>
                <Link to="/courses" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2 text-primary-dark hover:bg-primary-muted font-medium text-sm rounded-xl transition-colors">Courses</Link>
                <Link to="/jobs" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2 text-primary-dark hover:bg-primary-muted font-medium text-sm rounded-xl transition-colors">Jobs & Internships</Link>
                <Link to="/events" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2 text-primary-dark hover:bg-primary-muted font-medium text-sm rounded-xl transition-colors">Events</Link>
              </div>
              <div className="space-y-2 bg-surface p-4 rounded-xl shadow-sm">
                <p className="px-4 pb-2 text-xs font-bold text-primary-muted-foreground uppercase tracking-wider">Company</p>
                <Link to="/how-it-works" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2 text-primary-dark hover:bg-primary-muted font-medium text-sm rounded-xl transition-colors">How It Works</Link>
                <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2 text-primary-dark hover:bg-primary-muted font-medium text-sm rounded-xl transition-colors">About Us</Link>
                <Link to="/for-professionals" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2 text-primary-dark hover:bg-primary-muted font-medium text-sm rounded-xl transition-colors">For Professionals</Link>
                <Link to="/resources" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2 text-primary-dark hover:bg-primary-muted font-medium text-sm rounded-xl transition-colors">Resources</Link>
                <div className="pt-2 border-t border-gray-100">
                  <InstallAppButton variant="mobileMenu" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-2">
                {isAuthenticated ? (
                  <>
                    <Link to={user?.role === 'admin' ? '/admin' : `/${user?.role || 'patient'}/dashboard`} onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-center px-4 py-3 bg-primary text-white font-semibold text-sm rounded-lg shadow-sm">Dashboard</Link>
                    <button onClick={() => { logout(); setMobileMenuOpen(false); }} className="flex items-center justify-center px-4 py-3 text-primary-dark bg-surface shadow-sm font-semibold text-sm rounded-lg">Logout</button>
                  </>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-center px-4 py-3 text-primary-hover bg-primary-muted font-semibold text-sm rounded-lg">Login</Link>
                    <Link to="/signup" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-center px-4 py-3 bg-primary text-white font-semibold text-sm rounded-lg shadow-sm">Sign Up</Link>
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
        <footer className="bg-surface border-t border-border rounded-t-3xl shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-1">
              <Link to="/" className="flex items-center space-x-2 mb-6">
                <div className="bg-primary-muted p-2 rounded-lg">
                  <HeartPulse className="w-6 h-6 text-primary" />
                </div>
                <span className="font-bold text-xl text-primary-dark">WellPath</span>
              </Link>
              <p className="text-primary-hover/80 text-sm leading-relaxed">
                Your journey to mental wellness begins here. Professional support tailored to you.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-primary-dark mb-6">Services</h3>
              <ul className="space-y-4 text-sm text-primary-dark/80">
                <li><Link to="/find-professional" className="hover:text-primary transition-colors">Find a Therapist</Link></li>
                <li><Link to="/courses" className="hover:text-primary transition-colors">Courses</Link></li>
                <li><Link to="/how-it-works" className="hover:text-primary transition-colors">How It Works</Link></li>
                <li><Link to="/resources" className="hover:text-primary transition-colors">Mental Health Resources</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-primary-dark mb-6">Company</h3>
              <ul className="space-y-4 text-sm text-primary-dark/80">
                <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
                <li><Link to="/for-professionals" className="hover:text-primary transition-colors">For Professionals</Link></li>
                <li><Link to="/jobs" className="hover:text-primary transition-colors">Student Internships</Link></li>
                <li><InstallAppButton variant="ghost" className="text-primary-dark/80 hover:text-primary font-normal text-sm" /></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-primary-dark mb-6">Legal</h3>
              <ul className="space-y-4 text-sm text-primary-dark/80">
                <li><Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-primary-muted mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-primary-hover/60">
            <p>&copy; {new Date().getFullYear()} WellPath Inc. All rights reserved.</p>
          </div>
        </div>
      </footer>
      )}
    </div>
  );
};

export default PublicLayout;

