import Link from "next/link";
import { ArrowUpRight, BookOpen, Clock3 } from "lucide-react";
import type { Course } from "@/content/courses";
import { CourseVisual } from "./course-visual";
export function CourseCard({
  course,
  index = 0,
}: {
  course: Course;
  index?: number;
}) {
  const lessons = course.modules.flatMap((m) => m.lessons);
  return (
    <Link href={`/kurser/${course.slug}`} className="course-card">
      <div className="course-art-label">
        <span>FAG 0{index + 1}</span>
        <span>GRUNDLÆGGENDE</span>
      </div>
      <CourseVisual kind={course.icon} />
      <div className="course-body">
        <span className="eyebrow">
          {course.modules.length} KAPITLER · PÅ DANSK
        </span>
        <h3>
          {course.title}
          <ArrowUpRight size={23} />
        </h3>
        <p>{course.description}</p>
        <div className="course-meta">
          <span>
            <BookOpen size={14} />
            {lessons.length} lektioner
          </span>
          <span>
            <Clock3 size={14} />
            {lessons.reduce((n, l) => n + l.minutes, 0)} min
          </span>
          <b>Åbn forløb →</b>
        </div>
      </div>
    </Link>
  );
}
