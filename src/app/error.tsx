"use client";
import Link from "next/link";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main id="main" className="workspace narrow">
      <h1>Vi kunne ikke hente siden.</h1>
      <p>
        Prøv at genindlæse siden. Hvis problemet fortsætter, kan du åbne et
        andet emne fra pensum.
      </p>
      <button className="btn btn-primary" onClick={reset}>
        Prøv igen
      </button>
      <Link className="btn btn-outline ml-3" href="/kurser">
        Til kurser
      </Link>
    </main>
  );
}
