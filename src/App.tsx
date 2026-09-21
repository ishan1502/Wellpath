import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { useAuth } from './hooks/useAuth';

// Layouts
import PublicLayout from './layouts/PublicLayout';
import PatientLayout from './layouts/PatientLayout';
import ProfessionalLayout from './layouts/ProfessionalLayout';
import AdminLayout from './layouts/AdminLayout';
import StudentLayout from './layouts/StudentLayout';

// Auth
import Login from './pages/auth/Login';

// Mock empty pages for routing until implemented
const Placeholder = ({ title }: { title: string }) => (
  <div className="p-8">
    <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
    <p className="text-gray-500 mt-2">This page is under construction.</p>
  </div>
);

const PendingVerification = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
    <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-sm border border-gray-200 text-center">
      <div className="mx-auto w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
        <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Verification Pending</h2>
      <p className="text-gray-600 mb-6">Your documents are currently being reviewed by our admin team. Once approved, you will have full access to your professional dashboard.</p>
      <a href="/" className="text-primary font-medium hover:underline">Return to Home</a>
    </div>
  </div>
);

// Protected Route wrappers
const ProtectedRoute = ({ children, allowedRoles }: { children: React.ReactNode, allowedRoles: string[] }) => {
  const { user } = useAuth();
  
  if (!user) return <Navigate to="/login" replace />;
  
  if (!allowedRoles.includes(user.role)) {
    // Redirect to correct dashboard if logged in but wrong role
    if (user.role === 'admin') return <Navigate to="/admin" replace />;
    if (user.role === 'professional') return <Navigate to="/professional/dashboard" replace />;
    if (user.role === 'student') return <Navigate to="/student/dashboard" replace />;
    return <Navigate to="/patient/dashboard" replace />;
  }

  // Intercept pending professionals for professional routes only
  if (user.role === 'professional' && (user as any).verificationStatus === 'pending') {
    return <PendingVerification />;
  }
  
  return <>{children}</>;
};

// Lazy loading or direct imports for public pages
const Home = React.lazy(() => import('./pages/public/Home').catch(() => ({ default: () => <Placeholder title="Home" /> })));
const FindProfessional = React.lazy(() => import('./pages/public/FindProfessional').catch(() => ({ default: () => <Placeholder title="Find Professional" /> })));
const ProfessionalProfile = React.lazy(() => import('./pages/public/ProfessionalProfile').catch(() => ({ default: () => <Placeholder title="Professional Profile" /> })));
const Matching = React.lazy(() => import('./pages/public/Matching').catch(() => ({ default: () => <Placeholder title="Matching Quiz" /> })));

// Dashboards
const PatientDashboard = React.lazy(() => import('./pages/patient/Dashboard').catch(() => ({ default: () => <Placeholder title="Patient Dashboard" /> })));
const Appointments = React.lazy(() => import('./pages/patient/Appointments').catch(() => ({ default: () => <Placeholder title="My Appointments" /> })));
const Messages = React.lazy(() => import('./pages/patient/Messages').catch(() => ({ default: () => <Placeholder title="Messages" /> })));
const Saved = React.lazy(() => import('./pages/patient/Saved').catch(() => ({ default: () => <Placeholder title="Saved Professionals" /> })));

// Auth Pages
const Login = React.lazy(() => import('./pages/auth/Login').catch(() => ({ default: () => <Placeholder title="Login" /> })));
const Signup = React.lazy(() => import('./pages/auth/Signup').catch(() => ({ default: () => <Placeholder title="Sign Up" /> })));

const ProfessionalDashboard = React.lazy(() => import('./pages/professional/Dashboard').catch(() => ({ default: () => <Placeholder title="Professional Dashboard" /> })));
const AdminDashboard = React.lazy(() => import('./pages/admin/Dashboard').catch(() => ({ default: () => <Placeholder title="Admin Dashboard" /> })));
const StudentDashboard = React.lazy(() => import('./pages/student/Dashboard').catch(() => ({ default: () => <Placeholder title="Student Dashboard" /> })));
const FindInternship = React.lazy(() => import('./pages/student/FindInternship').catch(() => ({ default: () => <Placeholder title="Find Internship" /> })));

