"use client";
import { useActionState } from "react";
import { authenticate, googleSignIn } from "@/features/auth/actions";
import { Button } from "@/components/ui/button";
export function AuthForm({
  mode,
  google = false,
}: {
  mode: "login" | "signup" | "reset" | "update";
  google?: boolean;
}) {
  const [state, action, pending] = useActionState(
    authenticate.bind(null, mode),
    {},
  );
  return (
    <>
      <form action={action} className="form-stack">
        {mode !== "update" && (
          <label>
            E-mail
            <input
              type="email"
              name="email"
              autoComplete="email"
              required
              maxLength={254}
              placeholder="dig@eksempel.dk"
            />
          </label>
        )}
        {mode !== "reset" && (
          <label>
            Adgangskode
            <input
              type="password"
              name="password"
              autoComplete={
                mode === "login" ? "current-password" : "new-password"
              }
              minLength={10}
              maxLength={128}
              required
              placeholder="Mindst 10 tegn"
            />
          </label>
        )}
        <div aria-live="polite">
          {state.error && (
            <p className="form-message error-text">{state.error}</p>
          )}
          {state.message && <p className="form-message">{state.message}</p>}
        </div>
        <Button disabled={pending}>
          {pending
            ? "Et øjeblik…"
            : {
                login: "Log ind",
                signup: "Opret gratis konto",
                reset: "Send nulstillingslink",
                update: "Gem ny adgangskode",
              }[mode]}
        </Button>
      </form>
      {google && (
        <form action={googleSignIn}>
          <Button variant="outline" className="w-full mt-4">
            Fortsæt med Google
          </Button>
        </form>
      )}
    </>
  );
}
