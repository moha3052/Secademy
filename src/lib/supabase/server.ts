import "server-only";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Database } from "@/types/database";
// Account integration is intentionally disabled during the open study phase.
export const configured = () => false;
export async function supabase() {
  if (!configured()) return null;
  const jar = await cookies();
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll: () => jar.getAll(),
        setAll: (values) => {
          try {
            values.forEach(({ name, value, options }) =>
              jar.set(name, value, options),
            );
          } catch {
            /* Server components cannot update cookies; proxy refreshes the session. */
          }
        },
      },
    },
  );
}
export async function currentUser() {
  const db = await supabase();
  if (!db) return null;
  const {
    data: { user },
  } = await db.auth.getUser();
  return user;
}
