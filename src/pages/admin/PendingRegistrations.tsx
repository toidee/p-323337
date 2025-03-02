
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Header from '@/components/common/Header';
import { Helmet } from 'react-helmet';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

interface Business {
  name: string;
  dti_number: string;
}

interface PendingUser {
  id: number;
  first_name: string;
  middle_name: string | null;
  last_name: string;
  email: string;
  businesses: Business[];
  requested_at: string;
  status: string;
}

const PendingRegistrations: React.FC = () => {
  const { signOut, user } = useAuth();
  const [pendingUsers, setPendingUsers] = useState<PendingUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingIds, setProcessingIds] = useState<Set<number>>(new Set());

  const fetchPendingUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('pending_users')
        .select('*')
        .eq('status', 'pending')
        .order('requested_at', { ascending: false });

      if (error) {
        throw error;
      }

      setPendingUsers(data || []);
    } catch (error) {
      console.error('Error fetching pending users:', error);
      toast.error('Failed to load pending registrations');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingUsers();
  }, []);

  const generateTemporaryPassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  };

  const approveUser = async (pendingUser: PendingUser) => {
    // Mark user as processing
    setProcessingIds(prev => new Set(prev).add(pendingUser.id));
    
    try {
      // Generate temporary password
      const tempPassword = generateTemporaryPassword();
      
      // 1. Create auth user in Supabase
      const { data: authData, error: authError } = await supabase.auth.admin.createUser({
        email: pendingUser.email,
        password: tempPassword,
        email_confirm: true,
      });

      if (authError) {
        throw authError;
      }

      const userId = authData.user.id;

      // 2. Add user to profiles table
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([
          {
            id: userId,
            email: pendingUser.email,
            first_name: pendingUser.first_name,
            middle_name: pendingUser.middle_name,
            last_name: pendingUser.last_name,
            businesses: pendingUser.businesses,
            is_admin: false,
            password_changed: false,
          },
        ]);

      if (profileError) {
        throw profileError;
      }

      // 3. Update pending_user status to approved
      const { error: updateError } = await supabase
        .from('pending_users')
        .update({ status: 'approved', processed_at: new Date().toISOString() })
        .eq('id', pendingUser.id);

      if (updateError) {
        throw updateError;
      }

      // 4. Send email with temporary credentials 
      // (In a real implementation, you would integrate with an email service)
      console.log(`Email would be sent to ${pendingUser.email} with password: ${tempPassword}`);
      
      // Remove user from list after successful approval
      setPendingUsers(prev => prev.filter(user => user.id !== pendingUser.id));
      
      toast.success(`User ${pendingUser.email} approved and credentials sent`);
    } catch (error) {
      console.error('Error approving user:', error);
      toast.error('Failed to approve user');
    } finally {
      // Remove from processing list
      setProcessingIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(pendingUser.id);
        return newSet;
      });
    }
  };

  const rejectUser = async (id: number) => {
    // Mark user as processing
    setProcessingIds(prev => new Set(prev).add(id));
    
    try {
      // Update pending_user status to rejected
      const { error } = await supabase
        .from('pending_users')
        .update({ status: 'rejected', processed_at: new Date().toISOString() })
        .eq('id', id);

      if (error) {
        throw error;
      }
      
      // Remove user from list after successful rejection
      setPendingUsers(prev => prev.filter(user => user.id !== id));
      
      toast.success('Registration request rejected');
    } catch (error) {
      console.error('Error rejecting user:', error);
      toast.error('Failed to reject user');
    } finally {
      // Remove from processing list
      setProcessingIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Pending Registrations | V-Fire Inspect</title>
      </Helmet>

      <Header logoUrl="https://cdn.builder.io/api/v1/image/assets/TEMP/692531a09f3d8f46fa6184a126a551c58ac31298" />

      <main className="p-6">
        <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-[#F00]">PENDING REGISTRATIONS</h1>
            <div className="flex gap-4">
              <Link
                to="/admin/dashboard"
                className="bg-gray-200 text-black px-4 py-2 rounded-md hover:bg-gray-300 transition-colors"
              >
                Dashboard
              </Link>
              <button
                onClick={signOut}
                className="bg-[#FE623F] text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors"
              >
                Log Out
              </button>
            </div>
          </div>

          <div className="bg-gray-100 p-4 rounded-md mb-6">
            <p className="text-sm text-gray-600">
              Review and approve/reject business registration requests
            </p>
          </div>

          {loading ? (
            <div className="text-center py-10">
              <p>Loading pending registrations...</p>
            </div>
          ) : pendingUsers.length === 0 ? (
            <div className="text-center py-10 bg-gray-50 rounded-lg">
              <p className="text-lg text-gray-500">No pending registrations found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Businesses</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Requested</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingUsers.map((pendingUser) => (
                    <tr key={pendingUser.id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm">
                        {`${pendingUser.first_name} ${pendingUser.middle_name ? pendingUser.middle_name + ' ' : ''}${pendingUser.last_name}`}
                      </td>
                      <td className="px-4 py-3 text-sm">{pendingUser.email}</td>
                      <td className="px-4 py-3 text-sm">
                        <ul className="list-disc list-inside">
                          {pendingUser.businesses.map((business, index) => (
                            <li key={index}>
                              <span className="font-medium">{business.name}</span>
                              <span className="text-xs ml-2 text-gray-500">(DTI: {business.dti_number})</span>
                            </li>
                          ))}
                        </ul>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {formatDate(pendingUser.requested_at)}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => approveUser(pendingUser)}
                            disabled={processingIds.has(pendingUser.id)}
                            className="bg-green-500 text-white px-3 py-1 rounded text-xs font-semibold hover:bg-green-600 disabled:opacity-50"
                          >
                            {processingIds.has(pendingUser.id) ? 'Processing...' : 'Approve'}
                          </button>
                          <button
                            onClick={() => rejectUser(pendingUser.id)}
                            disabled={processingIds.has(pendingUser.id)}
                            className="bg-red-500 text-white px-3 py-1 rounded text-xs font-semibold hover:bg-red-600 disabled:opacity-50"
                          >
                            {processingIds.has(pendingUser.id) ? 'Processing...' : 'Reject'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default PendingRegistrations;
