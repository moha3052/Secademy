import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
export function Logo() {
  return (
    <Link className="logo" href="/" aria-label="Secademy forside">
      <span className="logo-mark" aria-hidden>
        se.
      </span>
      <span>Secademy</span>
    </Link>
  );
}
export function Header() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <Logo />
        <nav aria-label="Hovednavigation">
          <Link href="/kurser">Pensum</Link>
          <Link href="/labs">Øvelser</Link>
          <Link href="/dashboard">Min læsning</Link>
        </nav>
        <div className="header-actions">
          <ThemeToggle />
          <Link className="btn btn-primary" href="/kurser">
            Åbn pensum <span aria-hidden>↗</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
