import React, { useState } from 'react';
import { BookOpen, GraduationCap, Play, Clock, Award, Lock, Star, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ALL_COURSES = [
  {
    id: '1',
    title: 'Cognitive Behavioral Therapy (CBT) Fundamentals',
    instructor: 'Dr. Sarah Jenkins',
    instructorTitle: 'Clinical Psychologist',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=1000',
    tags: ['CBT', 'Beginner'],
    duration: '6 weeks',
    lessons: 24,
    rating: 4.9,
    reviews: 128,
    price: '$199',
    cpd: '12 CPD Hours',
  },
  {
    id: '2',
    title: 'Acceptance and Commitment Therapy (ACT) in Practice',
    instructor: 'Dr. Michael Chen',
    instructorTitle: 'Psychiatrist',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=1000',
    tags: ['ACT', 'Intermediate'],
    duration: '8 weeks',
    lessons: 32,
    rating: 4.8,
    reviews: 95,
    price: '$249',
    cpd: '16 CPD Hours',
  },
  {
    id: '3',
    title: 'Dialectical Behavior Therapy (DBT) Skills Training',
    instructor: 'Emily Rodriguez, LCSW',
    instructorTitle: 'Licensed Clinical Social Worker',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1000',
    tags: ['DBT', 'Advanced'],
    duration: '10 weeks',
    lessons: 40,
    rating: 4.9,
    reviews: 215,
    price: '$299',
    cpd: '20 CPD Hours',
  },
  {
    id: '4',
    title: 'Trauma-Informed Care and Practice',
    instructor: 'Dr. Robert Smith',
    instructorTitle: 'Trauma Specialist',
    image: 'https://images.unsplash.com/photo-1527689368864-3a821dbccc34?auto=format&fit=crop&q=80&w=1000',
    tags: ['Trauma', 'All Levels'],
    duration: '4 weeks',
    lessons: 16,
    rating: 4.9,
    reviews: 412,
    price: '$149',
    cpd: '8 CPD Hours',
  },
  {
    id: '5',
    title: 'Mindfulness-Based Stress Reduction (MBSR)',
    instructor: 'Lisa Wong, PsyD',
    instructorTitle: 'Clinical Psychologist',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=1000',
    tags: ['Mindfulness', 'Beginner'],
    duration: '8 weeks',
    lessons: 28,
    rating: 4.8,
    reviews: 175,
    price: '$179',
    cpd: '14 CPD Hours',
  },
  {
    id: '6',
    title: 'Couples Therapy: The Gottman Method approach',
    instructor: 'Dr. Amanda Foster',
    instructorTitle: 'Marriage and Family Therapist',
    image: 'https://images.unsplash.com/photo-1573497491208-6b1acb260507?auto=format&fit=crop&q=80&w=1000',
    tags: ['Couples', 'Intermediate'],
    duration: '6 weeks',
    lessons: 20,
    rating: 4.7,
    reviews: 88,
    price: '$229',
    cpd: '10 CPD Hours',
  }
];

export default function MyCourses() {
  const [enrolledCourses] = useState<any[]>([]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-2">
        <div>
          <h1 className="text-2xl font-bold text-primary-dark">My Courses</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            {enrolledCourses.length > 0
              ? `${enrolledCourses.length} course${enrolledCourses.length > 1 ? 's' : ''} enrolled`
              : 'Your learning journey starts here'}
          </p>
        </div>
      </div>

      {enrolledCourses.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
          {enrolledCourses.map(course => (
            <div key={course.id} className="bg-surface rounded-2xl border border-border shadow-sm overflow-hidden hover:shadow-md transition-all group">
              <div className="relative h-44 overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-3 left-3 flex gap-1.5">
                  {course.tags.map((t: string) => (
                    <span key={t} className="text-[10px] font-bold px-2 py-0.5 bg-white/90 text-primary-dark rounded-full">{t}</span>
                  ))}
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                    <Play className="w-6 h-6 text-primary fill-primary" />
                  </div>
                </div>
              </div>

              <div className="p-5">
                <h3 className="font-bold text-foreground text-sm mb-1 line-clamp-2 leading-snug">{course.title}</h3>
                <p className="text-xs text-muted-foreground mb-4">{course.instructor}</p>

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

                <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{course.duration}</span>
                  <span className="flex items-center gap-1"><BookOpen className="w-3 h-3" />{course.lessons} lessons</span>
                  <span className="flex items-center gap-1"><Award className="w-3 h-3" />{course.cpd}</span>
                </div>

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

      <div>
        <h2 className="text-xl font-bold text-foreground mb-6">
          {enrolledCourses.length > 0 ? 'Discover More Courses' : 'Available Courses'}
        </h2>
        
        {enrolledCourses.length === 0 && (
          <div className="bg-primary-muted/40 border border-primary/20 rounded-xl p-4 flex items-center gap-3 text-sm mb-6">
            <GraduationCap className="w-5 h-5 text-primary flex-shrink-0" />
            <p className="text-primary-dark">
              You haven't enrolled in any courses yet. Browse our full catalog below to get started!
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ALL_COURSES.map(course => (
            <div
              key={course.id}
              className="group bg-surface border border-border rounded-xl overflow-hidden hover:border-primary/40 hover:shadow-md transition-all flex flex-col"
            >
              <div className="h-40 overflow-hidden relative">
                <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute top-3 right-3 bg-white/90 text-primary-dark text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow-sm">
                  <Award className="w-3.5 h-3.5" />
                  {course.cpd}
                </div>
                <div className="absolute bottom-3 left-3 flex gap-1.5 flex-wrap">
                  {course.tags.map(t => (
                    <span key={t} className="text-[10px] font-bold px-2 py-1 bg-white/95 text-primary-dark rounded-md">{t}</span>
                  ))}
                </div>
              </div>
              
              <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-base font-bold text-foreground line-clamp-2 mb-2 leading-tight group-hover:text-primary transition-colors">{course.title}</h3>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-6 h-6 rounded-full bg-primary-muted flex items-center justify-center text-primary text-xs font-bold">
                    {course.instructor[0]}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-700">{course.instructor}</p>
                    <p className="text-[10px] text-muted-foreground">{course.instructorTitle}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {course.duration}</span>
                  <span className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5" /> {course.lessons} lessons</span>
                </div>
                
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
                  <div className="flex items-center gap-1.5 text-amber-500">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm font-bold text-foreground">{course.rating}</span>
                    <span className="text-xs text-muted-foreground">({course.reviews})</span>
                  </div>
                  <span className="text-lg font-extrabold text-primary">{course.price}</span>
                </div>
                
                <Link 
                  to={`/courses/${course.id}/checkout`}
                  className="mt-4 w-full bg-primary-muted hover:bg-primary text-primary-hover hover:text-white font-bold py-2.5 rounded-lg text-sm text-center transition-colors flex items-center justify-center gap-2"
                >
                  Enroll Now <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
