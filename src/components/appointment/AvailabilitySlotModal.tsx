import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import { format } from 'date-fns';

interface AvailabilitySlotModalProps {
  isOpen: boolean;
  onClose: () => void;
  date: Date | null;
  existingSlots: string[];
  onSave: (date: Date, slots: string[]) => void;
}

export default function AvailabilitySlotModal({
  isOpen,
  onClose,
  date,
  existingSlots,
  onSave
}: AvailabilitySlotModalProps) {
  const [slots, setSlots] = useState<string[]>([]);
  const [newSlot, setNewSlot] = useState('');

  useEffect(() => {
    setSlots(existingSlots || []);
  }, [existingSlots, isOpen]);

  if (!isOpen || !date) return null;

  const handleAddSlot = () => {
    if (newSlot && !slots.includes(newSlot)) {
      setSlots([...slots, newSlot].sort());
      setNewSlot('');
    }
  };

  const handleRemoveSlot = (slotToRemove: string) => {
    setSlots(slots.filter(s => s !== slotToRemove));
  };

  const handleSave = () => {
    onSave(date, slots);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-xl">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">
            Availability for {format(date, 'MMM d, yyyy')}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="flex gap-2">
            <input
              type="time"
              value={newSlot}
              onChange={(e) => setNewSlot(e.target.value)}
              className="flex-1 rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary py-2 px-3 border"
            />
            <button
              onClick={handleAddSlot}
              disabled={!newSlot}
              className="flex items-center justify-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition disabled:opacity-50"
            >
              <Plus className="w-5 h-5 mr-1" /> Add Slot
            </button>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">Current Slots</h3>
            {slots.length === 0 ? (
              <p className="text-sm text-gray-500 italic">No availability set for this day.</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {slots.map(slot => (
                  <div key={slot} className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-gray-800">
                    {slot}
                    <button onClick={() => handleRemoveSlot(slot)} className="text-gray-400 hover:text-red-500 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 font-medium hover:bg-gray-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark transition-colors"
            >
              Save Availability
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
