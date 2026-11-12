# Save the Date

Mobile-first wedding Save the Date built with Next.js, React Three Fiber and Three.js TSL (`WebGPURenderer` with WebGL2 fallback).

## Scripts

```bash
npm run dev    # development server
npm run build  # production build
npm run start  # serve the production build
npm run lint   # lint
```

## Guest form (Supabase)

`GuestForm` posts to `POST /api/guests`, which validates the fields (Zod) and inserts them into `public.guests` with a server-only Supabase client (`src/lib/supabase.js`).

Setup: copy `.env.example` to `.env.local` and fill `SUPABASE_URL` and `SUPABASE_SECRET_KEY` (Supabase › Project Settings › API Keys). On Vercel, add the same two variables in Settings › Environment Variables and set Root Directory to `website-save-the-date`.
