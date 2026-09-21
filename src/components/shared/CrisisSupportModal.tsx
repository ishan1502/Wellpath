import React from 'react';
import { X, Phone, AlertCircle, Heart, ExternalLink } from 'lucide-react';

interface CrisisSupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CrisisSupportModal({ isOpen, onClose }: CrisisSupportModalProps) {
  if (!isOpen) return null;

  const helplines = [
    {
      name: 'Tele-MANAS (Govt. of India)',
      number: '14416',
      hours: '24/7 • Toll Free • Multi-lingual',
      desc: 'National mental health helpline providing comprehensive psychological support.',
      tel: '14416',
      featured: true,
    },
    {
      name: 'KIRAN Helpline',
      number: '1800-599-0019',
      hours: '24/7 • Toll Free',
      desc: 'Mental health rehabilitation and suicide prevention support.',
      tel: '18005990019',
      featured: true,
    },
    {
      name: 'Vandrevala Foundation',
      number: '+91 9999 666 555',
      hours: '24/7 • Confidential',
      desc: 'Free psychological counseling and crisis intervention.',
      tel: '+919999666555',
      featured: false,
    },
    {
      name: 'AASRA Crisis Support',
      number: '+91 98204 66726',
      hours: '24/7 • Suicide Prevention',
      desc: 'Immediate, non-judgmental crisis helpline.',
      tel: '+919820466726',
      featured: false,
    },
    {
      name: 'Emergency Medical & Police',
      number: '112',
      hours: '24/7 • Nationwide Emergency',
      desc: 'For immediate life-threatening safety emergencies.',
      tel: '112',
      featured: false,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full overflow-hidden border border-red-100 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-rose-600 text-white p-6 relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/15 rounded-xl">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Immediate Crisis Support</h3>
              <p className="text-red-100 text-xs mt-0.5">You are never alone. Confidential help is available 24/7.</p>
            </div>
          </div>
        </div>

        {/* Helplines List */}
        <div className="p-6 max-h-[65vh] overflow-y-auto space-y-3">
          {helplines.map((item, idx) => (
            <div 
              key={idx}
              className={`p-4 rounded-xl border transition-all ${
                item.featured 
                  ? 'bg-red-50/50 border-red-200 hover:border-red-300' 
                  : 'bg-gray-50 border-gray-200 hover:border-gray-300'
              } flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3`}
            >
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-gray-900 text-sm">{item.name}</h4>
                  {item.featured && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-700">Toll Free</span>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-0.5">{item.hours}</p>
                <p className="text-xs text-gray-600 mt-1">{item.desc}</p>
              </div>

              <a
                href={`tel:${item.tel}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold text-sm transition-colors shadow-sm shrink-0"
              >
                <Phone className="w-4 h-4" />
                <span>Call {item.number}</span>
              </a>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-1.5">
            <Heart className="w-4 h-4 text-red-500" />
            <span>WELLPath Crisis Hotline Directory</span>
          </div>
          <button 
            onClick={onClose}
            className="px-4 py-1.5 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
