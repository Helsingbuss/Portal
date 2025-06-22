// /src/components/OffertForm.tsx
import React, { useState } from 'react';

const defaultForm = {
  fornamn: '',
  efternamn: '',
  epost: '',
  telefon: '',
  avresa_datum: '',
  avresa_plats: '',
  destination: '',
  antal_passagerare: '',
  resa_typ: 'Enkel',
};

const OffertForm: React.FC = () => {
  const [form, setForm] = useState(defaultForm);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  // Uppdaterar form
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Byter steg
  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  // Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/send-offert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setSent(true);
        setForm(defaultForm);
      } else {
        setError('Något gick fel! Försök igen senare.');
      }
    } catch {
      setError('Något gick fel vid anslutning.');
    }
    setLoading(false);
  };

  if (sent) {
    return (
      <div className="bg-white rounded-xl shadow p-6 text-center">
        <h2 className="text-xl font-bold mb-2">Tack för din offertförfrågan!</h2>
        <p>Du kommer få ett mail med mer information.</p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto bg-white rounded-xl shadow p-6">
      <form onSubmit={step === 1 ? handleNext : handleSubmit}>
        {step === 1 && (
          <>
            <h2 className="text-lg font-semibold mb-4">Steg 1: Resedetaljer</h2>
            <div className="mb-3">
              <label className="block mb-1">Avresa (datum)*</label>
              <input type="date" name="avresa_datum" required className="w-full border rounded px-3 py-2" value={form.avresa_datum} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label className="block mb-1">Från*</label>
              <input type="text" name="avresa_plats" required className="w-full border rounded px-3 py-2" value={form.avresa_plats} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label className="block mb-1">Destination*</label>
              <input type="text" name="destination" required className="w-full border rounded px-3 py-2" value={form.destination} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label className="block mb-1">Antal passagerare*</label>
              <input type="number" min={1} name="antal_passagerare" required className="w-full border rounded px-3 py-2" value={form.antal_passagerare} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label className="block mb-1">Typ av resa*</label>
              <select name="resa_typ" className="w-full border rounded px-3 py-2" value={form.resa_typ} onChange={handleChange}>
                <option value="Enkel">Enkel</option>
                <option value="Tur & Retur">Tur & Retur</option>
              </select>
            </div>
            <button type="submit" className="bg-blue-600 text-white px-5 py-2 rounded">Nästa</button>
          </>
        )}
        {step === 2 && (
          <>
            <h2 className="text-lg font-semibold mb-4">Steg 2: Kontaktuppgifter</h2>
            <div className="mb-3">
              <label className="block mb-1">Förnamn*</label>
              <input type="text" name="fornamn" required className="w-full border rounded px-3 py-2" value={form.fornamn} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label className="block mb-1">Efternamn*</label>
              <input type="text" name="efternamn" required className="w-full border rounded px-3 py-2" value={form.efternamn} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label className="block mb-1">E-post*</label>
              <input type="email" name="epost" required className="w-full border rounded px-3 py-2" value={form.epost} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label className="block mb-1">Telefon*</label>
              <input type="tel" name="telefon" required className="w-full border rounded px-3 py-2" value={form.telefon} onChange={handleChange} />
            </div>
            <div className="flex justify-between">
              <button type="button" className="bg-gray-200 px-4 py-2 rounded" onClick={() => setStep(1)}>Tillbaka</button>
              <button type="submit" disabled={loading} className="bg-blue-600 text-white px-6 py-2 rounded">
                {loading ? (
                  <svg className="animate-spin h-5 w-5 mx-auto" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                ) : "Skicka offert"}
              </button>
            </div>
            {error && <div className="text-red-600 mt-2">{error}</div>}
          </>
        )}
      </form>
    </div>
  );
};

export default OffertForm;
