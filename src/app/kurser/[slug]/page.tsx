import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, ArrowRight } from "lucide-react";
import { CourseVisual } from "@/components/courses/course-visual";
import { CourseProgress } from "@/components/lessons/course-progress";
import { courses } from "@/content/courses";
import { Shell } from "@/components/layout/shell";

export default async function CoursePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = courses.find((c) => c.slug === slug);
  if (!course) notFound();
  const lessons = course.modules.flatMap((m) => m.lessons);
  return (
    <Shell active="/kurser">
      <main id="main" className="workspace">
        <div className="breadcrumb">
          <Link href="/kurser">Kurser</Link>
          <span>/</span>
          <span>{course.title}</span>
        </div>
        <section className="course-hero">
          <div>
            <span className="badge">Begynder · På dansk</span>
            <h1>{course.title}</h1>
            <p className="lead">{course.description}</p>
            <div className="course-facts">
              <span>{course.modules.length} moduler</span>
              <span>{lessons.length} åbne lektioner</span>
              <span>{course.duration}</span>
            </div>
          </div>
          <aside className="enroll-box">
            <CourseVisual kind={course.icon} />
            <h3 className="mt-4">Dit næste skridt</h3>
            <Link
              className="btn btn-primary"
              href={`/lektioner/${lessons[0].id}`}
            >
              Begynd at læse →
            </Link>
            <p>
              Dine quizresultater gemmes i denne browser. Du behøver ingen
              konto.
            </p>
            <Link className="text-link" href={`/lektioner/${lessons[0].id}`}>
              Se første lektion <ArrowRight size={16} />
            </Link>
          </aside>
        </section>
        <CourseProgress ids={lessons.map((l) => l.id)} />
        <h2 className="mt-9">Det lærer du</h2>
        <ul className="objectives">
          {course.objectives.map((o) => (
            <li key={o}>
              <Check size={17} />
              {o}
            </li>
          ))}
        </ul>
        <h2>Kursusindhold</h2>
        {course.modules.map((module, index) => (
          <section key={module.title}>
            <div className="module-header">
              <h3>
                <span className="text-slate-400 mr-3">0{index + 1}</span>
                {module.title}
              </h3>
              <small>
                {module.lessons.length
                  ? `${module.lessons.length} lektion`
                  : "Kommer senere"}
              </small>
            </div>
            {module.lessons.map((l) => (
              <Link key={l.id} className="list-row" href={`/lektioner/${l.id}`}>
                <span>{l.title}</span>
                <span>
                  {l.minutes} min <span aria-hidden>→</span>
                </span>
              </Link>
            ))}
          </section>
        ))}
        <div className="info-banner">
          Læs i den rækkefølge, du har brug for. Hver lektion indeholder
          forklaringer, eksempler og spørgsmål.
        </div>
      </main>
    </Shell>
  );
}
