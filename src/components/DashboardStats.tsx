import React, { useEffect, useState } from 'react';
import { supabase } from '../api/supabase';
import { FileText, Ticket, Inbox, Hash } from 'lucide-react';

const DashboardStats: React.FC = () => {
  const [offerCount, setOfferCount] = useState<number>(0);
  const [latestOfferId, setLatestOfferId] = useState<string>('HB25XXXXXX');
  const [bookingCount, setBookingCount] = useState<number>(0);
  const [ticketCount, setTicketCount] = useState<number>(0);

  useEffect(() => {
    const fetchStats = async () => {
      const { data: offers, error: offerError } = await supabase
        .from('offers')
        .select('offert_id')
        .order('created_at', { ascending: false });

      if (!offerError && offers) {
        setOfferCount(offers.length);
        if (offers.length > 0 && offers[0].offert_id) {
          setLatestOfferId(offers[0].offert_id);
        }
      }

      const { data: bookings, error: bookingError } = await supabase
        .from('bookings')
        .select('id');
      if (!bookingError && bookings) {
        setBookingCount(bookings.length);
      }

      const { data: tickets, error: ticketError } = await supabase
        .from('tickets')
        .select('id');
      if (!ticketError && tickets) {
        setTicketCount(tickets.length);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-white px-3 py-3 rounded-xl shadow flex flex-col items-center justify-center">
        <Inbox className="text-purple-500 mb-1" size={24} />
        <h2 className="text-sm font-semibold">Inkomna Offerter</h2>
        <p className="text-lg font-bold text-purple-600 mt-1">{offerCount}</p>
      </div>

      <div className="bg-white px-3 py-3 rounded-xl shadow flex flex-col items-center justify-center">
        <Hash className="text-indigo-500 mb-1" size={24} />
        <h2 className="text-sm font-semibold">Senaste offert är</h2>
        <p className="text-lg font-bold text-indigo-600 mt-1">{latestOfferId}</p>
      </div>

      <div className="bg-white px-3 py-3 rounded-xl shadow flex flex-col items-center justify-center">
        <FileText className="text-blue-500 mb-1" size={24} />
        <h2 className="text-sm font-semibold">Antal bokningar</h2>
        <p className="text-lg font-bold text-blue-600 mt-1">{bookingCount}</p>
      </div>

      <div className="bg-white px-3 py-3 rounded-xl shadow flex flex-col items-center justify-center">
        <Ticket className="text-green-500 mb-1" size={24} />
        <h2 className="text-sm font-semibold">Antal sålda biljetter</h2>
        <p className="text-lg font-bold text-green-600 mt-1">{ticketCount}</p>
      </div>
    </div>
  );
};

export default DashboardStats;
