"use client";
import { useProgress } from "@/lib/local-progress";
export function CourseProgress({ ids }: { ids: string[] }) {
  const progress = useProgress();
  const count = ids.filter((id) => progress.completed.includes(id)).length;
  return (
    <div className="course-progress">
      <div>
        <span>Din fremgang</span>
        <b>
          {count} / {ids.length}
        </b>
      </div>
      <progress
        value={count}
        max={ids.length}
        aria-label="Gennemførte lektioner"
      />
      <small>Gemmes i denne browser</small>
    </div>
  );
}
export function CompletionMark({ id }: { id: string }) {
  const progress = useProgress();
  return (
    <span
      className={`completion-mark ${progress.completed.includes(id) ? "is-complete" : ""}`}
      aria-label={
        progress.completed.includes(id) ? "Gennemført" : "Ikke gennemført"
      }
    >
      {progress.completed.includes(id) ? "✓" : ""}
    </span>
  );
}
