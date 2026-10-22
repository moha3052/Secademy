import { Shell } from "@/components/layout/shell";
export default function Privacy() {
  return (
    <Shell>
      <main id="main" className="workspace narrow prose">
        <h1>Din læsning bliver i browseren.</h1>
        <p>
          Secademy kræver ingen konto. Senest åbnede lektion, quizresultater og
          manuelt gennemførte øvelser gemmes i browserens localStorage under
          secademy.study.v1. Dit temavalg gemmes også lokalt.
        </p>
        <p>
          Fremgangen synkroniseres ikke mellem enheder. Rydder du browserdata,
          mister du den. På en delt browser kan andre se samme fremgang. Du kan
          nulstille den under Min læsning.
        </p>
        <p>
          Quizsvar sendes til appens server for at blive rettet, men gemmes ikke
          i en brugerprofil eller database. Hosting kan behandle almindelige
          tekniske forespørgselslogs. De oprindelige undervisningsfiler uploades
          ikke af appen.
        </p>
        <p>
          Hvis browseren blokerer lokal lagring, kan du stadig læse og få dine
          svar rettet.
        </p>
      </main>
    </Shell>
  );
}
