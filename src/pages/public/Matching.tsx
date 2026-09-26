import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Check, ArrowRight, ArrowLeft, Heart, Sparkles, Activity, Shield } from 'lucide-react';

const QUESTIONS = [
  {
    title: 'What brought you here today?',
    subtitle: 'This helps us find the best fit for your specific needs.',
    icon: <Heart className="w-8 h-8 text-rose-500 mb-4" />,
    options: ['Anxiety', 'Stress', 'Depression', 'Relationship Issues', 'Work/Burnout', 'Trauma/Grief', 'Self-Esteem', 'Something else']
  },
  {
    title: 'How long have you been feeling this way?',
    subtitle: 'Understanding the duration helps us suggest the right approach.',
    icon: <Activity className="w-8 h-8 text-blue-500 mb-4" />,
    options: ['Just recently', 'A few months', 'A year or more', 'It comes and goes']
  },
  {
    title: 'What are your goals for therapy?',
    subtitle: 'We want to ensure your professional aligns with your objectives.',
    icon: <Sparkles className="w-8 h-8 text-amber-500 mb-4" />,
    options: ['Learn coping skills', 'Understand my past', 'Improve relationships', 'Find purpose/direction', 'Just need someone to talk to']
  },
  {
    title: 'Do you have any preferences for your professional?',
    subtitle: 'Your comfort is our top priority.',
    icon: <Shield className="w-8 h-8 text-emerald-500 mb-4" />,
    options: ['Female', 'Male', 'Non-binary', 'LGBTQ+ Affirming', 'Faith-based', 'No preference']
  }
];

export default function Matching() {
  const [searchParams] = useSearchParams();
  const initialConcern = searchParams.get('concern');
  
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (initialConcern) {
      // Map initial concern from URL to first question if it matches roughly
      const mapped = QUESTIONS[0].options.find(opt => opt.toLowerCase().includes(initialConcern.toLowerCase()));
      if (mapped) {
        setAnswers(prev => ({ ...prev, 0: mapped }));
      }
    }
  }, [initialConcern]);

  const handleSelect = (option: string) => {
    setAnswers({ ...answers, [currentStep]: option });
    // Auto advance after short delay
    setTimeout(() => {
      handleNext();
    }, 400);
  };

  const handleNext = () => {
    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsAnalyzing(true);
      setTimeout(() => {
        const basePath = window.location.pathname.startsWith('/patient') ? '/patient' : 
                         window.location.pathname.startsWith('/student') ? '/student' : '';
        navigate(`${basePath}/find-professional?matched=true`);
      }, 2500);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate(-1);
    }
  };

  if (isAnalyzing) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl max-w-md w-full text-center border border-gray-100">
          <div className="relative w-24 h-24 mx-auto mb-8">
            <div className="absolute inset-0 border-4 border-emerald-100 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-emerald-600 rounded-full border-t-transparent animate-spin"></div>
            <Heart className="absolute inset-0 m-auto w-8 h-8 text-emerald-600 animate-pulse" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Finding your match</h2>
          <p className="text-gray-500">We're analyzing your answers to connect you with the perfect professional...</p>
        </div>
      </div>
    );
  }

  const currentQuestion = QUESTIONS[currentStep];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pt-12 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto w-full flex-grow flex flex-col">
        {/* Progress */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-4">
            <button 
              onClick={handleBack}
              className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-500"
              aria-label="Go back"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <span className="text-sm font-bold text-gray-400 tracking-widest uppercase">
              Question {currentStep + 1} of {QUESTIONS.length}
            </span>
            <div className="w-9"></div> {/* Spacer for alignment */}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
            <div 
              className="bg-emerald-600 h-full rounded-full transition-all duration-500 ease-out" 
              style={{ width: `${((currentStep) / QUESTIONS.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Question Area */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 flex-grow flex flex-col">
          <div className="text-center mb-10">
            <div className="flex justify-center">{currentQuestion.icon}</div>
            <h1 className="text-3xl font-extrabold text-gray-900 mb-3">{currentQuestion.title}</h1>
            <p className="text-gray-500">{currentQuestion.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-auto mb-8">
            {currentQuestion.options.map((option) => {
              const isSelected = answers[currentStep] === option;
              return (
                <button
                  key={option}
                  onClick={() => handleSelect(option)}
                  className={`relative p-5 text-left rounded-2xl border-2 transition-all duration-200 flex items-center justify-between group ${
                    isSelected 
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-900' 
                      : 'border-gray-100 bg-white hover:border-emerald-300 hover:bg-emerald-50/50 text-gray-700'
                  }`}
                >
                  <span className={`font-semibold ${isSelected ? '' : 'group-hover:text-emerald-700'}`}>
                    {option}
                  </span>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                    isSelected ? 'bg-emerald-600 text-white' : 'bg-gray-100 group-hover:bg-emerald-200'
                  }`}>
                    {isSelected && <Check className="w-4 h-4" />}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="flex justify-end pt-6 border-t border-gray-100 mt-auto">
            <Button 
              onClick={handleNext} 
              disabled={!answers[currentStep]}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-6 rounded-xl text-lg font-bold w-full sm:w-auto"
            >
              {currentStep === QUESTIONS.length - 1 ? 'Find Matches' : 'Continue'} <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
