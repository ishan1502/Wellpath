import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft, Shield, Clock, BookOpen, Award, Star,
  CreditCard, CheckCircle2, Lock, Zap, ChevronRight
} from 'lucide-react';

const COURSES_DATA: Record<string, {
  id: string;
  title: string;
  instructor: string;
  instructorTitle: string;
  image: string;
  tags: string[];
  duration: string;
  lessons: number;
  rating: number;
  reviews: number;
  price: number;
  cpd: string;
  includes: string[];
}> = {
  '1': {
    id: '1',
    title: 'Cognitive Behavioral Therapy (CBT) Fundamentals',
    instructor: 'Dr. Sarah Jenkins',
    instructorTitle: 'Clinical Psychologist & CBT Expert',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=800',
    tags: ['CBT', 'Beginner'],
    duration: '6 weeks',
    lessons: 24,
    rating: 4.8,
    reviews: 128,
    price: 199,
    cpd: '12 CPD Hours',
    includes: ['24 on-demand video lessons', '6 weeks of guided content', 'Certificate of completion', '12 CPD hours accredited', 'Lifetime access', 'Q&A with instructor'],
  },
  '2': {
    id: '2',
    title: 'Acceptance and Commitment Therapy (ACT) in Practice',
    instructor: 'Dr. Michael Chen',
    instructorTitle: 'Psychiatrist & Author',
    image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=800',
    tags: ['ACT', 'Intermediate'],
    duration: '8 weeks',
    lessons: 32,
    rating: 4.9,
    reviews: 256,
    price: 249,
    cpd: '16 CPD Hours',
    includes: ['32 on-demand video lessons', '8 weeks of guided content', 'Certificate of completion', '16 CPD hours accredited', 'Lifetime access', 'Q&A with instructor'],
  },
  '3': {
    id: '3',
    title: 'Dialectical Behavior Therapy (DBT) Skills Training',
    instructor: 'Emily Rodriguez, LCSW',
    instructorTitle: 'Licensed Clinical Social Worker',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800',
    tags: ['DBT', 'Advanced'],
    duration: '10 weeks',
    lessons: 40,
    rating: 4.7,
    reviews: 89,
    price: 299,
    cpd: '20 CPD Hours',
    includes: ['40 on-demand video lessons', '10 weeks of guided content', 'Certificate of completion', '20 CPD hours accredited', 'Lifetime access', 'Q&A with instructor'],
  },
  '4': {
    id: '4',
    title: 'Trauma-Informed Care and Practice',
    instructor: 'Dr. Robert Smith',
    instructorTitle: 'Trauma Specialist',
    image: 'https://images.unsplash.com/photo-1527689368864-3a821dbccc34?auto=format&fit=crop&q=80&w=800',
    tags: ['Trauma', 'All Levels'],
    duration: '4 weeks',
    lessons: 16,
    rating: 4.9,
    reviews: 412,
    price: 149,
    cpd: '8 CPD Hours',
    includes: ['16 on-demand video lessons', '4 weeks of guided content', 'Certificate of completion', '8 CPD hours accredited', 'Lifetime access', 'Q&A with instructor'],
  },
  '5': {
    id: '5',
    title: 'Mindfulness-Based Stress Reduction (MBSR)',
    instructor: 'Lisa Wong, PsyD',
    instructorTitle: 'Clinical Psychologist',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800',
    tags: ['Mindfulness', 'Beginner'],
    duration: '8 weeks',
    lessons: 28,
    rating: 4.8,
    reviews: 175,
    price: 179,
    cpd: '14 CPD Hours',
    includes: ['28 on-demand video lessons', '8 weeks of guided content', 'Certificate of completion', '14 CPD hours accredited', 'Lifetime access', 'Q&A with instructor'],
  },
  '6': {
    id: '6',
    title: 'Couples Therapy: The Gottman Method approach',
    instructor: 'Dr. Amanda Foster',
    instructorTitle: 'Marriage and Family Therapist',
    image: 'https://images.unsplash.com/photo-1573497491208-6b1acb260507?auto=format&fit=crop&q=80&w=800',
    tags: ['Couples', 'Intermediate'],
    duration: '6 weeks',
    lessons: 20,
    rating: 4.6,
    reviews: 95,
    price: 229,
    cpd: '12 CPD Hours',
    includes: ['20 on-demand video lessons', '6 weeks of guided content', 'Certificate of completion', '12 CPD hours accredited', 'Lifetime access', 'Q&A with instructor'],
  },
};

