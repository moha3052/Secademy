import { notFound } from "next/navigation";
import { courses } from "@/content/courses";
import { Shell } from "@/components/layout/shell";
import { CourseExplorer } from "@/components/courses/course-explorer";
export default async function CoursePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = courses.find((c) => c.slug === slug);
  if (!course) notFound();
  return (
    <Shell active="/kurser">
      <main id="main" className="course-workspace">
        <CourseExplorer key={course.id} course={course} />
      </main>
    </Shell>
  );
}
