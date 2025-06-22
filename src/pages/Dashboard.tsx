import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../api/supabase';
import DashboardStats from '../components/DashboardStats';
import DashboardIncomingOffers from '../components/DashboardIncomingOffers';
import DashboardBookedRides from '../components/DashboardBookedRides';
import DashboardImportantInfo from '../components/DashboardImportantInfo';

const Dashboard: React.FC = () => {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data.user) {
        navigate('/');
      } else {
        setUserEmail(data.user.email);
      }
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  if (!userEmail) return null;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Välkommen till din dashboard</h1>
        <div className="text-sm text-right">
          <p className="mb-1">Inloggad som <strong>{userEmail}</strong></p>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
          >
            Logga ut
          </button>
        </div>
      </div>

      <DashboardStats />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="md:col-span-2">
          <DashboardIncomingOffers />
        </div>
        <div>
          <DashboardImportantInfo />
        </div>
      </div>

      <div className="mt-6">
        <DashboardBookedRides />
      </div>
    </div>
  );
};

export default Dashboard;
