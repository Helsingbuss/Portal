import React, { useEffect, useState } from 'react';
import { supabase } from '../api/supabase';

const SkapaOffert: React.FC = () => {
  // State för Offert-ID
  const [offertId, setOffertId] = useState('HB25XXXX');
  // Formulärstate
  const [form, setForm] = useState({
    antal_passagerare: '',
    avresa_datum: '',
    avresa_tid: '',
    avresa_plats: '',
    via: '',
    destination: '',
    retur_datum: '',
    retur_tid: '',
    resa_typ: 'Enkel',
    buss_pa_plats: null as boolean | null,
    fornamn: '',
    efternamn: '',
    foretag: '',
    epost: '',
    telefon: '',
    faktura_ref: '',
    gatuadress: '',
    postnummer: '',
    ort: '',
    reseplaner: '',
    pris_ex_moms: '',
    pris_inkl_moms: '',
    synergybus_id: '',
    bergkvara_id: '',
  });

  // Hämta senaste offert-id och räkna upp
  useEffect(() => {
    const fetchLatest = async () => {
      const { data, error } = await supabase
        .from('offers')
        .select('offert_id')
        .order('created_at', { ascending: false })
        .limit(1);

      if (data && data.length > 0) {
        const last = parseInt(data[0].offert_id.replace('HB25', ''), 10) || 0;
        const next = 'HB25' + String(last + 1).padStart(3, '0');
        setOffertId(next);
      } else {
        setOffertId('HB25001');
      }
    };
    fetchLatest();
  }, []);

  // Input-funktion
  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  // Knapp för Enkel / Tur & Retur
  const setResaTyp = (typ: string) => {
    setForm(prev => ({
      ...prev,
      resa_typ: typ,
      ...(typ === 'Enkel' ? { retur_datum: '', retur_tid: '' } : {})
    }));
  };

  // Knapp för bussen på plats
  const setBussPaPlats = (val: boolean) => {
    setForm(prev => ({ ...prev, buss_pa_plats: val }));
  };

  // Skicka till Supabase
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Grundläggande validering (lägg till mer om du vill)
    if (!form.antal_passagerare || !form.avresa_datum || !form.avresa_plats || !form.destination || !form.fornamn || !form.epost) {
      alert('Fyll i alla obligatoriska fält');
      return;
    }

    // Bekräftelseruta
    const confirmed = window.confirm('Vill du skicka offert till kunden?');
    if (!confirmed) return;

    const { error } = await supabase.from('offers').insert({
      offert_id: offertId,
      antal_passagerare: form.antal_passagerare,
      avresa_datum: form.avresa_datum,
      avresa_tid: form.avresa_tid,
      avresa_plats: form.avresa_plats,
      via: form.via,
      destination: form.destination,
      retur_datum: form.resa_typ === "Tur & Retur" ? form.retur_datum : null,
      retur_tid: form.resa_typ === "Tur & Retur" ? form.retur_tid : null,
      resa_typ: form.resa_typ,
      buss_pa_plats: form.buss_pa_plats,
      fornamn: form.fornamn,
      efternamn: form.efternamn,
      foretag: form.foretag,
      epost: form.epost,
      telefon: form.telefon,
      faktura_ref: form.faktura_ref,
      gatuadress: form.gatuadress,
      postnummer: form.postnummer,
      ort: form.ort,
      reseplaner: form.reseplaner,
      pris_ex_moms: form.pris_ex_moms,
      pris_inkl_moms: form.pris_inkl_moms,
      synergybus_id: form.synergybus_id,
      bergkvara_id: form.bergkvara_id,
    });

    if (error) {
      alert('Kunde inte spara offerten.\n\n' + error.message);
    } else {
      alert('Offert sparad!');
      // Återställ formuläret
      setForm({
        antal_passagerare: '',
        avresa_datum: '',
        avresa_tid: '',
        avresa_plats: '',
        via: '',
        destination: '',
        retur_datum: '',
        retur_tid: '',
        resa_typ: 'Enkel',
        buss_pa_plats: null,
        fornamn: '',
        efternamn: '',
        foretag: '',
        epost: '',
        telefon: '',
        faktura_ref: '',
        gatuadress: '',
        postnummer: '',
        ort: '',
        reseplaner: '',
        pris_ex_moms: '',
        pris_inkl_moms: '',
        synergybus_id: '',
        bergkvara_id: '',
      });
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-6 px-4 md:px-8">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow mt-6 px-4 md:px-10 py-6 max-w-screen-xl mx-auto"
        autoComplete="off"
      >
        <h2 className="text-lg font-semibold mb-4 text-gray-700">
          Skapa Offertförfrågan ({offertId})
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Vänster: Resinfo */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-500">Information om resan</h3>
            <input name="antal_passagerare" type="number" min={1} placeholder="Antal passagerare *" className="w-full px-3 py-2 border rounded" value={form.antal_passagerare} onChange={handleInput} />
            <input name="avresa_datum" type="date" placeholder="Avresa datum *" className="w-full px-3 py-2 border rounded" value={form.avresa_datum} onChange={handleInput} />
            <input name="avresa_tid" type="time" placeholder="Klockslag *" className="w-full px-3 py-2 border rounded" value={form.avresa_tid} onChange={handleInput} />
            <input name="avresa_plats" type="text" placeholder="Avresa från *" className="w-full px-3 py-2 border rounded" value={form.avresa_plats} onChange={handleInput} />
            <input name="via" type="text" placeholder="Via" className="w-full px-3 py-2 border rounded" value={form.via} onChange={handleInput} />
            <input name="destination" type="text" placeholder="Destination *" className="w-full px-3 py-2 border rounded" value={form.destination} onChange={handleInput} />

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Enkel / Tur & Retur?</span>
              <button type="button" className={`px-3 py-1 rounded ${form.resa_typ === 'Enkel' ? 'bg-blue-600 text-white' : 'border'}`} onClick={() => setResaTyp('Enkel')}>Enkel</button>
              <button type="button" className={`px-3 py-1 rounded ${form.resa_typ === 'Tur & Retur' ? 'bg-blue-600 text-white' : 'border'}`} onClick={() => setResaTyp('Tur & Retur')}>Tur & Retur</button>
            </div>

            {/* Returresa */}
            {form.resa_typ === 'Tur & Retur' && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-600">Returresa</h4>
                <input name="retur_datum" type="date" placeholder="Returdatum *" className="w-full px-3 py-2 border rounded" value={form.retur_datum} onChange={handleInput} />
                <input name="retur_tid" type="time" placeholder="Returtid *" className="w-full px-3 py-2 border rounded" value={form.retur_tid} onChange={handleInput} />
              </div>
            )}

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Använda bussen på plats?</span>
              <button type="button" className={`px-3 py-1 rounded ${form.buss_pa_plats === true ? 'bg-blue-600 text-white' : 'border'}`} onClick={() => setBussPaPlats(true)}>Ja</button>
              <button type="button" className={`px-3 py-1 rounded ${form.buss_pa_plats === false ? 'bg-blue-600 text-white' : 'border'}`} onClick={() => setBussPaPlats(false)}>Nej</button>
            </div>
          </div>

          {/* Höger: Kundinfo */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-500">Kontaktinformation</h3>
            <div className="grid grid-cols-2 gap-4">
              <input name="fornamn" type="text" placeholder="Förnamn *" className="px-3 py-2 border rounded" value={form.fornamn} onChange={handleInput} />
              <input name="efternamn" type="text" placeholder="Efternamn *" className="px-3 py-2 border rounded" value={form.efternamn} onChange={handleInput} />
            </div>
            <input name="foretag" type="text" placeholder="Företag/organisationsnummer" className="w-full px-3 py-2 border rounded" value={form.foretag} onChange={handleInput} />
            <div className="grid grid-cols-2 gap-4">
              <input name="epost" type="email" placeholder="E-post *" className="px-3 py-2 border rounded" value={form.epost} onChange={handleInput} />
              <input name="telefon" type="tel" placeholder="Telefon *" className="px-3 py-2 border rounded" value={form.telefon} onChange={handleInput} />
            </div>
            <input name="faktura_ref" type="text" placeholder="Fakturareferens/nummer" className="w-full px-3 py-2 border rounded" value={form.faktura_ref} onChange={handleInput} />
            <input name="gatuadress" type="text" placeholder="Gatuadress *" className="w-full px-3 py-2 border rounded" value={form.gatuadress} onChange={handleInput} />
            <div className="grid grid-cols-2 gap-4">
              <input name="postnummer" type="text" placeholder="Postnummer *" className="px-3 py-2 border rounded" value={form.postnummer} onChange={handleInput} />
              <input name="ort" type="text" placeholder="Ort *" className="px-3 py-2 border rounded" value={form.ort} onChange={handleInput} />
            </div>
            <textarea name="reseplaner" placeholder="Mer om resan" className="w-full px-3 py-2 border rounded" rows={3} value={form.reseplaner} onChange={handleInput} />
            <div className="grid grid-cols-2 gap-4">
              <input name="pris_ex_moms" type="text" placeholder="Pris exkl. moms" className="px-3 py-2 border rounded" value={form.pris_ex_moms} onChange={handleInput} />
              <input name="pris_inkl_moms" type="text" placeholder="Pris inkl. moms" className="px-3 py-2 border rounded" value={form.pris_inkl_moms} onChange={handleInput} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input name="synergybus_id" type="text" placeholder="Synergybus ID" className="px-3 py-2 border rounded" value={form.synergybus_id} onChange={handleInput} />
              <input name="bergkvara_id" type="text" placeholder="Bergkvara ID" className="px-3 py-2 border rounded" value={form.bergkvara_id} onChange={handleInput} />
            </div>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Skicka Offert</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SkapaOffert;
