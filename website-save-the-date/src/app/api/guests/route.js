import { z } from "zod";
import { getSupabase } from "@/lib/supabase";

const required = z.string().trim().min(1).max(200);
const optional = z
  .string()
  .trim()
  .max(200)
  .optional()
  .transform((value) => value || null); // "" or missing -> null

const guestSchema = z.object({
  first_name: required,
  last_name: required,
  email: optional.pipe(z.email().nullable()),
  address: required,
  address_complement: optional,
  postal_code: required,
  city: required,
  country: required,
});

// POST /api/guests: saves one guest. There is no GET: guests can't be read.
export async function POST(request) {
  const body = await request.json().catch(() => null);
  const result = guestSchema.safeParse(body);

  if (!result.success) {
    return Response.json(
      { error: "Merci de vérifier les champs du formulaire." },
      { status: 400 },
    );
  }

  const { error } = await getSupabase().from("guests").insert(result.data);

  if (error) {
    console.error("Supabase insert failed:", error.code);
    return Response.json(
      { error: "Une erreur est survenue, merci de réessayer." },
      { status: 500 },
    );
  }

  return Response.json({ ok: true }, { status: 201 });
}
