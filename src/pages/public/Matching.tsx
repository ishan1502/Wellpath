import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Check } from 'lucide-react';

const QUESTIONS = [
  {
    title: 'What would you like support with?',
    options: ['Anxiety', 'Stress', 'Low mood', 'Relationships', 'Work / burnout', 'Self-esteem', 'Grief', 'Life changes', 'Something else']
  },
  {
    title: 'How would you describe what you\'re experiencing?',
    options: ['It just started', 'It comes and goes', 'It\'s been going on for a while', 'It\'s severely impacting my daily life']
  },
  {
    title: 'What kind of support are you looking for?',
    options: ['Just someone to talk to', 'Practical tools and coping strategies', 'Understanding past trauma', 'Couples/Relationship counseling', 'Not sure yet']
  },
  {
    title: 'Would you prefer online or in-person sessions?',
    options: ['Online via video', 'In-person', 'I\'m open to both']
  }
];

export default function Matching() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const navigate = useNavigate();

  const handleSelect = (option: string) => {
    setAnswers({ ...answers, [currentStep]: option });
  };

  const handleNext = () => {
    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Simulate matching calculation
      const basePath = window.location.pathname.startsWith('/patient') ? '/patient' : 
                       window.location.pathname.startsWith('/student') ? '/student' : '';
      navigate(`${basePath}/find-professional?matched=true`);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      if (window.location.pathname.startsWith('/patient') || window.location.pathname.startsWith('/student')) {
        navigate(-1);
      } else {
        navigate('/');
      }
    }
  };

  const currentQuestion = QUESTIONS[currentStep];

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <div className="mb-8">
        <p className="text-sm font-medium text-emerald-600 mb-2">Step {currentStep + 1} of {QUESTIONS.length}</p>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-emerald-600 h-2 rounded-full transition-all duration-300" 
            style={{ width: `${((currentStep + 1) / QUESTIONS.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{currentQuestion.title}</h1>
        <p className="text-gray-500">This helps us discover professionals based on your preferences. It is not a diagnosis.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {currentQuestion.options.map((option) => {
          const isSelected = answers[currentStep] === option;
          return (
            <Card 
              key={option}
              className={`cursor-pointer transition-all hover:border-emerald-500 ${isSelected ? 'border-emerald-600 bg-emerald-50 ring-1 ring-emerald-600' : ''}`}
              onClick={() => handleSelect(option)}
            >
              <CardContent className="p-4 flex items-center justify-between">
                <span className={`font-medium ${isSelected ? 'text-emerald-900' : 'text-gray-700'}`}>{option}</span>
                {isSelected && <Check className="text-emerald-600 h-5 w-5" />}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="flex justify-between mt-12 border-t pt-6">
        <Button variant="ghost" onClick={handleBack}>
          {currentStep === 0 ? 'Cancel' : 'Back'}
        </Button>
        <Button 
          onClick={handleNext} 
          disabled={!answers[currentStep]}
          className="bg-emerald-600 hover:bg-emerald-700 text-white min-w-[120px]"
        >
          {currentStep === QUESTIONS.length - 1 ? 'See Matches' : 'Next'}
        </Button>
      </div>
    </div>
  );
}
