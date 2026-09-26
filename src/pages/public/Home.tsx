import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Shield, Clock, Video, Star, User, Users, Smile, Heart, CheckCircle2, ChevronRight, BookOpen, Activity } from 'lucide-react';
import { mockProfessionals } from '../../data/mockData';

const Home = () => {
  const navigate = useNavigate();
  const [concern, setConcern] = useState('');

  const handleQuickMatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (concern) {
      navigate(`/matching?concern=${encodeURIComponent(concern)}`);
    } else {
      navigate('/matching');
    }
  };

  return (
    <div className="flex flex-col w-full overflow-x-hidden">
      {/* Interactive Hero Section - BetterHelp/Talkspace inspired */}
      <section className="relative bg-emerald-900 pt-20 pb-28 lg:pt-32 lg:pb-40 overflow-hidden text-white">
        <div className="absolute inset-0 z-0 opacity-20">
          <img src="https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=2000" alt="Therapy Session" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900 via-emerald-900/90 to-emerald-900/40 z-0"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col lg:flex-row items-center gap-12">
          <div className="w-full lg:w-3/5">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-800/50 border border-emerald-700/50 text-emerald-100 text-sm font-medium mb-6 backdrop-blur-sm">
              <Star className="w-4 h-4 text-amber-400 fill-current" />
              <span>Ranked #1 Mental Health Platform 2026</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              You deserve to be <span className="text-emerald-300">happy.</span>
            </h1>
            <p className="text-lg md:text-xl text-emerald-50 mb-10 leading-relaxed max-w-2xl">
              Take the first step towards better mental health. Connect with licensed therapists, psychiatrists, and wellness courses designed for your unique journey.
            </p>
            
            <div className="bg-white p-6 rounded-2xl shadow-2xl max-w-xl text-gray-900">
              <h3 className="font-semibold text-lg mb-4">Let's find the right support for you</h3>
              <form onSubmit={handleQuickMatch} className="flex flex-col sm:flex-row gap-3">
                <select 
                  className="flex-grow bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                  value={concern}
                  onChange={(e) => setConcern(e.target.value)}
                >
                  <option value="">I'm looking for help with...</option>
                  <option value="anxiety">Anxiety & Stress</option>
                  <option value="depression">Depression</option>
                  <option value="relationships">Relationship Issues</option>
                  <option value="trauma">Trauma & PTSD</option>
                  <option value="career">Career/Burnout</option>
                  <option value="other">Something else</option>
                </select>
                <button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors whitespace-nowrap flex items-center justify-center gap-2">
                  Get Matched <ChevronRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
          
          <div className="hidden lg:flex w-full lg:w-2/5 justify-end">
             <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 text-center transform translate-y-8">
                  <div className="text-4xl font-bold text-white mb-2">10k+</div>
                  <div className="text-emerald-100 text-sm">Verified Professionals</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 text-center">
                  <div className="text-4xl font-bold text-white mb-2">1M+</div>
                  <div className="text-emerald-100 text-sm">Sessions Completed</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 text-center transform translate-y-8">
                  <div className="text-4xl font-bold text-white mb-2 flex justify-center items-center gap-1">4.9<Star className="w-5 h-5 fill-current text-amber-400"/></div>
                  <div className="text-emerald-100 text-sm">Average Rating</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 text-center">
                  <div className="text-4xl font-bold text-white mb-2">24/7</div>
                  <div className="text-emerald-100 text-sm">Access to Care</div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Holistic Services Section - Amaha inspired */}
      <section className="py-20 bg-gray-50 -mt-8 rounded-t-[3rem] relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Comprehensive Mental Healthcare</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">From therapy and psychiatry to self-paced courses, we offer a full ecosystem of support for your mind.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Therapy */}
            <Link to="/find-professional?type=therapy" className="bg-white rounded-3xl p-8 hover:shadow-xl transition-all duration-300 border border-gray-100 group">
              <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 mb-6 group-hover:scale-110 transition-transform">
                <Heart className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Therapy</h3>
              <p className="text-gray-600 text-sm mb-4 flex-grow">Connect with licensed therapists for individual, couples, or teen counseling via video, phone, or text.</p>
              <span className="text-emerald-600 font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">Explore Therapy <ChevronRight className="w-4 h-4" /></span>
            </Link>

            {/* Psychiatry */}
            <Link to="/find-professional?type=psychiatry" className="bg-white rounded-3xl p-8 hover:shadow-xl transition-all duration-300 border border-gray-100 group">
              <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform">
                <Activity className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Psychiatry</h3>
              <p className="text-gray-600 text-sm mb-4 flex-grow">Expert medical doctors available for psychiatric evaluations and medication management.</p>
              <span className="text-blue-600 font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">See Psychiatrists <ChevronRight className="w-4 h-4" /></span>
            </Link>

            {/* Courses - New section! */}
            <Link to="/courses" className="bg-white rounded-3xl p-8 hover:shadow-xl transition-all duration-300 border border-gray-100 group">
              <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-600 mb-6 group-hover:scale-110 transition-transform">
                <BookOpen className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Courses</h3>
              <p className="text-gray-600 text-sm mb-4 flex-grow">Self-paced, expert-led courses (CBT, DBT, Mindfulness) to learn essential mental wellness skills.</p>
              <span className="text-purple-600 font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">Browse Courses <ChevronRight className="w-4 h-4" /></span>
            </Link>

            {/* Support Groups */}
            <Link to="/events" className="bg-white rounded-3xl p-8 hover:shadow-xl transition-all duration-300 border border-gray-100 group">
              <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Group Sessions</h3>
              <p className="text-gray-600 text-sm mb-4 flex-grow">Join live, anonymous group webinars and support groups led by mental health experts.</p>
              <span className="text-orange-600 font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">View Events <ChevronRight className="w-4 h-4" /></span>
            </Link>
          </div>
        </div>
      </section>

      {/* How it works - Mindlercare Inspired */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Quality care, simplified.</h2>
              <p className="text-lg text-gray-600 mb-10">We believe getting help shouldn't be hard. Our streamlined process connects you with the right support in minutes, not months.</p>
              
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 font-bold text-xl">1</div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">Share your needs</h4>
                    <p className="text-gray-600">Take a brief questionnaire to tell us what you're dealing with and what you're looking for in a professional.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 font-bold text-xl">2</div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">Get matched instantly</h4>
                    <p className="text-gray-600">Our algorithm curates a list of available, specialized professionals that perfectly align with your preferences.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 font-bold text-xl">3</div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">Start your journey</h4>
                    <p className="text-gray-600">Book a time that works for you. Access care via secure video call, phone, or messaging anytime, anywhere.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2">
              <img src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=1000" alt="Therapy App interface" className="rounded-3xl shadow-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Professionals */}
      <section className="py-24 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet our experts</h2>
              <p className="text-gray-600">Every professional on WELLPath is rigorously vetted, fully licensed, and highly experienced.</p>
            </div>
            <Link to="/find-professional" className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 hover:border-emerald-500 rounded-xl text-gray-700 font-semibold transition-colors flex-shrink-0">
              View all <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory hide-scrollbar">
            {[
              {
                id: '1',
                name: 'Dr. Sarah Jenkins',
                type: 'Clinical Psychologist',
                image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
                experience: '12 yrs exp',
                rating: '4.9',
                specialties: ['Anxiety', 'Depression']
              },
              {
                id: '2',
                name: 'Dr. Michael Chen',
                type: 'Psychiatrist',
                image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400',
                experience: '15 yrs exp',
                rating: '4.8',
                specialties: ['ADHD', 'Bipolar']
              },
              {
                id: '3',
                name: 'Emily Rodriguez, LCSW',
                type: 'Licensed Social Worker',
                image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=400',
                experience: '8 yrs exp',
                rating: '4.9',
                specialties: ['Trauma', 'Grief']
              },
              {
                id: '4',
                name: 'Dr. Robert Smith',
                type: 'Couples Therapist',
                image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400',
                experience: '20 yrs exp',
                rating: '4.7',
                specialties: ['Relationships', 'Family']
              }
            ].map(prof => (
              <div key={prof.id} className="min-w-[300px] md:min-w-[350px] bg-white rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all border border-gray-100 flex flex-col snap-start group">
                <div className="w-full h-48 rounded-2xl overflow-hidden mb-6 relative">
                  <img src={prof.image} alt={prof.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold text-emerald-700 flex items-center gap-1">
                    <Star className="w-3 h-3 fill-current" /> {prof.rating}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {prof.name}
                </h3>
                <p className="text-emerald-600 font-medium text-sm mb-4">{prof.type} • {prof.experience}</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {prof.specialties.map(s => (
                    <span key={s} className="px-3 py-1 bg-gray-50 text-gray-600 rounded-lg text-xs font-medium border border-gray-100">
                      {s}
                    </span>
                  ))}
                </div>
                
                <Link to={`/professionals/${prof.id}`} className="mt-auto w-full text-center py-3 bg-gray-50 hover:bg-emerald-50 text-emerald-700 font-semibold rounded-xl transition-colors border border-gray-100 hover:border-emerald-200">
                  View Profile
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Safety Section */}
      <section className="py-20 bg-emerald-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <Shield className="w-16 h-16 text-emerald-400 mb-6" />
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">Safe, secure, and completely confidential</h2>
              <p className="text-emerald-100 text-lg mb-8 leading-relaxed">
                Your privacy is non-negotiable. We employ state-of-the-art security measures to ensure that your conversations, personal data, and payment information are protected at all times.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-emerald-50">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400 flex-shrink-0" />
                  <span>Fully HIPAA Compliant Platform</span>
                </li>
                <li className="flex items-center gap-3 text-emerald-50">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400 flex-shrink-0" />
                  <span>End-to-end 256-bit encryption</span>
                </li>
                <li className="flex items-center gap-3 text-emerald-50">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400 flex-shrink-0" />
                  <span>Strict privacy protocols</span>
                </li>
              </ul>
            </div>
            <div className="bg-emerald-800/50 p-8 sm:p-12 rounded-3xl border border-emerald-700 backdrop-blur-sm">
              <h3 className="text-2xl font-bold mb-6">Ready to prioritize yourself?</h3>
              <p className="text-emerald-100 mb-8">Join millions of people who have found help, healing, and happiness through our platform.</p>
              <div className="space-y-4">
                <Link to="/matching" className="block w-full py-4 bg-white text-emerald-900 text-center rounded-xl font-bold text-lg hover:bg-emerald-50 transition-colors shadow-xl shadow-emerald-900/20">
                  Get Matched with a Therapist
                </Link>
                <Link to="/courses" className="block w-full py-4 bg-transparent border border-emerald-400 text-emerald-50 text-center rounded-xl font-bold text-lg hover:bg-emerald-800 transition-colors">
                  Explore Wellness Courses
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
