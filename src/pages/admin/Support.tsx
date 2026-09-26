import React, { useState, useMemo } from 'react';
import { 
  Search, 
  LifeBuoy, 
  AlertCircle, 
  Clock, 
  CheckCircle2, 
  Filter, 
  Plus, 
  MessageSquare, 
  ChevronRight, 
  X, 
  Send, 
  UserCheck, 
  Download,
  ShieldAlert,
  Tag
} from 'lucide-react';

export interface SupportTicket {
  id: string;
  subject: string;
  description: string;
  requester: {
    name: string;
    email: string;
    role: 'patient' | 'professional' | 'student';
  };
  category: 'Billing & Payments' | 'Session Dispute' | 'Verification & Onboarding' | 'Technical Issue' | 'Clinical Inquiries';
  priority: 'Urgent' | 'High' | 'Medium' | 'Low';
  status: 'Open' | 'In Progress' | 'Waiting on User' | 'Resolved';
  assignedTo: string;
  createdAt: string;
  updatedAt: string;
  replies: {
    id: string;
    author: string;
    role: 'admin' | 'user';
    timestamp: string;
    text: string;
  }[];
}

const INITIAL_TICKETS: SupportTicket[] = [
  {
    id: 'TICK-1049',
    subject: 'Refund request for cancelled session (Appt #APT-9821)',
    description: 'Dr. Ananya had an emergency and cancelled 10 minutes prior to session. The payment of ₹2,000 was deducted from my account, please process refund.',
    requester: {
      name: 'Rajesh Verma',
      email: 'rajesh.verma@example.com',
      role: 'patient',
    },
    category: 'Billing & Payments',
    priority: 'Urgent',
    status: 'Open',
    assignedTo: 'Unassigned',
    createdAt: '2026-09-11T07:30:00Z',
    updatedAt: '2026-09-11T07:30:00Z',
    replies: [
      {
        id: 'rep-1',
        author: 'Rajesh Verma',
        role: 'user',
        timestamp: '2026-09-11T07:30:00Z',
        text: 'The session was supposed to start at 12:30 PM today. Please expedite the refund back to my UPI handle.'
      }
    ]
  },
  {
    id: 'TICK-1048',
    subject: 'Unable to upload RCI accreditation certificate',
    description: 'The verification portal throws a "File size exceeded" error even though my PDF document is only 2.1 MB. Need assistance completing onboarding.',
    requester: {
      name: 'Dr. Kavita Raman',
      email: 'kavita.raman@clinic.org',
      role: 'professional',
    },
    category: 'Verification & Onboarding',
    priority: 'High',
    status: 'In Progress',
    assignedTo: 'Sarah Mehta',
    createdAt: '2026-09-10T14:15:00Z',
    updatedAt: '2026-09-11T04:20:00Z',
    replies: [
      {
        id: 'rep-2',
        author: 'Sarah Mehta (Admin)',
        role: 'admin',
        timestamp: '2026-09-11T04:20:00Z',
        text: 'Hello Dr. Kavita, we have temporarily lifted the PDF size ceiling. Could you please re-attempt upload or email the document directly to verification@wellpath.com?'
      }
    ]
  },
  {
    id: 'TICK-1047',
    subject: 'Video consultation audio disconnect every 5 minutes',
    description: 'Both my therapist and I experienced frequent audio cutouts during our 50-minute consultation on Chrome browser.',
    requester: {
      name: 'Sneha Patel',
      email: 'sneha.patel@gmail.com',
      role: 'patient',
    },
    category: 'Technical Issue',
    priority: 'High',
    status: 'In Progress',
    assignedTo: 'Dev Team',
    createdAt: '2026-09-10T11:00:00Z',
    updatedAt: '2026-09-10T16:45:00Z',
    replies: [
      {
        id: 'rep-3',
        author: 'Dev Team',
        role: 'admin',
        timestamp: '2026-09-10T16:45:00Z',
        text: 'We identified a WebRTC ICE candidate reconnection issue during high packet jitter. A patch has been applied to server cluster AP-South-1.'
      }
    ]
  },
  {
    id: 'TICK-1046',
    subject: 'TDS certificate deduction query for Q2 payouts',
    description: 'I need Form 16A or the consolidated TDS deduction ledger for platform commission and earnings for tax filing.',
    requester: {
      name: 'Dr. Vikram Malhotra',
      email: 'dr.malhotra@mindcare.in',
      role: 'professional',
    },
    category: 'Billing & Payments',
    priority: 'Medium',
    status: 'Waiting on User',
    assignedTo: 'Finance Ops',
    createdAt: '2026-09-09T09:10:00Z',
    updatedAt: '2026-09-10T10:00:00Z',
    replies: [
      {
        id: 'rep-4',
        author: 'Finance Ops',
        role: 'admin',
        timestamp: '2026-09-10T10:00:00Z',
        text: 'Hi Dr. Vikram, we have dispatched the signed Form 16A to your registered address. Please confirm receipt of the mail.'
      }
    ]
  },
  {
    id: 'TICK-1045',
    subject: 'Student supervisor sign-off confirmation pending',
    description: 'I completed my 60 clinical shadow hours with Dr. Rohini Guha. I submitted the logbook 4 days ago and would like an update.',
    requester: {
      name: 'Aryan Deshmukh',
      email: 'aryan.d@tiss.edu',
      role: 'student',
    },
    category: 'Clinical Inquiries',
    priority: 'Low',
    status: 'Open',
    assignedTo: 'Academic Liaison',
    createdAt: '2026-09-08T16:20:00Z',
    updatedAt: '2026-09-08T16:20:00Z',
    replies: []
  },
  {
    id: 'TICK-1044',
    subject: 'Client no-show without 24h prior notification',
    description: 'Patient did not attend scheduled 4 PM slot. Per clinic policy, session fee cancellation protection should apply.',
    requester: {
      name: 'Dr. Sunita Mehra',
      email: 'dr.mehra@serenity.com',
      role: 'professional',
    },
    category: 'Session Dispute',
    priority: 'Medium',
    status: 'Resolved',
    assignedTo: 'Sarah Mehta',
    createdAt: '2026-09-07T12:00:00Z',
    updatedAt: '2026-09-08T10:30:00Z',
    replies: [
      {
        id: 'rep-5',
        author: 'Sarah Mehta (Admin)',
        role: 'admin',
        timestamp: '2026-09-08T10:30:00Z',
        text: 'Policy verified. 70% late cancellation payout credited to Dr. Sunita Mehra account.'
      }
    ]
  },
  {
    id: 'TICK-1043',
    subject: 'Unable to update emergency contact details in mobile profile',
    description: 'The save button stays disabled when modifying emergency phone number on iOS browser.',
    requester: {
      name: 'Meera Nambiar',
      email: 'meera.nambiar@gmail.com',
      role: 'patient',
    },
    category: 'Technical Issue',
    priority: 'Low',
    status: 'Resolved',
    assignedTo: 'Support Desk',
    createdAt: '2026-09-06T15:40:00Z',
    updatedAt: '2026-09-07T08:15:00Z',
    replies: [
      {
        id: 'rep-6',
        author: 'Support Desk',
        role: 'admin',
        timestamp: '2026-09-07T08:15:00Z',
        text: 'Resolved with latest app release v2.4.1.'
      }
    ]
  },
  {
    id: 'TICK-1042',
    subject: 'Clinic address change for in-person consultations in Bengaluru',
    description: 'Relocated clinic to Indiranagar 100ft Road. Need address badge updated on directory.',
    requester: {
      name: 'Dr. Rohit Sen',
      email: 'rohit.sen@mindspace.in',
      role: 'professional',
    },
    category: 'Verification & Onboarding',
    priority: 'Medium',
    status: 'Resolved',
    assignedTo: 'Verification Team',
    createdAt: '2026-09-05T10:20:00Z',
    updatedAt: '2026-09-06T11:45:00Z',
    replies: [
      {
        id: 'rep-7',
        author: 'Verification Team',
        role: 'admin',
        timestamp: '2026-09-06T11:45:00Z',
        text: 'Address updated and verified against clinic lease deed.'
      }
    ]
  }
];

