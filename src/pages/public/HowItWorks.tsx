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
    <div className="bg-gray-50 text-emerald-900 min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-emerald-900 text-white py-20 lg:py-32 rounded-b-[3rem] shadow-xl overflow-hidden mb-16">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] rounded-full bg-emerald-800/50 blur-3xl"></div>
          <div className="absolute top-[60%] -right-[10%] w-[60%] h-[60%] rounded-full bg-emerald-800/40 blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold bg-emerald-800/60 backdrop-blur-md text-emerald-200 mb-8 border border-emerald-700/50">
            <Sparkles className="w-4 h-4 mr-2" />
            Clear, Compassionate & Transparent
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight max-w-3xl mx-auto leading-tight">
            How <span className="text-emerald-400">WELLPath</span> Works
          </h1>
          <p className="mt-8 text-lg sm:text-xl text-emerald-100/90 max-w-2xl mx-auto leading-relaxed">
            A seamless journey towards mental wellbeing and professional growth. Whether you are looking for therapy or clinical mentorship, here is how we guide you every step of the way.
          </p>

          {/* Toggle Tabs */}
          <div className="mt-12 inline-flex p-1.5 bg-emerald-800/50 backdrop-blur-md rounded-2xl shadow-inner border border-emerald-700/50">
            <button
              onClick={() => setActiveTab('patient')}
              className={`flex items-center px-8 py-4 rounded-xl text-sm font-bold transition-all duration-300 ${
                activeTab === 'patient'
                  ? 'bg-white text-emerald-900 shadow-sm'
                  : 'text-emerald-100 hover:text-white hover:bg-emerald-700/50'
              }`}
            >
              <HeartHandshake className="w-5 h-5 mr-2" />
              For Clients & Patients
            </button>
            <button
              onClick={() => setActiveTab('student')}
              className={`flex items-center px-8 py-4 rounded-xl text-sm font-bold transition-all duration-300 ${
                activeTab === 'student'
                  ? 'bg-white text-emerald-900 shadow-sm'
                  : 'text-emerald-100 hover:text-white hover:bg-emerald-700/50'
              }`}
            >
              <GraduationCap className="w-5 h-5 mr-2" />
              For Students & Interns
            </button>
          </div>
        </div>
      </section>

      {/* Step by step process */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-emerald-900">
            {activeTab === 'patient' ? 'Your 4-Step Healing Journey' : 'Your 4-Step Mentorship Path'}
          </h2>
          <p className="mt-4 text-lg text-emerald-700/80 max-w-2xl mx-auto">
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
                className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 relative flex flex-col justify-between group border border-emerald-50"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="text-4xl font-black text-emerald-50">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-emerald-900 mb-4 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-emerald-800/70 text-sm leading-relaxed mb-8">
                    {item.description}
                  </p>
                </div>

                <div className="pt-6 border-t border-emerald-50 space-y-3">
                  {item.details.map((detail, dIdx) => (
                    <div key={dIdx} className="flex items-start text-xs text-emerald-700/80 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Dynamic CTA depending on tab */}
        <div className="mt-16 text-center">
          {activeTab === 'patient' ? (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/find-professional"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-2xl text-white bg-emerald-600 hover:bg-emerald-700 font-bold shadow-sm hover:shadow-xl transition-all duration-300"
              >
                Browse Therapists
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                to="/matching"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-2xl text-emerald-800 bg-white hover:bg-emerald-50 font-bold shadow-sm hover:shadow-xl transition-all duration-300 border border-emerald-100"
              >
                Take the Matching Quiz
              </Link>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/student/signup"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-2xl text-white bg-emerald-600 hover:bg-emerald-700 font-bold shadow-sm hover:shadow-xl transition-all duration-300"
              >
                Sign Up as a Student
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                to="/for-professionals"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-2xl text-emerald-800 bg-white hover:bg-emerald-50 font-bold shadow-sm hover:shadow-xl transition-all duration-300 border border-emerald-100"
              >
                Learn How Supervisors Post Internships
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Trust & Quality Pillars */}
      <section className="py-24 bg-white border-y border-emerald-100 rounded-3xl mx-4 sm:mx-6 lg:mx-8 mb-16 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-emerald-900">Why Patients & Clinicians Trust Us</h2>
            <p className="mt-4 text-emerald-700/80">
              We uphold the highest clinical, ethical, and technological standards in modern mental healthcare.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-10 rounded-3xl bg-emerald-50/50 border border-emerald-50 flex flex-col items-center text-center shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 rounded-2xl bg-white text-emerald-600 flex items-center justify-center mb-6 shadow-sm">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-emerald-900 mb-3">100% Credential-Vetted</h3>
              <p className="text-emerald-800/70 text-sm leading-relaxed">
                Every therapist is manually inspected. We verify university degrees, recognized licensing board registrations, and background declarations.
              </p>
            </div>

            <div className="p-10 rounded-3xl bg-emerald-50/50 border border-emerald-50 flex flex-col items-center text-center shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 rounded-2xl bg-white text-emerald-600 flex items-center justify-center mb-6 shadow-sm">
                <Lock className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-emerald-900 mb-3">Bank-Grade Privacy</h3>
              <p className="text-emerald-800/70 text-sm leading-relaxed">
                Your conversations, bookings, and telehealth video calls are safeguarded by 256-bit encryption. Your sessions remain confidential and secure.
              </p>
            </div>

            <div className="p-10 rounded-3xl bg-emerald-50/50 border border-emerald-50 flex flex-col items-center text-center shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 rounded-2xl bg-white text-emerald-600 flex items-center justify-center mb-6 shadow-sm">
                <Clock className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-emerald-900 mb-3">Transparent & Flexible</h3>
              <p className="text-emerald-800/70 text-sm leading-relaxed">
                No hidden subscriptions or mandatory lock-in plans. Pay transparently per session and adjust your appointments with flexible rescheduling.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-emerald-900">Frequently Asked Questions</h2>
          <p className="mt-4 text-emerald-700/80">Have questions about getting started? Here are clear answers.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = expandedFaq === index;
            return (
              <div 
                key={index}
                className="bg-white rounded-2xl shadow-sm border border-emerald-100 overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full text-left px-8 py-6 flex justify-between items-center focus:outline-none hover:bg-emerald-50/50 transition-colors"
                >
                  <span className="font-bold text-emerald-900 text-base sm:text-lg pr-8">
                    {faq.question}
                  </span>
                  <span className="flex-shrink-0 text-emerald-500 bg-emerald-50 p-2 rounded-full">
                    {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </span>
                </button>
                {isOpen && (
                  <div className="px-8 pb-6 text-emerald-800/70 text-sm leading-relaxed pt-2">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Crisis Help Info */}
      <section className="bg-amber-100/50 border border-amber-200 py-12 rounded-3xl mx-4 sm:mx-6 lg:mx-8 mb-16">
        <div className="max-w-5xl mx-auto px-6 lg:px-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-start gap-6">
            <div className="w-14 h-14 rounded-2xl bg-amber-200/50 text-amber-700 flex items-center justify-center flex-shrink-0">
              <PhoneCall className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-emerald-900">Need Immediate Crisis Help?</h3>
              <p className="text-sm text-emerald-800/70 mt-2 max-w-xl leading-relaxed">
                If you are in distress or experiencing thoughts of self-harm, please reach out to dedicated 24/7 mental health emergency helplines. Help is always available.
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0 w-full sm:w-auto">
            <a 
              href="tel:14416"
              className="px-6 py-3.5 bg-amber-600 text-white rounded-xl text-sm font-bold hover:bg-amber-700 transition-colors text-center shadow-sm"
            >
              Tele-MANAS: 14416
            </a>
            <a 
              href="tel:9999666555"
              className="px-6 py-3.5 bg-white border border-amber-300 text-amber-900 rounded-xl text-sm font-bold hover:bg-amber-50 transition-colors text-center shadow-sm"
            >
              Vandrevala: +91 9999 666 555
            </a>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-emerald-900 text-white py-24 rounded-t-[3rem] text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full overflow-hidden z-0">
          <div className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] rounded-full bg-emerald-800/40 blur-3xl"></div>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Ready to prioritize your mental wellbeing?
          </h2>
          <p className="text-emerald-200 max-w-2xl mx-auto mb-12 text-lg">
            Start with verified therapists who match your needs, schedule, and personal comfort.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/find-professional"
              className="px-8 py-4 bg-white text-emerald-900 rounded-2xl font-bold hover:bg-emerald-50 shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              Find a Therapist
            </Link>
            <Link
              to="/signup"
              className="px-8 py-4 bg-emerald-800 text-white rounded-2xl font-bold hover:bg-emerald-700 border border-emerald-600 shadow-xl hover:shadow-2xl transition-all duration-300"
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
