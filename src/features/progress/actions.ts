"use server";
import { supabase } from "@/lib/supabase/server";
import { courses, getLesson, lab } from "@/content/courses";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import type { FormState } from "@/features/auth/actions";
export async function enroll(
  courseId: string,
  _previous: FormState,
): Promise<FormState> {
  void _previous;
  if (!courses.some((c) => c.id === courseId))
    return { error: "Kurset findes ikke." };
  const db = await supabase();
  if (!db)
    return { error: "Tilmelding kræver en konfigureret Supabase-forbindelse." };
  const {
    data: { user },
  } = await db.auth.getUser();
  if (!user) redirect("/login");
  const { error } = await db
    .from("enrollments")
    .upsert(
      { user_id: user.id, course_id: courseId },
      { onConflict: "user_id,course_id", ignoreDuplicates: true },
    );
  if (error) return { error: "Kunne ikke tilmelde dig. Prøv igen." };
  revalidatePath("/dashboard");
  redirect(
    `/lektioner/${courses.find((c) => c.id === courseId)!.modules.flatMap((m) => m.lessons)[0].id}`,
  );
}
export async function bookmark(
  lessonId: string,
  _previous: FormState,
): Promise<FormState> {
  void _previous;
  if (!getLesson(lessonId)) return { error: "Lektionen findes ikke." };
  const db = await supabase();
  if (!db)
    return { error: "Log ind på en konfigureret installation for at gemme." };
  const {
    data: { user },
  } = await db.auth.getUser();
  if (!user) redirect("/login");
  const { error } = await db
    .from("profiles")
    .upsert({ id: user.id, last_lesson_id: lessonId });
  if (error) return { error: "Kunne ikke gemme din placering." };
  revalidatePath("/dashboard");
  return { message: "Denne lektion er gemt som dit næste udgangspunkt." };
}
export async function completeLab(
  _previous: FormState,
  form: FormData,
): Promise<FormState> {
  const parsed = z
    .object({ lab_id: z.literal(lab.id), confirmed: z.literal("on") })
    .safeParse(Object.fromEntries(form));
  if (!parsed.success)
    return { error: "Bekræft først, at du selv har gennemført trinene." };
  const db = await supabase();
  if (!db) return { error: "Gemt fremgang kræver Supabase-opsætning." };
  const {
    data: { user },
  } = await db.auth.getUser();
  if (!user) redirect("/login");
  const { error } = await db
    .from("lab_progress")
    .upsert(
      { user_id: user.id, lab_id: lab.id },
      { onConflict: "user_id,lab_id", ignoreDuplicates: true },
    );
  if (error) return { error: "Din bekræftelse kunne ikke gemmes." };
  revalidatePath("/dashboard");
  return {
    message: "Gemt som manuelt gennemført. Det er ikke en teknisk validering.",
  };
}
