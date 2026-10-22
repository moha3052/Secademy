import Link from "next/link";
export default function NotFound() {
  return (
    <main id="main" className="workspace narrow">
      <span className="eyebrow">404</span>
      <h1>Her er der ikke en lektion.</h1>
      <p>Siden findes ikke, eller indholdet er endnu ikke udgivet.</p>
      <Link className="btn btn-primary" href="/kurser">
        Udforsk kurser
      </Link>
    </main>
  );
}
