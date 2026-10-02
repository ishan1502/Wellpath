import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  GraduationCap, BookOpen, Clock, Award, Star,
  ChevronRight, ShoppingBag, Play, Lock
} from 'lucide-react';

// ── Mirrored from Courses.tsx ─────────────────────────────────────────────────
const ALL_COURSES = [
  {
    id: '1',
    title: 'Cognitive Behavioral Therapy (CBT) Fundamentals',
    instructor: 'Dr. Sarah Jenkins',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=800',
    tags: ['CBT', 'Beginner'],
    duration: '6 weeks',
    lessons: 24,
    rating: 4.8,
    price: '$199',
    cpd: '12 CPD Hours',
    progress: 0,
  },
  {
    id: '2',
    title: 'Acceptance and Commitment Therapy (ACT) in Practice',
    instructor: 'Dr. Michael Chen',
    image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=800',
    tags: ['ACT', 'Intermediate'],
    duration: '8 weeks',
    lessons: 32,
    rating: 4.9,
    price: '$249',
    cpd: '16 CPD Hours',
    progress: 0,
  },
  {
    id: '3',
    title: 'Dialectical Behavior Therapy (DBT) Skills Training',
    instructor: 'Emily Rodriguez, LCSW',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800',
    tags: ['DBT', 'Advanced'],
    duration: '10 weeks',
    lessons: 40,
    rating: 4.7,
    price: '$299',
    cpd: '20 CPD Hours',
    progress: 0,
  },
  {
    id: '4',
    title: 'Trauma-Informed Care and Practice',
    instructor: 'Dr. Robert Smith',
    image: 'https://images.unsplash.com/photo-1527689368864-3a821dbccc34?auto=format&fit=crop&q=80&w=800',
    tags: ['Trauma', 'All Levels'],
    duration: '4 weeks',
    lessons: 16,
    rating: 4.9,
    price: '$149',
    cpd: '8 CPD Hours',
    progress: 0,
  },
  {
    id: '5',
    title: 'Mindfulness-Based Stress Reduction (MBSR)',
    instructor: 'Lisa Wong, PsyD',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800',
    tags: ['Mindfulness', 'Beginner'],
    duration: '8 weeks',
    lessons: 28,
    rating: 4.8,
    price: '$179',
    cpd: '14 CPD Hours',
    progress: 0,
  },
  {
    id: '6',
    title: 'Couples Therapy: The Gottman Method Approach',
    instructor: 'Dr. Amanda Foster',
    image: 'https://images.unsplash.com/photo-1573497491208-6b1acb260507?auto=format&fit=crop&q=80&w=800',
    tags: ['Couples', 'Intermediate'],
    duration: '6 weeks',
    lessons: 20,
    rating: 4.6,
    price: '$229',
    cpd: '12 CPD Hours',
    progress: 0,
  },
];

