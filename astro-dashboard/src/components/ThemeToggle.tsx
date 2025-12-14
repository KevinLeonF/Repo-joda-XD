import * as React from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = React.useState<"light" | "dark" | null>(null);

  React.useEffect(() => {
    const root = document.documentElement;
    const saved = localStorage.getItem("theme") as "light" | "dark" | null;
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const initial = saved ?? (prefersDark ? "dark" : "light");

    root.classList.remove("light", "dark");
    root.classList.add(initial);

    setTheme(initial);
  }, []);

  const toggleTheme = () => {
    if (!theme) return;
    const root = document.documentElement;
    const next = theme === "dark" ? "light" : "dark";

    root.classList.remove("light", "dark");
    root.classList.add(next);

    setTheme(next);
    localStorage.setItem("theme", next);
  };

  if (!theme) return null;

  return (
    <button
      onClick={toggleTheme}
      className="px-3 py-2 rounded-md border border-border"
    >
      {theme === "dark" ? "☀️ Claro" : "🌙 Oscuro"}
    </button>
  );
}
