"use client";
import { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Network,
  BookOpen,
  Settings2,
  Users,
  ScanLine,
  FolderLock,
  Fingerprint,
  FlaskConical,
  Waypoints,
  Router,
  Layers3,
  ArrowUpRight,
  ChevronRight,
  ChevronLeft,
  Check,
  Clock3,
} from "lucide-react";
import { chapterGuides } from "@/content/chapter-guides";
import type { Course } from "@/content/courses";
import { useProgress } from "@/lib/local-progress";
const systemIcons = [
  ShieldCheck,
  Settings2,
  Users,
  ScanLine,
  FolderLock,
  Fingerprint,
];
const networkIcons = [FlaskConical, Waypoints, Router, Layers3];
export function CourseExplorer({ course }: { course: Course }) {
  const [selected, setSelected] = useState(0);
  const progress = useProgress();
  const lessons = course.modules.flatMap((m) => m.lessons);
  const completed = lessons.filter((l) =>
    progress.completed.includes(l.id),
  ).length;
  const chapter = course.modules[selected];
  const guide = chapterGuides[course.id]?.[selected];
  const icons = course.icon === "shield" ? systemIcons : networkIcons;
  const SubjectIcon = course.icon === "shield" ? ShieldCheck : Network;
  const ChapterIcon = icons[selected] || BookOpen;
  const last = lessons.find((l) => l.id === progress.lastLesson);
  const resume =
    last ||
    lessons.find((l) => !progress.completed.includes(l.id)) ||
    lessons[0];
  return (
    <>
      <div className="explorer-breadcrumb">
        <Link href="/kurser">Alle fag</Link>
        <ChevronRight size={13} />
        <span>Kursusoversigt</span>
        <span className="explorer-local">Ingen konto · gemt lokalt</span>
      </div>
      <header className="explorer-heading">
        <div className={`subject-emblem subject-${course.icon}`}>
          <SubjectIcon size={32} strokeWidth={1.6} aria-hidden="true" />
        </div>
        <div className="explorer-title">
          <span className="eyebrow">FOR BEGYNDERE · PÅ DANSK</span>
          <h1>{course.title}</h1>
          <p>
            {course.modules.length} kapitler <span>·</span> {lessons.length}{" "}
            lektioner <span>·</span>{" "}
            {course.duration.replace(" læsning og repetition", "")}
          </p>
        </div>
        <Link
          className="btn btn-primary explorer-resume"
          href={`/lektioner/${resume.id}`}
        >
          {last ? "Fortsæt læsningen" : "Begynd at læse"}
          <ArrowUpRight size={17} />
        </Link>
      </header>
      <p className="beginner-guidance">
        Ny i IT-sikkerhed? Start med kapitel 1, og tag én lektion ad gangen. Du
        kan prøve spørgsmålene flere gange.
      </p>
      <div className="explorer-progress">
        <span>Din fremgang</span>
        <progress
          value={completed}
          max={lessons.length}
          aria-label="Gennemførte lektioner"
        />
        <b>
          {completed} af {lessons.length}
        </b>
      </div>
      <div className="course-explorer">
        <nav className="chapter-navigation" aria-label="Vælg kapitel">
          <div className="chapter-nav-label">
            <span>KAPITLER</span>
            <span>{course.modules.length}</span>
          </div>
          {course.modules.map((m, i) => {
            const Icon = icons[i] || BookOpen;
            const done = m.lessons.filter((l) =>
              progress.completed.includes(l.id),
            ).length;
            return (
              <button
                key={m.title}
                type="button"
                aria-pressed={selected === i}
                aria-controls="chapter-content"
                onClick={() => setSelected(i)}
              >
                <span className="chapter-icon">
                  <Icon size={19} />
                </span>
                <span>
                  <small>KAPITEL {String(i + 1).padStart(2, "0")}</small>
                  <strong>{m.title}</strong>
                </span>
                {done === m.lessons.length ? (
                  <Check size={15} aria-label="Gennemført" />
                ) : (
                  <ChevronRight size={15} aria-hidden="true" />
                )}
              </button>
            );
          })}
        </nav>
        <label className="chapter-select">
          Vælg kapitel
          <select
            aria-label="Vælg kapitel"
            value={selected}
            onChange={(e) => setSelected(Number(e.target.value))}
          >
            {course.modules.map((m, i) => (
              <option key={m.title} value={i}>
                {i + 1}. {m.title}
              </option>
            ))}
          </select>
        </label>
        <section
          className="chapter-content"
          id="chapter-content"
          aria-labelledby="chapter-title"
        >
          <div className="chapter-panel-top">
            <span className="eyebrow">
              KAPITEL {String(selected + 1).padStart(2, "0")} /{" "}
              {String(course.modules.length).padStart(2, "0")}
            </span>
            <span>
              <Clock3 size={13} />
              {chapter.lessons.reduce((n, l) => n + l.minutes, 0)} min
            </span>
          </div>
          <div className="chapter-panel-title">
            <span className="chapter-panel-icon">
              <ChapterIcon size={25} />
            </span>
            <div>
              <h2 id="chapter-title">{chapter.title}</h2>
              <p>
                {guide?.intro ||
                  "Vælg en lektion. Læs forklaringen, og prøv spørgsmålene."}
              </p>
            </div>
          </div>
          <div className="chapter-lessons">
            {chapter.lessons.map((lesson, i) => (
              <Link
                className="chapter-lesson"
                href={`/lektioner/${lesson.id}`}
                key={lesson.id}
              >
                <span
                  className={`lesson-index ${progress.completed.includes(lesson.id) ? "done" : ""}`}
                >
                  {progress.completed.includes(lesson.id) ? (
                    <Check size={17} aria-label="Gennemført" />
                  ) : (
                    String(i + 1).padStart(2, "0")
                  )}
                </span>
                <span>
                  <strong>{lesson.title}</strong>
                  <small>
                    Ca. {lesson.minutes} min · Læs og prøv spørgsmål
                  </small>
                </span>
                <span className="lesson-open">
                  Læs lektion <ArrowUpRight size={19} aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
          {guide && (
            <details className="chapter-glossary" key={selected}>
              <summary>
                Ord, du møder i dette kapitel <span>Se forklaringer</span>
              </summary>
              <dl>
                {guide.terms.map(([term, meaning]) => (
                  <div key={term}>
                    <dt>{term}</dt>
                    <dd>{meaning}</dd>
                  </div>
                ))}
              </dl>
            </details>
          )}
          <footer className="chapter-switcher">
            <button
              type="button"
              disabled={selected === 0}
              onClick={() => setSelected((s) => s - 1)}
            >
              <ChevronLeft size={16} />
              Forrige
            </button>
            <span>
              {selected + 1} af {course.modules.length}
            </span>
            <button
              type="button"
              disabled={selected === course.modules.length - 1}
              onClick={() => setSelected((s) => s + 1)}
            >
              Næste kapitel
              <ChevronRight size={16} />
            </button>
          </footer>
        </section>
      </div>
    </>
  );
}
