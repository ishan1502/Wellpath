import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card';
import { Phone, Mail, Shield } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const { login, loginWithEmailAndPassword, resetPassword, loginWithGoogle, loginWithOTP } = useAuth();
  const [loginMethod, setLoginMethod] = useState<'email' | 'otp'>('email');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpError, setOtpError] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  const handleSendOTP = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) return;
    // Simulate OTP send
    setOtpSent(true);
    setOtp('');
    setOtpError('');
  };

  const handleOTPLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp !== '123456') {
      setOtpError('Invalid OTP. Try 123456 for demo.');
      return;
    }
    setIsLoading(true);
    try {
      await loginWithOTP(phone, otp);
      routeUser('patient@wellpath.demo');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      await loginWithGoogle();
      routeUser('patient@wellpath.demo');
    } finally {
      setIsLoading(false);
    }
  };

  const demoLogin = async (roleEmail: string) => {
    setIsLoading(true);
    try {
      await login(roleEmail);
      routeUser(roleEmail);
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

          {/* Tab switcher */}
          <div className="flex border-b mb-4 mx-6">
            <button
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-sm font-medium text-center transition-colors ${loginMethod === 'email' ? 'border-b-2 border-primary text-primary' : 'text-text-muted hover:text-text'}`}
              onClick={() => { setLoginMethod('email'); setOtpSent(false); setOtpError(''); }}
            >
              <Mail className="w-3.5 h-3.5" /> Email
            </button>
            <button
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-sm font-medium text-center transition-colors ${loginMethod === 'otp' ? 'border-b-2 border-primary text-primary' : 'text-text-muted hover:text-text'}`}
              onClick={() => { setLoginMethod('otp'); setOtpSent(false); setOtpError(''); }}
            >
              <Phone className="w-3.5 h-3.5" /> Phone OTP
            </button>
          </div>

          <CardContent className="space-y-4">
            {loginMethod === 'email' ? (
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
            ) : (
              <div className="space-y-4">
                {/* Step 1: Enter phone */}
                <form id="phone-form" onSubmit={handleSendOTP} className="space-y-3">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Phone Number</label>
                    <div className="flex gap-2">
                      <Input
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        className="flex-1"
                      />
                      <Button
                        type="submit"
                        variant={otpSent ? 'outline' : 'default'}
                        className="whitespace-nowrap"
                        disabled={!phone}
                      >
                        {otpSent ? 'Resend' : 'Send OTP'}
                      </Button>
                    </div>
                  </div>
                </form>

                {/* Step 2: Enter OTP */}
                {otpSent && (
                  <form id="otp-form" onSubmit={handleOTPLogin} className="space-y-3">
                    <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 text-sm text-emerald-700">
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4" />
                        <span>OTP sent to {phone}. For demo, use <strong>123456</strong>.</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Enter OTP</label>
                      <Input
                        type="text"
                        placeholder="6-digit OTP"
                        value={otp}
                        onChange={(e) => { setOtp(e.target.value); setOtpError(''); }}
                        maxLength={6}
                        required
                      />
                      {otpError && <p className="text-xs text-red-500">{otpError}</p>}
                    </div>
                  </form>
                )}
              </div>
            )}

            {/* Google Button */}
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
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            {loginMethod === 'email' ? (
              <Button type="submit" form="email-form" className="w-full" disabled={isLoading || (isForgotPassword && resetSent)}>
                {isLoading ? (isForgotPassword ? 'Sending...' : 'Signing in...') : (isForgotPassword ? 'Send Reset Link' : 'Log In')}
              </Button>
            ) : otpSent ? (
              <Button type="submit" form="otp-form" className="w-full" disabled={isLoading || !otp}>
                {isLoading ? 'Verifying...' : 'Verify & Log In'}
              </Button>
            ) : (
              <Button type="submit" form="phone-form" className="w-full" disabled={!phone}>
                Send OTP
              </Button>
            )}
            <div className="text-center text-sm text-text-muted space-x-2">
              <span>New to WELLPath?</span>
              <a href="/signup" className="text-primary hover:underline font-semibold">Join here</a>
            </div>
          </CardFooter>
        </Card>

        {/* Demo Access */}
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="text-lg flex items-center justify-center gap-2">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse"></span>
              DEMO ACCESS
            </CardTitle>
            <CardDescription className="text-center">One-click login for demonstration</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col space-y-2">
            <Button variant="outline" onClick={() => demoLogin('patient@wellpath.demo')} disabled={isLoading}>Login as Patient</Button>
            <Button variant="outline" onClick={() => demoLogin('doctor@wellpath.demo')} disabled={isLoading}>Login as Professional</Button>
            <Button variant="outline" onClick={() => demoLogin('student@wellpath.demo')} disabled={isLoading}>Login as Student</Button>
            <Button variant="outline" onClick={() => demoLogin('admin@wellpath.demo')} disabled={isLoading}>Login as Admin</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
