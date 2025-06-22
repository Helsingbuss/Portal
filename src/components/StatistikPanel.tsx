import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_KEY!
);

const StatistikPanel: React.FC = () => {
  const [antalOfferter, setAntalOfferter] = useState<number>(0);
  const [senasteOffertId, setSenasteOffertId] = useState<string>('');

  useEffect(() => {
    const fetchOfferter = async () => {
      const today = new Date().toISOString().split('T')[0];

      const { count } = await supabase
        .from('offers')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', `${today}T00:00:00`);

      setAntalOfferter(count || 0);
    };

    const fetchSenasteOffertId = async () => {
      const { data } = await supabase
        .from('offers')
        .select('offert_id')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (data?.offert_id) setSenasteOffertId(data.offert_id);
    };

    fetchOfferter();
    fetchSenasteOffertId();
  }, []);

  return (
    <div className="bg-white shadow rounded-xl p-4 flex flex-wrap items-center gap-4">
      <div className="flex flex-col items-start">
        <span className="text-gray-500 text-sm">Inkomna Offerter</span>
        <span className="text-xl font-bold">{antalOfferter}</span>
      </div>

      <div className="flex flex-col items-start">
        <span className="text-gray-500 text-sm">Senaste offert är</span>
        <span className="text-md font-semibold">{senasteOffertId || 'HB25XXXXXX'}</span>
      </div>
    </div>
  );
};

export default StatistikPanel;
