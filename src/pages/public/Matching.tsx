import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Check, ArrowRight, ArrowLeft, Heart, Sparkles, Activity, Shield } from 'lucide-react';
import { CONCERN_LABELS, mapToConcernLabels } from '@/constants/concerns';

const QUESTIONS = [
  {
    title: 'What brought you here today?',
    subtitle: 'This helps us find the best fit for your specific needs.',
    icon: <Heart className="w-8 h-8 text-rose-500 mb-4" />,
    options: CONCERN_LABELS,
    isMultiSelect: true
  },
  {
    title: 'How long have you been feeling this way?',
    subtitle: 'Understanding the duration helps us suggest the right approach.',
    icon: <Activity className="w-8 h-8 text-blue-500 mb-4" />,
    options: ['Just recently', 'A few months', 'A year or more', 'It comes and goes'],
    isMultiSelect: false
  },
  {
    title: 'What are your goals for therapy?',
    subtitle: 'We want to ensure your professional aligns with your objectives.',
    icon: <Sparkles className="w-8 h-8 text-amber-500 mb-4" />,
    options: ['Learn coping skills', 'Understand my past', 'Improve relationships', 'Find purpose/direction', 'Just need someone to talk to'],
    isMultiSelect: true
  },
  {
    title: 'Do you have any preferences for your professional?',
    subtitle: 'Your comfort is our top priority.',
    icon: <Shield className="w-8 h-8 text-primary mb-4" />,
    options: ['Female', 'Male', 'Non-binary', 'LGBTQ+ Affirming', 'Faith-based', 'No preference'],
    isMultiSelect: true
  }
];

function getInitialAnswers(searchParams: URLSearchParams): Record<number, string | string[]> {
  const rawConcerns = [
    ...(searchParams.get('concern')?.split(',') || []),
    ...(searchParams.get('concerns')?.split(',') || []),
    ...searchParams.getAll('concern'),
    ...searchParams.getAll('concerns')
  ];

  const matched = mapToConcernLabels(rawConcerns);
  if (matched.length > 0) {
    return { 0: matched };
  }
  return {};
}

export default function Matching() {
  const [searchParams] = useSearchParams();
  
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string | string[]>>(() => getInitialAnswers(searchParams));
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const navigate = useNavigate();

  // Sync state if query parameters change
  useEffect(() => {
    const initial = getInitialAnswers(searchParams);
    if (initial[0] && Array.isArray(initial[0]) && initial[0].length > 0) {
      setAnswers(prev => ({
        ...prev,
        0: initial[0]
      }));
    }
  }, [searchParams]);

  const handleSelect = (option: string) => {
    const isMultiSelect = QUESTIONS[currentStep].isMultiSelect;
    
    if (isMultiSelect) {
      setAnswers(prev => {
        const currentAnswers = Array.isArray(prev[currentStep]) ? (prev[currentStep] as string[]) : [];
        if (option === 'No preference') {
          return {
            ...prev,
            [currentStep]: currentAnswers.includes('No preference') ? [] : ['No preference']
          };
        } else {
          const withoutNoPref = currentAnswers.filter(a => a !== 'No preference');
          if (withoutNoPref.includes(option)) {
            return { ...prev, [currentStep]: withoutNoPref.filter(a => a !== option) };
          } else {
            return { ...prev, [currentStep]: [...withoutNoPref, option] };
          }
        }
      });
      // No auto-advance for multi-select
    } else {
      setAnswers({ ...answers, [currentStep]: option });
      // Auto advance after short delay
      setTimeout(() => {
        handleNext();
      }, 400);
    }
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
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="bg-surface p-8 md:p-12 rounded-xl shadow-md max-w-md w-full text-center border border-gray-100">
          <div className="relative w-24 h-24 mx-auto mb-8">
            <div className="absolute inset-0 border-4 border-primary-muted rounded-full"></div>
            <div className="absolute inset-0 border-4 border-primary rounded-full border-t-transparent animate-spin"></div>
            <Heart className="absolute inset-0 m-auto w-8 h-8 text-primary animate-pulse" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Finding your match</h2>
          <p className="text-muted-foreground">We're analyzing your answers to connect you with the perfect professional...</p>
        </div>
      </div>
    );
  }

  const currentQuestion = QUESTIONS[currentStep];

  return (
    <div className="min-h-screen bg-background flex flex-col pt-12 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto w-full flex-grow flex flex-col">
        {/* Progress */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-4">
            <button 
              onClick={handleBack}
              className="p-2 hover:bg-gray-200 rounded-full transition-colors text-muted-foreground"
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
              className="bg-primary h-full rounded-full transition-all duration-500 ease-out" 
              style={{ width: `${((currentStep) / QUESTIONS.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Question Area */}
        <div className="bg-surface rounded-xl p-8 md:p-12 shadow-sm border border-gray-100 flex-grow flex flex-col">
          <div className="text-center mb-10">
            <div className="flex justify-center">{currentQuestion.icon}</div>
            <h1 className="text-3xl font-extrabold text-foreground mb-3">{currentQuestion.title}</h1>
            <p className="text-muted-foreground">{currentQuestion.subtitle}</p>
            {currentQuestion.isMultiSelect && (
              <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                <span>Select all that apply</span>
                {Array.isArray(answers[currentStep]) && (answers[currentStep] as string[]).length > 0 && (
                  <span className="bg-primary text-white px-1.5 py-0.5 rounded-full text-[10px] font-bold">
                    {(answers[currentStep] as string[]).length} selected
                  </span>
                )}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-auto mb-8">
            {currentQuestion.options.map((option) => {
              const currentAnswer = answers[currentStep];
              const isSelected = Array.isArray(currentAnswer) 
                ? currentAnswer.includes(option) 
                : currentAnswer === option;
              
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => handleSelect(option)}
                  className={`relative p-5 text-left rounded-xl border-2 transition-all duration-200 flex items-center justify-between group cursor-pointer ${
                    isSelected 
                      ? 'border-primary bg-primary-muted text-primary-dark shadow-xs' 
                      : 'border-gray-200 bg-surface hover:border-primary/50 hover:bg-surface-hover text-foreground'
                  }`}
                >
                  <span className={`font-semibold ${isSelected ? 'text-primary-dark' : 'group-hover:text-primary-hover'}`}>
                    {option}
                  </span>
                  <div className={`w-6 h-6 flex items-center justify-center transition-colors shrink-0 ${
                    currentQuestion.isMultiSelect ? 'rounded-md' : 'rounded-full'
                  } ${
                    isSelected 
                      ? 'bg-primary text-white border-primary' 
                      : 'border-2 border-gray-300 bg-white group-hover:border-primary/60'
                  }`}>
                    {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="flex justify-end pt-6 border-t border-gray-100 mt-auto">
            <Button 
              onClick={handleNext} 
              disabled={!answers[currentStep] || (Array.isArray(answers[currentStep]) && (answers[currentStep] as string[]).length === 0)}
              className="bg-primary hover:bg-primary-hover text-white px-8 py-6 rounded-xl text-lg font-bold w-full sm:w-auto"
            >
              {currentStep === QUESTIONS.length - 1 ? 'Find Matches' : 'Continue'} <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
