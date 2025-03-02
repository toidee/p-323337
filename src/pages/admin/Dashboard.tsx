
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import Header from '@/components/common/Header';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Admin Dashboard | V-Fire Inspect</title>
      </Helmet>

      <Header logoUrl="https://cdn.builder.io/api/v1/image/assets/TEMP/692531a09f3d8f46fa6184a126a551c58ac31298" />

      <main className="p-6">
        <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-[#F00]">ADMIN DASHBOARD</h1>
            <button
              onClick={signOut}
              className="bg-[#FE623F] text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors"
            >
              Log Out
            </button>
          </div>

          <div className="bg-gray-100 p-4 rounded-md mb-6">
            <p className="font-semibold">Welcome, {user?.email}</p>
            <p className="text-sm text-gray-600">You are logged in as an administrator</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Link to="/admin/pending-registrations" className="no-underline">
              <DashboardCard title="Pending Registrations" count={0} highlight />
            </Link>
            <DashboardCard title="Users" count={0} />
            <DashboardCard title="Reports" count={0} />
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Administrative Actions</h2>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/admin/pending-registrations"
                className="bg-[#FE623F] text-white px-6 py-3 rounded-lg font-medium hover:bg-opacity-90 transition-colors inline-flex items-center"
              >
                Review Registration Requests
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

interface DashboardCardProps {
  title: string;
  count: number;
  highlight?: boolean;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, count, highlight = false }) => (
  <div className={`bg-white border ${highlight ? 'border-[#FE623F]' : 'border-gray-200'} rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow`}>
    <h3 className={`text-lg font-semibold ${highlight ? 'text-[#FE623F]' : ''}`}>{title}</h3>
    <p className="text-3xl font-bold mt-2">{count}</p>
    <p className="text-sm text-gray-500 mt-2">Total {title.toLowerCase()}</p>
  </div>
);

export default Dashboard;