const ProCalendar = React.lazy(() => import('./pages/professional/Calendar').catch(() => ({ default: () => <Placeholder title="Calendar" /> })));
const ProAppointments = React.lazy(() => import('./pages/professional/Appointments').catch(() => ({ default: () => <Placeholder title="Appointments" /> })));
const ProInterns = React.lazy(() => import('./pages/professional/Interns').catch(() => ({ default: () => <Placeholder title="Interns" /> })));
const ProMessages = React.lazy(() => import('./pages/professional/Messages').catch(() => ({ default: () => <Placeholder title="Messages" /> })));
const ProProfileEditor = React.lazy(() => import('./pages/professional/ProfileEditor').catch(() => ({ default: () => <Placeholder title="Profile Editor" /> })));
const ProEarnings = React.lazy(() => import('./pages/professional/Earnings').catch(() => ({ default: () => <Placeholder title="Earnings" /> })));
const ProAnalytics = React.lazy(() => import('./pages/professional/Analytics').catch(() => ({ default: () => <Placeholder title="Analytics" /> })));

// Admin Pages
const Users = React.lazy(() => import('./pages/admin/Users').catch(() => ({ default: () => <Placeholder title="Users" /> })));
const Professionals = React.lazy(() => import('./pages/admin/Professionals').catch(() => ({ default: () => <Placeholder title="Professionals" /> })));
const VerificationQueue = React.lazy(() => import('./pages/admin/VerificationQueue').catch(() => ({ default: () => <Placeholder title="Verification Queue" /> })));
const AdminAppointments = React.lazy(() => import('./pages/admin/Appointments').catch(() => ({ default: () => <Placeholder title="Appointments" /> })));
const Payments = React.lazy(() => import('./pages/admin/Payments').catch(() => ({ default: () => <Placeholder title="Payments" /> })));
const Reviews = React.lazy(() => import('./pages/admin/Reviews').catch(() => ({ default: () => <Placeholder title="Reviews" /> })));
const Content = React.lazy(() => import('./pages/admin/Content').catch(() => ({ default: () => <Placeholder title="Content" /> })));

const HowItWorks = React.lazy(() => import('./pages/public/HowItWorks').catch(() => ({ default: () => <div className="p-8">Loading...</div> })));
const Resources = React.lazy(() => import('./pages/public/Resources').catch(() => ({ default: () => <div className="p-8">Loading...</div> })));
const AboutUs = React.lazy(() => import('./pages/public/About').catch(() => ({ default: () => <div className="p-8">Loading...</div> })));
const ForProfessionals = React.lazy(() => import('./pages/public/ForProfessionals').catch(() => ({ default: () => <div className="p-8">Loading...</div> })));
const PatientProfile = React.lazy(() => import('./pages/patient/Profile').catch(() => ({ default: () => <div className="p-8">Loading...</div> })));
const StudentApplications = React.lazy(() => import('./pages/student/Applications').catch(() => ({ default: () => <div className="p-8">Loading...</div> })));
const ProClients = React.lazy(() => import('./pages/professional/Clients').catch(() => ({ default: () => <div className="p-8">Loading...</div> })));
const ProReviews = React.lazy(() => import('./pages/professional/Reviews').catch(() => ({ default: () => <div className="p-8">Loading...</div> })));
const ProSettings = React.lazy(() => import('./pages/professional/Settings').catch(() => ({ default: () => <div className="p-8">Loading...</div> })));
const AdminSupport = React.lazy(() => import('./pages/admin/Support').catch(() => ({ default: () => <div className="p-8">Loading...</div> })));
const AdminAnalytics = React.lazy(() => import('./pages/admin/Analytics').catch(() => ({ default: () => <div className="p-8">Loading...</div> })));
const AdminSettings = React.lazy(() => import('./pages/admin/Settings').catch(() => ({ default: () => <div className="p-8">Loading...</div> })));
const AdminEvents = React.lazy(() => import('./pages/admin/Events').catch(() => ({ default: () => <Placeholder title="Admin Events" /> })));

