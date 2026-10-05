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

const LinkedinIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
);

interface TeamMember {
  name: string;
  role: string;
  qualifications: string;
  bio: string;
  image: string;
  linkedinUrl: string;
}

const About = () => {
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

  const team: TeamMember[] = [
    {
      name: 'Mridul Munjal',
      role: 'Founder & CEO',
      qualifications: 'B.Tech, MBA (Health Systems)',
      bio: 'Passionate about democratizing mental health access after navigating family experiences with fragmented and stigmatized healthcare systems. Driving WellPath to make high-quality, compassionate mental healthcare accessible to all.',
      image: '/images/mridul-munjal.png',
      linkedinUrl: 'https://www.linkedin.com/in/mridul-munjal-01061998/'
    },
    {
      name: 'Garima Munjal',
      role: 'Co-Founder',
      qualifications: 'Healthcare Strategy & Operations',
      bio: 'Dedicated to revolutionizing mental healthcare delivery by scaling patient-centric operations and compassionate clinician networks. Spearheading strategic initiatives and organizational growth across WellPath.',
      image: '/images/garima-munjal.jpg',
      linkedinUrl: 'https://www.linkedin.com/in/garima-munjal-55b2b9288/'
    },
    {
      name: 'Ishan Jain',
      role: 'Platform Architect & Lead Web Engineer',
      qualifications: 'Web Architecture & Full-Stack Systems',
      bio: 'Architected and engineered the WellPath web platform end-to-end, delivering its clinical-grade security, interactive care matching, and telehealth infrastructure.',
      image: '/images/ishan.jpeg',
      linkedinUrl: 'https://www.linkedin.com/in/ishan1501/'
    }
  ];

  return (
    <div className="flex flex-col bg-background min-h-screen pb-20">
      {/* Hero Section */}
      <section className="relative bg-primary-dark py-24 sm:py-28 overflow-hidden text-white">
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
                  Today, we are committed to being your trusted mental health partner. By integrating therapy, psychiatry, and educational resources, we provide a holistic ecosystem of care tailored to exactly where you are in your journey.
                </p>
              </div>
              <Link to="/matching" className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-xl font-bold mt-10 hover:bg-primary-hover transition-all shadow-lg shadow-emerald-200">
                Start Your Journey Today <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership & Core Team */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">Leadership & Core Team</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Guided by healthcare innovators, clinical experts, and engineers committed to systemic change.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {team.map((member, idx) => (
              <div
                key={idx}
                className="h-full bg-surface rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 flex flex-col group"
              >
                <div className="h-64 sm:h-72 overflow-hidden relative">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" 
                  />
                  <a
                    href={member.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${member.name} on LinkedIn`}
                    title={`Connect with ${member.name} on LinkedIn`}
                    className="absolute top-3.5 right-3.5 bg-white/95 hover:bg-[#0A66C2] text-[#0A66C2] hover:text-white p-2 rounded-full shadow-sm backdrop-blur-md border border-gray-200/80 transition-all duration-200 hover:scale-110 z-10"
                  >
                    <LinkedinIcon className="w-4 h-4 fill-current" />
                  </a>
                </div>

                <div className="p-8 text-center flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-1">
                      {member.name}
                    </h3>
                    <p className="text-primary font-bold text-sm mb-3 uppercase tracking-wider">{member.role}</p>
                    <div className="inline-block px-3 py-1 bg-surface-hover text-gray-700 rounded-full text-xs font-semibold mb-6">
                      {member.qualifications}
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">{member.bio}</p>
                  </div>

                  <div className="mt-8 pt-5 border-t border-gray-100">
                    <a
                      href={member.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-[#0A66C2]/20 bg-[#0A66C2]/5 hover:bg-[#0A66C2] text-[#0A66C2] hover:text-white font-semibold text-sm transition-all duration-200 group/btn shadow-xs hover:shadow-md"
                    >
                      <LinkedinIcon className="w-4 h-4 fill-current" />
                      <span>Connect on LinkedIn</span>
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                    </a>
                  </div>
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
