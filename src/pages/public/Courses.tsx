import React, { useState } from 'react';
import { Search, Filter, BookOpen, Clock, Star, Award, ChevronRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const COURSES_DATA = [
  {
    id: '1',
    title: 'Cognitive Behavioral Therapy (CBT) Fundamentals',
    instructor: 'Dr. Sarah Jenkins',
    instructorTitle: 'Clinical Psychologist & CBT Expert',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=1000',
    tags: ['CBT', 'Beginner'],
    duration: '6 weeks',
    lessons: 24,
    rating: 4.8,
    reviews: 128,
    price: '$199',
    cpd: '12 CPD Hours',
  },
  {
    id: '2',
    title: 'Acceptance and Commitment Therapy (ACT) in Practice',
    instructor: 'Dr. Michael Chen',
    instructorTitle: 'Psychiatrist & Author',
    image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=1000',
    tags: ['ACT', 'Intermediate'],
    duration: '8 weeks',
    lessons: 32,
    rating: 4.9,
    reviews: 256,
    price: '$249',
    cpd: '16 CPD Hours',
  },
  {
    id: '3',
    title: 'Dialectical Behavior Therapy (DBT) Skills Training',
    instructor: 'Emily Rodriguez, LCSW',
    instructorTitle: 'Licensed Clinical Social Worker',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1000',
    tags: ['DBT', 'Advanced'],
    duration: '10 weeks',
    lessons: 40,
    rating: 4.7,
    reviews: 89,
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
    rating: 4.6,
    reviews: 95,
    price: '$229',
    cpd: '12 CPD Hours',
  },
];

const CATEGORIES = ['All', 'CBT', 'ACT', 'DBT', 'Trauma', 'Mindfulness', 'Couples'];

const Courses = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredCourses = COURSES_DATA.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || course.tags.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  const handleEnroll = (courseId: string) => {
    if (!isAuthenticated) {
      // Redirect to login, remembering where to go after
      navigate(`/login?redirect=/courses/${courseId}/checkout`);
    } else {
      navigate(`/courses/${courseId}/checkout`);
    }
  };

  return (
    <div className="bg-background min-h-screen pb-20">
      {/* Hero Section */}
      <div className="bg-primary-dark text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
            Master Mental Health Practice
          </h1>
          <p className="text-xl md:text-2xl text-primary-muted max-w-3xl mx-auto mb-10">
            Learn from world-renowned experts. Transform your practice with evidence-based approaches.
          </p>
          <div className="max-w-xl mx-auto relative">
            <div className="flex items-center bg-surface rounded-full p-1 pl-4 shadow-lg">
              <Search className="w-6 h-6 text-gray-400" />
              <input
                type="text"
                placeholder="Search for courses, topics, or instructors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-grow bg-transparent border-none focus:ring-0 text-foreground placeholder-gray-500 px-4 py-3 outline-none"
              />
              <button className="bg-primary hover:bg-primary text-white px-6 py-3 rounded-full font-semibold transition-colors">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        {/* Filters */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-primary-muted text-primary-dark border-2 border-primary'
                    : 'bg-surface text-muted-foreground border border-border hover:border-primary-muted-foreground hover:bg-primary-muted'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-2 text-muted-foreground hover:text-primary bg-surface border border-border px-4 py-2 rounded-lg text-sm font-medium transition-colors self-start md:self-auto shadow-sm">
            <Filter className="w-4 h-4" />
            More Filters
          </button>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <div key={course.id} className="bg-surface rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col group">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={course.image} 
                  alt={course.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-surface/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary-hover flex items-center gap-1 shadow-sm">
                  <Award className="w-3 h-3" />
                  {course.cpd}
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex gap-2 mb-3 flex-wrap">
                  {course.tags.map(tag => (
                    <span key={tag} className="text-xs font-semibold px-2.5 py-0.5 rounded bg-primary-muted text-primary-hover">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2 line-clamp-2">{course.title}</h3>
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700">{course.instructor}</p>
                  <p className="text-xs text-muted-foreground">{course.instructorTitle}</p>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6 bg-background p-3 rounded-lg">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-primary" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4 text-primary" />
                    <span>{course.lessons} lessons</span>
                  </div>
                </div>

                <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100">
                  <div>
                    <div className="flex items-center gap-1 text-amber-500 mb-1">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="font-bold text-foreground">{course.rating}</span>
                      <span className="text-xs text-muted-foreground">({course.reviews})</span>
                    </div>
                    <span className="text-xl font-bold text-foreground">{course.price}</span>
                  </div>
                  <button 
                    onClick={() => handleEnroll(course.id)}
                    className="bg-primary hover:bg-primary-hover text-white px-5 py-2.5 rounded-lg font-semibold text-sm transition-colors flex items-center gap-1 shadow-sm"
                  >
                    Enroll <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredCourses.length === 0 && (
          <div className="text-center py-20 bg-surface rounded-lg border border-gray-100 shadow-sm mt-8">
            <h3 className="text-xl font-semibold text-foreground mb-2">No courses found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filters to find what you're looking for.</p>
            <button 
              onClick={() => {setSearchQuery(''); setSelectedCategory('All');}}
              className="mt-4 text-primary font-medium hover:text-primary-hover"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;
