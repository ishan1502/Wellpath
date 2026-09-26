import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card';
import { Mail, Shield } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const { user, isAuthenticated, loginWithEmailAndPassword, resetPassword, loginWithGoogle } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  React.useEffect(() => {
    if (user && isAuthenticated) {
      const role = user.role || 'patient';
      if (role === 'admin') navigate('/admin');
      else navigate(`/${role}/dashboard`);
    }
  }, [user, isAuthenticated, navigate]);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsLoading(true);
    try {
      await loginWithEmailAndPassword(email, password);
      // Navigation is handled by the useEffect watching isAuthenticated and user state
    } catch (err: any) {
      setLoginError(err.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsLoading(true);
    try {
      await resetPassword(email);
      setResetSent(true);
    } catch (err: any) {
      setLoginError(err.message || 'Failed to send reset link.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      await loginWithGoogle();
    } catch (err: any) {
      setLoginError(err.message || 'Google login failed.');
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async (demoRole: 'admin' | 'doctor' | 'patient' | 'student') => {
    const emailMap = {
      admin: 'admin@wellpath.demo',
      doctor: 'doctor@wellpath.demo',
      patient: 'patient@wellpath.demo',
      student: 'student@wellpath.demo'
    };
    const targetEmail = emailMap[demoRole];
    setEmail(targetEmail);
    setPassword('Wellpath2026!');
    setIsLoading(true);
    setLoginError('');
    try {
      await loginWithEmailAndPassword(targetEmail, 'Wellpath2026!');
      if (demoRole === 'admin') navigate('/admin');
      else navigate(`/${demoRole === 'doctor' ? 'professional' : demoRole}/dashboard`);
    } catch (err: any) {
      setLoginError(err.message || 'Demo login failed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 flex w-full">
      <div className="hidden lg:flex lg:w-1/2 bg-emerald-900 text-white flex-col justify-between p-12 relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] rounded-full bg-emerald-800/30 blur-3xl"></div>
          <div className="absolute top-[60%] -right-[10%] w-[60%] h-[60%] rounded-full bg-emerald-800/40 blur-3xl"></div>
        </div>

        <div className="relative z-10">
          <h1 className="text-5xl font-bold mb-6 leading-tight">Welcome Back to<br/><span className="text-emerald-400">WELLPath</span></h1>
          <p className="text-emerald-100/80 text-xl max-w-md leading-relaxed">
            Continue your journey to mental wellness. Professional support tailored specifically to you.
          </p>
        </div>
        
        <div className="relative z-10 bg-emerald-800/40 backdrop-blur-md p-8 rounded-3xl border border-emerald-700/50 shadow-xl">
          <div className="flex gap-2 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg key={star} className="w-5 h-5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <p className="text-emerald-50 italic text-lg mb-4">
            "The platform has completely transformed how I manage my practice and connect with patients."
          </p>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-emerald-700 flex items-center justify-center font-bold text-lg">
              SD
            </div>
            <div>
              <p className="font-semibold">Dr. Sarah Davis</p>
              <p className="text-sm text-emerald-200">Clinical Psychologist</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 lg:p-24 bg-gray-50">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-emerald-900 mb-2">Log in to your account</h2>
            <p className="text-emerald-700/70">Welcome back! Please enter your details.</p>
          </div>

          <Card className="border-0 shadow-sm rounded-3xl bg-white sm:shadow-xl transition-all duration-300">
            <CardContent className="p-8 space-y-6">
              <form id="email-form" onSubmit={isForgotPassword ? handleResetPassword : handleEmailLogin} className="space-y-5">
                {loginError && <div className="p-3 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-sm font-medium">{loginError}</div>}
                
                {isForgotPassword && resetSent ? (
                  <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 text-sm text-emerald-800">
                    <div className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-emerald-600 mt-0.5" />
                      <div className="space-y-2">
                        <span className="block leading-relaxed">If an account exists, a password reset link has been sent to <strong>{email}</strong>.</span>
                        <button type="button" onClick={() => { setIsForgotPassword(false); setResetSent(false); }} className="text-emerald-700 hover:text-emerald-900 font-semibold transition-colors">Return to login</button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-emerald-900">Email</label>
                      <Input
                        type="email"
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                        title="Please enter a valid email address"
                        className="rounded-xl border-gray-200 focus:border-emerald-500 focus:ring-emerald-500/20"
                      />
                    </div>
                    {!isForgotPassword && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <label className="text-sm font-bold text-emerald-900">Password</label>
                          <button type="button" onClick={() => setIsForgotPassword(true)} className="text-sm text-emerald-600 hover:text-emerald-800 font-semibold bg-transparent border-none p-0 cursor-pointer transition-colors">Forgot password?</button>
                        </div>
                        <Input
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          minLength={6}
                          className="rounded-xl border-gray-200 focus:border-emerald-500 focus:ring-emerald-500/20"
                        />
                      </div>
                    )}
                    {isForgotPassword && (
                      <button type="button" onClick={() => setIsForgotPassword(false)} className="text-sm text-gray-500 hover:text-emerald-700 font-medium bg-transparent border-none p-0 cursor-pointer transition-colors">Back to login</button>
                    )}
                  </>
                )}
              </form>

              <Button type="submit" form="email-form" className="w-full rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-6 shadow-sm hover:shadow-md transition-all duration-300" disabled={isLoading || (isForgotPassword && resetSent)}>
                {isLoading ? (isForgotPassword ? 'Sending...' : 'Signing in...') : (isForgotPassword ? 'Send Reset Link' : 'Log In')}
              </Button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-400 font-medium">Or continue with</span>
                </div>
              </div>

              <Button type="button" variant="outline" className="w-full rounded-xl py-6 flex items-center justify-center gap-3 border-gray-200 hover:bg-gray-50 hover:text-emerald-900 font-semibold transition-all duration-300" onClick={handleGoogleLogin} disabled={isLoading}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Sign in with Google
              </Button>

              <div className="text-center text-sm text-gray-500 pt-4">
                <span>New to WELLPath?</span>{' '}
                <Link to="/signup" className="text-emerald-600 hover:text-emerald-800 font-bold hover:underline transition-colors">Join here</Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
