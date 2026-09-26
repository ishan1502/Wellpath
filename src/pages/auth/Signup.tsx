import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card';

export default function Signup() {
  const navigate = useNavigate();
  const { user, isAuthenticated, signup, loginWithGoogle } = useAuth();
  
  React.useEffect(() => {
    if (user && isAuthenticated) {
      const role = user.role || 'patient';
      if (role === 'admin') navigate('/admin');
      else navigate(`/${role}/dashboard`);
    }
  }, [user, isAuthenticated, navigate]);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: '' as 'patient' | 'professional' | 'student' | ''
  });
  
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.role) {
      setError('Please select how you want to join (Patient, Professional, or Student).');
      return;
    }
    
    setError('');
    setIsLoading(true);

    try {
      await signup(
        formData.email,
        formData.password,
        formData.firstName,
        formData.lastName,
        formData.role
      );
      
      alert('Registration successful! Please log in.');
      navigate('/login');
    } catch (err: any) {
      setError(err.message || 'Failed to create account.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    if (!formData.role) {
      setError('Please select how you want to join (Patient, Professional, or Student) before continuing with Google.');
      return;
    }
    
    setIsLoading(true);
    setError('');
    try {
      localStorage.setItem('pending_signup_role', formData.role);
      await loginWithGoogle();
    } catch (err: any) {
      setError(err.message || 'Google signup failed.');
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 flex w-full">
      <div className="hidden lg:flex lg:w-1/2 bg-emerald-900 text-white flex-col justify-between p-12 relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-full h-full overflow-hidden z-0">
          <div className="absolute top-[10%] -right-[20%] w-[70%] h-[70%] rounded-full bg-emerald-800/30 blur-3xl"></div>
          <div className="absolute -bottom-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-emerald-800/40 blur-3xl"></div>
        </div>

        <div className="relative z-10 mt-12">
          <h1 className="text-5xl font-bold mb-6 leading-tight">Join Our Community of<br/><span className="text-emerald-400">Care</span></h1>
          <p className="text-emerald-100/80 text-xl max-w-md leading-relaxed">
            Create an account to access tailored professional support, resources, and a path to better mental wellness.
          </p>
        </div>
        
        <div className="relative z-10 bg-emerald-800/40 backdrop-blur-md p-8 rounded-3xl border border-emerald-700/50 shadow-xl mb-12">
          <div className="flex gap-4 items-center">
             <div className="w-16 h-16 rounded-2xl bg-emerald-700 flex items-center justify-center">
                <svg className="w-8 h-8 text-emerald-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
             </div>
             <div>
                <h3 className="text-xl font-bold text-white mb-1">10,000+ Members</h3>
                <p className="text-emerald-200 text-sm">Patients, professionals, and students growing together.</p>
             </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 bg-gray-50 overflow-y-auto">
        <div className="w-full max-w-xl py-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-emerald-900 mb-2">Create your account</h2>
            <p className="text-emerald-700/70">Join our mental health platform today.</p>
          </div>

          <Card className="border-0 shadow-sm rounded-3xl bg-white sm:shadow-xl transition-all duration-300">
            <CardContent className="p-8 space-y-6">
              <form id="signup-form" onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-sm font-semibold">
                    {error}
                  </div>
                )}

                {/* Role Selection */}
                <div className="space-y-3">
                  <label className="text-sm font-bold text-emerald-900">I want to join as a:</label>
                  <div className="grid grid-cols-3 gap-3">
                    {(['patient', 'professional', 'student'] as const).map((r) => (
                      <label
                        key={r}
                        className={`
                          cursor-pointer flex flex-col items-center justify-center rounded-2xl border-2 p-4 text-sm font-bold transition-all duration-300
                          ${formData.role === r 
                            ? 'border-emerald-600 bg-emerald-50 text-emerald-800 shadow-sm' 
                            : 'border-gray-100 hover:border-emerald-200 hover:bg-emerald-50/50 text-gray-500 hover:text-emerald-700'
                          }
                        `}
                      >
                        <input
                          type="radio"
                          name="role"
                          value={r}
                          checked={formData.role === r}
                          onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value as any }))}
                          className="sr-only"
                        />
                        <span className="capitalize">{r}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-emerald-900">First Name</label>
                    <Input
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      placeholder="John"
                      className="rounded-xl border-gray-200 focus:border-emerald-500 focus:ring-emerald-500/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-emerald-900">Last Name</label>
                    <Input
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      placeholder="Doe"
                      className="rounded-xl border-gray-200 focus:border-emerald-500 focus:ring-emerald-500/20"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-emerald-900">Email</label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="name@example.com"
                    className="rounded-xl border-gray-200 focus:border-emerald-500 focus:ring-emerald-500/20"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-emerald-900">Password</label>
                  <Input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    minLength={6}
                    className="rounded-xl border-gray-200 focus:border-emerald-500 focus:ring-emerald-500/20"
                  />
                  <p className="text-xs text-gray-500 font-medium">Must be at least 6 characters.</p>
                </div>
              </form>

              <Button type="submit" form="signup-form" className="w-full rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-6 shadow-sm hover:shadow-md transition-all duration-300" disabled={isLoading}>
                {isLoading ? 'Creating account...' : 'Create Account'}
              </Button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-400 font-medium">Or continue with</span>
                </div>
              </div>

              <Button 
                type="button" 
                variant="outline" 
                className="w-full rounded-xl py-6 flex items-center justify-center gap-3 border-gray-200 hover:bg-gray-50 hover:text-emerald-900 font-semibold transition-all duration-300" 
                onClick={handleGoogleSignup} 
                disabled={isLoading}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Sign up with Google
              </Button>

              <div className="text-center text-sm text-gray-500 pt-2">
                <span>Already have an account?</span>{' '}
                <Link to="/login" className="text-emerald-600 hover:text-emerald-800 font-bold hover:underline transition-colors">Log in</Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
