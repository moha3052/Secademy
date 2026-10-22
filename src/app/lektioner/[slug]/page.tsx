import { readFile } from "node:fs/promises";
import path from "node:path";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CourseProgress,
  CompletionMark,
} from "@/components/lessons/course-progress";
import { lessonSources } from "@/content/sources";
import { getLesson } from "@/content/courses";
import { LessonTracker } from "@/components/lessons/lesson-tracker";
import { Header } from "@/components/layout/header";
import { Quiz } from "@/components/quizzes/quiz";
import { questions } from "@/features/quizzes/questions";

export default async function LessonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const lesson = getLesson(slug);
  if (!lesson) notFound();
  const source = await readFile(
    path.join(process.cwd(), "src/content/courses", `${lesson.file}.mdx`),
    "utf8",
  );
  const courseLessons = lesson.course.modules.flatMap((m) => m.lessons);
  const next = courseLessons[courseLessons.findIndex((l) => l.id === slug) + 1];
  const outline = (
    <>
      {lesson.course.modules.map((m, i) => (
        <div key={m.title}>
          <strong>
            {i + 1}. {m.title}
          </strong>
          {m.lessons.length ? (
            m.lessons.map((l) => (
              <Link
                className={l.id === slug ? "current" : ""}
                href={`/lektioner/${l.id}`}
                key={l.id}
              >
                <CompletionMark id={l.id} /> {l.title}
              </Link>
            ))
          ) : (
            <small>Kommer senere</small>
          )}
        </div>
      ))}
    </>
  );
  return (
    <>
      <Header />

      <div className="lesson-layout">
        <aside className="lesson-outline">
          <Link className="text-link" href={`/kurser/${lesson.course.slug}`}>
            ← Kursusoversigt
          </Link>
          <h3 className="mt-6">{lesson.course.title}</h3>
          <CourseProgress ids={courseLessons.map((l) => l.id)} />
          {outline}
        </aside>
        <details className="mobile-outline">
          <summary>
            Kursusindhold <span>+</span>
          </summary>
          {outline}
        </details>
        <main id="main" className="lesson-article">
          <div className="breadcrumb">
            <Link href={`/kurser/${lesson.course.slug}`}>
              {lesson.course.title}
            </Link>
            <span>/</span>
            <span>{lesson.minutes} min</span>
          </div>
          <span className="eyebrow">FORSTÅ · PRØV · REFLEKTÉR</span>
          <h1>{lesson.title}</h1>
          <LessonTracker lessonId={slug} />
          <article className="prose" id="teori">
            <MDXRemote
              source={source}
              components={{
                pre: (props) => (
                  <pre {...props} tabIndex={0} aria-label="Kodeeksempel" />
                ),
              }}
            />
          </article>
          <div className="source-note">
            <span className="eyebrow">FRA DIT PENSUM</span>
            <p>{lessonSources[slug]}</p>
            <small>
              En selvstændig forklaring med eksempler til repetition.
            </small>
          </div>
          <Quiz key={slug} lessonId={slug} questions={questions[slug]} />
          <div className="flex flex-wrap gap-4 mt-8">
            {next ? (
              <Link className="btn btn-primary" href={`/lektioner/${next.id}`}>
                Næste lektion →
              </Link>
            ) : (
              <Link
                className="btn btn-primary"
                href={`/kurser/${lesson.course.slug}`}
              >
                Tilbage til kurset
              </Link>
            )}
          </div>
        </main>
        <aside className="lesson-toc">
          <span className="eyebrow">I DENNE LEKTION</span>
          <a href="#teori">Forstå begrebet</a>
          <a href="#viden">Test din forståelse</a>
          <hr className="border-slate-200 my-6" />
          <p>{lesson.minutes} minutters læring</p>
          <p>Læs, eksperimentér, og kom tilbage, når du har brug for det.</p>
        </aside>
      </div>
    </>
  );
}
