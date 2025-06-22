import React, { useEffect, useState } from 'react';
import { supabase } from '../api/supabase';
import { useNavigate } from 'react-router-dom';

const DashboardIncomingOffers: React.FC = () => {
  const [offers, setOffers] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOffers = async () => {
      const { data, error } = await supabase
        .from('offers')
        .select('offert_id, avresa_datum, avresa_plats, destination, antal_passagerare, fornamn, efternamn, resa_typ, created_at')
        .order('created_at', { ascending: false })
        .limit(15);

      if (!error && data) {
        setOffers(data);
      } else {
        console.error('Supabase error:', error);
      }
    };

    fetchOffers();
  }, []);

  const getPriorityColor = (avresaDatum: string) => {
    const today = new Date();
    const departure = new Date(avresaDatum);
    const diffDays = Math.floor((departure.getTime() - today.getTime()) / (1000 * 3600 * 24));

    if (diffDays >= 5) return 'bg-green-500';
    if (diffDays >= 2) return 'bg-yellow-400';
    return 'bg-red-500';
  };

  const handleLinkClick = (id: string) => {
    navigate(`/offert/${id}`);
  };

  return (
    <div className="bg-white rounded-xl shadow p-4 w-full">
      <h2 className="text-lg font-semibold mb-4 text-black">Senaste inkomna offerter</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="p-2">ID</th>
              <th className="p-2">Avresa datum</th>
              <th className="p-2">Pass</th>
              <th className="p-2">Från</th>
              <th className="p-2">Till</th>
              <th className="p-2">Kund</th>
              <th className="p-2">Enkel / Tur & Retur</th>
            </tr>
          </thead>
          <tbody>
            {offers.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-gray-500 p-2">Inga offerter att visa.</td>
              </tr>
            ) : (
              offers.map((offer, index) => (
                <tr key={`${offer.offert_id}-${index}`} className="border-b hover:bg-gray-50">
                  <td className="p-2">
                    <button onClick={() => handleLinkClick(offer.offert_id)} className="text-blue-600 hover:underline font-semibold">
                      {offer.offert_id}
                    </button>
                  </td>
                  <td className="p-2">
                    <div className="flex items-center gap-2">
                      <span className={`h-2 w-2 rounded-full ${getPriorityColor(offer.avresa_datum)}`}></span>
                      {new Date(offer.avresa_datum).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="p-2">{offer.antal_passagerare}</td>
                  <td className="p-2">{offer.avresa_plats}</td>
                  <td className="p-2">{offer.destination}</td>
                  <td className="p-2">{offer.fornamn} {offer.efternamn}</td>
                  <td className="p-2">{offer.resa_typ}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex gap-4 text-xs text-gray-700">
        <div className="flex items-center gap-1">
          <span className="h-2 w-2 rounded-full bg-green-500 inline-block"></span>
          = Gott om tid
        </div>
        <div className="flex items-center gap-1">
          <span className="h-2 w-2 rounded-full bg-yellow-400 inline-block"></span>
          = Börja närma sig
        </div>
        <div className="flex items-center gap-1">
          <span className="h-2 w-2 rounded-full bg-red-500 inline-block"></span>
          = Akut / Prio
        </div>
      </div>
    </div>
  );
};

export default DashboardIncomingOffers;
