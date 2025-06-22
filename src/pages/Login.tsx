import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo_2.png';
import { supabase } from '../api/supabase';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    setLoading(false);

    if (error) {
      setError('Fel e-post eller lösenord.');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-400">
      <div className="bg-white shadow-2xl rounded-2xl px-8 py-10 w-full max-w-md flex flex-col items-center">
        <img src={logo} alt="Logo" className="h-16 mb-4" />
        <h1 className="text-2xl font-bold mb-6 text-center">Logga in</h1>
        <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="email"
            className="bg-blue-50 border border-blue-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="E-post"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            autoFocus
          />
          <input
            type="password"
            className="bg-blue-50 border border-blue-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Lösenord"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white rounded-lg p-3 font-semibold hover:bg-blue-600 transition"
          >
            {loading ? 'Loggar in...' : 'Logga in'}
          </button>
        </form>
      <a href="/forgot-password" className="mt-4 text-sm text-blue-600 hover:underline">
  Glömt lösenord?
</a>
        {error && (
          <div className="mt-4 text-red-600 text-center text-sm">{error}</div>
        )}
      </div>
    </div>
  );
};

export default Login;