export default function Support() {
  const [tickets, setTickets] = useState<SupportTicket[]>(INITIAL_TICKETS);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  
  // Active ticket drawer / modal
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [replyText, setReplyText] = useState('');
  
  // New ticket modal
  const [showNewModal, setShowNewModal] = useState(false);
  const [newSubject, setNewSubject] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newRole, setNewRole] = useState<'patient' | 'professional' | 'student'>('patient');
  const [newCat, setNewCat] = useState<SupportTicket['category']>('Technical Issue');
  const [newPriority, setNewPriority] = useState<SupportTicket['priority']>('Medium');

  // Stats
  const totalOpen = tickets.filter(t => t.status === 'Open' || t.status === 'In Progress').length;
  const urgentCount = tickets.filter(t => t.priority === 'Urgent' && t.status !== 'Resolved').length;
  const waitingCount = tickets.filter(t => t.status === 'Waiting on User').length;
  const resolvedCount = tickets.filter(t => t.status === 'Resolved').length;

  // Filtered tickets
  const filteredTickets = useMemo(() => {
    return tickets.filter((t) => {
      const matchSearch = 
        t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.requester.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.requester.email.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchStatus = statusFilter === 'all' || t.status === statusFilter;
      const matchPriority = priorityFilter === 'all' || t.priority === priorityFilter;
      const matchCategory = categoryFilter === 'all' || t.category === categoryFilter;

      return matchSearch && matchStatus && matchPriority && matchCategory;
    });
  }, [tickets, searchQuery, statusFilter, priorityFilter, categoryFilter]);

  const handleUpdateStatus = (id: string, newStatus: SupportTicket['status']) => {
    setTickets(prev => prev.map(t => {
      if (t.id === id) {
        const updated = { ...t, status: newStatus, updatedAt: new Date().toISOString() };
        if (selectedTicket?.id === id) setSelectedTicket(updated);
        return updated;
      }
      return t;
    }));
  };

  const handleAddReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !selectedTicket) return;

    const newReply = {
      id: `rep-${Date.now()}`,
      author: 'Admin Support',
      role: 'admin' as const,
      timestamp: new Date().toISOString(),
      text: replyText.trim()
    };

    setTickets(prev => prev.map(t => {
      if (t.id === selectedTicket.id) {
        const updated = {
          ...t,
          status: 'Waiting on User' as const,
          updatedAt: new Date().toISOString(),
          replies: [...t.replies, newReply]
        };
        setSelectedTicket(updated);
        return updated;
      }
      return t;
    }));

    setReplyText('');
  };

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubject.trim() || !newName.trim() || !newEmail.trim()) return;

    const newTicket: SupportTicket = {
      id: `TICK-${Math.floor(1050 + Math.random() * 900)}`,
      subject: newSubject,
      description: newDesc,
      requester: {
        name: newName,
        email: newEmail,
        role: newRole
      },
      category: newCat,
      priority: newPriority,
      status: 'Open',
      assignedTo: 'Support Desk',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      replies: []
    };

    setTickets([newTicket, ...tickets]);
    setShowNewModal(false);
    setNewSubject('');
    setNewDesc('');
    setNewName('');
    setNewEmail('');
  };

  const handleExportCSV = () => {
    const headers = ['Ticket ID', 'Subject', 'Requester', 'Email', 'Role', 'Category', 'Priority', 'Status', 'Assigned To', 'Created At'];
    const rows = filteredTickets.map(t => [
      t.id,
      `"${t.subject.replace(/"/g, '""')}"`,
      `"${t.requester.name}"`,
      t.requester.email,
      t.requester.role,
      t.category,
      t.priority,
      t.status,
      t.assignedTo,
      new Date(t.createdAt).toLocaleDateString()
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `wellpath_support_tickets_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-emerald-950 tracking-tight flex items-center gap-3">
            <LifeBuoy className="h-8 w-8 text-emerald-600" />
            Support Helpdesk & Tickets
          </h1>
          <p className="text-emerald-700 font-medium text-sm mt-1">
            Track, resolve, and manage inquiries from patients, therapists, and student interns.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-2 px-5 py-2.5 border-2 border-emerald-100 rounded-xl text-sm font-bold text-emerald-700 bg-white hover:bg-emerald-50 shadow-sm transition-all hover:shadow"
          >
            <Download className="h-4 w-4 text-emerald-600" />
            Export CSV
          </button>
          <button
            onClick={() => setShowNewModal(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-bold shadow-sm hover:shadow-md transition-all"
          >
            <Plus className="h-4 w-4" />
            Create Ticket
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-emerald-100 shadow-sm hover:shadow-xl transition-all duration-300 flex items-center justify-between group">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-emerald-500">Active Open Tickets</p>
            <h3 className="text-4xl font-extrabold text-emerald-950 mt-2">{totalOpen}</h3>
            <p className="text-xs font-semibold text-amber-600 mt-2 flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" /> Requires resolution
            </p>
          </div>
          <div className="h-14 w-14 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 group-hover:scale-110 transition-transform">
            <AlertCircle className="h-7 w-7" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-emerald-100 shadow-sm hover:shadow-xl transition-all duration-300 flex items-center justify-between group">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-emerald-500">Urgent Escalations</p>
            <h3 className="text-4xl font-extrabold text-emerald-950 mt-2">{urgentCount}</h3>
            <p className="text-xs font-semibold text-red-600 mt-2 flex items-center gap-1.5">
              <ShieldAlert className="h-3.5 w-3.5" /> Immediate action
            </p>
          </div>
          <div className="h-14 w-14 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center text-red-600 group-hover:scale-110 transition-transform">
            <AlertCircle className="h-7 w-7" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-emerald-100 shadow-sm hover:shadow-xl transition-all duration-300 flex items-center justify-between group">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-emerald-500">Waiting on User</p>
            <h3 className="text-4xl font-extrabold text-emerald-950 mt-2">{waitingCount}</h3>
            <p className="text-xs font-semibold text-blue-600 mt-2 flex items-center gap-1.5">
              <MessageSquare className="h-3.5 w-3.5" /> Replies sent
            </p>
          </div>
          <div className="h-14 w-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
            <Clock className="h-7 w-7" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-emerald-100 shadow-sm hover:shadow-xl transition-all duration-300 flex items-center justify-between group">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-emerald-500">Resolved This Week</p>
            <h3 className="text-4xl font-extrabold text-emerald-950 mt-2">{resolvedCount}</h3>
            <p className="text-xs font-semibold text-emerald-600 mt-2 flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5" /> 94.2% satisfaction
            </p>
          </div>
          <div className="h-14 w-14 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
            <CheckCircle2 className="h-7 w-7" />
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-6 rounded-3xl border border-emerald-100 shadow-sm space-y-6">
        <div className="flex flex-col xl:flex-row gap-4 items-stretch xl:items-center justify-between">
          <div className="relative flex-1 max-w-xl">
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-emerald-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by ticket ID, subject, requester name, or email..."
              className="w-full pl-11 pr-4 py-3 text-sm font-medium border border-emerald-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-emerald-50/50 text-emerald-900 placeholder-emerald-400 transition-all shadow-sm hover:shadow-md"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wide">
              <Filter className="h-4 w-4" /> Filters:
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-sm font-medium border border-emerald-100 rounded-xl px-4 py-2.5 bg-white text-emerald-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm"
            >
              <option value="all">All Statuses</option>
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Waiting on User">Waiting on User</option>
              <option value="Resolved">Resolved</option>
            </select>

            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="text-sm font-medium border border-emerald-100 rounded-xl px-4 py-2.5 bg-white text-emerald-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm"
            >
              <option value="all">All Priorities</option>
              <option value="Urgent">Urgent</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="text-sm font-medium border border-emerald-100 rounded-xl px-4 py-2.5 bg-white text-emerald-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm"
            >
              <option value="all">All Categories</option>
              <option value="Billing & Payments">Billing & Payments</option>
              <option value="Verification & Onboarding">Verification & Onboarding</option>
              <option value="Technical Issue">Technical Issue</option>
              <option value="Session Dispute">Session Dispute</option>
              <option value="Clinical Inquiries">Clinical Inquiries</option>
            </select>

            {(searchQuery || statusFilter !== 'all' || priorityFilter !== 'all' || categoryFilter !== 'all') && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setStatusFilter('all');
                  setPriorityFilter('all');
                  setCategoryFilter('all');
                }}
                className="text-xs font-bold text-emerald-600 hover:text-emerald-900 underline px-3 py-2 bg-emerald-50 rounded-xl transition-colors"
              >
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Quick status tabs */}
        <div className="flex border-b border-emerald-100 text-sm font-bold text-emerald-600 gap-8 overflow-x-auto custom-scrollbar pb-1">
          {[
            { label: 'All Tickets', value: 'all', count: tickets.length },
            { label: 'Open', value: 'Open', count: tickets.filter(t => t.status === 'Open').length },
            { label: 'In Progress', value: 'In Progress', count: tickets.filter(t => t.status === 'In Progress').length },
            { label: 'Waiting on User', value: 'Waiting on User', count: tickets.filter(t => t.status === 'Waiting on User').length },
            { label: 'Resolved', value: 'Resolved', count: tickets.filter(t => t.status === 'Resolved').length },
          ].map(tab => (
            <button
              key={tab.value}
              onClick={() => setStatusFilter(tab.value)}
              className={`pb-4 border-b-[3px] flex items-center gap-2.5 transition-all whitespace-nowrap ${
                statusFilter === tab.value
                  ? 'border-emerald-600 text-emerald-900'
                  : 'border-transparent hover:text-emerald-800 hover:border-emerald-200'
              }`}
            >
              {tab.label}
              <span className={`px-2 py-0.5 rounded-full text-xs ${
                statusFilter === tab.value ? 'bg-emerald-600 text-white shadow-sm' : 'bg-emerald-100 text-emerald-700'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Tickets Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-emerald-100 overflow-hidden hover:shadow-xl transition-all duration-300">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-emerald-50 text-left text-sm">
            <thead className="bg-emerald-50/50 text-xs font-bold uppercase tracking-wider text-emerald-700">
              <tr>
                <th className="px-6 py-5">Ticket ID & Priority</th>
                <th className="px-6 py-5">Subject & Category</th>
                <th className="px-6 py-5">Requester</th>
                <th className="px-6 py-5">Status</th>
                <th className="px-6 py-5">Assigned To</th>
                <th className="px-6 py-5">Updated</th>
                <th className="px-6 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-50 bg-white">
              {filteredTickets.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-16 text-center">
                    <LifeBuoy className="h-12 w-12 text-emerald-200 mx-auto mb-4" />
                    <p className="text-lg font-bold text-emerald-950">No tickets found</p>
                    <p className="text-sm font-medium text-emerald-600 mt-1">Try changing your search keywords or active filters.</p>
                  </td>
                </tr>
              ) : (
                filteredTickets.map((ticket) => {
                  const priorityColors = {
                    Urgent: 'bg-red-50 text-red-700 border-red-200',
                    High: 'bg-amber-50 text-amber-700 border-amber-200',
                    Medium: 'bg-blue-50 text-blue-700 border-blue-200',
                    Low: 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  };

                  const statusColors = {
                    Open: 'bg-emerald-100 text-emerald-800 border-emerald-200',
                    'In Progress': 'bg-indigo-100 text-indigo-800 border-indigo-200',
                    'Waiting on User': 'bg-amber-100 text-amber-800 border-amber-200',
                    Resolved: 'bg-gray-100 text-gray-600 border-gray-300'
                  };

                  const roleColors = {
                    patient: 'bg-emerald-100 text-emerald-800',
                    professional: 'bg-blue-100 text-blue-800',
                    student: 'bg-purple-100 text-purple-800'
                  };

                  return (
                    <tr 
                      key={ticket.id} 
                      className="hover:bg-emerald-50/30 transition-colors cursor-pointer group"
                      onClick={() => setSelectedTicket(ticket)}
                    >
                      {/* Ticket ID & Priority */}
                      <td className="px-6 py-5 whitespace-nowrap">
                        <div className="font-mono text-sm font-bold text-emerald-950">{ticket.id}</div>
                        <span className={`inline-block mt-2 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-lg border shadow-sm ${priorityColors[ticket.priority]}`}>
                          {ticket.priority}
                        </span>
                      </td>

                      {/* Subject & Category */}
                      <td className="px-6 py-5 max-w-sm">
                        <div className="font-bold text-emerald-950 truncate group-hover:text-emerald-700 transition-colors text-base mb-1">
                          {ticket.subject}
                        </div>
                        <div className="text-xs font-semibold text-emerald-600 mt-1 flex items-center gap-2">
                          <Tag className="h-3.5 w-3.5 text-emerald-400" />
                          <span>{ticket.category}</span>
                          {ticket.replies.length > 0 && (
                            <span className="text-emerald-400">• {ticket.replies.length} replies</span>
                          )}
                        </div>
                      </td>

                      {/* Requester */}
                      <td className="px-6 py-5 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-extrabold text-sm shadow-sm">
                            {ticket.requester.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-bold text-emerald-950 text-sm mb-0.5">{ticket.requester.name}</div>
                            <div className="text-xs font-medium text-emerald-600 truncate">{ticket.requester.email}</div>
                          </div>
                          <span className={`text-[10px] font-bold px-2 py-1 rounded-lg capitalize ml-2 shadow-sm ${roleColors[ticket.requester.role]}`}>
                            {ticket.requester.role}
                          </span>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-5 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold border shadow-sm ${statusColors[ticket.status]}`}>
                          <span className={`h-2 w-2 rounded-full ${
                            ticket.status === 'Open' ? 'bg-emerald-500' :
                            ticket.status === 'In Progress' ? 'bg-indigo-500' :
                            ticket.status === 'Waiting on User' ? 'bg-amber-500' : 'bg-gray-400'
                          }`} />
                          {ticket.status}
                        </span>
                      </td>

                      {/* Assigned To */}
                      <td className="px-6 py-5 whitespace-nowrap text-sm font-semibold text-emerald-700">
                        <div className="flex items-center gap-2">
                          <UserCheck className="h-4 w-4 text-emerald-500" />
                          <span>{ticket.assignedTo}</span>
                        </div>
                      </td>

                      {/* Updated */}
                      <td className="px-6 py-5 whitespace-nowrap text-xs font-medium text-emerald-600">
                        {new Date(ticket.updatedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-5 whitespace-nowrap text-right text-sm">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedTicket(ticket);
                          }}
                          className="text-emerald-700 font-bold inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 transition-colors shadow-sm"
                        >
                          View <ChevronRight className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="px-8 py-4 border-t border-emerald-100 bg-emerald-50/50 text-xs font-bold text-emerald-700 flex items-center justify-between">
          <span>Showing {filteredTickets.length} of {tickets.length} tickets</span>
          <span className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            Wellpath Helpdesk SLA: 98.6%
          </span>
        </div>
      </div>

      {/* Ticket Details Drawer / Modal */}
      {selectedTicket && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-emerald-950/60 backdrop-blur-sm flex justify-end transition-opacity">
          <div className="w-full max-w-3xl bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            {/* Header */}
            <div className="p-8 border-b border-emerald-100 flex items-start justify-between bg-emerald-50/30">
              <div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm font-extrabold text-emerald-900 bg-white px-2 py-1 rounded-lg border border-emerald-100 shadow-sm">{selectedTicket.id}</span>
                  <span className="px-3 py-1 text-xs font-bold rounded-xl bg-emerald-100 text-emerald-800 shadow-sm">
                    {selectedTicket.status}
                  </span>
                  <span className="px-3 py-1 text-xs font-bold rounded-xl bg-white border border-emerald-200 text-emerald-800 shadow-sm">
                    {selectedTicket.priority} Priority
                  </span>
                </div>
                <h2 className="text-2xl font-extrabold text-emerald-950 mt-4 leading-tight">{selectedTicket.subject}</h2>
                <div className="text-sm font-medium text-emerald-600 mt-2 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Opened {new Date(selectedTicket.createdAt).toLocaleString()} by <span className="font-bold text-emerald-900">{selectedTicket.requester.name}</span> ({selectedTicket.requester.email})
                </div>
              </div>
              <button
                onClick={() => setSelectedTicket(null)}
                className="p-2 text-emerald-400 hover:text-emerald-700 bg-white rounded-xl shadow-sm hover:shadow transition-all"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Quick Status / Assignment Toolbar */}
            <div className="px-8 py-4 bg-white border-b border-emerald-100 flex flex-wrap items-center justify-between gap-4 text-sm shadow-sm z-10">
              <div className="flex items-center gap-3">
                <span className="text-emerald-700 font-bold text-xs uppercase tracking-wider">Quick Status:</span>
                {(['Open', 'In Progress', 'Waiting on User', 'Resolved'] as const).map(st => (
                  <button
                    key={st}
                    onClick={() => handleUpdateStatus(selectedTicket.id, st)}
                    className={`px-4 py-2 rounded-xl font-bold transition-all text-xs shadow-sm ${
                      selectedTicket.status === st
                        ? 'bg-emerald-600 text-white border border-emerald-600'
                        : 'bg-white text-emerald-700 border border-emerald-200 hover:bg-emerald-50'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
              <div className="text-emerald-700 text-xs font-bold uppercase tracking-wider bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100">
                Category: <span className="font-extrabold text-emerald-950 ml-1">{selectedTicket.category}</span>
              </div>
            </div>

            {/* Scrollable Conversation Content */}
            <div className="flex-1 overflow-y-auto p-8 space-y-8 bg-gray-50 custom-scrollbar">
              {/* Original Issue */}
              <div className="bg-white border border-emerald-100 rounded-3xl p-6 shadow-sm">
                <div className="flex items-center justify-between text-sm text-emerald-600 mb-4 border-b border-emerald-50 pb-4">
                  <span className="font-extrabold text-emerald-950 flex items-center gap-3 text-base">
                    <span className="h-10 w-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-black text-sm shadow-sm">
                      {selectedTicket.requester.name.charAt(0)}
                    </span>
                    {selectedTicket.requester.name} <span className="text-xs font-bold bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-lg border border-emerald-100">{selectedTicket.requester.role}</span>
                  </span>
                  <span className="font-bold bg-gray-50 px-3 py-1 rounded-lg text-xs">{new Date(selectedTicket.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <p className="text-base text-emerald-900 whitespace-pre-line leading-relaxed font-medium">
                  {selectedTicket.description}
                </p>
              </div>

              {/* Replies */}
              {selectedTicket.replies.map((reply) => (
                <div 
                  key={reply.id} 
                  className={`rounded-3xl p-6 border shadow-sm ${
                    reply.role === 'admin' 
                      ? 'bg-emerald-50/80 border-emerald-200 ml-8 md:ml-16' 
                      : 'bg-white border-emerald-100 mr-8 md:mr-16'
                  }`}
                >
                  <div className="flex items-center justify-between text-sm mb-3 border-b border-emerald-100/50 pb-3">
                    <span className={`font-extrabold text-base ${reply.role === 'admin' ? 'text-emerald-900 flex items-center gap-2' : 'text-emerald-950 flex items-center gap-2'}`}>
                      {reply.role === 'admin' && <div className="h-8 w-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shadow-sm">A</div>}
                      {reply.role !== 'admin' && <div className="h-8 w-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs shadow-sm">{reply.author.charAt(0)}</div>}
                      {reply.author}
                    </span>
                    <span className="text-xs font-bold text-emerald-600 bg-white/50 px-2.5 py-1 rounded-lg">
                      {new Date(reply.timestamp).toLocaleString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-emerald-900 whitespace-pre-line leading-relaxed font-medium text-base">
                    {reply.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Reply Input Form */}
            <form onSubmit={handleAddReply} className="p-6 border-t border-emerald-100 bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-10">
              <label htmlFor="replyInput" className="block text-sm font-bold text-emerald-900 mb-2 flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-emerald-600" />
                Send Admin Response / Internal Resolution Note
              </label>
              <textarea
                id="replyInput"
                rows={3}
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Type your reply to the user or note... (Submitting will mark status as 'Waiting on User')"
                className="w-full p-4 text-sm font-medium border border-emerald-200 rounded-2xl bg-emerald-50/30 text-emerald-950 placeholder-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:bg-white transition-all resize-none shadow-inner"
              />
              <div className="flex justify-between items-center mt-4">
                <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100 flex items-center gap-1.5">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
                  Notifies user via registered email
                </span>
                <button
                  type="submit"
                  disabled={!replyText.trim()}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:hover:bg-emerald-600 text-white text-sm font-bold rounded-xl shadow-sm hover:shadow-md transition-all"
                >
                  <Send className="h-4 w-4" />
                  Send Reply
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* New Ticket Modal */}
      {showNewModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-emerald-950/60 backdrop-blur-sm flex items-center justify-center p-4 transition-opacity">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-8 shadow-2xl border border-emerald-100 animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center pb-6 border-b border-emerald-100">
              <h3 className="text-2xl font-extrabold text-emerald-950 flex items-center gap-3">
                <div className="bg-emerald-100 p-2 rounded-xl text-emerald-600">
                  <LifeBuoy className="h-6 w-6" />
                </div>
                Create New Support Ticket
              </h3>
              <button
                onClick={() => setShowNewModal(false)}
                className="text-emerald-400 hover:text-emerald-700 bg-emerald-50 p-2 rounded-xl transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleCreateTicket} className="space-y-6 mt-6">
              <div>
                <label className="block text-sm font-bold text-emerald-900 mb-2">Subject *</label>
                <input
                  type="text"
                  required
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  placeholder="e.g. Payment receipt clarification"
                  className="w-full px-4 py-3 bg-emerald-50/50 border border-emerald-100 rounded-xl text-emerald-950 font-medium placeholder-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all shadow-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-emerald-900 mb-2">Requester Name *</label>
                  <input
                    type="text"
                    required
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="Full name"
                    className="w-full px-4 py-3 bg-emerald-50/50 border border-emerald-100 rounded-xl text-emerald-950 font-medium placeholder-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all shadow-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-emerald-900 mb-2">Requester Email *</label>
                  <input
                    type="email"
                    required
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    placeholder="email@example.com"
                    className="w-full px-4 py-3 bg-emerald-50/50 border border-emerald-100 rounded-xl text-emerald-950 font-medium placeholder-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all shadow-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-bold text-emerald-900 mb-2">Role</label>
                  <select
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value as any)}
                    className="w-full px-4 py-3 bg-emerald-50/50 border border-emerald-100 rounded-xl text-emerald-950 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all shadow-sm"
                  >
                    <option value="patient">Patient</option>
                    <option value="professional">Professional</option>
                    <option value="student">Student</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-emerald-900 mb-2">Priority</label>
                  <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value as any)}
                    className="w-full px-4 py-3 bg-emerald-50/50 border border-emerald-100 rounded-xl text-emerald-950 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all shadow-sm"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Urgent">Urgent</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-emerald-900 mb-2">Category</label>
                  <select
                    value={newCat}
                    onChange={(e) => setNewCat(e.target.value as any)}
                    className="w-full px-4 py-3 bg-emerald-50/50 border border-emerald-100 rounded-xl text-emerald-950 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all shadow-sm"
                  >
                    <option value="Technical Issue">Technical</option>
                    <option value="Billing & Payments">Billing</option>
                    <option value="Verification & Onboarding">Verification</option>
                    <option value="Session Dispute">Dispute</option>
                    <option value="Clinical Inquiries">Clinical</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-emerald-900 mb-2">Issue Description *</label>
                <textarea
                  rows={4}
                  required
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Provide all context and details..."
                  className="w-full p-4 bg-emerald-50/50 border border-emerald-100 rounded-2xl text-emerald-950 font-medium placeholder-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all resize-y shadow-sm"
                />
              </div>

              <div className="flex justify-end gap-4 pt-6 border-t border-emerald-100">
                <button
                  type="button"
                  onClick={() => setShowNewModal(false)}
                  className="px-6 py-3 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-bold rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold shadow-sm hover:shadow-md transition-all"
                >
                  Create Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