// New Pages
const JobBoard = React.lazy(() => import('./pages/public/JobBoard').catch(() => ({ default: () => <Placeholder title="Jobs & Internships" /> })));
const Events = React.lazy(() => import('./pages/public/Events').catch(() => ({ default: () => <Placeholder title="Events & Webinars" /> })));
const PostJob = React.lazy(() => import('./pages/professional/PostJob').catch(() => ({ default: () => <Placeholder title="Post Job/Internship" /> })));
const PostEvent = React.lazy(() => import('./pages/professional/PostEvent').catch(() => ({ default: () => <Placeholder title="Post Event" /> })));

// Chatbot
const ChatBot = React.lazy(() => import('./components/chatbot/ChatBot').catch(() => ({ default: () => <></> })));

function App() {

  return (
    <AuthProvider>
      <Router>
        <React.Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<PublicLayout />}>
              <Route index element={<Home />} />
              <Route path="find-professional" element={<FindProfessional />} />
              <Route path="professionals/:id" element={<ProfessionalProfile />} />
              <Route path="matching" element={<Matching />} />
              <Route path="how-it-works" element={<HowItWorks />} />
              <Route path="resources" element={<Resources />} />
              <Route path="about" element={<AboutUs />} />
              <Route path="for-professionals" element={<ForProfessionals />} />
              <Route path="jobs" element={<JobBoard />} />
              <Route path="events" element={<Events />} />
            </Route>
            
            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            {/* Patient Routes */}
            <Route path="/patient" element={
              <ProtectedRoute allowedRoles={['patient']}>
                <PatientLayout />
              </ProtectedRoute>
            }>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<PatientDashboard />} />
              <Route path="appointments" element={<Appointments />} />
              <Route path="messages" element={<Messages />} />
              <Route path="saved" element={<Saved />} />
              <Route path="profile" element={<PatientProfile />} />
              
              {/* Shared pages inside Patient space */}
              <Route path="matching" element={<Matching />} />
              <Route path="find-professional" element={<FindProfessional />} />
              <Route path="professionals/:id" element={<ProfessionalProfile />} />
              <Route path="resources" element={<Resources />} />
            </Route>

            {/* Student Routes */}
            <Route path="/student" element={
              <ProtectedRoute allowedRoles={['student']}>
                <StudentLayout />
              </ProtectedRoute>
            }>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<StudentDashboard />} />
              <Route path="find-internship" element={<FindInternship />} />
              <Route path="applications" element={<StudentApplications />} />
              <Route path="messages" element={<Messages />} />
              
              {/* Shared pages inside Student space */}
              <Route path="matching" element={<Matching />} />
              <Route path="find-professional" element={<FindProfessional />} />
              <Route path="professionals/:id" element={<ProfessionalProfile />} />
              <Route path="resources" element={<Resources />} />
            </Route>

            {/* Professional Routes */}
            <Route path="/professional" element={
              <ProtectedRoute allowedRoles={['professional']}>
                <ProfessionalLayout />
              </ProtectedRoute>
            }>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<ProfessionalDashboard />} />
              <Route path="calendar" element={<ProCalendar />} />
              <Route path="appointments" element={<ProAppointments />} />
              <Route path="interns" element={<ProInterns />} />
              <Route path="clients" element={<ProClients />} />
              <Route path="messages" element={<ProMessages />} />
              <Route path="profile" element={<ProProfileEditor />} />
              <Route path="reviews" element={<ProReviews />} />
              <Route path="earnings" element={<ProEarnings />} />
              <Route path="analytics" element={<ProAnalytics />} />
              <Route path="settings" element={<ProSettings />} />
              <Route path="post-job" element={<PostJob />} />
              <Route path="post-event" element={<PostEvent />} />
            </Route>

            {/* Admin Routes */}
            <Route path="/admin" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminLayout />
              </ProtectedRoute>
            }>
              <Route index element={<AdminDashboard />} />
              <Route path="users" element={<Users />} />
              <Route path="professionals" element={<Professionals />} />
              <Route path="verification" element={<VerificationQueue />} />
              <Route path="events" element={<AdminEvents />} />
              <Route path="appointments" element={<AdminAppointments />} />
              <Route path="payments" element={<Payments />} />
              <Route path="reviews" element={<Reviews />} />
              <Route path="content" element={<Content />} />
              <Route path="support" element={<AdminSupport />} />
              <Route path="analytics" element={<AdminAnalytics />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <ChatBot />
        </React.Suspense>
      </Router>
    </AuthProvider>

  );
}

export default App;
