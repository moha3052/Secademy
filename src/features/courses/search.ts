import "server-only";
import { supabase } from "@/lib/supabase/server";
import { z } from "zod";
// Published local MDX remains searchable without a backend; PostgreSQL adds indexed matches.
export async function indexedLessonSearch(term: string): Promise<string[]> {
  if (!term) return [];
  const db = await supabase();
  if (!db) return [];
  const { data, error } = await db
    .from("lessons")
    .select("id")
    .textSearch("search_document", term.slice(0, 100), {
      type: "websearch",
      config: "simple",
    })
    .limit(50);
  if (error) throw new Error("Søgningen kunne ikke hente databaseresultater.");
  return z
    .array(z.object({ id: z.string() }))
    .parse(data)
    .map((row) => row.id);
}
