"use client";
import { Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";
const subscribe = (callback: () => void) => {
  window.addEventListener("theme-change", callback);
  return () => window.removeEventListener("theme-change", callback);
};
export function ThemeToggle() {
  const dark = useSyncExternalStore(
    subscribe,
    () => document.documentElement.dataset.theme === "dark",
    () => false,
  );
  return (
    <button
      className="icon-button"
      aria-label={dark ? "Brug lyst tema" : "Brug mørkt tema"}
      onClick={() => {
        const theme = dark ? "light" : "dark";
        document.documentElement.dataset.theme = theme;
        try {
          localStorage.setItem("theme", theme);
        } catch {}
        window.dispatchEvent(new Event("theme-change"));
      }}
    >
      {dark ? <Sun size={19} /> : <Moon size={19} />}
    </button>
  );
}
