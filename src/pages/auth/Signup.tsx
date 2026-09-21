import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card';

export default function Signup() {
  const navigate = useNavigate();
  const { signup, loginWithGoogle } = useAuth();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'patient' as 'patient' | 'professional' | 'student'
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
    <div className="min-h-screen flex items-center justify-center bg-background p-4 py-12">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Link to="/" className="inline-block text-3xl font-bold text-primary mb-2">WELLPath</Link>
          <h1 className="text-2xl font-bold text-gray-900">Create your account</h1>
          <p className="text-text-muted mt-2">Join our mental health platform</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Sign Up</CardTitle>
            <CardDescription>Enter your details to get started</CardDescription>
          </CardHeader>
          <CardContent>
            <form id="signup-form" onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-md text-sm font-medium">
                  {error}
                </div>
              )}

              {/* Role Selection */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-700">I want to join as a:</label>
                <div className="grid grid-cols-3 gap-3">
                  {(['patient', 'professional', 'student'] as const).map((r) => (
                    <label
                      key={r}
                      className={`
                        cursor-pointer flex flex-col items-center justify-center rounded-lg border-2 p-3 text-sm font-medium transition-all
                        ${formData.role === r 
                          ? 'border-primary bg-primary/5 text-primary' 
                          : 'border-gray-200 hover:bg-gray-50 text-gray-600'
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

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">First Name</label>
                  <Input
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    placeholder="John"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Last Name</label>
                  <Input
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="name@example.com"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Password</label>
                <Input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength={6}
                />
                <p className="text-xs text-text-muted">Must be at least 6 characters.</p>
              </div>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <Button 
              type="button" 
              variant="outline" 
              className="w-full flex items-center justify-center gap-2" 
              onClick={handleGoogleSignup} 
              disabled={isLoading}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Sign up with Google
            </Button>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" form="signup-form" className="w-full" disabled={isLoading}>
              {isLoading ? 'Creating account...' : 'Create Account'}
            </Button>
            <div className="text-center text-sm text-text-muted space-x-2">
              <span>Already have an account?</span>
              <Link to="/login" className="text-primary hover:underline font-semibold">Log in</Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
