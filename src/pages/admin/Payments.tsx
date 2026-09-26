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

  if (loading) return <div className="p-8 text-center text-emerald-600 font-medium">Loading payments...</div>;

  const totalRevenue = transactions.reduce((sum, t) => sum + (t.status === 'successful' ? t.amount : 0), 0);
  const platformFee = totalRevenue * 0.1; // 10% platform fee assumption

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-3xl font-extrabold text-emerald-950 tracking-tight">Payments & Transactions</h2>
        <div className="relative w-full sm:w-72">
          <input 
            type="text" 
            placeholder="Search transaction ID..." 
            className="w-full pl-11 pr-4 py-2.5 bg-white border border-emerald-100 rounded-2xl text-emerald-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all shadow-sm hover:shadow-md placeholder-emerald-300"
          />
          <Search className="absolute left-4 top-3 h-5 w-5 text-emerald-400" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-emerald-100 hover:shadow-xl transition-all duration-300 group">
          <div className="flex items-center text-emerald-600 font-bold mb-4">
            <div className="p-2 bg-emerald-50 rounded-xl mr-3 group-hover:bg-emerald-100 transition-colors">
              <DollarSign className="w-5 h-5 text-emerald-600" />
            </div>
            Total Processed
          </div>
          <div className="text-4xl font-extrabold text-emerald-950 pl-2">₹{totalRevenue.toLocaleString()}</div>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-emerald-100 hover:shadow-xl transition-all duration-300 group">
          <div className="flex items-center text-emerald-600 font-bold mb-4">
            <div className="p-2 bg-emerald-50 rounded-xl mr-3 group-hover:bg-emerald-100 transition-colors">
              <ArrowUpRight className="w-5 h-5 text-emerald-600" />
            </div>
            Platform Revenue
          </div>
          <div className="text-4xl font-extrabold text-emerald-950 pl-2">₹{platformFee.toLocaleString()}</div>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-emerald-100 hover:shadow-xl transition-all duration-300 group">
          <div className="flex items-center text-emerald-600 font-bold mb-4">
            <div className="p-2 bg-emerald-50 rounded-xl mr-3 group-hover:bg-emerald-100 transition-colors">
              <ArrowDownRight className="w-5 h-5 text-emerald-600" />
            </div>
            Provider Payouts
          </div>
          <div className="text-4xl font-extrabold text-emerald-950 pl-2">₹{(totalRevenue - platformFee).toLocaleString()}</div>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-emerald-100 overflow-hidden hover:shadow-xl transition-all duration-300">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-emerald-50">
            <thead className="bg-emerald-50/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-emerald-700 uppercase tracking-wider">Transaction ID</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-emerald-700 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-emerald-700 uppercase tracking-wider">Details</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-emerald-700 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-emerald-700 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-emerald-50">
              {transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-emerald-50/30 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono font-medium text-emerald-600">
                    {tx.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-emerald-600">
                    {new Date(tx.date).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-bold text-emerald-950">Appt: {tx.appointmentId}</div>
                    <div className="text-xs font-medium text-emerald-600 mt-1">From {tx.patientId} to {tx.professionalId}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-emerald-950">
                    ₹{tx.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1.5 inline-flex text-xs leading-5 font-bold rounded-xl capitalize shadow-sm ${
                      tx.status === 'successful' ? 'bg-emerald-100 text-emerald-800' :
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
            <DollarSign className="w-12 h-12 text-emerald-200 mx-auto mb-4" />
            <p className="text-xl font-bold text-emerald-950">No transactions found</p>
            <p className="text-emerald-600 font-medium mt-1">Payments and transfers will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
}
