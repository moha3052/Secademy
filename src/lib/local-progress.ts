"use client";
import { useMemo, useSyncExternalStore } from "react";
import { z } from "zod";
export const PROGRESS_KEY = "secademy.study.v1";
const schema = z.object({
  version: z.literal(1),
  lastLesson: z.string().nullable(),
  completed: z.array(z.string()).max(500),
  labs: z.array(z.string()).max(500),
  attempts: z
    .array(
      z.object({
        lessonId: z.string(),
        score: z.number().min(0).max(100),
        at: z.string(),
      }),
    )
    .max(200),
});
export type StudyProgress = z.infer<typeof schema>;
const empty: StudyProgress = {
  version: 1,
  lastLesson: null,
  completed: [],
  labs: [],
  attempts: [],
};
export function parseProgress(raw: string | null): StudyProgress {
  try {
    return schema.parse(JSON.parse(raw || "null"));
  } catch {
    return empty;
  }
}
function snapshot() {
  try {
    return localStorage.getItem(PROGRESS_KEY);
  } catch {
    return null;
  }
}
function subscribe(notify: () => void) {
  window.addEventListener("storage", notify);
  window.addEventListener("secademy-progress", notify);
  return () => {
    window.removeEventListener("storage", notify);
    window.removeEventListener("secademy-progress", notify);
  };
}
export function useProgress() {
  const raw = useSyncExternalStore(subscribe, snapshot, () => null);
  return useMemo(() => parseProgress(raw), [raw]);
}
function update(change: (current: StudyProgress) => StudyProgress) {
  try {
    localStorage.setItem(
      PROGRESS_KEY,
      JSON.stringify(change(parseProgress(snapshot()))),
    );
    window.dispatchEvent(new Event("secademy-progress"));
    return true;
  } catch {
    return false;
  }
}
export function saveLocation(id: string) {
  return update((p) => ({ ...p, lastLesson: id }));
}
export function saveAttempt(lessonId: string, score: number) {
  return update((p) => ({
    ...p,
    lastLesson: lessonId,
    completed:
      score >= 70 ? [...new Set([...p.completed, lessonId])] : p.completed,
    attempts: [
      ...p.attempts,
      { lessonId, score, at: new Date().toISOString() },
    ].slice(-200),
  }));
}
export function saveLab(id: string) {
  return update((p) => ({ ...p, labs: [...new Set([...p.labs, id])] }));
}
export function resetProgress() {
  try {
    localStorage.removeItem(PROGRESS_KEY);
    window.dispatchEvent(new Event("secademy-progress"));
    return true;
  } catch {
    return false;
  }
}
