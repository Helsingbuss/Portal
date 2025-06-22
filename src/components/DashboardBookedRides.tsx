import React, { useEffect, useState } from 'react';
import { supabase } from '../api/supabase';

const DashboardBookedRides: React.FC = () => {
  const [bookings, setBookings] = useState<any[]>([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

      if (!error && data) {
        setBookings(data);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h2 className="text-lg font-bold mb-4">Senaste bokningar</h2>
      <ul className="space-y-3">
        {bookings.length > 0 ? (
          bookings.map((booking, index) => (
            <li key={index} className="border-b pb-2">
              <div className="text-sm font-medium text-gray-700">{booking.id}</div>
              <div className="text-xs text-gray-500">{new Date(booking.created_at).toLocaleString()}</div>
            </li>
          ))
        ) : (
          <li className="text-sm text-gray-500">Inga bokningar ännu.</li>
        )}
      </ul>
    </div>
  );
};

export default DashboardBookedRides;
