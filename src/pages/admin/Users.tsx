import React, { useEffect, useState } from 'react';
import { adminService } from '../../services/adminService';
import { User as UserType } from '../../types';
import { Search, User as UserIcon } from 'lucide-react';

export default function Users() {
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    const data = await adminService.getUsers();
    setUsers(data);
    setLoading(false);
  };

  if (loading) return <div className="p-8 text-center text-emerald-600 font-medium">Loading users...</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-3xl font-extrabold text-emerald-950 tracking-tight">Users</h2>
        <div className="relative w-full sm:w-72">
          <input 
            type="text" 
            placeholder="Search users..." 
            className="w-full pl-11 pr-4 py-2.5 bg-white border border-emerald-100 rounded-2xl text-emerald-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all shadow-sm hover:shadow-md placeholder-emerald-300"
          />
          <Search className="absolute left-4 top-3 h-5 w-5 text-emerald-400" />
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-emerald-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-emerald-50">
            <thead className="bg-emerald-50/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-emerald-700 uppercase tracking-wider">User</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-emerald-700 uppercase tracking-wider">Role</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-emerald-700 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-emerald-700 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-emerald-50">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-emerald-50/30 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-12 w-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600">
                        <UserIcon className="h-6 w-6" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-bold text-emerald-950">{user.firstName} {user.lastName}</div>
                        <div className="text-sm font-medium text-emerald-600">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-xl capitalize ${
                      user.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                      user.role === 'professional' ? 'bg-blue-100 text-blue-800' :
                      user.role === 'student' ? 'bg-amber-100 text-amber-800' :
                      'bg-emerald-100 text-emerald-800'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-emerald-600">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                      Active
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold">
                    <button className="text-emerald-600 hover:text-emerald-800 mr-4 transition-colors">Edit</button>
                    <button className="text-red-500 hover:text-red-700 transition-colors">Deactivate</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
