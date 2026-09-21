import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, CreditCard, UploadCloud, User, ArrowRight, ArrowLeft, ShieldCheck, FileText, IdCard } from 'lucide-react';
import { Professional } from '@/types';

const generateId = () => crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2);

interface UploadStatus {
  rci: boolean;
  degree: boolean;
  govId: boolean;
}

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

  const [uploads, setUploads] = useState<UploadStatus>({ rci: false, degree: false, govId: false });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNext = () => setStep(prev => prev + 1);
  const handleBack = () => setStep(prev => prev - 1);

  const handleDocumentUpload = (doc: keyof UploadStatus) => {
    setUploads(prev => ({ ...prev, [doc]: true }));
  };

  const allUploaded = uploads.rci && uploads.degree && uploads.govId;

  const handleFinalSubmit = () => {
    const newProfessional: Partial<Professional> = {
      id: generateId(),
      email: formData.email,
      firstName: formData.firstName,
      lastName: formData.lastName,
      role: 'professional',
      type: 'Psychologist',
      isVerified: false,
      verificationStatus: 'pending',
      acceptsInterns: false,
      subscriptionPaid: false,
      yearsExperience: parseInt(formData.yearsExperience) || 0,
      specializations: formData.specializations.split(',').map(s => s.trim()).filter(Boolean),
      languages: ['English'],
      sessionFee: 1500,
      sessionDuration: 50,
      isOnlineAvailable: true,
      isInPersonAvailable: false,
      about: formData.about,
      approach: '',
      qualifications: [],
      rating: 0,
      reviewCount: 0,
    };

    localStorage.setItem('wellpath_pending_professional', JSON.stringify(newProfessional));
    setStep(4);
  };

  if (step === 4) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <div className="bg-white rounded-2xl shadow-xl p-10 w-full max-w-md text-center">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-emerald-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Application Submitted!</h2>
          <p className="text-gray-500 mb-2">
            Thank you, Dr. {formData.firstName}. Your profile and documents are under review.
          </p>
          <p className="text-sm text-amber-600 bg-amber-50 rounded-lg px-4 py-2 mb-6">
            Verification typically takes 2–3 business days. You'll receive an email once approved.
          </p>
          <button
            onClick={() => navigate('/login')}
            className="w-full bg-emerald-600 text-white font-semibold py-3 rounded-xl hover:bg-emerald-700 transition-colors"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-xl space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-primary">WELLPath</h1>
          <p className="text-text-muted mt-1">Professional Registration</p>
        </div>

        {/* Step indicator */}
        <div className="flex items-center justify-center gap-2">
          {[1, 2, 3].map(s => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors ${
                step > s ? 'bg-emerald-600 border-emerald-600 text-white' :
                step === s ? 'border-emerald-600 text-emerald-600 bg-white' :
                'border-gray-200 text-gray-400 bg-white'
              }`}>
                {step > s ? <CheckCircle className="w-4 h-4" /> : s}
              </div>
              {s < 3 && <div className={`w-12 h-0.5 ${step > s ? 'bg-emerald-600' : 'bg-gray-200'}`} />}
            </div>
          ))}
        </div>
        <div className="flex justify-around text-xs text-gray-500 -mt-3">
          <span className={step >= 1 ? 'text-emerald-600 font-medium' : ''}>Personal Info</span>
          <span className={step >= 2 ? 'text-emerald-600 font-medium' : ''}>Professional Info</span>
          <span className={step >= 3 ? 'text-emerald-600 font-medium' : ''}>Documents</span>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
          {/* Step 1: Personal Info */}
          {step === 1 && (
            <div className="space-y-5">
              <div>
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <User className="w-5 h-5 text-emerald-600" /> Personal Information
                </h2>
                <p className="text-gray-500 text-sm mt-1">Basic details about you</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input name="firstName" value={formData.firstName} onChange={handleInputChange} required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Dr. First"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input name="lastName" value={formData.lastName} onChange={handleInputChange} required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Last"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="you@clinic.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input type="password" name="password" value={formData.password} onChange={handleInputChange} required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Min 8 characters"
                />
              </div>
              <button
                onClick={handleNext}
                disabled={!formData.firstName || !formData.lastName || !formData.email || !formData.password}
                className="w-full flex items-center justify-center gap-2 bg-emerald-600 text-white font-semibold py-3 rounded-xl hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Step 2: Professional Info */}
          {step === 2 && (
            <div className="space-y-5">
              <div>
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-emerald-600" /> Professional Details
                </h2>
                <p className="text-gray-500 text-sm mt-1">Tell us about your expertise</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Specializations (comma separated)</label>
                <input name="specializations" value={formData.specializations} onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Anxiety, Depression, Trauma"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Years of Experience</label>
                <input type="number" name="yearsExperience" value={formData.yearsExperience} onChange={handleInputChange} min="0"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="5"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">About / Approach</label>
                <textarea name="about" value={formData.about} onChange={handleInputChange} rows={4}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Describe your therapeutic approach and how you help clients..."
                />
              </div>
              <div className="flex gap-3">
                <button onClick={handleBack} className="flex items-center gap-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors">
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button onClick={handleNext} disabled={!formData.specializations || !formData.yearsExperience}
                  className="flex-1 flex items-center justify-center gap-2 bg-emerald-600 text-white font-semibold py-3 rounded-xl hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Documents */}
          {step === 3 && (
            <div className="space-y-5">
              <div>
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <UploadCloud className="w-5 h-5 text-emerald-600" /> Document Verification
                </h2>
                <p className="text-gray-500 text-sm mt-1">Upload required documents to get verified</p>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                <p className="text-sm text-amber-800 font-medium">⚠️ All documents are mandatory for verification.</p>
                <p className="text-xs text-amber-700 mt-1">Your documents are encrypted and handled securely.</p>
              </div>

              {[
                { key: 'rci' as const, label: 'RCI License / Registration Certificate', icon: ShieldCheck, desc: 'Rehabilitation Council of India registration proof' },
                { key: 'degree' as const, label: 'Degree Certificate', icon: FileText, desc: 'M.Phil / M.Sc / MBBS or relevant qualification' },
                { key: 'govId' as const, label: 'Govt. Photo ID', icon: IdCard, desc: 'Aadhar Card, PAN Card, or Passport' },
              ].map(({ key, label, icon: Icon, desc }) => (
                <div key={key} className={`flex items-start gap-4 p-4 rounded-xl border-2 transition-colors ${uploads[key] ? 'border-emerald-300 bg-emerald-50' : 'border-gray-200 bg-white'}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${uploads[key] ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100 text-gray-500'}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-grow">
                    <p className="text-sm font-semibold text-gray-900">{label}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
                    {uploads[key] && <p className="text-xs text-emerald-600 font-medium mt-1">✓ Uploaded successfully</p>}
                  </div>
                  <label className="cursor-pointer flex-shrink-0">
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      className="hidden"
                      onChange={() => handleDocumentUpload(key)}
                    />
                    <span className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                      uploads[key]
                        ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                        : 'bg-emerald-600 text-white hover:bg-emerald-700'
                    }`}>
                      {uploads[key] ? 'Replace' : 'Upload'}
                    </span>
                  </label>
                </div>
              ))}

              {!allUploaded && (
                <p className="text-xs text-center text-gray-400">Upload all 3 documents to proceed</p>
              )}

              <div className="flex gap-3">
                <button onClick={handleBack} className="flex items-center gap-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors">
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button
                  onClick={handleFinalSubmit}
                  disabled={!allUploaded}
                  className="flex-1 flex items-center justify-center gap-2 bg-emerald-600 text-white font-semibold py-3 rounded-xl hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Submit Application <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        <p className="text-center text-sm text-gray-500">
          Already have an account?{' '}
          <a href="/login" className="text-emerald-600 hover:underline font-medium">Sign in</a>
        </p>
      </div>
    </div>
  );
}
