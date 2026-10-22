"use client";
import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { saveLab, useProgress } from "@/lib/local-progress";
export function CopyCommands({ commands }: { commands: string[] }) {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(false);
  return (
    <div className="code-copy">
      <pre>
        <code>{commands.join("\n")}</code>
      </pre>
      <button
        aria-label="Kopiér kommandoer"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(commands.join("\n"));
            setCopied(true);
            setError(false);
          } catch {
            setError(true);
          }
        }}
      >
        {copied ? <Check size={15} /> : <Copy size={15} />}
        <span aria-live="polite">
          {error ? "Markér og kopiér manuelt" : copied ? "Kopieret" : "Kopiér"}
        </span>
      </button>
    </div>
  );
}
export function LabCompletion({
  labId = "linux-permissions",
  reflection = "Forklar med dine egne ord, hvad 600 betyder, og hvorfor det ikke er kryptering.",
}: {
  labId?: string;
  reflection?: string;
}) {
  const progress = useProgress();
  const [message, setMessage] = useState("");
  return (
    <form
      className="completion"
      onSubmit={(e) => {
        e.preventDefault();
        setMessage(
          saveLab(labId)
            ? "Gennemførelse gemt i denne browser."
            : "Browseren tillader ikke lokal lagring.",
        );
      }}
    >
      <h3>Hvad lærte du?</h3>
      <p>{reflection}</p>
      <label>
        <input type="checkbox" required /> Jeg har gennemført øvelsen og
        forklaret resultatet med mine egne ord.
      </label>
      <button className="btn btn-primary">
        {progress.labs.includes(labId)
          ? "Gennemført · gem igen"
          : "Markér som manuelt gennemført"}
      </button>
      <p className="form-message">
        Din bekræftelse er ikke en automatisk teknisk validering.
      </p>
      <p aria-live="polite">{message}</p>
    </form>
  );
}
