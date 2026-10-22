"use client";
import { useEffect, useState } from "react";
import { saveLocation, useProgress } from "@/lib/local-progress";
export function LessonTracker({ lessonId }: { lessonId: string }) {
  const progress = useProgress();
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    if (!saveLocation(lessonId)) queueMicrotask(() => setFailed(true));
  }, [lessonId]);
  return (
    <div className="lesson-status" aria-live="polite">
      {failed
        ? "Browseren tillader ikke lagring. Du kan stadig læse og tage quizzen."
        : progress.completed.includes(lessonId)
          ? "✓ Gennemført · gemt i denne browser"
          : "Din placering gemmes i denne browser."}
    </div>
  );
}
