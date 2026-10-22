"use server";
import { z } from "zod";
import { supabase } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
export type FormState = { error?: string; message?: string };
const credentials = z.object({
  email: z.email().max(254),
  password: z.string().min(10, "Brug mindst 10 tegn.").max(128),
});
export async function authenticate(
  mode: "login" | "signup" | "reset" | "update",
  _previous: FormState,
  form: FormData,
): Promise<FormState> {
  const db = await supabase();
  if (!db)
    return {
      error:
        "Login er ikke konfigureret endnu. Tilføj Supabase-miljøvariablerne som beskrevet i README.",
    };
  const site = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  if (mode === "reset") {
    const parsed = z.email().safeParse(form.get("email"));
    if (!parsed.success) return { error: "Skriv en gyldig e-mailadresse." };
    const { error } = await db.auth.resetPasswordForEmail(parsed.data, {
      redirectTo: `${site}/auth/callback?next=/ny-adgangskode`,
    });
    return error
      ? { error: "Kunne ikke sende nulstillingen. Prøv igen senere." }
      : {
          message:
            "Hvis adressen er registreret, modtager du et link til at nulstille din adgangskode.",
        };
  }
  if (mode === "update") {
    const password = z
      .string()
      .min(10)
      .max(128)
      .safeParse(form.get("password"));
    if (!password.success) return { error: "Brug mellem 10 og 128 tegn." };
    const {
      data: { user },
    } = await db.auth.getUser();
    if (!user)
      return { error: "Nulstillingslinket er udløbet. Bestil et nyt." };
    const { error } = await db.auth.updateUser({ password: password.data });
    if (error) return { error: "Adgangskoden kunne ikke ændres." };
    redirect("/dashboard");
  }
  const parsed = credentials.safeParse(Object.fromEntries(form));
  if (!parsed.success)
    return { error: "Kontrollér din e-mail og adgangskode (mindst 10 tegn)." };
  const { error } =
    mode === "signup"
      ? await db.auth.signUp({
          ...parsed.data,
          options: {
            emailRedirectTo: `${site}/auth/callback?next=/onboarding`,
          },
        })
      : await db.auth.signInWithPassword(parsed.data);
  if (error)
    return {
      error:
        mode === "login"
          ? "Login mislykkedes. Kontrollér oplysningerne og bekræft din e-mail."
          : "Kontoen kunne ikke oprettes. Kontrollér oplysningerne, eller prøv at logge ind.",
    };
  if (mode === "signup")
    return {
      message: "Tjek din indbakke, og bekræft din e-mail for at fortsætte.",
    };
  revalidatePath("/", "layout");
  redirect("/dashboard");
}
export async function googleSignIn() {
  const db = await supabase();
  if (!db || process.env.NEXT_PUBLIC_GOOGLE_AUTH !== "true") redirect("/login");
  const { data, error } = await db.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/auth/callback?next=/onboarding`,
    },
  });
  if (error || !data.url) redirect("/login?error=oauth");
  redirect(data.url);
}
export async function logout() {
  const db = await supabase();
  if (db) await db.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/");
}
export async function saveProfile(
  _previous: FormState,
  form: FormData,
): Promise<FormState> {
  const db = await supabase();
  if (!db) return { error: "Supabase er ikke konfigureret." };
  const {
    data: { user },
  } = await db.auth.getUser();
  if (!user) return { error: "Log ind for at gemme." };
  const parsed = z
    .object({
      display_name: z.string().trim().min(1).max(60),
      experience_level: z.enum(["beginner", "intermediate", "advanced"]),
      learning_goal: z.enum(["exams", "career", "development", "interest"]),
      learning_interest: z.enum(["system", "network", "ethical", "python"]),
    })
    .safeParse(Object.fromEntries(form));
  if (!parsed.success) return { error: "Udfyld alle felter." };
  const { error } = await db
    .from("profiles")
    .upsert({ id: user.id, ...parsed.data, onboarded: true });
  if (error)
    return {
      error: "Kunne ikke gemme profilen. Kontrollér databaseopsætningen.",
    };
  revalidatePath("/", "layout");
  redirect("/dashboard");
}
