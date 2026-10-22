"use client";
import { useState, useTransition } from "react";
import { saveAttempt } from "@/lib/local-progress";
import { submitQuiz, type QuizResult } from "@/features/quizzes/actions";
import type { Question } from "@/features/quizzes/questions";
export function Quiz({
  lessonId,
  questions,
}: {
  lessonId: string;
  questions: Question[];
}) {
  const [selections, setSelections] = useState<number[]>(
    Array(questions.length).fill(-1),
  );
  const [result, setResult] = useState<QuizResult | null>(null);
  const [pending, startTransition] = useTransition();

  return (
    <section className="quiz" id="viden">
      <span className="eyebrow">STOP OP OG TÆNK EFTER</span>
      <h2>Test din forståelse</h2>
      <p>
        Besvar spørgsmålene, og få en forklaring. Mindst 70 % kræves for at
        gennemføre lektionen.
      </p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          startTransition(async () => {
            try {
              const response = await submitQuiz(lessonId, selections);
              if (response.score !== undefined)
                response.saved = saveAttempt(lessonId, response.score);
              setResult(response);
            } catch {
              setResult({ error: "Forbindelsen blev afbrudt. Prøv igen." });
            }
          });
        }}
      >
        {questions.map((q, index) => (
          <fieldset
            key={q.prompt}
            disabled={pending || result?.score !== undefined}
          >
            <legend>
              {index + 1}. {q.prompt}
            </legend>
            {q.options.map((option, i) => (
              <label key={option}>
                <input
                  type="radio"
                  name={`q${index}`}
                  value={i}
                  checked={selections[index] === i}
                  onChange={() =>
                    setSelections((prev) =>
                      prev.map((value, j) => (j === index ? i : value)),
                    )
                  }
                  required
                />
                {option}
              </label>
            ))}
            {result?.feedback?.[index] && (
              <div className="feedback">
                <strong>
                  {result.feedback[index].correct ? "Rigtigt." : "Ikke helt."}
                </strong>{" "}
                {result.feedback[index].explanation}
              </div>
            )}
          </fieldset>
        ))}
        <div aria-live="polite">
          {result?.error && <p className="error-text">{result.error}</p>}
          {result?.score !== undefined && (
            <div className={`feedback ${result.score >= 70 ? "success" : ""}`}>
              <strong>
                {result.score} % rigtigt ·{" "}
                {result.score >= 70 ? "Godt arbejde!" : "Prøv en gang til."}
              </strong>
              <p>
                {result.saved
                  ? "Dit resultat er gemt i denne browser."
                  : "Resultatet kunne ikke gemmes lokalt. Du kan fortsætte uden lagring."}
              </p>
            </div>
          )}
        </div>
        {result?.score === undefined ? (
          <button
            className="btn btn-primary"
            disabled={pending || selections.includes(-1)}
          >
            {pending ? "Tjekker svar…" : "Tjek mine svar"}
          </button>
        ) : (
          <button
            className="btn btn-outline"
            type="button"
            onClick={() => {
              setResult(null);
              setSelections(Array(questions.length).fill(-1));
            }}
          >
            Prøv igen
          </button>
        )}
      </form>
    </section>
  );
}
