import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Heart, 
  User, 
  Mail, 
  Lock, 
  GraduationCap, 
  Building2, 
  BookOpen, 
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { User as UserType } from '../../types';

const StudentSignup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    university: '',
    program: 'M.A. Clinical Psychology',
    yearOfStudy: 'Final Year',
    agreeStudentStatus: false,
    agreeTerms: false
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target;
    const { name, value } = target;
    const isCheckbox = target.type === 'checkbox';
    const checked = (target as HTMLInputElement).checked;

    setFormData(prev => ({
      ...prev,
      [name]: isCheckbox ? checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Create new student user object
    const newStudent: UserType = {
      id: 's_' + (crypto.randomUUID ? crypto.randomUUID().slice(0, 8) : Math.random().toString(36).substring(2, 9)),
      email: formData.email,
      firstName: formData.firstName,
      lastName: formData.lastName,
      role: 'student'
    };

    // Save to localStorage for demo persistence
    const existingUsers: UserType[] = JSON.parse(localStorage.getItem('wellpath_users') || '[]');
    localStorage.setItem('wellpath_users', JSON.stringify([...existingUsers, newStudent]));

    setSubmitted(true);
    setTimeout(() => {
      navigate('/login');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Link to="/" className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-emerald-600" />
            <span className="text-2xl font-bold text-gray-900 tracking-tight">WELLPath</span>
          </Link>
        </div>

        <div className="mt-4 flex justify-center">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
            <GraduationCap className="w-3.5 h-3.5 mr-1" />
            Student & Intern Portal
          </span>
        </div>

        <h2 className="mt-4 text-center text-3xl font-extrabold text-gray-900">
          Create student account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{' '}
          <Link to="/login" className="font-medium text-emerald-600 hover:text-emerald-500">
            sign in to your existing account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg">
        <div className="bg-white py-8 px-6 shadow-sm border border-gray-200 sm:rounded-2xl sm:px-10">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="mx-auto w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Account Created!</h3>
              <p className="text-sm text-gray-600 max-w-sm mx-auto">
                Welcome to WELLPath Student Internships. Redirecting you to the login screen...
              </p>
            </div>
          ) : (
            <form className="space-y-5" onSubmit={handleSubmit}>
              {/* Name fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">First Name</label>
                  <div className="relative rounded-lg shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                      <User className="h-4 w-4" />
                    </div>
                    <input
                      type="text"
                      name="firstName"
                      required
                      placeholder="e.g. Rahul"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="block w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">Last Name</label>
                  <div className="relative rounded-lg shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                      <User className="h-4 w-4" />
                    </div>
                    <input
                      type="text"
                      name="lastName"
                      required
                      placeholder="e.g. Verma"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="block w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">University / Personal Email</label>
                <div className="relative rounded-lg shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <Mail className="h-4 w-4" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="student@university.edu or personal email"
                    value={formData.email}
                    onChange={handleChange}
                    className="block w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">Password</label>
                <div className="relative rounded-lg shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <Lock className="h-4 w-4" />
                  </div>
                  <input
                    type="password"
                    name="password"
                    required
                    minLength={6}
                    placeholder="Minimum 6 characters"
                    value={formData.password}
                    onChange={handleChange}
                    className="block w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* University / Institution */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">University or Institute</label>
                <div className="relative rounded-lg shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <Building2 className="h-4 w-4" />
                  </div>
                  <input
                    type="text"
                    name="university"
                    required
                    placeholder="e.g. Delhi University / TISS / Christ University"
                    value={formData.university}
                    onChange={handleChange}
                    className="block w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Program & Year */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">Academic Program</label>
                  <div className="relative rounded-lg shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                      <BookOpen className="h-4 w-4" />
                    </div>
                    <select
                      name="program"
                      value={formData.program}
                      onChange={handleChange}
                      className="block w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white"
                    >
                      <option value="M.A. Clinical Psychology">M.A. Clinical Psychology</option>
                      <option value="M.Sc. Counseling Psychology">M.Sc. Counseling Psychology</option>
                      <option value="M.Phil Clinical Psychology">M.Phil Clinical Psychology</option>
                      <option value="Psy.D / Ph.D. Scholar">Psy.D / Ph.D. Scholar</option>
                      <option value="B.A./B.Sc. Psychology">B.A./B.Sc. Psychology (Senior)</option>
                      <option value="MSW (Mental Health)">MSW (Mental Health)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">Current Standing</label>
                  <select
                    name="yearOfStudy"
                    value={formData.yearOfStudy}
                    onChange={handleChange}
                    className="block w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white"
                  >
                    <option value="1st Year Postgraduate">1st Year Postgraduate</option>
                    <option value="Final Year Master's">Final Year Master's</option>
                    <option value="Internship / Practicum Semester">Internship Semester</option>
                    <option value="Recent Graduate (< 1 year)">Recent Graduate (&lt; 1 yr)</option>
                  </select>
                </div>
              </div>

              {/* Checkboxes */}
              <div className="space-y-3 pt-2">
                <div className="flex items-start">
                  <input
                    id="agreeStudentStatus"
                    name="agreeStudentStatus"
                    type="checkbox"
                    required
                    checked={formData.agreeStudentStatus}
                    onChange={handleChange}
                    className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded mt-0.5"
                  />
                  <label htmlFor="agreeStudentStatus" className="ml-2.5 block text-xs text-gray-600">
                    I confirm that I am currently enrolled in or recently completed an accredited psychology / mental health degree program.
                  </label>
                </div>

                <div className="flex items-start">
                  <input
                    id="agreeTerms"
                    name="agreeTerms"
                    type="checkbox"
                    required
                    checked={formData.agreeTerms}
                    onChange={handleChange}
                    className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded mt-0.5"
                  />
                  <label htmlFor="agreeTerms" className="ml-2.5 block text-xs text-gray-600">
                    I agree to the <Link to="/terms" className="text-emerald-600 hover:underline">Terms of Service</Link>, <Link to="/privacy" className="text-emerald-600 hover:underline">Privacy Policy</Link>, and student clinical observation guidelines.
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-md shadow-emerald-200 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors"
                >
                  Create Student Account
                  <ArrowRight className="ml-2 w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* Alternative links */}
          <div className="mt-8 border-t border-gray-200 pt-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
              <span>Looking for personal therapy?</span>
              <Link to="/signup" className="font-semibold text-emerald-600 hover:text-emerald-500">
                Sign up as a client &rarr;
              </Link>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500 mt-3 pt-3 border-t border-gray-100">
              <span>Are you a licensed practitioner?</span>
              <Link to="/for-professionals" className="font-semibold text-emerald-600 hover:text-emerald-500">
                Join our clinician network &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentSignup;
