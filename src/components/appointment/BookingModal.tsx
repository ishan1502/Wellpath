import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, Video, MapPin, CheckCircle, MessageCircle, ExternalLink } from 'lucide-react';
import { Professional } from '../../types';
import { appointmentService } from '../../services/appointmentService';
import { generateGoogleCalendarLink } from '../../utils/googleCalendar';
import { generateSessionLink } from '../../utils/sessionLinks';
import { generateWhatsAppLink } from '../../utils/whatsapp';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  professional: Professional;
  patientId: string;
}

const toGCalDate = (d: Date) =>
  d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, professional, patientId }) => {
  const [step, setStep] = useState(1);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [type, setType] = useState<'video' | 'in-person'>('video');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);

  const handleDateChange = (newDate: string) => {
    setDate(newDate);
    if (newDate) {
      const saved = localStorage.getItem('wellpath_mock_availabilities');
      let slotsForDate: string[] = [];
      if (saved) {
        const availabilities = JSON.parse(saved);
        slotsForDate = availabilities[newDate] || [];
      }
      if (slotsForDate.length === 0) {
        slotsForDate = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'];
      }
      setAvailableSlots(slotsForDate);
      setTime('');
    } else {
      setAvailableSlots([]);
      setTime('');
    }
  };

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
        duration: professional.sessionDuration || 60,
        fee: professional.sessionFee || 1500
      });
      setStep(4);
    } catch (error) {
      console.error('Failed to book appointment', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetAndClose = () => {
    setStep(1);
    handleDateChange('');
    setTime('');
    setType('video');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-surface rounded-lg w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-md">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-foreground">
            {step === 4 ? 'Booking Confirmed' : 'Book a Session'}
          </h2>
          <button onClick={resetAndClose} className="text-gray-400 hover:text-muted-foreground transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Step indicator */}
        {step < 4 && (
          <div className="flex px-6 pt-4 gap-2">
            {[1, 2, 3].map(s => (
              <div key={s} className={`flex-1 h-1 rounded-full transition-colors ${step >= s ? 'bg-primary' : 'bg-gray-200'}`} />
            ))}
          </div>
        )}

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
                    min={new Date().toISOString().split('T')[0]}
                    value={date}
                    onChange={(e) => handleDateChange(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-primary"
                  />
                </div>
              </div>

              {date && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Available Slot</label>
                  {availableSlots.length > 0 ? (
                    <div className="grid grid-cols-3 gap-3">
                      {availableSlots.map(slot => (
                        <button
                          key={slot}
                          onClick={() => setTime(slot)}
                          className={`flex items-center justify-center py-2 px-3 border rounded-lg transition-colors ${
                            time === slot
                              ? 'bg-primary-muted border-primary text-primary-hover'
                              : 'bg-surface border-border text-gray-700 hover:border-border'
                          }`}
                        >
                          <Clock className={`w-4 h-4 mr-1.5 ${time === slot ? 'text-primary' : 'text-gray-400'}`} />
                          {slot}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">No slots available for this date.</p>
                  )}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Session Type</label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setType('video')}
                    className={`flex items-center justify-center p-3 rounded-xl border ${
                      type === 'video'
                        ? 'border-primary bg-primary-muted text-primary-hover'
                        : 'border-border hover:border-border text-muted-foreground'
                    }`}
                  >
                    <Video className="w-5 h-5 mr-2" /> Video Call
                  </button>
                  <button
                    onClick={() => setType('in-person')}
                    disabled={!professional.isInPersonAvailable}
                    className={`flex items-center justify-center p-3 rounded-xl border ${
                      !professional.isInPersonAvailable
                        ? 'opacity-50 cursor-not-allowed bg-background'
                        : type === 'in-person'
                        ? 'border-primary bg-primary-muted text-primary-hover'
                        : 'border-border hover:border-border text-muted-foreground'
                    }`}
                  >
                    <MapPin className="w-5 h-5 mr-2" /> In Person
                  </button>
                </div>
              </div>

              <button
                disabled={!date || !time}
                onClick={() => setStep(2)}
                className="w-full bg-primary text-white font-semibold py-3 rounded-xl hover:bg-primary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue to Review
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="bg-background rounded-xl p-4">
                <h3 className="font-semibold text-foreground mb-4">Session Details</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Professional</span>
                    <span className="font-medium text-foreground">Dr. {professional.firstName} {professional.lastName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Date & Time</span>
                    <span className="font-medium text-foreground">{new Date(date + 'T00:00').toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })} at {time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Format</span>
                    <span className="font-medium text-foreground">{type === 'video' ? 'Video Call' : 'In Person'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Duration</span>
                    <span className="font-medium text-foreground">{professional.sessionDuration} mins</span>
                  </div>
                  <div className="pt-3 border-t border-border flex justify-between font-bold text-lg">
                    <span className="text-foreground">Total Fee</span>
                    <span className="text-primary">₹{professional.sessionFee}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                <button onClick={() => setStep(1)} className="w-1/3 bg-surface-hover text-gray-700 font-semibold py-3 rounded-xl hover:bg-gray-200 transition-colors">Back</button>
                <button onClick={() => setStep(3)} className="w-2/3 bg-primary text-white font-semibold py-3 rounded-xl hover:bg-primary-hover transition-colors">Proceed to Payment</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 text-center py-4">
              <div className="animate-pulse bg-surface-hover w-16 h-16 rounded-full mx-auto flex items-center justify-center">
                <span className="text-2xl">💳</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">Mock Payment</h3>
                <p className="text-muted-foreground mt-2 text-sm">This is a simulation. Click below to complete the booking.</p>
              </div>
              <div className="flex gap-4">
                <button onClick={() => setStep(2)} className="w-1/3 bg-surface-hover text-gray-700 font-semibold py-3 rounded-xl hover:bg-gray-200 transition-colors">Back</button>
                <button
                  onClick={handleBook}
                  disabled={isSubmitting}
                  className="w-2/3 bg-primary text-white font-semibold py-3 rounded-xl hover:bg-primary-hover transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? 'Processing...' : `Pay ₹${professional.sessionFee}`}
                </button>
              </div>
            </div>
          )}

          {step === 4 && (() => {
            const aptDateObj = new Date(`${date}T${time}`);
            const endAptDateObj = new Date(aptDateObj.getTime() + (professional.sessionDuration || 60) * 60000);
            const profPhone = professional.phone || '919800000000';

            const gcalLink = generateGoogleCalendarLink(
              `Session with Dr. ${professional.firstName} ${professional.lastName}`,
              `Therapy session booked via Wellpath.\nFormat: ${type === 'video' ? 'Video Call' : 'In Person'}`,
              type === 'video' ? 'Online (Video Call)' : 'In-person Clinic',
              toGCalDate(aptDateObj),
              toGCalDate(endAptDateObj)
            );

            const sessionLink = generateSessionLink('meet', `${professional.id}-${date}`);
            const whatsappLink = generateWhatsAppLink(
              profPhone,
              `Hi Dr. ${professional.firstName}, I just booked a therapy session on ${new Date(date + 'T00:00').toLocaleDateString()} at ${time}. Looking forward to our session!`
            );

            return (
              <div className="space-y-6 text-center py-4">
                <div className="bg-primary-muted w-16 h-16 rounded-full mx-auto flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">Booking Confirmed! 🎉</h3>
                  <p className="text-muted-foreground mt-2">
                    Your session with Dr. {professional.firstName} has been scheduled for{' '}
                    {new Date(date + 'T00:00').toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })} at {time}.
                  </p>
                </div>

                <div className="bg-background p-4 rounded-xl space-y-3">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Quick Actions</p>
                  <a href={gcalLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full py-2.5 px-4 bg-surface border border-border rounded-lg text-sm font-medium text-gray-700 hover:bg-background transition-colors shadow-sm">
                    <Calendar className="w-4 h-4 mr-2 text-blue-500" /> Add to Google Calendar
                  </a>
                  {type === 'video' && (
                    <a href={sessionLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full py-2.5 px-4 bg-surface border border-border rounded-lg text-sm font-medium text-gray-700 hover:bg-background transition-colors shadow-sm">
                      <ExternalLink className="w-4 h-4 mr-2 text-purple-500" /> View Meeting Link
                    </a>
                  )}
                  <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full py-2.5 px-4 bg-green-500 border border-green-600 rounded-lg text-sm font-medium text-white hover:bg-green-600 transition-colors">
                    <MessageCircle className="w-4 h-4 mr-2" /> Message on WhatsApp
                  </a>
                </div>

                <button onClick={resetAndClose} className="w-full bg-primary text-white font-semibold py-3 rounded-xl hover:bg-primary-hover transition-colors">
                  Done
                </button>
              </div>
            );
          })()}
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
