import Link from "next/link";
import { notFound } from "next/navigation";
import { Shell } from "@/components/layout/shell";
import { CopyCommands, LabCompletion } from "@/components/labs/lab-tools";
import { practiceLabs } from "@/content/labs";
import { VlanModel } from "@/components/labs/vlan-model";
import { lab } from "@/content/courses";
export default async function Lab({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (slug !== lab.id) {
    const exercise = practiceLabs.find((item) => item.id === slug);
    if (!exercise) notFound();
    return (
      <Shell active="/labs">
        <main id="main" className="workspace narrow">
          <div className="breadcrumb">
            <Link href="/labs">Øvelser</Link>
            <span>/</span>
            <span>{exercise.title}</span>
          </div>
          <span className="eyebrow">UNDERSØG SELV</span>
          <h1>{exercise.title}</h1>
          <p className="lead">{exercise.description}</p>
          <p className="info-banner">{exercise.requirements}</p>
          {exercise.steps.map((step, i) => (
            <section className="lab-step" key={step.title}>
              <h2>
                0{i + 1} · {step.title}
              </h2>
              <p>{step.text}</p>
              {"code" in step && step.code && (
                <CopyCommands commands={[step.code]} />
              )}
            </section>
          ))}
          {slug === "vlan-observation" && <VlanModel />}
          <Link className="text-link" href={`/lektioner/${exercise.lesson}`}>
            Læs teorien bag →
          </Link>
          <LabCompletion labId={slug} reflection={exercise.reflection} />
        </main>
      </Shell>
    );
  }
  return (
    <Shell active="/labs">
      <main id="main" className="workspace narrow">
        <div className="breadcrumb">
          <Link href="/labs">Labs</Link>
          <span>/</span>
          <span>Linux-filrettigheder</span>
        </div>
        <span className="eyebrow">PRAKTISK LAB · 20 MINUTTER</span>
        <h1>Tag kontrollen over dine filer.</h1>
        <p className="lead">
          Lær at læse og ændre filrettigheder i dit eget lokale Linux-miljø.
        </p>
        <div className="info-banner">
          <strong>Inden du starter</strong>
          <br />
          Du skal bruge Ubuntu, WSL eller et tilsvarende Linux-miljø og en
          almindelig brugerkonto. Brug en ny øvelsesmappe på Linux-filsystemet,
          eksempelvis under din hjemmemappe. Der kræves ikke sudo. Kør kun
          kommandoerne på dit eget system.
        </div>
        <section className="lab-step">
          <h2>01 · Opret dit øvelsesområde</h2>
          <p>
            <code>mkdir -p</code> opretter mappen, hvis den ikke findes.{" "}
            <code>cd</code> skifter til mappen. Brug en ny mappe, så du ikke
            ændrer en eksisterende fil.
          </p>
          <CopyCommands commands={lab.commands.slice(0, 2)} />
        </section>
        <section className="lab-step">
          <h2>02 · Opret og undersøg filen</h2>
          <p>
            <code>touch</code> opretter en tom fil, hvis den ikke findes.{" "}
            <code>ls -l</code> viser blandt andet rettigheder, ejer og gruppe.
          </p>
          <CopyCommands commands={lab.commands.slice(2, 4)} />
          <p>
            Forventet eksempel:{" "}
            <code>-rw-r--r-- 1 bruger bruger 0 … secret.txt</code>. Dine
            startrettigheder kan variere med umask.
          </p>
        </section>
        <section className="lab-step">
          <h2>03 · Begræns adgangen</h2>
          <p>
            <code>600</code> giver ejeren læse- og skriveadgang. Gruppe og andre
            får ingen adgang gennem de almindelige rettighedsbits.
          </p>
          <CopyCommands commands={lab.commands.slice(4)} />
          <p>
            Forventet rettighedsfelt: <code>-rw-------</code>. Ejernavn, gruppe
            og tidsstempel afhænger af dit miljø. Et efterfølgende + kan angive
            en ACL.
          </p>
        </section>
        <section className="lab-step">
          <h2>Hvis noget driller</h2>
          <details>
            <summary>
              “No such file or directory”<span>+</span>
            </summary>
            <p>
              Brug pwd til at se din nuværende mappe. Kontrollér, at du er i
              security-lab, og at filnavnet er korrekt.
            </p>
          </details>
          <details>
            <summary>
              “Operation not permitted” eller uændrede rettigheder<span>+</span>
            </summary>
            <p>
              Kontrollér, at du ejer øvelsesfilen. På WSL kan Windows-monterede
              drev have andre rettighedsregler. Prøv i en ny mappe under
              Linux-hjemmemappen. Brug ikke sudo som automatisk løsning.
            </p>
          </details>
        </section>
        <LabCompletion />
      </main>
    </Shell>
  );
}
