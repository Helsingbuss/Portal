// /api/send-offert.js eller send-offert.ts

import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';

const resend = new Resend(process.env.RESEND_API_KEY);

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST allowed' });
  }

  const form = req.body;

  // Skapa nytt Offert-ID (ex: HB25001, HB25002...)
  const { data: lastOffer } = await supabase
    .from('offers')
    .select('offert_id')
    .order('created_at', { ascending: false })
    .limit(1)
    .single();
  let nextOffertId = 'HB25001';
  if (lastOffer && lastOffer.offert_id) {
    const num = parseInt(lastOffer.offert_id.replace('HB25', '')) + 1;
    nextOffertId = 'HB25' + String(num).padStart(3, '0');
  }

  // Spara offert till Supabase
  const { error } = await supabase.from('offers').insert({
    offert_id: nextOffertId,
    ...form,
  });
  if (error) return res.status(500).json({ success: false, error: error.message });

  // Skapa länk till offertdetaljer
  const link = `https://helsingbuss.se/offertdetaljer/${nextOffertId}`;

  // Skicka mail till kund
  await resend.emails.send({
    from: 'Kundteam Helsingbuss <kundteam@helsingbuss.se>',
    to: [form.epost],
    subject: 'Tack för er offertförfrågan',
    html: `
      <p>Tack för er offertförfrågan</p>
      <p>Vänligen klicka här för att se vad som har registrerats (<a href="${link}">${nextOffertId}</a>).</p>
      <p>När din offert blivit prissatt kommer du att få ett nytt meddelande. Länken uppdateras löpande och du får snabbt och enkelt överblick över ny, aktuell information.</p>
      <p>Välkommen att kontakta oss om du har frågor eller synpunkter!</p>
      <br/>
      <p>Vänliga hälsningar<br/>Helsingbuss Kundteam</p>
      <p>Helsingbuss<br/>
      Hofverbergsgatan 2<br/>
      25443 Helsingborg<br/>
      <a href="https://helsingbuss.se">helsingbuss.se</a></p>
      <br/>
      <a href="https://helsingbuss.se/offert">Fler resor på gång? Klicka här för att komma till vår offertförfrågan.</a>
    `
  });

  // Skicka mail till admin
  await resend.emails.send({
    from: 'Offert Helsingbuss <offert@helsingbuss.se>',
    to: ['kundteam@helsingbuss.se', 'offert@helsingbuss.se'],
    subject: 'Ny offertförfrågan',
    html: `
      <p>Ny offert från ${form.fornamn} ${form.efternamn}</p>
      <p>Klicka här för att läsa: <a href="${link}">${nextOffertId}</a></p>
    `
  });

  return res.status(200).json({ success: true });
}
