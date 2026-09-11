import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Heart, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Award, 
  GraduationCap, 
  Lock
} from 'lucide-react';

const About = () => {
  const stats = [
    { label: 'Therapy Sessions Delivered', value: '15,000+' },
    { label: 'Verified Clinicians & Doctors', value: '500+' },
    { label: 'Client Satisfaction Rating', value: '98%' },
    { label: 'Specializations Supported', value: '35+' }
  ];

  const coreValues = [
    {
      icon: ShieldCheck,
      title: 'Clinical Integrity First',
      description: 'Every clinician on WELLPath is manually verified with rigorous credential checks. We hold zero tolerance for unverified coaching or non-evidence-based claims.'
    },
    {
      icon: Heart,
      title: 'Dignified, Compassionate Inclusivity',
      description: 'Mental healthcare must be culturally attuned, trauma-informed, and affirming of all gender identities, sexual orientations, and neurodiverse lived experiences.'
    },
    {
      icon: Lock,
      title: 'Absolute Privacy & Autonomy',
      description: 'You are the author of your healing. We implement bank-grade 256-bit encryption, never sell client data, and guarantee confidential, unrecorded telehealth sessions.'
    },
    {
      icon: GraduationCap,
      title: 'Nurturing the Future of Care',
      description: 'By connecting licensed supervisors with eager psychology students, we bridge the clinical training deficit and cultivate the next generation of empathetic practitioners.'
    }
  ];

  const team = [
    {
      name: 'Dr. Ananya Mehta',
      role: 'Chief Clinical Officer & Co-Founder',
      qualifications: 'Ph.D. in Clinical Psychology',
      bio: 'Former consultant at top tertiary hospital centers with over 14 years of clinical experience specializing in CBT and affective disorders.',
      avatar: 'AM'
    },
    {
      name: 'Vikramaditya Sharma',
      role: 'Chief Executive Officer & Co-Founder',
      qualifications: 'B.Tech, MBA (Health Systems)',
      bio: 'Passionate about democratizing mental health access after navigating family experiences with fragmented and stigmatized healthcare systems.',
      avatar: 'VS'
    },
    {
      name: 'Dr. Rohan Deshmukh',
      role: 'Head of Psychiatric Ethics',
      qualifications: 'M.D. Psychiatry',
      bio: 'Specialist in neuropsychiatry and evidence-based pharmacotherapy guidelines, advising on ethical outpatient care protocols.',
      avatar: 'RD'
    },
    {
      name: 'Sunita Rao',
      role: 'Director of Trainee Internships',
      qualifications: 'M.Phil Psychotherapy',
      bio: 'Dedicated academician leading clinical practicum partnerships between psychology colleges and accredited supervisors across India.',
      avatar: 'SR'
    }
  ];

  const credentialSteps = [
    {
      step: '1',
      title: 'Degree & License Verification',
      desc: 'Inspection of accredited university master’s/doctoral degrees and recognized council registrations (e.g. RCI).'
    },
    {
      step: '2',
      title: 'Practice & Ethics Review',
      desc: 'Verification of minimum clinical practice hours and confirmation of clean ethical standing without malpractice claims.'
    },
    {
      step: '3',
      title: 'Telehealth Quality Orientation',
      desc: 'Screening for technical fluency, secure room protocols, and adherence to emergency contingency frameworks.'
    }
  ];

  return (
    <div className="bg-gray-50 text-gray-900 min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-emerald-50/80 via-white to-gray-50 py-20 lg:py-28 border-b border-gray-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 mb-6">
            <Sparkles className="w-3.5 h-3.5 mr-1.5" />
            Our Mission & Purpose
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight max-w-4xl mx-auto leading-tight">
            Democratizing <span className="text-emerald-600">qualified, compassionate</span> mental health support
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            WELLPath was born from a fundamental belief: mental wellness should be accessible, stigma-free, and grounded in authentic clinical rigor. We unite individuals seeking therapy with certified professionals while empowering the next generation of caregivers.
          </p>
        </div>
      </section>

      {/* Metrics Counter Bar */}
      <section className="bg-white border-b border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {stats.map((item, index) => (
              <div key={index} className="p-4">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-emerald-600 tracking-tight mb-2">
                  {item.value}
                </div>
                <div className="text-sm font-medium text-gray-600">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Origin Story / Mission Narrative */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
              Why We Started
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-snug">
              Therapy is deeply human, but finding the right help was unnecessarily difficult.
            </h2>
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
              When people face burnout, panic, grief, or depression, they are already operating on depleted emotional reserves. Yet navigating outpatient mental healthcare often feels like an obstacle course of opaque credentials, confusing pricing, and fear of judgment.
            </p>
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
              At the same time, postgraduate clinical psychology students struggle to find structured, ethical supervision to complete their required practicum hours.
            </p>
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed font-medium text-emerald-950">
              WELLPath bridges this entire ecosystem: providing patients with transparent, verified, and safe care, while empowering senior clinicians to manage private practices and mentor budding interns seamlessly.
            </p>
          </div>

          <div className="lg:col-span-6">
            <div className="bg-white rounded-2xl p-8 sm:p-10 border border-gray-200 shadow-sm space-y-6">
              <h3 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-4">
                The WELLPath Distinction
              </h3>

              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 mr-4 mt-1">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-gray-900">Zero Guesswork Verification</h4>
                    <p className="text-sm text-gray-500 mt-0.5">
                      No self-certified 'life coaches' without accredited medical or psychological qualifications. Every provider is verified.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 mr-4 mt-1">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-gray-900">Fair & Transparent Rates</h4>
                    <p className="text-sm text-gray-500 mt-0.5">
                      No mandatory recurring lock-ins. Every professional states their per-session fee clearly before you book.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 mr-4 mt-1">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-gray-900">Supervised Training Ecosystem</h4>
                    <p className="text-sm text-gray-500 mt-0.5">
                      We support the healthcare workforce of tomorrow through formal clinical mentorship opportunities for psychology scholars.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-20 bg-white border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">Our Compass</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-1">The Principles That Guide Us</h2>
            <p className="mt-3 text-gray-600">
              Every decision we make, from engineering encrypted video architecture to vetting practitioners, reflects these non-negotiables.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreValues.map((value, idx) => {
              const Icon = value.icon;
              return (
                <div 
                  key={idx}
                  className="bg-gray-50 rounded-2xl p-7 border border-gray-100 hover:border-emerald-200 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-5">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2.5">{value.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Credentialing Process Breakdown */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-emerald-900 to-emerald-950 text-white rounded-3xl p-8 sm:p-14 shadow-xl">
          <div className="max-w-3xl mb-12">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-800 text-emerald-200 mb-4">
              <Award className="w-3.5 h-3.5 mr-1.5" />
              Safety Assurance
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              How We Verify Every Single Practitioner
            </h2>
            <p className="text-emerald-100/80 text-base leading-relaxed">
              In an industry vulnerable to pseudoscience, we enforce stringent clinical auditing. Your wellbeing deserves vetted expertise.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {credentialSteps.map((step, idx) => (
              <div key={idx} className="bg-white/10 rounded-2xl p-6 border border-emerald-700/50 backdrop-blur-sm">
                <div className="w-10 h-10 rounded-full bg-emerald-500/30 text-emerald-300 font-bold flex items-center justify-center text-lg mb-4 border border-emerald-400/40">
                  {step.step}
                </div>
                <h4 className="text-lg font-bold mb-2 text-white">{step.title}</h4>
                <p className="text-emerald-100/70 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership & Clinical Advisors */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">The People Behind WELLPath</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-1">Leadership & Clinical Advisory</h2>
          <p className="mt-3 text-gray-600">
            Guided by veteran psychologists, medical psychiatrists, and patient advocacy champions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-20 h-20 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-2xl mb-4 border border-emerald-200">
                  {member.avatar}
                </div>
                <h3 className="text-lg font-bold text-gray-900">{member.name}</h3>
                <p className="text-xs font-semibold text-emerald-600 mb-1">{member.role}</p>
                <p className="text-xs text-gray-400 font-medium mb-3">{member.qualifications}</p>
                <p className="text-xs text-gray-600 leading-relaxed">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="bg-white border-t border-gray-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Become part of a healthier, more empathetic world.
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto mb-8 text-base">
            Whether you are taking the courageous step to start personal therapy or wish to list your clinical practice, we welcome you.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/find-professional"
              className="px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold shadow-md shadow-emerald-200 transition-colors"
            >
              Find Your Therapist
            </Link>
            <Link
              to="/for-professionals"
              className="px-8 py-3.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl font-semibold transition-colors"
            >
              Join as a Professional
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
