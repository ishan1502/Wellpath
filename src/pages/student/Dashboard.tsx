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
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <section className="bg-surface rounded-2xl p-6 md:p-8 border border-border flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-text-main">
            Welcome back, {user?.firstName || 'Student'}!
          </h1>
          <p className="text-text-muted mt-2">
            Track your internship applications and find new opportunities to learn from verified professionals.
          </p>
        </div>
        <Link 
          to="/student/find-internship"
          className="inline-flex items-center justify-center px-4 py-2 bg-primary text-primary-content font-medium rounded-lg hover:bg-primary-dark transition-colors"
        >
          <Search className="w-5 h-5 mr-2" />
          Find Internships
        </Link>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-surface p-6 rounded-xl border border-border shadow-sm flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
            <Briefcase className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-text-muted font-medium">Total Applications</p>
            <p className="text-2xl font-bold text-text-main">{applications.length}</p>
          </div>
        </div>
        
        <div className="bg-surface p-6 rounded-xl border border-border shadow-sm flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-text-muted font-medium">Pending Review</p>
            <p className="text-2xl font-bold text-text-main">
              {applications.filter((a: any) => a.status === 'pending').length}
            </p>
          </div>
        </div>

        <div className="bg-surface p-6 rounded-xl border border-border shadow-sm flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-text-muted font-medium">Accepted</p>
            <p className="text-2xl font-bold text-text-main">
              {applications.filter((a: any) => a.status === 'accepted').length}
            </p>
          </div>
        </div>
      </section>

      {/* Recent Applications */}
      <section className="bg-surface rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="p-6 border-b border-border flex justify-between items-center">
          <h2 className="text-lg font-bold text-text-main">Recent Applications</h2>
          <Link to="/student/applications" className="text-sm font-medium text-primary hover:text-primary-dark flex items-center">
            View All <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
        <div className="p-0">
          {applications.length === 0 ? (
            <div className="p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                <Briefcase className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">No applications yet</h3>
              <p className="mt-1 text-gray-500 max-w-sm mx-auto">
                You haven't applied to any internships yet. Browse available professionals to start learning.
              </p>
              <div className="mt-6">
                <Link to="/student/find-internship" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-primary-content bg-primary hover:bg-primary-dark">
                  Browse Professionals
                </Link>
              </div>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {applications.slice(0, 5).map((app: any, idx: number) => (
                <div key={idx} className="p-6 hover:bg-gray-50 transition-colors flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-text-main flex items-center gap-2">
                      Application to {app.professionalName || 'Professional'}
                    </h3>
                    <div className="flex items-center gap-4 mt-1 text-sm text-text-muted">
                      <span className="flex items-center"><MapPin className="w-3.5 h-3.5 mr-1" /> {app.location || 'Remote'}</span>
                      <span className="flex items-center">Applied: {new Date(app.appliedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                      ${app.status === 'accepted' ? 'bg-green-100 text-green-800' : 
                        app.status === 'rejected' ? 'bg-red-100 text-red-800' : 
                        'bg-amber-100 text-amber-800'}`}>
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
