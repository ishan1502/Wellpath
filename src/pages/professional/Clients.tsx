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



export default function Clients() {
  const [clients, setClients] = useState<Client[]>([]);
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
    <div className="space-y-8 pb-12 animate-fade-in">
      {/* Page Header */}
      <div className="bg-surface rounded-xl border-0 p-6 md:p-8 shadow-sm hover:shadow-md transition-all duration-300">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-4">
              <h1 className="text-3xl font-bold text-foreground">
                Client Caseload
              </h1>
              <span className="px-3 py-1 text-sm font-bold rounded-xl bg-primary-muted text-primary-dark shadow-sm">
                {clients.length} Clients
              </span>
            </div>
            <p className="text-sm text-primary-hover/80 mt-2 font-medium">
              View your client rosters, progress tracking, session schedules, and confidential treatment notes.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link to="/professional/calendar">
              <Button className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white rounded-lg h-11 px-6 shadow-sm hover:shadow-md transition-all duration-300 font-bold">
                <CalendarPlus className="w-5 h-5" />
                Schedule Session
              </Button>
            </Link>
          </div>
        </div>

        {/* Metrics Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-8 pt-8 border-t border-primary-muted">
          <div className="p-5 bg-primary-muted/50 rounded-lg border border-primary-muted shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-xs text-primary-dark/70 font-bold uppercase tracking-wider">Total Caseload</p>
              <div className="p-2 bg-primary-muted rounded-xl">
                <Users className="w-5 h-5 text-primary-hover" />
              </div>
            </div>
            <p className="text-3xl font-bold text-foreground mt-2">{clients.length}</p>
          </div>

          <div className="p-5 bg-primary-muted rounded-lg border border-primary-muted shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-xs text-primary-dark font-bold uppercase tracking-wider">Active Patients</p>
              <div className="p-2 bg-primary-muted rounded-xl">
                <Activity className="w-5 h-5 text-primary" />
              </div>
            </div>
            <p className="text-3xl font-bold text-primary-dark mt-2">{activeCount}</p>
          </div>

          <div className="p-5 bg-primary-muted/50 rounded-lg border border-primary-muted shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-xs text-primary-dark/70 font-bold uppercase tracking-wider">Sessions This Week</p>
              <div className="p-2 bg-primary-muted rounded-xl">
                <Calendar className="w-5 h-5 text-primary-hover" />
              </div>
            </div>
            <p className="text-3xl font-bold text-foreground mt-2">{totalSessionsThisWeek}</p>
          </div>

          <div className="p-5 bg-primary-muted/50 rounded-lg border border-primary-muted shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-xs text-primary-dark/70 font-bold uppercase tracking-wider">Completed</p>
              <div className="p-2 bg-primary-muted rounded-xl">
                <CheckCircle2 className="w-5 h-5 text-primary-hover" />
              </div>
            </div>
            <p className="text-3xl font-bold text-foreground mt-2">{dischargedCount}</p>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="w-5 h-5 text-primary absolute left-4 top-3" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by client name, email, or concern..."
            className="pl-12 h-11 rounded-lg border-0 bg-surface shadow-sm focus-visible:ring-ring"
          />
        </div>

        <div className="flex items-center gap-2 bg-surface p-1.5 rounded-lg shadow-sm">
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
              className={`px-4 py-2 text-sm font-bold rounded-xl transition-all duration-300 ${
                statusFilter === tab.id
                  ? 'bg-primary text-white shadow-md'
                  : 'text-primary-hover hover:text-primary-dark hover:bg-primary-muted'
              }`}
            >
              {tab.label} <span className="opacity-70 font-medium ml-1">({tab.count})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Clients Table */}
      <div className="bg-surface rounded-xl border-0 shadow-sm overflow-hidden hover:shadow-md transition-all duration-300">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-primary-muted bg-primary-muted/50 text-[11px] font-bold text-primary-dark uppercase tracking-wider">
                <th className="py-4 px-6">Client</th>
                <th className="py-4 px-4">Primary Concern / Modality</th>
                <th className="py-4 px-4">Treatment Progress</th>
                <th className="py-4 px-4">Next Appointment</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-50 text-sm">
              {filteredClients.map((client) => {
                const progressPct = Math.round((client.totalSessions / client.targetSessions) * 100);

                return (
                  <tr 
                    key={client.id}
                    className="hover:bg-primary-muted/50 transition-colors group cursor-pointer"
                    onClick={() => setSelectedClient(client)}
                  >
                    {/* Client Name & Contact */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-lg bg-primary-muted text-primary-hover font-bold flex items-center justify-center shrink-0 shadow-sm">
                          {client.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="font-bold text-foreground group-hover:text-primary-hover transition-colors flex items-center gap-2">
                            {client.name}
                            <span className="text-xs text-primary font-medium">
                              ({client.age}y, {client.gender})
                            </span>
                          </div>
                          <div className="text-xs text-primary-hover/80 font-medium mt-1">
                            {client.email}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Concern & Modality */}
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-bold text-foreground text-sm">{client.diagnosis}</p>
                        <p className="text-xs text-primary-hover/80 font-medium truncate max-w-xs mt-1">{client.preferredModality}</p>
                      </div>
                    </td>

                    {/* Progress Bar */}
                    <td className="py-4 px-4">
                      <div className="w-40">
                        <div className="flex justify-between text-xs text-primary-hover/80 font-medium mb-1.5">
                          <span>{client.totalSessions} of {client.targetSessions}</span>
                          <span className="font-bold text-primary-dark">{progressPct}%</span>
                        </div>
                        <div className="w-full bg-primary-muted rounded-full h-2 overflow-hidden">
                          <div 
                            className={`h-2 rounded-full ${progressPct >= 100 ? 'bg-primary' : 'bg-primary'}`}
                            style={{ width: `${Math.min(progressPct, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>

                    {/* Next Appointment */}
                    <td className="py-4 px-4">
                      {client.nextSession ? (
                        <span className="inline-flex items-center gap-2 text-xs font-bold text-primary-dark bg-primary-muted px-3 py-1.5 rounded-xl shadow-sm">
                          <Clock className="w-4 h-4 text-primary" />
                          {client.nextSession}
                        </span>
                      ) : (
                        <span className="text-xs text-primary/70 font-medium italic">
                          None scheduled
                        </span>
                      )}
                    </td>

                    {/* Status Badge */}
                    <td className="py-4 px-4">
                      {client.status === 'active' && (
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-xl bg-primary-muted text-primary-dark shadow-sm">
                          <span className="w-2 h-2 rounded-full bg-primary"></span>
                          Active
                        </span>
                      )}
                      {client.status === 'on_hold' && (
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-xl bg-amber-100 text-amber-800 shadow-sm">
                          <span className="w-2 h-2 rounded-full bg-amber-600"></span>
                          On Hold
                        </span>
                      )}
                      {client.status === 'discharged' && (
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-xl bg-surface-hover text-slate-700 shadow-sm">
                          <span className="w-2 h-2 rounded-full bg-slate-500"></span>
                          Discharged
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedClient(client)}
                          className="h-9 w-9 p-0 rounded-xl text-primary hover:bg-primary-muted hover:text-primary-dark"
                          title="Clinical Notes"
                        >
                          <FileText className="w-4 h-4" />
                        </Button>

                        <Link to="/professional/messages">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-9 w-9 p-0 rounded-xl text-primary hover:bg-primary-muted hover:text-primary-dark"
                            title="Message Client"
                          >
                            <MessageSquare className="w-4 h-4" />
                          </Button>
                        </Link>

                        <Link to="/professional/calendar">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-9 w-9 p-0 rounded-xl text-primary hover:bg-primary-muted hover:text-primary-dark"
                            title="Book Appointment"
                          >
                            <Calendar className="w-4 h-4" />
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary-dark/40 backdrop-blur-sm animate-in">
          <div className="bg-surface rounded-xl border-0 max-w-2xl w-full p-6 md:p-8 shadow-lg space-y-6 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-primary-muted pb-5">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-lg bg-primary-muted text-primary-hover font-bold text-xl flex items-center justify-center shadow-sm">
                  {selectedClient.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                    {selectedClient.name}
                    <span className="text-sm font-semibold text-primary">
                      ({selectedClient.age} yrs • {selectedClient.gender})
                    </span>
                  </h2>
                  <p className="text-sm text-primary-hover/80 font-medium mt-1">
                    {selectedClient.email} • {selectedClient.phone}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedClient(null)}
                className="p-2 rounded-xl text-primary hover:bg-primary-muted transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Treatment Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 rounded-lg bg-primary-muted/50 border border-primary-muted text-sm shadow-sm">
              <div>
                <p className="text-primary-dark/70 font-bold uppercase tracking-wider text-xs">Diagnosis</p>
                <p className="font-bold text-foreground mt-1">{selectedClient.diagnosis}</p>
              </div>
              <div>
                <p className="text-primary-dark/70 font-bold uppercase tracking-wider text-xs">Therapy Modality</p>
                <p className="font-bold text-foreground mt-1">{selectedClient.preferredModality}</p>
              </div>
              <div>
                <p className="text-primary-dark/70 font-bold uppercase tracking-wider text-xs">Intake Date</p>
                <p className="font-bold text-foreground mt-1">{selectedClient.startDate}</p>
              </div>
            </div>

            {/* Add New Clinical Note Form */}
            <div className="bg-surface border border-primary-muted rounded-lg p-5 space-y-4 shadow-sm">
              <h4 className="text-sm font-bold text-foreground uppercase tracking-wider flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Add Confidential Clinical Progress Note
              </h4>

              <textarea
                value={newNoteText}
                onChange={(e) => setNewNoteText(e.target.value)}
                placeholder="Enter objective observations, patient affect, interventions used, and clinical progress..."
                rows={3}
                className="w-full p-4 rounded-xl border-0 bg-primary-muted/50 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring placeholder:text-primary/50"
              />

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <Input
                  value={newNoteHomework}
                  onChange={(e) => setNewNoteHomework(e.target.value)}
                  placeholder="Optional assigned homework or reflection exercises..."
                  className="text-sm h-11 rounded-xl border-0 bg-primary-muted/50 shadow-none focus-visible:ring-ring placeholder:text-primary/50"
                />
                <Button
                  size="sm"
                  onClick={() => handleAddClinicalNote(selectedClient.id)}
                  disabled={!newNoteText.trim()}
                  className="shrink-0 h-11 px-6 rounded-xl font-bold bg-primary hover:bg-primary-hover text-white shadow-sm flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Save Note
                </Button>
              </div>
            </div>

            {/* Session Notes History */}
            <div className="space-y-4 pt-2">
              <h4 className="text-lg font-bold text-foreground">
                Previous Clinical Notes ({selectedClient.clinicalNotes.length})
              </h4>

              <div className="space-y-4">
                {selectedClient.clinicalNotes.map((note) => (
                  <div key={note.id} className="p-5 rounded-lg border border-primary-muted bg-surface space-y-3 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-foreground flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-primary" />
                        Session Date: {note.date}
                      </span>
                      <span className="text-[10px] text-primary-dark bg-primary-muted px-2 py-1 rounded-lg border border-primary-muted font-bold uppercase tracking-wider">
                        Encrypted
                      </span>
                    </div>

                    <p className="text-primary-dark leading-relaxed text-sm font-medium">
                      {note.note}
                    </p>

                    {note.homework && (
                      <div className="p-3 rounded-xl bg-amber-50 border border-amber-100 text-amber-950 flex items-start gap-3 mt-2">
                        <BookOpen className="w-5 h-5 text-amber-600 shrink-0" />
                        <span className="text-sm font-medium"><strong>Homework:</strong> {note.homework}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Drawer footer */}
            <div className="flex items-center justify-between pt-5 border-t border-primary-muted">
              <span className="text-[11px] text-primary font-bold flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4" /> Protected under medical record confidentiality
              </span>
              <Button
                variant="outline"
                className="h-10 px-5 rounded-xl font-bold border-primary-muted text-primary-dark hover:bg-primary-muted"
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
