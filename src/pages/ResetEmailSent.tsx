import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../api/supabase';

const ResetPassword: React.FC = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('Lösenorden matchar inte.');
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);

    if (error) {
      setError('Kunde inte återställa lösenord.');
    } else {
      setSuccess(true);
      setTimeout(() => navigate('/'), 3000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="bg-white shadow-xl rounded-2xl px-8 py-10 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Återställ lösenord</h1>
        <form className="flex flex-col gap-4" onSubmit={handleReset}>
          <input
            type="password"
            placeholder="Nytt lösenord"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            placeholder="Bekräfta lösenord"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
            className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white rounded-lg p-3 font-semibold hover:bg-blue-600 transition"
          >
            {loading ? 'Sparar...' : 'Återställ lösenord'}
          </button>
        </form>
        {error && <p className="mt-4 text-red-600 text-sm text-center">{error}</p>}
        {success && (
          <p className="mt-4 text-green-600 text-sm text-center">
            Lösenord uppdaterat! Du omdirigeras till inloggningen...
          </p>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
