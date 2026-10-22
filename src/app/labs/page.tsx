import Link from "next/link";
import { Shell } from "@/components/layout/shell";
import { practiceLabs } from "@/content/labs";
export const metadata = { title: "Praktiske øvelser" };
export default function Labs() {
  const labs = [
    {
      id: "linux-permissions",
      title: "Linux-filrettigheder",
      description:
        "Opret en fil, læs rettighederne, og begræns adgangen til ejeren.",
    },
    ...practiceLabs,
  ];
  return (
    <Shell active="/labs">
      <main id="main" className="workspace">
        <span className="eyebrow">LÆS · UNDERSØG · FORKLAR</span>
        <h1>Fra teori til observation.</h1>
        <p className="lead">
          Fire afgrænsede øvelser. Hver opgave hjælper dig med at forklare,
          hvorfor resultatet ser ud, som det gør.
        </p>
        <div className="lab-list">
          {labs.map((lab, i) => (
            <Link className="list-row" href={`/labs/${lab.id}`} key={lab.id}>
              <span className="chapter-number">0{i + 1}</span>
              <span>
                <h2>{lab.title}</h2>
                <p>{lab.description}</p>
              </span>
              <span aria-hidden>↗</span>
            </Link>
          ))}
        </div>
        <p className="info-banner">
          Arbejd i dit eget lab. Tekniske trin udføres lokalt; gennemførelse er
          din egen bekræftelse.
        </p>
      </main>
    </Shell>
  );
}
