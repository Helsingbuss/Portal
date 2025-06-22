import React, { useState } from 'react';
import { supabase } from '../api/supabase';
import { useNavigate } from 'react-router-dom';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + '/reset-password'
    });

    setLoading(false);

    if (error) {
      setError('Kunde inte skicka återställningslänk.');
    } else {
      navigate('/reset-email-sent');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100">
      <div className="bg-white shadow-xl rounded-2xl px-8 py-10 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Glömt lösenord?</h1>
        <form className="flex flex-col gap-4" onSubmit={handleReset}>
          <input
            type="email"
            placeholder="Din e-postadress"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white rounded-lg p-3 font-semibold hover:bg-blue-600 transition"
          >
            {loading ? 'Skickar...' : 'Skicka återställningslänk'}
          </button>
        </form>
        {error && <p className="mt-4 text-red-600 text-sm text-center">{error}</p>}
      </div>
    </div>
  );
};

export default ForgotPassword;