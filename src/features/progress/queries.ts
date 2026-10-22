import "server-only";
import { supabase } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { z } from "zod";
const profileSchema = z.object({
  display_name: z.string(),
  experience_level: z.string().nullable(),
  learning_goal: z.string().nullable(),
  learning_interest: z.string().nullable(),
  onboarded: z.boolean(),
  last_lesson_id: z.string().nullable(),
});
export async function learningData() {
  const db = await supabase();
  if (!db) redirect("/login");
  const {
    data: { user },
  } = await db.auth.getUser();
  if (!user) redirect("/login");
  const [profile, enrollments, progress, attempts, labs] = await Promise.all([
    db
      .from("profiles")
      .select(
        "display_name,experience_level,learning_goal,learning_interest,onboarded,last_lesson_id",
      )
      .eq("id", user.id)
      .maybeSingle(),
    db.from("enrollments").select("course_id").eq("user_id", user.id),
    db
      .from("lesson_progress")
      .select("lesson_id,completed_at")
      .eq("user_id", user.id)
      .order("completed_at", { ascending: false }),
    db
      .from("quiz_attempts")
      .select("score,created_at,quiz_id")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false }),
    db.from("lab_progress").select("lab_id").eq("user_id", user.id),
  ]);
  if ([profile, enrollments, progress, attempts, labs].some((r) => r.error))
    throw new Error(
      "Dine læringsdata kunne ikke hentes. Kontrollér databaseopsætningen.",
    );
  return {
    user,
    profile: profile.data ? profileSchema.parse(profile.data) : null,
    enrollments: z
      .array(z.object({ course_id: z.string() }))
      .parse(enrollments.data),
    progress: z
      .array(z.object({ lesson_id: z.string(), completed_at: z.string() }))
      .parse(progress.data),
    attempts: z
      .array(
        z.object({
          score: z.number(),
          created_at: z.string(),
          quiz_id: z.string(),
        }),
      )
      .parse(attempts.data),
    labs: z.array(z.object({ lab_id: z.string() })).parse(labs.data),
  };
}
