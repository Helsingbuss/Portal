# Helsingbuss Portal

En portal/webbapp för offertförfrågningar, bokningar och hantering av körningar för Helsingbuss.

## Tekniker

- **React** + **Typescript**
- **Vite**
- **Tailwind CSS**
- **Supabase** (databas & auth)
- **Resend** (e-post)
- **Vercel** (hosting & deploy)

## Komma igång lokalt

1. **Klona repot**
    ```bash
    git clone https://github.com/Helsingbuss/Portal.git
    cd Portal
    ```

2. **Installera beroenden**
    ```bash
    npm install
    ```

3. **Lägg till `.env` i root**
    ```env
    VITE_SUPABASE_URL=din-supabase-url
    VITE_SUPABASE_KEY=din-supabase-anon-key
    RESEND_API_KEY=din-resend-key
    ```

4. **Starta lokalt**
    ```bash
    npm run dev
    ```

## Deployment

Projektet är byggt för Vercel.  
- **Push till main** → automatiskt deploy via Vercel.
- För backendfunktioner (t.ex. mail) används Vercel Serverless Functions i `/api`.

## Strukturexempel


## Kontakt & support

Maila [info@helsingbuss.se](mailto:info@helsingbuss.se) vid problem eller frågor.  
Projektet är work-in-progress!

---

