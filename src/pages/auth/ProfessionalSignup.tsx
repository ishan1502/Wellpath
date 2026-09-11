import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, CreditCard, UploadCloud, User, ArrowRight, ArrowLeft } from 'lucide-react';
import { Professional } from '@/types';

// For simplicity, we use crypto.randomUUID() or a math random fallback if uuid isn't installed.
const generateId = () => crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2);

export default function ProfessionalSignup() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    specializations: '',
    yearsExperience: '',
    about: '',
  });

  const [documentUploaded, setDocumentUploaded] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNext = () => setStep(prev => prev + 1);
  const handlePrev = () => setStep(prev => prev - 1);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setDocumentUploaded(true);
    }
  };

  const handlePayment = () => {
    // Create new professional in local storage
    const newProfessional: Professional = {
      id: generateId(),
      email: formData.email,
      firstName: formData.firstName,
      lastName: formData.lastName,
      role: 'professional',
      type: 'Therapist', // Default mock type
      isVerified: false,
      verificationStatus: 'pending',
      acceptsInterns: false, // Default false until they set it
      subscriptionPaid: true,
      yearsExperience: parseInt(formData.yearsExperience) || 0,
      specializations: formData.specializations.split(',').map(s => s.trim()),
      languages: ['English'],
      sessionFee: 1000,
      sessionDuration: 60,
      isOnlineAvailable: true,
      isInPersonAvailable: false,
      about: formData.about,
      approach: 'Client-centered therapy',
      qualifications: ['M.A. Clinical Psychology'],
      rating: 0,
      reviewCount: 0,
    };

    // Save to localStorage (mocking a backend DB)
    const storedUsers = JSON.parse(localStorage.getItem('wellpath_users') || '[]');
    localStorage.setItem('wellpath_users', JSON.stringify([...storedUsers, newProfessional]));
    
    // We can also directly set 'wellpath_auth' if we want to auto-login, but maybe wait for approval
    // Instead we just proceed to step 4 (Success)
    setStep(4);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Join WELLPath as a Professional
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Step {step} of 4
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          
          {/* Step 1: Basic Info */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <User className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-medium">Basic Information</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">First Name</label>
                  <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Last Name</label>
                  <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Email address</label>
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input type="password" name="password" value={formData.password} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Specializations (comma separated)</label>
                <input type="text" name="specializations" placeholder="e.g. Anxiety, Depression, Trauma" value={formData.specializations} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Years of Experience</label>
                <input type="number" name="yearsExperience" value={formData.yearsExperience} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border" />
              </div>

              <div className="flex justify-end mt-6">
                <button
                  onClick={handleNext}
                  disabled={!formData.firstName || !formData.lastName || !formData.email || !formData.password}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
                >
                  Next <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Document Upload */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <UploadCloud className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-medium">Verify Qualifications</h3>
              </div>
              
              <p className="text-sm text-gray-600">
                Please upload a valid identification document (Aadhar/PAN) and your medical/psychology degree certificates.
              </p>

              <div className="mt-4 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-primary-dark focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary">
                      <span>Upload a file</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileUpload} multiple />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PDF, PNG, JPG up to 10MB</p>
                </div>
              </div>

              {documentUploaded && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Documents attached successfully.
                </div>
              )}

              <div className="flex justify-between mt-6">
                <button
                  onClick={handlePrev}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back
                </button>
                <button
                  onClick={handleNext}
                  disabled={!documentUploaded}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark disabled:opacity-50"
                >
                  Next <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Payment */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <CreditCard className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-medium">Platform Access Fee</h3>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h4 className="font-medium text-gray-900">WELLPath Professional Annual Subscription</h4>
                <p className="text-sm text-gray-500 mt-1">Access to platform tools, patient referrals, and intern matching.</p>
                <div className="mt-4 text-3xl font-bold text-gray-900">₹999<span className="text-lg font-normal text-gray-500">/year</span></div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Card Number</label>
                  <input type="text" placeholder="XXXX XXXX XXXX XXXX" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Expiry</label>
                    <input type="text" placeholder="MM/YY" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">CVV</label>
                    <input type="text" placeholder="123" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border" />
                  </div>
                </div>
              </div>

              <div className="flex justify-between mt-6">
                <button
                  onClick={handlePrev}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back
                </button>
                <button
                  onClick={handlePayment}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark"
                >
                  Pay & Submit <CheckCircle className="ml-2 h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Success */}
          {step === 4 && (
            <div className="text-center space-y-6">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Application Submitted!</h3>
              <p className="text-gray-600 mb-6">
                Thank you for applying to join WELLPath. Your payment of ₹999 was successful. 
                Our team is currently reviewing your credential documents. This usually takes 1-2 business days.
              </p>
              <div className="mt-8">
                <button
                  onClick={() => navigate('/login')}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark"
                >
                  Go to Login
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
