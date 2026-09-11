import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Shield, Clock, Video, Star } from 'lucide-react';
import { mockProfessionals } from '../../data/mockData';

const Home = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-emerald-50/50 py-20 lg:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Find clarity and calm with <span className="text-emerald-600">expert care</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-10 leading-relaxed">
              Connect with verified mental health professionals for personalized therapy. Your path to wellness starts here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/find-professional" className="inline-flex justify-center items-center px-8 py-4 bg-emerald-600 text-white rounded-xl font-medium text-lg hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-200">
                Find a Professional
              </Link>
              <Link to="/about" className="inline-flex justify-center items-center px-8 py-4 bg-white text-gray-700 rounded-xl font-medium text-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                Learn More
              </Link>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute right-0 top-0 w-1/3 h-full bg-emerald-100/30 rounded-l-full blur-3xl transform translate-x-1/3"></div>
      </section>

      {/* Specialization Cards */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Support for whatever you're going through</h2>
            <p className="text-gray-600">Specialized care for your unique needs</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {['Anxiety', 'Depression', 'Stress', 'Relationships', 'Burnout', 'Trauma', 'Grief', 'Self-Esteem'].map((spec) => (
              <div key={spec} className="bg-gray-50 rounded-2xl p-6 text-center hover:bg-emerald-50 hover:shadow-md transition-all cursor-pointer group border border-gray-100">
                <h3 className="font-medium text-gray-900 group-hover:text-emerald-700">{spec}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-emerald-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How WELLPath works</h2>
            <p className="text-emerald-100/80">Simple steps to start your healing journey</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-800 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Search className="w-8 h-8 text-emerald-300" />
              </div>
              <h3 className="text-xl font-semibold mb-3">1. Find your match</h3>
              <p className="text-emerald-100/70">Browse verified professionals or let our matching system find the right fit for your specific needs.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-800 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Clock className="w-8 h-8 text-emerald-300" />
              </div>
              <h3 className="text-xl font-semibold mb-3">2. Book a session</h3>
              <p className="text-emerald-100/70">Schedule a time that works for you. Choose between online video calls or in-person sessions.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-800 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Video className="w-8 h-8 text-emerald-300" />
              </div>
              <h3 className="text-xl font-semibold mb-3">3. Start healing</h3>
              <p className="text-emerald-100/70">Connect securely with your therapist and begin your personalized journey to better mental health.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Professionals */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet our experts</h2>
              <p className="text-gray-600">Highly qualified and verified professionals</p>
            </div>
            <Link to="/find-professional" className="text-emerald-600 font-medium hover:text-emerald-700 hidden md:block">
              View all professionals &rarr;
            </Link>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {mockProfessionals.slice(0, 2).map(prof => (
              <div key={prof.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-6">
                <div className="w-24 h-24 bg-emerald-100 rounded-full flex-shrink-0 flex items-center justify-center text-emerald-700 font-bold text-2xl">
                  {prof.firstName[0]}{prof.lastName[0]}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {prof.firstName} {prof.lastName}
                  </h3>
                  <p className="text-emerald-600 font-medium mb-3">{prof.type}</p>
                  <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
                    <Star className="w-4 h-4 text-amber-400 fill-current" />
                    <span className="font-medium text-gray-700">{prof.rating}</span>
                    <span>({prof.reviewCount} reviews)</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {prof.specializations.slice(0, 2).map(s => (
                      <span key={s} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                        {s}
                      </span>
                    ))}
                    {prof.specializations.length > 2 && (
                      <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                        +{prof.specializations.length - 2} more
                      </span>
                    )}
                  </div>
                  <Link to={`/professionals/${prof.id}`} className="inline-block text-emerald-600 font-medium hover:text-emerald-700">
                    View Profile &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 text-center md:hidden">
            <Link to="/find-professional" className="inline-block px-6 py-3 bg-white border border-gray-200 rounded-lg text-gray-700 font-medium w-full">
              View all professionals
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Shield className="w-12 h-12 text-emerald-600 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Safe, secure, and confidential</h2>
          <p className="max-w-2xl mx-auto text-gray-600 mb-10 text-lg">
            Your privacy is our top priority. We use bank-level encryption to ensure your data and sessions remain completely confidential.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="p-4">
              <p className="font-bold text-gray-900 text-xl mb-2">HIPAA</p>
              <p className="text-sm text-gray-500">Compliant Platform</p>
            </div>
            <div className="p-4">
              <p className="font-bold text-gray-900 text-xl mb-2">256-bit</p>
              <p className="text-sm text-gray-500">Encryption</p>
            </div>
            <div className="p-4">
              <p className="font-bold text-gray-900 text-xl mb-2">Verified</p>
              <p className="text-sm text-gray-500">Professionals</p>
            </div>
            <div className="p-4">
              <p className="font-bold text-gray-900 text-xl mb-2">24/7</p>
              <p className="text-sm text-gray-500">Support</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
