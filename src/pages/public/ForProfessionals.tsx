import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle2, 
  ArrowRight, 
  Calendar, 
  Users, 
  ShieldCheck, 
  DollarSign, 
  Video, 
  Sparkles, 
  ChevronDown, 
  ChevronUp,
  GraduationCap,
  Briefcase
} from 'lucide-react';

const ForProfessionals = () => {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const benefits = [
    {
      icon: Users,
      title: 'High-Intent Client Matches',
      description: 'Our intelligent matching algorithm connects you with clients whose specific needs (anxiety, relationships, trauma) match your clinical expertise and modalities.'
    },
    {
      icon: Calendar,
      title: 'Zero Admin & Scheduling Hassle',
      description: 'Real-time calendar synchronization, automated client reminders, and self-serve rescheduling eliminate endless back-and-forth coordination.'
    },
    {
      icon: DollarSign,
      title: 'Set Your Own Fees',
      description: 'Retain complete financial autonomy. You set your per-session rate and receive automated bank transfers securely.'
    },
    {
      icon: Video,
      title: 'HIPAA-Grade Telehealth',
      description: 'Conduct browser-based, encrypted telehealth sessions with zero downloads required for clients, or offer in-person consultations.'
    },
    {
      icon: GraduationCap,
      title: 'Supervise Interns',
      description: 'Choose to accept master’s student trainees. Review student motivation statements, assign clinical observation hours, and shape the next generation.'
    },
    {
      icon: ShieldCheck,
      title: 'Verified Practitioner Badge',
      description: 'Stand out in a crowded market. Patients trust practitioners who have passed our rigorous clinical and license credential checks.'
    }
  ];

  const steps = [
    {
      step: '1',
      title: 'Apply & Verify',
      description: 'Submit your license and qualifications for our clinical team to review (typically 48 hours).'
    },
    {
      step: '2',
      title: 'Build Your Profile',
      description: 'Showcase your expertise, therapeutic approach, and set your availability calendar.'
    },
    {
      step: '3',
      title: 'Accept Clients',
      description: 'Start receiving matched clients immediately. Review their intake forms before the first session.'
    }
  ];

  const faqs = [
    {
      question: 'How do payouts work?',
      answer: 'You are paid via direct bank transfer every Friday for all sessions completed in the prior week. We handle all payment processing and invoicing on your behalf.'
    },
    {
      question: 'Do I have to commit to a minimum number of hours?',
      answer: 'No. You are completely in control of your schedule. You can open as little as 2 hours a week or run a full-time practice of 40 hours a week on WellPath.'
    },
    {
      question: 'How are clients matched to me?',
      answer: 'Clients fill out a detailed intake questionnaire covering their symptoms, goals, and demographic preferences. Our algorithm scores these against your listed specialties and modalities.'
    },
    {
      question: 'Can I offer in-person sessions?',
      answer: 'Yes! If you have a physical clinic, you can list your address. Clients can filter by location and specifically book in-person sessions with you.'
    }
  ];

  return (
    <div className="flex flex-col bg-surface overflow-x-hidden pb-20">
      {/* Hero Section */}
      <section className="relative bg-[#2B4B3F] pt-24 pb-32 overflow-hidden text-white">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=2000" alt="Professional at desk" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#2B4B3F] via-[#2B4B3F]/90 to-transparent"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface/10 backdrop-blur-md border border-white/20 text-primary-muted font-medium mb-8">
              <Briefcase className="w-4 h-4" />
              <span>For Mental Health Professionals</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
              Focus on <span className="text-primary-muted-foreground">providing care.</span><br/>We'll handle the rest.
            </h1>
            <p className="text-xl text-primary-muted/90 mb-10 leading-relaxed">
              Join thousands of top-tier therapists and psychiatrists running their successful private practices on WellPath's all-in-one platform.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/signup?role=professional" className="inline-flex justify-center items-center px-8 py-4 bg-primary hover:bg-primary text-foreground rounded-xl font-bold text-lg transition-colors shadow-lg">
                Apply Now <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link to="/about" className="inline-flex justify-center items-center px-8 py-4 bg-transparent border-2 border-primary/50 hover:border-primary-muted-foreground text-white rounded-xl font-bold text-lg transition-colors">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-24 bg-background -mt-10 rounded-t-[3rem] relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">Everything you need to thrive</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">We provide the tools, the clients, and the infrastructure. You provide the care.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, idx) => {
              const Icon = benefit.icon;
              return (
                <div key={idx} className="bg-surface p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 group">
                  <div className="w-14 h-14 bg-primary-muted rounded-lg flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{benefit.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Start seeing clients in days, not months.</h2>
              <p className="text-lg text-muted-foreground mb-12">Our onboarding process is rigorous for clinical quality, but seamless for you. No technical expertise required.</p>
              
              <div className="space-y-8 relative before:absolute before:inset-0 before:ml-[1.4rem] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-emerald-200 before:to-transparent">
                {steps.map((step, idx) => (
                  <div key={idx} className="relative flex items-center gap-6">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-white font-bold flex items-center justify-center text-xl shadow-lg ring-4 ring-white z-10">
                      {step.step}
                    </div>
                    <div className="bg-background p-6 rounded-lg border border-gray-100 flex-grow shadow-sm">
                      <h4 className="text-xl font-bold text-foreground mb-2">{step.title}</h4>
                      <p className="text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="lg:w-1/2 relative">
              <div className="absolute inset-0 bg-primary-muted rounded-[3rem] transform rotate-3 scale-105 -z-10"></div>
              <img src="https://images.unsplash.com/photo-1573497491208-6b1acb260507?auto=format&fit=crop&q=80&w=1000" alt="Professional smiling" className="rounded-[3rem] shadow-lg relative z-0 object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-primary-dark text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-primary-muted/80">Everything you need to know about joining WellPath.</p>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-primary-dark/50 border border-primary-hover/50 rounded-lg overflow-hidden backdrop-blur-sm transition-all duration-300">
                <button 
                  onClick={() => toggleFaq(idx)}
                  className="w-full px-6 py-5 flex items-center justify-between font-bold text-left text-lg hover:bg-primary-dark/80 transition-colors"
                >
                  {faq.question}
                  <span className={`transform transition-transform duration-300 ${expandedFaq === idx ? 'rotate-180' : ''}`}>
                    <ChevronDown className="w-5 h-5 text-primary-muted-foreground" />
                  </span>
                </button>
                <div 
                  className={`px-6 transition-all duration-300 ease-in-out overflow-hidden ${expandedFaq === idx ? 'max-h-40 py-5 pt-0 opacity-100' : 'max-h-0 py-0 opacity-0'}`}
                >
                  <p className="text-primary-muted leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <p className="text-primary-muted mb-6 text-lg">Still have questions? We'd love to talk.</p>
            <Link to="/signup?role=professional" className="inline-flex justify-center items-center px-8 py-4 bg-surface text-primary-dark rounded-xl font-bold text-lg hover:bg-surface-hover transition-colors shadow-lg">
              Start Your Application
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ForProfessionals;