const CourseCheckout = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const course = id ? COURSES_DATA[id] : null;

  if (!course) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-2">Course not found</h2>
          <p className="text-muted-foreground mb-6">The course you're looking for doesn't exist.</p>
          <Link to="/courses" className="text-primary font-semibold hover:underline">
            Browse all courses
          </Link>
        </div>
      </div>
    );
  }

  const handlePayNow = () => {
    // Razorpay integration placeholder — will be wired up in a future sprint
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      alert('Razorpay payment integration coming soon! Your order has been noted.');
    }, 1200);
  };

  const gst = Math.round(course.price * 0.18);
  const total = course.price + gst;

  return (
    <div className="bg-background min-h-screen pb-20">
      {/* Top bar */}
      <div className="bg-surface border-b border-border px-4 py-4">
        <div className="max-w-6xl mx-auto flex items-center gap-4">
          <button
            onClick={() => navigate('/courses')}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Courses
          </button>
          <div className="flex items-center gap-1 ml-auto text-xs text-muted-foreground">
            <Lock className="w-3.5 h-3.5 text-primary" />
            Secure Checkout
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-8">Complete your purchase</h1>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* ── LEFT: Order Summary ─────────────────────────────── */}
          <div className="lg:col-span-3 space-y-6">
            {/* Course card */}
            <div className="bg-surface rounded-xl border border-border overflow-hidden shadow-sm flex gap-0 flex-col sm:flex-row">
              <div className="sm:w-48 h-48 sm:h-auto flex-shrink-0 overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 flex flex-col justify-between flex-grow">
                <div>
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {course.tags.map(t => (
                      <span key={t} className="text-xs font-semibold px-2 py-0.5 rounded bg-primary-muted text-primary-hover">
                        {t}
                      </span>
                    ))}
                  </div>
                  <h2 className="text-lg font-bold text-foreground mb-1 leading-snug">{course.title}</h2>
                  <p className="text-sm font-medium text-gray-700">{course.instructor}</p>
                  <p className="text-xs text-muted-foreground">{course.instructorTitle}</p>
                </div>
                <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-primary" />{course.duration}</span>
                  <span className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5 text-primary" />{course.lessons} lessons</span>
                  <span className="flex items-center gap-1"><Award className="w-3.5 h-3.5 text-primary" />{course.cpd}</span>
                  <span className="flex items-center gap-1 text-amber-500">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span className="font-bold text-foreground">{course.rating}</span>
                    <span className="text-muted-foreground">({course.reviews})</span>
                  </span>
                </div>
              </div>
            </div>

            {/* What's included */}
            <div className="bg-surface rounded-xl border border-border p-6 shadow-sm">
              <h3 className="font-bold text-foreground mb-4">What's included</h3>
              <ul className="space-y-3">
                {course.includes.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-primary" />
                30-day money-back guarantee
              </div>
              <div className="flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-primary" />
                Secure 256-bit SSL checkout
              </div>
              <div className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-primary" />
                Instant access after payment
              </div>
            </div>
          </div>

          {/* ── RIGHT: Payment Panel ─────────────────────────────── */}
          <div className="lg:col-span-2">
            <div className="bg-surface rounded-xl border border-border shadow-sm p-6 sticky top-24">
              {/* Price breakdown */}
              <h3 className="font-bold text-foreground mb-5 text-lg">Order summary</h3>
              <div className="space-y-3 text-sm mb-5">
                <div className="flex justify-between text-muted-foreground">
                  <span>Course price</span>
                  <span>₹{(course.price * 83).toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>GST (18%)</span>
                  <span>₹{(gst * 83).toLocaleString('en-IN')}</span>
                </div>
                <div className="border-t border-border pt-3 flex justify-between font-bold text-foreground text-base">
                  <span>Total</span>
                  <span>₹{(total * 83).toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Razorpay Placeholder */}
              <div className="bg-background border border-dashed border-primary/40 rounded-xl p-5 mb-5 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <CreditCard className="w-5 h-5 text-primary" />
                  <span className="font-semibold text-foreground text-sm">Payment via Razorpay</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Secure payment powered by Razorpay. Supports UPI, credit/debit cards, net banking & wallets.
                </p>
                <div className="mt-3 flex justify-center gap-2 flex-wrap">
                  {['UPI', 'Visa', 'Mastercard', 'Netbanking', 'Wallets'].map(m => (
                    <span key={m} className="px-2 py-0.5 bg-surface border border-border rounded text-[10px] font-medium text-muted-foreground">
                      {m}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={handlePayNow}
                disabled={isProcessing}
                className="w-full bg-primary hover:bg-primary-hover text-white py-4 rounded-xl font-bold text-base transition-colors flex items-center justify-center gap-2 shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <>
                    <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    Pay ₹{(total * 83).toLocaleString('en-IN')} Now
                    <ChevronRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <p className="text-xs text-muted-foreground text-center mt-3 leading-relaxed">
                By completing your purchase you agree to our{' '}
                <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link>
                {' '}and{' '}
                <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
              </p>

              {/* Razorpay badge */}
              <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-muted-foreground border-t border-border pt-4">
                <span className="font-semibold text-[#072654]">Secured by</span>
                <span className="font-bold text-[#3395FF]">Razorpay</span>
                <span className="text-[10px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded font-semibold ml-1">Coming Soon</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCheckout;
