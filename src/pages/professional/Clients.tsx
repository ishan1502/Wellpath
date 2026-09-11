import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Search, 
  Calendar, 
  Clock, 
  MessageSquare, 
  FileText, 
  Plus, 
  CheckCircle2, 
  Activity, 
  AlertCircle, 
  CalendarPlus, 
  BookOpen 
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  age: number;
  gender: string;
  diagnosis: string;
  primaryConcern: string;
  status: 'active' | 'on_hold' | 'discharged';
  totalSessions: number;
  targetSessions: number;
  nextSession: string | null;
  lastSession: string;
  startDate: string;
  preferredModality: string;
  clinicalNotes: {
    id: string;
    date: string;
    note: string;
    homework?: string;
  }[];
}

const INITIAL_CLIENTS: Client[] = [
  {
    id: 'c-01',
    name: 'Alex Sharma',
    email: 'patient@wellpath.demo',
    phone: '+91 98765 43210',
    age: 30,
    gender: 'Male',
    diagnosis: 'Generalized Anxiety Disorder (GAD)',
    primaryConcern: 'Panic attacks & Workplace stress',
    status: 'active',
    totalSessions: 7,
    targetSessions: 12,
    nextSession: 'Tomorrow, 6:30 PM',
    lastSession: '2026-09-04',
    startDate: '2026-07-15',
    preferredModality: 'Cognitive Behavioral Therapy (CBT)',
    clinicalNotes: [
      {
        id: 'n-1',
        date: '2026-09-04',
        note: 'Patient reported notable reduction in catastrophic thinking during high-pressure sprint reviews. Breathing re-training techniques were practiced.',
        homework: 'Complete daily thought record for automatic catastrophic predictions.'
      },
      {
        id: 'n-2',
        date: '2026-08-28',
        note: 'Explored physiological symptoms of panic onset. Reviewed sleep hygiene and caffeine reduction.',
        homework: 'Limit coffee intake to 1 cup before 11 AM and log sleep intervals.'
      }
    ]
  },
  {
    id: 'c-02',
    name: 'Priya Kapoor',
    email: 'priya.k@example.com',
    phone: '+91 98111 22334',
    age: 27,
    gender: 'Female',
    diagnosis: 'Occupational Burnout',
    primaryConcern: 'Severe fatigue, cynicism, emotional detachment',
    status: 'active',
    totalSessions: 4,
    targetSessions: 10,
    nextSession: 'Friday, 11:00 AM',
    lastSession: '2026-09-05',
    startDate: '2026-08-10',
    preferredModality: 'Acceptance & Commitment Therapy (ACT)',
    clinicalNotes: [
      {
        id: 'n-3',
        date: '2026-09-05',
        note: 'Focused on values clarification versus experiential avoidance. Client established a firm boundary to log off by 7 PM.',
        homework: 'Schedule two 30-minute non-negotiable restoration walks without phone.'
      }
    ]
  },
  {
    id: 'c-03',
    name: 'Devansh Roy',
    email: 'devansh.roy@example.com',
    phone: '+91 98450 99887',
    age: 34,
    gender: 'Male',
    diagnosis: 'Social Anxiety Disorder',
    primaryConcern: 'Interpersonal avoidance & public speaking dread',
    status: 'active',
    totalSessions: 9,
    targetSessions: 12,
    nextSession: 'Monday, 4:00 PM',
    lastSession: '2026-09-07',
    startDate: '2026-06-20',
    preferredModality: 'Exposure & Response Prevention (ERP)',
    clinicalNotes: [
      {
        id: 'n-4',
        date: '2026-09-07',
        note: 'Completed hierarchical in-vivo exposure hierarchy. Client successfully contributed to team meeting without safety behaviors.',
        homework: 'Initiate one spontaneous conversational check-in with a peer.'
      }
    ]
  },
  {
    id: 'c-04',
    name: 'Sneha Patel',
    email: 'sneha.patel@example.com',
    phone: '+91 97234 55667',
    age: 24,
    gender: 'Female',
    diagnosis: 'Major Depressive Disorder (Mild)',
    primaryConcern: 'Anhedonia, motivation loss after exam results',
    status: 'on_hold',
    totalSessions: 5,
    targetSessions: 8,
    nextSession: null,
    lastSession: '2026-08-20',
    startDate: '2026-07-02',
    preferredModality: 'Behavioral Activation',
    clinicalNotes: [
      {
        id: 'n-5',
        date: '2026-08-20',
        note: 'Client traveling for family event; paused regular weekly slots until end of September.',
        homework: 'Maintain morning routine and daily walks.'
      }
    ]
  },
  {
    id: 'c-05',
    name: 'Kabir Malhotra',
    email: 'kabir.m@example.com',
    phone: '+91 98330 11223',
    age: 41,
    gender: 'Male',
    diagnosis: 'Adjustment Disorder with Depressed Mood',
    primaryConcern: 'Divorce adjustment and co-parenting transition',
    status: 'discharged',
    totalSessions: 12,
    targetSessions: 12,
    nextSession: null,
    lastSession: '2026-08-14',
    startDate: '2026-04-10',
    preferredModality: 'Solution-Focused Brief Therapy (SFBT)',
    clinicalNotes: [
      {
        id: 'n-6',
        date: '2026-08-14',
        note: 'Final discharge session. Goals met: established functional co-parenting framework, emotional equilibrium restored. Booster session offered on demand.',
        homework: 'Relapse prevention toolkit reviewed.'
      }
    ]
  }
];

