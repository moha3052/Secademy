"use client";
import { useActionState } from "react";
import { saveProfile } from "@/features/auth/actions";
export function ProfileForm({
  profile,
}: {
  profile?: {
    display_name?: string;
    experience_level?: string;
    learning_goal?: string;
    learning_interest?: string;
  } | null;
}) {
  const [state, action, pending] = useActionState(saveProfile, {});
  return (
    <form action={action} className="form-stack">
      <label>
        Dit navn
        <input
          name="display_name"
          defaultValue={profile?.display_name || ""}
          required
          maxLength={60}
          autoComplete="given-name"
        />
      </label>
      <label>
        Hvad er dit erfaringsniveau?
        <select
          name="experience_level"
          defaultValue={profile?.experience_level || "beginner"}
        >
          <option value="beginner">Begynder</option>
          <option value="intermediate">Let øvet</option>
          <option value="advanced">Erfaren</option>
        </select>
      </label>
      <label>
        Hvad vil du gerne lære?
        <select
          name="learning_interest"
          defaultValue={profile?.learning_interest || "system"}
        >
          <option value="system">Systemsikkerhed</option>
          <option value="network">Netværkssikkerhed</option>
          <option value="ethical">Etisk hacking (kommende)</option>
          <option value="python">Python til cybersikkerhed (kommende)</option>
        </select>
      </label>
      <label>
        Hvad er dit mål?
        <select
          name="learning_goal"
          defaultValue={profile?.learning_goal || "interest"}
        >
          <option value="exams">Forberede mig til eksamen</option>
          <option value="career">Arbejde med cybersikkerhed</option>
          <option value="development">Blive en bedre udvikler</option>
          <option value="interest">Følge min interesse</option>
        </select>
      </label>
      <p aria-live="polite" className="error-text">
        {state.error}
      </p>
      <button className="btn btn-primary" disabled={pending}>
        {pending ? "Gemmer…" : "Gem og fortsæt"}
      </button>
    </form>
  );
}
