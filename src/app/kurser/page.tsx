import { Shell } from "@/components/layout/shell";
import { CourseCard } from "@/components/courses/course-card";
import { courses, allLessons } from "@/content/courses";
import Link from "next/link";

import { Search } from "lucide-react";
export const metadata = { title: "Udforsk kurser" };
export default async function Catalog({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  const term = q.trim().toLocaleLowerCase("da");
  const indexed = new Set<string>();
  const matches = courses.filter(
    (c) =>
      [
        c.title,
        c.description,
        ...c.modules.map((m) => m.title),
        ...c.modules.flatMap((m) =>
          m.lessons.flatMap((l) => [l.title, ...l.concepts]),
        ),
      ]
        .join(" ")
        .toLocaleLowerCase("da")
        .includes(term) ||
      c.modules.some((m) => m.lessons.some((l) => indexed.has(l.id))),
  );
  return (
    <Shell active="/kurser">
      <main id="main" className="workspace">
        <span className="eyebrow">DIT FAGLIGE OVERBLIK</span>
        <h1>Find dit næste emne.</h1>
        <p className="lead">
          To fag, ti kapitler og forklaringer, du kan vende tilbage til.
        </p>
        <form className="search-form">
          <Search size={20} />
          <label className="sr-only" htmlFor="q">
            Søg kurser, lektioner og begreber
          </label>
          <input
            id="q"
            name="q"
            defaultValue={q}
            placeholder="Søg efter Linux, netværk, rettigheder…"
            maxLength={100}
          />
          <button className="btn btn-primary">Søg</button>
        </form>
        <div className="topic-row catalog-topics">
          <span>Gå direkte til</span>
          {["Linux", "ACL", "MFA", "Wireshark", "DHCP", "VLAN", "STP"].map(
            (topic) => (
              <Link
                key={topic}
                href={`/kurser?q=${encodeURIComponent(topic)}`}
                aria-current={term === topic.toLowerCase() ? "page" : undefined}
              >
                {topic}
              </Link>
            ),
          )}
          {term && <Link href="/kurser">Vis alle ×</Link>}
        </div>
        <div className="catalog-heading">
          <h2>{q ? `Resultater for “${q}”` : "Alle læringsforløb"}</h2>
          <span>{matches.length} forløb · Begyndervenlige</span>
        </div>
        <div className="course-grid">
          {matches.map((course, index) => (
            <CourseCard key={course.id} course={course} index={index} />
          ))}
        </div>
        {!matches.length && (
          <div className="empty">
            <h2>Ingen resultater endnu</h2>
            <p>Prøv et bredere begreb som Linux eller sikkerhed.</p>
            <Link href="/kurser">Vis alle kurser</Link>
          </div>
        )}
        {term && (
          <section className="section">
            <h2>Lektioner og begreber</h2>
            {allLessons
              .filter(
                (l) =>
                  [l.title, ...l.concepts, l.moduleTitle]
                    .join(" ")
                    .toLowerCase()
                    .includes(term) || indexed.has(l.id),
              )
              .map((l) => (
                <Link
                  className="list-row"
                  href={`/lektioner/${l.id}`}
                  key={l.id}
                >
                  <span>
                    {l.title}
                    <small>{l.course.title}</small>
                  </span>
                  <span>{l.minutes} min →</span>
                </Link>
              ))}
          </section>
        )}
        <div className="info-banner">
          19 lektioner baseret på fagene System Security og Network &
          Communications Security. Brug søgningen til at finde et begreb fra
          undervisningen.
        </div>
      </main>
    </Shell>
  );
}
