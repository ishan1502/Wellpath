import React, { useEffect, useState } from 'react';
import { adminService } from '../../services/adminService';
import { User as UserType } from '../../types';
import { Search, User as UserIcon } from 'lucide-react';

export default function Users() {
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    setLoading(true);
    const data = await adminService.getUsers();
    setUsers(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleToggleStatus = async (id: string, currentStatus: string | undefined) => {
    const newStatus = currentStatus === 'deactivated' ? 'active' : 'deactivated';
    try {
      await adminService.updateUserStatus(id, newStatus);
      setUsers(users.map(u => u.id === id ? { ...u, status: newStatus } : u));
    } catch (err: any) {
      console.error('Failed to update user status:', err);
      alert('Failed to update user status: ' + (err?.message || 'Unknown error'));
    }
  };

  if (loading) return <div className="p-8 text-center text-primary font-medium">Loading users...</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-3xl font-extrabold text-foreground tracking-tight">Users</h2>
        <div className="relative w-full sm:w-72">
          <input 
            type="text" 
            placeholder="Search users..." 
            className="w-full pl-11 pr-4 py-2.5 bg-surface border border-primary-muted rounded-lg text-primary-dark focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-primary transition-all shadow-sm hover:shadow-md placeholder-emerald-300"
          />
          <Search className="absolute left-4 top-3 h-5 w-5 text-primary-muted-foreground" />
        </div>
      </div>

      <div className="bg-surface rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-primary-muted overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-emerald-50">
            <thead className="bg-primary-muted/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-primary-hover uppercase tracking-wider">User</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-primary-hover uppercase tracking-wider">Role</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-primary-hover uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-primary-hover uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-surface divide-y divide-emerald-50">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-primary-muted/30 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-12 w-12 rounded-lg bg-primary-muted flex items-center justify-center text-primary">
                        <UserIcon className="h-6 w-6" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-bold text-foreground">{user.firstName} {user.lastName}</div>
                        <div className="text-sm font-medium text-primary">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-xl capitalize ${
                      user.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                      user.role === 'professional' ? 'bg-blue-100 text-blue-800' :
                      user.role === 'student' ? 'bg-amber-100 text-amber-800' :
                      'bg-primary-muted text-primary-dark'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary">
                    <div className="flex items-center gap-2">
                      <span className={`h-2 w-2 rounded-full ${user.status === 'deactivated' ? 'bg-red-500' : 'bg-primary'}`}></span>
                      <span className="capitalize">{user.status || 'Active'}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold">
                    <button className="text-primary hover:text-primary-dark mr-4 transition-colors">Edit</button>
                    <button 
                      onClick={() => handleToggleStatus(user.id, user.status)}
                      className={`${user.status === 'deactivated' ? 'text-amber-500 hover:text-amber-700' : 'text-red-500 hover:text-red-700'} transition-colors`}
                    >
                      {user.status === 'deactivated' ? 'Activate' : 'Deactivate'}
                    </button>
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
