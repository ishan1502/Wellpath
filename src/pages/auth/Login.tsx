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
      routeUser(email);
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

  const routeUser = (email: string) => {
    if (email.includes('admin')) navigate('/admin');
    else if (email.includes('student')) navigate('/student/dashboard');
    else if (email.includes('doctor')) navigate('/professional/dashboard');
    else navigate('/patient/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-primary">WELLPath</h1>
          <p className="text-text-muted mt-2">Welcome back</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Log In</CardTitle>
            <CardDescription>Access your WELLPath account</CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <form id="email-form" onSubmit={isForgotPassword ? handleResetPassword : handleEmailLogin} className="space-y-4">
              {loginError && <p className="text-xs text-red-500 font-medium">{loginError}</p>}
              
              {isForgotPassword && resetSent ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 text-sm text-emerald-700">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    <span>If an account exists, a password reset link has been sent to {email}.</span>
                  </div>
                  <button type="button" onClick={() => { setIsForgotPassword(false); setResetSent(false); }} className="mt-2 text-primary hover:underline text-xs font-medium">Return to login</button>
                </div>
              ) : (
                <>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <Input
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                      title="Please enter a valid email address"
                    />
                  </div>
                  {!isForgotPassword && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium">Password</label>
                        <button type="button" onClick={() => setIsForgotPassword(true)} className="text-xs text-primary hover:underline bg-transparent border-none p-0 cursor-pointer">Forgot password?</button>
                      </div>
                      <Input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={6}
                      />
                    </div>
                  )}
                  {isForgotPassword && (
                    <button type="button" onClick={() => setIsForgotPassword(false)} className="text-xs text-text-muted hover:text-text bg-transparent border-none p-0 cursor-pointer">Back to login</button>
                  )}
                </>
              )}
            </form>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <Button type="button" variant="outline" className="w-full flex items-center justify-center gap-2" onClick={handleGoogleLogin} disabled={isLoading}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Sign in with Google
            </Button>

            {/* 1-Click Demo Accounts */}
            <div className="pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">⚡ 1-Click Demo Logins</span>
                <span className="text-[10px] text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded font-medium">Instant Test</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleDemoLogin('doctor')}
                  disabled={isLoading}
                  className="p-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 border border-emerald-200 transition-colors disabled:opacity-50 text-left"
                >
                  <span>🩺</span>
                  <div>
                    <div className="font-bold">Doctor</div>
                    <div className="text-[10px] font-normal text-emerald-600">Sarah Jenkins</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => handleDemoLogin('patient')}
                  disabled={isLoading}
                  className="p-2.5 bg-blue-50 hover:bg-blue-100 text-blue-800 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 border border-blue-200 transition-colors disabled:opacity-50 text-left"
                >
                  <span>👤</span>
                  <div>
                    <div className="font-bold">Patient</div>
                    <div className="text-[10px] font-normal text-blue-600">Alex Morgan</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => handleDemoLogin('student')}
                  disabled={isLoading}
                  className="p-2.5 bg-amber-50 hover:bg-amber-100 text-amber-800 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 border border-amber-200 transition-colors disabled:opacity-50 text-left"
                >
                  <span>🎓</span>
                  <div>
                    <div className="font-bold">Student</div>
                    <div className="text-[10px] font-normal text-amber-600">Jordan Lee</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => handleDemoLogin('admin')}
                  disabled={isLoading}
                  className="p-2.5 bg-purple-50 hover:bg-purple-100 text-purple-800 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 border border-purple-200 transition-colors disabled:opacity-50 text-left"
                >
                  <span>🛡️</span>
                  <div>
                    <div className="font-bold">Admin</div>
                    <div className="text-[10px] font-normal text-purple-600">All Portals</div>
                  </div>
                </button>
              </div>
              <p className="text-[11px] text-gray-400 text-center mt-2.5">
                Password: <span className="font-mono text-gray-700 bg-gray-100 px-1.5 py-0.5 rounded font-medium">Wellpath2026!</span>
              </p>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" form="email-form" className="w-full" disabled={isLoading || (isForgotPassword && resetSent)}>
              {isLoading ? (isForgotPassword ? 'Sending...' : 'Signing in...') : (isForgotPassword ? 'Send Reset Link' : 'Log In')}
            </Button>
            <div className="text-center text-sm text-text-muted space-x-2">
              <span>New to WELLPath?</span>
              <Link to="/signup" className="text-primary hover:underline font-semibold">Join here</Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
