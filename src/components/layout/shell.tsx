import Link from "next/link";
import { BookOpen, NotebookPen, FlaskConical } from "lucide-react";
import { Logo } from "./header";
import { ThemeToggle } from "./theme-toggle";
const links = [
  ["/kurser", "Pensum", BookOpen],
  ["/labs", "Øvelser", FlaskConical],
  ["/dashboard", "Min læsning", NotebookPen],
] as const;
export function Shell({
  children,
  active = "",
}: {
  children: React.ReactNode;
  active?: string;
}) {
  return (
    <div className="app-shell">
      <aside className="app-sidebar">
        <Logo />
        <div className="sidebar-label">STUDIEBOG / IT-SIKKERHED</div>
        <nav aria-label="Læringsnavigation">
          {links.map(([href, label, Icon]) => (
            <Link
              href={href}
              key={href}
              className={active === href ? "active" : ""}
              aria-current={active === href ? "page" : undefined}
            >
              <Icon size={18} />
              {label}
            </Link>
          ))}
        </nav>
        <div className="sidebar-note">
          <span className="eyebrow">TO FAG. ÉT STED.</span>
          <Link href="/kurser/system-security">01 · Systemsikkerhed</Link>
          <Link href="/kurser/network-security">02 · Netværkssikkerhed</Link>
          <p>Forklaringer, eksempler og spørgsmål til repetition.</p>
        </div>
        <div className="sidebar-bottom">
          <span>Gemt på denne enhed</span>
          <ThemeToggle />
        </div>
      </aside>
      <div className="app-main">
        <header className="app-top">
          <span>Secademy / Din digitale studiebog</span>
          <Link href="/dashboard">Fortsæt læsningen ↗</Link>
        </header>
        {children}
      </div>
    </div>
  );
}
