import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { HeartPulse, Menu } from 'lucide-react';

const PublicLayout = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

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
              <Link to="/find-professional" className="text-gray-600 hover:text-emerald-600 font-medium text-sm transition-colors">Find Professional</Link>
              <Link to="/how-it-works" className="text-gray-600 hover:text-emerald-600 font-medium text-sm transition-colors">How It Works</Link>
              <Link to="/resources" className="text-gray-600 hover:text-emerald-600 font-medium text-sm transition-colors">Resources</Link>
              <Link to="/for-professionals" className="text-gray-600 hover:text-emerald-600 font-medium text-sm transition-colors">For Professionals</Link>
              <Link to="/login" className="text-emerald-600 hover:text-emerald-700 font-semibold text-sm transition-colors ml-2">Login</Link>
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
            <div className="md:hidden py-4 border-t border-gray-100 flex flex-col space-y-3">
              <Link to="/find-professional" onClick={() => setMobileMenuOpen(false)} className="text-gray-600 hover:text-emerald-600 font-medium text-sm">Find Professional</Link>
              <Link to="/how-it-works" onClick={() => setMobileMenuOpen(false)} className="text-gray-600 hover:text-emerald-600 font-medium text-sm">How It Works</Link>
              <Link to="/resources" onClick={() => setMobileMenuOpen(false)} className="text-gray-600 hover:text-emerald-600 font-medium text-sm">Resources</Link>
              <Link to="/for-professionals" onClick={() => setMobileMenuOpen(false)} className="text-gray-600 hover:text-emerald-600 font-medium text-sm">For Professionals</Link>
              <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="text-gray-600 hover:text-emerald-600 font-medium text-sm">About Us</Link>
              <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="text-emerald-600 hover:text-emerald-700 font-semibold text-sm">Login</Link>
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
                <li><Link to="/student/signup" className="hover:text-emerald-600">Student Internships</Link></li>
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
