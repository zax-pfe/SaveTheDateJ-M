import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { z } from "zod";

// Dev-only: saves an element's transform (moved with the debug gizmo) into src/data/scene.json.
const FILE = path.join(process.cwd(), "src/data/scene.json");

const vec3 = z.tuple([z.number(), z.number(), z.number()]);
const bodySchema = z.object({
  id: z.string().min(1),
  transform: z.object({ position: vec3, rotation: vec3, scale: vec3 }),
});

export async function POST(request) {
  if (process.env.NODE_ENV !== "development") {
    return new Response(null, { status: 404 });
  }

  const result = bodySchema.safeParse(await request.json().catch(() => null));
  if (!result.success) {
    return Response.json({ error: "Invalid transform" }, { status: 400 });
  }

  const { id, transform } = result.data;
  const scene = JSON.parse(await readFile(FILE, "utf8"));
  scene[id] = transform;

  // One element per line, so the file stays readable and diffs stay small.
  const lines = Object.entries(scene).map(
    ([key, value]) => `  ${JSON.stringify(key)}: ${JSON.stringify(value)}`,
  );
  await writeFile(FILE, `{\n${lines.join(",\n")}\n}\n`);

  return Response.json({ ok: true });
}
