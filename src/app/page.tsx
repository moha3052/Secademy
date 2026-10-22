import Link from "next/link";
import { ArrowUpRight, BookOpen, FlaskConical, Check } from "lucide-react";
import { Header, Logo } from "@/components/layout/header";
import { courses, allLessons } from "@/content/courses";
import { CourseCard } from "@/components/courses/course-card";
import { PermissionPreview } from "@/components/lessons/permission-preview";
const topics = ["Linux", "ACL", "MFA", "Wireshark", "DHCP", "VLAN", "STP"];
export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <section className="study-hero page-width">
          <div className="hero-meta">
            <span>
              <span className="live-dot" /> DIT PENSUM. DIT TEMPO.
            </span>
            <span>SYSTEMER & NETVÆRK</span>
          </div>
          <div className="study-hero-grid">
            <div>
              <span className="hero-kicker">
                Lær det. Prøv det. Forstå det.
              </span>
              <h1>
                IT-sikkerhed,
                <br />
                der giver <em>mening.</em>
              </h1>
              <p>
                Gør undervisningens begreber til noget, du kan forklare. Lær med
                konkrete eksempler, små øvelser og spørgsmål, der får teorien
                til at sidde fast.
              </p>
              <div className="hero-buttons">
                <Link className="btn btn-primary" href="/kurser">
                  Find dit næste emne <ArrowUpRight size={18} />
                </Link>
                <Link className="btn btn-outline" href="/labs">
                  Prøv en øvelse
                </Link>
              </div>
              <div className="hero-assurances">
                <span>
                  <Check size={14} /> Ingen konto
                </span>
                <span>
                  <Check size={14} /> På dansk
                </span>
                <span>
                  <Check size={14} /> Bygget til dit pensum
                </span>
              </div>
            </div>
            <PermissionPreview />
          </div>
        </section>
        <div className="curriculum-band">
          <div className="page-width">
            <span>
              <b>{allLessons.length}</b> lektioner
            </span>
            <span>
              <b>38</b> spørgsmål med forklaringer
            </span>
            <span>
              <b>4</b> praktiske øvelser
            </span>
            <span className="band-note">
              Fra første begreb til din egen forklaring.
            </span>
          </div>
        </div>
        <section className="page-width curriculum-section">
          <div className="section-heading">
            <div>
              <span className="eyebrow">DIT NÆSTE SKRIDT</span>
              <h2>Hvad vil du forstå i dag?</h2>
            </div>
            <Link href="/kurser" className="text-link">
              Se hele pensummet <ArrowUpRight size={16} />
            </Link>
          </div>
          <div className="course-grid">
            {courses.map((course, index) => (
              <CourseCard key={course.id} course={course} index={index} />
            ))}
          </div>
          <div className="topic-row">
            <span>Find et begreb</span>
            {topics.map((topic) => (
              <Link href={`/kurser?q=${encodeURIComponent(topic)}`} key={topic}>
                {topic}
                <span aria-hidden>↗</span>
              </Link>
            ))}
          </div>
        </section>
        <section className="how-section">
          <div className="page-width">
            <div className="section-heading">
              <div>
                <span className="eyebrow">EN METODE, DU KAN BRUGE IGEN</span>
                <h2>Fra “hvad?” til “derfor”.</h2>
              </div>
              <p>
                Du behøver ikke kunne det hele på forhånd.
                <br />
                Tag ét begreb ad gangen.
              </p>
            </div>
            <div className="how-grid">
              <div>
                <span className="step-symbol">
                  <BookOpen size={24} />
                </span>
                <small>01 / FORSTÅ</small>
                <h3>Start med forklaringen.</h3>
                <p>
                  Læs et kort kapitel med et eksempel fra en situation, du kan
                  genkende.
                </p>
              </div>
              <div>
                <span className="step-symbol">
                  <FlaskConical size={24} />
                </span>
                <small>02 / UNDERSØG</small>
                <h3>Se, hvad der sker.</h3>
                <p>
                  Arbejd i dit eget lab, eller prøv en model direkte her på
                  siden.
                </p>
              </div>
              <div>
                <span className="step-symbol">
                  <Check size={25} />
                </span>
                <small>03 / FORKLAR</small>
                <h3>Test din forståelse.</h3>
                <p>
                  Besvar spørgsmål, læs begrundelsen, og vend tilbage til det,
                  der driller.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="page-width reading-section">
          <div>
            <span className="eyebrow">DE GODE SPØRGSMÅL</span>
            <h2>
              Ligner hinanden.
              <br />
              Løser noget forskelligt.
            </h2>
            <p>
              Små forskelle, der gør en stor forskel, når du skal forstå
              sikkerheden i et system.
            </p>
          </div>
          <div className="reading-list">
            {[
              [
                "01",
                "Hash eller kryptering?",
                "Opdage ændringer eller beskytte indhold?",
                "hash-og-diskkryptering",
              ],
              [
                "02",
                "IP-adresse eller MAC-adresse?",
                "Den endelige modtager er ikke altid næste hop.",
                "netvaerkets-grundsten",
              ],
              [
                "03",
                "VLAN eller firewall?",
                "Opdeling og adgangsregler er to forskellige ting.",
                "vlan-og-trunks",
              ],
            ].map(([number, title, description, slug]) => (
              <Link href={`/lektioner/${slug}`} key={slug}>
                <span>{number}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
                <ArrowUpRight size={20} />
              </Link>
            ))}
          </div>
        </section>
        <section className="page-width">
          <div className="practice-strip">
            <div>
              <span className="eyebrow">KLAR TIL AT PRØVE SELV?</span>
              <h2>
                Teorien falder på plads,
                <br />
                når du bruger den.
              </h2>
              <p>
                Åbn dit lokale lab. Undersøg en fil, en container eller en
                netværkspakke, og forklar det, du ser.
              </p>
              <Link href="/labs" className="btn btn-primary">
                Find en øvelse <ArrowUpRight size={18} />
              </Link>
            </div>
            <pre tabIndex={0} aria-label="Eksempel på labkommandoer">
              <code>
                <span># Hvem må læse filen?</span>
                {"\n$ ls -l noter.txt\n-rw-r-----\n\n"}
                <span># Hvad betyder det?</span>
                {
                  "\nEjer    → læse + skrive\nGruppe  → læse\nAndre   → ingen adgang"
                }
              </code>
            </pre>
          </div>
        </section>
      </main>
      <footer className="page-width footer">
        <Logo />
        <span>Lidt klogere. Ét begreb ad gangen.</span>
        <Link href="/kurser">Pensum</Link>
        <Link href="/privatliv">Lokal lagring</Link>
      </footer>
    </>
  );
}
