import React from 'react';
import { Link } from 'react-router-dom';
import { HeartPulse, Stethoscope, GraduationCap, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';

export default function SignupGateway() {
  const options = [
    {
      title: "I'm looking for support",
      description: "Find a professional therapist and manage your mental health journey.",
      icon: HeartPulse,
      path: "/patient/signup",
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      border: "border-emerald-200"
    },
    {
      title: "I want to offer my services",
      description: "Join our network of verified professionals and reach more patients.",
      icon: Stethoscope,
      path: "/professional/signup",
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-200"
    },
    {
      title: "I'm looking for internships",
      description: "Connect with professionals offering internship opportunities.",
      icon: GraduationCap,
      path: "/student/signup",
      color: "text-purple-600",
      bg: "bg-purple-50",
      border: "border-purple-200"
    }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 py-12">
      <div className="w-full max-w-3xl space-y-8">
        <div className="text-center">
          <Link to="/" className="inline-block text-3xl font-bold text-primary mb-6">WELLPath</Link>
          <h1 className="text-3xl font-bold text-gray-900">How would you like to join?</h1>
          <p className="text-text-muted mt-2 text-lg">Select the account type that best describes you.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {options.map((option, idx) => (
            <Link key={idx} to={option.path} className="block group">
              <Card className="h-full transition-all duration-200 hover:shadow-md hover:border-primary/50 relative overflow-hidden">
                <CardHeader className="text-center pb-2">
                  <div className={`mx-auto w-16 h-16 rounded-2xl flex items-center justify-center mb-4 ${option.bg} border ${option.border} group-hover:scale-105 transition-transform`}>
                    <option.icon className={`w-8 h-8 ${option.color}`} />
                  </div>
                  <CardTitle className="text-lg">{option.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-sm">{option.description}</CardDescription>
                  <div className="mt-6 flex items-center justify-center text-sm font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                    Get Started <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-text-muted">
            Already have an account? <Link to="/login" className="text-primary font-semibold hover:underline">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
