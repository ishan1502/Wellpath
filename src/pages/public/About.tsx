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
  Lock,
  Target
} from 'lucide-react';

const About = () => {
  const stats = [
    { label: 'Therapy Sessions Delivered', value: '1M+' },
    { label: 'Verified Clinicians & Doctors', value: '10,000+' },
    { label: 'Client Satisfaction Rating', value: '4.9/5' },
    { label: 'Specializations Supported', value: '50+' }
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
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600'
    },
    {
      name: 'Vikramaditya Sharma',
      role: 'Chief Executive Officer & Co-Founder',
      qualifications: 'B.Tech, MBA (Health Systems)',
      bio: 'Passionate about democratizing mental health access after navigating family experiences with fragmented and stigmatized healthcare systems.',
      image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=600'
    },
    {
      name: 'Dr. Sarah Jenkins',
      role: 'Head of Educational Programs',
      qualifications: 'Ed.D. in Counseling Psychology',
      bio: 'Pioneered our wellness courses and certification programs to empower individuals with evidence-based self-care tools.',
      image: 'https://images.unsplash.com/photo-1598550880863-4e8aa3d0edb4?auto=format&fit=crop&q=80&w=600'
    }
  ];

  return (
    <div className="flex flex-col bg-gray-50 min-h-screen pb-20">
      {/* Hero Section */}
      <section className="relative bg-emerald-900 pt-24 pb-32 overflow-hidden text-white">
        <div className="absolute inset-0 z-0 opacity-20">
          <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=2000" alt="Team meeting" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-emerald-900/90 z-0"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-800/80 border border-emerald-700 text-emerald-100 font-medium mb-8">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>Our Mission</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 max-w-4xl mx-auto leading-tight">
            Making world-class mental healthcare <span className="text-emerald-400">accessible to all.</span>
          </h1>
          <p className="text-xl text-emerald-100 max-w-2xl mx-auto leading-relaxed">
            We're building a future where getting the right mental health support is as simple, normal, and effective as visiting a primary care doctor.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-20 -mt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center">
              <div className="text-3xl md:text-4xl font-extrabold text-emerald-600 mb-2">{stat.value}</div>
              <div className="text-sm md:text-base font-medium text-gray-500 uppercase tracking-wide">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Drives Us</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Our core values dictate every feature we build, every clinician we hire, and every decision we make.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {coreValues.map((value, idx) => {
              const Icon = value.icon;
              return (
                <div key={idx} className="bg-white p-8 rounded-3xl border border-gray-100 hover:shadow-xl transition-all duration-300 group">
                  <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-lg">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Story / Mission */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2">
              <div className="relative">
                <img src="https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=1000" alt="Therapy session" className="rounded-3xl shadow-2xl" />
                <div className="absolute -bottom-8 -right-8 bg-emerald-900 text-white p-8 rounded-3xl hidden md:block max-w-xs shadow-xl">
                  <Target className="w-10 h-10 text-emerald-400 mb-4" />
                  <p className="font-bold text-lg leading-snug">"Therapy isn't just about surviving; it's about giving you the tools to thrive."</p>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 lg:pl-10">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p>
                  WELLPath began with a simple but painful realization: finding the right therapist was often harder than the struggles that led people to seek one in the first place.
                </p>
                <p>
                  Between endless waitlists, confusing insurance networks, and trial-and-error matching, the system was broken. We decided to fix it by building a platform that prioritizes clinical quality and patient-provider fit above all else.
                </p>
                <p>
                  Today, we're proud to be the trusted mental health partner for over a million individuals. By integrating therapy, psychiatry, and educational courses, we provide a holistic ecosystem of care tailored to exactly where you are in your journey.
                </p>
              </div>
              <Link to="/matching" className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-600 text-white rounded-xl font-bold mt-10 hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200">
                Start Your Journey Today <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Leadership</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Guided by clinical experts and healthcare innovators committed to systemic change.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, idx) => (
              <div key={idx} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300">
                <div className="h-64 overflow-hidden">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-8 text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-emerald-600 font-bold text-sm mb-3 uppercase tracking-wider">{member.role}</p>
                  <div className="inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-semibold mb-6">
                    {member.qualifications}
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