// ── Stub: In production this would come from Supabase (enrolled_courses table) ─
// For now we read from localStorage so purchases persist across refreshes
function getEnrolledIds(): string[] {
  try {
    const raw = localStorage.getItem('enrolledCourses');
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export default function MyCourses() {
  const [enrolledIds] = useState<string[]>(getEnrolledIds);
  const enrolledCourses = ALL_COURSES.filter(c => enrolledIds.includes(c.id));

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-foreground tracking-tight">My Courses</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            {enrolledCourses.length > 0
              ? `${enrolledCourses.length} course${enrolledCourses.length > 1 ? 's' : ''} enrolled`
              : 'Your learning journey starts here'}
          </p>
        </div>
        <Link
          to="/courses"
          className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors shadow-sm"
        >
          <ShoppingBag className="w-4 h-4" />
          Browse Courses
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      {enrolledCourses.length === 0 ? (
        /* ── Empty state ─────────────────────────────────────── */
        <div className="bg-surface rounded-2xl border border-border p-16 text-center flex flex-col items-center">
          <div className="w-20 h-20 bg-primary-muted rounded-2xl flex items-center justify-center mb-6">
            <GraduationCap className="w-10 h-10 text-primary" />
          </div>
          <h2 className="text-xl font-bold text-foreground mb-2">No courses yet</h2>
          <p className="text-muted-foreground text-sm max-w-sm mb-8 leading-relaxed">
            Enroll in a course to start building your mental health knowledge with guidance from world-renowned experts.
          </p>
          <Link
            to="/courses"
            className="bg-primary hover:bg-primary-hover text-white px-8 py-3 rounded-xl font-semibold transition-colors shadow-sm inline-flex items-center gap-2"
          >
            <BookOpen className="w-4 h-4" />
            Explore Courses
          </Link>

          {/* Preview of available courses */}
          <div className="mt-12 w-full text-left">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4">Popular courses</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {ALL_COURSES.slice(0, 3).map(course => (
                <Link
                  key={course.id}
                  to={`/courses`}
                  className="group bg-background border border-border rounded-xl overflow-hidden hover:border-primary/40 hover:shadow-md transition-all"
                >
                  <div className="h-32 overflow-hidden relative">
                    <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <div className="absolute bottom-2 left-3 flex gap-1">
                      {course.tags.map(t => (
                        <span key={t} className="text-[10px] font-bold px-1.5 py-0.5 bg-white/90 text-primary-dark rounded">{t}</span>
                      ))}
                    </div>
                  </div>
                  <div className="p-3">
                    <p className="text-sm font-bold text-foreground line-clamp-2 mb-1">{course.title}</p>
                    <p className="text-xs text-muted-foreground">{course.instructor}</p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-1 text-amber-500">
                        <Star className="w-3 h-3 fill-current" />
                        <span className="text-xs font-bold text-foreground">{course.rating}</span>
                      </div>
                      <span className="text-xs font-bold text-primary">{course.price}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* ── Enrolled courses grid ───────────────────────────── */
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {enrolledCourses.map(course => (
            <div key={course.id} className="bg-surface rounded-2xl border border-border shadow-sm overflow-hidden hover:shadow-md transition-all group">
              {/* Thumbnail */}
              <div className="relative h-44 overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-3 left-3 flex gap-1.5">
                  {course.tags.map(t => (
                    <span key={t} className="text-[10px] font-bold px-2 py-0.5 bg-white/90 text-primary-dark rounded-full">{t}</span>
                  ))}
                </div>
                {/* Play overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                    <Play className="w-6 h-6 text-primary fill-primary" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-bold text-foreground text-sm mb-1 line-clamp-2 leading-snug">{course.title}</h3>
                <p className="text-xs text-muted-foreground mb-4">{course.instructor}</p>

                {/* Progress bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-muted-foreground font-medium">Progress</span>
                    <span className="text-primary font-bold">{course.progress}%</span>
                  </div>
                  <div className="w-full bg-primary-muted/60 rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>

                {/* Meta */}
                <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{course.duration}</span>
                  <span className="flex items-center gap-1"><BookOpen className="w-3 h-3" />{course.lessons} lessons</span>
                  <span className="flex items-center gap-1"><Award className="w-3 h-3" />{course.cpd}</span>
                </div>

                {/* CTA */}
                <button
                  className="w-full bg-primary hover:bg-primary-hover text-white py-2.5 rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-2 shadow-sm"
                  onClick={() => alert('Course player coming soon! Content will be unlocked here.')}
                >
                  <Play className="w-4 h-4" />
                  {course.progress > 0 ? 'Continue Learning' : 'Start Course'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upgrade note at bottom */}
      {enrolledCourses.length > 0 && (
        <div className="bg-primary-muted/40 border border-primary/20 rounded-xl p-4 flex items-start gap-3 text-sm">
          <Lock className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
          <p className="text-primary-dark">
            <span className="font-semibold">Full video player & progress tracking</span> will be available once Razorpay payment integration is live. Your enrollment has been recorded.
          </p>
        </div>
      )}
    </div>
  );
}
