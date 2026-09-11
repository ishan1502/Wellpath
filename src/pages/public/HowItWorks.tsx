import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  CalendarCheck, 
  Video, 
  Sparkles, 
  ShieldCheck, 
  HeartHandshake, 
  GraduationCap, 
  ChevronDown, 
  ChevronUp, 
  ArrowRight, 
  CheckCircle2, 
  Lock, 
  Clock, 
  Users, 
  PhoneCall 
} from 'lucide-react';

const HowItWorks = () => {
  const [activeTab, setActiveTab] = useState<'patient' | 'student'>('patient');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const patientSteps = [
    {
      step: '01',
      icon: Search,
      title: 'Find or match with the right therapist',
      description: 'Use our targeted filters (specialty, language, fee, format) or take our 2-minute matching assessment to find clinicians tailored to your specific goals and comfort.',
      details: ['Filter by Anxiety, Depression, Trauma, Relationships', 'Choose between Online Video or In-Person visits', 'View verified credentials and clear per-session fees']
    },
    {
      step: '02',
      icon: CalendarCheck,
      title: 'Book a session at your convenience',
      description: 'Review therapist calendars in real time. Choose an initial consultation or a full 50-minute session that fits into your weekly schedule without phone tag or delays.',
      details: ['Real-time calendar availability', 'Immediate booking confirmation', 'Calendar sync & automated appointment reminders']
    },
    {
      step: '03',
      icon: Video,
      title: 'Connect securely from anywhere',
      description: 'Join your private, encrypted telehealth video room with one click from your patient dashboard, or visit your therapist’s office for an in-person consultation.',
      details: ['Zero downloads required for video calls', 'HIPAA-compliant, end-to-end encrypted rooms', 'Quiet, confidential, and safe therapeutic environment']
    },
    {
      step: '04',
      icon: Sparkles,
      title: 'Continuous support & progress tracking',
      description: 'Maintain continuity with simple re-booking, asynchronous messaging for scheduling updates, and access to curated therapist-recommended exercises.',
      details: ['Direct messaging with your therapist', 'Seamless appointment rescheduling', 'Dedicated patient dashboard to review notes & history']
    }
  ];

  const studentSteps = [
    {
      step: '01',
      icon: GraduationCap,
      title: 'Create your verified student profile',
      description: 'Register with your university or academic institution details, clinical psychology program, and areas of research or therapeutic interest.',
      details: ['Open to Master’s, M.Phil, and PhD candidates', 'Highlight theoretical orientations and coursework', 'Quick verification of academic credentials']
    },
    {
      step: '02',
      icon: Users,
      title: 'Browse licensed supervisors accepting interns',
      description: 'Discover verified senior psychologists and psychotherapists who are actively offering clinical internships, case supervision, and mentorship.',
      details: ['Filter supervisors by clinical niche and location', 'Review mentor backgrounds and supervisory approaches', 'Direct visibility into active internship openings']
    },
    {
      step: '03',
      icon: HeartHandshake,
      title: 'Submit your tailored motivation statement',
      description: 'Apply directly through the platform with your statement of purpose and CV. Mentors review your application directly in their professional portal.',
      details: ['One-click application submission', 'Transparent application status tracking', 'Direct supervisor messaging once shortlisted']
    },
    {
      step: '04',
      icon: ShieldCheck,
      title: 'Learn, observe & log supervised clinical hours',
      description: 'Gain ethical clinical exposure, participate in case formulation discussions, and receive formal supervision completion certificates.',
      details: ['Structured mentorship and ethical guidance', 'Documentation for academic practicum credit', 'Networking with licensed practitioners']
    }
  ];

  const faqs = [
    {
      question: 'How do I know which therapist is right for me?',
      answer: 'You can browse therapist profiles to read about their clinical background, therapy modalities (like CBT, psychodynamic, or mindfulness-based therapy), languages spoken, and specialties. You can also take our quick Matching Assessment which recommends top-matching clinicians based on your specific challenges.'
    },
    {
      question: 'How are therapy sessions conducted?',
      answer: 'We offer both online video therapy and in-person consultations. For online sessions, you will receive a secure video link in your patient dashboard. In-person appointments take place at the therapist’s private clinic or counseling office listed on their profile.'
    },
    {
      question: 'Is my personal data and therapy strictly confidential?',
      answer: 'Yes, absolutely. WELLPath is built with strict privacy standards and HIPAA compliance principles. Your video sessions are end-to-end encrypted and never recorded. Notes and medical records are accessible only between you and your licensed clinician.'
    },
    {
      question: 'What if I want to change therapists after the first session?',
      answer: 'Finding the right therapeutic fit is crucial for progress. If you feel your current therapist is not the right match, you are free to book your next session with another provider at any time without any awkwardness or cancellation penalties.'
    },
    {
      question: 'Are all therapists on WELLPath licensed and verified?',
      answer: 'Every mental health professional on WELLPath undergoes manual credential verification. Our administration team inspects their government-issued identification, postgraduate psychology or psychiatric degrees, and recognized licensing board registrations before their profile goes live.'
    },
    {
      question: 'What should I do if I am experiencing a psychiatric crisis?',
      answer: 'WELLPath is designed for scheduled outpatient therapy and does not provide immediate emergency medical intervention. If you or someone you know is in immediate danger or experiencing severe crisis, please call Tele-MANAS (14416 / 1800 891 4416) or reach out to your nearest hospital emergency room immediately.'
    }
  ];

  return (
    <div className="bg-gray-50 text-gray-900 min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-emerald-50/70 via-white to-gray-50 py-16 lg:py-24 border-b border-gray-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 mb-6">
            <Sparkles className="w-3.5 h-3.5 mr-1.5" />
            Clear, Compassionate & Transparent
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight max-w-3xl mx-auto leading-tight">
            How <span className="text-emerald-600">WELLPath</span> Works
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            A seamless journey towards mental wellbeing and professional growth. Whether you are looking for therapy or clinical mentorship, here is how we guide you every step of the way.
          </p>

          {/* Toggle Tabs */}
          <div className="mt-10 inline-flex p-1.5 bg-gray-200/70 backdrop-blur rounded-2xl shadow-inner border border-gray-200">
            <button
              onClick={() => setActiveTab('patient')}
              className={`flex items-center px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                activeTab === 'patient'
                  ? 'bg-white text-emerald-800 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <HeartHandshake className="w-4 h-4 mr-2" />
              For Clients & Patients
            </button>
            <button
              onClick={() => setActiveTab('student')}
              className={`flex items-center px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                activeTab === 'student'
                  ? 'bg-white text-emerald-800 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <GraduationCap className="w-4 h-4 mr-2" />
              For Students & Interns
            </button>
          </div>
        </div>
      </section>

      {/* Step by step process */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            {activeTab === 'patient' ? 'Your 4-Step Healing Journey' : 'Your 4-Step Mentorship Path'}
          </h2>
          <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">
            {activeTab === 'patient'
              ? 'From your first search to ongoing therapy sessions, we ensure a smooth, dignified, and comfortable experience.'
              : 'Bridge the gap between theoretical psychology education and hands-on supervised clinical learning.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {(activeTab === 'patient' ? patientSteps : studentSteps).map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx}
                className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-3xl font-black text-gray-200">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-50 space-y-2">
                  {item.details.map((detail, dIdx) => (
                    <div key={dIdx} className="flex items-start text-xs text-gray-500">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Dynamic CTA depending on tab */}
        <div className="mt-12 text-center">
          {activeTab === 'patient' ? (
            <div className="inline-flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/find-professional"
                className="inline-flex items-center px-6 py-3.5 rounded-xl text-white bg-emerald-600 hover:bg-emerald-700 font-medium shadow-md shadow-emerald-200 transition-colors"
              >
                Browse Therapists
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
              <Link
                to="/matching"
                className="inline-flex items-center px-6 py-3.5 rounded-xl text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 font-medium transition-colors"
              >
                Take the Matching Quiz
              </Link>
            </div>
          ) : (
            <div className="inline-flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/student/signup"
                className="inline-flex items-center px-6 py-3.5 rounded-xl text-white bg-emerald-600 hover:bg-emerald-700 font-medium shadow-md shadow-emerald-200 transition-colors"
              >
                Sign Up as a Student
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
              <Link
                to="/for-professionals"
                className="inline-flex items-center px-6 py-3.5 rounded-xl text-gray-700 bg-white hover:bg-gray-50 border border-gray-200 font-medium transition-colors"
              >
                Learn How Supervisors Post Internships
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Trust & Quality Pillars */}
      <section className="py-16 bg-white border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Why Patients & Clinicians Trust Us</h2>
            <p className="mt-3 text-gray-600">
              We uphold the highest clinical, ethical, and technological standards in modern mental healthcare.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-gray-50 border border-gray-100 flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-5">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">100% Credential-Vetted</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Every therapist is manually inspected. We verify university degrees, recognized licensing board registrations, and background declarations.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-gray-50 border border-gray-100 flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-5">
                <Lock className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Bank-Grade Privacy</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Your conversations, bookings, and telehealth video calls are safeguarded by 256-bit encryption. Your sessions remain confidential and secure.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-gray-50 border border-gray-100 flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-5">
                <Clock className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Transparent & Flexible</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                No hidden subscriptions or mandatory lock-in plans. Pay transparently per session and adjust your appointments with flexible rescheduling.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
          <p className="mt-3 text-gray-600">Have questions about getting started? Here are clear answers.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = expandedFaq === index;
            return (
              <div 
                key={index}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full text-left px-6 py-5 flex justify-between items-center focus:outline-none"
                >
                  <span className="font-semibold text-gray-900 text-base sm:text-lg">
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

      {/* Crisis Help Info */}
      <section className="bg-amber-50/70 border-t border-amber-200 py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center flex-shrink-0">
              <PhoneCall className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Need Immediate Crisis Help?</h3>
              <p className="text-sm text-gray-600 mt-1 max-w-xl">
                If you are in distress or experiencing thoughts of self-harm, please reach out to dedicated 24/7 mental health emergency helplines. Help is always available.
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <a 
              href="tel:14416"
              className="px-4 py-2.5 bg-amber-600 text-white rounded-lg text-sm font-semibold hover:bg-amber-700 transition-colors text-center"
            >
              Tele-MANAS: 14416
            </a>
            <a 
              href="tel:9999666555"
              className="px-4 py-2.5 bg-white border border-amber-300 text-amber-900 rounded-lg text-sm font-semibold hover:bg-amber-50 transition-colors text-center"
            >
              Vandrevala: +91 9999 666 555
            </a>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-emerald-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to prioritize your mental wellbeing?
          </h2>
          <p className="text-emerald-100/80 max-w-2xl mx-auto mb-8 text-lg">
            Start with verified therapists who match your needs, schedule, and personal comfort.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/find-professional"
              className="px-8 py-4 bg-white text-emerald-900 rounded-xl font-semibold hover:bg-emerald-50 transition-colors shadow-lg"
            >
              Find a Therapist
            </Link>
            <Link
              to="/signup"
              className="px-8 py-4 bg-emerald-800 text-white rounded-xl font-semibold hover:bg-emerald-700 border border-emerald-700 transition-colors"
            >
              Create Free Account
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;
