import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Heart, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  GraduationCap, 
  Lock,
  Target,
  ArrowUpRight
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
      description: 'Every clinician on WellPath is manually verified with rigorous credential checks. We hold zero tolerance for unverified coaching or non-evidence-based claims.'
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
      name: 'Vikramaditya Sharma',
      role: 'Chief Executive Officer & Founder',
      qualifications: 'B.Tech, MBA (Health Systems)',
      bio: 'Passionate about democratizing mental health access after navigating family experiences with fragmented and stigmatized healthcare systems.',
      image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=600'
    },
    {
      name: 'Dr. Ananya Mehta',
      role: 'Chief Clinical Officer & Co-Founder',
      qualifications: 'Ph.D. in Clinical Psychology',
      bio: 'Former consultant at top tertiary hospital centers with over 14 years of clinical experience specializing in CBT and affective disorders.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600'
    },
    {
      name: 'Ishan Jain',
      role: 'Chief Technology Officer & Co-Founder',
      qualifications: 'Platform Architecture & AI Systems',
      bio: 'Leads full-stack architecture, secure HIPAA-ready telehealth systems, data encryption, and AI-assisted provider matching across WellPath.',
      image: '/images/ishan.jpeg',
      portfolioUrl: 'https://iamishan.in'
    },
    {
      name: 'Marcus Vance',
      role: 'Chief Operating Officer',
      qualifications: 'M.S. Healthcare Administration',
      bio: 'Oversees operational scaling, nationwide therapist credentialing pipelines, and regulatory compliance across clinical care networks.',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=600'
    },
    {
      name: 'Dr. Sarah Jenkins',
      role: 'Head of Clinical Research & Education',
      qualifications: 'Ed.D. in Counseling Psychology',
      bio: 'Pioneered our evidence-based wellness courses, psychoeducation frameworks, and student internship supervision curriculum.',
      image: 'https://images.unsplash.com/photo-1598550880863-4e8aa3d0edb4?auto=format&fit=crop&q=80&w=600'
    },
    {
      name: 'Priya Nair',
      role: 'Head of Product & Design',
      qualifications: 'B.Des, Human-Computer Interaction',
      bio: 'Crafts empathetic, accessible digital patient experiences designed to eliminate cognitive overload and friction when seeking therapy.',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=600'
    }
  ];

  return (
    <div className="flex flex-col bg-background min-h-screen pb-20">
      {/* Hero Section */}
      <section className="relative bg-primary-dark pt-24 pb-32 overflow-hidden text-white">
        <div className="absolute inset-0 z-0 opacity-20">
          <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=2000" alt="Team meeting" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-primary-dark/90 z-0"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-dark/80 border border-primary-hover text-primary-muted font-medium mb-8">
            <Sparkles className="w-4 h-4 text-primary-muted" />
            <span>Our Mission</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 max-w-4xl mx-auto leading-tight">
            Making world-class mental healthcare <span className="text-primary-muted">accessible to all.</span>
          </h1>
          <p className="text-xl text-primary-muted max-w-2xl mx-auto leading-relaxed">
            We're building a future where getting the right mental health support is as simple, normal, and effective as visiting a primary care doctor.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-20 -mt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="bg-surface rounded-xl shadow-md p-8 md:p-12 border border-gray-100 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center">
              <div className="text-3xl md:text-4xl font-extrabold text-primary mb-2">{stat.value}</div>
              <div className="text-sm md:text-base font-medium text-muted-foreground uppercase tracking-wide">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">What Drives Us</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Our core values dictate every feature we build, every clinician we hire, and every decision we make.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {coreValues.map((value, idx) => {
              const Icon = value.icon;
              return (
                <div key={idx} className="bg-surface p-8 rounded-xl border border-gray-100 hover:shadow-md transition-all duration-300 group">
                  <div className="w-14 h-14 bg-primary-muted rounded-lg flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-lg">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Story / Mission */}
      <section className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2">
              <div className="relative">
                <img src="https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=1000" alt="Therapy session" className="rounded-xl shadow-lg" />
                <div className="absolute -bottom-8 -right-8 bg-primary-dark text-white p-8 rounded-xl hidden md:block max-w-xs shadow-md">
                  <Target className="w-10 h-10 text-primary-muted mb-4" />
                  <p className="font-bold text-lg leading-snug">"Therapy isn't just about surviving; it's about giving you the tools to thrive."</p>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 lg:pl-10">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">Our Story</h2>
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  WellPath began with a simple but painful realization: finding the right therapist was often harder than the struggles that led people to seek one in the first place.
                </p>
                <p>
                  Between endless waitlists, confusing insurance networks, and trial-and-error matching, the system was broken. We decided to fix it by building a platform that prioritizes clinical quality and patient-provider fit above all else.
                </p>
                <p>
                  Today, we're proud to be the trusted mental health partner for over a million individuals. By integrating therapy, psychiatry, and educational courses, we provide a holistic ecosystem of care tailored to exactly where you are in your journey.
                </p>
              </div>
              <Link to="/matching" className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-xl font-bold mt-10 hover:bg-primary-hover transition-all shadow-lg shadow-emerald-200">
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
            <h2 className="text-3xl font-bold text-foreground mb-4">Meet Our Leadership</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Guided by clinical experts and healthcare innovators committed to systemic change.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, idx) => {
              const hasLink = Boolean((member as any).portfolioUrl);
              const CardInner = (
                <div className={`h-full bg-surface rounded-xl overflow-hidden shadow-sm border border-gray-100 transition-all duration-300 flex flex-col ${
                  hasLink ? 'hover:shadow-lg hover:border-primary/50 group cursor-pointer ring-1 ring-transparent hover:ring-primary/20' : 'hover:shadow-md'
                }`}>
                  <div className="h-64 overflow-hidden relative">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500" 
                    />
                    {hasLink && (
                      <div className="absolute top-3 right-3 bg-surface/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-primary flex items-center gap-1 shadow-sm border border-border">
                        <span>Portfolio</span>
                        <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
                    )}
                  </div>
                  <div className="p-8 text-center flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-foreground mb-1 flex items-center justify-center gap-1.5">
                        <span>{member.name}</span>
                        {hasLink && <ArrowUpRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />}
                      </h3>
                      <p className="text-primary font-bold text-sm mb-3 uppercase tracking-wider">{member.role}</p>
                      <div className="inline-block px-3 py-1 bg-surface-hover text-gray-700 rounded-full text-xs font-semibold mb-6">
                        {member.qualifications}
                      </div>
                      <p className="text-muted-foreground text-sm leading-relaxed">{member.bio}</p>
                    </div>

                    {hasLink && (
                      <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-center gap-1.5 text-xs font-semibold text-primary group-hover:text-primary-hover">
                        <span>Visit Ishan's Portfolio & Connect</span>
                        <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
                    )}
                  </div>
                </div>
              );

              return hasLink ? (
                <a
                  key={idx}
                  href={(member as any).portfolioUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full focus:outline-none focus:ring-2 focus:ring-primary rounded-xl"
                >
                  {CardInner}
                </a>
              ) : (
                <div key={idx} className="h-full">
                  {CardInner}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
