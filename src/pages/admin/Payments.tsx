import React, { useEffect, useState } from 'react';
import { adminService } from '../../services/adminService';
import { Transaction } from '../../types';
import { Search, DollarSign, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function Payments() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    setLoading(true);
    const data = await adminService.getTransactions();
    setTransactions(data);
    setLoading(false);
  };

  if (loading) return <div className="p-8 text-center text-primary font-medium">Loading payments...</div>;

  const totalRevenue = transactions.reduce((sum, t) => sum + (t.status === 'successful' ? t.amount : 0), 0);
  const platformFee = totalRevenue * 0.1; // 10% platform fee assumption

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-3xl font-extrabold text-foreground tracking-tight">Payments & Transactions</h2>
        <div className="relative w-full sm:w-72">
          <input 
            type="text" 
            placeholder="Search transaction ID..." 
            className="w-full pl-11 pr-4 py-2.5 bg-surface border border-primary-muted rounded-lg text-primary-dark focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-primary transition-all shadow-sm hover:shadow-md placeholder-emerald-300"
          />
          <Search className="absolute left-4 top-3 h-5 w-5 text-primary-muted-foreground" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-surface p-6 rounded-xl shadow-sm border border-primary-muted hover:shadow-md transition-all duration-300 group">
          <div className="flex items-center text-primary font-bold mb-4">
            <div className="p-2 bg-primary-muted rounded-xl mr-3 group-hover:bg-primary-muted transition-colors">
              <DollarSign className="w-5 h-5 text-primary" />
            </div>
            Total Processed
          </div>
          <div className="text-4xl font-extrabold text-foreground pl-2">₹{totalRevenue.toLocaleString()}</div>
        </div>
        <div className="bg-surface p-6 rounded-xl shadow-sm border border-primary-muted hover:shadow-md transition-all duration-300 group">
          <div className="flex items-center text-primary font-bold mb-4">
            <div className="p-2 bg-primary-muted rounded-xl mr-3 group-hover:bg-primary-muted transition-colors">
              <ArrowUpRight className="w-5 h-5 text-primary" />
            </div>
            Platform Revenue
          </div>
          <div className="text-4xl font-extrabold text-foreground pl-2">₹{platformFee.toLocaleString()}</div>
        </div>
        <div className="bg-surface p-6 rounded-xl shadow-sm border border-primary-muted hover:shadow-md transition-all duration-300 group">
          <div className="flex items-center text-primary font-bold mb-4">
            <div className="p-2 bg-primary-muted rounded-xl mr-3 group-hover:bg-primary-muted transition-colors">
              <ArrowDownRight className="w-5 h-5 text-primary" />
            </div>
            Provider Payouts
          </div>
          <div className="text-4xl font-extrabold text-foreground pl-2">₹{(totalRevenue - platformFee).toLocaleString()}</div>
        </div>
      </div>

      <div className="bg-surface rounded-xl shadow-sm border border-primary-muted overflow-hidden hover:shadow-md transition-all duration-300">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-emerald-50">
            <thead className="bg-primary-muted/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-primary-hover uppercase tracking-wider">Transaction ID</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-primary-hover uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-primary-hover uppercase tracking-wider">Details</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-primary-hover uppercase tracking-wider">Amount</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-primary-hover uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-surface divide-y divide-emerald-50">
              {transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-primary-muted/30 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono font-medium text-primary">
                    {tx.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary">
                    {new Date(tx.date).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-bold text-foreground">Appt: {tx.appointmentId}</div>
                    <div className="text-xs font-medium text-primary mt-1">From {tx.patientId} to {tx.professionalId}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-foreground">
                    ₹{tx.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1.5 inline-flex text-xs leading-5 font-bold rounded-xl capitalize shadow-sm ${
                      tx.status === 'successful' ? 'bg-primary-muted text-primary-dark' :
                      tx.status === 'pending' ? 'bg-amber-100 text-amber-800' :
                      tx.status === 'refunded' ? 'bg-blue-100 text-blue-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {transactions.length === 0 && (
          <div className="p-16 text-center">
            <DollarSign className="w-12 h-12 text-primary-muted mx-auto mb-4" />
            <p className="text-xl font-bold text-foreground">No transactions found</p>
            <p className="text-primary font-medium mt-1">Payments and transfers will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
}
