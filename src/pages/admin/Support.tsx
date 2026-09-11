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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
            <LifeBuoy className="h-7 w-7 text-emerald-600" />
            Support Helpdesk & Tickets
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Track, resolve, and manage inquiries from patients, therapists, and student interns.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 shadow-sm transition-colors"
          >
            <Download className="h-4 w-4 text-gray-500" />
            Export CSV
          </button>
          <button
            onClick={() => setShowNewModal(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-medium shadow-sm transition-colors"
          >
            <Plus className="h-4 w-4" />
            Create Ticket
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Active Open Tickets</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">{totalOpen}</h3>
            <p className="text-xs text-amber-600 mt-1 flex items-center gap-1">
              <Clock className="h-3 w-3" /> Requires resolution
            </p>
          </div>
          <div className="h-12 w-12 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600">
            <AlertCircle className="h-6 w-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Urgent Escalations</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">{urgentCount}</h3>
            <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
              <ShieldAlert className="h-3 w-3" /> Immediate action
            </p>
          </div>
          <div className="h-12 w-12 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-red-600">
            <AlertCircle className="h-6 w-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Waiting on User</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">{waitingCount}</h3>
            <p className="text-xs text-blue-600 mt-1 flex items-center gap-1">
              <MessageSquare className="h-3 w-3" /> Replies sent
            </p>
          </div>
          <div className="h-12 w-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
            <Clock className="h-6 w-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Resolved This Week</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">{resolvedCount}</h3>
            <p className="text-xs text-emerald-600 mt-1 flex items-center gap-1">
              <CheckCircle2 className="h-3 w-3" /> 94.2% satisfaction
            </p>
          </div>
          <div className="h-12 w-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
            <CheckCircle2 className="h-6 w-6" />
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by ticket ID, subject, requester name, or email..."
              className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-gray-50/50"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <Filter className="h-3.5 w-3.5" /> Filters:
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-xs border border-gray-300 rounded-lg px-2.5 py-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
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
              className="text-xs border border-gray-300 rounded-lg px-2.5 py-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
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
              className="text-xs border border-gray-300 rounded-lg px-2.5 py-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
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
                className="text-xs text-gray-500 hover:text-gray-800 underline px-2 py-1"
              >
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Quick status tabs */}
        <div className="flex border-b border-gray-200 text-xs font-medium text-gray-600 gap-6 overflow-x-auto">
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
              className={`pb-2.5 border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
                statusFilter === tab.value
                  ? 'border-emerald-600 text-emerald-700 font-semibold'
                  : 'border-transparent hover:text-gray-900'
              }`}
            >
              {tab.label}
              <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                statusFilter === tab.value ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-600'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Tickets Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-left text-sm">
            <thead className="bg-gray-50/75 text-xs font-semibold uppercase tracking-wider text-gray-500">
              <tr>
                <th className="px-6 py-3.5">Ticket ID & Priority</th>
                <th className="px-6 py-3.5">Subject & Category</th>
                <th className="px-6 py-3.5">Requester</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5">Assigned To</th>
                <th className="px-6 py-3.5">Updated</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {filteredTickets.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                    <LifeBuoy className="h-10 w-10 text-gray-300 mx-auto mb-2" />
                    <p className="text-base font-medium text-gray-700">No tickets found</p>
                    <p className="text-xs text-gray-400 mt-1">Try changing your search keywords or active filters.</p>
                  </td>
                </tr>
              ) : (
                filteredTickets.map((ticket) => {
                  const priorityColors = {
                    Urgent: 'bg-red-50 text-red-700 border-red-200',
                    High: 'bg-amber-50 text-amber-700 border-amber-200',
                    Medium: 'bg-blue-50 text-blue-700 border-blue-200',
                    Low: 'bg-gray-50 text-gray-600 border-gray-200'
                  };

                  const statusColors = {
                    Open: 'bg-emerald-50 text-emerald-700 border-emerald-200',
                    'In Progress': 'bg-indigo-50 text-indigo-700 border-indigo-200',
                    'Waiting on User': 'bg-amber-50 text-amber-700 border-amber-200',
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
                      className="hover:bg-gray-50/75 transition-colors cursor-pointer"
                      onClick={() => setSelectedTicket(ticket)}
                    >
                      {/* Ticket ID & Priority */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-mono text-xs font-semibold text-gray-900">{ticket.id}</div>
                        <span className={`inline-block mt-1 px-2 py-0.5 text-[11px] font-medium rounded-full border ${priorityColors[ticket.priority]}`}>
                          {ticket.priority}
                        </span>
                      </td>

                      {/* Subject & Category */}
                      <td className="px-6 py-4 max-w-sm">
                        <div className="font-medium text-gray-900 truncate hover:text-emerald-700">
                          {ticket.subject}
                        </div>
                        <div className="text-xs text-gray-500 mt-0.5 flex items-center gap-1.5">
                          <Tag className="h-3 w-3 text-gray-400" />
                          <span>{ticket.category}</span>
                          {ticket.replies.length > 0 && (
                            <span className="text-gray-400">• {ticket.replies.length} replies</span>
                          )}
                        </div>
                      </td>

                      {/* Requester */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2.5">
                          <div className="h-8 w-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
                            {ticket.requester.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900 text-xs">{ticket.requester.name}</div>
                            <div className="text-[11px] text-gray-400 truncate">{ticket.requester.email}</div>
                          </div>
                          <span className={`text-[10px] px-1.5 py-0.5 rounded capitalize ${roleColors[ticket.requester.role]}`}>
                            {ticket.requester.role}
                          </span>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${statusColors[ticket.status]}`}>
                          <span className={`h-1.5 w-1.5 rounded-full ${
                            ticket.status === 'Open' ? 'bg-emerald-500' :
                            ticket.status === 'In Progress' ? 'bg-indigo-500' :
                            ticket.status === 'Waiting on User' ? 'bg-amber-500' : 'bg-gray-400'
                          }`} />
                          {ticket.status}
                        </span>
                      </td>

                      {/* Assigned To */}
                      <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-600">
                        <div className="flex items-center gap-1.5">
                          <UserCheck className="h-3.5 w-3.5 text-gray-400" />
                          <span>{ticket.assignedTo}</span>
                        </div>
                      </td>

                      {/* Updated */}
                      <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500">
                        {new Date(ticket.updatedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 whitespace-nowrap text-right text-xs">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedTicket(ticket);
                          }}
                          className="text-emerald-700 hover:text-emerald-900 font-medium inline-flex items-center gap-1 px-2 py-1 rounded hover:bg-emerald-50"
                        >
                          View <ChevronRight className="h-3.5 w-3.5" />
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
        <div className="px-6 py-3 border-t border-gray-200 bg-gray-50 text-xs text-gray-500 flex items-center justify-between">
          <span>Showing {filteredTickets.length} of {tickets.length} tickets</span>
          <span>Wellpath Helpdesk SLA: 98.6%</span>
        </div>
      </div>

      {/* Ticket Details Drawer / Modal */}
      {selectedTicket && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-black/40 backdrop-blur-xs flex justify-end">
          <div className="w-full max-w-2xl bg-white h-full shadow-2xl flex flex-col animate-in">
            {/* Header */}
            <div className="p-6 border-b border-gray-200 flex items-start justify-between bg-gray-50">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm font-bold text-gray-700">{selectedTicket.id}</span>
                  <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-emerald-100 text-emerald-800">
                    {selectedTicket.status}
                  </span>
                  <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-gray-200 text-gray-800">
                    {selectedTicket.priority} Priority
                  </span>
                </div>
                <h2 className="text-xl font-bold text-gray-900 mt-2">{selectedTicket.subject}</h2>
                <div className="text-xs text-gray-500 mt-1">
                  Opened {new Date(selectedTicket.createdAt).toLocaleString()} by {selectedTicket.requester.name} ({selectedTicket.requester.email})
                </div>
              </div>
              <button
                onClick={() => setSelectedTicket(null)}
                className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Quick Status / Assignment Toolbar */}
            <div className="px-6 py-3 bg-white border-b border-gray-200 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-gray-500 font-medium">Quick Status:</span>
                {(['Open', 'In Progress', 'Waiting on User', 'Resolved'] as const).map(st => (
                  <button
                    key={st}
                    onClick={() => handleUpdateStatus(selectedTicket.id, st)}
                    className={`px-2.5 py-1 rounded-md border font-medium transition-colors ${
                      selectedTicket.status === st
                        ? 'bg-emerald-600 text-white border-emerald-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
              <div className="text-gray-500">
                Category: <span className="font-semibold text-gray-800">{selectedTicket.category}</span>
              </div>
            </div>

            {/* Scrollable Conversation Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Original Issue */}
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                  <span className="font-semibold text-gray-900 flex items-center gap-1.5">
                    <span className="h-6 w-6 rounded-full bg-emerald-200 text-emerald-900 flex items-center justify-center font-bold text-xs">
                      {selectedTicket.requester.name.charAt(0)}
                    </span>
                    {selectedTicket.requester.name} ({selectedTicket.requester.role})
                  </span>
                  <span>{new Date(selectedTicket.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <p className="text-sm text-gray-800 whitespace-pre-line leading-relaxed">
                  {selectedTicket.description}
                </p>
              </div>

              {/* Replies */}
              {selectedTicket.replies.map((reply) => (
                <div 
                  key={reply.id} 
                  className={`rounded-xl p-4 border text-sm ${
                    reply.role === 'admin' 
                      ? 'bg-emerald-50/50 border-emerald-200 ml-6' 
                      : 'bg-gray-50 border-gray-200 mr-6'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className={`font-semibold ${reply.role === 'admin' ? 'text-emerald-800' : 'text-gray-900'}`}>
                      {reply.author}
                    </span>
                    <span className="text-gray-400">
                      {new Date(reply.timestamp).toLocaleString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-gray-800 whitespace-pre-line leading-relaxed">
                    {reply.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Reply Input Form */}
            <form onSubmit={handleAddReply} className="p-4 border-t border-gray-200 bg-gray-50">
              <label htmlFor="replyInput" className="block text-xs font-semibold text-gray-700 mb-2">
                Send Admin Response / Internal Resolution Note
              </label>
              <textarea
                id="replyInput"
                rows={3}
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Type your reply to the user or note... (Submitting will mark status as 'Waiting on User')"
                className="w-full p-3 text-sm border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <div className="flex justify-between items-center mt-3">
                <span className="text-xs text-gray-400">Notifies user via registered email</span>
                <button
                  type="submit"
                  disabled={!replyText.trim()}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors"
                >
                  <Send className="h-3.5 w-3.5" />
                  Send Reply
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* New Ticket Modal */}
      {showNewModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-gray-200 animate-in">
            <div className="flex justify-between items-center pb-4 border-b border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <LifeBuoy className="h-5 w-5 text-emerald-600" />
                Create New Support Ticket
              </h3>
              <button
                onClick={() => setShowNewModal(false)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-md"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateTicket} className="space-y-4 mt-4 text-sm">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Subject *</label>
                <input
                  type="text"
                  required
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  placeholder="e.g. Payment receipt clarification"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Requester Name *</label>
                  <input
                    type="text"
                    required
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="Full name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Requester Email *</label>
                  <input
                    type="email"
                    required
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    placeholder="email@example.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Role</label>
                  <select
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value as any)}
                    className="w-full px-2.5 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs"
                  >
                    <option value="patient">Patient</option>
                    <option value="professional">Professional</option>
                    <option value="student">Student</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Priority</label>
                  <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value as any)}
                    className="w-full px-2.5 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Urgent">Urgent</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Category</label>
                  <select
                    value={newCat}
                    onChange={(e) => setNewCat(e.target.value as any)}
                    className="w-full px-2.5 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs"
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
                <label className="block text-xs font-semibold text-gray-700 mb-1">Issue Description *</label>
                <textarea
                  rows={4}
                  required
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Provide all context and details..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowNewModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 text-xs font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow-sm"
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
