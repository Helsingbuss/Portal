import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../api/supabase';

const OffertDetaljer: React.FC = () => {
  const { offertId } = useParams();
  const [offert, setOffert] = useState<any>(null);

  useEffect(() => {
    const fetchOffert = async () => {
      const { data } = await supabase
        .from('offers')
        .select('*')
        .eq('offert_id', offertId)
        .single();

      if (data) setOffert(data);
    };

    fetchOffert();
  }, [offertId]);

  if (!offert) return <div>Laddar...</div>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-xl font-semibold mb-6">Offert ID ({offert.offert_id})</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow p-4">
          <h3 className="font-semibold mb-2">Information om beställningskörningen</h3>
          <p><strong>Enkel / Tur & Retur:</strong> {offert.resa_typ}</p>
          <p><strong>Avresedag och tid:</strong> {offert.avresa_datum} {offert.avresa_tid}</p>
          <p><strong>Avgångsort:</strong> {offert.avresa_plats}</p>
          <p><strong>Destination:</strong> {offert.destination}</p>
          <p><strong>Antal personer:</strong> {offert.antal_passagerare}</p>
          <p><strong>Använda bussen på plats?:</strong> {offert.buss_pa_plats ? 'Ja' : 'Nej'}</p>
        </div>

        <div className="bg-white rounded-xl shadow p-4">
          <h3 className="font-semibold mb-2">Resplan och detaljer</h3>
          <p>{offert.reseplaner}</p>
        </div>

        <div className="bg-white rounded-xl shadow p-4">
          <h3 className="font-semibold mb-2">Kontaktuppgifter</h3>
          <p><strong>Förnamn:</strong> {offert.fornamn}</p>
          <p><strong>Efternamn:</strong> {offert.efternamn}</p>
          <p><strong>Adress:</strong> {offert.gatuadress}</p>
          <p><strong>Postnummer:</strong> {offert.postnummer}</p>
          <p><strong>Ort:</strong> {offert.ort}</p>
          <p><strong>E-post:</strong> {offert.epost}</p>
          <p><strong>Telefon:</strong> {offert.telefon}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-4 mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="font-semibold mb-2">Inlämna offert</h3>
          <div className="grid grid-cols-3 gap-4 mb-2">
            <input type="text" placeholder="Summa exkl.moms" className="border rounded px-2 py-1" />
            <input type="text" placeholder="Moms" className="border rounded px-2 py-1" />
            <input type="text" placeholder="Totalsumma" className="border rounded px-2 py-1" />
          </div>
          <textarea placeholder="Lämna ett meddelande" className="border rounded w-full px-2 py-1" rows={5}></textarea>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Prisberäkning</h3>
          {/* Lägg till Prisberäkning innehåll här */}
        </div>
      </div>

      <div className="mt-4 flex justify-end gap-2">
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Besvara offert</button>
        <button className="bg-green-600 text-white px-4 py-2 rounded">Skapa bokning</button>
      </div>
    </div>
  );
};

export default OffertDetaljer;
