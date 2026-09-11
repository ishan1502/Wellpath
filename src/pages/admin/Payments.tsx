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

  if (loading) return <div className="p-8 text-center text-gray-500">Loading payments...</div>;

  const totalRevenue = transactions.reduce((sum, t) => sum + (t.status === 'successful' ? t.amount : 0), 0);
  const platformFee = totalRevenue * 0.1; // 10% platform fee assumption

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-900">Payments & Transactions</h2>
        <div className="relative w-full sm:w-64">
          <input 
            type="text" 
            placeholder="Search transaction ID..." 
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center text-gray-500 mb-2">
            <DollarSign className="w-5 h-5 mr-2 text-green-500" />
            Total Processed
          </div>
          <div className="text-3xl font-bold text-gray-900">₹{totalRevenue.toLocaleString()}</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center text-gray-500 mb-2">
            <ArrowUpRight className="w-5 h-5 mr-2 text-blue-500" />
            Platform Revenue
          </div>
          <div className="text-3xl font-bold text-gray-900">₹{platformFee.toLocaleString()}</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center text-gray-500 mb-2">
            <ArrowDownRight className="w-5 h-5 mr-2 text-purple-500" />
            Provider Payouts
          </div>
          <div className="text-3xl font-bold text-gray-900">₹{(totalRevenue - platformFee).toLocaleString()}</div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {transactions.map((tx) => (
              <tr key={tx.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-500">
                  {tx.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(tx.date).toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">Appt: {tx.appointmentId}</div>
                  <div className="text-xs text-gray-500">From {tx.patientId} to {tx.professionalId}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  ₹{tx.amount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full capitalize ${
                    tx.status === 'successful' ? 'bg-green-100 text-green-800' :
                    tx.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
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
        {transactions.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            No transactions found.
          </div>
        )}
      </div>
    </div>
  );
}
