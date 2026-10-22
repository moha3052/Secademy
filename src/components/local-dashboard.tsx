"use client";
import Link from "next/link";
import { useState } from "react";
import { useProgress, resetProgress } from "@/lib/local-progress";
import { courses, allLessons, getLesson } from "@/content/courses";
import { progressPercent } from "@/lib/learning";
export function LocalDashboard() {
  const progress = useProgress();
  const [confirm, setConfirm] = useState(false);
  const [message, setMessage] = useState("");
  const completed = allLessons.filter((l) => progress.completed.includes(l.id));
  const last = progress.lastLesson ? getLesson(progress.lastLesson) : null;
  return (
    <>
      <span className="eyebrow">DIN STUDIEBOG</span>
      <h1>Min læsning</h1>
      <p className="lead">
        Din placering og dine resultater gemmes på denne enhed. Ingen konto,
        ingen synkronisering.
      </p>
      <div className="stat-grid">
        <div className="stat">
          <strong>
            {completed.length}
            <small>af {allLessons.length}</small>
          </strong>
          <span>Lektioner gennemført</span>
        </div>
        <div className="stat">
          <strong>{progress.attempts.length}</strong>
          <span>Quizforsøg i denne browser</span>
        </div>
        <div className="stat">
          <strong>{progress.labs.length}</strong>
          <span>Øvelser manuelt bekræftet</span>
        </div>
      </div>
      <section className="continue-panel">
        <span className="eyebrow">
          {last ? "SIDST ÅBNET" : "ET GODT STED AT STARTE"}
        </span>
        <h2>{last?.title || "Sikkerhedens tre søjler"}</h2>
        <Link
          className="btn btn-primary"
          href={`/lektioner/${last?.id || "sikkerhedens-tre-soejler"}`}
        >
          {last ? "Fortsæt læsningen" : "Åbn første lektion"} →
        </Link>
      </section>
      <section className="section">
        <h2>Dine fag</h2>
        {courses.map((c) => {
          const lessons = c.modules.flatMap((m) => m.lessons);
          const count = lessons.filter((l) =>
            progress.completed.includes(l.id),
          ).length;
          return (
            <Link className="list-row" href={`/kurser/${c.slug}`} key={c.id}>
              <span>
                {c.title}
                <small>
                  {count} af {lessons.length} lektioner
                </small>
              </span>
              <span>
                {progressPercent(count, lessons.length)} %
                <progress
                  value={count}
                  max={lessons.length}
                  aria-label={`Fremgang i ${c.title}`}
                />
              </span>
            </Link>
          );
        })}
      </section>
      <h2>Seneste quizforsøg</h2>
      {progress.attempts.length ? (
        progress.attempts
          .slice(-8)
          .reverse()
          .map((a, i) => (
            <Link
              className="list-row"
              href={`/lektioner/${a.lessonId}`}
              key={`${a.at}-${i}`}
            >
              <span>
                {getLesson(a.lessonId)?.title || a.lessonId}
                <small>{new Date(a.at).toLocaleDateString("da-DK")}</small>
              </span>
              <span>{a.score} %</span>
            </Link>
          ))
      ) : (
        <p>Tag en quiz i slutningen af en lektion. Dit resultat vises her.</p>
      )}
      <div className="local-settings">
        <p>
          Hvis browserdata slettes, forsvinder fremgangen. Resultaterne er til
          egen repetition og er ikke dokumentation for en eksamen.
        </p>
        {confirm ? (
          <div>
            <p>Vil du slette alle Secademy-resultater på denne enhed?</p>
            <button
              className="btn btn-outline"
              onClick={() => {
                setMessage(
                  resetProgress()
                    ? "Din lokale fremgang er slettet."
                    : "Browseren tillader ikke ændringen.",
                );
                setConfirm(false);
              }}
            >
              Ja, nulstil fremgang
            </button>
            <button className="btn btn-ghost" onClick={() => setConfirm(false)}>
              Behold fremgang
            </button>
          </div>
        ) : (
          <button className="btn btn-ghost" onClick={() => setConfirm(true)}>
            Nulstil lokal fremgang
          </button>
        )}
        <p aria-live="polite">{message}</p>
      </div>
    </>
  );
}