export default function Clients() {
  const [clients, setClients] = useState<Client[]>(INITIAL_CLIENTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'on_hold' | 'discharged'>('all');
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  
  // Quick note modal state
  const [newNoteText, setNewNoteText] = useState('');
  const [newNoteHomework, setNewNoteHomework] = useState('');

  const filteredClients = clients.filter(c => {
    const matchesSearch = 
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.diagnosis.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.primaryConcern.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' ? true : c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const activeCount = clients.filter(c => c.status === 'active').length;
  const onHoldCount = clients.filter(c => c.status === 'on_hold').length;
  const dischargedCount = clients.filter(c => c.status === 'discharged').length;
  const totalSessionsThisWeek = 6;

  const handleAddClinicalNote = (clientId: string) => {
    if (!newNoteText.trim()) return;

    const newNote = {
      id: `n-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      note: newNoteText.trim(),
      homework: newNoteHomework.trim() || undefined
    };

    setClients(prev => prev.map(c => {
      if (c.id === clientId) {
        const updatedNotes = [newNote, ...c.clinicalNotes];
        const updatedClient = { ...c, clinicalNotes: updatedNotes };
        setSelectedClient(updatedClient);
        return updatedClient;
      }
      return c;
    }));

    setNewNoteText('');
    setNewNoteHomework('');
  };

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Page Header */}
      <div className="bg-surface rounded-2xl border border-border p-6 md:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl md:text-3xl font-bold text-text-main">
                Client Caseload
              </h1>
              <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-primary/10 text-primary border border-primary/20">
                {clients.length} Clients
              </span>
            </div>
            <p className="text-sm text-text-muted mt-1">
              View your client rosters, progress tracking, session schedules, and confidential treatment notes.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link to="/professional/calendar">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <CalendarPlus className="w-4 h-4" />
                Schedule Session
              </Button>
            </Link>
          </div>
        </div>

        {/* Metrics Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-border">
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
            <div className="flex items-center justify-between">
              <p className="text-xs text-text-muted font-medium">Total Caseload</p>
              <Users className="w-4 h-4 text-primary" />
            </div>
            <p className="text-2xl font-bold text-text-main mt-1">{clients.length}</p>
          </div>

          <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
            <div className="flex items-center justify-between">
              <p className="text-xs text-emerald-700 font-medium">Active Patients</p>
              <Activity className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="text-2xl font-bold text-emerald-900 mt-1">{activeCount}</p>
          </div>

          <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
            <div className="flex items-center justify-between">
              <p className="text-xs text-blue-700 font-medium">Sessions This Week</p>
              <Calendar className="w-4 h-4 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-blue-900 mt-1">{totalSessionsThisWeek}</p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
            <div className="flex items-center justify-between">
              <p className="text-xs text-slate-500 font-medium">Completed / Discharged</p>
              <CheckCircle2 className="w-4 h-4 text-slate-400" />
            </div>
            <p className="text-2xl font-bold text-slate-700 mt-1">{dischargedCount}</p>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-text-muted absolute left-3 top-3" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by client name, email, or concern..."
            className="pl-9"
          />
        </div>

        <div className="flex items-center gap-1 bg-surface p-1 rounded-lg border border-border">
          {[
            { id: 'all', label: 'All', count: clients.length },
            { id: 'active', label: 'Active', count: activeCount },
            { id: 'on_hold', label: 'On Hold', count: onHoldCount },
            { id: 'discharged', label: 'Discharged', count: dischargedCount }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id as any)}
              type="button"
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                statusFilter === tab.id
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-text-muted hover:text-text-main hover:bg-gray-100'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>
      </div>

      {/* Clients Table */}
      <div className="bg-surface rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border bg-gray-50/60 text-[11px] font-bold text-text-muted uppercase tracking-wider">
                <th className="py-3.5 px-6">Client</th>
                <th className="py-3.5 px-4">Primary Concern / Modality</th>
                <th className="py-3.5 px-4">Treatment Progress</th>
                <th className="py-3.5 px-4">Next Appointment</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-sm">
              {filteredClients.map((client) => {
                const progressPct = Math.round((client.totalSessions / client.targetSessions) * 100);

                return (
                  <tr 
                    key={client.id}
                    className="hover:bg-gray-50/70 transition-colors group cursor-pointer"
                    onClick={() => setSelectedClient(client)}
                  >
                    {/* Client Name & Contact */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary/15 text-primary font-bold flex items-center justify-center shrink-0 border border-primary/20">
                          {client.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="font-semibold text-text-main group-hover:text-primary transition-colors flex items-center gap-1.5">
                            {client.name}
                            <span className="text-xs text-text-muted font-normal">
                              ({client.age}y, {client.gender})
                            </span>
                          </div>
                          <div className="text-xs text-text-muted mt-0.5">
                            {client.email}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Concern & Modality */}
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium text-text-main text-xs">{client.diagnosis}</p>
                        <p className="text-[11px] text-text-muted truncate max-w-xs">{client.preferredModality}</p>
                      </div>
                    </td>

                    {/* Progress Bar */}
                    <td className="py-4 px-4">
                      <div className="w-36">
                        <div className="flex justify-between text-xs text-text-muted mb-1">
                          <span>{client.totalSessions} of {client.targetSessions}</span>
                          <span className="font-semibold text-text-main">{progressPct}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                          <div 
                            className={`h-1.5 rounded-full ${progressPct >= 100 ? 'bg-blue-500' : 'bg-primary'}`}
                            style={{ width: `${Math.min(progressPct, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>

                    {/* Next Appointment */}
                    <td className="py-4 px-4">
                      {client.nextSession ? (
                        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                          <Clock className="w-3.5 h-3.5 text-emerald-600" />
                          {client.nextSession}
                        </span>
                      ) : (
                        <span className="text-xs text-text-muted italic">
                          None scheduled
                        </span>
                      )}
                    </td>

                    {/* Status Badge */}
                    <td className="py-4 px-4">
                      {client.status === 'active' && (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                          Active
                        </span>
                      )}
                      {client.status === 'on_hold' && (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
                          On Hold
                        </span>
                      )}
                      {client.status === 'discharged' && (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-500"></span>
                          Discharged
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1.5">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedClient(client)}
                          className="h-8 px-2 text-xs"
                          title="Clinical Notes"
                        >
                          <FileText className="w-4 h-4 text-text-muted" />
                        </Button>

                        <Link to="/professional/messages">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 px-2 text-xs"
                            title="Message Client"
                          >
                            <MessageSquare className="w-4 h-4 text-text-muted" />
                          </Button>
                        </Link>

                        <Link to="/professional/calendar">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 px-2 text-xs"
                            title="Book Appointment"
                          >
                            <Calendar className="w-4 h-4 text-text-muted" />
                          </Button>
                        </Link>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Clinical Notes & Profile Drawer / Modal */}
      {selectedClient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in">
          <div className="bg-surface rounded-2xl border border-border max-w-2xl w-full p-6 md:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-border pb-4">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-primary/20 text-primary font-bold text-lg flex items-center justify-center">
                  {selectedClient.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-text-main flex items-center gap-2">
                    {selectedClient.name}
                    <span className="text-xs font-normal text-text-muted">
                      ({selectedClient.age} yrs • {selectedClient.gender})
                    </span>
                  </h2>
                  <p className="text-xs text-text-muted">
                    {selectedClient.email} • {selectedClient.phone}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedClient(null)}
                className="p-1 rounded-full text-text-muted hover:text-text-main hover:bg-gray-100 transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Treatment Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-background border border-border text-xs">
              <div>
                <p className="text-text-muted">Diagnosis</p>
                <p className="font-semibold text-text-main mt-0.5">{selectedClient.diagnosis}</p>
              </div>
              <div>
                <p className="text-text-muted">Therapy Modality</p>
                <p className="font-semibold text-text-main mt-0.5">{selectedClient.preferredModality}</p>
              </div>
              <div>
                <p className="text-text-muted">Intake Date</p>
                <p className="font-semibold text-text-main mt-0.5">{selectedClient.startDate}</p>
              </div>
            </div>

            {/* Add New Clinical Note Form */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-3">
              <h4 className="text-xs font-bold text-text-main uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-primary" />
                Add Confidential Clinical Progress Note
              </h4>

              <textarea
                value={newNoteText}
                onChange={(e) => setNewNoteText(e.target.value)}
                placeholder="Enter objective observations, patient affect, interventions used, and clinical progress..."
                rows={3}
                className="w-full p-2.5 rounded-lg border border-border bg-white text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                <Input
                  value={newNoteHomework}
                  onChange={(e) => setNewNoteHomework(e.target.value)}
                  placeholder="Optional assigned homework or reflection exercises..."
                  className="text-xs h-9"
                />
                <Button
                  size="sm"
                  onClick={() => handleAddClinicalNote(selectedClient.id)}
                  disabled={!newNoteText.trim()}
                  className="shrink-0 text-xs flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Save Note
                </Button>
              </div>
            </div>

            {/* Session Notes History */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-text-main">
                Previous Clinical Notes ({selectedClient.clinicalNotes.length})
              </h4>

              <div className="space-y-3">
                {selectedClient.clinicalNotes.map((note) => (
                  <div key={note.id} className="p-4 rounded-xl border border-border bg-white space-y-2 text-xs">
                    <div className="flex items-center justify-between text-text-muted">
                      <span className="font-semibold text-text-main flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-primary" />
                        Session Date: {note.date}
                      </span>
                      <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 font-medium">
                        Encrypted
                      </span>
                    </div>

                    <p className="text-text-main leading-relaxed">
                      {note.note}
                    </p>

                    {note.homework && (
                      <div className="p-2 rounded bg-amber-50/70 border border-amber-200/60 text-amber-950 flex items-start gap-2">
                        <BookOpen className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                        <span><strong>Homework:</strong> {note.homework}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Drawer footer */}
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <span className="text-[11px] text-text-muted flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 text-text-muted" /> Protected under medical record confidentiality
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedClient(null)}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
