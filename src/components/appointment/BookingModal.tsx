import React, { useState } from 'react';
import { X, Calendar, Clock, Video, MapPin, CheckCircle } from 'lucide-react';
import { Professional, Appointment } from '../../types';
import { appointmentService } from '../../services/appointmentService';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  professional: Professional;
  patientId: string;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, professional, patientId }) => {
  const [step, setStep] = useState(1);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [type, setType] = useState<'video' | 'in-person'>('video');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleBook = async () => {
    setIsSubmitting(true);
    try {
      await appointmentService.bookAppointment({
        patientId,
        professionalId: professional.id,
        date,
        time,
        format: type === 'video' ? 'online' : 'in-person',
        duration: 60,
        fee: professional.sessionFee || 1500
      });
      setStep(4); // Success step
    } catch (error) {
      console.error('Failed to book appointment', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetAndClose = () => {
    setStep(1);
    setDate('');
    setTime('');
    setType('video');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">
            {step === 4 ? 'Booking Confirmed' : 'Book a Session'}
          </h2>
          <button onClick={resetAndClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="pl-10 w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 py-2.5 border"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Time</label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="pl-10 w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 py-2.5 border"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Session Type</label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setType('video')}
                    className={`flex items-center justify-center p-3 rounded-xl border ${
                      type === 'video'
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                        : 'border-gray-200 hover:border-gray-300 text-gray-600'
                    }`}
                  >
                    <Video className="w-5 h-5 mr-2" />
                    Video Call
                  </button>
                  <button
                    onClick={() => setType('in-person')}
                    disabled={!professional.isInPersonAvailable}
                    className={`flex items-center justify-center p-3 rounded-xl border ${
                      !professional.isInPersonAvailable
                        ? 'opacity-50 cursor-not-allowed bg-gray-50'
                        : type === 'in-person'
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                        : 'border-gray-200 hover:border-gray-300 text-gray-600'
                    }`}
                  >
                    <MapPin className="w-5 h-5 mr-2" />
                    In Person
                  </button>
                </div>
              </div>

              <button
                disabled={!date || !time}
                onClick={() => setStep(2)}
                className="w-full bg-emerald-600 text-white font-semibold py-3 rounded-xl hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue to Review
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="font-semibold text-gray-900 mb-4">Session Details</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Professional</span>
                    <span className="font-medium text-gray-900">{professional.firstName} {professional.lastName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Date & Time</span>
                    <span className="font-medium text-gray-900">{new Date(date).toLocaleDateString()} at {time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Format</span>
                    <span className="font-medium text-gray-900">{type === 'video' ? 'Video Call' : 'In Person'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Duration</span>
                    <span className="font-medium text-gray-900">{professional.sessionDuration} mins</span>
                  </div>
                  <div className="pt-3 border-t border-gray-200 flex justify-between font-bold text-lg">
                    <span className="text-gray-900">Total Fee</span>
                    <span className="text-emerald-600">₹{professional.sessionFee}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setStep(1)}
                  className="w-1/3 bg-gray-100 text-gray-700 font-semibold py-3 rounded-xl hover:bg-gray-200 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="w-2/3 bg-emerald-600 text-white font-semibold py-3 rounded-xl hover:bg-emerald-700 transition-colors"
                >
                  Proceed to Payment
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 text-center py-4">
              <div className="animate-pulse bg-gray-100 w-16 h-16 rounded-full mx-auto flex items-center justify-center">
                <span className="text-2xl">💳</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Mock Payment</h3>
                <p className="text-gray-500 mt-2 text-sm">
                  This is a simulation. Click below to complete the booking.
                </p>
              </div>
              <button
                onClick={handleBook}
                disabled={isSubmitting}
                className="w-full bg-emerald-600 text-white font-semibold py-3 rounded-xl hover:bg-emerald-700 transition-colors disabled:opacity-50"
              >
                {isSubmitting ? 'Processing...' : `Pay ₹${professional.sessionFee}`}
              </button>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6 text-center py-4">
              <div className="bg-emerald-100 w-16 h-16 rounded-full mx-auto flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-emerald-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Booking Confirmed!</h3>
                <p className="text-gray-500 mt-2">
                  Your session with {professional.firstName} has been scheduled for {new Date(date).toLocaleDateString()} at {time}.
                </p>
              </div>
              <button
                onClick={resetAndClose}
                className="w-full bg-emerald-600 text-white font-semibold py-3 rounded-xl hover:bg-emerald-700 transition-colors"
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
