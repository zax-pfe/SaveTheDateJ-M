import "server-only";
import { createClient } from "@supabase/supabase-js";

// Server-side Supabase client. Uses the secret key, so never import it in a
// client component ("server-only" makes the build fail if you do).
export function getSupabase() {
  return createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SECRET_KEY, {
    auth: { persistSession: false },
  });
}
