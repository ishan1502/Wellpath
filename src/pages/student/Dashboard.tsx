import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Briefcase, ChevronRight, MapPin, Building2, Search } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export default function Dashboard() {
  const { user } = useAuth();
  
  // Parse applications from localStorage (or use service)
  const applicationsStr = localStorage.getItem('wellpath_internship_applications') || '[]';
  const applications = JSON.parse(applicationsStr);

  return (
    <div className="space-y-8 animate-fade-in font-sans text-emerald-900">
      {/* Header */}
      <section className="bg-white rounded-3xl p-8 md:p-10 border-0 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Welcome back, {user?.firstName || 'Student'}!
          </h1>
          <p className="text-emerald-700/80 font-medium mt-2 max-w-2xl">
            Track your internship applications and find new opportunities to learn from verified professionals.
          </p>
        </div>
        <Link 
          to="/student/find-internship"
          className="inline-flex items-center justify-center px-6 py-4 bg-emerald-600 text-white font-bold rounded-2xl hover:bg-emerald-700 transition-all shadow-md hover:shadow-lg whitespace-nowrap"
        >
          <Search className="w-5 h-5 mr-2.5" />
          Find Internships
        </Link>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-8 rounded-3xl border-0 shadow-sm hover:shadow-xl transition-all duration-300 flex items-center gap-6">
          <div className="h-16 w-16 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shadow-sm">
            <Briefcase className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm text-emerald-700/70 font-bold uppercase tracking-wider mb-1">Total Apps</p>
            <p className="text-4xl font-extrabold">{applications.length}</p>
          </div>
        </div>
        
        <div className="bg-white p-8 rounded-3xl border-0 shadow-sm hover:shadow-xl transition-all duration-300 flex items-center gap-6">
          <div className="h-16 w-16 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 shadow-sm">
            <GraduationCap className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm text-amber-700/70 font-bold uppercase tracking-wider mb-1">Pending</p>
            <p className="text-4xl font-extrabold text-amber-900">
              {applications.filter((a: any) => a.status === 'pending').length}
            </p>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl border-0 shadow-sm hover:shadow-xl transition-all duration-300 flex items-center gap-6 md:col-span-2 lg:col-span-1">
          <div className="h-16 w-16 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shadow-sm">
            <Building2 className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm text-blue-700/70 font-bold uppercase tracking-wider mb-1">Accepted</p>
            <p className="text-4xl font-extrabold text-blue-900">
              {applications.filter((a: any) => a.status === 'accepted').length}
            </p>
          </div>
        </div>
      </section>

      {/* Recent Applications */}
      <section className="bg-white rounded-3xl border-0 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
        <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
          <h2 className="text-xl font-bold">Recent Applications</h2>
          <Link to="/student/applications" className="text-sm font-bold text-emerald-600 hover:text-emerald-800 transition-colors flex items-center bg-emerald-50 px-4 py-2 rounded-xl">
            View All <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
        <div className="p-0">
          {applications.length === 0 ? (
            <div className="p-16 text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gray-50 border border-gray-100 mb-6 shadow-sm">
                <Briefcase className="w-10 h-10 text-emerald-900/30" />
              </div>
              <h3 className="text-xl font-bold mb-2">No applications yet</h3>
              <p className="text-emerald-700/70 max-w-sm mx-auto font-medium mb-8">
                You haven't applied to any internships yet. Browse available professionals to start learning.
              </p>
              <Link to="/student/find-internship" className="inline-flex items-center px-8 py-4 text-sm font-bold rounded-2xl text-white bg-emerald-600 hover:bg-emerald-700 transition-all shadow-md hover:shadow-lg">
                Browse Professionals
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {applications.slice(0, 5).map((app: any, idx: number) => (
                <div key={idx} className="p-6 md:p-8 hover:bg-gray-50/50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-bold text-lg mb-1 flex items-center gap-2">
                      Application to {app.professionalName || 'Professional'}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-emerald-700/70 font-medium">
                      <span className="flex items-center bg-gray-50 px-3 py-1 rounded-lg border border-gray-100"><MapPin className="w-3.5 h-3.5 mr-1.5 text-emerald-600" /> {app.location || 'Remote'}</span>
                      <span className="flex items-center">Applied: {new Date(app.appliedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div>
                    <span className={`inline-flex items-center px-4 py-2 rounded-xl text-xs font-bold capitalize shadow-sm
                      ${app.status === 'accepted' ? 'bg-emerald-50 text-emerald-800 border border-emerald-100' : 
                        app.status === 'rejected' ? 'bg-red-50 text-red-800 border border-red-100' : 
                        'bg-amber-50 text-amber-800 border border-amber-100'}`}>
                      {app.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
