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
  GraduationCap
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
      description: 'Real-time calendar synchronization, automated client reminders, and self-serve rescheduling eliminate endless back-and-forth WhatsApp coordination.'
    },
    {
      icon: DollarSign,
      title: 'You Set Your Own Fees & Keep Earnings',
      description: 'Retain complete financial autonomy. You set your per-session rate and receive automated bank transfers directly without arbitrary commission deductions.'
    },
    {
      icon: Video,
      title: 'HIPAA-Grade Telehealth & In-Person Tools',
      description: 'Conduct browser-based, encrypted telehealth sessions with zero downloads required for clients, or offer in-person consultations at your private clinic address.'
    },
    {
      icon: GraduationCap,
      title: 'Supervise Eager Psychology Interns',
      description: 'Choose to accept master’s student trainees. Review student motivation statements, assign clinical observation hours, and shape the next generation of therapists.'
    },
    {
      icon: ShieldCheck,
      title: 'Verified Practitioner Credential Badge',
      description: 'Stand out in a crowded market with our verified badge. Patients trust practitioners who have passed our rigorous clinical and license credential checks.'
    }
  ];

  const steps = [
    {
      step: '01',
      title: 'Submit Basic Info & Credentials',
      description: 'Fill out your clinical background, therapy approaches, and upload your master’s/doctoral degree and registration certificates (takes ~5 mins).'
    },
    {
      step: '02',
      title: 'Fast 24-48h Board Verification',
      description: 'Our clinical credentials committee reviews your documentation against accreditation standards to maintain trust across the network.'
    },
    {
      step: '03',
      title: 'Set Your Schedule & Rates',
      description: 'Define your working hours, online video vs in-person settings, hourly rates, and toggle whether you wish to review student intern applications.'
    },
    {
      step: '04',
      title: 'Welcome Clients & Deliver Care',
      description: 'Your profile goes live in the public directory. Start receiving direct bookings, conducting sessions, and accessing your practitioner dashboard.'
    }
  ];

  const testimonials = [
    {
      quote: 'WELLPath completely transformed my private practice. The automated calendar booking and direct payouts freed up nearly 8 hours of administrative headaches every week.',
      name: 'Dr. Ananya Mehta',
      role: 'Clinical Psychologist',
      experience: '8+ years experience'
    },
    {
      quote: 'Having the ability to review student internship applications directly on the platform has made supervising budding therapists organized and truly rewarding.',
      name: 'Karan Singh',
      role: 'Psychotherapist',
      experience: '12+ years experience'
    },
    {
      quote: 'The verification badge instantly establishes trust with prospective patients. My schedule was comfortably filled within my first three weeks on the platform.',
      name: 'Dr. Shalini Varma',
      role: 'Consultant Psychiatrist',
      experience: '10+ years experience'
    }
  ];

  const faqs = [
    {
      question: 'What qualifications are required to join WELLPath as a professional?',
      answer: 'We accept certified mental health professionals with a recognized Master’s degree (M.A./M.Sc.), M.Phil, or Ph.D. in Clinical or Counseling Psychology, or an M.D./DNB in Psychiatry. Where applicable, recognized professional registrations (such as RCI licensing for clinical psychologists) are required.'
    },
    {
      question: 'How do payments and fees work?',
      answer: 'You have 100% discretion over the session fees you charge clients (e.g. ₹1,200 to ₹4,000+ per session). WELLPath operates on a transparent annual platform subscription of ₹999/year, meaning we do not take heavy commission cuts from your earned session fees.'
    },
    {
      question: 'Is accepting student interns required?',
      answer: 'No, accepting interns is completely optional. In your practitioner profile settings, you can toggle "Accepts Interns" on or off at any time depending on your current supervision bandwidth and practice goals.'
    },
    {
      question: 'Can I offer both online video sessions and in-person consultations?',
      answer: 'Yes! You can mark your profile as offering online video calls, in-person clinic visits (by listing your clinic address and city), or both. Clients filter according to their preferences.'
    },
    {
      question: 'How secure is the platform for client records and video calls?',
      answer: 'Our infrastructure adheres strictly to HIPAA privacy standards with 256-bit encryption. Telehealth video streams are peer-to-peer encrypted and never recorded. Client intake forms and clinical notes are confidential and accessible only to you.'
    }
  ];

  return (
    <div className="bg-gray-50 text-gray-900 min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-emerald-900 via-emerald-800 to-emerald-900 text-white py-20 lg:py-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold bg-emerald-700/80 text-emerald-100 mb-6 border border-emerald-600">
              <Sparkles className="w-3.5 h-3.5 mr-1.5" />
              For Licensed Mental Health Practitioners
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-6">
              Grow your practice. <br />
              <span className="text-emerald-300">Focus entirely on healing.</span>
            </h1>
            <p className="text-lg sm:text-xl text-emerald-100/90 leading-relaxed mb-10">
              WELLPath empowers clinical psychologists, psychotherapists, and psychiatrists with modern practice infrastructure: verified client matching, zero-hassle scheduling, secure telehealth, and optional student mentorship.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/professional/signup"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-emerald-900 rounded-xl font-bold text-base hover:bg-emerald-50 transition-all shadow-lg hover:shadow-xl"
              >
                Apply to Join Network
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <a
                href="#pricing"
                className="inline-flex items-center justify-center px-8 py-4 bg-emerald-800/80 hover:bg-emerald-700/80 border border-emerald-600 text-white rounded-xl font-semibold text-base transition-colors"
              >
                View Transparent Pricing
              </a>
            </div>

            {/* Quick trust metrics */}
            <div className="mt-12 pt-8 border-t border-emerald-700/60 grid grid-cols-2 sm:grid-cols-3 gap-6 text-sm text-emerald-200">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>100% Fee Autonomy</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Zero Commission on Clients</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Optional Intern Supervision</span>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative background glow */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
      </section>

      {/* Benefits Grid */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">The Practitioner Advantage</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-1">Built to Eliminate Practice Friction</h2>
          <p className="mt-3 text-gray-600 text-base sm:text-lg">
            Spend less time on administrative coordination, invoice chasing, and marketing, and more time in meaningful therapeutic sessions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, idx) => {
            const Icon = benefit.icon;
            return (
              <div 
                key={idx}
                className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm hover:border-emerald-300 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{benefit.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* How it Works / 4-Step Onboarding */}
      <section className="py-20 bg-white border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">Simple Onboarding</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-1">How to Get Started on WELLPath</h2>
            <p className="mt-3 text-gray-600">
              Our seamless application process gets you verified and ready to see clients in days.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, idx) => (
              <div 
                key={idx}
                className="bg-gray-50 rounded-2xl p-7 border border-gray-100 relative flex flex-col justify-between"
              >
                <div>
                  <div className="text-3xl font-black text-emerald-600/40 mb-4">
                    {step.step}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/professional/signup"
              className="inline-flex items-center px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold shadow-md shadow-emerald-200 transition-colors"
            >
              Start Your Application
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Transparent Pricing Section */}
      <section id="pricing" className="py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">Honest & Transparent</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-1">Simple Annual Membership</h2>
          <p className="mt-3 text-gray-600">
            No unpredictable 25-30% platform cuts on your patient fees. One clear membership covers your complete practice toolkit.
          </p>
        </div>

        <div className="bg-white rounded-3xl border-2 border-emerald-500 p-8 sm:p-12 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-emerald-600 text-white text-xs font-bold px-5 py-1.5 rounded-bl-xl uppercase tracking-wider">
            Practitioner Plan
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">WELLPath Professional Access</h3>
              <p className="text-gray-600 text-sm mb-6">
                Full access to directory listing, intelligent client intake, calendar management, and intern supervisory portal.
              </p>

              <div className="space-y-3">
                {[
                  'Keep 100% of your private session earnings',
                  'Verified Credential Badge on your public profile',
                  'HIPAA-grade encrypted telehealth video suite',
                  'Automated client SMS & email appointment reminders',
                  'Student intern application management & hour logging',
                  'Practitioner earnings dashboard & direct bank deposits',
                  'Dedicated professional support team'
                ].map((feat, fIdx) => (
                  <div key={fIdx} className="flex items-center text-sm text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mr-2.5 flex-shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 bg-gray-50 rounded-2xl p-8 border border-gray-200 text-center flex flex-col justify-center">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Annual Platform Fee</span>
              <div className="flex justify-center items-baseline my-8">
                <span className="text-4xl sm:text-5xl font-extrabold text-gray-900">₹999</span>
                <span className="text-xl text-gray-500 ml-2">/ year</span>
              </div>
              <p className="text-xs text-gray-500 mt-2 mb-6">
                Less than the fee of a single therapy session.
              </p>

              <Link
                to="/professional/signup"
                className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-sm transition-colors shadow-md shadow-emerald-200"
              >
                Join the Network
              </Link>
              <p className="text-[11px] text-gray-400 mt-2">
                Fee processed only upon credential approval.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-emerald-50/50 border-t border-emerald-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl font-bold text-gray-900">Trusted by Practicing Clinicians</h2>
            <p className="mt-2 text-gray-600">Hear from psychologists and psychiatrists practicing with WELLPath.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-7 border border-gray-200 shadow-sm flex flex-col justify-between">
                <p className="text-gray-700 text-sm leading-relaxed mb-6 italic">
                  "{t.quote}"
                </p>
                <div className="flex items-center space-x-3 pt-4 border-t border-gray-100">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 font-bold text-sm flex items-center justify-center">
                    {t.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">{t.name}</h4>
                    <p className="text-xs text-emerald-600 font-medium">{t.role} &bull; {t.experience}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Professional FAQ */}
      <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Clinician FAQ</h2>
          <p className="mt-2 text-gray-600">Answers to common questions regarding joining and practicing on WELLPath.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = expandedFaq === index;
            return (
              <div 
                key={index}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full text-left px-6 py-5 flex justify-between items-center focus:outline-none"
                >
                  <span className="font-semibold text-gray-900 text-base">
                    {faq.question}
                  </span>
                  <span className="ml-4 text-gray-400">
                    {isOpen ? <ChevronUp className="w-5 h-5 text-emerald-600" /> : <ChevronDown className="w-5 h-5" />}
                  </span>
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 text-gray-600 text-sm leading-relaxed border-t border-gray-50 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-emerald-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Elevate your therapeutic practice today.
          </h2>
          <p className="text-emerald-100/80 max-w-2xl mx-auto mb-8 text-base sm:text-lg">
            Join a network committed to clinical excellence, fair clinician compensation, and dignified patient care.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/professional/signup"
              className="px-8 py-4 bg-white text-emerald-900 rounded-xl font-bold hover:bg-emerald-50 transition-colors shadow-lg"
            >
              Apply to Join Network
            </Link>
            <Link
              to="/login"
              className="px-8 py-4 bg-emerald-800 text-white rounded-xl font-semibold hover:bg-emerald-700 border border-emerald-700 transition-colors"
            >
              Log in to Practitioner Portal
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ForProfessionals;
