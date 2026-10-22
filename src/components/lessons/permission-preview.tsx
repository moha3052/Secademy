"use client";
import { useState } from "react";
import Link from "next/link";
export function PermissionPreview() {
  const [values, setValues] = useState([6, 4, 0]);
  return (
    <aside className="field-note">
      <div className="note-heading">
        <span>
          <span className="live-dot" /> EN LILLE ØVELSE
        </span>
        <span>01 / LINUX</span>
      </div>
      <h2>Hvem må læse filen?</h2>
      <p>Klik på rettighederne. Se kommandoen ændre sig.</p>
      <div className="permission-diagram">
        {["Ejer", "Gruppe", "Andre"].map((label, i) => (
          <div key={label}>
            <span>{label}</span>
            <div className="permission-bits">
              {[
                [4, "r"],
                [2, "w"],
                [1, "x"],
              ].map(([bit, letter]) => (
                <button
                  type="button"
                  key={bit}
                  aria-label={`${label}: ${letter === "r" ? "læse" : letter === "w" ? "skrive" : "udføre"}`}
                  aria-pressed={Boolean(values[i] & Number(bit))}
                  onClick={() =>
                    setValues((old) =>
                      old.map((v, j) => (j === i ? v ^ Number(bit) : v)),
                    )
                  }
                >
                  {values[i] & Number(bit) ? letter : "−"}
                </button>
              ))}
            </div>
            <b>{values[i]}</b>
          </div>
        ))}
      </div>
      <div className="permission-command" aria-live="polite">
        <span>$</span> chmod {values.join("")} noter.txt
      </div>
      <p className="note-hint">
        Rettigheder styrer adgang. De krypterer ikke filen.
      </p>
      <Link href="/lektioner/linux-filrettigheder">
        Forstå hvorfor <span aria-hidden>↗</span>
      </Link>
    </aside>
  );
}
