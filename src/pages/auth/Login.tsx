import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    login(email);
    routeUser(email);
  };

  const demoLogin = (roleEmail: string) => {
    login(roleEmail);
    routeUser(roleEmail);
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
          <form onSubmit={handleLogin}>
            <CardHeader>
              <CardTitle>Log In</CardTitle>
              <CardDescription>Enter your credentials to access your account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input 
                  type="email" 
                  placeholder="name@example.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Password</label>
                  <a href="#" className="text-xs text-primary hover:underline">Forgot password?</a>
                </div>
                <Input 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full">Log In</Button>
              <div className="text-center text-sm text-text-muted space-x-2">
                <span>New to WELLPath?</span>
                <a href="/signup" className="text-primary hover:underline">Patient</a>
                <span>|</span>
                <a href="/professional/signup" className="text-primary hover:underline">Professional</a>
                <span>|</span>
                <a href="/student/signup" className="text-primary hover:underline">Student</a>
              </div>
            </CardFooter>
          </form>
        </Card>

        {/* Demo Access Panel */}
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="text-lg flex items-center justify-center gap-2">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse"></span>
              DEMO ACCESS
            </CardTitle>
            <CardDescription className="text-center">One-click login for demonstration</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col space-y-2">
            <Button variant="outline" onClick={() => demoLogin('patient@wellpath.demo')}>
              Login as Patient
            </Button>
            <Button variant="outline" onClick={() => demoLogin('doctor@wellpath.demo')}>
              Login as Professional
            </Button>
            <Button variant="outline" onClick={() => demoLogin('student@wellpath.demo')}>
              Login as Student
            </Button>
            <Button variant="outline" onClick={() => demoLogin('admin@wellpath.demo')}>
              Login as Admin
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
