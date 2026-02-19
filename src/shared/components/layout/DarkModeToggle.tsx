"use client";

import * as React from "react";
import { useTheme } from "next-themes";

export function DarkModeToggle() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const resolved = theme === "system" ? systemTheme : theme;
  const isDark = resolved === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="flex items-center gap-2 rounded-xl bg-card px-3 py-2 text-text-primary shadow-sm ring-1 ring-border transition hover:bg-brand/20"
      aria-label="Toggle dark mode"
      aria-pressed={isDark}
    >
      <span className="text-lg">{isDark ? "🌙" : "☀️"}</span>
      <span className="text-sm font-medium">{isDark ? "Dark" : "Light"}</span>
    </button>
  );
}
