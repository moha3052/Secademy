"use client";
import { useActionState } from "react";
import type { FormState } from "@/features/auth/actions";
import { Button } from "@/components/ui/button";
export function ActionForm({
  action,
  label,
  variant = "default",
}: {
  action: (previous: FormState) => Promise<FormState>;
  label: string;
  variant?: "default" | "outline";
}) {
  const [state, submit, pending] = useActionState(action, {});
  return (
    <form action={submit}>
      <Button variant={variant} disabled={pending}>
        {pending ? "Et øjeblik…" : label}
      </Button>
      <div aria-live="polite">
        {state.error && (
          <p className="form-message error-text">{state.error}</p>
        )}
        {state.message && <p className="form-message">{state.message}</p>}
      </div>
    </form>
  );
}
