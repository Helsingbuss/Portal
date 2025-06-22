import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Eller Next.js useRouter vid behov
import { supabase } from '../api/supabase';

const OffertPublic: React.FC = () => {
  const { offertId } = useParams();
  const [offert, setOffert] = useState<any>(null);

  useEffect(() => {
    const fetchOffert = async () => {
      const { data } = await supabase
        .from('offers')
        .select('*')
        .eq('offert_id', offertId)
        .single();
      setOffert(data);
    };
    fetchOffert();
  }, [offertId]);

  if (!offert) return <div>Laddar...</div>;

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-8">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl p-0 overflow-hidden">
        {/* Header med logotyp */}
        <div className="bg-[#52828E] px-6 py-4 flex items-center">
          <img src="/helsingbuss-logo.svg" alt="Helsingbuss" className="h-8 mr-4" />
        </div>
        <img src="/kundbild.jpg" className="w-full h-48 object-cover" alt="Kundbild" />
        {/* Tack-rubrik */}
        <div className="px-8 py-6">
          <h1 className="text-2xl text-center font-bold text-[#38828E] mb-6">
            Tack för din offertförfrågan!
          </h1>
          {/* Info-rutor */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 border rounded-lg px-4 py-3">
              <div className="font-semibold mb-1">Offertinformation</div>
              <div>Offertnummer: <b>{offert.offert_id}</b></div>
              <div>Offertdatum: {offert.created_at?.substring(0, 10)}</div>
              <div>Er referens: {offert.fornamn} {offert.efternamn}</div>
              <div>Fakturareferens: {offert.faktura_ref || '(valfritt)'}</div>
            </div>
            <div className="flex-1 border rounded-lg px-4 py-3">
              <div className="font-semibold mb-1">Kundinformation</div>
              <div>Namn: {offert.fornamn} {offert.efternamn}</div>
              <div>Adress: {offert.gatuadress}</div>
              <div>Post nr: {offert.postnummer}</div>
              <div>Ort: {offert.ort}</div>
              <div>Telefon: {offert.telefon}</div>
              <div>E-post: {offert.epost}</div>
            </div>
          </div>
          {/* Reseinfo */}
          <h2 className="text-xl text-center font-semibold text-[#38828E] mb-3">
            Din reseinformation
          </h2>
          <div className="mb-6 flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="font-medium mb-1">Bussresa inom Sverige</div>
              <div>{offert.antal_passagerare} Passagerare</div>
              <div>Avgång: {offert.avresa_datum} {offert.avresa_tid}</div>
              <div>Från: {offert.avresa_plats}</div>
              <div>Till: {offert.destination}</div>
            </div>
            {/* Visa returresa om Tur & Retur */}
            {offert.resa_typ === "Tur & Retur" && (
              <div className="flex-1">
                <div className="font-medium mb-1">Bussresa inom Sverige</div>
                <div>{offert.antal_passagerare} Passagerare</div>
                <div>Avgång: {offert.retur_datum} {offert.retur_tid}</div>
                <div>Från: {offert.destination}</div>
                <div>Till: {offert.avresa_plats}</div>
              </div>
            )}
          </div>
          {/* Utskriftsikon */}
          <div className="flex justify-center mb-6">
            <img src="/print-icon.svg" className="h-8" alt="Utskriftsformat" />
          </div>
          {/* Info-text */}
          <div className="text-xs text-gray-700 mb-3">
            Genom att acceptera denna offert godkänner du våra resevillkor, vilka du hittar här.<br />
            Observera att vi reserverar oss för fullbokning på det aktuella datumet, tillgänglig kapacitet kontrolleras vid bokningstillfället och bekräftas därefter genom en bokningsbekräftelse.
          </div>
          <div className="text-xs text-gray-500 mb-1">
            Om du vill boka resan, eller om du har frågor eller synpunkter, är du alltid välkommen att kontakta oss.<br />
            Våra öppettider är vardagar kl. 08:00-17:00...
          </div>
          <div className="text-xs text-gray-400 text-center mt-4">
            Vill du veta mer? För resevillkor, klicka här.<br />
            För mer information om våra busstyper, klicka här.<br />
            Vanliga frågor och svar, klicka här.<br />
            För integritetspolicy, klicka här.
          </div>
        </div>
      </div>
    </div>
  );
};

export default OffertPublic;
